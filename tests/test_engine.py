import os, sys, tempfile
from datetime import date
os.environ["LANDTECH_DB"] = os.path.join(tempfile.mkdtemp(), "t.db")
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))
import engine

def rec(deed, plot, seller, buyer, d, price=2000000, area=5):
    return dict(deed_no=deed, plot_id=plot, seller=seller, buyer=buyer,
                sale_date=date.fromisoformat(d), price=price, area=area)

def codes(r): return {f["code"] for f in r["flags"]}

def test_clean_sale_is_low():
    r = engine.save(rec("T-1", "NEW-1", "ক", "খ", "2025-01-01"))
    assert r["risk_level"] == "low" and not r["flags"]

def test_valid_chain_is_low():
    engine.save(rec("T-2", "NEW-2", "ক", "খ", "2025-01-01"))
    assert engine.save(rec("T-3", "NEW-2", "খ", "গ", "2025-09-01"))["risk_level"] == "low"

def test_duplicate_sale_detected():
    engine.save(rec("T-4", "NEW-3", "ক", "খ", "2025-01-01"))
    engine.save(rec("T-5", "NEW-3", "খ", "গ", "2025-06-01"))
    r = engine.save(rec("T-6", "NEW-3", "খ", "ঘ", "2025-07-01"))
    assert "DUPLICATE_SALE" in codes(r) and r["risk_level"] == "high"

def test_ownership_conflict():
    engine.save(rec("T-7", "NEW-4", "ক", "খ", "2025-01-01"))
    assert "OWNERSHIP_CONFLICT" in codes(engine.save(rec("T-8", "NEW-4", "ঙ", "চ", "2025-08-01")))

def test_duplicate_deed_number():
    engine.save(rec("T-9", "NEW-5", "ক", "খ", "2025-01-01"))
    assert "DUPLICATE_DEED" in codes(engine.save(rec("T-9", "NEW-6", "ক", "খ", "2025-01-01")))

def test_rapid_transfer_and_price_anomaly():
    engine.save(rec("T-10", "NEW-7", "ক", "খ", "2025-01-01"))
    r = engine.save(rec("T-11", "NEW-7", "খ", "গ", "2025-01-05", price=90000000))
    assert {"RAPID_TRANSFER", "PRICE_ANOMALY"} <= codes(r)

def test_seed_stats_and_explanation():
    s = engine.seed()
    assert s["total"] == len(engine.DEMO) and s["high"] >= 2
    assert all(r["explanation"] for r in engine.listing())
