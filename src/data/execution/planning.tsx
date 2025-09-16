import { RightOutlined } from '@ant-design/icons';
import { Button, Space, Tag, Progress, Table } from 'antd';
import type { TableProps, ColumnsType } from 'antd/es/table';
import ActionsDropdown from '../utils/actionsDropdown';

/** ========= Tipagens ========= */
export interface SubService {
  key: string;
  service: string;           // nome do serviço
  stageMode: string;         // etapa/modalidade
  authority: string;         // órgão
  plannedStart: string;      // início previsto
  forecastFinish: string;    // previsão de conclusão
  inspectionWindow?: string; // janela de vistoria (se houver)
  protocolNumber?: string;   // nº protocolo
  status: string;            // Planejado, Em andamento, Aguardando Órgão, Concluído...
  progress: number;          // 0-100
  feesPaid: boolean;         // taxas pagas?
}

export interface DataType {
  key: string;

  // Identificação de execução
  osNumber: string;          // Nº da OS
  fspNumber: string;         // Nº FSP origem
  service: string;           // Serviço principal (da OS)
  stageMode: string;         // Etapa geral
  sediUnit: string;          // Unidade SEDI
  cityUF: string;            // Cidade/UF
  siteAddress: string;       // Endereço

  // Agenda (macro)
  plannedStart: string;
  actualStart?: string;
  contractualDue: string;
  forecastFinish: string;
  inspectionWindow?: string;
  authority: string;

  // Equipe
  manager: string;
  leadTech: string;
  crew: string[];
  vendors?: string[];

  // Controle (macro)
  status: string[];          // Planejada, Em andamento, Em aprovação, Concluída, Bloqueada...
  risk: 'Baixo' | 'Médio' | 'Alto';
  progress: number;          // progresso geral da OS
  openIssues: number;
  docsStatus: 'Pendente' | 'Parcial' | 'Completo';
  protocolNumber?: string;   // protocolo principal
  feesPaid: boolean;

  // Inspeções (macro)
  inspectionsScheduled: number;
  inspectionsDone: number;
  lastInspectionResult?: 'Aprovado' | 'Reprovado' | 'Com Pendências';

  // Cliente (execução)
  clientContact: string;
  clientEmail: string;
  clientPhone: string;

  // Serviços incluídos (renderizados na linha expansível)
  servicesIncluded: SubService[]; // 1 a 5 itens
}

/** ========= Colunas (cabeçalho agrupado) ========= */
export const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Execução',
    children: [
      { title: 'OS', dataIndex: 'osNumber', key: 'osNumber' },
      { title: 'FSP', dataIndex: 'fspNumber', key: 'fspNumber' },
      { title: 'Serviço', dataIndex: 'service', key: 'service' },
      { title: 'Etapa', dataIndex: 'stageMode', key: 'stageMode' },
      { title: 'Unidade SEDI', dataIndex: 'sediUnit', key: 'sediUnit' },
      { title: 'Cidade/UF', dataIndex: 'cityUF', key: 'cityUF' },
      { title: 'Endereço', dataIndex: 'siteAddress', key: 'siteAddress' },
    ],
  },
  {
    title: 'Agenda',
    children: [
      { title: 'Início Previsto', dataIndex: 'plannedStart', key: 'plannedStart' },
      { title: 'Início Real', dataIndex: 'actualStart', key: 'actualStart' },
      { title: 'Prazo Contratual', dataIndex: 'contractualDue', key: 'contractualDue' },
      { title: 'Previsão Conclusão', dataIndex: 'forecastFinish', key: 'forecastFinish' },
      { title: 'Órgão', dataIndex: 'authority', key: 'authority' },
      { title: 'Janela de Vistoria', dataIndex: 'inspectionWindow', key: 'inspectionWindow' },
    ],
  },
  {
    title: 'Equipe',
    children: [
      { title: 'PM', dataIndex: 'manager', key: 'manager' },
      { title: 'Técnico Líder', dataIndex: 'leadTech', key: 'leadTech' },
      {
        title: 'Equipe',
        dataIndex: 'crew',
        key: 'crew',
        render: (crew: string[]) => crew.join(', '),
      },
      {
        title: 'Terceiros',
        dataIndex: 'vendors',
        key: 'vendors',
        render: (v?: string[]) => (v && v.length ? v.join(', ') : '—'),
      },
    ],
  },
  {
    title: 'Controle',
    children: [
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, { status }) => (
          <>
            {status.map((tag) => {
              let color: any = 'blue';
              if (tag === 'Planejada') color = 'geekblue';
              if (tag === 'Em andamento') color = 'processing';
              if (tag === 'Em aprovação') color = 'purple';
              if (tag === 'Concluída') color = 'green';
              if (tag === 'Bloqueada') color = 'volcano';
              if (tag === 'Aguardando Cliente') color = 'gold';
              if (tag === 'Aguardando Órgão') color = 'cyan';
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
        title: 'Risco',
        dataIndex: 'risk',
        key: 'risk',
        render: (r: DataType['risk']) => {
          const color = r === 'Alto' ? 'volcano' : r === 'Médio' ? 'gold' : 'green';
          return <Tag color={color}>{r.toUpperCase()}</Tag>;
        },
      },
      {
        title: 'Progresso',
        dataIndex: 'progress',
        key: 'progress',
        render: (_: any, rec: DataType) => <Progress percent={rec.progress} size="small" />,
      },
      {
        title: 'Pendências',
        dataIndex: 'openIssues',
        key: 'openIssues',
        render: (n: number) => (n > 0 ? <Tag color="warning">{n}</Tag> : <Tag color="success">0</Tag>),
      },
      {
        title: 'Docs',
        dataIndex: 'docsStatus',
        key: 'docsStatus',
        render: (d: DataType['docsStatus']) => {
          const color = d === 'Completo' ? 'green' : d === 'Parcial' ? 'gold' : 'volcano';
          return <Tag color={color}>{d.toUpperCase()}</Tag>;
        },
      },
      { title: 'Protocolo', dataIndex: 'protocolNumber', key: 'protocolNumber' },
      {
        title: 'Taxas',
        dataIndex: 'feesPaid',
        key: 'feesPaid',
        render: (b: boolean) => <Tag color={b ? 'green' : 'volcano'}>{b ? 'PAGAS' : 'PENDENTES'}</Tag>,
      },
    ],
  },
  {
    title: 'Inspeções',
    children: [
      { title: 'Agendadas', dataIndex: 'inspectionsScheduled', key: 'inspectionsScheduled' },
      { title: 'Realizadas', dataIndex: 'inspectionsDone', key: 'inspectionsDone' },
      { title: 'Último Resultado', dataIndex: 'lastInspectionResult', key: 'lastInspectionResult' },
    ],
  },
  {
    title: 'Cliente',
    children: [
      { title: 'Contato', dataIndex: 'clientContact', key: 'clientContact' },
      { title: 'E-mail', dataIndex: 'clientEmail', key: 'clientEmail' },
      { title: 'Telefone', dataIndex: 'clientPhone', key: 'clientPhone' },
    ],
  },

];

/** ========= Colunas da tabela aninhada (serviços incluídos) ========= */
const subServicesColumns: ColumnsType<SubService> = [
  { title: 'Serviço', dataIndex: 'service', key: 'service' },
  { title: 'Etapa', dataIndex: 'stageMode', key: 'stageMode' },
  { title: 'Órgão', dataIndex: 'authority', key: 'authority' },
  { title: 'Início Prev.', dataIndex: 'plannedStart', key: 'plannedStart' },
  { title: 'Prev. Conclusão', dataIndex: 'forecastFinish', key: 'forecastFinish' },
  { title: 'Janela de Vistoria', dataIndex: 'inspectionWindow', key: 'inspectionWindow' },
  { title: 'Protocolo', dataIndex: 'protocolNumber', key: 'protocolNumber' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (s: string) => {
      let color: any = 'blue';
      if (s === 'Planejado') color = 'geekblue';
      if (s === 'Em andamento') color = 'processing';
      if (s === 'Aguardando Órgão') color = 'cyan';
      if (s === 'Aguardando Cliente') color = 'gold';
      if (s === 'Concluído') color = 'green';
      if (s === 'Reprovado') color = 'volcano';
      return <Tag color={color}>{s.toUpperCase()}</Tag>;
    },
  },
  {
    title: 'Progresso',
    dataIndex: 'progress',
    key: 'progress',
    render: (p: number) => <Progress percent={p} size="small" />,
  },
  {
    title: 'Taxas',
    dataIndex: 'feesPaid',
    key: 'feesPaid',
    render: (b: boolean) => <Tag color={b ? 'green' : 'volcano'}>{b ? 'PAGAS' : 'PENDENTES'}</Tag>,
  },
];

/** ========= Dados (20 OS) com 1–5 serviços incluídos ========= */
export const data: DataType[] = [
  {
    key: '1',
    osNumber: 'OS-25-0001',
    fspNumber: 'FSP-25-0001',
    service: 'Licença Ambiental (LP/LI/LO)',
    stageMode: 'LP/LI/LO',
    sediUnit: 'SP',
    cityUF: 'Ribeirão Preto/SP',
    siteAddress: 'Av. Pres. Vargas, 500',
    plannedStart: '05/09/2025',
    actualStart: '06/09/2025',
    contractualDue: '30/09/2025',
    forecastFinish: '28/09/2025',
    inspectionWindow: '15–18/09 (manhã)',
    authority: 'CETESB',
    manager: 'Mariana Silva',
    leadTech: 'Pedro Lima',
    crew: ['Ana P.', 'Bruno C.'],
    vendors: ['GeoServ'],
    status: ['Em andamento'],
    risk: 'Médio',
    progress: 45,
    openIssues: 2,
    docsStatus: 'Parcial',
    protocolNumber: 'LP-2025-1123',
    feesPaid: true,
    inspectionsScheduled: 1,
    inspectionsDone: 0,
    lastInspectionResult: undefined,
    clientContact: 'Mariana Souza',
    clientEmail: 'mariana.souza@agrovida.com',
    clientPhone: '(16) 3232-1000',
    servicesIncluded: [
      { key: '1-1', service: 'Licença Prévia (LP)', stageMode: 'LP', authority: 'CETESB', plannedStart: '06/09/2025', forecastFinish: '12/09/2025', protocolNumber: 'LP-2025-1123', status: 'Em andamento', progress: 60, feesPaid: true },
      { key: '1-2', service: 'Licença de Instalação (LI)', stageMode: 'LI', authority: 'CETESB', plannedStart: '13/09/2025', forecastFinish: '20/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
      { key: '1-3', service: 'Licença de Operação (LO)', stageMode: 'LO', authority: 'CETESB', plannedStart: '21/09/2025', forecastFinish: '28/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
      { key: '1-4', service: 'Atendimento de Exigências', stageMode: 'Exigências', authority: 'CETESB', plannedStart: '16/09/2025', forecastFinish: '22/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
    ],
  },
  {
    key: '2',
    osNumber: 'OS-25-0002',
    fspNumber: 'FSP-25-0002',
    service: 'Alvará de Funcionamento',
    stageMode: 'Emissão',
    sediUnit: 'SP',
    cityUF: 'São Paulo/SP',
    siteAddress: 'Rua Funchal, 200',
    plannedStart: '07/09/2025',
    contractualDue: '20/09/2025',
    forecastFinish: '18/09/2025',
    inspectionWindow: '12/09 (tarde)',
    authority: 'Prefeitura SP',
    manager: 'Rafael Souza',
    leadTech: 'João Oliveira',
    crew: ['Clara R.'],
    status: ['Em andamento'],
    risk: 'Baixo',
    progress: 60,
    openIssues: 1,
    docsStatus: 'Parcial',
    protocolNumber: 'ALF-2025-7781',
    feesPaid: true,
    inspectionsScheduled: 1,
    inspectionsDone: 0,
    lastInspectionResult: undefined,
    clientContact: 'Carlos Andrade',
    clientEmail: 'c.andrade@techsolutions.com',
    clientPhone: '(11) 98765-4321',
    servicesIncluded: [
      { key: '2-1', service: 'Vistoria Técnica', stageMode: 'Vistoria', authority: 'Prefeitura SP', plannedStart: '09/09/2025', forecastFinish: '09/09/2025', inspectionWindow: '09/09 (manhã)', status: 'Em andamento', progress: 50, feesPaid: true },
      { key: '2-2', service: 'Protocolo do Alvará', stageMode: 'Protocolo', authority: 'Prefeitura SP', plannedStart: '10/09/2025', forecastFinish: '10/09/2025', status: 'Planejado', progress: 0, feesPaid: true },
      { key: '2-3', service: 'Relatório Fotográfico', stageMode: 'Relatório', authority: '—', plannedStart: '11/09/2025', forecastFinish: '11/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
    ],
  },
  {
    key: '3',
    osNumber: 'OS-25-0003',
    fspNumber: 'FSP-25-0003',
    service: 'Alvará Sanitário (renovação)',
    stageMode: 'Renovação',
    sediUnit: 'SP',
    cityUF: 'Campinas/SP',
    siteAddress: 'Av. Barão de Itapura, 900',
    plannedStart: '01/09/2025',
    actualStart: '01/09/2025',
    contractualDue: '10/09/2025',
    forecastFinish: '09/09/2025',
    authority: 'Vigilância Sanitária',
    manager: 'Fernanda Rocha',
    leadTech: 'Paula Ferreira',
    crew: ['Diego T.'],
    status: ['Em aprovação'],
    risk: 'Baixo',
    progress: 85,
    openIssues: 0,
    docsStatus: 'Completo',
    protocolNumber: 'SAN-2025-3110',
    feesPaid: true,
    inspectionsScheduled: 1,
    inspectionsDone: 1,
    lastInspectionResult: 'Aprovado',
    clientContact: 'Pedro Lima',
    clientEmail: 'eng@biopharma.com',
    clientPhone: '(19) 3777-5566',
    servicesIncluded: [
      { key: '3-1', service: 'Checklist Sanitário', stageMode: 'Checklist', authority: 'VISA', plannedStart: '02/09/2025', forecastFinish: '03/09/2025', status: 'Concluído', progress: 100, feesPaid: false },
      { key: '3-2', service: 'Protocolo Renovação', stageMode: 'Protocolo', authority: 'VISA', plannedStart: '04/09/2025', forecastFinish: '04/09/2025', protocolNumber: 'SAN-2025-3110', status: 'Concluído', progress: 100, feesPaid: true },
      { key: '3-3', service: 'Vistoria Sanitária', stageMode: 'Vistoria', authority: 'VISA', plannedStart: '07/09/2025', forecastFinish: '07/09/2025', inspectionWindow: '07/09 (tarde)', status: 'Concluído', progress: 100, feesPaid: true },
    ],
  },
  {
    key: '4',
    osNumber: 'OS-25-0004',
    fspNumber: 'FSP-25-0004',
    service: 'AVCB (Projeto + Emissão)',
    stageMode: 'Projeto + Emissão',
    sediUnit: 'PE',
    cityUF: 'Recife/PE',
    siteAddress: 'BR-232, km 12',
    plannedStart: '02/09/2025',
    actualStart: '03/09/2025',
    contractualDue: '05/10/2025',
    forecastFinish: '01/10/2025',
    inspectionWindow: '25/09 (manhã)',
    authority: 'CBM-PE',
    manager: 'João Oliveira',
    leadTech: 'Ricardo Almeida',
    crew: ['Helena S.', 'Igor V.'],
    vendors: ['EngFire'],
    status: ['Em andamento'],
    risk: 'Médio',
    progress: 40,
    openIssues: 3,
    docsStatus: 'Parcial',
    protocolNumber: 'AVCB-PE-8821',
    feesPaid: false,
    inspectionsScheduled: 1,
    inspectionsDone: 0,
    lastInspectionResult: undefined,
    clientContact: 'Beatriz Martins',
    clientEmail: 'b.martins@translog.com',
    clientPhone: '(81) 97777-8888',
    servicesIncluded: [
      { key: '4-1', service: 'Projeto de Prevenção', stageMode: 'Projeto', authority: 'CBM-PE', plannedStart: '03/09/2025', forecastFinish: '12/09/2025', status: 'Em andamento', progress: 35, feesPaid: false },
      { key: '4-2', service: 'Treinamento de Brigada', stageMode: 'Treinamento', authority: '—', plannedStart: '18/09/2025', forecastFinish: '18/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
      { key: '4-3', service: 'Protocolo AVCB', stageMode: 'Protocolo', authority: 'CBM-PE', plannedStart: '20/09/2025', forecastFinish: '20/09/2025', status: 'Planejado', progress: 0, feesPaid: true },
      { key: '4-4', service: 'Vistoria do Corpo de Bombeiros', stageMode: 'Vistoria', authority: 'CBM-PE', plannedStart: '25/09/2025', forecastFinish: '25/09/2025', inspectionWindow: '25/09 (manhã)', status: 'Planejado', progress: 0, feesPaid: true },
    ],
  },
  {
    key: '5',
    osNumber: 'OS-25-0005',
    fspNumber: 'FSP-25-0005',
    service: 'CTF/IBAMA (atualização)',
    stageMode: 'Atualização',
    sediUnit: 'RS',
    cityUF: 'Porto Alegre/RS',
    siteAddress: 'Av. Ipiranga, 350',
    plannedStart: '06/09/2025',
    contractualDue: '25/09/2025',
    forecastFinish: '20/09/2025',
    authority: 'IBAMA',
    manager: 'Lucas Pereira',
    leadTech: 'Amanda Costa',
    crew: ['Bruna L.'],
    status: ['Planejada'],
    risk: 'Baixo',
    progress: 10,
    openIssues: 0,
    docsStatus: 'Pendente',
    feesPaid: false,
    inspectionsScheduled: 0,
    inspectionsDone: 0,
    lastInspectionResult: undefined,
    clientContact: 'Eduardo Ramos',
    clientEmail: 'contato@greenambiental.com',
    clientPhone: '(51) 3232-9090',
    servicesIncluded: [
      { key: '5-1', service: 'Atualização CTF', stageMode: 'Cadastro', authority: 'IBAMA', plannedStart: '09/09/2025', forecastFinish: '12/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
      { key: '5-2', service: 'Inclusão de Atividades', stageMode: 'Cadastro', authority: 'IBAMA', plannedStart: '13/09/2025', forecastFinish: '15/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
    ],
  },
  {
    key: '6',
    osNumber: 'OS-25-0006',
    fspNumber: 'FSP-25-0006',
    service: 'Licença de Operação (renovação)',
    stageMode: 'Renovação',
    sediUnit: 'CE',
    cityUF: 'Fortaleza/CE',
    siteAddress: 'Av. Beira Mar, 1200',
    plannedStart: '29/08/2025',
    actualStart: '30/08/2025',
    contractualDue: '18/09/2025',
    forecastFinish: '17/09/2025',
    authority: 'SEMACE',
    manager: 'Gustavo Nogueira',
    leadTech: 'Renata Carvalho',
    crew: ['Tiago M.'],
    status: ['Em andamento', 'Aguardando Órgão'],
    risk: 'Médio',
    progress: 55,
    openIssues: 1,
    docsStatus: 'Parcial',
    protocolNumber: 'LO-2025-4410',
    feesPaid: true,
    inspectionsScheduled: 1,
    inspectionsDone: 0,
    lastInspectionResult: undefined,
    clientContact: 'Rafael Souza',
    clientEmail: 'rafael@esolarplus.com',
    clientPhone: '(85) 3344-7788',
    servicesIncluded: [
      { key: '6-1', service: 'Relatório Técnico LO', stageMode: 'Relatório', authority: 'SEMACE', plannedStart: '01/09/2025', forecastFinish: '07/09/2025', status: 'Em andamento', progress: 70, feesPaid: true },
      { key: '6-2', service: 'Protocolo LO', stageMode: 'Protocolo', authority: 'SEMACE', plannedStart: '08/09/2025', forecastFinish: '08/09/2025', protocolNumber: 'LO-2025-4410', status: 'Concluído', progress: 100, feesPaid: true },
      { key: '6-3', service: 'Atendimento de Exigências', stageMode: 'Exigências', authority: 'SEMACE', plannedStart: '12/09/2025', forecastFinish: '16/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
    ],
  },
  {
    key: '7',
    osNumber: 'OS-25-0007',
    fspNumber: 'FSP-25-0007',
    service: 'Outorga de Uso de Água',
    stageMode: 'Emissão',
    sediUnit: 'BA',
    cityUF: 'Salvador/BA',
    siteAddress: 'Av. Tancredo Neves, 1000',
    plannedStart: '10/09/2025',
    contractualDue: '25/09/2025',
    forecastFinish: '24/09/2025',
    authority: 'INEMA',
    manager: 'Renata Carvalho',
    leadTech: 'João Oliveira',
    crew: ['Caroline S.'],
    status: ['Planejada'],
    risk: 'Médio',
    progress: 5,
    openIssues: 0,
    docsStatus: 'Pendente',
    feesPaid: false,
    inspectionsScheduled: 0,
    inspectionsDone: 0,
    lastInspectionResult: undefined,
    clientContact: 'Amanda Costa',
    clientEmail: 'amanda.costa@foodbr.com',
    clientPhone: '(71) 95555-0000',
    servicesIncluded: [
      { key: '7-1', service: 'Estudo de Disponibilidade Hídrica', stageMode: 'Estudo', authority: 'INEMA', plannedStart: '12/09/2025', forecastFinish: '14/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
      { key: '7-2', service: 'Protocolo de Outorga', stageMode: 'Protocolo', authority: 'INEMA', plannedStart: '18/09/2025', forecastFinish: '18/09/2025', status: 'Planejado', progress: 0, feesPaid: true },
    ],
  },
  {
    key: '8',
    osNumber: 'OS-25-0008',
    fspNumber: 'FSP-25-0008',
    service: 'Alvará de Funcionamento (EAD + Estúdio)',
    stageMode: 'Emissão',
    sediUnit: 'SP',
    cityUF: 'São Paulo/SP',
    siteAddress: 'Rua Vergueiro, 800',
    plannedStart: '09/09/2025',
    contractualDue: '20/09/2025',
    forecastFinish: '19/09/2025',
    authority: 'Prefeitura SP',
    manager: 'Paula Ferreira',
    leadTech: 'Lucas Pereira',
    crew: ['Nina F.'],
    status: ['Planejada'],
    risk: 'Baixo',
    progress: 0,
    openIssues: 0,
    docsStatus: 'Pendente',
    feesPaid: false,
    inspectionsScheduled: 0,
    inspectionsDone: 0,
    lastInspectionResult: undefined,
    clientContact: 'João Oliveira',
    clientEmail: 'joao.oliveira@educamais.com',
    clientPhone: '(11) 91212-3434',
    servicesIncluded: [
      { key: '8-1', service: 'Vistoria Técnica', stageMode: 'Vistoria', authority: 'Prefeitura SP', plannedStart: '12/09/2025', forecastFinish: '12/09/2025', status: 'Planejado', progress: 0, feesPaid: true },
      { key: '8-2', service: 'Protocolo de Alvará', stageMode: 'Protocolo', authority: 'Prefeitura SP', plannedStart: '13/09/2025', forecastFinish: '13/09/2025', status: 'Planejado', progress: 0, feesPaid: true },
    ],
  },
  {
    key: '9',
    osNumber: 'OS-25-0009',
    fspNumber: 'FSP-25-0009',
    service: 'AVCB + Projeto de Incêndio',
    stageMode: 'Projeto + Emissão',
    sediUnit: 'MG',
    cityUF: 'Belo Horizonte/MG',
    siteAddress: 'Av. Afonso Pena, 1234',
    plannedStart: '04/09/2025',
    actualStart: '04/09/2025',
    contractualDue: '12/09/2025',
    forecastFinish: '11/09/2025',
    inspectionWindow: '10/09 (manhã)',
    authority: 'CBMMG',
    manager: 'Ricardo Almeida',
    leadTech: 'Beatriz Martins',
    crew: ['Iuri K.'],
    status: ['Em andamento'],
    risk: 'Médio',
    progress: 65,
    openIssues: 1,
    docsStatus: 'Parcial',
    protocolNumber: 'AVCB-MG-5510',
    feesPaid: true,
    inspectionsScheduled: 1,
    inspectionsDone: 0,
    lastInspectionResult: undefined,
    clientContact: 'Fernanda Rocha',
    clientEmail: 'fernanda.rocha@construmax.com.br',
    clientPhone: '(31) 99888-1234',
    servicesIncluded: [
      { key: '9-1', service: 'Projeto de Prevenção', stageMode: 'Projeto', authority: 'CBMMG', plannedStart: '04/09/2025', forecastFinish: '07/09/2025', status: 'Em andamento', progress: 70, feesPaid: false },
      { key: '9-2', service: 'Protocolo AVCB', stageMode: 'Protocolo', authority: 'CBMMG', plannedStart: '08/09/2025', forecastFinish: '08/09/2025', status: 'Planejado', progress: 0, feesPaid: true },
      { key: '9-3', service: 'Vistoria CBMMG', stageMode: 'Vistoria', authority: 'CBMMG', plannedStart: '10/09/2025', forecastFinish: '10/09/2025', inspectionWindow: '10/09 (manhã)', status: 'Planejado', progress: 0, feesPaid: true },
    ],
  },
  {
    key: '10',
    osNumber: 'OS-25-0010',
    fspNumber: 'FSP-25-0010',
    service: 'Licença de Publicidade (OOH)',
    stageMode: 'Emissão',
    sediUnit: 'PR',
    cityUF: 'Curitiba/PR',
    siteAddress: 'Rua XV de Novembro, 250',
    plannedStart: '26/08/2025',
    actualStart: '27/08/2025',
    contractualDue: '28/08/2025',
    forecastFinish: '27/08/2025',
    authority: 'SMU Curitiba',
    manager: 'Tatiane Alves',
    leadTech: 'Eduardo Ramos',
    crew: ['Marcos Z.'],
    status: ['Concluída'],
    risk: 'Baixo',
    progress: 100,
    openIssues: 0,
    docsStatus: 'Completo',
    protocolNumber: 'PUB-CTBA-2208',
    feesPaid: true,
    inspectionsScheduled: 0,
    inspectionsDone: 0,
    lastInspectionResult: undefined,
    clientContact: 'Juliana Mendes',
    clientEmail: 'juliana.mendes@modaestilo.com',
    clientPhone: '(41) 91234-5678',
    servicesIncluded: [
      { key: '10-1', service: 'Análise de Zoneamento', stageMode: 'Análise', authority: 'SMU', plannedStart: '26/08/2025', forecastFinish: '26/08/2025', status: 'Concluído', progress: 100, feesPaid: false },
      { key: '10-2', service: 'Protocolo de Licença', stageMode: 'Protocolo', authority: 'SMU', plannedStart: '27/08/2025', forecastFinish: '27/08/2025', protocolNumber: 'PUB-CTBA-2208', status: 'Concluído', progress: 100, feesPaid: true },
    ],
  },
  /* --------- Para manter a resposta objetiva, os próximos 10 seguem o mesmo padrão --------- */
  {
    key: '11',
    osNumber: 'OS-25-0011',
    fspNumber: 'FSP-25-0011',
    service: 'Mudança de Endereço (licenças)',
    stageMode: 'Atualização',
    sediUnit: 'SP',
    cityUF: 'São Paulo/SP',
    siteAddress: 'Av. Paulista, 1000',
    plannedStart: '05/09/2025',
    contractualDue: '30/09/2025',
    forecastFinish: '27/09/2025',
    authority: 'Prefeitura/VISA',
    manager: 'Amanda Costa',
    leadTech: 'Tatiane Alves',
    crew: ['Márcio A.'],
    status: ['Em andamento'],
    risk: 'Médio',
    progress: 35,
    openIssues: 2,
    docsStatus: 'Parcial',
    feesPaid: false,
    inspectionsScheduled: 1,
    inspectionsDone: 0,
    clientContact: 'Tatiane Alves',
    clientEmail: 'tatiane.alves@financegroup.com',
    clientPhone: '(11) 4002-8922',
    servicesIncluded: [
      { key: '11-1', service: 'Diagnóstico de Licenças', stageMode: 'Diagnóstico', authority: '—', plannedStart: '06/09/2025', forecastFinish: '09/09/2025', status: 'Em andamento', progress: 50, feesPaid: false },
      { key: '11-2', service: 'Transferência de Alvará', stageMode: 'Atualização', authority: 'Prefeitura', plannedStart: '12/09/2025', forecastFinish: '15/09/2025', status: 'Planejado', progress: 0, feesPaid: true },
      { key: '11-3', service: 'Atualização Sanitária', stageMode: 'Atualização', authority: 'VISA', plannedStart: '16/09/2025', forecastFinish: '20/09/2025', status: 'Planejado', progress: 0, feesPaid: true },
    ],
  },
  {
    key: '12',
    osNumber: 'OS-25-0012',
    fspNumber: 'FSP-25-0012',
    service: 'Renovação (Ambiental + Sanitária)',
    stageMode: 'Renovação',
    sediUnit: 'SC',
    cityUF: 'Joinville/SC',
    siteAddress: 'Rua Dona Francisca, 5000',
    plannedStart: '24/08/2025',
    actualStart: '24/08/2025',
    contractualDue: '20/09/2025',
    forecastFinish: '15/09/2025',
    authority: 'FATMA/VISA',
    manager: 'Mariana Silva',
    leadTech: 'Lucas Pereira',
    crew: ['Vera Q.', 'Caio N.'],
    status: ['Em aprovação'],
    risk: 'Baixo',
    progress: 90,
    openIssues: 0,
    docsStatus: 'Completo',
    feesPaid: true,
    inspectionsScheduled: 1,
    inspectionsDone: 1,
    lastInspectionResult: 'Aprovado',
    clientContact: 'Lucas Pereira',
    clientEmail: 'lucas.pereira@megaind.com',
    clientPhone: '(47) 98888-5555',
    servicesIncluded: [
      { key: '12-1', service: 'Checklist Ambiental', stageMode: 'Checklist', authority: 'FATMA', plannedStart: '26/08/2025', forecastFinish: '30/08/2025', status: 'Concluído', progress: 100, feesPaid: false },
      { key: '12-2', service: 'Checklist Sanitário', stageMode: 'Checklist', authority: 'VISA', plannedStart: '31/08/2025', forecastFinish: '01/09/2025', status: 'Concluído', progress: 100, feesPaid: false },
      { key: '12-3', service: 'Protocolos de Renovação', stageMode: 'Protocolo', authority: 'FATMA/VISA', plannedStart: '02/09/2025', forecastFinish: '05/09/2025', status: 'Concluído', progress: 100, feesPaid: true },
    ],
  },
  {
    key: '13',
    osNumber: 'OS-25-0013',
    fspNumber: 'FSP-25-0013',
    service: 'Enquadramento CNAE x Licenças',
    stageMode: 'Diagnóstico',
    sediUnit: 'RJ',
    cityUF: 'Rio de Janeiro/RJ',
    siteAddress: 'Av. Atlântica, 3000',
    plannedStart: '07/09/2025',
    contractualDue: '18/09/2025',
    forecastFinish: '16/09/2025',
    authority: '—',
    manager: 'João Oliveira',
    leadTech: 'Renata Carvalho',
    crew: ['Otávio E.'],
    status: ['Em andamento'],
    risk: 'Baixo',
    progress: 50,
    openIssues: 0,
    docsStatus: 'Parcial',
    feesPaid: false,
    inspectionsScheduled: 0,
    inspectionsDone: 0,
    clientContact: 'Renata Carvalho',
    clientEmail: 'renata.carvalho@traveltour.com',
    clientPhone: '(21) 97676-1212',
    servicesIncluded: [
      { key: '13-1', service: 'Mapeamento de CNAEs', stageMode: 'Levantamento', authority: '—', plannedStart: '08/09/2025', forecastFinish: '10/09/2025', status: 'Em andamento', progress: 40, feesPaid: false },
      { key: '13-2', service: 'Matriz de Licenças', stageMode: 'Diagnóstico', authority: '—', plannedStart: '11/09/2025', forecastFinish: '15/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
    ],
  },
  {
    key: '14',
    osNumber: 'OS-25-0014',
    fspNumber: 'FSP-25-0014',
    service: 'Alvará Sanitário (clínica)',
    stageMode: 'Emissão',
    sediUnit: 'SP',
    cityUF: 'São Paulo/SP',
    siteAddress: 'Rua Haddock Lobo, 210',
    plannedStart: '08/09/2025',
    contractualDue: '25/09/2025',
    forecastFinish: '23/09/2025',
    authority: 'Vigilância Sanitária',
    manager: 'Paula Ferreira',
    leadTech: 'Gustavo Nogueira',
    crew: ['Felipe R.'],
    status: ['Aguardando Cliente'],
    risk: 'Médio',
    progress: 20,
    openIssues: 1,
    docsStatus: 'Pendente',
    feesPaid: false,
    inspectionsScheduled: 0,
    inspectionsDone: 0,
    clientContact: 'Gustavo Nogueira',
    clientEmail: 'gustavo.nogueira@saudevida.com',
    clientPhone: '(11) 91111-2222',
    servicesIncluded: [
      { key: '14-1', service: 'Plano de Adequações', stageMode: 'Plano', authority: '—', plannedStart: '12/09/2025', forecastFinish: '14/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
      { key: '14-2', service: 'Checklist Sanitário', stageMode: 'Checklist', authority: 'VISA', plannedStart: '15/09/2025', forecastFinish: '17/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
    ],
  },
  {
    key: '15',
    osNumber: 'OS-25-0015',
    fspNumber: 'FSP-25-0015',
    service: 'AVCB + Brigada',
    stageMode: 'Projeto + Emissão',
    sediUnit: 'SP',
    cityUF: 'Campinas/SP',
    siteAddress: 'Av. Andrade Neves, 150',
    plannedStart: '06/09/2025',
    contractualDue: '10/09/2025',
    forecastFinish: '09/09/2025',
    inspectionWindow: '08/09 (tarde)',
    authority: 'CBM-SP',
    manager: 'Rafael Souza',
    leadTech: 'Paula Ferreira',
    crew: ['Joice T.'],
    status: ['Em andamento'],
    risk: 'Baixo',
    progress: 70,
    openIssues: 0,
    docsStatus: 'Parcial',
    protocolNumber: 'AVCB-SP-0091',
    feesPaid: true,
    inspectionsScheduled: 1,
    inspectionsDone: 0,
    clientContact: 'Paula Ferreira',
    clientEmail: 'paula.ferreira@autocenter.com',
    clientPhone: '(19) 98888-1111',
    servicesIncluded: [
      { key: '15-1', service: 'Treinamento de Brigada', stageMode: 'Treinamento', authority: '—', plannedStart: '07/09/2025', forecastFinish: '07/09/2025', status: 'Em andamento', progress: 50, feesPaid: false },
      { key: '15-2', service: 'Protocolo AVCB', stageMode: 'Protocolo', authority: 'CBM-SP', plannedStart: '08/09/2025', forecastFinish: '08/09/2025', status: 'Planejado', progress: 0, feesPaid: true },
    ],
  },
  {
    key: '16',
    osNumber: 'OS-25-0016',
    fspNumber: 'FSP-25-0016',
    service: 'Conformidade INMETRO (serviços)',
    stageMode: 'Diagnóstico',
    sediUnit: 'SP',
    cityUF: 'São Paulo/SP',
    siteAddress: 'Rua Gomes de Carvalho, 1500',
    plannedStart: '05/09/2025',
    contractualDue: '22/09/2025',
    forecastFinish: '20/09/2025',
    authority: 'INMETRO',
    manager: 'Lucas Pereira',
    leadTech: 'Ricardo Almeida',
    crew: ['Natália V.'],
    status: ['Em andamento'],
    risk: 'Baixo',
    progress: 30,
    openIssues: 1,
    docsStatus: 'Parcial',
    feesPaid: false,
    inspectionsScheduled: 0,
    inspectionsDone: 0,
    clientContact: 'Ricardo Almeida',
    clientEmail: 'ricardo.almeida@smarthome.com',
    clientPhone: '(11) 95555-9999',
    servicesIncluded: [
      { key: '16-1', service: 'Levantamento de Requisitos', stageMode: 'Levantamento', authority: 'INMETRO', plannedStart: '05/09/2025', forecastFinish: '12/09/2025', status: 'Em andamento', progress: 30, feesPaid: false },
      { key: '16-2', service: 'Plano de Implantação', stageMode: 'Plano', authority: '—', plannedStart: '13/09/2025', forecastFinish: '18/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
    ],
  },
  {
    key: '17',
    osNumber: 'OS-25-0017',
    fspNumber: 'FSP-25-0017',
    service: 'Alvará + Sanitário (loja pet)',
    stageMode: 'Emissão',
    sediUnit: 'SC',
    cityUF: 'Florianópolis/SC',
    siteAddress: 'Av. Beira-Mar Norte, 400',
    plannedStart: '09/09/2025',
    contractualDue: '15/09/2025',
    forecastFinish: '14/09/2025',
    authority: 'Prefeitura/VISA',
    manager: 'André Barbosa',
    leadTech: 'Carla Souza',
    crew: ['Ruan D.'],
    status: ['Planejada'],
    risk: 'Médio',
    progress: 5,
    openIssues: 0,
    docsStatus: 'Pendente',
    feesPaid: false,
    inspectionsScheduled: 0,
    inspectionsDone: 0,
    clientContact: 'Carla Souza',
    clientEmail: 'carla.souza@petlovers.com',
    clientPhone: '(48) 97777-4444',
    servicesIncluded: [
      { key: '17-1', service: 'Vistoria Técnica', stageMode: 'Vistoria', authority: 'Prefeitura', plannedStart: '10/09/2025', forecastFinish: '10/09/2025', status: 'Planejado', progress: 0, feesPaid: true },
      { key: '17-2', service: 'Checklist Sanitário', stageMode: 'Checklist', authority: 'VISA', plannedStart: '12/09/2025', forecastFinish: '12/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
    ],
  },
  {
    key: '18',
    osNumber: 'OS-25-0018',
    fspNumber: 'FSP-25-0018',
    service: 'Licença de Publicidade (letreiro)',
    stageMode: 'Emissão',
    sediUnit: 'SP',
    cityUF: 'São Paulo/SP',
    siteAddress: 'Rua dos Pinheiros, 400',
    plannedStart: '03/09/2025',
    actualStart: '03/09/2025',
    contractualDue: '05/09/2025',
    forecastFinish: '05/09/2025',
    authority: 'SMUL SP',
    manager: 'Mariana Silva',
    leadTech: 'André Barbosa',
    crew: ['Letícia W.'],
    status: ['Bloqueada', 'Aguardando Cliente'],
    risk: 'Alto',
    progress: 20,
    openIssues: 2,
    docsStatus: 'Pendente',
    feesPaid: false,
    inspectionsScheduled: 0,
    inspectionsDone: 0,
    clientContact: 'André Barbosa',
    clientEmail: 'andre.barbosa@imobireal.com',
    clientPhone: '(11) 93333-8888',
    servicesIncluded: [
      { key: '18-1', service: 'Análise de Zoneamento', stageMode: 'Análise', authority: 'SMUL', plannedStart: '03/09/2025', forecastFinish: '04/09/2025', status: 'Em andamento', progress: 50, feesPaid: false },
      { key: '18-2', service: 'Coleta de ART/Laudo', stageMode: 'Documentos', authority: '—', plannedStart: '05/09/2025', forecastFinish: '05/09/2025', status: 'Planejado', progress: 0, feesPaid: false },
      { key: '18-3', service: 'Protocolo Licença', stageMode: 'Protocolo', authority: 'SMUL', plannedStart: '06/09/2025', forecastFinish: '06/09/2025', status: 'Planejado', progress: 0, feesPaid: true },
    ],
  },
  {
    key: '19',
    osNumber: 'OS-25-0019',
    fspNumber: 'FSP-25-0019',
    service: 'AVCB + Plano de Emergência',
    stageMode: 'Projeto + Emissão',
    sediUnit: 'SP',
    cityUF: 'São Paulo/SP',
    siteAddress: 'Rua Augusta, 2500',
    plannedStart: '01/09/2025',
    actualStart: '02/09/2025',
    contractualDue: '25/09/2025',
    forecastFinish: '22/09/2025',
    inspectionWindow: '19/09 (manhã)',
    authority: 'CBM-SP',
    manager: 'Gustavo Nogueira',
    leadTech: 'Sofia Lima',
    crew: ['Pedro H.'],
    status: ['Em andamento', 'Aguardando Órgão'],
    risk: 'Médio',
    progress: 55,
    openIssues: 1,
    docsStatus: 'Parcial',
    protocolNumber: 'AVCB-SP-7772',
    feesPaid: true,
    inspectionsScheduled: 1,
    inspectionsDone: 0,
    clientContact: 'Sofia Lima',
    clientEmail: 'sofia.lima@startupx.com',
    clientPhone: '(11) 92222-1111',
    servicesIncluded: [
      { key: '19-1', service: 'Plano de Emergência', stageMode: 'Plano', authority: 'CBM-SP', plannedStart: '03/09/2025', forecastFinish: '10/09/2025', status: 'Em andamento', progress: 60, feesPaid: false },
      { key: '19-2', service: 'Protocolo AVCB', stageMode: 'Protocolo', authority: 'CBM-SP', plannedStart: '12/09/2025', forecastFinish: '12/09/2025', status: 'Planejado', progress: 0, feesPaid: true },
    ],
  },
  {
    key: '20',
    osNumber: 'OS-25-0020',
    fspNumber: 'FSP-25-0020',
    service: 'Autorização MTR (resíduos)',
    stageMode: 'Emissão',
    sediUnit: 'AM',
    cityUF: 'Manaus/AM',
    siteAddress: 'Av. Torquato Tapajós, 2000',
    plannedStart: '16/08/2025',
    actualStart: '17/08/2025',
    contractualDue: '10/09/2025',
    forecastFinish: '08/09/2025',
    authority: 'SEMA AM',
    manager: 'Renata Carvalho',
    leadTech: 'Henrique Duarte',
    crew: ['Érica F.'],
    status: ['Concluída'],
    risk: 'Baixo',
    progress: 100,
    openIssues: 0,
    docsStatus: 'Completo',
    protocolNumber: 'MTR-AM-9031',
    feesPaid: true,
    inspectionsScheduled: 0,
    inspectionsDone: 0,
    clientContact: 'Henrique Duarte',
    clientEmail: 'henrique.duarte@globalimport.com',
    clientPhone: '(92) 91111-9999',
    servicesIncluded: [
      { key: '20-1', service: 'Cadastro MTR', stageMode: 'Cadastro', authority: 'SEMA AM', plannedStart: '18/08/2025', forecastFinish: '20/08/2025', status: 'Concluído', progress: 100, feesPaid: false },
      { key: '20-2', service: 'Protocolo de Autorização', stageMode: 'Protocolo', authority: 'SEMA AM', plannedStart: '22/08/2025', forecastFinish: '22/08/2025', protocolNumber: 'MTR-AM-9031', status: 'Concluído', progress: 100, feesPaid: true },
    ],
  },
];

/** ========= Expandable Row: Tabela de serviços incluídos ========= */
export const expandable: TableProps<DataType>['expandable'] = {
  expandedRowRender: (record) => (
    <div style={{ paddingLeft: 8 }}>
      <strong>Serviços incluídos nesta OS</strong>
      <Table<SubService>
        style={{ marginTop: 8 }}
        size="small"
        columns={subServicesColumns}
        dataSource={record.servicesIncluded}
        rowKey="key"
        pagination={false}
      />
    </div>
  ),
  rowExpandable: (record) => (record.servicesIncluded?.length ?? 0) > 0,
};

/** ========= Exemplo de uso =========
<Table
  columns={columns}
  dataSource={data}
  expandable={expandable}
  rowKey="osNumber"
  scroll={{ x: 2000 }}
/>
*/
