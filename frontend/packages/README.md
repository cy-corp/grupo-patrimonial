# Pacotes compartilhados

Os pacotes deste diretório são consumidos pelas aplicações em `apps/`.

- `site-config`: identidade, navegação e configuração pública comum das marcas.

Durante a migração, os módulos legados de contato, Supabase e componentes ainda vivem em `src/` para preservar compatibilidade com a aplicação original. Eles podem ser extraídos gradualmente para pacotes próprios depois que os três builds estiverem estabilizados.
