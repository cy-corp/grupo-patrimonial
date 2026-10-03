export function Contact() {
  return (
    <section id="contato">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Contato
          </h2>
          <p className="mt-3 text-muted">
            Estrutura placeholder — formulário e canais entram depois.
          </p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              E-mail
            </p>
            <p className="text-muted">contato@i3geo.com.br</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Telefone
            </p>
            <p className="text-muted">(00) 0000-0000</p>
          </div>
        </div>
        <form className="mt-12 grid max-w-xl gap-4" aria-label="Contato">
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-foreground">Nome</span>
            <input
              type="text"
              name="name"
              disabled
              placeholder="Seu nome"
              className="border border-border bg-white px-3 py-2 text-foreground placeholder:text-gray-dark/50 disabled:opacity-60"
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-foreground">E-mail</span>
            <input
              type="email"
              name="email"
              disabled
              placeholder="voce@empresa.com"
              className="border border-border bg-white px-3 py-2 text-foreground placeholder:text-gray-dark/50 disabled:opacity-60"
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-foreground">Mensagem</span>
            <textarea
              name="message"
              disabled
              rows={4}
              placeholder="Como podemos ajudar?"
              className="border border-border bg-white px-3 py-2 text-foreground placeholder:text-gray-dark/50 disabled:opacity-60"
            />
          </label>
          <button
            type="button"
            disabled
            className="w-fit bg-brand px-5 py-3 text-sm font-semibold text-white opacity-60"
          >
            Enviar (em breve)
          </button>
        </form>
      </div>
    </section>
  );
}
