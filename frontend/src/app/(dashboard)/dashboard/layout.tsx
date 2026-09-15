'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutGrid, LogOut } from 'lucide-react'
import { DualBrandLockup } from '@/components/brands/DualBrandLockup'
import { createClient } from '@/lib/supabase/client'
import { Toaster } from 'sonner'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  const [userEmail, setUserEmail] = useState<string>('')
  const [initials, setInitials] = useState<string>('RD')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user && user.email) {
          setUserEmail(user.email)
          const parts = user.email.split('@')[0].split(/[._-]/)
          if (parts.length > 1 && parts[0] && parts[1]) {
            setInitials((parts[0][0] + parts[1][0]).toUpperCase())
          } else if (parts[0]) {
            setInitials(parts[0].slice(0, 2).toUpperCase())
          }
        }
      } catch {
        // Admin stays usable if Supabase is not configured at build time.
      }
    }
    fetchUser()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  // Determine current page title
  const getHeaderTitle = () => {
    if (pathname.includes('/dashboard/paginas/')) {
      // Slug page, title will be handled inside page or generic "Editar Página"
      // But we can return "Páginas" or try to read slug from pathname
      const slug = pathname.split('/').pop() || ''
      if (slug === 'paginas') return 'Páginas'
      // Format slug to user friendly text
      return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
    }
    if (pathname.includes('/dashboard/paginas')) {
      return 'Páginas'
    }
    return 'Dashboard'
  }

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#0F172A]">
      <Toaster position="top-right" richColors />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed top-0 bottom-0 left-0 w-56 bg-white border-r border-[#0F172A]/8 z-30">
        {/* Brand logo */}
        <div className="h-16 px-6 border-b border-[#0F172A]/8 flex items-center gap-3">
          <DualBrandLockup
            className="w-full gap-2"
            markClassName="h-6"
            pipeClassName="h-6"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          <Link
            href="/dashboard/paginas"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all relative group cursor-pointer ${
              pathname.includes('/dashboard/paginas')
                ? 'text-[#0F172A] bg-[#F8F5F0]'
                : 'text-[#0F172A]/60 hover:text-[#0F172A] hover:bg-[#F8F5F0]/40'
            }`}
          >
            {/* Left Gold Active Indicator */}
            {pathname.includes('/dashboard/paginas') && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#C9A14A] rounded-r-md" />
            )}
            <LayoutGrid className={`size-4 ${pathname.includes('/dashboard/paginas') ? 'text-[#C9A14A]' : ''}`} />
            Páginas
          </Link>
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t border-[#0F172A]/8">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#0F172A]/60 hover:text-[#DC2626] hover:bg-red-50/50 transition-all cursor-pointer"
          >
            <LogOut className="size-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col min-h-screen md:pl-56 pb-20 md:pb-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#0F172A]/8 px-6 flex items-center justify-between sticky top-0 z-20">
          <h1 className="text-base font-semibold text-[#0F172A] uppercase tracking-wider">
            {getHeaderTitle()}
          </h1>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs font-medium text-[#0F172A]/60">
              {userEmail}
            </span>
            <div className="size-8 rounded-full bg-[#C9A14A] text-white flex items-center justify-center font-bold text-xs shadow-sm" title={userEmail}>
              {initials}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#0F172A]/8 flex items-center justify-around z-40 shadow-lg px-6">
        <Link
          href="/dashboard/paginas"
          className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            pathname.includes('/dashboard/paginas')
              ? 'text-[#C9A14A]'
              : 'text-[#0F172A]/50 hover:text-[#0F172A]'
          }`}
        >
          <LayoutGrid className="size-5" />
          Páginas
        </Link>
        <button
          onClick={handleSignOut}
          className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#0F172A]/50 hover:text-[#DC2626] transition-colors cursor-pointer"
        >
          <LogOut className="size-5" />
          Sair
        </button>
      </div>
    </div>
  )
}
