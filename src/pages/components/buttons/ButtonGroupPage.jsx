import { useState } from 'react';
import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import ButtonGroup from '@/components/buttons/ButtonGroup';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';

import alignLeftSvg from '@/assets/icons/o9con-align-left.svg?raw';
import alignCenterSvg from '@/assets/icons/o9con-align-center.svg?raw';
import alignRightSvg from '@/assets/icons/o9con-align-right.svg?raw';
import boldSvg from '@/assets/icons/o9con-bold.svg?raw';
import copySvg from '@/assets/icons/o9con-copy.svg?raw';

const buttonGroupProps = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Direction in which buttons are laid out',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes to apply to the group container',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Button elements to group together',
  },
];

export default function ButtonGroupPage() {
  const [orientation, setOrientation] = useState('horizontal');

  return (
    <article>
      <PageHeader
        title="Button Group"
        description="Button Group combines related buttons into a single, connected row or column. Use it for segmented controls, toolbar actions, or any set of related actions that should appear as a unified control."
        status="stable"
        category="Buttons & Actions"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">
          Interactive Demo
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Toggle orientation between horizontal and vertical layout.
        </p>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Orientation',
              value: orientation,
              onChange: setOrientation,
              options: ['horizontal', 'vertical'],
            },
          ]}
        >
          <ButtonGroup orientation={orientation}>
            <Button variant="outline">Left</Button>
            <Button variant="outline">Center</Button>
            <Button variant="outline">Right</Button>
          </ButtonGroup>
        </ComponentDemo>
      </section>

      {/* With Text Buttons */}
      <section className="mb-12">
        <h2 id="text-buttons" className="text-xl font-black tracking-tight text-text mb-2">
          With Text Buttons
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Group standard buttons for related actions.
        </p>
        <CodeExample
          code={`<ButtonGroup>
  <Button variant="outline">Copy</Button>
  <Button variant="outline">Cut</Button>
  <Button variant="outline">Paste</Button>
</ButtonGroup>`}
        >
          <ButtonGroup>
            <Button variant="outline">Copy</Button>
            <Button variant="outline">Cut</Button>
            <Button variant="outline">Paste</Button>
          </ButtonGroup>
        </CodeExample>
      </section>

      {/* With Icon Buttons */}
      <section className="mb-12">
        <h2 id="icon-buttons" className="text-xl font-black tracking-tight text-text mb-2">
          With Icon Buttons
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Group icon buttons using o9con icons for compact toolbar controls like text alignment.
        </p>
        <CodeExample
          code={`import O9Icon from '@/components/O9Icon';
import alignLeftSvg from '@/assets/icons/o9con-align-left.svg?raw';
import alignCenterSvg from '@/assets/icons/o9con-align-center.svg?raw';
import alignRightSvg from '@/assets/icons/o9con-align-right.svg?raw';

<ButtonGroup>
  <IconButton variant="outline" icon={<O9Icon svg={alignLeftSvg} />} aria-label="Align left" />
  <IconButton variant="outline" icon={<O9Icon svg={alignCenterSvg} />} aria-label="Align center" />
  <IconButton variant="outline" icon={<O9Icon svg={alignRightSvg} />} aria-label="Align right" />
</ButtonGroup>`}
        >
          <ButtonGroup>
            <IconButton variant="outline" icon={<O9Icon svg={alignLeftSvg} />} aria-label="Align left" />
            <IconButton variant="outline" icon={<O9Icon svg={alignCenterSvg} />} aria-label="Align center" />
            <IconButton variant="outline" icon={<O9Icon svg={alignRightSvg} />} aria-label="Align right" />
          </ButtonGroup>
        </CodeExample>
      </section>

      {/* Vertical */}
      <section className="mb-12">
        <h2 id="vertical" className="text-xl font-black tracking-tight text-text mb-2">
          Vertical Orientation
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Stack buttons vertically for sidebar or panel layouts.
        </p>
        <CodeExample
          code={`<ButtonGroup orientation="vertical">
  <Button variant="outline">Option A</Button>
  <Button variant="outline">Option B</Button>
  <Button variant="outline">Option C</Button>
</ButtonGroup>`}
        >
          <ButtonGroup orientation="vertical">
            <Button variant="outline">Option A</Button>
            <Button variant="outline">Option B</Button>
            <Button variant="outline">Option C</Button>
          </ButtonGroup>
        </CodeExample>
      </section>

      {/* Mixed sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">
          Size Tiers
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Button groups work across all four size tiers. Always use the same size for all buttons in a group.
        </p>
        <div className="border border-border bg-surface-overlay p-6 space-y-4">
          {(['xm', 'sm', 'md', 'lg']).map((sz) => (
            <div key={sz} className="flex items-center gap-3">
              <span className="w-8 text-xs font-bold text-text-tertiary">{sz}</span>
              <ButtonGroup>
                <IconButton size={sz} variant="outline" icon={<O9Icon svg={alignLeftSvg} />} aria-label="Align left" />
                <IconButton size={sz} variant="outline" icon={<O9Icon svg={alignCenterSvg} />} aria-label="Align center" />
                <IconButton size={sz} variant="outline" icon={<O9Icon svg={alignRightSvg} />} aria-label="Align right" />
              </ButtonGroup>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">
          Usage Guidelines
        </h2>
        <DoDont
          doItems={[
            'Group buttons that share a common context or control related options',
            'Use the same variant for all buttons in a group for visual consistency',
            'Use the same size for all buttons in a group',
            'Use icon-only groups with o9con icons for toolbar controls with limited space',
          ]}
          dontItems={[
            'Do not mix primary and danger variants in the same group',
            'Avoid placing more than 5 buttons in a single group',
            'Do not group unrelated actions together',
            'Avoid mixing text and icon-only buttons in the same group',
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
            <>The container uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">role="group"</code> to communicate the relationship between buttons.</>,
            'Each button remains independently focusable via Tab.',
            'All standard button accessibility features are preserved.',
            <>Add an <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-white">aria-label</code> to the group container to describe the group purpose.</>,
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
          ButtonGroup is a layout wrapper. Child buttons retain all their own props.
        </p>
        <PropsTable props={buttonGroupProps} />
      </section>
    </article>
  );
}
