# Aplicações do Grupo Patrimonial

As aplicações públicas foram separadas em entrypoints Next.js:

- `rendal`: site institucional e comercial da Rendal Incorporadora.
- `dcorp`: site institucional e comercial da DCorp Engenharia.
- `i3geo`: site institucional da i3Geo (topografia, georreferenciamento e meio ambiente).
- `dashboard`: painel compartilhado para autenticação, imagens e conteúdo das marcas.

Os entrypoints reutilizam componentes e integrações que ainda estão em `frontend/src` durante a migração. Isso permite validar cada deploy antes de mover definitivamente todos os módulos para `packages/`.

## Desenvolvimento

Na pasta `frontend`:

```bash
npm install
npm run build:rendal
npm run build:dcorp
npm run build:i3geo
npm run build:dashboard
```

Para desenvolvimento local, execute cada app em um terminal:

```bash
npm run dev:rendal
npm run dev:dcorp
npm run dev:i3geo
npm run dev:dashboard
```

## Projetos Vercel

Crie três projetos apontando para o mesmo repositório (um por domínio):

| Projeto | Root Directory | Install Command | Build Command | Domínio |
| --- | --- | --- | --- | --- |
| Rendal | `frontend/apps/rendal` | via `vercel.json` | `npm run build` | domínio da Rendal |
| DCorp | `frontend/apps/dcorp` | via `vercel.json` | `npm run build` | domínio da DCorp |
| i3Geo | `frontend/apps/i3geo` | via `vercel.json` | `npm run build` | domínio da i3Geo |
| Dashboard | `frontend/apps/dashboard` | via `vercel.json` | `npm run build` | subdomínio administrativo |

Cada `apps/*/vercel.json` instala o workspace em `frontend/`. O `outputFileTracingRoot` dos apps aponta para a raiz do repositório (onde a Vercel monta `/vercel/path0`), para o builder achar o `next` hoisted em `frontend/node_modules`.

As variáveis de ambiente devem ser configuradas em cada projeto. Os sites públicos precisam das variáveis do formulário e do Supabase; o dashboard precisa também de `SUPABASE_SERVICE_ROLE_KEY` e `BLOB_READ_WRITE_TOKEN`.

O painel identifica a marca pelo slug da página por meio de `src/lib/content/brand.ts`. O passo seguinte é persistir um campo `brand` na tabela de conteúdo quando o schema do Supabase estiver definido, mantendo o filtro atual como fallback compatível.
