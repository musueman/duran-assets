# Duran Worker System Docs Page

Public Cloudflare Worker page for browsing the chatbot-worker system guide, split worker operation docs, compatibility notes, integration notes, and full worker source files.

## Pages

- `/`: developer-oriented document/source viewer.
- `/duran-chatbot-full`: beginner-oriented archive with additional system data, character setting, lorebook texts, 500-character lorebook variants, simulation-infinite-prompt character info management, Worker source, and operation docs as final reference material.

## Deploy

```powershell
npx.cmd --yes wrangler deploy --env dev
npx.cmd --yes wrangler deploy --env prod
```

The page fetches Markdown, text, and source files from the public GitHub repository raw URLs, so publish documentation/source changes to GitHub before deploying or refreshing the public page. Only public-safe files should be added to the allowlist.
