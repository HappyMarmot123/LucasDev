export type Lang = 'en' | 'ko';

export const defaultLang: Lang = 'en';

export const copy = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      email: 'Email',
    },
    intro: {
      line: 'Pleasure to meet you — a developer unbound by language or role.',
      scramble: 'LUCAS KIM',
    },
    hero: {
      kicker: 'Pleasure to Meet you',
      titleA: 'FULL-STACK',
      titleB: 'DEVELOPER',
      body: 'Software Engineer · 4 years of experience and growing fast. I keep pace with vibe coding and the latest in AI, and I love building across the entire stack.',
    },
    about: {
      label: 'About',
      titleA: 'WHO I AM',
      titleB: '',
      intro:
        "I'm a full-stack mid-level developer with 4 years of experience. Working to beyond being a web developer into a well-rounded software engineer, continuously expanding my capabilities without being tied to a specific language or role. I want to keep growing with talented teammates.",
      cards: [
        {
          title: 'T-shaped & language-agnostic',
          body: "Depth where it matters, breadth everywhere else. I don't tie my identity to a single language or role.",
        },
        {
          title: 'riding vibe coding and the latest in AI',
          body: "A multifaceted view minimizes cross-role communication gaps and finds the sweet spot between backend efficiency and frontend UX.",
        },
        {
          title: 'Always leveling up',
          body: 'Growing faster than most, riding vibe coding and the latest in AI, aiming to become a true Software Engineer.',
        },
      ],
    },
    experience: {
      label: 'Experience',
      titleA: 'WHAT I',
      titleB: 'BRING',
      intro: 'A mid-level developer with 4 years of experience — and growing faster than most. My range across roles is my edge.',
      steps: [
        {
          number: '01',
          eyebrow: 'Backend & DBA',
          title: 'Performance minded',
          body: 'Started with Java/Spring, then built a foundation in DB performance optimization and large-scale query tuning.',
        },
        {
          number: '02',
          eyebrow: 'Design & Publishing',
          title: 'Design literate',
          body: "Turning design intent into polished, responsive interfaces through publishing detail and frontend execution.",
        },
        {
          number: '03',
          eyebrow: 'AI & Growth',
          title: 'Fast learner',
          body: 'Keeping pace with AI workflows, vibe coding, and modern engineering practices.',
        },
      ],
    },
    skills: {
      label: 'Tech Stack',
      titleA: 'SKILLS &',
      titleB: 'TOOLS',
    },
    projects: {
      label: 'Projects',
      titleA: 'explore',
      titleB: 'recent work',
      intro: 'A few selected projects, from idea to execution.<br />Drag to explore, click for details.',
      github: 'View GitHub',
      details: 'Details',
      live: 'Live',
      repo: 'GitHub',
    },
    cta: {
      label: 'Contact',
      title: 'OPEN TO GOOD CONVERSATIONS',
      body: "LinkedIn is the best place to reach me for a conversation. Send me a message there, and I'll reply when I can.",
      button: 'View GitHub',
      metricLabel: 'Years experience',
      demoTitle: 'Contact Lucas',
      demoBody: 'LinkedIn is best for conversation. GitHub is where you can see my current work and experiments.',
      points: [
        { title: 'LinkedIn', body: "Send me a message there if you'd like to talk." },
        { title: 'GitHub', body: 'Explore source code, experiments, and selected project repositories.' },
        { title: 'Email', body: 'I do not check email often, so replies may be slower.' },
      ],
    },
    footer: {
      tagline: "Let's connect.",
      linksTitle: 'Contact',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn — Coming soon',
      copyright: '© 2026 Lucas Kim. All rights reserved.',
    },
    modal: {
      role: 'Role',
      period: 'Period',
      stack: 'Stack',
      motivation: 'Motivation',
      about: 'About the app',
      close: 'Close project details',
    },
  },
  ko: {
    nav: {
      about: '소개',
      skills: '기술',
      experience: '경력',
      projects: '프로젝트',
      contact: '연락',
      email: '이메일',
    },
    intro: {
      line: '반갑습니다 — 언어와 역할에 구애받지 않는 개발자입니다.',
      scramble: 'LUCAS KIM',
    },
    hero: {
      kicker: '안녕하세요, 김보준입니다',
      titleA: '풀스택',
      titleB: '개발자',
      body: '소프트웨어 엔지니어 · 빠르게 성장하는 4년 차. 바이브 코딩과 AI 최신 트렌드에 발맞추며, 스택 전반을 아우르는 개발을 좋아합니다.',
    },
    about: {
      label: '소개',
      titleA: '저는 이런',
      titleB: '개발자입니다',
      intro:
        '4년 차 풀스택 개발자입니다. T자형 개발자를 목표로 특정 언어나 역할에 얽매이지 않고 역량을 넓혀가며, 도전적이고 큰 규모의 환경에서 좋은 동료들과 함께 성장하고 싶습니다.',
      cards: [
        {
          title: 'T자형 · 언어에 구애받지 않음',
          body: '깊이가 필요한 곳엔 깊게, 그 외엔 넓게. 특정 언어나 역할에 저를 가두지 않습니다.',
        },
        {
          title: '직군 사이를 잇는 다리',
          body: '다각적인 시야로 타 직군과의 소통 간극을 최소화하고, 백엔드 효율성과 프론트엔드 UX 사이 최적의 접점을 찾습니다.',
        },
        {
          title: '끊임없이 성장',
          body: '누구보다 빠르게 성장하며, 바이브 코딩과 AI 최신 트렌드에 발맞춰 진정한 Software Engineer를 지향합니다.',
        },
      ],
    },
    experience: {
      label: '경력',
      titleA: '제가 가진',
      titleB: '강점',
      intro: '4년 차 미들레벨 개발자, 누구보다 빠르게 성장합니다. 직군을 넘나드는 폭넓은 시야가 저의 강점입니다.',
      steps: [
        {
          number: '01',
          eyebrow: '백엔드 · DBA',
          title: '데이터에 대한 깊은 이해',
          body: '백엔드와 DBA 개발 경험은 데이터 구조에 대한 깊은 이해를 제공합니다.',
        },
        {
          number: '02',
          eyebrow: '디자인 · 퍼블리싱',
          title: '디자인을 이해하는 코드',
          body: '디자인·퍼블리싱 감각으로 디자이너의 의도를 코드에 정확히 녹여냅니다.',
        },
        {
          number: '03',
          eyebrow: 'AI · 모바일',
          title: '웹을 넘어',
          body: 'AI 개발과 모바일 개발도 경험했고, 진정한 Software Engineer를 지향합니다.',
        },
      ],
    },
    skills: {
      label: '기술 스택',
      titleA: '기술과',
      titleB: '도구',
    },
    projects: {
      label: '드래그',
      titleA: '프로젝트',
      titleB: '',
      intro: '제가 만든 것들. 드래그해서 살펴보고, 클릭하면 상세 정보가 나옵니다.',
      github: '깃허브 보기',
      details: '상세 보기',
      live: '라이브',
      repo: '깃허브',
    },
    active: {
      body: '새로운 기회와 흥미로운 문제를 환영합니다. 언제든 연락 주세요.',
      button: '이메일 보내기',
      label: '경력',
      metric: '4',
      items: [
        { title: '풀스택 범위', body: '프론트엔드, 백엔드, 모바일, 데이터, 퍼블리싱까지 제품 개발 전반을 경험했습니다.' },
        { title: '빠른 학습', body: 'AI 워크플로우, 바이브 코딩, 최신 개발 방식을 빠르게 흡수합니다.' },
        { title: '팀 브릿지', body: '디자인, 프론트엔드, 백엔드, 데이터 직군 사이의 소통 간극을 줄입니다.' },
      ],
    },
    cta: {
      label: '연락',
      title: 'LINKEDIN에서 대화해요',
      body: '저와 연락하고 대화를 나누기에는 LinkedIn이 가장 좋습니다. 메시지를 보내주시면 확인하는 대로 답장드릴 수 있습니다.',
      button: 'GitHub 보기',
      metricLabel: '년 차 개발자',
      demoTitle: 'Lucas에게 연락하기',
      demoBody: '대화는 LinkedIn이 가장 좋고, GitHub에서는 현재 작업과 실험을 확인할 수 있습니다.',
      points: [
        { title: 'LinkedIn', body: '편하게 메시지를 남겨주시면 확인하는 대로 답장드릴 수 있습니다.' },
        { title: 'GitHub', body: '소스 코드, 실험, 주요 프로젝트 저장소를 확인할 수 있습니다.' },
        { title: 'Email', body: '이메일은 자주 확인하지 않아 답장이 늦을 수 있습니다.' },
      ],
    },
    footer: {
      tagline: '함께해요.',
      linksTitle: '연락',
      email: '이메일',
      github: 'GitHub',
      linkedin: 'LinkedIn — 준비 중',
      copyright: '© 2026 Lucas Kim. All rights reserved.',
    },
    modal: {
      role: '역할',
      period: '기간',
      stack: '기술',
      motivation: '계기 / 배경',
      about: '앱 소개',
      close: '프로젝트 상세 닫기',
    },
  },
} as const;
