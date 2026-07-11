export type TextPart = { text: string; href?: string };

/**
 * Zerlegt einen Text mit einfachen Markdown-Links [Text](URL) in Teile,
 * die als Text bzw. <a> gerendert werden — ohne set:html, also ohne
 * Injection-Risiko.
 */
export function parseLinks(input: string): TextPart[] {
  const parts: TextPart[] = [];
  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input)) !== null) {
    if (m.index > last) parts.push({ text: input.slice(last, m.index) });
    parts.push({ text: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < input.length) parts.push({ text: input.slice(last) });
  return parts;
}
