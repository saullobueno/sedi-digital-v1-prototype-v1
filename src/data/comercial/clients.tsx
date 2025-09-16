import { DeleteOutlined, EditOutlined, EllipsisOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

export interface DataType {
  key: string;
  company: string;
  cnpj: string;
  segment: string;
  filial: string;
  contact: string;
  phone: string;
  email: string;
  status: string[];
  createdAt: string;
}

export const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Empresa',
    dataIndex: 'company',
    key: 'company',
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
    title: 'Telefone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          let color = 'blue';
          if (tag === 'Ativo') {
            color = 'green';
          }
          if (tag === 'Inativo') {
            color = 'volcano';
          }
          if (tag === 'Potencial') {
            color = 'geekblue';
          }
          if (tag === 'Negociando') {
            color = 'orange';
          }
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
			render(value, record, index) {
				return (<span>{new Date(value).toLocaleDateString()}</span>
				);
			},
    },
];

export const data: DataType[] = [
  {
    key: '1',
    company: 'Tech Solutions Ltda',
    cnpj: '12.345.678/0001-10',
    segment: 'Tecnologia',
    filial: 'São Paulo',
    contact: 'Mariana Silva',
    phone: '(11) 98765-4321',
    email: 'contato@techsolutions.com',
    status: ['Ativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '2',
    company: 'AgroVida S/A',
    cnpj: '98.765.432/0001-55',
    segment: 'Agronegócio',
    filial: 'Ribeirão Preto',
    contact: 'Carlos Andrade',
    phone: '(16) 3232-1000',
    email: 'vendas@agrovida.com',
    status: ['Ativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '3',
    company: 'Construmax Engenharia',
    cnpj: '11.222.333/0001-77',
    segment: 'Construção Civil',
    filial: 'Belo Horizonte',
    contact: 'Fernanda Rocha',
    phone: '(31) 99888-1234',
    email: 'contato@construmax.com.br',
    status: ['Negociando'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '4',
    company: 'BioPharma Brasil',
    cnpj: '22.333.444/0001-88',
    segment: 'Farmacêutico',
    filial: 'Campinas',
    contact: 'Pedro Lima',
    phone: '(19) 3777-5566',
    email: 'suporte@biopharma.com',
    status: ['Ativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '5',
    company: 'Moda & Estilo LTDA',
    cnpj: '33.444.555/0001-99',
    segment: 'Varejo',
    filial: 'Curitiba',
    contact: 'Juliana Mendes',
    phone: '(41) 91234-5678',
    email: 'atendimento@modaestilo.com',
    status: ['Potencial'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '6',
    company: 'Energia Solar Plus',
    cnpj: '44.555.666/0001-11',
    segment: 'Energia',
    filial: 'Fortaleza',
    contact: 'Rafael Souza',
    phone: '(85) 3344-7788',
    email: 'contato@esolarplus.com',
    status: ['Ativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '7',
    company: 'Food Service Brasil',
    cnpj: '55.666.777/0001-22',
    segment: 'Alimentício',
    filial: 'Salvador',
    contact: 'Amanda Costa',
    phone: '(71) 95555-0000',
    email: 'comercial@foodbr.com',
    status: ['Negociando'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '8',
    company: 'EducaMais Online',
    cnpj: '66.777.888/0001-33',
    segment: 'Educação',
    filial: 'São Paulo',
    contact: 'João Oliveira',
    phone: '(11) 91212-3434',
    email: 'suporte@educamais.com',
    status: ['Ativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '9',
    company: 'TransLog Transportes',
    cnpj: '77.888.999/0001-44',
    segment: 'Logística',
    filial: 'Recife',
    contact: 'Beatriz Martins',
    phone: '(81) 97777-8888',
    email: 'logistica@translog.com',
    status: ['Ativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '10',
    company: 'Green Ambiental',
    cnpj: '88.999.000/0001-55',
    segment: 'Sustentabilidade',
    filial: 'Porto Alegre',
    contact: 'Eduardo Ramos',
    phone: '(51) 3232-9090',
    email: 'contato@greenambiental.com',
    status: ['Potencial'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '11',
    company: 'Finance Group S/A',
    cnpj: '99.000.111/0001-66',
    segment: 'Financeiro',
    filial: 'São Paulo',
    contact: 'Tatiane Alves',
    phone: '(11) 4002-8922',
    email: 'relacionamento@financegroup.com',
    status: ['Ativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '12',
    company: 'Mega Indústria Metalúrgica',
    cnpj: '10.111.222/0001-77',
    segment: 'Indústria',
    filial: 'Joinville',
    contact: 'Lucas Pereira',
    phone: '(47) 98888-5555',
    email: 'faleconosco@megaind.com',
    status: ['Inativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '13',
    company: 'Travel Tour Viagens',
    cnpj: '20.222.333/0001-88',
    segment: 'Turismo',
    filial: 'Rio de Janeiro',
    contact: 'Renata Carvalho',
    phone: '(21) 97676-1212',
    email: 'reservas@traveltour.com',
    status: ['Negociando'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '14',
    company: 'Saúde & Vida',
    cnpj: '30.333.444/0001-99',
    segment: 'Saúde',
    filial: 'São Paulo',
    contact: 'Gustavo Nogueira',
    phone: '(11) 91111-2222',
    email: 'contato@saudevida.com',
    status: ['Ativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '15',
    company: 'AutoCenter Brasil',
    cnpj: '40.444.555/0001-11',
    segment: 'Automotivo',
    filial: 'Campinas',
    contact: 'Paula Ferreira',
    phone: '(19) 98888-1111',
    email: 'vendas@autocenter.com',
    status: ['Potencial'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '16',
    company: 'SmartHome Solutions',
    cnpj: '50.555.666/0001-22',
    segment: 'Tecnologia',
    filial: 'São Paulo',
    contact: 'Ricardo Almeida',
    phone: '(11) 95555-9999',
    email: 'atendimento@smarthome.com',
    status: ['Ativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '17',
    company: 'Pet Lovers',
    cnpj: '60.666.777/0001-33',
    segment: 'Pet Shop',
    filial: 'Florianópolis',
    contact: 'Carla Souza',
    phone: '(48) 97777-4444',
    email: 'contato@petlovers.com',
    status: ['Ativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '18',
    company: 'ImobiReal Consultoria',
    cnpj: '70.777.888/0001-44',
    segment: 'Imobiliário',
    filial: 'São Paulo',
    contact: 'André Barbosa',
    phone: '(11) 93333-8888',
    email: 'negocios@imobireal.com',
    status: ['Negociando'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '19',
    company: 'StartUpX Inovação',
    cnpj: '80.888.999/0001-55',
    segment: 'Startups',
    filial: 'São Paulo',
    contact: 'Sofia Lima',
    phone: '(11) 92222-1111',
    email: 'hello@startupx.com',
    status: ['Ativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
  {
    key: '20',
    company: 'Global Import Export',
    cnpj: '90.999.000/0001-66',
    segment: 'Comércio Exterior',
    filial: 'Manaus',
    contact: 'Henrique Duarte',
    phone: '(92) 91111-9999',
    email: 'contato@globalimport.com',
    status: ['Inativo'],
    createdAt: "2025-08-10T14:35:00Z",
  },
];
