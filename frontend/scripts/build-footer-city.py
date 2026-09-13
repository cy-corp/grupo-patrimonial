"""
European townhouse footer city, matching Emil Hovv's massing:
overlapping front/back rows, then materials, windows and roofs.
Exports GLB for the Next.js footer.
"""

from __future__ import annotations

import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

OUT = Path(__file__).resolve().parents[1] / "public" / "models" / "footer-city.glb"


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for block in (bpy.data.meshes, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
        for item in list(block):
            block.remove(item)


def principled(name: str, color, roughness=0.72, metallic=0.0, alpha=1.0):
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
        if "Alpha" in bsdf.inputs:
            bsdf.inputs["Alpha"].default_value = alpha
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


def export_glb(path: Path):
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
    )


def main():
    clear_scene()
    mats = materials()
    for spec in PLOTS:
        if spec.get("kind") == "tower":
            make_tower(spec, mats)
        else:
            make_building(spec, mats)
    export_glb(OUT)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    try:
        main()
    except Exception:
        import traceback

        traceback.print_exc()
        sys.exit(1)
