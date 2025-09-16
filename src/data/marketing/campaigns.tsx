import { ArrowRightOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

export interface DataType {
  key: string;
  campaign: string;
  channel: string;
  startDate: string;
  endDate: string;
  budget: string;
  responsible: string;
  status: string[];
}

export const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Campanha',
    dataIndex: 'campaign',
    key: 'campaign',
  },
  {
    title: 'Canal',
    dataIndex: 'channel',
    key: 'channel',
  },
  {
    title: 'Início',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'Fim',
    dataIndex: 'endDate',
    key: 'endDate',
  },
  {
    title: 'Investimento',
    dataIndex: 'budget',
    key: 'budget',
  },
  {
    title: 'Responsável',
    dataIndex: 'responsible',
    key: 'responsible',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          let color = 'blue';
          if (tag === 'Ativa') {
            color = 'green';
          }
          if (tag === 'Pausada') {
            color = 'orange';
          }
          if (tag === 'Encerrada') {
            color = 'volcano';
          }
          if (tag === 'Planejamento') {
            color = 'geekblue';
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
];

export const data: DataType[] = [
  {
    key: '1',
    campaign: 'Black Friday 2025',
    channel: 'Facebook Ads',
    startDate: '01/11/2025',
    endDate: '30/11/2025',
    budget: 'R$ 50.000,00',
    responsible: 'Mariana Silva',
    status: ['Ativa'],
  },
  {
    key: '2',
    campaign: 'Natal Premiado',
    channel: 'Google Ads',
    startDate: '01/12/2025',
    endDate: '26/12/2025',
    budget: 'R$ 35.000,00',
    responsible: 'Carlos Andrade',
    status: ['Planejamento'],
  },
  {
    key: '3',
    campaign: 'Lançamento App',
    channel: 'Instagram',
    startDate: '15/08/2025',
    endDate: '15/09/2025',
    budget: 'R$ 20.000,00',
    responsible: 'Fernanda Rocha',
    status: ['Encerrada'],
  },
  {
    key: '4',
    campaign: 'Promoção Dia das Mães',
    channel: 'Email Marketing',
    startDate: '01/05/2025',
    endDate: '12/05/2025',
    budget: 'R$ 8.000,00',
    responsible: 'Pedro Lima',
    status: ['Pausada'],
  },
  {
    key: '5',
    campaign: 'Semana do Consumidor',
    channel: 'LinkedIn Ads',
    startDate: '10/03/2025',
    endDate: '17/03/2025',
    budget: 'R$ 18.500,00',
    responsible: 'Juliana Mendes',
    status: ['Encerrada'],
  },
  {
    key: '6',
    campaign: 'Volta às Aulas',
    channel: 'Google Ads',
    startDate: '05/01/2025',
    endDate: '05/02/2025',
    budget: 'R$ 22.000,00',
    responsible: 'Rafael Souza',
    status: ['Encerrada'],
  },
  {
    key: '7',
    campaign: 'Carnaval Ofertas',
    channel: 'TikTok Ads',
    startDate: '15/02/2025',
    endDate: '01/03/2025',
    budget: 'R$ 12.000,00',
    responsible: 'Amanda Costa',
    status: ['Encerrada'],
  },
  {
    key: '8',
    campaign: 'Inverno com Estilo',
    channel: 'YouTube Ads',
    startDate: '01/06/2025',
    endDate: '30/06/2025',
    budget: 'R$ 40.000,00',
    responsible: 'João Oliveira',
    status: ['Planejamento'],
  },
  {
    key: '9',
    campaign: 'Semana Geek',
    channel: 'Instagram',
    startDate: '20/07/2025',
    endDate: '27/07/2025',
    budget: 'R$ 15.000,00',
    responsible: 'Beatriz Martins',
    status: ['Encerrada'],
  },
  {
    key: '10',
    campaign: 'Campanha de Aniversário',
    channel: 'Facebook Ads',
    startDate: '10/09/2025',
    endDate: '20/09/2025',
    budget: 'R$ 28.000,00',
    responsible: 'Eduardo Ramos',
    status: ['Ativa'],
  },
  {
    key: '11',
    campaign: 'Dia dos Pais',
    channel: 'Email Marketing',
    startDate: '01/08/2025',
    endDate: '15/08/2025',
    budget: 'R$ 9.500,00',
    responsible: 'Tatiane Alves',
    status: ['Encerrada'],
  },
  {
    key: '12',
    campaign: 'Campanha Primavera',
    channel: 'Google Ads',
    startDate: '21/09/2025',
    endDate: '21/10/2025',
    budget: 'R$ 16.000,00',
    responsible: 'Lucas Pereira',
    status: ['Planejamento'],
  },
  {
    key: '13',
    campaign: 'Liquidação de Verão',
    channel: 'Instagram',
    startDate: '05/12/2025',
    endDate: '15/01/2026',
    budget: 'R$ 25.000,00',
    responsible: 'Renata Carvalho',
    status: ['Planejamento'],
  },
  {
    key: '14',
    campaign: 'Campanha Influencers',
    channel: 'TikTok Ads',
    startDate: '01/04/2025',
    endDate: '30/04/2025',
    budget: 'R$ 14.000,00',
    responsible: 'Gustavo Nogueira',
    status: ['Encerrada'],
  },
  {
    key: '15',
    campaign: 'Cyber Monday',
    channel: 'Facebook Ads',
    startDate: '02/12/2025',
    endDate: '05/12/2025',
    budget: 'R$ 30.000,00',
    responsible: 'Paula Ferreira',
    status: ['Planejamento'],
  },
  {
    key: '16',
    campaign: 'Feirão de Estoque',
    channel: 'YouTube Ads',
    startDate: '01/10/2025',
    endDate: '15/10/2025',
    budget: 'R$ 19.000,00',
    responsible: 'Ricardo Almeida',
    status: ['Ativa'],
  },
  {
    key: '17',
    campaign: 'Dia do Cliente',
    channel: 'Google Ads',
    startDate: '10/09/2025',
    endDate: '15/09/2025',
    budget: 'R$ 13.000,00',
    responsible: 'Carla Souza',
    status: ['Encerrada'],
  },
  {
    key: '18',
    campaign: 'Festival de Frete Grátis',
    channel: 'Email Marketing',
    startDate: '05/11/2025',
    endDate: '15/11/2025',
    budget: 'R$ 7.500,00',
    responsible: 'André Barbosa',
    status: ['Planejamento'],
  },
  {
    key: '19',
    campaign: 'Promoção Relâmpago',
    channel: 'Instagram',
    startDate: '20/10/2025',
    endDate: '25/10/2025',
    budget: 'R$ 5.000,00',
    responsible: 'Sofia Lima',
    status: ['Ativa'],
  },
  {
    key: '20',
    campaign: 'Campanha Institucional',
    channel: 'LinkedIn Ads',
    startDate: '01/07/2025',
    endDate: '31/07/2025',
    budget: 'R$ 45.000,00',
    responsible: 'Henrique Duarte',
    status: ['Encerrada'],
  },
];
