# Scene/Sprite Worker 정상작동 기준

## 역할

Scene/Sprite Worker는 현재 장면의 환경, 카드 유형, 관계, 분위기, 감정을 받아 장면 SVG를 렌더링하는 Worker다.

챗봇은 "어떤 장면인가"를 슬롯으로 넘기고, Worker는 그 슬롯을 바탕으로 배경, 캐릭터 위치, 애니메이션, 환경 효과를 조합한다.

## 대표 엔드포인트

```text
/scene.svg
/duran.svg
/dchat.svg
/
```

`/dchat.svg`는 통합 전환 과정에서 Dialogue Worker로 넘기는 호환 경로로 사용했다.

## 입력 슬롯

```text
환경={전장|숲|폐허|성벽|검문소|지하|실내}
카드={위협|교환|조우|조사|이동|정비}
패={카드와 같은 의미의 alias}
관계={우호|중립|낯섦|적대}
분위기={평온|긴장|위험|불안|조사|이동|정비}
감정={경계|불안|결의|충격|피로|숙고|단호...}
모바일={0|1}
시드={고정 선택용 seed}
```

일반화하면 다음과 같다.

```text
theme={장소 또는 배경}
sceneType={장면 유형}
relation={인물 관계}
mood={장면 분위기}
emotion={주요 감정}
mobile={0|1}
seed={선택 고정값}
```

## 정상작동 흐름

1. 챗봇이 환경/카드/관계/분위기/감정 슬롯을 만든다.
2. Worker가 각 슬롯을 정규화한다.
3. 지원하지 않는 값은 기본값으로 fallback한다.
4. Worker가 배경, 캐릭터, 효과, 애니메이션을 SVG로 조립한다.
5. 모바일 요청이면 모바일 레이아웃 기준으로 조정한다.
6. `HEAD`, `OPTIONS` 요청은 본문 없이 안전하게 응답한다.

## 정상작동 판정 기준

- `/scene.svg`가 200 SVG로 응답한다.
- 잘못된 환경/카드 값이 들어와도 기본 장면으로 fallback된다.
- 모바일 강제 옵션이 레이아웃을 깨지 않는다.
- `/dchat.svg` 호환 경로는 dev에서는 dev Dialogue로, prod에서는 prod Dialogue로 연결된다.
- `OPTIONS /scene.svg`는 CORS preflight로 안전하게 응답한다.
- `HEAD /scene.svg`는 본문 없이 성공 상태를 반환한다.
- SVG 안 이미지 경로가 깨져도 전체 SVG가 빈 화면이 되지 않는다.

## 챗봇에서 쓰는 방식

```text
![](https://scene-worker.example.com/scene.svg?환경={환경키}&카드={장면유형}&관계={관계}&분위기={분위기}&감정={감정})
```

## 다른 시스템에 활용하는 방법

Scene/Sprite Worker는 다음 프로젝트에 그대로 응용할 수 있다.

- 비주얼 노벨 배경 연출
- 교육 시나리오 장면 카드
- 상담 플로우의 상태 시각화
- 추리 게임의 장소/단서 패널
- 업무 프로세스의 단계별 상황판

핵심은 "챗봇이 이미지를 설명하지 않고, 장면 선택에 필요한 키만 넘긴다"는 점이다.

## 통합 이후의 위치

Turn Worker 통합 이후 Scene/Sprite Worker는 단독 호출 대상에서 내부 장면 렌더링 재료로 역할이 바뀐다.
운영 챗봇은 가능하면 `/turn.svg`만 호출하고, Scene/Sprite Worker는 Turn Worker 내부 또는 테스트용으로 사용한다.
