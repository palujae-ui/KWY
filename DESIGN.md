# DESIGN SYSTEM — 유경원 (Kyung Won Yoo) · 상명대학교 경제금융학부

> Google Design System (Material 3 / Google Modern Aesthetic) 기반 웹 UI
> 핵심 키워드 = **"신뢰 · 명확성 · 현대성"**

## 1. Palette — Google Material Slate & Blue

| Token | Hex / Spec | Usage |
|---|---|---|
| `--color-bg` | `#F8FAFC` | 페이지 기본 배경 (Cool Slate) |
| `--color-surface` | `#FFFFFF` | 카드·패널 표면 (Crisp White) |
| `--color-surface-warm` | `#EFF6FF` | Google Blue 강조 블록·인용부 배경 |
| `--color-fg` | `#0F172A` | 주요 제목 (Deep Slate) |
| `--color-fg-2` | `#334155` | 본문 텍스트 |
| `--color-muted` | `#64748B` | 캡션·메타·연도 |
| `--color-border` | `#E2E8F0` | 기본 보더 (Light Slate) |
| `--color-border-soft` | `#F1F5F9` | 리스트 구분선 |
| `--color-accent` | `#1A73E8` | **Google Blue** — 주요 액션·버튼·배지 |
| `--color-accent-hover` | `#1557B0` | Google Blue Hover |
| `--color-meta` | `#0B57D0` | Primary Google Navy/Blue |

- **Google 4-Color Accent Touch (Badges & Metrics)**:
  - Google Blue: `#1A73E8` (연구 논문 / 메인 CTA)
  - Google Green: `#34A853` (경력 연수)
  - Google Amber: `#F9AB00` (재직 기관)
  - Google Indigo/Violet: `#6366F1` (해외 저널)

## 2. Typography

- **Headings/Display**: `'Plus Jakarta Sans'`, `'Noto Sans KR'`, sans-serif (700 / 800 bold weight, clean geometric sans)
- **Body/UI**: `'Noto Sans KR'`, `'Inter'`, system-ui, sans-serif
- **Numeric/Mono**: `'Roboto Mono'`, ui-monospace, Menlo, monospace (tabular figures)
- **한글 줄바꿈**: `word-break: keep-all` 적용

## 3. Elevation & Radius

- Surface Radius: `rounded-2xl` (16px), `rounded-3xl` (24px), `rounded-full` (chips/buttons)
- Elevation: `shadow-xs`, `shadow-sm`, hover시 `shadow-md` transition.

## 4. Components

- **Header**: Glassmorphism (`bg-white/85 backdrop-blur-md border-b border-slate-200/80`), Google-style pill tabs.
- **Hero**: Clean modern layout with Google Blue pill badges, high-contrast headings, rounded portrait container.
- **Stat strip**: 4 rounded Google Material metric cards with color-coded badges.
- **Research Cards**: Rounded Material cards with Google Blue chip filters (`ResearchList.tsx`).
- **Footer**: Modern dark slate (`bg-slate-900 text-slate-300 border-t-4 border-blue-600`).
