import { useState } from 'react';
import DatePicker from '@/components/inputs/DatePicker';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const datePickerProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Trigger height: sm (28px), md (32px), lg (40px)' },
  { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Validation status with matching border and message styling' },
  { name: 'format', type: "'DD-MM-YYYY' | 'MM-DD-YYYY'", default: "'DD-MM-YYYY'", description: 'Date display and value format' },
  { name: 'variant', type: "'input' | 'calendar'", default: "'input'", description: "Input mode: 'input' allows typing dates directly, 'calendar' restricts to calendar-only selection" },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label above the field via the Label component' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Show required (*) indicator on the label' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Show (optional) indicator on the label' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text shown below the field' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown when status is "error"' },
  { name: 'warningText', type: 'string', default: 'undefined', description: 'Warning message shown when status is "warning"' },
  { name: 'value', type: 'string', default: 'undefined', description: 'Controlled date value in the chosen format' },
  { name: 'onChange', type: '(dateString: string) => void', default: 'undefined', description: 'Called when a date is selected or cleared' },
  { name: 'placeholder', type: 'string', default: 'format string', description: 'Placeholder text — defaults to the format string' },
  { name: 'min', type: 'string', default: 'undefined', description: 'Minimum selectable date in the chosen format' },
  { name: 'max', type: 'string', default: 'undefined', description: 'Maximum selectable date in the chosen format' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the entire date picker' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Show value but prevent editing, hides calendar trigger' },
];

export default function DatePickerPage() {
  /* ── Interactive Demo state ── */
  const [demoDate, setDemoDate] = useState('');
  const [demoSize, setDemoSize] = useState('md');
  const [demoStatus, setDemoStatus] = useState('default');
  const [demoFormat, setDemoFormat] = useState('DD-MM-YYYY');
  const [demoVariant, setDemoVariant] = useState('input');
  const [demoLabel, setDemoLabel] = useState(true);
  const [demoDisabled, setDemoDisabled] = useState(false);
  const [demoReadOnly, setDemoReadOnly] = useState(false);

  return (
    <article className="space-y-12">
      <PageHeader
        title="Date Picker"
        description="A calendar dropdown for selecting dates, built on the Textbox bottom-border design language. Supports DD-MM-YYYY and MM-DD-YYYY formats, three sizes, validation states, min/max constraints, and input/calendar variants."
        status="stable"
        category="Input & Form Controls"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 id="demo" className="text-lg font-semibold text-text mb-4">Interactive Demo</h2>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Size',
              value: demoSize,
              onChange: setDemoSize,
              options: ['sm', 'md', 'lg'],
            },
            {
              type: 'select',
              label: 'Status',
              value: demoStatus,
              onChange: setDemoStatus,
              options: ['default', 'error', 'warning'],
            },
            {
              type: 'select',
              label: 'Format',
              value: demoFormat,
              onChange: setDemoFormat,
              options: ['DD-MM-YYYY', 'MM-DD-YYYY'],
            },
            {
              type: 'select',
              label: 'Variant',
              value: demoVariant,
              onChange: setDemoVariant,
              options: ['input', 'calendar'],
            },
            { type: 'checkbox', label: 'Label', checked: demoLabel, onChange: setDemoLabel },
            { type: 'checkbox', label: 'Disabled', checked: demoDisabled, onChange: setDemoDisabled },
            { type: 'checkbox', label: 'Read Only', checked: demoReadOnly, onChange: setDemoReadOnly },
          ]}
        >
          <div className="max-w-xs">
            <DatePicker
              size={demoSize}
              status={demoStatus}
              format={demoFormat}
              variant={demoVariant}
              value={demoDate}
              onChange={setDemoDate}
              disabled={demoDisabled}
              readOnly={demoReadOnly}
              label={demoLabel ? 'Select Date' : undefined}
              helperText={demoStatus === 'default' ? 'Choose a date from the calendar.' : undefined}
              errorText={demoStatus === 'error' ? 'Please select a valid date.' : undefined}
              warningText={demoStatus === 'warning' ? 'Date is in the past.' : undefined}
            />
            {demoDate && (
              <p className="text-xs text-text-tertiary mt-2">Selected: {demoDate}</p>
            )}
          </div>
        </ComponentDemo>
      </section>

      {/* ── Variants ── */}
      <section>
        <h2 id="variants" className="text-lg font-semibold text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Two input variants: <strong>input</strong> allows typing dates directly and selecting from the calendar, <strong>calendar</strong> restricts to calendar-only selection with a read-only input.
        </p>
        <CodeExample
          title="Variants"
          code={`<DatePicker variant="input" label="Typeable (default)" />\n<DatePicker variant="calendar" label="Calendar Only" />`}
        >
          <div className="flex gap-6 max-w-lg">
            <DatePicker variant="input" label="Typeable (default)" onChange={() => {}} />
            <DatePicker variant="calendar" label="Calendar Only" onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* ── Formats ── */}
      <section>
        <h2 id="formats" className="text-lg font-semibold text-text mb-2">Formats</h2>
        <p className="text-sm text-text-secondary mb-4">
          Two date format variants: <strong>DD-MM-YYYY</strong> (day first) and <strong>MM-DD-YYYY</strong> (month first). The format controls both display and the value string.
        </p>
        <CodeExample
          title="Formats"
          code={`<DatePicker format="DD-MM-YYYY" label="DD-MM-YYYY" />\n<DatePicker format="MM-DD-YYYY" label="MM-DD-YYYY" />`}
        >
          <div className="flex gap-6 max-w-lg">
            <DatePicker format="DD-MM-YYYY" label="DD-MM-YYYY" onChange={() => {}} />
            <DatePicker format="MM-DD-YYYY" label="MM-DD-YYYY" onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* ── Sizes ── */}
      <section>
        <h2 id="sizes" className="text-lg font-semibold text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three size variants matching the Textbox scale: <strong>sm</strong> (28px), <strong>md</strong> (32px), <strong>lg</strong> (40px).
        </p>
        <CodeExample
          title="Sizes"
          code={`<DatePicker size="sm" label="Small" />\n<DatePicker size="md" label="Medium" />\n<DatePicker size="lg" label="Large" />`}
        >
          <div className="space-y-4 max-w-xs">
            {['sm', 'md', 'lg'].map((s) => (
              <DatePicker
                key={s}
                size={s}
                label={s === 'sm' ? 'Small' : s === 'md' ? 'Medium' : 'Large'}
                onChange={() => {}}
              />
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ── Validation States ── */}
      <section>
        <h2 id="validation" className="text-lg font-semibold text-text mb-2">Validation States</h2>
        <p className="text-sm text-text-secondary mb-4">
          Supports <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">default</code>, <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">error</code>, and <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">warning</code> statuses with matching border colors and message text.
        </p>
        <CodeExample
          title="Validation States"
          code={`<DatePicker status="error" errorText="Please select a valid date." label="Error" />\n<DatePicker status="warning" warningText="Date is in the past." label="Warning" />`}
        >
          <div className="space-y-4 max-w-xs">
            <DatePicker
              label="Error State"
              status="error"
              errorText="Please select a valid date."
              onChange={() => {}}
            />
            <DatePicker
              label="Warning State"
              status="warning"
              warningText="Date is in the past."
              onChange={() => {}}
            />
          </div>
        </CodeExample>
      </section>

      {/* ── With Label ── */}
      <section>
        <h2 id="with-label" className="text-lg font-semibold text-text mb-2">With Label</h2>
        <p className="text-sm text-text-secondary mb-4">
          The Label component supports <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">required</code> and <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">optional</code> indicators.
        </p>
        <CodeExample
          title="Required & Optional"
          code={`<DatePicker label="Start Date" required />\n<DatePicker label="End Date" optional />`}
        >
          <div className="space-y-4 max-w-xs">
            <DatePicker label="Start Date" required onChange={() => {}} />
            <DatePicker label="End Date" optional onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* ── With Constraints ── */}
      <section>
        <h2 id="constraints" className="text-lg font-semibold text-text mb-2">With Constraints</h2>
        <p className="text-sm text-text-secondary mb-4">
          Restrict selectable dates using <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">min</code> and <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">max</code>. Dates outside the range are disabled in the calendar.
        </p>
        <CodeExample
          title="Min / Max"
          code={`<DatePicker\n  label="Event Date"\n  min="01-01-2026"\n  max="31-12-2026"\n  helperText="Only dates in 2026"\n/>`}
        >
          <div className="max-w-xs">
            <DatePicker
              label="Event Date"
              min="01-01-2026"
              max="31-12-2026"
              helperText="Only dates in 2026"
              onChange={() => {}}
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Disabled & Read-only ── */}
      <section>
        <h2 id="disabled" className="text-lg font-semibold text-text mb-2">Disabled & Read-only</h2>
        <p className="text-sm text-text-secondary mb-4">
          <strong>Disabled</strong> grays out the entire field. <strong>Read-only</strong> shows the value with a dashed border and hides the calendar trigger.
        </p>
        <CodeExample
          title="Disabled & Read-only"
          code={`<DatePicker label="Disabled" disabled />\n<DatePicker label="Read Only" readOnly value="16-03-2026" />`}
        >
          <div className="space-y-4 max-w-xs">
            <DatePicker label="Disabled" disabled />
            <DatePicker label="Read Only" readOnly value="16-03-2026" />
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-lg font-semibold text-text mb-4">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use for single date selection when calendar context matters',
            'Always provide a label for accessibility and context',
            'Use min/max to constrain selectable ranges when appropriate',
            'Choose a format consistent with your application locale',
            'Use variant="input" when users may know the exact date and want to type it directly',
            'Use variant="calendar" when date context (day of week, relative position) matters more than speed',
          ]}
          dontItems={[
            'Do not use for date ranges — use a Date Range Picker pattern',
            'Do not use for time-only selection — use TimePicker instead',
            'Avoid omitting labels on standalone date fields',
          ]}
        />
      </section>

      {/* ── Keyboard Navigation ── */}
      <section>
        <h2 id="keyboard" className="text-lg font-semibold text-text mb-4">Keyboard Navigation</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="py-2 pr-4 font-medium">Key</th>
                <th className="py-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Enter / Space / ↓</td>
                <td className="py-2">Open calendar dropdown (variant=&quot;calendar&quot;)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">↓</td>
                <td className="py-2">Open calendar dropdown (variant=&quot;input&quot;)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Escape</td>
                <td className="py-2">Close calendar dropdown (or month picker first)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Enter</td>
                <td className="py-2">Commit typed date value (variant=&quot;input&quot;)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Click day cell</td>
                <td className="py-2">Select date and close calendar</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Click month name</td>
                <td className="py-2">Toggle 12-month picker overlay</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">◄ / ► (month)</td>
                <td className="py-2">Navigate to previous/next month</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">◄ / ► (year)</td>
                <td className="py-2">Navigate to previous/next year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-4">API Reference</h2>
        <PropsTable props={datePickerProps} />
      </section>
    </article>
  );
}
