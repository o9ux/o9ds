import { useState } from 'react';
import Link from '@/components/navigation/Link';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';

import fileSvg from '@/assets/icons/o9con-file-o.svg?raw';
import homeSvg from '@/assets/icons/o9con-home.svg?raw';
import settingSvg from '@/assets/icons/o9con-setting-edit.svg?raw';
import downloadSvg from '@/assets/icons/o9con-download.svg?raw';
import linkSvg from '@/assets/icons/o9con-link.svg?raw';

const linkProps = [
  {
    name: 'variant',
    type: "'primary' | 'secondary'",
    default: "'primary'",
    description: 'Primary uses info-dark blue text; Secondary uses default text color.',
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
    description: 'Opens in new tab and shows external link icon',
  },
  {
    name: 'leadingIcon',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Icon element rendered before the link text',
  },
  {
    name: 'linkIcon',
    type: 'boolean',
    default: 'false',
    description: 'Shows the external link trailing icon without opening in a new tab',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the link is disabled',
  },
  {
    name: 'tooltip',
    type: 'string',
    default: 'undefined',
    description: 'Tooltip text shown on hover. Wraps the link in a Tooltip component.',
  },
  {
    name: 'tooltipPlacement',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
    description: 'Placement of the tooltip relative to the link',
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
    description: 'Link text content. Omit for icon-only links.',
  },
];

export default function LinkPage() {
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('md');
  const [external, setExternal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [linkIcon, setLinkIcon] = useState(false);

  return (
    <article>
      <PageHeader
        title="Link"
        description="Links are navigational elements that take users to another page, section, or resource. Available in Primary (info blue) and Secondary (default text) variants with full state support including hover, active, focus, visited, and disabled."
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
              options: ['primary', 'secondary'],
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
              label: 'Link Icon',
              value: linkIcon,
              onChange: setLinkIcon,
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
            linkIcon={linkIcon}
            disabled={disabled}
            href="#"
            leadingIcon={<O9Icon svg={fileSvg} />}
            tooltip="Navigate to documentation"
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
          Primary links use info-blue color for navigational emphasis. Secondary links blend with body text using the default text color. Both variants share the same hover (info blue), active (medium weight), focus (ring), and visited (purple) states.
        </p>
        <CodeExample
          code={`<Link variant="primary" href="#">Primary Link</Link>
<Link variant="secondary" href="#">Secondary Link</Link>`}
        >
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <Link variant="primary" href="#">Primary Link</Link>
              <span className="text-2xs text-text-tertiary">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Link variant="secondary" href="#">Secondary Link</Link>
              <span className="text-2xs text-text-tertiary">Secondary</span>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* Link Compositions */}
      <section className="mb-12">
        <h2 id="compositions" className="text-xl font-black tracking-tight text-text mb-2">
          Link Compositions
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Links support five content arrangements combining leading icons, text, and link icons.
        </p>

        <div className="space-y-6">
          {/* Primary compositions */}
          <CodeExample label="Primary Variant" code={`{/* Leading Icon Only */}
<Link href="#" leadingIcon={<O9Icon svg={homeSvg} />} />

{/* Leading Icon + Text */}
<Link href="#" leadingIcon={<O9Icon svg={homeSvg} />}>Dashboard</Link>

{/* Leading Icon + Text + Link Icon */}
<Link href="#" leadingIcon={<O9Icon svg={fileSvg} />} linkIcon>Documentation</Link>

{/* Text Only */}
<Link href="#">Learn more</Link>

{/* Text + Link Icon */}
<Link href="#" linkIcon>View details</Link>`}>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex flex-col items-center gap-1.5">
                <Link variant="primary" href="#" leadingIcon={<O9Icon svg={homeSvg} />} tooltip="Home" />
                <span className="text-2xs text-text-tertiary">Icon Only</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Link variant="primary" href="#" leadingIcon={<O9Icon svg={homeSvg} />}>Dashboard</Link>
                <span className="text-2xs text-text-tertiary">Icon + Text</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Link variant="primary" href="#" leadingIcon={<O9Icon svg={fileSvg} />} linkIcon>Documentation</Link>
                <span className="text-2xs text-text-tertiary">Icon + Text + Link</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Link variant="primary" href="#">Learn more</Link>
                <span className="text-2xs text-text-tertiary">Text Only</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Link variant="primary" href="#" linkIcon>View details</Link>
                <span className="text-2xs text-text-tertiary">Text + Link</span>
              </div>
            </div>
          </CodeExample>

          {/* Secondary compositions */}
          <CodeExample label="Secondary Variant">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex flex-col items-center gap-1.5">
                <Link variant="secondary" href="#" leadingIcon={<O9Icon svg={settingSvg} />} tooltip="Settings" />
                <span className="text-2xs text-text-tertiary">Icon Only</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Link variant="secondary" href="#" leadingIcon={<O9Icon svg={settingSvg} />}>Settings</Link>
                <span className="text-2xs text-text-tertiary">Icon + Text</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Link variant="secondary" href="#" leadingIcon={<O9Icon svg={downloadSvg} />} linkIcon>Download</Link>
                <span className="text-2xs text-text-tertiary">Icon + Text + Link</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Link variant="secondary" href="#">Read more</Link>
                <span className="text-2xs text-text-tertiary">Text Only</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Link variant="secondary" href="#" linkIcon>Open page</Link>
                <span className="text-2xs text-text-tertiary">Text + Link</span>
              </div>
            </div>
          </CodeExample>
        </div>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">
          States
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Both variants share a consistent state model. Hover to see underline + info color, press for active weight, use Tab for focus ring, and the disabled state grays out the link.
        </p>
        <CodeExample
          code={`{/* Default */}  <Link href="#">Default</Link>
{/* Hover */}    text turns info blue with underline
{/* Active */}   medium font weight
{/* Focus */}    focus ring matching Button component
{/* Visited */}  text turns purple (#7433CC)
{/* Disabled */} <Link href="#" disabled>Disabled</Link>`}
        >
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col items-center gap-1.5">
              <Link variant="primary" href="#">Default</Link>
              <span className="text-2xs text-text-tertiary">Default</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-sm text-info-hover underline underline-offset-2">Hover</span>
              <span className="text-2xs text-text-tertiary">Hover</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-sm text-info font-medium">Active</span>
              <span className="text-2xs text-text-tertiary">Active</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-sm text-info ring-1 ring-interactive-border ring-offset-1 ring-offset-surface px-0.5">Focus</span>
              <span className="text-2xs text-text-tertiary">Focus</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-sm text-utility-purple">Visited</span>
              <span className="text-2xs text-text-tertiary">Visited</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Link variant="primary" href="#" disabled>Disabled</Link>
              <span className="text-2xs text-text-tertiary">Disabled</span>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">
          Sizes
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Three text sizes to match surrounding content hierarchy.
        </p>
        <CodeExample
          code={`<Link size="sm" href="#">Small</Link>
<Link size="md" href="#">Medium</Link>
<Link size="lg" href="#">Large</Link>`}
        >
          <div className="flex flex-wrap items-center gap-6">
            {['sm', 'md', 'lg'].map((s) => (
              <div key={s} className="flex flex-col items-center gap-1.5">
                <Link size={s} href="#" leadingIcon={<O9Icon svg={fileSvg} />} linkIcon>
                  {s === 'sm' ? 'Small' : s === 'md' ? 'Medium' : 'Large'}
                </Link>
                <span className="text-2xs text-text-tertiary">{s.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* External Links */}
      <section className="mb-12">
        <h2 id="external" className="text-xl font-black tracking-tight text-text mb-2">
          External Links
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          External links automatically open in a new tab and display a trailing link icon.
        </p>
        <CodeExample
          code={`<Link href="https://example.com" external>
  Visit Documentation
</Link>`}
        >
          <div className="flex flex-wrap items-center gap-6">
            <Link variant="primary" href="https://example.com" external>Visit Documentation</Link>
            <Link variant="secondary" href="https://example.com" external>External Resource</Link>
          </div>
        </CodeExample>
      </section>

      {/* With Tooltip */}
      <section className="mb-12">
        <h2 id="tooltip" className="text-xl font-black tracking-tight text-text mb-2">
          With Tooltip
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Add <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">tooltip</code> to show
          contextual information on hover. Useful for icon-only links or abbreviated labels.
        </p>
        <CodeExample
          code={`<Link href="#" leadingIcon={…} tooltip="Go to Dashboard" />
<Link href="#" tooltip="View documentation" tooltipPlacement="bottom">Docs</Link>`}
        >
          <div className="flex flex-wrap items-center gap-8">
            <Link variant="primary" href="#" leadingIcon={<O9Icon svg={homeSvg} />} tooltip="Go to Dashboard" />
            <Link variant="primary" href="#" leadingIcon={<O9Icon svg={fileSvg} />} tooltip="Open file browser" />
            <Link variant="secondary" href="#" tooltip="View documentation" tooltipPlacement="bottom">Docs</Link>
            <Link variant="primary" href="#" leadingIcon={<O9Icon svg={linkSvg} />} linkIcon tooltip="Copy link to clipboard">Copy Link</Link>
          </div>
        </CodeExample>
      </section>

      {/* Inline Usage */}
      <section className="mb-12">
        <h2 id="inline" className="text-xl font-black tracking-tight text-text mb-2">
          Inline Usage
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Links work inline within body text. Primary variant stands out in copy, while Secondary blends in.
        </p>
        <div className="border border-border bg-surface-overlay p-6 space-y-3">
          <p className="text-sm text-text-secondary leading-relaxed">
            For more information on design tokens, see the{' '}
            <Link href="#" size="sm">Color Foundation</Link>{' '}
            page. External resources are available on the{' '}
            <Link href="https://example.com" size="sm" external>official documentation site</Link>.
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Review the{' '}
            <Link variant="secondary" href="#" size="sm">component guidelines</Link>{' '}
            before implementing new patterns.
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
            'Use Primary variant for navigational links that need visual emphasis',
            'Use Secondary variant for in-context links that blend with body text',
            'Use descriptive link text that tells users where they will go',
            'Use the external prop for links that navigate away from the application',
            'Add tooltips for icon-only links to provide accessible context',
            'Match the link size to the surrounding text when used inline',
          ]}
          dontItems={[
            'Avoid generic link text like "click here" or "read more"',
            'Do not use links for actions — use a Button instead',
            'Avoid using links that look like buttons or vice versa',
            'Do not open internal links in new tabs',
            'Do not use tooltips to display critical information — it must be visible without hover',
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
            <>Uses the native <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">{'<a>'}</code> element for inherent link semantics.</>,
            <>External links include <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">target="_blank"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">rel="noopener noreferrer"</code> for security.</>,
            <>Disabled links use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-disabled</code> and remove the href to prevent navigation.</>,
            <>Focus ring matches Button component — <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">ring-1 ring-interactive-border ring-offset-1</code>.</>,
            'Visited state uses a distinct purple color for clear visual feedback.',
            'Tooltip wraps the link in a Tooltip component providing additional context on hover/focus.',
            'Icon-only links should always have a tooltip or aria-label for screen reader access.',
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
        <p className="text-sm text-text-secondary mb-4">
          All standard HTML anchor attributes are supported via prop spreading.
        </p>
        <PropsTable props={linkProps} />
      </section>
    </article>
  );
}
