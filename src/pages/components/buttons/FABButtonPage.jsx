import { useState } from 'react';
import FABButton from '@/components/buttons/FABButton';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';

import plusSvg from '@/assets/icons/o9con-plus.svg?raw';
import pencilSvg from '@/assets/icons/o9con-pencil.svg?raw';
import commentSvg from '@/assets/icons/o9con-comment.svg?raw';
import binSvg from '@/assets/icons/o9con-bin.svg?raw';

const fabButtonProps = [
  {
    name: 'variant',
    type: "'primary' | 'danger'",
    default: "'primary'",
    description: 'Visual style variant',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Size of the FAB — sm (40px), md (48px), lg (56px)',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Icon element rendered inside the FAB (use o9con icons)',
  },
  {
    name: 'extended',
    type: 'boolean',
    default: 'false',
    description: 'When true, shows the label next to the icon in a pill shape',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the FAB is disabled',
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
    description: 'Label content (only visible when extended is true)',
  },
];

export default function FABButtonPage() {
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('md');
  const [extended, setExtended] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader
        title="FAB Button"
        description="The Floating Action Button (FAB) represents the single most prominent action on a screen. It appears in front of all content as a circular button with an icon, with an optional extended label."
        status="stable"
        category="Buttons & Actions"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">
          Interactive Demo
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Experiment with the FAB component using the controls below.
        </p>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Variant',
              value: variant,
              onChange: setVariant,
              options: ['primary', 'danger'],
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
              label: 'Extended',
              value: extended,
              onChange: setExtended,
            },
            {
              type: 'checkbox',
              label: 'Disabled',
              value: disabled,
              onChange: setDisabled,
            },
          ]}
        >
          <FABButton
            variant={variant}
            size={size}
            extended={extended}
            disabled={disabled}
            icon={<O9Icon svg={plusSvg} />}
          >
            Create
          </FABButton>
        </ComponentDemo>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">
          Variants
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Primary for the main action, Danger for destructive actions.
        </p>
        <CodeExample
          code={`import O9Icon from '@/components/O9Icon';
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';
import binSvg from '@/assets/icons/o9con-bin.svg?raw';

<FABButton variant="primary" icon={<O9Icon svg={plusSvg} />} />
<FABButton variant="danger" icon={<O9Icon svg={binSvg} />} />`}
        >
          <div className="flex flex-wrap items-center gap-6">
            <FABButton variant="primary" icon={<O9Icon svg={plusSvg} />} aria-label="Add" />
            <FABButton variant="danger" icon={<O9Icon svg={binSvg} />} aria-label="Delete" />
          </div>
        </CodeExample>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">
          Sizes
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Three sizes — Small (40px), Medium (48px), Large (56px). Icon scales proportionally via o9con tokens.
        </p>
        <CodeExample
          code={`<FABButton size="sm" icon={<O9Icon svg={plusSvg} />} />
<FABButton size="md" icon={<O9Icon svg={plusSvg} />} />
<FABButton size="lg" icon={<O9Icon svg={plusSvg} />} />`}
        >
          <div className="flex flex-wrap items-center gap-6">
            <FABButton size="sm" icon={<O9Icon svg={plusSvg} />} aria-label="Add" />
            <FABButton size="md" icon={<O9Icon svg={plusSvg} />} aria-label="Add" />
            <FABButton size="lg" icon={<O9Icon svg={plusSvg} />} aria-label="Add" />
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
                ['sm', '40 px', 'o9con-20', '20 px'],
                ['md', '48 px', 'o9con-24', '24 px'],
                ['lg', '56 px', 'o9con-28', '28 px'],
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

      {/* Extended FAB */}
      <section className="mb-12">
        <h2 id="extended" className="text-xl font-black tracking-tight text-text mb-2">
          Extended FAB
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          When extended, the FAB shows a text label alongside the icon in a pill shape.
        </p>
        <CodeExample
          code={`import O9Icon from '@/components/O9Icon';
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';
import pencilSvg from '@/assets/icons/o9con-pencil.svg?raw';
import commentSvg from '@/assets/icons/o9con-comment.svg?raw';

<FABButton extended icon={<O9Icon svg={plusSvg} />}>Create New</FABButton>
<FABButton extended icon={<O9Icon svg={pencilSvg} />}>Compose</FABButton>
<FABButton extended icon={<O9Icon svg={commentSvg} />}>New Chat</FABButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <FABButton extended icon={<O9Icon svg={plusSvg} />}>Create New</FABButton>
            <FABButton extended icon={<O9Icon svg={pencilSvg} />}>Compose</FABButton>
            <FABButton extended icon={<O9Icon svg={commentSvg} />}>New Chat</FABButton>
          </div>
        </CodeExample>
      </section>

      {/* Positioning Example */}
      <section className="mb-12">
        <h2 id="positioning" className="text-xl font-black tracking-tight text-text mb-2">
          Positioning
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          In production, FABs are typically fixed-positioned in the bottom-right corner.
        </p>
        <CodeExample
          code={`<div className="relative h-48">
  <FABButton
    className="absolute bottom-4 right-4"
    icon={<O9Icon svg={plusSvg} />}
  />
</div>`}
        >
          <div className="relative h-48 border border-border border-dashed bg-surface-overlay">
            <span className="absolute top-4 left-4 text-xs text-text-tertiary">Content area</span>
            <FABButton
              className="absolute bottom-4 right-4"
              icon={<O9Icon svg={plusSvg} />}
              aria-label="Add"
            />
          </div>
        </CodeExample>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">
          Usage Guidelines
        </h2>
        <DoDont
          doItems={[
            'Use a single FAB per screen for the most important action',
            'Use the extended variant when the icon alone is not clear enough',
            'Position in the bottom-right corner for easy thumb reach on mobile',
            'Use a prominent o9con icon (plus for create, pencil for compose)',
          ]}
          dontItems={[
            'Do not use more than one FAB per screen',
            'Avoid using FABs for minor or destructive actions',
            'Do not place FABs over critical content or navigation',
            'Avoid changing the FAB action based on scroll position',
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
            <>Non-extended FABs require an <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">aria-label</code> since there is no visible text.</>,
            'Extended FABs with text labels are self-documenting for screen readers.',
            <>Uses the native <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">&lt;button&gt;</code> element for full keyboard support.</>,
            'The elevated shadow provides visual distinction from surrounding content.',
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
        <PropsTable props={fabButtonProps} />
      </section>
    </article>
  );
}
