import Pill from '@/components/feedback/Pill';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const pillProps = [
  { name: 'variant', type: "'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'utility'", default: "'neutral'", description: 'Semantic color variant — utility uses Indigo L1 for categorical/utility labels' },
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size — sm (16px/10px), md (20px/12px), lg (24px/14px), xl (32px/16px)' },
  { name: 'dot', type: 'boolean', default: 'false', description: 'Render a small dot indicator without a label' },
  { name: 'rounded', type: 'boolean', default: 'true', description: 'Rounded-full pill shape (vs. square)' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Pill label — number, short string, or nothing when dot=true' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function PillPage() {
  return (
    <article>
      <PageHeader
        title="Pill"
        description="Pills display a small count or status indicator — typically overlaid on an icon or avatar, or inline within a label. Four size variants and six semantic color variants including a utility variant using Indigo L1."
        status="stable"
        category="Status & System Feedback"
      />

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Six semantic variants for different informational contexts. The <strong>utility</strong> variant uses Indigo L1 for categorical or non-semantic labels.
        </p>
        <CodeExample code={`<Pill variant="neutral">12</Pill>
<Pill variant="info">Info</Pill>
<Pill variant="success">Done</Pill>
<Pill variant="warning">3</Pill>
<Pill variant="danger">!</Pill>
<Pill variant="utility">Tag</Pill>`}>
          <div className="flex flex-wrap items-center gap-3">
            <Pill variant="neutral">12</Pill>
            <Pill variant="info">Info</Pill>
            <Pill variant="success">Done</Pill>
            <Pill variant="warning">3</Pill>
            <Pill variant="danger">!</Pill>
            <Pill variant="utility">Tag</Pill>
          </div>
        </CodeExample>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Four sizes — <strong>sm</strong> (16px), <strong>md</strong> (20px), <strong>lg</strong> (24px), and <strong>xl</strong> (32px). Text and padding scale proportionally.
        </p>
        <CodeExample code={`<Pill size="sm" variant="danger">3</Pill>
<Pill size="md" variant="danger">3</Pill>
<Pill size="lg" variant="danger">3</Pill>
<Pill size="xl" variant="danger">3</Pill>`}>
          <div className="flex flex-wrap items-center gap-4">
            {['sm', 'md', 'lg', 'xl'].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className="text-xs text-text-tertiary uppercase tracking-widest w-6">{s}</span>
                <Pill size={s} variant="danger">9</Pill>
                <Pill size={s} variant="info">24</Pill>
                <Pill size={s} variant="neutral">New</Pill>
                <Pill size={s} variant="utility">Tag</Pill>
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
                ['sm', '16 px', '16 px', '10 px', '4 px'],
                ['md', '20 px', '20 px', '12 px', '6 px'],
                ['lg', '24 px', '24 px', '14 px', '8 px'],
                ['xl', '32 px', '32 px', '16 px', '10 px'],
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
          When <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">dot</code> is true, the pill renders a small coloured circle with no label — useful for unread or presence states. Dot indicators scale across all four sizes.
        </p>
        <CodeExample code={`<Pill dot variant="success" />
<Pill dot variant="warning" />
<Pill dot variant="danger" />
<Pill dot variant="neutral" />
<Pill dot variant="utility" />`}>
          <div className="flex items-center gap-4">
            <Pill dot variant="success" />
            <Pill dot variant="warning" />
            <Pill dot variant="danger" />
            <Pill dot variant="neutral" />
            <Pill dot variant="utility" />
          </div>
        </CodeExample>

        <p className="text-sm text-text-secondary mt-6 mb-4">Dot sizes across sm, md, lg, and xl:</p>
        <CodeExample code={`<Pill dot size="sm" variant="danger" />
<Pill dot size="md" variant="danger" />
<Pill dot size="lg" variant="danger" />
<Pill dot size="xl" variant="danger" />`}>
          <div className="flex items-center gap-4">
            {['sm', 'md', 'lg', 'xl'].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className="text-xs text-text-tertiary uppercase tracking-widest w-6">{s}</span>
                <Pill dot size={s} variant="danger" />
                <Pill dot size={s} variant="success" />
                <Pill dot size={s} variant="utility" />
              </div>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* Inline usage */}
      <section className="mb-12">
        <h2 id="inline" className="text-xl font-black tracking-tight text-text mb-2">Inline Usage</h2>
        <p className="text-sm text-text-secondary mb-4">
          Pills can be composed inline with other elements.
        </p>
        <CodeExample code={`<div className="flex items-center gap-2">
  <span>Notifications</span>
  <Pill variant="danger">5</Pill>
</div>`}>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-text">
              <span>Notifications</span>
              <Pill variant="danger">5</Pill>
            </div>
            <div className="flex items-center gap-2 text-sm text-text">
              <span>Alerts</span>
              <Pill variant="warning">12</Pill>
            </div>
            <div className="flex items-center gap-2 text-sm text-text">
              <span>Stable</span>
              <Pill variant="success">Live</Pill>
            </div>
            <div className="flex items-center gap-2 text-sm text-text">
              <span>Category</span>
              <Pill variant="utility">Utility</Pill>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use pills to surface counts, statuses, or short states inline with labels',
            'Use the dot variant for presence indicators or unread state without a count',
            'Match the semantic variant to the nature of the information (danger for errors, success for completion, etc.)',
            'Use the utility variant for categorical or non-semantic labels (tags, categories)',
            'Keep pill labels very short — a number or 1-2 words maximum',
            'Use sm for compact spaces, md for default, lg for prominent display, xl for hero sections',
          ]}
          dontItems={[
            'Do not use pills as a primary labelling mechanism — they supplement, not replace, descriptive text',
            'Avoid stacking multiple pills on a single element',
            'Do not use rounded=false for count pills — only use square pills for categorical labels',
            'Never use pills as interactive controls; they are read-only status indicators',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            'Pill labels (count/text) are read by screen readers as inline text content.',
            <>Dot indicators use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-hidden="true"</code> since they are decorative — the semantic meaning should be conveyed by the surrounding context.</>,
            'Color is not the sole indicator of meaning — each variant uses a distinct color and the label text provides context.',
            'All text and background color combinations meet WCAG 2.2 AA contrast ratios.',
            'Pills are non-interactive — they are read-only status indicators and do not receive focus.',
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
        <PropsTable props={pillProps} />
      </section>
    </article>
  );
}
