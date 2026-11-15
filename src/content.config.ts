import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";
import { blog } from "./core/blog";

// The company's projects: one file for each project in each language (pt/, en/, fr/).
// The map on the home page and the list are made from these files.
const projetos = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projetos" }),
	schema: ({ image }) =>
		z.object({
			// The same in the three languages of a project.
			key: z.string(),
			lang: z.enum(["pt", "en", "fr"]),
			slug: z.string(),
			title: z.string(),
			description: z.string(),
			place: z.string(),
			country: z.string(),
			lat: z.number(),
			lng: z.number(),
			year: z.number(),
			// Which of the three service areas, in the order of the texts.
			area: z.number().int().min(0).max(2),
			cover: image(),
			coverAlt: z.string(),
			gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
			// An invented project, to show how the section works.
			demo: z.boolean().default(false),
		}),
});

export const collections = { blog, projetos };
