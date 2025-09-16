import { RightOutlined } from '@ant-design/icons';
import { Button, Space, Tag } from 'antd';
import type { TableProps } from 'antd';
import ActionsDropdown from '../utils/actionsDropdown';

export interface DataType {
  key: string;
  campaign: string;        // Nome da campanha
  platform: string;        // Instagram, TikTok, LinkedIn, YouTube, X (Twitter), Pinterest, Facebook etc.
  objective: string;       // Tráfego, Conversões, Engajamento, Leads, Alcance, Visualizações
  contentType: string;     // Reels, Stories, Carrossel, Shorts, Live, Single Image, UGC etc.
  audience: string;        // Público-alvo/resumo da segmentação
  startDate: string;
  endDate: string;
  budget: string;          // Investimento total estimado
  responsible: string;     // Dono interno
  status: string[];        // Planejamento, Ativa, Pausada, Encerrada
}

export const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Campanha',
    dataIndex: 'campaign',
    key: 'campaign',
  },
  { title: 'Plataforma', dataIndex: 'platform', key: 'platform' },
  { title: 'Objetivo', dataIndex: 'objective', key: 'objective' },
  { title: 'Formato', dataIndex: 'contentType', key: 'contentType' },
  {
    title: 'Público',
    dataIndex: 'audience',
    key: 'audience',
    render: (text) => (
      <span style={{ display: 'inline-block', maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {text}
      </span>
    ),
  },
  { title: 'Início', dataIndex: 'startDate', key: 'startDate' },
  { title: 'Fim', dataIndex: 'endDate', key: 'endDate' },
  { title: 'Investimento', dataIndex: 'budget', key: 'budget' },
  { title: 'Responsável', dataIndex: 'responsible', key: 'responsible' },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          let color = 'blue';
          if (tag === 'Ativa') color = 'green';
          if (tag === 'Pausada') color = 'orange';
          if (tag === 'Encerrada') color = 'volcano';
          if (tag === 'Planejamento') color = 'geekblue';
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
    campaign: 'Lançamento Coleção Fitness',
    platform: 'Instagram',
    objective: 'Conversões',
    contentType: 'Reels + Carrossel',
    audience: 'Mulheres 18–34, interesses fitness e moda, lookalike compradores 3%',
    startDate: '01/09/2025',
    endDate: '30/09/2025',
    budget: 'R$ 28.000,00',
    responsible: 'Mariana Silva',
    status: ['Ativa'],
  },
  {
    key: '2',
    campaign: 'Webinar B2B Automação',
    platform: 'LinkedIn',
    objective: 'Leads',
    contentType: 'Single Image + Lead Gen Form',
    audience: 'Gestores de TI e Operações, empresas 50–500 funcionários, BR',
    startDate: '05/09/2025',
    endDate: '25/09/2025',
    budget: 'R$ 18.500,00',
    responsible: 'Lucas Pereira',
    status: ['Planejamento'],
  },
  {
    key: '3',
    campaign: 'Desafio #EcoOffice',
    platform: 'TikTok',
    objective: 'Engajamento',
    contentType: 'UGC + Hashtag Challenge',
    audience: 'Jovens 16–24, sustentabilidade e vida no escritório',
    startDate: '20/08/2025',
    endDate: '10/09/2025',
    budget: 'R$ 12.000,00',
    responsible: 'Gustavo Nogueira',
    status: ['Ativa'],
  },
  {
    key: '4',
    campaign: 'Série Tutorial do Produto',
    platform: 'YouTube',
    objective: 'Visualizações',
    contentType: 'YouTube Shorts + TrueView In-Stream',
    audience: 'Interesse em CRMs e automação de marketing',
    startDate: '10/08/2025',
    endDate: '10/10/2025',
    budget: 'R$ 35.000,00',
    responsible: 'João Oliveira',
    status: ['Ativa'],
  },
  {
    key: '5',
    campaign: 'Promo de Primavera',
    platform: 'Facebook',
    objective: 'Tráfego',
    contentType: 'Carrossel',
    audience: 'Casais 25–44, interesses em decoração e jardinagem',
    startDate: '21/09/2025',
    endDate: '21/10/2025',
    budget: 'R$ 9.500,00',
    responsible: 'Beatriz Martins',
    status: ['Planejamento'],
  },
  {
    key: '6',
    campaign: 'Case de Sucesso Indústria',
    platform: 'LinkedIn',
    objective: 'Leads',
    contentType: 'Documento (PDF) + Mensagem Patrocinada',
    audience: 'Diretores de Operações e Qualidade na indústria',
    startDate: '25/08/2025',
    endDate: '20/09/2025',
    budget: 'R$ 14.200,00',
    responsible: 'Fernanda Rocha',
    status: ['Ativa'],
  },
  {
    key: '7',
    campaign: 'Semana do Frete Grátis',
    platform: 'Instagram',
    objective: 'Conversões',
    contentType: 'Stories com CTA + Reels',
    audience: 'Lookalike 2% de compradores + retargeting 30 dias',
    startDate: '12/09/2025',
    endDate: '19/09/2025',
    budget: 'R$ 22.000,00',
    responsible: 'Paula Ferreira',
    status: ['Planejamento'],
  },
  {
    key: '8',
    campaign: 'Recrutamento Tech',
    platform: 'LinkedIn',
    objective: 'Leads',
    contentType: 'Single Image + Vídeo curto',
    audience: 'Desenvolvedores Pleno/Sênior em SP e RJ',
    startDate: '01/08/2025',
    endDate: '31/08/2025',
    budget: 'R$ 7.800,00',
    responsible: 'Ricardo Almeida',
    status: ['Encerrada'],
  },
  {
    key: '9',
    campaign: 'Review de Clientes (UGC)',
    platform: 'Instagram',
    objective: 'Engajamento',
    contentType: 'Carrossel + Reels (depoimentos)',
    audience: 'Público quente: visitantes do site 14 dias',
    startDate: '05/08/2025',
    endDate: '05/09/2025',
    budget: 'R$ 6.300,00',
    responsible: 'Amanda Costa',
    status: ['Encerrada'],
  },
  {
    key: '10',
    campaign: 'Lançamento App v2',
    platform: 'X (Twitter)',
    objective: 'Tráfego',
    contentType: 'Vídeo curto + Website Card',
    audience: 'Entusiastas de produtividade e gestão de tempo',
    startDate: '18/08/2025',
    endDate: '18/09/2025',
    budget: 'R$ 11.900,00',
    responsible: 'Eduardo Ramos',
    status: ['Ativa'],
  },
  {
    key: '11',
    campaign: 'Guia Definitivo CFO',
    platform: 'LinkedIn',
    objective: 'Leads',
    contentType: 'Lead Gen Form + Documento',
    audience: 'CFOs e Controllers de empresas 100–1000 funcionários',
    startDate: '03/09/2025',
    endDate: '30/09/2025',
    budget: 'R$ 19.600,00',
    responsible: 'Tatiane Alves',
    status: ['Ativa'],
  },
  {
    key: '12',
    campaign: 'Tour do Showroom',
    platform: 'YouTube',
    objective: 'Visualizações',
    contentType: 'TrueView In-Stream',
    audience: 'Interesses em móveis premium e decoração',
    startDate: '22/07/2025',
    endDate: '22/08/2025',
    budget: 'R$ 8.700,00',
    responsible: 'Rafael Souza',
    status: ['Encerrada'],
  },
  {
    key: '13',
    campaign: 'Back to School',
    platform: 'Instagram',
    objective: 'Conversões',
    contentType: 'Reels + Stories com Sticker',
    audience: 'Pais 25–44, educação infantil e materiais escolares',
    startDate: '05/01/2025',
    endDate: '05/02/2025',
    budget: 'R$ 17.400,00',
    responsible: 'Juliana Mendes',
    status: ['Encerrada'],
  },
  {
    key: '14',
    campaign: 'Selo Sustentável',
    platform: 'Pinterest',
    objective: 'Tráfego',
    contentType: 'Pins Patrocinados',
    audience: 'Decoração eco-friendly e “DIY”',
    startDate: '01/10/2025',
    endDate: '31/10/2025',
    budget: 'R$ 9.200,00',
    responsible: 'Renata Carvalho',
    status: ['Planejamento'],
  },
  {
    key: '15',
    campaign: 'Live de Lançamento',
    platform: 'Instagram',
    objective: 'Engajamento',
    contentType: 'Live + Reposts de cortes',
    audience: 'Seguidores + lookalike 1%',
    startDate: '14/09/2025',
    endDate: '21/09/2025',
    budget: 'R$ 13.000,00',
    responsible: 'Pedro Lima',
    status: ['Planejamento'],
  },
  {
    key: '16',
    campaign: 'Tira-dúvidas SaaS',
    platform: 'YouTube',
    objective: 'Visualizações',
    contentType: 'Shorts educativos',
    audience: 'Profissionais de marketing e vendas B2B',
    startDate: '01/09/2025',
    endDate: '30/09/2025',
    budget: 'R$ 15.500,00',
    responsible: 'Carla Souza',
    status: ['Ativa'],
  },
  {
    key: '17',
    campaign: 'Retenção Pós-compra',
    platform: 'Facebook',
    objective: 'Engajamento',
    contentType: 'Carrossel + Single Image',
    audience: 'Compradores últimos 90 dias (exclui últimos 7)',
    startDate: '08/09/2025',
    endDate: '08/10/2025',
    budget: 'R$ 6.900,00',
    responsible: 'Henrique Duarte',
    status: ['Ativa'],
  },
  {
    key: '18',
    campaign: 'Captação para Evento',
    platform: 'LinkedIn',
    objective: 'Leads',
    contentType: 'Evento + Lead Gen',
    audience: 'Heads de RH e Gente & Gestão',
    startDate: '12/09/2025',
    endDate: '02/10/2025',
    budget: 'R$ 16.800,00',
    responsible: 'Sofia Lima',
    status: ['Planejamento'],
  },
  {
    key: '19',
    campaign: 'Comparativo vs Concorrente',
    platform: 'X (Twitter)',
    objective: 'Tráfego',
    contentType: 'Thread + Website Card',
    audience: 'Usuários de ferramentas concorrentes e tech influencers',
    startDate: '10/08/2025',
    endDate: '10/09/2025',
    budget: 'R$ 5.600,00',
    responsible: 'André Barbosa',
    status: ['Ativa'],
  },
  {
    key: '20',
    campaign: 'Unboxing em Série',
    platform: 'TikTok',
    objective: 'Conversões',
    contentType: 'UGC + Spark Ads',
    audience: 'Amantes de gadgets, 18–34, BR',
    startDate: '25/08/2025',
    endDate: '25/09/2025',
    budget: 'R$ 20.000,00',
    responsible: 'Rafael Souza',
    status: ['Ativa'],
  },
];
