"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoldButton } from '@/components/ui/gold-button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('E-mail ou senha inválidos.');
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="bg-surface border border-outline-variant/20 p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src="/patrimonial-logo-png.png" alt="Grupo Patrimonial" className="h-16 w-auto mb-4" />
          <h1 className="font-headline text-xl text-primary font-bold uppercase tracking-widest">Acesso Restrito</h1>
        </div>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@grupopatrimonial.com.br"
              className="bg-surface-container-low"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-surface-container-low"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-500 text-xs p-3 rounded-lg border border-red-500/20 text-center font-medium">
              {error}
            </div>
          )}

          <GoldButton type="submit" disabled={loading} className="w-full mt-2">
            {loading ? 'Acessando...' : 'Entrar no Painel'}
          </GoldButton>
        </form>
      </div>
    </div>
  );
}
