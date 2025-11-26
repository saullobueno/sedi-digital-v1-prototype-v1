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
	open: boolean;
	onClose: () => void;
	context: BillingContext | null;
}

const BillingDrawer: React.FC<BillingDrawerProps> = ({
	open,
	onClose,
	context,
}) => {
	if (!context) return null;

	const baseName = [
		"services",
		context.serviceIndex,
		"processes",
		context.processIndex,
		"billing",
	] as (string | number)[];

	return (
		<Drawer
			title="Faturamento do processo"
			placement="right"
			width={800}
			open={open}
			onClose={onClose}
			destroyOnClose
			classNames={{ body: "py-4 px-4" }}
		>
			<Typography.Title level={5} className="mb-6">
				Dados de Faturamento
			</Typography.Title>

			{/* Info básica do processo (somente leitura) */}
			<Form.Item noStyle shouldUpdate>
				{({ getFieldValue }) => {
					const process = getFieldValue([
						"services",
						context.serviceIndex,
						"processes",
						context.processIndex,
					]);
					return (
						<div className="mb-6 rounded-xl border px-4 py-3 bg-gray-50">
							<Typography.Text strong className="block">
								Serviço {context.serviceIndex + 1} — Processo{" "}
								{context.processIndex + 1}
							</Typography.Text>
							<Typography.Text type="secondary" className="block">
								{process?.processo || "Sem nome de processo informado"}
							</Typography.Text>
						</div>
					);
				}}
			</Form.Item>

			<Row gutter={gutter}>
				<Col span={colSpan}>
					<Form.Item name={[...baseName, "cnpj"]} label="CNPJ para fat.">
						<Input placeholder="00.000.000/0000-00" />
					</Form.Item>
				</Col>
				<Col span={colSpan}>
					<Form.Item
						name={[...baseName, "inscricaoEstadual"]}
						label="Inscrição Est."
					>
						<Input placeholder="Opcional" />
					</Form.Item>
				</Col>

				<Col span={24}>
					<Form.Item
						name={[...baseName, "enderecoFaturamento"]}
						label="Endereço"
					>
						<Input placeholder="Endereço completo para faturamento" />
					</Form.Item>
				</Col>

				<Col span={colSpan}>
					<Form.Item
						name={[...baseName, "condicaoPagamento"]}
						label="Condição"
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
						name={[...baseName, "meioPagamento"]}
						label="Meio de pag."
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
					<Form.Item name={[...baseName, "valor"]} label="Valor">
						<InputNumber
							className="w-full"
							placeholder="0,00"
							formatter={(value: any) =>
								value != null
									? `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
									: ""
							}
							parser={(value) =>
								value?.replace(/\D/g, "").replace(/^0+/, "") as unknown as number
							}
						/>
					</Form.Item>
				</Col>
				<Col span={colSpan}>
					<Form.Item name={[...baseName, "responsavel"]} label="Responsável">
						<Input />
					</Form.Item>
				</Col>

				<Col span={24}>
					<Form.Item
						name={[...baseName, "observacoes"]}
						label="Observações"
					>
						<Input.TextArea
							rows={3}
							placeholder="Instruções de faturamento específicas deste processo."
						/>
					</Form.Item>
				</Col>
			</Row>

			<Divider />
			<Typography.Text type="secondary">
				Este drawer pode ser reutilizado em outras telas, bastando informar o
				serviço, processo e contexto de faturamento.
			</Typography.Text>
		</Drawer>
	);
};

export default BillingDrawer;
