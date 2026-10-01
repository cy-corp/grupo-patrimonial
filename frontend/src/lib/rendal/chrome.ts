export type RendalChrome = "" | "obra-down" | "obra-up";

export const RENDAL_CHROME_EVENT = "rendal-chrome";

export function getRendalChrome(): RendalChrome {
  const value = document.documentElement.dataset.rendalChrome;
  return value === "obra-down" || value === "obra-up" ? value : "";
}

export function setRendalChrome(value: RendalChrome) {
  const root = document.documentElement;
  if (value) root.dataset.rendalChrome = value;
  else delete root.dataset.rendalChrome;
  window.dispatchEvent(new CustomEvent(RENDAL_CHROME_EVENT, { detail: value }));
}
