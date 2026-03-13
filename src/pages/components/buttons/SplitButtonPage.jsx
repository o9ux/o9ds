import { useState } from 'react';
import SplitButton from '@/components/buttons/SplitButton';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';

import saveAsSvg from '@/assets/icons/o9con-save-as.svg?raw';
import downloadSvg from '@/assets/icons/o9con-download.svg?raw';

const splitButtonProps = [
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
    description: 'Whether the entire split button is disabled',
  },
  {
    name: 'onClick',
    type: '() => void',
    default: 'undefined',
    description: 'Handler for the primary action click',
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
    description: 'Array of menu items for the dropdown portion',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Primary action label content',
  },
];

const sampleMenuItems = [
  { label: 'Save as Draft' },
  { label: 'Save & Close' },
  { label: 'Save as Template' },
];

export default function SplitButtonPage() {
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader
        title="Split Button"
        description="A split button separates a primary action from a dropdown of related secondary actions. The left section performs the default action; the right chevron opens a menu of alternatives."
        status="stable"
        category="Buttons & Actions"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">
          Interactive Demo
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Click the main area for the primary action, or the chevron for alternatives.
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
          <SplitButton
            variant={variant}
            size={size}
            disabled={disabled}
            menuItems={sampleMenuItems}
          >
            Save
          </SplitButton>
        </ComponentDemo>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">
          Variants
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          All standard button variants are supported with a visual divider between the action and the dropdown trigger.
        </p>
        <CodeExample
          code={`<SplitButton variant="primary" menuItems={items}>Save</SplitButton>
<SplitButton variant="tertiary" menuItems={items}>Save</SplitButton>
<SplitButton variant="outline" menuItems={items}>Save</SplitButton>
<SplitButton variant="danger" menuItems={items}>Delete</SplitButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <SplitButton variant="primary" menuItems={sampleMenuItems}>Save</SplitButton>
            <SplitButton variant="tertiary" menuItems={sampleMenuItems}>Save</SplitButton>
            <SplitButton variant="outline" menuItems={sampleMenuItems}>Save</SplitButton>
            <SplitButton variant="danger" menuItems={sampleMenuItems}>Delete</SplitButton>
          </div>
        </CodeExample>
      </section>

      {/* With Leading Icon */}
      <section className="mb-12">
        <h2 id="with-icon" className="text-xl font-black tracking-tight text-text mb-2">
          With Leading Icon
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Add a leading icon from the o9con Icon system to reinforce the primary action.
        </p>
        <CodeExample
          code={`import O9Icon from '@/components/O9Icon';
import saveAsSvg from '@/assets/icons/o9con-save-as.svg?raw';

<SplitButton leadingIcon={<O9Icon svg={saveAsSvg} />} menuItems={items}>
  Save
</SplitButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <SplitButton leadingIcon={<O9Icon svg={saveAsSvg} />} menuItems={sampleMenuItems}>
              Save
            </SplitButton>
            <SplitButton variant="outline" leadingIcon={<O9Icon svg={downloadSvg} />} menuItems={sampleMenuItems}>
              Export
            </SplitButton>
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
          code={`<SplitButton size="xm" menuItems={items}>Extra Mini</SplitButton>
<SplitButton size="sm" menuItems={items}>Small</SplitButton>
<SplitButton size="md" menuItems={items}>Medium</SplitButton>
<SplitButton size="lg" menuItems={items}>Large</SplitButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <SplitButton size="xm" menuItems={sampleMenuItems}>Extra Mini</SplitButton>
            <SplitButton size="sm" menuItems={sampleMenuItems}>Small</SplitButton>
            <SplitButton size="md" menuItems={sampleMenuItems}>Medium</SplitButton>
            <SplitButton size="lg" menuItems={sampleMenuItems}>Large</SplitButton>
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
            'Use when there is a clear default action with related alternatives',
            'Make the primary (left) action the most commonly used option',
            'Keep dropdown items related to the primary action',
            'Use the split button when saving with variants (Save, Save as Draft, Save & Close)',
            'Use o9con icons from the Icon system for leading icons',
          ]}
          dontItems={[
            'Do not use when all actions are equally important — use a Button Group instead',
            'Avoid placing unrelated actions in the dropdown',
            'Do not nest split buttons inside other composite components',
            'Avoid using split buttons for navigation actions',
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
            'Both the main action and the dropdown trigger are independently focusable.',
            <>The dropdown trigger uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">aria-expanded</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">aria-haspopup</code>.</>,
            <>The dropdown trigger has an <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">aria-label="More options"</code> for screen readers.</>,
            'The visual divider provides clear separation between the two interactive zones.',
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
        <PropsTable props={splitButtonProps} />
      </section>
    </article>
  );
}
