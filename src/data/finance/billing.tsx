import { TableProps, Tag } from "antd";

export interface DataType {
  key: string;
  invoiceNumber: string;
  client: string;
  cnpj: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  status: string[];
  createdAt: string;
}

export const columns: TableProps<DataType>["columns"] = [
  {
    title: "Nº Fatura",
    key: "invoiceNumber",
    dataIndex: "invoiceNumber",
  },
  {
    title: "Cliente",
    key: "client",
    dataIndex: "client",
  },
  {
    title: "CNPJ",
    key: "cnpj",
    dataIndex: "cnpj",
  },
  {
    title: "Valor (R$)",
    key: "amount",
    dataIndex: "amount",
    render: (value) => <span>R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>,
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
    render: (value) => (value ? <span>{new Date(value).toLocaleDateString("pt-BR")}</span> : <i className="text-gray-400">Pendente</i>),
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
          if (tag === "Em Processamento") color = "geekblue";

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
    invoiceNumber: "FT-2025-001",
    client: "Alpha Indústria Ltda",
    cnpj: "45.678.910/0001-22",
    amount: 12500.5,
    dueDate: "2025-09-20T00:00:00Z",
    paymentDate: "2025-09-18T00:00:00Z",
    status: ["Pago"],
    createdAt: "2025-09-01T10:15:00Z",
  },
  {
    key: "2",
    invoiceNumber: "FT-2025-002",
    client: "Beta Comércio S.A.",
    cnpj: "98.765.432/0001-55",
    amount: 8500,
    dueDate: "2025-09-10T00:00:00Z",
    paymentDate: undefined,
    status: ["Atrasado"],
    createdAt: "2025-09-02T11:20:00Z",
  },
  {
    key: "3",
    invoiceNumber: "FT-2025-003",
    client: "Gamma Serviços ME",
    cnpj: "23.456.789/0001-88",
    amount: 4200,
    dueDate: "2025-09-25T00:00:00Z",
    paymentDate: undefined,
    status: ["Pendente"],
    createdAt: "2025-09-05T09:10:00Z",
  },
  {
    key: "4",
    invoiceNumber: "FT-2025-004",
    client: "Delta Transportes LTDA",
    cnpj: "11.222.333/0001-44",
    amount: 30000,
    dueDate: "2025-09-12T00:00:00Z",
    paymentDate: "2025-09-12T14:00:00Z",
    status: ["Em Processamento"],
    createdAt: "2025-09-06T16:30:00Z",
  },
  {
    key: "5",
    invoiceNumber: "FT-2025-005",
    client: "Epsilon Tech Ltda",
    cnpj: "12.345.678/0001-10",
    amount: 18750.75,
    dueDate: "2025-09-30T00:00:00Z",
    paymentDate: "2025-09-29T12:15:00Z",
    status: ["Pago"],
    createdAt: "2025-09-07T08:40:00Z",
  },
  {
    key: "6",
    invoiceNumber: "FT-2025-006",
    client: "Farmácia Boa Vida",
    cnpj: "54.321.987/0001-01",
    amount: 2650.9,
    dueDate: "2025-10-05T00:00:00Z",
    paymentDate: undefined,
    status: ["Pendente"],
    createdAt: "2025-09-08T10:05:00Z",
  },
  {
    key: "7",
    invoiceNumber: "FT-2025-007",
    client: "Hotel Miramar S/A",
    cnpj: "60.505.707/0001-44",
    amount: 19999.99,
    dueDate: "2025-09-22T00:00:00Z",
    paymentDate: "2025-09-21T09:30:00Z",
    status: ["Pago"],
    createdAt: "2025-09-08T14:35:00Z",
  },
  {
    key: "8",
    invoiceNumber: "FT-2025-008",
    client: "Café & Cia Ltda",
    cnpj: "05.444.333/0001-22",
    amount: 1580.45,
    dueDate: "2025-09-18T00:00:00Z",
    paymentDate: undefined,
    status: ["Atrasado"],
    createdAt: "2025-09-09T09:20:00Z",
  },
  {
    key: "9",
    invoiceNumber: "FT-2025-009",
    client: "Construtora Base Forte",
    cnpj: "12.120.120/0001-12",
    amount: 49890,
    dueDate: "2025-10-12T00:00:00Z",
    paymentDate: undefined,
    status: ["Pendente"],
    createdAt: "2025-09-09T13:15:00Z",
  },
  {
    key: "10",
    invoiceNumber: "FT-2025-010",
    client: "Editora Horizonte",
    cnpj: "19.283.746/0001-09",
    amount: 2310,
    dueDate: "2025-09-22T00:00:00Z",
    paymentDate: "2025-09-21T17:05:00Z",
    status: ["Pago"],
    createdAt: "2025-09-10T08:25:00Z",
  },
  {
    key: "11",
    invoiceNumber: "FT-2025-011",
    client: "AgroVerde Cooperativa",
    cnpj: "31.313.313/0001-31",
    amount: 27500,
    dueDate: "2025-09-11T00:00:00Z",
    paymentDate: undefined,
    status: ["Atrasado"],
    createdAt: "2025-09-10T12:00:00Z",
  },
  {
    key: "12",
    invoiceNumber: "FT-2025-012",
    client: "Clínica Bem Viver",
    cnpj: "10.203.405/0001-01",
    amount: 4780,
    dueDate: "2025-09-18T00:00:00Z",
    paymentDate: "2025-09-18T09:30:00Z",
    status: ["Pago"],
    createdAt: "2025-09-10T15:40:00Z",
  },
  {
    key: "13",
    invoiceNumber: "FT-2025-013",
    client: "StartUp Blue Ltda",
    cnpj: "71.717.717/0001-71",
    amount: 499,
    dueDate: "2025-10-15T00:00:00Z",
    paymentDate: undefined,
    status: ["Pendente"],
    createdAt: "2025-09-11T09:10:00Z",
  },
  {
    key: "14",
    invoiceNumber: "FT-2025-014",
    client: "Colégio Saber",
    cnpj: "51.515.515/0001-51",
    amount: 12600,
    dueDate: "2025-09-27T00:00:00Z",
    paymentDate: undefined,
    status: ["Pendente"],
    createdAt: "2025-09-11T11:25:00Z",
  },
  {
    key: "15",
    invoiceNumber: "FT-2025-015",
    client: "Pet House ME",
    cnpj: "41.414.414/0001-41",
    amount: 820.4,
    dueDate: "2025-10-03T00:00:00Z",
    paymentDate: "2025-10-03T10:00:00Z",
    status: ["Em Processamento"],
    createdAt: "2025-09-11T14:00:00Z",
  },
  {
    key: "16",
    invoiceNumber: "FT-2025-016",
    client: "Tech Edu Online",
    cnpj: "21.212.212/0001-21",
    amount: 129.99,
    dueDate: "2025-10-12T00:00:00Z",
    paymentDate: undefined,
    status: ["Pendente"],
    createdAt: "2025-09-12T08:10:00Z",
  },
  {
    key: "17",
    invoiceNumber: "FT-2025-017",
    client: "Restaurante Bom Sabor",
    cnpj: "05.666.777/0001-33",
    amount: 6390.45,
    dueDate: "2025-09-20T00:00:00Z",
    paymentDate: undefined,
    status: ["Negociado"], // se quiser manter só os quatro status, troque para "Pendente"
    createdAt: "2025-09-12T09:25:00Z",
  },
  {
    key: "18",
    invoiceNumber: "FT-2025-018",
    client: "Academia ForFit",
    cnpj: "77.666.555/0001-33",
    amount: 299.9,
    dueDate: "2025-10-10T00:00:00Z",
    paymentDate: undefined,
    status: ["Pendente"],
    createdAt: "2025-09-12T10:00:00Z",
  },
  {
    key: "19",
    invoiceNumber: "FT-2025-019",
    client: "Banco XYZ",
    cnpj: "61.616.616/0001-61",
    amount: 3100.65,
    dueDate: "2025-09-19T00:00:00Z",
    paymentDate: undefined,
    status: ["Atrasado"],
    createdAt: "2025-09-12T11:35:00Z",
  },
  {
    key: "20",
    invoiceNumber: "FT-2025-020",
    client: "Loja Sol Nascente",
    cnpj: "12.345.678/0001-10",
    amount: 7450.9,
    dueDate: "2025-09-15T00:00:00Z",
    paymentDate: "2025-09-14T14:10:00Z",
    status: ["Pago"],
    createdAt: "2025-09-12T12:00:00Z",
  },
];
