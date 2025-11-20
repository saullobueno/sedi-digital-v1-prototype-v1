// DrawerRegister.tsx
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
} from "antd";
import {
	SaveOutlined,
	DeleteOutlined,
	InboxOutlined,
	PlusOutlined,
} from "@ant-design/icons";

import type { DataType } from "../../data/proposals/fsp";

const gutter = 32;
const colSpan = 12;

interface DrawerPropsRegister {
	open: boolean;
	selected: DataType | null;
	onClose: () => void;
	onSave: (values: any) => void;
}

const DrawerRegister: React.FC<DrawerPropsRegister> = ({
	open,
	selected,
	onClose,
	onSave,
}) => {
	const [form] = Form.useForm<any>();
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	useEffect(() => {
		if (selected) {
			form.setFieldsValue({ ...selected } as any);
		} else {
			form.resetFields();
		}
	}, [selected, form]);

	const handleSave: any = async () => {
		try {
			const values = await form.validateFields();
			onSave(values);
			message.success("Cliente atualizado com sucesso!");
			onClose();
		} catch {
			// validação falhou, não faz nada
		}
	};

	return (
		<Drawer
			title={selected ? `${selected.numeroFSP}` : "Cliente"}
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
			{/* Um único Form envolvendo todas as abas para manter state/validação */}
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
				initialValues={selected ?? {}}
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
													valueRender={() => (
														<Space>
															{(form.getFieldValue("status") ?? ["Novo"]).map(
																(s: string) => (
																	<Tag key={s}>{s}</Tag>
																)
															)}
														</Space>
													)}
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
														{form.getFieldValue("prazoConclusao") || "—"}
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

												<Flex gap={8} vertical>
													<Card>
														<div className="font-semibold">Serviço 1</div>
														<div>Processo 1</div>
														<div>Processo 2</div>
														<div>Processo 3</div>
													</Card>
													<Card>
														<div className="font-semibold">Serviço 2</div>
														<div>Processo 1</div>
														<div>Processo 2</div>
														<div>Processo 3</div>
													</Card>
												</Flex>
											</Card>
										</Col>
									</Row>
								</>
							),
						},

						// ===== OS (Pedidos + PROPOSTA unificadas) =====
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
												valuePropName="checked"
											>
												<Select
													defaultValue="Não iniciada"
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
													defaultValue="Criada"
													options={[
														{ label: "Criada", value: "Criada" },
														{ label: "Sem resposta", value: "Sem resposta" },
														{ label: "Atrasado", value: "Atrasado" },
														{ label: "Divergências", value: "Divergências" },
														{ label: "Falha", value: "Falha" },
														{ label: "Duplicidade", value: "Duplicidade" },
														{ label: "Faturamento errado", value: "Faturamento errado" },
														{ label: "Precisa ser revisado", value: "Precisa ser revisado" },
														{ label: "Cancelado", value: "Cancelado" },
														{ label: "Finlizado", value: "Finlizado" },
														{ label: "Informação em falta", value: "Informação em falta" },
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
												<DatePicker placeholder="YYYY-MM-DD" className="w-full" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item name="dataAprovTexto" label="Aprovação">
												<DatePicker placeholder="YYYY-MM-DD" className="w-full" />
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
												<DatePicker placeholder="YYYY-MM-DD" className="w-full" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item name="endTime" label="Conclusão">
												<DatePicker placeholder="YYYY-MM-DD" className="w-full" />
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
										<Typography.Title level={5} className="mb-6">
											Cliente
										</Typography.Title>

										<Row gutter={gutter}>
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
													rules={[{ type: "email", message: "Email inválido" }]}
												>
													<Input />
												</Form.Item>
											</Col>
										</Row>
									</div>

									<Col span={24}>
										<Divider className="mb-8" />
									</Col>

									{/* SERVIÇOS + PROCESSOS (UNIFICADO) */}
									<div className="mt-6">
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
																	<Form.Item name="address" label="Endereço de execução">
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

															{/* PROCESSOS DO SERVIÇO */}
															<Form.List name={[serviceField.name, "processes"]}>
																{(processFields, { add: addProcess, remove: removeProcess }) => (
																	<>
																		<Typography.Text className="font-semibold">
																			Processos deste serviço
																		</Typography.Text>
																		<Row gutter={gutter} className="mt-2">
																			{processFields.map((processField, pIndex) => (
																				<Col span={24} className="mt-2" key={processField.key}>
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
																								name="status"
																								label="Status"
																								valuePropName="checked"
																							>
																								<Select
																									defaultValue="Não iniciada"
																									options={[
																										{
																											label: "Não iniciada",
																											value: "Não iniciada",
																										},
																									]}
																								/>
																							</Form.Item>
																						</Col>
																						<Col span={colSpan}>
																							<Form.Item
																								name="upload"
																								label="Item repositório"
																								valuePropName="checked"
																							>
																								<Select
																									defaultValue="Alvará dos Bombeiros"
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
																						<Col
																							span={2}
																							className="flex items-end justify-center pb-1"
																						>
																							<Button
																								danger
																								type="text"
																								icon={<DeleteOutlined />}
																								onClick={() =>
																									removeProcess(processField.name)
																								}
																							/>
																						</Col>
																						<Col span={24}>
																							<Divider />
																						</Col>
																					</Row>
																				</Col>
																			))}

																			<Col span={24}>
																				<Button
																					type="dashed"
																					icon={<PlusOutlined />}
																					onClick={() => addProcess()}
																					className="mt-2"
																				>
																					Adicionar processo
																				</Button>
																			</Col>
																		</Row>
																	</>
																)}
															</Form.List>
														</Card>
													))}

													<Button
														type="dashed"
														icon={<PlusOutlined />}
														onClick={() => addService()}
													>
														Adicionar serviço
													</Button>
												</>
											)}
										</Form.List>
									</div>

									<Col span={24}>
										<Divider className="my-8" />
									</Col>

									{/* AVALIAÇÃO / CUSTOS (SEM FATURAMENTO) */}
									<div className="mt-6">
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
												<Form.Item
													name="especialista"
													label="Especialista"
												>
													<Input placeholder="" />
												</Form.Item>
											</Col>

											<Col span={24}>
												<Form.Item
													name="visitaInLoco"
													label="Visita"
												>
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
								</>
							),
						},

						// ===== CLIENTE =====
						{
							key: "cliente",
							label: "Cliente",
							className: "p-4",
							children: (
								<>
									<Typography.Title level={5} className="mb-6">
										Dados
									</Typography.Title>

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
											<Form.Item
												name="corporateName"
												label="Razão Social"
											>
												<Input />
											</Form.Item>
										</Col>
										<Col span={24}>
											<Form.Item
												name="corporateisMatriz"
												label="Matriz"
												valuePropName="checked"
											>
												<Switch />
											</Form.Item>
										</Col>

										<Col span={colSpan}>
											<Form.Item
												name="corporateCNPJMatriz"
												label="CNPJ Matriz"
											>
												<Input placeholder="1A.B2C.3D4/5E6F-78" />
											</Form.Item>
										</Col>

										<Col span={colSpan}>
											<Form.Item
												noStyle
												shouldUpdate={(prev, cur) =>
													prev.corporateisMatriz !== cur.corporateisMatriz
												}
											>
												{({ getFieldValue }) =>
													!getFieldValue("corporateisMatriz") ? (
														<Form.Item
															name="corporateCNPJFilial"
															label="CNPJ Filial"
														>
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

										<Col span={24}>
											<Divider className="mb-8" />
										</Col>

										<Col span={24}>
											<Typography.Title level={5} className="mb-6">
												Contato
											</Typography.Title>
										</Col>

										<Col span={colSpan}>
											<Form.Item
												name="phone"
												label="Telefone"
											>
												<Input placeholder="(00) 00000-0000" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="email"
												label="E-mail contato"
												rules={[{ type: "email", message: "Email inválido" }]}
											>
												<Input placeholder="contato@empresa.com" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="contactName"
												label="Contato"
											>
												<Input placeholder="Nome do contato" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="department"
												label="Departamento"
											>
												<Input />
											</Form.Item>
										</Col>
										<Col span={24}>
											<Divider className="mb-8" />
										</Col>
										<Col span={24}>
											<Typography.Title level={5} className="mb-6">
												Endereço
											</Typography.Title>
										</Col>

										<Col span={24}>
											<Form.Item
												name="address"
												label="Endereço"
											>
												<Input />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="cep"
												label="CEP"
											>
												<Input />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name="state"
												label="Estado"
											>
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
							className: "p-4",
							children: (
								<>
									<Typography.Title level={5} className="mb-6">
										Dados de Faturamento
									</Typography.Title>

									<Row gutter={gutter}>
										<Col span={colSpan}>
											<Form.Item
												name="billingCnpj"
												label="CNPJ faturamento"
											>
												<Input placeholder="00.000.000/0000-00" />
											</Form.Item>
										</Col>
										<Col span={colSpan}>
											<Form.Item
												name={["billing", "inscricaoEstadual"]}
												label="Inscrição Estadual"
											>
												<Input placeholder="Opcional" />
											</Form.Item>
										</Col>
										<Col span={24}>
											<Form.Item
												name={["billing", "enderecoFaturamento"]}
												label="Endereço de faturamento"
											>
												<Input placeholder="Endereço completo para faturamento" />
											</Form.Item>
										</Col>

										<Col span={colSpan}>
											<Form.Item
												name={["billing", "condicaoPagamento"]}
												label="Condição de pagamento"
											>
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
										<Col span={colSpan}>
											<Form.Item
												name={["billing", "meioPagamento"]}
												label="Meio de pagamento"
											>
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

										<Col span={colSpan}>
											<Form.Item
												name={["billing", "valorTotal"]}
												label="Valor Total"
											>
												<InputNumber
													className="w-full"
													placeholder="0,00"
													formatter={(value: any) =>
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
												name="responsavel"
												label="Responsável comercial"
											>
												<Input />
											</Form.Item>
										</Col>

										<Col span={24}>
											<Form.Item
												name={["billing", "observacoes"]}
												label="Observações"
											>
												<Input.TextArea
													rows={3}
													placeholder="Instruções de faturamento, dados bancários, etc."
												/>
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
																message:
																	"Selecione pelo menos um arquivo",
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
																					message.success("Documento removido.");
																				}}
																			>
																				<Button size="small" type="link" danger>
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
											const docs: any[] =
												form.getFieldValue("documents") || [];

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
			</Form>
		</Drawer>
	);
};

export default DrawerRegister;
