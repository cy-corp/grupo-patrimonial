import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SlotGrid } from '@/components/dashboard/slot-grid'
import { brandFromPageSlug, brandLabel } from '@/lib/content/brand'

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

interface PageData {
  id: string
  name: string
  slug: string
  image_slots: ImageSlot[]
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-dynamic'

export default async function PageSlotsPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch page details, slots, and active/inactive images
  const { data, error } = await supabase
    .from('pages')
    .select(`
      id,
      name,
      slug,
      image_slots (
        id,
        slot_key,
        label,
        description,
        images (
          id,
          url,
          storage_path,
          alt_text,
          is_active,
          uploaded_at
        )
      )
    `)
    .eq('slug', slug)
    .single()

  const page = data as unknown as PageData

  if (error || !page) {
    console.error('Error fetching slots:', error)
    return notFound()
  }

  // Prevent managing home page
  if (page.slug === 'home') {
    return notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb Header */}
      <div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-[#0F172A]/50 uppercase tracking-widest mb-1.5">
          <Link
            href="/dashboard/paginas"
            className="hover:text-[#C9A14A] transition-colors cursor-pointer"
          >
            Páginas
          </Link>
          <span>/</span>
          <span className="text-[#0F172A]">{page.name}</span>
        </div>
        <span className="inline-flex rounded-full bg-[#F8F5F0] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C9A14A]">
          {brandLabel(brandFromPageSlug(page.slug))}
        </span>
        <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
          {page.name}
        </h2>
        <p className="text-sm text-[#0F172A]/60 mt-0.5">
          Gerencie as imagens desta seção.
        </p>
      </div>

      {/* Slots Grid */}
      <SlotGrid
        slots={page.image_slots || []}
        pageName={page.name}
        pageSlug={page.slug}
      />
    </div>
  )
}
