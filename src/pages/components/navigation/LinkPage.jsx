import { useState } from 'react';
import Link from '@/components/navigation/Link';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const linkProps = [
  {
    name: 'variant',
    type: "'default' | 'subtle' | 'standalone'",
    default: "'default'",
    description: 'Visual style — default (underlined), subtle (underline on hover), standalone (no decoration)',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Text size of the link',
  },
  {
    name: 'href',
    type: 'string',
    default: 'undefined',
    description: 'URL the link points to',
  },
  {
    name: 'external',
    type: 'boolean',
    default: 'false',
    description: 'Opens in new tab and shows external icon',
  },
  {
    name: 'leadingIcon',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Icon element rendered before the link text',
  },
  {
    name: 'trailingIcon',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Icon element rendered after the link text',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the link is disabled',
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
    description: 'Link text content',
  },
];

const DocIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 2h6l3 3v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
    <path d="M10 2v3h3M6 8h4M6 11h4" />
  </svg>
);

export default function LinkPage() {
  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('md');
  const [external, setExternal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader
        title="Link"
        description="Links are navigational elements that take users to another page, section, or resource. They are styled as inline text elements and can appear within body copy or as standalone navigation."
        status="stable"
        category="Navigation"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">
          Interactive Demo
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Experiment with the Link component using the controls below.
        </p>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Variant',
              value: variant,
              onChange: setVariant,
              options: ['default', 'subtle', 'standalone'],
            },
            {
              type: 'select',
              label: 'Size',
              value: size,
              onChange: setSize,
              options: ['sm', 'md', 'lg'],
            },
            {
              type: 'checkbox',
              label: 'External',
              value: external,
              onChange: setExternal,
            },
            {
              type: 'checkbox',
              label: 'Disabled',
              value: disabled,
              onChange: setDisabled,
            },
          ]}
        >
          <Link
            variant={variant}
            size={size}
            external={external}
            disabled={disabled}
            href="#"
          >
            Link Label
          </Link>
        </ComponentDemo>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">
          Variants
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Three variants for different contexts.
        </p>
        <CodeExample
          code={`<Link variant="default" href="#">Default Link</Link>
<Link variant="subtle" href="#">Subtle Link</Link>
<Link variant="standalone" href="#">Standalone Link</Link>`}
        >
          <div className="flex flex-wrap items-center gap-6">
            <Link variant="default" href="#">Default Link</Link>
            <Link variant="subtle" href="#">Subtle Link</Link>
            <Link variant="standalone" href="#">Standalone Link</Link>
          </div>
        </CodeExample>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">
          Sizes
        </h2>
        <CodeExample
          code={`<Link size="sm" href="#">Small</Link>
<Link size="md" href="#">Medium</Link>
<Link size="lg" href="#">Large</Link>`}
        >
          <div className="flex flex-wrap items-center gap-6">
            <Link size="sm" href="#">Small</Link>
            <Link size="md" href="#">Medium</Link>
            <Link size="lg" href="#">Large</Link>
          </div>
        </CodeExample>
      </section>

      {/* External Links */}
      <section className="mb-12">
        <h2 id="external" className="text-xl font-black tracking-tight text-text mb-2">
          External Links
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          External links automatically open in a new tab and display an external link icon.
        </p>
        <CodeExample
          code={`<Link href="https://example.com" external>
  Visit Documentation
</Link>`}
        >
          <Link href="https://example.com" external>
            Visit Documentation
          </Link>
        </CodeExample>
      </section>

      {/* With Icons */}
      <section className="mb-12">
        <h2 id="with-icons" className="text-xl font-black tracking-tight text-text mb-2">
          With Icons
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Add leading or trailing icons for visual emphasis.
        </p>
        <CodeExample
          code={`<Link href="#" leadingIcon={<DocIcon />}>
  View Documentation
</Link>`}
        >
          <Link href="#" leadingIcon={<DocIcon />}>
            View Documentation
          </Link>
        </CodeExample>
      </section>

      {/* Inline Usage */}
      <section className="mb-12">
        <h2 id="inline" className="text-xl font-black tracking-tight text-text mb-2">
          Inline Usage
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Links work inline within body text.
        </p>
        <div className="border border-border bg-surface-overlay p-6">
          <p className="text-sm text-text-secondary leading-relaxed">
            For more information on design tokens, see the{' '}
            <Link href="#" size="sm">Color Foundation</Link>{' '}
            page. External resources are available on the{' '}
            <Link href="https://example.com" size="sm" external>official documentation site</Link>.
          </p>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">
          Usage Guidelines
        </h2>
        <DoDont
          doItems={[
            'Use descriptive link text that tells users where they will go',
            'Use the external prop for links that navigate away from the application',
            'Use the subtle variant for secondary or less prominent links',
            'Match the link size to the surrounding text when used inline',
          ]}
          dontItems={[
            'Avoid generic link text like "click here" or "read more"',
            'Do not use links for actions — use a Button instead',
            'Avoid using links that look like buttons or vice versa',
            'Do not open internal links in new tabs',
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
            <>Uses the native <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">&lt;a&gt;</code> element for inherent link semantics.</>,
            <>External links include <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">target="_blank"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">rel="noopener noreferrer"</code> for security.</>,
            <>Disabled links use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">aria-disabled</code> and remove the href.</>,
            'Focus ring is visible on keyboard navigation.',
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
        <p className="text-sm text-text-secondary mb-4">
          All standard HTML anchor attributes are supported via prop spreading.
        </p>
        <PropsTable props={linkProps} />
      </section>
    </article>
  );
}
