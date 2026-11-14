import { z } from "zod";

// What every site fills in site.config.ts. Checked at build time: a missing or wrong
// field stops the build with a message that names it.
const hours = z.object({
	days: z.array(
		z.enum([
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday",
		]),
	),
	opens: z.string().regex(/^\d{2}:\d{2}$/, "use HH:MM"),
	closes: z.string().regex(/^\d{2}:\d{2}$/, "use HH:MM"),
});

export const siteSchema = z.object({
	name: z.string().min(1),
	url: z.url().refine((u) => u.startsWith("https://") && u.endsWith("/"), {
		message: "must start with https:// and end with /",
	}),
	lang: z.string().regex(/^[a-z]{2}-[A-Z]{2}$/, "use a code like pt-PT"),
	org: z.object({
		// schema.org type, e.g. Organization, LocalBusiness, ProfessionalService.
		type: z.string().min(1),
		description: z.string().min(1),
		logo: z.string().startsWith("/"),
		ogImage: z.string().startsWith("/"),
		address: z
			.object({
				street: z.string().min(1),
				locality: z.string().min(1),
				postalCode: z.string().min(1),
				country: z.string().length(2),
			})
			.optional(),
		geo: z.object({ latitude: z.number(), longitude: z.number() }).optional(),
		hours: z.array(hours).optional(),
		sameAs: z.array(z.url()).default([]),
	}),
	// Shown when the panel cannot take a form, so the visitor can still reach the business.
	contacts: z.object({
		email: z.email(),
		phone: z.string().optional(),
		whatsapp: z.string().regex(/^\d+$/, "digits only").optional(),
	}),
	analytics: z
		.object({
			ga: z
				.string()
				.regex(/^G-[A-Z0-9]+$/)
				.optional(),
			clarity: z
				.string()
				.regex(/^[a-z0-9]+$/)
				.optional(),
		})
		.default({}),
	blog: z.boolean(),
	panel: z.object({
		url: z.url().refine((u) => u.startsWith("https://"), "must be https://"),
		siteKey: z.string().min(1),
	}),
	// Form name in the site → form key from the panel.
	forms: z.record(z.string(), z.string().min(1)),
	// Old address → new address, as permanent (301) redirects on both hosts.
	redirects: z.record(z.string().startsWith("/"), z.string()).default({}),
});

export type SiteConfig = z.output<typeof siteSchema>;

export function defineSite(input: z.input<typeof siteSchema>): SiteConfig {
	const parsed = siteSchema.safeParse(input);
	if (!parsed.success) {
		const lines = parsed.error.issues.map(
			(i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`,
		);
		throw new Error(`site.config.ts is not valid:\n${lines.join("\n")}`);
	}
	return parsed.data;
}
