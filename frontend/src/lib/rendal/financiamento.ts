/** Pré-aprovação de crédito (RENDAL-FINANCIAMENTO-FORM.md).
 * Checklist provisório: confirmar com o Dener antes de produção.
 */

export const FINANCIAMENTO_SUBJECT = "Simulação de financiamento";

export const FINANCIAMENTO_DISCLAIMER =
  "A Rendal analisa as informações e retorna uma orientação de crédito. Isso não substitui a análise da Caixa ou de outros bancos.";

export const TIPOS_RENDA = [
  { id: "clt", label: "CLT", hint: "Carteira assinada" },
  { id: "autonomo", label: "Autônomo / MEI", hint: "Por conta própria" },
  { id: "servidor", label: "Servidor público", hint: "Concursado" },
  { id: "outro", label: "Outro", hint: "Aposentado, sócio, informal…" },
] as const;

export const FAIXAS_RENDA = [
  "Até R$ 2.850",
  "R$ 2.850 a R$ 4.700",
  "R$ 4.700 a R$ 8.600",
  "R$ 8.600 a R$ 12.000",
  "Acima de R$ 12.000",
  "Prefiro não dizer agora",
] as const;

export const OPCOES_FGTS = [
  { id: "sim", label: "Sim" },
  { id: "nao", label: "Não" },
  { id: "nao-sei", label: "Não sei" },
] as const;

export type TipoRendaId = (typeof TIPOS_RENDA)[number]["id"];
export type FgtsId = (typeof OPCOES_FGTS)[number]["id"];

export function isTipoRenda(value: unknown): value is TipoRendaId {
  return TIPOS_RENDA.some((item) => item.id === value);
}

export function isFgts(value: unknown): value is FgtsId {
  return OPCOES_FGTS.some((item) => item.id === value);
}

export function labelTipoRenda(id: TipoRendaId | "" | undefined) {
  return TIPOS_RENDA.find((item) => item.id === id)?.label ?? "";
}

export function labelFgts(id: FgtsId | "" | undefined) {
  return OPCOES_FGTS.find((item) => item.id === id)?.label ?? "";
}

export type ChecklistItem = { id: string; label: string; detail?: string };

const RENDA_DOCS: Record<TipoRendaId, ChecklistItem[]> = {
  clt: [
    { id: "holerites", label: "Últimos 3 holerites" },
    { id: "ctps", label: "Carteira de trabalho (CTPS)", detail: "Pode ser a digital." },
  ],
  autonomo: [
    { id: "ir", label: "Declaração de IR + recibo de entrega" },
    { id: "extratos", label: "Extratos bancários dos últimos 3 a 6 meses" },
    { id: "decore", label: "DECORE ou DASN-SIMEI", detail: "Só se o banco pedir." },
  ],
  servidor: [{ id: "contracheques", label: "Últimos 3 contracheques" }],
  outro: [
    { id: "renda", label: "Comprovante de renda", detail: "A equipe orienta qual serve no seu caso." },
  ],
};

export function checklistFinanciamento(input: {
  tipoRenda?: TipoRendaId | "";
  fgts?: FgtsId | "";
}): ChecklistItem[] {
  const items: ChecklistItem[] = [
    { id: "identidade", label: "Documento com foto + CPF", detail: "RG, CNH ou equivalente." },
    { id: "estado-civil", label: "Comprovante de estado civil", detail: "Certidão de nascimento, casamento ou união estável." },
    { id: "residencia", label: "Comprovante de residência", detail: "Dos últimos 3 meses." },
  ];
  items.push(
    ...(input.tipoRenda
      ? RENDA_DOCS[input.tipoRenda]
      : [{ id: "renda", label: "Comprovante de renda", detail: "Varia com o tipo de renda." }]),
  );
  if (input.fgts === "sim") items.push({ id: "fgts", label: "Extrato do FGTS" });
  if (input.fgts === "nao-sei") {
    items.push({ id: "fgts", label: "Extrato do FGTS", detail: "Se decidir usar o fundo." });
  }
  return items;
}

export function checklistText(items: ChecklistItem[]) {
  return items.map((item) => `- ${item.label}${item.detail ? ` (${item.detail})` : ""}`).join("\n");
}
