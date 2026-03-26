import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Layers, Image as ImageIcon } from 'lucide-react';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: pages, error } = await supabase
    .from('pages')
    .select(`
      id,
      name,
      slug,
      image_slots (
        id,
        images (
          is_active
        )
      )
    `)
    .order('name');

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
          Erro ao carregar páginas: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline font-bold text-3xl text-primary mb-2">Páginas</h1>
          <p className="text-on-surface-variant text-sm">Gerencie as imagens das páginas do site.</p>
        </div>
      </div>

      {!pages || pages.length === 0 ? (
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-12 text-center flex flex-col items-center">
          <Layers className="text-on-surface-variant w-12 h-12 mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-on-surface mb-2">Nenhuma página encontrada</h3>
          <p className="text-on-surface-variant text-sm">Você precisa cadastrar páginas no banco de dados primeiro.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page: any) => {
            const slotsCount = page.image_slots?.length || 0;
            const activeImagesCount = page.image_slots?.reduce((acc: number, slot: any) => {
              const activeInSlot = slot.images?.filter((img: any) => img.is_active).length || 0;
              return acc + activeInSlot;
            }, 0) || 0;

            const isFullyConfigured = slotsCount > 0 && activeImagesCount === slotsCount;

            return (
              <Link 
                href={`/admin/${page.slug}`} 
                key={page.id}
                className="group block bg-surface-container-low border border-outline-variant/20 rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-[0_8px_30px_rgba(217,197,143,0.1)]"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors mb-1">{page.name}</h3>
                    <span className="text-xs text-on-surface-variant font-mono bg-surface-container px-2 py-1 rounded">/{page.slug}</span>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${isFullyConfigured ? 'bg-green-500' : 'bg-primary'}`} title={isFullyConfigured ? 'Completo' : 'Incompleto'} />
                </div>
                
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm bg-surface-container px-3 py-1.5 rounded-lg">
                    <Layers size={16} className="text-primary/70" />
                    <span className="font-medium text-on-surface">{slotsCount}</span> <span className="text-xs text-on-surface-variant/70">slots</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm bg-surface-container px-3 py-1.5 rounded-lg">
                    <ImageIcon size={16} className="text-primary/70" />
                    <span className="font-medium text-on-surface">{activeImagesCount}</span> <span className="text-xs text-on-surface-variant/70">imagens</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
