import { Link } from 'react-router-dom';
import PageHeader from '@/docs/components/PageHeader';

const styles = [
  {
    title: 'Color',
    description: '206 primitive palette values, 64 semantic role tokens, and 62 component aliases across a three-tier architecture. Supports light and dark modes with automatic theme switching via CSS custom properties.',
    path: '/docs/foundations/color',
    stats: '206 primitives · 64 semantic · 62 aliases · 2 themes',
    preview: (
      <div className="grid grid-cols-5 gap-1.5">
        <div className="h-6 w-6 bg-interactive" />
        <div className="h-6 w-6 bg-danger" />
        <div className="h-6 w-6 bg-success" />
        <div className="h-6 w-6 bg-warning" />
        <div className="h-6 w-6 bg-info" />
      </div>
    ),
  },
  {
    title: 'Typography',
    description: 'o9 Sans as the primary typeface with a 7-step size scale (10–32px), 3 weights (Regular, Medium, Bold), and composite tokens for headings, labels, paragraphs, and uppercase styles.',
    path: '/docs/foundations/typography',
    stats: '15 font sizes · 3 weights · 4 letter-spacing tiers',
    preview: (
      <div className="space-y-1">
        <p className="text-2xl font-bold text-text">Heading</p>
        <p className="text-sm text-text-secondary">Body text</p>
        <p className="font-mono text-xs text-text-tertiary">Code</p>
      </div>
    ),
  },
  {
    title: 'Spacing',
    description: 'A 15-stop scale (1–80px) built on a 4px base grid with Figma primitive tokens mapping directly to Tailwind padding, margin, and gap utilities. Includes border-width and border-radius tokens.',
    path: '/docs/foundations/spacing',
    stats: '15 space stops · 4px base grid · 8 border-radius tokens',
    preview: (
      <div className="flex items-end gap-1">
        {[1, 2, 4, 8, 12, 16, 24, 32].map((size) => (
          <div
            key={size}
            className="bg-interactive shrink-0"
            style={{ width: `${Math.max(4, size * 0.5)}px`, height: `${Math.max(4, size * 0.5)}px` }}
          />
        ))}
      </div>
    ),
  },
  {
    title: 'Effects',
    description: 'Six directional shadow tokens, a backdrop-blur token for overlay components, and three opacity levels for hover, selection, and disabled states.',
    path: '/docs/foundations/effects',
    stats: '6 shadows · 1 blur · 3 opacity levels',
    preview: (
      <div className="flex items-center gap-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-surface-overlay" style={{ boxShadow: '0px 4px 40px 0px rgba(0,0,0,0.40)' }} />
        </div>
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-surface-overlay" style={{ boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.40)' }} />
        </div>
        <div className="flex gap-1 items-center">
          {[0.8, 0.6, 0.4].map((o) => (
            <div key={o} className="w-6 h-8 bg-interactive" style={{ opacity: o }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Icons',
    description: 'The o9con icon library with 1,000+ consistent SVG icons across categories like navigation, actions, status, file types, and data visualization.',
    path: '/docs/foundations/icons',
    stats: '1,036 icons · 4 size tokens · SVG with currentColor',
    preview: (
      <div className="flex gap-3 text-text-secondary">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M12 3v18" /></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7" /></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6M10 4a6 6 0 100 12 6 6 0 000-12z" /></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
      </div>
    ),
  },
  {
    title: 'Illustrations',
    description: '14 inline SVG illustration scenes supporting both light and dark modes. Used for empty states, onboarding, and feature highlights with three size presets.',
    path: '/docs/foundations/illustrations',
    stats: '14 scenes · 3 sizes (96/124/224px) · Light + Dark',
    preview: (
      <div className="flex items-center gap-2 text-text-tertiary">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="16" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M4 32l12-8 8 6 10-10 10 8" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
  },
  {
    title: 'Motion',
    description: '6 duration tokens, 4 easing curves, and 165 animation keyframes for click effects, hover effects, loading indicators, and looping animations — all respecting prefers-reduced-motion.',
    path: '/docs/foundations/motion',
    stats: '6 durations · 4 easings · 165 definitions',
    preview: (
      <div className="flex items-center gap-3 text-text-secondary">
        <div className="w-8 h-8 bg-interactive o9-anim-pulse-loop" />
        <div className="w-8 h-8 bg-info animate-spin" style={{ animationDuration: '2s' }} />
        <div className="w-8 h-8 bg-success animate-bounce" />
      </div>
    ),
  },
];

export default function StylesPage() {
  return (
    <article>
      <PageHeader
        title="Styles"
        description="The visual foundation of o9ds — design tokens that define color, typography, spacing, effects, iconography, illustrations, and motion. These 570+ tokens ensure consistency across 67 components and enable seamless theming between light and dark modes."
        category="Foundation"
      />

      <section className="mb-12">
        <h2 id="overview" className="text-xl font-semibold text-text mb-4">Overview</h2>
        <p className="text-text-secondary leading-relaxed mb-6">
          Design tokens are the smallest building blocks of the design system. They represent
          design decisions as named values — making it easy to maintain and update the visual
          language across the entire platform. Tokens are defined using CSS custom properties
          and are available as Tailwind CSS utilities.
        </p>

        <div className="grid gap-4">
          {styles.map((style) => (
            <Link
              key={style.title}
              to={style.path}
              className="group flex items-center gap-6 border border-border bg-surface-raised p-6 transition-colors hover:border-border-hover hover:bg-surface-overlay"
            >
              <div className="shrink-0 w-44 h-20 flex items-center justify-center">{style.preview}</div>
              <div className="min-w-0 flex-1 max-w-lg">
                <h3 className="text-lg font-semibold text-text group-hover:text-interactive transition-colors">
                  {style.title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">{style.description}</p>
                <p className="mt-2 text-[10px] font-medium text-text-tertiary uppercase tracking-widest">{style.stats}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 id="token-architecture" className="text-xl font-semibold text-text mb-4">Token Architecture</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          The o9ds token system follows a three-tier architecture:
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border border-border bg-surface-raised p-5">
            <h3 className="font-semibold text-text">Tier 1 — Primitives</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Raw palette values like <code className="text-xs text-info">--color-global-gray-10</code>.
              These define the available colors but are not used directly by components.
            </p>
          </div>
          <div className="border border-border bg-surface-raised p-5">
            <h3 className="font-semibold text-text">Tier 2 — Semantic</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Role-based mappings like <code className="text-xs text-info">--color-s-layer-01</code>.
              These map primitives to functional roles (surfaces, borders, text).
            </p>
          </div>
          <div className="border border-border bg-surface-raised p-5">
            <h3 className="font-semibold text-text">Tier 3 — Component</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Tailwind aliases like <code className="text-xs text-info">bg-surface</code>.
              Components consume these, enabling theming by changing only the semantic layer.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="at-a-glance" className="text-xl font-semibold text-text mb-4">At a Glance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Color Tokens', value: '305' },
            { label: 'Icons', value: '1,036' },
            { label: 'Components', value: '58+' },
            { label: 'Motion Keyframes', value: '60' },
            { label: 'Space Stops', value: '15' },
            { label: 'Font Sizes', value: '7' },
            { label: 'Shadow Tokens', value: '6' },
            { label: 'Illustrations', value: '14' },
          ].map((stat) => (
            <div key={stat.label} className="border border-border bg-surface-raised p-4 text-center">
              <p className="text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-[10px] text-text-tertiary uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
