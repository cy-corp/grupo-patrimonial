import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

export function UploadHistoryTable({ history, currentPage, totalPages, slug }: { history: any[], currentPage: number, totalPages: number, slug: string }) {
  if (!history || history.length === 0) {
    return (
      <div className="border border-dashed border-outline-variant p-12 text-center rounded-xl bg-surface-container-low/50">
        <p className="text-on-surface-variant">Nenhum histórico de upload encontrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-surface-container border-b border-outline-variant/20 text-on-surface-variant font-headline uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-4 font-semibold w-24">Imagem</th>
              <th className="px-6 py-4 font-semibold">Slot</th>
              <th className="px-6 py-4 font-semibold">Data</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-surface-container/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-16 h-10 bg-surface-container rounded overflow-hidden border border-outline-variant/20 flex items-center justify-center">
                    {item.url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.url} alt="Thumbnail" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={16} className="text-on-surface-variant/50" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-on-surface">{item.image_slots?.label}</span>
                    <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container border border-outline-variant/20 px-1.5 py-0.5 rounded mt-1 w-max">{item.image_slots?.slot_key}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-on-surface-variant">
                  {new Date(item.uploaded_at).toLocaleString('pt-BR', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </td>
                <td className="px-6 py-4">
                  {item.is_active ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-600 border border-green-500/20">
                      Ativa
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-surface-container text-on-surface-variant border border-outline-variant/20">
                      Antiga
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-outline-variant/20 flex items-center justify-between bg-surface-container/30">
          <span className="text-xs font-medium text-on-surface-variant">
            Página {currentPage} de {totalPages}
          </span>
          <div className="flex gap-2">
            <Link href={`/admin/${slug}/historico?page=${currentPage - 1}`} className={currentPage <= 1 ? 'pointer-events-none' : ''}>
              <Button variant="outline" size="sm" disabled={currentPage <= 1} className="h-8 w-8 p-0">
                <ChevronLeft size={16} />
              </Button>
            </Link>
            <Link href={`/admin/${slug}/historico?page=${currentPage + 1}`} className={currentPage >= totalPages ? 'pointer-events-none' : ''}>
              <Button variant="outline" size="sm" disabled={currentPage >= totalPages} className="h-8 w-8 p-0">
                <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
