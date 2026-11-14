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
	}),
});

// Published posts, newest first.
export const getPosts = async () =>
	(await getCollection("blog", ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
