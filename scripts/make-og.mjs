// Erzeugt die Social Card (public/og.png, 1200×630) aus einem SVG —
// gleiche Farbwelt wie die Site. Ausführen: node scripts/make-og.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#fbf6ee"/>
  <rect x="0" y="0" width="1200" height="10" fill="#0031e3"/>

  <text x="84" y="120" font-family="Helvetica, Arial, sans-serif" font-size="34"
        font-weight="bold" fill="#1a1611">Vincent Beermann</text>
  <text x="84" y="164" font-family="Helvetica, Arial, sans-serif" font-size="24"
        fill="#5f584c">Behavioral Design · Human-AI Interaction · Field Experiments</text>

  <text x="84" y="330" font-family="Helvetica, Arial, sans-serif" font-size="88"
        font-weight="bold" fill="#1a1611">I study how design</text>
  <rect x="72" y="368" width="740" height="92" rx="10" fill="#ffd84d"/>
  <text x="84" y="440" font-family="Helvetica, Arial, sans-serif" font-size="88"
        font-weight="bold" fill="#1a1611">changes behavior.</text>

  <text x="84" y="560" font-family="Helvetica, Arial, sans-serif" font-size="26"
        fill="#0031e3" font-weight="bold">vincentbeermann.github.io</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile(new URL('../public/og.png', import.meta.url), png);
console.log(`public/og.png geschrieben (${(png.length / 1024).toFixed(0)} KB)`);
