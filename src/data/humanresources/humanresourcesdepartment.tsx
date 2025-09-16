import { TableProps, Tag } from "antd";

export interface DataType {
  key: string;
  employeeId: string;       // Matrícula/ID interno
  name: string;             // Colaborador
  cpf: string;              // CPF
  role: string;             // Cargo
  department: string;       // Departamento
  contractType: string;     // CLT | PJ | Estágio | Temporário
  baseSalary: number;       // salário base
  admissionDate: string;    // data de admissão
  terminationDate?: string; // data de desligamento, se houver
  vacationStart?: string;   // início das férias
  vacationEnd?: string;     // fim das férias
  status: string[];         // ["Ativo" | "Em Férias" | "Afastado" | "Em Experiência" | "Desligado" | "Licença Médica" | "Licença Maternidade"]
  createdAt: string;
}

export const columns: TableProps<DataType>["columns"] = [
  {
    title: "Matrícula",
    key: "employeeId",
    dataIndex: "employeeId",
  },
  {
    title: "Colaborador",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "CPF",
    key: "cpf",
    dataIndex: "cpf",
  },
  {
    title: "Cargo",
    key: "role",
    dataIndex: "role",
  },
  {
    title: "Departamento",
    key: "department",
    dataIndex: "department",
  },
  {
    title: "Contrato",
    key: "contractType",
    dataIndex: "contractType",
  },
  {
    title: "Salário (R$)",
    key: "baseSalary",
    dataIndex: "baseSalary",
    render: (value) => (
      <span>R$ {Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
    ),
    // exemplo de ordenação, se quiser:
    // sorter: (a, b) => a.baseSalary - b.baseSalary,
  },
  {
    title: "Admissão",
    key: "admissionDate",
    dataIndex: "admissionDate",
    render: (value) => <span>{new Date(value).toLocaleDateString("pt-BR")}</span>,
  },
  {
    title: "Desligamento",
    key: "terminationDate",
    dataIndex: "terminationDate",
    render: (value) =>
      value ? <span>{new Date(value).toLocaleDateString("pt-BR")}</span> : <i className="text-gray-400">—</i>,
  },
  {
    title: "Férias",
    key: "vacations",
    dataIndex: "vacationStart",
    render: (_, record) => {
      const { vacationStart, vacationEnd } = record;
      if (vacationStart && vacationEnd) {
        return (
          <span>
            {new Date(vacationStart).toLocaleDateString("pt-BR")} — {new Date(vacationEnd).toLocaleDateString("pt-BR")}
          </span>
        );
      }
      return <i className="text-gray-400">—</i>;
    },
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          let color: Parameters<typeof Tag>[0]["color"] = "blue";
          if (tag === "Ativo") color = "green";
          if (tag === "Em Férias") color = "gold";
          if (tag === "Afastado") color = "orange";
          if (tag === "Em Experiência") color = "geekblue";
          if (tag === "Desligado") color = "red";
          if (tag === "Licença Médica") color = "volcano";
          if (tag === "Licença Maternidade") color = "purple";
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
    employeeId: "DP-0001",
    name: "Mariana Alves",
    cpf: "123.456.789-10",
    role: "Analista de RH Pleno",
    department: "Recursos Humanos",
    contractType: "CLT",
    baseSalary: 6200,
    admissionDate: "2023-03-15T00:00:00Z",
    status: ["Ativo"],
    createdAt: "2025-09-01T09:05:00Z",
  },
  {
    key: "2",
    employeeId: "DP-0002",
    name: "Carlos Eduardo",
    cpf: "987.654.321-00",
    role: "Desenvolvedor Backend",
    department: "TI",
    contractType: "CLT",
    baseSalary: 9800,
    admissionDate: "2024-11-10T00:00:00Z",
    status: ["Em Experiência"],
    createdAt: "2025-09-01T10:15:00Z",
  },
  {
    key: "3",
    employeeId: "DP-0003",
    name: "Aline Barbosa",
    cpf: "321.654.987-22",
    role: "Assistente Administrativo",
    department: "Administrativo",
    contractType: "CLT",
    baseSalary: 3200,
    admissionDate: "2022-07-01T00:00:00Z",
    vacationStart: "2025-09-16T00:00:00Z",
    vacationEnd: "2025-10-01T00:00:00Z",
    status: ["Em Férias"],
    createdAt: "2025-09-01T11:30:00Z",
  },
  {
    key: "4",
    employeeId: "DP-0004",
    name: "Rafael Gomes",
    cpf: "741.852.963-11",
    role: "Analista Financeiro",
    department: "Financeiro",
    contractType: "CLT",
    baseSalary: 7400,
    admissionDate: "2021-01-20T00:00:00Z",
    status: ["Ativo"],
    createdAt: "2025-09-01T12:10:00Z",
  },
  {
    key: "5",
    employeeId: "DP-0005",
    name: "Patrícia Lima",
    cpf: "159.753.486-00",
    role: "Coordenadora de Marketing",
    department: "Marketing",
    contractType: "CLT",
    baseSalary: 11200,
    admissionDate: "2020-05-11T00:00:00Z",
    status: ["Ativo"],
    createdAt: "2025-09-01T12:40:00Z",
  },
  {
    key: "6",
    employeeId: "DP-0006",
    name: "Tiago Ferreira",
    cpf: "258.369.147-55",
    role: "Suporte Técnico",
    department: "TI",
    contractType: "CLT",
    baseSalary: 3800,
    admissionDate: "2024-06-03T00:00:00Z",
    status: ["Afastado"],
    createdAt: "2025-09-01T13:20:00Z",
  },
  {
    key: "7",
    employeeId: "DP-0007",
    name: "Juliana Rocha",
    cpf: "852.741.963-70",
    role: "UX Designer",
    department: "Produto",
    contractType: "CLT",
    baseSalary: 9200,
    admissionDate: "2023-12-01T00:00:00Z",
    status: ["Ativo"],
    createdAt: "2025-09-01T14:05:00Z",
  },
  {
    key: "8",
    employeeId: "DP-0008",
    name: "Gustavo Nunes",
    cpf: "654.987.321-40",
    role: "Estagiário de Dados",
    department: "Dados",
    contractType: "Estágio",
    baseSalary: 1800,
    admissionDate: "2025-07-01T00:00:00Z",
    status: ["Em Experiência"],
    createdAt: "2025-09-01T15:30:00Z",
  },
  {
    key: "9",
    employeeId: "DP-0009",
    name: "Camila Santos",
    cpf: "741.963.258-12",
    role: "Analista de Folha",
    department: "Recursos Humanos",
    contractType: "CLT",
    baseSalary: 6500,
    admissionDate: "2019-09-10T00:00:00Z",
    status: ["Ativo"],
    createdAt: "2025-09-01T16:10:00Z",
  },
  {
    key: "10",
    employeeId: "DP-0010",
    name: "Paulo Henrique",
    cpf: "963.852.741-33",
    role: "Vendedor Interno",
    department: "Comercial",
    contractType: "CLT",
    baseSalary: 3500,
    admissionDate: "2022-02-14T00:00:00Z",
    status: ["Ativo"],
    createdAt: "2025-09-01T17:00:00Z",
  },
  {
    key: "11",
    employeeId: "DP-0011",
    name: "Renata Martins",
    cpf: "111.222.333-44",
    role: "Analista de Qualidade",
    department: "Operações",
    contractType: "CLT",
    baseSalary: 5600,
    admissionDate: "2021-08-22T00:00:00Z",
    vacationStart: "2025-09-05T00:00:00Z",
    vacationEnd: "2025-09-20T00:00:00Z",
    status: ["Em Férias"],
    createdAt: "2025-09-01T17:20:00Z",
  },
  {
    key: "12",
    employeeId: "DP-0012",
    name: "Diego Costa",
    cpf: "222.333.444-55",
    role: "Auxiliar de Logística",
    department: "Logística",
    contractType: "CLT",
    baseSalary: 2900,
    admissionDate: "2020-10-30T00:00:00Z",
    status: ["Ativo"],
    createdAt: "2025-09-02T08:10:00Z",
  },
  {
    key: "13",
    employeeId: "DP-0013",
    name: "Beatriz Moura",
    cpf: "333.444.555-66",
    role: "Gerente de Projetos",
    department: "PMO",
    contractType: "CLT",
    baseSalary: 14500,
    admissionDate: "2018-04-05T00:00:00Z",
    status: ["Ativo"],
    createdAt: "2025-09-02T09:00:00Z",
  },
  {
    key: "14",
    employeeId: "DP-0014",
    name: "Rodrigo Pires",
    cpf: "444.555.666-77",
    role: "Analista de Segurança",
    department: "TI",
    contractType: "CLT",
    baseSalary: 8700,
    admissionDate: "2024-01-18T00:00:00Z",
    status: ["Licença Médica"],
    createdAt: "2025-09-02T10:25:00Z",
  },
  {
    key: "15",
    employeeId: "DP-0015",
    name: "Ana Paula",
    cpf: "555.666.777-88",
    role: "Analista Contábil",
    department: "Contabilidade",
    contractType: "CLT",
    baseSalary: 7000,
    admissionDate: "2023-05-02T00:00:00Z",
    status: ["Ativo"],
    createdAt: "2025-09-02T11:40:00Z",
  },
  {
    key: "16",
    employeeId: "DP-0016",
    name: "Luciana Prado",
    cpf: "666.777.888-99",
    role: "Assistente de RH",
    department: "Recursos Humanos",
    contractType: "CLT",
    baseSalary: 3600,
    admissionDate: "2022-12-12T00:00:00Z",
    status: ["Licença Maternidade"],
    createdAt: "2025-09-02T12:20:00Z",
  },
  {
    key: "17",
    employeeId: "DP-0017",
    name: "Felipe Andrade",
    cpf: "777.888.999-00",
    role: "DevOps Engineer",
    department: "TI",
    contractType: "PJ",
    baseSalary: 15000,
    admissionDate: "2024-04-01T00:00:00Z",
    status: ["Ativo"],
    createdAt: "2025-09-02T13:00:00Z",
  },
  {
    key: "18",
    employeeId: "DP-0018",
    name: "Sofia Rezende",
    cpf: "888.999.000-11",
    role: "Coordenadora de Suporte",
    department: "Operações",
    contractType: "CLT",
    baseSalary: 8300,
    admissionDate: "2019-02-18T00:00:00Z",
    status: ["Ativo"],
    createdAt: "2025-09-02T14:10:00Z",
  },
  {
    key: "19",
    employeeId: "DP-0019",
    name: "Marcelo Tavares",
    cpf: "999.000.111-22",
    role: "Analista de Compras",
    department: "Suprimentos",
    contractType: "CLT",
    baseSalary: 5400,
    admissionDate: "2020-09-01T00:00:00Z",
    terminationDate: "2025-08-30T00:00:00Z",
    status: ["Desligado"],
    createdAt: "2025-09-02T15:25:00Z",
  },
  {
    key: "20",
    employeeId: "DP-0020",
    name: "Helena Queiroz",
    cpf: "000.111.222-33",
    role: "Analista de Dados",
    department: "Dados",
    contractType: "CLT",
    baseSalary: 8900,
    admissionDate: "2023-10-09T00:00:00Z",
    status: ["Ativo"],
    createdAt: "2025-09-02T16:45:00Z",
  },
];
