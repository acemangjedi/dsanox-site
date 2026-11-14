import site from "../../site.config";

// JSON-LD built from site.config.ts, so every page describes the business the same way.
export const abs = (path: string) => new URL(path, site.url).href;

const ORG_ID = `${site.url}#org`;

export const organization = () => {
	const { org } = site;
	return {
		"@type": org.type,
		"@id": ORG_ID,
		name: site.name,
		url: site.url,
		logo: abs(org.logo),
		image: abs(org.ogImage),
		description: org.description,
		email: site.contacts.email,
		...(site.contacts.phone ? { telephone: site.contacts.phone } : {}),
		...(org.address
			? {
					address: {
						"@type": "PostalAddress",
						streetAddress: org.address.street,
						addressLocality: org.address.locality,
						postalCode: org.address.postalCode,
						addressCountry: org.address.country,
					},
				}
			: {}),
		...(org.geo ? { geo: { "@type": "GeoCoordinates", ...org.geo } } : {}),
		...(org.hours
			? {
					openingHoursSpecification: org.hours.map((h) => ({
						"@type": "OpeningHoursSpecification",
						dayOfWeek: h.days,
						opens: h.opens,
						closes: h.closes,
					})),
				}
			: {}),
		...(org.sameAs.length ? { sameAs: org.sameAs } : {}),
	};
};

// Other entities point at the organization instead of repeating it.
export const orgRef = { "@id": ORG_ID };

// items: [name, path] from the home page down to the current page.
export const breadcrumb = (items: [string, string][]) => ({
	"@type": "BreadcrumbList",
	itemListElement: items.map(([name, path], i) => ({
		"@type": "ListItem",
		position: i + 1,
		name,
		item: abs(path),
	})),
});

export const graph = (...nodes: object[]) => ({
	"@context": "https://schema.org",
	"@graph": nodes,
});
