# Grupo Rendal e DCorp — Website

Projeto em **Next.js 15 (App Router)** com **TypeScript**, **Tailwind CSS**, **shadcn/ui** e **Framer Motion**.

## Como iniciar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie `frontend/.env.example` para `frontend/.env.local` e preencha as chaves.
3. `npm run dev` e abra [http://localhost:3000](http://localhost:3000).

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
