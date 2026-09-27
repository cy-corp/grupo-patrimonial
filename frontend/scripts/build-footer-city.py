"""
European townhouse footer city, matching Emil Hovv's massing:
overlapping front/back rows, then materials, windows and roofs.
Exports GLB for the Next.js footer.

Variants (no .blend is versioned; this script is the source of truth):

    blender --background --python frontend/scripts/build-footer-city.py
        -> frontend/public/models/footer-city.glb (legacy, unified landing)

    blender --background --python frontend/scripts/build-footer-city.py -- --variant rendal
        -> frontend/apps/rendal/public/models/footer-city-rendal.glb

The Rendal variant keeps the PLOTS x/y layout (React STREET = 21.6), the
Bld_NN root names and the ClockHour / ClockMinute nodes, but builds every
building as a handful of merged meshes (one per material) so the runtime
stays at a few hundred draw calls after the lateral clones.
"""

from __future__ import annotations

import argparse
import math
import sys
from pathlib import Path

import bmesh
import bpy
from mathutils import Matrix, Vector

FRONTEND = Path(__file__).resolve().parents[1]
OUT = FRONTEND / "public" / "models" / "footer-city.glb"
OUT_RENDAL = FRONTEND / "apps" / "rendal" / "public" / "models" / "footer-city-rendal.glb"


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for block in (bpy.data.meshes, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
        for item in list(block):
            block.remove(item)


def principled(name: str, color, roughness=0.72, metallic=0.0, alpha=1.0, emission=None):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    if "Metallic" in bsdf.inputs:
        bsdf.inputs["Metallic"].default_value = metallic
    if alpha < 1:
        if hasattr(mat, "blend_method"):
            mat.blend_method = "BLEND"
        if hasattr(mat, "surface_render_method"):
            mat.surface_render_method = "BLENDED"
        if "Alpha" in bsdf.inputs:
            bsdf.inputs["Alpha"].default_value = alpha
    if emission is not None:
        key = "Emission Color" if "Emission Color" in bsdf.inputs else "Emission"
        bsdf.inputs[key].default_value = (*emission, 1.0)
        if "Emission Strength" in bsdf.inputs:
            bsdf.inputs["Emission Strength"].default_value = 1.0
    return mat


def apply_bevel(ob, width=0.028, segments=3):
    mod = ob.modifiers.new("Bevel", "BEVEL")
    mod.width = width
    mod.segments = segments
    mod.limit_method = "ANGLE"
    mod.angle_limit = math.radians(30)
    mod.miter_outer = "MITER_ARC"
    bpy.ops.object.select_all(action="DESELECT")
    bpy.context.view_layer.objects.active = ob
    ob.select_set(True)
    bpy.ops.object.modifier_apply(modifier=mod.name)
    try:
        bpy.ops.object.shade_auto_smooth(angle=math.radians(45))
    except Exception:
        bpy.ops.object.shade_smooth()


def add_box(name, loc, dims, mat, parent=None, bevel=0.026):
    if bpy.context.object and bpy.context.object.mode != "OBJECT":
        bpy.ops.object.mode_set(mode="OBJECT")
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
    ob = bpy.context.object
    ob.name = name
    ob.scale = (dims[0], dims[1], dims[2])
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    ob.location = Vector(loc)
    if mat:
        ob.data.materials.append(mat)
    if parent:
        ob.parent = parent
        ob.location = Vector(loc)
    if bevel and min(dims) > 0.08:
        apply_bevel(ob, width=min(bevel, min(dims) * 0.18))
    return ob


def add_empty(name, loc):
    dummy = bpy.data.materials.get("locator") or principled("locator", (1, 1, 1), 1.0, alpha=0.0)
    ob = add_box(name, loc, (0.02, 0.02, 0.02), dummy, bevel=0)
    ob.hide_render = True
    return ob


def add_windows(parent, width, height, depth, cols, rows, mats, y_face=None):
    if y_face is None:
        y_face = depth / 2
    pane_w = width / (cols * 2.05)
    pane_h = height / (rows * 2.2)
    for r in range(rows):
        for c in range(cols):
            x = -width / 2 + (c + 0.5) * (width / cols)
            z = 0.12 * height + (r + 0.5) * (height * 0.78 / rows)
            lit = (c * 5 + r * 7 + int(width * 10)) % 10 == 0
            add_box(
                f"{parent.name}_win_{c}_{r}",
                (x, y_face + 0.012, z),
                (pane_w + 0.04, 0.05, pane_h + 0.045),
                mats["recess"],
                parent,
                bevel=0,
            )
            add_box(
                f"{parent.name}_glass_{c}_{r}",
                (x, y_face + 0.038, z),
                (pane_w, 0.02, pane_h),
                mats["warm"] if lit else mats["glass"],
                parent,
                bevel=0,
            )
            add_box(
                f"{parent.name}_mull_{c}_{r}",
                (x, y_face + 0.05, z),
                (0.01, 0.01, pane_h),
                mats["trim"],
                parent,
                bevel=0,
            )


def add_side_windows(parent, width, height, depth, cols, rows, mats):
    pane_w = depth / (max(cols - 1, 2) * 2.1)
    pane_h = height / (rows * 2.2)
    side_cols = max(2, cols - 1)
    for r in range(rows):
        for c in range(side_cols):
            y = -depth / 2 + (c + 0.5) * (depth / side_cols)
            z = 0.12 * height + (r + 0.5) * (height * 0.78 / rows)
            add_box(
                f"{parent.name}_sw_{c}_{r}",
                (width / 2 + 0.012, y, z),
                (0.05, pane_w + 0.03, pane_h + 0.04),
                mats["recess"],
                parent,
                bevel=0,
            )
            add_box(
                f"{parent.name}_sg_{c}_{r}",
                (width / 2 + 0.036, y, z),
                (0.018, pane_w, pane_h),
                mats["glass"],
                parent,
                bevel=0,
            )


def add_courses(parent, width, depth, height, floors, mat):
    for i in range(1, floors):
        z = (i / floors) * height
        add_box(
            f"{parent.name}_course_{i}",
            (0, 0, z),
            (width + 0.02, depth + 0.02, 0.03),
            mat,
            parent,
            bevel=0,
        )


def add_pitched_roof(parent, width, depth, rise, mat, z0):
    span = math.hypot(width / 2, rise)
    angle = math.atan2(rise, width / 2)
    left = add_box(
        f"{parent.name}_roof_l",
        (-width / 4, 0, z0 + rise / 2),
        (span, depth + 0.08, 0.055),
        mat,
        parent,
        bevel=0.01,
    )
    left.rotation_euler[1] = -angle
    right = add_box(
        f"{parent.name}_roof_r",
        (width / 4, 0, z0 + rise / 2),
        (span, depth + 0.08, 0.055),
        mat,
        parent,
        bevel=0.01,
    )
    right.rotation_euler[1] = angle


def add_gable_wall(parent, width, depth, rise, mat, z0):
    verts = [
        Vector((-width / 2, depth / 2, z0)),
        Vector((width / 2, depth / 2, z0)),
        Vector((0, depth / 2, z0 + rise)),
        Vector((-width / 2, depth / 2 - 0.08, z0)),
        Vector((width / 2, depth / 2 - 0.08, z0)),
        Vector((0, depth / 2 - 0.08, z0 + rise)),
    ]
    faces = [(0, 1, 2), (3, 5, 4), (0, 2, 5, 3), (1, 4, 5, 2), (0, 3, 4, 1)]
    mesh = bpy.data.meshes.new(f"{parent.name}_gable")
    mesh.from_pydata([v.copy() for v in verts], [], faces)
    mesh.update()
    ob = bpy.data.objects.new(f"{parent.name}_gable", mesh)
    bpy.context.collection.objects.link(ob)
    ob.parent = parent
    ob.data.materials.append(mat)


def add_chimney(parent, loc, mats):
    add_box(f"{parent.name}_chy", loc, (0.13, 0.13, 0.48), mats["chimney"], parent, bevel=0.02)
    add_box(
        f"{parent.name}_chycap",
        (loc[0], loc[1], loc[2] + 0.26),
        (0.17, 0.17, 0.05),
        mats["trim"],
        parent,
        bevel=0.01,
    )


def add_dormer(parent, x, y, z, mats):
    add_box(f"{parent.name}_dor_{x:.2f}", (x, y, z), (0.32, 0.34, 0.28), mats["body"], parent, bevel=0.02)
    add_pitched_roof(parent, 0.36, 0.36, 0.16, mats["roof"], z + 0.14)
    add_box(
        f"{parent.name}_dorw_{x:.2f}",
        (x, y + 0.18, z),
        (0.14, 0.03, 0.14),
        mats["glass"],
        parent,
        bevel=0,
    )


def add_balcony(parent, z, y, width, mats):
    add_box(f"{parent.name}_bal_{z:.2f}", (0, y, z), (width, 0.2, 0.04), mats["trim"], parent, bevel=0.01)
    for t in (-0.36, 0.0, 0.36):
        add_box(
            f"{parent.name}_balp_{z:.2f}_{t}",
            ((width / 2) * t, y + 0.07, z + 0.12),
            (0.018, 0.018, 0.2),
            mats["trim"],
            parent,
            bevel=0,
        )
    add_box(
        f"{parent.name}_balr_{z:.2f}",
        (0, y + 0.07, z + 0.22),
        (width * 0.92, 0.016, 0.016),
        mats["trim"],
        parent,
        bevel=0,
    )


def make_building(spec, mats):
    root = add_empty(spec["name"], (spec["x"], spec["y"], 0.0))
    w, d, h = spec["w"], spec["d"], spec["h"]
    body = mats[spec["body"]]
    roof = mats[spec["roof"]]
    local = {**mats, "body": body, "roof": roof}

    add_box(f"{spec['name']}_body", (0, 0, h / 2), (w, d, h), body, root, bevel=0.03)
    add_courses(root, w, d, h, spec["rows"], mats["belt"])
    add_windows(root, w * 0.82, h, d, spec["cols"], spec["rows"], local)
    add_side_windows(root, w, h, d, spec["cols"], spec["rows"], local)
    add_box(f"{spec['name']}_cornice", (0, 0, h + 0.02), (w + 0.1, d + 0.1, 0.07), mats["trim"], root, bevel=0.015)

    kind = spec.get("kind", "hip")
    rise = 0.14 if kind == "flat" else max(0.4, w * 0.28)
    z0 = h + 0.05
    if kind == "flat":
        add_box(f"{spec['name']}_flat", (0, 0, z0 + rise / 2), (w - 0.1, d - 0.1, rise), roof, root, bevel=0.02)
    elif kind == "gable":
        add_gable_wall(root, w, d, rise, body, z0)
        add_pitched_roof(root, w + 0.06, d + 0.04, rise, roof, z0)
    elif kind == "glass":
        bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=math.hypot(w, d) / 2.3, depth=0.78, location=(0, 0, z0 + 0.39))
        cone = bpy.context.object
        cone.name = f"{spec['name']}_glass"
        cone.rotation_euler[2] = math.radians(45)
        cone.parent = root
        cone.data.materials.append(mats["glass_roof"])
    else:
        add_pitched_roof(root, w + 0.08, d + 0.06, rise, roof, z0)
        add_dormer(root, -w * 0.18, d * 0.12, z0 + 0.12, local)
        add_dormer(root, w * 0.18, d * 0.12, z0 + 0.12, local)
        add_chimney(root, (w * 0.22, -d * 0.1, z0 + rise * 0.55), local)
        add_chimney(root, (-w * 0.16, 0.02, z0 + rise * 0.48), local)

    if spec.get("balconies"):
        add_balcony(root, h * 0.36, d / 2 + 0.1, w * 0.38, local)
        add_balcony(root, h * 0.6, d / 2 + 0.1, w * 0.38, local)
    return root


def make_tower(spec, mats):
    root = add_empty(spec["name"], (spec["x"], spec["y"], 0.0))
    add_box(f"{spec['name']}_shaft", (0, 0, 1.6), (1.12, 1.12, 3.2), mats["butter"], root, bevel=0.03)
    for sx, sy in ((-0.54, 0.54), (0.54, 0.54), (0.54, -0.54), (-0.54, -0.54)):
        add_box(f"{spec['name']}_col_{sx}_{sy}", (sx, sy, 1.6), (0.09, 0.09, 3.2), mats["trim"], root, bevel=0.01)
    bpy.ops.mesh.primitive_cylinder_add(radius=0.38, depth=0.04, location=(0, 0.58, 1.78))
    face = bpy.context.object
    face.name = f"{spec['name']}_clock"
    face.rotation_euler[0] = math.radians(90)
    face.parent = root
    face.data.materials.append(mats["clock"])
    hour = add_box(f"{spec['name']}_hour", (0, 0.61, 1.88), (0.03, 0.02, 0.2), mats["ink"], root, bevel=0)
    hour.name = "ClockHour"
    minute = add_box(f"{spec['name']}_min", (0, 0.62, 1.92), (0.02, 0.02, 0.28), mats["ink"], root, bevel=0)
    minute.name = "ClockMinute"
    add_box(f"{spec['name']}_cap", (0, 0, 3.26), (1.28, 1.28, 0.12), mats["trim"], root, bevel=0.02)
    add_box(f"{spec['name']}_lantern", (0, 0, 3.78), (0.8, 0.8, 0.82), mats["sage"], root, bevel=0.04)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.38, location=(0, 0, 4.42))
    s1 = bpy.context.object
    s1.name = f"{spec['name']}_dome1"
    s1.parent = root
    s1.data.materials.append(mats["sage"])
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.24, location=(0, 0, 4.88))
    s2 = bpy.context.object
    s2.name = f"{spec['name']}_dome2"
    s2.parent = root
    s2.data.materials.append(mats["sage"])
    bpy.ops.mesh.primitive_cone_add(radius1=0.18, depth=0.62, location=(0, 0, 5.32))
    cone = bpy.context.object
    cone.name = f"{spec['name']}_spire"
    cone.parent = root
    cone.data.materials.append(mats["sage_dark"])
    return root


def materials():
    return {
        "terra": principled("terra", (0.72, 0.48, 0.38), 0.78),
        "terra2": principled("terra2", (0.70, 0.42, 0.32), 0.78),
        "blue": principled("blue", (0.72, 0.76, 0.74), 0.8),
        "cream": principled("cream", (0.86, 0.83, 0.76), 0.8),
        "sage": principled("sage", (0.54, 0.66, 0.60), 0.76),
        "sage_b": principled("sage_b", (0.48, 0.62, 0.56), 0.76),
        "butter": principled("butter", (0.80, 0.70, 0.38), 0.74),
        "mustard": principled("mustard", (0.78, 0.66, 0.32), 0.74),
        "pink": principled("pink", (0.80, 0.62, 0.58), 0.78),
        "teal": principled("teal", (0.32, 0.48, 0.44), 0.7),
        "teal_d": principled("teal_d", (0.24, 0.38, 0.35), 0.7),
        "roof": principled("roof", (0.48, 0.56, 0.52), 0.68),
        "roof2": principled("roof2", (0.42, 0.52, 0.48), 0.68),
        "glass": principled("glass", (0.75, 0.80, 0.78), 0.14, metallic=0.12),
        "warm": principled("warm", (0.92, 0.82, 0.52), 0.22),
        "glass_roof": principled("glass_roof", (0.66, 0.74, 0.70), 0.16, metallic=0.18, alpha=0.72),
        "recess": principled("recess", (0.22, 0.28, 0.26), 0.9),
        "trim": principled("trim", (0.88, 0.85, 0.78), 0.74),
        "belt": principled("belt", (0.62, 0.56, 0.50), 0.86),
        "chimney": principled("chimney", (0.68, 0.54, 0.48), 0.8),
        "clock": principled("clock", (0.94, 0.92, 0.88), 0.4),
        "ink": principled("ink", (0.12, 0.12, 0.12), 0.35),
        "sage_dark": principled("sage_dark", (0.38, 0.48, 0.44), 0.62),
    }


# x along street, y toward camera (front row ~ +0.15, back ~ -1.15)
PLOTS = [
    dict(name="Bld_00", x=-10.05, y=0.22, w=1.48, d=1.28, h=2.38, body="terra", roof="roof", kind="flat", cols=4, rows=4),
    dict(name="Bld_01", x=-8.55, y=0.08, w=1.5, d=1.32, h=3.2, body="blue", roof="roof", kind="gable", cols=3, rows=5),
    dict(name="Bld_02", x=-8.15, y=-1.18, w=1.42, d=1.22, h=3.82, body="cream", roof="sage", kind="flat", cols=3, rows=6),
    dict(name="Bld_03", x=-7.05, y=0.16, w=1.3, d=1.2, h=2.08, body="sage", roof="roof", kind="hip", cols=3, rows=3),
    dict(name="Bld_04", x=-6.15, y=-1.08, w=1.26, d=1.16, h=2.7, body="terra2", roof="roof", kind="flat", cols=3, rows=4),
    dict(name="Bld_05", x=-5.1, y=0.1, w=1.58, d=1.34, h=3.0, body="cream", roof="roof", kind="hip", cols=3, rows=5, balconies=True),
    dict(name="Bld_06", x=-3.5, y=0.22, w=1.46, d=1.24, h=2.46, body="mustard", roof="roof", kind="flat", cols=4, rows=4),
    dict(name="Bld_07", x=-2.0, y=0.06, w=1.5, d=1.28, h=2.8, body="butter", roof="roof", kind="hip", cols=3, rows=5),
    dict(name="Bld_08", x=-1.1, y=-1.3, w=1.78, d=1.58, h=4.12, body="teal", roof="teal_d", kind="flat", cols=4, rows=7),
    dict(name="Bld_09", x=0.58, y=-1.08, w=1.5, d=1.34, h=2.88, body="teal_d", roof="roof", kind="glass", cols=4, rows=4),
    dict(name="Bld_10", x=0.88, y=0.14, w=1.46, d=1.26, h=2.54, body="sage_b", roof="roof2", kind="hip", cols=3, rows=4, balconies=True),
    dict(name="Bld_11", x=2.38, y=-0.12, w=1.18, d=1.18, h=3.2, body="butter", roof="sage", kind="tower"),
    dict(name="Bld_12", x=3.7, y=0.1, w=1.48, d=1.28, h=2.94, body="pink", roof="roof", kind="hip", cols=3, rows=5, balconies=True),
    dict(name="Bld_13", x=5.08, y=0.22, w=1.26, d=1.18, h=1.94, body="terra", roof="roof", kind="flat", cols=3, rows=3),
    dict(name="Bld_14", x=6.5, y=-0.02, w=1.54, d=1.32, h=3.26, body="terra2", roof="roof", kind="hip", cols=3, rows=5),
    dict(name="Bld_15", x=8.0, y=0.14, w=1.3, d=1.22, h=2.36, body="cream", roof="roof", kind="gable", cols=3, rows=4),
    dict(name="Bld_16", x=9.4, y=0.1, w=1.4, d=1.24, h=2.7, body="mustard", roof="roof", kind="flat", cols=3, rows=4),
    dict(name="Bld_17", x=10.75, y=0.18, w=1.36, d=1.2, h=2.16, body="sage", roof="roof2", kind="hip", cols=3, rows=3),
]


# ---------------------------------------------------------------------------
# Rendal variant: institutional palette, finer bevels, framed/recessed windows,
# storefront ground floors, real hip roofs, parapets, iron balconies, lamps.
# ---------------------------------------------------------------------------


def srgb_to_linear(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def srgb(hex_value: str):
    h = hex_value.lstrip("#")
    return tuple(srgb_to_linear(int(h[i : i + 2], 16) / 255) for i in (0, 2, 4))


def rendal_materials():
    def m(name, hex_value, roughness, metallic=0.0, **kw):
        return principled(name, srgb(hex_value), roughness, metallic=metallic, **kw)

    warm = tuple(srgb_to_linear(c) for c in (0.90, 0.78, 0.48))
    return {
        "stone": m("stone", "#E8DFD0", 0.68),
        "stone_warm": m("stone_warm", "#DDD1BD", 0.7),
        "ivory": m("ivory", "#F1EADC", 0.64),
        "grey": m("grey", "#D9D9D9", 0.66),
        "grey_d": m("grey_d", "#B8B8B8", 0.66),
        "petrol": m("petrol", "#0F5B63", 0.58),
        "petrol_mid": m("petrol_mid", "#0A474E", 0.6),
        "petrol_dark": m("petrol_dark", "#0E2A2D", 0.62),
        "slate": m("slate", "#2E2E2E", 0.52),
        "slate_l": m("slate_l", "#3A3A3A", 0.6),
        "trim": m("trim", "#F7F2EA", 0.6),
        "course": m("course", "#C8BEAD", 0.72),
        "plinth": m("plinth", "#8E8880", 0.8),
        "chimney": m("chimney", "#6A625A", 0.8),
        "graphite": m("graphite", "#1F1F1F", 0.5, 0.15),
        "iron": m("iron", "#1F1F1F", 0.42, 0.55),
        "gold": m("gold", "#C9A96A", 0.34, 0.75),
        "clock": m("clock", "#F7F2EA", 0.4),
        "ink": m("ink", "#1F1F1F", 0.35),
        "glass": principled("glass", tuple(srgb_to_linear(c) for c in (0.42, 0.48, 0.47)), 0.1, metallic=0.12),
        "warm": principled("warm", warm, 0.3, emission=tuple(c * 0.55 for c in warm)),
        "lamp": principled("lamp", warm, 0.3, emission=tuple(c * 0.9 for c in warm)),
        "glass_roof": principled("glass_roof", srgb("#1E3A3D"), 0.1, metallic=0.2, alpha=0.84),
    }


class Part:
    """One Bld_NN root (empty) whose geometry is accumulated per material."""

    def __init__(self, name, loc):
        self.root = bpy.data.objects.new(name, None)
        bpy.context.collection.objects.link(self.root)
        self.root.location = loc
        self.meshes = {}

    def bm(self, mat):
        if mat.name not in self.meshes:
            self.meshes[mat.name] = (mat, bmesh.new())
        return self.meshes[mat.name][1]

    def box(self, loc, dims, mat, bevel=0.0, rot=None):
        matrix = Matrix.Translation(loc)
        if rot is not None:
            matrix = matrix @ rot
        matrix = matrix @ Matrix.Diagonal((*dims, 1.0))
        bm = self.bm(mat)
        verts = bmesh.ops.create_cube(bm, size=1.0, matrix=matrix)["verts"]
        if bevel > 0 and min(dims) > 0.05:
            edges = list({e for v in verts for e in v.link_edges})
            bmesh.ops.bevel(
                bm,
                geom=list(verts) + edges,
                offset=min(bevel, min(dims) * 0.2),
                segments=2,
                profile=0.5,
                affect="EDGES",
                clamp_overlap=True,
            )

    def cyl(self, loc, radius, depth, mat, segments=24, radius2=None, rot=None):
        matrix = Matrix.Translation(loc)
        if rot is not None:
            matrix = matrix @ rot
        bmesh.ops.create_cone(
            self.bm(mat),
            cap_ends=True,
            segments=segments,
            radius1=radius,
            radius2=radius if radius2 is None else radius2,
            depth=depth,
            matrix=matrix,
        )

    def sphere(self, loc, radius, mat, u=24, v=12):
        bmesh.ops.create_uvsphere(self.bm(mat), u_segments=u, v_segments=v, radius=radius, matrix=Matrix.Translation(loc))

    def poly(self, points, faces, mat):
        bm = self.bm(mat)
        verts = [bm.verts.new(p) for p in points]
        for face in faces:
            bm.faces.new([verts[i] for i in face])

    def finish(self):
        for key, (mat, bm) in self.meshes.items():
            bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
            bm.normal_update()
            for f in bm.faces:
                f.smooth = True
            for e in bm.edges:
                e.smooth = e.calc_face_angle(math.pi) < math.radians(50)
            mesh = bpy.data.meshes.new(f"{self.root.name}_{key}")
            bm.to_mesh(mesh)
            bm.free()
            mesh.materials.append(mat)
            ob = bpy.data.objects.new(mesh.name, mesh)
            bpy.context.collection.objects.link(ob)
            ob.parent = self.root
        return self.root


def on_face(side, u, n, z, du, dn, dz):
    if side == "front":
        return (u, n, z), (du, dn, dz)
    return (n, u, z), (dn, du, dz)


def window(p, side, face, u, z, pw, ph, glass, frame, sill, lintel=True, mullion=True):
    f, fd = 0.032, 0.036

    def put(u_, n_, z_, du, dn, dz, mat):
        loc, dims = on_face(side, u_, n_, z_, du, dn, dz)
        p.box(loc, dims, mat)

    put(u, face + 0.006, z, pw, 0.012, ph, glass)
    put(u, face + fd / 2, z + ph / 2 + f / 2, pw + 2 * f, fd, f, frame)
    put(u, face + fd / 2, z - ph / 2 - f / 2, pw + 2 * f, fd, f, frame)
    put(u - pw / 2 - f / 2, face + fd / 2, z, f, fd, ph, frame)
    put(u + pw / 2 + f / 2, face + fd / 2, z, f, fd, ph, frame)
    if mullion:
        put(u, face + 0.016, z, 0.013, 0.02, ph, frame)
        put(u, face + 0.016, z + ph * 0.22, pw, 0.02, 0.013, frame)
    put(u, face + 0.04, z - ph / 2 - f - 0.014, pw + 2 * f + 0.07, 0.08, 0.028, sill)
    if lintel:
        put(u, face + 0.028, z + ph / 2 + f + 0.024, pw + 2 * f + 0.05, 0.056, 0.048, sill)


def gable_prism(p, width, y_face, depth, rise, z0, mat):
    y_back = y_face - depth
    p.poly(
        [
            (-width / 2, y_face, z0),
            (width / 2, y_face, z0),
            (0, y_face, z0 + rise),
            (-width / 2, y_back, z0),
            (width / 2, y_back, z0),
            (0, y_back, z0 + rise),
        ],
        [(0, 1, 2), (3, 5, 4), (0, 2, 5, 3), (1, 4, 5, 2), (0, 3, 4, 1)],
        mat,
    )


def pitched_planes(p, cx, cy, width, depth, rise, z0, mat, thickness=0.045):
    span = math.hypot(width / 2, rise) + 0.03
    angle = math.atan2(rise, width / 2)
    for sign in (-1, 1):
        p.box(
            (cx + sign * width / 4, cy, z0 + rise / 2 + thickness / 2),
            (span, depth, thickness),
            mat,
            rot=Matrix.Rotation(sign * angle, 4, "Y"),
        )


def hip_roof(p, width, depth, rise, z0, mat):
    hx, hy = width / 2, depth / 2
    ridge = max(0.03, hx - hy)
    p.poly(
        [
            (-hx, -hy, z0),
            (hx, -hy, z0),
            (hx, hy, z0),
            (-hx, hy, z0),
            (-ridge, 0, z0 + rise),
            (ridge, 0, z0 + rise),
        ],
        [(3, 2, 5, 4), (0, 4, 5, 1), (0, 3, 4), (1, 5, 2), (0, 1, 2, 3)],
        mat,
    )
    return ridge


def chimney(p, loc, mats):
    x, y, z = loc
    p.box((x, y, z), (0.14, 0.14, 0.5), mats["chimney"], bevel=0.01)
    p.box((x, y, z + 0.265), (0.18, 0.18, 0.035), mats["trim"])
    for dx in (-0.03, 0.03):
        p.cyl((x + dx, y, z + 0.32), 0.022, 0.08, mats["slate_l"], segments=10)


def dormer(p, x, y, z, body, roof, mats):
    p.box((x, y, z), (0.3, 0.3, 0.28), body, bevel=0.01)
    window(p, "front", y + 0.15, x, z - 0.01, 0.12, 0.15, mats["glass"], mats["trim"], mats["trim"], lintel=False)
    gable_prism(p, 0.3, y + 0.15, 0.3, 0.13, z + 0.14, body)
    pitched_planes(p, x, y, 0.36, 0.36, 0.14, z + 0.14, roof, thickness=0.03)


def balcony(p, u, z, face, width, mats):
    p.box((u, face + 0.11, z), (width, 0.22, 0.04), mats["trim"], bevel=0.006)
    for s in (-0.34, 0.34):
        p.box((u + s * width, face + 0.05, z - 0.05), (0.035, 0.1, 0.06), mats["trim"])
    count = 6
    for i in range(count):
        bu = u - width / 2 + 0.03 + i * (width - 0.06) / (count - 1)
        p.box((bu, face + 0.2, z + 0.12), (0.012, 0.012, 0.2), mats["iron"])
    p.box((u, face + 0.2, z + 0.225), (width, 0.02, 0.018), mats["iron"])
    for s in (-1, 1):
        p.box((u + s * (width / 2 - 0.01), face + 0.11, z + 0.225), (0.018, 0.2, 0.018), mats["iron"])


def street_lamp(p, x, y, mats):
    p.cyl((x, y, 0.03), 0.04, 0.06, mats["iron"], segments=12)
    p.cyl((x, y, 0.42), 0.016, 0.78, mats["iron"], segments=10)
    p.box((x, y, 0.86), (0.07, 0.07, 0.1), mats["lamp"])
    p.box((x, y, 0.92), (0.1, 0.1, 0.02), mats["iron"])
    p.cyl((x, y, 0.96), 0.02, 0.06, mats["iron"], segments=8, radius2=0.004)


def storefront(p, w, d, cols, colw, usable, gf, idx, mats):
    face = d / 2
    door_col = cols // 2
    for c in range(cols):
        u = -usable / 2 + (c + 0.5) * colw
        if c == door_col:
            dw, dh = colw * 0.46, gf * 0.72
            z = 0.1 + dh / 2
            p.box((u, face + 0.01, z), (dw, 0.02, dh), mats["graphite"])
            p.box((u, face + 0.018, z + dh / 2 + 0.016), (dw + 0.06, 0.036, 0.032), mats["trim"])
            for s in (-1, 1):
                p.box((u + s * (dw / 2 + 0.015), face + 0.018, z), (0.03, 0.036, dh), mats["trim"])
            p.box((u + dw * 0.3, face + 0.03, z), (0.012, 0.02, 0.05), mats["gold"])
            p.box((u, face + 0.07, 0.03), (dw + 0.14, 0.14, 0.06), mats["plinth"])
        else:
            sw, sh = colw * 0.66, gf * 0.58
            lit = (c * 3 + idx * 5) % 4 == 0
            window(
                p,
                "front",
                face,
                u,
                0.14 + sh / 2,
                sw,
                sh,
                mats["warm"] if lit else mats["glass"],
                mats["graphite"],
                mats["trim"],
                lintel=False,
            )


def rendal_building(spec, mats, idx):
    w, d, h = spec["w"], spec["d"], spec["h"]
    p = Part(spec["name"], (spec["x"], spec["y"], 0.0))
    body = mats[spec["body"]]
    roof = mats[spec["roof"]]
    dark = spec["body"].startswith("petrol")
    course = mats["trim"] if dark else mats["course"]
    cols = spec["cols"]
    floors = max(2, spec["rows"] - 1)
    gf = min(0.58, h * 0.23)
    usable = w * 0.8
    colw = usable / cols
    fh = (h - 0.14 - gf) / floors
    pw, ph = colw * 0.5, fh * 0.56

    p.box((0, 0, 0.05), (w + 0.03, d + 0.03, 0.1), mats["plinth"], bevel=0.01)
    p.box((0, 0, h / 2), (w, d, h), body, bevel=0.018)
    p.box((0, 0, gf), (w + 0.05, d + 0.05, 0.05), mats["trim"], bevel=0.008)
    storefront(p, w, d, cols, colw, usable, gf, idx, mats)

    side_cols = max(2, cols - 1)
    usable_d = d * 0.72
    scolw = usable_d / side_cols
    for r in range(floors):
        z = gf + (r + 0.54) * fh
        if r:
            p.box((0, 0, gf + r * fh), (w + 0.024, d + 0.024, 0.022), course)
        for c in range(cols):
            u = -usable / 2 + (c + 0.5) * colw
            lit = (c * 5 + r * 7 + idx * 3) % 10 == 0
            window(p, "front", d / 2, u, z, pw, ph, mats["warm"] if lit else mats["glass"], mats["trim"], course)
        for c in range(side_cols):
            u = -usable_d / 2 + (c + 0.5) * scolw
            window(p, "side", w / 2, u, z, scolw * 0.5, ph, mats["glass"], mats["trim"], course, mullion=False)

    for s in (-1, 1):
        p.box((s * (w / 2 - 0.035), d / 2 + 0.006, (gf + h) / 2), (0.07, 0.014, h - gf), course)
    p.box((w / 2 + 0.006, d / 2 - 0.035, (gf + h) / 2), (0.014, 0.07, h - gf), course)

    p.box((0, 0, h + 0.025), (w + 0.07, d + 0.07, 0.05), mats["trim"], bevel=0.008)
    p.box((0, 0, h + 0.0675), (w + 0.13, d + 0.13, 0.035), mats["gold"] if spec.get("gold") else mats["trim"], bevel=0.006)
    z0 = h + 0.085

    kind = spec.get("kind", "hip")
    if kind == "flat":
        t, pr = 0.06, 0.16
        p.box((0, 0, z0 + 0.02), (w - 0.05, d - 0.05, 0.04), mats["slate_l"])
        for s in (-1, 1):
            p.box((0, s * (d / 2 - t / 2), z0 + pr / 2), (w, t, pr), body)
            p.box((s * (w / 2 - t / 2), 0, z0 + pr / 2), (t, d - 2 * t, pr), body)
            p.box((0, s * (d / 2 - t / 2), z0 + pr + 0.0125), (w + 0.02, t + 0.03, 0.025), mats["trim"])
            p.box((s * (w / 2 - t / 2), 0, z0 + pr + 0.0125), (t + 0.03, d, 0.025), mats["trim"])
        if h > 3.4 or spec.get("housing"):
            p.box((-w * 0.14, -d * 0.12, z0 + 0.19), (w * 0.34, d * 0.3, 0.3), roof, bevel=0.01)
            p.box((w * 0.22, -d * 0.2, z0 + 0.1), (0.12, 0.12, 0.12), mats["grey_d"])
    elif kind == "gable":
        rise = max(0.4, w * 0.3)
        gable_prism(p, w, d / 2, 0.08, rise, z0, body)
        gable_prism(p, w, -d / 2 + 0.08, 0.08, rise, z0, body)
        pitched_planes(p, 0, 0, w + 0.1, d + 0.14, rise, z0, roof)
        window(p, "front", d / 2, 0, z0 + rise * 0.36, 0.13, 0.15, mats["glass"], mats["trim"], course, lintel=False, mullion=False)
        chimney(p, (w * 0.2, -d * 0.25, z0 + rise * 0.6), mats)
    elif kind == "glass":
        p.box((0, 0, z0 + 0.025), (w + 0.02, d + 0.02, 0.05), mats["trim"])
        p.cyl(
            (0, 0, z0 + 0.44),
            math.hypot(w, d) / 2.3,
            0.78,
            mats["glass_roof"],
            segments=4,
            radius2=0.0,
            rot=Matrix.Rotation(math.radians(45), 4, "Z"),
        )
    else:
        rise = max(0.38, w * 0.3)
        p.box((0, 0, z0 + 0.0175), (w + 0.12, d + 0.12, 0.035), mats["slate_l"])
        ridge = hip_roof(p, w + 0.1, d + 0.1, rise, z0 + 0.035, roof)
        if ridge > 0.05:
            p.box((0, 0, z0 + 0.035 + rise), (2 * ridge + 0.04, 0.035, 0.03), mats["slate_l"])
        for dx in ((-w * 0.2, w * 0.2) if w > 1.4 else (0.0,)):
            dormer(p, dx, d * 0.14, z0 + 0.13, body, roof, mats)
        chimney(p, (w * 0.24, -d * 0.12, z0 + rise * 0.55), mats)
        chimney(p, (-w * 0.18, -0.02, z0 + rise * 0.5), mats)

    if spec.get("balconies"):
        bw = pw + 0.26 if cols % 2 else colw + pw + 0.2
        for r in (1, 2):
            if r < floors:
                balcony(p, 0.0, gf + r * fh + 0.03, d / 2, bw, mats)

    if spec.get("lamp"):
        street_lamp(p, w / 2 + 0.08, d / 2 + 0.32, mats)
    return p.finish()


def clock_hand(root, name, length, width, loc, mat):
    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cube(
        bm,
        size=1.0,
        matrix=Matrix.Translation((0, 0, length * 0.4)) @ Matrix.Diagonal((width, 0.012, length, 1.0)),
    )
    bm.to_mesh(mesh)
    bm.free()
    mesh.materials.append(mat)
    ob = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(ob)
    ob.parent = root
    ob.location = loc
    return ob


def rendal_tower(spec, mats):
    p = Part(spec["name"], (spec["x"], spec["y"], 0.0))
    s, h = 1.12, 3.2
    front = s / 2
    face_rot = Matrix.Rotation(math.radians(90), 4, "X")

    p.box((0, 0, 0.06), (s + 0.08, s + 0.08, 0.12), mats["plinth"], bevel=0.012)
    p.box((0, 0, h / 2), (s, s, h), mats["stone"], bevel=0.02)
    for sx in (-1, 1):
        for sy in (-1, 1):
            p.box((sx * 0.53, sy * 0.53, h / 2), (0.12, 0.12, h), mats["course"], bevel=0.01)
    for z in (0.72, 2.42):
        p.box((0, 0, z), (s + 0.05, s + 0.05, 0.05), mats["trim"], bevel=0.006)

    p.box((0, front + 0.01, 0.4), (0.34, 0.02, 0.56), mats["graphite"])
    p.cyl((0, front + 0.006, 0.68), 0.17, 0.012, mats["warm"], segments=24, rot=face_rot)
    for z, pw, ph in ((1.05, 0.16, 0.34), (2.72, 0.2, 0.36)):
        window(p, "front", front, 0, z, pw, ph, mats["glass"], mats["trim"], mats["trim"], mullion=False)
        window(p, "side", front, 0, z, pw, ph, mats["glass"], mats["trim"], mats["trim"], mullion=False)
    window(p, "side", front, 0, 1.78, 0.2, 0.42, mats["glass"], mats["trim"], mats["trim"])

    cz = 1.78
    p.cyl((0, front + 0.015, cz), 0.44, 0.03, mats["gold"], segments=40, rot=face_rot)
    p.cyl((0, front + 0.035, cz), 0.38, 0.02, mats["clock"], segments=40, rot=face_rot)
    for i in range(12):
        a = math.radians(i * 30)
        tall = i % 3 == 0
        p.box(
            (math.sin(a) * 0.31, front + 0.048, cz + math.cos(a) * 0.31),
            (0.022, 0.008, 0.07 if tall else 0.035),
            mats["ink"],
            rot=Matrix.Rotation(a, 4, "Y"),
        )
    p.cyl((0, front + 0.075, cz), 0.022, 0.012, mats["gold"], segments=12, rot=face_rot)

    p.box((0, 0, 3.26), (1.3, 1.3, 0.12), mats["trim"], bevel=0.012)
    p.box((0, 0, 3.335), (1.36, 1.36, 0.03), mats["gold"], bevel=0.006)
    p.box((0, 0, 3.78), (0.8, 0.8, 0.8), mats["petrol"], bevel=0.02)
    for sx in (-1, 1):
        for sy in (-1, 1):
            p.box((sx * 0.38, sy * 0.38, 3.78), (0.07, 0.07, 0.8), mats["trim"])
    for side in ("front", "side"):
        loc, dims = on_face(side, 0, 0.405, 3.72, 0.26, 0.02, 0.4)
        p.box(loc, dims, mats["graphite"])
        loc, _ = on_face(side, 0, 0.405, 3.92, 0, 0, 0)
        rot = face_rot if side == "front" else Matrix.Rotation(math.radians(90), 4, "Y")
        p.cyl(loc, 0.13, 0.02, mats["graphite"], segments=20, rot=rot)
    p.box((0, 0, 4.2), (0.9, 0.9, 0.05), mats["trim"], bevel=0.008)
    p.sphere((0, 0, 4.42), 0.4, mats["petrol_mid"], u=32, v=16)
    p.cyl((0, 0, 4.8), 0.2, 0.16, mats["trim"], segments=24)
    p.sphere((0, 0, 4.96), 0.22, mats["petrol"], u=24, v=12)
    p.cyl((0, 0, 5.38), 0.16, 0.56, mats["petrol_dark"], segments=16, radius2=0.0)
    p.sphere((0, 0, 5.7), 0.045, mats["gold"], u=12, v=8)

    root = p.finish()
    clock_hand(root, "ClockHour", 0.2, 0.03, (0, front + 0.055, cz), mats["ink"])
    clock_hand(root, "ClockMinute", 0.29, 0.02, (0, front + 0.065, cz), mats["ink"])
    return root


RENDAL_LOOK = {
    "Bld_00": dict(body="grey", roof="slate", lamp=True),
    "Bld_01": dict(body="petrol", roof="slate"),
    "Bld_02": dict(body="stone", roof="slate_l", housing=True),
    "Bld_03": dict(body="ivory", roof="petrol_dark", lamp=True),
    "Bld_04": dict(body="petrol_mid", roof="slate"),
    "Bld_05": dict(body="stone", roof="slate", gold=True),
    "Bld_06": dict(body="stone_warm", roof="slate", lamp=True),
    "Bld_07": dict(body="petrol", roof="slate"),
    "Bld_08": dict(body="petrol_dark", roof="slate", gold=True),
    "Bld_09": dict(body="petrol_mid", roof="slate"),
    "Bld_10": dict(body="ivory", roof="slate", lamp=True),
    "Bld_11": dict(),
    "Bld_12": dict(body="stone_warm", roof="petrol_dark", gold=True),
    "Bld_13": dict(body="petrol", roof="slate", lamp=True),
    "Bld_14": dict(body="stone", roof="slate"),
    "Bld_15": dict(body="grey", roof="slate"),
    "Bld_16": dict(body="petrol_mid", roof="slate"),
    "Bld_17": dict(body="ivory", roof="slate_l", lamp=True),
}

RENDAL_PLOTS = [{**spec, **RENDAL_LOOK[spec["name"]]} for spec in PLOTS]


def build_rendal():
    mats = rendal_materials()
    for idx, spec in enumerate(RENDAL_PLOTS):
        if spec.get("kind") == "tower":
            rendal_tower(spec, mats)
        else:
            rendal_building(spec, mats, idx)


def export_glb(path: Path, **options):
    path.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.export_scene.gltf(
        filepath=str(path),
        export_format="GLB",
        use_selection=False,
        export_apply=True,
        export_cameras=False,
        export_lights=False,
        export_extras=False,
        export_yup=True,
        **options,
    )


def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    parser = argparse.ArgumentParser()
    parser.add_argument("--variant", choices=("legacy", "rendal"), default="legacy")
    parser.add_argument("--out", type=Path)
    return parser.parse_args(argv)


def main():
    args = parse_args()
    clear_scene()
    if args.variant == "rendal":
        build_rendal()
        out = args.out or OUT_RENDAL
        export_glb(out, export_texcoords=False)
    else:
        mats = materials()
        for spec in PLOTS:
            if spec.get("kind") == "tower":
                make_tower(spec, mats)
            else:
                make_building(spec, mats)
        out = args.out or OUT
        export_glb(out)
    print(f"Wrote {out}")


if __name__ == "__main__":
    try:
        main()
    except Exception:
        import traceback

        traceback.print_exc()
        sys.exit(1)
