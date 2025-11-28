// ClientDrawer.tsx
import React from "react";
import {
	Drawer,
	Row,
	Col,
	Typography,
	Divider,
	Form,
	Input,
	Switch,
	Select,
} from "antd";

const gutter = 32;
const colSpan = 12;

const STATUS_OPCOES = ["Ativo", "Inativo", "Potencial", "Negociando"] as const;

const TIPO_CLIENTE_OPCOES = [
	{ label: "Cliente", value: "cliente" },
	{ label: "Prospect", value: "prospect" },
	{ label: "Parceiro", value: "parceiro" },
];

const ORIGEM_CLIENTE_OPCOES = [
	{ label: "Indicação", value: "indicacao" },
	{ label: "Inbound", value: "inbound" },
	{ label: "Outbound", value: "outbound" },
	{ label: "Evento / Feira", value: "evento" },
	{ label: "Outro", value: "outro" },
];

const PORTE_EMPRESA_OPCOES = [
	{ label: "Micro / MEI", value: "mei" },
	{ label: "Pequena", value: "pequena" },
	{ label: "Média", value: "media" },
	{ label: "Grande", value: "grande" },
];

interface ClientDrawerProps {
	open: boolean;
	onClose: () => void;
	createdAt?: string;
	updatedAt?: string;
	clientCode?: string; // opcional, só leitura (código interno)
}

const ClientDrawer: React.FC<ClientDrawerProps> = ({
	open,
	onClose,
	createdAt,
	updatedAt,
	clientCode,
}) => {
	const [form] = Form.useForm<any>();

	return (
		<Drawer
			title="Cliente"
			placement="right"
			width={800}
			open={open}
			onClose={onClose}
			destroyOnClose
			classNames={{ body: "p-8" }}
			closable
		>
			<Form
				layout="horizontal"
				variant="filled"
				size="small"
				form={form}
				labelCol={{ flex: "140px" }}
				labelAlign="left"
				labelWrap
				colon={false}
				wrapperCol={{ span: "auto" }}
				requiredMark={false}
			>
				{/* STATUS & METADADOS */}
				<Typography.Title level={5} className="mb-6">
					Status &amp; Metadados
				</Typography.Title>


				<Row gutter={gutter}>
					<Col span={colSpan}>
						<Form.Item label="Código interno">
							{clientCode ?? "-"}
						</Form.Item>
					</Col>
					<Col span={colSpan}>

						<Form.Item name="status" label="Status">
							<Select
								allowClear
								placeholder="Selecione status"
								options={STATUS_OPCOES.map((s) => ({ label: s, value: s }))}
							/>
						</Form.Item>
					</Col>
					<Col span={colSpan}>
						<Form.Item label="Criado em">
							{createdAt ?? "-"}
						</Form.Item>
					</Col>
					<Col span={colSpan}>
						<Form.Item label="Atualizado em">
							{updatedAt ?? "-"}
						</Form.Item>
					</Col>
				</Row>

				<Divider className="mb-8" />

				{/* DADOS DO CLIENTE */}
				<Typography.Title level={5} className="mb-6">
					Dados do cliente
				</Typography.Title>

				<Row gutter={gutter}>
					<Col span={24}>
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

					<Col span={24}>
						<Form.Item name="corporateName" label="Razão Social">
							<Input placeholder="Razão social (se houver)" />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="segment" label="Segmento">
							<Input placeholder="Ex.: Tecnologia" />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="clientType" label="Tipo">
							<Select
								allowClear
								placeholder="Selecione"
								options={TIPO_CLIENTE_OPCOES}
							/>
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="origin" label="Origem">
							<Select
								allowClear
								placeholder="Como chegou até nós?"
								options={ORIGEM_CLIENTE_OPCOES}
							/>
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="companySize" label="Porte da empresa">
							<Select
								allowClear
								placeholder="Selecione"
								options={PORTE_EMPRESA_OPCOES}
							/>
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="website" label="Site">
							<Input placeholder="https://empresa.com" />
						</Form.Item>
					</Col>
				</Row>

				<Divider className="mb-8" />

				{/* GRUPO ECONÔMICO / MATRIZ & FILIAL */}
				<Typography.Title level={5} className="mb-6">
					Grupo econômico
				</Typography.Title>

				<Row gutter={gutter}>
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
							<Input placeholder="00.000.000/0000-00" />
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
				</Row>

				<Divider className="mb-8" />

				{/* CONTATO PRINCIPAL */}
				<Typography.Title level={5} className="mb-6">
					Contato principal
				</Typography.Title>

				<Row gutter={gutter}>
					<Col span={colSpan}>
						<Form.Item name="contactName" label="Contato">
							<Input placeholder="Nome do contato" />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="department" label="Departamento">
							<Input placeholder="Ex.: Compras, Financeiro, TI" />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="phone" label="Telefone">
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
							name="phoneAlt"
							label="Telefone alternativo"
						>
							<Input placeholder="Opcional" />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="role" label="Cargo">
							<Input placeholder="Ex.: Diretor, Coordenador" />
						</Form.Item>
					</Col>
				</Row>

				<Divider className="mb-8" />

				{/* ENDEREÇO */}
				<Typography.Title level={5} className="mb-6">
					Endereço
				</Typography.Title>

				<Row gutter={gutter}>

					<Col span={24}>
						<Form.Item name="address" label="Endereço">
							<Input placeholder="Rua / Av." />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="number" label="Número">
							<Input />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="complement" label="Complemento">
							<Input placeholder="Sala, bloco, referência, etc." />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="bairro" label="Bairro">
							<Input />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="city" label="Cidade">
							<Input />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="cep" label="CEP">
							<Input placeholder="00000-000" />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name="state" label="Estado">
							<Input placeholder="UF" maxLength={2} />
						</Form.Item>
					</Col>

				</Row>

				<Divider className="mb-8" />

				{/* OBSERVAÇÕES */}
				<Typography.Title level={5} className="mb-6">
					Observações
				</Typography.Title>

				<Row gutter={gutter}>
					<Col span={24}>
						<Form.Item name="notes" label="Observações">
							<Input.TextArea
								rows={3}
								placeholder="Informações relevantes sobre o cliente, histórico, particularidades, etc."
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
};

export default ClientDrawer;
