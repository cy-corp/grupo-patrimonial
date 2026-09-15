import "./globals.css";

export const metadata = {
  title: "Painel Grupo Patrimonial",
  description: "Gestão compartilhada de conteúdo da Rendal e da DCorp.",
};

export default function DashboardRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
