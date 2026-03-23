import { useState } from 'react';
import Indicator from '@/components/feedback/Indicator';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const indicatorProps = [
  { name: 'status', type: "'online' | 'offline' | 'busy' | 'away' | 'neutral'", default: "'online'", description: 'Status color — online (green), offline (gray), busy (red), away (amber), neutral (muted)' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Dot size — sm (8px), md (10px), lg (12px)' },
  { name: 'shape', type: "'circle' | 'rect'", default: "'circle'", description: 'Shape of the indicator — circle (fully rounded) or rect (rectangular / box with sharp edges)' },
  { name: 'pulse', type: 'boolean', default: 'false', description: 'Pulsing animation for active or live states' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Optional text label displayed beside the indicator dot. Omit to render the dot alone.' },
];

export default function IndicatorPage() {
  const [status, setStatus] = useState('online');
  const [shape, setShape] = useState('circle');
  const [size, setSize] = useState('md');
  const [pulse, setPulse] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  return (
    <article className="space-y-12">
      <PageHeader
        title="Indicators"
        description="Small colored dots or rectangles that convey status or availability at a glance. Use them for online/offline status, activity states, or simple boolean indicators. The text label is optional — indicators can render as standalone dots or with a descriptive label."
        status="stable"
        category="Status & System Feedback"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">
          Adjust status, shape, size, pulse, and label visibility to explore all indicator combinations.
        </p>
        <ComponentDemo
          controls={[
            { type: 'select', label: 'Status', value: status, onChange: setStatus, options: ['online', 'offline', 'busy', 'away', 'neutral'] },
            { type: 'select', label: 'Shape', value: shape, onChange: setShape, options: ['circle', 'rect'] },
            { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
            { type: 'checkbox', label: 'Pulse', value: pulse, onChange: setPulse },
            { type: 'checkbox', label: 'Show Label', value: showLabel, onChange: setShowLabel },
          ]}
        >
          <Indicator
            status={status}
            shape={shape}
            size={size}
            pulse={pulse}
            label={showLabel ? status.charAt(0).toUpperCase() + status.slice(1) : undefined}
          />
        </ComponentDemo>
      </section>

      {/* ── Statuses ── */}
      <section>
        <h2 id="statuses" className="text-xl font-black tracking-tight text-text mb-2">Statuses</h2>
        <p className="text-sm text-text-secondary mb-4">
          Five status colors, each mapped to a semantic meaning.
        </p>
        <CodeExample code={`<Indicator status="online" label="Online" />\n<Indicator status="away" label="Away" />\n<Indicator status="busy" label="Busy" />\n<Indicator status="offline" label="Offline" />\n<Indicator status="neutral" label="Neutral" />`}>
          <div className="flex flex-wrap items-center gap-6">
            <Indicator status="online" label="Online" />
            <Indicator status="away" label="Away" />
            <Indicator status="busy" label="Busy" />
            <Indicator status="offline" label="Offline" />
            <Indicator status="neutral" label="Neutral" />
          </div>
        </CodeExample>
      </section>

      {/* ── Shape ── */}
      <section>
        <h2 id="shape" className="text-xl font-black tracking-tight text-text mb-2">Shape</h2>
        <p className="text-sm text-text-secondary mb-4">
          Two shape options: <strong>circle</strong> (fully rounded, default) and <strong>rect</strong> (rectangular box with sharp edges). The shape applies to both the dot and its pulse animation.
        </p>
        <CodeExample code={`{/* Circle (default) */}\n<Indicator shape="circle" status="online" label="Online" />\n<Indicator shape="circle" status="busy" label="Busy" />\n\n{/* Rectangle / Box */}\n<Indicator shape="rect" status="online" label="Online" />\n<Indicator shape="rect" status="busy" label="Busy" />`}>
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <span className="text-xs text-text-tertiary w-10">Circle</span>
              <Indicator shape="circle" status="online" label="Online" />
              <Indicator shape="circle" status="away" label="Away" />
              <Indicator shape="circle" status="busy" label="Busy" />
              <Indicator shape="circle" status="offline" label="Offline" />
              <Indicator shape="circle" status="neutral" label="Neutral" />
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-text-tertiary w-10">Rect</span>
              <Indicator shape="rect" status="online" label="Online" />
              <Indicator shape="rect" status="away" label="Away" />
              <Indicator shape="rect" status="busy" label="Busy" />
              <Indicator shape="rect" status="offline" label="Offline" />
              <Indicator shape="rect" status="neutral" label="Neutral" />
            </div>
          </div>
        </CodeExample>

        <h3 className="text-sm font-bold text-text mt-6 mb-3">Rectangle Without Labels</h3>
        <CodeExample code={`<Indicator shape="rect" status="online" />\n<Indicator shape="rect" status="away" />\n<Indicator shape="rect" status="busy" />\n<Indicator shape="rect" status="offline" />`}>
          <div className="flex items-center gap-4">
            <Indicator shape="rect" status="online" />
            <Indicator shape="rect" status="away" />
            <Indicator shape="rect" status="busy" />
            <Indicator shape="rect" status="offline" />
            <Indicator shape="rect" status="neutral" />
          </div>
        </CodeExample>
      </section>

      {/* ── Label (Optional) ── */}
      <section>
        <h2 id="label" className="text-xl font-black tracking-tight text-text mb-2">Label (Optional)</h2>
        <p className="text-sm text-text-secondary mb-4">
          The <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">label</code> prop is optional. When provided, it renders descriptive text beside the dot. When omitted, the indicator renders as a standalone dot — useful for compact layouts, avatars, or icon overlays.
        </p>
        <CodeExample code={`{/* With label */}\n<Indicator status="online" label="Available" />\n<Indicator status="busy" label="Do Not Disturb" />\n\n{/* Without label (dot only) */}\n<Indicator status="online" />\n<Indicator status="busy" />`}>
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <span className="text-xs text-text-tertiary w-20">With label</span>
              <Indicator status="online" label="Available" />
              <Indicator status="busy" label="Do Not Disturb" />
              <Indicator status="away" label="Idle" />
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-text-tertiary w-20">Without label</span>
              <Indicator status="online" />
              <Indicator status="busy" />
              <Indicator status="away" />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Sizes ── */}
      <section>
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three sizes: <strong>sm</strong> (8px), <strong>md</strong> (10px), <strong>lg</strong> (12px).
        </p>
        <CodeExample code={`<Indicator size="sm" label="Small" />\n<Indicator size="md" label="Medium" />\n<Indicator size="lg" label="Large" />`}>
          <div className="flex items-center gap-6">
            <Indicator size="sm" label="Small" />
            <Indicator size="md" label="Medium" />
            <Indicator size="lg" label="Large" />
          </div>
        </CodeExample>

        <h3 className="text-sm font-bold text-text mt-6 mb-3">Rectangle Sizes</h3>
        <CodeExample code={`<Indicator shape="rect" size="sm" label="Small" />\n<Indicator shape="rect" size="md" label="Medium" />\n<Indicator shape="rect" size="lg" label="Large" />`}>
          <div className="flex items-center gap-6">
            <Indicator shape="rect" size="sm" label="Small" />
            <Indicator shape="rect" size="md" label="Medium" />
            <Indicator shape="rect" size="lg" label="Large" />
          </div>
        </CodeExample>
      </section>

      {/* ── Pulse Animation ── */}
      <section>
        <h2 id="pulse" className="text-xl font-black tracking-tight text-text mb-2">Pulse Animation</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">pulse</code> for active or live states that need attention. Works with both circle and rect shapes.
        </p>
        <CodeExample code={`<Indicator status="online" pulse label="Live" />\n<Indicator status="busy" pulse label="Recording" />\n<Indicator shape="rect" status="online" pulse label="Active" />\n<Indicator shape="rect" status="busy" pulse label="Recording" />`}>
          <div className="flex items-center gap-6">
            <Indicator status="online" pulse label="Live" />
            <Indicator status="busy" pulse label="Recording" />
            <Indicator shape="rect" status="online" pulse label="Active" />
            <Indicator shape="rect" status="busy" pulse label="Recording" />
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use status colors consistently — green for online, red for busy',
            'Omit label when used as an overlay on avatars or icons',
            'Use pulse sparingly for live or active states only',
            'Use rect shape for data table cells or dense grid layouts',
            'Use circle shape for user status and conversational UIs',
          ]}
          dontItems={[
            'Do not use pulse on offline or neutral indicators',
            'Avoid using indicators without sufficient surrounding context',
            'Do not use large indicators in dense, compact interfaces',
            'Avoid mixing circle and rect shapes in the same context',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>When <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">label</code> is provided, the text gives screen readers context about the status.</>,
            <>When used without a label, ensure the parent element provides an accessible name (e.g., <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code>).</>,
            'Color is supplemented by the label text — never rely on color alone to convey status.',
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
        <PropsTable props={indicatorProps} />
      </section>
    </article>
  );
}
