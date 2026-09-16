# Aplicações do Grupo Patrimonial

As aplicações públicas foram separadas em três entrypoints Next.js:

- `rendal`: site institucional e comercial da Rendal Incorporadora.
- `dcorp`: site institucional e comercial da DCorp Engenharia.
- `dashboard`: painel compartilhado para autenticação, imagens e conteúdo das duas marcas.

Os entrypoints reutilizam componentes e integrações que ainda estão em `frontend/src` durante a migração. Isso permite validar cada deploy antes de mover definitivamente todos os módulos para `packages/`.

## Desenvolvimento

Na pasta `frontend`:

```bash
npm install
npm run build:rendal
npm run build:dcorp
npm run build:dashboard
```

Para desenvolvimento local, execute cada app em um terminal:

```bash
npm run dev --workspace @grupo-patrimonial/rendal
npm run dev --workspace @grupo-patrimonial/dcorp
npm run dev --workspace @grupo-patrimonial/dashboard
```

## Projetos Vercel

Crie três projetos apontando para o mesmo repositório (um por domínio):

| Projeto | Root Directory | Install Command | Build Command | Domínio |
| --- | --- | --- | --- | --- |
| Rendal | `frontend/apps/rendal` | via `vercel.json` | `npm run build` | domínio da Rendal |
| DCorp | `frontend/apps/dcorp` | via `vercel.json` | `npm run build` | domínio da DCorp |
| Dashboard | `frontend/apps/dashboard` | via `vercel.json` | `npm run build` | subdomínio administrativo |

Cada `apps/*/vercel.json` instala o workspace em `frontend/` e cria symlinks de `next`/`react` no app. Sem isso, o pós-build da Vercel falha com `Cannot find module 'next/dist/compiled/next-server/server.runtime.prod.js'` porque o npm hoist deixa o `next` só na raiz do workspace.

As variáveis de ambiente devem ser configuradas em cada projeto. Os sites públicos precisam das variáveis do formulário e do Supabase; o dashboard precisa também de `SUPABASE_SERVICE_ROLE_KEY` e `BLOB_READ_WRITE_TOKEN`.

O painel identifica a marca pelo slug da página por meio de `src/lib/content/brand.ts`. O passo seguinte é persistir um campo `brand` na tabela de conteúdo quando o schema do Supabase estiver definido, mantendo o filtro atual como fallback compatível.
