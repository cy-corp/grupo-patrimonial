# Spec — Site Rendal: telas restantes (orquestradora)

> Documento de hand-off para agentes de implementação.
> Define **o que vai em cada tela**, **como será construída**, **tecnologias, libs e contratos compartilhados**.
> Não contém implementação. Cada tela pode virar uma spec filha (`RENDAL-TELA-<ROTA>-SPEC.md`) quando for executada.

Documentos-base (ler antes):

- [RENDAL-CONTEXTO-MARCA.md](./RENDAL-CONTEXTO-MARCA.md) — discurso, pilares, tom, o que evitar
- [RENDAL-IDENTIDADE-VISUAL.md](./RENDAL-IDENTIDADE-VISUAL.md) — paleta, tipografia, restrições da marca
- [SEPARACAO-RENDAL-DCORP.md](./SEPARACAO-RENDAL-DCORP.md) — escopo da Rendal, navegação sugerida pelo cliente, relação com DCorp
- [RENDAL-FOOTER-DIORAMA-SPEC.md](./RENDAL-FOOTER-DIORAMA-SPEC.md) — footer 3D (já integrado)

---

## 0. Resumo executivo

A home (`/`, concept) está pronta e **é a fonte da verdade visual e de tom**. As demais telas ainda reexportam páginas legadas do site unificado (`GoldButton`, títulos `font-black uppercase`, `#0F172A`) ou nem existem.

Objetivo: entregar as telas restantes com o **mesmo sistema da home** — cream `#F8F1E3`, grafite `#1F1F1F` (CTA), terra `#7A4A2B` (labels/acento), dourado pontual, `font-semibold tracking-tight`, cards `rounded-2xl/4xl`, CTAs pílula, reveal com blur — e, em cada tela, **uma única peça "fora da caixa"** que prove o método Rendal, projetada primeiro para o polegar.

| Rota | Estado hoje | Ação |
|------|-------------|------|
| `/` | Pronta (concept) | Só ajustes globais (nav, links) |
| `/quem-somos` (A Rendal) | Legado unificado | **Refazer** |
| `/empreendimentos` | Parcial (1 card, hero escuro) | **Refazer** no padrão |
| `/empreendimentos/[slug]` | Não existe | **Criar** |
| `/proprietarios` | Não existe | **Criar** |
| `/investidores` | Legado unificado | **Refazer** |
| `/parceiros` | Não existe | **Criar** |
| `/contato` | Genérico compartilhado | **Refazer** (roteamento por perfil) |
| `/politica-de-privacidade` | Existe | Restyle leve |
| `not-found`, `loading` | Não existem | **Criar** |
| `/concept` | Duplicata da home, `noindex` | Manter como sandbox ou remover |

---

## 1. Princípios (valem para todas as telas)

### 1.1 Tom e texto

Herdar integralmente de `RENDAL-CONTEXTO-MARCA.md`. Reforços práticos:

- Frases curtas, afirmativas, verbo no começo quando possível ("Veja", "Compare", "Agende").
- Falar de **decisão de projeto**, não de adjetivo. "A cobertura vira área de lazer" > "Lazer incrível".
- Números sempre com ressalva quando envolvem banco/avaliação/retorno. Nunca "garantido", "certeza", "rentabilidade de X%".
- Nunca: "barato", "preço popular", "casa que parece cara", "presença", "onde o olho chega", "do croqui ao traço".
- DCorp só aparece como **parceira possível**, nunca como departamento. Holding só no rodapé: *Empresa integrante da Paiva & Lopes Holding.*
- Cada tela tem **um CTA primário** e no máximo um secundário.

### 1.2 Mobile primeiro, de verdade

A maior parte do público B/C e de corretores chega pelo celular (WhatsApp, Instagram). Regras:

1. **Desenhar em 375×740 primeiro**, depois expandir. Nenhuma seção pode depender de hover — tudo que revela no hover (ex.: hotspots da Anatomia) revela também em tap/focus.
2. **Zona do polegar**: em páginas de decisão (detalhe de empreendimento, proprietários) o CTA primário vive numa **barra fixa inferior** (`StickyActionBar`), não só no fim da página.
3. Alvos de toque ≥ 44px (`min-h-11`), espaçamento ≥ 8px entre alvos.
4. Unidades de viewport `svh`/`dvh` (nunca `vh` puro em elementos fixos/sticky no mobile).
5. Carrosséis = **CSS scroll-snap nativo** (`snap-x snap-mandatory`, `overscroll-x-contain`), com indicador de posição e "peek" do próximo card (`w-[85%]`). Sem lib de carrossel.
6. Scroll-driven (framer `useScroll`) só em **uma** seção por página e com fallback estático em `prefers-reduced-motion` — mesmo contrato do `RendalConceptHero` (`StaticHero`).
7. Formulários: `type`/`inputMode`/`autoComplete` corretos, uma coluna, label visível, erro inline abaixo do campo, teclado não cobre o botão (botão em fluxo normal, não fixo, durante digitação).
8. `safe-area-inset-bottom` em qualquer elemento fixo inferior.
9. Tipografia mínima 16px em inputs (evita zoom do iOS).

### 1.3 Performance (orçamento por rota)

| Métrica | Alvo (4G, Moto G-class) |
|---------|--------------------------|
| LCP | < 2.5 s |
| INP | < 200 ms |
| CLS | < 0.05 |
| JS de rota (gzip, além do shell) | < 90 KB |

- Imagens via `next/image`, `sizes` sempre explícito, `priority` só na imagem LCP.
- Seções abaixo da dobra que usam framer pesado: `next/dynamic` quando o componente passar de ~15 KB.
- R3F/Three **somente** no footer (já lazy). Nenhuma outra tela usa WebGL.
- Server Components por padrão; `"use client"` só na folha interativa (a home hoje tem páginas inteiras client — **não replicar isso**).

### 1.4 Acessibilidade

- Um `h1` por página; seções com `aria-labelledby`.
- Skip link "Ir para o conteúdo" (já existe na `RendalIslandNav`) apontando para `#conteudo` em todas as páginas.
- Controles customizados (segmented, tabs, slider, qualificador) com semântica nativa ou ARIA completa (`role="tablist"`, `aria-selected`, setas do teclado).
- Contraste AA: texto `#1F1F1F/65` é o mínimo sobre cream; sobre grafite escuro, `white/70`.
- `aria-live="polite"` em resultados dinâmicos (qualificador, formulário).

---

## 2. Sistema compartilhado

### 2.1 Tokens (consolidar o que já está espalhado na home)

Hoje `EASE`, classes de CTA e cores estão duplicados em cada arquivo. Antes das telas novas, extrair para um módulo único.

| Token | Valor | Origem |
|-------|-------|--------|
| `cream` | `#F8F1E3` | fundo base |
| `cream-deep` | `#EDE6DA` | cards inativos, placeholders de imagem |
| `white` | `#FFFFFF` | seções alternadas (HowItWorks, FAQ) |
| `grafite` | `#1F1F1F` | texto, CTA primário, blocos escuros |
| `grafite-hover` | `#333333` | hover CTA |
| `terra` | `#7A4A2B` | labels, links, focus, ícones |
| `dourado` | `#C9A96A` | acento pontual (hotspot ativo, fio decorativo, etiqueta) |
| `ease` | `cubic-bezier(0.32,0.72,0,1)` | todas as transições |
| `dur` | `700ms` (UI), `250ms` (acordeão), `350ms` (troca de texto) | |

Tipografia (padrão da home, **não** o do `DESIGN_GUIDELINE.md` legado):

| Papel | Classes |
|-------|---------|
| H1 de página | `text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance` + gradiente `#000→#666` (claro) ou `#FFF→#9B9B9B` (escuro) |
| H2 de seção | `text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance text-[#1F1F1F]` |
| Label/eyebrow | `text-sm font-semibold text-[#7A4A2B]` (sem caixa alta pesada; `uppercase tracking-widest` só em micro-labels de dado) |
| Corpo | `text-base sm:text-lg leading-7 sm:leading-8 text-pretty text-[#1F1F1F]/70` |
| Números | `tabular-nums` sempre |

Ritmo vertical de seção: `px-6 py-12 sm:py-20 md:py-24`. Largura: `max-w-5xl` (conteúdo), `max-w-7xl` (mídia), `max-w-[680px]` (headers centrados).

> **Decisão pendente:** o manual pede Montserrat; o app carrega Manrope na variável `--font-montserrat`. Definir antes das telas novas e não misturar.

> **Legado:** `.antigravity/DESIGN_GUIDELINE.md` (navy `#0F172A`, `GoldButton`, títulos `font-black uppercase`) **não vale para a Rendal**. Nenhuma tela nova importa `GoldButton`, `InstitutionalHero`, `InvestorsHero` etc.

### 2.2 Componentes base (novos ou extraídos)

Local sugerido: `frontend/src/components/rendal/` (primitivos) e `frontend/src/components/rendal/<tela>/` (seções). Rotas em `frontend/apps/rendal/src/app/(main)/...` importam de lá.

| Componente | Função | Tipo |
|------------|--------|------|
| `RendalReveal` | Mover de `incorporadora/` para `components/rendal/`, sem mudar contrato | client |
| `RendalButton` | Variantes `primary` (grafite), `gold`, `ghost` (terra), `onDark`; tamanhos `md` (h-12) e `sm` (h-10); `asChild` p/ `Link` | server-safe |
| `SectionHeader` | eyebrow + h2 + sub, alinhamento `center`/`start` | server |
| `PageHero` | Hero de página interna (ver 2.4) | server + slot client |
| `StickyActionBar` | Barra fixa inferior mobile (CTA + WhatsApp), aparece após o hero via `IntersectionObserver`, some perto do footer | client |
| `SegmentedControl` | Toggle 2–4 opções com pílula deslizante (padrão `tabs-sliding` do skill transitions-dev) | client |
| `SnapRail` | Trilho horizontal scroll-snap + dots de posição (`scroll` event com rAF) | client |
| `Hotspots` | Generalização dos pontos da `RendalAnatomy` (imagem + lista sincronizada) | client |
| `StatusChip` | `Em lançamento` · `Em obra` · `Entregue` · `Referência` | server |
| `Disclaimer` | Texto regulatório padronizado (avaliação, financiamento, ilustrativo) | server |
| `FaqList` | Extrair do `RendalFAQ` aceitando itens por props | client |
| `FinalCta` | Extrair do `RendalFinalCta` com título/sub/CTA por props | server |

### 2.3 Navegação global

Hoje existem **dois headers**: `RendalIslandNav` (home) e `SiteHeader` (demais rotas; retorna `null` na home). Unificar na **`RendalIslandNav` para todas as rotas** e remover o ramo Rendal do `SiteHeader`.

Ajustes:

- Logo aponta para `/` (hoje aponta para `/concept`).
- Links (atualizar `packages/site-config`): **A Rendal · Empreendimentos · Proprietários · Investidores · Parceiros**; CTA pílula: **Fale com a Rendal** → `/contato`. Na home o CTA pode continuar "Ver empreendimentos".
- Desktop (`lg+`): 5 links cabem na pílula; entre `md` e `lg` cai para o menu.
- Mobile: menu fullscreen existente. Acrescentar, abaixo dos links, **atalhos por perfil** em linha ("Tenho um terreno", "Quero investir", "Sou imobiliária") que levam direto ao `/contato?perfil=...`.
- Estado ativo do link: sublinhado dourado de 1px (`usePathname`).

### 2.4 Hero de página interna (`PageHero`)

A home tem um hero cinematográfico de scroll; páginas internas **não devem repetir isso** (custo e cansaço). Padrão único:

- Desktop: eyebrow + H1 + sub centrados (`pt-36`), abaixo uma mídia `aspect-video rounded-3xl max-w-6xl` — mesma composição do `StaticHero` da home.
- Mobile: mídia `aspect-[4/5] max-h-[60svh]`; texto acima; nada sobreposto à imagem.
- Grão de papel (`.rendal-hero-paper`) no fundo, como na home.
- Variante `dark` (fundo `#1F1F1F`) só para Investidores.

### 2.5 Footer

Já integrado com diorama (`SiteShell`). Complementar o conteúdo textual com colunas mínimas: navegação, contato (telefone, e-mail, WhatsApp), endereço/CNPJ (quando confirmados), política. Mobile: colunas empilhadas, links com `min-h-11`.

### 2.6 Conteúdo e dados

- **Fase 1:** conteúdo tipado em `frontend/src/lib/rendal/content/*.ts` (empreendimentos, liderança, FAQ por página). Tipos exportados; nada de texto solto nos componentes de página.
- **Fase 2:** empreendimentos migram para Supabase (tabela já usada pelo dashboard), com o campo `brand` persistido (pendência do `SEPARACAO-RENDAL-DCORP.md`). Páginas de empreendimento com `generateStaticParams` + `revalidate` (ISR) ou `revalidateTag` disparado pelo dashboard.
- Imagens de empreendimento: Vercel Blob (fluxo de upload do dashboard já existe).

Modelo mínimo de `Empreendimento`:

```ts
type Empreendimento = {
  slug: string;
  nome: string;
  status: "lancamento" | "obra" | "entregue" | "referencia";
  cidade: string;
  bairro?: string;
  precoAPartirDe?: number;        // opcional: só exibir se comercial aprovar
  areaPrivativa?: [number, number]; // m² min–max
  dormitorios?: number[];
  diferenciais: Array<"laje-lazer" | "lavabo-social" | "fachada" | "integracao">;
  hero: Midia;
  galeria: Midia[];
  plantas: Array<{ id: "terreo" | "laje" | string; label: string; imagem: Midia }>;
  hotspots?: Array<{ titulo: string; texto: string; x: number; y: number; planta?: string }>;
  diaNaCasa?: Array<{ hora: string; titulo: string; texto: string; ambiente: string; planta: string }>;
  memorialPdf?: string;
  localizacao?: { lat: number; lng: number; enderecoPublico: string };
  cronograma?: Array<{ etapa: string; status: "feito" | "atual" | "proximo" }>;
};
```

---

## 3. Telas

Cada tela lista: **objetivo**, **público**, **seções em ordem**, **peça fora da caixa**, **notas mobile**, **SEO**, **dados**, **critérios de aceite**. Os textos são **rascunho de copy** no tom aprovado — revisar com o cliente, mas usáveis como estão.

---

### 3.1 Home `/` — ajustes apenas

Sem redesenho. Itens:

- Trocar `RendalIslandNav` pela versão global (2.3).
- Links `Ver unidades`/`Ver plantas e condições` apontam para `/empreendimentos/capetinga` quando houver um único empreendimento ativo; para `/empreendimentos` quando houver mais de um.
- `PRICE_FROM` (TODO comercial) passa a vir do conteúdo tipado do empreendimento.
- Converter a página para Server Component com as seções client como folhas.

---

### 3.2 A Rendal `/quem-somos`

**Objetivo:** mostrar que a Rendal é uma incorporadora com método, pessoas e governança — não uma "marca de casa".
**Público:** investidor, proprietário de área, imobiliária, comprador que quer confiar.
**CTA primário:** Fale com a Rendal · **secundário:** Ver empreendimentos.

Seções:

1. **PageHero**
   - Eyebrow: *A Rendal*
   - H1: **Incorporação com o orçamento no lugar certo.**
   - Sub: *Do terreno à entrega, cada decisão de projeto é tomada pelo que gera uso e valor para quem mora.*
   - Mídia: `quem-somos/quem-somos-hero.jpg` (substituir por foto real quando houver).

2. **Decisões, não adjetivos** — *peça fora da caixa*
   Uma sequência de "antes → decisão Rendal" em cartões que viram (flip horizontal no desktop, empilhado com transição de texto no mobile):
   | Padrão de mercado | Decisão Rendal |
   |---|---|
   | Telhado de madeira que ninguém usa | Laje impermeabilizada que vira lazer |
   | Um banheiro no fundo, junto aos quartos | Lavabo social: visita não entra na área íntima |
   | Orçamento igual em tudo | Capital no que se vê e se usa; técnica racional no resto |
   | Venda sem mostrar o projeto | Planta, acabamento e memorial abertos antes da visita |
   Mobile: `SnapRail` com cards de 85% de largura; cada card mostra "mercado" em cima (riscado sutil em `#1F1F1F/40`) e "Rendal" embaixo em terra. Sem flip 3D no mobile (custo + legibilidade).

3. **O que a Rendal faz** — frentes da incorporadora (texto do cliente):
   Terrenos e viabilidade · Estruturação jurídica e SPE · Aprovações e licenciamento · Coordenação de projetos · Relação com investidores e proprietários · Comercialização.
   Grid 2×3 no desktop, lista com ícone (Phosphor `duotone`) no mobile. Cada item com uma linha de descrição.

4. **Como decidimos** — três princípios curtos, número grande `tabular-nums` em terra:
   01 *Projeto antes de obra* · 02 *Capital onde aparece* · 03 *Transparência antes da venda*.

5. **Pessoas** — liderança com fotos existentes (`quem-somos/*.png`).
   Desktop: grid 3 colunas, foto `aspect-[4/5] rounded-2xl` em escala de cinza que ganha cor no hover/focus. Mobile: `SnapRail`, cor sempre ativa (sem hover). Nome, cargo, uma linha. **Confirmar com o cliente quais pessoas são Rendal e quais são DCorp/holding** antes de publicar.

6. **Grupo** — bloco discreto, uma frase: *A Rendal integra a Paiva & Lopes Holding e trabalha com parceiros de construção escolhidos por projeto.* Sem logos de outras empresas do grupo.

7. **FinalCta** (grafite) — *Vamos conversar sobre o próximo empreendimento?* → Fale com a Rendal.

SEO: `title: "A Rendal"`, description focada em incorporação e método. JSON-LD `Organization` (nome, logo, contato, `parentOrganization` Paiva & Lopes Holding).

Aceite: nenhum import de `components/quem-somos/*` legado; tudo navegável sem hover; fotos com `alt` com nome e cargo.

---

### 3.3 Empreendimentos `/empreendimentos`

**Objetivo:** vitrine escalável — funciona com 1 empreendimento hoje e com 10 amanhã.
**Público:** comprador, imobiliária.
**CTA primário por card:** Ver empreendimento.

Seções:

1. **PageHero** (claro, não o hero escuro atual)
   - Eyebrow: *Empreendimentos*
   - H1: **Casas pensadas para o dia a dia.**
   - Sub: *Laje de lazer, lavabo social e acabamento onde faz diferença. Veja plantas e condições antes de visitar.*
   - Sem mídia grande: o grid já é a mídia (reduz LCP).

2. **Filtros** — chips horizontais (`SnapRail` sem snap forte): *Todos · Em lançamento · Em obra · Entregues · Referência*; segundo grupo por cidade quando houver > 1. Estado na URL (`?status=obra&cidade=...`) via `searchParams` (server) para ser compartilhável no WhatsApp. Com 1 empreendimento, **ocultar filtros**.

3. **Grid de cards**
   Card: imagem `aspect-[4/3]` (mobile `aspect-[4/5]`), `StatusChip` sobre a imagem no canto superior esquerdo (única sobreposição permitida), nome, cidade/bairro, linha de fatos `tabular-nums` (*2–3 dorm · 68–82 m² · laje de lazer*), "a partir de" só se aprovado. Card inteiro clicável (link no título + `after:absolute after:inset-0`).
   Layout: 1 coluna mobile, 2 `md`, 3 `xl`. Com 1 item: card horizontal largo (layout atual) em vez de grid.

4. **Próximo lançamento** — captura leve: *Quer saber do próximo lançamento?* Campo único (WhatsApp ou e-mail) + botão. Envia para a mesma API de contato com `assunto=lista-lancamento`.

5. **FaqList** curta (3 itens: visita, financiamento, prazo) reaproveitando respostas da home.

SEO: `ItemList` JSON-LD com os empreendimentos. `title: "Empreendimentos"`.

Aceite: filtros funcionam sem JS (links); com 1 empreendimento a página não parece vazia; cards acessíveis por teclado com um único tab stop.

---

### 3.4 Detalhe do empreendimento `/empreendimentos/[slug]`

**A tela mais importante depois da home.** É onde o comprador decide visitar e onde o corretor pega argumento.
**CTA primário:** Agendar visita · **secundário:** WhatsApp.

Seções:

1. **Hero do empreendimento**
   - Mídia: render de fachada (dia) com troca suave para noite em loop lento de 8s **ou** toggle "Dia / Noite" (`SegmentedControl`) — reaproveita `render-fachada-dia/noite`. Toggle é preferível (controle do usuário, sem animação infinita).
   - Texto abaixo da mídia no mobile, ao lado no desktop: `StatusChip`, nome (H1), cidade, fatos em linha, CTA primário.
   - Mobile: a partir daqui a `StickyActionBar` passa a existir: **[Agendar visita]** (grafite, flex-1) + **[WhatsApp]** (ícone, 48px).

2. **Um dia na casa** — *peça fora da caixa*
   Linha do tempo de um dia que "acende" ambientes na planta:
   - *07h — Café na cozinha integrada à sala.* (planta térreo, destaca cozinha/sala)
   - *15h — A visita chega e usa o lavabo, sem passar pelos quartos.* (térreo, destaca lavabo + fluxo)
   - *19h — Jantar na laje, com pergola e floreira.* (laje, destaca área de estar)
   - *22h — Os quartos ficam reservados, longe do movimento.* (térreo, destaca quartos)
   Implementação: planta em `<figure>` sticky + passos que ativam por `IntersectionObserver` (não scroll-scrub). Destaque = máscara SVG/overlay com polígonos por ambiente (coordenadas em % no conteúdo), opacidade do resto a 35%.
   Desktop: planta sticky à esquerda, passos à direita.
   Mobile: planta sticky no topo ocupando `~45svh`, passos como cards abaixo rolando por baixo; o card ativo tem borda terra. A `StickyActionBar` esconde enquanto essa seção está ativa, para não esmagar a viewport.
   Reduced motion: sem sticky; cada passo mostra sua própria miniatura da planta com o ambiente destacado.

3. **Plantas** — `SegmentedControl` *Térreo · Laje* (+ variações de unidade). Imagem da planta com **zoom por pinça** no mobile e botão "Tela cheia" que abre um dialog (Base UI `Dialog`, já instalado). Download do projeto em PDF quando existir (`projeto-arquitetonico-*.pdf`) como link simples, com tamanho do arquivo.

4. **Onde o capital foi aplicado** — `Hotspots` sobre o render da laje (mesmo padrão da `RendalAnatomy`), com os itens específicos do empreendimento, e o bloco "Onde racionalizamos" abaixo. Reaproveita o componente, muda o conteúdo.

5. **Galeria** — `SnapRail` no mobile (peek + contador `03/12`), grid mosaico no desktop; tap abre lightbox (mesmo dialog, com swipe entre imagens via scroll-snap dentro do dialog).

6. **Localização**
   Sem embed do Google Maps (peso + cookies). Mapa estático (imagem gerada uma vez por empreendimento, ou tile estático) + endereço público + botões **Abrir no Google Maps** e **Abrir no Waze** (deep links). Lista de proximidades com distância a pé/carro (conteúdo manual).

7. **Andamento da obra** (se `status = obra`) — timeline vertical compacta com etapas `feito/atual/próximo`; etapa atual com ponto dourado pulsante (desliga com reduced motion).

8. **Financiamento e avaliação** — texto curto + CTA **Faça seu financiamento aqui** → `/contato?perfil=financiar#financiamento` (placeholder até o form; ver [RENDAL-FINANCIAMENTO-FORM.md](./RENDAL-FINANCIAMENTO-FORM.md)). `Disclaimer` quando o form existir:
   *A equipe orienta o processo com a Caixa e outros bancos. Em projetos de referência, a avaliação ficou acima do preço de venda; isso depende da unidade e da análise do banco e não é garantia.*

9. **FaqList** do empreendimento.

10. **Formulário de visita inline** (âncora `#visita`, alvo da `StickyActionBar`): nome, WhatsApp, preferência de dia (chips: *Dia útil · Sábado*), período (*Manhã · Tarde*). Envia com `empreendimento=slug`.

SEO: `generateMetadata` por slug; OG image dinâmica (`opengraph-image.tsx` com `next/og`: render + nome + cidade); JSON-LD `Residence`/`Place` + `Offer` só se houver preço aprovado. `generateStaticParams`.

Aceite: CTA de visita sempre alcançável com o polegar no mobile; planta legível com zoom; página útil offline-first para compartilhar (OG correto no WhatsApp); nenhum mapa de terceiro carregado sem ação do usuário.

---

### 3.5 Para proprietários de áreas `/proprietarios`

**Objetivo:** gerar conversas qualificadas com donos de terreno.
**Público:** proprietário de área (perfil diverso, muitas vezes mais velho, no celular).
**CTA primário:** Avaliar meu terreno.

Seções:

1. **PageHero**
   - Eyebrow: *Para proprietários de áreas*
   - H1: **Seu terreno pode virar um empreendimento com conceito.**
   - Sub: *A Rendal estuda a viabilidade, estrutura o negócio e desenvolve o projeto. Você escolhe o modelo de participação.*
   - Mídia: `wireframes/hero-condominio-ceu.jpg` (vista aérea/condomínio).

2. **Do terreno à entrega** — jornada em 6 etapas, cada uma com "o que a Rendal faz" e "o que você precisa":
   Conversa inicial → Estudo de viabilidade → Modelo de negócio → Aprovações → Obra → Comercialização.
   Desktop: linha horizontal com etapas clicáveis e painel de detalhe abaixo. Mobile: lista vertical com linha fina dourada à esquerda (elemento gráfico do manual) e acordeão por etapa.

3. **Modelos de participação** — três cards comparáveis: *Venda do terreno · Permuta por unidades · Parceria na SPE*. Cada card: como funciona (2 linhas), para quem faz sentido, horizonte. **Sem números de retorno.** Mobile: `SnapRail` com os 3 cards; desktop: 3 colunas.

4. **Seu terreno em 60 segundos** — *peça fora da caixa*
   Qualificador em 4 passos, uma pergunta por tela, botões grandes (não selects):
   1. *Onde fica?* — cidade (input com sugestões de uma lista curta de cidades-alvo + "Outra")
   2. *Qual o tamanho aproximado?* — chips: *até 1.000 m² · 1.000–5.000 m² · 5.000 m²–2 ha · acima de 2 ha · Não sei*
   3. *Como está a documentação?* — *Matrícula em meu nome · Inventário/partilha · Posse · Não sei*
   4. *O que você prefere?* — *Vender · Permutar · Ser sócio · Quero entender as opções*
   Tela final: resumo das respostas em linguagem natural (*"Terreno de 1.000 a 5.000 m² em Campinas, matrícula em seu nome, interesse em permuta."*) + nome e WhatsApp → envia. Mensagem de confirmação honesta: *A equipe analisa as informações e retorna para marcar uma conversa. Isso não é uma avaliação do terreno.*
   Implementação: estado local (`useReducer`), progresso `01/04` + barra grafite (mesmo visual do step do hero da home), transições de texto 350ms, voltar sem perder respostas, estado persistido em `sessionStorage`. Funciona como formulário comum sem JS (fallback: todas as perguntas numa página).
   Mobile: é aqui que a tela brilha — cada passo cabe numa viewport, botões de resposta `min-h-14` empilhados.

5. **Perguntas de proprietário** — FaqList: *Preciso pagar pelo estudo? · Quanto tempo leva a viabilidade? · Meu terreno tem pendência, dá para conversar? · Como fica a parte jurídica?* (respostas a validar com o cliente).

6. **FinalCta** — *Conte sobre a sua área.* → sobe para o qualificador.

SEO: página com intenção de busca local ("vender terreno para incorporadora + cidade"). `title: "Para proprietários de áreas"`. JSON-LD `Service`.

Aceite: qualificador completável com uma mão em < 60 s; nenhuma promessa de valor; dados chegam ao e-mail/CRM com as respostas estruturadas.

---

### 3.6 Investidores `/investidores`

**Objetivo:** abrir conversa com capital qualificado com sobriedade e cuidado regulatório.
**Público:** investidor, family office, parceiro de capital.
**CTA primário:** Solicitar apresentação.

Tom: o mais institucional do site. Variante **dark** (`#1F1F1F` / grafite) no hero para marcar a mudança de público, voltando ao cream no corpo.

Seções:

1. **PageHero dark**
   - Eyebrow: *Para investidores*
   - H1: **Produto com percepção de valor e orçamento racionalizado.**
   - Sub: *Empreendimentos residenciais estruturados em SPE, com projeto definido antes da obra e capital aplicado onde o comprador percebe.*
   - Mídia: `investidores/investor-hero.jpg` ou render noturno.

2. **A tese em três linhas** — *Produto diferenciado na faixa B/C · Custo racionalizado sem comprometer o resultado · Liquidez apoiada na percepção de valor.* Tipografia grande, uma linha por tese, fio dourado à esquerda.

3. **Para onde vai o capital** — *peça fora da caixa*
   Barra horizontal empilhada "a cada R$ 100 do custo de obra" dividida em categorias (estrutura, instalações, acabamento visível, laje/lazer, fachada…), com toggle `SegmentedControl` *Mercado padrão · Rendal* que anima as proporções (width com `ease`, 700ms). Mostra deslocamento de verba do invisível para o visível.
   **Obrigatório:** rótulo *Ilustrativo, baseado em projeto de referência* e `Disclaimer`. Números vêm do conteúdo e só vão ao ar com aprovação do cliente; se não houver aprovação, a peça roda com categorias sem percentuais (só larguras relativas).
   Mobile: barra vira vertical (colunas empilhadas) com legenda abaixo; toggle fixo acima.

4. **Estrutura do negócio** — diagrama simples em SVG inline (sem lib):
   `Paiva & Lopes Holding → Rendal (incorporadora) → SPE do empreendimento ← Investidor`, com `Construtora contratada (ex.: DCorp ou terceiros)` ligada à SPE. Legenda explicando papel de cada um em uma linha. Mobile: diagrama vertical.

5. **Lógica de avaliação** — exemplo do cliente com ressalva: venda R$ 200 mil / avaliação R$ 300 mil, apresentado como *exemplo de projeto de referência*, com `Disclaimer` explícito. Nunca como headline.

6. **Como começamos** — 3 passos: *Conversa inicial · Apresentação do empreendimento (mediante confidencialidade) · Estruturação da participação.*

7. **Formulário de apresentação** — nome, e-mail, telefone, faixa de interesse (chips opcionais, sem valores mínimos agressivos), mensagem. Turnstile.

SEO: `noindex` opcional até o jurídico validar o texto. Sem JSON-LD de oferta financeira.

Aceite: nenhum número de retorno/rentabilidade; todos os números acompanhados de ressalva; revisão jurídica registrada antes de publicar.

---

### 3.7 Parceiros `/parceiros`

**Objetivo:** atrair imobiliárias/corretores (canal de venda) e parceiros de execução.
**Público:** imobiliária, corretor, construtora, fornecedor.
**CTA primário:** Quero ser parceiro.

Seções:

1. **PageHero**
   - Eyebrow: *Parceiros*
   - H1: **Um produto fácil de explicar é mais fácil de vender.**
   - Sub: *Trabalhamos com imobiliárias, corretores e empresas de construção que compartilham o cuidado com o projeto.*

2. **Tabs por tipo de parceiro** (`SegmentedControl`, estado na URL `?tipo=`): *Imobiliárias e corretores · Construção · Fornecedores*.
   Cada tab: o que a Rendal oferece, o que espera, como começar.

3. **Kit de argumento** — *peça fora da caixa* (tab Imobiliárias)
   Três "cartões de venda" prontos, no formato stories (9:16), com os argumentos visuais: **Laje de lazer · Lavabo social · Acabamento no lugar certo**. Cada cartão: imagem + uma frase + selo Rendal. Botões **Baixar imagem** e **Compartilhar** (Web Share API com fallback para download). Gerados estaticamente (`next/og` em rota de imagem ou arquivos exportados).
   Mobile: `SnapRail` de cartões em tamanho real de story — o corretor já vê como vai postar.

4. **Como funciona a parceria comercial** — passos: cadastro → material e treinamento do produto → visitas agendadas pela equipe → acompanhamento.

5. **Formulário de parceiro** — tipo (pré-selecionado pela tab), empresa, CRECI (se corretor), cidade, contato.

Relação com DCorp: na tab Construção, uma frase — *Trabalhamos com construtoras escolhidas por projeto.* Sem destacar a DCorp nem sugerir exclusividade.

Aceite: kit baixável/compartilhável no celular; tab reflete na URL (link direto para corretores).

---

### 3.8 Contato `/contato`

**Objetivo:** encaminhar cada perfil para a conversa certa com o mínimo de campos.
**CTA primário:** Enviar.

Seções:

1. **Header curto** (sem mídia): H1 **Fale com a Rendal.** Sub: *Escolha o assunto e a equipe certa retorna para você.*

2. **Seletor de perfil** — *peça fora da caixa (discreta)*
   Quatro tiles grandes (2×2 no mobile, 4 em linha no desktop), ícone Phosphor + rótulo:
   *Quero comprar · Tenho um terreno · Quero investir · Sou imobiliária/parceiro*.
   Escolher um tile **adapta o formulário** abaixo (transição de altura com o padrão de acordeão `t-acc`):
   - Comprar: empreendimento de interesse (select dos ativos), preferência de visita.
   - Terreno: link "Prefere responder em 60 segundos?" → `/proprietarios#qualificador`; ou cidade + tamanho.
   - Investir: faixa de interesse opcional.
   - Parceiro: tipo + empresa.
   Pré-seleção via `?perfil=` e compatibilidade com `?empresa=rendal&assunto=visita` já usados nos links atuais.

3. **Formulário** — base: nome, WhatsApp (`inputMode="tel"`, máscara leve), e-mail (opcional para comprador), mensagem opcional. Turnstile invisível. Consentimento LGPD com link para a política.
   Estado de sucesso: check animado (padrão `success-check`) + *Recebemos. Retornamos em até 1 dia útil.* (confirmar SLA) + botão WhatsApp para quem tem pressa.

4. **Outros canais** — WhatsApp, telefone (`tel:`), e-mail, endereço (quando confirmado). Mobile: botões de largura total.

Implementação: reaproveitar a API/Server Action atual (`ContactForm` + Resend + Upstash rate limit + Turnstile), mas com um **componente de formulário novo no visual Rendal** (o atual usa tipografia/cores do legado). Campos novos (`perfil`, `empreendimento`, respostas do qualificador) entram como payload estruturado no e-mail.

Aceite: formulário completo em < 30 s no celular; erros inline; funciona com `?perfil=` vindo de qualquer CTA do site.

---

### 3.9 Política de privacidade `/politica-de-privacidade`

Restyle: largura de leitura `max-w-[68ch]`, H2 com âncoras, índice colapsável no mobile no topo. Conteúdo jurídico a validar (dados, Turnstile, Resend, Vercel).

---

### 3.10 404 e loading

- **`not-found.tsx`**: H1 **Este cômodo não está na planta.** Sub: *A página que você procurou não existe ou mudou de lugar.* Botões: *Ir para o início* · *Ver empreendimentos*. Ilustração: planta baixa (`wireframes/planta-terreo.jpg`) em baixa opacidade com um ambiente tracejado. Único momento de humor do site — curto e sóbrio.
- **`loading.tsx`** (rotas dinâmicas): skeleton no formato do layout real (padrão `skeleton-reveal` do skill transitions-dev), fundo cream, sem spinner.

---

## 4. Tecnologias e bibliotecas

### 4.1 Já no projeto (usar)

| Tecnologia | Uso |
|------------|-----|
| Next.js 15 (App Router) + React 19 | Rotas, RSC, `generateMetadata`, `next/og`, ISR |
| Tailwind CSS v4 | Estilo (tokens via `@theme` no `globals.css` da app Rendal) |
| framer-motion 12 | Só onde CSS não resolve: scroll-linked, springs, layout. Preferir CSS transitions + `RendalReveal` |
| `@phosphor-icons/react` | **Ícone padrão da Rendal** (weight `duotone`/`bold`), já usado na home. Não usar `lucide-react` em telas novas |
| `@base-ui/react` | Dialog (lightbox, tela cheia da planta), Tabs se conveniente |
| `next/image` | Todas as imagens |
| Supabase | Conteúdo de empreendimentos (fase 2) |
| Resend + Upstash ratelimit + Turnstile | Formulários |
| Vercel Blob | Mídia de empreendimentos |
| R3F/drei/three | Somente footer diorama |

### 4.2 Novas (mínimas, justificar antes de adicionar)

| Lib | Por quê | Alternativa sem lib |
|-----|---------|---------------------|
| `zod` | Validar payloads dos formulários (perfil, qualificador) no server | Validação manual — aceitável se ficar pequeno |
| `react-zoom-pan-pinch` (opcional) | Pinça/pan na planta dentro do dialog | `touch-action: pinch-zoom` + imagem em alta num container com scroll — testar primeiro |

**Não adicionar:** lib de carrossel (Embla/Swiper), lib de mapa (Leaflet/Google Maps JS), lib de animação extra (GSAP/Lottie), UI kits novos. Tudo que está nesta spec cabe em CSS + framer + Base UI.

### 4.3 SEO técnico

- `app/sitemap.ts` e `app/robots.ts` na app Rendal (excluir `/concept`).
- `generateMetadata` em todas as rotas; `alternates.canonical` para o domínio da Rendal (evitar conteúdo duplicado com o site unificado/DCorp).
- OG images: estática por página institucional; dinâmica por empreendimento.
- JSON-LD por tela conforme indicado acima.

### 4.4 Medição

Eventos mínimos (qualquer ferramenta que o cliente escolher; nomes estáveis):
`cta_visita_click`, `whatsapp_click`, `qualificador_step` (com `step`), `qualificador_submit`, `contato_submit` (com `perfil`), `planta_toggle`, `kit_download`, `kit_share`.

---

## 5. Estrutura de arquivos sugerida

```
frontend/
  apps/rendal/src/app/
    (main)/
      page.tsx                         # home (existente)
      quem-somos/page.tsx
      empreendimentos/page.tsx
      empreendimentos/[slug]/page.tsx
      empreendimentos/[slug]/opengraph-image.tsx
      proprietarios/page.tsx
      investidores/page.tsx
      parceiros/page.tsx
      contato/page.tsx
      politica-de-privacidade/page.tsx
      not-found.tsx
    sitemap.ts
    robots.ts
  src/components/rendal/
    RendalReveal.tsx  RendalButton.tsx  SectionHeader.tsx  PageHero.tsx
    StickyActionBar.tsx  SegmentedControl.tsx  SnapRail.tsx  Hotspots.tsx
    StatusChip.tsx  Disclaimer.tsx  FaqList.tsx  FinalCta.tsx
    RendalIslandNav.tsx                # movido de incorporadora/
    quem-somos/  empreendimentos/  proprietarios/  investidores/  parceiros/  contato/
  src/lib/rendal/
    tokens.ts                          # EASE, classes de CTA, cores
    content/empreendimentos.ts  content/lideranca.ts  content/faq.ts
```

As seções da home em `src/app/(landing-page)/incorporadora/` podem ficar onde estão nesta fase; mover só o que for reaproveitado (`RendalReveal`, `RendalIslandNav`, FAQ, CTA final).

---

## 6. Ordem de execução recomendada

1. **Fundação** — tokens, primitivos (2.2), nav unificada (2.3), `PageHero`, `StickyActionBar`, decisão de fonte. Sem isso as telas divergem.
2. **Detalhe do empreendimento (Capetinga)** — maior impacto comercial; destrava os CTAs da home.
3. **Empreendimentos (lista)** — rápido depois do detalhe.
4. **Contato** — formulário novo e roteamento por perfil (todas as outras telas dependem de `?perfil=`).
5. **Proprietários** — qualificador.
6. **A Rendal** — depende de validação das pessoas.
7. **Investidores** — depende de revisão jurídica.
8. **Parceiros** — kit de argumento.
9. **404, loading, política, SEO técnico, medição.**

Cada etapa fecha com: build `npm run build:rendal`, verificação em 375px e 1440px, Lighthouse mobile, teclado + leitor de tela básico, `prefers-reduced-motion`.

---

## 7. Pendências com o cliente (bloqueiam publicação, não desenvolvimento)

- Preço "a partir de" real e autorização para exibir preço.
- Percentuais da peça "Para onde vai o capital" ou autorização para versão sem números.
- Quais pessoas da liderança são Rendal.
- SLA de retorno do contato, WhatsApp oficial, endereço e CNPJ.
- Lista de cidades-alvo para o qualificador de terrenos.
- Revisão jurídica: Investidores, trechos sobre avaliação da Caixa, política de privacidade.
- Fotos reais autorizadas (obra, equipe, empreendimentos entregues).
- Fonte oficial: Montserrat (manual) ou Manrope (atual).

---

## 8. Critérios de aceite globais

- [ ] Todas as rotas usam a mesma nav, tokens e primitivos; nenhum import de componentes legados do site unificado.
- [ ] Nenhuma interação depende exclusivamente de hover.
- [ ] CTA primário alcançável com o polegar em todas as páginas de decisão.
- [ ] Orçamento de performance (1.3) atendido nas rotas principais em mobile.
- [ ] `prefers-reduced-motion` respeitado em toda animação.
- [ ] Nenhum texto promete rentabilidade, valorização ou aprovação de crédito; todo número sensível tem `Disclaimer`.
- [ ] DCorp aparece no máximo como parceira possível; holding só no rodapé e em A Rendal.
- [ ] Metadata, canonical, OG e JSON-LD em todas as rotas indexáveis.
