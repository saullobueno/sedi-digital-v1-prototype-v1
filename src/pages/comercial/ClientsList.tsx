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

import { data as initialData, DataType, columns as importedColumns } from "../../data/comercial/clients";
import ActionsDropdown from "../../data/utils/actionsDropdown";
import OptionsToolbar from "../../components/crud/list/OptionsToolbar";
import ClientDrawer from "../../components/drawer/ClientDrawer";

const STATUS_OPCOES = ["Ativo", "Inativo", "Potencial", "Negociando"] as const;

const ClientsList: React.FC = () => {
	const [dataSource, setDataSource] = useState<DataType[]>(initialData);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [selected, setSelected] = useState<any>(null);
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

	const handleSave: any = async () => {
		try {
			const values = await form.validateFields();
			setDataSource(prev =>
				prev.map(item => (item.key === selected?.key ? { ...item, ...values } : item))
			);
			message.success("Cliente atualizado com sucesso!");
			fecharDrawer();
		} catch { }
	};

	const empty = useMemo(() => dataSource.length === 0, [dataSource]);

	return (
		<>
			<Breadcrumb
				items={[{ title: "Inicio" }, { title: "Comercial" }, { title: "Clientes" }]}
				className="my-4 text-2xl font-semibold"
			/>
			<Content className="p-4 m-0 bg-white rounded-lg border border-solid border-neutral-200">
				<OptionsToolbar />
				<div className="max-h-[calc(100vh-230px)] overflow-y-scroll rounded-lg border border-solid border-neutral-200">
					<Table<DataType>
						sticky={true}
						rowKey="key"
						columns={[
							...((importedColumns ?? []) as TableColumnsType<DataType>),
							{
								key: 'action',
								render: (_, record) => (
									<Space size="small">
										<ActionsDropdown />
										<Button type="text" icon={<RightOutlined />} onClick={() => abrirDrawer(record)} />
									</Space>
								),
							}
						]}
						dataSource={dataSource}
						size="small"
						scroll={{ x: "max-content" }}
						locale={{ emptyText: empty ? "Sem clientes" : "Nenhum resultado" }}
						pagination={false}
					/>
				</div>
			</Content>

			{/* Drawer com formulário de edição */}
			<ClientDrawer
				open={drawerOpen}
				onClose={fecharDrawer}
			/>

		</>
	);
};

export default ClientsList;
