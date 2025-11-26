import dayjs from "dayjs";

export const mockInitialValues = {
	// STATUS / SITUAÇÃO
	status: "Em execução",
	situation: "Criada",

	// DADOS DA OS
	numeroOS: "OS-2025-0001",
	sediUnit: "SP",
	requestDate: dayjs("2025-01-10"),
	dataAprovTexto: dayjs("2025-01-15"),
	origem: "Portal do Cliente",
	tipo: "Renovação de licenças",
	startTime: dayjs("2025-01-20"),
	endTime: dayjs("2025-03-01"),
	prazoConclusao: [dayjs("2025-02-20"), dayjs("2025-03-01")],
	numeroPOP: "POP-AVCB-001",

	// CLIENTE (ABA OS + DRAWER CLIENTE)
	isMatriz: true,
	cnpjMatriz: "12.345.678/0001-90",
	cnpjFilial: undefined,
	requestorName: "João Silva",
	requestEmail: "joao.silva@cliente.com",

	company: "Cliente Exemplo S/A",
	corporateName: "Cliente Exemplo Serviços Gerais S/A",
	corporateisMatriz: true,
	corporateCNPJMatriz: "12.345.678/0001-90",
	corporateCNPJFilial: undefined,

	phone: "(11) 99999-9999",
	email: "contato@cliente.com",
	contactName: "Maria Souza",
	department: "Facilities",
	address: "Av. Paulista, 1000 - Bela Vista",
	cep: "01310-100",
	state: "SP",
	cityUF: "São Paulo/SP",

	// AVALIAÇÃO / DETALHES
	grauDificuldade: "Alta",
	grauUrgencia: "Média",
	impactoSeNaoResolver: "Risco de interdição pelo Corpo de Bombeiros",
	alternativaSedi: "Concorrente XYZ",
	capacidadeFinanceira: "Boa",
	previsaoGastosTransporte: "R$ 2.000,00",
	previsaoGastosViagem: "R$ 3.500,00",
	gastosTerceiros: "R$ 5.000,00",
	previsaoGastosTaxas: "R$ 4.200,00",
	sugestaoHonorarios: "R$ 18.000,00",
	montagemProcesso: "Responsabilidade SÉDI",
	acompanhamento: "Online e presencial",
	permanenciaOrgao: "2 dias úteis",
	especialista: "Eng. Carlos Pereira",
	visitaInLoco: "Visita realizada em 05/01/2025. Necessária adequação de sinalização e rotas de fuga.",
	outrasAtividades: "Treinamento de brigada de incêndio e revisão do plano de emergência.",

	// FATURAMENTO (GERAL / RESUMO)
	billingCnpj: "12.345.678/0001-90",
	billing: {
		inscricaoEstadual: "123.456.789.012",
		enderecoFaturamento: "Av. Paulista, 1000 - 10º andar - São Paulo/SP",
		condicaoPagamento: "30d",
		meioPagamento: "boleto",
		valorTotal: 28000,
		observacoes: "Faturar integral após emissão das licenças.",
	},
	responsavel: "Ana Oliveira",

	// SERVIÇOS + PROCESSOS (COM SIMULAÇÃO)
	services: [
		{
			serviceName: "Renovação de AVCB (Auto de Vistoria do Corpo de Bombeiros)",
			address: "Av. Paulista, 1000 - São Paulo/SP",
			observacoes:
				"Adequar extintores e iluminação de emergência conforme norma.",
			processes: [
				{
					processo: "Renovação AVCB - Matriz",
					execucao: "Levantamento técnico, protocolo, acompanhamento até emissão",
					orgao: "Corpo de Bombeiros - SP",
					valor: 18000,
					status: "Em execução",
					upload: "Alvará dos Bombeiros",
					observacoes: "Vistoria agendada para 20/02/2025.",
					timeline: [
						{
							createdAt: dayjs().subtract(7, "day"),
							description: "Solicitação recebida do cliente.",
							status: "Concluído",
							finishedAt: dayjs().subtract(6, "day"),
						},
						{
							createdAt: dayjs().subtract(5, "day"),
							description: "Documentos conferidos e checklist enviado ao cliente.",
							status: "Em andamento",
						},
						{
							createdAt: dayjs().subtract(2, "day"),
							description: "Vistoria agendada com o Corpo de Bombeiros.",
							status: "Pendente",
						},
					],
				},
				{
					processo: "Treinamento de Brigada de Incêndio",
					execucao: "Treinamento teórico e prático",
					orgao: "Corpo de Bombeiros - SP",
					valor: 10000,
					status: "Não iniciada",
					upload: "Alvará dos Bombeiros",
					observacoes: "Programar após emissão do AVCB.",
					timeline: [
						{
							createdAt: dayjs().subtract(10, "day"),
							description: "Levantamento de número de colaboradores elegíveis.",
							status: "Concluído",
							finishedAt: dayjs().subtract(9, "day"),
						},
						{
							createdAt: dayjs().subtract(4, "day"),
							description: "Proposta de datas enviada ao cliente.",
							status: "Aguardando",
						},
						{
							createdAt: dayjs().subtract(1, "day"),
							description: "Aguardando confirmação de datas pelo cliente.",
							status: "Pendente",
						},
					],
				},
			],
		},
	],

	// DOCUMENTOS / REPOSITÓRIO
	documents: [
		{
			nome: "Alvará de Funcionamento - Matriz",
			orgao: "Prefeitura de São Paulo",
			dataEmissao: "2024-02-15",
			dataValidade: "2025-02-14",
			valor: 0,
			arquivos: ["alvara_matriz.pdf"],
			observacao: "Válido para a unidade matriz.",
		},
		{
			nome: "AVCB Anterior",
			orgao: "Corpo de Bombeiros - SP",
			dataEmissao: "2022-03-10",
			dataValidade: "2025-03-10",
			valor: 0,
			arquivos: ["avcb_2022.pdf"],
			observacao: "Licença atual, em processo de renovação.",
		},
	],
};
