import type { Textos } from "./pt";

// The site's English text. The company's own English (commercial presentation) where it
// exists; the quality policy and the legal pages are translations, for the client to review.
const en: Textos = {
	seo: {
		home: {
			title: "DS Anox | Industrial piping, steel structures and assembly",
			description:
				"Precision metalwork from northern Portugal: technical estimates, prefabrication, welding, industrial piping and on-site assembly.",
		},
		about: {
			title: "About DS Anox | Precision metalwork from Portugal",
			description:
				"Who we are, our mission, vision, principles and quality policy. DS Anox is a high-precision metalworking company in Vila Nova de Famalicão, Portugal.",
		},
		services: {
			title: "Services | Prefabrication, piping, industrial construction",
			description:
				"Technical and budget consulting, prefabrication and industrial construction: machining, welding, steel structures, piping systems and maintenance.",
		},
		team: {
			title: "Team | Welders, pipefitters and industrial assemblers",
			description:
				"The DS Anox team: specialists in welding, in industrial piping and in the assembly of structures and components, in the workshop and on site.",
		},
		contact: {
			title: "Contact | Request a quote from DS Anox",
			description:
				"Request a quote for your industrial project: +351 968 782 557, geral@dsanox.com, Rua da Alegria 11, Louro, Vila Nova de Famalicão, Portugal.",
		},
	},
	nav: {
		label: "Main",
		menu: "Menu",
		skip: "Skip to main content",
		home: "DS Anox, home",
		about: "About",
		services: "Services",
		team: "Team",
		contact: "Contact",
	},
	hero: {
		lines: ["Industrial piping,", "steel structures", "and on⁠-⁠site assembly."],
		lede: "From technical analysis and estimate to prefabrication and assembly on site, DS Anox delivers custom industrial projects from Vila Nova de Famalicão, Portugal.",
		primary: "Request a quote",
		secondary: "See our services",
		alt: "DS Anox welder joining steel pipework in an industrial plant",
	},
	motto: ["Precision in every detail.", "Excellence in every project."],
	services: {
		title: "Three areas, from estimate to site",
		more: "See the services in detail",
		intro:
			"We take on the whole project or only the part you need: the study and the estimate, fabrication in the workshop or assembly on site.",
		areas: [
			{
				name: "Technical and Budget Consulting",
				text: "Material, production and labour costs analysed in detail, and every stage planned before work begins.",
				items: [
					"Technical estimate",
					"Effective planning",
					"High-quality execution",
				],
				details: [
					"A detailed analysis of material, production and labour costs, for an accurate and transparent estimate.",
					"Organisation and coordination of each stage, for efficient execution within the agreed deadlines.",
					"Rigorous execution, with cost control and adherence to deadlines, ensuring precision, consistency and quality in every project.",
				],
			},
			{
				name: "Prefabrication",
				text: "Cutting, bending, drilling, milling, turning and welding in the workshop, with surface protection and quality control.",
				items: [
					"Preparation and machining",
					"Welding and pre⁠-⁠assembly",
					"Surface treatment and protection",
					"Quality control",
				],
				details: [
					"Preparation of materials and components by cutting, bending, drilling, milling and turning, in accordance with the project specifications.",
					"Welding and assembly processes, ensuring that components are correctly positioned and prepared.",
					"Surface treatments, including sandblasting, painting and galvanising, for protection, durability and corrosion resistance.",
					"Rigorous inspection and monitoring throughout the process, ensuring compliance with technical specifications, standards and project requirements.",
				],
			},
			{
				name: "Industrial Construction",
				text: "Structures, beams and columns, piping and ductwork systems, assembled and welded on site, and the maintenance of the facilities.",
				items: [
					"Steel structures",
					"Industrial assembly",
					"Piping systems",
					"Industrial maintenance",
				],
				details: [
					"Manufacturing of structures, beams, columns and support elements, with high dimensional accuracy and quality of workmanship.",
					"Lifting, positioning, securing and welding of structures on site, ensuring safety, precision and structural integrity.",
					"Manufacture and installation of industrial piping and ductwork systems, designed to the technical specifications of each project.",
					"Preventive and corrective maintenance, focused on safety, reliability and extending the service life of the facilities.",
				],
			},
		],
	},
	process: {
		title: "How a project runs",
		steps: [
			{
				name: "Technical estimate",
				text: "We analyse material, production and labour costs in detail, for an accurate and transparent estimate.",
			},
			{
				name: "Planning",
				text: "We organise and coordinate each stage, to deliver within the agreed deadlines.",
			},
			{
				name: "Prefabrication",
				text: "Cutting, bending, drilling, milling, turning and welding, in accordance with the project specifications.",
			},
			{
				name: "Surface protection",
				text: "Sandblasting, painting and galvanising, for durability and corrosion resistance.",
			},
			{
				name: "Assembly on site",
				text: "Lifting, positioning, securing and welding of the structures and the pipework on site.",
			},
			{
				name: "Quality control",
				text: "Inspection throughout the process, against the technical specifications, the standards and the project requirements.",
			},
		],
	},
	team: {
		title: "Welders, pipefitters and assemblers",
		intro:
			"We have a team of qualified professionals, dedicated to carrying out your project.",
		roles: [
			{
				name: "Welding",
				text: "Professionals qualified to carry out welding processes with a high degree of rigour and precision.",
			},
			{
				name: "Piping",
				text: "Professionals specialised in the fabrication, assembly and installation of industrial piping systems.",
			},
			{
				name: "Assembly",
				text: "Teams qualified to assemble and install industrial structures and components, ensuring safety and precision.",
			},
		],
	},
	contact: {
		title: "Let's talk about your next project.",
		formTitle: "Request a quote",
		send: "Send request",
		text: "We are here to assess your needs and develop the solution that best fits your project.",
		phone: "+351 968 782 557",
		email: "geral@dsanox.com",
		address: [
			"Rua da Alegria, 11",
			"4760-530 Louro",
			"Vila Nova de Famalicão, Portugal",
		],
		labels: { phone: "Phone", email: "Email", address: "Address" },
		map: "View on the map",
	},
	about: {
		title: "High-precision metalwork, from Vila Nova de Famalicão.",
		paragraphs: [
			"We specialise in high-precision metalworking, developing high-performance solutions to meet the industry's most demanding challenges.",
			"We combine advanced technology, precision engineering and specialised expertise to transform complex requirements into efficient, robust and meticulously executed solutions.",
			"Each project is developed with the utmost rigour, ensuring quality, consistency and reliability in every detail.",
			"We create customised engineering solutions focused on performance, durability and excellence, building relationships of trust based on quality and innovation.",
		],
		bodyTitle: "From a complex requirement to the finished solution.",
		pillarsTitle: "What guides us",
		pillars: [
			{
				name: "Mission",
				text: "To develop high-performance metallurgical solutions based on quality, technology and service excellence, responding to our customers' needs in an efficient, personalised and sustainable manner.",
			},
			{
				name: "Vision",
				text: "To be a reference in precision metallurgy, recognised for excellence, innovation, reliability and sustainability, contributing to the industry's advancement through high-value, high-performance solutions.",
			},
			{
				name: "Principles",
				text: "We base our work on precision, excellence and innovation, ensuring high standards of quality and rigour. We value reliability, sustainability and closeness, building relationships of trust and promoting continuous improvement.",
			},
		],
		quality: {
			title: "Quality Policy",
			intro: [
				"DS Anox is committed to carrying out its activity with a focus on customer satisfaction, on compliance with the applicable requirements and on the continuous improvement of its Quality Management System.",
				"To this end, the company undertakes to:",
			],
			points: [
				"Comply with customer requirements and with the legal, regulatory and normative requirements applicable to its activity;",
				"Ensure the quality of the products and services provided, from the receipt of materials to delivery and final assembly;",
				"Promote the continuous improvement of processes, working methods and the performance of the Quality Management System;",
				"Guarantee the competence, training and awareness of employees in the performance of their duties;",
				"Ensure the planning, control and monitoring of production and assembly activities;",
				"Foster a relationship of trust with customers, suppliers and other interested parties;",
				"Encourage the prevention of errors, non-conformities and waste;",
				"Provide the human, technical and organisational resources needed for the company to run well.",
			],
			note: "Translation of the Portuguese original, which prevails.",
		},
	},
	servicesPage: {
		title: "From technical estimate to assembly on site.",
		see: "See this area",
		others: "The other areas",
		all: "All services",
		areas: [
			{
				seoTitle: "Technical and budget consulting for industrial projects",
				seoDescription:
					"A technical estimate with material, production and labour costs, planning of every stage and execution with control of costs and deadlines.",
				title: "Technical estimates and planning for industrial projects.",
				intro:
					"Before work begins, we analyse material, production and labour costs and plan every stage. The estimate you receive is accurate and transparent, and the deadlines are set from the start.",
			},
			{
				seoTitle: "Prefabrication of steel components and structures",
				seoDescription:
					"Cutting, bending, drilling, milling, turning, welding and pre-assembly in the workshop, with surface treatment and quality control.",
				title: "Prefabrication of steel components and structures.",
				intro:
					"We prepare and machine the materials, weld and pre-assemble the components and protect the surfaces against corrosion. Every part is inspected against the specifications, the standards and the project requirements.",
			},
			{
				seoTitle: "Industrial construction: structures, piping, assembly",
				seoDescription:
					"Manufacturing of steel structures, industrial assembly on site, piping and ductwork systems, and preventive and corrective maintenance of facilities.",
				title: "Steel structures, piping and industrial assembly on site.",
				intro:
					"We manufacture structures, beams and columns; we lift, position and weld on site; we install piping and ductwork systems; and we carry out preventive and corrective maintenance of the facilities.",
			},
		],
	},
	teamPage: {
		title: "Welders, pipefitters and assemblers.",
	},
	cta: {
		title: "Have a project to quote?",
		button: "Request a quote",
	},
	thanks: {
		seoTitle: "Message sent | DS Anox",
		title: "We have received your request.",
		text: "We will look into it and reply to the email address you gave us.",
		call: "For anything urgent, call",
		back: "Back to the home page",
	},
	notFound: {
		seoTitle: "Page not found | DS Anox",
		title: "This page does not exist.",
		text: "It may have been moved, or the address is wrong.",
		back: "Back to the home page",
	},
	footer: {
		line: "Industrial piping, steel structures and on⁠-⁠site assembly.",
		rights: "All rights reserved.",
		privacy: "Privacy policy",
		cookies: "Cookie policy",
		terms: "Terms and conditions",
		legal: "Legal information",
	},
	alts: {
		pipes: "Industrial steel pipework installed inside a manufacturing plant",
		plant:
			"Industrial plant with steel structures and pipework assembled on site",
		weld: "Welder working on a large-diameter duct",
		outside: "Outdoor pipework connected to an industrial tank",
		skid: "Prefabricated unit with tanks, a platform and an access ladder",
		hall: "Industrial hall with a large-diameter duct hung from the roof",
		lift: "Lifting platform at work under a steel structure being assembled",
		scaffold:
			"DS Anox technician on scaffolding, next to a large-diameter duct",
		heights: "Welder working at height, between lines of steel pipework",
		close: "Welder in a mask welding a steel part, seen from close up",
		tank: "Steel pipework running around the top of an outdoor tank",
	},
	legal: {
		updated: "Last updated: November 2026",
		privacy: {
			title: "Privacy policy",
			description:
				"How DS Anox handles the personal data it receives through this site's contact form, under the GDPR, and how you can exercise your rights.",
			sections: [
				{
					h: "Who we are",
					p: [
						"The data controller is DS Anox, with registered office at Rua da Alegria, 11, 4760-530 Louro, Vila Nova de Famalicão, Portugal. For any question about this policy, write to geral@dsanox.com.",
					],
				},
				{
					h: "What data we collect",
					ul: [
						"The name, email address and phone number you send us in the form;",
						"The message you write;",
						"The source of your visit, when you arrive through a campaign link;",
						"Basic technical data (IP address, browser type), for security.",
					],
				},
				{
					h: "What we use the data for",
					p: [
						"To answer your request and, where relevant, prepare a quote. We do not send advertising without your consent and we do not sell data to third parties.",
					],
				},
				{
					h: "Legal basis",
					p: [
						"The consent you give when you send the form, and our legitimate interest in the security of the site.",
					],
				},
				{
					h: "How long we keep it",
					p: [
						"Contact requests are kept for two years after the last contact.",
					],
				},
				{
					h: "Your rights",
					p: [
						"You may ask for access to your data, and for its correction, erasure, restriction or portability, and withdraw your consent at any time, by writing to geral@dsanox.com. You may also lodge a complaint with the Portuguese data protection authority, the Comissão Nacional de Proteção de Dados (cnpd.pt).",
					],
				},
				{
					h: "Processors",
					p: [
						"We use a hosting service for the site and a service to manage contact requests, both subject to the GDPR.",
					],
				},
			],
		},
		cookies: {
			title: "Cookie policy",
			description:
				"Which cookies the DS Anox site uses, what they are for and how you can change your choice at any time.",
			sections: [
				{
					h: "What cookies are",
					p: [
						"They are small files stored in your browser, which let a site remember choices or measure visits.",
					],
				},
				{
					h: "Which cookies we use",
					ul: [
						"Necessary: they store your choice about cookies. They need no consent.",
						"Analytics: tools that measure visits (Google Analytics and Microsoft Clarity), loaded only after you accept them.",
					],
				},
				{
					h: "How to change your choice",
					p: [
						"Use the “Cookie settings” link at the foot of every page. You can also delete cookies in your browser settings.",
					],
				},
			],
		},
		terms: {
			title: "Terms and conditions",
			description:
				"Conditions of use of the DS Anox site: the nature of the information published, ownership of text and images, and the applicable law.",
			sections: [
				{
					h: "Use of the site",
					p: [
						"The content of this site is for information and is not a contractual offer. The conditions of each job are agreed in writing, in the quote.",
					],
				},
				{
					h: "Intellectual property",
					p: [
						"The text and images belong to DS Anox, unless stated otherwise, and may not be reproduced without permission.",
					],
				},
				{
					h: "Applicable law",
					p: [
						"This site is governed by Portuguese law. In the event of a dispute, consumers may turn to an alternative consumer dispute resolution body (consumidor.gov.pt).",
					],
				},
			],
		},
	},
};

export default en;
