# Separação Rendal e DCorp

Documento de contexto e acompanhamento da separação dos sites do Grupo Patrimonial.

## 1. O que o cliente pediu

### Rendal

A Rendal deve ser apresentada como uma incorporadora e desenvolvedora imobiliária independente, com foco em:

- Desenvolvimento e incorporação de empreendimentos;
- Casas e condomínios residenciais;
- Identificação e aquisição de terrenos;
- Estudos de viabilidade;
- Estruturação jurídica, societária e financeira;
- Aprovações e licenciamento;
- Constituição e gestão de SPEs;
- Relacionamento com investidores e proprietários de áreas;
- Coordenação de projetos e comercialização.

O site deve conversar com proprietários de terrenos, investidores, parceiros, compradores e imobiliárias.

Sugestão de navegação:

- Início;
- A Rendal;
- Empreendimentos;
- Para proprietários de áreas;
- Para investidores;
- Parceiros;
- Contato.

### DCorp

A DCorp deve ser apresentada como uma empresa independente de engenharia e construção, com foco em:

- Construção de casas;
- Condomínios residenciais;
- Obras térreas;
- Barracões;
- Sistemas construtivos industrializados;
- Planejamento e execução de obras;
- Orçamentação e engenharia de custos;
- Compatibilização de projetos;
- Gestão e controle de cronogramas;
- Gerenciamento e fiscalização;
- Prestação de serviços para incorporadoras, investidores e terceiros.

A comunicação da DCorp não deve prometer atuação em prédios altos se essa não for uma frente real da empresa.

Devem ficar fora do site da DCorp:

- Topografia;
- Georreferenciamento;
- Meio ambiente;
- Serviços de incorporação;
- Linguagem que apresente a DCorp como departamento da Rendal.

Sugestão de navegação:

- Início;
- A DCorp;
- Sistemas construtivos;
- Serviços;
- Obras e portfólio;
- Seja nosso parceiro;
- Solicite um orçamento;
- Contato.

### Relação entre as empresas

- Rendal e DCorp pertencem ao mesmo grupo econômico, mas devem ter vida própria;
- Uma pode ser parceira da outra;
- A Rendal pode contratar a DCorp, mas não depende exclusivamente dela;
- A DCorp pode atender a Rendal e também clientes externos;
- A holding deve aparecer apenas de maneira institucional e discreta;
- Os dois sites não devem ter o mesmo menu, textos, imagens, portfólio, SEO ou chamadas comerciais.

Texto institucional possível:

> Empresa integrante da Paiva & Lopes Holding.

## 2. Diretriz visual

### Rendal

Deve transmitir:

- Incorporação;
- Visão de negócio;
- Desenvolvimento imobiliário;
- Segurança;
- Sofisticação;
- Valorização de ativos;
- Empreendimentos residenciais.

As imagens devem priorizar casas, condomínios, áreas urbanizadas, arquitetura, projetos e pessoas relacionadas ao negócio imobiliário.

### DCorp

Deve transmitir:

- Engenharia;
- Execução;
- Produtividade;
- Controle;
- Tecnologia construtiva;
- Equipes e etapas de obra;
- Casas e estruturas térreas.

A animação ou imagem genérica de prédio alto não deve ser usada como representação de uma obra executada pela DCorp. O cliente informou que atualmente está mais focado em casas, barracões e obras térreas.

## 3. O que foi feito no repositório

### Estrutura de aplicações

O antigo Next.js único foi transformado em um workspace com três entrypoints:

```text
frontend/
  apps/
    rendal/       → site público da Rendal
    dcorp/        → site público da DCorp
    dashboard/    → painel compartilhado
  packages/
    site-config/  → configuração comum de identidade e navegação
```

### Rendal

- Criada a aplicação `frontend/apps/rendal`;
- Metadata própria;
- Logo, menu e chamadas da Rendal;
- Rotas públicas de início, empreendimentos, investidores, quem somos e contato;
- Formulário de contato direcionado diretamente para a Rendal;
- Linguagem principal baseada em incorporação e desenvolvimento imobiliário.

### DCorp

- Criada a aplicação `frontend/apps/dcorp`;
- Metadata própria;
- Logo, menu e chamadas da DCorp;
- Rotas públicas de início, sistemas construtivos, serviços, obras, quem somos e contato;
- Formulário de contato direcionado diretamente para a DCorp;
- Textos ajustados para casas, condomínios, barracões e construção térrea;
- Removidas referências que apresentavam a DCorp como executora exclusiva da Rendal;
- Removidos do fluxo principal os serviços de topografia, georreferenciamento e meio ambiente;
- Hero alterado de “Construtora” para “Construção”.

### Dashboard

- Criada a aplicação `frontend/apps/dashboard`;
- Login preservado;
- Rotas de dashboard preservadas;
- Upload de imagens preservado;
- API de upload preservada;
- Dashboard compartilhado entre as duas marcas;
- Filtro de páginas por Rendal, DCorp e conteúdo compartilhado;
- Identificação de marca adicionada em `frontend/src/lib/content/brand.ts`.

Atualmente a marca é inferida pelo slug da página. O próximo refinamento recomendado é persistir um campo `brand` diretamente na tabela de conteúdo do Supabase.

### Código compartilhado

- Criado shell independente em `frontend/src/components/site/SiteShell.tsx`;
- Criado contato direto por empresa em `frontend/src/components/site/SiteContactPage.tsx`;
- Criado pacote `frontend/packages/site-config`;
- Lógica existente de contato, Supabase, Resend, Turnstile, Upstash e Blob continua reutilizada durante a migração;
- O código legado foi preservado para permitir uma migração incremental.

### CSS e build

Foi corrigido o problema em que as aplicações novas carregavam o CSS base, mas não geravam as classes utilitárias do Tailwind. A origem de escaneamento foi adicionada em:

```text
frontend/src/app/globals.css
```

Os builds validados foram:

```text
npm run build:rendal
npm run build:dcorp
npm run build:dashboard
npm run build
```

Todos passaram após a correção.

## 4. Como executar localmente

Na pasta `frontend`:

```bash
npm install
```

Rendal:

```bash
npm run dev --workspace @grupo-patrimonial/rendal -- --port 3001
```

DCorp:

```bash
npm run dev --workspace @grupo-patrimonial/dcorp -- --port 3002
```

Dashboard:

```bash
npm run dev --workspace @grupo-patrimonial/dashboard
```

## 5. Configuração planejada na Vercel

Devem existir três projetos Vercel apontando para o mesmo repositório:

| Projeto | Root Directory | Domínio |
| --- | --- | --- |
| Rendal | `frontend/apps/rendal` | domínio da Rendal |
| DCorp | `frontend/apps/dcorp` | domínio da DCorp |
| Dashboard | `frontend/apps/dashboard` | subdomínio administrativo |

As variáveis de ambiente precisam ser configuradas por projeto. Segredos como `SUPABASE_SERVICE_ROLE_KEY`, `BLOB_READ_WRITE_TOKEN`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` e `ADMIN_PASSWORD` nunca devem ser expostos no frontend.

## 6. Pendências

- Criar e vincular os três projetos na Vercel;
- Associar os domínios reais;
- Confirmar os dados cadastrais, CNPJs, telefones e endereços;
- Substituir imagens genéricas por imagens reais autorizadas pelo cliente;
- Criar o portfólio real de cada empresa;
- Definir os sistemas construtivos efetivamente dominados pela DCorp;
- Validar o organograma e a relação jurídica entre Holding, Rendal, DCorp e SPEs;
- Persistir o campo `brand` no CMS/Supabase;
- Fazer a etapa visual final baseada nos manuais de identidade;
- Revisar SEO, títulos, descrições, Open Graph e conteúdo duplicado;
- Validar formulários em produção com os e-mails reais.
