import { useState } from 'react';
import SelectDropdown from '@/components/inputs/SelectDropdown';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';

import userSvg from '@/assets/icons/o9con-user.svg?raw';
import userEditSvg from '@/assets/icons/o9con-user-edit.svg?raw';
import eyeSvg from '@/assets/icons/o9con-eye.svg?raw';
import banSvg from '@/assets/icons/o9con-ban.svg?raw';

const selectProps = [
  { name: 'options', type: "Array<string | { value, label, group?, disabled?, icon? }>", default: '[]', description: 'Available options' },
  { name: 'value', type: 'string', default: 'undefined', description: 'Controlled selected value' },
  { name: 'onChange', type: '(value: string) => void', default: 'undefined', description: 'Called when selection changes' },
  { name: 'searchable', type: 'boolean', default: 'false', description: 'Enable type-to-filter search input' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Show a clear button to remove the current selection' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Trigger height: sm (28px), md (32px), lg (40px)' },
  { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Validation status' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Show required (*) indicator. Automatically displays error state when no value is selected.' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Show (optional) indicator on the label' },
  { name: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder text when no option is selected' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Help text below the field' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message (shown when status="error")' },
  { name: 'warningText', type: 'string', default: 'undefined', description: 'Warning message (shown when status="warning")' },
  { name: 'emptyMessage', type: 'string', default: "'No results found'", description: 'Message when search yields no results (searchable only)' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the select is disabled' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the select is read-only' },
];

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const roleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'guest', label: 'Guest', disabled: true },
];

const iconOptions = [
  { value: 'admin', label: 'Administrator', icon: <O9Icon svg={userSvg} /> },
  { value: 'editor', label: 'Editor', icon: <O9Icon svg={userEditSvg} /> },
  { value: 'viewer', label: 'Viewer', icon: <O9Icon svg={eyeSvg} /> },
  { value: 'guest', label: 'Guest', icon: <O9Icon svg={banSvg} />, disabled: true },
];

const groupedOptions = [
  { value: 'apple', label: 'Apple', group: 'Fruits' },
  { value: 'banana', label: 'Banana', group: 'Fruits' },
  { value: 'cherry', label: 'Cherry', group: 'Fruits' },
  { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
  { value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
  { value: 'spinach', label: 'Spinach', group: 'Vegetables' },
  { value: 'salmon', label: 'Salmon', group: 'Protein' },
  { value: 'chicken', label: 'Chicken', group: 'Protein' },
  { value: 'tofu', label: 'Tofu', group: 'Protein' },
];

export default function SelectDropdownPage() {
  const [demoValue, setDemoValue] = useState('');
  const [demoSize, setDemoSize] = useState('md');
  const [demoStatus, setDemoStatus] = useState('default');
  const [demoLabelType, setDemoLabelType] = useState('normal');
  const [demoSearchable, setDemoSearchable] = useState(false);
  const [demoClearable, setDemoClearable] = useState(false);
  const [demoDisabled, setDemoDisabled] = useState(false);
  const [demoReadOnly, setDemoReadOnly] = useState(false);

  const [basicValue, setBasicValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [groupedValue, setGroupedValue] = useState('');
  const [clearableValue, setClearableValue] = useState('banana');
  const [requiredValue, setRequiredValue] = useState('');

  return (
    <article>
      <PageHeader
        title="Select Dropdown"
        description="A single-select dropdown built on the Textbox bottom-border design language. Supports a select-only mode for simple selection and a searchable mode for type-to-filter workflows. Includes optional category grouping, validation states, and full keyboard navigation."
        status="stable"
        category="Input & Form Controls"
      />

      {/* ── Interactive Demo ── */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'Size', value: demoSize, onChange: setDemoSize, options: ['sm', 'md', 'lg'] },
          { type: 'select', label: 'Status', value: demoStatus, onChange: setDemoStatus, options: ['default', 'error', 'warning'] },
          { type: 'select', label: 'Label', value: demoLabelType, onChange: setDemoLabelType, options: ['normal', 'optional', 'required'] },
          { type: 'checkbox', label: 'Searchable', value: demoSearchable, onChange: setDemoSearchable },
          { type: 'checkbox', label: 'Clearable', value: demoClearable, onChange: setDemoClearable },
          { type: 'checkbox', label: 'Disabled', value: demoDisabled, onChange: setDemoDisabled },
          { type: 'checkbox', label: 'ReadOnly', value: demoReadOnly, onChange: setDemoReadOnly },
        ]}>
          <div className="w-full max-w-xs">
            <SelectDropdown
              label="Fruit"
              placeholder="Choose a fruit..."
              options={fruitOptions}
              value={demoValue}
              onChange={setDemoValue}
              size={demoSize}
              status={demoStatus}
              required={demoLabelType === 'required'}
              optional={demoLabelType === 'optional'}
              searchable={demoSearchable}
              clearable={demoClearable}
              disabled={demoDisabled}
              readOnly={demoReadOnly}
              helperText={demoStatus === 'default' ? 'Pick your favorite' : undefined}
              errorText={demoStatus === 'error' ? 'Selection is required' : undefined}
              warningText={demoStatus === 'warning' ? 'Consider a different choice' : undefined}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* ── Basic Usage ── */}
      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <p className="text-sm text-text-secondary mb-4">The default select-only variant. Click to open the dropdown, then click an option to select it.</p>
        <CodeExample code={`<SelectDropdown\n  label="Role"\n  options={[\n    { value: 'admin', label: 'Administrator' },\n    { value: 'editor', label: 'Editor' },\n    { value: 'viewer', label: 'Viewer' },\n  ]}\n  value={value}\n  onChange={setValue}\n/>`}>
          <div className="max-w-xs">
            <SelectDropdown
              label="Role"
              options={roleOptions}
              value={basicValue}
              onChange={setBasicValue}
              placeholder="Select a role..."
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Searchable ── */}
      <section className="mb-12">
        <h2 id="searchable" className="text-xl font-black tracking-tight text-text mb-2">Searchable</h2>
        <p className="text-sm text-text-secondary mb-4">When <code className="text-xs bg-surface-overlay px-1 py-0.5">searchable</code> is enabled, the trigger becomes a text input that filters options as you type. Useful for long option lists.</p>
        <CodeExample code={`<SelectDropdown\n  label="Ingredient"\n  searchable\n  options={groupedOptions}\n  value={value}\n  onChange={setValue}\n  placeholder="Search ingredients..."\n/>`}>
          <div className="max-w-xs">
            <SelectDropdown
              label="Ingredient"
              searchable
              options={groupedOptions}
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Search ingredients..."
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Clearable ── */}
      <section className="mb-12">
        <h2 id="clearable" className="text-xl font-black tracking-tight text-text mb-2">Clearable</h2>
        <p className="text-sm text-text-secondary mb-4">When <code className="text-xs bg-surface-overlay px-1 py-0.5">clearable</code> is enabled, a close button appears next to the chevron when a value is selected. Clicking it clears the selection and returns to the placeholder state.</p>
        <CodeExample code={`<SelectDropdown\n  label="Fruit"\n  clearable\n  options={fruitOptions}\n  value={value}\n  onChange={setValue}\n/>`}>
          <div className="max-w-xs">
            <SelectDropdown
              label="Fruit"
              clearable
              options={fruitOptions}
              value={clearableValue}
              onChange={setClearableValue}
              placeholder="Choose a fruit..."
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Sizes ── */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">Three sizes matching the Textbox sizing scale: sm (28px), md (32px), and lg (40px).</p>
        <div className="border border-border bg-surface-overlay p-6 flex flex-col gap-6">
          <div className="max-w-xs">
            <SelectDropdown label="Small (sm)" size="sm" options={fruitOptions} placeholder="Select..." />
          </div>
          <div className="max-w-xs">
            <SelectDropdown label="Medium (md)" size="md" options={fruitOptions} placeholder="Select..." />
          </div>
          <div className="max-w-xs">
            <SelectDropdown label="Large (lg)" size="lg" options={fruitOptions} placeholder="Select..." />
          </div>
        </div>
      </section>

      {/* ── Category Grouping ── */}
      <section className="mb-12">
        <h2 id="grouped" className="text-xl font-black tracking-tight text-text mb-2">Category Grouping</h2>
        <p className="text-sm text-text-secondary mb-4">Add a <code className="text-xs bg-surface-overlay px-1 py-0.5">group</code> property to options to organize them under category headers in the dropdown.</p>
        <CodeExample code={`<SelectDropdown\n  label="Ingredient"\n  options={[\n    { value: 'apple', label: 'Apple', group: 'Fruits' },\n    { value: 'carrot', label: 'Carrot', group: 'Vegetables' },\n    { value: 'salmon', label: 'Salmon', group: 'Protein' },\n  ]}\n  value={value}\n  onChange={setValue}\n/>`}>
          <div className="max-w-xs">
            <SelectDropdown
              label="Ingredient"
              options={groupedOptions}
              value={groupedValue}
              onChange={setGroupedValue}
              placeholder="Select an ingredient..."
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Validation States ── */}
      <section className="mb-12">
        <h2 id="validation" className="text-xl font-black tracking-tight text-text mb-2">Validation States</h2>
        <p className="text-sm text-text-secondary mb-4">Error and warning states display colored bottom borders and footer messages with status icons, matching the Textbox component pattern.</p>
        <div className="border border-border bg-surface-overlay p-6 flex flex-col gap-6">
          <div className="max-w-xs">
            <SelectDropdown
              label="Category"
              status="error"
              errorText="Please select a category"
              options={fruitOptions}
              placeholder="Select..."
            />
          </div>
          <div className="max-w-xs">
            <SelectDropdown
              label="Priority"
              status="warning"
              warningText="This selection may cause delays"
              options={fruitOptions}
              placeholder="Select..."
            />
          </div>
        </div>
      </section>

      {/* ── Disabled & ReadOnly ── */}
      <section className="mb-12">
        <h2 id="disabled-readonly" className="text-xl font-black tracking-tight text-text mb-2">Disabled & ReadOnly</h2>
        <p className="text-sm text-text-secondary mb-4">Disabled reduces opacity and blocks all interaction. Read-only shows a dashed border and prevents changes while keeping the value visible.</p>
        <div className="border border-border bg-surface-overlay p-6 flex flex-col gap-6">
          <div className="max-w-xs">
            <SelectDropdown
              label="Disabled"
              disabled
              options={fruitOptions}
              value="cherry"
              placeholder="Select..."
            />
          </div>
          <div className="max-w-xs">
            <SelectDropdown
              label="ReadOnly"
              readOnly
              options={fruitOptions}
              value="banana"
              placeholder="Select..."
            />
          </div>
        </div>
      </section>

      {/* ── Disabled Options ── */}
      <section className="mb-12">
        <h2 id="disabled-options" className="text-xl font-black tracking-tight text-text mb-2">Disabled Options</h2>
        <p className="text-sm text-text-secondary mb-4">Individual options can be disabled by setting <code className="text-xs bg-surface-overlay px-1 py-0.5">disabled: true</code> on the option object. Disabled options appear grayed out and cannot be selected.</p>
        <div className="border border-border bg-surface-overlay p-6 max-w-xs">
          <SelectDropdown
            label="Role"
            options={roleOptions}
            placeholder="Select a role..."
            helperText="Guest access is currently unavailable"
          />
        </div>
      </section>

      {/* ── With Icons ── */}
      <section className="mb-12">
        <h2 id="with-icons" className="text-xl font-black tracking-tight text-text mb-2">With Icons</h2>
        <p className="text-sm text-text-secondary mb-4">Each option can include an optional leading <code className="text-xs bg-surface-overlay px-1 py-0.5">icon</code> property. Pass any React node (e.g. an O9Icon) to display it before the option label in the dropdown list.</p>
        <CodeExample code={`import O9Icon from '@/components/O9Icon';\nimport userSvg from '@/assets/icons/o9con-user.svg?raw';\n\nconst options = [\n  { value: 'admin', label: 'Administrator', icon: <O9Icon svg={userSvg} /> },\n  { value: 'editor', label: 'Editor', icon: <O9Icon svg={userEditSvg} /> },\n  { value: 'viewer', label: 'Viewer', icon: <O9Icon svg={eyeSvg} /> },\n];\n\n<SelectDropdown\n  label="Role"\n  options={options}\n/>`}>
          <div className="max-w-xs">
            <SelectDropdown
              label="Role"
              options={iconOptions}
              placeholder="Select a role..."
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Required & Optional ── */}
      <section className="mb-12">
        <h2 id="required-optional" className="text-xl font-black tracking-tight text-text mb-2">Required & Optional</h2>
        <p className="text-sm text-text-secondary mb-4">Labels support three modes: <strong>Normal</strong> (no indicator), <strong>Optional</strong> (shows "(optional)"), and <strong>Required</strong> (shows "*"). When a field is marked <code className="text-xs bg-surface-overlay px-1 py-0.5">required</code> and has no value selected, the component automatically displays an error state with a default message.</p>
        <CodeExample code={`{/* Normal — no indicator */}\n<SelectDropdown label="Category" options={options} />\n\n{/* Optional — shows (optional) */}\n<SelectDropdown label="Category" optional options={options} />\n\n{/* Required — shows * and auto-error when empty */}\n<SelectDropdown label="Category" required options={options} />`}>
          <div className="flex flex-col gap-6">
            <div className="max-w-xs">
              <SelectDropdown
                label="Normal label"
                options={fruitOptions}
                placeholder="Select..."
              />
            </div>
            <div className="max-w-xs">
              <SelectDropdown
                label="Optional field"
                optional
                options={fruitOptions}
                placeholder="Select..."
              />
            </div>
            <div className="max-w-xs">
              <SelectDropdown
                label="Required field"
                required
                clearable
                options={fruitOptions}
                value={requiredValue}
                onChange={setRequiredValue}
                placeholder="Select..."
              />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Keyboard Navigation ── */}
      <section className="mb-12">
        <h2 id="keyboard" className="text-xl font-black tracking-tight text-text mb-2">Keyboard Navigation</h2>
        <p className="text-sm text-text-secondary mb-4">Full keyboard navigation is supported for accessibility and power users.</p>
        <div className="border border-border bg-surface-overlay p-6">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="py-2 pr-4 font-medium">Key</th>
                <th className="py-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-border/50"><td className="py-2 pr-4"><code className="text-xs bg-surface-overlay px-1 py-0.5">↓ / ↑</code></td><td className="py-2">Navigate through options</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4"><code className="text-xs bg-surface-overlay px-1 py-0.5">Enter</code></td><td className="py-2">Select highlighted option / Open dropdown</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4"><code className="text-xs bg-surface-overlay px-1 py-0.5">Space</code></td><td className="py-2">Open dropdown (select-only mode)</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4"><code className="text-xs bg-surface-overlay px-1 py-0.5">Escape</code></td><td className="py-2">Close dropdown</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4"><code className="text-xs bg-surface-overlay px-1 py-0.5">Home / End</code></td><td className="py-2">Jump to first / last option</td></tr>
              <tr><td className="py-2 pr-4"><code className="text-xs bg-surface-overlay px-1 py-0.5">Tab</code></td><td className="py-2">Close dropdown and move focus</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Usage Guidelines ── */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use for selecting one option from a list of 5 or more items',
            'Use the searchable variant for lists with 15+ options',
            'Group related options with category headers for better scannability',
            'Provide meaningful placeholder text when no default is selected',
            'Use validation states with descriptive messages to guide the user',
          ]}
          dontItems={[
            'Do not use for fewer than 5 options — use Radio buttons instead',
            'Do not use for multi-selection — use Multi Select Chip Input instead',
            'Do not use for boolean choices — use Switch or Checkbox instead',
            'Avoid mixing grouped and ungrouped options in the same list',
          ]}
        />
      </section>

      {/* ── API Reference ── */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={selectProps} />
      </section>
    </article>
  );
}
