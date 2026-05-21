import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { parseMeMd } from "../src/parser.js";
import { validateMeMd } from "../src/validate.js";

test("minimal fixture is valid", () => {
  const source = fs.readFileSync("examples/minimal.me.md", "utf8");
  const parsed = parseMeMd(source);
  const result = validateMeMd(parsed);
  assert.equal(result.errors.length, 0);
});
