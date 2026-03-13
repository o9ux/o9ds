import { useState } from 'react';
import DatePicker from '@/components/inputs/DatePicker';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const datePickerProps = [
  { name: 'value', type: 'string', default: 'undefined', description: 'Selected date in YYYY-MM-DD format' },
  { name: 'onChange', type: '(date: string) => void', default: 'undefined', description: 'Handler when date changes' },
  { name: 'placeholder', type: 'string', default: "'YYYY-MM-DD'", description: 'Input placeholder text' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the picker is disabled' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Error state styling' },
  { name: 'min', type: 'string', default: 'undefined', description: 'Minimum selectable date (YYYY-MM-DD)' },
  { name: 'max', type: 'string', default: 'undefined', description: 'Maximum selectable date (YYYY-MM-DD)' },
];

export default function DatePickerPage() {
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);

  return (
    <article>
      <PageHeader title="Date Picker" description="A calendar dropdown for selecting a date. Supports keyboard navigation, min/max date constraints, and direct text input in YYYY-MM-DD format." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'checkbox', label: 'Error', value: error, onChange: setError },
        ]}>
          <DatePicker value={date} onChange={setDate} error={error} />
          {date && <p className="text-xs text-text-tertiary mt-2">Selected: {date}</p>}
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <CodeExample code={`<DatePicker\n  value={date}\n  onChange={setDate}\n  placeholder="Pick a date"\n/>`}>
          <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="constraints" className="text-xl font-black tracking-tight text-text mb-2">With Constraints</h2>
        <p className="text-sm text-text-secondary mb-4">Restrict selectable dates using <code className="bg-white/10 px-1 rounded text-xs">min</code> and <code className="bg-white/10 px-1 rounded text-xs">max</code>.</p>
        <CodeExample code={`<DatePicker min="2026-01-01" max="2026-12-31" />`}>
          <DatePicker
            value=""
            onChange={() => {}}
            min="2026-01-01"
            max="2026-12-31"
            placeholder="2026 only"
          />
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <CodeExample code={`<DatePicker error />\n<DatePicker disabled />`}>
          <div className="flex gap-4">
            <div>
              <p className="text-xs text-text-tertiary mb-1">Error</p>
              <DatePicker error placeholder="Error" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Disabled</p>
              <DatePicker disabled placeholder="Disabled" />
            </div>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for date selection when context of surrounding dates matters', 'Clearly label the date field', 'Allow direct text input as an alternative to calendar selection']}
          dontItems={['Do not use for time-only selection — use TimePicker', 'Avoid for date ranges — use a Date Range Picker pattern', 'Do not use when the date format is ambiguous']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={datePickerProps} />
      </section>
    </article>
  );
}
