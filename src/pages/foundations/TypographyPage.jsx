import { useState } from 'react';
import PageHeader from '@/docs/components/PageHeader';
import CodeBlock from '@/docs/components/CodeBlock';

/* ─── copy helper ───────────────────────────────────────────── */
function useCopy() {
  const [copied, setCopied] = useState(null);
  const copy = (val) => {
    navigator.clipboard.writeText(val).then(() => {
      setCopied(val);
      setTimeout(() => setCopied(null), 1500);
    });
  };
  return { copied, copy };
}

/* ─── section wrapper ───────────────────────────────────────── */
function Section({ id, title, subtitle, children }) {
  return (
    <section className="mb-14">
      <div className="mb-5">
        <h2 id={id} className="text-base font-black tracking-widest uppercase text-text">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-text-tertiary mt-1 max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}

/* ─── composite token row ───────────────────────────────────── */
function TypoTokenRow({ token, size, weight, ls, transform, underline }) {
  const { copied, copy } = useCopy();
  const weightLabel = weight === 400 ? 'Regular' : weight === 500 ? 'Medium' : 'Bold';
  const sampleStyle = {
    fontSize: `${size}px`,
    fontWeight: weight,
    letterSpacing: ls,
    textTransform: transform || 'none',
    textDecoration: underline ? 'underline' : 'none',
  };
  return (
    <tr
      className="border-b border-border last:border-0 group cursor-pointer hover:bg-surface-overlay transition-colors"
      onClick={() => copy(token)}
      title="Click to copy token name"
    >
      <td className="px-4 py-3 align-middle w-52">
        <code className={`text-[11px] font-mono ${copied === token ? 'text-success' : 'text-utility-purple'}`}>
          {copied === token ? '✓ copied' : token}
        </code>
      </td>
      <td className="px-4 py-3 align-middle w-16">
        <code className="text-[11px] font-mono text-text-secondary">{size}px</code>
      </td>
      <td className="px-4 py-3 align-middle w-24">
        <code className="text-[11px] font-mono text-text-secondary">{weightLabel} / {weight}</code>
      </td>
      <td className="px-4 py-3 align-middle max-w-sm overflow-hidden">
        <span className="text-text leading-tight" style={sampleStyle}>
          Active hierarchy is an ordered collection of levels
        </span>
      </td>
    </tr>
  );
}

/* ─── data ──────────────────────────────────────────────────── */
const fontSizes = [
  { token: '--font-size-32', value: '2rem',     px: 32, tw: 'text-2xl',  use: 'Large display headings, hero titles' },
  { token: '--font-size-20', value: '1.25rem',  px: 20, tw: 'text-xl',   use: 'Section headings, panel titles' },
  { token: '--font-size-18', value: '1.125rem', px: 18, tw: 'text-lg',   use: 'Sub-section headings, card titles' },
  { token: '--font-size-16', value: '1rem',     px: 16, tw: 'text-base', use: 'Body text, button labels, input values' },
  { token: '--font-size-14', value: '0.875rem', px: 14, tw: 'text-sm',   use: 'Supporting text, badge labels, table rows' },
  { token: '--font-size-12', value: '0.75rem',  px: 12, tw: 'text-xs',   use: 'Micro labels, token names, metadata' },
  { token: '--font-size-10', value: '0.625rem', px: 10, tw: 'text-2xs',  use: 'Tooltip labels, icon captions, tiny tags' },
];

const fontWeights = [
  { token: '--font-weight-regular', value: '400', tw: 'font-normal', figma: 'o9ds-regular', desc: 'Body copy, paragraph text' },
  { token: '--font-weight-medium',  value: '500', tw: 'font-medium', figma: 'o9ds-medium',  desc: 'Emphasis, interactive labels' },
  { token: '--font-weight-bold',    value: '700', tw: 'font-bold',   figma: 'o9ds-bold',    desc: 'Strong emphasis, CTAs' },
];

const letterSpacing = [
  { token: '--letter-spacing-h32',  value: '-0.003rem', comment: '≈ -0.05px', use: '32px headings' },
  { token: '--letter-spacing-h20',  value: '-0.031rem', comment: '≈ -0.5px',  use: '18–20px headings' },
  { token: '--letter-spacing-body', value: '-0.013rem', comment: '≈ -0.2px',  use: '10–16px body, labels, captions' },
  { token: '--letter-spacing-caps', value: '+0.013rem', comment: '≈ +0.2px',  use: 'Small uppercase labels' },
  { token: '--letter-spacing-zero', value: '0rem',      comment: '0px',       use: '10px paragraph text' },
];

const headingTokens = [
  { token: 'o9ds-font-h32-r',  size: 32, weight: 400, ls: '-0.003rem' },
  { token: 'o9ds-font-h20-r',  size: 20, weight: 400, ls: '-0.031rem' },
  { token: 'o9ds-font-h18-r',  size: 18, weight: 400, ls: '-0.031rem' },
  { token: 'o9ds-font-h16-m',  size: 16, weight: 500, ls: '-0.013rem' },
  { token: 'o9ds-font-h14-r',  size: 14, weight: 400, ls: '-0.013rem' },
  { token: 'o9ds-font-h14-rc', size: 14, weight: 400, ls: '-0.013rem', transform: 'uppercase' },
  { token: 'o9ds-font-h14-m',  size: 14, weight: 500, ls: '-0.013rem' },
  { token: 'o9ds-font-h12-rc', size: 12, weight: 400, ls: '0.013rem',  transform: 'uppercase' },
  { token: 'o9ds-font-h12-mc', size: 12, weight: 500, ls: '0.013rem',  transform: 'uppercase' },
  { token: 'o9ds-font-h12-m',  size: 12, weight: 500, ls: '0.013rem' },
  { token: 'o9ds-font-h12-r',  size: 12, weight: 400, ls: '0.013rem' },
];

const paragraphTokens = [
  { token: 'o9ds-font-p16-r',  size: 16, weight: 400, ls: '-0.013rem' },
  { token: 'o9ds-font-p16-m',  size: 16, weight: 500, ls: '-0.013rem' },
  { token: 'o9ds-font-p14-r',  size: 14, weight: 400, ls: '-0.013rem' },
  { token: 'o9ds-font-p14-m',  size: 14, weight: 500, ls: '-0.013rem' },
  { token: 'o9ds-font-p14-b',  size: 14, weight: 700, ls: '-0.013rem' },
  { token: 'o9ds-font-p12-r',  size: 12, weight: 400, ls: '-0.013rem' },
  { token: 'o9ds-font-p12-m',  size: 12, weight: 500, ls: '-0.013rem' },
  { token: 'o9ds-font-p12-ru', size: 12, weight: 400, ls: '0.013rem',  underline: true },
  { token: 'o9ds-font-p10-r',  size: 10, weight: 400, ls: '0rem' },
];

const labelTokens = [
  { token: 'o9ds-font-l16-r',  size: 16, weight: 400, ls: '-0.013rem' },
  { token: 'o9ds-font-l16-m',  size: 16, weight: 500, ls: '-0.013rem' },
  { token: 'o9ds-font-l14-r',  size: 14, weight: 400, ls: '-0.013rem' },
  { token: 'o9ds-font-l14-m',  size: 14, weight: 500, ls: '-0.013rem' },
  { token: 'o9ds-font-l14-ru', size: 14, weight: 400, ls: '-0.013rem', underline: true },
  { token: 'o9ds-font-l12-r',  size: 12, weight: 400, ls: '-0.013rem' },
  { token: 'o9ds-font-l12-m',  size: 12, weight: 500, ls: '-0.013rem' },
];

/* ─── tab button ─────────────────────────────────────────────── */
function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs font-bold tracking-widest uppercase border-b-2 transition-colors ${
        active
          ? 'border-white text-text'
          : 'border-transparent text-text-tertiary hover:text-text-secondary hover:border-border-hover'
      }`}
    >
      {children}
    </button>
  );
}

/* ─── main page ─────────────────────────────────────────────── */
export default function TypographyPage() {
  const [compositeTab, setCompositeTab] = useState('heading');

  const tabs = {
    heading:   {
      label: 'Headings',
      rows: headingTokens,
      desc: 'Popover titles · Side Panel headers · Window / Dialog headings · Card & Section titles',
    },
    paragraph: {
      label: 'Paragraph',
      rows: paragraphTokens,
      desc: 'Alert messages · Badge text · Body copy · Tooltips · Normal message content',
    },
    label: {
      label: 'Labels',
      rows: labelTokens,
      desc: 'Button labels · Links · Form labels · Input values · Dropdown options · Tree widgets · Toggle / Checkbox / Radio',
    },
  };

  return (
    <article>
      <PageHeader
        title="Typography"
        description="The o9ds type system is built on o9Sans — a custom brand typeface with 5 native weights. All type settings are tokenised into a 7-step scale with semantic composite tokens for headings, paragraphs, and labels."
        category="Foundation"
      />

      {/* ── Type specimen ─────────────────────────────────── */}
      <div className="mb-12 border border-border overflow-hidden">
        {[
          { size: 32, weight: 400, ls: '-0.003rem', label: '32 / Regular' },
          { size: 20, weight: 400, ls: '-0.031rem', label: '20 / Regular' },
          { size: 18, weight: 400, ls: '-0.031rem', label: '18 / Regular' },
          { size: 16, weight: 500, ls: '-0.013rem', label: '16 / Medium' },
          { size: 14, weight: 400, ls: '-0.013rem', label: '14 / Regular' },
          { size: 12, weight: 400, ls: '0.013rem',  label: '12 / Regular' },
          { size: 10, weight: 400, ls: '0rem',      label: '10 / Regular' },
        ].map((row, i) => (
          <div
            key={row.size}
            className={`flex items-baseline gap-6 px-6 py-4 border-b border-border last:border-0 ${i % 2 ? '' : 'bg-surface-raised'}`}
          >
            <span
              className="flex-1 text-text leading-tight truncate"
              style={{ fontSize: `${row.size}px`, fontWeight: row.weight, letterSpacing: row.ls }}
            >
              o9Sans — Platform Design System
            </span>
            <span className="font-mono text-text-disabled shrink-0 text-right" style={{ fontSize: '10px' }}>
              {row.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Font Family ──────────────────────────────────── */}
      <Section
        id="font-family"
        title="Font Family"
        subtitle="o9Sans is the primary brand typeface. Roboto provides Latin fallback. Noto Sans ensures broad non-Latin script coverage for localisation."
      >
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                {['CSS Token', 'Figma Name', 'Stack', 'Purpose'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[11px] font-bold tracking-widest uppercase text-text-tertiary">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border bg-surface-sunken/30">
                <td className="px-4 py-3"><code className="text-[11px] font-mono text-utility-purple">--font-sans</code></td>
                <td className="px-4 py-3"><code className="text-[11px] font-mono text-text-secondary">font-family-o9Sans</code></td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text" style={{ fontFamily: "'o9Sans', Roboto, sans-serif" }}>
                    o9Sans → Roboto → Noto Sans → system-ui
                  </span>
                </td>
                <td className="px-4 py-3"><span className="text-[11px] text-text-tertiary">All UI text</span></td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-[11px] font-mono text-utility-purple">--font-mono</code></td>
                <td className="px-4 py-3"><code className="text-[11px] font-mono text-text-secondary">font-family-mono</code></td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text font-mono">JetBrains Mono → Fira Code → Cascadia Code</span>
                </td>
                <td className="px-4 py-3"><span className="text-[11px] text-text-tertiary">Code, tokens, monospace</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Font Size Scale ───────────────────────────────── */}
      <Section
        id="font-size"
        title="Font Size Scale"
        subtitle="7 stops derived from the Figma Foundation Library. Base root size = 16px (1rem). All values use rem to respect user browser preferences."
      >
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                {['Token', 'rem', 'px', 'Sample', 'Tailwind', 'Usage'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[11px] font-bold tracking-widest uppercase text-text-tertiary">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fontSizes.map((row, i) => (
                <tr key={row.token} className={`border-b border-border last:border-0 ${i % 2 ? '' : 'bg-surface-sunken/30'}`}>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-utility-purple">{row.token}</code></td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-text-secondary">{row.value}</code></td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-text-disabled">{row.px}px</code></td>
                  <td className="px-4 py-3">
                    <span className="text-text leading-none" style={{ fontSize: `${row.px}px`, fontWeight: 400 }}>
                      Aa
                    </span>
                  </td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-utility-purple">{row.tw}</code></td>
                  <td className="px-4 py-3"><span className="text-[11px] text-text-tertiary">{row.use}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Font Weights ─────────────────────────────────── */}
      <Section
        id="font-weight"
        title="Font Weights"
        subtitle="o9Sans ships 5 native weights (Thin 100, Light 300, Regular 400, Bold 700, Black 900). The design system uses 3 of these. Medium 500 is synthesised by the browser when o9Sans Medium is unavailable — the Roboto fallback provides accurate 500 rendering."
      >
        {/* Weight visual bars */}
        <div className="border border-border overflow-hidden mb-4">
          <div className="grid grid-cols-3">
            {[
              { w: 400, name: 'Regular', token: 'o9ds-regular', figma: '--font-weight-regular', tw: 'font-normal' },
              { w: 500, name: 'Medium',  token: 'o9ds-medium',  figma: '--font-weight-medium',  tw: 'font-medium' },
              { w: 700, name: 'Bold',    token: 'o9ds-bold',    figma: '--font-weight-bold',    tw: 'font-bold' },
            ].map((wt, i) => (
              <div key={wt.w} className={`p-5 ${i < 2 ? 'border-r border-border' : ''}`}>
                <p className="font-mono text-text-disabled mb-3" style={{ fontSize: '10px' }}>
                  {wt.token} · {wt.w}
                </p>
                <p className="text-xl text-text leading-none mb-2" style={{ fontWeight: wt.w }}>{wt.name}</p>
                <p className="text-sm text-text-secondary leading-relaxed" style={{ fontWeight: wt.w }}>
                  Active hierarchy is an ordered collection of levels across the platform.
                </p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <code className="font-mono text-utility-purple border border-border px-2 py-0.5" style={{ fontSize: '10px' }}>{wt.figma}</code>
                  <code className="font-mono text-utility-purple border border-border px-2 py-0.5" style={{ fontSize: '10px' }}>{wt.tw}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Letter Spacing ───────────────────────────────── */}
      <Section
        id="letter-spacing"
        title="Letter Spacing"
        subtitle="Absolute rem values — not em-based — so spacing is consistent regardless of the element's font-size. Defined in Figma's CSS token mappings."
      >
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                {['Token', 'Value', 'Approx.', 'Applied at', 'Usage'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[11px] font-bold tracking-widest uppercase text-text-tertiary">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {letterSpacing.map((row, i) => (
                <tr key={row.token} className={`border-b border-border last:border-0 ${i % 2 ? '' : 'bg-surface-sunken/30'}`}>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-utility-purple">{row.token}</code></td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-text-secondary">{row.value}</code></td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-text-disabled">{row.comment}</code></td>
                  <td className="px-4 py-3">
                    <span className="text-base text-text" style={{ letterSpacing: row.value.replace('+', '') }}>
                      Sample Text
                    </span>
                  </td>
                  <td className="px-4 py-3"><span className="text-[11px] text-text-tertiary">{row.use}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Composite Tokens ─────────────────────────────── */}
      <Section
        id="composite-tokens"
        title="Composite Typography Tokens"
        subtitle="Named bundles combining font-family, font-size, font-weight, and letter-spacing. Use these in components — never set individual properties ad-hoc."
      >
        {/* Naming convention */}
        <div className="mb-6 border border-border bg-surface-raised p-5">
          <p className="text-[10px] font-bold tracking-widest uppercase text-text-disabled mb-3">Naming Convention</p>
          <div className="flex flex-wrap items-center gap-1 font-mono text-sm mb-4">
            <span className="px-2 py-0.5 bg-surface-overlay border border-border text-text-secondary">o9ds</span>
            <span className="text-text-disabled">-font-</span>
            <span className="px-2 py-0.5 bg-surface-overlay border border-border text-warning">[category]</span>
            <span className="text-text-disabled">-</span>
            <span className="px-2 py-0.5 bg-surface-overlay border border-border text-success">[size]</span>
            <span className="text-text-disabled">-</span>
            <span className="px-2 py-0.5 bg-surface-overlay border border-border text-utility-purple">[variant]</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-[11px]">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-text-disabled mb-2">Category</p>
              {[['h', 'Heading'], ['p', 'Paragraph'], ['l', 'Label']].map(([c, d]) => (
                <div key={c} className="flex gap-2 mb-1">
                  <code className="text-warning w-5">{c}</code>
                  <span className="text-text-tertiary">{d}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-text-disabled mb-2">Size</p>
              <div className="flex gap-2 mb-1">
                <code className="text-success">10–32</code>
                <span className="text-text-tertiary">pixel value</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-text-disabled mb-2">Variant suffix</p>
              {[['r', 'Regular (400)'], ['m', 'Medium (500)'], ['b', 'Bold (700)'], ['rc/mc', '+ uppercase'], ['ru', '+ underline']].map(([c, d]) => (
                <div key={c} className="flex gap-2 mb-1">
                  <code className="text-utility-purple w-8">{c}</code>
                  <span className="text-text-tertiary">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border flex">
          {Object.entries(tabs).map(([key, { label }]) => (
            <TabButton key={key} active={compositeTab === key} onClick={() => setCompositeTab(key)}>
              {label}
            </TabButton>
          ))}
        </div>

        {/* Use-case line */}
        <div className="bg-surface-overlay border-b border-x border-border px-4 py-2 mb-0">
          <p className="text-[11px] text-text-tertiary">
            <span className="font-mono text-text-disabled mr-1">// </span>
            {tabs[compositeTab].desc}
          </p>
        </div>

        {/* Token table */}
        <div className="border-x border-b border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                {['Token Name', 'Size', 'Weight / Value', 'Live Sample'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[11px] font-bold tracking-widest uppercase text-text-tertiary">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tabs[compositeTab].rows.map((row) => (
                <TypoTokenRow key={row.token} {...row} />
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Applying Tokens ──────────────────────────────── */}
      <Section
        id="applying"
        title="Applying Tokens"
        subtitle="Reference the primitive tokens in CSS or combine with Tailwind utilities in JSX."
      >
        <div className="space-y-4">
          <div>
            <p className="text-xs text-text-tertiary font-medium uppercase tracking-wide mb-2">CSS — Composite Token Usage</p>
            <CodeBlock code={`.heading {
  font-family:    var(--font-family-o9sans);
  font-size:      var(--font-size-20);           /* 20px */
  font-weight:    var(--font-weight-regular);    /* 400  */
  letter-spacing: var(--letter-spacing-h20);     /* -0.031rem ≈ -0.5px */
}
/* ↑ Equivalent to Figma composite token: o9ds-font-h20-r */`} language="css" />
          </div>

          <div>
            <p className="text-xs text-text-tertiary font-medium uppercase tracking-wide mb-2">JSX — Tailwind + CSS var</p>
            <CodeBlock code={`{/* Heading — o9ds-font-h20-r */}
<h2 className="text-xl font-normal text-text"
    style={{ letterSpacing: 'var(--letter-spacing-h20)' }}>
  Section Title
</h2>

{/* Body paragraph — o9ds-font-p14-r */}
<p className="text-sm font-normal text-text-secondary leading-normal"
   style={{ letterSpacing: 'var(--letter-spacing-body)' }}>
  Descriptive body text content
</p>

{/* Label — o9ds-font-l12-m */}
<label className="text-xs font-medium text-text-secondary"
       style={{ letterSpacing: 'var(--letter-spacing-body)' }}>
  Form Label
</label>

{/* Uppercase heading — o9ds-font-h12-rc */}
<span className="text-xs font-normal uppercase"
      style={{ letterSpacing: 'var(--letter-spacing-caps)' }}>
  SECTION HEADER
</span>`} language="jsx" />
          </div>
        </div>
      </Section>
    </article>
  );
}
