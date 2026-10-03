export const cloudVertex = /* glsl */ `
attribute vec3 aTarget;
attribute vec4 aRand;
attribute vec4 aMask;
attribute vec3 aAttr;

uniform float uTime;
uniform float uIntro;
uniform float uIso;
uniform float uParcel;
uniform float uEnv;
uniform float uMorph;
uniform float uSize;
uniform float uScale;
uniform float uHalfWidth;
uniform float uHMin;
uniform float uHRange;
uniform vec3 uLow;
uniform vec3 uHigh;
uniform vec3 uWater;
uniform vec3 uGreen;
uniform vec3 uOrange;

varying vec3 vColor;
varying float vAlpha;

void main() {
  float hN = aAttr.x;
  float shade = aAttr.y;
  float pin = aAttr.z;
  vec3 p = position;

  // Varredura de abertura: a frente passa de oeste para leste e assenta os pontos.
  float u = p.x / (2.0 * uHalfWidth) + 0.5;
  float front = uIntro * 1.4 - 0.2;
  float settled = smoothstep(0.0, 0.14, front - u - aRand.x * 0.05);
  vec3 dust = p + vec3((aRand.y - 0.5) * 1.2, 0.6 + aRand.z * 2.6, (aRand.w - 0.5) * 1.2);
  dust.y += sin(uTime * 0.4 + aRand.x * 6.283) * 0.08;
  p = mix(dust, p, settled);
  float flash = settled * (1.0 - settled) * 4.0;

  // Os pontos deixam o relevo e formam o pin da marca.
  float m = clamp(uMorph * 1.7 - aRand.x * 0.7, 0.0, 1.0);
  m = m * m * (3.0 - 2.0 * m) * pin;
  float arc = sin(m * 3.14159);
  vec3 swirl = vec3(
    sin(aRand.z * 6.283 + uTime * 0.7),
    0.6 + aRand.w,
    cos(aRand.z * 6.283 + uTime * 0.7)
  ) * arc * 0.55;
  p = mix(p, aTarget, m) + swirl;

  vec3 color = mix(uLow, uHigh, pow(hN, 1.15)) * (0.3 + 0.7 * shade);
  float bright = 1.0;

  // Curvas de nível: só os pontos próximos de cada cota continuam acesos.
  float hAbs = uHMin + hN * uHRange;
  float d100 = abs(fract(hAbs / 100.0 - 0.5) - 0.5) * 100.0;
  float d20 = abs(fract(hAbs / 20.0 - 0.5) - 0.5) * 20.0;
  float iso = max(1.0 - smoothstep(2.5, 7.0, d100), (1.0 - smoothstep(1.2, 3.2, d20)) * 0.4);
  bright *= mix(1.0, 0.16 + 2.4 * iso, uIso);

  color = mix(color, uWater, aMask.x);
  bright = max(bright, aMask.x * 1.5);

  bright *= mix(1.0, mix(0.3, 1.7, aMask.w), uParcel);

  float hatch = step(0.5, fract((p.x + p.z) * 16.0));
  float env = max(aMask.y, aMask.z * hatch) * uEnv;
  color = mix(color, uGreen, env);
  bright *= mix(1.0, 0.5, uEnv * (1.0 - env));
  bright = mix(bright, 1.15, env);

  color = mix(color, uOrange, flash * 0.85);
  bright *= 1.0 + flash * 1.5;

  vec3 pinColor = mix(uHigh, uOrange, step(0.955, aRand.w));
  color = mix(color, pinColor, m);
  bright = mix(bright, 0.17, m);
  bright *= mix(1.0, 0.45, uMorph * (1.0 - pin));

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = max(1.0, uSize * (1.0 + flash * 1.6) * uScale / -mv.z);

  vColor = color * bright;
  vAlpha = mix(0.16, 0.6, settled);
}
`;

export const cloudFragment = /* glsl */ `
precision highp float;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = 1.0 - smoothstep(0.2, 0.5, d);
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`;

export const lineVertex = /* glsl */ `
attribute float aAlong;
uniform float uDraw;
uniform float uFade;
uniform float uSize;
uniform float uScale;
varying float vAlpha;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float head = (1.0 - smoothstep(0.0, 0.04, uDraw - aAlong)) * step(uDraw, 0.999);
  float on = step(aAlong, uDraw) * uFade;
  gl_PointSize = max(1.5, uSize * (1.0 + head * 2.5) * uScale / -mv.z) * on;
  vAlpha = on * (0.45 + head * 0.55);
}
`;

export const lineFragment = /* glsl */ `
precision highp float;
uniform vec3 uColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = 1.0 - smoothstep(0.15, 0.5, d);
  gl_FragColor = vec4(uColor, a * vAlpha);
}
`;
