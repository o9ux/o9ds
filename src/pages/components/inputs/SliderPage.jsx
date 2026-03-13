import { useState } from 'react';
import Slider from '@/components/inputs/Slider';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const sliderProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track and thumb size' },
  { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
  { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
  { name: 'step', type: 'number', default: '1', description: 'Step increment' },
  { name: 'value', type: 'number', default: 'undefined', description: 'Controlled value' },
  { name: 'onChange', type: '(e) => void', default: 'undefined', description: 'Change handler' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text above the slider' },
  { name: 'showValue', type: 'boolean', default: 'false', description: 'Show current value next to the label' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the slider is disabled' },
];

export default function SliderPage() {
  const [value, setValue] = useState(50);
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader title="Slider" description="Sliders allow users to select a value from a continuous or discrete range. They are ideal for adjusting settings like volume, brightness, or filter values." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
        ]}>
          <div className="w-full max-w-xs">
            <Slider label="Volume" showValue value={value} onChange={(e) => setValue(Number(e.target.value))} disabled={disabled} />
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="with-label" className="text-xl font-black tracking-tight text-text mb-2">With Label & Value</h2>
        <CodeExample code={`<Slider label="Opacity" showValue value={75} min={0} max={100} />`}>
          <div className="max-w-xs">
            <Slider label="Opacity" showValue value={75} min={0} max={100} onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="range" className="text-xl font-black tracking-tight text-text mb-2">Custom Range</h2>
        <CodeExample code={`<Slider min={0} max={10} step={0.5} label="Rating" showValue />`}>
          <div className="max-w-xs">
            <Slider min={0} max={10} step={0.5} value={7} label="Rating" showValue onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use showValue to display the current value for precise adjustments', 'Set appropriate min, max, and step values for the context', 'Use labels to describe what the slider controls']}
          dontItems={['Do not use for selecting from a list of discrete options — use Radio or Select', 'Avoid very large ranges without a step size (e.g., 0-10000 with step=1)', 'Do not use sliders for critical values where precision is important — use NumberInput']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={sliderProps} />
      </section>
    </article>
  );
}
