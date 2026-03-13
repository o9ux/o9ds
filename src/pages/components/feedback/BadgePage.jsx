import Badge from '@/components/feedback/Badge';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const badgeProps = [
  { name: 'variant', type: "'neutral' | 'info' | 'success' | 'warning' | 'danger'", default: "'neutral'", description: 'Semantic color variant' },
  { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Size of the badge' },
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
        description="Badges display a small count or status indicator — typically overlaid on an icon or avatar, or inline within a label."
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
        <p className="text-sm text-text-secondary mb-4">Two sizes — sm and md.</p>
        <CodeExample code={`<Badge size="sm" variant="danger">3</Badge>
<Badge size="md" variant="danger">3</Badge>`}>
          <div className="flex flex-wrap items-center gap-3">
            {['sm', 'md'].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className="text-xs text-text-tertiary uppercase tracking-widest w-6">{s}</span>
                <Badge size={s} variant="danger">9</Badge>
                <Badge size={s} variant="info">24</Badge>
                <Badge size={s} variant="neutral">New</Badge>
              </div>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* Dot indicator */}
      <section className="mb-12">
        <h2 id="dot" className="text-xl font-black tracking-tight text-text mb-2">Dot Indicator</h2>
        <p className="text-sm text-text-secondary mb-4">
          When <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">dot</code> is true, the badge renders a small coloured circle with no label — useful for unread or presence states.
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
            'Keep badge labels very short — a number or 1–2 words maximum',
          ]}
          dontItems={[
            'Do not use badges as a primary labelling mechanism — they supplement, not replace, descriptive text',
            'Avoid stacking multiple badges on a single element',
            'Do not use pill=false for count badges — only use square badges for categorical labels',
            'Never use badges as interactive controls; they are read-only status indicators',
          ]}
        />
      </section>

      {/* API */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={badgeProps} />
      </section>
    </article>
  );
}
