import { TableProps, Tag } from "antd";

export interface DataType {
  key: string;
  invoiceNumber: string;
  customer: string;
  cnpj: string;            // pode ser CPF também, se preferir
  category: string;        // Produto | Serviço | Assinatura | etc.
  paymentMethod: string;   // Boleto | Pix | Cartão | Transferência
  amount: number;
  dueDate: string;
  paymentDate?: string;
  status: string[];        // ["Em Aberto" | "Pago" | "Atrasado" | "Negociado" | "Em Disputa" | "Cancelado"]
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
    key: "customer",
    dataIndex: "customer",
  },
  {
    title: "CNPJ/CPF",
    key: "cnpj",
    dataIndex: "cnpj",
  },
  {
    title: "Categoria",
    key: "category",
    dataIndex: "category",
  },
  {
    title: "Forma",
    key: "paymentMethod",
    dataIndex: "paymentMethod",
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
    title: "Recebimento",
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
          if (tag === "Em Aberto") color = "volcano";
          if (tag === "Atrasado") color = "red";
          if (tag === "Negociado") color = "purple";
          if (tag === "Em Disputa") color = "magenta";
          if (tag === "Cancelado") color = "default";

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
    invoiceNumber: "CR-2025-001",
    customer: "Loja Sol Nascente",
    cnpj: "12.345.678/0001-10",
    category: "Produto",
    paymentMethod: "Boleto",
    amount: 7450.9,
    dueDate: "2025-09-15T00:00:00Z",
    paymentDate: "2025-09-14T14:10:00Z",
    status: ["Pago"],
    createdAt: "2025-09-01T09:00:00Z",
  },
  {
    key: "2",
    invoiceNumber: "CR-2025-002",
    customer: "Mercado Estrela",
    cnpj: "98.765.432/0001-55",
    category: "Produto",
    paymentMethod: "Pix",
    amount: 3890,
    dueDate: "2025-09-10T00:00:00Z",
    status: ["Atrasado"],
    createdAt: "2025-09-01T11:30:00Z",
  },
  {
    key: "3",
    invoiceNumber: "CR-2025-003",
    customer: "Alpha Corp",
    cnpj: "33.444.555/0001-77",
    category: "Serviço",
    paymentMethod: "Transferência",
    amount: 12800,
    dueDate: "2025-09-25T00:00:00Z",
    status: ["Em Aberto"],
    createdAt: "2025-09-02T10:05:00Z",
  },
  {
    key: "4",
    invoiceNumber: "CR-2025-004",
    customer: "Oficina Rápida ME",
    cnpj: "22.111.222/0001-66",
    category: "Serviço",
    paymentMethod: "Pix",
    amount: 2140.75,
    dueDate: "2025-09-28T00:00:00Z",
    status: ["Em Aberto"],
    createdAt: "2025-09-02T14:20:00Z",
  },
  {
    key: "5",
    invoiceNumber: "CR-2025-005",
    customer: "Padaria Central",
    cnpj: "44.555.666/0001-88",
    category: "Assinatura",
    paymentMethod: "Cartão",
    amount: 560.0,
    dueDate: "2025-09-12T00:00:00Z",
    paymentDate: "2025-09-12T08:50:00Z",
    status: ["Pago"],
    createdAt: "2025-09-03T08:15:00Z",
  },
  {
    key: "6",
    invoiceNumber: "CR-2025-006",
    customer: "Cine Lux",
    cnpj: "71.888.999/0001-12",
    category: "Produto",
    paymentMethod: "Boleto",
    amount: 10350.2,
    dueDate: "2025-10-05T00:00:00Z",
    status: ["Negociado"],
    createdAt: "2025-09-03T13:40:00Z",
  },
  {
    key: "7",
    invoiceNumber: "CR-2025-007",
    customer: "Clínica Bem Viver",
    cnpj: "10.203.405/0001-01",
    category: "Serviço",
    paymentMethod: "Transferência",
    amount: 4780,
    dueDate: "2025-09-18T00:00:00Z",
    paymentDate: "2025-09-18T09:30:00Z",
    status: ["Pago"],
    createdAt: "2025-09-04T09:55:00Z",
  },
  {
    key: "8",
    invoiceNumber: "CR-2025-008",
    customer: "Academia ForFit",
    cnpj: "77.666.555/0001-33",
    category: "Assinatura",
    paymentMethod: "Cartão",
    amount: 299.9,
    dueDate: "2025-10-10T00:00:00Z",
    status: ["Em Aberto"],
    createdAt: "2025-09-04T16:25:00Z",
  },
  {
    key: "9",
    invoiceNumber: "CR-2025-009",
    customer: "Restaurante Bom Sabor",
    cnpj: "05.444.333/0001-22",
    category: "Produto",
    paymentMethod: "Pix",
    amount: 6390.45,
    dueDate: "2025-09-20T00:00:00Z",
    status: ["Negociado"],
    createdAt: "2025-09-05T10:30:00Z",
  },
  {
    key: "10",
    invoiceNumber: "CR-2025-010",
    customer: "Editora Horizonte",
    cnpj: "19.283.746/0001-09",
    category: "Serviço",
    paymentMethod: "Boleto",
    amount: 2310,
    dueDate: "2025-09-22T00:00:00Z",
    paymentDate: "2025-09-21T17:05:00Z",
    status: ["Pago"],
    createdAt: "2025-09-05T13:10:00Z",
  },
  {
    key: "11",
    invoiceNumber: "CR-2025-011",
    customer: "Hotel Miramar",
    cnpj: "60.505.707/0001-44",
    category: "Serviço",
    paymentMethod: "Transferência",
    amount: 18750,
    dueDate: "2025-10-01T00:00:00Z",
    status: ["Em Disputa"],
    createdAt: "2025-09-06T08:45:00Z",
  },
  {
    key: "12",
    invoiceNumber: "CR-2025-012",
    customer: "Farmácia Vida",
    cnpj: "88.999.000/0001-55",
    category: "Produto",
    paymentMethod: "Pix",
    amount: 3520.8,
    dueDate: "2025-09-28T00:00:00Z",
    status: ["Em Aberto"],
    createdAt: "2025-09-06T12:35:00Z",
  },
  {
    key: "13",
    invoiceNumber: "CR-2025-013",
    customer: "Construtora Base Forte",
    cnpj: "12.120.120/0001-12",
    category: "Produto",
    paymentMethod: "Boleto",
    amount: 49890,
    dueDate: "2025-09-14T00:00:00Z",
    paymentDate: "2025-09-13T11:25:00Z",
    status: ["Pago"],
    createdAt: "2025-09-07T09:05:00Z",
  },
  {
    key: "14",
    invoiceNumber: "CR-2025-014",
    customer: "Tech Edu Online",
    cnpj: "21.212.212/0001-21",
    category: "Assinatura",
    paymentMethod: "Cartão",
    amount: 129.99,
    dueDate: "2025-10-12T00:00:00Z",
    status: ["Em Aberto"],
    createdAt: "2025-09-07T13:55:00Z",
  },
  {
    key: "15",
    invoiceNumber: "CR-2025-015",
    customer: "AgroVerde Cooperativa",
    cnpj: "31.313.313/0001-31",
    category: "Produto",
    paymentMethod: "Transferência",
    amount: 27500,
    dueDate: "2025-09-11T00:00:00Z",
    status: ["Atrasado"],
    createdAt: "2025-09-07T16:20:00Z",
  },
  {
    key: "16",
    invoiceNumber: "CR-2025-016",
    customer: "Pet House",
    cnpj: "41.414.414/0001-41",
    category: "Serviço",
    paymentMethod: "Pix",
    amount: 820.4,
    dueDate: "2025-10-03T00:00:00Z",
    paymentDate: "2025-10-03T10:00:00Z",
    status: ["Pago"],
    createdAt: "2025-09-08T10:10:00Z",
  },
  {
    key: "17",
    invoiceNumber: "CR-2025-017",
    customer: "Colégio Saber",
    cnpj: "51.515.515/0001-51",
    category: "Serviço",
    paymentMethod: "Boleto",
    amount: 12600,
    dueDate: "2025-09-27T00:00:00Z",
    status: ["Negociado"],
    createdAt: "2025-09-08T14:00:00Z",
  },
  {
    key: "18",
    invoiceNumber: "CR-2025-018",
    customer: "Banco XYZ",
    cnpj: "61.616.616/0001-61",
    category: "Serviço",
    paymentMethod: "Transferência",
    amount: 3100.65,
    dueDate: "2025-09-19T00:00:00Z",
    status: ["Em Disputa"],
    createdAt: "2025-09-09T09:25:00Z",
  },
  {
    key: "19",
    invoiceNumber: "CR-2025-019",
    customer: "StartUp Blue",
    cnpj: "71.717.717/0001-71",
    category: "Assinatura",
    paymentMethod: "Cartão",
    amount: 499.0,
    dueDate: "2025-10-15T00:00:00Z",
    status: ["Em Aberto"],
    createdAt: "2025-09-09T12:40:00Z",
  },
  {
    key: "20",
    invoiceNumber: "CR-2025-020",
    customer: "Ateliê Arte Viva",
    cnpj: "81.818.818/0001-81",
    category: "Produto",
    paymentMethod: "Pix",
    amount: 2875.3,
    dueDate: "2025-09-21T00:00:00Z",
    paymentDate: "2025-09-21T09:05:00Z",
    status: ["Cancelado"], // ex.: cancelada após recebimento estornado
    createdAt: "2025-09-10T08:35:00Z",
  },
];
