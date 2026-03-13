import { Link } from 'react-router-dom';
import PageHeader from '@/docs/components/PageHeader';

const styles = [
  {
    title: 'Color',
    description: 'A two-tier token system with primitive palette values and semantic role-based tokens for surfaces, text, borders, and feedback states.',
    path: '/docs/foundations/color',
    preview: (
      <div className="flex gap-2">
        <div className="h-10 w-10 rounded-lg bg-primary" />
        <div className="h-10 w-10 rounded-lg bg-danger" />
        <div className="h-10 w-10 rounded-lg bg-success" />
        <div className="h-10 w-10 rounded-lg bg-warning" />
        <div className="h-10 w-10 rounded-lg bg-info" />
      </div>
    ),
  },
  {
    title: 'Typography',
    description: 'o9Sans as the primary typeface with a 7-step scale (10–32px), 3 weights, and JetBrains Mono for code.',
    path: '/docs/foundations/typography',
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
    description: 'A 15-stop scale (1–80px) built on a 4px grid, with Figma primitive tokens mapping directly to Tailwind padding, margin, and gap utilities.',
    path: '/docs/foundations/spacing',
    preview: (
      <div className="flex items-end gap-1">
        {[1, 2, 4, 8, 12, 16, 24, 32].map((size) => (
          <div
            key={size}
            className="bg-primary rounded-sm shrink-0"
            style={{ width: `${Math.max(4, size * 0.5)}px`, height: `${Math.max(4, size * 0.5)}px` }}
          />
        ))}
      </div>
    ),
  },
  {
    title: 'Effects',
    description: 'Six directional shadows, a 4px backdrop-blur, and three opacity levels for creating depth, overlays, and disabled states across the UI.',
    path: '/docs/foundations/effects',
    preview: (
      <div className="flex items-center gap-4">
        {/* Shadow stack preview */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-surface-overlay" style={{ boxShadow: '0px 4px 40px 0px rgba(0,0,0,0.40)' }} />
        </div>
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-surface-overlay" style={{ boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.40)' }} />
        </div>
        {/* Opacity strip */}
        <div className="flex gap-1 items-center">
          {[0.8, 0.6, 0.4].map((o) => (
            <div key={o} className="w-6 h-8 bg-primary" style={{ opacity: o }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Icons',
    description: 'The o9con icon library with 500+ consistent SVG icons for use across the platform.',
    path: '/docs/foundations/icons',
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
    description: 'o9illus illustration library supporting both light and dark modes for empty states, onboarding, and feature highlights.',
    path: '/docs/foundations/illustrations',
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
];

export default function StylesPage() {
  return (
    <article>
      <PageHeader
        title="Styles"
        description="The visual language of o9ds is built on a foundation of design tokens that define color, typography, elevation, spacing, and shape. These tokens ensure consistency across all components and applications."
        category="Foundation"
      />

      <section className="mb-12">
        <h2 id="overview" className="text-xl font-semibold text-text mb-4">Overview</h2>
        <p className="text-text-secondary leading-relaxed mb-6">
          Design tokens are the smallest building blocks of the design system. They represent
          design decisions as named values, making it easy to maintain and update the visual
          language across the entire platform. Tokens are defined using CSS custom properties
          and are available as Tailwind CSS utilities.
        </p>

        <div className="grid gap-4">
          {styles.map((style) => (
            <Link
              key={style.title}
              to={style.path}
              className="group flex items-center gap-6 rounded-xl border border-border bg-surface-raised p-6 transition-colors hover:border-border-hover hover:bg-surface-overlay"
            >
              <div className="shrink-0">{style.preview}</div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                  {style.title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">{style.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 id="token-architecture" className="text-xl font-semibold text-text mb-4">Token Architecture</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          The o9ds token system follows a two-tier architecture:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface-raised p-5">
            <h3 className="font-semibold text-text">Primitive Tokens</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Raw palette values like <code className="text-xs text-primary">--color-gray-900</code>.
              These define the available colors but are not used directly by components.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface-raised p-5">
            <h3 className="font-semibold text-text">Semantic Tokens</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Role-based mappings like <code className="text-xs text-primary">--color-surface</code>.
              Components consume these, enabling theming by changing only the semantic layer.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
