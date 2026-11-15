import { type CollectionEntry, getCollection } from "astro:content";
import site from "../site.config";
import type { Lang } from "./core/i18n";
import { rotas } from "./textos/rotas";

type Foto = { src: ImageMetadata; alt: string };

// A project as the pages draw it, whether it comes from the panel or from the
// example files. Only the title and the description are certain.
export type Projeto = {
	key: string;
	slug: string;
	href: string;
	title: string;
	description: string;
	place?: string;
	country?: string;
	coords?: { lat: number; lng: number };
	year?: number;
	// Which of the three service areas, in the order of the texts.
	area?: number;
	cover?: Foto;
	gallery: Foto[];
	// The photographs as a strip at the top instead of a gallery at the end.
	carousel: boolean;
	// An invented project, to show how the section works.
	demo: boolean;
	entry: CollectionEntry<"blog"> | CollectionEntry<"projetos">;
};

// The photographs the build brought from the panel, so Astro can resize them.
const doPainel = import.meta.glob<ImageMetadata>(
	"/public/assets/img/blog/*.webp",
	{ eager: true, import: "default" },
);

// With the panel on (site.blog), the projects are its articles: the place, the year
// and the area are the extra fields declared there (place, country, coords, year,
// area from 1 to 3). Without it, the example files in src/content/projetos.
async function todos(): Promise<(Projeto & { lang: string })[]> {
	if (!site.blog) {
		return (await getCollection("projetos"))
			.sort(
				(a, b) =>
					b.data.year - a.data.year || a.data.key.localeCompare(b.data.key),
			)
			.map((entry) => {
				const d = entry.data;
				return {
					...d,
					href: `${rotas.projects[d.lang]}${d.slug}/`,
					coords: { lat: d.lat, lng: d.lng },
					cover: { src: d.cover, alt: d.coverAlt },
					carousel: false,
					entry,
				};
			});
	}
	return (await getCollection("blog", ({ data }) => !data.draft && !!data.lang))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.map((entry) => {
			const d = entry.data;
			const lang = d.lang as Lang;
			const slug = entry.id.split("/").pop() ?? entry.id;
			const fotos = [...(d.image ? [d.image] : []), ...d.photos].flatMap((f) =>
				doPainel[`/public${f.src}`]
					? [{ src: doPainel[`/public${f.src}`], alt: f.alt }]
					: [],
			);
			const x = d.extra;
			const text = (v: unknown) => (typeof v === "string" ? v : undefined);
			return {
				key: d.key ?? slug,
				lang,
				slug,
				href: `${rotas.projects[lang]}${slug}/`,
				title: d.title,
				description: d.description,
				place: text(x.place),
				country: text(x.country),
				coords: typeof x.coords === "object" ? x.coords : undefined,
				year: typeof x.year === "number" ? x.year : undefined,
				area:
					typeof x.area === "number" && [1, 2, 3].includes(x.area)
						? x.area - 1
						: undefined,
				cover: fotos[0],
				gallery: fotos.slice(1),
				carousel: d.photosAt === "top",
				demo: false,
				entry,
			};
		});
}

// The projects of one language, newest first.
export async function projetosDe(lang: Lang): Promise<Projeto[]> {
	return (await todos()).filter((p) => p.lang === lang);
}

// The address of one project in each language it exists in.
export async function versoesDe(key: string) {
	return Object.fromEntries(
		(await todos()).filter((p) => p.key === key).map((p) => [p.lang, p.href]),
	) as Partial<Record<Lang, string>>;
}
