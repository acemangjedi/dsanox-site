## Before coding

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If something is unclear, stop and ask. Don't hide confusion.
- If a simpler approach exists, say so. Push back when warranted.

## Writing code

- Minimum code that solves the problem. Nothing speculative.
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If 200 lines could be 50, rewrite it.
- Test: would a senior engineer call this overcomplicated? If yes, simplify.

## Editing existing code

- Touch only what the request requires.
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code — mention it instead.
- Test: every changed line should trace directly to the request.

## Execution

- Transform vague tasks into verifiable goals:
  - "fix the bug" → "write a test that reproduces it, then make it pass"
  - "add validation" → "write tests for invalid inputs, then make them pass"
  - "refactor X" → "ensure tests pass before and after"
- For multi-step tasks, state a brief plan with a verification check per step:
  1. [step] → verify: [check]
  2. [step] → verify: [check]
- Loop until the checks pass. Don't declare done without verification.

## Lessons learned

Before non-trivial changes, check `context/errors.md` for past mistakes.

Propose adding an entry to `context/errors.md` whenever the user corrects
a mistake of yours AND at least one of these is observably true:

- the user had to explain the cause (not just point at the symptom)
- you attempted a fix that didn't work before landing on the right one
- the final solution uses a different approach than your first attempt
- the user explicitly said the mistake should be remembered

Do not propose entries for mistakes you caught and fixed yourself without
user intervention. Each entry: symptom + cause + rule. Keep it short.

## Project context (load on demand)

Project-specific context lives in `context/`. Read only the files relevant
to the current task. For trivial edits (copy changes, styling tweaks,
typos), skip entirely.

- `context/overview.md` — what this project does, domain terms
- `context/stack.md` — languages, frameworks, key dependencies
- `context/architecture.md` — module layout and data flow
- `context/frontend.md` — UI components, routing, state management
- `context/backend.md` — API endpoints, services, auth
- `context/data.md` — DB schema, migrations, query patterns
- `context/conventions.md` — naming, folder structure, style rules
- `context/commands.md` — build, test, deploy, lint commands
- `context/testing.md` — test framework and patterns
- `context/errors.md` — recurring mistakes to avoid (see "Lessons learned")

If a file listed above doesn't exist in this project, it doesn't apply.
