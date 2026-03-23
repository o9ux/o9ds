import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import ParticleWaves from '@/components/ParticleWaves';
import O9Icon from '@/components/O9Icon';
import o9LogoSvg from '@/assets/icons/o9con-o9-logo.svg?raw';

const stats = [
  { value: '67',    label: 'Components' },
  { value: '8',     label: 'Foundation Categories' },
  { value: '1,036', label: 'Icons' },
  { value: '570+',  label: 'Design Tokens' },
];

const sections = [
  {
    tag: '01',
    title: 'Foundation',
    description:
      'Design tokens, color palettes, typography scales, spacing, effects, icons, illustrations, and motion. The language everything speaks.',
    links: [
      { label: 'Color',         path: '/docs/foundations/color' },
      { label: 'Typography',    path: '/docs/foundations/typography' },
      { label: 'Spacing',       path: '/docs/foundations/spacing' },
      { label: 'Icons',         path: '/docs/foundations/icons' },
      { label: 'Motion',        path: '/docs/foundations/motion' },
    ],
  },
  {
    tag: '02',
    title: 'Components',
    description:
      'Over 67 production-ready UI components — buttons, navigation, containers, feedback, inputs, and more.',
    links: [
      { label: 'Buttons & Actions',         path: '/docs/components/button' },
      { label: 'Navigation',                path: '/docs/components/tabstrip' },
      { label: 'Containers',                path: '/docs/components/tooltip' },
      { label: 'Status & Feedback',         path: '/docs/components/pill' },
      { label: 'Input & Form Controls',     path: '/docs/components/textbox' },
    ],
  },
];

/* ── Inline keyframes for landing page animations ── */
const LANDING_KEYFRAMES_ID = 'o9ds-landing-keyframes';
function ensureLandingKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(LANDING_KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = LANDING_KEYFRAMES_ID;
  style.textContent = `
    @keyframes o9-fade-in-up {
      from { opacity: 0; transform: translateY(40px); filter: blur(8px); }
      to   { opacity: 1; transform: translateY(0); filter: blur(0); }
    }
    @keyframes o9-hero-blur-in {
      0%   { opacity: 0; transform: translateY(60px); filter: blur(16px); }
      100% { opacity: 1; transform: translateY(0); filter: blur(0); }
    }
    @keyframes o9-color-cycle {
      0%      { color: var(--color-global-plum-accent); }
      7.69%   { color: var(--color-global-scarlet-accent); }
      15.38%  { color: var(--color-global-sienna-accent); }
      23.08%  { color: var(--color-global-juice-accent); }
      30.77%  { color: var(--color-global-ocra-accent); }
      38.46%  { color: var(--color-global-sun-accent); }
      46.15%  { color: var(--color-global-lavender-accent); }
      53.85%  { color: var(--color-global-indigo-accent); }
      61.54%  { color: var(--color-global-grass-accent); }
      69.23%  { color: var(--color-global-leaf-accent); }
      76.92%  { color: var(--color-global-glacier-accent); }
      84.62%  { color: var(--color-global-shock-accent); }
      92.31%  { color: var(--color-global-o9gray-accent); }
      100%    { color: var(--color-global-plum-accent); }
    }
    .o9-fade-in-up {
      animation: o9-fade-in-up 0.8s var(--o9ds-motion-ease-out) both;
    }
    .o9-hero-blur-in {
      animation: o9-hero-blur-in 1.2s var(--o9ds-motion-ease-out) both;
    }
    .o9-hero-blur-in.o9-color-cycle {
      animation: o9-hero-blur-in 1.2s var(--o9ds-motion-ease-out) both, o9-color-cycle 12s var(--o9ds-motion-ease-none) 1.7s infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .o9-fade-in-up,
      .o9-hero-blur-in { animation: none; opacity: 1; transform: none; filter: none; }
      .o9-color-cycle { animation: none; }
    }
  `;
  document.head.appendChild(style);
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  ensureLandingKeyframes();

  /* Always start from top */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface-sunken text-text">

      {/* ── Navbar ── */}
      <header className="flex h-14 items-center border-b border-border bg-surface-sunken px-4 lg:px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-interactive border border-interactive text-on-interactive">
              <O9Icon svg={o9LogoSvg} className="!w-5 !h-5" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              o9<span className="text-text-secondary font-normal">ds</span>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <span className="hidden text-xs font-medium tracking-widest uppercase text-text-tertiary sm:block">
              Platform Design System
            </span>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center border border-border-strong text-text-secondary hover:border-interactive-border hover:text-text transition-colors cursor-pointer"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="8" cy="8" r="3" />
                  <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M13.5 8.5a5.5 5.5 0 0 1-7-7 5.5 5.5 0 1 0 7 7Z" />
                </svg>
              )}
            </button>

            <Link
              to="/docs/get-started"
              className="border border-interactive-border px-5 py-2 text-xs font-bold tracking-wider uppercase text-text hover:bg-interactive hover:text-on-interactive transition-colors"
            >
              Documentation →
            </Link>
          </div>
        </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Particle waves background */}
        <ParticleWaves className="absolute inset-0 z-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-36">
          <div className="max-w-4xl">
            <p className="mb-6 text-[10px] font-bold tracking-widest uppercase text-text-tertiary o9-fade-in-up" style={{ animationDelay: '0.1s' }}>
              o9 Solutions — Platform Design System
            </p>
            <h1 className="text-5xl font-black leading-none tracking-tighter text-text sm:text-7xl lg:text-8xl">
              <span className="o9-hero-blur-in inline-block" style={{ animationDelay: '0.2s' }}>Build.</span><br />
              <span className="o9-hero-blur-in o9-color-cycle inline-block" style={{ animationDelay: '0.5s' }}>Ship.</span><br />
              <span className="o9-hero-blur-in inline-block" style={{ animationDelay: '0.8s' }}>Scale.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-text-secondary o9-fade-in-up" style={{ animationDelay: '1.1s' }}>
              A sharp, minimal design system for building consistent digital experiences across the o9 platform. Every token, component, and guideline — in one place.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4 o9-fade-in-up" style={{ animationDelay: '1.3s' }}>
              <Link
                to="/docs/get-started"
                className="inline-flex h-12 items-center bg-interactive px-8 text-xs font-bold tracking-wider uppercase text-on-interactive hover:bg-interactive-hover transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/docs/components/button"
                className="inline-flex h-12 items-center border border-border-strong px-8 text-xs font-bold tracking-wider uppercase text-text-secondary hover:border-interactive-border hover:text-text transition-colors"
              >
                Browse Components
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="border-b border-border md:border-b-0 px-8 py-10 o9-fade-in-up" style={{ animationDelay: `${1.5 + i * 0.15}s` }}>
                <p className="text-4xl font-black tracking-tighter text-text">{s.value}</p>
                <p className="mt-1 text-[10px] font-bold tracking-widest uppercase text-text-tertiary">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sections ── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            {sections.map((sec, i) => (
              <div key={sec.tag} className="p-10 lg:p-14 o9-fade-in-up" style={{ animationDelay: `${2.1 + i * 0.2}s` }}>
                <p className="mb-2 text-[10px] font-bold tracking-widest uppercase text-text-tertiary">
                  {sec.tag}
                </p>
                <h2 className="text-2xl font-black tracking-tight text-text">{sec.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary max-w-sm">
                  {sec.description}
                </p>
                <ul className="mt-8 space-y-0 border-t border-border">
                  {sec.links.map((link) => (
                    <li key={link.label} className="border-b border-border">
                      <Link
                        to={link.path}
                        className="flex items-center justify-between py-3 text-xs font-semibold tracking-wide text-text-secondary hover:text-text hover:bg-surface-overlay px-1 transition-colors group"
                      >
                        {link.label}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-text">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Principles ── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="mb-10 text-[10px] font-bold tracking-widest uppercase text-text-tertiary o9-fade-in-up" style={{ animationDelay: '2.5s' }}>
            Design Principles
          </p>
          <div className="grid gap-0 sm:grid-cols-3 border border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
            {[
              { title: 'Sharp', body: 'Zero border-radius. Every element is a precise rectangle. Mathematical, intentional, and exact.' },
              { title: 'Minimal', body: 'Only what is necessary. No decoration for its own sake. Clarity through reduction.' },
              { title: 'Consistent', body: 'A single design language across 58+ components. Tokens enforced at every level.' },
            ].map((p, i) => (
              <div key={p.title} className="p-8 o9-fade-in-up" style={{ animationDelay: `${2.6 + i * 0.15}s` }}>
                <h3 className="text-lg font-black tracking-tight text-text">{p.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-text-secondary">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="border border-border p-12 lg:p-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 o9-fade-in-up" style={{ animationDelay: '3s' }}>
            <div>
              <h2 className="text-3xl font-black tracking-tighter text-text lg:text-4xl">
                Start building.
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Read the docs. Use the components. Ship faster.
              </p>
            </div>
            <Link
              to="/docs/get-started"
              className="shrink-0 inline-flex h-12 items-center bg-interactive px-10 text-xs font-bold tracking-wider uppercase text-on-interactive hover:bg-interactive-hover transition-colors"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border px-4 lg:px-6 py-8">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary">
            o9ds — Platform Design System
          </span>
          <span className="text-[10px] text-text-disabled">
            © {new Date().getFullYear()} o9 Solutions
          </span>
        </div>
      </footer>
    </div>
  );
}
