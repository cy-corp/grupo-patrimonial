import React from 'react'
import Link from 'next/link'
import { Image as ImageIcon, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

interface ImageQuery {
  url: string
  is_active: boolean
}

interface SlotQuery {
  id: string
  images: ImageQuery[]
}

interface PageData {
  id: string
  slug: string
  name: string
  image_slots: SlotQuery[]
}

export const dynamic = 'force-dynamic'

export default async function PagesListPage() {
  const supabase = await createClient()

  // Fetch pages, their slots, and active images
  const { data, error } = await supabase
    .from('pages')
    .select(`
      id,
      slug,
      name,
      image_slots (
        id,
        images (
          url,
          is_active
        )
      )
    `)
    .neq('slug', 'home')
    .order('name', { ascending: true })

  const pages = (data || []) as unknown as PageData[]

  if (error) {
    console.error('Error fetching pages:', error)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Title Header */}
      <div>
        <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
          Páginas Gerenciáveis
        </h2>
        <p className="text-sm text-[#0F172A]/60 mt-1">
          Selecione uma seção do site para gerenciar e substituir suas imagens.
        </p>
      </div>

      {/* Pages Grid */}
      {pages.length === 0 ? (
        <div className="bg-white border border-[#0F172A14] rounded-xl p-12 text-center flex flex-col items-center justify-center">
          <ImageIcon className="size-12 text-[#0F172A]/20 mb-3" />
          <h3 className="text-sm font-semibold text-[#0F172A]">
            Nenhuma página cadastrada
          </h3>
          <p className="text-xs text-[#0F172A]/50 mt-1">
            As páginas gerenciáveis devem ser cadastradas diretamente no banco de dados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pages.map((page) => {
            const slotsCount = page.image_slots?.length || 0
            const activeImages = page.image_slots
              ?.map((slot) => slot.images?.find((img) => img.is_active)?.url)
              .filter(Boolean) as string[]

            return (
              <div
                key={page.id}
                className="bg-white border border-[#0F172A14] hover:border-[#C9A14A] rounded-xl p-6 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Page Name */}
                  <h3 className="text-base font-semibold text-[#0F172A] group-hover:text-[#C9A14A] transition-colors">
                    {page.name}
                  </h3>

                  {/* Slot Count */}
                  <p className="text-xs text-[#0F172A]/60 mt-1">
                    {slotsCount} {slotsCount === 1 ? 'imagem gerenciável' : 'imagens gerenciáveis'}
                  </p>

                  {/* Mosaico/Avatar Row */}
                  <div className="flex items-center gap-2 mt-6">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C9A14A]">
                      Ativas:
                    </span>
                    <div className="flex -space-x-2.5 overflow-hidden">
                      {activeImages.slice(0, 3).map((url, i) => (
                        <div
                          key={i}
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-[#F8F5F0]"
                        >
                          <img
                            src={url}
                            alt={`Preview ${i}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                      {activeImages.length === 0 && (
                        <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#0F172A]/5 flex items-center justify-center">
                          <ImageIcon className="size-3.5 text-[#0F172A]/30" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation Button */}
                <div className="mt-8 flex justify-end">
                  <Link
                    href={`/dashboard/paginas/${page.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C9A14A] group-hover:text-[#b08a3a] transition-colors cursor-pointer"
                  >
                    Gerenciar
                    <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
