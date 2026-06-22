'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useActiveImage(slotKey: string, fallbackUrl: string) {
  const [imageUrl, setImageUrl] = useState(fallbackUrl)
  const [altText, setAltText] = useState('')

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const supabase = createClient()
        
        const { data, error } = await supabase
          .from('images')
          .select('url, alt_text, image_slots!inner(slot_key)')
          .eq('image_slots.slot_key', slotKey)
          .eq('is_active', true)
          .maybeSingle()

        if (error) {
          // Fail silently and use fallback
          return
        }

        if (data?.url) {
          setImageUrl(data.url)
          if (data.alt_text) {
            setAltText(data.alt_text)
          }
        }
      } catch (error) {
        console.error(`Error loading active image for slot ${slotKey}:`, error)
      }
    }

    fetchImage()
  }, [slotKey])

  return { imageUrl, altText }
}
