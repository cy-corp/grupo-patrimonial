# Grupo Patrimonial - Website

Projeto construído em **Next.js 15 (App Router)** com **TypeScript**, **Tailwind CSS**, **shadcn/ui**, e **Framer Motion**.

## 🚀 Como iniciar o projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto contendo as seguintes variáveis:
   ```env
   # Resend para envio de e-mails de formulários (Contato e Orçamento)
   RESEND_API_KEY="re_123456789"
   
   # Senha simples para acesso à página /admin
   ADMIN_PASSWORD="sua_senha_secreta_aqui"
   
   # Vercel Blob Token (para upload de imagens no admin)
   BLOB_READ_WRITE_TOKEN="vercel_blob_rw_123456789"
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

## ⚙️ Painel Admin (/admin)
Para facilitar o upload de imagens sem precisar de um CMS robusto nesta etapa:
1. Acesse `http://localhost:3000/admin`.
2. Insira a **Senha de Acesso** correspondente à variável `ADMIN_PASSWORD`.
3. Selecione a imagem e clique em enviar.
4. O link público direto da Vercel Blob será exibido logo abaixo, que pode ser copiado e utilizado nos códigos das páginas ou no banco de dados futuramente.

## 📚 Tecnologias Utilizadas
- **Next.js 15+** (App Router, Server Actions, Tipagem estrita)
- **Tailwind CSS v4** (Variáveis em globals.css usando a paleta oficial da marca)
- **Framer Motion** (Animações premium como hover, botões flutuantes e scroll reveal)
- **next-themes** (Modo Escuro Global)
- **Vercel Blob** (Armazenamento estático)
- **Resend** (Infraestrutura de e-mails para prospecção)
- **Lucide React** (Ícones padrão minimalista)
