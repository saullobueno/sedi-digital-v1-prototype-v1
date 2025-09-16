import React, { useMemo } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Row,
  Statistic,
  Progress,
  Tag,
  Table,
  Tooltip,
  Badge,
  List,
  Typography,
  Divider,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Content } from "antd/lib/layout/layout";

// Ajuste os caminhos conforme sua estrutura:
import {
  columns as billingColumns,
  data as billingData,
} from "../../data/finance/billing"; // faturamento financeiro
import {
  columns as payableColumns,
  data as payableData,
} from "../../data/finance/payable"; // contas a pagar
import {
  columns as receivableColumns,
  data as receivableData,
} from "../../data/finance/receivable"; // contas a receber
import {
  columns as recruitmentColumns,
  data as recruitmentData,
} from "../../data/humanresources/recruitment"; // recrutamento
import {
  columns as suppliersColumns,
  data as suppliersData,
} from "../../data/thirdparties/suppliers"; // fornecedores de serviços
import {
  columns as outsourcedColumns,
  data as outsourcedData,
} from "../../data/thirdparties/thirdpartiesservices"; // serviços contratados de terceiros

const { Title, Text } = Typography;

const currency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const isSameMonth = (iso: string, ref = new Date()) => {
  const d = new Date(iso);
  return d.getUTCFullYear() === ref.getUTCFullYear() && d.getUTCMonth() === ref.getUTCMonth();
};

const daysUntil = (iso?: string) => {
  if (!iso) return Infinity;
  const d = new Date(iso);
  const now = new Date();
  const ms = d.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
};

const DashboardPage: React.FC = () => {
  const today = new Date();

  // ===== KPIs FINANCEIROS =====
  const financeKPIs = useMemo(() => {
    // Faturamento (somente do mês atual)
    const faturamentoMes = billingData
      .filter((i) => isSameMonth(i.dueDate, today))
      .reduce((acc, cur) => acc + Number(cur.amount || 0), 0);

    // Receitas recebidas no mês
    const recebidasMes = billingData
      .filter((i) => i.paymentDate && isSameMonth(i.paymentDate, today))
      .reduce((acc, cur) => acc + Number(cur.amount || 0), 0);

    // Em atraso (receber)
    const atrasadasReceber = receivableData.filter(
      (i) => !i.paymentDate && new Date(i.dueDate) < today
    );
    const valorAtrasadasReceber = atrasadasReceber.reduce((a, c) => a + c.amount, 0);

    // A pagar próximos 7 dias
    const proximos7 = payableData.filter((p) => {
      const diff = daysUntil(p.dueDate);
      return diff >= 0 && diff <= 7 && !p.paymentDate;
    });
    const valorProximos7 = proximos7.reduce((a, c) => a + c.amount, 0);

    // Taxa de recebimento do mês
    const totalMesReceber = receivableData
      .filter((i) => isSameMonth(i.dueDate, today))
      .reduce((a, c) => a + c.amount, 0);
    const totalMesRecebido = receivableData
      .filter((i) => i.paymentDate && isSameMonth(i.paymentDate, today))
      .reduce((a, c) => a + c.amount, 0);
    const taxaRecebimento = totalMesReceber > 0 ? (totalMesRecebido / totalMesReceber) * 100 : 0;

    return {
      faturamentoMes,
      recebidasMes,
      valorAtrasadasReceber,
      countAtrasadasReceber: atrasadasReceber.length,
      valorProximos7,
      countProximos7: proximos7.length,
      taxaRecebimento: Math.round(taxaRecebimento),
    };
  }, [today]);

  // ===== PEOPLE & RECRUTAMENTO =====
  const recruitmentKPIs = useMemo(() => {
    const aprovados = recruitmentData.filter((c: any) => c.status.includes("Aprovado")).length;
    const aguardando = recruitmentData.filter((c: any) => c.status.includes("Aguardando")).length;
    const entrevistas = recruitmentData.filter((c: any) =>
      ["Entrevista RH", "Entrevista Técnica"].includes(c.stage)
    ).length;
    return { aprovados, aguardando, entrevistas };
  }, []);

  // ===== SUPPLIERS & OUTSOURCING =====
  const riskItems = useMemo(() => {
    const fornecedoresSLAEstourado = suppliersData.filter(
      (s) => s.slaDays && s.avgLeadTimeDays && s.avgLeadTimeDays > s.slaDays
    );

    const contratosVencendo30 = outsourcedData.filter((o) => {
      if (!o.endDate) return false;
      const dias = daysUntil(o.endDate);
      return dias >= 0 && dias <= 30;
    });

    return { fornecedoresSLAEstourado, contratosVencendo30 };
  }, []);

  // ===== TABELAS RESUMO =====
  const miniColsFinance: ColumnsType<any> = [
    { title: "Fatura", dataIndex: "invoiceNumber", key: "invoiceNumber" },
    { title: "Cliente", dataIndex: "client", key: "client" },
    {
      title: "Valor",
      dataIndex: "amount",
      key: "amount",
      render: (v: number) => currency(v),
      align: "right",
    },
    {
      title: "Vencimento",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (v: string) => new Date(v).toLocaleDateString("pt-BR"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (st: string[]) => st.map((s) => <Tag key={s}>{s}</Tag>),
    },
  ];

  const miniColsReceber: ColumnsType<any> = [
    { title: "Nº", dataIndex: "invoiceNumber", key: "invoiceNumber" },
    { title: "Cliente", dataIndex: "customer", key: "customer" },
    {
      title: "Valor",
      dataIndex: "amount",
      key: "amount",
      render: (v: number) => currency(v),
      align: "right",
    },
    {
      title: "Vencimento",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (v: string) => new Date(v).toLocaleDateString("pt-BR"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (st: string[]) =>
        st.map((s) => (
          <Tag key={s} color={s === "Atrasado" ? "red" : s === "Em Aberto" ? "volcano" : "green"}>
            {s}
          </Tag>
        )),
    },
  ];

  const miniColsPagar: ColumnsType<any> = [
    { title: "Doc", dataIndex: "billNumber", key: "billNumber" },
    { title: "Fornecedor", dataIndex: "supplier", key: "supplier" },
    {
      title: "Valor",
      dataIndex: "amount",
      key: "amount",
      render: (v: number) => currency(v),
      align: "right",
    },
    {
      title: "Vencimento",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (v: string) => new Date(v).toLocaleDateString("pt-BR"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (st: string[]) =>
        st.map((s) => (
          <Tag
            key={s}
            color={
              s === "Atrasado" ? "red" : s === "Agendado" ? "geekblue" : s === "Pendente" ? "volcano" : "green"
            }
          >
            {s}
          </Tag>
        )),
    },
  ];

  // Dados para mini-tabelas
  const ultimasFaturas = useMemo(
    () =>
      [...billingData]
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        .slice(0, 5),
    []
  );

  const receberAtrasadas = useMemo(
    () =>
      receivableData
        .filter((i) => !i.paymentDate && new Date(i.dueDate) < today)
        .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate))
        .slice(0, 5),
    [today]
  );

  const pagarProximas = useMemo(
    () =>
      payableData
        .filter((p) => {
          const d = daysUntil(p.dueDate);
          return d >= 0 && d <= 7 && !p.paymentDate;
        })
        .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate))
        .slice(0, 5),
    []
  );

  return (
    <>
      <Breadcrumb items={[{ title: "Início" }, { title: "Painel" }]} className="my-4 text-2xl font-semibold" />

      <Content className="">
        {/* ===== TOPO: KPIs ===== */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Card style={{ height: "100%" }}>
              <Statistic title="Faturamento do Mês" value={financeKPIs.faturamentoMes} precision={2} prefix="R$" />
              <Text type="secondary">Total de faturas com vencimento neste mês</Text>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card style={{ height: "100%" }}>
              <Statistic title="Recebido no Mês" value={financeKPIs.recebidasMes} precision={2} prefix="R$" />
              <Progress className="mt-3" percent={financeKPIs.taxaRecebimento} />
              <Text type="secondary">Taxa de recebimento</Text>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card style={{ height: "100%" }}>
              <Statistic
                title={
                  <span>
                    Em Atraso (Receber) <Badge count={financeKPIs.countAtrasadasReceber} style={{ background: "#f5222d" }} />
                  </span>
                }
                value={financeKPIs.valorAtrasadasReceber}
                precision={2}
                prefix="R$"
                valueStyle={{ color: "#cf1322" }}
              />
              <Text type="secondary">Cobranças vencidas</Text>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card style={{ height: "100%" }}>
              <Statistic
                title={
                  <span>
                    A Pagar — 7 dias <Badge count={financeKPIs.countProximos7} style={{ background: "#faad14" }} />
                  </span>
                }
                value={financeKPIs.valorProximos7}
                precision={2}
                prefix="R$"
              />
              <Text type="secondary">Compromissos imediatos</Text>
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* ===== FILA & ALERTAS ===== */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} xl={8}>
            <Card  style={{ height: "100%" }} title="Últimas Faturas Emitidas" extra={<Button type="link">Ver tudo</Button>}>
              <Table
                size="small"
                columns={miniColsFinance}
                dataSource={ultimasFaturas}
                pagination={false}
                rowKey="key"
              />
            </Card>
          </Col>

          <Col xs={24} md={12} xl={8}>
            <Card  style={{ height: "100%" }} title="Receber — Atrasadas" extra={<Button type="link">Cobrar agora</Button>}>
              <Table
                size="small"
                columns={miniColsReceber}
                dataSource={receberAtrasadas}
                pagination={false}
                rowKey="key"
              />
            </Card>
          </Col>

          <Col xs={24} md={24} xl={8}>
            <Card  style={{ height: "100%" }}
              title="Pagamentos — Próximos 7 dias"
              extra={<Button type="link">Ver agenda</Button>}
            >
              <Table
                size="small"
                columns={miniColsPagar}
                dataSource={pagarProximas}
                pagination={false}
                rowKey="key"
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* ===== RECRUTAMENTO & RISCOS OPERACIONAIS ===== */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={10}>
            <Card  style={{ height: "100%" }} title="Recrutamento — Resumo">
              <Row gutter={[12, 12]}>
                <Col span={8}>
                  <Card size="small">
                    <Statistic title="Aprovados" value={recruitmentKPIs.aprovados} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small">
                    <Statistic title="Aguardando" value={recruitmentKPIs.aguardando} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small">
                    <Statistic title="Entrevistas" value={recruitmentKPIs.entrevistas} />
                  </Card>
                </Col>
              </Row>
              <div className="mt-3">
                <Button type="primary">Abrir pipeline</Button>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={14}>
            <Card
              title="Riscos Operacionais"
              extra={
                <Tooltip title="SLA estourado (fornecedores) e contratos que vencem em 30 dias (terceiros)">
                  <Button type="link">Saiba mais</Button>
                </Tooltip>
              }
            >
              <Row gutter={[12, 12]}>
                <Col xs={24} lg={12}>
                  <Title level={5} className="!mb-2">
                    Fornecedores — SLA Estourado
                  </Title>
                  <List
                    size="small"
                    dataSource={riskItems.fornecedoresSLAEstourado.slice(0, 5)}
                    renderItem={(item) => (
                      <List.Item>
                        <div className="flex flex-col">
                          <Text className="font-medium">{item.supplier}</Text>
                          <Text type="secondary">
                            SLA: {item.slaDays}d • Lead Time Médio:{" "}
                            <Text type="danger">{item.avgLeadTimeDays}d</Text>
                          </Text>
                        </div>
                        <Tag color="red">SLA</Tag>
                      </List.Item>
                    )}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <Title level={5} className="!mb-2">
                    Contratos — Vencendo em 30 dias
                  </Title>
                  <List
                    size="small"
                    dataSource={riskItems.contratosVencendo30.slice(0, 5)}
                    renderItem={(item) => (
                      <List.Item>
                        <div className="flex flex-col">
                          <Text className="font-medium">{item.supplier}</Text>
                          <Text type="secondary">
                            Termina em{" "}
                            <Text strong>
                              {new Date(item.endDate!).toLocaleDateString("pt-BR")}
                            </Text>
                            {item.autoRenewal ? " • Renovação automática" : " • Renovação manual"}
                          </Text>
                        </div>
                        <Tag color="gold">Renovação</Tag>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* ===== AÇÕES RÁPIDAS ===== */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card style={{ height: "100%" }}>
              <Title level={5}>Ações Rápidas</Title>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button type="primary">Nova Fatura</Button>
                <Button>Novo Pagamento</Button>
                <Button>Importar Extrato</Button>
                <Button>Nova Proposta</Button>
                <Button>Nova Solicitação de Licença</Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={16}>
            <Card  style={{ height: "100%" }} title="Atalhos">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <Button block>Faturamento</Button>
                <Button block>Contas a Pagar</Button>
                <Button block>Contas a Receber</Button>
                <Button block>Recrutamento</Button>
                <Button block>Fornecedores</Button>
                <Button block>Terceiros</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default DashboardPage;
