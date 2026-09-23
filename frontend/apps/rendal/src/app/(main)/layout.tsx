import { SiteShell } from "@/components/site/SiteShell";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell companyId="rendal">{children}</SiteShell>;
}
