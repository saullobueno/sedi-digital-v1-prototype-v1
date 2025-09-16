import { TableProps, Tag } from "antd";

export interface DataType {
  key: string;
  contractId: string;          // ID/num. do contrato ou SOW
  supplier: string;            // fornecedor/terceiro
  cnpj: string;
  owner: string;               // responsável interno (gestor do contrato)
  category: "TI" | "Marketing" | "Jurídico" | "Financeiro" | "Facilities" | "RH" | "Ambiental" | "Logística" | "Segurança" | "Outros";
  service: string;             // descrição curta do serviço
  scope: string;               // escopo principal (SLA, itens do SOW)
  billing: "Mensal" | "Por Tarefa" | "Por Hora" | "Fixo" | "Trimestral" | "Anual";
  amount: number;              // valor base (R$) por ciclo/conforme billing
  startDate: string;
  endDate?: string;            // vazio se vigente sem término
  autoRenewal?: boolean;       // renovação automática
  renewalNoticeDays?: number;  // antecedência para aviso de não renovação
  slaDays?: number;            // prazo-alvo do SLA (dias)
  kpis: string[];              // KPIs principais
  compliance: string[];        // ["Contrato Assinado","Seguro OK","LGPD OK","Certidões OK","Pendências"]
  status: string[];            // ["Ativo","Em Execução","Atrasado","Encerrado","Suspenso","Rescisão","Renovação Pendente"]
  lastEvaluation?: string;     // última avaliação/performance review
  performanceScore?: number;   // 0-100
  poNumber?: string;           // pedido de compra vinculado
  createdAt: string;
}

export const columns: TableProps<DataType>["columns"] = [
  {
    title: "Contrato",
    key: "contractId",
    dataIndex: "contractId",
  },
  {
    title: "Fornecedor",
    key: "supplier",
    dataIndex: "supplier",
    render: (_, r) => (
      <div className="flex flex-col">
        <span className="font-medium">{r.supplier}</span>
        <span className="text-xs text-gray-500">{r.cnpj}</span>
      </div>
    ),
  },
  {
    title: "Gestor Interno",
    key: "owner",
    dataIndex: "owner",
  },
  {
    title: "Categoria",
    key: "category",
    dataIndex: "category",
  },
  {
    title: "Serviço",
    key: "service",
    dataIndex: "service",
  },
  {
    title: "Escopo",
    key: "scope",
    dataIndex: "scope",
  },
  {
    title: "Faturamento",
    key: "billing",
    dataIndex: "billing",
  },
  {
    title: "Valor (R$)",
    key: "amount",
    dataIndex: "amount",
    render: (v) => <span>R$ {Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>,
    // exemplo de ordenação:
    // sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "SLA",
    key: "slaDays",
    dataIndex: "slaDays",
    render: (v) => (v ? <span>{v} dias</span> : <i className="text-gray-400">—</i>),
  },
  {
    title: "KPIs",
    key: "kpis",
    dataIndex: "kpis",
    render: (_, r) => (
      <>
        {r.kpis.map((k) => (
          <Tag key={k}>{k}</Tag>
        ))}
      </>
    ),
  },
  {
    title: "Compliance",
    key: "compliance",
    dataIndex: "compliance",
    render: (_, { compliance }) => (
      <>
        {compliance.map((c) => {
          let color: any = "blue";
          if (c.includes("OK") || c.includes("Assinado")) color = "green";
          if (c.includes("Pendência") || c.includes("Pendências")) color = "volcano";
          return (
            <Tag color={color} key={c}>
              {c}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => (
      <>
        {status.map((s) => {
          let color: any = "processing";
          if (s === "Ativo") color = "green";
          if (s === "Em Execução") color = "geekblue";
          if (s === "Atrasado") color = "red";
          if (s === "Encerrado") color = "default";
          if (s === "Suspenso") color = "orange";
          if (s === "Rescisão") color = "magenta";
          if (s === "Renovação Pendente") color = "gold";
          return (
            <Tag color={color} key={s}>
              {s}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Vigência",
    key: "startDate",
    dataIndex: "startDate",
    render: (_, r) => {
      const start = new Date(r.startDate).toLocaleDateString("pt-BR");
      const end = r.endDate ? new Date(r.endDate).toLocaleDateString("pt-BR") : "—";
      return <span>{start} — {end}</span>;
    },
  },
  {
    title: "Renovação",
    key: "autoRenewal",
    dataIndex: "autoRenewal",
    render: (_, r) => (
      <div className="flex flex-col">
        <span>{r.autoRenewal ? "Automática" : "Manual"}</span>
        <span className="text-xs text-gray-500">
          {r.renewalNoticeDays ? `Aviso: ${r.renewalNoticeDays} dias` : "—"}
        </span>
      </div>
    ),
  },
  {
    title: "Performance",
    key: "performanceScore",
    dataIndex: "performanceScore",
    render: (v) => (v !== undefined ? <span>{v}/100</span> : <i className="text-gray-400">—</i>),
  },
  {
    title: "Pedido (PO)",
    key: "poNumber",
    dataIndex: "poNumber",
    render: (v) => v ?? <i className="text-gray-400">—</i>,
  },
  {
    title: "Última Avaliação",
    key: "lastEvaluation",
    dataIndex: "lastEvaluation",
    render: (value) => (value ? <span>{new Date(value).toLocaleDateString("pt-BR")}</span> : <i className="text-gray-400">—</i>),
  },
  {
    title: "Criado em",
    key: "createdAt",
    dataIndex: "createdAt",
    render: (value) => <span>{new Date(value).toLocaleDateString("pt-BR")}</span>,
  },
];

export const data: DataType[] = [
  {
    key: "1",
    contractId: "OUT-2025-001",
    supplier: "CloudNet Serviços",
    cnpj: "12.345.678/0001-10",
    owner: "João Pereira",
    category: "TI",
    service: "Suporte N2 e N3",
    scope: "SLA 8x5, resposta 2h, resolução 8h",
    billing: "Mensal",
    amount: 18500,
    startDate: "2024-09-01T00:00:00Z",
    autoRenewal: true,
    renewalNoticeDays: 60,
    slaDays: 1,
    kpis: ["SLA Cumprido", "CSAT ≥ 90%"],
    compliance: ["Contrato Assinado", "LGPD OK", "Certidões OK"],
    status: ["Ativo", "Em Execução"],
    lastEvaluation: "2025-08-20T00:00:00Z",
    performanceScore: 92,
    poNumber: "PO-001234",
    createdAt: "2025-09-01T09:00:00Z",
  },
  {
    key: "2",
    contractId: "OUT-2025-002",
    supplier: "Mídia360",
    cnpj: "98.765.432/0001-55",
    owner: "Larissa Nogueira",
    category: "Marketing",
    service: "Gestão de Ads",
    scope: "Planejamento, execução e BI mensal",
    billing: "Mensal",
    amount: 12500,
    startDate: "2025-03-01T00:00:00Z",
    autoRenewal: false,
    renewalNoticeDays: 30,
    kpis: ["ROI ≥ 3x", "Leads Qualificados"],
    compliance: ["Contrato Assinado", "LGPD OK"],
    status: ["Ativo", "Em Execução"],
    lastEvaluation: "2025-08-31T00:00:00Z",
    performanceScore: 88,
    createdAt: "2025-09-01T10:15:00Z",
  },
  {
    key: "3",
    contractId: "OUT-2025-003",
    supplier: "Lex & Co",
    cnpj: "33.444.555/0001-77",
    owner: "Beatriz Moura",
    category: "Jurídico",
    service: "Contencioso Tributário",
    scope: "Elaboração de peças, audiências e pareceres",
    billing: "Por Hora",
    amount: 480,
    startDate: "2024-11-10T00:00:00Z",
    kpis: ["Prazos OK", "Qualidade Técnica"],
    compliance: ["Contrato Assinado", "Certidões OK"],
    status: ["Ativo"],
    lastEvaluation: "2025-07-10T00:00:00Z",
    performanceScore: 86,
    poNumber: "PO-001310",
    createdAt: "2025-09-01T11:30:00Z",
  },
  {
    key: "4",
    contractId: "OUT-2025-004",
    supplier: "Contábil Alfa",
    cnpj: "22.111.222/0001-66",
    owner: "Rafael Gomes",
    category: "Financeiro",
    service: "BPO Financeiro",
    scope: "Contas a pagar/receber, conciliação e DRE",
    billing: "Mensal",
    amount: 14500,
    startDate: "2023-01-20T00:00:00Z",
    autoRenewal: true,
    renewalNoticeDays: 45,
    kpis: ["Fechamento em D+3", "Acurácia ≥ 99%"],
    compliance: ["Contrato Assinado", "LGPD OK"],
    status: ["Ativo", "Em Execução"],
    lastEvaluation: "2025-08-15T00:00:00Z",
    performanceScore: 90,
    createdAt: "2025-09-01T12:10:00Z",
  },
  {
    key: "5",
    contractId: "OUT-2025-005",
    supplier: "Fix & Clean",
    cnpj: "44.555.666/0001-88",
    owner: "Patrícia Lima",
    category: "Facilities",
    service: "Limpeza Predial",
    scope: "Equipe 6x/semana, insumos inclusos",
    billing: "Mensal",
    amount: 17800,
    startDate: "2020-05-11T00:00:00Z",
    kpis: ["Checklists 100%", "Satisfação ≥ 95%"],
    compliance: ["Contrato Assinado", "Seguro OK"],
    status: ["Ativo"],
    lastEvaluation: "2025-08-05T00:00:00Z",
    performanceScore: 91,
    poNumber: "PO-000987",
    createdAt: "2025-09-01T12:40:00Z",
  },
  {
    key: "6",
    contractId: "OUT-2025-006",
    supplier: "Tech Recruiters",
    cnpj: "71.888.999/0001-12",
    owner: "Juliana Rocha",
    category: "RH",
    service: "Hunting Tech",
    scope: "Recrutamento para vagas sênior TI",
    billing: "Por Tarefa",
    amount: 8500,
    startDate: "2024-06-03T00:00:00Z",
    kpis: ["Time-to-Hire ≤ 35d", "Qualidade shortlist"],
    compliance: ["Contrato Assinado"],
    status: ["Ativo"],
    performanceScore: 84,
    createdAt: "2025-09-01T13:20:00Z",
  },
  {
    key: "7",
    contractId: "OUT-2025-007",
    supplier: "BlueOps",
    cnpj: "10.203.405/0001-01",
    owner: "Gustavo Nunes",
    category: "TI",
    service: "NOC 24x7",
    scope: "Monitoramento infra e incidentes",
    billing: "Mensal",
    amount: 22000,
    startDate: "2023-12-01T00:00:00Z",
    slaDays: 1,
    kpis: ["MTTR ≤ 2h", "Disponibilidade ≥ 99,9%"],
    compliance: ["Contrato Assinado", "LGPD OK"],
    status: ["Ativo", "Em Execução"],
    lastEvaluation: "2025-08-28T00:00:00Z",
    performanceScore: 89,
    createdAt: "2025-09-01T14:05:00Z",
  },
  {
    key: "8",
    contractId: "OUT-2025-008",
    supplier: "EcoLegal Consultoria",
    cnpj: "77.666.555/0001-33",
    owner: "Camila Santos",
    category: "Ambiental",
    service: "Gestão de Resíduos",
    scope: "CADRI, MTR e auditorias trimestrais",
    billing: "Trimestral",
    amount: 7800,
    startDate: "2025-07-01T00:00:00Z",
    kpis: ["Conformidade 100%"],
    compliance: ["Contrato Assinado", "Certidões OK"],
    status: ["Ativo"],
    createdAt: "2025-09-01T15:30:00Z",
  },
  {
    key: "9",
    contractId: "OUT-2025-009",
    supplier: "Sprint Express",
    cnpj: "05.444.333/0001-22",
    owner: "Paulo Henrique",
    category: "Logística",
    service: "Courier Regional",
    scope: "Coletas e entregas diárias",
    billing: "Mensal",
    amount: 5200.5,
    startDate: "2019-09-10T00:00:00Z",
    kpis: ["OTD ≥ 98%"],
    compliance: ["Contrato Assinado"],
    status: ["Ativo"],
    lastEvaluation: "2025-08-10T00:00:00Z",
    performanceScore: 93,
    createdAt: "2025-09-01T16:10:00Z",
  },
  {
    key: "10",
    contractId: "OUT-2025-010",
    supplier: "Shield Security",
    cnpj: "19.283.746/0001-09",
    owner: "Renata Martins",
    category: "Segurança",
    service: "CFTV + Portaria",
    scope: "Monitoramento 24/7, resposta em 15min",
    billing: "Mensal",
    amount: 21000,
    startDate: "2022-02-14T00:00:00Z",
    kpis: ["Tempo de resposta", "Incidentes resolvidos"],
    compliance: ["Contrato Assinado", "Seguro OK"],
    status: ["Ativo", "Em Execução"],
    performanceScore: 87,
    createdAt: "2025-09-01T17:00:00Z",
  },
  {
    key: "11",
    contractId: "OUT-2025-011",
    supplier: "PaperLess",
    cnpj: "60.505.707/0001-44",
    owner: "Diego Costa",
    category: "Outros",
    service: "Digitalização e GED",
    scope: "Indexação e guarda digital",
    billing: "Por Tarefa",
    amount: 4200,
    startDate: "2021-08-22T00:00:00Z",
    kpis: ["Acurácia ≥ 99%"],
    compliance: ["Contrato Assinado", "LGPD OK"],
    status: ["Encerrado"],
    lastEvaluation: "2025-06-30T00:00:00Z",
    performanceScore: 82,
    createdAt: "2025-09-02T08:10:00Z",
  },
  {
    key: "12",
    contractId: "OUT-2025-012",
    supplier: "ManutPro",
    cnpj: "88.999.000/0001-55",
    owner: "Aline Barbosa",
    category: "Facilities",
    service: "Manutenção Predial",
    scope: "Preventiva mensal e corretiva",
    billing: "Mensal",
    amount: 9800,
    startDate: "2020-10-30T00:00:00Z",
    kpis: ["Backlog ≤ 5 OS"],
    compliance: ["Contrato Assinado", "Seguro OK"],
    status: ["Suspenso"],
    lastEvaluation: "2025-07-15T00:00:00Z",
    performanceScore: 65,
    createdAt: "2025-09-02T09:00:00Z",
  },
  {
    key: "13",
    contractId: "OUT-2025-013",
    supplier: "PMO Partners",
    cnpj: "12.120.120/0001-12",
    owner: "Beatriz Moura",
    category: "Outros",
    service: "Gestão de Projetos",
    scope: "Escritório de projetos e governança",
    billing: "Mensal",
    amount: 15000,
    startDate: "2018-04-05T00:00:00Z",
    kpis: ["Entrega no prazo"],
    compliance: ["Contrato Assinado"],
    status: ["Ativo"],
    performanceScore: 90,
    createdAt: "2025-09-02T09:50:00Z",
  },
  {
    key: "14",
    contractId: "OUT-2025-014",
    supplier: "SecOps Labs",
    cnpj: "21.212.212/0001-21",
    owner: "Rodrigo Pires",
    category: "TI",
    service: "Pentest e AppSec",
    scope: "Pentest semestral + SAST/DAST",
    billing: "Trimestral",
    amount: 23000,
    startDate: "2024-01-18T00:00:00Z",
    kpis: ["Correções em D+15"],
    compliance: ["Contrato Assinado", "LGPD OK"],
    status: ["Ativo"],
    performanceScore: 85,
    createdAt: "2025-09-02T10:25:00Z",
  },
  {
    key: "15",
    contractId: "OUT-2025-015",
    supplier: "TaxOne",
    cnpj: "31.313.313/0001-31",
    owner: "Ana Paula",
    category: "Financeiro",
    service: "Consultoria Fiscal",
    scope: "Apuração tributos e compliance",
    billing: "Mensal",
    amount: 11200,
    startDate: "2023-05-02T00:00:00Z",
    kpis: ["Conformidade 100%"],
    compliance: ["Contrato Assinado", "Certidões OK"],
    status: ["Ativo"],
    lastEvaluation: "2025-08-12T00:00:00Z",
    performanceScore: 89,
    createdAt: "2025-09-02T11:40:00Z",
  },
  {
    key: "16",
    contractId: "OUT-2025-016",
    supplier: "PeopleCare",
    cnpj: "41.414.414/0001-41",
    owner: "Luciana Prado",
    category: "RH",
    service: "Assistência Psicossocial",
    scope: "Atendimento aos colaboradores",
    billing: "Mensal",
    amount: 5900,
    startDate: "2022-12-12T00:00:00Z",
    kpis: ["NPS ≥ 70"],
    compliance: ["Contrato Assinado", "LGPD OK"],
    status: ["Ativo"],
    performanceScore: 83,
    createdAt: "2025-09-02T12:20:00Z",
  },
  {
    key: "17",
    contractId: "OUT-2025-017",
    supplier: "RouteX",
    cnpj: "51.515.515/0001-51",
    owner: "Felipe Andrade",
    category: "Logística",
    service: "Roteirização e Frete",
    scope: "Operação dedicada de last mile",
    billing: "Fixo",
    amount: 68000,
    startDate: "2024-04-01T00:00:00Z",
    autoRenewal: true,
    renewalNoticeDays: 90,
    kpis: ["OTIF ≥ 97%"],
    compliance: ["Contrato Assinado", "Seguro OK"],
    status: ["Renovação Pendente"],
    lastEvaluation: "2025-08-30T00:00:00Z",
    performanceScore: 78,
    createdAt: "2025-09-02T13:00:00Z",
  },
  {
    key: "18",
    contractId: "OUT-2025-018",
    supplier: "GreenDocs",
    cnpj: "88.999.000/0001-55",
    owner: "Sofia Rezende",
    category: "Ambiental",
    service: "Consultoria de Licenças",
    scope: "EIA/RIMA, licenças e relatórios",
    billing: "Por Tarefa",
    amount: 9200,
    startDate: "2019-02-18T00:00:00Z",
    kpis: ["Prazo de protocolo"],
    compliance: ["Contrato Assinado", "Certidões OK"],
    status: ["Encerrado"],
    performanceScore: 80,
    createdAt: "2025-09-02T14:10:00Z",
  },
  {
    key: "19",
    contractId: "OUT-2025-019",
    supplier: "AdsBoost",
    cnpj: "71.717.717/0001-71",
    owner: "Natália Ferreira",
    category: "Marketing",
    service: "Criação e Performance",
    scope: "Campanhas multi-canal",
    billing: "Mensal",
    amount: 9800,
    startDate: "2022-10-15T00:00:00Z",
    kpis: ["CPL alvo", "Taxa conv."],
    compliance: ["Contrato Assinado", "LGPD OK"],
    status: ["Suspenso"],
    lastEvaluation: "2025-07-20T00:00:00Z",
    performanceScore: 70,
    createdAt: "2025-09-02T15:25:00Z",
  },
  {
    key: "20",
    contractId: "OUT-2025-020",
    supplier: "DataLake.io",
    cnpj: "81.818.818/0001-81",
    owner: "Henrique Oliveira",
    category: "TI",
    service: "Data Platform (SaaS)",
    scope: "Ingestão, storage e governança",
    billing: "Anual",
    amount: 120000,
    startDate: "2023-10-09T00:00:00Z",
    endDate: "2026-10-08T00:00:00Z",
    autoRenewal: true,
    renewalNoticeDays: 90,
    slaDays: 1,
    kpis: ["Disponibilidade ≥ 99,9%", "Tempo de ingestão"],
    compliance: ["Contrato Assinado", "LGPD OK"],
    status: ["Ativo", "Em Execução"],
    lastEvaluation: "2025-08-22T00:00:00Z",
    performanceScore: 94,
    poNumber: "PO-002210",
    createdAt: "2025-09-02T16:45:00Z",
  },
];
