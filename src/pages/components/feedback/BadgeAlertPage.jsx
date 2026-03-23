import { useState } from 'react';
import BadgeAlert from '@/components/feedback/BadgeAlert';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const badgeAlertProps = [
  { name: 'variant', type: "'primary' | 'outline' | 'fill' | 'tint' | 'ghost'", default: "'primary'", description: 'Visual style — primary (subtle raised bg), outline (transparent + border), fill (solid type-colored background), tint (semi-transparent type color bg), ghost (fully transparent, no border)' },
  { name: 'type', type: "'success' | 'info' | 'neutral' | 'warning' | 'negative' | 'block'", default: "'neutral'", description: 'Semantic type — controls the icon and color scheme' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the badge — sm (20px), md (24px), lg (28px)' },
  { name: 'message', type: 'string', default: "''", description: 'The status message text to display' },
  { name: 'maxChars', type: 'number', default: 'undefined', description: 'Maximum character length allowed. When exceeded, text is truncated with "..." appended.' },
  { name: 'maxLines', type: 'number', default: '1', description: 'Maximum number of text lines allowed. Overflowing lines are hidden with ellipsis via CSS line-clamp.' },
];

export default function BadgeAlertPage() {
  const [variant, setVariant] = useState('primary');
  const [type, setType] = useState('info');
  const [size, setSize] = useState('md');
  const [message, setMessage] = useState('Status message');

  return (
    <article className="space-y-12">
      <PageHeader
        title="Badge Alert"
        description="Inline contextual badge with a semantic icon and status message. Use Badge Alerts inside containers, table cells, cards, or any layout to communicate contextual status, validation results, or categorized information at a glance. Rectangular sharp-edge design with text truncation support."
        status="stable"
        category="Status & System Feedback"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">
          Adjust variant, type, and size to explore all badge alert combinations.
        </p>
        <ComponentDemo
          controls={[
            { type: 'select', label: 'Variant', value: variant, onChange: setVariant, options: ['primary', 'outline', 'fill', 'tint', 'ghost'] },
            { type: 'select', label: 'Type', value: type, onChange: setType, options: ['success', 'info', 'neutral', 'warning', 'negative', 'block'] },
            { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
          ]}
        >
          <BadgeAlert variant={variant} type={type} size={size} message={message} />
        </ComponentDemo>
      </section>

      {/* ── Variants ── */}
      <section>
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Five style variants control the visual treatment:
          <strong> Primary</strong> uses a subtle raised background,
          <strong> Outline</strong> uses a transparent background with a border,
          <strong> Fill</strong> uses a solid type-colored background with contrasting text,
          <strong> Tint</strong> uses a semi-transparent type-colored background,
          <strong> Ghost</strong> uses a fully transparent background with no border.
        </p>
        <CodeExample code={`<BadgeAlert variant="primary" type="info" message="Primary style" />\n<BadgeAlert variant="outline" type="info" message="Outline style" />\n<BadgeAlert variant="fill" type="info" message="Fill style" />\n<BadgeAlert variant="tint" type="info" message="Tint style" />\n<BadgeAlert variant="ghost" type="info" message="Ghost style" />`}>
          <div className="flex flex-wrap items-center gap-3">
            <BadgeAlert variant="primary" type="info" message="Primary style" />
            <BadgeAlert variant="outline" type="info" message="Outline style" />
            <BadgeAlert variant="fill" type="info" message="Fill style" />
            <BadgeAlert variant="tint" type="info" message="Tint style" />
            <BadgeAlert variant="ghost" type="info" message="Ghost style" />
          </div>
        </CodeExample>
      </section>

      {/* ── All Variants × Types Matrix ── */}
      <section>
        <h2 id="variants-types" className="text-xl font-black tracking-tight text-text mb-2">Variants &times; Types</h2>
        <p className="text-sm text-text-secondary mb-4">
          Each variant can be combined with all six semantic types. The type controls the icon and color scheme.
        </p>
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                <th className="whitespace-nowrap px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Type</th>
                <th className="px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Primary</th>
                <th className="px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Outline</th>
                <th className="px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Fill</th>
                <th className="px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Tint</th>
                <th className="px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Ghost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {['success', 'info', 'neutral', 'warning', 'negative', 'block'].map((t) => (
                <tr key={t}>
                  <td className="px-4 py-3 font-medium text-text capitalize">{t}</td>
                  <td className="px-4 py-3"><BadgeAlert variant="primary" type={t} message="Status message" /></td>
                  <td className="px-4 py-3"><BadgeAlert variant="outline" type={t} message="Status message" /></td>
                  <td className="px-4 py-3"><BadgeAlert variant="fill" type={t} message="Status message" /></td>
                  <td className="px-4 py-3"><BadgeAlert variant="tint" type={t} message="Status message" /></td>
                  <td className="px-4 py-3"><BadgeAlert variant="ghost" type={t} message="Status message" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Types ── */}
      <section>
        <h2 id="types" className="text-xl font-black tracking-tight text-text mb-2">Types</h2>
        <p className="text-sm text-text-secondary mb-4">
          Six semantic types, each with a dedicated icon and color:
        </p>
        <div className="bg-surface-overlay border border-border p-6 space-y-3 text-sm text-text-secondary">
          <p>— <strong className="text-success">Success</strong>: <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">o9con-check-circle</code> — completed, approved, validated</p>
          <p>— <strong className="text-info">Info</strong>: <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">o9con-info-circle-filled</code> — informational, contextual details</p>
          <p>— <strong className="text-text">Neutral</strong>: <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">o9con-info-circle</code> — generic, default status</p>
          <p>— <strong className="text-warning">Warning</strong>: <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">o9con-exclamation-triangle-filled</code> — caution, needs attention</p>
          <p>— <strong className="text-danger">Negative</strong>: <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">o9con-blocker-action</code> — error, failed, rejected</p>
          <p>— <strong className="text-danger">Block</strong>: <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">o9con-blocker-action-filled</code> — critical blocker, hard stop</p>
        </div>
        <div className="mt-4">
          <CodeExample code={`<BadgeAlert type="success" message="Approved" />\n<BadgeAlert type="info" message="In review" />\n<BadgeAlert type="neutral" message="Pending" />\n<BadgeAlert type="warning" message="Expiring soon" />\n<BadgeAlert type="negative" message="Rejected" />\n<BadgeAlert type="block" message="Blocked" />`}>
            <div className="flex flex-wrap items-center gap-3">
              <BadgeAlert type="success" message="Approved" />
              <BadgeAlert type="info" message="In review" />
              <BadgeAlert type="neutral" message="Pending" />
              <BadgeAlert type="warning" message="Expiring soon" />
              <BadgeAlert type="negative" message="Rejected" />
              <BadgeAlert type="block" message="Blocked" />
            </div>
          </CodeExample>
        </div>
      </section>

      {/* ── Sizes ── */}
      <section>
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three sizes: <strong>sm</strong> (20px), <strong>md</strong> (24px), <strong>lg</strong> (28px). Icon and text scale proportionally.
        </p>
        <CodeExample code={`<BadgeAlert size="sm" type="info" message="Small badge" />\n<BadgeAlert size="md" type="info" message="Medium badge" />\n<BadgeAlert size="lg" type="info" message="Large badge" />`}>
          <div className="flex items-center gap-3">
            <BadgeAlert size="sm" type="info" message="Small badge" />
            <BadgeAlert size="md" type="info" message="Medium badge" />
            <BadgeAlert size="lg" type="info" message="Large badge" />
          </div>
        </CodeExample>

        <h3 className="text-sm font-bold text-text mt-6 mb-3">All Sizes with Fill Variant</h3>
        <CodeExample code={`<BadgeAlert variant="fill" size="sm" type="negative" message="Error" />\n<BadgeAlert variant="fill" size="md" type="negative" message="Error" />\n<BadgeAlert variant="fill" size="lg" type="negative" message="Error" />`}>
          <div className="flex items-center gap-3">
            <BadgeAlert variant="fill" size="sm" type="negative" message="Error" />
            <BadgeAlert variant="fill" size="md" type="negative" message="Error" />
            <BadgeAlert variant="fill" size="lg" type="negative" message="Error" />
          </div>
        </CodeExample>
      </section>

      {/* ── Text Truncation ── */}
      <section>
        <h2 id="truncation" className="text-xl font-black tracking-tight text-text mb-2">Text Truncation</h2>
        <p className="text-sm text-text-secondary mb-4">
          By default, message text fits the parent container width. When the text overflows, it is truncated with an ellipsis. Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">maxChars</code> to set a hard character limit, or <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">maxLines</code> for multi-line clamping.
        </p>

        <h3 className="text-sm font-bold text-text mb-3">Default — Fit Parent Container</h3>
        <CodeExample code={`{/* Badge fills parent width, text truncates with ellipsis */}\n<div style={{ width: 200 }}>\n  <BadgeAlert\n    type="info"\n    message="This is a very long status message that will be truncated"\n  />\n</div>`}>
          <div style={{ width: 200 }}>
            <BadgeAlert
              type="info"
              message="This is a very long status message that will be truncated to fit the parent container"
              className="w-full"
            />
          </div>
        </CodeExample>

        <h3 className="text-sm font-bold text-text mt-6 mb-3">maxChars — Character Limit</h3>
        <p className="text-sm text-text-secondary mb-4">
          Set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">maxChars</code> to define the maximum character length. When exceeded, text is truncated and "..." is appended.
        </p>
        <CodeExample code={`<BadgeAlert type="warning" message="This message exceeds 20 chars" maxChars={20} />\n<BadgeAlert type="success" message="Short" maxChars={20} />`}>
          <div className="flex flex-col gap-3">
            <BadgeAlert type="warning" message="This message exceeds the twenty character limit" maxChars={20} />
            <BadgeAlert type="success" message="Short message" maxChars={20} />
          </div>
        </CodeExample>

        <h3 className="text-sm font-bold text-text mt-6 mb-3">maxLines — Multi-line Clamping</h3>
        <p className="text-sm text-text-secondary mb-4">
          Set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">maxLines</code> to allow multiple text lines. Lines beyond the limit are hidden with ellipsis.
        </p>
        <CodeExample code={`<BadgeAlert\n  type="info"\n  message="This is a multi-line badge alert message that wraps to multiple lines for longer contextual information."\n  maxLines={2}\n  className="max-w-xs h-auto"\n/>`}>
          <div className="max-w-xs">
            <BadgeAlert
              type="info"
              size="lg"
              message="This is a multi-line badge alert message that wraps to multiple lines for longer contextual information within a container."
              maxLines={2}
              className="h-auto py-1.5"
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Inline Usage ── */}
      <section>
        <h2 id="inline-usage" className="text-xl font-black tracking-tight text-text mb-2">Inline Usage</h2>
        <p className="text-sm text-text-secondary mb-4">
          Badge Alerts are designed as inline elements. Place them inside table cells, card headers, form fields, or any container for contextual information.
        </p>
        <CodeExample code={`{/* Inside a data row */}\n<div className="flex items-center justify-between border-b border-border py-3">\n  <span className="text-sm text-text">Order #4821</span>\n  <BadgeAlert type="success" size="sm" message="Delivered" />\n</div>\n<div className="flex items-center justify-between border-b border-border py-3">\n  <span className="text-sm text-text">Order #4822</span>\n  <BadgeAlert type="warning" size="sm" message="In transit" />\n</div>\n<div className="flex items-center justify-between py-3">\n  <span className="text-sm text-text">Order #4823</span>\n  <BadgeAlert type="negative" size="sm" message="Cancelled" />\n</div>`}>
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-between border-b border-border py-3">
              <span className="text-sm text-text">Order #4821</span>
              <BadgeAlert type="success" size="sm" message="Delivered" />
            </div>
            <div className="flex items-center justify-between border-b border-border py-3">
              <span className="text-sm text-text">Order #4822</span>
              <BadgeAlert type="warning" size="sm" message="In transit" />
            </div>
            <div className="flex items-center justify-between border-b border-border py-3">
              <span className="text-sm text-text">Order #4823</span>
              <BadgeAlert type="negative" size="sm" message="Cancelled" />
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-text">Order #4824</span>
              <BadgeAlert type="block" size="sm" message="Blocked" />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use type to convey semantic meaning (success for completed, negative for errors)',
            'Keep messages short and scannable (2-4 words ideal)',
            'Use maxChars to enforce consistent badge widths in data tables',
            'Use the fill variant for high-emphasis status that must stand out',
            'Use the primary variant for default contextual information',
            'Place badges inline with the content they describe',
          ]}
          dontItems={[
            'Do not use for long-form messages — use InlineAlert instead',
            'Avoid mixing badge variants inconsistently in the same table or list',
            'Do not use block type for recoverable errors — use negative instead',
            'Avoid large badges in dense data tables — use sm size',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>The full message is available via the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">title</code> attribute, ensuring truncated text is accessible on hover.</>,
            <>Icons are decorative (<code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-hidden="true"</code>) — the message text provides the semantic content.</>,
            'Color is not the sole indicator of meaning — each type has a distinct icon shape.',
            <>Supports <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">ref</code> forwarding for programmatic access.</>,
            <>Works as an inline <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">&lt;span&gt;</code> element, composable within any container.</>,
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
        <PropsTable props={badgeAlertProps} />
      </section>
    </article>
  );
}
