import Tooltip from '@/components/containers/Tooltip';
import Button from '@/components/buttons/Button';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-text-tertiary">
    <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 5.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 6.5zm0-2.5a.875.875 0 110 1.75A.875.875 0 018 4z"/>
  </svg>
);

const tooltipProps = [
  { name: 'content', type: 'ReactNode', default: '—', description: 'The tooltip text or node to display' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Where the tooltip appears relative to the trigger' },
  { name: 'delay', type: 'number', default: '400', description: 'Milliseconds to wait before showing the tooltip on hover' },
  { name: 'className', type: 'string', default: "''", description: 'Applied to the trigger wrapper element' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'The element that triggers the tooltip on hover/focus' },
];

export default function TooltipPage() {
  return (
    <article>
      <PageHeader
        title="Tooltip"
        description="Tooltips surface brief, supplementary information when users hover over or focus on an element. They appear on a short delay and disappear immediately on mouse-out."
        status="stable"
        category="Containers"
      />

      {/* Basic */}
      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <p className="text-sm text-text-secondary mb-4">
          Wrap any element — button, icon, or text — with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">Tooltip</code> to make it show a tip on hover or focus.
        </p>
        <CodeExample code={`<Tooltip content="Save your changes">
  <Button>Save</Button>
</Tooltip>`}>
          <div className="flex items-center gap-6 p-8">
            <Tooltip content="Save your changes">
              <Button>Save</Button>
            </Tooltip>
            <Tooltip content="Remove this item permanently">
              <Button variant="danger">Delete</Button>
            </Tooltip>
            <Tooltip content="Learn more about this field">
              <button className="inline-flex items-center justify-center text-text-tertiary hover:text-text transition-colors">
                <InfoIcon />
              </button>
            </Tooltip>
          </div>
        </CodeExample>
      </section>

      {/* Placement */}
      <section className="mb-12">
        <h2 id="placement" className="text-xl font-black tracking-tight text-text mb-2">Placement</h2>
        <p className="text-sm text-text-secondary mb-4">
          Four directional placements relative to the trigger element.
        </p>
        <CodeExample code={`<Tooltip placement="top" content="Top tooltip">…</Tooltip>
<Tooltip placement="bottom" content="Bottom tooltip">…</Tooltip>
<Tooltip placement="left" content="Left tooltip">…</Tooltip>
<Tooltip placement="right" content="Right tooltip">…</Tooltip>`}>
          <div className="flex flex-wrap items-center justify-center gap-6 p-12">
            {['top', 'bottom', 'left', 'right'].map((p) => (
              <Tooltip key={p} placement={p} content={`${p.charAt(0).toUpperCase() + p.slice(1)} placement`}>
                <Button variant="outline" size="sm">{p}</Button>
              </Tooltip>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* Icon tooltips */}
      <section className="mb-12">
        <h2 id="icon-tooltips" className="text-xl font-black tracking-tight text-text mb-2">Icon Tooltips</h2>
        <p className="text-sm text-text-secondary mb-4">
          Ideal for icon-only buttons where the action label cannot be displayed visually.
        </p>
        <CodeExample code={`<Tooltip content="Copy to clipboard">
  <button aria-label="Copy">
    <CopyIcon />
  </button>
</Tooltip>`}>
          <div className="flex items-center gap-4">
            {[
              { label: 'Copy to clipboard', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="6" width="8" height="8"/><path d="M4 10H2V2h8v2"/></svg> },
              { label: 'Share link', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="13" cy="3" r="1.5"/><circle cx="3" cy="8" r="1.5"/><circle cx="13" cy="13" r="1.5"/><path d="M4.5 7.5l7-3.5M4.5 8.5l7 3.5"/></svg> },
              { label: 'Download file', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3v7M5 8l3 3 3-3"/><path d="M2 13h12"/></svg> },
              { label: 'Delete item', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 4h10M5 4V3h6v1M6 7v5M10 7v5M4 4l1 9h6l1-9"/></svg> },
            ].map(({ label, icon }) => (
              <Tooltip key={label} content={label}>
                <button
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center border border-border text-text-secondary hover:border-border-hover hover:text-text transition-colors"
                >
                  {icon}
                </button>
              </Tooltip>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use tooltips to add labels to icon-only controls',
            'Keep tooltip text very short — one sentence or phrase (under 60 characters)',
            'Allow tooltips to be triggered by keyboard focus, not only mouse hover',
            'Use the default 400ms delay to avoid accidental tooltip flashes during navigation',
          ]}
          dontItems={[
            'Do not put interactive elements (links, buttons) inside tooltips — use Popover instead',
            'Do not use tooltips as the only way to convey important information — not all users hover',
            'Avoid multiline or richly formatted content — use a Popover for that',
            'Do not trigger tooltips on click — they are for hover/focus only',
          ]}
        />
      </section>

      {/* API */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={tooltipProps} />
      </section>
    </article>
  );
}
