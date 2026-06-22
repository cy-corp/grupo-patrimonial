-- =====================================================
-- Migration: Initialize Image Management Tables
-- Compatible with Supabase PostgreSQL
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS image_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    slot_key VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slot_id UUID NOT NULL REFERENCES image_slots(id) ON DELETE CASCADE,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    url TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT true,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Apenas uma imagem ativa por slot
CREATE UNIQUE INDEX IF NOT EXISTS idx_one_active_per_slot
ON images(slot_id)
WHERE is_active = true;


-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_pages_updated_at ON pages;

CREATE TRIGGER trg_pages_updated_at
BEFORE UPDATE ON pages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();


-- =====================================================
-- ENABLE RLS
-- =====================================================

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;


-- =====================================================
-- PAGES POLICIES
-- =====================================================

DROP POLICY IF EXISTS "pages: leitura pública" ON pages;

CREATE POLICY "pages: leitura pública"
ON pages
FOR SELECT
USING (true);


DROP POLICY IF EXISTS "pages: escrita autenticada" ON pages;

CREATE POLICY "pages: escrita autenticada"
ON pages
FOR ALL
USING (auth.role() = 'authenticated');


-- =====================================================
-- IMAGE SLOTS POLICIES
-- =====================================================

DROP POLICY IF EXISTS "slots: leitura pública" ON image_slots;

CREATE POLICY "slots: leitura pública"
ON image_slots
FOR SELECT
USING (true);


DROP POLICY IF EXISTS "slots: escrita autenticada" ON image_slots;

CREATE POLICY "slots: escrita autenticada"
ON image_slots
FOR ALL
USING (auth.role() = 'authenticated');


-- =====================================================
-- IMAGES POLICIES
-- =====================================================

DROP POLICY IF EXISTS "images: leitura pública" ON images;

CREATE POLICY "images: leitura pública"
ON images
FOR SELECT
USING (true);


DROP POLICY IF EXISTS "images: insert pelo dono" ON images;

CREATE POLICY "images: insert pelo dono"
ON images
FOR INSERT
WITH CHECK (
    auth.uid() = uploaded_by
);


DROP POLICY IF EXISTS "images: update pelo dono" ON images;

CREATE POLICY "images: update pelo dono"
ON images
FOR UPDATE
USING (
    auth.uid() = uploaded_by
);


-- =====================================================
-- SEED: PAGES
-- =====================================================

INSERT INTO pages (slug, name)
VALUES
('quem-somos', 'Quem Somos'),
('investidores', 'Investidores'),
('processos', 'Processos'),
('patrimonial', 'Patrimonial'),
('incorporadora', 'Incorporadora'),
('integracao', 'Integração'),
('imobiliaria', 'Imobiliária'),
('engenharia', 'Engenharia'),
('construtora', 'Construtora'),
('contato', 'Contato'),
('home', 'Home')
ON CONFLICT (slug)
DO UPDATE SET
name = EXCLUDED.name;


-- =====================================================
-- SEED: IMAGE SLOTS
-- =====================================================

INSERT INTO image_slots (page_id, slot_key, label, description)
VALUES

((SELECT id FROM pages WHERE slug='quem-somos'),
'quem_somos_hero',
'Hero Banner',
'Imagem principal da seção Quem Somos'),

((SELECT id FROM pages WHERE slug='investidores'),
'investidores_hero',
'Hero Banner',
'Imagem principal da seção Investidores'),

((SELECT id FROM pages WHERE slug='processos'),
'processos_hero',
'Hero Banner',
'Imagem principal da seção Processos'),

((SELECT id FROM pages WHERE slug='processos'),
'processos_seal',
'Selo de Qualidade',
'Imagem do selo de qualidade'),

((SELECT id FROM pages WHERE slug='patrimonial'),
'patrimonial_hero',
'Hero Banner',
'Imagem principal da seção Patrimonial'),

((SELECT id FROM pages WHERE slug='incorporadora'),
'incorporadora_hero',
'Hero Banner',
'Imagem principal da seção Incorporadora'),

((SELECT id FROM pages WHERE slug='integracao'),
'integracao_hero',
'Hero Banner',
'Imagem principal da seção Integração'),

((SELECT id FROM pages WHERE slug='imobiliaria'),
'imobiliaria_hero',
'Hero Banner',
'Imagem principal da seção Imobiliária'),

((SELECT id FROM pages WHERE slug='imobiliaria'),
'imobiliaria_excellence',
'Excelência Técnica',
'Imagem da excelência técnica'),

((SELECT id FROM pages WHERE slug='engenharia'),
'engenharia_hero',
'Hero Banner',
'Imagem principal da seção Engenharia'),

((SELECT id FROM pages WHERE slug='construtora'),
'construtora_hero',
'Hero Banner',
'Imagem principal da seção Construtora'),

((SELECT id FROM pages WHERE slug='construtora'),
'construtora_execution',
'Execução de Obra',
'Imagem de execução da obra'),

((SELECT id FROM pages WHERE slug='contato'),
'contato_hero',
'Hero Banner',
'Imagem principal da seção Contato')

ON CONFLICT (slot_key)
DO UPDATE SET
label = EXCLUDED.label,
description = EXCLUDED.description;


-- =====================================================
-- SEED: INITIAL IMAGES
-- =====================================================

INSERT INTO images (
    slot_id,
    url,
    storage_path,
    alt_text,
    is_active
)
SELECT
    s.id,
    v.url,
    v.storage_path,
    v.alt_text,
    true
FROM image_slots s
JOIN (
    VALUES

    ('quem_somos_hero',
    '/quem-somos/quem-somos-hero.jpg',
    'initial/quem-somos/quem-somos-hero.jpg',
    'Imagem de equipe'),

    ('investidores_hero',
    '/investidores/investor-hero.jpg',
    'initial/investidores/investor-hero.jpg',
    'Imagem investidores'),

    ('processos_hero',
    '/processos/processos-hero.jpg',
    'initial/processos/processos-hero.jpg',
    'Imagem processos'),

    ('processos_seal',
    '/processos/quality-seal.png',
    'initial/processos/quality-seal.png',
    'Selo de qualidade'),

    ('patrimonial_hero',
    '/patrimonial/patrimonial-hero.jpg',
    'initial/patrimonial/patrimonial-hero.jpg',
    'Imagem patrimonial'),

    ('incorporadora_hero',
    '/incorporadora/incorporadora-hero.jpg',
    'initial/incorporadora/incorporadora-hero.jpg',
    'Imagem incorporadora'),

    ('integracao_hero',
    '/integracao/integracao-hero.jpg',
    'initial/integracao/integracao-hero.jpg',
    'Imagem integração'),

    ('imobiliaria_hero',
    '/imobiliaria/imobiliaria-hero.jpg',
    'initial/imobiliaria/imobiliaria-hero.jpg',
    'Imagem imobiliária'),

    ('imobiliaria_excellence',
    '/imobiliaria/arquitetura-negocio.jpg',
    'initial/imobiliaria/arquitetura-negocio.jpg',
    'Arquitetura de negócio'),

    ('engenharia_hero',
    '/engenharia/engenharia-hero.jpg',
    'initial/engenharia/engenharia-hero.jpg',
    'Imagem engenharia'),

    ('construtora_hero',
    '/construtora/construtora-hero.jpg',
    'initial/construtora/construtora-hero.jpg',
    'Imagem construtora'),

    ('construtora_execution',
    '/construtora-execucao.jpg',
    'initial/construtora-execucao.jpg',
    'Execução de obra')

) AS v(slot_key, url, storage_path, alt_text)
ON s.slot_key = v.slot_key

WHERE NOT EXISTS (
    SELECT 1
    FROM images i
    WHERE i.slot_id = s.id
      AND i.is_active = true
);


-- =====================================================
-- GRANTS
-- =====================================================

GRANT USAGE ON SCHEMA public
TO anon, authenticated, service_role;

GRANT ALL ON ALL TABLES IN SCHEMA public
TO postgres, anon, authenticated, service_role;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public
TO postgres, anon, authenticated, service_role;

GRANT ALL ON ALL FUNCTIONS IN SCHEMA public
TO postgres, anon, authenticated, service_role;