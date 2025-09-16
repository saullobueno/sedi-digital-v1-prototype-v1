import React from 'react';
import { DeleteOutlined, DownOutlined, EditOutlined, EllipsisOutlined, EyeOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Abrir',
    icon: <EyeOutlined />,
  },
  {
    key: '2',
    label: 'Editar',
    icon: <EditOutlined />,
  },
  {
    key: '3',
    label: 'Restaurar',
    icon: <DeleteOutlined />,
  },
  {
    key: '4',
    label: 'Excluir',
    icon: <DeleteOutlined />,
    danger: true,
  },
];

const ActionsDropdown: React.FC = () => (
  <Dropdown menu={{ items }} trigger={['click']}>
		<Button type="text" icon={<EllipsisOutlined />} />
  </Dropdown>
);

export default ActionsDropdown;