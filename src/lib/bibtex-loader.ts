import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from '@retorquere/bibtex-parser';
import type { Loader } from 'astro/loaders';

type Creator = {
  lastName?: string;
  firstName?: string;
  prefix?: string;
  name?: string;
};

function formatAuthor(a: Creator): string {
  if (a.name) return a.name;
  return [a.firstName, a.prefix, a.lastName].filter(Boolean).join(' ');
}

/**
 * Content-Layer-Loader: macht `publications.bib` zur Source of Truth.
 * Custom-Felder je Eintrag: `selected = {true}`, `pdf = {/pdf/x.pdf}`,
 * `status = {under-review|working-paper}` (für @unpublished).
 */
export function bibtexLoader({ file }: { file: string }): Loader {
  return {
    name: 'bibtex-loader',
    load: async ({ store, parseData, logger, watcher }) => {
      const path = resolve(file);

      const loadFile = async () => {
        const raw = await readFile(path, 'utf-8');
        const { entries, errors } = parse(raw, { sentenceCase: false });
        for (const err of errors ?? []) {
          logger.warn(`BibTeX parse warning: ${JSON.stringify(err)}`);
        }
        store.clear();
        for (const entry of entries) {
          const f = entry.fields as Record<string, unknown>;
          const authors = Array.isArray(f.author)
            ? (f.author as Creator[]).map(formatAuthor)
            : [];
          const data = await parseData({
            id: entry.key,
            data: {
              title: (f.title as string) ?? '',
              authors,
              year: Number(f.year),
              venue: (f.journal as string) ?? (f.booktitle as string) ?? undefined,
              type: entry.type,
              status: f.status as string | undefined,
              doi: f.doi as string | undefined,
              url: f.url as string | undefined,
              pdf: f.pdf as string | undefined,
              selected: f.selected === 'true',
            },
          });
          store.set({ id: entry.key, data });
        }
        logger.info(`Loaded ${entries.length} publications from ${file}`);
      };

      await loadFile();

      if (watcher) {
        watcher.add(path);
        watcher.on('change', (changed) => {
          if (resolve(changed) === path) void loadFile();
        });
      }
    },
  };
}
