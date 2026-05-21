#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parseMeMd } from "../src/parser.js";
import { validateMeMd } from "../src/validate.js";

const [,, command, fileArg] = process.argv;

function usage() {
  console.log(`me-md

Usage:
  me-md lint <file>
  me-md inspect <file>

Examples:
  me-md lint me.md
  me-md inspect examples/cunningfolk.me.md
`);
}

if (!command || ["-h", "--help", "help"].includes(command)) {
  usage();
  process.exit(0);
}

if (!fileArg) {
  usage();
  process.exit(1);
}

const filePath = path.resolve(process.cwd(), fileArg);

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${fileArg}`);
  process.exit(1);
}

const source = fs.readFileSync(filePath, "utf8");
const parsed = parseMeMd(source, { filePath });
const result = validateMeMd(parsed);

if (command === "inspect") {
  console.log(JSON.stringify({
    file: fileArg,
    frontmatter: parsed.frontmatter,
    headings: parsed.headings,
    sections: Object.keys(parsed.sections),
    errors: result.errors,
    warnings: result.warnings
  }, null, 2));
  process.exit(result.errors.length ? 1 : 0);
}

if (command === "lint") {
  if (result.errors.length === 0 && result.warnings.length === 0) {
    console.log(`✅ ${fileArg} passed me.md lint.`);
    process.exit(0);
  }

  if (result.errors.length) {
    console.error(`❌ ${fileArg} failed me.md lint.\n`);
    for (const error of result.errors) console.error(`ERROR: ${error}`);
  }

  if (result.warnings.length) {
    if (result.errors.length) console.error("");
    for (const warning of result.warnings) console.warn(`WARN: ${warning}`);
  }

  process.exit(result.errors.length ? 1 : 0);
}

usage();
process.exit(1);
