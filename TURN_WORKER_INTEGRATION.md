# Turn Worker 통합 정리

## 목적

Turn Worker는 분리되어 있던 카드, 판정, 장면, 대사, 행동 결과, 상태 표시를 하나의 턴 화면으로 묶는 Worker다.

통합의 목적은 기능을 모두 한곳에 넣는 것이 아니라, 챗봇이 호출해야 하는 표면을 하나로 줄이는 것이다.

```text
이전: 챗봇이 Dice URL + Scene URL + Dialogue URL + Action URL을 직접 조립
이후: 챗봇은 Turn Worker의 /turn.svg 하나만 호출
```

## 대표 엔드포인트

```text
/turn.svg
/trace.svg
/veil.svg
/health.json
/
```

## 엔드포인트 역할

| 엔드포인트 | 역할 |
| --- | --- |
| `/turn.svg` | 한 턴 전체 패널. 운영 챗봇이 최종적으로 호출할 주소 |
| `/trace.svg` | 지난 입력의 결과 영역 단독 렌더링 |
| `/result.svg` | `/trace.svg` alias |
| `/veil.svg` | 다음 상황/새 카드 영역 단독 렌더링 |
| `/scene.svg` | `/veil.svg` alias |
| `/health.json` | 배포 상태와 엔드포인트 확인 |

## 입력 슬롯

```text
상단ST={상단 상태}
하단ST={하단 상태}
env={환경}
P={주사위 또는 판정값}
act={행동 요약}
stat={분류}
ability={능력 보정}
item={소비품 보정}
tint={색틈/상황 보정}
target={직전 목표값}
damage={피해}
reward={보상}
change={변화}
운명의흔적본문={지난 입력의 결과문}
veil={새 목표값}
card={새 장면 유형}
relationship={관계}
mood={분위기}
emotion={감정}
새운명의패본문={다음 입력이 필요한 상황문}
line={컷씬 대사}
```

일반화하면 다음과 같다.

```text
topState
bottomState
theme
roll
action
stat
ability
item
bonus
target
damage
reward
change
resultBody
nextTarget
sceneType
relationship
mood
emotion
nextBody
line
```

## 통합 전 기능 대응

| 분리 Worker 기능 | Turn Worker 안에서의 대응 |
| --- | --- |
| Dice Worker의 카드/주사위 | 판정값, 목표값, 카드 시각 요소로 삽입 |
| Scene/Sprite Worker의 장면 | 현재 환경/장면 유형 기반 배경 또는 장면 영역으로 삽입 |
| Dialogue Worker의 대사 패널 | 컷씬 대사, 말풍선, 장면 대사 시퀀스로 흡수 |
| Action Worker의 컷인 | 결과 영역의 성공/실패 연출로 흡수 |
| 개별 상태창 | 상단ST/하단ST 슬롯으로 통합 |

## 정상작동 흐름

1. 챗봇이 사용자 입력을 처리한다.
2. 지난 입력의 결과를 `운명의흔적본문` 또는 `resultBody`에 넣는다.
3. 피해/보상/변화가 있으면 각각의 슬롯에 넣는다.
4. 다음 상황을 `새운명의패본문` 또는 `nextBody`에 넣는다.
5. 다음 상황은 사용자 입력 직전에서 멈춘다.
6. 챗봇은 `/turn.svg` Markdown 이미지 URL을 만든다.
7. 마지막 줄에 다음 턴용 상태 주석을 출력한다.
8. Turn Worker가 모든 요소를 하나의 SVG 패널로 렌더링한다.

## 챗봇 출력 계약

운영 챗봇은 다음 형태만 출력한다.

```text
상단 고정 이미지
turn.svg Markdown 이미지 URL
<!--STATE ... -->
```

3줄 밖의 서사, 설명, 사과, 다음 행동 유도문은 실패 출력이다.
본문은 모두 URL 내부 본문 슬롯에 들어가야 한다.

## 통합의 장점

- 챗봇이 만드는 URL 수가 줄어든다.
- 모바일/데스크톱 레이아웃을 Worker에서 통제할 수 있다.
- 카드, 대사, 장면, 결과가 하나의 턴으로 보인다.
- 출력 디버그 기준이 단순해진다.
- 시스템 프롬프트가 "어떤 UI를 어떻게 그려라"를 매번 설명하지 않아도 된다.

## 통합의 단점과 대응

| 단점 | 대응 |
| --- | --- |
| Turn Worker가 커진다 | 내부 함수를 Dice/Scene/Dialogue/Action 역할로 분리한다 |
| 특정 영역만 테스트하기 어렵다 | `/trace.svg`, `/veil.svg`, `/health.json`을 유지한다 |
| asset 의존성이 늘어난다 | fallback 파일과 기본 장면을 둔다 |
| URL 파라미터가 길어진다 | 본문 압축, 예약문자 치환, 슬롯명 고정이 필요하다 |
| 챗봇이 URL 밖으로 서술할 수 있다 | 시스템 출력검사와 `!debug`를 둔다 |

## dev/prod 운영

Turn Worker는 dev/prod 분리를 명확히 가져가야 한다.

```text
dev 챗봇  -> turn-worker-dev
prod 챗봇 -> turn-worker
```

Turn Worker가 내부에서 Dice/Scene Worker를 호출한다면, dev Turn은 dev Dice/Scene을, prod Turn은 prod Dice/Scene을 사용해야 한다.

정상 기준:

- dev 환경에서 prod service binding을 쓰지 않는다.
- prod 환경에서 dev service binding을 쓰지 않는다.
- 배포 명령에는 `--env dev` 또는 `--env prod`를 명시한다.
- prod 반영은 dev 챗봇에서 모바일 표시까지 확인한 뒤 진행한다.

## `!debug`와 Turn Worker

`!debug`는 Worker 엔드포인트가 아니라 챗봇 시스템 명령이다.
사용자가 `!debug`를 입력하면 챗봇은 새 턴을 만들지 않고 직전 출력만 검사한다.

정상 동작:

```text
입력: !debug
동작: 직전 turn.svg URL과 STATE를 같은 값으로 재출력
금지: 새 판정, 새 목표값, 새 상태 변화, 새 서사 진행
```

이 명령은 Turn Worker 통합 후 특히 중요하다. 챗봇이 Worker 밖으로 서사를 이어 쓰면 통합 화면의 의미가 깨지기 때문이다.

## 다른 프로젝트에 적용하는 방식

처음부터 아래처럼 설계하면 된다.

```text
/turn.svg?topState=...&bottomState=...&resultBody=...&nextBody=...&line=...
```

프로젝트가 작으면 `/turn.svg` 하나로 충분하다.
프로젝트가 커지면 내부적으로 다음 역할을 분리한다.

```text
renderScoreBlock()
renderSceneBlock()
renderDialogueBlock()
renderActionBlock()
renderStateBlock()
```

외부 엔드포인트는 하나로 유지하고, 내부 함수만 분리하는 방식이 운영 안정성에 유리하다.
