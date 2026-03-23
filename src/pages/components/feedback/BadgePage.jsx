import Badge from '@/components/feedback/Badge';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const badgeProps = [
  { name: 'variant', type: "'neutral' | 'info' | 'success' | 'warning' | 'danger'", default: "'neutral'", description: 'Semantic color variant' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size — sm (16px), md (20px), lg (24px)' },
  { name: 'dot', type: 'boolean', default: 'false', description: 'Render a small dot indicator without a label' },
  { name: 'pill', type: 'boolean', default: 'true', description: 'Rounded-full pill shape (vs. square)' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Badge label — number, short string, or nothing when dot=true' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function BadgePage() {
  return (
    <article>
      <PageHeader
        title="Badge"
        description="Badges display a small count or status indicator — typically overlaid on an icon or avatar, or inline within a label. Three size variants and five semantic color variants."
        status="stable"
        category="Status & System Feedback"
      />

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Five semantic variants for different informational contexts.
        </p>
        <CodeExample code={`<Badge variant="neutral">12</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="success">Done</Badge>
<Badge variant="warning">3</Badge>
<Badge variant="danger">!</Badge>`}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="neutral">12</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Done</Badge>
            <Badge variant="warning">3</Badge>
            <Badge variant="danger">!</Badge>
          </div>
        </CodeExample>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three sizes — <strong>sm</strong> (16px), <strong>md</strong> (20px), and <strong>lg</strong> (24px). Text and padding scale proportionally.
        </p>
        <CodeExample code={`<Badge size="sm" variant="danger">3</Badge>
<Badge size="md" variant="danger">3</Badge>
<Badge size="lg" variant="danger">3</Badge>`}>
          <div className="flex flex-wrap items-center gap-4">
            {['sm', 'md', 'lg'].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className="text-xs text-text-tertiary uppercase tracking-widest w-6">{s}</span>
                <Badge size={s} variant="danger">9</Badge>
                <Badge size={s} variant="info">24</Badge>
                <Badge size={s} variant="neutral">New</Badge>
              </div>
            ))}
          </div>
        </CodeExample>

        {/* Spec table */}
        <div className="mt-4 border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-overlay text-left text-text-tertiary">
                <th className="px-4 py-2 font-bold">Size</th>
                <th className="px-4 py-2 font-bold">Height</th>
                <th className="px-4 py-2 font-bold">Min Width</th>
                <th className="px-4 py-2 font-bold">Font</th>
                <th className="px-4 py-2 font-bold">Padding</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ['sm', '16 px', '16 px', '9 px', '4 px'],
                ['md', '20 px', '20 px', '10 px', '6 px'],
                ['lg', '24 px', '24 px', '12 px', '8 px'],
              ].map(([sz, h, mw, font, pad]) => (
                <tr key={sz} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-bold text-text">{sz}</td>
                  <td className="px-4 py-2">{h}</td>
                  <td className="px-4 py-2">{mw}</td>
                  <td className="px-4 py-2">{font}</td>
                  <td className="px-4 py-2">{pad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Dot indicator */}
      <section className="mb-12">
        <h2 id="dot" className="text-xl font-black tracking-tight text-text mb-2">Dot Indicator</h2>
        <p className="text-sm text-text-secondary mb-4">
          When <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">dot</code> is true, the badge renders a small coloured circle with no label — useful for unread or presence states. Dot indicators scale across all three sizes.
        </p>
        <CodeExample code={`<Badge dot variant="success" />
<Badge dot variant="warning" />
<Badge dot variant="danger" />
<Badge dot variant="neutral" />`}>
          <div className="flex items-center gap-4">
            <Badge dot variant="success" />
            <Badge dot variant="warning" />
            <Badge dot variant="danger" />
            <Badge dot variant="neutral" />
          </div>
        </CodeExample>

        <p className="text-sm text-text-secondary mt-6 mb-4">Dot sizes across sm, md, and lg:</p>
        <CodeExample code={`<Badge dot size="sm" variant="danger" />
<Badge dot size="md" variant="danger" />
<Badge dot size="lg" variant="danger" />`}>
          <div className="flex items-center gap-4">
            {['sm', 'md', 'lg'].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className="text-xs text-text-tertiary uppercase tracking-widest w-6">{s}</span>
                <Badge dot size={s} variant="danger" />
                <Badge dot size={s} variant="success" />
                <Badge dot size={s} variant="info" />
              </div>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* Inline usage */}
      <section className="mb-12">
        <h2 id="inline" className="text-xl font-black tracking-tight text-text mb-2">Inline Usage</h2>
        <p className="text-sm text-text-secondary mb-4">
          Badges can be composed inline with other elements.
        </p>
        <CodeExample code={`<div className="flex items-center gap-2">
  <span>Notifications</span>
  <Badge variant="danger">5</Badge>
</div>`}>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-text">
              <span>Notifications</span>
              <Badge variant="danger">5</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-text">
              <span>Alerts</span>
              <Badge variant="warning">12</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-text">
              <span>Stable</span>
              <Badge variant="success">Live</Badge>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use badges to surface counts, statuses, or short states inline with labels',
            'Use the dot variant for presence indicators or unread state without a count',
            'Match the semantic variant to the nature of the information (danger for errors, success for completion, etc.)',
            'Keep badge labels very short — a number or 1-2 words maximum',
            'Use sm for compact spaces (table cells), md for default, lg for prominent display',
          ]}
          dontItems={[
            'Do not use badges as a primary labelling mechanism — they supplement, not replace, descriptive text',
            'Avoid stacking multiple badges on a single element',
            'Do not use pill=false for count badges — only use square badges for categorical labels',
            'Never use badges as interactive controls; they are read-only status indicators',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            'Badge labels (count/text) are read by screen readers as inline text content.',
            <>Dot indicators use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-hidden="true"</code> since they are decorative — the semantic meaning should be conveyed by the surrounding context.</>,
            'Color is not the sole indicator of meaning — each variant uses a distinct color and the label text provides context.',
            'All text and background color combinations meet WCAG 2.2 AA contrast ratios.',
            'Badges are non-interactive — they are read-only status indicators and do not receive focus.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* API */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={badgeProps} />
      </section>
    </article>
  );
}
