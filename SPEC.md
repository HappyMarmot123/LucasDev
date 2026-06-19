# Solais.ai 랜딩페이지 클론 — 구현 명세서 (Codex CLI 작업 지시서)

> 목표: <https://solais.ai/> 랜딩페이지를 **픽셀에 가깝게 1:1로 재현**한다.
> 원본은 WordPress + 커스텀 테마지만, 본 클론은 **WordPress 없이 독립 정적 사이트**로 만든다.
> 이 문서만 보고 처음부터 끝까지 구현 가능하도록 작성되었다. 임의로 디자인을 바꾸지 말 것.

---

## 0. 요약 (원본 분석 결과)

| 항목 | 원본 | 클론에서 사용할 것 |
|------|------|--------------------|
| CSS | Tailwind CSS v4 (CSS 변수 기반) | **Tailwind CSS v4** |
| 스무스 스크롤 | Lenis | **Lenis** |
| 애니메이션 | GSAP + ScrollTrigger + SplitText + ScrambleTextPlugin + ScrollToPlugin | **동일** |
| 캐러셀 | Swiper (drag) | **Swiper** |
| 반복 텍스트 띠 | 커스텀 marquee | **CSS/GSAP marquee** |
| 번들러 | esbuild (WP 테마) | **Vite** |
| 폼 | Gravity Forms (WP) | 정적 폼 + 클라이언트 검증 (백엔드 없음) |

---

## 1. 기술 스택 & 프로젝트 셋업

```
- Vite (vanilla, TypeScript 권장)
- Tailwind CSS v4 (@tailwindcss/vite 플러그인)
- gsap (+ ScrollTrigger, SplitText, ScrambleTextPlugin, ScrollToPlugin)
- lenis
- swiper
```

설치:
```bash
npm create vite@latest solais-clone -- --template vanilla-ts
cd solais-clone
npm i gsap lenis swiper
npm i -D tailwindcss @tailwindcss/vite
```

> 참고: GSAP의 `SplitText` / `ScrambleTextPlugin`은 과거 유료(Club)였으나 현재 무료 배포 버전에 포함됨. npm `gsap` 최신 버전에서 `gsap/SplitText`, `gsap/ScrambleTextPlugin`으로 import 가능. 만약 사용 불가하면 대체 구현 지침은 §7 참고.

### 프로젝트 구조
```
solais-clone/
├─ index.html
├─ vite.config.ts          # @tailwindcss/vite 등록
├─ src/
│  ├─ main.ts              # 진입점: lenis + gsap 초기화, 모듈 호출
│  ├─ styles/
│  │  └─ app.css           # @import "tailwindcss"; + @theme 토큰 + 폰트
│  ├─ modules/
│  │  ├─ smoothScroll.ts   # Lenis + ScrollTrigger 연동
│  │  ├─ heroScramble.ts   # 히어로 ScrambleText
│  │  ├─ textReveal.ts     # SplitText 등장 애니메이션
│  │  ├─ marquee.ts        # 반복 텍스트 띠
│  │  ├─ industries.ts     # Swiper 드래그 캐러셀
│  │  ├─ stepsPin.ts       # How it works 스크롤 핀
│  │  └─ header.ts         # 헤더 스크롤 동작
│  └─ assets/
│     ├─ fonts/            # §3 폰트
│     └─ img/              # dashboard.png 등
```

---

## 2. 디자인 토큰 (원본에서 추출 — 정확히 사용할 것)

### 2.1 색상 팔레트
```
brown            #3c091e   ← 메인 배경/텍스트 (다크 와인)
brownTransparent #3c091e00 ← 그라데이션 fade 용
burntOrange      #97494e
orange           #af6267
black            #000000
white            #ffffff
darkGrey         #646464
grey             #dedede
lightGrey        #f4f4f4
```
- 주조색은 **깊은 와인/버건디(brown #3c091e)**. 사이트 전체가 이 다크 톤 위에 크림/화이트 텍스트와 burntOrange→orange 그라데이션 포인트로 구성된다.
- 그라데이션은 `bg-gradient` 형태로 brown ↔ burntOrange ↔ orange 사이 보간을 자주 사용.

### 2.2 Tailwind v4 `@theme` 설정 (`src/styles/app.css`)
```css
@import "tailwindcss";

@theme {
  --color-brown: #3c091e;
  --color-brownTransparent: #3c091e00;
  --color-burntOrange: #97494e;
  --color-orange: #af6267;
  --color-darkGrey: #646464;
  --color-grey: #dedede;
  --color-lightGrey: #f4f4f4;
  --color-white: #ffffff;
  --color-black: #000000;

  --font-heading: 'teknolog', sans-serif;  /* 제목 */
  --font-body: 'ki', sans-serif;           /* 본문 */

  /* 원본 브레이크포인트 (필요 시) */
  --breakpoint-phone: 36rem;
  --breakpoint-mini: 48rem;
  --breakpoint-tablet: 64rem;
  --breakpoint-laptop: 80rem;
  --breakpoint-bigLaptop: 90rem;
  --breakpoint-desktop: 100rem;
}
```
- 사용 예: `bg-brown text-white font-heading` / `text-burntOrange` / `font-body`.
- 기본 폰트: body → `font-body`, heading 요소 → `font-heading`.

### 2.3 타이포그래피
- **제목 폰트**: `teknolog` (원본은 `nb_architekt_bold.woff2`를 'teknolog'로 등록 — **NB Architekt Bold** 계열의 기하학적/건축적 산세리프).
- **본문 폰트**: `ki` (커스텀 라이트 그로테스크).
- 제목은 대부분 **대문자(UPPERCASE)**, 굵고 압축적, 큰 letter-spacing 약간 좁게.
- 히어로 H1처럼 **여러 줄을 서로 다른 스타일/색**으로 쌓는 구성 다수 (예: "Analytics for" 작게 → "VISIBILITY IN AI SEARCH" 크게/대문자).

---

## 3. 폰트 처리

원본 폰트(`ki`, NB Architekt)는 **상용 폰트라 재배포 불가**. 다음 중 택1:

1. **(권장) 라이선스 보유 시** 실제 `.woff/.woff2`를 `src/assets/fonts/`에 넣고 `@font-face`로 등록.
2. **무료 대체 폰트** (시각적으로 최대한 근접):
   - 제목(teknolog/NB Architekt 대체): **"Archivo Expanded" / "Anton" / "Syne"** 중 굵고 기하학적인 것 → 본 클론은 **Archivo (Expanded, 700/800)** 권장.
   - 본문(ki 대체): **"Inter" 또는 "Hanken Grotesk"** (300/400/500).

`@font-face` 예시(실제 파일 사용 시):
```css
@font-face{ font-family:'teknolog'; src:url('/assets/fonts/nb_architekt_bold.woff2') format('woff2'); font-weight:700; font-display:swap; }
@font-face{ font-family:'ki'; src:url('/assets/fonts/ki.woff') format('woff'); font-weight:400; font-display:swap; }
```

---

## 4. 전역 동작 (모든 섹션 공통)

### 4.1 Lenis 스무스 스크롤 + GSAP 연동 (`smoothScroll.ts`)
```ts
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}
```

### 4.2 공통 텍스트 등장 애니메이션 (`textReveal.ts`)
- 거의 모든 제목/문단이 **스크롤 진입 시 등장**한다.
- SplitText로 줄/단어 단위 분할 후, `y: 110%` + `opacity:0` → `0` 로 stagger 등장 (mask 처럼 overflow-hidden 줄 안에서 올라옴).
```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(ScrollTrigger, SplitText);

export function initTextReveal() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const split = new SplitText(el, { type: 'lines', linesClass: 'reveal-line' });
    gsap.set(split.lines, { yPercent: 110 });
    gsap.to(split.lines, {
      yPercent: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });
}
```
> `.reveal-line { overflow: hidden; }` 처리(또는 부모에 `overflow-hidden`)로 마스크 효과. `data-reveal` 속성을 등장시킬 제목/문단에 부착.

---

## 5. 섹션별 상세 명세 (위 → 아래 순서)

> ⚠️ 카피(문구)는 **아래 텍스트를 그대로** 사용한다. 오탈자 포함 원문 유지.

### 5.1 헤더 / 네비게이션 (`<header>`, sticky)
- 좌측: Solais 로고(SVG, 추후 교체 가능 — 임시 워드마크 "SOLAIS" 텍스트 로고 허용).
- 중앙/우측 메뉴(슬래시 `/` 구분): **About / How it works / Advantage / Industries**
- 우측 끝: **Sign In** 버튼 (아이콘 포함, 아웃라인/필 버튼).
- 배경: 투명 → 스크롤 시 brown 배경 + 약간의 blur/그림자로 전환 (`header.ts`에서 ScrollTrigger로 토글).
- 모바일: 햄버거 메뉴(풀스크린 오버레이) 구현.

### 5.2 인트로/프리로더 섹션 (히어로 위 또는 히어로와 결합)
- 여러 개의 SVG(아이콘/그래픽) 떠 있는 영역.
- **"A visibility and intelligence platform that monitors AI-driven discovery."** 텍스트.
- **"Loading..."** 텍스트 → ScrambleText 효과(글자가 무작위로 섞이다 확정되는 효과)로 표현. (페이지 최초 진입 시 짧은 프리로드 연출)

### 5.3 히어로 (Hero)
- 배경: brown(#3c091e), 큰 여백.
- 구조(여러 줄, 줄마다 크기/색 다름):
  ```
  (작게)        Analytics for
  (크게/대문자) VISIBILITY
  (크게/대문자) IN AI SEARCH
  ```
  - "VISIBILITY", "IN AI SEARCH"는 거대한 디스플레이 사이즈, font-heading, 대문자.
- 서브 문단(본문):
  > People don't search for information the way they used to. They ask questions, and AI answers. Solais shows how your brand appears within those answers, and how that visibility shifts over time.
  >
  > It's clarity for a new kind of discovery.
- 애니메이션: H1 라인별 SplitText 등장 + 일부 단어 ScrambleText 가능.
- 우측/하단에 **대시보드 목업 이미지(`dashboard.png`)** 배치 (원본 에셋 경로: `/wp-content/themes/startdigital/static/dashboard.png` — 직접 다운로드해 `src/assets/img/dashboard.png`로 사용. 불가 시 자체 목업 제작).

### 5.4 "What is Solais?" 섹션
- 작은 라벨: **Understanding**
- 제목(2줄): **What is** / **Solais?**
- 3개 카드(가로 그리드, 모바일 세로 스택):

  | # | 제목(H3) | 본문 |
  |---|----------|------|
  | 1 | **Visibility analysis** | See when your brand appears in AI responses, how prominently it's mentioned and which competitors are surfaced alongside you over time. |
  | 2 | **Sentiment insight** | Understand how AI describes your brand. The language it uses, the confidence of its references and the trust signals it relies on. |
  | 3 | **Actionable direction** | Identify where visibility is strong, where it drops away and where opportunity exists. Solais highlights the sources that influence how AI engines surface your brand. |

- 각 카드: 아이콘(SVG) + 제목 + 본문. 호버 시 미세 lift/색 변화.

### 5.5 "How it Works" 섹션 (3단계, 스크롤 핀 권장)
- 작은 라벨: **How it Works**
- 제목(2줄): **Discovering** / **Your voice**
- 인트로 문단:
  > Rather than guessing at what influences visibility, you get a structured approach: define what matters, track how it changes, and act on what the data reveals.
- 3 스텝 (큰 번호 01/02/03 + 카테고리 라벨 + 제목 + 본문):

  | 번호 | 라벨 | 제목(H3) | 본문 |
  |------|------|----------|------|
  | 01 | Strategising | **Set your prompts** | Define the questions people ask when they're trying to learn, compare or decide. These might include category research, brand comparisons or product recommendations relevant to your market. |
  | 02 | Analysing | **Track responses** | Solais runs these prompts repeatedly, capturing how responses evolve over time. See if and when you appear, how early you're mentioned and how you're framed alongside competing brands. |
  | 03 | Optimising | **Act with confidence** | Solais surfaces patterns across responses to show which sources influence visibility and where changes to content, PR, directory, socials or overall online presence can improve outcomes. |

- 인터랙션(`stepsPin.ts`): 섹션을 ScrollTrigger로 **pin**하고 스크롤에 따라 스텝 01→02→03을 순차 전환(좌측 비주얼 고정 + 우측 텍스트 교체, 또는 가로 진행 바). 모바일은 단순 세로 스택으로 fallback.

### 5.6 "Why brands choose Solais" (Advantage) 섹션
- 작은 라벨: **Your advantage**
- 제목(2줄): **Why brands** / **choose Solais**
- 4개 항목(아이콘 + 제목 + 본문), 2×2 그리드(모바일 1열):

  1. **Transparent reporting** — Solais makes AI visibility easy to communicate beyond your team. Export clear, shareable reports that summarise visibility, sentiment and changes over selected time periods, making progress easy to explain to leadership, clients or stakeholders.
  2. **Functional dashboards** — Solais is built to be used by a range of teams. Key metrics including visibility, sentiment, rankings, sources and live prompt simulation are all easily accessible, designed to be understood without specialist knowledge.
  3. **Model visibility** — Solais tracks outputs across the leading large language models, including ChatGPT, Google AI Overview, Claude, Perplexity and more. Compare how visibility differs across each model and see how those patterns trend when normalised across all.
  4. **Verified data** — Solais removes the guesswork baked into traditional ranking tools. Every result is captured from real prompt simulation, creating an exact record of how a question was answered at that moment in time, so you can strategise around complete certainty.

### 5.7 마퀴(Marquee) 띠
- "Solais" 텍스트(또는 로고)가 가로로 반복되며 무한 스크롤되는 띠가 섹션 사이에 등장 (원본 클래스 `marquee-travel`, 6회 반복).
- 구현(`marquee.ts`): 콘텐츠를 2벌 복제 후 `gsap.to(x: '-50%', repeat:-1, ease:'none', duration:~20)` 무한 루프. 스크롤 속도에 따라 방향/속도 가변 옵션(선택).

### 5.8 "Find Your Industry" 섹션 — **Swiper 드래그 캐러셀**
- 배경에 "Solais" 워드마크 반복(워터마크).
- 제목(2줄): **Find Your** / **Industry**
- 문단:
  > Solais.ai is built for the teams responsible for how brands are seen, understood and chosen.
- 버튼: **Get Started**
- **"Drag"** 힌트 + 드래그 커서 (Swiper `grabCursor`, free drag).
- 카드 4종(반복 슬라이드, 각 카드: "ai" 태그 + 번호 + 제목 + 본문):

  | 번호 | 제목 | 본문 |
  |------|------|------|
  | 01 | **Marketing Teams** | Use Solais to understand AI visibility across key prompts and make informed decisions that can guide content, messaging and distribution. |
  | 02 | **Agencies** | Benchmark clients clearly, support GEO strategies with evidence and show organic progress beyond traditional SEO metrics through shared dashboards and reporting. |
  | 03 | **Brand Managers** | Track how AI speaks about your brand across categories and use cases, and understand how that narrative shifts over time. |
  | 04 | **Business leaders** | Gain a clearer view of market perception, competitor movement and how audiences are using AI to research and compare. |

- 구현(`industries.ts`): Swiper, `slidesPerView:'auto'`, `freeMode:true`, `grabCursor:true`, 드래그/스와이프로 가로 탐색. 카드는 큰 라운드 박스, brown/burntOrange 톤.

### 5.9 CTA 섹션 "Take control of the conversation"
- 큰 제목: **Take control of the conversation**
- 문단:
  > AI engines have already formed opinions about your brand. Solais gives you a look inside that conversation, and the power to influence how it evolves.
- 버튼: **Get Started**
- 작은 지표/배지: **Active Users 12** (카운트업 애니메이션 선택).
- 데모 안내 블록:
  - **Schedule a Demo** — See Solais in action and discover how it can work for you.
  - 미니 2단계:
    - **Set your prompts** — Define the questions that shape discovery and comparison in your market.
    - **Track your presence** — See how your brand appears in AI search and improve it over time.
- 큰 "SOLAIS" 워드마크 배치.

### 5.10 푸터 (`<footer>`)
- 로고 + 태그라인:
  > People don't search for information the way they used to. They ask questions, and AI answers.
- 소셜 아이콘: **Instagram, LinkedIn** (원본 링크 존재 — 임시 `#` 허용).
- **Explore** 컬럼: About / How it works / Advantage / Industries
- **Get started** 폼 (§6).
- 하단 바: `© 2026 The Start. All Rights Reserved.` · **Terms & conditions** · **Privacy policy** · "Site by The Start"
  - (클론에서는 회사명/저작권 문구를 placeholder로 두거나 자체 명의로 변경 가능 — 단 레이아웃 유지)

---

## 6. 폼 (푸터 "Get started")
- 필드(원본 Gravity Forms 기준):
  - First name * (required)
  - Last name * (required)
  - Email * (required)
  - 안내문구: `"*" indicates required fields`
- 백엔드 없음 → **클라이언트 검증 + 제출 시 성공 토스트**로 처리(실제 전송은 TODO 주석). 디자인은 brown 배경 위 밑줄형/박스형 인풋, burntOrange 포커스 링.

---

## 7. 애니메이션 명세 (정리)

| 효과 | 위치 | 라이브러리 | 비고 |
|------|------|-----------|------|
| 스무스 스크롤 | 전역 | Lenis | §4.1 |
| 텍스트 라인 마스크 등장 | 모든 제목/문단 | GSAP SplitText + ScrollTrigger | `data-reveal` |
| 글자 스크램블 | 히어로 "Loading...", 일부 강조어 | GSAP ScrambleTextPlugin | 아래 fallback |
| 무한 마퀴 | 섹션 구분 띠, Industries 배경 | GSAP / CSS | §5.7 |
| 드래그 캐러셀 | Industries | Swiper (freeMode, grabCursor) | §5.8 |
| 스크롤 핀 단계 전환 | How it works | GSAP ScrollTrigger pin | §5.5 |
| 헤더 배경 전환 | 헤더 | ScrollTrigger | §5.1 |
| 카운트업 | Active Users 12 | GSAP | 선택 |

**SplitText / ScrambleText 미사용 가능 시 fallback:**
- SplitText 대체: `Intl.Segmenter` 또는 단순 `split(' ')`로 단어 wrap 후 동일 stagger.
- ScrambleText 대체: 일정 간격으로 랜덤 글자 치환 후 원문으로 수렴하는 setInterval 유틸 직접 구현.

**접근성/성능:**
- `prefers-reduced-motion: reduce` 시 모든 등장/스크램블/마퀴 비활성화(즉시 표시).
- 이미지 `loading="lazy"`, 폰트 `font-display:swap`.

---

## 8. 반응형 기준
- 모바일 우선. 주요 분기: phone(≤576), tablet(≤1024), laptop(≥1280), desktop(≥1600).
- 데스크탑: 멀티컬럼 그리드(3카드/2×2/가로 캐러셀). 모바일: 1열 스택, 캐러셀은 1.1장 노출 드래그.
- 헤더는 모바일에서 햄버거 + 풀스크린 메뉴.
- 거대 디스플레이 타이포는 `clamp()`로 스케일(예: `font-size: clamp(2.5rem, 8vw, 9rem)`).

---

## 9. 에셋 수집 체크리스트
- [ ] `dashboard.png` — `https://solais.ai/wp-content/themes/startdigital/static/dashboard.png` 다운로드
- [ ] 로고 SVG — 원본 헤더/푸터 inline SVG 추출 또는 임시 워드마크 제작
- [ ] 섹션 아이콘 SVG들 (Visibility/Sentiment/Direction, Advantage 4개) — 추출 또는 유사 아이콘(Lucide 등)으로 대체
- [ ] 폰트 파일(라이선스) 또는 §3 대체 폰트

> 에셋 직접 추출이 어려우면 유사 무료 에셋으로 대체하되 **레이아웃·비율·색은 원본 유지**.

---

## 10. 구현 순서 (권장)
1. Vite + Tailwind v4 셋업, `@theme` 토큰/폰트 등록, 전역 레이아웃(brown 배경).
2. 섹션 마크업을 위→아래 순서로 정적 HTML/컴포넌트로 전부 작성(카피 그대로).
3. 반응형 그리드/타이포 완성(애니메이션 전 정적 상태에서 픽셀 맞추기).
4. Lenis + GSAP 초기화(`main.ts`).
5. `data-reveal` 텍스트 등장 → 마퀴 → Swiper 캐러셀 → How-it-works 핀 → 헤더 전환 → 히어로 스크램블 순으로 인터랙션 추가.
6. 폼 검증, reduced-motion, lazy-load, 라이트하우스 점검.

## 11. 완료 기준 (Definition of Done)
- [ ] 모든 섹션이 §5 순서·카피·레이아웃과 일치.
- [ ] 색상/폰트가 §2 토큰과 일치(주조색 #3c091e 와인톤).
- [ ] 스무스 스크롤 + 텍스트 등장 + 마퀴 + 드래그 캐러셀 동작.
- [ ] 데스크탑/태블릿/모바일 3종 레이아웃 정상.
- [ ] reduced-motion에서 정상 표시, 콘솔 에러 없음.
- [ ] `npm run build` 성공.

---

### 부록 A. main.ts 골격
```ts
import './styles/app.css';
import { initSmoothScroll } from './modules/smoothScroll';
import { initTextReveal } from './modules/textReveal';
import { initMarquee } from './modules/marquee';
import { initIndustries } from './modules/industries';
import { initStepsPin } from './modules/stepsPin';
import { initHeader } from './modules/header';
import { initHeroScramble } from './modules/heroScramble';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initHeader();
initSmoothScroll();
initIndustries();
if (!reduce) {
  initTextReveal();
  initMarquee();
  initStepsPin();
  initHeroScramble();
}
```
