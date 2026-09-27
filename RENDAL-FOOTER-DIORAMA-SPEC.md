# Spec — Footer Diorama Rendal (refino + integração)

> Hand-off pra Opus / agente de implementação.  
> Objetivo: levar o diorama 3D de cidade pro site **Rendal**, com materiais/luz/sombra mais realistas e paleta alinhada à marca — sem reinventar a mecânica de animação que já funciona.

---

## 1. Contexto (o que já existe)

Há um footer diorama compartilhado (origem DCorp / site unificado), inspirado no massing tipo Emil Hovv: fileira de townhouses europeus que **sobe** quando o footer entra na viewport.

| Peça | Path |
|------|------|
| React / R3F scene | `frontend/src/components/footer-diorama.tsx` |
| Footer shell (texto + slot 3D) | `frontend/src/components/footer.tsx` |
| Gerador Blender (procedural, **não há `.blend`**) | `frontend/scripts/build-footer-city.py` |
| Asset exportado | `frontend/public/models/footer-city.glb` (~2.4 MB) |
| Preload | `frontend/src/components/PreloadAssets.tsx` |
| Layout que usa o diorama hoje | `frontend/src/app/(landing-page)/layout.tsx` → `<Footer />` |

**Rendal app atual:** `frontend/apps/rendal` usa `SiteShell` (`frontend/src/components/site/SiteShell.tsx`) com footer **flat** (`bg-[#F3F0EA]`), **sem** diorama.

**Home Rendal:** `frontend/apps/rendal/src/app/(main)/page.tsx` reexporta a concept page; fundo de página `#F8F1E3`; CTA final `#1F1F1F`.

Não existe arquivo `.blend` versionado. A fonte da verdade do mesh é o script Python. Qualquer `.blend` novo (opcional) deve ir em `frontend/assets/blender/` e **não** substituir o pipeline script→GLB sem documentar.

---

## 2. Meta do trabalho

1. **Integrar** o diorama no footer da **app Rendal** (`companyId === "rendal"` no `SiteShell`), não na DCorp.
2. **Refinar** modelo + materiais + luz/sombra para ler mais realista (menos “toy pastel”).
3. **Remapear paleta** para a identidade Rendal (grafite / dourado / azul-petróleo / cream).
4. Manter performance: DPR capped, `frameloop` só quando visível, shadow map razoável, GLB sem explosão de tris.
5. Preferir **variante dedicada** (`footer-city-rendal.glb` + componente ou props `variant="rendal"`) em vez de mutar o asset DCorp genérico — assim o site unificado / DCorp não quebra.

---

## 3. Paleta (obrigatória)

Fonte: `RENDAL-IDENTIDADE-VISUAL.md` + uso real na LP (`#F8F1E3`).

| Token | HEX | Uso no diorama |
|-------|-----|----------------|
| Cream página | `#F8F1E3` | Clear color / fundo do footer shell (alinhar com LP; hoje footer usa `#F3F0EA`) |
| Grafite | `#1F1F1F` | Trim escuro, shadow bias visual, detalhes de ferro / portas |
| Dourado | `#C9A96A` | Acentos pontuais (cornijas, poucos detalhes — **não** pintar fachadas inteiras) |
| Azul-petróleo | `#0F5B63` | Corpos principais / telhados / torre (âncora de marca) |
| Petróleo escuro | `#0E2A2D` / `#0A474E` | Variações de corpo e recessos de janela |
| Cinza apoio | `#4D4D4D` | Belts / cursos |
| Cinza claro | `#D9D9D9` | Pedra / molduras claras |
| Branco quente | `#F7F2EA` ≈ cream | Trim claro, face do relógio |
| Vidro | tint petróleo frio ~ `(0.55, 0.62, 0.60)` | Baixa roughness, leve metallic |
| Glow interno (janelas acesas) | warm gold muted ~ `(0.90, 0.78, 0.48)` | Poucas janelas (~10%), não neon |

### Remapeamento sugerido (script `materials()`)

| Material atual | → Rendal |
|----------------|----------|
| `terra` / `terra2` / `pink` | bege pedra / calcário (`cream` mais frio ou `#E8DFD0`) |
| `mustard` / `butter` | **remover** como corpo; butter só em detalhe dourado muito sutil ou eliminar |
| `sage` / `sage_b` / `teal` / `teal_d` | família `#0F5B63` → `#0A474E` → `#0E2A2D` |
| `blue` (cinza-azulado) | pedra cinza `#D9D9D9` / `#B8B8B8` |
| `roof` / `roof2` | ardósia grafite `#2A2A2A`–`#3A3A3A` ou petróleo escuro |
| `warm` (vidro aceso) | dourado muted alinhado a `#C9A96A` |
| `recess` | grafite / petróleo muito escuro |

**Direção visual:** cidade sofisticada noturna-crepuscular quente (luz golden hour), não brinquedo colorido. Solidez + sofisticação da marca.

---

## 4. Realismo — modelos (Blender / script)

Arquivo a editar: `frontend/scripts/build-footer-city.py`  
Export: preferir `frontend/public/models/footer-city-rendal.glb` (novo).

### 4.1 Geometria

- Manter hierarquia de nomes crítica pro React:
  - Roots: `Bld_00` … `Bld_17` (regex `^Bld_\d+$`)
  - Torre: `Bld_11` (não é clonada lateralmente no JS)
  - Ponteiros: `ClockHour`, `ClockMinute` (nomes **exatos**)
- `STREET = 21.6` no React — se mudar espaçamento X dos plots, atualizar constante ou documentar.
- Bevel um pouco mais fino / consistente (hoje `0.026–0.03`); evitar “chunky Lego”.
- Janelas: recess mais profundo + vidro levemente inset; mullions mais finos.
- Telhados: menos “placa plana”; manter hip/gable; flat roofs com leve parapeto.
- Opcional (fase 2): ground plane / calçada no GLB (`Ground` / `Street`) recebendo sombra — hoje só meshes dos prédios cast/receive.

### 4.2 Materiais (Principled)

- Roughness corpos: `0.55–0.72` (não plástico fosco uniforme).
- Telhado: roughness `0.45–0.65`, leve variation.
- Vidro: roughness `0.08–0.18`, metallic `0.05–0.15`, alpha se necessário.
- Evitar saturacão alta; preferir valores lineares próximos dos HEX da tabela.
- Export GLB com `export_apply=True`, sem cameras/lights no arquivo (luz fica no R3F).

### 4.3 Comando de rebuild

Assumir Blender 3.6+ / 4.x no PATH:

```bash
blender --background --python frontend/scripts/build-footer-city.py
```

Se o script passar a gerar a variante Rendal:

```bash
blender --background --python frontend/scripts/build-footer-city.py -- --variant rendal
```

(Implementar `argparse` após `--` se criar variantes.)

**Não há `.blend` no repo.** Se criar um para polish manual:

- Path sugerido: `frontend/assets/blender/footer-city-rendal.blend`
- Ainda exportar GLB para `public/models/`; documentar no README do script se o `.blend` virar fonte.

---

## 5. Realismo — runtime (R3F)

Arquivo base: `frontend/src/components/footer-diorama.tsx`

### 5.1 Luz (proposta Rendal)

Substituir o setup cream/sage genérico por algo no espírito:

```ts
// referência — ajustar no implement
const CREAM = "#F8F1E3";
<hemisphereLight args={["#F8F1E3", "#1F1F1F", 0.55]} />
<directionalLight
  castShadow
  position={[6, 14, -8]}
  intensity={1.55}
  color="#FFE2B8"          // golden hour
  shadow-mapSize={[2048, 2048]}  // se perf OK; senão 1024
  shadow-bias={-0.00015}
  shadow-normalBias={0.02}
/>
<directionalLight position={[-6, 3, -3]} intensity={0.22} color="#0F5B63" /> // fill frio
```

### 5.2 Sombras

- Manter `shadows` no `<Canvas>`.
- Configurar `shadow-camera-*` do directional (ortho frustum apertado em torno da cidade) para sombra nítida sem wasting resolution.
- Todos meshes: `castShadow` + `receiveShadow` (já feito no traverse).
- Considerar `ContactShadows` do drei **só se** a sombra do directional ficar fraca no cream — não empilhar os dois sem necessidade.

### 5.3 Câmera / framing

Manter valores atuais como baseline (já calibrados):

- Desktop: pos `(1.15, 2.15, -17.8)`, fov `24`, lookAt `(0, 0.85, 0)`
- Mobile: pos `(0.45, 1.9, -13.2)`, fov `26`, lookAt `(0, 1.2, 0)`

Só mexer se o novo massing/escala exigir.

### 5.4 Animação (não regredir)

- IntersectionObserver `rootMargin: "0px 0px 36% 0px"`
- Rise stagger por X; ease `1 - (1-t)^3`; drop inicial `-6`
- `epoch` + `pathname` reset
- `frameloop={visible ? "always" : "never"}`
- `prefers-reduced-motion`: prédios já na altura final
- Relógio: timezone `America/Sao_Paulo`

### 5.5 Clear color

Alinhar alpha clear com cream Rendal `#F8F1E3` (não `#F3F0EA`).

---

## 6. Integração UI — app Rendal

### 6.1 Onde plugar

`frontend/src/components/site/SiteShell.tsx` — ramo `!isDcorp` (Rendal):

- Footer passa a ter shell semelhante ao `footer.tsx`:
  - `relative overflow-hidden rounded-t-[40px|60px]`
  - `bg-[#F8F1E3]` (ou `#F3F0EA` só se contraste com conteúdo acima exigir — preferir `#F8F1E3` pra continuidade com a LP)
  - padding-bottom generoso (`pb-[12.5rem]` / `md:pb-[26rem]`) pro diorama
  - slot absoluto bottom: `<FooterDiorama variant="rendal" />` (dynamic, `ssr: false`)
- Conteúdo textual do footer Rendal **permanece** o da SiteShell (links privacidade / contato) — não copiar o grid multi-empresa do `footer.tsx` unificado, a menos que produto peça.

### 6.2 DCorp

**Não** adicionar diorama no ramo `isDcorp`. Footer escuro atual permanece.

### 6.3 Bundle

- Dynamic import do diorama só no branch Rendal.
- Preload do GLB Rendal só na app Rendal (`apps/rendal`) ou condicional em `PreloadAssets` se compartilhado.

### 6.4 Transição com `RendalFinalCta`

CTA final é `#1F1F1F`. Footer cream com diorama abaixo deve “abraçar” essa seção (overlap negativo `-mt` como no `footer.tsx` unificado) para o diorama parecer surgir sob o CTA escuro — testar visualmente.

---

## 7. Estrutura de arquivos sugerida (após implementação)

```
frontend/
  scripts/
    build-footer-city.py          # + flag --variant rendal | legacy
  public/models/
    footer-city.glb               # legacy (não quebrar landing unificada)
    footer-city-rendal.glb        # novo
  assets/blender/                 # opcional
    footer-city-rendal.blend
  src/components/
    footer-diorama.tsx            # props: variant?: "legacy" | "rendal"
    footer.tsx                    # legacy unificado (inalterado ou apontando legacy)
    site/SiteShell.tsx            # Rendal: diorama; DCorp: sem
```

---

## 8. Constraints / não fazer

- Não colocar cards, badges ou copy por cima do diorama (“no hero overlays” spirit).
- Não purple glow, bloom exagerado, ou partículas.
- Não aumentar o primeiro viewport da home — isso é **footer only**.
- Não forçar diorama na DCorp neste escopo.
- Não commitar `.next-dev` / caches.
- Não usar `useMemo`/`useCallback` extras sem necessidade (seguir padrão do arquivo).
- Manter a11y: canvas `aria-hidden`; footer textual continua navegável.

---

## 9. Critérios de aceite

- [ ] Em `apps/rendal`, scroll até o fim: cidade sobe uma vez; scroll up/down não re-dispara até troca de rota.
- [ ] Paleta lê Rendal (petróleo / grafite / cream / dourado pontual) — sem mustard/pink/terra saturados.
- [ ] Sombras visíveis no cream, sem acne (bias ok) em desktop e mobile.
- [ ] Reduced motion: sem rise.
- [ ] Relógio da torre sincroniza com horário de SP.
- [ ] DCorp footer inalterado.
- [ ] Landing unificada (`(landing-page)/layout`) continua funcionando com asset legacy **ou** documentar breaking change se unificar.
- [ ] GLB Rendal < ~3.5 MB ideal; shadow map não derruba FPS em notebook médio.
- [ ] Rebuild via Blender script documentado e reproduzível.

---

## 10. Ordem de execução recomendada (Opus)

1. Fork do script → variant `rendal` (materiais + leve polish geométrico) → export `footer-city-rendal.glb`.
2. Estender `FooterDiorama` com `variant` (path GLB + lights + clear color).
3. Plugar no `SiteShell` Rendal (layout/padding/overlap).
4. Ajuste fino de luz/sombra/câmera no browser (`/`, viewport desktop + mobile).
5. Smoke: reduced motion, rota change, DCorp intacta.
6. (Opcional) `.blend` snapshot + nota no topo do `.py`.

---

## 11. Referências rápidas

- Identidade: `RENDAL-IDENTIDADE-VISUAL.md`
- Contexto marca: `RENDAL-CONTEXTO-MARCA.md`
- Inspiração original (histórico): tweet Emil Hovv + conversa “Brand revamp for GrupoRendal”
- Massing overlap: front row `y ≈ +0.1…0.22`, back `y ≈ -1.08…-1.3` em `PLOTS` no script
- Clones laterais no JS: `±STREET` e `±2*STREET`, exceto `Bld_11`

---

## 12. Prompt curto pra colar no Opus

```
Implement RENDAL-FOOTER-DIORAMA-SPEC.md.

Integrate the existing Three/R3F footer diorama into the Rendal app SiteShell
(not DCorp). Create a Rendal-specific GLB via build-footer-city.py variant with
institutional palette (#F8F1E3, #1F1F1F, #C9A96A, #0F5B63), more realistic
materials/bevels/window recesses, and improved R3F lighting/shadows (golden-hour
key + cool fill). Keep animation/IO/clock contracts. Do not regress the legacy
footer-city.glb used by the unified landing Footer unless explicitly migrating it.
```
