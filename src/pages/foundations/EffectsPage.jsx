import { useState } from 'react';
import PageHeader from '@/docs/components/PageHeader';
import CodeBlock from '@/docs/components/CodeBlock';

/* ─── Shadow token data (from Figma EFFECTS GUIDE) ─────────────────── */
const shadowTokens = [
  {
    name: 'o9ds-shadow-center',
    cssVar: '--o9ds-shadow-center',
    tw: 'shadow-center',
    value: '0px 4px 40px 0px',
    colorToken: 'shadow-static-1',
    direction: 'center',
    description: 'Ambient glow on all sides. Highest-elevation floating surface.',
    useCase: 'Tooltip, menu (all dropdowns), popover, sidepanel overlay, window / alert dialog, card hover, toast, date & time picker',
  },
  {
    name: 'o9ds-shadow-right',
    cssVar: '--o9ds-shadow-right',
    tw: 'shadow-right',
    value: '10px 0px 10px 0px',
    colorToken: 'shadow-static-2',
    direction: 'right',
    description: 'Rightward cast from a panel sliding in from the left edge.',
    useCase: 'Left sidepanel as overlay',
  },
  {
    name: 'o9ds-shadow-left',
    cssVar: '--o9ds-shadow-left',
    tw: 'shadow-left',
    value: '-10px 0px 10px 0px',
    colorToken: 'shadow-static-2',
    direction: 'left',
    description: 'Leftward cast from a panel sliding in from the right edge.',
    useCase: 'Right-side pane overlay',
  },
  {
    name: 'o9ds-shadow-down',
    cssVar: '--o9ds-shadow-down',
    tw: 'shadow-down',
    value: '0px 10px 20px 0px',
    colorToken: 'shadow-static-1',
    direction: 'down',
    description: 'Downward cast — content appears below the trigger element.',
    useCase: 'All dropdowns',
  },
  {
    name: 'o9ds-shadow-up',
    cssVar: '--o9ds-shadow-up',
    tw: 'shadow-up',
    value: '0px -10px 20px 0px',
    colorToken: 'shadow-static-1',
    direction: 'up',
    description: 'Upward cast — toolbar floats above page content.',
    useCase: 'Toolbar footers',
  },
  {
    name: 'o9ds-shadow-fab',
    cssVar: '--o9ds-shadow-fab',
    tw: 'shadow-fab',
    value: '0px -10px 20px 0px',
    colorToken: 'shadow-static-1',
    direction: 'fab',
    description: 'Upward lift for a floating action button above the toolbar.',
    useCase: 'Floating Action Button (FAB)',
  },
];

/* ─── Opacity token data ────────────────────────────────────────────── */
const opacityTokens = [
  {
    name: 'o9ds-opacity-high',
    cssVar: '--o9ds-opacity-high',
    value: '0.8',
    label: 'High',
    badge: 'Image hover',
    useCase: 'Overlay applied on image hover to indicate interactivity',
  },
  {
    name: 'o9ds-opacity-medium',
    cssVar: '--o9ds-opacity-medium',
    value: '0.6',
    label: 'Medium',
    badge: 'Selected state',
    useCase: 'Chart element in a selected / highlighted state',
  },
  {
    name: 'o9ds-opacity-low\no9ds-opacity-disabled',
    cssVar: '--o9ds-opacity-low',
    value: '0.4',
    label: 'Low / Disabled',
    badge: 'Disabled',
    useCase: 'Disabled form controls, read-only sections, de-emphasised elements',
  },
];

/* ─── Shadow direction arrow helper ────────────────────────────────── */
function ShadowArrow({ direction }) {
  const arrows = { center: '↔↕', right: '→', left: '←', down: '↓', up: '↑', fab: '↑' };
  return (
    <span className="text-xs text-text-tertiary font-mono">
      {arrows[direction]}
    </span>
  );
}

/* ─── Copy button ────────────────────────────────────────────────────── */
function CopyBtn({ value }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="text-xs px-2 py-0.5 bg-surface-overlay border border-border text-text-tertiary hover:text-text hover:border-border-hover transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

/* ─── Section header ─────────────────────────────────────────────────── */
function SectionHeader({ id, title, description }) {
  return (
    <div className="mb-6">
      <h2 id={id} className="text-lg font-semibold text-text mb-1">{title}</h2>
      {description && <p className="text-sm text-text-tertiary">{description}</p>}
    </div>
  );
}

/* ─── Shadow swatch ──────────────────────────────────────────────────── */
function ShadowSwatch({ token }) {
  const shadowMap = {
    'o9ds-shadow-center': '0px 4px 40px 0px rgba(0,0,0,0.40)',
    'o9ds-shadow-right':  '10px 0px 10px 0px rgba(0,0,0,0.25)',
    'o9ds-shadow-left':   '-10px 0px 10px 0px rgba(0,0,0,0.25)',
    'o9ds-shadow-down':   '0px 10px 20px 0px rgba(0,0,0,0.40)',
    'o9ds-shadow-up':     '0px -10px 20px 0px rgba(0,0,0,0.40)',
    'o9ds-shadow-fab':    '0px -10px 20px 0px rgba(0,0,0,0.40)',
  };
  return (
    <div
      className="w-10 h-10 bg-surface-overlay shrink-0"
      style={{ boxShadow: shadowMap[token.name] }}
    />
  );
}

export default function EffectsPage() {
  const [copiedToken, setCopiedToken] = useState(null);

  function handleCopy(text, id) {
    navigator.clipboard.writeText(text);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 1500);
  }

  return (
    <article className="max-w-4xl mx-auto px-8 py-12">
      <PageHeader
        title="Effects"
        description="Shadow, backdrop-blur, and opacity tokens that create depth and hierarchy across the o9ds UI. Shadows are directional — named by the direction they cast — so each token maps directly to its use case."
        badge="Foundation"
      />

      {/* ── Section 1: Shadow Tokens ─────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="shadow-tokens"
          title="Shadow Tokens"
          description="Six directional shadows built on two underlying color primitives. Use box-shadow utilities (shadow-*) or the CSS variable directly."
        />

        {/* Color primitives callout */}
        <div className="mb-6 p-4 bg-surface-raised border border-border text-sm">
          <p className="text-text-secondary mb-2 font-medium">Shadow color primitives</p>
          <div className="flex flex-col gap-1 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-text-tertiary">--o9ds-color-s-shadow-static-1:</span>
              <span className="text-text">rgba(0, 0, 0, 0.40)</span>
              <span className="text-text-tertiary">— overlays, dropdowns, popovers</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-text-tertiary">--o9ds-color-s-shadow-static-2:</span>
              <span className="text-text">rgba(0, 0, 0, 0.25)</span>
              <span className="text-text-tertiary">— side-panel overlays</span>
            </div>
          </div>
        </div>

        {/* Token table */}
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-surface-raised border-b border-border">
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-48">Token</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-16">Preview</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5">Value (h v blur spread)</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-32">Tailwind</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5">Use Case</th>
              </tr>
            </thead>
            <tbody>
              {shadowTokens.map((token, i) => (
                <tr
                  key={token.name}
                  className={`border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-surface-raised/30'}`}
                >
                  {/* Token name */}
                  <td className="px-4 py-3 align-top">
                    <button
                      onClick={() => handleCopy(`var(${token.cssVar})`, token.name)}
                      className="text-left group"
                    >
                      <span className="font-mono text-xs text-text group-hover:text-primary transition-colors">
                        {token.name}
                      </span>
                      <span className="block text-xs text-text-tertiary mt-0.5">
                        {copiedToken === token.name ? '✓ Copied' : token.cssVar}
                      </span>
                    </button>
                  </td>

                  {/* Shadow preview */}
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center justify-center w-14 h-14 bg-surface-sunken">
                      <ShadowSwatch token={token} />
                    </div>
                  </td>

                  {/* CSS value */}
                  <td className="px-4 py-3 align-top">
                    <code className="font-mono text-xs text-text">
                      {token.value}
                    </code>
                    <span className="block font-mono text-xs text-primary mt-0.5">
                      var(--o9ds-color-s-{token.colorToken})
                    </span>
                  </td>

                  {/* Tailwind utility */}
                  <td className="px-4 py-3 align-top">
                    <code className="font-mono text-xs px-1.5 py-0.5 bg-surface-overlay border border-border text-text">
                      {token.tw}
                    </code>
                  </td>

                  {/* Use case */}
                  <td className="px-4 py-3 align-top text-xs text-text-secondary leading-relaxed">
                    {token.useCase}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section 2: Layer Blur ────────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="layer-blur"
          title="Layer Blur"
          description="A single backdrop-blur token for overlay components. Applied as a CSS backdrop-filter to create frosted glass over underlying content."
        />

        <div className="grid grid-cols-2 gap-6">
          {/* Token card */}
          <div className="border border-border p-5 bg-surface-raised">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-mono text-sm text-text mb-1">o9ds-layer-blur</p>
                <p className="font-mono text-xs text-text-tertiary">--o9ds-layer-blur</p>
              </div>
              <span className="text-xs px-2 py-0.5 bg-surface-overlay border border-border text-text-tertiary">
                4px
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-border">
                <span className="text-text-tertiary">Raw value</span>
                <code className="font-mono text-text">4px</code>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-border">
                <span className="text-text-tertiary">CSS property</span>
                <code className="font-mono text-text">backdrop-filter</code>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-border">
                <span className="text-text-tertiary">Tailwind</span>
                <code className="font-mono text-text">backdrop-blur-overlay</code>
              </div>
              <div className="flex items-start justify-between py-1.5">
                <span className="text-text-tertiary">Use case</span>
                <span className="text-text text-right ml-4">Overlay component only</span>
              </div>
            </div>
          </div>

          {/* Visual demo */}
          <div className="border border-border overflow-hidden relative bg-surface-sunken flex items-center justify-center min-h-36">
            {/* Background pattern */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-2 p-4 opacity-60">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-surface-overlay border border-border"
                  style={{ opacity: 0.4 + (i % 3) * 0.2 }}
                />
              ))}
            </div>
            {/* Frosted overlay */}
            <div
              className="relative z-10 px-6 py-4 border border-border/60 text-center"
              style={{
                backdropFilter: 'blur(4px)',
                backgroundColor: 'rgba(30,30,30,0.5)',
              }}
            >
              <p className="text-xs text-text-tertiary mb-1">backdrop-blur-overlay</p>
              <p className="text-sm text-text font-medium">4px blur</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-surface-raised border border-border text-xs text-text-secondary flex items-start gap-2">
          <span className="text-primary shrink-0">ⓘ</span>
          <span>
            Apply <code className="font-mono text-text">backdrop-filter: blur(var(--o9ds-layer-blur))</code> or
            the <code className="font-mono text-text">backdrop-blur-overlay</code> utility class.
            Use exclusively with the overlay component — do not apply to general surfaces.
          </span>
        </div>
      </section>

      {/* ── Section 3: Opacity ──────────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="opacity"
          title="Opacity"
          description="Three opacity levels for interactive and disabled states. Applied via CSS opacity property — the entire element and its children become semi-transparent."
        />

        <div className="border border-border overflow-hidden mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-surface-raised border-b border-border">
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-64">Token</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-28">Preview</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-20">Value</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5">Use Case</th>
              </tr>
            </thead>
            <tbody>
              {opacityTokens.map((token, i) => (
                <tr
                  key={token.cssVar}
                  className={`border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-surface-raised/30'}`}
                >
                  {/* Token name */}
                  <td className="px-4 py-3 align-top">
                    <button
                      onClick={() => handleCopy(`var(${token.cssVar})`, token.cssVar)}
                      className="text-left group"
                    >
                      <div className="font-mono text-xs text-text group-hover:text-primary transition-colors whitespace-pre">
                        {token.name}
                      </div>
                      <span className="block font-mono text-xs text-text-tertiary mt-0.5">
                        {copiedToken === token.cssVar ? '✓ Copied' : token.cssVar}
                      </span>
                    </button>
                  </td>

                  {/* Opacity swatch */}
                  <td className="px-4 py-3 align-middle">
                    <div
                      className="w-12 h-12 bg-primary"
                      style={{ opacity: parseFloat(token.value) }}
                    />
                  </td>

                  {/* Value */}
                  <td className="px-4 py-3 align-top">
                    <code className="font-mono text-sm text-text">{token.value}</code>
                    <span className="block font-mono text-xs text-text-tertiary mt-0.5">
                      ({Math.round(parseFloat(token.value) * 100)}%)
                    </span>
                  </td>

                  {/* Use case */}
                  <td className="px-4 py-3 align-top">
                    <span className="inline-block text-xs px-2 py-0.5 bg-surface-overlay border border-border text-text-secondary mr-2 mb-1">
                      {token.badge}
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed">{token.useCase}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Opacity comparison strip */}
        <div className="p-4 bg-surface-raised border border-border">
          <p className="text-xs text-text-tertiary mb-3">Comparison — all three opacity levels on the same element</p>
          <div className="flex items-end gap-6">
            {opacityTokens.map((token) => (
              <div key={token.cssVar} className="flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 bg-primary flex items-center justify-center text-on-primary text-xs font-mono"
                  style={{ opacity: parseFloat(token.value) }}
                >
                  {token.value}
                </div>
                <span className="text-xs text-text-tertiary">{token.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Applying Tokens ──────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="applying-tokens"
          title="Applying Tokens"
          description="Reference shadow, blur, and opacity tokens via Tailwind utilities or CSS custom properties."
        />

        <div className="grid grid-cols-1 gap-4">

          {/* Shadows */}
          <div>
            <p className="text-xs text-text-tertiary font-medium uppercase tracking-wide mb-2">Shadows</p>
            <CodeBlock code={`/* Tailwind utility classes */
<div className="shadow-center">  {/* tooltip, popover, overlay    */}
<div className="shadow-down">    {/* dropdown menus               */}
<div className="shadow-up">      {/* toolbar / action bar footer  */}
<div className="shadow-right">   {/* left side-panel overlay      */}
<div className="shadow-left">    {/* right side-panel overlay     */}
<div className="shadow-fab">     {/* FAB button                   */}

/* CSS variable (when Tailwind class isn't available) */
.my-dropdown {
  box-shadow: var(--o9ds-shadow-down);
}`} language="jsx" />
          </div>

          {/* Backdrop blur */}
          <div>
            <p className="text-xs text-text-tertiary font-medium uppercase tracking-wide mb-2">Layer Blur</p>
            <CodeBlock code={`/* Tailwind utility (overlay component only) */
<div className="backdrop-blur-overlay">

/* CSS */
.overlay {
  backdrop-filter: blur(var(--o9ds-layer-blur));
  -webkit-backdrop-filter: blur(var(--o9ds-layer-blur));
}`} language="css" />
          </div>

          {/* Opacity */}
          <div>
            <p className="text-xs text-text-tertiary font-medium uppercase tracking-wide mb-2">Opacity</p>
            <CodeBlock code={`/* CSS — apply to the wrapping element */
.image-hover-overlay {
  opacity: var(--o9ds-opacity-high);     /* 0.8 — hover state       */
}
.chart-selected {
  opacity: var(--o9ds-opacity-medium);   /* 0.6 — selected state    */
}
.disabled-control {
  opacity: var(--o9ds-opacity-disabled); /* 0.4 — disabled / low    */
}

/* Tailwind opacity utilities like opacity-80 are compatible
   but prefer the semantic token variables for design system alignment. */`} language="css" />
          </div>

        </div>
      </section>

      {/* ── Section 5: Design Decisions ─────────────────────────────── */}
      <section>
        <SectionHeader
          id="design-decisions"
          title="Design Decisions"
          description="Key principles guiding the o9ds effects system."
        />

        <div className="grid grid-cols-1 gap-3">
          {[
            {
              label: 'Directional naming',
              detail:
                'Shadows are named by the direction they cast (down, up, left, right), not by size or elevation level. This makes the correct token obvious at the component level — a dropdown always uses shadow-down.',
            },
            {
              label: 'Two shadow colors only',
              detail:
                'All shadows reference one of two color primitives: shadow-static-1 (rgba 0,0,0 / 0.40) for prominent overlays and shadow-static-2 (rgba 0,0,0 / 0.25) for side-panel glances. This enforces visual consistency without per-token color decisions.',
            },
            {
              label: 'Blur is restricted to overlays',
              detail:
                'o9ds-layer-blur (4px) applies only to the overlay component. General cards, panels, and surfaces use surface color elevation (layer-01 through layer-06) instead of blur to separate depth.',
            },
            {
              label: 'Three opacity levels',
              detail:
                'High (0.8), Medium (0.6), and Low / Disabled (0.4) cover all interactive transparency needs. Avoid arbitrary opacity values — choose the nearest semantic token instead.',
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 p-4 bg-surface-raised border border-border">
              <div className="w-1 shrink-0 bg-primary self-stretch" />
              <div>
                <p className="text-sm font-medium text-text mb-1">{item.label}</p>
                <p className="text-xs text-text-secondary leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
