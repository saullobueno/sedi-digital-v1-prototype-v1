// ServiceOrderDrawer.tsx
import React, { useEffect, useState } from "react";
import {
	Drawer,
	Form,
	Input,
	Select,
	Space,
	Button,
	Tag,
	Typography,
	Divider,
	Row,
	Col,
	Tabs,
	Descriptions,
	Upload,
	Switch,
	Card,
	Statistic,
	List,
	InputNumber,
	DatePicker,
	Modal,
	Flex,
	Popconfirm,
	message,
	Collapse,
} from "antd";
import {
	SaveOutlined,
	DeleteOutlined,
	InboxOutlined,
	PlusOutlined,
	DollarOutlined,
	BankOutlined,
	RightOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import type { DataType } from "../../data/proposals/fsp";

import ClientDrawer from "./ClientDrawer";
import BillingDrawer, { BillingContext } from "./BillingDrawer";
import { mockInitialValues } from "./mockInitialValues";

const gutter = 32;
const colSpan = 12;

interface ServiceOrderDrawerProps {
	open: boolean;
	selected: DataType | null;
	onClose: () => void;
	onSave: (values: any) => void;
}

const ServiceOrderDrawer: React.FC<ServiceOrderDrawerProps> = ({
	open,
	selected,
	onClose,
	onSave,
}) => {
	const [form] = Form.useForm<any>();
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [timelineDrafts, setTimelineDrafts] = useState<Record<string, string>>({});

	const [isClientDrawerOpen, setIsClientDrawerOpen] = useState(false);
	const [isBillingDrawerOpen, setIsBillingDrawerOpen] = useState(false);
	const [billingContext, setBillingContext] = useState<BillingContext | null>(
		null
	);

	useEffect(() => {
		if (selected) {
			form.setFieldsValue({ ...selected } as any);
		} else {
			form.resetFields();
			// Serviço de exemplo com dois processos simulados
			form.setFieldsValue({
				services: [
					{
						serviceName: "Serviço exemplo",
						processes: [
							{
								processo: "Processo 1",
								execucao: "Execução 1",
							},
							{
								processo: "Processo 2",
								execucao: "Execução 2",
							},
						],
					},
				],
			});
		}
	}, [selected, form]);

	useEffect(() => {
		if (selected) {
			// Se vier algo do backend / tabela, mescla com os mocks
			form.setFieldsValue({
				...mockInitialValues,
				...selected,
			});
		} else {
			form.resetFields();
			form.setFieldsValue(mockInitialValues);
		}
	}, [selected, form]);

	const handleSave: any = async () => {
		try {
			const values = await form.validateFields();
			onSave(values);
			message.success("Cliente atualizado com sucesso!");
			onClose();
		} catch {
			// validação falhou
		}
	};
	const formatDateOrRange = (value: any): string => {
		if (!value) return "—";

		// Range de datas
		if (Array.isArray(value)) {
			const parts = value
				.filter(Boolean)
				.map((v) => (v?.format ? v.format("YYYY-MM-DD") : String(v)));
			return parts.join(" até ");
		}

		// Uma única data (Dayjs ou string)
		if (value?.format) {
			return value.format("YYYY-MM-DD");
		}

		return String(value);
	};
	const formatDateTime = (value: any): string => {
		if (!value) return "—";

		if (value?.format) {
			return value.format("YYYY-MM-DD HH:mm");
		}

		const d = dayjs(value);
		if (d.isValid()) {
			return d.format("YYYY-MM-DD HH:mm");
		}

		return String(value);
	};


	return (
		<Drawer
			title={selected ? `${selected.numeroFSP}` : "Ordem de Serviço"}
			placement="right"
			closable={{
				placement: "end",
			}}
			width={1000}
			open={open}
			onClose={onClose}
			destroyOnHidden
			classNames={{
				body: "py-0 px-4",
			}}
			extra={
				<Space>
					<Button
						color="default"
						variant="text"
						icon={<SaveOutlined />}
						onClick={handleSave}
					>
						Salvar
					</Button>
				</Space>
			}
		>
			{/* Form único envolvendo tudo (Tabs + Drawers filhos) */}
			<Form
				layout="horizontal"
				variant="filled"
				size="small"
				form={form}
				labelCol={{ flex: "120px" }}
				labelAlign="left"
				labelWrap
				colon={false}
				wrapperCol={{ span: "auto" }}
				requiredMark={false}
			>
				<Tabs
					defaultActiveKey="resumo"
					items={[
						// ===== RESUMO =====
						{
							key: "resumo",
							label: "Resumo",
							className: "p-4",
							children: (
								<>
									<Row gutter={[32, 32]}>
										<Col span={colSpan}>
											<Card>
												<Statistic
													title="Status atual"
													valueRender={() => {
														const rawStatus = form.getFieldValue("status");

														const statusArray = Array.isArray(rawStatus)
															? rawStatus
															: rawStatus
																? [rawStatus]
																: ["Novo"];

														return (
															<Space>
																{statusArray.map((s: string) => (
																	<Tag key={s}>{s}</Tag>
																))}
															</Space>
														);
													}}
												/>

											</Card>
										</Col>

										<Col span={colSpan}>
											<Card>
												<Statistic
													title="Valor total / estimado"
													value={
														form.getFieldValue(["billing", "valorTotal"]) ??
														form.getFieldValue("estimatedValue") ??
														0
													}
												/>
											</Card>
										</Col>

										<Col span={colSpan}>
											<Card>
												<Descriptions column={1} size="small">
													<Descriptions.Item label="Cliente">
														{form.getFieldValue("company") || "—"}
													</Descriptions.Item>
													<Descriptions.Item label="Responsável">
														{form.getFieldValue("responsavel") || "—"}
													</Descriptions.Item>
													<Descriptions.Item label="CNPJ">
														{form.getFieldValue("billingCnpj") || "—"}
													</Descriptions.Item>
													<Descriptions.Item label="Cidade/UF">
														{form.getFieldValue("cityUF") || "—"}
													</Descriptions.Item>
												</Descriptions>
											</Card>
										</Col>

										<Col span={colSpan}>
											<Card>
												<Descriptions column={1} size="small">
													<Descriptions.Item label="Código">
														{form.getFieldValue("numeroOS") || "—"}
													</Descriptions.Item>
													<Descriptions.Item label="Unidade">
														{form.getFieldValue("sediUnit") || "—"}
													</Descriptions.Item>
													<Descriptions.Item label="Prazo conclusão">
														{formatDateOrRange(form.getFieldValue("prazoConclusao"))}
													</Descriptions.Item>
													<Descriptions.Item label="Condição de pagamento">
														{form.getFieldValue([
															"billing",
															"condicaoPagamento",
														]) || "—"}
													</Descriptions.Item>
												</Descriptions>
											</Card>
										</Col>

										<Col span={24}>
											<Card>
												<Typography.Title level={5} className="mb-6">
													Serviços e Processos
												</Typography.Title>

												<Form.Item noStyle shouldUpdate>
													{() => {
														const services: any[] = form.getFieldValue("services") || [];

														// filtra possíveis undefined
														const safeServices = services.filter(Boolean);

														return (
															<Flex gap={8} vertical>
																{safeServices.map((srv: any, index: number) => {
																	const processes = srv?.processes || [];
																	return (
																		<Card key={index}>
																			<div className="font-semibold">
																				{srv?.serviceName || `Serviço ${index + 1}`}
																			</div>
																			{processes.map((p: any, pIndex: number) => (
																				<div key={pIndex}>
																					{p?.processo || `Processo ${pIndex + 1}`}
																				</div>
																			))}
																		</Card>
																	);
																})}
															</Flex>
														);
													}}
												</Form.Item>


											</Card>
										</Col>
									</Row>
								</>
							),
						},

						// ===== OS (Status + Dados da OS + Cliente) =====
						{
							key: "os",
							label: "OS",
							className: "p-4",
							children: (
								<>
									<Typography.Title level={5} className="mb-6">
										Status
									</Typography.Title>

									<Row gutter={gutter}>
										<Col span={colSpan}>
											<Form.Item
												name="status"
												label="Status"
												initialValue="Em execução" // ou "Não iniciada" / o que você quiser
											>
												<Select
													options={[
														{ label: "Novo", value: "Novo" },
														{ label: "Aguardando aprovação do cliente", value: "Aguardando aprovação do cliente" },
														{ label: "Aprovado pelo cliente", value: "Aprovado pelo cliente" },
														{ label: "Reprovado pelo cliente", value: "Reprovado pelo cliente" },
														{ label: "Preparado", value: "Preparado" },
														{ label: "Não iniciada", value: "Não iniciada" },
														{ label: "Em análise", value: "Em análise" },
														{ label: "Em execução", value: "Em execução" },
														{ label: "Em revisão", value: "Em revisão" },
														{ label: "Concluído", value: "Concluído" },
														{ label: "Arquivado", value: "Arquivado" },
														{ label: "A faturar", value: "A faturar" },
														{ label: "Em faturamento", value: "Em faturamento" },
														{ label: "Faturado", value: "Faturado" },
														{ label: "Cancelado", value: "Cancelado" },
													]}
												/>
											</Form.Item>

										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="situation"
												label="Situação"
												valuePropName="checked"
											>
												<Select
													options={[
														{ label: "Criada", value: "Criada" },
														{ label: "Sem resposta", value: "Sem resposta" },
														{ label: "Atrasado", value: "Atrasado" },
														{ label: "Divergências", value: "Divergências" },
														{ label: "Falha", value: "Falha" },
														{ label: "Duplicidade", value: "Duplicidade" },
														{
															label: "Faturamento errado",
															value: "Faturamento errado",
														},
														{
															label: "Precisa ser revisado",
															value: "Precisa ser revisado",
														},
														{ label: "Cancelado", value: "Cancelado" },
														{ label: "Finlizado", value: "Finlizado" },
														{
															label: "Informação em falta",
															value: "Informação em falta",
														},
														{ label: "Empresa fechada", value: "Empresa fechada" },
														{ label: "Recriado", value: "Recriado" },
														{ label: "Orçamento", value: "Orçamento" },
													]}
												/>
											</Form.Item>
										</Col>
									</Row>

									<Col span={24}>
										<Divider className="mb-8" />
									</Col>

									{/* IDENTIFICAÇÃO DA OS */}
									<Typography.Title level={5} className="mb-6">
										Dados da OS
									</Typography.Title>

									<Row gutter={gutter}>
										<Col span={colSpan}>
											<Form.Item
												name="numeroOS"
												label="Número OS"
												initialValue={selected?.numeroFSP}
												rules={[{ required: true }]}
											>
												{selected?.numeroFSP}
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item name="sediUnit" label="UF">
												<Input placeholder="Sigla / Unidade" />
											</Form.Item>
										</Col>

										<Col span={colSpan}>
											<Form.Item name="requestDate" label="Solicitação">
												<DatePicker
													placeholder="YYYY-MM-DD"
													className="w-full"
												/>
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item name="dataAprovTexto" label="Aprovação">
												<DatePicker
													placeholder="YYYY-MM-DD"
													className="w-full"
												/>
											</Form.Item>
										</Col>

										<Col span={colSpan}>
											<Form.Item name="origem" label="Origem">
												<Input />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item name="tipo" label="Tipo OS">
												<Input />
											</Form.Item>
										</Col>

										<Col span={colSpan}>
											<Form.Item name="startTime" label="Início">
												<DatePicker
													placeholder="YYYY-MM-DD"
													className="w-full"
												/>
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item name="endTime" label="Conclusão">
												<DatePicker
													placeholder="YYYY-MM-DD"
													className="w-full"
												/>
											</Form.Item>
										</Col>

										<Col span={colSpan}>
											<Form.Item name="prazoConclusao" label="Prazo de conclusão">
												<DatePicker.RangePicker className="w-full" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item name="numeroPOP" label="Número POP">
												<Input />
											</Form.Item>
										</Col>
									</Row>

									<Col span={24}>
										<Divider className="mb-8" />
									</Col>

									{/* CLIENTE DENTRO DA ABA OS */}
									<div className="mt-6">
										<Flex justify="space-between">
											<Typography.Title level={5} className="mb-6">
												Cliente
											</Typography.Title>
											<Typography.Link
												onClick={() => setIsClientDrawerOpen(true)}
											>
												Ver detalhes completos do cliente
												<RightOutlined className="ms-4" />
											</Typography.Link>

										</Flex>

										<Row gutter={gutter}>

											<Col span={colSpan}>
												<Form.Item
													name="company"
													label="Empresa"
													rules={[
														{
															required: true,
															message: "Informe o nome da empresa",
														},
													]}
												>
													<Input placeholder="Ex.: Tech Solutions Ltda" />
												</Form.Item>
											</Col>
											<Col span={colSpan}>
												<Form.Item name="corporateName" label="Razão Social">
													<Input />
												</Form.Item>
											</Col>
											<Col span={24}>
												<Form.Item
													name="isMatriz"
													label="Matriz"
													valuePropName="checked"
												>
													<Switch />
												</Form.Item>
											</Col>

											<Col span={colSpan}>
												<Form.Item name="cnpjMatriz" label="CNPJ Matriz">
													<Input placeholder="1A.B2C.3D4/5E6F-78" />
												</Form.Item>
											</Col>

											<Col span={colSpan}>
												<Form.Item
													noStyle
													shouldUpdate={(prev, cur) =>
														prev.isMatriz !== cur.isMatriz
													}
												>
													{({ getFieldValue }) =>
														!getFieldValue("isMatriz") ? (
															<Form.Item name="cnpjFilial" label="CNPJ Filial">
																<Select placeholder="Selecione o CNPJ da filial">
																	<Select.Option value="1A.B2C.3D4/5E6F-78">
																		1A.B2C.3D4/5E6F-78
																	</Select.Option>
																	<Select.Option value="9Z.8Y7.6X5/4W3V-21">
																		9Z.8Y7.6X5/4W3V-21
																	</Select.Option>
																	<Select.Option value="0K.1J2.3H4/5G6F-99">
																		0K.1J2.3H4/5G6F-99
																	</Select.Option>
																</Select>
															</Form.Item>
														) : null
													}
												</Form.Item>
											</Col>
										</Row>

										<Row gutter={gutter}>
											<Col span={colSpan}>
												<Form.Item name="requestorName" label="Solicitante">
													<Input />
												</Form.Item>
											</Col>

											<Col span={colSpan}>
												<Form.Item
													name="requestEmail"
													label="E-mail solicitação"
													rules={[
														{ type: "email", message: "Email inválido" },
													]}
												>
													<Input />
												</Form.Item>
											</Col>
										</Row>

									</div>
								</>
							),
						},

						// ===== SERVIÇOS (apenas serviços e processos) =====
						{
							key: "servicos",
							label: "Serviços e Processos",
							className: "p-4",
							children: (
								<div className="mt-2">
									<Typography.Title level={5} className="mb-6">
										Serviços e processos
									</Typography.Title>

									<Form.List name="services">
										{(serviceFields, { add: addService, remove: removeService }) => (
											<>
												{serviceFields.map((serviceField, index) => (
													<Card
														key={serviceField.key}
														className="mb-4 shadow-sm border rounded-2xl"
														title={`Serviço ${index + 1}`}
														extra={
															<Button
																danger
																type="text"
																icon={<DeleteOutlined />}
																onClick={() => removeService(serviceField.name)}
															>
																Remover serviço
															</Button>
														}
													>
														<Row gutter={gutter}>
															<Col span={24}>
																<Form.Item
																	name={[serviceField.name, "serviceName"]}
																	label="Serviço"
																	rules={[
																		{
																			required: true,
																			message: "Informe o serviço",
																		},
																	]}
																>
																	<Input placeholder="Serviço" />
																</Form.Item>
															</Col>
															<Col span={24}>
																<Form.Item
																	name={[serviceField.name, "address"]}
																	label="Endereço de execução"
																>
																	<Input />
																</Form.Item>
															</Col>
															<Col span={24}>
																<Form.Item
																	name={[serviceField.name, "observacoes"]}
																	label="Observações"
																>
																	<Input.TextArea rows={3} />
																</Form.Item>
															</Col>
														</Row>

														{/* PROCESSOS DO SERVIÇO COMO ACCORDION */}
														<Form.List name={[serviceField.name, "processes"]}>
															{(processFields, { add: addProcess, remove: removeProcess }) => (
																<>
																	<Typography.Text className="font-semibold">
																		Processos deste serviço
																	</Typography.Text>

																	<Collapse accordion className="mt-3">
																		{processFields.map((processField, pIndex) => {
																			const processPath: (string | number)[] = [
																				"services",
																				serviceField.name,
																				"processes",
																				processField.name,
																			];
																			const processValue = form.getFieldValue(processPath) || {};

																			return (
																				<Collapse.Panel
																					key={processField.key}
																					header={
																						<div className="flex flex-col">
																							<span>
																								{processValue.processo ||
																									`Processo ${pIndex + 1}`}
																							</span>
																							{processValue.status && (
																								<Typography.Text type="secondary">
																									Status: {processValue.status}
																								</Typography.Text>
																							)}
																						</div>
																					}
																				>
																					<Row gutter={gutter} className="mt-2">
																						<Col span={24}>
																							<Form.Item
																								name={[processField.name, "processo"]}
																								fieldKey={[
																									processField.fieldKey ?? processField.key,
																									"processo",
																								]}
																								label={`Processo ${pIndex + 1}`}
																								rules={[
																									{
																										required: true,
																										message: "Informe o processo",
																									},
																								]}
																							>
																								<Input placeholder="Processo" />
																							</Form.Item>
																						</Col>
																						<Col span={24}>
																							<Form.Item
																								name={[processField.name, "execucao"]}
																								fieldKey={[
																									processField.fieldKey ?? processField.key,
																									"execucao",
																								]}
																								label="Execução"
																							>
																								<Input placeholder="Execução" />
																							</Form.Item>
																						</Col>
																						<Col span={colSpan}>
																							<Form.Item
																								name={[processField.name, "orgao"]}
																								fieldKey={[
																									processField.fieldKey ?? processField.key,
																									"orgao",
																								]}
																								label="Órgão"
																							>
																								<Input placeholder="Órgão" />
																							</Form.Item>
																						</Col>
																						<Col span={colSpan}>
																							<Form.Item
																								name={[processField.name, "valor"]}
																								fieldKey={[
																									processField.fieldKey ?? processField.key,
																									"valor",
																								]}
																								label="Valor"
																							>
																								<InputNumber
																									className="w-full"
																									placeholder="0,00"
																									formatter={(value) =>
																										value != null
																											? `R$ ${value}`.replace(
																												/\B(?=(\d{3})+(?!\d))/g,
																												"."
																											)
																											: ""
																									}
																									parser={(value) =>
																										value
																											?.replace(/\D/g, "")
																											.replace(/^0+/, "") as unknown as number
																									}
																								/>
																							</Form.Item>
																						</Col>
																						<Col span={colSpan}>
																							<Form.Item
																								name={[processField.name, "status"]}
																								label="Status"
																							>
																								<Select
																									options={[
																										{ label: "Novo", value: "Novo" },
																										{
																											label: "Aguardando aprovação do cliente",
																											value: "Aguardando aprovação do cliente",
																										},
																										{
																											label: "Aprovado pelo cliente",
																											value: "Aprovado pelo cliente",
																										},
																										{
																											label: "Reprovado pelo cliente",
																											value: "Reprovado pelo cliente",
																										},
																										{ label: "Preparado", value: "Preparado" },
																										{
																											label: "Não iniciada",
																											value: "Não iniciada",
																										},
																										{ label: "Em análise", value: "Em análise" },
																										{ label: "Em execução", value: "Em execução" },
																										{ label: "Em revisão", value: "Em revisão" },
																										{ label: "Concluído", value: "Concluído" },
																										{ label: "Arquivado", value: "Arquivado" },
																										{ label: "A faturar", value: "A faturar" },
																										{
																											label: "Em faturamento",
																											value: "Em faturamento",
																										},
																										{ label: "Faturado", value: "Faturado" },
																										{ label: "Cancelado", value: "Cancelado" },
																									]}
																								/>
																							</Form.Item>
																						</Col>
																						<Col span={colSpan}>
																							<Form.Item
																								name={[processField.name, "upload"]}
																								label="Item repositório"
																							>
																								<Select
																									options={[
																										{
																											label: "Alvará dos Bombeiros",
																											value: "Alvará dos Bombeiros",
																										},
																									]}
																								/>
																							</Form.Item>
																						</Col>
																						<Col span={24}>
																							<Form.Item
																								name={[processField.name, "observacoes"]}
																								label="Observações"
																							>
																								<Input.TextArea rows={3} />
																							</Form.Item>
																						</Col>

																						{/* LINK DE FATURAMENTO */}
																						<Col span={24}>
																							<Button
																								icon={<DollarOutlined />}
																								onClick={() => {
																									setBillingContext({
																										serviceIndex: serviceField.name as number,
																										processIndex: processField.name as number,
																									});
																									setIsBillingDrawerOpen(true);
																								}}
																							>
																								Ver faturamento do processo
																							</Button>
																						</Col>

																						{/* LINHA DE TEMPO */}
																						<Col span={24}>
																							<Divider className="my-4" />

																							<Form.List name={[processField.name, "timeline"]}>
																								{(timelineFields, { add: addTimelineItem }) => {
																									const draftKey = `${serviceField.name}-${processField.name}`;
																									const hasDraft = Object.prototype.hasOwnProperty.call(
																										timelineDrafts,
																										draftKey
																									);
																									const newDescription = timelineDrafts[draftKey] ?? "";

																									return (
																										<Form.Item
																											noStyle
																											shouldUpdate={(prev, cur) => prev.services !== cur.services}
																										>
																											{() => (
																												<>
																													<Typography.Title
																														level={5}
																														style={{ fontSize: 14, marginBottom: 12 }}
																													>
																														Linha de tempo
																													</Typography.Title>

																													{/* LISTA DE AÇÕES EXISTENTES */}
																													{timelineFields.length === 0 && (
																														<Typography.Text type="secondary">
																															Nenhuma ação registrada ainda.
																														</Typography.Text>
																													)}

																													{timelineFields.map((timelineField, tIndex) => {
																														const actionPath: (string | number)[] = [
																															"services",
																															serviceField.name,
																															"processes",
																															processField.name,
																															"timeline",
																															timelineField.name,
																														];
																														const action = form.getFieldValue(actionPath) || {};
																														const isFinished =
																															action.status === "Concluído" ||
																															action.status === "Cancelado" ||
																															!!action.finishedAt;

																														return (
																															<Card
																																key={timelineField.key}
																																size="small"
																																className="mb-2"
																																bodyStyle={{ padding: 12 }}
																															>
																																<div className="flex justify-between gap-4 items-start">
																																	{/* ESQUERDA: DESCRIÇÃO + DATAS */}
																																	<div className="flex-1">
																																		<Typography.Text strong delete={isFinished}>
																																			{action.description || `Ação ${tIndex + 1}`}
																																		</Typography.Text>

																																		<div className="flex flex-col">
																																			<Typography.Text type="secondary">
																																				Criado em: {formatDateTime(action.createdAt)}
																																			</Typography.Text>

																																			{action.finishedAt && (
																																				<Typography.Text type="secondary">
																																					{action.status === "Cancelado"
																																						? "Cancelado em: "
																																						: "Concluído em: "}
																																					{formatDateTime(action.finishedAt)}
																																				</Typography.Text>
																																			)}
																																		</div>
																																	</div>

																																	{/* DIREITA: STATUS + SELECT */}
																																	<div style={{ minWidth: 220 }}>
																																		<Form.Item
																																			name={[timelineField.name, "status"]}
																																			className="mb-0"
																																		>
																																			<Select
																																				disabled={isFinished}
																																				options={[
																																					{ label: "Pendente", value: "Pendente" },
																																					{ label: "Em andamento", value: "Em andamento" },
																																					{ label: "Concluído", value: "Concluído" },
																																					{ label: "Atrasado", value: "Atrasado" },
																																					{ label: "Aguardando", value: "Aguardando" },
																																					{ label: "Cancelado", value: "Cancelado" },
																																				]}
																																				onChange={(value) => {
																																					const current =
																																						form.getFieldValue(actionPath) || {};

																																					// aqui a gente só garante o finishedAt,
																																					// o status já é controlado pelo próprio Form.Item
																																					if (
																																						(value === "Concluído" ||
																																							value === "Cancelado") &&
																																						!current.finishedAt
																																					) {
																																						form.setFieldValue(actionPath, {
																																							...current,
																																							status: value,
																																							finishedAt: dayjs(),
																																						});
																																					} else {
																																						form.setFieldValue(actionPath, {
																																							...current,
																																							status: value,
																																						});
																																					}
																																				}}
																																			/>
																																		</Form.Item>
																																	</div>
																																</div>
																															</Card>
																														);
																													})}

																													<Divider />

																													{/* NOVA AÇÃO */}
																													{!hasDraft && (
																														<Button
																															type="dashed"
																															icon={<PlusOutlined />}
																															onClick={() =>
																																setTimelineDrafts((prev) => ({
																																	...prev,
																																	[draftKey]: "",
																																}))
																															}
																														>
																															Nova ação
																														</Button>
																													)}

																													{hasDraft && (
																														<>
																															<Typography.Title
																																level={5}
																																style={{ fontSize: 14, marginBottom: 8 }}
																															>
																																Nova ação
																															</Typography.Title>

																															<Input.TextArea
																																rows={3}
																																placeholder="Descreva a ação realizada ou a realizar"
																																value={newDescription}
																																onChange={(e) =>
																																	setTimelineDrafts((prev) => ({
																																		...prev,
																																		[draftKey]: e.target.value,
																																	}))
																																}
																															/>

																															<Space className="mt-2">
																																<Button
																																	type="primary"
																																	onClick={() => {
																																		if (!newDescription || !newDescription.trim()) {
																																			message.warning(
																																				"Informe a descrição da nova ação antes de adicionar."
																																			);
																																			return;
																																		}

																																		addTimelineItem({
																																			createdAt: dayjs(),
																																			status: "Pendente",
																																			description: newDescription.trim(),
																																		});

																																		setTimelineDrafts((prev) => {
																																			const clone = { ...prev };
																																			delete clone[draftKey];
																																			return clone;
																																		});
																																	}}
																																>
																																	Adicionar ação
																																</Button>
																																<Button
																																	onClick={() =>
																																		setTimelineDrafts((prev) => {
																																			const clone = { ...prev };
																																			delete clone[draftKey];
																																			return clone;
																																		})
																																	}
																																>
																																	Cancelar
																																</Button>
																															</Space>
																														</>
																													)}
																												</>
																											)}
																										</Form.Item>
																									);
																								}}
																							</Form.List>
																						</Col>



																						{/* REMOVER PROCESSO */}
																						<Col
																							span={24}
																							className="flex items-center justify-end mt-2"
																						>
																							<Button
																								danger
																								type="text"
																								icon={<DeleteOutlined />}
																								onClick={() =>
																									removeProcess(processField.name)
																								}
																							>
																								Remover processo
																							</Button>
																						</Col>
																					</Row>
																				</Collapse.Panel>
																			);
																		})}
																	</Collapse>

																	<Button
																		type="dashed"
																		icon={<PlusOutlined />}
																		onClick={() =>
																			addProcess({
																				processo: "",
																				execucao: "",
																				orgao: "",
																				valor: undefined,
																				observacoes: "",
																				timeline: [],
																			})
																		}
																		className="mt-3"
																	>
																		Adicionar processo
																	</Button>
																</>
															)}
														</Form.List>
													</Card>
												))}

												<Button
													type="dashed"
													icon={<PlusOutlined />}
													onClick={() =>
														addService({
															serviceName: "",
															address: "",
															observacoes: "",
															processes: [],
														})
													}
												>
													Adicionar serviço
												</Button>
											</>
										)}
									</Form.List>
								</div>
							),
						},


						// ===== AVALIAÇÃO / DETALHES (em aba separada) =====
						{
							key: "avaliacao",
							label: "Avaliação e detalhes",
							className: "p-4",
							children: (
								<div className="mt-2">
									<Typography.Title level={5} className="mb-6">
										Avaliação e detalhes
									</Typography.Title>

									<Row gutter={gutter}>
										<Col span={colSpan}>
											<Form.Item
												name="grauDificuldade"
												label="Dificuldade"
											>
												<Input placeholder="Grau de Dificuldade" />
											</Form.Item>
										</Col>

										<Col span={colSpan}>
											<Form.Item name="grauUrgencia" label="Urgência">
												<Input placeholder="Grau de Urgência" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="impactoSeNaoResolver"
												label="Impacto"
											>
												<Input placeholder="Impacto se não resolver" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="alternativaSedi"
												label="Concorrência"
											>
												<Input placeholder="Alternativa à SÉDI (Concorrência)" />
											</Form.Item>
										</Col>

										<Col span={colSpan}>
											<Form.Item
												name="capacidadeFinanceira"
												label="Capacidade Financeira"
											>
												<Input placeholder="Capacidade Financeira" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="previsaoGastosTransporte"
												label="Gastos com transporte"
											>
												<Input placeholder="Previsão gastos com transporte" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="previsaoGastosViagem"
												label="Gastos com viagem"
											>
												<Input placeholder="Gastos com viagem" />
											</Form.Item>
										</Col>

										<Col span={colSpan}>
											<Form.Item
												name="gastosTerceiros"
												label="Gastos com terceiros"
											>
												<Input placeholder="Gastos com terceiros" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="previsaoGastosTaxas"
												label="Gastos com taxas"
											>
												<Input placeholder="Previsão de gastos com taxas e emolumentos" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="sugestaoHonorarios"
												label="Honorários"
											>
												<Input placeholder="Sugestão de honorários" />
											</Form.Item>
										</Col>

										<Col span={colSpan}>
											<Form.Item
												name="montagemProcesso"
												label="Montagem"
											>
												<Input placeholder="Montagem do processo" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="acompanhamento"
												label="Acompanhamento"
											>
												<Input placeholder="" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="permanenciaOrgao"
												label="Permanência no órgão"
											>
												<Input placeholder="Permanência no órgão" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item name="especialista" label="Especialista">
												<Input placeholder="" />
											</Form.Item>
										</Col>

										<Col span={24}>
											<Form.Item name="visitaInLoco" label="Visita">
												<Input.TextArea
													rows={4}
													placeholder="Visita em loco"
												/>
											</Form.Item>
										</Col>
										<Col span={24}>
											<Form.Item
												name="outrasAtividades"
												label="Outras atividades"
											>
												<Input.TextArea
													rows={4}
													placeholder="Outras atividades não mencionadas"
												/>
											</Form.Item>
										</Col>
									</Row>
								</div>
							),
						},

						// ===== REPOSITÓRIO =====
						{
							key: "repositorio",
							label: "Repositorio",
							className: "p-4",
							children: (
								<>
									<Row gutter={gutter} className="h-full">
										{/* COLUNA ESQUERDA – UPLOAD + METADADOS */}
										<Col span={12}>
											<Typography.Title level={5} className="mb-6">
												Novo documento / licença
											</Typography.Title>

											<Row gutter={gutter}>
												<Col span={24}>
													<Form.Item
														name={["newDocument", "files"]}
														label="Arquivo(s)"
														valuePropName="fileList"
														getValueFromEvent={(e) =>
															Array.isArray(e) ? e : e?.fileList
														}
														rules={[
															{
																required: true,
																message: "Selecione pelo menos um arquivo",
															},
														]}
													>
														<Upload.Dragger
															multiple
															beforeUpload={() => false}
														>
															<p className="ant-upload-drag-icon">
																<InboxOutlined />
															</p>
															<p className="ant-upload-text">
																Arraste e solte arquivos aqui ou clique para
																selecionar
															</p>
															<p className="ant-upload-hint">
																Envie documentos como alvará de funcionamento,
																licença sanitária, AVCB, etc.
															</p>
														</Upload.Dragger>
													</Form.Item>
												</Col>
											</Row>

											<Row gutter={gutter}>
												<Col span={24}>
													<Form.Item
														name={["newDocument", "nome"]}
														label="Nome"
														rules={[
															{
																required: true,
																message: "Informe o nome do documento",
															},
														]}
													>
														<Input placeholder="Ex.: Alvará de Funcionamento - Matriz" />
													</Form.Item>
												</Col>
												<Col span={24}>
													<Form.Item
														name={["newDocument", "orgao"]}
														label="Órgão emissor"
													>
														<Input placeholder="Ex.: Prefeitura Municipal" />
													</Form.Item>
												</Col>

												<Col span={16}>
													<Form.Item
														name={["newDocument", "dataEmissao"]}
														label="Data de emissão"
														rules={[
															{
																required: true,
																message: "Informe a data de emissão",
															},
														]}
													>
														<DatePicker
															placeholder="YYYY-MM-DD"
															className="w-full"
														/>
													</Form.Item>
												</Col>
												<Col span={16}>
													<Form.Item
														name={["newDocument", "dataValidade"]}
														label="Data de validade"
													>
														<DatePicker
															placeholder="YYYY-MM-DD"
															className="w-full"
														/>
													</Form.Item>
												</Col>

												<Col span={16}>
													<Form.Item
														name={["newDocument", "valor"]}
														label="Valor"
													>
														<InputNumber
															className="w-full"
															placeholder="0,00"
															formatter={(value) =>
																value != null
																	? `R$ ${value}`.replace(
																		/\B(?=(\d{3})+(?!\d))/g,
																		"."
																	)
																	: ""
															}
															parser={(value: any) =>
																value
																	?.replace(/\D/g, "")
																	.replace(/^0+/, "") as unknown as number
															}
														/>
													</Form.Item>
												</Col>
												<Col span={24}>
													<Form.Item
														name={["newDocument", "observacao"]}
														label="Observação"
													>
														<Input.TextArea
															rows={4}
															placeholder="Ex.: Licença válida para a unidade matriz, renovação anual, etc."
														/>
													</Form.Item>
												</Col>
											</Row>

											<div className="flex justify-end mb-2">
												<Button
													type="primary"
													onClick={() => {
														const newDoc = form.getFieldValue("newDocument");
														if (!newDoc?.nome || !newDoc?.files?.length) {
															message.error(
																"Preencha o nome e selecione pelo menos um arquivo."
															);
															return;
														}

														const currentDocs =
															form.getFieldValue("documents") || [];
														form.setFieldsValue({
															documents: [
																...currentDocs,
																{
																	...newDoc,
																	arquivos: newDoc.files.map((f: any) => f.name),
																},
															],
															newDocument: {},
														});
														message.success(
															"Documento cadastrado com sucesso."
														);
													}}
												>
													Confirmar upload
												</Button>
											</div>
										</Col>

										{/* COLUNA DIREITA – LISTA COM SCROLL */}
										<Col span={12}>
											<Typography.Title level={5} className="mb-3">
												Uploads realizados
											</Typography.Title>
											<Card
												className="h-full"
												bordered={false}
												bodyStyle={{
													maxHeight: "calc(100vh - 260px)",
													overflowY: "auto",
													paddingRight: 8,
												}}
											>
												<Form.Item noStyle shouldUpdate>
													{() => {
														const docs: any[] =
															form.getFieldValue("documents") || [];

														return (
															<List
																bordered
																dataSource={docs}
																locale={{
																	emptyText: "Nenhum documento cadastrado",
																}}
																renderItem={(item: any, index: number) => (
																	<List.Item
																		actions={[
																			<Button
																				size="small"
																				type="link"
																				key="edit"
																				onClick={() => {
																					setEditingIndex(index);
																					form.setFieldsValue({
																						editDocument: {
																							...item,
																						},
																					});
																					setIsEditModalOpen(true);
																				}}
																			>
																				Editar
																			</Button>,
																			<Popconfirm
																				key="delete"
																				title="Remover documento?"
																				okText="Sim"
																				cancelText="Não"
																				onConfirm={() => {
																					const currentDocs: any[] =
																						form.getFieldValue("documents") ||
																						[];
																					const newDocs = currentDocs.filter(
																						(_: any, i: number) => i !== index
																					);
																					form.setFieldsValue({
																						documents: newDocs,
																					});
																					message.success(
																						"Documento removido."
																					);
																				}}
																			>
																				<Button
																					size="small"
																					type="link"
																					danger
																				>
																					Excluir
																				</Button>
																			</Popconfirm>,
																		]}
																	>
																		<Space
																			direction="vertical"
																			size={0}
																			className="w-full"
																		>
																			<div className="flex justify-between">
																				<Typography.Text strong>
																					{item.nome}
																				</Typography.Text>
																				{item.valor != null && (
																					<Typography.Text type="secondary">
																						{`R$ ${item.valor
																							.toString()
																							.replace(
																								/\B(?=(\d{3})+(?!\d))/g,
																								"."
																							)},00`}
																					</Typography.Text>
																				)}
																			</div>

																			<Typography.Text type="secondary">
																				Emitido em:{" "}
																				{item.dataEmissao
																					? item.dataEmissao?.format
																						? item.dataEmissao.format(
																							"YYYY-MM-DD"
																						)
																						: item.dataEmissao
																					: "—"}
																				{item.dataValidade && " • Validade: "}
																				{item.dataValidade
																					? item.dataValidade?.format
																						? item.dataValidade.format(
																							"YYYY-MM-DD"
																						)
																						: item.dataValidade
																					: ""}
																			</Typography.Text>

																			{item.orgao && (
																				<Typography.Text type="secondary">
																					Órgão: {item.orgao}
																				</Typography.Text>
																			)}

																			{item.arquivos?.length > 0 && (
																				<Typography.Text type="secondary">
																					Arquivo(s):{" "}
																					{item.arquivos.join(", ")}
																				</Typography.Text>
																			)}

																			{item.observacao && (
																				<Typography.Text>
																					{item.observacao}
																				</Typography.Text>
																			)}
																		</Space>
																	</List.Item>
																)}
															/>
														);
													}}
												</Form.Item>
											</Card>
										</Col>
									</Row>

									{/* MODAL DE EDIÇÃO DE METADADOS */}
									<Modal
										title="Editar documento"
										open={isEditModalOpen}
										onCancel={() => {
											setIsEditModalOpen(false);
											setEditingIndex(null);
										}}
										onOk={() => {
											const editDoc = form.getFieldValue("editDocument");
											const docs: any[] = form.getFieldValue("documents") || [];

											if (editingIndex === null) return;

											const newDocs = [...docs];
											newDocs[editingIndex] = {
												...newDocs[editingIndex],
												...editDoc,
											};

											form.setFieldsValue({ documents: newDocs });
											setIsEditModalOpen(false);
											setEditingIndex(null);
											message.success("Metadados atualizados com sucesso.");
										}}
										okText="Salvar"
										cancelText="Cancelar"
									>
										<Row gutter={gutter}>
											<Col span={24}>
												<Form.Item
													name={["editDocument", "nome"]}
													label="Nome"
													rules={[
														{
															required: true,
															message: "Informe o nome do documento",
														},
													]}
												>
													<Input />
												</Form.Item>
											</Col>
											<Col span={24}>
												<Form.Item
													name={["editDocument", "orgao"]}
													label="Órgão emissor"
												>
													<Input />
												</Form.Item>
											</Col>
											<Col span={12}>
												<Form.Item
													name={["editDocument", "dataEmissao"]}
													label="Data de emissão"
												>
													<DatePicker className="w-full" />
												</Form.Item>
											</Col>
											<Col span={12}>
												<Form.Item
													name={["editDocument", "dataValidade"]}
													label="Data de validade"
												>
													<DatePicker className="w-full" />
												</Form.Item>
											</Col>
											<Col span={12}>
												<Form.Item
													name={["editDocument", "valor"]}
													label="Valor"
												>
													<InputNumber
														className="w-full"
														placeholder="0,00"
														formatter={(value) =>
															value != null
																? `R$ ${value}`.replace(
																	/\B(?=(\d{3})+(?!\d))/g,
																	"."
																)
																: ""
														}
														parser={(value) =>
															value
																?.replace(/\D/g, "")
																.replace(/^0+/, "") as unknown as number
														}
													/>
												</Form.Item>
											</Col>
											<Col span={24}>
												<Form.Item
													name={["editDocument", "observacao"]}
													label="Observação"
												>
													<Input.TextArea rows={2} />
												</Form.Item>
											</Col>
										</Row>
									</Modal>
								</>
							),
						},
					]}
				/>

				{/* DRAWER DE CLIENTE (REUTILIZÁVEL) */}
				<ClientDrawer
					open={isClientDrawerOpen}
					onClose={() => setIsClientDrawerOpen(false)}
				/>

				{/* DRAWER DE FATURAMENTO POR PROCESSO (REUTILIZÁVEL) */}
				<BillingDrawer
					open={isBillingDrawerOpen}
					onClose={() => setIsBillingDrawerOpen(false)}
					context={billingContext}
				/>
			</Form>
		</Drawer>
	);
};

export default ServiceOrderDrawer;
