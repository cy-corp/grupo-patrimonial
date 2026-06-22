import { createClient } from '@supabase/supabase-js'
import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export async function POST(req: NextRequest) {
  // 1. Extrai e valida o token JWT do Supabase
  const authHeader = req.headers.get('authorization')
  if (!authHeader) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Token inválido ou expirado.' }, { status: 401 })
  }

  // 2. Lê os dados do form
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Formulário inválido.' }, { status: 400 })
  }

  const file = form.get('file') as File
  const slotId = form.get('slot_id') as string
  const slotKey = form.get('slot_key') as string
  const pageSlug = (form.get('page_slug') || form.get('pageSlug')) as string
  const altText = form.get('alt_text') as string

  if (!file || !slotId || !slotKey || !pageSlug) {
    return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 })
  }

  // Validação de tipo e tamanho server-side
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Tipo de arquivo não permitido.' }, { status: 400 })
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'Arquivo maior que 5 MB.' }, { status: 400 })
  }

  try {
    // 3. Nomeação e Upload do Blob
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const blobPath = `images/${pageSlug}/${slotKey}/${timestamp}-${safeName}`

    const blob = await put(blobPath, file, {
      access: 'public',
      addRandomSuffix: false, // o timestamp já garante unicidade
    })

    // 4. Transação no banco: desativa imagem anterior e insere a nova
    const { error: updateError } = await supabase
      .from('images')
      .update({ is_active: false })
      .eq('slot_id', slotId)
      .eq('is_active', true)

    if (updateError) {
      console.error('Update Error:', updateError)
      return NextResponse.json({ error: 'Falha ao desativar imagem anterior.' }, { status: 500 })
    }

    const { error: dbError } = await supabase.from('images').insert({
      slot_id: slotId,
      uploaded_by: user.id,
      url: blob.url,
      storage_path: blob.pathname,
      alt_text: altText || null,
      is_active: true,
    })

    if (dbError) {
      console.error('DB Insert Error:', dbError)
      return NextResponse.json({ error: 'Erro ao salvar metadados no banco.' }, { status: 500 })
    }

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Upload Process Error:', error)
    return NextResponse.json({ error: 'Erro interno durante o processamento do upload.' }, { status: 500 })
  }
}
