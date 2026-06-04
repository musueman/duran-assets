# 듀란일대기 홈페이지

Cloudflare Workers에서 구동하는 `듀란일대기` 홈페이지입니다. 첫 화면은 Arcadia 세계도로 분위기를 만들고, 본문에는 `아르카디아 원초기` Markdown 원고를 책형 뷰어로 넣었습니다.

## 구성

- `index.html`: 로컬 미리보기 진입점
- `homepage.js`: 화면, 원고 뷰어, 책장 전환 스크립트를 렌더링하는 공유 템플릿
- `manuscript-data.js`: 원본 Markdown을 장/절/구절 단위로 변환한 데이터 모듈
- `worker.js`: Cloudflare Worker 진입점
- `assets/arcadia-map.png`: Arcadia 고전 세계도
- `assets/ornament-*.png`: 제공받은 투명 PNG 장식띠

## 기획 방향

- 첫 화면은 지도와 원고 표지를 결합해 판타지 신호를 명확하게 줍니다.
- 원고는 상위 `서` 단위의 책장으로 나누고, 각 하위 절에 앵커를 달았습니다.
- 좌측 목차에서 장/절 이동, 검색 필터, 이전/다음 책장 이동을 제공합니다.
- 책장 전환은 CSS 3D transform 기반의 페이지 넘김 효과를 사용합니다.

## Worker 메모

`worker.js`는 Cloudflare Worker module syntax를 사용합니다. `/assets/...` 경로는 Worker Assets 루트 파일로 재매핑합니다. `ASSET_BASE_URL` 환경 변수를 지정하면 외부 asset base에서 이미지를 불러올 수 있습니다.

`wrangler.toml`에는 `assets` 바인딩을 포함해 두었습니다.
