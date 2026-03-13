import { useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from '@/components/navigation/Breadcrumb';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const breadcrumbProps = [
  {
    name: 'separator',
    type: "'chevron' | 'slash'",
    default: "'chevron'",
    description: 'Visual separator between items',
  },
  {
    name: 'maxItems',
    type: 'number',
    default: 'undefined',
    description: 'Max visible items before collapsing middle items into ellipsis',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes to apply',
  },
  {
    name: 'children',
    type: 'ReactNode (BreadcrumbItem)',
    default: '—',
    description: 'BreadcrumbItem elements representing each level',
  },
];

const breadcrumbItemProps = [
  {
    name: 'href',
    type: 'string',
    default: 'undefined',
    description: 'URL the breadcrumb item links to (omit for the current page)',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes to apply',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Breadcrumb label',
  },
];

export default function BreadcrumbPage() {
  const [separator, setSeparator] = useState('chevron');

  return (
    <article>
      <PageHeader
        title="Breadcrumb"
        description="Breadcrumbs show the user's current location within a navigation hierarchy and provide quick access to parent levels. They help with orientation in deeply nested structures."
        status="stable"
        category="Navigation"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">
          Interactive Demo
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Toggle between separator styles.
        </p>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Separator',
              value: separator,
              onChange: setSeparator,
              options: ['chevron', 'slash'],
            },
          ]}
        >
          <Breadcrumb separator={separator}>
            <BreadcrumbItem href="#">Home</BreadcrumbItem>
            <BreadcrumbItem href="#">Components</BreadcrumbItem>
            <BreadcrumbItem href="#">Navigation</BreadcrumbItem>
            <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
          </Breadcrumb>
        </ComponentDemo>
      </section>

      {/* Basic Usage */}
      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">
          Basic Usage
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          The last item is automatically styled as the current page (non-interactive).
        </p>
        <CodeExample
          code={`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <BreadcrumbItem href="#">Home</BreadcrumbItem>
            <BreadcrumbItem href="#">Docs</BreadcrumbItem>
            <BreadcrumbItem>Current Page</BreadcrumbItem>
          </Breadcrumb>
        </CodeExample>
      </section>

      {/* Separators */}
      <section className="mb-12">
        <h2 id="separators" className="text-xl font-black tracking-tight text-text mb-2">
          Separators
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Choose between chevron and slash separators.
        </p>
        <CodeExample
          code={`<Breadcrumb separator="chevron">...</Breadcrumb>
<Breadcrumb separator="slash">...</Breadcrumb>`}
        >
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary mb-2">Chevron</p>
              <Breadcrumb separator="chevron">
                <BreadcrumbItem href="#">Home</BreadcrumbItem>
                <BreadcrumbItem href="#">Section</BreadcrumbItem>
                <BreadcrumbItem>Page</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary mb-2">Slash</p>
              <Breadcrumb separator="slash">
                <BreadcrumbItem href="#">Home</BreadcrumbItem>
                <BreadcrumbItem href="#">Section</BreadcrumbItem>
                <BreadcrumbItem>Page</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* Collapsed */}
      <section className="mb-12">
        <h2 id="collapsed" className="text-xl font-black tracking-tight text-text mb-2">
          Collapsed (maxItems)
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          For deep hierarchies, collapse middle items into an ellipsis.
        </p>
        <CodeExample
          code={`<Breadcrumb maxItems={3}>
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem href="#">Category</BreadcrumbItem>
  <BreadcrumbItem href="#">Subcategory</BreadcrumbItem>
  <BreadcrumbItem href="#">Section</BreadcrumbItem>
  <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumb>`}
        >
          <Breadcrumb maxItems={3}>
            <BreadcrumbItem href="#">Home</BreadcrumbItem>
            <BreadcrumbItem href="#">Category</BreadcrumbItem>
            <BreadcrumbItem href="#">Subcategory</BreadcrumbItem>
            <BreadcrumbItem href="#">Section</BreadcrumbItem>
            <BreadcrumbItem>Current Page</BreadcrumbItem>
          </Breadcrumb>
        </CodeExample>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">
          Usage Guidelines
        </h2>
        <DoDont
          doItems={[
            'Place breadcrumbs at the top of the page, below the header',
            'Always include the root/home page as the first item',
            'Use maxItems to collapse deeply nested breadcrumbs',
            'The last item should represent the current page and be non-interactive',
          ]}
          dontItems={[
            'Do not use breadcrumbs as the only navigation method',
            'Avoid breadcrumbs for flat (non-hierarchical) site structures',
            'Do not make the current page item a link',
            'Avoid more than 5-6 visible levels — use maxItems to collapse',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-xl font-black tracking-tight text-text mb-2">
          Accessibility
        </h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses a <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">&lt;nav&gt;</code> element with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">aria-label="Breadcrumb"</code>.</>,
            <>Uses an ordered list (<code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">&lt;ol&gt;</code>) to convey the hierarchical sequence.</>,
            'The current page item is rendered as a non-interactive span.',
            'All ancestor items are links for keyboard navigation.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-white font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">
          API Reference
        </h2>
        <h3 className="text-sm font-bold text-text mt-6 mb-3">Breadcrumb</h3>
        <PropsTable props={breadcrumbProps} />
        <h3 className="text-sm font-bold text-text mt-8 mb-3">BreadcrumbItem</h3>
        <PropsTable props={breadcrumbItemProps} />
      </section>
    </article>
  );
}
