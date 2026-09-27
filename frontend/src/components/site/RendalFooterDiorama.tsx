"use client";

import dynamic from "next/dynamic";

const FooterDiorama = dynamic(
  () => import("../footer-diorama").then((mod) => mod.FooterDiorama),
  { ssr: false },
);

export function RendalFooterDiorama() {
  return <FooterDiorama variant="rendal" />;
}
