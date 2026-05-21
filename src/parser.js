import yaml from "js-yaml";
import { normalizeHeading } from "./sections.js";

const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---\s*\n?/;

export function parseMeMd(source, options = {}) {
  const match = source.match(FRONTMATTER_RE);
  const errors = [];
  let frontmatter = {};
  let body = source;

  if (!match) {
    errors.push("Missing YAML front matter delimited by ---.);
  } else {
    try {
      frontmatter = yaml.load(match[1]) || {};
    } catch (error) {
      errors.push(`Invalid YAML front matter: ${error.message}`);
    }
    body = source.slice(match[0].length);
  }

  const headingRegex = /^##\s+(.+)$/gm;
  const headings = [];
  let headingMatch;

  while ((headingMatch = headingRegex.exec(body)) !== null) {
    headings.push({
      title: normalizeHeading(headingMatch[1]),
      index: headingMatch.index,
      raw: headingMatch[0]
    });
  }

  const sections = {};
  for (let i = 0; i < headings.length; i++) {
    const current = headings[i];
    const next = headings[i + 1];
    const start = current.index + current.raw.length;
    const end = next ? next.index : body.length;
    sections[current.title] = body.slice(start, end).trim();
  }

  return {
    filePath: options.filePath || null,
    source,
    frontmatter,
    body,
    headings: headings.map(h => h.title),
    sections,
    parseErrors: errors
  };
}
