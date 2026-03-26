"use client";

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Upload, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ImageUploadButton({ slotId, slotKey }: { slotId: string, slotKey: string }) {
  const [state, setState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
    if (!ALLOWED_TYPES.includes(file.type)) {
      setState('error');
      setErrorMsg('Apenas JPG, PNG ou WEBP.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setState('error');
      setErrorMsg('A imagem deve ter no máximo 5MB.');
      return;
    }

    setState('uploading');
    setErrorMsg('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Não autenticado');
      }

      const form = new FormData();
      form.append('file', file);
      form.append('slot_id', slotId);
      form.append('slot_key', slotKey);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: form,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || 'Erro interno no upload');
      }

      setState('success');
      router.refresh(); 
      
      setTimeout(() => setState('idle'), 3000);
    } catch (err: any) {
      setState('error');
      setErrorMsg(err.message || 'Falha ao enviar a imagem.');
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/jpeg, image/png, image/webp"
      />
      
      {state === 'error' && (
        <div className="text-red-500 text-xs font-medium bg-red-500/10 p-2 rounded text-center border border-red-500/20">
          {errorMsg}
        </div>
      )}
      
      <Button 
        variant={state === 'success' ? 'default' : 'outline'} 
        className={`w-full justify-center transition-all ${state === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-surface hover:bg-surface-container'}`}
        onClick={() => fileInputRef.current?.click()}
        disabled={state === 'uploading' || state === 'success'}
      >
        {state === 'idle' || state === 'error' ? (
          <><Upload size={16} className="mr-2 opacity-70" /> Enviar nova imagem</>
        ) : state === 'uploading' ? (
          <><Loader2 size={16} className="mr-2 animate-spin" /> Processando...</>
        ) : (
          <><Check size={16} className="mr-2" /> Prontinho!</>
        )}
      </Button>
    </div>
  );
}
