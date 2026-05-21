# me.md Format Specification

Version: `0.1.0`  
Status: Draft  
Canonical filename: `me.md`

## 1. Purpose

`me.md` is a portable Markdown context document for AI collaboration.

It gives an unfamiliar LLM or agent enough structured context to understand a person, organization, studio, project constellation, working style, preferences, constraints, and collaboration protocol before beginning work.

The format is designed for individual creators, founders, researchers, writers, designers, developers, studios, open-source maintainers, and teams working with agentic systems.

`me.md` is not a biography, résumé, memoir, brand book, prompt dump, or secrets vault. It is a practical context interface.

## 2. Core model

A `me.md` file has two parts:

1. YAML front matter containing stable, parseable metadata.
2. Ordered Markdown sections containing human-readable collaboration context.

The Markdown body is the primary source of meaning. The YAML exists so tools can index, validate, filter, summarize, and route files.

## 3. Naming

The canonical file MUST be named:

```text
me.md
```

Allowed variants MAY include:

```text
public.me.md
private.me.md
team.me.md
studio.me.md
project.me.md
```

A project root MAY contain more than one variant, but agents SHOULD prioritize the most specific local file.

Recommended priority:

1. `private.me.md`, when explicitly available to the agent and intended for private work.
2. `project.me.md`, when the task is project-specific.
3. `team.me.md`, when the task is collaborative.
4. `me.md`, as the canonical default.
5. `public.me.md`, when publishing, sharing, or demonstrating the format.

## 4. Front matter

A valid `me.md` file MUST begin with YAML front matter delimited by `---`.

Minimum required fields:

```yaml
me_md_version: "0.1.0"
profile:
  display_name: "Name"
  preferred_name: "Name"
  role: "Role or working identity"
visibility: "public"
updated: "YYYY-MM-DD"
```

Recommended fields:

```yaml
organization:
  name: "Organization"
  url: "https://example.com"
  handle: "@example"
context:
  purpose: "Short statement of what this file helps agents understand."
  audience:
    - llm
    - agent
    - collaborator
freshness:
  reviewed: "YYYY-MM-DD"
  review_cycle: "monthly"
tags:
  - writing
  - publishing
  - design
```

## 5. Visibility

The `visibility` field MUST be one of:

```text
public
team
private
confidential
redacted
```

Meanings:

- `public` — safe to publish openly.
- `team` — safe for collaborators but not the open web.
- `private` — for the user and trusted private agents only.
- `confidential` — contains sensitive business, personal, legal, or strategic context.
- `redacted` — derived from a richer file with private details removed.

Agents MUST NOT assume a public-safe version contains the full truth. Missing details may be intentionally omitted.

## 6. Required section order

The body MUST contain these `##` headings in this exact order:

```text
## Operating Contract
## Identity
## Mission
## Project Constellation
## Voice and Style
## Preferences and Constraints
## Workflows and Tools
## Knowledge Domains
## Collaboration Protocol
## Privacy and Boundaries
## Update Log
```

Additional `###` subsections are encouraged. Additional `##` sections are allowed only after `## Update Log`, unless a future version changes this rule.

The order is designed to let an LLM quickly build an internal collaboration model:

1. How to behave.
2. Who the person is.
3. What the work is for.
4. What projects exist.
5. How the work should sound.
6. What must be respected.
7. How work gets done.
8. What domains matter.
9. How collaboration should proceed.
10. What not to expose.
11. What changed.

## 7. Section definitions

### Operating Contract

Defines the assistant/collaborator behavior expected by the person.

Should include default collaboration posture, decision-making expectations, whether to ask questions or proceed, planning and drafting preferences, quality bar, preferred level of autonomy, and how to handle ambiguity.

### Identity

Practical working identity, not a full life story.

Should include name or public name, preferred name, roles, organizations, public bio-level context, and long-running identity claims relevant to the work.

### Mission

The larger creative, professional, research, or organizational mission.

Should answer: What is this person trying to build? What is the philosophy behind the work? What audience or community does it serve? What makes the work distinctive?

### Project Constellation

The active and recurring projects.

Each project SHOULD include name, type, status, purpose, key decisions, important constraints, and relationship to other projects.

Recommended format:

```md
### Project Name

Type: Book / App / Brand / Research / Product / Publication  
Status: Active / Drafting / Paused / Concept / Released  
Purpose: One or two sentences.  
Notes: Key context an LLM must preserve.
```

### Voice and Style

Writing, design, editorial, and tonal preferences.

Should include desired tone, disliked tics, prose rhythm, formatting preferences, examples of “yes” and “no,” and brand-specific voice notes.

### Preferences and Constraints

Hard rules, durable dislikes, recurring corrections, and production requirements.

Good constraints are specific:

```md
Do: Meet the requested word count.
Avoid: Generic occult clipart.
Avoid: Overusing "whether/or" and "not only/but also" structures.
```

### Workflows and Tools

How work gets done.

May include writing tools, design tools, deployment habits, publishing platforms, file formats, preferred artifact structure, repo conventions, and production pipelines.

### Knowledge Domains

Relevant intellectual, artistic, technical, and cultural territory.

Should include fields of expertise, recurring references, conceptual frameworks, house taxonomies, canonical project vocabulary, and source preferences.

### Collaboration Protocol

How to work with the person across tasks.

Should define when to plan, when to draft, how to revise, how to handle uncertainty, how to deliver artifacts, and how to track status.

### Privacy and Boundaries

What should not be exposed, assumed, or published.

Should identify public-safe version status, sensitive omitted material, fields that should be redacted, information requiring confirmation, and instructions for quoting or sharing.

### Update Log

A short reverse-chronological changelog.

Recommended format:

```md
- 2026-05-21 — Created initial public version.
```

## 8. Parsing rules

A parser SHOULD:

1. Read YAML front matter.
2. Validate front matter against `schema/me.schema.json`.
3. Extract all `##` headings.
4. Verify required heading presence.
5. Verify required heading order.
6. Warn about unknown top-level sections before `## Update Log`.
7. Warn about empty required sections.
8. Return a structured representation containing front matter, sections, warnings, and errors.

## 9. Linting rules

A linter MUST fail when:

- front matter is missing
- required front matter fields are missing
- `me_md_version` is missing
- `visibility` is not allowed
- `updated` is not `YYYY-MM-DD`
- a required `##` section is missing
- required sections are out of order

A linter SHOULD warn when:

- required sections are present but very short
- public files contain email addresses, phone numbers, or street-address-like strings
- there is no privacy section
- there is no update log entry
- project entries lack status
- the file exceeds a configurable token budget

## 10. Privacy model

A `me.md` file can be powerful and risky because it gives an agent stable personal context.

Therefore:

- public files SHOULD avoid private contact details
- private files SHOULD be kept out of public repos
- redacted files SHOULD say they are redacted
- sensitive details SHOULD be stored in separate private variants
- agents SHOULD avoid restating sensitive context unless it directly serves the task

Recommended public-safe omissions:

- personal phone numbers
- private email addresses
- street addresses
- financial details
- health information
- passwords, tokens, keys
- unreleased strategic plans
- private relationship details
- anything the user would not want indexed by search engines

## 11. Agent consumption rules

When an agent sees `me.md`, it SHOULD:

1. Read it before acting.
2. Treat it as durable preference and context, not as a task request.
3. Prefer project-specific files when they conflict with general preferences.
4. Ask fewer redundant questions.
5. Preserve stated voice, constraints, and workflows.
6. Avoid exposing private sections.
7. Mention uncertainty when context may be stale.
8. Suggest updates when repeated corrections indicate drift.

The agent SHOULD NOT treat `me.md` as immutable truth, expose private context in public deliverables, override explicit current instructions, infer sensitive personal attributes beyond what is stated, or use the file as a substitute for project source files.

## 12. Relationship to other context files

`me.md` complements, rather than replaces:

- `README.md` — project overview
- `DESIGN.md` — design system / visual identity
- `AGENTS.md` — agent-specific project instructions
- `CLAUDE.md` / `.cursorrules` — tool-specific instructions
- `SKILL.md` — operational skill package instructions
- `CONTRIBUTING.md` — contribution policy
- `CODE_OF_CONDUCT.md` — community expectations

Recommended repo-root context stack:

```text
README.md        # What this repo is
me.md            # Who the human/studio is and how to collaborate
DESIGN.md        # What the interface/brand should look like
AGENTS.md        # How agents should operate in this repo
CONTRIBUTING.md  # How humans should contribute
```

## 13. Versioning

This draft uses semantic versioning.

Current version:

```text
0.1.0
```

Breaking changes should increment the minor version until `1.0.0`.

## 14. Future extensions

Likely future additions:

- machine-readable project objects
- token-budget profiles
- multi-person team files
- private/public diff tooling
- redaction assistant
- JSON export
- model-specific compilation
- signed provenance metadata
- compatibility with personal knowledge graphs
