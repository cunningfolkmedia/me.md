# LLM Usage Guide

## For users

Place `me.md` in the root of a project and tell your assistant:

```text
Read ./me.md first. Treat it as durable collaboration context. Use it to understand who I am, what I am building, how I work, what voice/style to preserve, and what constraints matter.
```

## For agents

When a repository contains `me.md`:

1. Read it before beginning substantial work.
2. Use it as durable context, not as the user’s current task.
3. Use current user instructions as the highest-priority task direction.
4. Use project-specific files as factual sources for project details.
5. Use `me.md` for voice, preferences, collaboration style, and recurring context.
6. Do not expose sensitive details from private files.
7. If the file appears stale, say what might need updating.

## Conflict handling

Recommended priority:

1. Current user message.
2. Explicit project source files.
3. Local agent instructions.
4. `me.md`.
5. General model knowledge.

## Prompt pattern

```text
Before answering, read me.md. Preserve the user’s project context, voice, constraints, and workflow preferences. Do not summarize the file unless asked. Use it silently to improve the work.
```

## Token budgeting

For long files, agents may first extract:

- Operating Contract
- Preferences and Constraints
- active project entries matching the current task
- Privacy and Boundaries

Then read deeper as needed.
