import os
import sys
import shutil
from pathlib import Path

# Add project root and backend directory to sys.path
root_dir = Path(__file__).parent.parent
backend_dir = root_dir / "backend"
sys.path.insert(0, str(root_dir))
sys.path.insert(0, str(backend_dir))

# Ensure writable sqlite database on Vercel serverless (/tmp)
if os.environ.get("VERCEL"):
    tmp_db = "/tmp/landtech.db"
    orig_db = str(backend_dir / "landtech.db")
    if not os.path.exists(tmp_db) and os.path.exists(orig_db):
        try:
            shutil.copy2(orig_db, tmp_db)
        except Exception:
            pass
    os.environ["LANDTECH_DB"] = tmp_db

from backend.main import app

# Vercel entrypoint
handler = app
