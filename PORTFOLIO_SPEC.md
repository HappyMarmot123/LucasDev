# LucasDev — SOLAIS 클론 → 개인 포트폴리오 전환 지시서 (Codex CLI 작업자 전달용)

> 현재 `LucasDev`는 SOLAIS 랜딩페이지 클론이다. 이것을 **풀스택 개발자 Lucas Kim(김보준)의 포트폴리오**로 전환한다.
> **레이아웃/애니메이션/다크 와인 비주얼은 그대로 유지**하고, "SOLAIS" 단어와 모든 텍스트 콘텐츠만 아래 내용으로 교체한다.
> 기존 구조(섹션 순서, `data-*` 훅, 모듈, 스타일 클래스)를 최대한 재사용한다. 디자인을 새로 만들지 말 것.

> **★ 적용 순서: 퍼블리싱 → 콘텐츠 → 퍼블리싱.** 이 문서는 가운데 **콘텐츠(Pass 2)** 단계다.
> Pass 1에서 `PUBLISHING_SPEC.md`가 구축한 디자인 시스템(토큰, `.grain-overlay`/`.accent-glow`, 표준 `.showcase-button`)을
> **신규 마크업에 그대로 재사용**한다(새 디자인 만들지 말 것). 콘텐츠 반영 후에는 Pass 3 퍼블리싱으로 신규 요소를 마저 다듬고 회귀 점검한다. (전체 순서는 `PUBLISHING_SPEC.md` 상단 참고)

---

## 0. 핵심 원칙

1. **비주얼 톤 유지**: 색상(#3c091e 다크 와인), GSAP 애니메이션, Swiper 캐러셀, 마퀴, 스무스 스크롤 전부 유지.
2. **"Solais/SOLAIS" 완전 제거**: 코드/카피/aria/title/meta 전역에서 제거 후 아래 콘텐츠로 교체.
3. **콘텐츠는 데이터 주도**: 카피는 `src/main.ts` 상단 데이터 배열 + 신규 i18n 사전에서 관리(아래 §7).
4. **한/영 토글 추가**: 기본 영어, 헤더에 EN/KO 토글 (§7).
5. 작업 후 `npm run build` 통과 필수.

---

## 1. 인물/연락 정보 (전역 상수)

```
이름(워드마크): LUCAS KIM        // 헤더 로고, 인트로 스크램블
한글 이름: 김보준                 // KO 모드에서 사용
직함: Software Engineer / Web Fullstack Developer
GitHub: https://github.com/HappyMarmot123
Email: mdnsw28@gmail.com
LinkedIn: (아직 없음 → "Coming soon"으로 비활성 처리, URL 비움)
```

---

## 2. 섹션 매핑 (현재 → 전환 후)

| 현재 섹션 (main.ts)                        | 전환 후                           | 비고                                   |
| ------------------------------------------ | --------------------------------- | -------------------------------------- |
| `intro-section` (scramble "Loading...")    | **이름 인트로**                   | scramble 텍스트 → `LUCAS KIM`          |
| `hero-section` (#... )                     | **Hero**: 이름·직함·태그라인      | §3                                     |
| `understanding-section` (#about, 3카드)    | **About** (#about)                | 3카드 = Web / Mobile / Infra&Data §4-A |
| `steps-section` (#how, 01·02·03)           | **Experience** (#experience)      | §4-B (경력/일하는 방식)                |
| `advantage-section` (#advantage, 2×2)      | **Skills / Tech Stack** (#skills) | 2×2 = 기술 그룹 §4-C                   |
| `marquee-band`                             | **기술 키워드 마퀴**              | §4-D                                   |
| `industries-section` (#industries, Swiper) | **Projects** (#projects)          | EDMM + 추가 §4-E                       |
| `cta-section`                              | **Contact CTA**                   | §4-F                                   |
| `site-footer` (가입 폼)                    | **Contact**: 이메일+소셜          | 폼 제거 §4-F                           |

> 헤더 nav 링크: `About / Skills / Experience / Projects / Contact` (앵커 `#about #skills #experience #projects #contact`).
> `main.ts`의 `logoMark()` 안 "SOLAIS" → "LUCAS KIM". `index.html` `<title>` → `Lucas Kim — Software Engineer`, meta description도 포트폴리오 문구로 교체.

---

## 3. Hero / Intro 카피

**Intro (프리로더)**

- scramble 텍스트: `LUCAS KIM`
- 하단 한 줄(EN): `Pleasure to meet you — a developer unbound by language or role.`
- (KO): `반갑습니다 — 언어와 역할에 구애받지 않는 개발자입니다.`

**Hero**

- kicker(EN): `Hi, I'm Lucas Kim` / (KO): `안녕하세요, 김보준입니다`
- H1(EN, 2줄): `FULL-STACK` / `DEVELOPER` — (KO): `풀스택` / `개발자`
- body(EN): `Software Engineer · 4 years of experience and growing fast. I keep pace with vibe coding and the latest in AI, and I love building across the entire stack.`
- body(KO): `소프트웨어 엔지니어 · 빠르게 성장하는 4년 차. 바이브 코딩과 AI 최신 트렌드에 발맞추며, 스택 전반을 아우르는 개발을 좋아합니다.`
- Hero 비주얼(`dashboard-wrap`의 `dashboard.png`): SOLAIS 대시보드 이미지 제거. 대체안(우선순위):
  1. **EDMM 프로젝트 스크린샷** (있으면 가장 좋음)
  2. 프로필 사진
  3. 임시: 코드/터미널 느낌의 추상 패널(기존 그라데이션 박스 재활용)
     → 에셋 미정 시 placeholder 박스로 두고 `TODO(asset)` 주석.

---

## 4. 섹션별 콘텐츠

### 4-A. About (현 `understanding-section`, 3카드)

- label(EN) `About` / (KO) `소개`
- H2(EN): `WHO I AM` / (KO): `저는 이런 개발자입니다`
- 섹션 인트로(EN): `I'm a full-stack mid-level developer with 4 years of experience. Committed to becoming a T-shaped developer, I keep expanding my skills without being bound to a specific language or role — and I'm eager to grow with talented teammates in challenging, large-scale environments.`
- (KO): `4년 차 풀스택 개발자입니다. T자형 개발자를 목표로 특정 언어나 역할에 얽매이지 않고 역량을 넓혀가며, 도전적이고 큰 규모의 환경에서 좋은 동료들과 함께 성장하고 싶습니다.`
> **각도(차별화)**: About = **마인드셋·가치**(나는 어떤 사람인가). Experience(§4-B) = **구체적 배경**(무엇을 해왔나), Skills(§4-C) = **기술 스택**. 셋이 겹치지 않게 About은 기술 도메인을 나열하지 않는다.

- 3카드 (main.ts `understandingCards` 배열 교체) — 기술이 아니라 **태도/강점**:
  | 카드 | EN title / body | KO title / body |
  |---|---|---|
  | 1 | **T-shaped & language-agnostic** — Depth where it matters, breadth everywhere else. I don't tie my identity to a single language or role. | **T자형 · 언어에 구애받지 않음** — 깊이가 필요한 곳엔 깊게, 그 외엔 넓게. 특정 언어나 역할에 저를 가두지 않습니다. |
  | 2 | **The bridge between teams** — A multifaceted view minimizes cross-role communication gaps and finds the sweet spot between backend efficiency and frontend UX. | **직군 사이를 잇는 다리** — 다각적인 시야로 타 직군과의 소통 간극을 최소화하고, 백엔드 효율성과 프론트엔드 UX 사이 최적의 접점을 찾습니다. |
  | 3 | **Always leveling up** — Growing faster than most, riding vibe coding and the latest in AI, aiming to become a true Software Engineer. | **끊임없이 성장** — 누구보다 빠르게 성장하며, 바이브 코딩과 AI 최신 트렌드에 발맞춰 진정한 Software Engineer를 지향합니다. |

> (선택) About 하단에 GitHub 활동 임베드 가능 — 원하면 추가:
>
> - Streak: `https://streak-stats.demolab.com?user=HappyMarmot123&theme=vue-dark&border_radius=10`
> - Pacman(dark): `https://raw.githubusercontent.com/HappyMarmot123/HappyMarmot123/output/pacman-contribution-graph-dark.svg`
>   다크 테마에 맞으므로 그대로 `<img>`로 넣되, 없으면 생략. **(필수 아님)**

### 4-B. Experience (현 `steps-section`, 01·02·03) — 강점/배경 서사

- label(EN) `Experience` / (KO) `경력`
- H2(EN): `WHAT I BRING` / (KO): `제가 가진 강점`
- 섹션 인트로(EN): `A mid-level developer with 4 years of experience — and growing faster than most. My range across roles is my edge.`
- (KO): `4년 차 미들레벨 개발자, 누구보다 빠르게 성장합니다. 직군을 넘나드는 폭넓은 시야가 저의 강점입니다.`
- ⚠️ 회사/기간 단위의 타임라인은 제공되지 않음(공개 불가). 대신 아래 **3가지 강점 서사**로 채운다. main.ts `steps` 배열 교체:
  | 번호 | eyebrow / title / body (EN) | (KO) |
  |---|---|---|
  | 01 | Backend & DBA / **Deep data understanding** / Backend and DBA work gave me a deep, hands-on understanding of data structures. | 백엔드 · DBA / **데이터에 대한 깊은 이해** / 백엔드와 DBA 개발 경험은 데이터 구조에 대한 깊은 이해를 제공합니다. |
  | 02 | Design & Publishing / **Design-literate code** / A sense for design and publishing lets me translate a designer's intent precisely into code. | 디자인 · 퍼블리싱 / **디자인을 이해하는 코드** / 디자인·퍼블리싱 감각으로 디자이너의 의도를 코드에 정확히 녹여냅니다. |
  | 03 | AI & Mobile / **Beyond the web** / I've also built AI and mobile projects, and I aim to grow into a true Software Engineer. | AI · 모바일 / **웹을 넘어** / AI 개발과 모바일 개발도 경험했고, 진정한 Software Engineer를 지향합니다. |
  > `stepsPin.ts`(스크롤 핀) 모듈은 그대로 재사용. 추후 실제 경력 타임라인을 받으면 동일 구조로 교체 가능.

### 4-C. Skills / Tech Stack (현 `advantage-section`, 2×2)

- label(EN) `Tech Stack` / (KO) `기술 스택`
- H2(EN): `SKILLS &` / `TOOLS` — (KO): `기술과` / `도구`
- 4카드(2×2) — main.ts `advantages` 배열 교체. 각 카드는 제목 + 기술 나열. **production 레벨은 강조, junior 레벨은 옅게/(familiar) 표기**:
  | 카드 | 기술 (★=production, ☆=familiar) |
  |---|---|
  | **Frontend** | ★Next.js ★React ★Vue ★TypeScript ★TailwindCSS ★Redux ★jQuery |
  | **Backend** | ★Node.js ★NestJS ★Express ★Spring ★Java ☆PHP |
  | **Mobile** | ★React Native ☆Flutter |
  | **Data & Infra** | ★MongoDB ★MySQL ★Supabase ☆Firebase ☆Docker ☆AWS · Tooling: Jest, Figma |
  > README의 shields.io 배지 이미지는 **사용하지 말 것**. 위 기술명을 칩/태그 형태의 텍스트로 렌더(다크 와인 톤 칩). production/familiar 구분은 색/투명도나 작은 라벨로.

### 4-D. 마퀴 (현 `marquee-band`)

- 반복 텍스트: `React • Vue • Next.js • TypeScript • Node.js • NestJS • Spring • React Native • Docker • MongoDB •` (무한 반복)
- aria-label: `Tech stack marquee`

### 4-E. Projects (현 `industries-section`, Swiper) — **카드 + 상세 모달**

- label(EN) `Drag` 유지(드래그 힌트) / (KO) `드래그`
- H2(EN): `SELECTED` / `PROJECTS` — (KO): `프로젝트`
- 섹션 카피(EN): `A few things I've built. Drag to explore, click for details.` / (KO): `제가 만든 것들. 드래그해서 살펴보고, 클릭하면 상세 정보가 나옵니다.`
- 버튼 `Get Started` → (EN)`View GitHub`/(KO)`깃허브 보기`, 링크 `https://github.com/HappyMarmot123`

**현재 프로젝트 3개 + 앞으로 계속 추가 예정** → 데이터 배열만 늘리면 카드/모달이 자동 생성되도록 **확장 가능한 데이터 구조**로 만든다.

#### 프로젝트 데이터 모델 (`src/data/projects.ts` 신설)

```ts
export interface Project {
  id: string;
  title: string;
  thumbnail: string; // 카드/모달 대표 사진 (src/assets/img/projects/*)
  role: string; // 작업자: 'Solo' | 'Team of 4 · Frontend' 등 본인 역할 포함
  period?: string; // 예: '2 months', '2025.03–2025.05'
  tech: string[]; // 언어·스택 칩: ['Next.js','TypeScript', ...]
  summary: { en: string; ko: string }; // 카드용 한 줄 요약
  links: { live?: string; repo?: string };
  detail: {
    motivation: { en: string; ko: string }; // 계기/배경
    about: { en: string; ko: string }; // 앱 소개(상세)
  };
}
export const projects: Project[] = [
  /* 아래 3개 */
];
```

#### 카드(요약) UI — Swiper 슬라이드

각 슬라이드(`industry-card` 스타일 재활용)에 표시:

- **사진**(`thumbnail`) 상단 영역
- 제목 + `role`(작업자) + `period`
- **기술 스택 칩**(`tech[]`)
- `summary` 한 줄
- **링크 버튼**: Live(↗) / GitHub — `links`에 있는 것만 노출
- **`Details` 버튼**(또는 카드 클릭) → 상세 모달 오픈

#### 상세(Detail) UI — 모달/라이트박스 (`src/modules/projectModal.ts` 신설)

카드 클릭/Details 클릭 시 모달 오픈, 내용:

- 큰 `thumbnail` (또는 추후 다중 이미지 지원 가능하게 배열도 허용)
- 제목 · `role`(작업자) · `period` · 기술 스택 칩 전체
- **계기/배경**(`detail.motivation`)
- **앱 소개**(`detail.about`)
- Live / GitHub 링크 버튼
- 접근성: ESC 닫기, 배경 클릭 닫기, 포커스 트랩, `aria-modal`, 열릴 때 `body` 스크롤 잠금(기존 `body.is-menu-open` 패턴 재활용 가능). 현재 Lenis 스무스스크롤과 충돌하지 않게 모달 열림 동안 Lenis stop/start 처리.
- 다크 와인 톤 유지, 등장은 GSAP 페이드/스케일.

#### 프로젝트 3개 (지금은 더미 데이터로 채움)

> 실제 프로젝트 리소스(사진/상세)가 아직 없으므로 **아래 더미 데이터로 채운다.** EDMM은 실제 링크만 유효하고 나머지는 더미.
> 더미 썸네일: `https://picsum.photos/seed/<id>/800/500` (나중에 `src/assets/img/projects/`의 실제 이미지로 교체).
> 더미 항목/필드는 코드에 `// DUMMY — replace later` 주석으로 교체 지점 표시.

1. **EDMM — Electronic Dance Music Marmot** _(링크만 실제, 나머지 더미)_
   - thumbnail: `https://picsum.photos/seed/edmm/800/500` _(DUMMY — EDMM 실제 스크린샷으로 교체)_
   - role: `Solo` · period: `2 months`
   - tech: `['Next.js','TypeScript']` _(DUMMY — 정확한 스택 확인 후 조정)_
   - summary(EN): `A music side project built solo over two months.` / (KO): `두 달간 혼자 만든 음악 사이드 프로젝트.`
   - links: live `https://edmm.vercel.app/` · repo `https://github.com/HappyMarmot123/EDMM` _(실제 링크)_
   - detail.motivation(EN): `Wanted a personal playground to push clean architecture end-to-end.` _(DUMMY)_ / (KO): `클린 아키텍처를 끝까지 적용해 볼 개인 놀이터가 필요했습니다.` _(DUMMY)_
   - detail.about(EN): `Designed the architecture and design patterns to keep the code clean.` / (KO): `클린 코드를 위해 아키텍처와 디자인 패턴을 직접 설계했습니다.`
2. **TaskFlow — Team Kanban** _(전체 DUMMY)_
   - thumbnail: `https://picsum.photos/seed/taskflow/800/500`
   - role: `Team of 3 · Frontend Lead` · period: `2025.01–2025.04`
   - tech: `['React','TypeScript','NestJS','PostgreSQL']`
   - summary(EN): `A realtime kanban board for small teams.` / (KO): `소규모 팀을 위한 실시간 칸반 보드.`
   - links: live `#` · repo `#` _(DUMMY)_
   - detail.motivation(EN): `Built to streamline how our team tracked sprint work.` / (KO): `팀의 스프린트 업무 추적을 간소화하려고 만들었습니다.`
   - detail.about(EN): `Drag-and-drop columns, realtime sync over WebSocket, and role-based access.` / (KO): `드래그앤드롭 컬럼, WebSocket 실시간 동기화, 역할 기반 접근 제어.`
3. **Pulse — Realtime Chat** _(전체 DUMMY)_
   - thumbnail: `https://picsum.photos/seed/pulse/800/500`
   - role: `Solo` · period: `2024.09–2024.11`
   - tech: `['React Native','Firebase','TypeScript']`
   - summary(EN): `A cross-platform chat app with push notifications.` / (KO): `푸시 알림을 갖춘 크로스플랫폼 채팅 앱.`
   - links: live `#` · repo `#` _(DUMMY)_
   - detail.motivation(EN): `Wanted to explore realtime messaging on mobile.` / (KO): `모바일에서 실시간 메시징을 탐구해 보고 싶었습니다.`
   - detail.about(EN): `Firebase-backed messaging, presence indicators, and offline cache.` / (KO): `Firebase 기반 메시징, 접속 상태 표시, 오프라인 캐시.`

> 앞으로 프로젝트가 늘면 `projects` 배열에 항목만 추가 → 카드·모달 자동 생성. 하드코딩 금지.
> 현재 `renderIndustrySlides()`의 `[...industries, ...industries]` **루프 복제 제거**. Swiper는 `slidesPerView:'auto'` + 드래그 유지. 카드 수가 적어도 자연스럽게 보이도록.
> 프로젝트 이미지는 `src/assets/img/projects/`에 보관.

### 4-F. Contact (현 `cta-section` + `site-footer` 폼)

**CTA**

- label(EN) `Contact` / (KO) `연락`
- H2(EN): `LET'S BUILD SOMETHING TOGETHER` / (KO): `함께 만들어요`
- body(EN): `Open to new opportunities and interesting problems. Reach out anytime.` / (KO): `새로운 기회와 흥미로운 문제를 환영합니다. 언제든 연락 주세요.`
- 버튼 `Get Started` → (EN)`Email me`/(KO)`이메일 보내기`, `href="mailto:mdnsw28@gmail.com"`
- `demo-card`의 `Active Users 12` (count-to) → **`4 years experience`** 같은 실제 지표로 교체하거나 제거(count-to 숫자는 4). 데모 2스텝 문구도 제거/연락 안내로 대체.

**Footer (폼 제거)**

- `footer-form` (First/Last/Email 입력 + 토스트) **삭제**. `form.ts` 모듈 제거 또는 미사용.
- 대신 **연락 링크 블록**:
  - Email: `mailto:mdnsw28@gmail.com`
  - GitHub: `https://github.com/HappyMarmot123`
  - LinkedIn: 비활성 (`Coming soon`, 클릭 불가)
  - (선택) **Resume 다운로드 버튼**: PDF 제공 시 `public/resume.pdf` 연결, 미제공 시 버튼 숨김 `TODO(resume)`.
- footer 태그라인(EN): `Let's connect.` / (KO): `함께해요.`
- footer-bottom: `© 2026 Lucas Kim. All rights reserved.` — "Site by The Start", "Terms & conditions", "Privacy policy"는 **제거**(또는 빈 링크 제거).
- footer nav: About / Skills / Experience / Projects / Contact 로 교체.

---

## 5. 사용하지 말 것 (README에서 가져오지 않을 항목)

사용자 README는 **참고만** 하고 아래는 옮기지 말 것:

- capsule-render 웨이브 헤더 이미지
- typing-svg 인용구(`When I become successful, I will deserve it.`)
- shields.io 배지 **이미지**들 (→ 기술명은 텍스트 칩으로만)
- top-langs 주석 블록
- (streak/pacman 그래프는 §4-A의 선택 항목으로만, 필수 아님)

---

## 6. 전역 치환 체크 (Solais 흔적 제거)

다음 위치의 "Solais/SOLAIS"를 모두 교체/삭제했는지 확인:

- `index.html`: `<title>`, `<meta name="description">`
- `main.ts`: `logoMark()`, intro `data-scramble`/문구, hero kicker·h1·body, about H2 `Solais?`, advantage H2 `choose Solais`, marquee 콘텐츠·aria, industries 카피(`Solais.ai ...`), CTA 카피, footer 태그라인·aria(`Solais marquee`)
- 검증: `grep -rni "solais" src index.html` → **0건**이어야 함.

---

## 7. 한/영 토글 (신규)

- 헤더 `header-actions`에 **EN/KO 토글 버튼** 추가(Sign In 자리 정리; Sign In은 제거하고 토글 + Email 버튼으로 대체 가능).
- `src/i18n.ts` 신설: `type Lang = 'en' | 'ko'`, 위 모든 카피를 `{ en, ko }` 사전으로 보관.
- 동작: 토글 시 `lang` 전환 → 화면 카피 갱신, `localStorage`에 저장, `<html lang>` 갱신. 기본값 `en`.
- 구현 방식(택1, 현 구조에 맞게):
  - (권장) 카피를 `copy[lang]` 객체로 만들고, `main.ts`의 렌더 함수들(`renderFeatureCards`, `renderStepCards`, `renderIndustrySlides`, 템플릿 문자열)이 현재 `lang`을 읽어 렌더 → 토글 시 `app.innerHTML` 재생성 후 모듈 init 재호출.
  - 재초기화 시 GSAP/ScrollTrigger/Swiper 인스턴스를 정리(`kill`/`destroy`)하고 다시 init 하여 중복 바인딩 방지.
- 텍스트 노드만 바꾸는 `[data-i18n="key"]` 방식도 허용(재렌더 없이 textContent 교체). 더 안전하면 이 방식 권장.

---

## 8. 모듈 재사용 정리

| 모듈              | 처리                                                                          |
| ----------------- | ----------------------------------------------------------------------------- |
| `smoothScroll.ts` | 유지                                                                          |
| `textReveal.ts`   | 유지                                                                          |
| `header.ts`       | 유지 + 언어 토글 핸들러 추가                                                  |
| `heroScramble.ts` | 유지(scramble 텍스트만 `LUCAS KIM`)                                           |
| `marquee.ts`      | 유지(콘텐츠만 교체)                                                           |
| `stepsPin.ts`     | 유지(Experience 섹션)                                                         |
| `industries.ts`   | 유지(Projects Swiper) — `src/data/projects.ts` 데이터로 카드 생성             |
| `projectModal.ts` | **신규** — 프로젝트 상세 모달(계기/앱 소개/사진/링크), 접근성·Lenis 연동 §4-E |
| `form.ts`         | **제거**(폼 삭제)                                                             |

---

## 9. 완료 기준 (DoD)

- [ ] `grep -rni "solais" src index.html` → 0건
- [ ] 헤더 워드마크 `LUCAS KIM`, 인트로 scramble `LUCAS KIM`
- [ ] About(3) / Experience(3) / Skills(2×2) / Projects(카드+상세 모달, `projects` 배열 주도) / Contact 콘텐츠 반영
- [ ] 프로젝트 카드: 사진·작업자(role)·기술스택·링크 표시 / 상세 모달: 계기·앱 소개 표시
- [ ] `projects` 배열에 항목 추가만으로 카드·모달 자동 생성(확장성 확인)
- [ ] 푸터 폼 제거, 이메일(mailto)·GitHub 링크 동작, LinkedIn "Coming soon"
- [ ] EN/KO 토글 동작(기본 EN, localStorage 유지), 재초기화 시 애니메이션/Swiper 정상
- [ ] 다크 와인 비주얼·GSAP·마퀴·드래그 캐러셀 그대로 유지
- [ ] `npm run build` 성공(타입 에러 0), 콘솔 에러 없음
- [ ] reduced-motion 정상

## 10. 남은 TODO (사용자 제공 대기)

- 실제 경력 타임라인(회사/기간/역할) → Experience 섹션 교체용 (현재는 강점 서사로 대체됨)
- **프로젝트 실제 데이터로 교체** — 현재 더미(`// DUMMY`). 각 항목별: 사진 / 링크(live·repo) / 작업자(role) / 기술 스택 / 계기(motivation) / 앱 소개(about)
- 프로젝트 이미지 파일들 → `src/assets/img/projects/` (현재 picsum 더미)
- EDMM: 정확한 기술 스택, 만든 계기(motivation), 실제 스크린샷
- Hero 비주얼 에셋(EDMM 스크린샷 또는 프로필 사진)
- Resume PDF, LinkedIn URL
