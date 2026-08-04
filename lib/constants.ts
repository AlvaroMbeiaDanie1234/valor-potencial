export const COMPANY = {
  name: "Valor Potencial",
  shortName: "VP",
  tagline: "Recrutamento especializado para a industria offshore de Angola",
  email: "geral@valorpotencial.com",
  phone: "+244 923 000 000",
  address: "Luanda, Angola",
}

export const JOB_CATEGORIES = [
  "Perfuracao & Poços",
  "Producao & Operacoes",
  "Manutencao Mecanica",
  "Electricidade & Instrumentacao",
  "Engenharia & Projectos",
  "HSE / Seguranca",
  "Marinha & Navegacao",
  "Catering & Hotelaria Offshore",
  "Logistica & Armazem",
  "Inspeccao & Qualidade",
  "Administracao & Recursos Humanos",
] as const

export const PROVINCES = [
  "Luanda",
  "Benguela",
  "Cabinda",
  "Zaire",
  "Huila",
  "Namibe",
  "Huambo",
  "Bie",
  "Malanje",
  "Uige",
  "Cuanza Norte",
  "Cuanza Sul",
  "Lunda Norte",
  "Lunda Sul",
  "Moxico",
  "Cuando Cubango",
  "Cunene",
  "Bengo",
] as const

export const CONTRACT_TYPES = [
  "Tempo integral",
  "Contrato a termo",
  "Rotativo offshore",
  "Prestacao de servicos",
  "Estagio",
] as const

export const EXPERIENCE_LEVELS = [
  "Estagiario",
  "Junior",
  "Intermediario",
  "Senior",
  "Especialista",
] as const

export const ROTATIONS = [
  "14 dias / 14 dias",
  "21 dias / 21 dias",
  "28 dias / 28 dias",
  "28 dias / 14 dias",
  "Onshore - horario normal",
] as const

export const EDUCATION_LEVELS = [
  "Ensino Basico",
  "Ensino Medio Tecnico",
  "Ensino Medio Geral",
  "Curso Tecnico-Profissional",
  "Bacharelato",
  "Licenciatura",
  "Pos-graduacao",
  "Mestrado",
  "Doutoramento",
] as const

export const EXPERIENCE_RANGES = [
  "Sem experiencia",
  "Menos de 1 ano",
  "1 a 3 anos",
  "3 a 5 anos",
  "5 a 10 anos",
  "Mais de 10 anos",
] as const

export const DOCUMENT_TYPES = [
  { value: "cv", label: "Curriculum Vitae" },
  { value: "bi", label: "Bilhete de Identidade" },
  { value: "certificado", label: "Certificado de Habilitacoes" },
  { value: "declaracao", label: "Declaracao de Servico" },
  { value: "certificado_medico", label: "Certificado Medico / Aptidao" },
  { value: "bosiet", label: "BOSIET / HUET" },
  { value: "formacao_hse", label: "Formacao HSE" },
  { value: "carta_conducao", label: "Carta de Conducao" },
  { value: "passaporte", label: "Passaporte" },
  { value: "cedula", label: "Cedula Pessoal" },
  { value: "outro", label: "Outro documento" },
] as const

export function documentLabel(value: string) {
  return DOCUMENT_TYPES.find((d) => d.value === value)?.label ?? "Documento"
}

export const APPLICATION_STATUSES = [
  {
    value: "recebida",
    label: "Recebida",
    description: "Candidatura registada, a aguardar triagem",
  },
  {
    value: "em_analise",
    label: "Em analise",
    description: "Documentacao e perfil em avaliacao",
  },
  {
    value: "entrevista",
    label: "Entrevista",
    description: "Candidato convocado para entrevista",
  },
  {
    value: "aprovada",
    label: "Aprovada",
    description: "Candidato seleccionado para a vaga",
  },
  {
    value: "rejeitada",
    label: "Rejeitada",
    description: "Candidatura nao seguiu para a fase seguinte",
  },
] as const

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]["value"]

export function statusLabel(value: string) {
  return APPLICATION_STATUSES.find((s) => s.value === value)?.label ?? value
}

export const DOCUMENT_STATUSES = [
  { value: "pendente", label: "Pendente" },
  { value: "validado", label: "Validado" },
  { value: "rejeitado", label: "Rejeitado" },
] as const

export const JOB_STATUSES = [
  { value: "aberta", label: "Aberta" },
  { value: "fechada", label: "Fechada" },
  { value: "rascunho", label: "Rascunho" },
] as const

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
}

export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "—"
  const d = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d)
}

export function formatDateTime(date: Date | string | null | undefined) {
  if (!date) return "—"
  const d = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d)
}

export function formatFileSize(bytes: number | null | undefined) {
  if (!bytes) return "—"
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
