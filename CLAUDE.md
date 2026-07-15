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
  psychologisch fundiert, KEIN generisches Life-Coaching,
  KEINE Heilkunde-/Therapie-Sprache vor Approbation (erwartet ~Okt 2027+).

## Freiberuflichkeit — Wortwahl-Guardrails (nicht aufweichen!)

Vincent ist freiberuflich angemeldet (§ 18 EStG), nicht gewerblich. Die
Website entscheidet das **nicht** — die tatsächliche Tätigkeit tut das —,
aber sie ist Außendarstellung, die ein Prüfer liest. Sie darf der
Freiberuflichkeit nicht widersprechen.

**Referenztext = Fragebogen zur steuerlichen Erfassung.** Wortlaut seiner
Anmeldung:

> Wissenschaftliche, beratende und unterrichtende Tätigkeit als Psychologe
> (M.Sc.) und Wirtschaftsinformatiker (Dr. rer. nat.): Vorträge, Workshops,
> Lehre und Beratung.

Dieser Satz steht wörtlich im Impressum. **Die Website darf nicht weniger und
nicht mehr behaupten als die Anmeldung** — Konsistenz schlägt geschickte
Wortwahl. Deshalb ist „Beratung" hier ausdrücklich ERLAUBT (sie ist
angemeldet, und die Angebots-Karte heißt so); riskant ist nicht das Wort,
sondern ein Inhalt, der wie praxisorientierte Ratschläge statt wie
angewandte Wissenschaft klingt. Ändert sich die Anmeldung, ändert sich das
Impressum mit — und umgekehrt.

Tragende Anker: **wissenschaftliche** und **unterrichtende** Tätigkeit
(§ 18 Abs. 1 Nr. 1 Satz 2 EStG) sowie zwei Berufsbilder — **Psychologe**
(kein Katalogberuf, greift über „ähnliche Berufe") und
**Wirtschaftsinformatiker** (Anschluss an den Katalogberuf Ingenieur über
„ähnliche Berufe"; Dr. rer. nat. stützt zusätzlich den Wissenschafts-Anker).

Diese Formulierungen bewusst so — nicht „glattziehen":

| Nicht schreiben | Sondern | Warum |
|---|---|---|
| „individuelles Programm", „auf dich zugeschnittenes Konzept" | Wissen/Verfahren vermitteln, Muster, Kontext | BMWK definiert genau das als *beratend* = gewerblich |
| „systemisches Coaching" als Angebots-Headline | „psychologisch fundiert", „Psychologe (M.Sc.)" | BMWK nennt systemisches Coaching explizit als Beispiel für *kein* schulmäßiges Programm → nicht unterrichtend. (In der Bio als Ausbildungs-*Faktum* ok.) |
| „wir", Team-/Agentur-Sprache | „ich" | Freiberuflichkeit ist höchstpersönlich (§ 18 Abs. 1 Nr. 1 Satz 3: leitend + eigenverantwortlich) |
| Preise, Pakete, Staffeln, „jetzt buchen", Shop | Anfrage per E-Mail | Produkt-/Handels-Anmutung |
| „praxisorientierte Beratung", „Tipps", „Best Practices" (Wort „Beratung" allein ist ok, s.o.) | Interventionsdesign, Evaluation, Feldexperiment | *Wissenschaftlich* wird verneint, wenn es bloß praxisorientierte Wissensvermittlung/Beratung ist |

Aktiv drin lassen: bei Workshops die Worte **Curriculum, Lernziele, eigenes
Material** (= „schulmäßiges Programm", das Kriterium für unterrichtende
Tätigkeit). Bei Coaching den Satz **„Keine Therapie, kein Life-Coaching"**
(schützt doppelt: gegen Heilkunde-Werbung ohne Approbation *und* gegen die
Life-Coaching-Schublade). Berufsangaben stehen im Impressum (noindex).

Menura Audio (gewerblich) darf in der Bio bleiben: Vincents Freiberuflichkeit
ist ein Einzelunternehmen, da gibt es keine Abfärbung (§ 15 Abs. 3 Nr. 1 EStG
trifft nur Personengesellschaften) — nur getrennt aufzeichnen. Menura aber
NIE als Teil des eigenen Angebots darstellen.

## Lokal entwickeln

```bash
npm run dev        # localhost:4321
npm run build      # astro check && astro build
npm run preview    # gebauten Stand ansehen
```

## Datenschutz-Mechanik (nicht kaputt machen!)

- **E-Mail** (vincentbeermann@icloud.com, aus profile.yaml) steht NIE als
  Klartext/mailto im HTML — `Email.astro` + Inline-Script in Base.astro
  setzen sie zur Laufzeit zusammen. Nie einen rohen mailto-Link einbauen.
- **Impressums-Anschrift** steht base64-kodiert in impressum.astro
  (`data-addr`), weil das Repo ÖFFENTLICH ist — Klartext weder ins HTML
  noch in den Quellcode committen. Ändern: neuen String mit
  `printf 'Straße X, PLZ Ort' | base64` erzeugen und einsetzen.
- Impressum + Datenschutz sind `noindex` und aus der Sitemap gefiltert
  (astro.config.mjs).

## Offen / v2
- Custom Domain: `public/CNAME` + DNS (A/AAAA auf GitHub-Pages-IPs) + Pages-Settings
- Projects-/Notes-Seiten freischalten (Collections existieren)
- Portrait-Foto (altes liegt im Branch `legacy-hugo` unter `home/portrait.jpeg`)
- OG-Social-Card-Bild

## Log

### 2026-07-08
- Publikationen 10 → 15, Talks 3 → 6: abgeglichen gegen CV
  (`~/Documents/passive/admin-hpi-chair/misc/CV_VB.pdf`), DBLP, arXiv,
  CrossRef, Semantic Scholar. Diss (DOI), NeuroIS 2024, ECIS 2025,
  2 arXiv-Preprints, AOM-Best-Paper-Badge, AISeL-Links. Talk-Daten jetzt
  CV-verifiziert (Münster Nov 2025, MPI-Titel korrigiert; SFU/DB/BCG neu).
  ResearchGate nicht direkt abfragbar (Bot-Schutz) — DBLP/arXiv/AISeL
  decken dasselbe ab.

### 2026-07-07
- Kompletter Neubau als Astro-7-Site (vorher: Hugo-Template-Fork von Nov
  2023 mit fremdem Demo-Content, gesichert auf `legacy-hugo`).
- Pages-Deploy von Branch-Build auf GitHub Actions umgestellt (Node 22).
- Publikationen aus Zotero befüllt (10 Einträge), 3 Talks, Profil/Angebot
  EN+DE, Impressum+Datenschutz, Design „Choice Architecture".
- Redesign nach Vincents Feedback: Design-Fußnoten entfernt, Light-only
  + verspielte Farbwelt (Marker, Tints, gekippte Karten), Executive
  Coaching als viertes Angebot (Quelle: Praxis-Aufbau-Plan aus Downloads).
