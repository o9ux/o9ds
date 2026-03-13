import { useState } from 'react';
import Counter from '@/components/feedback/Counter';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';

const counterProps = [
  { name: 'variant', type: "'filled' | 'danger' | 'subtle'", default: "'filled'", description: 'Visual style' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the counter' },
  { name: 'count', type: 'number', default: '0', description: 'The number to display' },
  { name: 'max', type: 'number', default: 'undefined', description: 'Maximum display value (shows "N+" when exceeded)' },
  { name: 'pulse', type: 'boolean', default: 'false', description: 'Pulsing animation for attention' },
];

export default function CounterPage() {
  const [count, setCount] = useState(5);
  const [variant, setVariant] = useState('filled');

  return (
    <article>
      <PageHeader title="Counter" description="Counters display a numeric count. Use them to show notification counts, item quantities, or unread message badges." status="stable" category="Status & System Feedback" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'Variant', value: variant, onChange: setVariant, options: ['filled', 'danger', 'subtle'] },
        ]}>
          <div className="flex items-center gap-4">
            <Counter variant={variant} count={count} />
            <div className="flex gap-2">
              <button className="text-xs text-text-secondary border border-border px-2 py-1 hover:bg-white/5 cursor-pointer" onClick={() => setCount(Math.max(0, count - 1))}>-</button>
              <button className="text-xs text-text-secondary border border-border px-2 py-1 hover:bg-white/5 cursor-pointer" onClick={() => setCount(count + 1)}>+</button>
            </div>
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <CodeExample code={`<Counter variant="filled" count={3} />\n<Counter variant="danger" count={12} />\n<Counter variant="subtle" count={99} />`}>
          <div className="flex items-center gap-4">
            <Counter variant="filled" count={3} />
            <Counter variant="danger" count={12} />
            <Counter variant="subtle" count={99} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <CodeExample code={`<Counter size="sm" count={5} />\n<Counter size="md" count={5} />\n<Counter size="lg" count={5} />`}>
          <div className="flex items-center gap-4">
            <Counter size="sm" count={5} />
            <Counter size="md" count={5} />
            <Counter size="lg" count={5} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="max" className="text-xl font-black tracking-tight text-text mb-2">Max Value</h2>
        <p className="text-sm text-text-secondary mb-4">When count exceeds max, it displays "max+" instead.</p>
        <CodeExample code={`<Counter count={150} max={99} />`}>
          <div className="flex items-center gap-4">
            <Counter count={150} max={99} />
            <Counter count={5} max={99} />
            <Counter variant="danger" count={1000} max={999} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={counterProps} />
      </section>
    </article>
  );
}
