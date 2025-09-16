import { TableProps, Tag } from "antd";

export interface DataType {
  key: string;
  billNumber: string;
  supplier: string;
  cnpj: string;
  category: string;
  costCenter: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  status: string[]; // ["Pendente" | "Pago" | "Atrasado" | "Agendado" | "Em Aprovação" | "Em Processamento"]
  createdAt: string;
}

export const columns: TableProps<DataType>["columns"] = [
  {
    title: "Doc/Título",
    key: "billNumber",
    dataIndex: "billNumber",
  },
  {
    title: "Fornecedor",
    key: "supplier",
    dataIndex: "supplier",
  },
  {
    title: "CNPJ",
    key: "cnpj",
    dataIndex: "cnpj",
  },
  {
    title: "Categoria",
    key: "category",
    dataIndex: "category",
  },
  {
    title: "Centro de Custo",
    key: "costCenter",
    dataIndex: "costCenter",
  },
  {
    title: "Valor (R$)",
    key: "amount",
    dataIndex: "amount",
    render: (value) => (
      <span>R$ {Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
    ),
  },
  {
    title: "Vencimento",
    key: "dueDate",
    dataIndex: "dueDate",
    render: (value) => <span>{new Date(value).toLocaleDateString("pt-BR")}</span>,
  },
  {
    title: "Pagamento",
    key: "paymentDate",
    dataIndex: "paymentDate",
    render: (value) =>
      value ? (
        <span>{new Date(value).toLocaleDateString("pt-BR")}</span>
      ) : (
        <i className="text-gray-400">—</i>
      ),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          let color = "blue";
          if (tag === "Pago") color = "green";
          if (tag === "Pendente") color = "volcano";
          if (tag === "Atrasado") color = "red";
          if (tag === "Agendado") color = "geekblue";
          if (tag === "Em Aprovação") color = "gold";
          if (tag === "Em Processamento") color = "blue";

          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
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
    billNumber: "CP-2025-001",
    supplier: "Fornecedor Atlas Ltda",
    cnpj: "12.345.678/0001-10",
    category: "Materiais",
    costCenter: "Operações",
    amount: 4580.75,
    dueDate: "2025-09-15T00:00:00Z",
    paymentDate: "2025-09-14T13:00:00Z",
    status: ["Pago"],
    createdAt: "2025-09-01T09:10:00Z",
  },
  {
    key: "2",
    billNumber: "CP-2025-002",
    supplier: "Serviços Beta S.A.",
    cnpj: "98.765.432/0001-55",
    category: "Serviços",
    costCenter: "TI",
    amount: 12000,
    dueDate: "2025-09-10T00:00:00Z",
    paymentDate: undefined,
    status: ["Atrasado"],
    createdAt: "2025-09-02T11:25:00Z",
  },
  {
    key: "3",
    billNumber: "CP-2025-003",
    supplier: "Energia Claro Energia",
    cnpj: "33.444.555/0001-77",
    category: "Utilidades",
    costCenter: "Infraestrutura",
    amount: 3270.4,
    dueDate: "2025-09-20T00:00:00Z",
    paymentDate: undefined,
    status: ["Pendente"],
    createdAt: "2025-09-03T08:45:00Z",
  },
  {
    key: "4",
    billNumber: "CP-2025-004",
    supplier: "RH Gama Consultoria",
    cnpj: "22.111.222/0001-66",
    category: "Serviços",
    costCenter: "Recursos Humanos",
    amount: 8900,
    dueDate: "2025-09-25T00:00:00Z",
    paymentDate: undefined,
    status: ["Em Aprovação"],
    createdAt: "2025-09-04T10:05:00Z",
  },
  {
    key: "5",
    billNumber: "CP-2025-005",
    supplier: "Transp. Delta Logística",
    cnpj: "44.555.666/0001-88",
    category: "Frete",
    costCenter: "Logística",
    amount: 15450.9,
    dueDate: "2025-09-30T00:00:00Z",
    paymentDate: "2025-09-30T14:30:00Z",
    status: ["Em Processamento"],
    createdAt: "2025-09-05T12:30:00Z",
  },
  {
    key: "6",
    billNumber: "CP-2025-006",
    supplier: "Office Plus Papelaria",
    cnpj: "71.888.999/0001-12",
    category: "Materiais",
    costCenter: "Administrativo",
    amount: 780.55,
    dueDate: "2025-10-05T00:00:00Z",
    paymentDate: undefined,
    status: ["Agendado"],
    createdAt: "2025-09-06T09:00:00Z",
  },
  {
    key: "7",
    billNumber: "CP-2025-007",
    supplier: "NetFiber Provedor",
    cnpj: "10.203.405/0001-01",
    category: "Utilidades",
    costCenter: "TI",
    amount: 650.0,
    dueDate: "2025-09-12T00:00:00Z",
    paymentDate: "2025-09-12T09:20:00Z",
    status: ["Pago"],
    createdAt: "2025-09-06T15:40:00Z",
  },
  {
    key: "8",
    billNumber: "CP-2025-008",
    supplier: "Alfa Facilities",
    cnpj: "77.666.555/0001-33",
    category: "Serviços",
    costCenter: "Infraestrutura",
    amount: 4800,
    dueDate: "2025-10-10T00:00:00Z",
    paymentDate: undefined,
    status: ["Pendente"],
    createdAt: "2025-09-07T13:50:00Z",
  },
  {
    key: "9",
    billNumber: "CP-2025-009",
    supplier: "Café & Cia",
    cnpj: "05.444.333/0001-22",
    category: "Insumos",
    costCenter: "Administrativo",
    amount: 1120.35,
    dueDate: "2025-09-18T00:00:00Z",
    paymentDate: undefined,
    status: ["Atrasado"],
    createdAt: "2025-09-07T17:05:00Z",
  },
  {
    key: "10",
    billNumber: "CP-2025-010",
    supplier: "Alpha Saúde Ocupacional",
    cnpj: "19.283.746/0001-09",
    category: "Serviços",
    costCenter: "Recursos Humanos",
    amount: 2350,
    dueDate: "2025-09-22T00:00:00Z",
    paymentDate: "2025-09-21T16:00:00Z",
    status: ["Pago"],
    createdAt: "2025-09-08T08:30:00Z",
  },
  {
    key: "11",
    billNumber: "CP-2025-011",
    supplier: "Impressoras Zeta",
    cnpj: "60.505.707/0001-44",
    category: "Locação",
    costCenter: "Administrativo",
    amount: 1999.99,
    dueDate: "2025-10-01T00:00:00Z",
    paymentDate: undefined,
    status: ["Agendado"],
    createdAt: "2025-09-08T12:10:00Z",
  },
  {
    key: "12",
    billNumber: "CP-2025-012",
    supplier: "Segurança Ômega",
    cnpj: "88.999.000/0001-55",
    category: "Serviços",
    costCenter: "Infraestrutura",
    amount: 7200,
    dueDate: "2025-09-28T00:00:00Z",
    paymentDate: undefined,
    status: ["Em Aprovação"],
    createdAt: "2025-09-08T18:25:00Z",
  },
  {
    key: "13",
    billNumber: "CP-2025-013",
    supplier: "Água Pura",
    cnpj: "12.120.120/0001-12",
    category: "Utilidades",
    costCenter: "Infraestrutura",
    amount: 410.2,
    dueDate: "2025-09-14T00:00:00Z",
    paymentDate: "2025-09-13T10:15:00Z",
    status: ["Pago"],
    createdAt: "2025-09-09T09:00:00Z",
  },
  {
    key: "14",
    billNumber: "CP-2025-014",
    supplier: "Mídia & Anúncios",
    cnpj: "21.212.212/0001-21",
    category: "Marketing",
    costCenter: "Comercial",
    amount: 15800,
    dueDate: "2025-10-12T00:00:00Z",
    paymentDate: undefined,
    status: ["Pendente"],
    createdAt: "2025-09-09T11:45:00Z",
  },
  {
    key: "15",
    billNumber: "CP-2025-015",
    supplier: "Consultoria Fiscal Tau",
    cnpj: "31.313.313/0001-31",
    category: "Serviços",
    costCenter: "Financeiro",
    amount: 9200,
    dueDate: "2025-09-11T00:00:00Z",
    paymentDate: undefined,
    status: ["Atrasado"],
    createdAt: "2025-09-09T15:20:00Z",
  },
  {
    key: "16",
    billNumber: "CP-2025-016",
    supplier: "Ar-Cond Pro Clima",
    cnpj: "41.414.414/0001-41",
    category: "Manutenção",
    costCenter: "Infraestrutura",
    amount: 3100,
    dueDate: "2025-10-03T00:00:00Z",
    paymentDate: "2025-10-03T13:40:00Z",
    status: ["Em Processamento"],
    createdAt: "2025-09-10T10:55:00Z",
  },
  {
    key: "17",
    billNumber: "CP-2025-017",
    supplier: "Hotel & Eventos",
    cnpj: "51.515.515/0001-51",
    category: "Viagens",
    costCenter: "Comercial",
    amount: 4875.6,
    dueDate: "2025-09-27T00:00:00Z",
    paymentDate: undefined,
    status: ["Agendado"],
    createdAt: "2025-09-10T14:30:00Z",
  },
  {
    key: "18",
    billNumber: "CP-2025-018",
    supplier: "Banco XYZ",
    cnpj: "61.616.616/0001-61",
    category: "Encargos",
    costCenter: "Financeiro",
    amount: 1320.89,
    dueDate: "2025-09-19T00:00:00Z",
    paymentDate: undefined,
    status: ["Pendente"],
    createdAt: "2025-09-11T09:05:00Z",
  },
  {
    key: "19",
    billNumber: "CP-2025-019",
    supplier: "Licenças SoftMax",
    cnpj: "71.717.717/0001-71",
    category: "Software",
    costCenter: "TI",
    amount: 26000,
    dueDate: "2025-10-15T00:00:00Z",
    paymentDate: undefined,
    status: ["Em Aprovação"],
    createdAt: "2025-09-11T13:15:00Z",
  },
  {
    key: "20",
    billNumber: "CP-2025-020",
    supplier: "Limpeza Brilho",
    cnpj: "81.818.818/0001-81",
    category: "Serviços",
    costCenter: "Infraestrutura",
    amount: 2980.3,
    dueDate: "2025-09-21T00:00:00Z",
    paymentDate: "2025-09-21T08:50:00Z",
    status: ["Pago"],
    createdAt: "2025-09-12T07:40:00Z",
  },
];
