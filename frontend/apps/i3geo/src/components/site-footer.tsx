import { brand } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-graphite text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg font-bold">{brand.name}</p>
          <p className="mt-1 text-sm text-gray-light">{brand.positioning}</p>
        </div>
        <p className="text-sm text-gray-light">
          © {new Date().getFullYear()} {brand.name}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
