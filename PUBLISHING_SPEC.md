# LucasDev — 최종 퍼블리싱(비주얼/인터랙션) 지시서 (Codex CLI 작업자 전달용)

> 대상: `LucasDev` (Vite + Tailwind v4 + GSAP/ScrollTrigger/SplitText + Lenis + Swiper).
> 목적: **헤더·히어로를 다이나믹/인터랙티브하게** 만들고, **hero-emblem 깨짐을 수정**하며,
> **Hero ↔ active-showcase 배경 단절을 해소**하고, **모든 섹션을 Hero·active-showcase 디자인 언어로 통일**한다.
> ⚠️ 이 문서는 **퍼블리싱(비주얼) 레이어**다. 콘텐츠(텍스트/포트폴리오) 교체는 `PORTFOLIO_SPEC.md` 담당.
> ⚠️ 레이아웃 골격·섹션 순서는 유지하고, 스타일/애니메이션만 개선한다. 작업 후 `npm run build` 통과 필수.

---

## ★ 적용 순서 (3-pass): 퍼블리싱 → 콘텐츠 → 퍼블리싱
이 프로젝트는 아래 **세 단계로 순서대로** 진행한다. 각 단계 끝에 `npm run build` 통과를 확인하고 다음으로.

- **Pass 1 — 퍼블리싱 (이 문서)**: 현재(SOLAIS) 구조 위에서 비주얼/인터랙션을 완성한다.
  - §1 통일 디자인 시스템 구축(토큰·`.grain-overlay`·`.accent-glow`·표준 `.showcase-button`)
  - §2 배경 연결성(Hero↔active-showcase↔전 섹션)
  - §3 hero-emblem 수정
  - §4 헤더 인터랙션 / §5 히어로 모션 / §6 전 섹션 일관화
  - → **목표**: 콘텐츠와 무관하게 "디자인 시스템 + 모션"이 안정적으로 자리잡은 상태.
- **Pass 2 — 콘텐츠 (`PORTFOLIO_SPEC.md`)**: Pass 1의 비주얼을 유지한 채 SOLAIS → 포트폴리오로 교체.
  - SOLAIS 텍스트/섹션 → About/Experience/Skills/Projects/Contact, EN/KO 토글, 프로젝트 카드+모달(더미데이터), 푸터 폼 제거 등.
  - **이때 §1에서 만든 공통 클래스(`.grain-overlay`/`.accent-glow`/`.showcase-button`/토큰)를 신규 마크업에 그대로 사용**한다(새 디자인 만들지 말 것).
- **Pass 3 — 퍼블리싱 (이 문서 재적용)**: 콘텐츠가 들어오며 생긴 **신규 요소**에 디자인 시스템·모션을 마저 입히고 회귀 점검.
  - 신규 요소(프로젝트 카드/상세 모달, 스킬 칩, EN/KO 토글 버튼, Skills 2×2, Experience 카드 등)에 §1 시스템 적용.
  - 콘텐츠 길이 변화로 **hero-emblem 겹침/배경 seam/모션이 깨지지 않았는지 재검증**(§3·§2·§5).
  - 언어 토글로 재렌더 시 **GSAP/ScrollTrigger/Swiper 재초기화가 모션과 충돌하지 않는지** 확인.
  - → **목표**: 콘텐츠 + 비주얼이 한 몸으로 완성, DoD(§8) 충족.

> Pass 3는 새 작업이 아니라 **이 문서의 §1–§7을 콘텐츠 반영본에 다시 한 번 적용/검증**하는 단계다.

---

## 0. 현재 진단 (왜 손봐야 하는가)
1. **배경 단절**: `.hero-section`(app.css:269–272)은 `linear-gradient(90deg, #3c091e → #d7c5bc → #f0ece8 → #f6f4f1)`로 **오른쪽이 밝은 크림**으로 끝남. 반면 `.active-showcase`(app.css:477–481)는 `linear-gradient(135deg, #552134 → #5b122d → #68172e)`로 **전체 다크와인**. → 두 섹션 경계에서 톤이 끊긴다.
2. **hero-emblem 깨짐**(app.css:335–384): 3열 그리드 + `transform: rotate(-5deg) skewX(-21deg)` + `nth-child(4~6)`의 `translateY(clamp(7rem,11vw,11.5rem))` + 개별 `margin-top` 이 서로 충돌 → 칸이 겹치거나 컨테이너 밖으로 삐져나옴, 반응형에서 더 깨짐.
3. **헤더 정적**: 스크롤 시 `is-scrolled` 배경 전환만 있음. 인터랙션 빈약.
4. **히어로 정적**: 파티클/바이너리/엠블럼이 DOM에만 있고 **움직이지 않음**(애니메이션 미적용).

---

## 1. 통일 디자인 시스템 (모든 섹션의 기준)
Hero·active-showcase의 언어를 추출해 **공통 토큰/유틸**로 만들고 전 섹션에 적용한다.

### 1-1. 배경 토큰 (app.css 상단 `:root` 또는 `@theme` 인접에 추가)
```css
:root {
  /* 베이스 와인 스케일 */
  --bg-wine-900: #2a0512;
  --bg-wine-800: #3c091e;   /* 기준색 */
  --bg-wine-700: #5b122d;
  --bg-wine-600: #68172e;
  --bg-wine-500: #771f31;
  /* 액센트 글로우 */
  --glow-red:    rgb(225 73 72 / 28%);
  --glow-orange: rgb(227 75 58 / 40%);
  --glow-soft:   rgb(255 255 255 / 12%);
  /* 라이트(히어로 전용) */
  --cream-100: #f6f4f1;
  --cream-200: #f0ece8;
}
```

### 1-2. 공통 오버레이 유틸 (재사용 클래스)
- `.grain-overlay` — 모든 섹션 위에 얹는 **공통 그레인/노이즈**(현재 `.hero-noise`, `.active-showcase__noise`를 하나로 통일). `position:absolute; inset:0; pointer-events:none; mix-blend-mode:overlay; opacity:.3` + repeating-radial-gradient 점 패턴.
- `.accent-glow` — 섹션 모서리 **레드/오렌지 라디얼 글로우** 1~2개를 일관된 위치/세기로. active-showcase 글로우 값을 표준으로 채택.
- 각 섹션은 `background: var(--bg-wine-800)` 기반 + `.accent-glow` + `.grain-overlay` 조합으로 **같은 결**을 갖는다.

### 1-3. 공통 컴포넌트 톤
- 버튼: `.showcase-button`(clip-path 모서리 컷, hover 시 반전)을 **전 섹션 표준 CTA**로 통일. 기존 `.button` 그라데이션 버튼과 혼용하지 말고 하나로 정리.
- 헤딩: `font-heading`, 대문자, `letter-spacing:-0.05em`, `line-height:.86` (이미 base에 있음) 유지.
- 라벨/키커: 작은 대문자 + 좌측 인디케이터(`i` 바) 패턴(현재 hero-kicker/showcase-label) 재사용.

---

## 2. 배경 연결성 (Hero ↔ active-showcase ↔ 이후 전 섹션)

### 2-1. 핵심 전략: "라이트 히어로 → 다크 본문" 자연 전이
Hero의 밝은 우측은 그대로 두되(드라마틱한 첫인상), **Hero 하단에서 다크와인으로 수렴**시키고 active-showcase가 그 색을 이어받게 한다.

1. `.hero-section`에 **하단 페이드 추가**: 기존 배경 위에
   ```css
   .hero-section::after{
     content:''; position:absolute; inset:auto 0 0 0; height:34vh; z-index:1; pointer-events:none;
     background:linear-gradient(180deg, transparent 0%, rgb(60 9 30 / 55%) 55%, var(--bg-wine-800) 100%);
   }
   ```
   → 히어로 맨 아래가 `--bg-wine-800`(#3c091e)로 끝나도록.
2. `.active-showcase`의 `linear-gradient` 시작색을 **#3c091e(=히어로 끝색)에서 출발**하도록 조정: `linear-gradient(135deg, var(--bg-wine-800) 0%, var(--bg-wine-700) 45%, var(--bg-wine-600) 100%)`. → 경계에서 색이 이어진다.
3. 두 섹션 사이 시각적 seam 제거: active-showcase 상단에도 동일 글로우 톤을 약하게 배치(상단에서 hero 잔광이 이어지는 느낌).

### 2-2. 이후 전 섹션 통일
`industry-showcase`, `steps-section`, `marquee-band`, `footer` 등 **모든 본문 섹션**을 `--bg-wine-800` 기반 + `.accent-glow`/`.grain-overlay`로 맞춰 active-showcase와 같은 패밀리로 만든다. 색이 섹션마다 튀지 않게 **인접 섹션 간 끝색=다음 시작색** 규칙 유지(가능하면 큰 페이지 전체를 하나의 연속 와인 그라데이션 흐름으로).

> 결과 목표: 스크롤 시 배경이 **끊김 없이 와인 톤으로 흐르고**, 액센트 글로우와 그레인이 전 구간에서 일관된다.

---

## 3. hero-emblem 수정 (깨짐 → 안정적 아이소메트릭 스택)

### 3-1. 문제
3열 그리드에 skew + 큰 translateY + margin-top이 중첩되어 칸 충돌/오버플로우.

### 3-2. 해결 방안
- **전용 래퍼로 분리·격리**: `.hero-emblem`에 고정 비율 컨테이너(`width:max-content; aspect-ratio` 또는 명시 크기)를 주고 `overflow:visible`이되 **부모 hero가 `overflow:hidden`이므로 컨테이너 크기 안에 확실히 들어오도록** 좌표 재계산.
- **그리드 → 2행 명시**: `grid-template-columns: repeat(3, var(--cell)); grid-auto-rows: var(--cell-h); gap: var(--gap);` 로 두고, `nth-child(4~6)`의 `translateY`/`margin-top` 트릭 **제거**. 2행 staggered가 필요하면 각 셀에 `transform: translateY()`가 아니라 **grid row + 개별 `align-self`/`margin`을 일관 규칙**으로.
- **skew/rotate는 래퍼에만 1회 적용**(자식마다 누적되지 않게). 자식은 깨끗한 라운드 박스만.
- **반응형**: `--cell`, `--cell-h`, `--gap`을 `clamp()`로 잡고, `mini`(48rem) 이하에서는 emblem 축소 또는 `display:none`(텍스트 가독 우선). 텍스트(`.hero-copy`)와 **겹치지 않도록** z-index/위치 점검.
- 위치: `top/left %` 절대값 대신, 히어로 우측 라이트 영역에 안정적으로 안착하도록 컨테이너 기준 배치.

### 3-3. 검증
- 데스크탑/태블릿/모바일에서 칸 충돌·잘림 없음, 텍스트와 비겹침, `npm run build` 후 실제 렌더 확인.

---

## 4. 헤더 — 다이나믹/인터랙티브 (`header.ts` + CSS)
현재 `is-scrolled` 배경 전환만 있음. 아래 추가:
1. **스크롤 진행 바**: 헤더 하단 1~2px 라인이 페이지 스크롤 비율로 차오름(버건디→오렌지 그라데이션). Lenis progress 또는 ScrollTrigger로 width/scaleX 갱신.
2. **스크롤 방향 반응**: 아래로 스크롤 시 헤더 숨김(translateY(-100%)), 위로 시 다시 노출. 최상단에선 투명/확장.
3. **압축(condense)**: 스크롤되면 패딩 축소 + 로고 약간 축소 + glassmorphism 강화(backdrop-blur ↑). 부드러운 transition.
4. **네비 hover**: 링크에 언더라인 sweep 또는 글자 스크램블(GSAP ScrambleText, 이미 보유) 마이크로 인터랙션.
5. **로고 인터랙션**: `logo-mark__dot`에 idle 회전/펄스, hover 시 가속.
6. **CTA 마그네틱 버튼**(선택): 커서 근접 시 살짝 따라오는 magnetic 효과.
7. 모바일 메뉴: 열림 시 스태거 등장(GSAP), 배경 블러.
> reduced-motion 시 1·4·5·6 비활성, 2·3은 즉시 전환으로 대체.

---

## 5. 히어로 — 다이나믹/인터랙티브 (신규 `heroMotion.ts` 권장 + 기존 `heroScramble.ts`)
정적인 파티클/바이너리/엠블럼/카피에 모션 부여:
1. **입장 시퀀스**(onload): kicker → H1(SplitText 라인 마스크, 이미 보유) → body → emblem 순서 stagger 등장. GSAP timeline.
2. **마우스 패럴랙스**: `.hero-particles`, `.binary`, `.hero-emblem`를 마우스 이동/기울기에 따라 깊이별로 미세 이동(레이어드 parallax). `pointermove` → gsap.quickTo.
3. **스크롤 패럴랙스**: 스크롤 시 emblem/파티클이 다른 속도로 이동하며 다음 섹션으로 자연 전이(ScrollTrigger scrub).
4. **파티클 부유**: 각 `span`에 무한 float(서로 다른 delay/duration) + 미세 글로우 펄스.
5. **바이너리 스트림**: `.binary` 텍스트가 흐르거나(translateY 루프) 숫자가 주기적으로 바뀜(랜덤 0/1 토글, 가벼운 setInterval/GSAP).
6. **엠블럼 idle 모션**: 수정된 emblem이 천천히 떠다니고(부드러운 sine float), hover/포인터 근접 시 살짝 반응.
7. **그라데이션 시머**: 히어로 배경 라이트 영역에 은은한 빛 흐름(animated background-position 또는 conic shimmer).
8. **커서 반응 글로우**(선택): 마우스 위치에 따라 라디얼 글로우가 따라오는 spotlight.
> 모두 `prefers-reduced-motion` 가드. 파티클/바이너리는 reduced 시 정적 표시.

---

## 6. 섹션별 일관화 체크 (Hero·active-showcase 기준으로 맞추기)
| 섹션 | 적용 |
|---|---|
| `active-showcase` | 표준 소스(배경/글로우/그레인/버튼). §2-1로 시작색만 #3c091e 정렬 |
| `industry-showcase` | 배경을 와인 베이스+글로우+그레인으로 통일. CTA `.showcase-button` 사용. 카드 톤 통일 |
| `steps-section` | 동일 배경 패밀리. `step-visual` 링/번호를 액센트 글로우 톤과 맞춤. 진입 애니메이션 통일 |
| `marquee-band` | 배경 연결(끊김 없는 와인). 텍스트 톤 통일 |
| `footer` | 동일 베이스로 마감. 상단에서 본문과 seam 없이 이어지게 |
> 모든 섹션: 공통 `data-reveal` 등장(이미 보유) 유지 + `.grain-overlay`/`.accent-glow` 삽입. 색·글로우·버튼·라벨 스타일을 **하나의 시스템**으로.

---

## 7. 성능·접근성
- 패럴랙스/포인터 핸들러는 `gsap.quickTo`/`requestAnimationFrame`로 throttle, 리스너는 passive.
- 무한 애니메이션은 화면 밖에서 일시정지(ScrollTrigger 또는 IntersectionObserver).
- `prefers-reduced-motion: reduce` 전역 가드(이미 base에 일부 존재) — 신규 모션 전부 포함.
- 큰 글로우/blur 남용 주의(모바일 페인트 비용). 모바일에선 파티클 수/blur 강도 축소.

## 8. 완료 기준 (DoD)
- [ ] Hero→active-showcase 경계에서 배경색이 **이어짐**(seam 없음), 이후 전 섹션 와인 톤 일관
- [ ] hero-emblem이 모든 뷰포트에서 **깨지지 않고** 텍스트와 비겹침
- [ ] 헤더: 스크롤 진행바 + 방향 반응(hide/show) + 압축 + 네비/로고 인터랙션 동작
- [ ] 히어로: 입장 시퀀스 + 마우스/스크롤 패럴랙스 + 파티클/바이너리/엠블럼 모션 동작
- [ ] 전 섹션이 `.grain-overlay`/`.accent-glow`/`.showcase-button` 공통 시스템 사용
- [ ] `prefers-reduced-motion`에서 모션 비활성, 콘솔 에러 0
- [ ] `npm run build` 성공, 데스크탑/태블릿/모바일 정상

## 9. 참고 — 현재 파일 위치
- 마크업: `src/main.ts` (hero `:146`, active-showcase `:188`, industry-showcase `:219`, steps `:238`, marquee `:258`)
- 스타일: `src/styles/app.css` (header `~:95`, hero `:265`, hero-noise `:275`, particles `:287`, binary `:303`, hero-emblem `:335`, active-showcase `:469`)
- 모듈: `src/modules/` (header.ts, heroScramble.ts, smoothScroll.ts, textReveal.ts, marquee.ts, stepsPin.ts, industries.ts) → 신규 `heroMotion.ts` 추가 권장
