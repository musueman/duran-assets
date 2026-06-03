# Dice Worker 정상작동 기준

## 역할

Dice Worker는 숫자와 카드 값을 시각 자료로 바꾸는 Worker다.
챗봇이 판정값을 만들거나 주사위 매크로를 남기면, Worker는 그 값을 받아 주사위 이미지, 카드 이미지, 카드+주사위 합성 SVG를 출력한다.

이 Worker는 서사를 만들지 않는다.
규칙 계산의 최종 책임도 챗봇 시스템 또는 Turn Worker에 있고, Dice Worker는 전달받은 값을 표시한다.

## 대표 엔드포인트

```text
/dice.webp
/dice.svg
/card.svg
/card-base.webp
/card-back.jpg
/manifest.json
/preview
```

## 입력 슬롯

```text
값={0-8}
면={6|8}
카드={a|b}
환경={환경키}
애니={0|1}
```

일반화해서 쓰면 다음과 같다.

```text
value={표시할 숫자}
sides={주사위 면수}
card={카드 타입}
theme={카드 배경 테마}
animated={0|1}
```

## 정상작동 흐름

1. 챗봇이 판정값 또는 카드값을 URL 파라미터로 넘긴다.
2. Worker가 값과 면수를 읽는다.
3. `/dice.webp`는 주사위 단독 이미지를 반환한다.
4. `/dice.svg`는 SVG 주사위 표시를 반환한다.
5. `/card.svg`는 카드 배경 위에 주사위 값을 합성해 반환한다.
6. `/manifest.json`은 지원 엔드포인트와 사용 가능한 URL 패턴을 반환한다.

## 정상작동 판정 기준

- `/manifest.json`이 200 JSON으로 응답한다.
- `/dice.webp?값=6&면=6`이 WebP 이미지로 응답한다.
- `/dice.svg?값=8&면=8`이 SVG로 응답한다.
- `/card.svg?카드=a&환경=전장&값=6&면=6`이 카드+주사위 SVG로 응답한다.
- 값 `0`은 표시값으로 유지하되, 필요한 경우 내부 asset fallback은 안전한 값으로 처리한다.
- 카드 타입과 환경이 비정상이어도 기본 카드/기본 환경으로 fallback된다.
- 챗봇이 만든 Markdown 이미지 URL이 깨지지 않는다.

## 챗봇에서 쓰는 방식

```text
![](https://worker.example.com/card.svg?카드=a&환경={환경키}&값={{d6,1}}&면=6)
![](https://worker.example.com/card.svg?카드=b&환경={환경키}&값={목표값}&면=8)
```

## 다른 시스템에 활용하는 방법

Dice Worker는 게임이 아니어도 쓸 수 있다.

- 학습 시스템: 점수/난도 표시
- 상담 플로우: 위험도 단계 표시
- 업무 자동화: 우선순위 카드 표시
- 추리 게임: 단서 신뢰도 또는 난도 표시

이때 `값`, `면`, `카드`, `환경`을 각각 `score`, `scale`, `cardType`, `theme` 같은 일반 이름으로 바꾸면 된다.

## 주의할 점

- 챗봇이 직접 숫자를 임의로 바꾸지 않게 한다.
- URL 예약문자 치환 규칙을 시스템에 넣는다.
- 카드/주사위 표시가 판정 정본이면 다음 턴은 이 SVG에 표시된 값을 기준으로 이어가야 한다.
- Turn Worker로 통합한 뒤에도 Dice Worker는 내부 합성 재료로 계속 쓸 수 있다.
