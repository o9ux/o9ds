import { useState } from 'react';
import Indicator from '@/components/feedback/Indicator';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';

const indicatorProps = [
  { name: 'status', type: "'online' | 'offline' | 'busy' | 'away' | 'neutral'", default: "'online'", description: 'Status color' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Dot size' },
  { name: 'pulse', type: 'boolean', default: 'false', description: 'Pulsing animation' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Optional text label next to the dot' },
];

export default function IndicatorPage() {
  const [status, setStatus] = useState('online');
  const [pulse, setPulse] = useState(false);

  return (
    <article>
      <PageHeader title="Indicators" description="Small colored dots that convey status or availability at a glance. Use them for online/offline status, activity states, or simple boolean indicators." status="stable" category="Status & System Feedback" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'Status', value: status, onChange: setStatus, options: ['online', 'offline', 'busy', 'away', 'neutral'] },
          { type: 'checkbox', label: 'Pulse', value: pulse, onChange: setPulse },
        ]}>
          <Indicator status={status} pulse={pulse} label={status.charAt(0).toUpperCase() + status.slice(1)} />
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="statuses" className="text-xl font-black tracking-tight text-text mb-2">Statuses</h2>
        <CodeExample code={`<Indicator status="online" label="Online" />\n<Indicator status="away" label="Away" />\n<Indicator status="busy" label="Busy" />\n<Indicator status="offline" label="Offline" />`}>
          <div className="flex flex-wrap items-center gap-6">
            <Indicator status="online" label="Online" />
            <Indicator status="away" label="Away" />
            <Indicator status="busy" label="Busy" />
            <Indicator status="offline" label="Offline" />
            <Indicator status="neutral" label="Neutral" />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <CodeExample code={`<Indicator size="sm" />\n<Indicator size="md" />\n<Indicator size="lg" />`}>
          <div className="flex items-center gap-6">
            <Indicator size="sm" label="Small" />
            <Indicator size="md" label="Medium" />
            <Indicator size="lg" label="Large" />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="pulse" className="text-xl font-black tracking-tight text-text mb-2">Pulse Animation</h2>
        <p className="text-sm text-text-secondary mb-4">Use pulse for active or live states that need attention.</p>
        <CodeExample code={`<Indicator status="online" pulse label="Live" />`}>
          <div className="flex items-center gap-6">
            <Indicator status="online" pulse label="Live" />
            <Indicator status="busy" pulse label="Recording" />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={indicatorProps} />
      </section>
    </article>
  );
}
