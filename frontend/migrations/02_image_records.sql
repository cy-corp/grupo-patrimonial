-- 02_image_records.sql
-- Insersão automatizada dos Slots de Imagem baseada no código-fonte, 
-- e vinculação das URLs atuais das imagens para o painel de administração.

DO $$
DECLARE
  v_admin_id UUID;
  
  -- Variáveis de ID das Páginas
  v_home_id UUID;
  v_quem_somos_id UUID;
  v_engenharia_id UUID;
  v_imobiliaria_id UUID;
  v_integracao_id UUID;
  v_patrimonial_id UUID;
  v_incorporadora_id UUID;
  v_construtora_id UUID;
  v_contato_id UUID;
  v_investidores_id UUID;

  -- Função aninhada para inserir slot + imagem
  v_slot_id UUID;
BEGIN
  -- Captura o primeiro usuário do BD para ser o "dono" do upload
  SELECT id INTO v_admin_id FROM auth.users ORDER BY created_at ASC LIMIT 1;
  
  IF v_admin_id IS NULL THEN
    RAISE EXCEPTION 'Nenhum usuário encontrado em auth.users. Crie um no Supabase primeiro.';
  END IF;

  -- Captura IDs das Páginas
  SELECT id INTO v_home_id FROM pages WHERE slug = 'home';
  SELECT id INTO v_quem_somos_id FROM pages WHERE slug = 'quem-somos';
  SELECT id INTO v_engenharia_id FROM pages WHERE slug = 'engenharia';
  SELECT id INTO v_imobiliaria_id FROM pages WHERE slug = 'imobiliaria';
  SELECT id INTO v_integracao_id FROM pages WHERE slug = 'integracao';
  SELECT id INTO v_patrimonial_id FROM pages WHERE slug = 'patrimonial';
  SELECT id INTO v_incorporadora_id FROM pages WHERE slug = 'incorporadora';
  SELECT id INTO v_construtora_id FROM pages WHERE slug = 'construtora';
  SELECT id INTO v_contato_id FROM pages WHERE slug = 'contato';
  SELECT id INTO v_investidores_id FROM pages WHERE slug = 'investidores';

  -- ==========================================
  -- HOME
  -- ==========================================
  IF v_home_id IS NOT NULL THEN
    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_home_id, 'home_hero_bg', 'Hero (Fundo Principal)', 'Imagem de fundo do primeiro bloco (arquitetura)')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHOGhjAPWosOO_TkxO1MqXh8n3K5HG6Y4z3X12g1HFnmW4OGj3ey79MUAL1uviZhVRnpq_GRZcthskaYQ9tlAlDcHmpySWlxWetSkfwfnAKbkKyLoQHlyGFf6QI4zj0xzam8zpGbTe-jfVttdg7t617yaWRSpllVUKJQxT_UXV80fXrcrwkBfXp3wZVfu6mSog-dLIvMTVV6ru6SYelgGo1R54YmYTvT28LaGpUCFvAFMX54G6Xqq2srsI_3tN7b3bdiKjUAiES5tN', 'legacy/home_hero_bg', 'Architectural background')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_home_id, 'home_solution_01', 'Solução 01: Engenharia', 'Imagem card 1')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwmhfo5VO5azhdJ59VSp_GDpiaWRlreFvyGDiSvliGHDEE2tDj55T4eX7YYicSDQqSqjE6ULd1rcXA20A95bcHQmfwIwVC9UwkFvae6Xt_IZIZiGyaekm4AdGrgWy5VLfLPrm-3BCCFo2gXEeFHD3HvOvItMbmey-xYAfUAjMot4t5K2BYh6lSrOpfVuwLu4IRG5qjdSubBWsKRVyUxfKpGs_YqwkeEFNryzCDpk7xhHZDXP7KXPekXoZ195THWvgEs9S71WoH6zja', 'legacy/home_solution_01', 'Engenharia de Valor')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_home_id, 'home_solution_02', 'Solução 02: Incorporação', 'Imagem card 2')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnYUxNlzu8SwPfc-1drAvb-FKkSsIvGmsNQdZjKHB1MmksD7_w1pfGlhC8lmC_IMBpJ3IG0HGuCRss9ADvmHPqLhGRpoxxB4vEQn0G4AB5n59wJQgJNBygrZ_H2jMxb3sHjTeqHwuRDMFaIMs5mHYfMazLsdM6MWb4NMZ6uS8SjVW3eUaXg_WRJ9GbRb5gan8oii1vKbL2C-jbB4i86e_Mjbt-vzTNMg9FrvnO60LvRyEqbVH05a7duYT0iS6-ZLdL3WjAxnZ0kJSp', 'legacy/home_solution_02', 'Incorporação Imobiliária')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_home_id, 'home_solution_03', 'Solução 03: Construção', 'Imagem card 3')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGUM4Dl1rGMeef9moXK_QpyQKqCCtKnDfgWDU6CrXfZaVZspRvmz7IKANRFAWH6cAaE2rWO1CHDpwX2gdAX069SgnkW15GUDGJJgR_UMhVsjgKC_7_75QJ3kenK9kVyk2RRFXO8XZS_mbbZ-aitRDW-GQw8-NkaGb-aUq94L4G3w_xeEbQ84JaMqVM3j5GtVUWT0Q9x4sVYizd6MG6yb73UaoPA3a8CEb9R79lM1c6Mg1uqCoeBpkQoUfKuNxY_ravreTD8c0Bojez', 'legacy/home_solution_03', 'Construção de Alto Padrão')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_home_id, 'home_solution_04', 'Solução 04: Consultoria', 'Imagem card 4')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxuSIWMnlTiMXPZk10g8GrupAJgDdyuVBeo7QEiS1NriT1b86Z_lTr48Rn-xjtxtvF58Uf73LRfwEJ7_ArJrBeQlLZXhjMziPlDY7U83PxVZShOEk1nXofIWV70d3nJGRfyx14x1w7WcItjDNhj8hCtBiN5ziC5619RODP7mlskfIu9lLiUDjbhWno57L00BGVXD56NIIW2myJlHjBOjoAkykVZYeTgyofhOkd7K205rCZcSjj1dsu3MNRR2aD_hP2ejPhFBl-5PRh', 'legacy/home_solution_04', 'Consultoria Imobiliária')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_home_id, 'home_solution_05', 'Solução 05: Patrimonial', 'Imagem card 5')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAadLuNLQ2k1tMM8eCzQ8h488Ap5Ufv8EoGv8RhM9em2RmSIjwc4pJfSOvoqyPtR_Rx4lKipPzlycw7cgQVZsKQsmfbuew6lExt2PAGXB7-2Q81xHpci-o0wTtg_vg177sxveGYjK38p_HJUGY5J6XcpykjVKyY3E2YwidsW98AXIic5dRhhi22gBHZciaJi7R3UEiv8uxTKww_iMdbPnm1lBZNyzuvAc676ZsQzXh3B9n69RtMQ4cFH-pLmKNnPi3pBkdd0AhtPd4a', 'legacy/home_solution_05', 'Gestão Patrimonial')
    ON CONFLICT DO NOTHING;
  END IF;

  -- ==========================================
  -- QUEM SOMOS
  -- ==========================================
  IF v_quem_somos_id IS NOT NULL THEN
    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_quem_somos_id, 'quem_somos_hero_bg', 'Hero (Fundo Institucional)', 'Imagem do prédio moderno')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkTT1Tt34prZGqrVJ_93OTbaG-Jmex4B3wcT5CNEUyuzEmAdpVkavI2Nb76bqWmxvUW_ZWWqFs6JO7BNfUwEAh7ib-dguD5etqN9dzqr9mfy37JWr_mXlNDFrWPQN0uJsUgHtfwH1FExYLmajI5Oc2Srcbnr6tnMCwylQHRgsfxpmZYODNnrwNLGMZlOoBtxcz1EyeqAUvWUEtqsKkfhIOKPI_gM5AHU1TnKpn7lUjvNgX2uFkaqKdcw3i5Ll2XISaWuou_p-dkGph', 'legacy/quem_somos_hero', 'Prédio Moderno')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_quem_somos_id, 'quem_somos_partner_1', 'Sócio: Dener Lopes', 'Foto perfil do sócio Dener')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, '/dener-lopes.png', 'legacy/dener-lopes.png', 'Dener Lopes')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_quem_somos_id, 'quem_somos_partner_2', 'Sócio: Lucas Azevedo', 'Foto perfil do sócio Lucas')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, '/lucas-azevedo.png', 'legacy/lucas-azevedo.png', 'Lucas Azevedo')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_quem_somos_id, 'quem_somos_partner_3', 'Sócio: Adermis Marini', 'Foto perfil do sócio Adermis')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, '/adermis-marini.png', 'legacy/adermis-marini.png', 'Adermis Marini')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_quem_somos_id, 'quem_somos_partner_4', 'Sócio: Beto Gallo', 'Foto perfil do sócio Beto')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, '/beto-gallo.png', 'legacy/beto-gallo.png', 'Beto Gallo')
    ON CONFLICT DO NOTHING;
  END IF;

  -- ==========================================
  -- ENGENHARIA
  -- ==========================================
  IF v_engenharia_id IS NOT NULL THEN
    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_engenharia_id, 'eng_hero_bg', 'Hero (Engenharia Civil)', 'Imagem fundo header')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop', 'legacy/eng_hero_bg', 'Construção')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_engenharia_id, 'eng_methodology', 'Imagem de Metodologia', 'Engenheiro em obra')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop', 'legacy/eng_methodology', 'Metodologia')
    ON CONFLICT DO NOTHING;
  END IF;

  -- ==========================================
  -- IMOBILIÁRIA
  -- ==========================================
  IF v_imobiliaria_id IS NOT NULL THEN
    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_imobiliaria_id, 'imob_hero_bg', 'Hero (Imobiliária)', 'Imagem alto padrão')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000&auto=format&fit=crop', 'legacy/imob_hero_bg', 'Imóvel de alto padrão')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_imobiliaria_id, 'imob_feature', 'Imagem Seu Imóvel em Boas Mãos', 'Imagem de ativo imobiliário')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', 'legacy/imob_feature', 'Imóvel de luxo')
    ON CONFLICT DO NOTHING;
  END IF;

  -- ==========================================
  -- INTEGRAÇÃO
  -- ==========================================
  IF v_integracao_id IS NOT NULL THEN
    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_integracao_id, 'integracao_hero_bg', 'Hero (Equipe Integrada)', 'Visão da estrutura')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=2000&auto=format&fit=crop', 'legacy/integracao_hero_bg', 'Equipe integrada')
    ON CONFLICT DO NOTHING;
  END IF;

  -- ==========================================
  -- PATRIMONIAL
  -- ==========================================
  IF v_patrimonial_id IS NOT NULL THEN
    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_patrimonial_id, 'patrimonial_hero_bg', 'Hero (Patrimônio)', 'Imagem do blindagem patrimonial')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop', 'legacy/patrimonial_hero_bg', 'Gestão')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_patrimonial_id, 'patrimonial_meeting', 'Imagem Família/Planejamento', 'Reunião de planejamento')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop', 'legacy/patrimonial_meeting', 'Reunião')
    ON CONFLICT DO NOTHING;
  END IF;

  -- ==========================================
  -- INCORPORADORA
  -- ==========================================
  IF v_incorporadora_id IS NOT NULL THEN
    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_incorporadora_id, 'incorporadora_hero_bg', 'Hero (Desenvolvimento Imobiliário)', 'Imagem prédio moderno')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop', 'legacy/incorporadora_hero_bg', 'Empreendimento')
    ON CONFLICT DO NOTHING;
  END IF;

  -- ==========================================
  -- CONSTRUTORA
  -- ==========================================
  IF v_construtora_id IS NOT NULL THEN
    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_construtora_id, 'construtora_hero_bg', 'Hero (Construção)', 'Imagem canteiro de obras')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=2000&auto=format&fit=crop', 'legacy/construtora_hero_bg', 'Obra')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_construtora_id, 'construtora_management', 'Imagem Gestão de Obra', 'Técnicos acompanhando obras')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1200&auto=format&fit=crop', 'legacy/construtora_management', 'Gestão')
    ON CONFLICT DO NOTHING;
  END IF;

  -- ==========================================
  -- CONTATO
  -- ==========================================
  IF v_contato_id IS NOT NULL THEN
    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_contato_id, 'contato_hero_bg', 'Hero (Arquitetura Luxo)', 'Background da aba contato')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', 'legacy/contato_hero_bg', 'Arquitetura')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_contato_id, 'contato_vault_bg', 'Imagem Lateral Formulário', 'Vault The Experience')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', 'legacy/contato_vault_bg', 'Vault Experience')
    ON CONFLICT DO NOTHING;
  END IF;

  -- ==========================================
  -- INVESTIDORES
  -- ==========================================
  IF v_investidores_id IS NOT NULL THEN
    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_investidores_id, 'invest_hero_bg', 'Hero (Monocromático Skyscraper)', 'Fundo de Investimentos')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeqdsLOOfmjOONOKUAEYy_tandQeYopNUCtb1CjG_vTdG1KUTZUuJSFJS-4-216beTcl7M5PTbrnufp1yhQNyzIJbgnid92zV0Odoobmak4ws9kwm4eXPTjBbx_XJx4z0zzKH0LlX6k_TgLZV5EhiurzCUE7Z_mSY-GR6Zv710rOODLxoCvfS9nySWtkkHeDY9nJzHGqw8FsfputjPrLXhOH1PDK4qqaCXhmuoVdaeWxzmowupztkcHOL9FWf4ibxpuyBCaddqMmkR', 'legacy/invest_hero_bg', 'Skyscraper')
    ON CONFLICT DO NOTHING;

    INSERT INTO image_slots (page_id, slot_key, label, description) VALUES 
      (v_investidores_id, 'invest_models_bg', 'Background Card Gestão Ativos', 'Card largo em modelos de negócio')
    ON CONFLICT (slot_key) DO UPDATE SET id = image_slots.id RETURNING id INTO v_slot_id;
    INSERT INTO images (slot_id, uploaded_by, url, storage_path, alt_text) VALUES 
      (v_slot_id, v_admin_id, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyzVzPrraYp-EpdBOYfPJVcchgx9RsPc-wXURzys8dJ53yXQtQpWxXtoDqM7WEDP3EVmTdsYbr14hGWfde-M7mT58BjKQHwXL5nrEat3o6jmzpAYBTKy9SQCWunVXP_2YSIf2VNVmS7ZdRaBofLQtUbfmZUi2GWUDjvYH9wGMjDBlnmKraDj9uXuTDhYv_NGELI0kBWZwytJXLmbPwUWNDPsFhQhpa9KnLUlhhLLI24ditrM6drLQQH7hzU0_whcdH1aoStZz6YYgD', 'legacy/invest_models_bg', 'Ativos')
    ON CONFLICT DO NOTHING;
  END IF;

END $$;
