import { useState } from 'react';
import Checkbox from '@/components/inputs/Checkbox';
import Radio from '@/components/inputs/Radio';
import Switch from '@/components/inputs/Switch';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const checkboxProps = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text displayed beside the checkbox' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Secondary helper text below the label' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Visual-only partial check state for parent group checkboxes' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the checkbox is non-interactive' },
  { name: 'checked', type: 'boolean', default: 'undefined', description: 'Controlled checked state' },
  { name: 'onChange', type: '(e: ChangeEvent) => void', default: '—', description: 'Change handler' },
];

const switchProps = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Label beside the toggle' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Helper text below the label' },
  { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Track size' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the switch is non-interactive' },
  { name: 'checked', type: 'boolean', default: 'undefined', description: 'Controlled checked/on state' },
  { name: 'onChange', type: '(e: ChangeEvent) => void', default: '—', description: 'Change handler' },
];

export default function CheckboxRadioPage() {
  const [cb1, setCb1] = useState(false);
  const [cb2, setCb2] = useState(true);
  const [radio, setRadio] = useState('option-a');
  const [sw1, setSw1] = useState(false);
  const [sw2, setSw2] = useState(true);

  return (
    <article>
      <PageHeader
        title="Checkbox, Radio & Switch"
        description="Binary and single-selection controls for forms — Checkbox for multi-select, Radio for single-select within a group, and Switch for instant boolean toggles."
        status="stable"
        category="Input & Form Controls"
      />

      {/* ─── CHECKBOX ─── */}
      <section className="mb-12">
        <h2 id="checkbox" className="text-xl font-black tracking-tight text-text mb-2">Checkbox</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use checkboxes for multi-select options where each item is independently toggled.
        </p>

        <CodeExample code={`<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>`}>
          <div className="space-y-3">
            <Checkbox
              label="Accept terms and conditions"
              checked={cb1}
              onChange={(e) => setCb1(e.target.checked)}
            />
            <Checkbox
              label="Subscribe to newsletter"
              description="Receive weekly product updates and announcements."
              checked={cb2}
              onChange={(e) => setCb2(e.target.checked)}
            />
            <Checkbox label="Disabled option" disabled />
            <Checkbox label="Disabled checked" disabled checked onChange={() => {}} />
          </div>
        </CodeExample>

        <h3 className="text-sm font-semibold text-text mt-6 mb-3">Indeterminate State</h3>
        <p className="text-sm text-text-secondary mb-3">
          Used for parent checkboxes when only some children are selected.
        </p>
        <CodeExample code={`<Checkbox label="Select all" indeterminate />`}>
          <Checkbox label="Select all (some items selected)" indeterminate checked={false} onChange={() => {}} />
        </CodeExample>
      </section>

      {/* ─── RADIO ─── */}
      <section className="mb-12">
        <h2 id="radio" className="text-xl font-black tracking-tight text-text mb-2">Radio</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use radio buttons for single-select choices within a group of mutually exclusive options.
        </p>

        <CodeExample code={`<Radio
  name="frequency"
  value="daily"
  label="Daily"
  checked={freq === 'daily'}
  onChange={(e) => setFreq(e.target.value)}
/>`}>
          <div className="space-y-3">
            {[
              { value: 'option-a', label: 'Option A', description: 'Best for small teams.' },
              { value: 'option-b', label: 'Option B', description: 'Recommended for enterprise.' },
              { value: 'option-c', label: 'Option C — Disabled', disabled: true },
            ].map((opt) => (
              <Radio
                key={opt.value}
                name="example-group"
                value={opt.value}
                label={opt.label}
                description={opt.description}
                disabled={opt.disabled}
                checked={radio === opt.value}
                onChange={(e) => setRadio(e.target.value)}
              />
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ─── SWITCH ─── */}
      <section className="mb-12">
        <h2 id="switch" className="text-xl font-black tracking-tight text-text mb-2">Switch</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use a switch for settings that take immediate effect — no save required.
        </p>

        <CodeExample code={`<Switch
  label="Enable notifications"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>`}>
          <div className="space-y-4">
            <Switch
              label="Enable notifications"
              checked={sw1}
              onChange={(e) => setSw1(e.target.checked)}
            />
            <Switch
              label="Dark mode"
              description="Apply dark theme across the application."
              checked={sw2}
              onChange={(e) => setSw2(e.target.checked)}
            />
            <Switch label="Disabled toggle" disabled />
            <Switch label="Disabled — on" disabled checked onChange={() => {}} />
          </div>
        </CodeExample>

        <h3 className="text-sm font-semibold text-text mt-6 mb-3">Sizes</h3>
        <CodeExample code={`<Switch size="sm" label="Small" />
<Switch size="md" label="Medium" />`}>
          <div className="flex items-start gap-8">
            <Switch size="sm" label="Small" checked={false} onChange={() => {}} />
            <Switch size="md" label="Medium" checked={false} onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use Checkbox when users can select multiple independent options',
            'Use Radio for mutually exclusive choices — always provide at least two options',
            'Use Switch for settings that take immediate binary effect (on/off, enable/disable)',
            'Always provide a visible label — never rely on colour alone to convey state',
            'Use the description prop for additional context rather than separate helper text elements',
          ]}
          dontItems={[
            'Do not use Radio for yes/no questions where Switch is more intuitive',
            'Avoid pre-checking options that could lead to unintended actions',
            'Do not use Switch inside a form that requires a "Save" action — the visual implies immediacy',
            'Avoid placing checkboxes in a single-select context — use Radio instead',
          ]}
        />
      </section>

      {/* API */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <h3 className="text-sm font-bold text-text mb-3">Checkbox &amp; Radio</h3>
        <p className="text-xs text-text-tertiary mb-3">Both accept the same core props. Radio additionally accepts <code className="bg-surface-overlay px-1 py-0.5 border border-border">name</code> and <code className="bg-surface-overlay px-1 py-0.5 border border-border">value</code>.</p>
        <PropsTable props={checkboxProps} />
        <h3 className="text-sm font-bold text-text mb-3 mt-8">Switch</h3>
        <PropsTable props={switchProps} />
      </section>
    </article>
  );
}
