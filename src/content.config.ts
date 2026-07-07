import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { bibtexLoader } from './lib/bibtex-loader';

const publications = defineCollection({
  loader: bibtexLoader({ file: 'src/content/publications.bib' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    year: z.number().int(),
    venue: z.string().optional(),
    type: z.string(),
    status: z.enum(['under-review', 'working-paper']).optional(),
    doi: z.string().optional(),
    url: z.url().optional(),
    pdf: z.string().optional(),
    selected: z.boolean().default(false),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    event: z.string(),
    location: z.string().optional(),
    kind: z.enum(['keynote', 'talk', 'workshop', 'panel', 'lecture']),
    lang: z.enum(['en', 'de']).optional(),
    url: z.url().optional(),
  }),
});

// Vorbereitet für v2 — Seiten existieren noch nicht, Collections schon.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    url: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    lang: z.enum(['en', 'de']).default('en'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { publications, talks, projects, notes };
