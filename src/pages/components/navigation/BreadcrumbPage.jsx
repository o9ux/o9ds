import { useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from '@/components/navigation/Breadcrumb';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';

import homeAltSvg from '@/assets/icons/o9con-home-alt.svg?raw';
import appsSvg from '@/assets/icons/o9con-apps.svg?raw';
import compassSvg from '@/assets/icons/o9con-compass.svg?raw';
import fileSvg from '@/assets/icons/o9con-file-o.svg?raw';
import cogSvg from '@/assets/icons/o9con-cog.svg?raw';
import folderSvg from '@/assets/icons/o9con-folder.svg?raw';

const breadcrumbProps = [
  {
    name: 'separator',
    type: "'chevron' | 'slash'",
    default: "'chevron'",
    description: 'Visual separator between items',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Size variant — sm (10px), md (12px), lg (14px). Icons and separators scale proportionally.',
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
    name: 'icon',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Leading icon. When provided without children, renders as icon-only.',
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
    description: 'Breadcrumb label text',
  },
];

export default function BreadcrumbPage() {
  const [separator, setSeparator] = useState('chevron');
  const [size, setSize] = useState('md');

  return (
    <article>
      <PageHeader
        title="Breadcrumb"
        description="Breadcrumbs show the user's current location within a navigation hierarchy and provide quick access to parent levels. Three size variants, two separator styles, and icon support."
        status="stable"
        category="Navigation"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">
          Interactive Demo
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Toggle between separator styles and sizes.
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
            {
              type: 'select',
              label: 'Size',
              value: size,
              onChange: setSize,
              options: ['sm', 'md', 'lg'],
            },
          ]}
        >
          <Breadcrumb separator={separator} size={size}>
            <BreadcrumbItem href="#" icon={<O9Icon svg={homeAltSvg} />} aria-label="Home" />
            <BreadcrumbItem href="#" icon={<O9Icon svg={appsSvg} />}>Components</BreadcrumbItem>
            <BreadcrumbItem href="#">Navigation</BreadcrumbItem>
            <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
          </Breadcrumb>
        </ComponentDemo>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">
          Sizes
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Three size variants: <strong>sm</strong> (10px), <strong>md</strong> (12px, default), and <strong>lg</strong> (14px). Icon and separator scale proportionally.
        </p>
        <CodeExample code={`<Breadcrumb size="sm">…</Breadcrumb>\n<Breadcrumb size="md">…</Breadcrumb>\n<Breadcrumb size="lg">…</Breadcrumb>`}>
          <div className="space-y-4">
            {['sm', 'md', 'lg'].map((s) => (
              <div key={s}>
                <p className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary mb-2">{s.toUpperCase()}</p>
                <Breadcrumb size={s}>
                  <BreadcrumbItem href="#" icon={<O9Icon svg={homeAltSvg} />} aria-label="Home" />
                  <BreadcrumbItem href="#">Components</BreadcrumbItem>
                  <BreadcrumbItem href="#">Navigation</BreadcrumbItem>
                  <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
                </Breadcrumb>
              </div>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* Basic Usage */}
      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">
          Basic Usage
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          The last item is automatically styled as the current page (non-interactive, medium weight).
          Breadcrumb items use Link Secondary variant styles — hover shows info-blue underline.
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

      {/* Icon Variants */}
      <section className="mb-12">
        <h2 id="icon-variants" className="text-xl font-black tracking-tight text-text mb-2">
          Icon Variants
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Breadcrumb items support leading icons. Use icon-only for the root/home level, and icon + text for category levels.
        </p>

        <div className="space-y-6">
          <CodeExample label="Icon Only (root)" code={`<BreadcrumbItem href="#" icon={<O9Icon svg={homeAltSvg} />} aria-label="Home" />`}>
            <Breadcrumb>
              <BreadcrumbItem href="#" icon={<O9Icon svg={homeAltSvg} />} aria-label="Home" />
              <BreadcrumbItem href="#">Components</BreadcrumbItem>
              <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
            </Breadcrumb>
          </CodeExample>

          <CodeExample label="Icon + Text" code={`<BreadcrumbItem href="#" icon={<O9Icon svg={folderSvg} />}>Projects</BreadcrumbItem>`}>
            <Breadcrumb>
              <BreadcrumbItem href="#" icon={<O9Icon svg={homeAltSvg} />} aria-label="Home" />
              <BreadcrumbItem href="#" icon={<O9Icon svg={folderSvg} />}>Projects</BreadcrumbItem>
              <BreadcrumbItem href="#" icon={<O9Icon svg={fileSvg} />}>Documents</BreadcrumbItem>
              <BreadcrumbItem icon={<O9Icon svg={cogSvg} />}>Settings</BreadcrumbItem>
            </Breadcrumb>
          </CodeExample>

          <CodeExample label="Mixed (icon-only root + icon+text + text-only)">
            <Breadcrumb>
              <BreadcrumbItem href="#" icon={<O9Icon svg={homeAltSvg} />} aria-label="Home" />
              <BreadcrumbItem href="#" icon={<O9Icon svg={appsSvg} />}>Components</BreadcrumbItem>
              <BreadcrumbItem href="#" icon={<O9Icon svg={compassSvg} />}>Navigation</BreadcrumbItem>
              <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
            </Breadcrumb>
          </CodeExample>
        </div>
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
                <BreadcrumbItem href="#" icon={<O9Icon svg={homeAltSvg} />} aria-label="Home" />
                <BreadcrumbItem href="#">Section</BreadcrumbItem>
                <BreadcrumbItem>Page</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary mb-2">Slash</p>
              <Breadcrumb separator="slash">
                <BreadcrumbItem href="#" icon={<O9Icon svg={homeAltSvg} />} aria-label="Home" />
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
  <BreadcrumbItem href="#" icon={…} aria-label="Home" />
  <BreadcrumbItem href="#">Category</BreadcrumbItem>
  <BreadcrumbItem href="#">Subcategory</BreadcrumbItem>
  <BreadcrumbItem href="#">Section</BreadcrumbItem>
  <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumb>`}
        >
          <Breadcrumb maxItems={3}>
            <BreadcrumbItem href="#" icon={<O9Icon svg={homeAltSvg} />} aria-label="Home" />
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
            'Use an icon-only home item for the root level',
            'Use icon + text for category levels to add visual context',
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
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">
          Accessibility
        </h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses a <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">{'<nav>'}</code> element with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-label="Breadcrumb"</code>.</>,
            <>Uses an ordered list (<code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">{'<ol>'}</code>) to convey the hierarchical sequence.</>,
            'The current page item is rendered as a non-interactive span with font-medium.',
            'All ancestor items are links with focus ring for keyboard navigation.',
            <>Icon-only items should always have an <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-label</code> for screen reader access.</>,
            'Items follow Link Secondary variant styles — hover underlines in info-blue.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
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
