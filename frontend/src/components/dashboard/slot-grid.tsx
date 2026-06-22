'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Image as ImageIcon, Plus } from 'lucide-react'
import { UploadModal } from './upload-modal'
import { toast } from 'sonner'

interface ImageMetadata {
  id: string
  url: string
  storage_path: string
  alt_text: string | null
  is_active: boolean
  uploaded_at: string
}

interface ImageSlot {
  id: string
  slot_key: string
  label: string
  description: string | null
  images: ImageMetadata[]
}

interface SlotGridProps {
  slots: ImageSlot[]
  pageName: string
  pageSlug: string
}

export function SlotGrid({ slots, pageName, pageSlug }: SlotGridProps) {
  const router = useRouter()
  const [selectedSlot, setSelectedSlot] = useState<ImageSlot | null>(null)

  const handleUploadSuccess = (newUrl: string) => {
    toast.success('Imagem atualizada com sucesso.')
    // Seamlessly refetch the page data using Next.js router
    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      {slots.map((slot) => {
        const activeImage = slot.images?.find((img) => img.is_active)
        const inactiveImages = (slot.images || [])
          .filter((img) => !img.is_active)
          .sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime())

        return (
          <div
            key={slot.id}
            className="bg-white border border-[#0F172A14] rounded-xl flex flex-col justify-between overflow-hidden shadow-sm"
          >
            {/* Top Image Preview */}
            <div className="relative w-full aspect-video bg-[#F8F5F0] overflow-hidden border-b border-[#0F172A14] flex items-center justify-center">
              {activeImage ? (
                <img
                  src={activeImage.url}
                  alt={activeImage.alt_text || slot.label}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#0F172A]/30">
                  <ImageIcon className="size-10 mb-2" />
                  <span className="text-xs font-semibold">Nenhuma imagem cadastrada</span>
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#C9A14A]">
                    {slot.slot_key}
                  </span>
                  {activeImage && (
                    <span className="flex items-center gap-1.5 text-xs text-[#16A34A] font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                      Ativo
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-base text-[#0F172A]">
                  {slot.label}
                </h3>

                <p className="text-xs text-[#0F172A]/60 leading-relaxed mt-1">
                  {slot.description || 'Nenhuma descrição fornecida.'}
                </p>

                {activeImage && (
                  <p className="text-[10px] text-[#0F172A]/40 mt-4">
                    Atualizada em{' '}
                    {new Date(activeImage.uploaded_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>

              {/* History / Previous Substitutions */}
              <div className="pt-4 border-t border-[#0F172A]/8">
                <span className="text-[10px] tracking-wider uppercase font-bold text-[#0F172A]/40 block mb-2.5">
                  Histórico de substituições
                </span>
                <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
                  {inactiveImages.slice(0, 5).map((img) => (
                    <div
                      key={img.id}
                      className="flex items-center justify-between text-[11px] bg-[#F8F5F0]/50 p-2 rounded border border-[#0F172A14]"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <img
                          src={img.url}
                          alt="Histórico"
                          className="h-6 w-8 object-cover rounded bg-[#0F172A]/5 flex-shrink-0"
                        />
                        <span className="truncate text-[#0F172A]/60" title={img.alt_text || img.storage_path}>
                          {img.alt_text || img.storage_path.split('/').pop()}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#0F172A]/40 whitespace-nowrap ml-2">
                        {new Date(img.uploaded_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  ))}
                  {inactiveImages.length === 0 && (
                    <p className="text-[10px] text-[#0F172A]/40 italic">
                      Nenhuma substituição anterior.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedSlot(slot)}
                className="w-full border border-[#0F172A]/20 text-[#0F172A] text-xs font-semibold uppercase tracking-widest py-3 rounded-md hover:bg-[#0F172A]/5 transition-colors cursor-pointer"
              >
                Trocar imagem
              </button>
            </div>
          </div>
        )
      })}

      {/* Upload Modal Manager */}
      {selectedSlot && (
        <UploadModal
          isOpen={!!selectedSlot}
          onClose={() => setSelectedSlot(null)}
          slotId={selectedSlot.id}
          slotKey={selectedSlot.slot_key}
          slotLabel={selectedSlot.label}
          pageName={pageName}
          pageSlug={pageSlug}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  )
}
