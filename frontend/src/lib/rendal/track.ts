export function track(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const layer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(layer)) layer.push({ event, ...props });
}
