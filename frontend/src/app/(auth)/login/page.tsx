'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setErrorMsg('E-mail ou senha inválidos.')
        setIsLoading(false)
      } else {
        router.push('/dashboard/paginas')
        router.refresh()
      }
    } catch (err) {
      setErrorMsg('Ocorreu um erro no servidor. Tente novamente mais tarde.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F1E3] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-[#0F172A14] overflow-hidden p-8 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <Image
            src="/patrimonial-logo-png.png"
            alt="Grupo Patrimonial Logo"
            width={72}
            height={72}
            className="object-contain"
            priority
          />
          <h2 className="text-xl font-semibold text-[#0F172A] mt-3">
            Grupo Patrimonial
          </h2>
          <p className="text-xs text-[#0F172A]/50 mt-1 uppercase tracking-widest font-bold">
            Painel Administrativo
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C9A14A]"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-email@dominio.com"
              className="border border-[#0F172A14] focus:border-[#C9A14A] px-4 py-2.5 rounded-md text-sm outline-none transition-colors w-full text-[#0F172A]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C9A14A]"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-[#0F172A14] focus:border-[#C9A14A] px-4 py-2.5 rounded-md text-sm outline-none transition-colors w-full text-[#0F172A]"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-[#DC2626] font-medium text-center bg-[#DC2626]/5 py-2 rounded-md border border-[#DC2626]/10">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#C9A14A] text-white text-sm font-semibold uppercase tracking-widest py-3 rounded-md hover:bg-[#b08a3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer flex justify-center items-center"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
