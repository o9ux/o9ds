import { Card, CardHeader, CardBody, CardFooter, CardDivider } from '@/components/containers/Card';
import Button from '@/components/buttons/Button';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const cardProps = [
  { name: 'variant', type: "'default' | 'raised' | 'outlined' | 'sunken'", default: "'default'", description: 'Visual elevation and background style' },
  { name: 'interactive', type: 'boolean', default: 'false', description: 'Adds hover and active states for clickable/navigable cards' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Card content — use CardHeader, CardBody, CardFooter sub-components' },
];

const cardHeaderProps = [
  { name: 'title', type: 'string', default: 'undefined', description: 'Card title text' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Subtitle below the title' },
  { name: 'action', type: 'ReactNode', default: 'undefined', description: 'Action element (button, menu) aligned to the right' },
];

export default function CardPage() {
  return (
    <article>
      <PageHeader
        title="Card"
        description="Cards group related information and actions in a contained surface. They establish visual hierarchy and help users scan content at a glance."
        status="stable"
        category="Containers"
      />

      {/* Anatomy */}
      <section className="mb-12">
        <h2 id="anatomy" className="text-xl font-black tracking-tight text-text mb-2">Anatomy</h2>
        <p className="text-sm text-text-secondary mb-4">
          Cards are composed from <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">CardHeader</code>, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">CardBody</code>, and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">CardFooter</code> sub-components.
        </p>
        <CodeExample code={`<Card>
  <CardHeader title="Card title" description="Supporting text" />
  <CardBody>
    <p>Main card content goes here.</p>
  </CardBody>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>`}>
          <div className="max-w-sm">
            <Card>
              <CardHeader
                title="Card title"
                description="A short supporting description."
              />
              <CardBody>
                <p className="text-sm text-text-secondary">
                  Main card content goes here. This area can contain any mixture of text, data, or other UI elements.
                </p>
              </CardBody>
              <CardFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </CardFooter>
            </Card>
          </div>
        </CodeExample>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Four elevation variants for different placement contexts.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {['default', 'raised', 'outlined', 'sunken'].map((v) => (
            <div key={v}>
              <p className="mb-2 text-xs font-bold tracking-widest uppercase text-text-tertiary">{v}</p>
              <Card variant={v}>
                <CardBody>
                  <p className="text-sm text-text-secondary">variant="{v}"</p>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive */}
      <section className="mb-12">
        <h2 id="interactive" className="text-xl font-black tracking-tight text-text mb-2">Interactive Cards</h2>
        <p className="text-sm text-text-secondary mb-4">
          Set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">interactive</code> for cards that are entirely clickable (e.g., navigation tiles).
        </p>
        <CodeExample code={`<Card interactive onClick={() => navigate('/detail')}>
  <CardBody>
    <p className="font-semibold">Clickable card</p>
    <p className="text-text-secondary">Hover to see the interactive state.</p>
  </CardBody>
</Card>`}>
          <div className="max-w-xs">
            <Card interactive>
              <CardBody>
                <p className="text-sm font-semibold text-text mb-1">Clickable card</p>
                <p className="text-xs text-text-secondary">Hover to see the interactive state.</p>
              </CardBody>
            </Card>
          </div>
        </CodeExample>
      </section>

      {/* Header with action */}
      <section className="mb-12">
        <h2 id="header-action" className="text-xl font-black tracking-tight text-text mb-2">Header with Action</h2>
        <p className="text-sm text-text-secondary mb-4">
          The <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">action</code> prop on CardHeader aligns a button or menu to the top-right.
        </p>
        <CodeExample code={`<CardHeader
  title="Metric overview"
  description="Last 30 days"
  action={<Button variant="outline" size="sm">View all</Button>}
/>`}>
          <div className="max-w-sm">
            <Card>
              <CardHeader
                title="Metric overview"
                description="Last 30 days"
                action={<Button variant="outline" size="sm">View all</Button>}
              />
              <CardDivider />
              <CardBody>
                <div className="flex justify-between">
                  {[
                    { label: 'Revenue', value: '$24.8k' },
                    { label: 'Users', value: '1,204' },
                    { label: 'Uptime', value: '99.9%' },
                  ].map((m) => (
                    <div key={m.label}>
                      <p className="text-[10px] uppercase tracking-widest text-text-tertiary">{m.label}</p>
                      <p className="text-xl font-black text-text">{m.value}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </CodeExample>
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use CardHeader + CardBody + CardFooter for structured content with clear sections',
            'Use the interactive prop only when the entire card is a navigation or selection target',
            'Use variant="raised" for content that needs to stand out from the page background',
            'Use variant="sunken" for inset or secondary content areas within another card',
            'Keep card footers to 1–2 primary actions maximum',
          ]}
          dontItems={[
            'Do not nest interactive cards inside other interactive cards',
            'Avoid using cards for very simple, single-line content — a list row is more appropriate',
            'Do not mix interactive and non-interactive cards in the same grid without clear visual distinction',
            'Avoid overloading a single card with too many distinct actions or sections',
          ]}
        />
      </section>

      {/* API */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <h3 className="text-sm font-bold text-text mb-3">Card</h3>
        <PropsTable props={cardProps} />
        <h3 className="text-sm font-bold text-text mb-3 mt-8">CardHeader</h3>
        <PropsTable props={cardHeaderProps} />
      </section>
    </article>
  );
}
