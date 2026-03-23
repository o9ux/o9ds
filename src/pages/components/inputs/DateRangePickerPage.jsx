import { useState } from 'react';
import DateRangePicker from '@/components/inputs/DateRangePicker';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const dateRangePickerProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Trigger height: sm (24px), md (32px), lg (40px)' },
  { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Validation status with matching border and message styling' },
  { name: 'format', type: "'DD-MM-YYYY' | 'MM-DD-YYYY'", default: "'DD-MM-YYYY'", description: 'Date display and value format' },
  { name: 'variant', type: "'input' | 'dropdown'", default: "'input'", description: "Input mode: 'input' allows typing dates directly, 'dropdown' restricts to calendar-only selection" },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label above the field via the Label component' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Show required (*) indicator on the label' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Show (optional) indicator on the label' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text shown below the field' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown when status is "error"' },
  { name: 'warningText', type: 'string', default: 'undefined', description: 'Warning message shown when status is "warning"' },
  { name: 'value', type: 'string', default: 'undefined', description: 'Controlled range value in "DD-MM-YYYY > DD-MM-YYYY" format' },
  { name: 'defaultValue', type: 'string', default: 'undefined', description: 'Initial value for uncontrolled usage' },
  { name: 'onChange', type: '({ start, end }) => void', default: 'undefined', description: 'Called when a range is selected or cleared; receives { start, end } date strings' },
  { name: 'placeholder', type: 'string', default: 'format > format', description: 'Placeholder text — defaults to the format string repeated' },
  { name: 'min', type: 'string', default: 'undefined', description: 'Minimum selectable date in the chosen format' },
  { name: 'max', type: 'string', default: 'undefined', description: 'Maximum selectable date in the chosen format' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the entire date range picker' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Show value but prevent editing, hides calendar trigger' },
];

export default function DateRangePickerPage() {
  /* ── Interactive Demo state ── */
  const [demoValue, setDemoValue] = useState('');
  const [demoSize, setDemoSize] = useState('md');
  const [demoStatus, setDemoStatus] = useState('default');
  const [demoFormat, setDemoFormat] = useState('DD-MM-YYYY');
  const [demoVariant, setDemoVariant] = useState('input');
  const [demoLabel, setDemoLabel] = useState(true);
  const [demoDisabled, setDemoDisabled] = useState(false);
  const [demoReadOnly, setDemoReadOnly] = useState(false);

  const handleDemoChange = ({ start, end }) => {
    setDemoValue(start && end ? `${start} > ${end}` : '');
  };

  return (
    <article className="space-y-12">
      <PageHeader
        title="Date Range Picker"
        description="A dual-calendar dropdown for selecting date ranges. Supports Date, Week, Month, and Year range modes, DD-MM-YYYY and MM-DD-YYYY formats, three sizes, validation states, and input/dropdown variants."
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
              options: ['input', 'dropdown'],
            },
            { type: 'checkbox', label: 'Label', checked: demoLabel, onChange: setDemoLabel },
            { type: 'checkbox', label: 'Disabled', checked: demoDisabled, onChange: setDemoDisabled },
            { type: 'checkbox', label: 'Read Only', checked: demoReadOnly, onChange: setDemoReadOnly },
          ]}
        >
          <div className="max-w-lg">
            <DateRangePicker
              size={demoSize}
              status={demoStatus}
              format={demoFormat}
              variant={demoVariant}
              value={demoValue}
              onChange={handleDemoChange}
              disabled={demoDisabled}
              readOnly={demoReadOnly}
              label={demoLabel ? 'Select Date Range' : undefined}
              helperText={demoStatus === 'default' ? 'Choose a start and end date.' : undefined}
              errorText={demoStatus === 'error' ? 'Please select a valid date range.' : undefined}
              warningText={demoStatus === 'warning' ? 'End date is in the past.' : undefined}
            />
            {demoValue && (
              <p className="text-xs text-text-tertiary mt-2">Selected: {demoValue}</p>
            )}
          </div>
        </ComponentDemo>
      </section>

      {/* ── Range Modes ── */}
      <section>
        <h2 id="range-modes" className="text-lg font-semibold text-text mb-2">Range Modes</h2>
        <p className="text-sm text-text-secondary mb-4">
          The dropdown includes tabs for different selection granularities. All modes use a two-click interaction:{' '}
          <strong>Date</strong> (click start then end day), <strong>Week</strong> (click start then end week),{' '}
          <strong>Month</strong> (click start then end month), and <strong>Year</strong> (click start then end year).
          Hover preview shows the tentative range before the second click.
        </p>
        <CodeExample
          title="Range Modes"
          code={`<DateRangePicker label="Date Range" />\n// Open dropdown and use the Date / Week / Month / Year tabs\n// to switch between range selection modes.`}
        >
          <div className="max-w-lg">
            <DateRangePicker label="Date Range" onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* ── Variants ── */}
      <section>
        <h2 id="variants" className="text-lg font-semibold text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Two input variants: <strong>input</strong> allows typing date ranges directly (e.g. &quot;01-03-2026 &gt; 15-03-2026&quot;),{' '}
          <strong>dropdown</strong> restricts to calendar-only selection with a read-only input.
        </p>
        <CodeExample
          title="Variants"
          code={`<DateRangePicker variant="input" label="Typeable (default)" />\n<DateRangePicker variant="dropdown" label="Dropdown Only" />`}
        >
          <div className="flex gap-6 max-w-2xl">
            <DateRangePicker variant="input" label="Typeable (default)" onChange={() => {}} />
            <DateRangePicker variant="dropdown" label="Dropdown Only" onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* ── Formats ── */}
      <section>
        <h2 id="formats" className="text-lg font-semibold text-text mb-2">Date Formats</h2>
        <p className="text-sm text-text-secondary mb-4">
          Two date format variants: <strong>DD-MM-YYYY</strong> (day first) and <strong>MM-DD-YYYY</strong> (month first).
          The format controls both display and the value string.
        </p>
        <CodeExample
          title="Formats"
          code={`<DateRangePicker format="DD-MM-YYYY" label="DD-MM-YYYY" />\n<DateRangePicker format="MM-DD-YYYY" label="MM-DD-YYYY" />`}
        >
          <div className="flex gap-6 max-w-2xl">
            <DateRangePicker format="DD-MM-YYYY" label="DD-MM-YYYY" onChange={() => {}} />
            <DateRangePicker format="MM-DD-YYYY" label="MM-DD-YYYY" onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* ── Sizes ── */}
      <section>
        <h2 id="sizes" className="text-lg font-semibold text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three size variants: <strong>sm</strong> (24px), <strong>md</strong> (32px), <strong>lg</strong> (40px).
        </p>
        <CodeExample
          title="Sizes"
          code={`<DateRangePicker size="sm" label="Small" />\n<DateRangePicker size="md" label="Medium" />\n<DateRangePicker size="lg" label="Large" />`}
        >
          <div className="space-y-4 max-w-lg">
            {['sm', 'md', 'lg'].map((s) => (
              <DateRangePicker
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
          Supports <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">default</code>,{' '}
          <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">error</code>, and{' '}
          <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">warning</code> statuses.
        </p>
        <CodeExample
          title="Validation States"
          code={`<DateRangePicker status="error" errorText="Please select a valid range." label="Error" />\n<DateRangePicker status="warning" warningText="End date is in the past." label="Warning" />`}
        >
          <div className="space-y-4 max-w-lg">
            <DateRangePicker
              label="Error State"
              status="error"
              errorText="Please select a valid date range."
              onChange={() => {}}
            />
            <DateRangePicker
              label="Warning State"
              status="warning"
              warningText="End date is in the past."
              onChange={() => {}}
            />
          </div>
        </CodeExample>
      </section>

      {/* ── With Label ── */}
      <section>
        <h2 id="with-label" className="text-lg font-semibold text-text mb-2">With Label</h2>
        <p className="text-sm text-text-secondary mb-4">
          The Label component supports <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">required</code> and{' '}
          <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">optional</code> indicators.
        </p>
        <CodeExample
          title="Required & Optional"
          code={`<DateRangePicker label="Travel Dates" required />\n<DateRangePicker label="Preferred Dates" optional />`}
        >
          <div className="space-y-4 max-w-lg">
            <DateRangePicker label="Travel Dates" required onChange={() => {}} />
            <DateRangePicker label="Preferred Dates" optional onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* ── With Constraints ── */}
      <section>
        <h2 id="constraints" className="text-lg font-semibold text-text mb-2">With Constraints</h2>
        <p className="text-sm text-text-secondary mb-4">
          Restrict selectable dates using <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">min</code> and{' '}
          <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">max</code>. Dates outside the range are disabled in the calendar.
        </p>
        <CodeExample
          title="Min / Max"
          code={`<DateRangePicker\n  label="Event Dates"\n  min="01-01-2026"\n  max="31-12-2026"\n  helperText="Only dates in 2026"\n/>`}
        >
          <div className="max-w-lg">
            <DateRangePicker
              label="Event Dates"
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
        <h2 id="disabled-readonly" className="text-lg font-semibold text-text mb-2">Disabled & Read-only</h2>
        <p className="text-sm text-text-secondary mb-4">
          <strong>Disabled</strong> grays out the entire field. <strong>Read-only</strong> shows the value with a dashed border and hides the calendar trigger.
        </p>
        <CodeExample
          title="Disabled & Read-only"
          code={`<DateRangePicker label="Disabled" disabled />\n<DateRangePicker label="Read Only" readOnly value="01-03-2026 > 15-03-2026" />`}
        >
          <div className="space-y-4 max-w-lg">
            <DateRangePicker label="Disabled" disabled />
            <DateRangePicker label="Read Only" readOnly value="01-03-2026 > 15-03-2026" />
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-lg font-semibold text-text mb-4">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use for selecting date ranges when both start and end dates matter',
            'Always provide a label for accessibility and context',
            'Use the Week/Month/Year tabs for quick range selection at higher granularity',
            'Choose a format consistent with your application locale',
            'Use variant="input" when users may know the exact dates and want to type them directly',
            'Use variant="dropdown" when date context matters more than speed',
          ]}
          dontItems={[
            'Do not use for single date selection — use DatePicker instead',
            'Do not use for time-only selection — use TimePicker instead',
            'Avoid omitting labels on standalone date range fields',
            'Do not use for date + time ranges — consider combining with TimePicker',
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
                <td className="py-2 pr-4 font-mono text-xs">Enter / Space / &#8595;</td>
                <td className="py-2">Open calendar dropdown (variant=&quot;dropdown&quot;)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">&#8595;</td>
                <td className="py-2">Open calendar dropdown (variant=&quot;input&quot;)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Escape</td>
                <td className="py-2">Close calendar dropdown</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Enter</td>
                <td className="py-2">Commit typed range value (variant=&quot;input&quot;)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Click day cell</td>
                <td className="py-2">Date mode: first click sets start, second click sets end</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Click day cell</td>
                <td className="py-2">Week mode: first click sets start week, second click sets end week (Sun–Sat boundaries)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Click month</td>
                <td className="py-2">Month mode: first click sets start month, second click sets end month</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Click year</td>
                <td className="py-2">Year mode: first click sets start year, second click sets end year</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">&#9664; / &#9654; (month)</td>
                <td className="py-2">Navigate to previous/next month</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">&#9664; / &#9654; (year)</td>
                <td className="py-2">Navigate to previous/next year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-4">API Reference</h2>
        <PropsTable props={dateRangePickerProps} />
      </section>
    </article>
  );
}
