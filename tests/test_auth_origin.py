import sys
from pathlib import Path

import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient
from starlette.requests import Request

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))
import main


def _request_with_origin(origin=None):
    headers = [(b"origin", origin.encode("latin-1"))] if origin is not None else []
    return Request({
        "type": "http",
        "asgi": {"version": "3.0"},
        "http_version": "1.1",
        "method": "POST",
        "scheme": "https",
        "path": "/api/auth/refresh",
        "raw_path": b"/api/auth/refresh",
        "query_string": b"",
        "headers": headers,
        "client": ("127.0.0.1", 12345),
        "server": ("api.example.com", 443),
    })


def test_origin_configuration_normalizes_case_default_port_and_trailing_slash():
    origins, invalid = main._parse_cors_origins(
        " https://Bhumisetu-AI-2-0-l5rx.vercel.app:443/ , http://localhost:5173/ "
    )

    assert origins == [
        "https://bhumisetu-ai-2-0-l5rx.vercel.app",
        "http://localhost:5173",
    ]
    assert invalid == []


@pytest.mark.parametrize("value", [
    "*",
    "https://*.vercel.app",
    "https://example.com/api",
    "https://example.com/path?x=1",
    "https://example.com?",
    "https://example.com#",
    "null",
])
def test_origin_configuration_rejects_wildcards_and_non_origins(value):
    origins, invalid = main._parse_cors_origins(value)

    assert origins == []
    assert invalid == [value]


def test_auth_origin_accepts_exact_trusted_origin_after_normalization(monkeypatch):
    monkeypatch.setattr(main, "cors_origins", ["https://bhumisetu-ai-2-0-l5rx.vercel.app"])

    main._validate_auth_origin(_request_with_origin("https://BHUMISETU-AI-2-0-L5RX.VERCEL.APP:443/"))


def test_auth_origin_rejects_untrusted_and_null_origins(monkeypatch):
    monkeypatch.setattr(main, "cors_origins", ["https://bhumisetu-ai-2-0-l5rx.vercel.app"])

    for origin in ("https://attacker.example", "null", "https://bhumisetu-ai-2-0-l5rx.vercel.app.evil.example"):
        with pytest.raises(HTTPException) as error:
            main._validate_auth_origin(_request_with_origin(origin))
        assert error.value.status_code == 403
        assert error.value.detail == "Authentication request origin is not allowed."


def test_non_browser_auth_request_without_origin_remains_supported(monkeypatch):
    monkeypatch.setattr(main, "cors_origins", ["https://bhumisetu-ai-2-0-l5rx.vercel.app"])

    main._validate_auth_origin(_request_with_origin())


@pytest.mark.parametrize("endpoint", ["login", "register"])
def test_login_and_registration_reject_untrusted_origin_before_database_access(monkeypatch, endpoint):
    monkeypatch.setattr(main, "cors_origins", ["https://bhumisetu-ai-2-0-l5rx.vercel.app"])
    request = _request_with_origin("https://attacker.example")

    with pytest.raises(HTTPException) as error:
        if endpoint == "login":
            main.login(main.LoginRequest(identifier="user", password="password"), request)
        else:
            registration = main.RegisterRequest(
                name="Test Citizen",
                username="Citizen01",
                email="citizen@example.com",
                phone="01712345678",
                nid="1234567890",
                password="abcdefgh",
                password_confirmation="abcdefgh",
            )
            main.register(registration, request)

    assert error.value.status_code == 403


def test_cors_preflight_allows_development_and_rejects_untrusted_origin(monkeypatch):
    monkeypatch.setenv("APP_ENV", "development")
    monkeypatch.setattr(main.engine, "init", lambda: None)
    monkeypatch.setattr(main.engine, "close_pool", lambda: None)

    with TestClient(main.app) as client:
        allowed = client.options(
            "/api/auth/login",
            headers={
                "Origin": "http://localhost:5173",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "authorization,content-type",
            },
        )
        rejected = client.options(
            "/api/auth/login",
            headers={
                "Origin": "https://attacker.example",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "content-type",
            },
        )

    assert allowed.status_code == 200
    assert allowed.headers["access-control-allow-origin"] == "http://localhost:5173"
    assert allowed.headers["access-control-allow-credentials"] == "true"
    assert rejected.status_code == 400
    assert "access-control-allow-origin" not in rejected.headers
