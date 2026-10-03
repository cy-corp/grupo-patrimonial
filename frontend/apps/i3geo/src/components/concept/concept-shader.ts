import { MAX_POLY } from "../hero/terrain-shader";

export { vertexShader } from "../hero/terrain-shader";

// Versão noturna da prancha: relevo escuro, curvas claras e o instrumento
// (cursor) revelando o terreno ao redor do ponto medido.
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
uniform float uTime;
uniform vec2 uCursor;
uniform float uCursorOn;
uniform vec2 uStation;
uniform float uMeasure;
uniform float uScanX;
uniform float uScan;
uniform float uParcel;
uniform float uFill;
uniform float uEnv;
uniform float uRivers;
uniform vec2 uPoly[MAX_POLY];
uniform int uPolyCount;
uniform vec3 uGround;
uniform vec3 uRidge;
uniform vec3 uLine;
uniform vec3 uWater;
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
  float light = clamp(dot(n, normalize(vec3(-1.0, 1.0, 0.9))), 0.0, 1.0);
  vec3 color = mix(uGround, uRidge, light * 0.8 + level * 0.25);

  // O instrumento ilumina o terreno em volta do ponto visado.
  float dc = length(px - uCursor);
  float halo = uCursorOn * (1.0 - smoothstep(10.0, 70.0, dc));

  float reveal = smoothstep(level - 0.06, level, uIntro * 1.08);
  float minor = isoline(hAbs, 20.0, 0.8) * (0.22 + halo * 0.55);
  float major = isoline(hAbs, 100.0, 1.3) * (0.5 + halo * 0.45);

  // Varredura do perfil: uma faixa que acende as curvas que cruza.
  float scanD = abs(px.x - uScanX) / scale;
  float scanBand = uScan * (1.0 - smoothstep(0.0, 140.0, abs(px.x - uScanX)));
  minor += isoline(hAbs, 20.0, 0.9) * scanBand * 0.5;
  color = mix(color, uLine, max(minor, major) * reveal);
  color = mix(color, uOrange, uScan * (1.0 - smoothstep(1.0, 2.2, scanD)));
  color += uOrange * uScan * 0.12 * (1.0 - smoothstep(0.0, 40.0, abs(px.x - uScanX)));

  vec4 ov = texture2D(uOverlay, vUv);
  color = mix(color, uLine, ov.b * uEnv * (0.06 + isoline(px.x + px.y, 3.2, 1.0) * 0.4));
  color = mix(color, uWater, ov.g * uEnv * 0.45);
  color = mix(color, uWater, ov.r * reveal * (0.35 + uRivers * 0.5));

  // Perímetro do imóvel.
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
  if (inside) color = mix(color, uLine, uFill * 0.07);
  color = mix(color, uOrange, 1.0 - smoothstep(1.0, 2.0, dmin / scale));

  // Visada: estação → ponto medido.
  float t;
  float dm = segment(px, uStation, uCursor, t) / scale;
  float dash = step(0.5, fract(t * length(uCursor - uStation) / 6.0 - uTime * 0.6));
  color = mix(color, uOrange, uMeasure * uCursorOn * (1.0 - smoothstep(0.6, 1.6, dm)) * (0.55 + dash * 0.45));
  float ring = abs(dc / scale - 9.0);
  color = mix(color, uOrange, uCursorOn * (1.0 - smoothstep(0.7, 1.6, ring)));
  color = mix(color, uOrange, uCursorOn * (1.0 - smoothstep(1.5, 2.6, dc / scale)));

  float fade = smoothstep(0.0, 0.12, min(vUv.x, 1.0 - vUv.x)) *
    smoothstep(0.0, 0.14, min(vUv.y, 1.0 - vUv.y));
  gl_FragColor = vec4(color, fade);
}
`;
