import type { MetadataRoute } from "next";
import { getRendalSiteUrl } from "@/lib/rendal/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/concept"] },
    sitemap: `${getRendalSiteUrl()}/sitemap.xml`,
    host: getRendalSiteUrl(),
  };
}
