/** Cotação de crédito imobiliário. O exercício do IR muda todo ano. */

import { erroConta, formatContaBancaria, sanitizeContas, type ContaBancaria } from "@/lib/rendal/bancos";

export const FINANCIAMENTO_SUBJECT = "Simulação de financiamento";

export const FINANCIAMENTO_DISCLAIMER =
  "A Rendal analisa as informações e retorna uma orientação de crédito. Isso não substitui a análise da Caixa ou de outros bancos.";

export const ARQUIVO_MAX_BYTES = 10 * 1024 * 1024;
export const ARQUIVOS_POR_ITEM = 4;

export const ARQUIVO_TIPOS = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

/** A partir de junho, a declaração entregue neste ano já é a pedida na cotação. */
export function irpfExercicio(now = new Date()) {
  const year = now.getFullYear();
  return now.getMonth() >= 5 ? year : year - 1;
}

export const TIPOLOGIAS = [
  { id: "casa-rua", label: "Casa de rua" },
  { id: "casa-condominio", label: "Casa em condomínio" },
  { id: "casa-comercial", label: "Casa comercial" },
  { id: "apartamento", label: "Apartamento" },
  { id: "sala", label: "Sala comercial" },
  { id: "terreno-rua", label: "Terreno de rua" },
  { id: "terreno-condominio", label: "Terreno em condomínio" },
] as const;

export const ESTADOS_CIVIS = [
  { id: "solteiro", label: "Solteiro" },
  { id: "casado", label: "Casado" },
  { id: "uniao", label: "União estável" },
  { id: "divorciado", label: "Divorciado" },
  { id: "separado", label: "Separado" },
  { id: "viuvo", label: "Viúvo" },
] as const;

export const REGIMES = [
  { id: "parcial", label: "Comunhão parcial" },
  { id: "universal", label: "Comunhão universal" },
  { id: "separacao", label: "Separação de bens" },
  { id: "participacao", label: "Participação final nos aquestos" },
  { id: "nao-sei", label: "Não sei" },
] as const;

export const PRAZOS = [10, 15, 20, 25, 30, 35] as const;

export const UFS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT",
  "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO",
] as const;

export const COMPROVANTES = [
  { id: "extratos", label: "Extratos dos últimos 3 meses" },
  { id: "holerites", label: "3 últimos holerites" },
] as const;

export type TipologiaId = (typeof TIPOLOGIAS)[number]["id"];
export type EstadoCivilId = (typeof ESTADOS_CIVIS)[number]["id"];
export type RegimeId = (typeof REGIMES)[number]["id"];
export type ComprovanteId = (typeof COMPROVANTES)[number]["id"];
export type SimNao = "sim" | "nao";
export type Uf = (typeof UFS)[number];

export type ChecklistItem = { id: string; label: string; detail?: string };

export type ArquivoEnviado = { pathname: string; name: string; size: number };

export type Pessoa = {
  nome: string;
  cpf: string;
  nascimento: string;
  rg: string;
  rgEmissao: string;
  rgOrgao: string;
  pai: string;
  mae: string;
  tel: string;
  email: string;
  profissao: string;
  renda: string;
};

export type DocSlotId =
  | "identidade"
  | "irpf"
  | "renda"
  | "residencia"
  | "civil"
  | "conjuge-id"
  | "conjuge-renda"
  | "fgts";

export type Draft = {
  tipologia: TipologiaId | "";
  cidade: string;
  uf: Uf | "";
  valorImovel: string;
  prazo: string;
  entrada: string;
  fgts: SimNao | "";
  fgtsValor: string;
  saldoDevedor: SimNao | "";
  saldoValor: string;
  voce: Pessoa;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidadeEndereco: string;
  ufEndereco: Uf | "";
  estadoCivil: EstadoCivilId | "";
  regime: RegimeId | "";
  dataCasamento: string;
  compoeRenda: SimNao | "";
  conjuge: Pessoa;
  comprovanteRenda: ComprovanteId | "";
  comprovanteRendaConjuge: ComprovanteId | "";
  arquivos: Partial<Record<DocSlotId, ArquivoEnviado[]>>;
  contas: ContaBancaria[];
  contrato: SimNao | "";
  prazoContrato: string;
  multa: SimNao | "";
  obs: string;
  empreendimento: string;
};

export const ETAPAS = [
  { id: "imovel", label: "Imóvel" },
  { id: "valores", label: "Valores" },
  { id: "voce", label: "Você" },
  { id: "endereco", label: "Endereço" },
  { id: "identidade", label: "Identidade" },
  { id: "civil", label: "Civil" },
  { id: "conjuge", label: "Cônjuge" },
  { id: "documentos", label: "Documentos" },
  { id: "banco", label: "Banco" },
  { id: "revisao", label: "Revisão" },
] as const;

export type EtapaId = (typeof ETAPAS)[number]["id"];

export function pessoaVazia(): Pessoa {
  return {
    nome: "",
    cpf: "",
    nascimento: "",
    rg: "",
    rgEmissao: "",
    rgOrgao: "",
    pai: "",
    mae: "",
    tel: "",
    email: "",
    profissao: "",
    renda: "",
  };
}

export function draftVazio(): Draft {
  return {
    tipologia: "",
    cidade: "",
    uf: "",
    valorImovel: "",
    prazo: "",
    entrada: "",
    fgts: "",
    fgtsValor: "",
    saldoDevedor: "",
    saldoValor: "",
    voce: pessoaVazia(),
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidadeEndereco: "",
    ufEndereco: "",
    estadoCivil: "",
    regime: "",
    dataCasamento: "",
    compoeRenda: "",
    conjuge: pessoaVazia(),
    comprovanteRenda: "",
    comprovanteRendaConjuge: "",
    arquivos: {},
    contas: [],
    contrato: "",
    prazoContrato: "",
    multa: "",
    obs: "",
    empreendimento: "",
  };
}

export function precisaConjuge(estado: EstadoCivilId | "") {
  return estado === "casado" || estado === "uniao";
}

export function etapasVisiveis(estado: EstadoCivilId | "") {
  return ETAPAS.filter((etapa) => etapa.id !== "conjuge" || precisaConjuge(estado));
}

const EMAIL_RE = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;

export function soDigitos(value: string, max: number) {
  return value.replace(/\D/g, "").slice(0, max);
}

export function maskCpf(value: string) {
  const d = soDigitos(value, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

/** RG no formato 00.000.000-0. O dígito pode ser X. */
export function maskRg(value: string) {
  let body = "";
  let digit = "";
  for (const char of value.toUpperCase()) {
    if (digit) break;
    if (char === "X") {
      if (body.length >= 4) digit = "X";
      continue;
    }
    if (!/\d/.test(char)) continue;
    if (body.length < 8) body += char;
    else digit = char;
  }
  if (!body) return "";
  let formatted = body;
  if (body.length > 2) formatted = `${body.slice(0, 2)}.${body.slice(2)}`;
  if (body.length > 5) formatted = `${body.slice(0, 2)}.${body.slice(2, 5)}.${body.slice(5)}`;
  if (digit) formatted += `-${digit}`;
  return formatted;
}

export function maskCep(value: string) {
  const d = soDigitos(value, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

export function maskPhone(value: string) {
  const d = soDigitos(value, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function maskMoney(value: string) {
  const digits = soDigitos(value, 12);
  if (!digits) return "";
  const amount = Number(digits);
  return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

export function reais(value: string) {
  const digits = soDigitos(value, 12);
  return digits ? Number(digits) : 0;
}

export function cpfValido(value: string) {
  const cpf = soDigitos(value, 11);
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(cpf[i]) * (len + 1 - i);
    const mod = (sum * 10) % 11;
    return mod === 10 ? 0 : mod;
  };
  return calc(9) === Number(cpf[9]) && calc(10) === Number(cpf[10]);
}

export function dataIsoValida(value: string, opts?: { minAge?: number; maxAge?: number; past?: boolean }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (opts?.past && date > today) return false;
  if (opts?.minAge != null || opts?.maxAge != null) {
    let age = today.getFullYear() - year;
    const beforeBirthday = today.getMonth() < month - 1 || (today.getMonth() === month - 1 && today.getDate() < day);
    if (beforeBirthday) age -= 1;
    if (opts.minAge != null && age < opts.minAge) return false;
    if (opts.maxAge != null && age > opts.maxAge) return false;
  }
  return true;
}

export function formatDataBr(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

function oneOf<T extends string>(value: unknown, options: readonly T[]): T | "" {
  return typeof value === "string" && options.includes(value as T) ? (value as T) : "";
}

function texto(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max) : "";
}

function pessoaSanitizada(value: unknown): Pessoa {
  const row = value && typeof value === "object" ? (value as Partial<Pessoa>) : {};
  return {
    nome: texto(row.nome, 120),
    cpf: maskCpf(texto(row.cpf, 14)),
    nascimento: texto(row.nascimento, 10),
    rg: maskRg(texto(row.rg, 20)),
    rgEmissao: texto(row.rgEmissao, 10),
    rgOrgao: texto(row.rgOrgao, 30),
    pai: texto(row.pai, 120),
    mae: texto(row.mae, 120),
    tel: maskPhone(texto(row.tel, 16)),
    email: texto(row.email, 254).toLowerCase(),
    profissao: texto(row.profissao, 80),
    renda: maskMoney(texto(row.renda, 20)),
  };
}

function arquivoSeguro(value: unknown): ArquivoEnviado | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Partial<ArquivoEnviado>;
  const pathname = texto(row.pathname, 200);
  if (!/^financiamento\/[A-Za-z0-9][A-Za-z0-9._/-]{0,180}$/.test(pathname) || pathname.includes("..")) return null;
  const name = texto(row.name, 120) || "arquivo";
  const size = typeof row.size === "number" && row.size > 0 && row.size <= ARQUIVO_MAX_BYTES ? row.size : 0;
  return { pathname, name, size };
}

const SLOT_IDS: DocSlotId[] = ["identidade", "irpf", "renda", "residencia", "civil", "conjuge-id", "conjuge-renda", "fgts"];

export function sanitizeDraft(value: unknown): Draft {
  const base = draftVazio();
  const row = value && typeof value === "object" ? (value as Partial<Draft>) : {};
  const arquivos: Draft["arquivos"] = {};
  const rawArquivos = row.arquivos && typeof row.arquivos === "object" ? row.arquivos : {};
  for (const id of SLOT_IDS) {
    const list = (rawArquivos as Partial<Record<DocSlotId, unknown>>)[id];
    if (!Array.isArray(list)) continue;
    const files = list.map(arquivoSeguro).filter((item): item is ArquivoEnviado => Boolean(item)).slice(0, limiteArquivos(id));
    if (files.length) arquivos[id] = files;
  }
  return {
    ...base,
    tipologia: oneOf(row.tipologia, TIPOLOGIAS.map((item) => item.id)),
    cidade: texto(row.cidade, 80),
    uf: oneOf(row.uf, UFS),
    valorImovel: maskMoney(texto(row.valorImovel, 20)),
    prazo: PRAZOS.some((item) => String(item) === texto(row.prazo, 2)) ? texto(row.prazo, 2) : "",
    entrada: maskMoney(texto(row.entrada, 20)),
    fgts: oneOf(row.fgts, ["sim", "nao"] as const),
    fgtsValor: maskMoney(texto(row.fgtsValor, 20)),
    saldoDevedor: oneOf(row.saldoDevedor, ["sim", "nao"] as const),
    saldoValor: maskMoney(texto(row.saldoValor, 20)),
    voce: pessoaSanitizada(row.voce),
    cep: maskCep(texto(row.cep, 9)),
    logradouro: texto(row.logradouro, 120),
    numero: texto(row.numero, 20),
    complemento: texto(row.complemento, 80),
    bairro: texto(row.bairro, 80),
    cidadeEndereco: texto(row.cidadeEndereco, 80),
    ufEndereco: oneOf(row.ufEndereco, UFS),
    estadoCivil: oneOf(row.estadoCivil, ESTADOS_CIVIS.map((item) => item.id)),
    regime: oneOf(row.regime, REGIMES.map((item) => item.id)),
    dataCasamento: texto(row.dataCasamento, 10),
    compoeRenda: oneOf(row.compoeRenda, ["sim", "nao"] as const),
    conjuge: pessoaSanitizada(row.conjuge),
    comprovanteRenda: oneOf(row.comprovanteRenda, COMPROVANTES.map((item) => item.id)),
    comprovanteRendaConjuge: oneOf(row.comprovanteRendaConjuge, COMPROVANTES.map((item) => item.id)),
    arquivos,
    contas: sanitizeContas(row.contas),
    contrato: oneOf(row.contrato, ["sim", "nao"] as const),
    prazoContrato: texto(row.prazoContrato, 10),
    multa: oneOf(row.multa, ["sim", "nao"] as const),
    obs: texto(row.obs, 1500),
    empreendimento: texto(row.empreendimento, 80),
  };
}

export type DocSlot = {
  id: DocSlotId;
  label: string;
  hint: string;
  required: boolean;
  min: number;
  max: number;
  escolha?: "renda" | "renda-conjuge";
};

export function limiteArquivos(id: DocSlotId) {
  if (id === "renda" || id === "conjuge-renda") return 3;
  if (id === "identidade" || id === "irpf" || id === "conjuge-id") return 2;
  if (id === "fgts") return 4;
  return 1;
}

export function documentosDaCotacao(draft: Pick<Draft, "estadoCivil" | "fgts" | "comprovanteRenda" | "comprovanteRendaConjuge">): DocSlot[] {
  const ano = irpfExercicio();
  const rendaLabel = draft.comprovanteRenda === "holerites" ? "3 últimos holerites" : draft.comprovanteRenda === "extratos" ? "Extratos dos últimos 3 meses" : "Extratos ou holerites";
  const slots: DocSlot[] = [
    { id: "identidade", label: "Documento pessoal", hint: "RG ou CNH. Frente e verso, se precisar.", required: true, min: 1, max: 2 },
    { id: "irpf", label: `IRPF ${ano}`, hint: "Declaração e recibo de entrega. Até 2 arquivos.", required: true, min: 1, max: 2 },
    { id: "renda", label: rendaLabel, hint: "Escolha um dos dois e envie exatamente 3 arquivos.", required: true, min: 3, max: 3, escolha: "renda" },
    { id: "residencia", label: "Comprovante de endereço", hint: "Um arquivo. Conta recente no seu nome.", required: true, min: 1, max: 1 },
  ];
  if (draft.estadoCivil === "casado") {
    slots.push({ id: "civil", label: "Certidão de casamento", hint: "Um arquivo.", required: true, min: 1, max: 1 });
  }
  if (draft.estadoCivil === "uniao") {
    slots.push({ id: "civil", label: "Escritura de união estável", hint: "Um arquivo, no lugar da certidão de casamento.", required: true, min: 1, max: 1 });
  }
  if (precisaConjuge(draft.estadoCivil)) {
    const conjugeRenda = draft.comprovanteRendaConjuge === "holerites" ? "3 últimos holerites do cônjuge" : draft.comprovanteRendaConjuge === "extratos" ? "Extratos dos últimos 3 meses do cônjuge" : "Extratos ou holerites do cônjuge";
    slots.push(
      { id: "conjuge-id", label: "Documento do cônjuge", hint: "RG ou CNH. Frente e verso, se precisar.", required: true, min: 1, max: 2 },
      { id: "conjuge-renda", label: conjugeRenda, hint: "Exatamente 3 arquivos.", required: true, min: 3, max: 3, escolha: "renda-conjuge" },
    );
  }
  if (draft.fgts === "sim") {
    slots.push({ id: "fgts", label: "Extrato do FGTS", hint: "Um arquivo por conta vinculada, até 4.", required: true, min: 1, max: 4 });
  }
  return slots;
}

function simNaoLabel(value: SimNao | "") {
  if (value === "sim") return "Sim";
  if (value === "nao") return "Não";
  return "";
}

function labelDe<T extends string>(options: readonly { id: T; label: string }[], id: T | "") {
  return options.find((item) => item.id === id)?.label ?? "";
}

function pessoaErros(pessoa: Pessoa, prefix: string, comDocumento: boolean) {
  const erros: Record<string, string> = {};
  if (pessoa.nome.trim().length < 2) erros[`${prefix}nome`] = "Informe o nome completo.";
  if (!cpfValido(pessoa.cpf)) erros[`${prefix}cpf`] = "Confira o CPF.";
  if (!dataIsoValida(pessoa.nascimento, { past: true, minAge: 18, maxAge: 100 })) erros[`${prefix}nascimento`] = "Informe uma data válida.";
  if (soDigitos(pessoa.tel, 11).length < 10) erros[`${prefix}tel`] = "Confira o telefone com DDD.";
  if (!EMAIL_RE.test(pessoa.email)) erros[`${prefix}email`] = "Confira o e-mail.";
  if (pessoa.profissao.trim().length < 2) erros[`${prefix}profissao`] = "Informe a profissão.";
  if (reais(pessoa.renda) <= 0) erros[`${prefix}renda`] = "Informe a renda mensal.";
  if (comDocumento) {
    if (pessoa.rg.replace(/[^0-9X]/gi, "").length < 5) erros[`${prefix}rg`] = "Informe o RG com o dígito.";
    if (!dataIsoValida(pessoa.rgEmissao, { past: true })) erros[`${prefix}rgEmissao`] = "Informe a data de emissão.";
    if (pessoa.rgOrgao.trim().length < 2) erros[`${prefix}rgOrgao`] = "Informe o órgão expedidor.";
    if (pessoa.pai.trim().length < 2) erros[`${prefix}pai`] = "Informe o nome do pai.";
    if (pessoa.mae.trim().length < 2) erros[`${prefix}mae`] = "Informe o nome da mãe.";
  }
  return erros;
}

export function errosEtapa(id: EtapaId, draft: Draft, opts: { tipologiaObrigatoria: boolean }) {
  const erros: Record<string, string> = {};
  if (id === "imovel") {
    if (opts.tipologiaObrigatoria && !draft.tipologia) erros.tipologia = "Escolha o tipo do imóvel.";
    if (draft.cidade.trim().length < 2) erros.cidade = "Informe a cidade.";
    if (!draft.uf) erros.uf = "Escolha a UF.";
    if (reais(draft.valorImovel) < 1000) erros.valorImovel = "Informe o valor do imóvel.";
    if (!draft.prazo) erros.prazo = "Escolha o prazo.";
  }
  if (id === "valores") {
    if (draft.entrada === "") erros.entrada = "Informe a entrada. Se não houver, coloque zero.";
    if (!draft.fgts) erros.fgts = "Diga se vai usar o FGTS.";
    if (draft.fgts === "sim" && reais(draft.fgtsValor) <= 0) erros.fgtsValor = "Informe o valor do FGTS.";
    if (!draft.saldoDevedor) erros.saldoDevedor = "Responda sobre o saldo devedor.";
    if (draft.saldoDevedor === "sim" && reais(draft.saldoValor) <= 0) erros.saldoValor = "Informe o saldo devedor.";
  }
  if (id === "voce") Object.assign(erros, pessoaErros(draft.voce, "", false));
  if (id === "endereco") {
    if (soDigitos(draft.cep, 8).length !== 8) erros.cep = "Confira o CEP.";
    if (draft.logradouro.trim().length < 2) erros.logradouro = "Informe a rua.";
    if (!draft.numero.trim()) erros.numero = "Informe o número.";
    if (draft.bairro.trim().length < 2) erros.bairro = "Informe o bairro.";
    if (draft.cidadeEndereco.trim().length < 2) erros.cidadeEndereco = "Informe a cidade.";
    if (!draft.ufEndereco) erros.ufEndereco = "Escolha a UF.";
  }
  if (id === "identidade") {
    if (draft.voce.rg.replace(/[^0-9X]/gi, "").length < 5) erros.rg = "Informe o RG com o dígito.";
    if (!dataIsoValida(draft.voce.rgEmissao, { past: true })) erros.rgEmissao = "Informe a data de emissão.";
    if (draft.voce.rgOrgao.trim().length < 2) erros.rgOrgao = "Informe o órgão expedidor.";
    if (draft.voce.pai.trim().length < 2) erros.pai = "Informe o nome do pai.";
    if (draft.voce.mae.trim().length < 2) erros.mae = "Informe o nome da mãe.";
  }
  if (id === "civil") {
    if (!draft.estadoCivil) erros.estadoCivil = "Escolha o estado civil.";
    if (draft.estadoCivil === "casado" && !draft.regime) erros.regime = "Escolha o regime.";
    if (precisaConjuge(draft.estadoCivil)) {
      if (!dataIsoValida(draft.dataCasamento, { past: true })) erros.dataCasamento = "Informe a data.";
      if (!draft.compoeRenda) erros.compoeRenda = "Diga se o cônjuge compõe renda.";
    }
  }
  if (id === "conjuge") Object.assign(erros, pessoaErros(draft.conjuge, "conjuge.", true));
  if (id === "documentos") {
    if (!draft.comprovanteRenda) erros.comprovanteRenda = "Escolha extratos ou holerites.";
    if (precisaConjuge(draft.estadoCivil) && !draft.comprovanteRendaConjuge) erros.comprovanteRendaConjuge = "Escolha os comprovantes do cônjuge.";
    for (const slot of documentosDaCotacao(draft)) {
      const qtd = draft.arquivos[slot.id]?.length ?? 0;
      if (qtd < slot.min) {
        erros[`arquivo.${slot.id}`] = slot.min === 3 ? "Envie os 3 arquivos." : slot.min === 2 ? "Envie os arquivos deste item." : "Envie este documento.";
      }
    }
  }
  if (id === "banco") {
    if (!draft.contrato) erros.contrato = "Diga se já existe contrato.";
    if (draft.contrato === "sim") {
      if (!dataIsoValida(draft.prazoContrato)) erros.prazoContrato = "Informe a data limite.";
      if (!draft.multa) erros.multa = "Diga se o contrato tem multa.";
    }
    draft.contas.forEach((conta, index) => {
      const contaErros = erroConta(conta);
      for (const [key, message] of Object.entries(contaErros)) {
        if (message) erros[`conta.${index}.${key}`] = message;
      }
    });
  }
  return erros;
}

export function primeiraEtapaInvalida(draft: Draft, opts: { tipologiaObrigatoria: boolean }) {
  return etapasVisiveis(draft.estadoCivil).find((etapa) => Object.keys(errosEtapa(etapa.id, draft, opts)).length > 0)?.id ?? null;
}

function linha(label: string, value: string) {
  return `${label}: ${value || "—"}`;
}

function blocoPessoa(titulo: string, pessoa: Pessoa) {
  return [
    titulo,
    linha("Nome", pessoa.nome),
    linha("CPF", pessoa.cpf),
    linha("Nascimento", formatDataBr(pessoa.nascimento)),
    linha("RG", pessoa.rg),
    linha("Emissão do RG", formatDataBr(pessoa.rgEmissao)),
    linha("Órgão expedidor", pessoa.rgOrgao),
    linha("Pai", pessoa.pai),
    linha("Mãe", pessoa.mae),
    linha("Telefone", pessoa.tel),
    linha("E-mail", pessoa.email),
    linha("Profissão", pessoa.profissao),
    linha("Renda mensal", pessoa.renda),
  ];
}

export function textoDossier(draft: Draft, linkArquivo?: (arquivo: ArquivoEnviado) => string) {
  const linhas = [
    "Cotação de financiamento imobiliário",
    "",
    linha("Empreendimento", draft.empreendimento),
    linha("Tipologia", labelDe(TIPOLOGIAS, draft.tipologia)),
    linha("Cidade do imóvel", `${draft.cidade}${draft.uf ? `/${draft.uf}` : ""}`),
    linha("Valor do imóvel", draft.valorImovel),
    linha("Prazo", draft.prazo ? `${draft.prazo} anos` : ""),
    linha("Entrada", draft.entrada),
    linha("FGTS", draft.fgts === "sim" ? `Sim, ${draft.fgtsValor}` : simNaoLabel(draft.fgts)),
    linha("Saldo devedor do imóvel adquirido", draft.saldoDevedor === "sim" ? `Sim, ${draft.saldoValor}` : simNaoLabel(draft.saldoDevedor)),
    "",
    ...blocoPessoa("Cliente", draft.voce),
    linha("Endereço", [draft.logradouro, draft.numero, draft.complemento, draft.bairro, draft.cidadeEndereco, draft.ufEndereco, draft.cep].filter(Boolean).join(", ")),
    "",
    linha("Estado civil", labelDe(ESTADOS_CIVIS, draft.estadoCivil)),
  ];
  if (draft.estadoCivil === "casado") linhas.push(linha("Regime", labelDe(REGIMES, draft.regime)));
  if (precisaConjuge(draft.estadoCivil)) {
    linhas.push(linha(draft.estadoCivil === "uniao" ? "Data da união" : "Data do casamento", formatDataBr(draft.dataCasamento)));
    linhas.push(linha("Cônjuge compõe renda", simNaoLabel(draft.compoeRenda)));
    linhas.push("", ...blocoPessoa("Cônjuge", draft.conjuge));
  }
  linhas.push(
    "",
    linha("Contrato de compra e venda", simNaoLabel(draft.contrato)),
  );
  if (draft.contrato === "sim") {
    linhas.push(linha("Prazo limite", formatDataBr(draft.prazoContrato)));
    linhas.push(linha("Multa", simNaoLabel(draft.multa)));
  }
  if (draft.contas.length) {
    linhas.push("", "Contas bancárias");
    for (const conta of draft.contas) linhas.push(`- ${formatContaBancaria(conta)}`);
  }
  if (draft.obs) linhas.push("", "Observação", draft.obs);
  linhas.push("", "Documentos", "Os links abaixo valem por 14 dias e só abrem para quem recebe este e-mail.");
  for (const slot of documentosDaCotacao(draft)) {
    const files = draft.arquivos[slot.id] ?? [];
    linhas.push(slot.label);
    if (!files.length) linhas.push("- (não enviado)");
    for (const arquivo of files) {
      const href = linkArquivo?.(arquivo);
      linhas.push(href ? `- ${arquivo.name}: ${href}` : `- ${arquivo.name}`);
    }
  }
  return linhas.join("\n");
}

export function parseDossier(value: unknown): { ok: true; draft: Draft } | { ok: false; message: string } {
  if (typeof value !== "string" || value.length > 100_000) {
    return { ok: false, message: "Não foi possível ler os dados da cotação." };
  }
  try {
    return { ok: true, draft: sanitizeDraft(JSON.parse(value) as unknown) };
  } catch {
    return { ok: false, message: "Não foi possível ler os dados da cotação." };
  }
}

export function checklistText(items: ChecklistItem[]) {
  return items
    .map((item) => (item.detail ? `- ${item.label} (${item.detail})` : `- ${item.label}`))
    .join("\n");
}

export function labelTipologia(id: TipologiaId | "") {
  return labelDe(TIPOLOGIAS, id);
}

export function labelEstadoCivil(id: EstadoCivilId | "") {
  return labelDe(ESTADOS_CIVIS, id);
}

export function labelRegime(id: RegimeId | "") {
  return labelDe(REGIMES, id);
}
