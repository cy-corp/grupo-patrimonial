"use client";

import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function AdminNavbar({ userEmail }: { userEmail?: string }) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="w-full bg-surface-container-low border-b border-outline-variant/20 px-6 py-4 flex justify-between items-center z-10">
      <Link href="/admin" className="flex items-center gap-3">
        <img src="/patrimonial-logo-png.png" alt="Logo" className="h-6 w-auto" />
        <span className="font-headline font-bold text-primary tracking-widest uppercase text-sm">Painel</span>
      </Link>
      <div className="flex items-center gap-6">
        {userEmail && (
          <span className="text-xs text-on-surface-variant font-body hidden md:inline">{userEmail}</span>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}
