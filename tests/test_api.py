import os, sys, tempfile
os.environ["LANDTECH_DB"] = os.path.join(tempfile.mkdtemp(), "api.db")
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))
from fastapi.testclient import TestClient
from main import app
c = TestClient(app)

def test_flow():
    assert c.post("/api/seed").json()["total"] > 0
    body = dict(deed_no="API-1", plot_id="API-P", seller="ক", buyer="খ", sale_date="2025-01-01", price=1e6, area=3)
    assert c.post("/api/records", json=body).json()["risk_level"] == "low"
    assert len(c.get("/api/plots/API-P/history").json()) == 1
    assert c.get("/api/records/9999").status_code == 404
    assert c.post("/api/records", json={**body, "price": -1}).status_code == 422
    assert c.get("/").status_code == 200

    # Test O(log N) Binary Search endpoint
    search_res = c.get("/api/search/binary?q=1042").json()
    assert "algorithm" in search_res
    assert "Binary Search" in search_res["algorithm"]
    assert "time_ms" in search_res
    assert search_res["time_ms"] >= 0

