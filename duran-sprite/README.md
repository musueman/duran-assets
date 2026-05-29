# Duran Sprite Worker

Scene/Sprite SVG worker for Chronicle of Duran.

## Deploy

```powershell
npx.cmd --yes wrangler deploy --env dev
npx.cmd --yes wrangler deploy --env prod
```

Deploy `--env dev` to `duran-sprite-dev` for the sub chatbot. Use `--env prod` only after the dev worker has been tested and is ready for the main chatbot.
