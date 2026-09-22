"""Trace SVG hover hit zones from the method-house overlay alpha channels.

The hit zones used to be hand-written rectangles, which made `estrutura` almost
unhittable (its box was fully shadowed by the `revestimentos` box) and put the roof zone
partly below the eave. Tracing the real alpha keeps the zones and the highlight in sync.

Each stage becomes one solid outline per component, with interior holes filled, so the
whole window rectangle is hoverable rather than just its frame. Paint order in the
component decides ties: largest zone first, smallest last.

    python scripts/build-method-house-hitzones.py

Prints a TypeScript literal to paste into DcorpMethodHouse.tsx.
"""

from __future__ import annotations

from pathlib import Path

import cv2
import numpy as np
from scipy import ndimage

METHOD = Path(__file__).resolve().parents[1] / "public" / "dcorp" / "method"
MIN_AREA = 300
EPSILON = 2.5  # contour simplification in beauty px; a few px of slop is fine for hover
GROW = 2  # overlap neighbours slightly: a sub-pixel gap between two zones would let the
#           pointer fall through to the backdrop mid-drag and flicker the highlight off

# Order matters: later entries paint on top and therefore win hit-testing.
# `estrutura` and `revestimentos` are the same wall surface, so only one of them can own
# the wall; the other stays reachable from the list.
ZONES = ["estrutura", "fundacao", "entrega", "instalacoes"]


def trace(stage: str):
    """Return the SVG path, its raster, and how many mask px the zone fails to cover."""
    rgba = cv2.imread(str(METHOD / f"house-{stage}.png"), cv2.IMREAD_UNCHANGED)
    mask = (rgba[..., 3] > 127).astype(np.uint8)
    mask = ndimage.binary_fill_holes(mask)
    grown = ndimage.binary_dilation(mask, np.ones((3, 3)), iterations=GROW)
    mask, grown = mask.astype(np.uint8), grown.astype(np.uint8)

    contours, _ = cv2.findContours(grown, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    parts, polys = [], []
    for c in contours:
        if cv2.contourArea(c) < MIN_AREA:
            continue
        pts = cv2.approxPolyDP(c, EPSILON, True).reshape(-1, 2)
        polys.append(pts)
        parts.append("M" + " ".join(f"{x} {y}" for x, y in pts) + "Z")

    raster = np.zeros_like(mask)
    cv2.fillPoly(raster, polys, 1)
    # The zone is deliberately GROW px larger than the mask, so "covers" is what matters:
    # every mask pixel must be inside the traced zone.
    missed = int((mask & ~raster).sum())
    return "".join(parts), raster, missed


def main() -> None:
    traced = {stage: trace(stage) for stage in ZONES}

    print("const HIT_ZONES: { id: StageId; d: string }[] = [")
    for stage, (d, _, _) in traced.items():
        print(f'  {{ id: "{stage}", d: "{d}" }},')
    print("];\n")

    for stage, (d, _, missed) in traced.items():
        print(f"{stage:14s} {d.count('M')} subpath(s)  {len(d):5d} chars  "
              f"mask px not covered by zone: {missed}")

    # Every silhouette pixel must sit in some zone, otherwise dragging the pointer across
    # the house can fall through to the backdrop and blink the highlight off.
    beauty = cv2.imread(str(METHOD / "house-original-beauty.png"))
    lum = cv2.cvtColor(beauty, cv2.COLOR_BGR2GRAY).astype(np.int32)
    core = ndimage.binary_opening(lum < 200, np.ones((3, 3)))
    lab, n = ndimage.label(core)
    sizes = ndimage.sum(core, lab, range(1, n + 1))
    house = ndimage.binary_fill_holes(lab == (int(np.argmax(sizes)) + 1))

    union = np.zeros(house.shape, np.uint8)
    for _, raster, _ in traced.values():
        union |= raster
    holes = house & ~union.astype(bool)
    print(f"\nsilhouette px left uncovered by all zones: {int(holes.sum())}")





if __name__ == "__main__":
    main()
