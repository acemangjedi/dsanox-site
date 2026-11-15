import { defineCollection, getCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

// The blog schema is the panel's article format: the sync script writes these files.
export const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		author: z.string(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		image: z.object({ src: z.string(), alt: z.string() }).optional(),
		canonical: z.url().optional(),
		// Written in the panel's "Google e partilha"; each falls back to the article's own.
		metaTitle: z.string().optional(),
		ogTitle: z.string().optional(),
		ogDescription: z.string().optional(),
		ogImage: z.string().optional(),
		noindex: z.boolean().default(false),
		jsonLd: z
			.union([z.record(z.string(), z.unknown()), z.array(z.unknown())])
			.optional(),
		// On a site with languages: which one this file is in, and the article it is
		// a version of (the same key in every language).
		lang: z.string().optional(),
		key: z.string().optional(),
		// The article's photographs and where it asks for them: a carousel at the top
		// or a gallery at the end.
		photos: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
		photosAt: z.enum(["top", "end"]).default("end"),
		// The extra fields the site declared in the panel, by their keys.
		extra: z
			.record(
				z.string(),
				z.union([
					z.string(),
					z.number(),
					z.object({ lat: z.number(), lng: z.number() }),
				]),
			)
			.default({}),
	}),
});

// Published posts, newest first.
export const getPosts = async () =>
	(await getCollection("blog", ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

// The article's extra JSON-LD as nodes to add to the page's graph.
export const extraNodes = (jsonLd: unknown): object[] => {
	if (!jsonLd) return [];
	if (Array.isArray(jsonLd)) return jsonLd as object[];
	const {
		"@context": _,
		"@graph": nodes,
		...rest
	} = jsonLd as Record<string, unknown>;
	if (Array.isArray(nodes)) return nodes as object[];
	return [rest];
};
