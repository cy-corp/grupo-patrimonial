'use client'

import React, { useState, useEffect, useRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, Upload, Image as ImageIcon } from 'lucide-react'
import { useImageUpload } from '@/hooks/useImageUpload'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  slotId: string
  slotKey: string
  slotLabel: string
  pageName: string
  pageSlug: string
  onUploadSuccess: (newUrl: string) => void
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export function UploadModal({
  isOpen,
  onClose,
  slotId,
  slotKey,
  slotLabel,
  pageName,
  pageSlug,
  onUploadSuccess,
}: UploadModalProps) {
  const { upload, state, errorMsg } = useImageUpload()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [altText, setAltText] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cleanup preview URL to prevent leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Reset state when opening/closing
  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null)
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
      setAltText('')
      setValidationError(null)
    }
  }, [isOpen])

  const validateAndSetFile = (file: File) => {
    setValidationError(null)
    if (!ALLOWED_TYPES.includes(file.type)) {
      setValidationError('Formato não permitido. Use apenas JPG, PNG ou WEBP.')
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      setValidationError('O arquivo excede o tamanho máximo de 5 MB.')
      return
    }
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleConfirm = async () => {
    if (!selectedFile) {
      setValidationError('Por favor, selecione uma imagem.')
      return
    }

    const uploadedUrl = await upload(selectedFile, slotId, slotKey, pageSlug, altText)
    if (uploadedUrl) {
      onUploadSuccess(uploadedUrl)
      onClose()
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-50 transition-opacity" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl w-full max-w-lg p-6 z-50 border border-[#0F172A14] flex flex-col focus:outline-none max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <Dialog.Title className="text-lg font-semibold text-[#0F172A]">
                Trocar imagem
              </Dialog.Title>
              <Dialog.Description className="text-xs text-[#0F172A]/60 mt-1 font-medium">
                {slotLabel} — {pageName}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-[#0F172A]/40 hover:text-[#0F172A] p-1 rounded-md transition-colors"
                aria-label="Fechar"
              >
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
              isDragOver
                ? 'border-[#C9A14A] bg-[#F8F5F0]'
                : 'border-[#0F172A]/20 hover:border-[#C9A14A]/60 hover:bg-[#F8F5F0]/30'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />
            <Upload className="size-8 text-[#C9A14A] mb-3" />
            <p className="text-sm font-semibold text-[#0F172A] text-center">
              Drag & drop ou clique para selecionar
            </p>
            <p className="text-xs text-[#0F172A]/50 mt-1 text-center">
              Formatos aceitos: JPG, PNG, WEBP (Máx: 5MB)
            </p>
          </div>

          {/* Validation Error Inline */}
          {validationError && (
            <p className="text-xs text-[#DC2626] font-medium mt-3">
              {validationError}
            </p>
          )}

          {/* Preview Section */}
          {previewUrl && (
            <div className="mt-6">
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C9A14A] mb-2">
                Prévia
              </p>
              <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-[#F8F5F0] border border-[#0F172A14]">
                <img
                  src={previewUrl}
                  alt="Prévia do upload"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Alt Text Input */}
          <div className="mt-6 flex flex-col gap-2">
            <label
              htmlFor="alt-text"
              className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C9A14A]"
            >
              Texto Alternativo (Alt Text - Opcional)
            </label>
            <input
              id="alt-text"
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Descreva a imagem para acessibilidade"
              className="border border-[#0F172A14] focus:border-[#C9A14A] px-3 py-2 rounded-md text-sm outline-none transition-colors"
            />
          </div>

          {/* Error Message from Server */}
          {(errorMsg || state === 'error') && (
            <p className="text-xs text-[#DC2626] font-medium mt-4">
              {errorMsg || 'Falha ao enviar. Tente novamente.'}
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8">
            <Dialog.Close asChild>
              <button
                type="button"
                className="border border-[#0F172A]/20 text-[#0F172A] text-sm px-6 py-2.5 rounded-md hover:bg-[#0F172A]/5 transition-colors font-medium cursor-pointer"
              >
                Cancelar
              </button>
            </Dialog.Close>
            <button
              type="button"
              disabled={state === 'uploading'}
              onClick={handleConfirm}
              className="bg-[#C9A14A] text-white text-sm font-semibold uppercase tracking-widest px-6 py-2.5 rounded-md hover:bg-[#b08a3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {state === 'uploading' ? 'Enviando...' : 'Confirmar upload'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
