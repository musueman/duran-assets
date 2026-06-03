# Worker 호환 및 라우팅 정리

## 목적

호환 계층은 기존 챗봇 출력과 새 통합 구조 사이의 완충지대다.
기존 URL을 바로 폐기하면 진행 중인 세션이 깨질 수 있으므로, 이전 엔드포인트는 가능한 한 새 Worker 또는 새 내부 로직으로 연결한다.

## 호환이 필요한 이유

- 챗봇 로어북에는 오래된 Worker URL이 남아 있을 수 있다.
- 사용자가 이전 응답의 이미지 URL을 다시 열 수 있다.
- 테스트 챗봇과 본 챗봇이 동시에 존재한다.
- dev/prod 주소가 섞이면 본 세션에 실험 기능이 들어갈 수 있다.
- 통합 Worker로 옮기는 동안 개별 Worker를 계속 테스트해야 한다.

## 현재 사용한 호환 패턴

| 이전 또는 보조 경로 | 연결 목적 | 정상 기준 |
| --- | --- | --- |
| `/dchat.svg` | Scene/Sprite 계열 호출을 Dialogue 패널로 연결 | dev는 dev Dialogue, prod는 prod Dialogue로 redirect |
| `/dchat.svg` 또는 `/panel.svg` | Dialogue Worker 내부의 대사 패널 alias | `/chat.svg`와 같은 의미로 동작 |
| `/cutin.svg` | Action Worker의 컷인 alias | `/action.svg`와 같은 목적 |
| `/trace.svg`, `/result.svg` | Turn Worker의 이전 결과 영역 단독 확인 | 통합 `/turn.svg`의 일부를 따로 렌더링 |
| `/veil.svg`, `/scene.svg` | Turn Worker의 다음 상황 영역 단독 확인 | 통합 `/turn.svg`의 일부를 따로 렌더링 |

## dev/prod 라우팅 원칙

```text
dev 챗봇 -> dev Worker만 호출
prod 챗봇 -> prod Worker만 호출
dev Worker 내부 redirect -> dev 대상
prod Worker 내부 redirect -> prod 대상
```

이 원칙이 깨지면 테스트 중인 기능이 본 챗봇에 섞이거나, 본 챗봇의 안정 버전이 테스트 Worker의 asset을 참조하게 된다.

## Worker에서 확인할 항목

- `STAGE=dev`이면 dev 대상 URL을 사용한다.
- `STAGE=prod`이면 prod 대상 URL을 사용한다.
- query로 명시한 `stage=dev` 또는 `stage=prod`가 있으면 그 값을 우선한다.
- hostname에 `-dev`가 있으면 dev로 추론한다.
- 명시값이 없으면 안전한 기본값을 정한다.

## HTTP 호환 처리

Worker는 브라우저, 챗봇 미리보기, Markdown 렌더러가 다양한 요청을 보낼 수 있다는 점을 고려해야 한다.

정상 기준:

- `GET`은 실제 결과를 반환한다.
- `HEAD`는 본문 없이 같은 상태와 주요 헤더를 반환한다.
- `OPTIONS`는 CORS preflight로 204 또는 안전한 응답을 반환한다.
- 허용하지 않는 method는 405를 반환한다.
- 존재하지 않는 path는 404를 반환한다.
- SVG 응답은 `image/svg+xml` 계열 content-type을 사용한다.
- JSON 응답은 `application/json` 계열 content-type을 사용한다.

## URL 파라미터 호환

챗봇과 Worker가 오래 사용되면 같은 의미의 키가 여러 이름으로 생긴다.
호환 계층은 alias를 받아주되, 내부에서는 하나의 정본 이름으로 정규화해야 한다.

예시:

```text
대사 / D / line / text / dialogue -> line
패 / 카드 / card -> sceneType
환경 / env / theme -> theme
능력 / ability / ab -> ability
색틈 / tint / ti / bonus -> bonus
```

정상 기준은 "입력 alias는 넓게 받고, 출력/내부 변수는 좁게 유지"다.

## asset fallback 기준

호환 중 가장 흔한 장애는 asset 누락이다.
정상 Worker는 특정 이미지가 없더라도 전체 SVG가 깨지지 않아야 한다.

권장 fallback:

- 환경 asset 누락 -> 기본 환경
- 표정 asset 누락 -> 기본 표정
- 성공/실패 asset 누락 -> 기본 결과 이미지
- 카드 배경 누락 -> 기본 카드 배경
- 파일 목록 API 실패 -> 사전에 지정한 fallback 파일명

## 통합 전환 시 권장 절차

1. 기존 Worker 엔드포인트를 문서화한다.
2. 새 Turn Worker에서 같은 정보가 표시되는지 확인한다.
3. 기존 엔드포인트를 alias 또는 redirect로 남긴다.
4. dev 챗봇에서 새 구조를 검증한다.
5. prod 챗봇의 로어북 URL을 마지막에 바꾼다.
6. 오래된 엔드포인트는 최소 한동안 유지한다.

## 다른 프로젝트에 적용하는 방법

작은 프로젝트라면 호환 계층이 필요 없을 수 있다.
하지만 공개 챗봇, 장기 세션, 여러 사용자가 있는 프로젝트라면 호환 계층이 필요하다.

일반화 예시:

```text
/old-dialogue.svg -> /chat.svg
/result.svg       -> /turn.svg?view=result
/next.svg         -> /turn.svg?view=next
/cutin.svg        -> /action.svg
```

핵심은 사용자가 이미 받은 URL을 가능한 한 살려두면서, 새 구조로 천천히 이동하는 것이다.
