import type { MetadataRoute } from "next";
import { seo } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "i3Geo",
    short_name: "i3Geo",
    description: seo.description,
    start_url: "/",
    display: "browser",
    background_color: "#F6F4EF",
    theme_color: "#005C74",
    lang: "pt-BR",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
