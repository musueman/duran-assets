# duran-assets

워커 배포는 dev/prod로 분리한다. 새 기능은 먼저 `*-dev.musueman.workers.dev`에 올리고 서브 챗봇에서 확인한 뒤, 검증된 것만 `--env prod`로 본 챗봇용 워커에 올린다.

자세한 명령과 URL 기준은 [DEPLOYMENT.md](DEPLOYMENT.md)를 본다.

시스템/로어북/캐릭터 프롬프트 수정 기준은 [DURAN_PROMPT_RULES.md](DURAN_PROMPT_RULES.md)를 먼저 확인한다.
