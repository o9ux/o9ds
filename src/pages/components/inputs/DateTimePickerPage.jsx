import { useState } from 'react';
import DateTimePicker from '@/components/inputs/DateTimePicker';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const dateTimePickerProps = [
  { name: 'value', type: 'string', default: "''", description: 'Combined date+time string. E.g. "17-03-2026 14:30" or "03-17-2026 02:30 PM"' },
  { name: 'defaultValue', type: 'string', default: "''", description: 'Initial value for uncontrolled usage' },
  { name: 'onChange', type: '(dateTime: string) => void', default: 'undefined', description: 'Called when the date or time selection changes' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input height — sm (24px), md (32px), lg (40px)' },
  { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Validation state styling' },
  { name: 'format', type: "'DD-MM-YYYY' | 'MM-DD-YYYY'", default: "'DD-MM-YYYY'", description: 'Date display and value format' },
  { name: 'is24Hour', type: 'boolean', default: 'true', description: '24-hour format; when false shows AM/PM toggle' },
  { name: 'showSeconds', type: 'boolean', default: 'false', description: 'Include seconds (HH:MM:SS) in the time format' },
  { name: 'variant', type: "'input' | 'dropdown'", default: "'input'", description: '"input" allows typing, "dropdown" is select-only' },
  { name: 'minuteStep', type: 'number', default: '0', description: 'Minute increment for time slots. 0 = every minute (0–59), or use 5, 10, 15, 30, 60' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Optional label text above the input' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Show required asterisk on the label' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Show "(optional)" after the label' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text below the input' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message (shown when status="error")' },
  { name: 'warningText', type: 'string', default: 'undefined', description: 'Warning message (shown when status="warning")' },
  { name: 'placeholder', type: 'string', default: 'auto', description: 'Input placeholder (defaults to format + time pattern)' },
  { name: 'min', type: 'string', default: 'undefined', description: 'Minimum selectable date in the chosen format' },
  { name: 'max', type: 'string', default: 'undefined', description: 'Maximum selectable date in the chosen format' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Read-only mode — value shown, no editing' },
];

export default function DateTimePickerPage() {
  const [demoValue, setDemoValue] = useState('');
  const [size, setSize] = useState('md');
  const [statusVal, setStatusVal] = useState('default');
  const [formatVal, setFormatVal] = useState('DD-MM-YYYY');
  const [variantVal, setVariantVal] = useState('input');
  const [step, setStep] = useState('0');
  const [is24Hour, setIs24Hour] = useState(true);
  const [showSeconds, setShowSeconds] = useState(false);
  const [hasLabel, setHasLabel] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  return (
    <article>
      <PageHeader
        title="Date Time Picker"
        description="A combined date and time selection input with a unified dropdown. Merges a calendar grid with scrollable time columns. Supports DD-MM-YYYY and MM-DD-YYYY date formats, 24-hour and 12-hour (AM/PM) time formats, HH:MM and HH:MM:SS, three sizes, two input variants, configurable minute steps, and validation states."
        status="stable"
        category="Input & Form Controls"
      />

      {/* ── Interactive Demo ── */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'SIZE', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
          { type: 'select', label: 'STATUS', value: statusVal, onChange: setStatusVal, options: ['default', 'error', 'warning'] },
          { type: 'select', label: 'FORMAT', value: formatVal, onChange: setFormatVal, options: ['DD-MM-YYYY', 'MM-DD-YYYY'] },
          { type: 'select', label: 'VARIANT', value: variantVal, onChange: setVariantVal, options: ['input', 'dropdown'] },
          { type: 'select', label: 'STEP', value: step, onChange: setStep, options: ['0', '5', '10', '15', '30', '60'] },
          { type: 'checkbox', label: '24-Hour', checked: is24Hour, onChange: setIs24Hour },
          { type: 'checkbox', label: 'Seconds', checked: showSeconds, onChange: setShowSeconds },
          { type: 'checkbox', label: 'Label', checked: hasLabel, onChange: setHasLabel },
          { type: 'checkbox', label: 'Disabled', checked: isDisabled, onChange: setIsDisabled },
          { type: 'checkbox', label: 'Read Only', checked: isReadOnly, onChange: setIsReadOnly },
        ]}>
          <div className="max-w-xs">
            <DateTimePicker
              value={demoValue}
              onChange={setDemoValue}
              size={size}
              status={statusVal}
              format={formatVal}
              variant={variantVal}
              is24Hour={is24Hour}
              showSeconds={showSeconds}
              minuteStep={Number(step)}
              label={hasLabel ? 'Event Date & Time' : undefined}
              required={hasLabel}
              disabled={isDisabled}
              readOnly={isReadOnly}
              errorText={statusVal === 'error' ? 'Please select a valid date and time' : undefined}
              warningText={statusVal === 'warning' ? 'Selected time is outside business hours' : undefined}
              helperText="Pick a date and time from the dropdown."
            />
          </div>
          {demoValue && <p className="text-xs text-text-tertiary mt-2">Selected: {demoValue}</p>}
        </ComponentDemo>
      </section>

      {/* ── Variants ── */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Two input variants: <strong>input</strong> allows typing date and time directly and selecting from the dropdown,{' '}
          <strong>dropdown</strong> restricts to dropdown-only selection with a read-only input.
        </p>
        <CodeExample code={`<DateTimePicker variant="input" />\n<DateTimePicker variant="dropdown" />`}>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-text-tertiary mb-1">Typeable (default)</p>
              <DateTimePicker variant="input" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Dropdown Only</p>
              <DateTimePicker variant="dropdown" />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Date Formats ── */}
      <section className="mb-12">
        <h2 id="date-formats" className="text-xl font-black tracking-tight text-text mb-2">Date Formats</h2>
        <p className="text-sm text-text-secondary mb-4">
          Two date format variants: <strong>DD-MM-YYYY</strong> (day first) and <strong>MM-DD-YYYY</strong> (month first).
          The format controls both the display and the date portion of the value string.
        </p>
        <CodeExample code={`<DateTimePicker format="DD-MM-YYYY" />\n<DateTimePicker format="MM-DD-YYYY" />`}>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-text-tertiary mb-1">DD-MM-YYYY</p>
              <DateTimePicker format="DD-MM-YYYY" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">MM-DD-YYYY</p>
              <DateTimePicker format="MM-DD-YYYY" />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Time Formats ── */}
      <section className="mb-12">
        <h2 id="time-formats" className="text-xl font-black tracking-tight text-text mb-2">Time Formats</h2>
        <p className="text-sm text-text-secondary mb-4">
          Toggle between 24-hour and 12-hour (AM/PM) formats. In 12-hour mode an AM/PM toggle appears in the dropdown.
        </p>
        <CodeExample code={`<DateTimePicker is24Hour />\n<DateTimePicker is24Hour={false} />`}>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-text-tertiary mb-1">24-hour</p>
              <DateTimePicker is24Hour />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">12-hour (AM/PM)</p>
              <DateTimePicker is24Hour={false} />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── With Seconds ── */}
      <section className="mb-12">
        <h2 id="seconds" className="text-xl font-black tracking-tight text-text mb-2">With Seconds</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1 rounded text-xs">showSeconds</code> to include seconds in the format (HH:MM:SS).
        </p>
        <CodeExample code={`<DateTimePicker showSeconds />\n<DateTimePicker showSeconds is24Hour={false} />`}>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-text-tertiary mb-1">HH:MM:SS (24h)</p>
              <DateTimePicker showSeconds />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">HH:MM:SS AM/PM</p>
              <DateTimePicker showSeconds is24Hour={false} />
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
        <CodeExample code={`<DateTimePicker minuteStep={15} />\n<DateTimePicker minuteStep={30} />\n<DateTimePicker minuteStep={60} />`}>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-text-tertiary mb-1">15-min step</p>
              <DateTimePicker minuteStep={15} />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">30-min step</p>
              <DateTimePicker minuteStep={30} />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">60-min step</p>
              <DateTimePicker minuteStep={60} />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Sizes ── */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <CodeExample code={`<DateTimePicker size="sm" />\n<DateTimePicker size="md" />\n<DateTimePicker size="lg" />`}>
          <div className="flex gap-6 items-end">
            <div>
              <p className="text-xs text-text-tertiary mb-1">Small (24px)</p>
              <DateTimePicker size="sm" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Medium (32px)</p>
              <DateTimePicker size="md" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Large (40px)</p>
              <DateTimePicker size="lg" />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── States ── */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <CodeExample code={`<DateTimePicker status="error" errorText="Invalid selection" />\n<DateTimePicker status="warning" warningText="Outside business hours" />\n<DateTimePicker disabled />\n<DateTimePicker readOnly value="17-03-2026 14:30" />`}>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-xs text-text-tertiary mb-1">Error</p>
              <DateTimePicker status="error" errorText="Invalid selection" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Warning</p>
              <DateTimePicker status="warning" warningText="Outside business hours" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Disabled</p>
              <DateTimePicker disabled />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Read Only</p>
              <DateTimePicker readOnly value="17-03-2026 14:30" />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── With Label ── */}
      <section className="mb-12">
        <h2 id="label" className="text-xl font-black tracking-tight text-text mb-2">With Label</h2>
        <CodeExample code={`<DateTimePicker label="Start Date & Time" required />\n<DateTimePicker label="End Date & Time" optional />`}>
          <div className="flex gap-6">
            <DateTimePicker label="Start Date & Time" required />
            <DateTimePicker label="End Date & Time" optional />
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use when both date and time need to be captured together',
            'Use minuteStep={15} or {30} for scheduling use cases',
            'Pair with a label for accessibility',
            'Use variant="input" to allow fast keyboard entry',
            'Use showSeconds only when second-level precision is needed',
            'Choose a date format consistent with your application locale',
          ]}
          dontItems={[
            'Do not use for date-only selection — use DatePicker',
            'Do not use for time-only selection — use TimePicker',
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
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">Enter</td><td className="py-2">Commit typed value (input variant) or open dropdown (dropdown variant)</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">Space</td><td className="py-2">Open the dropdown (dropdown variant)</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">Escape</td><td className="py-2">Close the dropdown</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">Click day cell</td><td className="py-2">Select date (dropdown stays open for time selection)</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">Click month name</td><td className="py-2">Toggle 12-month picker overlay</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">&larr; / &rarr; (month)</td><td className="py-2">Navigate to previous/next month</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">&larr; / &rarr; (year)</td><td className="py-2">Navigate to previous/next year</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs">Type</td><td className="py-2">Type a datetime string directly (input variant only)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── API Reference ── */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={dateTimePickerProps} />
      </section>
    </article>
  );
}
