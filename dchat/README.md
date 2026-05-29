# Duran Dialogue Worker

Cloudflare Worker for rendering a Duran dialogue panel from the chatbot's existing D line and the same scene-emotion inputs used by `duran-sprite`.

## Endpoints

- `GET /chat.svg?환경=전장&패=위협&관계=적대&분위기=위험&감정=경계&대사=조용히 하세요`
- `POST /dialogue` with JSON body, for example `{ "환경": "숲", "패": "조사", "관계": "중립", "분위기": "조사", "감정": "숙고", "대사": "발자국이 한 방향으로만 나 있지 않습니다." }`
- `GET /dialogue?...` returns JSON metadata for the same panel.
- `GET /line.txt?...` returns only the passed dialogue text.
- `GET /markdown?...` returns a markdown image link to the rendered panel.
- `GET /portrait.webp?...` redirects to the selected high-resolution dialogue emotion WebP.
- `GET /manifest.json` lists supported emotions, situations, expressions, and endpoints.

## Useful Query Keys

- Same as `duran-sprite`: `환경`, `패` or `카드`, `관계`, `분위기`, `감정`
- Dialogue text from chatbot: `대사`, `D`, `line`, `text`, `dialogue`
- Optional: `상황`, `시드`, `형식`

The worker does not generate dialogue. It only echoes the passed Duran line and chooses the dialogue-face asset from `visual/대사`.

`/chat.svg` renders a 4:1 panel at `700x175` on desktop. Mobile requests render a 3:1 panel at `700x233.33` with larger text; `모바일=1` forces the mobile layout and `모바일=0` forces desktop. The left square uses the selected expression image as a top-anchored close-up inside an 85% circular face window, and the right side contains the passed dialogue in a speech bubble.

Dialogue animation loops as `기본 2s` -> `typing dialogue 2s` -> `selected emotion expression 2s` -> repeat. While the typing animation is running, the face swaps instantly to `대화`; dangerous, hostile, or anxious scenes use `불안대화` instead. Hidden face layers stay barely visible to keep browser decoding warm and reduce transition flicker.

If `시드` or `seed` is supplied, the selected portrait frame is stable for the same inputs.

## Deploy

```powershell
npx.cmd --yes wrangler deploy --env dev
npx.cmd --yes wrangler deploy --env prod
```

Deploy `--env dev` to `dchat-dev` for the sub chatbot. Use `--env prod` only after the dev worker has been tested and is ready for the main chatbot.
