import type { Metadata } from "next";
import {
  DCORP_DEFAULT_DESCRIPTION,
  DCORP_SIGNATURE,
  DCORP_SITE_NAME,
} from "../lib/site";

export { default } from "@/app/(landing-page)/dcorp-home/page";

export const metadata: Metadata = {
  title: {
    absolute: DCORP_SITE_NAME,
  },
  description: DCORP_DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: DCORP_SITE_NAME,
    description: `${DCORP_SIGNATURE} ${DCORP_DEFAULT_DESCRIPTION}`,
    url: "/",
  },
};
