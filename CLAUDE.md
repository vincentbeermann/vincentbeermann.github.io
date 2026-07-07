# side-website — vincentbeermann.github.io

Persönliche Website: Forscher-Profil + freiberufliches Angebot. Astro 7,
zweisprachig EN (`/`) + DE (`/de/`), gehostet auf GitHub Pages.

**Live:** https://vincentbeermann.github.io
**Deploy:** `git push origin main` → GitHub Action baut & deployt (~2 min). Kein lokaler Build nötig.
**Alter Stand (Hugo, 2023):** Branch `legacy-hugo`.

## Pflege-Rezepte (Inhalte ändern = NUR diese Dateien anfassen)

| Aufgabe | Datei |
|---|---|
| Publikation hinzufügen/ändern | `src/content/publications.bib` |
| Talk/Workshop eintragen | `src/content/talks/YYYY-MM-name.md` (neue Datei) |
| Bio, Rollen, Links, E-Mail | `src/data/profile.yaml` |
| Angebot (Keynotes/Workshops/Beratung), Referenzen | `src/data/services.yaml` |
| Nav-/UI-Beschriftungen | `src/i18n/ui.ts` |
| Impressum / Datenschutz | `src/pages/impressum.astro` / `datenschutz.astro` |

Rendering-Code (`src/components/`, `src/layouts/`, `src/styles/`) muss für
Inhaltspflege NIE angefasst werden.

### Publikation (BibTeX-Konventionen)

Block aus Zotero kopieren oder von Claude ergänzen lassen. Custom-Felder:

```bibtex
@inproceedings{beermann2027example,
  title     = {Titel in Title Case (wird NICHT sentence-cased)},
  author    = {Beermann, Vincent and Nachname, Vorname},
  booktitle = {Proceedings of the ... (ICIS)},   % oder journal = {...}
  year      = {2027},
  doi       = {10.xxxx/...},        % → DOI-Link
  url       = {https://...},        % alternativ zu doi (z.B. AISeL)
  pdf       = {/pdf/datei.pdf},     % Author-Copy in public/pdf/ ablegen
  selected  = {true},               % erscheint auf der Startseite
}
```

Under-Review/Working-Paper: `@unpublished` mit `status = {under-review}`
oder `status = {working-paper}` (kein venue nötig).

### Talk (Frontmatter-Schema)

```markdown
---
title: "Titel des Vortrags"
date: 2027-03-15
event: Name der Organisation/Konferenz
location: Berlin          # optional
kind: keynote             # keynote | talk | workshop | panel | lecture
lang: de                  # optional: en | de
url: https://...          # optional
---
```

### Zweisprachige Prosa

`profile.yaml` und `services.yaml` haben `en:`/`de:`-Keys nebeneinander —
beide Sprachen in EINER Datei pflegen. Publikationen und Talks sind
sprachneutral (keine Übersetzung nötig).

## Architektur (nur für Code-Änderungen relevant)

- `src/lib/bibtex-loader.ts` — Content-Layer-Loader, parst die .bib zur
  Build-Zeit (`@retorquere/bibtex-parser`, `sentenceCase: false`).
- `src/content.config.ts` — Zod-Schemas aller Collections. `projects` und
  `notes` sind für v2 vorbereitet (Collections definiert, Seiten fehlen).
- Seiten: dünne Wrapper in `src/pages/` (EN) und `src/pages/de/` rufen
  gemeinsame Komponenten in `src/components/pages/` mit `locale`-Prop auf.
- Design-Tokens: `src/styles/tokens.css` — bewusst NUR Light Mode
  (Vincents Entscheidung 2026-07-07: „heller & verspielter"). Warmes
  Papier, Marker-Gelb (`<mark>` in der Hero-Tagline, Wort via
  `tagline_highlight` in profile.yaml), Koralle-CTAs, Pastell-Tints auf
  leicht gekippten Karten (`ServiceCards.astro`). Kein Tailwind, kein
  JS-Runtime. KEINE Design-Fußnoten/Meta-Erklärungen — gab es in v1,
  Vincent hat sie explizit rausgeworfen.
- Fonts: Fontsource-Pakete (Space Grotesk + Inter, variable), self-hosted
  — KEINE externen Requests einführen (DSGVO; Datenschutzerklärung
  verspricht null Drittdienste, keine Cookies, kein Tracking).
- Coaching-Angebot: „Executive Coaching" gemäß Praxis-Aufbau-Plan
  (~/Downloads/praxis-aufbau.html, Stand 07/2026): Führungskräfte-Fokus,
  psychologisch fundiert/systemisch, KEIN generisches Life-Coaching,
  KEINE Heilkunde-/Therapie-Sprache vor Approbation (erwartet ~Okt 2027+).

## Lokal entwickeln

```bash
npm run dev        # localhost:4321
npm run build      # astro check && astro build
npm run preview    # gebauten Stand ansehen
```

## Offen / v2

- Impressum: ladungsfähige Anschrift eintragen (Platzhalter drin!)
- Custom Domain: `public/CNAME` + DNS (A/AAAA auf GitHub-Pages-IPs) + Pages-Settings
- Projects-/Notes-Seiten freischalten (Collections existieren)
- Portrait-Foto (altes liegt im Branch `legacy-hugo` unter `home/portrait.jpeg`)
- OG-Social-Card-Bild

## Log

### 2026-07-07
- Kompletter Neubau als Astro-7-Site (vorher: Hugo-Template-Fork von Nov
  2023 mit fremdem Demo-Content, gesichert auf `legacy-hugo`).
- Pages-Deploy von Branch-Build auf GitHub Actions umgestellt (Node 22).
- Publikationen aus Zotero befüllt (10 Einträge), 3 Talks, Profil/Angebot
  EN+DE, Impressum+Datenschutz, Design „Choice Architecture".
- Redesign nach Vincents Feedback: Design-Fußnoten entfernt, Light-only
  + verspielte Farbwelt (Marker, Tints, gekippte Karten), Executive
  Coaching als viertes Angebot (Quelle: Praxis-Aufbau-Plan aus Downloads).
