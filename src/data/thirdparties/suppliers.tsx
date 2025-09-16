import { TableProps, Tag } from "antd";

export interface DataType {
  key: string;
  supplier: string;
  cnpj: string;
  category: "Vistoria Técnica" | "Corpo de Bombeiros" | "Meio Ambiente" | "Vigilância Sanitária" | "Junta Comercial" | "Fiscal/Tributário" | "Regularização Imobiliária" | "Outros";
  coverage: string;                 // ex.: "SP, RJ" ou "São Paulo, Campinas"
  serviceScope: string;             // ex.: "Renovação AVCB", "Alvará de Funcionamento"
  priceModel: "Fixo" | "Hora" | "Tarefa" | "Mensal";
  rate: number;                      // valor (R$) conforme priceModel
  minFee?: number;                   // taxa mínima, se houver
  paymentTerms: string;              // ex.: "30/60", "15 dias", "Antecipado"
  avgLeadTimeDays: number;           // prazo médio (dias)
  slaDays: number;                   // SLA contratado (dias)
  compliance: string[];              // ["Alvará OK" | "Alvará Vencido" | "Certidões OK" | "Certidões Pendentes" | "Seguro OK" | "Seguro Vencido" | "Contrato Assinado"]
  status: string[];                  // ["Ativo" | "Em Homologação" | "Suspenso" | "Inadimplente" | "Em Renovação"]
  contact: string;
  phone?: string;
  email: string;
  contractStart: string;
  contractEnd?: string;
  lastAudit?: string;
  createdAt: string;
}

export const columns: TableProps<DataType>["columns"] = [
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
    title: "Categoria",
    key: "category",
    dataIndex: "category",
  },
  {
    title: "Abrangência",
    key: "coverage",
    dataIndex: "coverage",
  },
  {
    title: "Escopo",
    key: "serviceScope",
    dataIndex: "serviceScope",
  },
  {
    title: "Modelo",
    key: "priceModel",
    dataIndex: "priceModel",
  },
  {
    title: "Valor (R$)",
    key: "rate",
    dataIndex: "rate",
    render: (value) => <span>R$ {Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>,
  },
  {
    title: "Taxa Mín. (R$)",
    key: "minFee",
    dataIndex: "minFee",
    render: (value) =>
      value ? <span>R$ {Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span> : <i className="text-gray-400">—</i>,
  },
  {
    title: "Condição de Pagamento",
    key: "paymentTerms",
    dataIndex: "paymentTerms",
  },
  {
    title: "Lead Time Médio",
    key: "avgLeadTimeDays",
    dataIndex: "avgLeadTimeDays",
    render: (v) => <span>{v} dias</span>,
  },
  {
    title: "SLA",
    key: "slaDays",
    dataIndex: "slaDays",
    render: (v) => <span>{v} dias</span>,
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
          if (c.includes("Vencido")) color = "red";
          if (c.includes("Pendentes")) color = "volcano";
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
          if (s === "Em Homologação") color = "geekblue";
          if (s === "Suspenso") color = "orange";
          if (s === "Inadimplente") color = "red";
          if (s === "Em Renovação") color = "gold";
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
    title: "Contato",
    key: "contact",
    dataIndex: "contact",
    render: (_, r) => (
      <div className="flex flex-col">
        <span>{r.contact}</span>
        <span className="text-xs text-gray-500">{r.email}{r.phone ? ` • ${r.phone}` : ""}</span>
      </div>
    ),
  },
  {
    title: "Contrato",
    key: "contractStart",
    dataIndex: "contractStart",
    render: (_, r) => {
      const start = new Date(r.contractStart).toLocaleDateString("pt-BR");
      const end = r.contractEnd ? new Date(r.contractEnd).toLocaleDateString("pt-BR") : "—";
      return <span>{start} — {end}</span>;
    },
  },
  {
    title: "Última Auditoria",
    key: "lastAudit",
    dataIndex: "lastAudit",
    render: (value) => (value ? <span>{new Date(value).toLocaleDateString("pt-BR")}</span> : <i className="text-gray-400">—</i>),
  },
  {
    title: "Criado em",
    key: "createdAt",
    dataIndex: "createdAt",
    render(value) {
      return <span>{new Date(value).toLocaleDateString("pt-BR")}</span>;
    },
  },
];

export const data: DataType[] = [
  {
    key: "1",
    supplier: "Alpha Regularizações",
    cnpj: "12.345.678/0001-10",
    category: "Vistoria Técnica",
    coverage: "São Paulo, Campinas",
    serviceScope: "Alvará de Funcionamento",
    priceModel: "Tarefa",
    rate: 1800,
    minFee: 800,
    paymentTerms: "30 dias",
    avgLeadTimeDays: 12,
    slaDays: 15,
    compliance: ["Alvará OK", "Certidões OK", "Contrato Assinado"],
    status: ["Ativo"],
    contact: "Mariana Silva",
    phone: "(11) 98888-1111",
    email: "contato@alphareg.com.br",
    contractStart: "2024-09-01T00:00:00Z",
    contractEnd: "2026-08-31T00:00:00Z",
    lastAudit: "2025-08-20T00:00:00Z",
    createdAt: "2025-09-01T09:00:00Z",
  },
  {
    key: "2",
    supplier: "Bombeiros Fast",
    cnpj: "98.765.432/0001-55",
    category: "Corpo de Bombeiros",
    coverage: "SP, RJ",
    serviceScope: "Renovação AVCB",
    priceModel: "Fixo",
    rate: 3500,
    paymentTerms: "50% antecipado, 50% 15 dias",
    avgLeadTimeDays: 18,
    slaDays: 20,
    compliance: ["Seguro OK", "Certidões OK"],
    status: ["Em Renovação"],
    contact: "Rafael Souza",
    email: "comercial@bombeirosfast.com",
    contractStart: "2023-05-10T00:00:00Z",
    contractEnd: "2025-11-09T00:00:00Z",
    lastAudit: "2025-07-15T00:00:00Z",
    createdAt: "2025-09-01T10:15:00Z",
  },
  {
    key: "3",
    supplier: "EcoLegal Consultoria",
    cnpj: "33.444.555/0001-77",
    category: "Meio Ambiente",
    coverage: "SP, MG, PR",
    serviceScope: "Licença Ambiental Operação",
    priceModel: "Hora",
    rate: 280,
    minFee: 1200,
    paymentTerms: "30/60",
    avgLeadTimeDays: 30,
    slaDays: 35,
    compliance: ["Certidões Pendentes"],
    status: ["Em Homologação"],
    contact: "Patrícia Lima",
    phone: "(11) 91234-5678",
    email: "patricia@ecolegal.com.br",
    contractStart: "2025-08-01T00:00:00Z",
    createdAt: "2025-09-01T11:20:00Z",
  },
  {
    key: "4",
    supplier: "Sanitiza+",
    cnpj: "22.111.222/0001-66",
    category: "Vigilância Sanitária",
    coverage: "Grande SP",
    serviceScope: "Licença Sanitária",
    priceModel: "Tarefa",
    rate: 2200,
    paymentTerms: "Antecipado",
    avgLeadTimeDays: 10,
    slaDays: 12,
    compliance: ["Alvará OK", "Seguro Vencido"],
    status: ["Suspenso"],
    contact: "Tiago Ferreira",
    email: "contato@sanitizamais.com",
    contractStart: "2022-10-01T00:00:00Z",
    contractEnd: "2025-10-01T00:00:00Z",
    lastAudit: "2025-06-02T00:00:00Z",
    createdAt: "2025-09-01T12:35:00Z",
  },
  {
    key: "5",
    supplier: "Cartório & Junta Pro",
    cnpj: "44.555.666/0001-88",
    category: "Junta Comercial",
    coverage: "SP",
    serviceScope: "Abertura e Alteração Contratual",
    priceModel: "Tarefa",
    rate: 950,
    paymentTerms: "15 dias",
    avgLeadTimeDays: 7,
    slaDays: 10,
    compliance: ["Certidões OK", "Contrato Assinado"],
    status: ["Ativo"],
    contact: "Juliana Rocha",
    phone: "(11) 97777-2222",
    email: "juliana@juntapro.com",
    contractStart: "2021-01-15T00:00:00Z",
    contractEnd: "2026-01-14T00:00:00Z",
    createdAt: "2025-09-01T13:10:00Z",
  },
  {
    key: "6",
    supplier: "Fisco Expert",
    cnpj: "71.888.999/0001-12",
    category: "Fiscal/Tributário",
    coverage: "SP, RJ, ES",
    serviceScope: "Inscrição Estadual/Municipal",
    priceModel: "Hora",
    rate: 230,
    paymentTerms: "30 dias",
    avgLeadTimeDays: 9,
    slaDays: 12,
    compliance: ["Alvará OK", "Certidões OK"],
    status: ["Ativo"],
    contact: "Gustavo Nunes",
    email: "gustavo@fiscoexpert.com.br",
    contractStart: "2024-03-01T00:00:00Z",
    createdAt: "2025-09-01T15:20:00Z",
  },
  {
    key: "7",
    supplier: "Imob Regulariza",
    cnpj: "10.203.405/0001-01",
    category: "Regularização Imobiliária",
    coverage: "SP capital",
    serviceScope: "Habite-se e Certidões de Zoneamento",
    priceModel: "Fixo",
    rate: 5200,
    paymentTerms: "20/40",
    avgLeadTimeDays: 25,
    slaDays: 30,
    compliance: ["Certidões OK"],
    status: ["Ativo"],
    contact: "Camila Santos",
    phone: "(11) 95555-9090",
    email: "camila@imobregulariza.com",
    contractStart: "2023-07-01T00:00:00Z",
    contractEnd: "2026-06-30T00:00:00Z",
    lastAudit: "2025-07-25T00:00:00Z",
    createdAt: "2025-09-01T16:05:00Z",
  },
  {
    key: "8",
    supplier: "GreenDocs",
    cnpj: "77.666.555/0001-33",
    category: "Meio Ambiente",
    coverage: "SP interior",
    serviceScope: "CADRI e Manifesto de Resíduos",
    priceModel: "Tarefa",
    rate: 2600,
    minFee: 1000,
    paymentTerms: "Antecipado",
    avgLeadTimeDays: 22,
    slaDays: 25,
    compliance: ["Certidões Pendentes"],
    status: ["Em Homologação"],
    contact: "Paulo Henrique",
    email: "paulo@greendocs.com.br",
    contractStart: "2025-08-20T00:00:00Z",
    createdAt: "2025-09-01T17:30:00Z",
  },
  {
    key: "9",
    supplier: "FireCheck",
    cnpj: "05.444.333/0001-22",
    category: "Corpo de Bombeiros",
    coverage: "RJ",
    serviceScope: "Projeto e Renovação AVCB",
    priceModel: "Hora",
    rate: 200,
    paymentTerms: "30 dias",
    avgLeadTimeDays: 14,
    slaDays: 18,
    compliance: ["Alvará OK", "Seguro OK"],
    status: ["Ativo"],
    contact: "Renata Martins",
    email: "renata@firecheck.com",
    contractStart: "2022-11-01T00:00:00Z",
    createdAt: "2025-09-02T08:30:00Z",
  },
  {
    key: "10",
    supplier: "Saúde & Licenças",
    cnpj: "19.283.746/0001-09",
    category: "Vigilância Sanitária",
    coverage: "SP, RJ",
    serviceScope: "Licença Sanitária para Alimentos",
    priceModel: "Tarefa",
    rate: 2800,
    paymentTerms: "30/60",
    avgLeadTimeDays: 16,
    slaDays: 20,
    compliance: ["Alvará Vencido"],
    status: ["Suspenso"],
    contact: "Aline Barbosa",
    email: "aline@saudelicencas.com",
    contractStart: "2021-05-12T00:00:00Z",
    contractEnd: "2024-05-11T00:00:00Z",
    lastAudit: "2025-05-15T00:00:00Z",
    createdAt: "2025-09-02T09:20:00Z",
  },
  {
    key: "11",
    supplier: "Docs Já",
    cnpj: "60.505.707/0001-44",
    category: "Junta Comercial",
    coverage: "SP",
    serviceScope: "Viabilidade e DBE",
    priceModel: "Fixo",
    rate: 1200,
    paymentTerms: "15 dias",
    avgLeadTimeDays: 5,
    slaDays: 7,
    compliance: ["Certidões OK", "Contrato Assinado"],
    status: ["Ativo"],
    contact: "Diego Costa",
    email: "diego@docsja.com",
    contractStart: "2020-03-01T00:00:00Z",
    contractEnd: "2026-03-01T00:00:00Z",
    createdAt: "2025-09-02T10:10:00Z",
  },
  {
    key: "12",
    supplier: "Tributax",
    cnpj: "88.999.000/0001-55",
    category: "Fiscal/Tributário",
    coverage: "Nacional (remoto)",
    serviceScope: "Alvará de Localização e Funcionamento",
    priceModel: "Mensal",
    rate: 3500,
    paymentTerms: "Mensal 30 dias",
    avgLeadTimeDays: 12,
    slaDays: 15,
    compliance: ["Certidões OK"],
    status: ["Ativo"],
    contact: "Beatriz Moura",
    email: "beatriz@tributax.com.br",
    contractStart: "2024-09-01T00:00:00Z",
    createdAt: "2025-09-02T11:00:00Z",
  },
  {
    key: "13",
    supplier: "Zelo Ambiental",
    cnpj: "12.120.120/0001-12",
    category: "Meio Ambiente",
    coverage: "SP",
    serviceScope: "EIA/RIMA e Licenças",
    priceModel: "Hora",
    rate: 310,
    paymentTerms: "30/60/90",
    avgLeadTimeDays: 45,
    slaDays: 50,
    compliance: ["Seguro OK", "Certidões OK"],
    status: ["Ativo"],
    contact: "Rodrigo Pires",
    email: "rodrigo@zeloambiental.com",
    contractStart: "2019-04-05T00:00:00Z",
    createdAt: "2025-09-02T12:10:00Z",
  },
  {
    key: "14",
    supplier: "OnBoard Licenças",
    cnpj: "21.212.212/0001-21",
    category: "Outros",
    coverage: "SP, PR",
    serviceScope: "Gestão de Protocolos",
    priceModel: "Mensal",
    rate: 1900,
    paymentTerms: "Mensal 10 dias",
    avgLeadTimeDays: 6,
    slaDays: 8,
    compliance: ["Certidões OK", "Contrato Assinado"],
    status: ["Em Renovação"],
    contact: "Ana Paula",
    email: "ana@onboardlicencas.com",
    contractStart: "2022-02-14T00:00:00Z",
    contractEnd: "2025-10-01T00:00:00Z",
    createdAt: "2025-09-02T13:00:00Z",
  },
  {
    key: "15",
    supplier: "CityHall Express",
    cnpj: "31.313.313/0001-31",
    category: "Junta Comercial",
    coverage: "Campinas e Região",
    serviceScope: "Baixa e Encerramento",
    priceModel: "Tarefa",
    rate: 1400,
    paymentTerms: "Antecipado",
    avgLeadTimeDays: 8,
    slaDays: 10,
    compliance: ["Certidões OK"],
    status: ["Ativo"],
    contact: "Luciana Prado",
    email: "luciana@cityhallx.com",
    contractStart: "2023-05-02T00:00:00Z",
    createdAt: "2025-09-02T14:15:00Z",
  },
  {
    key: "16",
    supplier: "Vigia Saúde",
    cnpj: "41.414.414/0001-41",
    category: "Vigilância Sanitária",
    coverage: "SP capital",
    serviceScope: "Boas Práticas e POPs",
    priceModel: "Hora",
    rate: 180,
    paymentTerms: "15 dias",
    avgLeadTimeDays: 4,
    slaDays: 7,
    compliance: ["Alvará OK", "Seguro OK"],
    status: ["Ativo"],
    contact: "Felipe Andrade",
    email: "felipe@vigiasaude.com",
    contractStart: "2024-04-01T00:00:00Z",
    createdAt: "2025-09-02T15:10:00Z",
  },
  {
    key: "17",
    supplier: "Arquitetura Urbana",
    cnpj: "51.515.515/0001-51",
    category: "Regularização Imobiliária",
    coverage: "SP e ABC",
    serviceScope: "Reforma com Anotação de Responsabilidade",
    priceModel: "Fixo",
    rate: 4800,
    paymentTerms: "30 dias",
    avgLeadTimeDays: 20,
    slaDays: 25,
    compliance: ["Certidões OK"],
    status: ["Ativo"],
    contact: "Sofia Rezende",
    email: "sofia@arqurbana.com",
    contractStart: "2019-02-18T00:00:00Z",
    createdAt: "2025-09-02T16:05:00Z",
  },
  {
    key: "18",
    supplier: "FireSafe Engenharia",
    cnpj: "61.616.616/0001-61",
    category: "Corpo de Bombeiros",
    coverage: "SP",
    serviceScope: "Projeto Técnico Simplificado",
    priceModel: "Tarefa",
    rate: 1900,
    paymentTerms: "20/40",
    avgLeadTimeDays: 9,
    slaDays: 12,
    compliance: ["Alvará OK", "Certidões OK"],
    status: ["Ativo"],
    contact: "Matheus Pires",
    email: "matheus@firesafe.com.br",
    contractStart: "2021-09-27T00:00:00Z",
    createdAt: "2025-09-03T09:00:00Z",
  },
  {
    key: "19",
    supplier: "Licença Fácil",
    cnpj: "71.717.717/0001-71",
    category: "Outros",
    coverage: "Nacional (capitais)",
    serviceScope: "Acompanhamento de Processos",
    priceModel: "Mensal",
    rate: 2400,
    paymentTerms: "Mensal 30 dias",
    avgLeadTimeDays: 5,
    slaDays: 7,
    compliance: ["Certidões OK"],
    status: ["Inadimplente"],
    contact: "Natália Ferreira",
    email: "natalia@licencafacil.com",
    contractStart: "2022-10-15T00:00:00Z",
    lastAudit: "2025-08-10T00:00:00Z",
    createdAt: "2025-09-03T10:40:00Z",
  },
  {
    key: "20",
    supplier: "Protocola Aí",
    cnpj: "81.818.818/0001-81",
    category: "Outros",
    coverage: "SP, RJ, MG",
    serviceScope: "Protocolos e Despachos",
    priceModel: "Hora",
    rate: 160,
    paymentTerms: "Semanal",
    avgLeadTimeDays: 3,
    slaDays: 5,
    compliance: ["Certidões OK", "Contrato Assinado"],
    status: ["Ativo"],
    contact: "Henrique Oliveira",
    email: "henrique@protocola.ai",
    contractStart: "2023-01-09T00:00:00Z",
    createdAt: "2025-09-03T11:55:00Z",
  },
];
