import { useState } from 'react';
import Slider from '@/components/inputs/Slider';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const sliderProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track, thumb, and button size' },
  { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
  { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
  { name: 'step', type: 'number', default: '1', description: 'Step increment for buttons and drag' },
  { name: 'value', type: 'number', default: 'undefined', description: 'Controlled value' },
  { name: 'defaultValue', type: 'number', default: 'min', description: 'Initial value for uncontrolled usage' },
  { name: 'onChange', type: '(e) => void', default: 'undefined', description: 'Change handler receiving { target: { value } }' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Optional label text above the slider — left-aligned with track start' },
  { name: 'showValue', type: 'boolean', default: 'false', description: 'Show current value — right-aligned with track end' },
  { name: 'showRange', type: 'boolean', default: 'false', description: 'Show min/max values below the track — aligned with track edges' },
  { name: 'showButtons', type: 'boolean', default: 'true', description: 'Show -/+ increase/decrease icon buttons. Set to false for a track-only slider.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the slider is disabled' },
];

export default function SliderPage() {
  const [size, setSize] = useState('md');
  const [value, setValue] = useState(150);
  const [disabled, setDisabled] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [showVal, setShowVal] = useState(true);
  const [showRange, setShowRange] = useState(true);
  const [showButtons, setShowButtons] = useState(true);

  /* Stepped demo */
  const [steppedValue, setSteppedValue] = useState(50);

  return (
    <article>
      <PageHeader title="Slider" description="Sliders allow users to select a value from a continuous or discrete range. Drag the box knob or use the optional -/+ buttons for precise stepped adjustments. Label and range values align with the track edges." status="stable" category="Input & Form Controls" />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">Drag the knob, use -/+ buttons, or toggle options below.</p>
        <ComponentDemo controls={[
          { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
          { type: 'checkbox', label: 'Label', value: showLabel, onChange: setShowLabel },
          { type: 'checkbox', label: 'Show Value', value: showVal, onChange: setShowVal },
          { type: 'checkbox', label: 'Show Range', value: showRange, onChange: setShowRange },
          { type: 'checkbox', label: 'Buttons', value: showButtons, onChange: setShowButtons },
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
        ]}>
          <div className="w-full max-w-sm">
            <Slider
              label={showLabel ? 'Volume' : undefined}
              showValue={showVal}
              showRange={showRange}
              showButtons={showButtons}
              size={size}
              min={0}
              max={300}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              disabled={disabled}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* Types */}
      <section className="mb-12">
        <h2 id="types" className="text-xl font-black tracking-tight text-text mb-2">Types</h2>
        <p className="text-sm text-text-secondary mb-4">Slider with or without label, value text, range labels, and buttons.</p>
        <CodeExample code={`{/* With buttons, label, value & range */}\n<Slider label="Brightness" showValue showRange min={0} max={300} value={150} />\n\n{/* Track only — no buttons, no text */}\n<Slider showButtons={false} min={0} max={300} value={150} />`}>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <Slider label="Brightness" showValue showRange min={0} max={300} value={150} onChange={() => {}} />
            <Slider showButtons={false} min={0} max={300} value={150} onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* Without Buttons */}
      <section className="mb-12">
        <h2 id="no-buttons" className="text-xl font-black tracking-tight text-text mb-2">Without Buttons</h2>
        <p className="text-sm text-text-secondary mb-4">
          Set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">showButtons={'{false}'}</code> to hide the -/+ icon buttons. Label, value, and range labels align directly with the track edges.
        </p>
        <CodeExample code={`<Slider showButtons={false} label="Opacity" showValue showRange min={0} max={100} value={75} />\n<Slider showButtons={false} label="Temperature" showValue showRange min={-20} max={50} value={22} />`}>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <Slider showButtons={false} label="Opacity" showValue showRange min={0} max={100} value={75} onChange={() => {}} />
            <Slider showButtons={false} label="Temperature" showValue showRange min={-20} max={50} value={22} onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">Three sizes: sm, md, and lg.</p>
        <CodeExample code={`<Slider size="sm" label="Small" showValue showRange min={0} max={300} value={150} />\n<Slider size="md" label="Medium" showValue showRange min={0} max={300} value={150} />\n<Slider size="lg" label="Large" showValue showRange min={0} max={300} value={150} />`}>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <Slider size="sm" label="Small" showValue showRange min={0} max={300} value={150} onChange={() => {}} />
            <Slider size="md" label="Medium" showValue showRange min={0} max={300} value={150} onChange={() => {}} />
            <Slider size="lg" label="Large" showValue showRange min={0} max={300} value={150} onChange={() => {}} />
          </div>
        </CodeExample>

        <p className="text-sm text-text-secondary mt-6 mb-4">Without buttons across all sizes:</p>
        <CodeExample code={`<Slider size="sm" showButtons={false} label="Small" showValue showRange value={150} max={300} />\n<Slider size="md" showButtons={false} label="Medium" showValue showRange value={150} max={300} />\n<Slider size="lg" showButtons={false} label="Large" showValue showRange value={150} max={300} />`}>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <Slider size="sm" showButtons={false} label="Small" showValue showRange min={0} max={300} value={150} onChange={() => {}} />
            <Slider size="md" showButtons={false} label="Medium" showValue showRange min={0} max={300} value={150} onChange={() => {}} />
            <Slider size="lg" showButtons={false} label="Large" showValue showRange min={0} max={300} value={150} onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* Stepped */}
      <section className="mb-12">
        <h2 id="stepped" className="text-xl font-black tracking-tight text-text mb-2">Stepped Slider</h2>
        <p className="text-sm text-text-secondary mb-4">Set a step value for discrete increments. The -/+ buttons and drag both respect the step.</p>
        <CodeExample code={`<Slider min={0} max={100} step={10} label="Brightness" showValue showRange />`}>
          <div className="w-full max-w-sm">
            <Slider min={0} max={100} step={10} label="Brightness" showValue showRange value={steppedValue} onChange={(e) => setSteppedValue(Number(e.target.value))} />
          </div>
        </CodeExample>
      </section>

      {/* Custom Range */}
      <section className="mb-12">
        <h2 id="range" className="text-xl font-black tracking-tight text-text mb-2">Custom Range</h2>
        <p className="text-sm text-text-secondary mb-4">Custom min, max, and fractional step values.</p>
        <CodeExample code={`<Slider min={0} max={10} step={0.5} label="Rating" showValue showRange />`}>
          <div className="w-full max-w-sm">
            <Slider min={0} max={10} step={0.5} value={7} label="Rating" showValue showRange onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use showValue to display the current value for precise adjustments',
            'Use showRange to display min/max boundaries below the track',
            'Set appropriate min, max, and step values for the context',
            'Use showButtons={false} for compact layouts where space is limited',
            'Use the -/+ buttons for fine-grained stepped control when precision matters',
          ]}
          dontItems={[
            'Do not use for selecting from a list of discrete options - use Radio or Select',
            'Avoid very large ranges without a step size (e.g., 0-10000 with step=1)',
            'Do not use sliders for critical values where precision is important - use NumberInput',
            'Do not hide buttons when the slider is the primary control for accessibility',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            'Native <input type="range"> is used for full keyboard and screen reader support.',
            '-/+ buttons use IconButton with aria-label for screen readers ("Decrease" / "Increase").',
            '-/+ buttons use tabIndex={-1} to keep focus on the range input.',
            'Buttons disable at min/max boundaries to prevent out-of-range values.',
            'Focus ring is shown on the box knob during keyboard navigation (focus-visible).',
            'Label is linked to the input via htmlFor/id for click-to-focus behavior.',
            'Press-and-hold on buttons provides smooth continuous adjustment.',
            'When showButtons={false}, the slider remains fully keyboard-accessible via the native range input.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary"><span className="mt-px text-text font-bold shrink-0">—</span>{item}</li>
          ))}
        </ul>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={sliderProps} />
      </section>
    </article>
  );
}
