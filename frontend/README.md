# Grupo Patrimonial — aplicações web

Workspace em **Next.js 15 (App Router)** com **TypeScript**, **Tailwind CSS**, **shadcn/ui** e **Framer Motion**.

As aplicações estão em `apps/`:

- `apps/rendal`: site independente da Rendal Incorporadora.
- `apps/dcorp`: site independente da DCorp Engenharia.
- `apps/dashboard`: painel compartilhado para as duas marcas.

Os módulos legados em `src/` continuam sendo reutilizados durante a migração incremental. O mapa de marca do dashboard está em `src/lib/content/brand.ts`.

## Como iniciar

1. Instale as dependências na pasta `frontend`:
   ```bash
   npm install
   ```
2. Copie `frontend/.env.example` para `frontend/.env.local` e preencha as chaves.
3. Execute o app desejado:

   ```bash
   npm run dev --workspace @grupo-patrimonial/rendal
   npm run dev --workspace @grupo-patrimonial/dcorp
   npm run dev --workspace @grupo-patrimonial/dashboard
   ```

Builds individuais:

```bash
npm run build:rendal
npm run build:dcorp
npm run build:dashboard
```

As configurações de publicação e os Root Directories da Vercel estão documentados em [apps/README.md](apps/README.md).

## Formulário de contato (Resend)

O contato envia dois e-mails por envio válido:

1. Interno para `CONTACT_EMAIL_RENDAL` ou `CONTACT_EMAIL_DCORP` (`replyTo` = e-mail do lead).
2. Confirmação para o visitante, do `noreply@` da mesma empresa.

Proteção no servidor: honeypot, Cloudflare Turnstile, validação de campos e rate limit no Upstash (IP, e-mail e par IP+e-mail).

Em **desenvolvimento**, Turnstile e Redis podem ficar vazios (o envio só roda com `RESEND_API_KEY` real). Em **produção**, Turnstile e Upstash são obrigatórios.

Domínios precisam estar verificados no Resend. Workspace ainda não é necessário para o código; sem MX, o e-mail interno pode ir para bounce até o Google estar no ar.

Turnstile de teste da Cloudflare (só local):

- Site key: `1x00000000000000000000AA`
- Secret: `1x0000000000000000000000000000000AA`

## Painel admin (`/admin`)

Upload de imagens via `ADMIN_PASSWORD` e Vercel Blob.
