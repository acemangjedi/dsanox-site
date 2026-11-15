import type { Textos } from "./pt";

// The site's French text. The company's own French (commercial presentation) where it
// exists; the quality policy and the legal pages are translations, for the client to review.
const fr: Textos = {
	seo: {
		home: {
			title: "DS Anox | Tuyauterie industrielle et charpente métallique",
			description:
				"Métallurgie de précision : devis technique, préfabrication, soudage, tuyauterie industrielle, structures métalliques et montage sur chantier.",
		},
		about: {
			title: "À propos de DS Anox | Métallurgie de haute précision",
			description:
				"Qui nous sommes, notre mission, notre vision, nos principes et notre politique qualité. DS Anox, métallurgie de haute précision à Vila Nova de Famalicão.",
		},
		services: {
			title: "Services | Préfabrication, tuyauterie, montage industriel",
			description:
				"Conseil technique et budgétaire, préfabrication et construction industrielle : usinage, soudage, structures métalliques, tuyauterie et maintenance.",
		},
		team: {
			title: "Équipe | Soudeurs, tuyauteurs et monteurs industriels",
			description:
				"L'équipe DS Anox : des spécialistes du soudage, de la tuyauterie industrielle et du montage de structures et de composants, en atelier et sur chantier.",
		},
		contact: {
			title: "Contact | Demander un devis à DS Anox",
			description:
				"Demandez un devis pour votre projet industriel : +33 7 49 25 82 38, geral@dsanox.com, Rua da Alegria 11, Louro, Vila Nova de Famalicão, Portugal.",
		},
	},
	nav: {
		label: "Principale",
		menu: "Menu",
		skip: "Aller au contenu principal",
		home: "DS Anox, accueil",
		about: "À propos",
		services: "Services",
		team: "Équipe",
		contact: "Contact",
	},
	hero: {
		lines: ["Tuyauterie,", "charpente métallique", "et montage industriel."],
		lede: "De l'analyse technique et du devis à la préfabrication et au montage sur chantier, DS Anox réalise des projets industriels sur mesure, depuis Vila Nova de Famalicão, au Portugal.",
		primary: "Demander un devis",
		secondary: "Voir les services",
		alt: "Soudeur de DS Anox assemblant une tuyauterie en acier dans une installation industrielle",
	},
	motto: [
		"La précision dans chaque détail.",
		"L'excellence dans chaque projet.",
	],
	services: {
		title: "Trois métiers, du devis au chantier",
		more: "Voir les services en détail",
		intro:
			"Nous prenons en charge le projet entier ou seulement la partie dont vous avez besoin : l'étude et le devis, la fabrication en atelier ou le montage sur site.",
		areas: [
			{
				name: "Conseil Technique et Budgétaire",
				text: "Les coûts des matériaux, de la production et de la main-d'œuvre analysés en détail, et chaque étape planifiée avant de commencer.",
				items: [
					"Devis technique",
					"Planification efficace",
					"Exécution de qualité",
				],
				details: [
					"Analyse détaillée des coûts des matériaux, de la production et de la main-d'œuvre, pour un devis précis et transparent.",
					"Organisation et coordination de chaque étape, pour une exécution efficace et dans les délais fixés.",
					"Une exécution rigoureuse, avec la maîtrise des coûts et le respect des délais, garantissant précision, cohérence et qualité dans chaque projet.",
				],
			},
			{
				name: "Préfabrication",
				text: "Découpe, pliage, perçage, fraisage, tournage et soudage en atelier, avec protection des surfaces et contrôle qualité.",
				items: [
					"Préparation et usinage",
					"Soudage et pré‑assemblage",
					"Traitement et protection des surfaces",
					"Contrôle qualité",
				],
				details: [
					"Préparation des matériaux et des composants par découpe, pliage, perçage, fraisage et tournage, conformément aux spécifications du projet.",
					"Réalisation des opérations de soudage et d'assemblage, en veillant au positionnement et à la préparation corrects des composants.",
					"Application de traitements de surface, notamment le sablage, la peinture et la galvanisation, pour la protection, la durabilité et la résistance à la corrosion.",
					"Une inspection et un contrôle rigoureux tout au long du processus, garantissant le respect des spécifications techniques, des normes et des exigences du projet.",
				],
			},
			{
				name: "Construction Industrielle",
				text: "Structures, poutres et poteaux, systèmes de tuyauterie et de conduites, montés et soudés sur chantier, et la maintenance des installations.",
				items: [
					"Structures métalliques",
					"Montage industriel",
					"Systèmes de tuyauterie",
					"Maintenance industrielle",
				],
				details: [
					"Fabrication de structures, de poutres, de poteaux et d'éléments de soutien, avec une grande précision dimensionnelle et une grande qualité d'exécution.",
					"Levage, mise en place, fixation et soudage de structures sur chantier, en garantissant la sécurité, la précision et l'intégrité structurelle.",
					"Fabrication et installation de systèmes de tuyauterie et de conduites industrielles, conçus conformément aux spécifications techniques de chaque projet.",
					"Services de maintenance préventive et corrective, axés sur la sécurité, la fiabilité et la prolongation de la durée de vie des installations.",
				],
			},
		],
	},
	process: {
		title: "Le déroulement d'un projet",
		steps: [
			{
				name: "Devis technique",
				text: "Nous analysons en détail les coûts des matériaux, de la production et de la main-d'œuvre, pour un devis précis et transparent.",
			},
			{
				name: "Planification",
				text: "Nous organisons et coordonnons chaque étape, pour livrer dans les délais fixés.",
			},
			{
				name: "Préfabrication",
				text: "Découpe, pliage, perçage, fraisage, tournage et soudage, conformément aux spécifications du projet.",
			},
			{
				name: "Protection des surfaces",
				text: "Sablage, peinture et galvanisation, pour la durabilité et la résistance à la corrosion.",
			},
			{
				name: "Montage sur chantier",
				text: "Levage, mise en place, fixation et soudage des structures et de la tuyauterie sur site.",
			},
			{
				name: "Contrôle qualité",
				text: "Une inspection tout au long du processus, au regard des spécifications techniques, des normes et des exigences du projet.",
			},
		],
	},
	team: {
		title: "Soudeurs, tuyauteurs et monteurs",
		intro:
			"Nous disposons d'une équipe de professionnels qualifiés, dédiés à la réalisation de votre projet.",
		roles: [
			{
				name: "Soudage",
				text: "Des professionnels qualifiés dans la mise en œuvre de procédés de soudage avec une grande rigueur et une grande précision.",
			},
			{
				name: "Tuyauterie",
				text: "Des professionnels spécialisés dans la fabrication, le montage et l'installation de systèmes de tuyauterie industrielle.",
			},
			{
				name: "Montage",
				text: "Des équipes qualifiées pour le montage et l'installation de structures et de composants industriels, garantissant sécurité et précision.",
			},
		],
	},
	contact: {
		title: "Parlons de votre prochain projet.",
		formTitle: "Demander un devis",
		send: "Envoyer la demande",
		text: "Nous sommes à votre disposition pour analyser vos besoins et élaborer la solution la mieux adaptée à votre projet.",
		phone: "+33 7 49 25 82 38",
		email: "geral@dsanox.com",
		address: [
			"Rua da Alegria, 11",
			"4760-530 Louro",
			"Vila Nova de Famalicão, Portugal",
		],
		labels: { phone: "Téléphone", email: "E-mail", address: "Adresse" },
		map: "Voir sur la carte",
	},
	about: {
		title: "Métallurgie de haute précision à Vila Nova de Famalicão.",
		paragraphs: [
			"Nous sommes spécialisés dans la métallurgie de haute précision et développons des solutions hautement performantes pour répondre aux défis les plus exigeants de l'industrie.",
			"Nous allions technologie de pointe, ingénierie de précision et savoir-faire spécialisé pour transformer des exigences complexes en solutions efficaces, robustes et rigoureusement mises en œuvre.",
			"Chaque projet est développé avec une grande rigueur, garantissant qualité, cohérence et fiabilité dans les moindres détails.",
			"Nous créons des solutions d'ingénierie sur mesure, axées sur la performance, la durabilité et l'excellence, en établissant des relations de confiance fondées sur la qualité et l'innovation.",
		],
		bodyTitle: "De l'exigence complexe à la solution réalisée.",
		pillarsTitle: "Mission, vision et principes",
		pillars: [
			{
				name: "Mission",
				text: "Développer des solutions métallurgiques hautement performantes, fondées sur la qualité, la technologie et l'excellence du service, afin de répondre de manière efficace, personnalisée et durable aux besoins de nos clients.",
			},
			{
				name: "Vision",
				text: "Être une référence dans le domaine de la métallurgie de précision, reconnue pour son excellence, son innovation, sa fiabilité et son développement durable, et contribuer à l'évolution de l'industrie grâce à des solutions à forte valeur ajoutée et hautement performantes.",
			},
			{
				name: "Principes",
				text: "Nous fondons notre action sur la précision, l'excellence et l'innovation, en garantissant des normes élevées de qualité et de rigueur. Nous accordons une grande importance à la fiabilité, à la durabilité et à la proximité, en établissant des relations de confiance et en favorisant l'amélioration continue.",
			},
		],
		quality: {
			title: "Politique Qualité",
			intro: [
				"DS Anox s'engage à exercer son activité en plaçant au premier plan la satisfaction de ses clients, le respect des exigences applicables et l'amélioration continue de son Système de Management de la Qualité.",
				"À cette fin, l'entreprise s'engage à :",
			],
			points: [
				"Respecter les exigences des clients ainsi que les exigences légales, réglementaires et normatives applicables à son activité ;",
				"Assurer la qualité des produits et des services fournis, de la réception des matériaux à la livraison et au montage final ;",
				"Promouvoir l'amélioration continue des processus, des méthodes de travail et de la performance du Système de Management de la Qualité ;",
				"Garantir la compétence, la formation et la sensibilisation des collaborateurs à l'exercice de leurs fonctions ;",
				"Assurer la planification, la maîtrise et le suivi des activités de production et de montage ;",
				"Entretenir une relation de confiance avec les clients, les fournisseurs et les autres parties intéressées ;",
				"Encourager la prévention des erreurs, des non-conformités et des gaspillages ;",
				"Mettre à disposition les ressources humaines, techniques et organisationnelles nécessaires au bon fonctionnement de l'entreprise.",
			],
			note: "Traduction de l'original portugais, qui fait foi.",
		},
	},
	servicesPage: {
		title: "Du devis technique au montage sur chantier.",
	},
	teamPage: {
		title: "Soudeurs, tuyauteurs et monteurs.",
	},
	cta: {
		title: "Un projet à chiffrer ?",
		button: "Demander un devis",
	},
	thanks: {
		seoTitle: "Message envoyé | DS Anox",
		title: "Nous avons bien reçu votre demande.",
		text: "Nous allons l'étudier et vous répondre à l'adresse e-mail indiquée.",
		call: "Pour une urgence, appelez le",
		back: "Retour à l'accueil",
	},
	notFound: {
		seoTitle: "Page introuvable | DS Anox",
		title: "Cette page n'existe pas.",
		text: "Elle a peut-être été déplacée, ou l'adresse est erronée.",
		back: "Retour à l'accueil",
	},
	footer: {
		line: "Tuyauterie, charpente métallique et montage industriel.",
		rights: "Tous droits réservés.",
		privacy: "Politique de confidentialité",
		cookies: "Politique de cookies",
		terms: "Conditions générales",
		legal: "Informations légales",
	},
	alts: {
		pipes:
			"Tuyauterie industrielle en acier installée à l'intérieur d'une usine",
		plant:
			"Installation industrielle avec structures métalliques et tuyauterie montées sur chantier",
		weld: "Soudeur travaillant sur une conduite de grand diamètre",
		outside: "Tuyauterie extérieure raccordée à un réservoir industriel",
		skid: "Unité préfabriquée avec réservoirs, plateforme et échelle d'accès",
		hall: "Halle industrielle avec une conduite de grand diamètre suspendue à la toiture",
		lift: "Nacelle élévatrice en service sous une structure métallique en cours de montage",
		scaffold:
			"Technicien de DS Anox sur un échafaudage, près d'une conduite de grand diamètre",
		heights:
			"Soudeur travaillant en hauteur, entre des lignes de tuyauterie en acier",
		close: "Soudeur masqué soudant une pièce en acier, vu de près",
		tank: "Tuyauterie en acier longeant le sommet d'un réservoir extérieur",
	},
	legal: {
		updated: "Dernière mise à jour : novembre 2026",
		privacy: {
			title: "Politique de confidentialité",
			description:
				"Comment DS Anox traite les données personnelles reçues par le formulaire de contact de ce site, conformément au RGPD, et comment exercer vos droits.",
			sections: [
				{
					h: "Qui sommes-nous",
					p: [
						"Le responsable du traitement est DS Anox, dont le siège se trouve Rua da Alegria, 11, 4760-530 Louro, Vila Nova de Famalicão, Portugal. Pour toute question sur cette politique, écrivez à geral@dsanox.com.",
					],
				},
				{
					h: "Les données que nous collectons",
					ul: [
						"Le nom, l'adresse e-mail et le numéro de téléphone que vous nous envoyez par le formulaire ;",
						"Le message que vous rédigez ;",
						"L'origine de votre visite, lorsque vous arrivez par un lien de campagne ;",
						"Des données techniques de base (adresse IP, type de navigateur), à des fins de sécurité.",
					],
				},
				{
					h: "L'usage que nous en faisons",
					p: [
						"Répondre à votre demande et, le cas échéant, préparer un devis. Nous n'envoyons pas de publicité sans votre consentement et nous ne vendons aucune donnée à des tiers.",
					],
				},
				{
					h: "Base légale",
					p: [
						"Le consentement que vous donnez en envoyant le formulaire, et notre intérêt légitime à assurer la sécurité du site.",
					],
				},
				{
					h: "Durée de conservation",
					p: [
						"Les demandes de contact sont conservées deux ans après le dernier contact.",
					],
				},
				{
					h: "Vos droits",
					p: [
						"Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation de leur traitement ou leur portabilité, et retirer votre consentement à tout moment, en écrivant à geral@dsanox.com. Vous pouvez aussi introduire une réclamation auprès de l'autorité portugaise de protection des données, la Comissão Nacional de Proteção de Dados (cnpd.pt).",
					],
				},
				{
					h: "Sous-traitants",
					p: [
						"Nous faisons appel à un service d'hébergement du site et à un service de gestion des demandes de contact, tous deux soumis au RGPD.",
					],
				},
			],
		},
		cookies: {
			title: "Politique de cookies",
			description:
				"Quels cookies le site de DS Anox utilise, à quoi ils servent et comment modifier votre choix à tout moment.",
			sections: [
				{
					h: "Ce que sont les cookies",
					p: [
						"Ce sont de petits fichiers enregistrés dans votre navigateur, qui permettent à un site de retenir des choix ou de mesurer les visites.",
					],
				},
				{
					h: "Les cookies que nous utilisons",
					ul: [
						"Nécessaires : ils enregistrent votre choix concernant les cookies. Ils ne demandent pas de consentement.",
						"Mesure d'audience : des outils de mesure des visites (Google Analytics et Microsoft Clarity), chargés seulement après votre accord.",
					],
				},
				{
					h: "Modifier votre choix",
					p: [
						"Utilisez le lien « Paramètres des cookies », au bas de chaque page. Vous pouvez aussi supprimer les cookies dans les réglages de votre navigateur.",
					],
				},
			],
		},
		terms: {
			title: "Conditions générales",
			description:
				"Conditions d'utilisation du site de DS Anox : nature des informations publiées, propriété des textes et des images, droit applicable.",
			sections: [
				{
					h: "Utilisation du site",
					p: [
						"Le contenu de ce site est informatif et ne constitue pas une offre contractuelle. Les conditions de chaque prestation sont convenues par écrit, dans le devis.",
					],
				},
				{
					h: "Propriété intellectuelle",
					p: [
						"Les textes et les images appartiennent à DS Anox, sauf mention contraire, et ne peuvent être reproduits sans autorisation.",
					],
				},
				{
					h: "Droit applicable",
					p: [
						"Ce site est régi par le droit portugais. En cas de litige, le consommateur peut s'adresser à un organisme de règlement extrajudiciaire des litiges de consommation (consumidor.gov.pt).",
					],
				},
			],
		},
	},
};

export default fr;
