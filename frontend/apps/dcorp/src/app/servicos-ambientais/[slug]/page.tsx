import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DcorpEnvironmentalService } from "@/app/(landing-page)/dcorp-pages/servicos-ambientais/DcorpEnvironmentalService";
import {
  DCORP_ENVIRONMENTAL_PAGES,
  getDcorpEnvironmentalPage,
} from "@/lib/dcorp-content";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return DCORP_ENVIRONMENTAL_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getDcorpEnvironmentalPage(slug);
  if (!page) return { title: "Meio ambiente" };

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/servicos-ambientais/${page.slug}` },
    openGraph: {
      title: `${page.title} | DCORP Engenharia`,
      description: page.description,
      url: `/servicos-ambientais/${page.slug}`,
    },
  };
}

export default async function DcorpEnvironmentalServiceRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getDcorpEnvironmentalPage(slug);
  if (!page) notFound();

  return <DcorpEnvironmentalService page={page} />;
}
