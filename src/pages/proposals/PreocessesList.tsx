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
} from "antd";
import type { TableColumnsType } from "antd";
import { Content } from "antd/lib/layout/layout";
import {
	EditOutlined,
	DeleteOutlined,
	SaveOutlined,
	CloseOutlined,
	EllipsisOutlined,
	RightOutlined,
} from "@ant-design/icons";

import { data, DataType, columns } from "../../data/proposals/services";
import ActionsDropdown from "../../data/utils/actionsDropdown";
import OptionsToolbar from "../../components/crud/list/OptionsToolbar";

const STATUS_OPCOES = ["Ativo", "Inativo", "Potencial", "Negociando"] as const;

const ProcessesList: React.FC = () => {
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
				items={[{ title: 'Inicio' }, { title: 'OS' }, { title: 'Processos' }]}
				className='my-4 text-2xl font-semibold'
			/>
			<Content className="p-4 m-0 bg-white rounded-lg border border-solid border-neutral-200">
					<OptionsToolbar />
					<div className="max-h-[calc(100vh-230px)] overflow-y-scroll rounded-lg border border-solid border-neutral-200">
						<Table<DataType>
							sticky={true}
							rowKey="key"
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
			
			{/* Drawer com formulário de edição */}
			<Drawer
				title={selected ? `Editar cliente: ${selected.numeroFSP}` : "Editar cliente"}
				placement="right"
				width={520}
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
				<Form layout="horizontal" size="small" labelCol={{ span: 6 }} labelAlign="left" labelWrap variant="filled" form={form} initialValues={selected ?? {}} requiredMark={false}>
					<Form.Item name="company" label="Empresa" rules={[{ required: true, message: "Informe o nome da empresa" }]}>
						<Input placeholder="Ex.: Tech Solutions Ltda" />
					</Form.Item>
					<Form.Item name="cnpj" label="CNPJ" rules={[{ required: true, message: "Informe o CNPJ" }]}>
						<Input placeholder="00.000.000/0000-00" />
					</Form.Item>
					<Form.Item name="segment" label="Segmento"><Input placeholder="Ex.: Tecnologia" /></Form.Item>
					<Form.Item name="filial" label="Filial"><Input placeholder="Ex.: São Paulo" /></Form.Item>
					<Form.Item name="contact" label="Contato"><Input placeholder="Nome do contato" /></Form.Item>
					<Form.Item name="phone" label="Telefone"><Input placeholder="(00) 00000-0000" /></Form.Item>
					<Form.Item name="email" label="Email" rules={[{ type: "email", message: "Email inválido" }, { required: true, message: "Informe o email" }]}>
						<Input placeholder="contato@empresa.com" />
					</Form.Item>
					<Form.Item name="status" label="Status">
						<Select
							mode="multiple"
							allowClear
							placeholder="Selecione status"
							options={STATUS_OPCOES.map((s) => ({ label: s, value: s }))}
						/>
					</Form.Item>
					<Form.Item name="createdAt" label="Criado em">
						<Input placeholder="YYYY-MM-DDTHH:mm:ssZ" disabled />
					</Form.Item>
				</Form>
			</Drawer>
		</>
	);
}

export default ProcessesList;