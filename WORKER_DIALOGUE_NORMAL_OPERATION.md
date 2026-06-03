# Dialogue Worker 정상작동 기준

## 역할

Dialogue Worker는 챗봇이 이미 작성한 대사를 받아 대사 패널로 렌더링하는 Worker다.
중요한 원칙은 "Worker가 대사를 생성하지 않는다"는 것이다. 대사의 작성 책임은 챗봇에 있고, Worker는 표시와 표정 선택만 맡는다.

## 대표 엔드포인트

```text
/chat.svg
/dchat.svg
/dialogue
/dialogue.json
/line.txt
/markdown
/portrait.webp
/manifest.json
```

## 입력 슬롯

```text
대사={챗봇이 작성한 대사}
D={대사 alias}
line={대사 alias}
text={대사 alias}
dialogue={대사 alias}
환경={환경키}
패={장면유형}
카드={장면유형 alias}
관계={관계}
분위기={분위기}
감정={감정}
상황={상황 키워드}
시드={고정 선택용 seed}
모바일={0|1}
형식={svg|json|text|markdown}
```

일반화하면 다음과 같다.

```text
line={표시할 대사}
speaker={화자}
theme={장면 테마}
sceneType={장면 유형}
emotion={표정}
seed={표정 선택 고정값}
format={응답 형식}
```

## 정상작동 흐름

1. 챗봇이 대사와 장면 맥락을 만든다.
2. Worker가 대사 텍스트를 그대로 받는다.
3. 맥락에 맞는 표정 asset을 고른다.
4. `/chat.svg`는 대사 패널 SVG를 반환한다.
5. `/dialogue`는 같은 정보를 JSON metadata로 반환한다.
6. `/line.txt`는 대사 텍스트만 반환한다.
7. `/markdown`은 Markdown 이미지 링크를 반환한다.
8. `/portrait.webp`는 선택된 초상 이미지로 redirect한다.

## 정상작동 판정 기준

- `/manifest.json`이 지원 감정, 상황, 엔드포인트 정보를 반환한다.
- `/chat.svg?대사=...`가 SVG 대사 패널을 반환한다.
- 대사가 비어 있으면 기본 대사 또는 빈 대사 fallback을 안전하게 표시한다.
- `모바일=1`일 때 모바일 비율로 렌더링한다.
- 같은 `시드`와 같은 입력은 가능한 한 같은 표정 선택을 유지한다.
- `/line.txt`는 장식 없이 대사만 반환한다.
- `/markdown`은 바로 붙여 넣을 수 있는 이미지 Markdown을 반환한다.
- Worker가 임의로 새 대사를 창작하지 않는다.

## 챗봇에서 쓰는 방식

```text
![](https://dialogue-worker.example.com/chat.svg?대사={이름|대사}&감정={감정}&분위기={분위기}&시드={seed})
```

## 다른 시스템에 활용하는 방법

Dialogue Worker는 다음처럼 바꿔 쓸 수 있다.

- 비주얼 노벨: 캐릭터 대사창
- 상담 시스템: 상담자/사용자 발화 패널
- 교육 시스템: 튜터 피드백 말풍선
- 게임 로그: NPC 반응 표시

화자와 표정 asset만 바꾸면 세계관 의존성이 크게 줄어든다.

## 통합 이후의 위치

Turn Worker 통합 이후 Dialogue Worker의 아이디어는 Turn Worker 내부 대사/컷씬 영역으로 흡수된다.
단독 Dialogue Worker는 대사 패널 테스트, 초상 asset 확인, 기존 URL 호환용으로 유지할 수 있다.
