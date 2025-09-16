import React, { useMemo, useState } from 'react';
import {
	AuditOutlined,
	FileOutlined,
	LaptopOutlined,
	SmileOutlined, 
	UserOutlined,
	TeamOutlined,
	SolutionOutlined,
	PhoneOutlined,
	CustomerServiceOutlined,
	NotificationOutlined,
	RocketOutlined,
	ShareAltOutlined,
	FileTextOutlined,
	AppstoreOutlined,
	ToolOutlined,
	FormOutlined,
	ProjectOutlined,
	BuildOutlined,
	FileProtectOutlined,
	CheckCircleOutlined,
	HourglassOutlined,
	DollarOutlined,
	CreditCardOutlined,
	PayCircleOutlined,
	WalletOutlined,
	ApartmentOutlined,
	IdcardOutlined,
	UserAddOutlined,
	ShopOutlined,
  SettingOutlined,
  SkinOutlined,
  GlobalOutlined,
  BellOutlined,
  MailOutlined,
  LinkOutlined,
  KeyOutlined,
  SafetyOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  TagsOutlined,
  TableOutlined,
  ImportOutlined,
  ExportOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  ApiOutlined,
  BranchesOutlined,
  CloudServerOutlined,
  LockOutlined,
  SecurityScanOutlined,
  DollarCircleOutlined,
  AccountBookOutlined,
  ScheduleOutlined,
  FlagOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
	Breadcrumb, Flex, Layout, Menu, Space, theme, Tooltip, Dropdown, Avatar, Badge, Button, Typography,
	Tabs, Drawer, List, Tag, Empty,
	ConfigProvider
 } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router';
import Logo from '@/assets/logo/sedi-logo.svg'

// ------------------ Tipos & dados de exemplo ------------------
type NotificationKind = "info" | "warning" | "success" | "error";

type NotificationItem = {
  id: string;
  title: string;
  description?: string;
  kind: NotificationKind;
  time: string;        // ex.: "há 5 min" ou "25 out 2025 - 21:35"
  read: boolean;
  link?: string;       // rota para "Abrir"
};

const initialNotifications: NotificationItem[] = [
  { id: "n1", title: "Nova proposta aprovada", description: "Proposta #1289 foi aprovada pelo cliente.", kind: "success", time: "há 5 min", read: false, link: "/proposals/1289" },
  { id: "n2", title: "Pagamento em atraso", description: "Fatura #7845 venceu há 2 dias.", kind: "warning", time: "há 1 h", read: false, link: "/billing/invoices/7845" },
  { id: "n3", title: "Integração falhou", description: "Webhook para CRM retornou 500.", kind: "error", time: "hoje 14:12", read: true, link: "/integrations/webhooks" },
  { id: "n4", title: "Novo comentário", description: "João comentou na proposta #1290.", kind: "info", time: "ontem 18:40", read: true, link: "/proposals/1290#comments" },
];

// ------------------ Helpers visuais ------------------
const kindIcon = (k: NotificationKind) => {
  switch (k) {
    case "info": return <InfoCircleOutlined />;
    case "warning": return <WarningOutlined />;
    case "success": return <CheckCircleOutlined />;
    case "error": return <CloseCircleOutlined />;
  }
};

const kindTagColor = (k: NotificationKind) => {
  switch (k) {
    case "info": return "processing";
    case "warning": return "warning";
    case "success": return "success";
    case "error": return "error";
  }
};

// ------------------ Drawer de Notificações ------------------
function NotificationsDrawer({
  open,
  onClose,
  data,
  onMarkRead,
  onMarkAll,
  onClearAll,
}: {
  open: boolean;
  onClose: () => void;
  data: NotificationItem[];
  onMarkRead: (id: string) => void;
  onMarkAll: () => void;
  onClearAll: () => void;
}) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"all" | "unread">("all");

  const unread = useMemo(() => data.filter(d => !d.read), [data]);
  const listData = tab === "all" ? data : unread;

  return (
    <Drawer
      title="Notificações"
      placement="right"
      width={500}
      open={open}
      onClose={onClose}
      extra={
				<Space>
					<Tooltip title="Marcar todas como lidas">
          	<Button type='text' size="small" onClick={onMarkAll} icon={<MailOutlined />} />
					</Tooltip>
					<Tooltip title="Limpar todas">
          	<Button type='text' size="small" danger icon={<DeleteOutlined />} onClick={onClearAll} />
					</Tooltip>
        </Space>
      }
    >
      <Tabs
        activeKey={tab}
				size='small'
        onChange={k => setTab(k as "all" | "unread")}
        items={[
          { key: "all", label: `Todas (${data.length})` },
          { key: "unread", label: `Não lidas (${unread.length})` },
        ]}
      />

      {listData.length === 0 ? (
        <Empty description={tab === "unread" ? "Sem não lidas" : "Sem notificações"} />
      ) : (
        <List
          itemLayout="vertical"
						dataSource={listData}
						size='small'
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                !item.read && (
                  <Button key="read" type="link" size="small" onClick={() => onMarkRead(item.id)}>
                    Marcar como lida
                  </Button>
                ),
                item.link && (
                  <Button
                    key="open"
                    type="link"
                    size="small"
                    onClick={() => { navigate(item.link!); onClose(); }}
                  >
                    Abrir
                  </Button>
                ),
              ].filter(Boolean)}
            >
              <List.Item.Meta
                /* avatar={
                  <Badge dot={!item.read}>
                    <Avatar shape="circle" icon={kindIcon(item.kind)} />
                  </Badge>
                } */
								description={<>
									<Flex gap={8} wrap className='w-full justify-between'>
										<Space size={8}>
											<Typography.Text strong={!item.read}>{item.title}</Typography.Text>
											<Tag color={kindTagColor(item.kind)}>{item.kind}</Tag>
										</Space>
                    <Typography.Text type="secondary">{item.time}</Typography.Text>
                  </Flex>
									<p>{item.description}</p>
								</>}
              />
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
}

const { Header, Content, Sider } = Layout;
const onClick: MenuProps['onClick'] = (e) => {    console.log('click ', e);  };

// Exemplo de usuário logado (troque pelo seu estado/contexto)
const currentUser = { name: "Edivan Costa", email: "edivan@sedi.com.br" };

// Itens do dropdown do usuário
const userMenuItems: MenuProps["items"] = [
  {
    key: "account",
    icon: <IdcardOutlined />,
    label: <Link to="/account">Minha conta</Link>,
  },
  {
    key: "account-settings",
    icon: <SettingOutlined />,
    label: <Link to="/account/settings">Configurações da conta</Link>,
  },
  {
    type: "divider",
  },
  {
    key: "security",
    icon: <LockOutlined />,
    label: <Link to="/account/security">Segurança</Link>,
  },
  {
    type: "divider",
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    danger: true,
    label: "Sair",
  },
];

export const itemsMenuHeader: MenuProps["items"] = [
  {
    key: "admin",
		label: <span className='text-white'>Administração</span>,
		className: 'text-white',
    children: [
      {
        type: "group",
        label: "Acesso e Usuários",
        children: [
          { key: "admin/users", icon: <UserOutlined />, label: <Link to="/admin/users">Usuários</Link> },
          { key: "admin/roles", icon: <KeyOutlined />, label: <Link to="/admin/roles">Papéis & Permissões</Link> },
          { key: "admin/teams", icon: <TeamOutlined />, label: <Link to="/admin/teams">Equipes / Unidades</Link> },
          { key: "admin/audit", icon: <AuditOutlined />, label: <Link to="/admin/audit">Logs de Auditoria</Link> },
          { key: "admin/sessions", icon: <DesktopOutlined />, label: <Link to="/admin/sessions">Sessões Ativas</Link> },
        ],
      },
      {
        type: "group",
        label: "Operação",
        children: [
          { key: "admin/jobs", icon: <ScheduleOutlined />, label: <Link to="/admin/jobs">Filas de Tarefas / Jobs</Link> },
          { key: "admin/flags", icon: <FlagOutlined />, label: <Link to="/admin/flags">Feature Flags</Link> },
          { key: "admin/maintenance", icon: <ToolOutlined />, label: <Link to="/admin/maintenance">Manutenção</Link> },
          { key: "admin/status", icon: <DashboardOutlined />, label: <Link to="/admin/status">Status do Sistema</Link> },
        ],
      },
    ],
  },

  {
    key: "settings",
    label: <span className='text-white'>Configurações</span>,
    children: [
      {
        type: "group",
        label: "Preferências",
        children: [
          { key: "settings/general", icon: <SettingOutlined />, label: <Link to="/settings/general">Geral</Link> },
          { key: "settings/theme", icon: <SkinOutlined />, label: <Link to="/settings/theme">Aparência / Tema</Link> },
          { key: "settings/i18n", icon: <GlobalOutlined />, label: <Link to="/settings/i18n">Localização & Idiomas</Link> },
          { key: "settings/notifications", icon: <BellOutlined />, label: <Link to="/settings/notifications">Notificações</Link> },
          { key: "settings/emails", icon: <MailOutlined />, label: <Link to="/settings/emails">E-mails Transacionais</Link> },
          { key: "settings/domains", icon: <LinkOutlined />, label: <Link to="/settings/domains">Domínios & URLs</Link> },
        ],
      },
    ],
  },

  {
    key: "masterdata",
    label: <span className='text-white'>Dados Mestres</span>,
    children: [
      {
        type: "group",
        label: "Dicionários (usados em selects)",
        children: [
          { key: "data/dictionaries", icon: <DatabaseOutlined />, label: <Link to="/data/dictionaries">Dicionários</Link> },
          { key: "data/categories", icon: <TagsOutlined />, label: <Link to="/data/categories">Categorias & Tags</Link> },
          { key: "data/tables", icon: <TableOutlined />, label: <Link to="/data/tables">Tabelas Auxiliares</Link> },
        ],
      },
      {
        type: "group",
        label: "Ciclo de Vida",
        children: [
          { key: "data/import", icon: <ImportOutlined />, label: <Link to="/data/import">Importação</Link> },
          { key: "data/export", icon: <ExportOutlined />, label: <Link to="/data/export">Exportação</Link> },
          { key: "data/backups", icon: <CloudUploadOutlined />, label: <Link to="/data/backups">Backups</Link> },
          { key: "data/restore", icon: <CloudDownloadOutlined />, label: <Link to="/data/restore">Restauração</Link> },
        ],
      },
    ],
  },

  {
    key: "integrations",
    label: <span className='text-white'>Integrações</span>,
    children: [
      {
        type: "group",
        label: "APIs & Eventos",
        children: [
          { key: "int/api-keys", icon: <ApiOutlined />, label: <Link to="/integrations/api-keys">API Keys</Link> },
          { key: "int/webhooks", icon: <BranchesOutlined />, label: <Link to="/integrations/webhooks">Webhooks</Link> },
          { key: "int/providers", icon: <CloudServerOutlined />, label: <Link to="/integrations/providers">Serviços Externos</Link> },
        ],
      },
    ],
  },

  {
    key: "security",
    label: <span className='text-white'>Segurança</span>,
    children: [
      {
        type: "group",
        label: "Políticas & Conformidade",
        children: [
          { key: "sec/sso", icon: <LockOutlined />, label: <Link to="/security/sso">SSO / Identity</Link> },
          { key: "sec/password", icon: <SafetyOutlined />, label: <Link to="/security/password-policy">Políticas de Senha</Link> },
          { key: "sec/privacy", icon: <FileProtectOutlined />, label: <Link to="/security/privacy">Privacidade / LGPD</Link> },
          { key: "sec/sec-logs", icon: <SecurityScanOutlined />, label: <Link to="/security/logs">Logs de Segurança</Link> },
        ],
      },
    ],
  },

  {
    key: "billing",
    label: <span className='text-white'>Plano & Cobrança</span>,
    children: [
      {
        type: "group",
        label: "Financeiro da Plataforma",
        children: [
          { key: "bill/subscription", icon: <DollarCircleOutlined />, label: <Link to="/billing/subscription">Assinatura & Cobrança</Link> },
          { key: "bill/invoices", icon: <AccountBookOutlined />, label: <Link to="/billing/invoices">Faturas</Link> },
          { key: "bill/cost-centers", icon: <AccountBookOutlined />, label: <Link to="/billing/cost-centers">Centros de Custo</Link> },
        ],
      },
    ],
  },
];

//@ts-ignore
const itemsMainMenu: MenuProps['items'] = [

    { key: 1, label: 'Comercial', type: 'group' },
    { key: 2, label: <Link to='/clients'>Clientes</Link>, icon: <TeamOutlined /> },
    { key: 3, label: <Link to='/budgets'>Orçamentos</Link>, icon: <SolutionOutlined /> },
    { key: 4, label: <Link to='/contacts'>Contatos</Link>, icon: <PhoneOutlined /> },
    { key: 5, label: <Link to='/support'>Suporte</Link>, icon: <CustomerServiceOutlined /> },

    { key: 6, label: 'Marketing', type: 'group' },
    { key: 7, label: <Link to='/campaigns'>Campanhas</Link>, icon: <RocketOutlined /> },
    { key: 8, label: <Link to='/socialmedia'>Redes Sociais</Link>, icon: <ShareAltOutlined /> },

    { key: 9, label: 'Propostas', type: 'group' },
    { key: 10, label: <Link to='/fsp'>FSP</Link>, icon: <AppstoreOutlined /> },
    { key: 11, label: <Link to='/services'>Serviços</Link>, icon: <ToolOutlined /> },
    { key: 12, label: <Link to='/proposals'>Propostas</Link>, icon: <FileTextOutlined /> },

    { key: 13, label: 'Execução', type: 'group' },
    { key: 14, label: <Link to='/planning'>Planejamento</Link>, icon: <ProjectOutlined /> },
    { key: 15, label: <Link to='/assembly'>Montagem</Link>, icon: <BuildOutlined /> },
    { key: 16, label: <Link to='/recording'>A Protocolar</Link>, icon: <FileProtectOutlined /> },
    { key: 17, label: <Link to='/protocols'>Protocolos</Link>, icon: <FormOutlined /> },

    { key: 18, label: 'Acompanhamento', type: 'group' },
    { key: 19, label: <Link to='/progress'>Andamento</Link>, icon: <NotificationOutlined /> },
    { key: 20, label: <Link to='/pending'>Pendentes</Link>, icon: <HourglassOutlined /> },
    { key: 21, label: <Link to='/finalized'>Finalizados</Link>, icon: <CheckCircleOutlined /> },

    { key: 22, label: 'Financeiro', type: 'group' },
    { key: 23, label: <Link to='/billing'>Faturamento</Link>, icon: <DollarOutlined /> },
    { key: 24, label: <Link to='/payable'>Contas a Pagar</Link>, icon: <CreditCardOutlined /> },
    { key: 25, label: <Link to='/receivable'>Contas a Receber</Link>, icon: <WalletOutlined /> },

    { key: 26, label: 'Recursos Humanos', type: 'group' },
    { key: 27, label: <Link to='/humanresourcesdepartment'>Departamento Pessoal</Link>, icon: <IdcardOutlined /> },
    { key: 28, label: <Link to='/recruitment'>Recrutamento</Link>, icon: <UserAddOutlined /> },

    { key: 29, label: 'Terceiros', type: 'group' },
    { key: 30, label: <Link to='/suppliers'>Fornecedores</Link>, icon: <ShopOutlined /> },
    { key: 31, label: <Link to='/thirdpartiesservices'>Serviços</Link>, icon: <ToolOutlined /> },
].map(
  (item, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: item.icon,
      label: item.label,
      type: item.type,
      /* children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }), */
    };
  },
);

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 60,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const LayoutApp: React.FC = () => {
	const { Header, Sider } = Layout;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  // estado das notificações
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const handleMarkRead = (id: string) =>
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const handleMarkAll = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const handleClearAll = () =>
    setNotifications([]);

  const handleUserMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      // coloque aqui seu signOut()/clear tokens
      // auth.signOut();
      navigate("/login");
      return;
    }
  };

  // opcional: contagem de notificações vinda do backend
  const unreadNotifications = 7;

  // ... seus itemsMenuHeader, itemsMainMenu, onClick etc.

  return (
    <Layout className="!min-h-screen" >
      <Header style={{ 
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center', }} className='bg-[#217346] h-[60px]'>
				<div className="min-w-[200px] flex justify-center items-center">
					<img src={Logo} alt='Logo SEDI' height={25} className='' />	
				</div>
      <ConfigProvider
        theme={{
          components: {
						Menu: {
							itemHeight: 32
            },
          },
        }}
      >
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['2']}
					items={itemsMenuHeader}
					style={{ flex: 1, minWidth: 0, border: 0,  borderBottom: 0, color: '#fff' }}
					className='bg-transparent text-white
						[&_.ant-menu-item::after]:!border-b-0
						[&_.ant-menu-submenu::after]:!border-b-0
						[&_.ant-menu-item-selected::after]:!border-b-0
						[&_.ant-menu-submenu-selected::after]:!border-b-0
						[&_.ant-menu-item-active::after]:!border-b-0
					'  
				/>
      </ConfigProvider>
				
        {/* AÇÕES RÁPIDAS (lado direito) */}
				<Space size="small" align="center" className="ml-2">
					
          <Tooltip title="Notificações">
            <Badge count={unreadCount} size="small" overflowCount={99}>
              <Button
                type="text"
                shape="circle"
                aria-label="Notificações"
                icon={<BellOutlined className='text-white' />}
                onClick={() => setNotifOpen(true)}
              />
            </Badge>
          </Tooltip>

          <Tooltip title="Configurações rápidas">
            <Button
              type="text"
              shape="circle"
              aria-label="Configurações"
              icon={<SettingOutlined className='text-white' />}
              onClick={() => navigate("/settings/general")}
            />
          </Tooltip>

          {/* MENU DO USUÁRIO */}
          <Dropdown
            trigger={["click"]}
            menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
          >
            <Button type="text" className="ml-1 px-2" aria-label="Abrir menu do usuário">
              <Space size={6} align="center">
                <Avatar size="small" icon={<UserOutlined />} />
                <span className="hidden md:inline text-white">{currentUser.name}</span>
              </Space>
            </Button>
          </Dropdown>
        </Space>

			</Header>
			
      {/* Drawer de Notificações */}
      <NotificationsDrawer
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        data={notifications}
        onMarkRead={handleMarkRead}
        onMarkAll={handleMarkAll}
        onClearAll={handleClearAll}
      />

			<Layout className=''>
				<Sider
					collapsible 
					breakpoint="lg"
					width={200}
					style={siderStyle}>
					<div className='w-full h-12 m-2 bg-emerald-700/70 rounded py-2 px-3 text-[10px] text-white'>
						<Flex gap={1} vertical>
							<Flex justify='space-between'>
								<div>TEMPO REAL</div>
								<div>25 out 2025 - 21h35</div>
							</Flex>
							<Flex justify='space-between'>

								<Tooltip title="Clientes">
									<Space size={2} align="center">
										<SmileOutlined />
										<div>3500</div>
									</Space>
								</Tooltip>

								<Tooltip title="Propostas">
									<Space size={2} align="center">
										<FileTextOutlined />
										<div>3500</div>
									</Space>
								</Tooltip>

								<Tooltip title="Protocolos">
									<Space size={2} align="center">
										<AuditOutlined />
										<div>3500</div>
									</Space>
								</Tooltip>

								<Tooltip title="Faturamento">
									<Space size={2} align="center">
										<DollarOutlined />
										<div>3500</div>
									</Space>
								</Tooltip>

							</Flex>
						</Flex>
					</div>
          <Menu
						mode="inline"
						onClick={onClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ borderInlineEnd: 0 }}
            items={itemsMainMenu}
					className='bg-neutral-100'
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px 220px' }}>
            <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;