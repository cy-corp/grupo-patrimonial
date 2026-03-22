import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { AdminNavbar } from './_components/AdminNavbar';
import { Inter, Noto_Serif } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

import '@/app/globals.css'; // Mantenha as variáveis globais que estão na raiz de app/

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-headline",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Painel Administrativo | Grupo Patrimonial',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className={`${inter.variable} ${notoSerif.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background flex flex-col font-body">
            {user && <AdminNavbar userEmail={user.email} />}
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
