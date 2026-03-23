import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { SlotCard } from '../_components/SlotCard';
import Link from 'next/link';
import { ArrowLeft, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function PageSlots({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('id, name, slug')
    .eq('slug', slug)
    .single();

  if (!page || pageError) {
    notFound();
  }

  const { data: slots, error: slotsError } = await supabase
    .from('image_slots')
    .select(`
      id,
      slot_key,
      label,
      description,
      images (
        id,
        url,
        is_active
      )
    `)
    .eq('page_id', page.id)
    .order('label');

  if (slotsError) {
    return (
      <div className="p-8">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
          Erro ao carregar os slots da página.
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <div className="mb-8 border-b border-outline-variant/20 pb-6">
        <Link href="/admin" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary mb-6 transition-colors font-headline">
          <ArrowLeft size={14} className="mr-2" /> Voltar para o Painel
        </Link>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="font-headline font-bold text-3xl text-primary mb-2">{page.name}</h1>
            <p className="text-on-surface-variant text-sm">Gerencie as imagens para <span className="font-mono bg-surface-container px-2 py-0.5 rounded">/{page.slug}</span></p>
          </div>
          <Link href={`/admin/${slug}/historico`}>
            <Button variant="outline" className="flex items-center gap-2 bg-surface">
              <History size={16} />
              Histórico de Uploads
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {slots?.map(slot => {
          const activeImage = slot.images?.find((img: any) => img.is_active);
          return (
            <SlotCard 
              key={slot.id} 
              slot={slot} 
              activeImage={activeImage} 
            />
          );
        })}
        {(!slots || slots.length === 0) && (
          <div className="col-span-full border border-dashed border-outline-variant p-12 text-center rounded-xl">
            <p className="text-on-surface-variant">Nenhum slot de imagem cadastrado para esta página.</p>
          </div>
        )}
      </div>
    </div>
  );
}
