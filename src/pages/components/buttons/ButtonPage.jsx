import { useState } from 'react';
import Button from '@/components/buttons/Button';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';

/* ── o9con icons (raw SVG strings for inline rendering) ── */
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';
import arrowRightSvg from '@/assets/icons/o9con-arrow-right.svg?raw';
import downloadSvg from '@/assets/icons/o9con-download.svg?raw';
import starSvg from '@/assets/icons/o9con-star.svg?raw';

const buttonProps = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
    default: "'primary'",
    description: 'Visual style variant — ghost is fully transparent with no border',
  },
  {
    name: 'size',
    type: "'xm' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Size tier — xm (20px), sm (24px), md (32px), lg (36px)',
  },
  {
    name: 'leadingIcon',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Icon element rendered before the label (use o9con icons)',
  },
  {
    name: 'trailingIcon',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Icon element rendered after the label (use o9con icons)',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the button is disabled',
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
    description: 'Button label content',
  },
];

export default function ButtonPage() {
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader
        title="Button"
        description="Buttons allow users to take actions and make choices with a single tap. They communicate actions that users can take with clear visual hierarchy."
        status="stable"
        category="Buttons & Actions"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">
          Interactive Demo
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Experiment with the Button component using the controls below.
        </p>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Variant',
              value: variant,
              onChange: setVariant,
              options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
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
          <Button variant={variant} size={size} disabled={disabled}>
            Button Label
          </Button>
        </ComponentDemo>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">
          Variants
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Five visual variants to communicate hierarchy and intent.
        </p>
        <CodeExample
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </CodeExample>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">
          Sizes
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Four sizes mapped to the design system grid.
        </p>

        {/* Spec table */}
        <div className="border border-border mb-6 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border bg-surface-overlay">
                <th className="px-4 py-2 font-bold text-text-tertiary uppercase tracking-widest">Size</th>
                <th className="px-4 py-2 font-bold text-text-tertiary uppercase tracking-widest">Height</th>
                <th className="px-4 py-2 font-bold text-text-tertiary uppercase tracking-widest">Icon</th>
                <th className="px-4 py-2 font-bold text-text-tertiary uppercase tracking-widest">Font</th>
                <th className="px-4 py-2 font-bold text-text-tertiary uppercase tracking-widest">Padding L/R</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-border">
                <td className="px-4 py-2 font-mono text-text">xm</td>
                <td className="px-4 py-2">20px</td>
                <td className="px-4 py-2">o9con-14 (14px)</td>
                <td className="px-4 py-2">--font-size-10 · medium</td>
                <td className="px-4 py-2">6px</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-2 font-mono text-text">sm</td>
                <td className="px-4 py-2">24px</td>
                <td className="px-4 py-2">o9con-16 (16px)</td>
                <td className="px-4 py-2">--font-size-12</td>
                <td className="px-4 py-2">8px</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-2 font-mono text-text">md</td>
                <td className="px-4 py-2">32px</td>
                <td className="px-4 py-2">o9con-20 (20px)</td>
                <td className="px-4 py-2">--font-size-14</td>
                <td className="px-4 py-2">12px</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-text">lg</td>
                <td className="px-4 py-2">36px</td>
                <td className="px-4 py-2">o9con-24 (24px)</td>
                <td className="px-4 py-2">--font-size-16</td>
                <td className="px-4 py-2">14px</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeExample
          code={`<Button size="xm">Extra Mini</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button size="xm">Extra Mini</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </CodeExample>
      </section>

      {/* With Icons */}
      <section className="mb-12">
        <h2 id="with-icons" className="text-xl font-black tracking-tight text-text mb-2">
          With Icons
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Leading and trailing icon slots using <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">o9con</code> icons from the icon system.
          Icons auto-size per tier (o9con-14 → o9con-24).
        </p>
        <CodeExample
          code={`import O9Icon from '@/components/O9Icon';
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';
import arrowRightSvg from '@/assets/icons/o9con-arrow-right.svg?raw';

<Button leadingIcon={<O9Icon svg={plusSvg} />}>Create New</Button>
<Button trailingIcon={<O9Icon svg={arrowRightSvg} />}>Continue</Button>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button leadingIcon={<O9Icon svg={plusSvg} />}>Create New</Button>
            <Button trailingIcon={<O9Icon svg={arrowRightSvg} />}>Continue</Button>
            <Button leadingIcon={<O9Icon svg={downloadSvg} />} trailingIcon={<O9Icon svg={arrowRightSvg} />}>
              Download
            </Button>
          </div>
        </CodeExample>

        <h3 className="text-sm font-bold text-text mt-6 mb-3">Icons at Every Size</h3>
        <CodeExample
          code={`<Button size="xm" leadingIcon={<O9Icon svg={starSvg} />}>xm · o9con-14</Button>
<Button size="sm" leadingIcon={<O9Icon svg={starSvg} />}>sm · o9con-16</Button>
<Button size="md" leadingIcon={<O9Icon svg={starSvg} />}>md · o9con-20</Button>
<Button size="lg" leadingIcon={<O9Icon svg={starSvg} />}>lg · o9con-24</Button>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button size="xm" leadingIcon={<O9Icon svg={starSvg} />}>xm · o9con-14</Button>
            <Button size="sm" leadingIcon={<O9Icon svg={starSvg} />}>sm · o9con-16</Button>
            <Button size="md" leadingIcon={<O9Icon svg={starSvg} />}>md · o9con-20</Button>
            <Button size="lg" leadingIcon={<O9Icon svg={starSvg} />}>lg · o9con-24</Button>
          </div>
        </CodeExample>
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
          code={`<Button>Default</Button>
<Button disabled>Disabled</Button>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
          </div>
        </CodeExample>

        <div className="mt-5">
          <p className="text-xs font-bold tracking-widest uppercase text-text-tertiary mb-3">All Variants — Disabled State</p>
          <div className="flex flex-wrap items-center gap-4 border border-border bg-surface-overlay p-6">
            <Button variant="primary" disabled>Primary</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="outline" disabled>Outline</Button>
            <Button variant="ghost" disabled>Ghost</Button>
            <Button variant="danger" disabled>Danger</Button>
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
            'Use primary buttons for the single most important action on the page',
            'Use clear, verb-first labels: "Save changes", "Delete item", "Create new"',
            'Use outline or secondary buttons for lower-emphasis actions',
            'Pair danger buttons with a confirmation dialog for destructive actions',
          ]}
          dontItems={[
            'Do not place more than one primary button in a button group',
            'Avoid vague labels like "Click here", "OK", or "Submit"',
            'Do not disable buttons without explaining why the action is unavailable',
            'Avoid using danger variant for non-destructive actions',
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
            <>Uses the native <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">&lt;button&gt;</code> element for full keyboard and screen reader support.</>,
            <>Focus ring is visible only on keyboard navigation via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">:focus-visible</code>.</>,
            <>Disabled buttons use the native <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">disabled</code> attribute, preventing interaction and announcing state to assistive technologies.</>,
            'Color contrast ratios meet WCAG 2.1 AA requirements for all variants.',
            <>Supports <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">ref</code> forwarding for advanced focus management.</>,
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
          All standard HTML button attributes are supported via prop spreading.
        </p>
        <PropsTable props={buttonProps} />
      </section>
    </article>
  );
}
