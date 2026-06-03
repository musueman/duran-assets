# Action Worker 정상작동 기준

## 역할

Action Worker는 사용자의 행동과 판정 결과를 받아 컷인, 성공/실패 연출, 캐릭터 표정, 배경 효과를 합성하는 Worker다.

이 Worker는 "행동의 결과를 화면적으로 강조"하는 역할이다.
판정 자체를 새로 만들거나 서사를 진행하지 않는다.

## 대표 엔드포인트

```text
/action.svg
/cutin.svg
/health.json
/
```

## 입력 슬롯

```text
env={환경}
P={주사위값}
ab={능력값}
ability={능력값 alias}
it={소비값}
item={소비값 alias}
ti={색틈/보정값}
tint={색틈/보정값 alias}
target={목표값}
act={행동요약}
action={행동요약 alias}
card={카드/장면유형}
emotion={감정}
result={성공|부분성공|실패}
```

일반화하면 다음과 같다.

```text
theme={배경 테마}
roll={판정값}
ability={능력 보정}
item={소비 보정}
bonus={상황 보정}
target={목표 난도}
action={행동 요약}
result={결과}
emotion={연출 감정}
```

## 정상작동 흐름

1. 챗봇 또는 Turn Worker가 행동, 판정값, 목표값, 결과를 넘긴다.
2. Worker가 성공/실패/부분성공을 판별한다.
3. 환경과 행동 키워드에 맞는 배경을 고른다.
4. 결과에 맞는 표정과 효과를 고른다.
5. `/action.svg` 또는 `/cutin.svg`로 컷인 SVG를 반환한다.
6. 누락된 asset은 fallback 표정/배경으로 대체한다.

## 정상작동 판정 기준

- `/health.json`이 200 JSON으로 응답한다.
- `/action.svg`가 200 SVG로 응답한다.
- `/cutin.svg`가 `/action.svg`와 같은 목적의 호환 엔드포인트로 동작한다.
- 성공/실패 결과에 따라 표정과 효과가 달라진다.
- 불안/위험/추격/실패 같은 키워드가 위험 계열 표정을 고른다.
- asset 목록이 일부 비어 있어도 fallback으로 화면이 유지된다.
- Worker가 새 행동이나 새 결과를 창작하지 않는다.

## 챗봇에서 쓰는 방식

```text
![](https://action-worker.example.com/action.svg?env={환경}&P={판정값}&ability={능력}&item={소비}&tint={보정}&target={목표}&action={행동요약}&result={결과})
```

## 다른 시스템에 활용하는 방법

Action Worker는 다음 프로젝트에 응용할 수 있다.

- 게임: 공격/회피/조사 성공 컷인
- 학습: 정답/오답/부분 정답 피드백 연출
- 상담: 위험도 상승/완화 시각 효과
- 업무 플로우: 승인/반려/보류 결과 카드

핵심은 결과 연출을 챗봇 본문에서 분리하는 것이다.

## 통합 이후의 위치

Turn Worker 통합 이후 Action Worker의 성공/실패 연출과 표정 선택 로직은 Turn Worker의 결과 영역으로 흡수될 수 있다.
Action Worker는 개별 컷인 테스트 또는 외부에서 결과만 강조하고 싶을 때 유지한다.
