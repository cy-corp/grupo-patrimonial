import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { UploadHistoryTable } from '../../_components/UploadHistoryTable';

export default async function HistoryPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ page?: string }>
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = parseInt(pageParam || '1', 10);
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const supabase = await createClient();

  const { data: pageData, error: pageError } = await supabase
    .from('pages')
    .select('id, name')
    .eq('slug', slug)
    .single();

  if (!pageData || pageError) notFound();

  const { data: slots } = await supabase
    .from('image_slots')
    .select('id')
    .eq('page_id', pageData.id);

  const slotIds = slots?.map(s => s.id) || [];

  let history: any[] = [];
  let totalCount = 0;

  if (slotIds.length > 0) {
    const { data, count, error } = await supabase
      .from('images')
      .select(`
        id, 
        url, 
        uploaded_at, 
        is_active,
        image_slots ( label, slot_key )
      `, { count: 'exact' })
      .in('slot_id', slotIds)
      .order('uploaded_at', { ascending: false })
      .range(offset, offset + limit - 1);
      
    if (!error && data) {
      history = data;
      totalCount = count || 0;
    }
  }

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <div className="mb-8 border-b border-outline-variant/20 pb-6">
        <Link href={`/admin/${slug}`} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary mb-6 transition-colors font-headline">
          <ArrowLeft size={14} className="mr-2" /> Voltar para Slots
        </Link>
        <div>
          <h1 className="font-headline font-bold text-3xl text-primary mb-2">Histórico de Uploads</h1>
          <p className="text-on-surface-variant text-sm">Página: <span className="font-medium text-on-surface">{pageData.name}</span></p>
        </div>
      </div>

      <UploadHistoryTable 
        history={history} 
        currentPage={currentPage}
        totalPages={totalPages}
        slug={slug}
      />
    </div>
  );
}
