import { MAX_POLY } from "../hero/terrain-shader";

export { vertexShader } from "../hero/terrain-shader";

// Do escuro ao claro: à noite só as curvas brilham; o sol nasce a leste, rasante,
// projeta sombras longas e névoa nos vales; de dia o relevo vira carta em papel.
export const fragmentShader = /* glsl */ `
precision highp float;

#define MAX_POLY ${MAX_POLY}

uniform sampler2D uHeight;
uniform sampler2D uOverlay;
uniform vec2 uSize;
uniform float uHMin;
uniform float uHRange;
uniform float uMpp;
uniform float uExaggeration;
uniform float uIntro;
uniform float uDay;
uniform vec3 uSun;
uniform float uParcel;
uniform float uFill;
uniform float uEnv;
uniform float uRivers;
uniform vec2 uPoly[MAX_POLY];
uniform int uPolyCount;
uniform vec3 uNight;
uniform vec3 uGlow;
uniform vec3 uPaper;
uniform vec3 uShade;
uniform vec3 uInk;
uniform vec3 uWater;
uniform vec3 uWarm;
uniform vec3 uMist;
uniform vec3 uOrange;

varying vec2 vUv;

float heightAt(vec2 uv) {
  return texture2D(uHeight, uv).r * uHRange;
}

float isoline(float value, float spacing, float widthPx) {
  float f = value / spacing;
  float w = max(fwidth(f), 1e-5);
  float d = abs(fract(f - 0.5) - 0.5) / w;
  float line = 1.0 - smoothstep(widthPx * 0.5 - 0.5, widthPx * 0.5 + 0.5, d);
  return line * (1.0 - smoothstep(0.2, 0.5, w));
}

float segment(vec2 p, vec2 a, vec2 b, out float t) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  t = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
  return length(pa - ba * t);
}

// Sombra projetada: marcha no mapa de alturas em direção ao sol.
float sunVisibility(vec2 uv, float h0) {
  vec2 flat_ = uSun.xy;
  float hl = length(flat_);
  if (hl < 1e-4) return 1.0;
  vec2 dir = flat_ / hl / uSize;
  float tanEl = uSun.z / hl;
  float vis = 1.0;
  float t = 1.5;
  for (int i = 0; i < 44; i++) {
    vec2 p = uv + dir * t;
    if (p.x < 0.0 || p.y < 0.0 || p.x > 1.0 || p.y > 1.0) break;
    float ray = h0 * uExaggeration + t * uMpp * tanEl;
    float ground = heightAt(p) * uExaggeration;
    float pen = 6.0 + t * uMpp * 0.035;
    vis = min(vis, smoothstep(-pen, pen, ray - ground));
    if (vis < 0.01 || ray > uHRange * uExaggeration + pen) break;
    t = t * 1.13 + 1.0;
  }
  return vis;
}

void main() {
  vec2 px = vec2(vUv.x, 1.0 - vUv.y) * uSize;
  float scale = max(max(fwidth(px.x), fwidth(px.y)), 1e-4);
  float h = heightAt(vUv);
  float hAbs = h + uHMin;
  float level = h / uHRange;

  vec2 e = 1.0 / uSize;
  float gx = (heightAt(vUv + vec2(e.x, 0.0)) - heightAt(vUv - vec2(e.x, 0.0))) / (2.0 * uMpp);
  float gy = (heightAt(vUv + vec2(0.0, e.y)) - heightAt(vUv - vec2(0.0, e.y))) / (2.0 * uMpp);
  vec3 n = normalize(vec3(-gx * uExaggeration, -gy * uExaggeration, 1.0));

  float reveal = smoothstep(level - 0.06, level, uIntro * 1.08);
  float minor = isoline(hAbs, 20.0, 0.85);
  float major = isoline(hAbs, 100.0, 1.35);

  // Noite: relevo quase invisível, curvas acesas de baixo para cima.
  float moon = clamp(dot(n, normalize(vec3(-0.6, 0.5, 0.8))), 0.0, 1.0);
  vec3 night = uNight * (0.75 + moon * 0.6 + level * 0.35);
  night = mix(night, uGlow, max(minor * 0.32, major * 0.7) * reveal);

  // Sol: luz rasante quente que esfria conforme sobe.
  float lambert = max(dot(n, normalize(uSun)), 0.0);
  float vis = uDay > 0.001 ? sunVisibility(vUv, h) : 0.0;
  float lit = lambert * vis;
  float dawn = smoothstep(0.0, 0.35, uDay) * (1.0 - smoothstep(0.55, 1.0, uDay));
  vec3 sunCol = mix(uWarm, vec3(1.0), smoothstep(0.35, 0.9, uDay));

  vec3 day = mix(uShade, uPaper, clamp(0.35 + lit * 0.75 + level * 0.12, 0.0, 1.0));
  day = mix(day * (0.55 + 0.45 * smoothstep(0.0, 0.6, uDay)), day, smoothstep(0.5, 1.0, uDay));
  day += sunCol * lit * dawn * 0.28;
  // Névoa da manhã assentada nos vales.
  float valley = 1.0 - smoothstep(0.05, 0.42, level);
  day = mix(day, uMist, valley * dawn * 0.55);
  day = mix(day, uInk, max(minor * 0.3, major * 0.55) * reveal * smoothstep(0.2, 0.8, uDay));

  vec3 color = mix(night, day, smoothstep(0.0, 0.55, uDay));
  // As curvas da noite apagam devagar, como luzes ao amanhecer.
  color = mix(color, uGlow, max(minor * 0.25, major * 0.5) * reveal * (1.0 - smoothstep(0.0, 0.45, uDay)) * smoothstep(0.0, 0.2, uDay));

  vec4 ov = texture2D(uOverlay, vUv);
  vec3 water = mix(uGlow, uWater, smoothstep(0.2, 0.7, uDay));
  color = mix(color, water, ov.r * reveal * (0.45 + uRivers * 0.5));
  float hatch = isoline(px.x + px.y, 3.4, 1.1);
  color = mix(color, uInk, ov.b * uEnv * (0.08 + hatch * 0.45));
  color = mix(color, uWater, ov.g * uEnv * 0.5);

  // Perímetro desenhado vértice a vértice.
  float dmin = 1e9;
  bool inside = false;
  float reach = uParcel * float(uPolyCount);
  for (int i = 0; i < MAX_POLY; i++) {
    if (i >= uPolyCount) break;
    int j = i + 1;
    if (j == uPolyCount) j = 0;
    vec2 a = uPoly[i];
    vec2 b = uPoly[j];
    if ((a.y > px.y) != (b.y > px.y) && px.x < (b.x - a.x) * (px.y - a.y) / (b.y - a.y) + a.x) {
      inside = !inside;
    }
    float r = reach - float(i);
    if (r <= 0.0) continue;
    float t;
    float d = segment(px, a, b, t);
    if (t <= r) dmin = min(dmin, d);
  }
  if (inside) color = mix(color, uOrange, uFill * 0.07);
  color = mix(color, uOrange, 1.0 - smoothstep(1.1, 2.2, dmin / scale));

  float fade = smoothstep(0.0, 0.1, min(vUv.x, 1.0 - vUv.x)) *
    smoothstep(0.0, 0.14, min(vUv.y, 1.0 - vUv.y));
  gl_FragColor = vec4(color, fade);
}
`;
