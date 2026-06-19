export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  role: string;
  period?: string;
  tech: string[];
  summary: { en: string; ko: string };
  links: { live?: string; repo?: string };
  detail: {
    motivation: { en: string; ko: string };
    about: { en: string; ko: string };
  };
}

export const projects: Project[] = [
  {
    id: 'edmm',
    title: 'EDMM — Electronic Dance Music Marmot',
    thumbnail: 'https://picsum.photos/seed/edmm/800/500', // DUMMY - replace with real EDMM screenshot.
    role: 'Solo',
    period: '2 months',
    tech: ['Next.js', 'TypeScript'], // DUMMY - adjust after final stack check.
    summary: {
      en: 'A music side project built solo over two months.',
      ko: '두 달간 혼자 만든 음악 사이드 프로젝트.',
    },
    links: {
      live: 'https://edmm.vercel.app/',
      repo: 'https://github.com/HappyMarmot123/EDMM',
    },
    detail: {
      motivation: {
        en: 'Wanted a personal playground to push clean architecture end-to-end.', // DUMMY - replace later.
        ko: '클린 아키텍처를 끝까지 적용해 볼 개인 놀이터가 필요했습니다.', // DUMMY - replace later.
      },
      about: {
        en: 'Designed the architecture and design patterns to keep the code clean.',
        ko: '클린 코드를 위해 아키텍처와 디자인 패턴을 직접 설계했습니다.',
      },
    },
  },
  {
    id: 'taskflow',
    title: 'TaskFlow — Team Kanban',
    thumbnail: 'https://picsum.photos/seed/taskflow/800/500', // DUMMY - replace later.
    role: 'Team of 3 · Frontend Lead',
    period: '2025.01-2025.04',
    tech: ['React', 'TypeScript', 'NestJS', 'PostgreSQL'],
    summary: {
      en: 'A realtime kanban board for small teams.',
      ko: '소규모 팀을 위한 실시간 칸반 보드.',
    },
    links: {
      live: '#',
      repo: '#',
    },
    detail: {
      motivation: {
        en: 'Built to streamline how our team tracked sprint work.',
        ko: '팀의 스프린트 업무 추적을 간소화하려고 만들었습니다.',
      },
      about: {
        en: 'Drag-and-drop columns, realtime sync over WebSocket, and role-based access.',
        ko: '드래그앤드롭 컬럼, WebSocket 실시간 동기화, 역할 기반 접근 제어.',
      },
    },
  },
  {
    id: 'pulse',
    title: 'Pulse — Realtime Chat',
    thumbnail: 'https://picsum.photos/seed/pulse/800/500', // DUMMY - replace later.
    role: 'Solo',
    period: '2024.09-2024.11',
    tech: ['React Native', 'Firebase', 'TypeScript'],
    summary: {
      en: 'A cross-platform chat app with push notifications.',
      ko: '푸시 알림을 갖춘 크로스플랫폼 채팅 앱.',
    },
    links: {
      live: '#',
      repo: '#',
    },
    detail: {
      motivation: {
        en: 'Wanted to explore realtime messaging on mobile.',
        ko: '모바일에서 실시간 메시징을 탐구해 보고 싶었습니다.',
      },
      about: {
        en: 'Firebase-backed messaging, presence indicators, and offline cache.',
        ko: 'Firebase 기반 메시징, 접속 상태 표시, 오프라인 캐시.',
      },
    },
  },
  {
    id: 'pulse',
    title: 'Pulse — Realtime Chat',
    thumbnail: 'https://picsum.photos/seed/pulse/800/500', // DUMMY - replace later.
    role: 'Solo',
    period: '2024.09-2024.11',
    tech: ['React Native', 'Firebase', 'TypeScript'],
    summary: {
      en: 'A cross-platform chat app with push notifications.',
      ko: '푸시 알림을 갖춘 크로스플랫폼 채팅 앱.',
    },
    links: {
      live: '#',
      repo: '#',
    },
    detail: {
      motivation: {
        en: 'Wanted to explore realtime messaging on mobile.',
        ko: '모바일에서 실시간 메시징을 탐구해 보고 싶었습니다.',
      },
      about: {
        en: 'Firebase-backed messaging, presence indicators, and offline cache.',
        ko: 'Firebase 기반 메시징, 접속 상태 표시, 오프라인 캐시.',
      },
    },
  },
];
