---
name: replace-with-skill-name
description: Describe what the skill does and when an agent should use it. Include product context, task signals, and the most important boundary.
license: MIT
metadata:
  author: "ShopEx"
  version: "0.1.0"
  product: "replace-with-registered-scope"
---

# Replace With Skill Title

## Goal

State the concrete outcome this skill must produce.

## Workflow

1. Inspect the task context and required inputs.
2. Apply Shopex-specific rules and execute the task.
3. Verify the result with observable evidence.
4. Report the result, limitations, and next action.

## Guardrails

- Stop rather than inventing missing tools, data, APIs, or success results.
- Require explicit confirmation before destructive or high-risk writes.
- Never expose credentials, tokens, customer data, or internal secrets.

## Completion Check

- Confirm the expected artifact or state exists.
- Confirm relevant verification passed.
- State any unresolved limitation clearly.
