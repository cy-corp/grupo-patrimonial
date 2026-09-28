# Formulário de financiamento (pré-aprovação) — backlog

> No site: `/contato?perfil=financiar#financiamento` (aceita `&empreendimento={slug}` para pré-selecionar).  
> CTA do empreendimento: **Faça seu financiamento aqui** → mesmo destino, já com o slug.  
> **Protótipo implementado** em `frontend/src/components/rendal/contato/FinanciamentoForm.tsx`; opções e checklist em `frontend/src/lib/rendal/financiamento.ts`. Faixas de renda, checklist e e-mail opcional ainda a validar com o cliente.

## Intenção do produto

Fluxo estilo **pré-aprovação americana**: a pessoa solicita orientação de crédito **antes** de fechar a unidade. Preenche dados + vê checklist de documentos → e-mail para a Rendal → a equipe analisa e devolve **quanto cabe no nome dela** (orientação, não aprovação bancária automática).

Copy obrigatória no envio / confirmação (rascunho):

> A Rendal analisa as informações e retorna uma orientação de crédito. Isso não substitui a análise da Caixa ou de outros bancos.

## Entrada no site (já ligado)

| Origem | Destino |
|--------|---------|
| Bloco “Financiamento e avaliação” no empreendimento | `/contato?perfil=financiar#financiamento` |
| Tab **Quero financiar** em `/contato` | `#financiamento` (área vazia até o form) |
| Atalho mobile no menu | `/contato?perfil=financiar#financiamento` |

Não misturar com “Quero comprar” / agendar visita: intenções diferentes. Header **Fale com a Rendal** continua apontando para contato geral.

## Campos do form (protótipo — a validar com o cliente)

Mínimo sugerido:

- Nome completo
- WhatsApp
- E-mail (opcional ou obrigatório — definir)
- Renda bruta mensal aproximada (faixa ou valor)
- Tipo de renda: CLT · Autônomo / MEI · Servidor · Outro
- Vai usar FGTS? Sim / Não / Não sei
- Empreendimento de interesse (opcional; pode vir do slug na URL)
- Mensagem livre (opcional)

Fora de escopo no protótipo: calculadora de parcela, API Caixa, upload de arquivos (só checklist textual, a menos que o cliente peça upload depois).

## Checklist de documentos (exibir no UI + incluir no e-mail)

Lista **provisória** (padrão crédito PF / Caixa). Confirmar com o Dener antes de ir a produção.

### Análise de crédito (sem imóvel ainda)

- [ ] Documento de identidade com foto (RG, CNH ou equivalente) + CPF
- [ ] Comprovante de estado civil (nascimento / casamento / união estável)
- [ ] Comprovante de residência recente (~3 meses)
- [ ] Comprovante de renda  
  - CLT: últimos holerites (em geral 3) + CTPS  
  - Autônomo / MEI: IR + recibo, extratos 3–6 meses (DECORE / DASN se pedido)
- [ ] Extrato do FGTS (se for usar o fundo)

### Depois (quando houver unidade) — não bloquear o protótipo

Documentos do imóvel (matrícula, IPTU, etc.) e do vendedor entram na etapa seguinte; não precisam estar no primeiro envio.

## E-mail (quando implementar o envio)

Reaproveitar `LeadForm` / `submitContact` / Resend.

1. Incluir assunto allowlisted em `SUBJECTS_BY_COMPANY.rendal`, ex.: `Simulação de financiamento`.
2. Assunto interno sugerido: `[Rendal] Simulação de financiamento — {nome}` (+ empreendimento se houver).
3. Corpo: campos estruturados + **checklist de documentos** (para a equipe saber o que cobrar / orientar).
4. Confirmação ao lead (opcional): mesma lista “o que preparar” + aviso de que não é aprovação automática.

## Aceite do protótipo (quando o form existir)

- [ ] Tab e deep link abrem a seção de financiamento
- [ ] Checklist visível antes/ junto do envio
- [ ] Lead chega no e-mail da Rendal com dados + checklist
- [ ] Nenhum número de parcela ou “aprovado em R$ X” gerado no front
- [ ] Disclaimer de orientação (não garantia bancária)

## Referências no repo

- UI placeholder: `frontend/src/components/rendal/contato/ProfileForm.tsx` (`perfil === "financiar"`)
- Contato: `frontend/apps/rendal/src/app/(main)/contato/page.tsx`
- CTA empreendimento: bloco FinalCta “Financiamento e avaliação”
- Infra de e-mail: `frontend/src/lib/contact/`
