import type { MetadataRoute } from "next";

/** Combined legacy app — do not index. Public sites are gruporendal.com and dcorp.com.br. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
