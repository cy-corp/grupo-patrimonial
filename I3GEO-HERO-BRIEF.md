# Brief aberto — Hero i3Geo

Documento para análise criativa e técnica. **Não é um briefing fechado.** Use o que estiver aqui como contexto e ponto de partida; questione premissas, combine ideias, descarte o que for fraco e proponha caminhos que não estejam listados.

---

## Papel deste documento

Quero que você:

1. Entenda a marca e o posicionamento.
2. Entenda o que já existe no site (estrutura só — ainda sem hero “de verdade”).
3. Analise as direções que já rascunhamos **como hipóteses**, não como menu obrigatório.
4. Traga recomendações: o que fazer na hero, por quê, trade-offs, e **outras opções** se achar melhores.
5. Seja livre em metáfora visual, motion, tech e narrativa — desde que continue coerente com a marca.

Não precisa “escolher só entre A–E”. Pode inventar F, G, híbridos, ou dizer que o melhor é algo bem mais simples (ou bem mais ousado).

---

## A marca

**Nome:** i3Geo — Topografia e Meio Ambiente  
**Tagline:** *A referência em georreferenciamento.*  
**Posicionamento:** Precisão territorial. Inteligência ambiental.

**Propósito (resumo):**  
Gerar informações confiáveis para planejamento mais sustentável — território, conhecimento e pessoas.

**Três pilares:**

| Pilar | Conceitos |
| --- | --- |
| Topografia | Precisão, campo, levantamento |
| Georreferenciamento | Localização, dados, segurança |
| Meio Ambiente | Sustentabilidade, equilíbrio, futuro |

**Paleta (oficial):**

- Azul-petróleo `#005C74` — precisão, confiança, território  
- Grafite `#2F2F2F` — técnica, seriedade  
- Cinza escuro `#4D4D4D` / claro `#D9D9D9`  
- Branco `#FFFFFF`  
- Laranja auxiliar `#FF6A13` — energia, destaque (uso pontual)

**Tipografia:** Montserrat (Bold / Semibold / Regular).

**Linguagem visual do manual (elementos, não obrigatórios na hero):**  
curvas de nível, marcadores de coordenadas, linhas guia, formas inspiradas em mapas; ícones lineares (estação topográfica, pin, folha).

**Tom desejado:** institucional técnico-premium, confiável, contemporâneo — **não** militar, **não** sci-fi genérico, **não** dashboard roxo. Pode ser ousado em craft 3D/motion, mas a marca tem que continuar legível e séria.

Contexto completo de identidade: `I3GEO-IDENTIDADE-VISUAL.md` (mesmo repositório).

---

## Contexto do produto / site

- App Next.js no monorepo do grupo patrimonial: `frontend/apps/i3geo`.
- Hoje existe só landing estrutural (header, hero texto, áreas, sobre, contato placeholder) — **sem foto, sem asset 3D, sem motion forte**.
- Outras marcas do mesmo grupo (Rendal / DCorp) já têm sites com craft visual mais “fora da caixa” (ex.: experiências 3D / diorama). A expectativa é que a i3Geo também tenha uma hero com presença forte — sem copiar a estética delas.
- Stack disponível no monorepo (pode usar ou não): Next, React, Tailwind, Framer Motion, React Three Fiber / Three, etc. CesiumJS **ainda não** está no projeto; seria adição consciente se fizer sentido.
- Deploy Vercel ainda não é prioridade nesta fase.

---

## O que eu quero na hero (intenção, não especificação)

Quero uma **hero section memorável** — o tipo de primeira tela que define a marca digitalmente.

Intuições (abertas, não requisitos):

- Algo com **presença espacial / territorial** (geografia, topografia, relevo, dados no espaço).
- Possivelmente **scroll ligado a animação** (câmera, camadas, revelação) — mas só se servir a história; não motion por motion.
- Já imaginei coisas como: globo/terreno real (Cesium), mesa de projeto com relevo (sand table, sem tom militar), scan tipo LiDAR, curvas de nível se desenhando… mas isso é brainstorming meu, não brief fechado.
- Sem fotos de stock obrigatórias; pode ser procedural, 3D, tipográfico+gráfico, híbrido.
- Precisa funcionar como **marca primeiro**: nome / posicionamento fortes; CTA claro; não virar só demo WebGL com texto ilegível.

Critérios de qualidade (soft):

- Diferencia de “landing SaaS genérica”.
- Alinha com precisão + território + ambiente.
- Viável em web (perf/mobile importam; diga trade-offs).
- Bom brief para implementação depois (não precisa escrever o código agora, a menos que ajude a argumentar).

---

## Hipóteses que já discutimos (só ponto de partida)

Use como referência do que já foi pensado. **Critique, melhore, substitua.**

### A — Cesium flyover  
Terreno/globo real; scroll (ou scrub) pilota a câmera: órbita → relevo → pin no território.  
*Wow alto; custo/token Cesium ion; cuidado mobile.*

### B — Mesa de projeto / sand table  
Mesa técnica com relevo, curvas, pins dos três pilares que revelam no scroll. Tom sala de projeto, não war room.  
*Craft controlável; espírito parecido com experiências 3D que o grupo já fez em outras marcas.*

### C — Scan LiDAR / nuvem de pontos  
Terreno “nasce” do levantamento: pontos → malha → informação útil.  
*Tom de campo e precisão; risco de ficar genérico “tech” se a direção de arte for fraca.*

### D — Curvas de nível que se desenham  
2.5D / SVG / canvas; leve; muito alinhado aos elementos do manual.  
*MVP mais barato; pode ser menos “fora da caixa” sozinho.*

### E — Híbrido mesa → mundo real  
Começa abstrato e “liga” para terreno real (Cesium ou equivalente).  
*Narrativa forte; complexidade alta (dois mundos / sync).*

Outras refs que já olhamos (inspiração, não template):  
[Cesium Sandcastle](https://sandcastle.cesium.com/), [San Rita / Mapping the Uncharted](https://www.awwwards.com/mapping-the-uncharted-the-san-rita-project.html), [Lidar Drone Scanning](https://www.awwwards.com/sites/lidar-drone-scanning), [Convex Seascape Survey](https://www.awwwards.com/sites/convex-seascape-survey), [Into the Amazon](https://www.awwwards.com/sites/into-the-amazon).

---

## O que peço na sua resposta

Estruture como preferir, mas cobrindo de preferência:

1. **Leitura da marca** — o que a hero precisa comunicar em 5 segundos.  
2. **Recomendação principal** — uma direção (pode ser nova). Por quê.  
3. **Alternativas** — 2–4 outras, incluindo pelo menos uma que **não** esteja em A–E.  
4. **Anti-padrões** — o que evitar para esta marca.  
5. **Scroll / motion** — se faz sentido; como seria a “story” em batidas (não precisa de storyboard fechado).  
6. **Tech sugerida** — honestidade sobre esforço, risco e mobile.  
7. **Perguntas em aberto** — o que você precisaria saber de mim para fechar (território real vs. fictício, região, tom mais “campo” vs. “dados”, etc.).

Tom da análise: crítico e criativo. Pode discordar das minhas hipóteses.

---

## Restrições reais (poucas)

- Manter coerência com identidade (cores, tipografia, tom).  
- Não soar militar / armamentista, mesmo se houver “mesa de planejamento”.  
- Não depender de foto de stock como ideia central.  
- Hero precisa carregar marca + uma headline + CTA; o visual não pode engolir isso.  
- Preferência por algo **implementável** num site Next institucional (mesmo que em fases).

Tudo o mais está aberto.
