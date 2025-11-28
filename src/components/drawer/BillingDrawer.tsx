// BillingDrawer.tsx
import React from "react";
import {
	Drawer,
	Row,
	Col,
	Typography,
	Form,
	Input,
	Select,
	InputNumber,
	Divider,
} from "antd";

const gutter = 32;
const colSpan = 12;

export interface BillingContext {
	serviceIndex: number;
	processIndex: number;
}

interface BillingDrawerProps {
	title?: any;
	open: boolean;
	onClose: () => void;
	context?: BillingContext | null;
	createdAt?: string;
	updatedAt?: string;
}

const STATUS_OPCOES = [
	"Pendente",
	"Faturado",
	"Atrasado",
	"Cancelado",
	"Agendado",
] as const;

const CONDICAO_PAGAMENTO_OPCOES = [
	{ label: "À vista", value: "avista" },
	{ label: "15 dias", value: "15d" },
	{ label: "30 dias", value: "30d" },
	{ label: "45 dias", value: "45d" },
];

const MEIO_PAGAMENTO_OPCOES = [
	{ label: "Boleto", value: "boleto" },
	{ label: "PIX", value: "pix" },
	{ label: "Transferência", value: "ted" },
];

const RECORRENCIA_OPCOES = [
	{ label: "Único", value: "unico" },
	{ label: "Mensal", value: "mensal" },
	{ label: "Trimestral", value: "trimestral" },
	{ label: "Anual", value: "anual" },
];

const BillingDrawer: React.FC<BillingDrawerProps> = ({
	title = "Faturamento",
	open,
	onClose,
	context,
	createdAt,
	updatedAt,
}) => {
	const [form] = Form.useForm<any>();

	return (
		<Drawer
			title={title}
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
				labelCol={{ flex: "120px" }}
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

				<Form.Item name="status" label="Status">
					<Select
						allowClear
						placeholder="Selecione status"
						options={STATUS_OPCOES.map((s) => ({ label: s, value: s }))}
					/>
				</Form.Item>

				<Row gutter={gutter}>
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

				{/* CLIENTE / TOMADOR */}
				<Typography.Title level={5} className="mb-6">
					Cliente / Tomador
				</Typography.Title>

				<Row gutter={gutter}>
					<Col span={colSpan}>
						<Form.Item name={["razaoSocial"]} label="Razão social">
							<Input placeholder="Razão social da empresa" />
						</Form.Item>
					</Col>
					<Col span={colSpan}>
						<Form.Item name={["nomeFantasia"]} label="Nome fantasia">
							<Input placeholder="Opcional" />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name={["cnpj"]} label="CNPJ">
							<Input placeholder="00.000.000/0000-00" />
						</Form.Item>
					</Col>
					<Col span={colSpan}>
						<Form.Item
							name={["inscricaoEstadual"]}
							label="Inscrição Est."
						>
							<Input placeholder="Opcional" />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item
							name={["inscricaoMunicipal"]}
							label="Inscrição Mun."
						>
							<Input placeholder="Opcional" />
						</Form.Item>
					</Col>
					<Col span={colSpan}>
						<Form.Item
							name={["codigoClienteInterno"]}
							label="Cód. cliente"
						>
							<Input placeholder="Código interno (ERP)" />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name={["enderecoCep"]} label="CEP">
							<Input placeholder="00000-000" />
						</Form.Item>
					</Col>
					<Col span={colSpan}>
						<Form.Item name={["enderecoCidade"]} label="Cidade">
							<Input />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name={["enderecoUf"]} label="UF">
							<Input maxLength={2} placeholder="UF" />
						</Form.Item>
					</Col>
					<Col span={colSpan}>
						<Form.Item name={["enderecoBairro"]} label="Bairro">
							<Input />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name={["enderecoLogradouro"]} label="Endereço">
							<Input placeholder="Rua / Av." />
						</Form.Item>
					</Col>
					<Col span={colSpan}>
						<Form.Item name={["enderecoNumero"]} label="Número">
							<Input />
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item
							name={["enderecoComplemento"]}
							label="Complemento"
						>
							<Input placeholder="Sala, bloco, referência, etc." />
						</Form.Item>
					</Col>
				</Row>

				<Divider className="mb-8" />

				{/* CONDIÇÕES COMERCIAIS */}
				<Typography.Title level={5} className="mb-6">
					Condições comerciais
				</Typography.Title>

				<Row gutter={gutter}>
					<Col span={colSpan}>
						<Form.Item
							name={["condicaoPagamento"]}
							label="Condição"
						>
							<Select
								options={CONDICAO_PAGAMENTO_OPCOES}
								placeholder="Selecione"
								allowClear
							/>
						</Form.Item>
					</Col>
					<Col span={colSpan}>
						<Form.Item
							name={["meioPagamento"]}
							label="Meio de pag."
						>
							<Select
								options={MEIO_PAGAMENTO_OPCOES}
								placeholder="Selecione"
								allowClear
							/>
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name={["valor"]} label="Valor">
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
						<Form.Item name={["recorrencia"]} label="Recorrência">
							<Select
								options={RECORRENCIA_OPCOES}
								placeholder="Selecione"
								allowClear
							/>
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item
							name={["vencimentoDia"]}
							label="Dia vencimento"
						>
							<InputNumber
								min={1}
								max={31}
								className="w-full"
								placeholder="1–31"
							/>
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item
							name={["descontoPercentual"]}
							label="Desconto (%)"
						>
							<InputNumber
								min={0}
								max={100}
								className="w-full"
								placeholder="0"
							/>
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item
							name={["jurosAoMes"]}
							label="Juros/mês (%)"
						>
							<InputNumber
								min={0}
								className="w-full"
								placeholder="0"
							/>
						</Form.Item>
					</Col>
				</Row>

				<Divider className="mb-8" />

				{/* CONTROLE INTERNO */}
				<Typography.Title level={5} className="mb-6">
					Controle interno
				</Typography.Title>

				<Row gutter={gutter}>
					<Col span={colSpan}>
						<Form.Item name={["centroCusto"]} label="Centro de custo">
							<Input />
						</Form.Item>
					</Col>
					<Col span={colSpan}>
						<Form.Item name={["projeto"]} label="Projeto / Processo">
							<Input />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item name={["poCliente"]} label="PO do cliente">
							<Input />
						</Form.Item>
					</Col>
					<Col span={colSpan}>
						<Form.Item
							name={["referenciaContrato"]}
							label="Ref. contrato"
						>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				<Divider className="mb-8" />

				{/* CONTATO PARA COBRANÇA */}
				<Typography.Title level={5} className="mb-6">
					Contato para cobrança
				</Typography.Title>

				<Row gutter={gutter}>
					<Col span={colSpan}>
						<Form.Item name={["responsavel"]} label="Responsável">
							<Input />
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item
							name={["emailCobranca"]}
							label="E-mail cobrança"
						>
							<Input
								type="email"
								placeholder="financeiro@cliente.com"
							/>
						</Form.Item>
					</Col>

					<Col span={colSpan}>
						<Form.Item
							name={["telefoneCobranca"]}
							label="Telefone"
						>
							<Input placeholder="(00) 0000-0000" />
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
						<Form.Item
							name={["observacoes"]}
							label="Observações"
						>
							<Input.TextArea
								rows={3}
								placeholder="Instruções de faturamento específicas deste processo."
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	);
};

export default BillingDrawer;
