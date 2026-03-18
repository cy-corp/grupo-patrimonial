# Image Upload — Vercel Blob + Supabase Auth + Next.js

## Visão geral

As imagens da landing page são armazenadas no **Vercel Blob** e gerenciadas via dashboard pelo cliente. A autenticação é feita pelo **Supabase Auth** — o token JWT gerado no login é enviado junto ao upload e validado na API Route do Next.js antes de qualquer operação de escrita.

- **GET** (leitura): público. As URLs do Vercel Blob são acessíveis diretamente no `<img>`, sem autenticação.
- **PUT** (escrita): privado. Só usuários autenticados via Supabase podem fazer upload.

```
Cliente (browser)
  │
  ├─ GET /imagem → URL pública do Vercel Blob (sem autenticação)
  │
  └─ POST /api/upload
        │  Authorization: Bearer <supabase_jwt>
        │
        ├─ Valida JWT → Supabase Auth
        ├─ Upload do arquivo → Vercel Blob (server-side)
        └─ Salva URL + metadata → Supabase (tabela images)
```

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js (App Router) |
| Autenticação | Supabase Auth |
| Storage de arquivos | Vercel Blob |
| Banco de dados | Supabase (PostgreSQL) |

---

## Variáveis de ambiente

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # nunca expor no frontend

# Vercel Blob (gerado automaticamente ao conectar o Blob Store no dashboard da Vercel)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

> `SUPABASE_SERVICE_ROLE_KEY` e `BLOB_READ_WRITE_TOKEN` são segredos de servidor.
> Nunca prefixe com `NEXT_PUBLIC_` — eles não devem ser expostos ao browser.

---

## Banco de dados (Supabase)

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE pages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        VARCHAR(100) UNIQUE NOT NULL,
  name        VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE image_slots (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id     UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  slot_key    VARCHAR(100) UNIQUE NOT NULL, -- ex: hero_banner, logo, testimonial_1
  label       VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE images (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slot_id       UUID NOT NULL REFERENCES image_slots(id) ON DELETE CASCADE,
  uploaded_by   UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  url           TEXT NOT NULL,          -- URL pública do Vercel Blob
  storage_path  TEXT NOT NULL,          -- pathname interno no Blob Store
  alt_text      VARCHAR(255),
  is_active     BOOLEAN DEFAULT true,
  uploaded_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- garante no banco que só uma imagem fica ativa por slot
CREATE UNIQUE INDEX idx_one_active_per_slot
  ON images(slot_id)
  WHERE is_active = true;

-- atualiza updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE pages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE images      ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pages: leitura pública"     ON pages       FOR SELECT USING (true);
CREATE POLICY "pages: escrita autenticada" ON pages       FOR ALL    USING (auth.role() = 'authenticated');
CREATE POLICY "slots: leitura pública"     ON image_slots FOR SELECT USING (true);
CREATE POLICY "slots: escrita autenticada" ON image_slots FOR ALL    USING (auth.role() = 'authenticated');
CREATE POLICY "images: leitura pública"    ON images      FOR SELECT USING (true);
CREATE POLICY "images: insert pelo dono"   ON images      FOR INSERT WITH CHECK (auth.uid() = uploaded_by);
CREATE POLICY "images: update pelo dono"   ON images      FOR UPDATE USING     (auth.uid() = uploaded_by);
```

---

## API Route — Upload (`/api/upload/route.ts`)

Responsável por validar o JWT do Supabase, fazer o upload para o Vercel Blob e registrar os metadados no banco.

```ts
import { createClient } from '@supabase/supabase-js'
import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // 1. extrai e valida o token JWT do supabase
  const authHeader = req.headers.get('authorization')
  if (!authHeader) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }

  // 2. lê os dados do form
  const form = await req.formData()
  const file    = form.get('file')     as File
  const slotId  = form.get('slot_id')  as string
  const slotKey = form.get('slot_key') as string

  if (!file || !slotId || !slotKey) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
  }

  // 3. faz o upload para o vercel blob (server-side, sem custo de data transfer extra)
  const blob = await put(`images/${slotKey}/${file.name}`, file, {
    access: 'public',
    addRandomSuffix: true, // evita colisões e trata blobs como imutáveis
  })

  // 4. desativa a imagem anterior do slot e insere a nova
  await supabase
    .from('images')
    .update({ is_active: false })
    .eq('slot_id', slotId)

  const { error: dbError } = await supabase.from('images').insert({
    slot_id:      slotId,
    uploaded_by:  user.id,
    url:          blob.url,
    storage_path: blob.pathname,
    is_active:    true,
  })

  if (dbError) {
    return NextResponse.json({ error: 'Erro ao salvar no banco' }, { status: 500 })
  }

  return NextResponse.json({ url: blob.url })
}
```

---

## Frontend — Hook de upload (`hooks/useImageUpload.ts`)

```ts
import { useCallback, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type UploadState = 'idle' | 'uploading' | 'success' | 'error'

export function useImageUpload() {
  const [state, setState] = useState<UploadState>('idle')
  const supabase = createClient()

  const upload = useCallback(async (
    file: File,
    slotId: string,
    slotKey: string
  ): Promise<string | null> => {
    setState('uploading')

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      setState('error')
      return null
    }

    const form = new FormData()
    form.append('file', file)
    form.append('slot_id', slotId)
    form.append('slot_key', slotKey)

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.access_token}` },
      body: form,
    })

    if (!res.ok) {
      setState('error')
      return null
    }

    const { url } = await res.json()
    setState('success')
    return url
  }, [supabase])

  return { upload, state }
}
```

---

## Frontend — Exibição da imagem ativa

O GET não precisa de autenticação. Basta buscar a URL no Supabase e usar diretamente no `<img>`.

```tsx
// app/page.tsx (ou qualquer Server Component)
import { createClient } from '@/lib/supabase/server'

export default async function HeroBanner() {
  const supabase = createClient()

  const { data } = await supabase
    .from('images')
    .select('url, alt_text')
    .eq('slot_id', '<uuid-do-slot-hero_banner>')
    .eq('is_active', true)
    .single()

  if (!data) return null

  return (
    <img
      src={data.url}
      alt={data.alt_text ?? 'Hero banner'}
      // o vercel blob cacheia por até 1 mês por padrão
      // adicione ?v=timestamp na url caso queira forçar refresh imediato
    />
  )
}
```

---

## Fluxo completo

```
1. Cliente faz login
   └─ Supabase Auth retorna JWT (access_token)

2. Cliente seleciona imagem no dashboard
   └─ frontend chama useImageUpload()

3. Hook envia POST /api/upload
   ├─ Header: Authorization: Bearer <jwt>
   └─ Body: FormData { file, slot_id, slot_key }

4. API Route valida o JWT
   └─ supabase.auth.getUser(token) → confirma usuário autenticado

5. API Route faz upload server-side
   └─ put(pathname, file, { access: 'public' }) → Vercel Blob
      └─ retorna { url, pathname }

6. API Route atualiza o banco
   ├─ UPDATE images SET is_active = false WHERE slot_id = ?
   └─ INSERT images { slot_id, uploaded_by, url, storage_path, is_active: true }

7. Frontend recebe { url } e atualiza a UI

8. Landing page exibe a imagem
   └─ <img src={url} /> → GET direto ao CDN do Vercel Blob (público, sem auth)
```

---

## Boas práticas

**Blobs como imutáveis:** use sempre `addRandomSuffix: true` no `put()`. Em vez de sobrescrever arquivos, crie novos. O histórico fica na tabela `images` com `is_active = false`.

**Cache:** o Vercel Blob cacheia as imagens por até 1 mês. Se precisar que a troca apareça imediatamente após o upload, adicione um query param com timestamp na URL ao renderizar: `${url}?v=${Date.now()}`.

**Limpeza de blobs antigos:** as imagens antigas continuam no Blob Store mesmo com `is_active = false`. Implemente um cron job ou função periódica que chame `del()` do SDK para remover blobs órfãos e controlar custos de storage.

```ts
import { del } from '@vercel/blob'

// exemplo: deletar blobs inativos há mais de 30 dias
const { data } = await supabase
  .from('images')
  .select('storage_path')
  .eq('is_active', false)
  .lt('uploaded_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

for (const image of data ?? []) {
  await del(image.storage_path)
}
```

**Validação de tipo e tamanho:** antes de chamar `put()`, valide o arquivo na API Route:

```ts
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 5

if (!ALLOWED_TYPES.includes(file.type)) {
  return NextResponse.json({ error: 'Tipo de arquivo não permitido' }, { status: 400 })
}

if (file.size > MAX_SIZE_MB * 1024 * 1024) {
  return NextResponse.json({ error: 'Arquivo muito grande' }, { status: 400 })
}
```

---

## Dependências

```bash
npm install @supabase/supabase-js @supabase/ssr @vercel/blob
```
