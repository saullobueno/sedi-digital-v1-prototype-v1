import { DeleteOutlined, EditOutlined, EllipsisOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

export interface DataType {
  key: string;
  customerNumber: string;
  company: string;
  cnpj: string;
  segment: string;
  filial: string;
  contact: string;
  status: string[];
  contractType: 'LPU' | 'Manutenção' | 'Avulso';
  contractTerm: '12 meses' | '36 meses' | 'Indeterminado';
  createdAt: string;
}

export const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Nº do cliente',
    dataIndex: 'customerNumber',
    key: 'customerNumber',
    render(value) {
      return <Tag color='default' bordered={false}>{value}</Tag>;
    },
  },
  {
    title: 'Empresa',
    dataIndex: 'company',
    key: 'company',
    render(value) {
      return <span className='font-semibold'>{value}</span>;
    },
  },
  {
    title: 'CNPJ',
    dataIndex: 'cnpj',
    key: 'cnpj',
  },
  {
    title: 'Segmento',
    dataIndex: 'segment',
    key: 'segment',
  },
  {
    title: 'Filial',
    dataIndex: 'filial',
    key: 'filial',
  },
  {
    title: 'Contato',
    dataIndex: 'contact',
    key: 'contact',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          let color = 'green';
          if (tag === 'Inativo') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag} bordered={false}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },

  {
    title: 'Tipo de contrato',
    dataIndex: 'contractType',
    key: 'contractType',
    render: (type) => {
      let color = 'blue';
      if (type === 'Manutenção') color = 'geekblue';
      if (type === 'Avulso') color = 'orange';
      return <Tag color={color} bordered={false}>{type}</Tag>;
    },
  },
  {
    title: 'Prazo de contrato',
    dataIndex: 'contractTerm',
    key: 'contractTerm',
    render: (term) => {
      let color = 'green';
      if (term === '36 meses') color = 'purple';
      if (term === 'Indeterminado') color = 'default';
      return <Tag color={color} bordered={false}>{term}</Tag>;
    },
  },
  {
    title: 'Criado em',
    key: 'createdAt',
    dataIndex: 'createdAt',
    render(value) {
      return <span>{new Date(value).toLocaleDateString()}</span>;
    },
  },
];

export const data: DataType[] = [
  {
    key: '1',
    customerNumber: 'CL-25-0001',
    company: 'Tech Solutions Ltda',
    cnpj: '12.345.678/0001-10', // simples
    segment: 'Tecnologia',
    filial: 'São Paulo',
    contact: 'Mariana Silva',
    status: ['Ativo'],
    contractType: 'LPU',
    contractTerm: '12 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '2',
    customerNumber: 'CL-25-0002',
    company: 'AgroVida S/A',
    cnpj: '1A.B2C.3D4/5E6F-78', // alfanumérico
    segment: 'Agronegócio',
    filial: 'Ribeirão Preto',
    contact: 'Carlos Andrade',
    status: ['Ativo'],
    contractType: 'Manutenção',
    contractTerm: '36 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '3',
    customerNumber: 'CL-25-0003',
    company: 'Construmax Engenharia',
    cnpj: '11.222.333/0001-77', // simples
    segment: 'Construção Civil',
    filial: 'Belo Horizonte',
    contact: 'Fernanda Rocha',
    status: ['Ativo'], // era Negociando
    contractType: 'Avulso',
    contractTerm: 'Indeterminado',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '4',
    customerNumber: 'CL-25-0004',
    company: 'BioPharma Brasil',
    cnpj: '2B.C3D.4E5/6F7G-89', // alfanumérico
    segment: 'Farmacêutico',
    filial: 'Campinas',
    contact: 'Pedro Lima',
    status: ['Ativo'],
    contractType: 'LPU',
    contractTerm: '12 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '5',
    customerNumber: 'CL-25-0005',
    company: 'Moda & Estilo LTDA',
    cnpj: '33.444.555/0001-99', // simples
    segment: 'Varejo',
    filial: 'Curitiba',
    contact: 'Juliana Mendes',
    status: ['Inativo'], // era Potencial
    contractType: 'Manutenção',
    contractTerm: '36 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '6',
    customerNumber: 'CL-25-0006',
    company: 'Energia Solar Plus',
    cnpj: '3C.D4E.5F6/7G8H-10', // alfanumérico
    segment: 'Energia',
    filial: 'Fortaleza',
    contact: 'Rafael Souza',
    status: ['Ativo'],
    contractType: 'Avulso',
    contractTerm: 'Indeterminado',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '7',
    customerNumber: 'CL-25-0007',
    company: 'Food Service Brasil',
    cnpj: '55.666.777/0001-22', // simples
    segment: 'Alimentício',
    filial: 'Salvador',
    contact: 'Amanda Costa',
    status: ['Ativo'], // era Negociando
    contractType: 'LPU',
    contractTerm: '12 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '8',
    customerNumber: 'CL-25-0008',
    company: 'EducaMais Online',
    cnpj: '4D.E5F.6G7/8H9J-21', // alfanumérico
    segment: 'Educação',
    filial: 'São Paulo',
    contact: 'João Oliveira',
    status: ['Ativo'],
    contractType: 'Manutenção',
    contractTerm: '36 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '9',
    customerNumber: 'CL-25-0009',
    company: 'TransLog Transportes',
    cnpj: '77.888.999/0001-44', // simples
    segment: 'Logística',
    filial: 'Recife',
    contact: 'Beatriz Martins',
    status: ['Ativo'],
    contractType: 'Avulso',
    contractTerm: 'Indeterminado',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '10',
    customerNumber: 'CL-25-0010',
    company: 'Green Ambiental',
    cnpj: '5E.F6G.7H8/9J1K-32', // alfanumérico
    segment: 'Sustentabilidade',
    filial: 'Porto Alegre',
    contact: 'Eduardo Ramos',
    status: ['Inativo'], // era Potencial
    contractType: 'LPU',
    contractTerm: '12 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '11',
    customerNumber: 'CL-25-0011',
    company: 'Finance Group S/A',
    cnpj: '99.000.111/0001-66', // simples
    segment: 'Financeiro',
    filial: 'São Paulo',
    contact: 'Tatiane Alves',
    status: ['Ativo'],
    contractType: 'Manutenção',
    contractTerm: '36 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '12',
    customerNumber: 'CL-25-0012',
    company: 'Mega Indústria Metalúrgica',
    cnpj: '6F.G7H.8J9/1K2L-43', // alfanumérico
    segment: 'Indústria',
    filial: 'Joinville',
    contact: 'Lucas Pereira',
    status: ['Inativo'],
    contractType: 'Avulso',
    contractTerm: 'Indeterminado',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '13',
    customerNumber: 'CL-25-0013',
    company: 'Travel Tour Viagens',
    cnpj: '20.222.333/0001-88', // simples
    segment: 'Turismo',
    filial: 'Rio de Janeiro',
    contact: 'Renata Carvalho',
    status: ['Ativo'], // era Negociando
    contractType: 'LPU',
    contractTerm: '12 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '14',
    customerNumber: 'CL-25-0014',
    company: 'Saúde & Vida',
    cnpj: '7G.H8J.9K1/2L3M-54', // alfanumérico
    segment: 'Saúde',
    filial: 'São Paulo',
    contact: 'Gustavo Nogueira',
    status: ['Ativo'],
    contractType: 'Manutenção',
    contractTerm: '36 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '15',
    customerNumber: 'CL-25-0015',
    company: 'AutoCenter Brasil',
    cnpj: '40.444.555/0001-11', // simples
    segment: 'Automotivo',
    filial: 'Campinas',
    contact: 'Paula Ferreira',
    status: ['Inativo'], // era Potencial
    contractType: 'Avulso',
    contractTerm: 'Indeterminado',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '16',
    customerNumber: 'CL-25-0016',
    company: 'SmartHome Solutions',
    cnpj: '8H.J9K.1L2/3M4N-65', // alfanumérico
    segment: 'Tecnologia',
    filial: 'São Paulo',
    contact: 'Ricardo Almeida',
    status: ['Ativo'],
    contractType: 'LPU',
    contractTerm: '12 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '17',
    customerNumber: 'CL-25-0017',
    company: 'Pet Lovers',
    cnpj: '60.666.777/0001-33', // simples
    segment: 'Pet Shop',
    filial: 'Florianópolis',
    contact: 'Carla Souza',
    status: ['Ativo'],
    contractType: 'Manutenção',
    contractTerm: '36 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '18',
    customerNumber: 'CL-25-0018',
    company: 'ImobiReal Consultoria',
    cnpj: '9J.K1L.2M3/4N5P-76', // alfanumérico
    segment: 'Imobiliário',
    filial: 'São Paulo',
    contact: 'André Barbosa',
    status: ['Ativo'], // era Negociando
    contractType: 'Avulso',
    contractTerm: 'Indeterminado',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '19',
    customerNumber: 'CL-25-0019',
    company: 'StartUpX Inovação',
    cnpj: '80.888.999/0001-55', // simples
    segment: 'Startups',
    filial: 'São Paulo',
    contact: 'Sofia Lima',
    status: ['Ativo'],
    contractType: 'LPU',
    contractTerm: '12 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
  {
    key: '20',
    customerNumber: 'CL-25-0020',
    company: 'Global Import Export',
    cnpj: '1K.2L3M.4N5/6P7Q-87', // alfanumérico
    segment: 'Comércio Exterior',
    filial: 'Manaus',
    contact: 'Henrique Duarte',
    status: ['Inativo'],
    contractType: 'Manutenção',
    contractTerm: '36 meses',
    createdAt: '2025-08-10T14:35:00Z',
  },
];
