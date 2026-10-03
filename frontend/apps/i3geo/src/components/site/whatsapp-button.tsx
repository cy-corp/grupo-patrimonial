import { whatsappLink } from "@/lib/content";

// Atalho fixo para o WhatsApp, presente em todas as páginas.
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a i3Geo no WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5 bg-[#03121A] rounded-full px-4 py-3 text-sm font-bold text-white shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)] transition-colors hover:bg-brand sm:bottom-6 sm:right-6"
    >
      <svg viewBox="0 0 24 24" className="size-5 text-orange" fill="currentColor" aria-hidden="true">
        <path d="M3 4h18v13H10l-5 4v-4H3V4Z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
