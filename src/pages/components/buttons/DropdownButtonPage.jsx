import { useState } from 'react';
import DropdownButton from '@/components/buttons/DropdownButton';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';

import plusSvg from '@/assets/icons/o9con-plus.svg?raw';
import downloadSvg from '@/assets/icons/o9con-download.svg?raw';

const dropdownButtonProps = [
  {
    name: 'variant',
    type: "'primary' | 'tertiary' | 'outline' | 'danger'",
    default: "'primary'",
    description: 'Visual style variant',
  },
  {
    name: 'size',
    type: "'xm' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Size — xm (20px), sm (24px), md (32px), lg (36px)',
  },
  {
    name: 'leadingIcon',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Icon element rendered before the label',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the button is disabled',
  },
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled open state of the dropdown menu',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Callback when the dropdown open state changes',
  },
  {
    name: 'menuItems',
    type: 'Array<{ label: string, onClick?: () => void, disabled?: boolean }>',
    default: '[]',
    description: 'Array of menu items to display in the dropdown',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Button label content',
  },
];

const sampleMenuItems = [
  { label: 'Option A' },
  { label: 'Option B' },
  { label: 'Option C' },
];

export default function DropdownButtonPage() {
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader
        title="Dropdown Button"
        description="A button with an integrated dropdown chevron that reveals a list of actions when clicked. Use it when a single button needs to expose multiple related options."
        status="stable"
        category="Buttons & Actions"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">
          Interactive Demo
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Click the button to open the dropdown menu.
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
          <DropdownButton
            variant={variant}
            size={size}
            disabled={disabled}
            menuItems={sampleMenuItems}
          >
            Actions
          </DropdownButton>
        </ComponentDemo>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">
          Variants
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          All button variants support the dropdown pattern.
        </p>
        <CodeExample
          code={`<DropdownButton variant="primary" menuItems={items}>Primary</DropdownButton>
<DropdownButton variant="tertiary" menuItems={items}>Tertiary</DropdownButton>
<DropdownButton variant="outline" menuItems={items}>Outline</DropdownButton>
<DropdownButton variant="danger" menuItems={items}>Danger</DropdownButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <DropdownButton variant="primary" menuItems={sampleMenuItems}>Primary</DropdownButton>
            <DropdownButton variant="tertiary" menuItems={sampleMenuItems}>Tertiary</DropdownButton>
            <DropdownButton variant="outline" menuItems={sampleMenuItems}>Outline</DropdownButton>
            <DropdownButton variant="danger" menuItems={sampleMenuItems}>Danger</DropdownButton>
          </div>
        </CodeExample>
      </section>

      {/* With Leading Icon */}
      <section className="mb-12">
        <h2 id="with-icon" className="text-xl font-black tracking-tight text-text mb-2">
          With Leading Icon
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Add a leading icon from the o9con Icon system for additional visual context alongside the label and chevron.
        </p>
        <CodeExample
          code={`import O9Icon from '@/components/O9Icon';
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';

<DropdownButton leadingIcon={<O9Icon svg={plusSvg} />} menuItems={items}>
  Create New
</DropdownButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <DropdownButton leadingIcon={<O9Icon svg={plusSvg} />} menuItems={sampleMenuItems}>
              Create New
            </DropdownButton>
            <DropdownButton variant="outline" leadingIcon={<O9Icon svg={downloadSvg} />} menuItems={sampleMenuItems}>
              Export
            </DropdownButton>
          </div>
        </CodeExample>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">
          Sizes
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Four sizes matching the standard Button size spec.
        </p>
        <CodeExample
          code={`<DropdownButton size="xm" menuItems={items}>Extra Mini</DropdownButton>
<DropdownButton size="sm" menuItems={items}>Small</DropdownButton>
<DropdownButton size="md" menuItems={items}>Medium</DropdownButton>
<DropdownButton size="lg" menuItems={items}>Large</DropdownButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <DropdownButton size="xm" menuItems={sampleMenuItems}>Extra Mini</DropdownButton>
            <DropdownButton size="sm" menuItems={sampleMenuItems}>Small</DropdownButton>
            <DropdownButton size="md" menuItems={sampleMenuItems}>Medium</DropdownButton>
            <DropdownButton size="lg" menuItems={sampleMenuItems}>Large</DropdownButton>
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
                <th className="px-4 py-2 font-bold">Font</th>
                <th className="px-4 py-2 font-bold">Padding</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ['xm', '20 px', 'o9con-14', '--font-size-10', '6 px'],
                ['sm', '24 px', 'o9con-16', '--font-size-12', '8 px'],
                ['md', '32 px', 'o9con-20', '--font-size-14', '12 px'],
                ['lg', '36 px', 'o9con-24', '--font-size-16', '14 px'],
              ].map(([sz, h, tok, font, pad]) => (
                <tr key={sz} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-bold text-text">{sz}</td>
                  <td className="px-4 py-2">{h}</td>
                  <td className="px-4 py-2 font-mono">{tok}</td>
                  <td className="px-4 py-2 font-mono">{font}</td>
                  <td className="px-4 py-2">{pad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">
          Usage Guidelines
        </h2>
        <DoDont
          doItems={[
            'Use when a single action has multiple sub-options',
            'Keep menu items concise and action-oriented',
            'Use leading icons from the o9con Icon system to clarify the primary action',
            'Close the dropdown when an item is selected or the user clicks outside',
          ]}
          dontItems={[
            'Do not use for navigation — use a nav menu or links instead',
            'Avoid placing too many items in the dropdown (max 7-8)',
            'Do not nest dropdown menus inside dropdown menus',
            'Avoid using a dropdown when there is only one action',
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
            <>Uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">aria-expanded</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">aria-haspopup</code> to communicate the dropdown state.</>,
            'The chevron icon rotates 180 degrees when open, providing visual feedback.',
            'Menu closes on outside click for intuitive interaction.',
            'Disabled state prevents opening the dropdown and removes from tab order.',
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
          Composes the standard Button component with dropdown behavior. All Button props are forwarded.
        </p>
        <PropsTable props={dropdownButtonProps} />
      </section>
    </article>
  );
}
