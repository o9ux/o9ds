import { useState } from 'react';
import TimePicker from '@/components/inputs/TimePicker';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const timePickerProps = [
  { name: 'value', type: 'string', default: "''", description: 'Selected time string. 24h: "14:30" or "14:30:00". 12h: "02:30 PM" or "02:30:00 PM"' },
  { name: 'defaultValue', type: 'string', default: "''", description: 'Initial value for uncontrolled usage' },
  { name: 'onChange', type: '(time: string) => void', default: 'undefined', description: 'Called when a time is selected or typed' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input height — sm (24px), md (32px), lg (40px)' },
  { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Validation state styling' },
  { name: 'variant', type: "'input' | 'dropdown'", default: "'input'", description: '"input" allows typing + dropdown, "dropdown" is select-only' },
  { name: 'is24Hour', type: 'boolean', default: 'true', description: '24-hour format; when false shows AM/PM toggle' },
  { name: 'showSeconds', type: 'boolean', default: 'false', description: 'Include seconds (HH:MM:SS) in the time format' },
  { name: 'minuteStep', type: 'number', default: '0', description: 'Minute increment for time slots. 0 = every minute (0–59), or use 5, 10, 15, 30, 60' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Optional label text above the input' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Show required asterisk on the label' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Show "(optional)" after the label' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text below the input' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message (shown when status="error")' },
  { name: 'warningText', type: 'string', default: 'undefined', description: 'Warning message (shown when status="warning")' },
  { name: 'placeholder', type: 'string', default: 'auto', description: 'Input placeholder (defaults to format pattern)' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Read-only mode — value shown, no editing' },
];

export default function TimePickerPage() {
  const [time, setTime] = useState('');
  const [size, setSize] = useState('md');
  const [statusVal, setStatusVal] = useState('default');
  const [step, setStep] = useState('0');
  const [variantVal, setVariantVal] = useState('input');
  const [hasLabel, setHasLabel] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  return (
    <article>
      <PageHeader
        title="Time Picker"
        description="A time selection input with a scrollable dropdown list. Extension of the Textbox, Number Input, and Select Dropdown bottom-border pattern. Supports 24-hour and 12-hour (AM/PM) formats, HH:MM and HH:MM:SS time formats, three sizes, two input variants (typeable and dropdown-only), configurable minute steps, and validation states."
        status="stable"
        category="Input & Form Controls"
      />

      {/* ── Interactive Demo ── */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'SIZE', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
          { type: 'select', label: 'STATUS', value: statusVal, onChange: setStatusVal, options: ['default', 'error', 'warning'] },
          { type: 'select', label: 'STEP', value: step, onChange: setStep, options: ['0', '5', '10', '15', '30', '60'] },
          { type: 'select', label: 'VARIANT', value: variantVal, onChange: setVariantVal, options: ['input', 'dropdown'] },
          { type: 'checkbox', label: 'Label', checked: hasLabel, onChange: setHasLabel },
          { type: 'checkbox', label: 'Disabled', checked: isDisabled, onChange: setIsDisabled },
          { type: 'checkbox', label: 'Read Only', checked: isReadOnly, onChange: setIsReadOnly },
        ]}>
          <div className="max-w-xs">
            <TimePicker
              value={time}
              onChange={setTime}
              size={size}
              status={statusVal}
              variant={variantVal}
              minuteStep={Number(step)}
              label={hasLabel ? 'Start Time' : undefined}
              required={hasLabel}
              disabled={isDisabled}
              readOnly={isReadOnly}
              errorText={statusVal === 'error' ? 'Please enter a valid time' : undefined}
              warningText={statusVal === 'warning' ? 'Time is outside business hours' : undefined}
              helperText="Choose a time from the dropdown."
            />
          </div>
          {time && <p className="text-xs text-text-tertiary mt-2">Selected: {time}</p>}
        </ComponentDemo>
      </section>

      {/* ── Variants ── */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Two input variants: <strong>input</strong> allows typing times directly and selecting from the dropdown,{' '}
          <strong>dropdown</strong> restricts to dropdown-only selection with a read-only input.
        </p>
        <CodeExample code={`<TimePicker variant="input" />\n<TimePicker variant="dropdown" />`}>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-text-tertiary mb-1">Typeable (default)</p>
              <TimePicker variant="input" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Dropdown Only</p>
              <TimePicker variant="dropdown" />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Formats ── */}
      <section className="mb-12">
        <h2 id="formats" className="text-xl font-black tracking-tight text-text mb-2">Formats</h2>
        <p className="text-sm text-text-secondary mb-4">
          Toggle between 24-hour and 12-hour (AM/PM) formats. In 12-hour mode an AM/PM toggle appears at the top of the dropdown.
        </p>
        <CodeExample code={`<TimePicker is24Hour />\n<TimePicker is24Hour={false} />`}>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-text-tertiary mb-1">24-hour</p>
              <TimePicker is24Hour />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">12-hour (AM/PM)</p>
              <TimePicker is24Hour={false} />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Time Formats (HH:MM vs HH:MM:SS) ── */}
      <section className="mb-12">
        <h2 id="seconds" className="text-xl font-black tracking-tight text-text mb-2">With Seconds</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1 rounded text-xs">showSeconds</code> to include seconds in the format (HH:MM:SS).
        </p>
        <CodeExample code={`<TimePicker showSeconds />\n<TimePicker showSeconds is24Hour={false} />`}>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-text-tertiary mb-1">HH:MM:SS (24h)</p>
              <TimePicker showSeconds />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">HH:MM:SS AM/PM</p>
              <TimePicker showSeconds is24Hour={false} />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Minute Steps ── */}
      <section className="mb-12">
        <h2 id="steps" className="text-xl font-black tracking-tight text-text mb-2">Minute Steps</h2>
        <p className="text-sm text-text-secondary mb-4">
          Control minute granularity with <code className="bg-surface-overlay px-1 rounded text-xs">minuteStep</code>. Default is 0 (every minute, 0–59).
        </p>
        <CodeExample code={`<TimePicker minuteStep={15} />\n<TimePicker minuteStep={30} />\n<TimePicker minuteStep={60} />`}>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-text-tertiary mb-1">15-min step</p>
              <TimePicker minuteStep={15} />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">30-min step</p>
              <TimePicker minuteStep={30} />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">60-min step</p>
              <TimePicker minuteStep={60} />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Sizes ── */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <CodeExample code={`<TimePicker size="sm" />\n<TimePicker size="md" />\n<TimePicker size="lg" />`}>
          <div className="flex gap-6 items-end">
            <div>
              <p className="text-xs text-text-tertiary mb-1">Small (24px)</p>
              <TimePicker size="sm" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Medium (32px)</p>
              <TimePicker size="md" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Large (40px)</p>
              <TimePicker size="lg" />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── States ── */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <CodeExample code={`<TimePicker status="error" errorText="Invalid time" />\n<TimePicker status="warning" warningText="Outside hours" />\n<TimePicker disabled />\n<TimePicker readOnly value="14:30" />`}>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-xs text-text-tertiary mb-1">Error</p>
              <TimePicker status="error" errorText="Invalid time" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Warning</p>
              <TimePicker status="warning" warningText="Outside hours" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Disabled</p>
              <TimePicker disabled />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Read Only</p>
              <TimePicker readOnly value="14:30" />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── With Label ── */}
      <section className="mb-12">
        <h2 id="label" className="text-xl font-black tracking-tight text-text mb-2">With Label</h2>
        <CodeExample code={`<TimePicker label="Start Time" required />\n<TimePicker label="End Time" optional />`}>
          <div className="flex gap-6">
            <TimePicker label="Start Time" required />
            <TimePicker label="End Time" optional />
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use for time input when precision matters',
            'Use minuteStep={15} or {30} for scheduling use cases',
            'Pair with a label for accessibility',
            'Use variant="input" to allow fast keyboard entry',
            'Use showSeconds only when second-level precision is needed',
          ]}
          dontItems={[
            'Do not use for date selection — use DatePicker',
            'Avoid 1-minute steps for scheduling UIs (too many options)',
            'Do not omit a label when using inside forms',
            'Do not use showSeconds for simple scheduling scenarios',
          ]}
        />
      </section>

      {/* ── Keyboard Navigation ── */}
      <section className="mb-12">
        <h2 id="keyboard" className="text-xl font-black tracking-tight text-text mb-2">Keyboard Navigation</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 text-text font-semibold">Key</th>
                <th className="py-2 text-text font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">Arrow Down</td><td className="py-2">Open the dropdown when closed</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">Enter</td><td className="py-2">Commit typed time (input variant) or open dropdown (dropdown variant)</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">Space</td><td className="py-2">Open the dropdown (dropdown variant)</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">Escape</td><td className="py-2">Close the dropdown</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs">Type</td><td className="py-2">Type a time directly (input variant only)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── API Reference ── */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={timePickerProps} />
      </section>
    </article>
  );
}
