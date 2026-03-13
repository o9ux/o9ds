import { useState } from 'react';
import NumberInput from '@/components/inputs/NumberInput';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const numberInputProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the input' },
  { name: 'status', type: "'default' | 'error' | 'success' | 'warning'", default: "'default'", description: 'Validation status' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Help text' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message' },
  { name: 'min', type: 'number', default: 'undefined', description: 'Minimum allowed value' },
  { name: 'max', type: 'number', default: 'undefined', description: 'Maximum allowed value' },
  { name: 'step', type: 'number', default: '1', description: 'Increment/decrement step' },
  { name: 'value', type: 'number', default: 'undefined', description: 'Controlled value' },
  { name: 'onChange', type: '(e) => void', default: 'undefined', description: 'Change handler' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled' },
];

export default function NumberInputPage() {
  const [value, setValue] = useState(5);
  const [status, setStatus] = useState('default');
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader title="Number Input" description="A numeric input with increment/decrement controls. Use it for precise numeric entry with optional min/max bounds and step values." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'Status', value: status, onChange: setStatus, options: ['default', 'error', 'success', 'warning'] },
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
        ]}>
          <div className="w-full max-w-[200px]">
            <NumberInput label="Quantity" status={status} disabled={disabled} value={value} onChange={(e) => setValue(e.target.value)} min={0} max={100} />
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="bounds" className="text-xl font-black tracking-tight text-text mb-2">With Bounds</h2>
        <CodeExample code={`<NumberInput label="Age" min={0} max={120} step={1} value={25} />\n<NumberInput label="Price" min={0} step={0.01} value={9.99} />`}>
          <div className="flex gap-4 max-w-sm">
            <NumberInput label="Age" min={0} max={120} step={1} value={25} onChange={() => {}} />
            <NumberInput label="Price" min={0} step={0.01} value={9.99} onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="validation" className="text-xl font-black tracking-tight text-text mb-2">Validation</h2>
        <CodeExample code={`<NumberInput label="Qty" status="error" errorText="Min 1 required" value={0} />`}>
          <div className="max-w-[200px]">
            <NumberInput label="Qty" status="error" errorText="Minimum 1 required" value={0} onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for numeric values that require precise entry', 'Set min/max bounds to prevent invalid values', 'Use step to control increment precision (e.g., 0.01 for currency)']}
          dontItems={['Do not use for phone numbers, zip codes, or IDs — use Textbox with inputMode', 'Avoid very large step values that skip important values', 'Do not use for selecting from a fixed set of numbers — use Select']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={numberInputProps} />
      </section>
    </article>
  );
}
