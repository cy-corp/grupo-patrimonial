export function Contact() {
  return (
    <section id="contato">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Contato
          </h2>
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
