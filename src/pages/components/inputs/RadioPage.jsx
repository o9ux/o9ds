import { useState } from 'react';
import Radio from '@/components/inputs/Radio';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const radioProps = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text displayed beside the radio' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Secondary helper text below the label' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Radio size — sm=14px, md=16px, lg=18px' },
  { name: 'name', type: 'string', default: 'undefined', description: 'Group name for mutually exclusive selection' },
  { name: 'value', type: 'string', default: 'undefined', description: 'Value submitted when this option is selected' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the radio is non-interactive' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the radio is read-only (visible but not editable)' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Show error state with danger border' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown below the radio when error is true' },
  { name: 'checked', type: 'boolean', default: 'undefined', description: 'Controlled checked state' },
  { name: 'onChange', type: '(e: ChangeEvent) => void', default: 'undefined', description: 'Change handler' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function RadioPage() {
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);
  const [readOnlyDemo, setReadOnlyDemo] = useState(false);
  const [errorDemo, setErrorDemo] = useState(false);
  const [demoValue, setDemoValue] = useState('option-a');

  /* Vertical group */
  const [verticalValue, setVerticalValue] = useState('option-b');

  /* Horizontal group */
  const [horizontalValue, setHorizontalValue] = useState('option-a');

  return (
    <article>
      <PageHeader title="Radio" description="A single-select control used within a group of mutually exclusive options. Use when exactly one option must be chosen from a set." status="stable" category="Input & Form Controls" />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">Try different sizes and states.</p>
        <ComponentDemo controls={[
          { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
          { type: 'checkbox', label: 'Read-only', value: readOnlyDemo, onChange: setReadOnlyDemo },
          { type: 'checkbox', label: 'Error', value: errorDemo, onChange: setErrorDemo },
        ]}>
          <div className="flex flex-col gap-2">
            {[
              { value: 'option-a', label: 'Option A', description: 'Best for small teams.' },
              { value: 'option-b', label: 'Option B', description: 'Recommended for enterprise.' },
              { value: 'option-c', label: 'Option C' },
            ].map((opt) => (
              <Radio
                key={opt.value}
                name="demo-group"
                value={opt.value}
                label={opt.label}
                description={opt.description}
                size={size}
                disabled={disabled}
                readOnly={readOnlyDemo}
                error={errorDemo}
                errorText={errorDemo && demoValue !== opt.value ? 'Please select an option' : undefined}
                checked={demoValue === opt.value}
                onChange={(e) => setDemoValue(e.target.value)}
              />
            ))}
          </div>
        </ComponentDemo>
      </section>

      {/* Types */}
      <section className="mb-12">
        <h2 id="types" className="text-xl font-black tracking-tight text-text mb-2">Types</h2>
        <p className="text-sm text-text-secondary mb-4">Two radio states for selection patterns.</p>

        {/* Unchecked */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Unchecked</h3>
          <CodeExample code={`<Radio name="group" value="a" label="Label" />`}>
            <div className="flex items-start gap-8">
              <Radio name="type-uncheck" value="a" label="Label" size="lg" checked={false} onChange={() => {}} />
              <Radio name="type-uncheck-sm" value="a" label="Label" size="sm" checked={false} onChange={() => {}} />
            </div>
          </CodeExample>
        </div>

        {/* Checked */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Checked</h3>
          <CodeExample code={`<Radio name="group" value="a" label="Label" checked />`}>
            <div className="flex items-start gap-8">
              <Radio name="type-check" value="a" label="Label" size="lg" checked onChange={() => {}} />
              <Radio name="type-check-sm" value="a" label="Label" size="sm" checked onChange={() => {}} />
            </div>
          </CodeExample>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">Three sizes: sm (14px), md (16px), and lg (18px).</p>
        <CodeExample code={`<Radio size="sm" label="Small radio (14px)" />\n<Radio size="md" label="Medium radio (16px)" />\n<Radio size="lg" label="Large radio (18px)" />`}>
          <div className="flex flex-col gap-4">
            <Radio name="sizes" value="sm" size="sm" label="Small radio (14px)" checked onChange={() => {}} />
            <Radio name="sizes" value="md" size="md" label="Medium radio (16px)" checked onChange={() => {}} />
            <Radio name="sizes" value="lg" size="lg" label="Large radio (18px)" checked onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <p className="text-sm text-text-secondary mb-4">Disabled, read-only, and error states.</p>
        <CodeExample code={`<Radio disabled label="Disabled unchecked" />\n<Radio disabled checked label="Disabled checked" />\n<Radio readOnly label="Read-only" />\n<Radio error errorText="Selection required" label="Error state" />`}>
          <div className="flex flex-col gap-3">
            <Radio name="state-dis-un" label="Disabled unchecked" disabled checked={false} onChange={() => {}} />
            <Radio name="state-dis-ch" label="Disabled checked" disabled checked onChange={() => {}} />
            <Radio name="state-ro-un" label="Read-only unchecked" readOnly checked={false} onChange={() => {}} />
            <Radio name="state-ro-ch" label="Read-only checked" readOnly checked onChange={() => {}} />
            <Radio name="state-err-un" label="Error state" error errorText="Selection required" checked={false} onChange={() => {}} />
            <Radio name="state-err-ch" label="Error state checked" error errorText="Selection required" checked onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* Radio Group */}
      <section className="mb-12">
        <h2 id="group" className="text-xl font-black tracking-tight text-text mb-2">Radio Group</h2>
        <p className="text-sm text-text-secondary mb-4">Vertical and horizontal layouts for groups of radio buttons.</p>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Vertical</h3>
          <CodeExample code={`<div className="flex flex-col gap-2">\n  <Radio name="group" value="a" label="Option A" />\n  <Radio name="group" value="b" label="Option B" />\n  <Radio name="group" value="c" label="Option C" />\n</div>`}>
            <div className="flex gap-12">
              <div className="flex flex-col gap-2">
                {['Option A', 'Option B', 'Option C', 'Option D'].map((item) => (
                  <Radio
                    key={item}
                    name="vert-group"
                    value={item}
                    label={item}
                    size="lg"
                    checked={verticalValue === item}
                    onChange={(e) => setVerticalValue(e.target.value)}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {['Option A', 'Option B', 'Option C', 'Option D'].map((item) => (
                  <Radio
                    key={item}
                    name="vert-group-sm"
                    value={item}
                    label={item}
                    size="sm"
                    checked={verticalValue === item}
                    onChange={(e) => setVerticalValue(e.target.value)}
                  />
                ))}
              </div>
            </div>
          </CodeExample>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Horizontal</h3>
          <CodeExample code={`<div className="flex flex-wrap gap-4">\n  <Radio name="group" value="a" label="Option A" />\n  <Radio name="group" value="b" label="Option B" />\n  <Radio name="group" value="c" label="Option C" />\n</div>`}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-4">
                {['Option A', 'Option B', 'Option C', 'Option D'].map((item) => (
                  <Radio
                    key={item}
                    name="horiz-group"
                    value={item}
                    label={item}
                    size="lg"
                    checked={horizontalValue === item}
                    onChange={(e) => setHorizontalValue(e.target.value)}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {['Option A', 'Option B', 'Option C', 'Option D'].map((item) => (
                  <Radio
                    key={item}
                    name="horiz-group-sm"
                    value={item}
                    label={item}
                    size="sm"
                    checked={horizontalValue === item}
                    onChange={(e) => setHorizontalValue(e.target.value)}
                  />
                ))}
              </div>
            </div>
          </CodeExample>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use radio buttons for mutually exclusive choices — always provide at least two options',
            'Use within a group so users can compare all options at once',
            'Pre-select a default option when a sensible default exists',
            'Always provide a visible label for accessibility',
          ]}
          dontItems={[
            'Do not use for multi-select options — use Checkbox instead',
            'Do not use for yes/no questions where Switch is more intuitive',
            'Avoid using a single radio button — use Checkbox for standalone toggles',
            'Do not use for long lists of options — consider Select Dropdown instead',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            'Native <input type="radio"> is used for full keyboard and screen reader support.',
            'Label is linked to the input via htmlFor/id for click-to-select behavior.',
            'Focus ring is shown on keyboard navigation (focus-visible).',
            'aria-invalid communicates error state to screen readers.',
            'aria-readonly communicates read-only state to assistive technology.',
            'aria-describedby links description and error text to the input.',
            'Error messages use role="alert" for live announcement.',
            'Arrow keys navigate between radio options within a group (native behavior).',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary"><span className="mt-px text-text font-bold shrink-0">—</span>{item}</li>
          ))}
        </ul>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={radioProps} />
      </section>
    </article>
  );
}
