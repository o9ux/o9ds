import { useState } from 'react';
import Checkbox from '@/components/inputs/Checkbox';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const checkboxProps = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text displayed beside the checkbox' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Secondary helper text below the label' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Checkbox size — sm=14px, md=16px, lg=18px' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Visual-only partial check state for parent group checkboxes' },
  { name: 'exclude', type: 'boolean', default: 'false', description: 'Shows danger/red fill when checked — used for exclusion selections' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the checkbox is non-interactive' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the checkbox is read-only (visible but not editable)' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Show error state with danger border' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown below the checkbox when error is true' },
  { name: 'checked', type: 'boolean', default: 'undefined', description: 'Controlled checked state' },
  { name: 'onChange', type: '(e: ChangeEvent) => void', default: 'undefined', description: 'Change handler' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function CheckboxPage() {
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);
  const [readOnlyDemo, setReadOnlyDemo] = useState(false);
  const [errorDemo, setErrorDemo] = useState(false);
  const [excludeDemo, setExcludeDemo] = useState(false);
  const [demoCb, setDemoCb] = useState(false);

  /* Indeterminate demo — vertical */
  const [items, setItems] = useState([true, false, true]);
  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean) && !allChecked;

  /* Indeterminate demo — horizontal */
  const [hItems, setHItems] = useState([false, true, true]);
  const hAllChecked = hItems.every(Boolean);
  const hSomeChecked = hItems.some(Boolean) && !hAllChecked;

  /* Group demo */
  const [groupItems, setGroupItems] = useState({
    option1: false,
    option2: true,
    option3: false,
    option4: true,
  });

  return (
    <article>
      <PageHeader title="Checkbox" description="A binary checked/unchecked control with optional indeterminate state, exclusion mode, and group layout. Use for multi-select options where each item is independently toggled." status="stable" category="Input & Form Controls" />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">Try different sizes and states.</p>
        <ComponentDemo controls={[
          { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
          { type: 'checkbox', label: 'Read-only', value: readOnlyDemo, onChange: setReadOnlyDemo },
          { type: 'checkbox', label: 'Error', value: errorDemo, onChange: setErrorDemo },
          { type: 'checkbox', label: 'Exclude', value: excludeDemo, onChange: setExcludeDemo },
        ]}>
          <Checkbox
            label="Accept terms and conditions"
            description="You agree to our privacy policy and terms of service."
            size={size}
            disabled={disabled}
            readOnly={readOnlyDemo}
            error={errorDemo}
            errorText={errorDemo ? 'This field is required' : undefined}
            exclude={excludeDemo}
            checked={demoCb}
            onChange={(e) => setDemoCb(e.target.checked)}
          />
        </ComponentDemo>
      </section>

      {/* Types */}
      <section className="mb-12">
        <h2 id="types" className="text-xl font-black tracking-tight text-text mb-2">Types</h2>
        <p className="text-sm text-text-secondary mb-4">Four checkbox types for different selection patterns.</p>

        {/* Unchecked */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Unchecked</h3>
          <CodeExample code={`<Checkbox label="Label" />`}>
            <div className="flex items-start gap-8">
              <Checkbox label="Label" size="lg" checked={false} onChange={() => {}} />
              <Checkbox label="Label" size="sm" checked={false} onChange={() => {}} />
            </div>
          </CodeExample>
        </div>

        {/* Checked */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Checked</h3>
          <CodeExample code={`<Checkbox label="Label" checked />`}>
            <div className="flex items-start gap-8">
              <Checkbox label="Label" size="lg" checked onChange={() => {}} />
              <Checkbox label="Label" size="sm" checked onChange={() => {}} />
            </div>
          </CodeExample>
        </div>

        {/* Indeterminate */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Indeterminate</h3>
          <p className="text-xs text-text-secondary mb-3">Used for parent checkboxes when only some children are selected.</p>
          <CodeExample code={`<Checkbox label="Select all" indeterminate />`}>
            <div className="flex items-start gap-8">
              <Checkbox label="Label" size="lg" indeterminate checked={false} onChange={() => {}} />
              <Checkbox label="Label" size="sm" indeterminate checked={false} onChange={() => {}} />
            </div>
          </CodeExample>
        </div>

        {/* Exclude */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Checked with Exclude</h3>
          <p className="text-xs text-text-secondary mb-3">Danger/red fill when checked — used for exclusion or negative selections.</p>
          <CodeExample code={`<Checkbox label="Label" checked exclude />`}>
            <div className="flex items-start gap-8">
              <Checkbox label="Label" size="lg" checked exclude onChange={() => {}} />
              <Checkbox label="Label" size="sm" checked exclude onChange={() => {}} />
            </div>
          </CodeExample>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">Three sizes: sm (14px), md (16px), and lg (18px).</p>
        <CodeExample code={`<Checkbox size="sm" label="Small checkbox (14px)" />\n<Checkbox size="md" label="Medium checkbox (16px)" />\n<Checkbox size="lg" label="Large checkbox (18px)" />`}>
          <div className="flex flex-col gap-4">
            <Checkbox size="sm" label="Small checkbox (14px)" checked onChange={() => {}} />
            <Checkbox size="md" label="Medium checkbox (16px)" checked onChange={() => {}} />
            <Checkbox size="lg" label="Large checkbox (18px)" checked onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <p className="text-sm text-text-secondary mb-4">Disabled, read-only, and error states.</p>
        <CodeExample code={`<Checkbox disabled label="Disabled unchecked" />\n<Checkbox disabled checked label="Disabled checked" />\n<Checkbox readOnly label="Read-only" />\n<Checkbox error label="Error state" />`}>
          <div className="flex flex-col gap-3">
            <Checkbox disabled label="Disabled unchecked" checked={false} onChange={() => {}} />
            <Checkbox disabled label="Disabled checked" checked onChange={() => {}} />
            <Checkbox readOnly label="Read-only unchecked" checked={false} onChange={() => {}} />
            <Checkbox readOnly label="Read-only checked" checked onChange={() => {}} />
            <Checkbox error errorText="This field is required" label="Error state" checked={false} onChange={() => {}} />
            <Checkbox error errorText="This field is required" label="Error state checked" checked onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      {/* Indeterminate Group */}
      <section className="mb-12">
        <h2 id="indeterminate" className="text-xl font-black tracking-tight text-text mb-2">Indeterminate Group</h2>
        <p className="text-sm text-text-secondary mb-4">Parent checkbox toggles all children. Shows indeterminate when partially selected.</p>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Vertical</h3>
          <CodeExample code={`<Checkbox
  label="Select all"
  indeterminate={someChecked}
  checked={allChecked}
  onChange={() => setItems(allChecked ? [false, false, false] : [true, true, true])}
/>
<div className="ml-6 flex flex-col gap-2">
  <Checkbox label="Item 1" checked={items[0]} onChange={...} />
  <Checkbox label="Item 2" checked={items[1]} onChange={...} />
  <Checkbox label="Item 3" checked={items[2]} onChange={...} />
</div>`}>
            <div className="flex flex-col gap-2">
              <Checkbox
                label="Select all"
                indeterminate={someChecked}
                checked={allChecked}
                onChange={() => setItems(allChecked ? [false, false, false] : [true, true, true])}
              />
              <div className="ml-6 flex flex-col gap-2">
                {['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
                  <Checkbox
                    key={item}
                    label={item}
                    checked={items[i]}
                    onChange={(e) => {
                      const next = [...items];
                      next[i] = e.target.checked;
                      setItems(next);
                    }}
                  />
                ))}
              </div>
            </div>
          </CodeExample>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Horizontal</h3>
          <CodeExample code={`<Checkbox
  label="Select all"
  indeterminate={someChecked}
  checked={allChecked}
  onChange={() => setItems(...)}
/>
<div className="ml-6 flex flex-wrap gap-4">
  <Checkbox label="Option A" checked={items[0]} onChange={...} />
  <Checkbox label="Option B" checked={items[1]} onChange={...} />
  <Checkbox label="Option C" checked={items[2]} onChange={...} />
</div>`}>
            <div className="flex flex-col gap-2">
              <Checkbox
                label="Select all"
                indeterminate={hSomeChecked}
                checked={hAllChecked}
                onChange={() => setHItems(hAllChecked ? [false, false, false] : [true, true, true])}
              />
              <div className="ml-6 flex flex-wrap gap-4">
                {['Option A', 'Option B', 'Option C'].map((item, i) => (
                  <Checkbox
                    key={item}
                    label={item}
                    checked={hItems[i]}
                    onChange={(e) => {
                      const next = [...hItems];
                      next[i] = e.target.checked;
                      setHItems(next);
                    }}
                  />
                ))}
              </div>
            </div>
          </CodeExample>
        </div>
      </section>

      {/* Checkbox Group */}
      <section className="mb-12">
        <h2 id="group" className="text-xl font-black tracking-tight text-text mb-2">Checkbox Group</h2>
        <p className="text-sm text-text-secondary mb-4">Horizontal and vertical layouts for groups of checkboxes.</p>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Horizontal</h3>
          <CodeExample code={`<div className="flex flex-wrap gap-4">\n  <Checkbox label="Label" />\n  <Checkbox label="Label" />\n  <Checkbox label="Label" />\n</div>`}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-4">
                {Object.entries(groupItems).map(([key, val]) => (
                  <Checkbox key={key} label="Label" size="lg" checked={val} onChange={(e) => setGroupItems(p => ({ ...p, [key]: e.target.checked }))} />
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(groupItems).map(([key, val]) => (
                  <Checkbox key={key} label="Label" size="sm" checked={val} onChange={(e) => setGroupItems(p => ({ ...p, [key]: e.target.checked }))} />
                ))}
              </div>
            </div>
          </CodeExample>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Vertical</h3>
          <CodeExample code={`<div className="flex flex-col gap-2">\n  <Checkbox label="Label" />\n  <Checkbox label="Label" />\n  <Checkbox label="Label" />\n</div>`}>
            <div className="flex gap-12">
              <div className="flex flex-col gap-2">
                {Object.entries(groupItems).map(([key, val]) => (
                  <Checkbox key={key} label="Label" size="lg" checked={val} onChange={(e) => setGroupItems(p => ({ ...p, [key]: e.target.checked }))} />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {Object.entries(groupItems).map(([key, val]) => (
                  <Checkbox key={key} label="Label" size="sm" checked={val} onChange={(e) => setGroupItems(p => ({ ...p, [key]: e.target.checked }))} />
                ))}
              </div>
            </div>
          </CodeExample>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use checkboxes for multi-select options where each item is independently toggled',
            'Use indeterminate state for parent checkboxes controlling a group',
            'Use exclude variant for negative/exclusion selections',
            'Always provide a visible label for accessibility',
          ]}
          dontItems={[
            'Do not use for single-select choices — use Radio instead',
            'Avoid pre-checking options that could lead to unintended actions',
            'Do not use exclude for normal selection — reserve for explicit exclusion patterns',
            'Do not use checkbox where Switch is more appropriate (immediate binary toggles)',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            'Native <input type="checkbox"> is used for full keyboard and screen reader support.',
            'Label is linked to the input via htmlFor/id for click-to-toggle behavior.',
            'Focus ring is shown on keyboard navigation (focus-visible).',
            'Disabled and read-only states prevent interaction as expected.',
            'Error state provides a visual red border cue.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary"><span className="mt-px text-text font-bold shrink-0">—</span>{item}</li>
          ))}
        </ul>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={checkboxProps} />
      </section>
    </article>
  );
}
