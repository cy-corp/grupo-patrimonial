-- Inserts para as páginas públicas mapeadas na landing page
-- O uso de ON CONFLICT DO NOTHING evita duplicidade caso o script seja rodado mais de uma vez

INSERT INTO pages (slug, name) VALUES
  ('home', 'Home (Página Inicial)'),
  ('quem-somos', 'Quem Somos'),
  ('engenharia', 'Engenharia'),
  ('incorporadora', 'Incorporadora'),
  ('construtora', 'Construtora'),
  ('imobiliaria', 'Imobiliária'),
  ('patrimonial', 'Patrimonial'),
  ('integracao', 'Integração'),
  ('investidores', 'Investidores'),
  ('contato', 'Contato'),
  ('orcamento', 'Orçamento')
ON CONFLICT (slug) DO NOTHING;
