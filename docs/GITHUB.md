# GitHub Setup

The intended repository name is:

```text
me.md
```

Suggested description:

```text
A portable Markdown context standard for AI collaboration.
```

Suggested visibility:

```text
public
```

## Push after creating an empty GitHub repo

```bash
git init
git add .
git commit -m "Initial me.md standard"
git branch -M main
git remote add origin git@github.com:cunningfolkmedia/me.md.git
git push -u origin main
```

## Validate locally

```bash
npm install
node bin/me-md.js lint me.md
node bin/me-md.js inspect me.md
```

## Recommended repo topics

```text
llm
ai-agents
markdown
personal-context
context-engineering
agent-instructions
docs-as-code
```
