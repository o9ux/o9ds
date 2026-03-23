import { useState } from 'react';
import Switch from '@/components/inputs/Switch';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const switchProps = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text displayed beside the switch' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Secondary helper text below the label' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Switch size — sm=28×16px track, md=36×20px track, lg=44×24px track' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the switch is non-interactive' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the switch is read-only (visible but not editable)' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Show error state with danger border' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown below the switch when error is true' },
  { name: 'checked', type: 'boolean', default: 'undefined', description: 'Controlled checked/on state' },
  { name: 'onChange', type: '(e: ChangeEvent) => void', default: 'undefined', description: 'Change handler' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function SwitchPage() {
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);
  const [readOnlyDemo, setReadOnlyDemo] = useState(false);
  const [errorDemo, setErrorDemo] = useState(false);
  const [demoChecked, setDemoChecked] = useState(true);

  return (
    <article>
      <PageHeader title="Switch" description="A binary toggle for settings that take immediate effect — no save action required. Use when the result of the toggle is instantly applied." status="stable" category="Input & Form Controls" />

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
          <Switch
            label="Enable notifications"
            description="Receive alerts for important updates."
            size={size}
            disabled={disabled}
            readOnly={readOnlyDemo}
            error={errorDemo}
            errorText={errorDemo ? 'This setting is required' : undefined}
            checked={demoChecked}
            onChange={(e) => setDemoChecked(e.target.checked)}
          />
        </ComponentDemo>
      </section>

      {/* Types */}
      <section className="mb-12">
        <h2 id="types" className="text-xl font-black tracking-tight text-text mb-2">Types</h2>
        <p className="text-sm text-text-secondary mb-4">Two switch states: off and on.</p>

        {/* Off */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Off</h3>
          <CodeExample code={`<Switch label="Label" />`}>
            <div className="flex items-start gap-8">
              <Switch label="Label" size="md" checked={false} onChange={() => {}} />
              <Switch label="Label" size="sm" checked={false} onChange={() => {}} />
            </div>
          </CodeExample>
        </div>

        {/* On */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">On</h3>
          <CodeExample code={`<Switch label="Label" checked />`}>
            <div className="flex items-start gap-8">
              <Switch label="Label" size="md" checked onChange={() => {}} />
              <Switch label="Label" size="sm" checked onChange={() => {}} />
            </div>
          </CodeExample>
        </div>

        {/* No Label */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">No Label</h3>
          <CodeExample code={`<Switch checked={false} />\n<Switch checked />`}>
            <div className="flex items-center gap-8">
              <Switch size="md" checked={false} onChange={() => {}} />
              <Switch size="md" checked onChange={() => {}} />
              <Switch size="sm" checked={false} onChange={() => {}} />
              <Switch size="sm" checked onChange={() => {}} />
            </div>
          </CodeExample>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">Three sizes: sm (28×16px), md (36×20px), and lg (44×24px).</p>
        <CodeExample code={`<Switch size="sm" label="Small switch (28×16)" />\n<Switch size="md" label="Medium switch (36×20)" />\n<Switch size="lg" label="Large switch (44×24)" />`}>
          <div className="flex flex-col gap-4">
            <Switch size="sm" label="Small switch (28×16)" checked onChange={() => {}} />
            <Switch size="md" label="Medium switch (36×20)" checked onChange={() => {}} />
            <Switch size="lg" label="Large switch (44×24)" checked onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <p className="text-sm text-text-secondary mb-4">Disabled, read-only, and error states.</p>
        <CodeExample code={`<Switch disabled label="Disabled off" />\n<Switch disabled checked label="Disabled on" />\n<Switch readOnly label="Read-only" />\n<Switch error errorText="Required setting" label="Error state" />`}>
          <div className="flex flex-col gap-3">
            <Switch label="Disabled off" disabled checked={false} onChange={() => {}} />
            <Switch label="Disabled on" disabled checked onChange={() => {}} />
            <Switch label="Read-only off" readOnly checked={false} onChange={() => {}} />
            <Switch label="Read-only on" readOnly checked onChange={() => {}} />
            <Switch label="Error state" error errorText="Required setting" checked={false} onChange={() => {}} />
            <Switch label="Error state on" error errorText="Required setting" checked onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use Switch for settings that take immediate binary effect (on/off, enable/disable)',
            'Use clear, concise labels that describe the setting being toggled',
            'Place the label to the right of the toggle for consistency',
            'Always provide a visible label for accessibility',
          ]}
          dontItems={[
            'Do not use Switch inside a form that requires a "Save" action — the visual implies immediacy',
            'Do not use for multi-select options — use Checkbox instead',
            'Avoid using Switch for mutually exclusive choices — use Radio instead',
            'Do not use without a label — the toggle alone is ambiguous',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            'Native <input type="checkbox" role="switch"> is used for full keyboard and screen reader support.',
            'Label is linked to the input via htmlFor/id for click-to-toggle behavior.',
            'Focus ring is shown on keyboard navigation (focus-visible).',
            'role="switch" communicates the toggle behavior to assistive technology.',
            'aria-invalid communicates error state to screen readers.',
            'aria-readonly communicates read-only state to assistive technology.',
            'aria-describedby links description and error text to the input.',
            'Error messages use role="alert" for live announcement.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary"><span className="mt-px text-text font-bold shrink-0">—</span>{item}</li>
          ))}
        </ul>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={switchProps} />
      </section>
    </article>
  );
}
