import { defineSite } from "./src/core/config";

// Everything that changes from site to site, outside the pages and the design.
// The build stops with a clear message if a field is missing or wrong.
export default defineSite({
	name: "Horizonte Consultoria",
	url: "https://demo-hostinger.simplelife.uno/",
	lang: "pt-PT",
	org: {
		type: "ProfessionalService",
		description:
			"Consultoria de gestão para pequenas e médias empresas: processos, finanças e equipas.",
		logo: "/assets/img/logo.svg",
		ogImage: "/assets/img/og-image.jpg",
		address: {
			street: "Rua do Exemplo 10",
			locality: "Lisboa",
			postalCode: "1000-001",
			country: "PT",
		},
		hours: [
			{
				days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
				opens: "09:00",
				closes: "18:00",
			},
		],
	},
	contacts: {
		email: "geral@exemplo.pt",
		phone: "+351210000000",
	},
	analytics: {},
	blog: true,
	panel: {
		url: "https://painel.simplelife.uno",
		siteKey: "XPHFL70YEW8FGTSTcp6x5g",
	},
	forms: {
		contactos: "XPHFL70YEW8FGTSTcp6x5g.c38rBb_mtkY_",
	},
	// Page that shows the core blocks; not for visitors.
	hidden: ["/blocos/"],
});
