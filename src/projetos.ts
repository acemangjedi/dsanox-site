import { getCollection } from "astro:content";
import type { Lang } from "./core/i18n";
import { rotas } from "./textos/rotas";

// The projects of one language, newest first, each with its address.
export async function projetosDe(lang: Lang) {
	const todos = await getCollection(
		"projetos",
		({ data }) => data.lang === lang,
	);
	return todos
		.sort(
			(a, b) =>
				b.data.year - a.data.year || a.data.key.localeCompare(b.data.key),
		)
		.map((p) => ({ ...p, href: `${rotas.projects[lang]}${p.data.slug}/` }));
}

// The address of one project in each language it exists in.
export async function versoesDe(key: string) {
	const todos = await getCollection("projetos", ({ data }) => data.key === key);
	return Object.fromEntries(
		todos.map((p) => [
			p.data.lang,
			`${rotas.projects[p.data.lang]}${p.data.slug}/`,
		]),
	) as Partial<Record<Lang, string>>;
}
