# ⚜️ Grupo Patrimonial: UI/UX Design Guideline

Este documento estabelece os padrões visuais e comportamentais para o desenvolvimento de novas páginas no ecossistema do Grupo Patrimonial. O objetivo é manter a consistência entre o estilo "Cálido/Warm" da Home e as páginas institucionais de alta performance.

---

## 🎨 Paleta de Cores (Identity)

- **Principal (Warm Beige)**: `#F8F1E3` - Usada em fundos de seção, heros e cards.
- **Acento (Primary Gold)**: `#C9A14A` - Usada para ícones, linhas decorativas e botões metálicos.
- **Contraste (Dark Blue)**: `#0F172A` - Usada para títulos principais e textos de grande autoridade.
- **Base**: `White` - Fundos de conteúdo extenso para garantir leveza.

---

## 🏛️ Estrutura de Hero (O Padrão Premium)

A Hero Section deve ser obrigatoriamente responsiva seguindo o modelo **Cinematic Desktop -> Editorial Mobile**.

### 🖥️ Desktop Pattern (Cinematic)
- **Layout**: Sobreposição lateral (texto à esquerda).
- **Background**: Imagem 8K de arquitetura ou mercado de capitais cobrindo 100% da viewport.
- **Proteção de Texto**: Gradiente horizontal (`from-[#F8F1E3] via-[#F8F1E3]/85 to-transparent`).
- **Tipografia**: Títulos em `font-heading`, XXL, Uppercase e Tracking-tighter com itálicos suaves.

### 📱 Mobile Pattern (Editorial Overlap)
- **Layout**: *Stacked Vertical* com sobreposição negativa.
- **Estrutura**:
    - **Topo**: Imagem em destaque ocupando aproximadamente **45vh**.
    - **Base**: Cartão de conteúdo com margem negativa agressiva (**`-mt-28`**) que "sobe" sobre a imagem.
    - **Visual**: Cantos superiores arredondados (**`rounded-t-[3rem]`**) e cor de fundo sólida (`#F8F1E3`).
- **Legibilidade**: **Sem sombras ou brilhos (glow)** no mobile; o corte deve ser seco e editorial.

---

## 🗂️ Componentes de Conteúdo

### Botão CTA (GoldButton)
- Todos os botões principais de conversão devem usar o componente `<GoldButton />`.
- Estilo: Metálico dourado, texto uppercase com tracking largo, animação de levitação no hover.

### Cards de Serviço/Modelos
- **Grid Desktop**: 2 ou 3 colunas dependendo da densidade, com efeito de hover que revela a descrição.
- **Scroll Mobile**: No celular, a transparência deve ser ignorada e o conteúdo deve aparecer via scroll (**`whileInView`**) para facilitar a navegação por toque.

### Tipografia Padrão (Tailwind)
- **Títulos**: `font-heading text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none`.
- **Labels (Labels Prestigio)**: `font-sans text-primary text-[10px] tracking-[0.4em] uppercase font-bold`.
- **Parágrafos**: `font-sans text-[#0F172A]/70 text-lg md:text-xl leading-relaxed tracking-wide`.

---

## 🚀 Princípios de Design

1. **Editorial Feel**: O site deve parecer uma revista de arquitetura de luxo (grande uso de espaço branco e tipografia monumental).
2. **Warmth (Calidez)**: Evite tons frios ou acinzentados puros; o bege `#F8F1E3` deve ser a cor de união.
3. **Hierarchy**: Títulos devem ser imponentes (XXL) e os detalhes (números, labels) devem ser minúsculos mas legíveis com tracking alto.
4. **Respiro**: Mínimo de `py-32` ou `py-48` entre seções para manter o ar de exclusividade.
