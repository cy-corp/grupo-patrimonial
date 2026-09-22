"""Resolve the method-house hit zones the way the browser will, for every house pixel.

Reads the HIT_ZONES literal straight out of DcorpMethodHouse.tsx, rasterises the zones in
source order (later paints on top and wins hit-testing, matching SVG), then asks two
questions for every pixel of the house silhouette:

  1. Does it resolve to a zone at all? A pixel that resolves to nothing falls through to
     the backdrop rect, which clears the highlight -- that is the flicker bug.
  2. Does it resolve to the stage that actually owns that pixel, per the overlay alphas?

`estrutura` and `revestimentos` are the same wall surface, so the wall is expected to
resolve to whichever of the two owns it in HIT_ZONES.

    python scripts/verify-method-house-hitzones.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import cv2
import numpy as np
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[3]
METHOD = Path(__file__).resolve().parents[1] / "public" / "dcorp" / "method"
TSX = (ROOT / "src/app/(landing-page)/dcorp-pages/quem-somos/DcorpMethodHouse.tsx")
W, H = 1152, 864

fails: list[str] = []


def check(ok: bool, msg: str) -> None:
    print(("  PASS  " if ok else "  FAIL  ") + msg)
    if not ok:
        fails.append(msg)


def parse_zones(source: str) -> list[tuple[str, str]]:
    block = re.search(r"const HIT_ZONES[^=]*=\s*\[(.*?)\n\];", source, re.S)
    if not block:
        raise SystemExit("could not find the HIT_ZONES literal in the component")
    pairs = re.findall(r'id:\s*"(\w+)".*?d:\s*"([^"]+)"', block.group(1), re.S)
    return pairs


def rasterise(d: str) -> np.ndarray:
    """Fill an SVG path made of absolute move/implicit-lineto subpaths."""
    out = np.zeros((H, W), np.uint8)
    polys = []
    for sub in d.split("M"):
        sub = sub.strip().rstrip("Z").strip()
        if not sub:
            continue
        nums = [int(v) for v in sub.split()]
        polys.append(np.array(nums, np.int32).reshape(-1, 2))
    cv2.fillPoly(out, polys, 1)
    return out


def main() -> None:
    zones = parse_zones(TSX.read_text(encoding="utf-8"))
    print("HIT_ZONES parsed from the component, in paint order:")
    for i, (name, _) in enumerate(zones):
        print(f"  {i}. {name}")

    # Later zones paint on top, so resolve in order and let each overwrite.
    resolved = np.zeros((H, W), np.int32)  # 0 = backdrop (clears the highlight)
    index = {name: i + 1 for i, (name, _) in enumerate(zones)}
    for name, d in zones:
        resolved[rasterise(d).astype(bool)] = index[name]

    beauty = cv2.imread(str(METHOD / "house-original-beauty.png"))
    lum = cv2.cvtColor(beauty, cv2.COLOR_BGR2GRAY).astype(np.int32)
    core = ndimage.binary_opening(lum < 200, np.ones((3, 3)))
    lab, n = ndimage.label(core)
    sizes = ndimage.sum(core, lab, range(1, n + 1))
    house = ndimage.binary_fill_holes(lab == (int(np.argmax(sizes)) + 1))

    print("\nflicker safety")
    fallthrough = house & (resolved == 0)
    check(int(fallthrough.sum()) == 0,
          f"every house pixel resolves to a zone, so dragging never hits the backdrop "
          f"({int(fallthrough.sum())} px fall through)")

    print("\nstage routing (house pixel -> zone it resolves to)")
    wall_owner = "estrutura" if "estrutura" in index else "revestimentos"
    expected = {"fundacao": "fundacao", "entrega": "entrega",
                "instalacoes": "instalacoes", "revestimentos": wall_owner}
    for stage, want in expected.items():
        alpha = cv2.imread(str(METHOD / f"house-{stage}.png"), cv2.IMREAD_UNCHANGED)[..., 3]
        # Test the part's core, not its anti-aliased rim, which legitimately abuts a
        # neighbouring zone that grew 2px into it.
        part = ndimage.binary_erosion(alpha > 127, np.ones((3, 3)), iterations=3)
        hit = resolved[part]
        right = int((hit == index[want]).sum())
        total = int(part.sum())
        pct = 100.0 * right / total if total else 0.0
        wrong = {name: int((hit == i).sum()) for name, i in index.items()
                 if i != index[want] and int((hit == i).sum()) > 0}
        check(pct >= 99.0,
              f"{stage:14s} -> {want:14s} {pct:6.2f}% of {total:6d} core px"
              + (f"   stray: {wrong}" if wrong else ""))

    print("\n" + ("ALL CHECKS PASSED" if not fails else f"{len(fails)} CHECK(S) FAILED"))
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
