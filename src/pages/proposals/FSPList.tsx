import React, { useEffect, useMemo, useState } from "react";
import {
	Breadcrumb,
	Table,
	theme,
	Drawer,
	Form,
	Input,
	Select,
	Space,
	Button,
	Tag,
	Tooltip,
	Popconfirm,
	message,
	Typography,
	Divider,
	Row,
	Col, Tabs, Descriptions, Timeline, Upload, Switch, Checkbox, Card, Statistic, Badge,
	List
} from "antd";

import type { TableColumnsType } from "antd";
import { Content } from "antd/lib/layout/layout";
import {
	EditOutlined,
	DeleteOutlined,
	SaveOutlined,
	CloseOutlined,
	EllipsisOutlined,
	RightOutlined,InboxOutlined
} from "@ant-design/icons";

import { data, DataType, columns } from "../../data/proposals/fsp";
import ActionsDropdown from "../../data/utils/actionsDropdown";
import OptionsToolbar from "../../components/crud/list/OptionsToolbar";

const STATUS_OPCOES = ["Ativo", "Inativo", "Potencial", "Negociando"] as const;

const FSPList: React.FC = () => {
	const [dataSource, setDataSource] = useState<DataType[]>(data);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [selected, setSelected] = useState<DataType | null>(null);
	const [form] = Form.useForm<DataType>();

	useEffect(() => {
		if (selected) {
			form.setFieldsValue({ ...selected } as any);
		} else {
			form.resetFields();
		}
	}, [selected, form]);

	const abrirDrawer = (record: DataType) => {
		setSelected(record);
		setDrawerOpen(true);
	};

	const fecharDrawer = () => {
		setDrawerOpen(false);
		setTimeout(() => setSelected(null), 200);
	};

	const salvar = async () => {
		try {
			const values = await form.validateFields();
			setDataSource(prev =>
				prev.map(item => (item.key === selected?.key ? { ...item, ...values } : item))
			);
			message.success("Cliente atualizado com sucesso!");
			fecharDrawer();
		} catch {}
	};

	const empty = useMemo(() => dataSource.length === 0, [dataSource]);

	return (
		<>
			<Breadcrumb
				items={[{ title: 'Inicio' }, { title: 'Comercial' }, { title: 'FSP' }]}
				className='my-4 text-2xl font-semibold'
			/>
			<Content className="p-4 m-0 bg-white rounded-lg border border-solid border-neutral-200">
					<OptionsToolbar />
					<div className="max-h-[calc(100vh-230px)] overflow-y-scroll rounded-lg ">
						<Table<DataType>
							sticky={true}
						rowKey="key"
						bordered
						columns={[
							...((columns ?? []) as TableColumnsType<DataType>),
							{
								key: 'action',
								fixed: 'right',
								render: (_, record) => (
									<Space size="small">
										<ActionsDropdown />
										<Button type="text" icon={<RightOutlined />} onClick={() => abrirDrawer(record)} />
									</Space>
								),
							}
						]}
							dataSource={data}
							size="small"
							scroll={{ x: "max-content" }}
							pagination={false}
						/>
					</div>
			</Content>

{/* Drawer com formulário em abas */}
<Drawer
  title={selected ? `Cliente: ${selected.numeroFSP}` : "Cliente"}
  placement="right"
  width={1200}
  open={drawerOpen}
  onClose={fecharDrawer}
  destroyOnClose
  extra={
    <Space>
      <Button type="primary" icon={<SaveOutlined />} onClick={salvar}>
        Salvar
      </Button>
    </Space>
  }
>
  {/* Um único Form envolvendo todas as abas para manter state/validação */}
  <Form layout="vertical" size="small" form={form} requiredMark={false} initialValues={selected ?? {}}>
    <Tabs
      defaultActiveKey="resumo"
      items={[
        // ===== RESUMO =====
        {
          key: "resumo",
          label: "Resumo",
          children: (
            <>
              <Row gutter={12}>
                <Col span={12}>
                  <Card>
                    <Statistic title="Status atual" valueRender={() => (
                      <Space>
                        {(form.getFieldValue("status") ?? ["Novo"]).map((s: string) => (
                          <Tag key={s}>{s}</Tag>
                        ))}
                      </Space>
                    )} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic title="Valor estimado" value={form.getFieldValue("estimatedValue") ?? 0} />
                  </Card>
                </Col>
              </Row>

              <Divider />

              <Descriptions  column={2} size="small">
                <Descriptions.Item label="Empresa">{form.getFieldValue("company") || "-"}</Descriptions.Item>
                <Descriptions.Item label="Responsável">{form.getFieldValue("responsible") || "—"}</Descriptions.Item>
                <Descriptions.Item label="Nº FSP">{form.getFieldValue("numeroFSP") || "-"}</Descriptions.Item>
                <Descriptions.Item label="Origem">{form.getFieldValue("channel") || "-"}</Descriptions.Item>
                <Descriptions.Item label="Unidade SEDI">{form.getFieldValue("sediUnit") || "-"}</Descriptions.Item>
                <Descriptions.Item label="Cidade/UF">{form.getFieldValue("cityUF") || "-"}</Descriptions.Item>
              </Descriptions>
            </>
          ),
        },

        // ===== CLIENTE =====
        {
          key: "cliente",
          label: "Cliente",
          children: (
            <>
              <Typography.Title level={5} style={{ marginTop: 0 }}>Dados do Cliente</Typography.Title>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item
                    name="company"
                    label="Empresa"
                    rules={[{ required: true, message: "Informe o nome da empresa" }]}
                  >
                    <Input placeholder="Ex.: Tech Solutions Ltda" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="corporateName" label="Razão Social">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="phone" label="Telefone">
                    <Input placeholder="(00) 00000-0000" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="E-mail contato"
                    rules={[{ type: "email", message: "Email inválido" }]}
                  >
                    <Input placeholder="contato@empresa.com" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="contactName" label="Contato">
                    <Input placeholder="Nome do contato" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="department" label="Departamento">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="address" label="Endereço de execução">
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </Col>
              </Row>

              <Typography.Title level={5}>Solicitante</Typography.Title>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item name="requestorName" label="Solicitante">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="requestEmail"
                    label="E-mail solicitação"
                    rules={[{ type: "email", message: "Email inválido" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ),
        },

        // ===== FSP =====
        {
          key: "fsp",
          label: "FSP",
          children: (
            <>
              <Typography.Title level={5} style={{ marginTop: 0 }}>Dados da FSP</Typography.Title>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item name="numeroFSP" label="Nº FSP">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="createdAt" label="Data">
                    <Input placeholder="YYYY-MM-DDTHH:mm:ssZ" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="channel" label="Origem">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="sediUnit" label="Unidade SEDI">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Typography.Title level={5}>Serviço</Typography.Title>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item name="service" label="Serviço">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="stageMode" label="Etapa/Modalidade">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="scope" label="Escopo">
                    <Input.TextArea rows={3} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="areaM2" label="Metragem (m²)">
                    <Input placeholder="Ex.: 100" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="cityUF" label="Cidade/UF">
                    <Input placeholder="Cidade/UF" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ),
        },

        // ===== PROPOSTA (Comercial) =====
        {
          key: "proposta",
          label: "Proposta",
          children: (
            <>
              <Typography.Title level={5} style={{ marginTop: 0 }}>Condições Comerciais</Typography.Title>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item name="deadline" label="Prazo desejado">
                    <Input placeholder="Ex.: 2025-12-31" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="validityDays" label="Validade (dias)">
                    <Input placeholder="Ex.: 30" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="estimatedValue" label="Valor estimado">
                    <Input placeholder="Ex.: 100000" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="priority" label="Prioridade">
                    <Select
                      options={[
                        { label: "Baixa", value: "Baixa" },
                        { label: "Média", value: "Média" },
                        { label: "Alta", value: "Alta" },
                      ]}
                      placeholder="Selecione"
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="status" label="Status">
                    <Select
                      mode="multiple"
                      allowClear
                      placeholder="Selecione status"
                      options={[
                        { label: "Novo", value: "Novo" },
                        { label: "Em análise", value: "Em análise" },
                        { label: "Enviado", value: "Enviado" },
                        { label: "Aprovado", value: "Aprovado" },
                        { label: "Reprovado", value: "Reprovado" },
                        { label: "Cancelado", value: "Cancelado" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="responsible" label="Responsável">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ),
        },

        // ===== FATURAMENTO =====
        {
          key: "faturamento",
          label: "Faturamento",
          children: (
            <>
              <Typography.Title level={5} style={{ marginTop: 0 }}>Dados de Faturamento</Typography.Title>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item name="billingCnpj" label="CNPJ faturamento">
                    <Input placeholder="00.000.000/0000-00" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name={["billing", "inscricaoEstadual"]} label="Inscrição Estadual">
                    <Input placeholder="Opcional" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name={["billing", "condicaoPagamento"]} label="Condição de pagamento">
                    <Select
                      options={[
                        { label: "À vista", value: "avista" },
                        { label: "15 dias", value: "15d" },
                        { label: "30 dias", value: "30d" },
                        { label: "45 dias", value: "45d" },
                      ]}
                      placeholder="Selecione"
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name={["billing", "meioPagamento"]} label="Meio de pagamento">
                    <Select
                      options={[
                        { label: "Boleto", value: "boleto" },
                        { label: "PIX", value: "pix" },
                        { label: "Transferência", value: "ted" },
                      ]}
                      placeholder="Selecione"
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name={["billing", "observacoes"]} label="Observações">
                    <Input.TextArea rows={3} placeholder="Instruções de faturamento, endereço, etc." />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ),
        },

        // ===== REPOSITÓRIO =====
        {
          key: "repositorio",
          label: "Repositorio",
          children: (
            <>
              <Typography.Title level={5} style={{ marginTop: 0 }}>Arquivos do Cliente</Typography.Title>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Upload.Dragger multiple showUploadList>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Arraste e solte arquivos aqui ou clique para selecionar</p>
                <p className="ant-upload-hint">Documentos suportados: PDF, DOCX, XLSX, imagens, etc.</p>
              </Upload.Dragger>

              <Divider />
              <List
                header="Arquivos recentes"
                bordered
                dataSource={[
                  { name: "Briefing_cliente.pdf", status: "Aprovado" },
                  { name: "Escopo_inicial.docx", status: "Em análise" },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Space>
                      <Badge status={item.status === "Aprovado" ? "success" : "processing"} />
                      <Typography.Text>{item.name}</Typography.Text>
                    </Space>
                  </List.Item>
                )}
              />
            </>
          ),
        },

        // ===== ALERTAS =====
        {
          key: "alertas",
          label: "Alertas",
          children: (
            <>
              <Typography.Title level={5} style={{ marginTop: 0 }}>Notificações</Typography.Title>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item name={["alerts", "vencimentoProposta"]} label="Vencimento da proposta">
                    <Switch /> <span style={{ marginLeft: 8 }}>Avisar 5 dias antes</span>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name={["alerts", "mudancaStatus"]} label="Mudança de status">
                    <Switch /> <span style={{ marginLeft: 8 }}>Notificar equipe</span>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name={["alerts", "canais"]} label="Canais">
                    <Checkbox.Group
                      options={[
                        { label: "E-mail", value: "email" },
                        { label: "SMS", value: "sms" },
                        { label: "App", value: "push" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ),
        },

        // ===== HISTÓRICO =====
        {
          key: "historico",
          label: "Historico",
          children: (
            <>
              <Typography.Title level={5} style={{ marginTop: 0 }}>Linha do tempo</Typography.Title>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Timeline
                items={[
                  { color: "green", children: "FSP criada e atribuída - 2025-06-01 10:12" },
                  { color: "blue", children: "Escopo atualizado por João - 2025-06-03 14:22" },
                  { color: "gold", children: "Proposta enviada ao cliente - 2025-06-05 09:00" },
                  { color: "red", children: "Solicitada revisão de valores - 2025-06-07 16:40" },
                ]}
              />
            </>
          ),
        },

        // ===== CONFIGURAÇÕES =====
        {
          key: "config",
          label: "Configuracoes",
          children: (
            <>
              <Typography.Title level={5} style={{ marginTop: 0 }}>Preferências do Registro</Typography.Title>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item name={["config", "visibilidade"]} label="Visibilidade">
                    <Select
                      options={[
                        { label: "Somente equipe", value: "team" },
                        { label: "Organização", value: "org" },
                        { label: "Pública", value: "public" },
                      ]}
                      placeholder="Selecione"
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name={["config", "categoria"]} label="Categoria">
                    <Select
                      options={[
                        { label: "Comercial", value: "com" },
                        { label: "Técnico", value: "tec" },
                        { label: "Financeiro", value: "fin" },
                      ]}
                      placeholder="Selecione"
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name={["config", "observacoes"]} label="Observações">
                    <Input.TextArea rows={3} placeholder="Notas internas..." />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ),
        },
      ]}
    />
  </Form>
</Drawer>


		</>
	);
}

export default FSPList;