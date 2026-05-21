# Privacy Guide

`me.md` is powerful because it concentrates personal and professional context. That also makes it risky.

## Public files

Public files should not contain:

- private email addresses
- phone numbers
- street addresses
- API keys
- financial information
- confidential strategy
- private relationship details
- health information
- legal details
- anything not meant for search engines

## Visibility levels

Use the `visibility` field honestly.

```yaml
visibility: "public"
```

Safe to publish.

```yaml
visibility: "team"
```

For collaborators.

```yaml
visibility: "private"
```

For private agents and personal use.

```yaml
visibility: "confidential"
```

Contains sensitive information and should be tightly controlled.

```yaml
visibility: "redacted"
```

Derived from a richer file with sensitive details removed.

## Redaction pattern

Use a note like:

```md
This is a public-safe file derived from a fuller private version. It omits private contact details, unreleased strategy, and sensitive personal context.
```

## Agent handling

Agents consuming `me.md` should:

- avoid restating private context unless relevant
- avoid exposing the file in public outputs
- treat missing details as possibly intentional
- prefer current task instructions over stale context
- suggest updating the file after repeated corrections
