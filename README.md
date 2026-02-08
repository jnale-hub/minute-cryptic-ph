# Minute Cryptic PH (minute-cryptic-ph)

Next.js puzzle app for pinoy cryptic clues.

## Quick start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

## What this repo contains

- `app/` — Next.js app routes and client page (`app/page.tsx`) where the game UI.
- `components/` — Presentational pieces (clue display, keyboard, answer grid, hints drawer).
- `hooks/` — `useCrypticGame` contains the game state and handlers.
- `data/` — `clues.ts` holds the clue definitions and metadata.


## Next steps

- Add unit tests for `useCrypticGame` and `AnswerGrid`.
- Page for instructions
- Add new page for creating clue
- Add user log in, and create community
