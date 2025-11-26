// ClientDrawer.tsx
import React from "react";
import { Drawer, Row, Col, Typography, Divider, Form, Input, Switch, Select } from "antd";

const gutter = 32;
const colSpan = 12;

interface ClientDrawerProps {
	open: boolean;
	onClose: () => void;
}

const ClientDrawer: React.FC<ClientDrawerProps> = ({ open, onClose }) => {
	return (
		<Drawer
			title="Cliente"
			placement="right"
			width={800}
			open={open}
			onClose={onClose}
			destroyOnClose
			classNames={{ body: "py-4 px-4" }}
		>
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
					<Form.Item name="corporateName" label="Razão Social">
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
					<Form.Item name="corporateCNPJMatriz" label="CNPJ Matriz">
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
								<Form.Item name="corporateCNPJFilial" label="CNPJ Filial">
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

			<Typography.Title level={5} className="mb-6">
				Contato
			</Typography.Title>

			<Row gutter={gutter}>
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
					<Form.Item name="contactName" label="Contato">
						<Input placeholder="Nome do contato" />
					</Form.Item>
				</Col>
				<Col span={colSpan}>
					<Form.Item name="department" label="Departamento">
						<Input />
					</Form.Item>
				</Col>
			</Row>

			<Divider className="mb-8" />

			<Typography.Title level={5} className="mb-6">
				Endereço
			</Typography.Title>

			<Row gutter={gutter}>
				<Col span={24}>
					<Form.Item name="address" label="Endereço">
						<Input />
					</Form.Item>
				</Col>
				<Col span={colSpan}>
					<Form.Item name="cep" label="CEP">
						<Input />
					</Form.Item>
				</Col>
				<Col span={colSpan}>
					<Form.Item name="state" label="Estado">
						<Input />
					</Form.Item>
				</Col>
			</Row>
		</Drawer>
	);
};

export default ClientDrawer;
