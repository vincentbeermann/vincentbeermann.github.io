declare module '@fontsource-variable/space-grotesk';
declare module '@fontsource-variable/inter';

declare module '*.yaml' {
  const data: Record<string, unknown>;
  export default data;
}

declare module '@retorquere/bibtex-parser' {
  export interface Creator {
    lastName?: string;
    firstName?: string;
    prefix?: string;
    name?: string;
  }
  export interface Entry {
    type: string;
    key: string;
    fields: Record<string, string | Creator[]>;
  }
  export interface ParseResult {
    entries: Entry[];
    errors?: unknown[];
  }
  export interface ParseOptions {
    sentenceCase?: boolean;
  }
  export function parse(input: string, options?: ParseOptions): ParseResult;
}
