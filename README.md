# me.md

A portable, Markdown-based context standard for telling an LLM, coding agent, collaborator, or future self who you are, what you are building, how you work, and how to collaborate with you.

`me.md` is inspired by the same broad pattern as `DESIGN.md` and `SKILL.md`: a single durable file that gives an AI system a structured source of truth before it starts working. Where `DESIGN.md` describes a visual identity and `SKILL.md` describes an operational capability, `me.md` describes a person, studio, practice, project constellation, preferences, constraints, workflows, and current context.

The goal is simple:

> Drop a `me.md` into a project root and an unfamiliar LLM should immediately understand the human, the work, the voice, the context, and the collaboration contract.

## Why this exists

Most AI collaboration starts cold. The model does not know your projects, style, stack, taboos, decision-making taste, current priorities, or the difference between a casual sketch and something you expect to ship. People compensate by re-explaining themselves in every chat, or by stuffing chaotic memories into custom instructions.

`me.md` gives that context a format.

It is:

- **Portable** — plain Markdown with YAML front matter.
- **Human-readable** — useful even without tooling.
- **Machine-parseable** — predictable metadata and section order.
- **Privacy-aware** — supports visibility levels and redaction notes.
- **Lintable** — includes a reference CLI.
- **Project-friendly** — can live at the root of a repo beside `README.md`, `DESIGN.md`, `AGENTS.md`, `CLAUDE.md`, or `SKILL.md`.

## Install

```bash
npm install
npm run lint -- examples/cunningfolk.me.md
```

Or run the CLI directly:

```bash
node bin/me-md.js lint me.md
node bin/me-md.js inspect me.md
```

## File naming

The canonical file name is:

```text
me.md
```

Optional variants:

```text
team.me.md
studio.me.md
public.me.md
private.me.md
```

## Basic structure

A valid `me.md` contains YAML front matter followed by ordered `##` sections.

```md
---
me_md_version: "0.1.0"
profile:
  display_name: "Mark Coates"
  preferred_name: "Mark"
  role: "Founder, Writer, Technomancer"
  organization: "Cunning Folk Media"
visibility: "public"
updated: "2026-05-21"
tags:
  - publishing
  - technomancy
  - creative-direction
---

## Operating Contract

How an assistant should work with this person.

## Identity

Who this person is, in practical context.

## Mission

What this person or organization is trying to do.

## Project Constellation

The active and recurring projects.

## Voice and Style

How the work should sound and feel.

## Preferences and Constraints

Known likes, dislikes, rules, and hard requirements.

## Workflows and Tools

How the work gets done.

## Knowledge Domains

Relevant domains, references, and recurring intellectual territory.

## Collaboration Protocol

How to plan, draft, revise, and ship work.

## Privacy and Boundaries

What should not be assumed, exposed, or published.

## Update Log

A short changelog for future maintainers.
```

## Required sections

The current draft spec requires these `##` headings, in this order:

1. `## Operating Contract`
2. `## Identity`
3. `## Mission`
4. `## Project Constellation`
5. `## Voice and Style`
6. `## Preferences and Constraints`
7. `## Workflows and Tools`
8. `## Knowledge Domains`
9. `## Collaboration Protocol`
10. `## Privacy and Boundaries`
11. `## Update Log`

The required order makes the file fast for agents to scan and easy for lint tools to validate.

## Repo contents

```text
.
├── me.md                         # Cunning Folk public sample
├── SPEC.md                       # Format specification
├── README.md                     # Project overview
├── package.json                  # Node CLI package metadata
├── bin/me-md.js                  # CLI entrypoint
├── src/
│   ├── parser.js                 # Front matter + section parser
│   ├── validate.js               # Schema and section validator
│   └── sections.js               # Required section order
├── schema/
│   └── me.schema.json            # JSON Schema for YAML front matter
├── templates/
│   ├── me.template.md            # Full blank template
│   └── me.public.template.md     # Public-safe template
├── examples/
│   ├── minimal.me.md             # Small valid example
│   └── cunningfolk.me.md         # Mark / Cunning Folk example
├── docs/
│   ├── AUTHORING.md              # How to write a strong me.md
│   ├── PRIVACY.md                # Redaction and visibility guidance
│   ├── LLM-USAGE.md              # How agents should consume me.md
│   └── ROADMAP.md                # Future direction
├── .github/
│   └── workflows/
│       └── lint.yml              # GitHub Actions lint workflow
├── LICENSE
└── CONTRIBUTING.md
```

## Design principles

`me.md` should be useful before it is clever.

A good file should let an unfamiliar LLM answer:

- Who is this person?
- What are they building?
- What matters to them?
- How should I collaborate with them?
- What should I avoid?
- What active projects and brands should I know?
- What style, taste, and workflow patterns should I preserve?
- What context is public, private, stale, or uncertain?

## Suggested agent instruction

When using a repository that contains `me.md`, tell the agent:

```text
Before beginning work, read ./me.md and treat it as the collaboration context source of truth. Use it to understand the person, project constellation, voice, constraints, and workflows. Do not expose private details from it unless asked. When project files conflict with me.md, prefer the project file for project-specific facts and me.md for personal/workflow preferences.
```

## Status

Draft specification: `0.1.0`

This is an experimental open format. Expect field names and lint rules to evolve.

## License

MIT for code. Documentation and templates may be reused freely under the terms in `LICENSE`.
