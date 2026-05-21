import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv";
import { fileURLToPath } from "node:url";
import { REQUIRED_SECTIONS } from "./sections.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.resolve(__dirname, "../schema/me.schema.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

function formatAjvError(error) {
  const where = error.instancePath || "/";
  return `front matter ${where}: ${error.message}`;
}

function looksLikeEmail(text) {
  return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text);
}

function looksLikePhone(text) {
  return /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
}

export function validateMeMd(parsed) {
  const errors = [...parsed.parseErrors];
  const warnings = [];

  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  const ok = validate(parsed.frontmatter);

  if (!ok) {
    for (const error of validate.errors || []) {
      errors.push(formatAjvError(error));
    }
  }

  const headings = parsed.headings;
  const missing = REQUIRED_SECTIONS.filter(section => !headings.includes(section));

  for (const section of missing) {
    errors.push(`Missing required section: ## ${section}`);
  }

  const presentRequired = headings.filter(h => REQUIRED_SECTIONS.includes(h));
  const expectedPresentOrder = REQUIRED_SECTIONS.filter(s => presentRequired.includes(s));

  if (presentRequired.join(" | ") !== expectedPresentOrder.join(" | ")) {
    errors.push("Required sections are out of order.");
  }

  const updateIndex = headings.indexOf("Update Log");
  if (updateIndex >= 0) {
    const beforeUpdateLog = headings.slice(0, updateIndex + 1);
    for (const heading of beforeUpdateLog) {
      if (!REQUIRED_SECTIONS.includes(heading)) {
        warnings.push(`Unknown top-level section before Update Log: ## ${heading}`);
      }
    }
  }

  for (const section of REQUIRED_SECTIONS) {
    const content = parsed.sections[section];
    if (typeof content === "string" && content.length < 40) {
      warnings.push(`Section may be too thin: ## ${section}`);
    }
  }

  if (parsed.frontmatter.visibility === "public") {
    if (looksLikeEmail(parsed.source)) {
      warnings.push("Public file appears to contain an email address. Consider redacting.");
    }
    if (looksLikePhone(parsed.source)) {
      warnings.push("Public file appears to contain a phone number. Consider redacting.");
    }
  }

  const sourceLength = parsed.source.length;
  if (sourceLength > 50000) {
    warnings.push("File is large. Consider a public summary plus linked private/project files.");
  }

  return { errors, warnings };
}
