import { createClient } from '@supabase/supabase-js';
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // 1. extrai e valida o token JWT do supabase
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  // 2. lê os dados do form
  const form = await req.formData();
  const file = form.get('file') as File;
  const slotId = form.get('slot_id') as string;
  const slotKey = form.get('slot_key') as string;

  if (!file || !slotId || !slotKey) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
  }

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const MAX_SIZE_MB = 5;

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Tipo de arquivo não permitido' }, { status: 400 });
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return NextResponse.json({ error: 'Arquivo muito grande' }, { status: 400 });
  }

  // 3. faz o upload para o vercel blob
  let blob;
  try {
    blob = await put(`images/${slotKey}/${file.name}`, file, {
      access: 'public',
      addRandomSuffix: true,
    });
  } catch (err: any) {
    console.error('Vercel Blob Error:', err);
    return NextResponse.json({ error: 'Erro ao enviar para Storage', details: err?.message || String(err) }, { status: 500 });
  }

  // 4. desativa a imagem anterior do slot e insere a nova
  await supabase
    .from('images')
    .update({ is_active: false })
    .eq('slot_id', slotId);

  const { error: dbError } = await supabase.from('images').insert({
    slot_id: slotId,
    uploaded_by: user.id,
    url: blob.url,
    storage_path: blob.pathname,
    is_active: true,
  });

  if (dbError) {
    return NextResponse.json({ error: 'Erro ao salvar no banco' }, { status: 500 });
  }

  return NextResponse.json({ url: blob.url });
}
