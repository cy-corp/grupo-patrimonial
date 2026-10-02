import type { MetadataRoute } from "next";

/** Combined legacy app — do not index. Public sites are www.gruporendal.com and www.dcorp.com.br. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
