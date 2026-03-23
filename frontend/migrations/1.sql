-- extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- pages
CREATE TABLE pages (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug      VARCHAR(100) UNIQUE NOT NULL,
  name      VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- image_slots
CREATE TABLE image_slots (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id     UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  slot_key    VARCHAR(100) UNIQUE NOT NULL,
  label       VARCHAR(255) NOT NULL,
  description TEXT
);

COMMENT ON COLUMN image_slots.slot_key IS 'ex: hero_banner, logo, testimonial_1';

-- images
CREATE TABLE images (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slot_id       UUID NOT NULL REFERENCES image_slots(id) ON DELETE CASCADE,
  uploaded_by   UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  url           TEXT NOT NULL,
  storage_path  TEXT NOT NULL,
  alt_text      VARCHAR(255),
  is_active     BOOLEAN DEFAULT true,
  uploaded_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- garante que só uma imagem fique ativa por slot
CREATE UNIQUE INDEX idx_one_active_per_slot
  ON images(slot_id)
  WHERE is_active = true;

-- atualiza updated_at automaticamente em pages
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

-- pages e image_slots: leitura pública, escrita só para autenticados
CREATE POLICY "pages: leitura pública"
  ON pages FOR SELECT USING (true);

CREATE POLICY "pages: escrita autenticada"
  ON pages FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "slots: leitura pública"
  ON image_slots FOR SELECT USING (true);

CREATE POLICY "slots: escrita autenticada"
  ON image_slots FOR ALL
  USING (auth.role() = 'authenticated');

-- images: leitura pública, insert/update só pelo próprio usuário
CREATE POLICY "images: leitura pública"
  ON images FOR SELECT USING (true);

CREATE POLICY "images: insert pelo dono"
  ON images FOR INSERT
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "images: update pelo dono"
  ON images FOR UPDATE
  USING (auth.uid() = uploaded_by);

  -- Garante que o PostgREST consegue usar o schema public
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Garante as permissões base nas tabelas (o RLS continua protegendo as linhas depois disso)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE pages TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE image_slots TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE images TO anon, authenticated, service_role;
