#!/usr/bin/env python3
"""Deprecated wrapper — page generation now lives in generate-pages.mjs."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = Path(__file__).with_name("generate-pages.mjs")


def main() -> int:
    node = shutil.which("node")
    if not node:
        print("node is required to generate pages (scripts/generate-pages.mjs)", file=sys.stderr)
        return 1
    return subprocess.call([node, str(SCRIPT)], cwd=ROOT)


if __name__ == "__main__":
    raise SystemExit(main())
