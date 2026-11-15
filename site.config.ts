import { defineSite } from "./src/core/config";

// Everything that changes from site to site, outside the pages and the design.
// The build stops with a clear message if a field is missing or wrong.
export default defineSite({
	name: "DS Anox",
	url: "https://dsanox.com/",
	lang: "pt-PT",
	locales: ["en-GB", "fr-FR"],
	org: {
		type: "Organization",
		description:
			"Metalurgia de alta precisão: consultoria técnica e orçamental, pré-fabricação e construção industrial.",
		logo: "/assets/img/logo.png",
		ogImage: "/assets/img/og-image.jpg",
		address: {
			street: "Rua da Alegria, 11",
			locality: "Louro, Vila Nova de Famalicão",
			postalCode: "4760-530",
			country: "PT",
		},
	},
	contacts: {
		email: "geral@dsanox.com",
		phone: "+351968782557",
	},
	analytics: {},
	blog: false,
	panel: {
		url: "https://painel.simplelife.uno",
		// To fill in from the panel (Admin, client DS Anox, table of sites).
		siteKey: "kRKcjPazjjxdfooN81PxFQ",
	},
	forms: {
		contactos: "kRKcjPazjjxdfooN81PxFQ.ueWJq995nmEi",
	},
	hidden: [],
});
