# Authoring Guide

A strong `me.md` is not a diary, résumé, brand deck, or custom instruction junk drawer. It is a working context interface.

The best files are specific enough to change the behavior of an LLM.

## Good context beats more context

Weak:

```md
I like good writing.
```

Strong:

```md
For long-form prose, avoid staccato one-sentence paragraphs. Use flowing, immersive, sentence-varied writing with atmosphere, narrative gravity, and concrete sensory detail.
```

Weak:

```md
I have many projects.
```

Strong:

```md
### Technonomicon

Type: Flagship nonfiction book / technomancy grimoire  
Status: Active major project  
Purpose: Explores AI-assisted magick, divination, spirit channeling, constructed entities, machine consciousness, technomancy, ritual prompting, synthetic spirits, AI oracles, and generative systems as magical media.  
Notes: Desired style is narrative grimoire: lived scene, theory, protocol, debrief.
```

## Write for future agents

Assume the agent has never worked with you before. It should learn:

- how you make decisions
- what projects exist
- what quality means to you
- what you hate repeating
- what to preserve
- what to avoid
- where to slow down
- where to move fast

## Use stable facts

Good `me.md` content should remain useful for weeks or months. Avoid stuffing it with temporary errands, fleeting moods, or task-specific details better suited for an issue, ticket, or project plan.

## Separate public and private context

A public file should be safe to publish. A private file can be richer. Do not mix them casually.

Recommended split:

```text
public.me.md     # open-source safe
private.me.md    # private working context
project.me.md    # project-specific active details
```

## Keep a changelog

When the file changes, update `## Update Log`. This helps agents assess freshness and lets human collaborators see what shifted.
