# Duran Worker Deployment Split

본 챗봇에 실험 기능이 바로 들어가지 않도록 워커를 `dev`와 `prod`로 나눈다.

## Worker URLs

### Dev, 서브 챗봇 전용

- Dice: `https://dice-dev.musueman.workers.dev`
- Dialogue: `https://dchat-dev.musueman.workers.dev`
- Scene/Sprite: `https://duran-sprite-dev.musueman.workers.dev`
- Action: `https://duran-action-dev.musueman.workers.dev`
- Turn UI: `https://duran-turn-dev.musueman.workers.dev`

### Prod, 본 챗봇 전용

- Dice: `https://dice.musueman.workers.dev`
- Dialogue: `https://dchat.musueman.workers.dev`
- Scene/Sprite: `https://duran-sprite.musueman.workers.dev`
- Action: `https://duran-action.musueman.workers.dev`
- Turn UI: `https://duran-turn.musueman.workers.dev`

## Deploy Rule

실수 방지를 위해 배포 명령에는 항상 `--env dev` 또는 `--env prod`를 명시한다. 본 챗봇에 적용할 때만 `--env prod`를 쓴다.

### Duran Sprite

```powershell
Set-Location .\duran-sprite
npx.cmd --yes wrangler deploy --env dev
npx.cmd --yes wrangler deploy --env prod
```

### Dice

```powershell
npx.cmd --yes wrangler deploy --config wrangler.dice.toml --env dev
npx.cmd --yes wrangler deploy --config wrangler.dice.toml --env prod
```

### Duran Dialogue

```powershell
Set-Location .\dchat
npx.cmd --yes wrangler deploy --env dev
npx.cmd --yes wrangler deploy --env prod
```

### Duran Action

```powershell
Set-Location .\duran-action
npx.cmd --yes wrangler deploy --env dev
npx.cmd --yes wrangler deploy --env prod
```

### Duran Turn

```powershell
Set-Location .\duran-turn
npx.cmd --yes wrangler deploy --env dev
npx.cmd --yes wrangler deploy --env prod
```

## Chatbot Rule

- 서브 챗봇 로어북은 dev URL만 쓴다.
- 본 챗봇 로어북은 prod URL만 쓴다.
- `duran-sprite-dev`의 `/dchat.svg` 호환 경로는 dev dchat으로, prod sprite는 prod dchat으로만 연결한다.
- 새 기능은 dev 워커와 서브 챗봇에서 먼저 확인한다.
- 카드, 장면, 대사, 모바일 표시까지 `duran-turn`에서 확인된 뒤 prod에 배포한다.
- prod 배포 후에만 본 챗봇 로어북 URL을 바꾼다.

## Lorebook URL Sets

### Dev

```txt
https://dice-dev.musueman.workers.dev/card.svg
https://dchat-dev.musueman.workers.dev/chat.svg
https://duran-sprite-dev.musueman.workers.dev/scene.svg
https://duran-action-dev.musueman.workers.dev/action.svg
https://duran-turn-dev.musueman.workers.dev/turn.svg
```

### Prod

```txt
https://dice.musueman.workers.dev/card.svg
https://dchat.musueman.workers.dev/chat.svg
https://duran-sprite.musueman.workers.dev/scene.svg
https://duran-action.musueman.workers.dev/action.svg
https://duran-turn.musueman.workers.dev/turn.svg
```
