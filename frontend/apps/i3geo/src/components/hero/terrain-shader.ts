export const MAX_POLY = 24;

export const vertexShader = /* glsl */ `
uniform sampler2D uHeight;
uniform float uRangeWorld;
uniform float uLift;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 p = position;
  p.z += texture2D(uHeight, uv).r * uRangeWorld * uLift;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

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
uniform float uLift;
uniform float uIntro;
uniform float uFence;
uniform float uClose;
uniform float uFill;
uniform float uEnv;
uniform vec2 uPoly[MAX_POLY];
uniform int uPolyCount;
uniform int uFenceCount;
uniform vec3 uPetrol;
uniform vec3 uOrange;
uniform vec3 uPaper;
uniform vec3 uShadow;

varying vec2 vUv;

float heightAt(vec2 uv) {
  return texture2D(uHeight, uv).r * uHRange;
}

// Linha anti-serrilhada para isolinhas de um valor contínuo.
float isoline(float value, float spacing, float widthPx) {
  float f = value / spacing;
  float w = max(fwidth(f), 1e-5);
  float d = abs(fract(f - 0.5) - 0.5) / w;
  float line = 1.0 - smoothstep(widthPx * 0.5 - 0.5, widthPx * 0.5 + 0.5, d);
  return line * (1.0 - smoothstep(0.18, 0.45, w));
}

float segment(vec2 p, vec2 a, vec2 b, out float t) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  t = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * t);
}

void main() {
  vec2 px = vec2(vUv.x, 1.0 - vUv.y) * uSize;
  float h = heightAt(vUv);
  float hAbs = h + uHMin;

  // Sombreamento discreto do relevo, só quando ele ganha volume.
  vec2 e = 1.0 / uSize;
  float gx = (heightAt(vUv + vec2(e.x, 0.0)) - heightAt(vUv - vec2(e.x, 0.0))) / (2.0 * uMpp);
  float gy = (heightAt(vUv + vec2(0.0, e.y)) - heightAt(vUv - vec2(0.0, e.y))) / (2.0 * uMpp);
  vec3 n = normalize(vec3(-gx * uExaggeration, -gy * uExaggeration, 1.0));
  vec3 L = normalize(vec3(-1.0, 1.0, 1.4));
  float flat_ = L.z;
  float dark = clamp((flat_ - dot(n, L)) * 1.1, 0.0, 1.0);
  vec3 color = mix(uPaper, uShadow, dark * uLift * 0.8);

  // Curvas reveladas de baixo para cima na abertura.
  float level = h / uHRange;
  float reveal = smoothstep(level - 0.06, level, uIntro * 1.08);
  float minor = isoline(hAbs, 20.0, 0.85) * 0.36;
  float major = isoline(hAbs, 100.0, 1.3) * 0.62;
  float contour = max(minor, major) * reveal;
  color = mix(color, uPetrol, contour);

  vec4 ov = texture2D(uOverlay, vUv);

  // Reserva legal em hachura, APP em faixa sólida.
  float hatch = isoline(px.x + px.y, 3.2, 1.1);
  color = mix(color, uPetrol, ov.b * uEnv * (0.1 + hatch * 0.5));
  color = mix(color, uPetrol, ov.g * uEnv * 0.4);

  // Rede de drenagem.
  color = mix(color, uPetrol, ov.r * 0.95 * reveal);

  // Perímetro do imóvel: cerca medida (V-01 a V-06) e fechamento pelo rio.
  float scale = max(max(fwidth(px.x), fwidth(px.y)), 1e-4);
  float dmin = 1e9;
  bool inside = false;
  float fenceReach = uFence * float(uFenceCount);
  float closeReach = uClose * float(uPolyCount - uFenceCount);
  for (int i = 0; i < MAX_POLY; i++) {
    if (i >= uPolyCount) break;
    int j = i + 1;
    if (j == uPolyCount) j = 0;
    vec2 a = uPoly[i];
    vec2 b = uPoly[j];
    if ((a.y > px.y) != (b.y > px.y) && px.x < (b.x - a.x) * (px.y - a.y) / (b.y - a.y) + a.x) {
      inside = !inside;
    }
    float reach = i < uFenceCount ? fenceReach - float(i) : closeReach - float(i - uFenceCount);
    if (reach <= 0.0) continue;
    float t;
    float d = segment(px, a, b, t);
    if (t <= reach) dmin = min(dmin, d);
  }
  if (inside) color = mix(color, uPetrol, uFill * 0.06);
  float edge = 1.0 - smoothstep(1.1, 2.1, dmin / scale);
  color = mix(color, uOrange, edge);

  // A prancha se dissolve no papel nas bordas.
  float fade = smoothstep(0.0, 0.05, min(vUv.x, 1.0 - vUv.x)) *
    smoothstep(0.0, 0.07, min(vUv.y, 1.0 - vUv.y));

  gl_FragColor = vec4(color, fade);
}
`;
