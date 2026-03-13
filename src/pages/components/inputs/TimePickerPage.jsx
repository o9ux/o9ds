import { useState } from 'react';
import TimePicker from '@/components/inputs/TimePicker';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const timePickerProps = [
  { name: 'value', type: 'string', default: "''", description: 'Selected time in HH:MM format' },
  { name: 'onChange', type: '(time: string) => void', default: 'undefined', description: 'Handler when time changes' },
  { name: 'placeholder', type: 'string', default: "'HH:MM'", description: 'Input placeholder text' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the picker is disabled' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Error state styling' },
  { name: 'is24Hour', type: 'boolean', default: 'true', description: '24-hour or 12-hour format' },
  { name: 'minuteStep', type: 'number', default: '5', description: 'Minute increment step' },
];

export default function TimePickerPage() {
  const [time, setTime] = useState('');
  const [step, setStep] = useState('5');

  return (
    <article>
      <PageHeader title="Time Picker" description="A time selection input with hour and minute columns. Supports 24-hour and 12-hour formats with configurable minute increments." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'Minute Step', value: step, onChange: setStep, options: ['1', '5', '10', '15', '30'] },
        ]}>
          <TimePicker value={time} onChange={setTime} minuteStep={Number(step)} />
          {time && <p className="text-xs text-text-tertiary mt-2">Selected: {time}</p>}
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <CodeExample code={`<TimePicker\n  value={time}\n  onChange={setTime}\n  placeholder="Select time"\n/>`}>
          <TimePicker value={time} onChange={setTime} placeholder="Select time" />
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="steps" className="text-xl font-black tracking-tight text-text mb-2">Minute Steps</h2>
        <p className="text-sm text-text-secondary mb-4">Control minute granularity with the <code className="bg-white/10 px-1 rounded text-xs">minuteStep</code> prop.</p>
        <CodeExample code={`<TimePicker minuteStep={15} />\n<TimePicker minuteStep={30} />`}>
          <div className="flex gap-4">
            <div>
              <p className="text-xs text-text-tertiary mb-1">15-minute step</p>
              <TimePicker minuteStep={15} placeholder="HH:MM" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">30-minute step</p>
              <TimePicker minuteStep={30} placeholder="HH:MM" />
            </div>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <CodeExample code={`<TimePicker error />\n<TimePicker disabled />`}>
          <div className="flex gap-4">
            <div>
              <p className="text-xs text-text-tertiary mb-1">Error</p>
              <TimePicker error placeholder="Error" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Disabled</p>
              <TimePicker disabled placeholder="Disabled" />
            </div>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for time input when precision matters', 'Default to 5 or 15-minute steps for most scheduling', 'Allow direct text input as an alternative']}
          dontItems={['Do not use for date selection — use DatePicker', 'Avoid 1-minute steps for scheduling UIs (too many options)', 'Do not use without a clear label']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={timePickerProps} />
      </section>
    </article>
  );
}
