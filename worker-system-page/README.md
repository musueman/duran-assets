# Duran Worker System Docs Page

Public Cloudflare Worker page for browsing the chatbot-worker system guide, split worker operation docs, compatibility notes, integration notes, and full worker source files.

## Deploy

```powershell
npx.cmd --yes wrangler deploy --env dev
npx.cmd --yes wrangler deploy --env prod
```

The page fetches Markdown and source files from the public GitHub repository raw URLs, so publish documentation/source changes to GitHub before deploying or refreshing the public page.
