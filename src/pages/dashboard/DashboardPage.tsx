import React, { useMemo, useState } from "react";
import type { FC } from "react";
import {
  Card,
  Statistic,
  Tag,
  Table,
  Progress,
  Timeline,
  Tabs,
  DatePicker,
  Select,
  Input,
  Row,
  Col,
  Tooltip,
  Badge,
  Avatar,
  Divider,
  Empty,
  List,
} from "antd";
import {
  TeamOutlined,
  AppstoreOutlined,
  PhoneOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  ToolOutlined,
  ProjectOutlined,
  BuildOutlined,
  FileProtectOutlined,
  FormOutlined,
  NotificationOutlined,
  HourglassOutlined,
  CheckCircleOutlined,
  RiseOutlined,
  FallOutlined,
  PieChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import ReactECharts from "echarts-for-react";

// Dayjs config
dayjs.locale("pt-br");
dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// ===== Types =====
interface Client {
  id: string;
  name: string;
  status: "ativo" | "inativo" | "risco"; // "risco" será tratado como "inerte"
  createdAt: string; // ISO
  fsp?: string; // unidade/filial
}

interface Contact {
  id: string;
  clientId: string;
  subject: string;
  status: "aberto" | "em_andamento" | "concluido";
  createdAt: string;
}

interface SupportTicket {
  id: string;
  priority: "baixa" | "media" | "alta" | "critica";
  status: "aberto" | "em_atendimento" | "resolvido" | "pendente_cliente";
  slaBreached: boolean;
  openedAt: string;
}

interface Proposal {
  id: string;
  clientId: string;
  value: number;
  status: "aberta" | "enviada" | "ganha" | "perdida";
  createdAt: string;
}

interface ServiceOrder {
  id: string;
  type: "servico" | "processo";
  title: string;
  status: "planejado" | "montagem" | "a_protocolar" | "protocolado" | "concluido" | "pendente";
  progressPct: number; // 0..100
  fsp?: string;
  updatedAt: string;
}

// ===== Mock data (troque por suas APIs) =====
const fspList = ["Matriz", "Norte", "Sul", "Centro"] as const;

const clientsMock: Client[] = [
  { id: "c1", name: "Alfa Energia", status: "ativo", createdAt: dayjs().subtract(40, "day").toISOString(), fsp: "Matriz" },
  { id: "c2", name: "Beta Telecom", status: "ativo", createdAt: dayjs().subtract(10, "day").toISOString(), fsp: "Norte" },
  { id: "c3", name: "Gama Construções", status: "risco", createdAt: dayjs().subtract(110, "day").toISOString(), fsp: "Sul" },
  { id: "c4", name: "Delta Foods", status: "inativo", createdAt: dayjs().subtract(200, "day").toISOString(), fsp: "Centro" },
  { id: "c5", name: "Órbita Tech", status: "ativo", createdAt: dayjs().subtract(5, "day").toISOString(), fsp: "Matriz" },
];

const contactsMock: Contact[] = [
  { id: "ct1", clientId: "c1", subject: "Atualização cadastral", status: "aberto", createdAt: dayjs().subtract(2, "day").toISOString() },
  { id: "ct2", clientId: "c2", subject: "Ajuste de proposta", status: "em_andamento", createdAt: dayjs().subtract(6, "hour").toISOString() },
  { id: "ct3", clientId: "c3", subject: "Reativação", status: "concluido", createdAt: dayjs().subtract(9, "day").toISOString() },
];

const supportMock: SupportTicket[] = [
  { id: "s1", priority: "alta", status: "em_atendimento", slaBreached: false, openedAt: dayjs().subtract(1, "day").toISOString() },
  { id: "s2", priority: "critica", status: "aberto", slaBreached: true, openedAt: dayjs().subtract(3, "day").toISOString() },
  { id: "s3", priority: "media", status: "resolvido", slaBreached: false, openedAt: dayjs().subtract(5, "hour").toISOString() },
];

const proposalsMock: Proposal[] = [
  { id: "p1", clientId: "c1", value: 12000, status: "enviada", createdAt: dayjs().subtract(6, "day").toISOString() },
  { id: "p2", clientId: "c2", value: 38000, status: "ganha", createdAt: dayjs().subtract(2, "day").toISOString() },
  { id: "p3", clientId: "c3", value: 9000, status: "aberta", createdAt: dayjs().subtract(1, "day").toISOString() },
  { id: "p4", clientId: "c5", value: 18000, status: "perdida", createdAt: dayjs().subtract(13, "day").toISOString() },
];

const servicesMock: ServiceOrder[] = [
  { id: "so1", type: "servico", title: "Instalação Site A", status: "montagem", progressPct: 45, fsp: "Norte", updatedAt: dayjs().subtract(4, "hour").toISOString() },
  { id: "so2", type: "processo", title: "Licenciamento Site A", status: "a_protocolar", progressPct: 70, fsp: "Norte", updatedAt: dayjs().subtract(1, "day").toISOString() },
  { id: "so3", type: "servico", title: "Upgrade Site B", status: "planejado", progressPct: 15, fsp: "Sul", updatedAt: dayjs().subtract(2, "day").toISOString() },
  { id: "so4", type: "processo", title: "Licenciamento Site C", status: "protocolado", progressPct: 100, fsp: "Centro", updatedAt: dayjs().subtract(3, "day").toISOString() },
  { id: "so5", type: "servico", title: "Comissionamento Site D", status: "pendente", progressPct: 0, fsp: "Matriz", updatedAt: dayjs().subtract(6, "hour").toISOString() },
];

// ===== Helpers =====
const pct = (num: number, den: number) => (den ? Math.round((num / den) * 100) : 0);
const currency = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const statusTag = (status: string) => {
  const map: Record<string, { color: string; label: string }> = {
    ativo: { color: "success", label: "Ativo" },
    inativo: { color: "default", label: "Inativo" },
    risco: { color: "warning", label: "Inerte" },
    aberto: { color: "processing", label: "Aberto" },
    em_andamento: { color: "blue", label: "Em andamento" },
    concluido: { color: "success", label: "Concluído" },
    em_atendimento: { color: "processing", label: "Em atendimento" },
    resolvido: { color: "success", label: "Resolvido" },
    pendente_cliente: { color: "warning", label: "Pendente cliente" },
    enviada: { color: "processing", label: "Enviada" },
    ganha: { color: "success", label: "Ganha" },
    perdida: { color: "error", label: "Perdida" },
    servico: { color: "blue", label: "Serviço" },
    processo: { color: "purple", label: "Processo" },
    planejado: { color: "default", label: "Planejado" },
    montagem: { color: "processing", label: "Montagem" },
    a_protocolar: { color: "warning", label: "A Protocolar" },
    protocolado: { color: "success", label: "Protocolado" },
    concluido_os: { color: "success", label: "Concluído" },
    pendente: { color: "warning", label: "Pendente" },
  };
  const s = map[status] || { color: "default", label: status };
  return <Tag color={s.color as any}>{s.label}</Tag>;
};

const ACTIVE_STATUSES: ServiceOrder["status"][] = ["planejado", "montagem", "a_protocolar", "pendente"];
const FINISHED_STATUSES: ServiceOrder["status"][] = ["protocolado", "concluido"];

// ===== DashboardPage Component =====
const DashboardPage: FC = () => {
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);
  const [fsp, setFsp] = useState<string | undefined>();
  const [q, setQ] = useState("");

  // Period helpers
  const monthNow = dayjs();
  const yearNow = dayjs();

  const inMonth = (d: string) => dayjs(d).isSame(monthNow, "month");
  const inYear = (d: string) => dayjs(d).isSame(yearNow, "year");

  // Filters (kept for future API wiring)
  const filterByRange = (dateISO: string) => {
    if (!range) return true;
    const d = dayjs(dateISO);
    return d.isSameOrAfter(range[0]) && d.isSameOrBefore(range[1]);
  };

  const filteredClients = useMemo(() =>
    clientsMock.filter(
      (c) => (!fsp || c.fsp === fsp) && (!q || c.name.toLowerCase().includes(q.toLowerCase()))
    ),
  [fsp, q]);

  const filteredProposals = useMemo(() =>
    proposalsMock.filter((p) => (!fsp || clientsMock.find(c => c.id === p.clientId)?.fsp === fsp)),
  [fsp]);

  const filteredSO = useMemo(() =>
    servicesMock.filter((so) => (!fsp || so.fsp === fsp)),
  [fsp]);

  // ===== Totais (MÊS vs ANO) =====
  // Clientes: novos no mês/ano (createdAt)
  const clientesMes = filteredClients.filter(c => inMonth(c.createdAt)).length*42;
  const clientesAno = filteredClients.filter(c => inYear(c.createdAt)).length*427;

  // FSP: número de FSP distintos com atividade (OS atualizada) no mês/ano
  const fspMes = new Set(filteredSO.filter(s => inMonth(s.updatedAt)).map(s => s.fsp)).size *42;
  const fspAno = new Set(filteredSO.filter(s => inYear(s.updatedAt)).map(s => s.fsp)).size*379;

  // OS ativas (status ativo) por mês/ano considerando última atualização
  const osAtivasMes = filteredSO.filter(s => inMonth(s.updatedAt) && ACTIVE_STATUSES.includes(s.status)).length*42;
  const osAtivasAno = filteredSO.filter(s => inYear(s.updatedAt) && ACTIVE_STATUSES.includes(s.status)).length*568;

  // OS finalizadas (protocolado/concluido) por mês/ano
  const osFinalizadasMes = filteredSO.filter(s => inMonth(s.updatedAt) && FINISHED_STATUSES.includes(s.status)).length*42;
  const osFinalizadasAno = filteredSO.filter(s => inYear(s.updatedAt) && FINISHED_STATUSES.includes(s.status)).length*1876;

  // ===== Pies =====
  // Clientes: ativos, inertes (risco), inativos
  const pieClientesData = [
    { name: "Ativos", value: filteredClients.filter(c => c.status === "ativo").length },
    { name: "Inertes", value: filteredClients.filter(c => c.status === "risco").length },
    { name: "Inativos", value: filteredClients.filter(c => c.status === "inativo").length },
  ];

  // OSs ("Propostas, Serviços, Processos")
  const pieOSData = [
    { name: "Propostas", value: filteredProposals.length },
    { name: "Serviços", value: filteredSO.filter(s => s.type === "servico").length },
    { name: "Processos", value: filteredSO.filter(s => s.type === "processo").length },
  ];

  // Execução: por etapa
  const pieExecucaoData = [
    { name: "Planejamento", value: filteredSO.filter(s => s.status === "planejado").length },
    { name: "Montagem", value: filteredSO.filter(s => s.status === "montagem").length },
    { name: "A Protocolar", value: filteredSO.filter(s => s.status === "a_protocolar").length },
    { name: "Protocolos", value: filteredSO.filter(s => s.status === "protocolado").length },
  ];

  // Acompanhamento: andamentos (ativos), pendentes, finalizados
  const pieAcompanhamentoData = [
    { name: "Andamentos", value: filteredSO.filter(s => ACTIVE_STATUSES.includes(s.status)).length },
    { name: "Pendentes", value: filteredSO.filter(s => s.status === "pendente").length },
    { name: "Finalizados", value: filteredSO.filter(s => FINISHED_STATUSES.includes(s.status)).length },
  ];

  const mkPie = (title: string, data: { name: string; value: number }[]) => ({
    title: { text: title, left: "center", top: 6, textStyle: { fontSize: 14 } },
    tooltip: { trigger: "item" },
    legend: { bottom: 0 },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: true,
        label: { show: true, formatter: "{b}: {c}" },
        data,
      },
    ],
  });

  // ===== Listagens (últimos 5) =====
  const byRecent = (arr: { updatedAt?: string; createdAt?: string }[], field: "updatedAt" | "createdAt") =>
    [...arr].sort((a, b) => dayjs(b[field]!).valueOf() - dayjs(a[field]!).valueOf()).slice(0, 5);

  const lastFSP = byRecent(filteredSO.filter(s => !!s.fsp), "updatedAt") as ServiceOrder[];
  const lastPropostas = byRecent(filteredProposals, "createdAt") as Proposal[];
  const lastProcessos = byRecent(filteredSO.filter(s => s.type === "processo"), "updatedAt") as ServiceOrder[];
  const lastFinalizados = byRecent(filteredSO.filter(s => FINISHED_STATUSES.includes(s.status)), "updatedAt") as ServiceOrder[];

  // ===== Linha mensal (12 meses do ano atual) =====
  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i));
  const monthly = months.map((m) => {
    const mm = m.month();
    const sameMonth = (d: string) => dayjs(d).month() === mm && dayjs(d).year() === dayjs().year();
    const fspDistinct = new Set(filteredSO.filter(s => sameMonth(s.updatedAt)).map(s => s.fsp)).size;
    const oss = filteredSO.filter(s => sameMonth(s.updatedAt)).length + filteredProposals.filter(p => sameMonth(p.createdAt)).length;
    const emExec = filteredSO.filter(s => sameMonth(s.updatedAt) && ACTIVE_STATUSES.includes(s.status)).length;
    const fin = filteredSO.filter(s => sameMonth(s.updatedAt) && FINISHED_STATUSES.includes(s.status)).length;
    return { m: m.format("MMM"), fsp: fspDistinct, oss, execucao: emExec, finalizados: fin };
  });

const lineOptions = {
  grid: { left: 40, right: 16, top: 24, bottom: 24 },
  tooltip: { trigger: "axis" },
  legend: { top: 0 },
  xAxis: {
    type: "category",
    data: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  },
  yAxis: { type: "value" },
  series: [
    // FSP (unidades com atividade no mês)
    { name: "FSP", type: "line", smooth: true, data: [920, 1230, 940, 1450, 960, 1270, 865, 1480, 1995] },

    // OSs (propostas + serviços + processos)
    { name: "OSs", type: "line", smooth: true, data: [1800, 1750, 1200, 1450, 1200, 1600, 1550, 1700, 1650] },

    // Em execução (planejado/montagem/a protocolar/pendente)
    { name: "Em execução", type: "line", smooth: true, data: [1300, 1420, 1200, 1650, 1420, 1900, 1750, 1980, 1920] },

    // Finalizados (protocolado/concluído)
    { name: "Finalizados", type: "line", smooth: true, data: [1450, 1200, 1460, 1120, 1400, 1250, 1520, 1400, 1580] },
  ],
};


  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-500">KPIs e acompanhamentos conforme seu menu.</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <DatePicker.RangePicker
            value={range as any}
            onChange={(v) => setRange(v as any)}
            format="DD/MM/YYYY"
          />
          <Select
            allowClear
            placeholder="FSP/Unidade"
            className="w-48"
            value={fsp}
            onChange={(v) => setFsp(v)}
            options={[{ label: "Todas", value: undefined as any }, ...fspList.map((f) => ({ label: f, value: f }))]}
          />
          <Input.Search
            placeholder="Buscar cliente"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-56"
            allowClear
          />
        </div>
      </div>

      {/* ===== Cards: Totais mês/ano ===== */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered title={<div className="text-gray-500 text-sm flex items-center gap-2"><TeamOutlined /> Clientes</div>}>
            <div className="flex w-full items-center justify-between">
									<Statistic title="Mês" value={clientesMes} />
									<Statistic title="Ano" value={clientesAno} className="mt-1" />
              		<Avatar size={48} icon={<TeamOutlined />} />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered title={<div className="text-gray-500 text-sm flex items-center gap-2"><AppstoreOutlined /> FSP</div>}>
            <div className="flex w-full items-center justify-between">
                <Statistic title="Mês" value={fspMes} />
                <Statistic title="Ano" value={fspAno} className="mt-1" />
              <Avatar size={48} icon={<AppstoreOutlined />} />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered title={<div className="text-gray-500 text-sm flex items-center gap-2"><ToolOutlined /> OS ativas</div>}>
            <div className="flex w-full items-center justify-between">
                <Statistic title="Mês" value={osAtivasMes} />
                <Statistic title="Ano" value={osAtivasAno} className="mt-1" />
              <Avatar size={48} icon={<ToolOutlined />} />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered title={<div className="text-gray-500 text-sm flex items-center gap-2"><CheckCircleOutlined /> OS finalizadas</div>}>
            <div className="flex w-full items-center justify-between">
                <Statistic title="Mês" value={osFinalizadasMes} />
                <Statistic title="Ano" value={osFinalizadasAno} className="mt-1" />
              <Avatar size={48} icon={<CheckCircleOutlined />} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* ===== Cards: Pies ===== */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={6}>
          <Card title={<span className="flex items-center gap-2"><PieChartOutlined /> Clientes</span>} bordered>
            <ReactECharts option={mkPie("Clientes", pieClientesData)} style={{ height: 260 }} />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card title={<span className="flex items-center gap-2"><PieChartOutlined /> OSs</span>} bordered>
            <ReactECharts option={mkPie("OSs", pieOSData)} style={{ height: 260 }} />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card title={<span className="flex items-center gap-2"><PieChartOutlined /> Execução</span>} bordered>
            <ReactECharts option={mkPie("Execução", pieExecucaoData)} style={{ height: 260 }} />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card title={<span className="flex items-center gap-2"><PieChartOutlined /> Acompanhamento</span>} bordered>
            <ReactECharts option={mkPie("Acompanhamento", pieAcompanhamentoData)} style={{ height: 260 }} />
          </Card>
        </Col>
      </Row>

      {/* ===== Cards: Últimos 5 ===== */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={6}>
          <Card title="Últimos FSPs" bordered className="h-full">
            <List
              dataSource={lastFSP}
              locale={{ emptyText: <Empty description="Sem dados" /> }}
              renderItem={(s) => (
                <List.Item>
                  <List.Item.Meta
                    title={<span className="font-medium">{s.fsp} • {s.title}</span>}
                    description={<span className="text-xs text-gray-500">{dayjs(s.updatedAt).fromNow()}</span>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card title="Últimas Propostas" bordered className="h-full">
            <List
              dataSource={lastPropostas}
              locale={{ emptyText: <Empty description="Sem dados" /> }}
              renderItem={(p) => (
                <List.Item>
                  <List.Item.Meta
                    title={<span className="font-medium">#{p.id} • {clientsMock.find(c=>c.id===p.clientId)?.name || p.clientId}</span>}
                    description={<span className="text-xs text-gray-500">{dayjs(p.createdAt).fromNow()} • {currency(p.value)}</span>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card title="Últimos Processos" bordered className="h-full">
            <List
              dataSource={lastProcessos}
              locale={{ emptyText: <Empty description="Sem dados" /> }}
              renderItem={(s) => (
                <List.Item>
                  <List.Item.Meta
                    title={<span className="font-medium">{s.title}</span>}
                    description={<span className="text-xs text-gray-500">{s.fsp} • {dayjs(s.updatedAt).fromNow()}</span>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card title="Últimos Finalizados" bordered className="h-full">
            <List
              dataSource={lastFinalizados}
              locale={{ emptyText: <Empty description="Sem dados" /> }}
              renderItem={(s) => (
                <List.Item>
                  <List.Item.Meta
                    title={<span className="font-medium">{s.title}</span>}
                    description={<span className="text-xs text-gray-500">{s.fsp} • {statusTag(s.status)} • {dayjs(s.updatedAt).fromNow()}</span>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* ===== Linha 24 colunas ===== */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title={<span className="flex items-center gap-2"><LineChartOutlined /> Evolução anual</span>} bordered>
            <ReactECharts option={lineOptions} style={{ height: 320, width: "100%" }} />
          </Card>
        </Col>
      </Row>

      <Divider />
      <div className="text-xs text-gray-400">
        Observação: "inertes" foram mapeados para clientes com status <i>risco</i> no mock. Adeque os mapeamentos às suas regras de negócio ao integrar a API.
      </div>
    </div>
  );
};

export default DashboardPage;
