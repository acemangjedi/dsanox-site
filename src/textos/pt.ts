// The site's Portuguese text. Every fact here comes from docs/inventario.md.
const pt = {
	seo: {
		home: {
			title: "DS Anox | Tubagem industrial, estruturas metálicas e montagem",
			description:
				"Metalurgia de precisão em Vila Nova de Famalicão: orçamento técnico, pré-fabricação, soldadura, tubagem e montagem industrial em obra.",
		},
		about: {
			title: "Sobre a DS Anox | Metalurgia de precisão em Famalicão",
			description:
				"Quem somos, missão, visão, princípios e política da qualidade da DS Anox, metalúrgica de alta precisão em Louro, Vila Nova de Famalicão.",
		},
		services: {
			title: "Serviços | Pré-fabricação, tubagem e construção industrial",
			description:
				"Consultoria técnica e orçamental, pré-fabricação e construção industrial: maquinação, soldadura, estruturas metálicas, tubagem e manutenção.",
		},
		team: {
			title: "Equipa | Soldadores, tubistas e montadores industriais",
			description:
				"A equipa da DS Anox: especialistas em soldadura, em tubagem industrial e em montagem de estruturas e componentes, em oficina e em obra.",
		},
		contact: {
			title: "Contactos | Pedir orçamento à DS Anox",
			description:
				"Peça um orçamento para o seu projeto industrial: +351 968 782 557, geral@dsanox.com, Rua da Alegria 11, Louro, Vila Nova de Famalicão.",
		},
	},
	nav: {
		label: "Principal",
		menu: "Menu",
		skip: "Saltar para o conteúdo principal",
		home: "DS Anox, início",
		about: "Sobre nós",
		services: "Serviços",
		team: "Equipa",
		contact: "Contactos",
	},
	hero: {
		// The title, a line for each thing the company does.
		lines: ["Tubagem,", "estruturas metálicas", "e montagem industrial."],
		lede: "Da análise técnica e do orçamento à pré-fabricação e à montagem em obra, a DS Anox executa projetos industriais à medida, a partir de Vila Nova de Famalicão.",
		primary: "Pedir orçamento",
		secondary: "Ver serviços",
		alt: "Soldador da DS Anox a unir tubagem em aço numa instalação industrial",
	},
	motto: ["Precisão em cada detalhe.", "Excelência em cada projeto."],
	services: {
		title: "Três áreas, do orçamento à obra",
		more: "Ver os serviços em detalhe",
		intro:
			"Acompanhamos o projeto inteiro ou só a parte de que precisa: o estudo e o orçamento, o fabrico em oficina ou a montagem no local.",
		areas: [
			{
				name: "Consultoria Técnica e Orçamental",
				text: "Análise técnica e orçamental para soluções eficientes e ajustadas a cada projeto.",
				items: [
					"Orçamento técnico",
					"Planeamento eficaz",
					"Execução de qualidade",
				],
				details: [
					"Análise detalhada dos custos de materiais, produção e mão de obra, garantindo uma estimativa rigorosa e transparente.",
					"Organização e coordenação de cada etapa, assegurando uma execução eficiente e dentro dos prazos definidos.",
					"Execução rigorosa, com controlo de custos e cumprimento de prazos, garantindo precisão, consistência e qualidade em cada projeto.",
				],
			},
			{
				name: "Pré-fabricação",
				text: "Produção de componentes e estruturas com rigor, precisão e qualidade.",
				items: [
					"Preparação e maquinação",
					"Soldadura e pré-montagem",
					"Tratamento e proteção de superfícies",
					"Controlo de qualidade",
				],
				details: [
					"Preparação de materiais e componentes através de corte, dobragem, perfuração, fresagem e torneamento, de acordo com as especificações do projeto.",
					"Execução de processos de soldadura e montagem, assegurando o correto posicionamento e preparação dos componentes.",
					"Aplicação de tratamentos de superfície, incluindo jato de areia, pintura e galvanização, garantindo proteção, durabilidade e resistência à corrosão.",
					"Inspeção e controlo rigorosos ao longo do processo, assegurando a conformidade com as especificações técnicas, normas e requisitos do projeto.",
				],
			},
			{
				name: "Construção Industrial",
				text: "Execução de projetos industriais à medida, com precisão e robustez.",
				items: [
					"Estruturas metálicas",
					"Montagem industrial",
					"Sistemas de tubagem",
					"Manutenção industrial",
				],
				details: [
					"Fabrico de estruturas, vigas, pilares e elementos de suporte, com elevado rigor dimensional e qualidade de execução.",
					"Elevação, posicionamento, fixação e soldadura de estruturas em obra, garantindo segurança, precisão e integridade estrutural.",
					"Fabrico e instalação de sistemas de tubagem e condutas industriais, desenvolvidos de acordo com as especificações técnicas de cada projeto.",
					"Serviços de manutenção preventiva e corretiva, orientados para a segurança, fiabilidade e prolongamento da vida útil das instalações.",
				],
			},
		],
	},
	process: {
		title: "Como decorre um projeto",
		steps: [
			{
				name: "Orçamento técnico",
				text: "Analisamos em detalhe os custos de materiais, produção e mão de obra, para uma estimativa rigorosa e transparente.",
			},
			{
				name: "Planeamento",
				text: "Organizamos e coordenamos cada etapa, para executar dentro dos prazos definidos.",
			},
			{
				name: "Pré-fabricação",
				text: "Corte, dobragem, perfuração, fresagem, torneamento e soldadura, de acordo com as especificações do projeto.",
			},
			{
				name: "Proteção de superfícies",
				text: "Jato de areia, pintura e galvanização, para durabilidade e resistência à corrosão.",
			},
			{
				name: "Montagem em obra",
				text: "Elevação, posicionamento, fixação e soldadura das estruturas e da tubagem no local.",
			},
			{
				name: "Controlo de qualidade",
				text: "Inspeção ao longo de todo o processo, contra as especificações técnicas, as normas e os requisitos do projeto.",
			},
		],
	},
	team: {
		title: "Soldadores, tubistas e montadores",
		intro:
			"Dispomos de uma equipa de profissionais qualificados, dedicados à realização do seu projeto.",
		roles: [
			{
				name: "Soldadura",
				text: "Profissionais qualificados na execução de processos de soldadura com elevado rigor e precisão.",
			},
			{
				name: "Tubagem",
				text: "Profissionais especializados no fabrico, montagem e instalação de sistemas de tubagem industrial.",
			},
			{
				name: "Montagem",
				text: "Equipas qualificadas para a montagem e instalação de estruturas e componentes industriais, garantindo segurança e precisão.",
			},
		],
	},
	contact: {
		title: "Vamos falar sobre o seu próximo projeto.",
		formTitle: "Pedir orçamento",
		send: "Enviar pedido",
		text: "Estamos disponíveis para analisar as suas necessidades e desenvolver a solução mais adequada ao seu projeto.",
		phone: "+351 968 782 557",
		email: "geral@dsanox.com",
		address: [
			"Rua da Alegria, 11",
			"4760-530 Louro",
			"Vila Nova de Famalicão, Portugal",
		],
		labels: { phone: "Telefone", email: "Email", address: "Morada" },
	},
	about: {
		title: "Metalurgia de alta precisão, em Vila Nova de Famalicão.",
		paragraphs: [
			"Somos especialistas em metalurgia de alta precisão, desenvolvendo soluções de elevado desempenho para responder aos desafios mais exigentes da indústria.",
			"Aliamos tecnologia avançada, engenharia de precisão e know-how especializado para transformar requisitos complexos em soluções eficientes, robustas e rigorosamente executadas.",
			"Cada projeto é desenvolvido com elevado rigor, assegurando qualidade, consistência e fiabilidade em cada detalhe.",
			"Criamos soluções de engenharia à medida, orientadas para o desempenho, a durabilidade e a excelência, construindo relações de confiança baseadas na qualidade e na inovação.",
		],
		pillars: [
			{
				name: "Missão",
				text: "Desenvolver soluções metalúrgicas de elevado desempenho, assentes na qualidade, tecnologia e excelência do serviço, respondendo de forma eficiente, personalizada e sustentável às necessidades dos nossos clientes.",
			},
			{
				name: "Visão",
				text: "Ser uma referência na metalurgia de precisão, reconhecida pela excelência, inovação, fiabilidade e sustentabilidade, contribuindo para a evolução da indústria através de soluções de elevado valor e desempenho.",
			},
			{
				name: "Princípios",
				text: "Baseamos a nossa atuação na precisão, excelência e inovação, assegurando elevados padrões de qualidade e rigor. Valorizamos a fiabilidade, sustentabilidade e proximidade, construindo relações de confiança e promovendo a melhoria contínua.",
			},
		],
		quality: {
			title: "Política da Qualidade",
			intro: [
				"A DS Anox assume o compromisso de desenvolver a sua atividade com foco na satisfação dos clientes, no cumprimento dos requisitos aplicáveis e na melhoria contínua do seu Sistema de Gestão da Qualidade.",
				"Para o efeito, a empresa compromete-se a:",
			],
			points: [
				"Cumprir com os requisitos dos clientes, os requisitos legais, regulamentares e normativos aplicáveis à atividade;",
				"Assegurar a qualidade dos produtos e serviços prestados, desde a receção de materiais até à entrega e montagem final;",
				"Promover a melhoria contínua dos processos, métodos de trabalho e desempenho do Sistema de Gestão da Qualidade;",
				"Garantir a competência, formação e sensibilização dos colaboradores para o desempenho das suas funções;",
				"Assegurar o planeamento, controlo e monitorização das atividades de produção e montagem;",
				"Promover uma relação de confiança com clientes, fornecedores e restantes partes interessadas;",
				"Incentivar a prevenção de erros, não conformidades e desperdícios;",
				"Disponibilizar os recursos humanos, técnicos e organizacionais necessários ao bom funcionamento da empresa.",
			],
		},
	},
	servicesPage: {
		title: "Do orçamento técnico à montagem em obra.",
	},
	teamPage: {
		title: "Soldadores, tubistas e montadores.",
	},
	cta: {
		title: "Tem um projeto para orçamentar?",
		button: "Pedir orçamento",
	},
	thanks: {
		seoTitle: "Mensagem enviada | DS Anox",
		title: "Recebemos o seu pedido.",
		text: "Vamos analisá-lo e responder para o email que indicou.",
		back: "Voltar ao início",
	},
	notFound: {
		seoTitle: "Página não encontrada | DS Anox",
		title: "Esta página não existe.",
		text: "Pode ter sido movida ou o endereço está errado.",
		back: "Voltar ao início",
	},
	footer: {
		line: "Metalurgia de alta precisão",
		privacy: "Política de privacidade",
		cookies: "Política de cookies",
		terms: "Termos e condições",
		legal: "Informação legal",
	},
	alts: {
		pipes:
			"Tubagem industrial em aço instalada no interior de uma unidade fabril",
		plant:
			"Instalação industrial com estruturas metálicas e tubagem montadas em obra",
		weld: "Soldador a trabalhar numa conduta de grande diâmetro",
		outside: "Tubagem exterior ligada a um reservatório industrial",
		skid: "Unidade pré-fabricada com reservatórios, plataforma e escada de acesso",
	},
};

export type Textos = typeof pt;
export default pt;
