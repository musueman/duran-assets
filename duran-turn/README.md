# Duran Turn Worker

Combined turn UI worker.

## Endpoints

- `/turn.svg`: one combined turn panel with trace, dialogue, narration, veil, and ST-friendly result blocks.
- `/trace.svg`: compatibility endpoint for the trace section.
- `/veil.svg`: compatibility endpoint for the veil section.

Long narration is passed through `traceBody` and `veilBody` so the chatbot does not expose separate prose outside the rendered panel.

## Deploy

```powershell
npx.cmd --yes wrangler deploy --env dev
npx.cmd --yes wrangler deploy --env prod
```

Deploy `--env dev` to `duran-turn-dev` for the sub chatbot. Use `--env prod` only after the dev worker has been tested and is ready for the main chatbot.
