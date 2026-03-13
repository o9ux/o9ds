import { useState } from 'react';
import IconButton from '@/components/buttons/IconButton';
import O9Icon from '@/components/O9Icon';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

/* o9con icons — imported as raw SVG strings */
import closeSvg from '@/assets/icons/o9con-close.svg?raw';
import pencilSvg from '@/assets/icons/o9con-pencil.svg?raw';
import binSvg from '@/assets/icons/o9con-bin.svg?raw';
import cogSvg from '@/assets/icons/o9con-cog.svg?raw';
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';
import starSvg from '@/assets/icons/o9con-star.svg?raw';
import searchSvg from '@/assets/icons/o9con-search.svg?raw';

const iconButtonProps = [
  {
    name: 'variant',
    type: "'primary' | 'tertiary' | 'outline' | 'danger'",
    default: "'primary'",
    description: 'Visual style variant of the icon button',
  },
  {
    name: 'size',
    type: "'xm' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Size — xm (20px), sm (24px), md (32px), lg (36px)',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Icon element to render inside the button',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the button is disabled',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: '—',
    description: 'Required accessible label (icon-only buttons need explicit labels)',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes to apply',
  },
];

export default function IconButtonPage() {
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader
        title="Icon Button"
        description="Icon buttons render a single icon without a text label. Use them for compact, recognizable actions like close, edit, or delete where the icon alone communicates the action."
        status="stable"
        category="Buttons & Actions"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">
          Interactive Demo
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Experiment with the Icon Button component using the controls below.
        </p>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Variant',
              value: variant,
              onChange: setVariant,
              options: ['primary', 'tertiary', 'outline', 'danger'],
            },
            {
              type: 'select',
              label: 'Size',
              value: size,
              onChange: setSize,
              options: ['xm', 'sm', 'md', 'lg'],
            },
            {
              type: 'checkbox',
              label: 'Disabled',
              value: disabled,
              onChange: setDisabled,
            },
          ]}
        >
          <IconButton
            variant={variant}
            size={size}
            disabled={disabled}
            aria-label="Close"
            icon={<O9Icon svg={closeSvg} />}
          />
        </ComponentDemo>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">
          Variants
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Four visual variants matching the Button component to communicate hierarchy and intent.
        </p>
        <CodeExample
          code={`import closeSvg from '@/assets/icons/o9con-close.svg?raw';
import cogSvg from '@/assets/icons/o9con-cog.svg?raw';
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';
import binSvg from '@/assets/icons/o9con-bin.svg?raw';

<IconButton variant="primary" icon={<O9Icon svg={closeSvg} />} aria-label="Close" />
<IconButton variant="tertiary" icon={<O9Icon svg={cogSvg} />} aria-label="Settings" />
<IconButton variant="outline" icon={<O9Icon svg={plusSvg} />} aria-label="Add" />
<IconButton variant="danger" icon={<O9Icon svg={binSvg} />} aria-label="Delete" />`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <IconButton variant="primary" icon={<O9Icon svg={closeSvg} />} aria-label="Close" />
            <IconButton variant="tertiary" icon={<O9Icon svg={cogSvg} />} aria-label="Settings" />
            <IconButton variant="outline" icon={<O9Icon svg={plusSvg} />} aria-label="Add" />
            <IconButton variant="danger" icon={<O9Icon svg={binSvg} />} aria-label="Delete" />
          </div>
        </CodeExample>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">
          Sizes
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Four sizes following the strict Figma spec. Icon scales proportionally within each size tier.
        </p>
        <CodeExample
          code={`<IconButton size="xm" icon={<O9Icon svg={closeSvg} />} aria-label="Close" />
<IconButton size="sm" icon={<O9Icon svg={closeSvg} />} aria-label="Close" />
<IconButton size="md" icon={<O9Icon svg={closeSvg} />} aria-label="Close" />
<IconButton size="lg" icon={<O9Icon svg={closeSvg} />} aria-label="Close" />`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <IconButton size="xm" icon={<O9Icon svg={closeSvg} />} aria-label="Close" />
            <IconButton size="sm" icon={<O9Icon svg={closeSvg} />} aria-label="Close" />
            <IconButton size="md" icon={<O9Icon svg={closeSvg} />} aria-label="Close" />
            <IconButton size="lg" icon={<O9Icon svg={closeSvg} />} aria-label="Close" />
          </div>
        </CodeExample>

        {/* Spec table */}
        <div className="mt-4 border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-overlay text-left text-text-tertiary">
                <th className="px-4 py-2 font-bold">Size</th>
                <th className="px-4 py-2 font-bold">Height</th>
                <th className="px-4 py-2 font-bold">Icon token</th>
                <th className="px-4 py-2 font-bold">Icon px</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ['xm', '20 px', 'o9con-14', '14 px'],
                ['sm', '24 px', 'o9con-16', '16 px'],
                ['md', '32 px', 'o9con-20', '20 px'],
                ['lg', '36 px', 'o9con-24', '24 px'],
              ].map(([sz, h, tok, ipx]) => (
                <tr key={sz} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-bold text-text">{sz}</td>
                  <td className="px-4 py-2">{h}</td>
                  <td className="px-4 py-2 font-mono">{tok}</td>
                  <td className="px-4 py-2">{ipx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Icons at Every Size */}
      <section className="mb-12">
        <h2 id="icons-at-every-size" className="text-xl font-black tracking-tight text-text mb-2">
          Icons at Every Size
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          All o9con icons scale correctly across the four size tiers.
        </p>
        <div className="border border-border bg-surface-overlay p-6 space-y-4">
          {(['xm', 'sm', 'md', 'lg']).map((sz) => (
            <div key={sz} className="flex items-center gap-3">
              <span className="w-8 text-xs font-bold text-text-tertiary">{sz}</span>
              <IconButton size={sz} variant="primary" icon={<O9Icon svg={closeSvg} />} aria-label="Close" />
              <IconButton size={sz} variant="tertiary" icon={<O9Icon svg={pencilSvg} />} aria-label="Edit" />
              <IconButton size={sz} variant="outline" icon={<O9Icon svg={plusSvg} />} aria-label="Add" />
              <IconButton size={sz} variant="danger" icon={<O9Icon svg={binSvg} />} aria-label="Delete" />
              <IconButton size={sz} variant="primary" icon={<O9Icon svg={searchSvg} />} aria-label="Search" />
              <IconButton size={sz} variant="tertiary" icon={<O9Icon svg={starSvg} />} aria-label="Favorite" />
              <IconButton size={sz} variant="outline" icon={<O9Icon svg={cogSvg} />} aria-label="Settings" />
            </div>
          ))}
        </div>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">
          States
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Default, hover, active, focus (keyboard only), and disabled states.
        </p>
        <CodeExample
          code={`<IconButton icon={<O9Icon svg={pencilSvg} />} aria-label="Edit" />
<IconButton icon={<O9Icon svg={pencilSvg} />} aria-label="Edit" disabled />`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <IconButton icon={<O9Icon svg={pencilSvg} />} aria-label="Edit" />
            <IconButton icon={<O9Icon svg={pencilSvg} />} aria-label="Edit" disabled />
          </div>
        </CodeExample>

        <div className="mt-5">
          <p className="text-xs font-bold tracking-widest uppercase text-text-tertiary mb-3">All Variants — Disabled State</p>
          <div className="flex flex-wrap items-center gap-4 border border-border bg-surface-overlay p-6">
            <IconButton variant="primary" icon={<O9Icon svg={closeSvg} />} aria-label="Close" disabled />
            <IconButton variant="tertiary" icon={<O9Icon svg={cogSvg} />} aria-label="Settings" disabled />
            <IconButton variant="outline" icon={<O9Icon svg={plusSvg} />} aria-label="Add" disabled />
            <IconButton variant="danger" icon={<O9Icon svg={binSvg} />} aria-label="Delete" disabled />
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">
          Usage Guidelines
        </h2>
        <DoDont
          doItems={[
            'Always provide an aria-label since there is no visible text',
            'Use universally recognized icons (close, edit, delete, search)',
            'Use icon buttons for repetitive or compact actions (toolbars, table rows)',
            'Pair with a Tooltip for less common icons to provide context',
            'Use o9con icons from the Icon system for consistency',
          ]}
          dontItems={[
            'Do not use icon buttons for primary page actions — use a regular Button with a label',
            'Avoid using obscure icons without a tooltip or aria-label',
            'Do not mix icon-only and labeled buttons in the same button group',
            'Avoid using danger variant for non-destructive actions',
            'Do not use custom/inline SVGs — use o9con icon tokens',
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
            <>An <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">aria-label</code> is required because icon buttons have no visible text label.</>,
            <>Uses the native <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">&lt;button&gt;</code> element for keyboard and screen reader support.</>,
            <>Focus ring is visible only on keyboard navigation via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">:focus-visible</code>.</>,
            'Disabled buttons use the native disabled attribute, removing them from the tab order.',
            <>Supports <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">ref</code> forwarding for advanced focus management.</>,
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
          All standard HTML button attributes are supported via prop spreading.
        </p>
        <PropsTable props={iconButtonProps} />
      </section>
    </article>
  );
}
