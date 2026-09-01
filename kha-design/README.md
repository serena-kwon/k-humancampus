# KHA 교수자 콘솔 — 인터랙티브 프로토타입

claude.ai/design 프로젝트 **KHA 교수자 디자인**에서 가져온 `KHA 교수자 콘솔.dc.html`을,
런타임까지 포함해 **어디서든 그대로 동작하도록** 묶은 패키지입니다.

원본: https://claude.ai/design/p/11991ab7-c1cf-49b0-a377-a43aaba7abc3?file=KHA+교수자+콘솔.dc.html

## 열어보기

`KHA 교수자 콘솔.dc.html`을 브라우저(Chrome/Edge/Safari)에서 열면 됩니다.

- 더블클릭(`file://`)으로 바로 열림 — 별도 서버 불필요
- 정적 서버로 띄워도 동일 (`python3 -m http.server 8080` 후 `http://localhost:8080/KHA%20교수자%20콘솔.dc.html`)
- 폰트(Pretendard, Noto Serif KR)만 CDN에서 받으므로, 오프라인이면 시스템 폰트로 대체 렌더됩니다. 나머지는 전부 로컬.

## 파일 구성

| 경로 | 역할 |
|---|---|
| `KHA 교수자 콘솔.dc.html` | 화면 마크업 + 상태/데모 데이터 (`<script data-dc-script>` 안의 `Component` 클래스) |
| `support.js` | Claude Design 런타임 (`{{ }}` 템플릿, `sc-if`/`sc-for`, 상태 바인딩을 React로 렌더) |
| `image-slot.js` | `<image-slot>` 커스텀 엘리먼트 (이미지 플레이스홀더, 여기선 읽기 전용) |
| `vendor/` | React 18.3.1 / ReactDOM / Babel standalone 7.29.0 — 원본이 unpkg에서 받던 것을 로컬화 (SRI 해시 검증 완료) |
| `vendor/resources.js` | `support.js`의 `window.__resources` 훅으로 위 로컬 파일을 가리키는 1-파일 매핑. 원본 대비 유일한 수정은 html `<head>`에 이 스크립트 한 줄 추가 |
| `assets/w-symbol-dark.png` | 사이드바 로고 |
| `.image-slots.state.json` | image-slot이 fetch하는 sidecar (빈 객체) |

## 화면 구조 (개발 참고)

상태는 `Component.state`, 파생값/핸들러는 `renderVals()`에 모여 있습니다. 최상위 분기는 `state.screen`:

- `dashboard` — 대시보드 (큐 6건)
- `lecture` — 강의/평가 관리: `view` = `list`(리스트/카드 모드, 상태·트랙·정렬 드롭다운) / `detail`(트랙 편집, 퀴즈·최종평가 설정, 챕터) / `create`(4단계 생성 위저드)
- `assignment` — 과제 관리 (기본 진입): `assignTab` = `list`(필터·정렬·채점 완료 숨기기, 생성/편집 모달, 루브릭) / `grading`(채점함, 정렬, 확정/이의 상태, 슬라이드오버 상세, 레일)
- 나머지 메뉴(수강생·알림·출석·화상세션·동영상·공지·게시판·마이페이지)는 플레이스홀더 — 각각 별도 `.dc.html`이 같은 디자인 프로젝트에 있음

색상 토큰: navy `#223142`, text `#3E4E68`, muted `#8494A3`, accent `#C1694A`, 기관 트랙 `#96764C`, 오픈 트랙 `#78899A`.
