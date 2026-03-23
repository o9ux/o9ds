import { useState } from 'react';
import NumberInput from '@/components/inputs/NumberInput';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const numberInputProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size — sm (24px), md (32px), lg (40px)' },
  { name: 'status', type: "'default' | 'error' | 'success' | 'warning'", default: "'default'", description: 'Validation status' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text above the input' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Help text below the input' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message (shown when status is error)' },
  { name: 'min', type: 'number', default: 'undefined', description: 'Minimum allowed value' },
  { name: 'max', type: 'number', default: 'undefined', description: 'Maximum allowed value' },
  { name: 'step', type: 'number', default: '1', description: 'Increment / decrement step' },
  { name: 'value', type: 'number', default: 'undefined', description: 'Controlled value' },
  { name: 'defaultValue', type: 'number', default: '0', description: 'Initial value for uncontrolled usage' },
  { name: 'onChange', type: '(e) => void', default: 'undefined', description: 'Change handler receiving { target: { value } }' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input and stepper' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Makes the input read-only (hides stepper)' },
  { name: 'placeholder', type: 'string', default: 'undefined', description: 'Placeholder text' },
];

export default function NumberInputPage() {
  const [size, setSize] = useState('md');
  const [value, setValue] = useState(5);
  const [status, setStatus] = useState('default');
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  return (
    <article>
      <PageHeader title="Number Input" description="A numeric input with horizontal -/+ stepper buttons. Supports click, press-and-hold, keyboard shortcuts, and mouse drag interactions. Built on the same visual patterns as the Textbox component." status="stable" category="Input & Form Controls" />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">Try clicking -/+, pressing ArrowUp/Down, or dragging left-right on the input.</p>
        <ComponentDemo controls={[
          { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
          { type: 'select', label: 'Status', value: status, onChange: setStatus, options: ['default', 'error', 'success', 'warning'] },
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
          { type: 'checkbox', label: 'Read Only', value: readOnly, onChange: setReadOnly },
        ]}>
          <div className="w-full max-w-xs">
            <NumberInput
              label="Quantity"
              size={size}
              status={status}
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min={0}
              max={100}
              helperText={status === 'default' ? 'Range: 0 – 100' : undefined}
              errorText={status === 'error' ? 'Value is required' : undefined}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">Three sizes matching the Textbox scale: sm (24px), md (32px), lg (40px).</p>
        <CodeExample code={`<NumberInput size="sm" label="Small" value={10} min={0} max={100} />\n<NumberInput size="md" label="Medium" value={10} min={0} max={100} />\n<NumberInput size="lg" label="Large" value={10} min={0} max={100} />`}>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <NumberInput size="sm" label="Small" value={10} onChange={() => {}} min={0} max={100} />
            <NumberInput size="md" label="Medium" value={10} onChange={() => {}} min={0} max={100} />
            <NumberInput size="lg" label="Large" value={10} onChange={() => {}} min={0} max={100} />
          </div>
        </CodeExample>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <p className="text-sm text-text-secondary mb-4">Validation feedback, disabled, and read-only states.</p>
        <CodeExample code={`<NumberInput label="Error" status="error" errorText="Minimum 1 required" value={0} />\n<NumberInput label="Success" status="success" helperText="Value accepted" value={25} />\n<NumberInput label="Warning" status="warning" helperText="Approaching limit" value={95} max={100} />\n<NumberInput label="Disabled" disabled value={10} />\n<NumberInput label="Read Only" readOnly value={42} />`}>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <NumberInput label="Error" status="error" errorText="Minimum 1 required" value={0} onChange={() => {}} />
            <NumberInput label="Success" status="success" helperText="Value accepted" value={25} onChange={() => {}} />
            <NumberInput label="Warning" status="warning" helperText="Approaching limit" value={95} max={100} onChange={() => {}} />
            <NumberInput label="Disabled" disabled value={10} onChange={() => {}} />
            <NumberInput label="Read Only" readOnly value={42} onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* Interactions */}
      <section className="mb-12">
        <h2 id="interactions" className="text-xl font-black tracking-tight text-text mb-2">Interactions</h2>
        <p className="text-sm text-text-secondary mb-4">Multiple ways to change the value.</p>
        <div className="border border-border p-6">
          <ul className="space-y-3">
            {[
              { title: 'Click -/+ buttons', desc: 'Single click increments or decrements by the step value.' },
              { title: 'Press and hold', desc: 'Hold down the -/+ button for smooth continuous adjustment (400ms delay, then every 80ms).' },
              { title: 'Keyboard arrows', desc: 'Press ArrowUp or ArrowDown while the input is focused to step the value.' },
              { title: 'Keyboard +/- keys', desc: 'Press the + or - key while focused to increment or decrement.' },
              { title: 'Mouse drag', desc: 'Click and drag left or right on the input field to scrub through values.' },
              { title: 'Direct typing', desc: 'Click the input and type a number directly.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-xs text-text-secondary">
                <span className="mt-px text-text font-bold shrink-0">—</span>
                <div>
                  <span className="text-text font-medium">{item.title}</span>
                  <span className="text-text-tertiary"> — {item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* With Bounds */}
      <section className="mb-12">
        <h2 id="bounds" className="text-xl font-black tracking-tight text-text mb-2">With Bounds</h2>
        <p className="text-sm text-text-secondary mb-4">Stepper buttons and drag auto-clamp at min/max boundaries.</p>
        <CodeExample code={`<NumberInput label="Age" min={0} max={120} step={1} value={25} />\n<NumberInput label="Price" min={0} step={0.01} value={9.99} />`}>
          <div className="flex gap-4 w-full max-w-sm">
            <NumberInput label="Age" min={0} max={120} step={1} value={25} onChange={() => {}} />
            <NumberInput label="Price" min={0} step={0.01} value={9.99} onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use for numeric values that require precise entry',
            'Set min/max bounds to prevent invalid values',
            'Use step to control increment precision (e.g., 0.01 for currency)',
            'Use readOnly to display computed values the user cannot edit',
          ]}
          dontItems={[
            'Do not use for phone numbers, zip codes, or IDs — use Textbox with inputMode',
            'Avoid very large step values that skip important values',
            'Do not use for selecting from a fixed set of numbers — use Select',
            'Do not use for continuous ranges — use Slider instead',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            'Uses role="spinbutton" for assistive technology to identify the control.',
            'aria-valuemin, aria-valuemax, and aria-valuenow communicate the value range.',
            'aria-invalid is set when status is "error" for screen reader announcements.',
            'aria-describedby links the input to its error/helper message.',
            'Error messages use role="alert" for live-region announcements.',
            '-/+ buttons use aria-label ("Decrease value" / "Increase value") for screen readers.',
            '-/+ buttons use tabIndex={-1} to keep focus on the input field.',
            'Buttons auto-disable at min/max boundaries.',
            'Keyboard: ArrowUp/Down and +/- keys for stepping.',
            'Press-and-hold on buttons provides smooth continuous adjustment.',
            'Mouse drag left-right provides scrub interaction for quick value changes.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary"><span className="mt-px text-text font-bold shrink-0">—</span>{item}</li>
          ))}
        </ul>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={numberInputProps} />
      </section>
    </article>
  );
}
