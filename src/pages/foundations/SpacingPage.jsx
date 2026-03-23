import { useState } from 'react';
import PageHeader from '@/docs/components/PageHeader';
import CodeBlock from '@/docs/components/CodeBlock';

/* ─── Border Width tokens (from Figma BORDER GUIDE) ───────────────── */
const borderTokens = [
  {
    name: 'o9ds-border-1',
    px: '1px',
    rem: '0.0625rem',
    tw: 'border',
    role: 'Default',
    usage: 'UI borders, card outlines, dividers, form inputs — the standard border used everywhere',
  },
  {
    name: 'o9ds-border-3',
    px: '1.5px',
    rem: '0.09375rem',
    tw: '—',
    role: 'Medium',
    usage: 'Hover-state emphasis; sits between hairline and focus ring (CSS var only)',
  },
  {
    name: 'o9ds-border-2',
    px: '2px',
    rem: '0.125rem',
    tw: 'border-2',
    role: 'Focus',
    usage: 'Focus rings, selected / active state indicators',
  },
];

/* ─── Radius tokens (from Figma BORDER GUIDE) ─────────────────────── */
const radiusTokens = [
  {
    name: 'o9ds-radius-none',
    px: '0px',
    rem: '0rem',
    tw: 'rounded-none',
    usage: 'All UI surfaces — buttons, cards, inputs, dialogs. o9ds uses sharp rectangles everywhere.',
  },
  {
    name: 'o9ds-radius-circle',
    px: '50%',
    rem: '—',
    tw: 'rounded-circle',
    usage: 'True circles — avatars, radio dots, spinners, status indicators. Element must have 1:1 aspect ratio.',
  },
  {
    name: 'o9ds-radius-pill',
    px: '9999px',
    rem: '62.438rem',
    tw: 'rounded-full',
    usage: 'Pill / capsule — badges, tags, chips, counters, switch tracks. Works on any aspect ratio.',
  },
];

/* ─── Token data (from Figma SPACING STYLE GUIDE) ─────────────────── */
const tokens = [
  { name: 'o9ds-space-1',  px: 1,  rem: '0.0625rem', tw: 'p-px',  usage: 'Hairline dividers, pixel-perfect borders' },
  { name: 'o9ds-space-2',  px: 2,  rem: '0.125rem',  tw: 'p-0.5', usage: 'Micro gaps, icon inner padding' },
  { name: 'o9ds-space-4',  px: 4,  rem: '0.25rem',   tw: 'p-1',   usage: 'Action element gap (header area)' },
  { name: 'o9ds-space-6',  px: 6,  rem: '0.375rem',  tw: 'p-1.5', usage: 'Tight inline spacing, chip padding' },
  { name: 'o9ds-space-8',  px: 8,  rem: '0.5rem',    tw: 'p-2',   usage: 'Label-to-input gap, grouped element spacing, dashboard block gap' },
  { name: 'o9ds-space-10', px: 10, rem: '0.625rem',  tw: 'p-2.5', usage: 'Compact row padding' },
  { name: 'o9ds-space-12', px: 12, rem: '0.75rem',   tw: 'p-3',   usage: 'Tag / badge padding, list item indent' },
  { name: 'o9ds-space-16', px: 16, rem: '1rem',      tw: 'p-4',   usage: 'Default container padding, form element gap (vertical)' },
  { name: 'o9ds-space-20', px: 20, rem: '1.25rem',   tw: 'p-5',   usage: 'Section inner spacing' },
  { name: 'o9ds-space-24', px: 24, rem: '1.5rem',    tw: 'p-6',   usage: 'Card padding, panel content area' },
  { name: 'o9ds-space-32', px: 32, rem: '2rem',      tw: 'p-8',   usage: 'Large section gaps, modal gutters' },
  { name: 'o9ds-space-40', px: 40, rem: '2.5rem',    tw: 'p-10',  usage: 'Page-level vertical rhythm' },
  { name: 'o9ds-space-48', px: 48, rem: '3rem',      tw: 'p-12',  usage: 'Hero section padding' },
  { name: 'o9ds-space-64', px: 64, rem: '4rem',      tw: 'p-16',  usage: 'Full-bleed layout margins' },
  { name: 'o9ds-space-80', px: 80, rem: '5rem',      tw: 'p-20',  usage: 'Max-scale structural spacing' },
];

/* ─── Use-case data (from Figma Best Practices) ───────────────────── */
const useCases = [
  {
    id: 'forms',
    label: 'Forms',
    title: 'Use case 1 — Form spacing',
    description:
      'Maintain consistent spacing to create scannable, balanced form layouts.',
    rules: [
      { token: 'o9ds-space-16', tw: 'gap-4',  label: 'Vertical gap between form elements', detail: 'Applies to checkboxes, text boxes, dropdown lists, and text areas.' },
      { token: 'o9ds-space-8',  tw: 'gap-2',  label: 'Label → input gap',                  detail: 'Font container is taken from the font line height (12px / 16px line-height).' },
      { token: 'o9ds-space-8',  tw: 'gap-2',  label: 'Inside grouped elements',             detail: 'Vertical and horizontal spacing between checkbox / radio button and its label.' },
    ],
    preview: (
      <div className="space-y-4 w-full max-w-xs">
        {['Text field', 'Dropdown', 'Textarea'].map((label) => (
          <div key={label} className="space-y-2">
            <div className="text-xs text-text-tertiary">{label}</div>
            <div className="h-8 rounded border border-border bg-surface-raised flex items-center px-3">
              <span className="text-xs text-text-placeholder">Placeholder…</span>
            </div>
          </div>
        ))}
        <div className="space-y-2">
          <div className="text-xs text-text-tertiary">Options</div>
          <div className="space-y-2">
            {['Option A', 'Option B'].map((opt) => (
              <div key={opt} className="flex items-center gap-2">
                <div className="h-4 w-4 rounded border border-border bg-surface-raised shrink-0" />
                <span className="text-xs text-text-secondary">{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'containers',
    label: 'Containers',
    title: 'Use case 2 — Container padding',
    description:
      'Use 16px padding for window dialogs, popovers, sidebars, and cards. Side Panel and Toolbar (bottom) use 8px top padding as an exception.',
    rules: [
      { token: 'o9ds-space-16', tw: 'p-4',   label: 'Default container padding', detail: 'Popovers, dialogs, sidebars, cards, overlays.' },
      { token: 'o9ds-space-8',  tw: 'pt-2',  label: 'Top padding exception',     detail: 'Side Panel top area and Toolbar bottom container.' },
    ],
    preview: (
      <div className="flex gap-4 flex-wrap items-start">
        <div className="rounded border border-border bg-surface-raised p-4 w-36 space-y-2">
          <div className="text-xs font-medium text-text">Popover</div>
          <div className="h-5 bg-surface-overlay rounded" />
          <div className="h-5 bg-surface-overlay rounded w-3/4" />
          <div className="flex justify-end gap-2 pt-1">
            <div className="h-5 w-10 rounded border border-border bg-surface-overlay" />
            <div className="h-5 w-10 rounded bg-primary" />
          </div>
          <div className="text-2xs text-text-tertiary">← 16px padding →</div>
        </div>
        <div className="rounded border border-border bg-surface-raised w-28 overflow-hidden">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <div className="text-2xs text-text-tertiary">↕ 8px top</div>
            <div className="text-xs font-medium text-text">Side Panel</div>
            <div className="h-4 bg-surface-overlay rounded" />
            <div className="h-4 bg-surface-overlay rounded w-3/4" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'actions',
    label: 'Actions',
    title: 'Use case 3 — Action element spacing',
    description:
      'Use 4px between action elements in toolbar/header areas. Use 8px for footer action button groups.',
    rules: [
      { token: 'o9ds-space-4', tw: 'gap-1', label: 'Header / toolbar actions', detail: 'Consistent 4px gap between buttons, icon-buttons, and links in action bars.' },
      { token: 'o9ds-space-8', tw: 'gap-2', label: 'Footer action buttons',    detail: 'Cancel + Confirm button groups at the bottom of dialogs and panels.' },
    ],
    preview: (
      <div className="space-y-5 w-full">
        <div>
          <div className="text-xs text-text-tertiary mb-2">Toolbar — 4px gap</div>
          <div className="flex items-center gap-1">
            {['Filters', 'Download', 'Edit'].map((label) => (
              <button key={label} className="px-3 h-7 rounded border border-border text-xs text-text-secondary bg-surface-raised">
                {label}
              </button>
            ))}
            <div className="w-px h-4 bg-border mx-1" />
            <button className="h-7 w-7 rounded border border-border text-xs text-text-secondary bg-surface-raised">⋯</button>
          </div>
        </div>
        <div>
          <div className="text-xs text-text-tertiary mb-2">Footer — 8px gap</div>
          <div className="flex items-center justify-end gap-2">
            <button className="px-3 h-7 rounded border border-border text-xs text-text-secondary bg-surface-raised">Cancel</button>
            <button className="px-3 h-7 rounded text-xs text-white bg-primary">Save</button>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'layout',
    label: 'Layout',
    title: 'Use case 4 — Dashboard layout spacing',
    description:
      'Apply 8px spacing around each dashboard block to maintain consistent visual rhythm across full-view layouts.',
    rules: [
      { token: 'o9ds-space-8', tw: 'gap-2 / p-2', label: 'Dashboard block gap', detail: 'Spacing between tiles, widgets, and panels in grid-based layouts.' },
    ],
    preview: (
      <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded border border-border bg-surface-raised h-12 flex items-center justify-center text-2xs text-text-tertiary">
            Block
          </div>
        ))}
      </div>
    ),
  },
];

const MAX_PX = 80;

function copy(text) {
  navigator.clipboard?.writeText(text).catch(() => {});
}

export default function SpacingPage() {
  const [activeTab, setActiveTab] = useState('forms');
  const [copied, setCopied]       = useState(null);

  function handleCopy(text) {
    copy(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  }

  const activeCase = useCases.find((u) => u.id === activeTab);

  return (
    <article>
      <PageHeader
        title="Spacing & Borders"
        description="A 15-stop spacing scale (1–80px) on a 4px grid, plus 3 border-width tokens and a single radius token. All Figma primitives map directly to standard Tailwind utilities — no custom configuration needed."
        category="Foundation"
      />

      {/* ── Spacing Scale table ──────────────────────────────────── */}
      <section className="mb-12">
        <h2 id="scale" className="text-xl font-semibold text-text mb-1">Spacing Scale</h2>
        <p className="text-sm text-text-secondary mb-6">
          Base root size = 16px (1rem). All values use rem to respect browser font preferences.
          Click any row to copy the CSS variable.
        </p>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase w-1/2">Token</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase">px</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase">rem</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase">Tailwind</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase hidden lg:table-cell">Usage</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((t, i) => (
                <tr
                  key={t.name}
                  onClick={() => handleCopy(`--${t.name}`)}
                  className={[
                    'border-b border-border last:border-0 cursor-pointer transition-colors',
                    i % 2 === 0 ? 'bg-surface' : 'bg-surface-raised',
                    'hover:bg-surface-overlay',
                  ].join(' ')}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Visual bar */}
                      <div
                        className="shrink-0 rounded-sm bg-primary"
                        style={{ width: `${Math.max(2, (t.px / MAX_PX) * 80)}px`, height: '10px' }}
                      />
                      <code className="text-xs text-primary font-mono whitespace-nowrap">
                        {copied === `--${t.name}` ? '✓ copied' : `--${t.name}`}
                      </code>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-text font-mono">{t.px}px</code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-text-secondary font-mono">{t.rem}</code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-success font-mono">{t.tw}</code>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-text-secondary">{t.usage}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Tailwind Mapping note ─────────────────────────────────── */}
      <section className="mb-12">
        <h2 id="tailwind" className="text-xl font-semibold text-text mb-4">Tailwind Mapping</h2>
        <div className="rounded-xl border border-border bg-surface-raised p-5 space-y-4">
          <p className="text-sm text-text-secondary leading-relaxed">
            Tailwind CSS 4 uses a base unit of{' '}
            <code className="text-xs text-primary">0.25rem (4px)</code>. All 15 Figma spacing tokens
            map exactly to built-in Tailwind utilities — no custom configuration required. The{' '}
            <code className="text-xs text-primary">p-*</code> class is shown as reference; the same
            number applies to{' '}
            <code className="text-xs text-primary">m-*</code>,{' '}
            <code className="text-xs text-primary">gap-*</code>,{' '}
            <code className="text-xs text-primary">space-x-*</code>,{' '}
            <code className="text-xs text-primary">inset-*</code>, and all other spacing utilities.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { figma: 'o9ds-space-4',  tw: 'p-1 / gap-1',   note: '4px — actions' },
              { figma: 'o9ds-space-8',  tw: 'p-2 / gap-2',   note: '8px — labels, groups' },
              { figma: 'o9ds-space-16', tw: 'p-4 / gap-4',   note: '16px — containers' },
              { figma: 'o9ds-space-24', tw: 'p-6 / gap-6',   note: '24px — card padding' },
              { figma: 'o9ds-space-32', tw: 'p-8 / gap-8',   note: '32px — sections' },
              { figma: 'o9ds-space-64', tw: 'p-16 / gap-16', note: '64px — layout margins' },
            ].map((ex) => (
              <div key={ex.figma} className="rounded-lg border border-border bg-surface p-3 space-y-0.5">
                <code className="text-2xs text-primary block font-mono">{ex.figma}</code>
                <code className="text-xs text-success block font-mono">{ex.tw}</code>
                <span className="text-2xs text-text-tertiary">{ex.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Border Width ─────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 id="border-width" className="text-xl font-semibold text-text mb-1">Border Width</h2>
        <p className="text-sm text-text-secondary mb-6">
          3 tokens from the Figma Border Guide. Base root = 16px.{' '}
          <code className="text-xs text-primary">o9ds-border-3</code> (1.5px) has no Tailwind
          equivalent — reference it via CSS custom property.
        </p>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase">Token</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase">px</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase">rem</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase">Tailwind</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase">Role</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase hidden lg:table-cell">Usage</th>
              </tr>
            </thead>
            <tbody>
              {borderTokens.map((t, i) => (
                <tr
                  key={t.name}
                  onClick={() => handleCopy(`--${t.name}`)}
                  className={[
                    'border-b border-border last:border-0 cursor-pointer transition-colors',
                    i % 2 === 0 ? 'bg-surface' : 'bg-surface-raised',
                    'hover:bg-surface-overlay',
                  ].join(' ')}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Visual border swatch */}
                      <div
                        className="shrink-0 w-10 h-6 rounded bg-surface-overlay border-primary"
                        style={{ border: `${t.px} solid var(--color-primary)` }}
                      />
                      <code className="text-xs text-primary font-mono whitespace-nowrap">
                        {copied === `--${t.name}` ? '✓ copied' : `--${t.name}`}
                      </code>
                    </div>
                  </td>
                  <td className="px-4 py-3"><code className="text-xs text-text font-mono">{t.px}</code></td>
                  <td className="px-4 py-3"><code className="text-xs text-text-secondary font-mono">{t.rem}</code></td>
                  <td className="px-4 py-3"><code className="text-xs text-success font-mono">{t.tw}</code></td>
                  <td className="px-4 py-3">
                    <span className={[
                      'text-2xs font-semibold px-2 py-0.5 rounded-full',
                      t.role === 'Default' ? 'bg-surface-overlay text-text-secondary' :
                      t.role === 'Focus'   ? 'bg-utility-purple/10 text-utility-purple' :
                                             'bg-surface-overlay text-text-tertiary',
                    ].join(' ')}>
                      {t.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-text-secondary">{t.usage}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Border Radius ────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 id="border-radius" className="text-xl font-semibold text-text mb-1">Border Radius</h2>
        <p className="text-sm text-text-secondary mb-6">
          o9ds uses <strong className="text-text font-semibold">sharp rectangles (0px)</strong> for all UI surfaces — no softened corners.
          Two rounded tokens exist: <code className="text-xs text-primary">o9ds-radius-circle</code> (50%) for true circles on square elements (avatars, dots, spinners),
          and <code className="text-xs text-primary">o9ds-radius-pill</code> (9999px) for pill/capsule shapes on rectangular elements (badges, tags, chips).
        </p>

        <div className="rounded-xl border border-border overflow-hidden mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase">Token</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase">Value</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase">rem</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase">Tailwind</th>
                <th className="px-4 py-2.5 text-2xs font-bold tracking-widest text-text-tertiary uppercase hidden lg:table-cell">Usage</th>
              </tr>
            </thead>
            <tbody>
              {radiusTokens.map((t, i) => (
                <tr
                  key={t.name}
                  onClick={() => handleCopy(`--${t.name}`)}
                  className={[
                    'border-b border-border last:border-0 cursor-pointer transition-colors',
                    i % 2 === 0 ? 'bg-surface' : 'bg-surface-raised',
                    'hover:bg-surface-overlay',
                  ].join(' ')}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Visual radius swatch — circle uses square, pill uses rectangle */}
                      <div
                        className={`shrink-0 border border-border bg-surface-overlay ${
                          t.px === '50%' ? 'w-8 h-8' : 'w-10 h-6'
                        }`}
                        style={{ borderRadius: t.px === '0px' ? '0px' : t.px }}
                      />
                      <code className="text-xs text-primary font-mono whitespace-nowrap">
                        {copied === `--${t.name}` ? '✓ copied' : `--${t.name}`}
                      </code>
                    </div>
                  </td>
                  <td className="px-4 py-3"><code className="text-xs text-text font-mono">{t.px}</code></td>
                  <td className="px-4 py-3"><code className="text-xs text-text-secondary font-mono">{t.rem}</code></td>
                  <td className="px-4 py-3"><code className="text-xs text-success font-mono">{t.tw}</code></td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-text-secondary">{t.usage}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sharp vs Circle vs Pill visual comparison */}
        <div className="grid grid-cols-3 gap-4">
          {/* Sharp */}
          <div className="border border-border bg-surface-raised p-5 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-8 border border-border bg-surface-overlay" style={{ borderRadius: '0px' }} />
              <div className="w-8 h-8 border border-border bg-surface-overlay" style={{ borderRadius: '0px' }} />
              <div className="w-20 h-7 border border-border bg-primary/20" style={{ borderRadius: '0px' }} />
            </div>
            <div className="text-center">
              <code className="text-2xs text-primary block font-mono">--o9ds-radius-none</code>
              <span className="text-xs text-text-tertiary">Sharp — all UI surfaces</span>
            </div>
          </div>
          {/* Circle */}
          <div className="border border-border bg-surface-raised p-5 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-border bg-surface-overlay" style={{ borderRadius: '50%' }} />
              <div className="w-6 h-6 border border-border bg-surface-overlay" style={{ borderRadius: '50%' }} />
              <div className="w-3 h-3 bg-success" style={{ borderRadius: '50%' }} />
            </div>
            <div className="text-center">
              <code className="text-2xs text-primary block font-mono">--o9ds-radius-circle</code>
              <span className="text-xs text-text-tertiary">Circle — avatars, dots, spinners</span>
            </div>
          </div>
          {/* Pill */}
          <div className="border border-border bg-surface-raised p-5 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-6 border border-border bg-surface-overlay" style={{ borderRadius: '9999px' }} />
              <div className="px-3 h-6 border border-border bg-primary/20 flex items-center" style={{ borderRadius: '9999px' }}>
                <span className="text-2xs text-text-secondary">Tag</span>
              </div>
            </div>
            <div className="text-center">
              <code className="text-2xs text-primary block font-mono">--o9ds-radius-pill</code>
              <span className="text-xs text-text-tertiary">Pill — badges, tags, chips</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Best Practices (tabbed) ───────────────────────────────── */}
      <section className="mb-12">
        <h2 id="best-practices" className="text-xl font-semibold text-text mb-1">Best Practices</h2>
        <p className="text-sm text-text-secondary mb-6">
          Recommended spacing values for the four main use-case categories from the Figma Spacing Style Guide.
        </p>

        {/* Tab bar */}
        <div className="flex gap-1 border-b border-border mb-6">
          {useCases.map((u) => (
            <button
              key={u.id}
              onClick={() => setActiveTab(u.id)}
              className={[
                'px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 -mb-px transition-colors',
                activeTab === u.id
                  ? 'border-primary text-text'
                  : 'border-transparent text-text-tertiary hover:text-text-secondary',
              ].join(' ')}
            >
              {u.label}
            </button>
          ))}
        </div>

        {activeCase && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Rules */}
            <div>
              <h3 className="font-semibold text-text mb-2">{activeCase.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{activeCase.description}</p>
              <div className="space-y-3">
                {activeCase.rules.map((rule) => (
                  <div key={rule.label} className="rounded-lg border border-border bg-surface-raised p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <span className="text-sm font-medium text-text">{rule.label}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <code className="text-2xs text-primary font-mono bg-surface px-1.5 py-0.5 rounded border border-border">
                          {rule.token}
                        </code>
                        <code className="text-2xs text-success font-mono bg-surface px-1.5 py-0.5 rounded border border-border">
                          {rule.tw}
                        </code>
                      </div>
                    </div>
                    <p className="text-xs text-text-tertiary">{rule.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-xl border border-border bg-surface-raised p-6 flex items-start justify-center min-h-48">
              {activeCase.preview}
            </div>
          </div>
        )}
      </section>

      {/* ── Applying Tokens ──────────────────────────────────────── */}
      <section className="mb-12">
        <h2 id="applying" className="text-xl font-semibold text-text mb-4">Applying Tokens</h2>
        <div className="grid gap-4 sm:grid-cols-2">

          {/* CSS */}
          <div>
            <p className="text-xs text-text-tertiary font-medium uppercase tracking-wide mb-2">CSS — var reference</p>
            <CodeBlock code={`.card {
  /* o9ds-space-16 → default container */
  padding: var(--o9ds-space-16);
}

.form-group + .form-group {
  /* o9ds-space-16 → vertical form gap */
  margin-top: var(--o9ds-space-16);
}

.form-label {
  /* o9ds-space-8 → label → input gap */
  margin-bottom: var(--o9ds-space-8);
}

.action-bar {
  /* o9ds-space-4 → header action gap */
  gap: var(--o9ds-space-4);
}

.footer-actions {
  /* o9ds-space-8 → footer button gap */
  gap: var(--o9ds-space-8);
}`} language="css" />
          </div>

          {/* JSX */}
          <div>
            <p className="text-xs text-text-tertiary font-medium uppercase tracking-wide mb-2">JSX — Tailwind utilities</p>
            <CodeBlock code={`{/* Card — o9ds-space-24 → p-6 */}
<div className="p-6 rounded border border-border">

  {/* Form group gap — o9ds-space-16 → space-y-4 */}
  <div className="space-y-4">

    {/* Label gap — o9ds-space-8 → gap-2 */}
    <div className="flex flex-col gap-2">
      <label className="text-xs">Label</label>
      <input className="..." />
    </div>
  </div>

  {/* Footer — o9ds-space-8 → gap-2 */}
  <div className="flex justify-end gap-2 mt-4">
    <button>Cancel</button>
    <button>Save</button>
  </div>
</div>`} language="jsx" />
          </div>
        </div>
      </section>
    </article>
  );
}
