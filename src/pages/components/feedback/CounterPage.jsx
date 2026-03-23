import { useState } from 'react';
import Counter from '@/components/feedback/Counter';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const counterProps = [
  { name: 'variant', type: "'primary' | 'outline' | 'fill'", default: "'primary'", description: 'Visual style — primary (subtle raised bg), outline (transparent + border), fill (solid type-colored background)' },
  { name: 'type', type: "'success' | 'info' | 'neutral' | 'warning' | 'negative'", default: "'neutral'", description: 'Semantic type — controls the icon and color scheme' },
  { name: 'shape', type: "'pill' | 'rect'", default: "'pill'", description: 'Shape of the counter — pill (fully rounded) or rect (rectangular with sharp edges)' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the counter — sm (16px), md (20px), lg (24px)' },
  { name: 'count', type: 'number', default: '0', description: 'The number to display' },
  { name: 'max', type: 'number', default: 'undefined', description: 'Maximum display value (shows "N+" when exceeded)' },
  { name: 'indicator', type: 'boolean', default: 'false', description: 'Shows an amber indicator dot at the top-right corner' },
  { name: 'pulse', type: 'boolean', default: 'false', description: 'Pulsing animation for attention' },
];

export default function CounterPage() {
  const [count, setCount] = useState(5);
  const [variant, setVariant] = useState('primary');
  const [type, setType] = useState('neutral');
  const [shape, setShape] = useState('pill');
  const [size, setSize] = useState('md');
  const [indicator, setIndicator] = useState(false);

  return (
    <article className="space-y-12">
      <PageHeader
        title="Counter"
        description="Counter alerts display a numeric count with a semantic icon, color, and optional indicator. Use them to show notification counts, status badges, item quantities, or categorized alerts. Available in primary, outlined, and filled styles."
        status="stable"
        category="Status & System Feedback"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">
          Adjust variant, type, size, and indicator to explore all counter combinations.
        </p>
        <ComponentDemo
          controls={[
            { type: 'select', label: 'Variant', value: variant, onChange: setVariant, options: ['primary', 'outline', 'fill'] },
            { type: 'select', label: 'Type', value: type, onChange: setType, options: ['success', 'info', 'neutral', 'warning', 'negative'] },
            { type: 'select', label: 'Shape', value: shape, onChange: setShape, options: ['pill', 'rect'] },
            { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
            { type: 'checkbox', label: 'Indicator', value: indicator, onChange: setIndicator },
          ]}
        >
          <div className="flex items-center gap-6">
            <Counter variant={variant} type={type} shape={shape} size={size} count={count} indicator={indicator} />
            <div className="flex gap-2">
              <button className="text-xs text-text-secondary border border-border px-2 py-1 hover:bg-white/5 cursor-pointer" onClick={() => setCount(Math.max(0, count - 1))}>-</button>
              <button className="text-xs text-text-secondary border border-border px-2 py-1 hover:bg-white/5 cursor-pointer" onClick={() => setCount(count + 1)}>+</button>
            </div>
          </div>
        </ComponentDemo>
      </section>

      {/* ── Variants ── */}
      <section>
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three style variants control the visual treatment of the counter:
          <strong> Primary</strong> uses a subtle raised background,
          <strong> Outline</strong> uses a transparent background with a border,
          <strong> Fill</strong> uses a solid type-colored background with contrasting text.
        </p>
        <CodeExample code={`<Counter variant="primary" type="info" count={12} />\n<Counter variant="outline" type="info" count={12} />\n<Counter variant="fill" type="info" count={12} />`}>
          <div className="flex items-center gap-4">
            <Counter variant="primary" type="info" count={12} />
            <Counter variant="outline" type="info" count={12} />
            <Counter variant="fill" type="info" count={12} />
          </div>
        </CodeExample>
      </section>

      {/* ── All Variants × Types Matrix ── */}
      <section>
        <h2 id="variants-types" className="text-xl font-black tracking-tight text-text mb-2">Variants &times; Types</h2>
        <p className="text-sm text-text-secondary mb-4">
          Each variant can be combined with all five semantic types. The type controls the icon and color scheme.
        </p>
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                <th className="whitespace-nowrap px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Type</th>
                <th className="px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Primary</th>
                <th className="px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Outline</th>
                <th className="px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Fill</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {['success', 'info', 'neutral', 'warning', 'negative'].map((t) => (
                <tr key={t}>
                  <td className="px-4 py-3 font-medium text-text capitalize">{t}</td>
                  <td className="px-4 py-3"><Counter variant="primary" type={t} count={99} max={99} /></td>
                  <td className="px-4 py-3"><Counter variant="outline" type={t} count={99} max={99} /></td>
                  <td className="px-4 py-3"><Counter variant="fill" type={t} count={99} max={99} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Shape ── */}
      <section>
        <h2 id="shape" className="text-xl font-black tracking-tight text-text mb-2">Shape</h2>
        <p className="text-sm text-text-secondary mb-4">
          Two shape options: <strong>pill</strong> (fully rounded, default) and <strong>rect</strong> (rectangular with sharp edges). The shape applies across all variants, types, and sizes.
        </p>
        <CodeExample code={`{/* Pill (default) */}\n<Counter shape="pill" type="info" count={12} />\n<Counter shape="pill" variant="outline" type="warning" count={7} />\n<Counter shape="pill" variant="fill" type="negative" count={3} />\n\n{/* Rectangular */}\n<Counter shape="rect" type="info" count={12} />\n<Counter shape="rect" variant="outline" type="warning" count={7} />\n<Counter shape="rect" variant="fill" type="negative" count={3} />`}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs text-text-tertiary w-8">Pill</span>
              <Counter shape="pill" type="info" count={12} />
              <Counter shape="pill" variant="outline" type="warning" count={7} />
              <Counter shape="pill" variant="fill" type="negative" count={3} />
              <Counter shape="pill" variant="fill" type="success" count={5} indicator />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-text-tertiary w-8">Rect</span>
              <Counter shape="rect" type="info" count={12} />
              <Counter shape="rect" variant="outline" type="warning" count={7} />
              <Counter shape="rect" variant="fill" type="negative" count={3} />
              <Counter shape="rect" variant="fill" type="success" count={5} indicator />
            </div>
          </div>
        </CodeExample>

        <h3 className="text-sm font-bold text-text mt-6 mb-3">Rectangular Across All Types</h3>
        <CodeExample code={`<Counter shape="rect" type="success" count={5} />\n<Counter shape="rect" type="info" count={12} />\n<Counter shape="rect" type="neutral" count={3} />\n<Counter shape="rect" type="warning" count={7} />\n<Counter shape="rect" type="negative" count={2} />`}>
          <div className="flex items-center gap-4">
            <Counter shape="rect" type="success" count={5} />
            <Counter shape="rect" type="info" count={12} />
            <Counter shape="rect" type="neutral" count={3} />
            <Counter shape="rect" type="warning" count={7} />
            <Counter shape="rect" type="negative" count={2} />
          </div>
        </CodeExample>
      </section>

      {/* ── Types ── */}
      <section>
        <h2 id="types" className="text-xl font-black tracking-tight text-text mb-2">Types</h2>
        <p className="text-sm text-text-secondary mb-4">
          Five semantic types, each with a dedicated icon and color:
        </p>
        <div className="bg-surface-overlay border border-border p-6 space-y-3 text-sm text-text-secondary">
          <p>— <strong className="text-success">Success</strong>: <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">o9con-check-circle</code> — confirmations, completed items</p>
          <p>— <strong className="text-info">Info</strong>: <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">o9con-info-circle-filled</code> — informational badges, unread counts</p>
          <p>— <strong className="text-text">Neutral</strong>: <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">o9con-bookmark</code> — bookmarks, saved items, generic counts</p>
          <p>— <strong className="text-warning">Warning</strong>: <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">o9con-exclamation-triangle-filled</code> — warnings, pending actions</p>
          <p>— <strong className="text-danger">Negative</strong>: <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">o9con-blocker-action</code> — errors, critical alerts, blockers</p>
        </div>
        <div className="mt-4">
          <CodeExample code={`<Counter type="success" count={5} />\n<Counter type="info" count={12} />\n<Counter type="neutral" count={3} />\n<Counter type="warning" count={7} />\n<Counter type="negative" count={2} />`}>
            <div className="flex items-center gap-4">
              <Counter type="success" count={5} />
              <Counter type="info" count={12} />
              <Counter type="neutral" count={3} />
              <Counter type="warning" count={7} />
              <Counter type="negative" count={2} />
            </div>
          </CodeExample>
        </div>
      </section>

      {/* ── Sizes ── */}
      <section>
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three sizes: <strong>sm</strong> (16px), <strong>md</strong> (20px), <strong>lg</strong> (24px). Icon and text scale proportionally.
        </p>
        <CodeExample code={`<Counter size="sm" type="info" count={5} />\n<Counter size="md" type="info" count={5} />\n<Counter size="lg" type="info" count={5} />`}>
          <div className="flex items-center gap-4">
            <Counter size="sm" type="info" count={5} />
            <Counter size="md" type="info" count={5} />
            <Counter size="lg" type="info" count={5} />
          </div>
        </CodeExample>

        <h3 className="text-sm font-bold text-text mt-6 mb-3">All Sizes with Fill Variant</h3>
        <CodeExample code={`<Counter variant="fill" size="sm" type="negative" count={3} />\n<Counter variant="fill" size="md" type="negative" count={3} />\n<Counter variant="fill" size="lg" type="negative" count={3} />`}>
          <div className="flex items-center gap-4">
            <Counter variant="fill" size="sm" type="negative" count={3} />
            <Counter variant="fill" size="md" type="negative" count={3} />
            <Counter variant="fill" size="lg" type="negative" count={3} />
          </div>
        </CodeExample>
      </section>

      {/* ── Indicator ── */}
      <section>
        <h2 id="indicator" className="text-xl font-black tracking-tight text-text mb-2">Indicator</h2>
        <p className="text-sm text-text-secondary mb-4">
          Set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">indicator</code> to show an amber dot at the top-right corner. The dot scales with the counter size and can be combined with any variant and type.
        </p>
        <CodeExample code={`<Counter type="success" count={5} indicator />\n<Counter type="info" count={12} indicator />\n<Counter type="warning" count={7} indicator />\n<Counter variant="outline" type="negative" count={2} indicator />\n<Counter variant="fill" type="neutral" count={3} indicator />`}>
          <div className="flex items-center gap-6">
            <Counter type="success" count={5} indicator />
            <Counter type="info" count={12} indicator />
            <Counter type="warning" count={7} indicator />
            <Counter variant="outline" type="negative" count={2} indicator />
            <Counter variant="fill" type="neutral" count={3} indicator />
          </div>
        </CodeExample>

        <h3 className="text-sm font-bold text-text mt-6 mb-3">Indicator Across Sizes</h3>
        <CodeExample code={`<Counter size="sm" type="info" count={5} indicator />\n<Counter size="md" type="info" count={5} indicator />\n<Counter size="lg" type="info" count={5} indicator />`}>
          <div className="flex items-center gap-6">
            <Counter size="sm" type="info" count={5} indicator />
            <Counter size="md" type="info" count={5} indicator />
            <Counter size="lg" type="info" count={5} indicator />
          </div>
        </CodeExample>
      </section>

      {/* ── Max Value ── */}
      <section>
        <h2 id="max" className="text-xl font-black tracking-tight text-text mb-2">Max Value</h2>
        <p className="text-sm text-text-secondary mb-4">
          When <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">count</code> exceeds <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">max</code>, the counter displays "max+" instead.
        </p>
        <CodeExample code={`<Counter type="negative" count={150} max={99} />\n<Counter type="info" count={5} max={99} />\n<Counter variant="fill" type="warning" count={1000} max={999} />`}>
          <div className="flex items-center gap-4">
            <Counter type="negative" count={150} max={99} />
            <Counter type="info" count={5} max={99} />
            <Counter variant="fill" type="warning" count={1000} max={999} />
          </div>
        </CodeExample>
      </section>

      {/* ── Pulse Animation ── */}
      <section>
        <h2 id="pulse" className="text-xl font-black tracking-tight text-text mb-2">Pulse Animation</h2>
        <p className="text-sm text-text-secondary mb-4">
          Set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">pulse</code> to add a pulsing animation for drawing attention to the counter.
        </p>
        <CodeExample code={`<Counter type="negative" count={3} pulse />\n<Counter variant="fill" type="warning" count={1} pulse indicator />`}>
          <div className="flex items-center gap-6">
            <Counter type="negative" count={3} pulse />
            <Counter variant="fill" type="warning" count={1} pulse indicator />
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use type to convey semantic meaning (success for done, negative for errors)',
            'Use the indicator for unsaved changes or new activity',
            'Use max to prevent excessively wide counters (e.g. max={99})',
            'Use the fill variant for high-emphasis counters that need to stand out',
            'Use the outline variant for subtle counters on colored backgrounds',
            'Place counters adjacent to or overlapping the element they describe',
          ]}
          dontItems={[
            'Do not use negative type for non-critical counts',
            'Avoid pulse on counters that do not need urgent attention',
            'Do not mix counter types inconsistently within the same context',
            'Avoid using large counters in dense, space-constrained layouts',
          ]}
        />
      </section>

      {/* ── Keyboard & Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Icons are decorative (<code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-hidden="true"</code>) — the count provides the meaningful content.</>,
            <>The indicator dot is decorative (<code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-hidden="true"</code>).</>,
            <>When used as a notification badge, wrap in a context element with appropriate <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code>.</>,
            'Color is not the sole indicator of meaning — each type has a distinct icon shape.',
            <>Supports <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">ref</code> forwarding for programmatic access.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={counterProps} />
      </section>
    </article>
  );
}
