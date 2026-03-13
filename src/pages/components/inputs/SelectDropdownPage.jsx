import { useState } from 'react';
import SelectDropdown from '@/components/inputs/SelectDropdown';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const selectProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the select trigger' },
  { name: 'status', type: "'default' | 'error' | 'success' | 'warning'", default: "'default'", description: 'Validation status' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text' },
  { name: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder text when no option is selected' },
  { name: 'options', type: "Array<string | { value, label, disabled? }>", default: '[]', description: 'Available options' },
  { name: 'value', type: 'string', default: 'undefined', description: 'Controlled value' },
  { name: 'onChange', type: '(value: string) => void', default: 'undefined', description: 'Called when selection changes' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Help text below the select' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message (shown when status="error")' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the select is disabled' },
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

export default function SelectDropdownPage() {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('default');
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader title="Select Dropdown" description="A custom select dropdown that replaces the native browser select. It provides a consistent look and behavior across browsers with keyboard navigation support." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'Status', value: status, onChange: setStatus, options: ['default', 'error', 'success', 'warning'] },
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
        ]}>
          <div className="w-full max-w-xs">
            <SelectDropdown label="Fruit" placeholder="Choose a fruit..." options={fruitOptions} value={value} onChange={setValue} status={status} disabled={disabled} helperText="Pick your favorite" />
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <CodeExample code={`<SelectDropdown\n  label="Role"\n  options={[\n    { value: 'admin', label: 'Administrator' },\n    { value: 'editor', label: 'Editor' },\n    { value: 'viewer', label: 'Viewer' },\n  ]}\n/>`}>
          <div className="max-w-xs">
            <SelectDropdown label="Role" options={roleOptions} placeholder="Select a role..." />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="disabled-options" className="text-xl font-black tracking-tight text-text mb-2">Disabled Options</h2>
        <p className="text-sm text-text-secondary mb-4">Individual options can be disabled.</p>
        <div className="border border-border bg-surface-overlay p-6 max-w-xs">
          <SelectDropdown label="Role" options={roleOptions} placeholder="Select a role..." helperText="Guest access is currently unavailable" />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="validation" className="text-xl font-black tracking-tight text-text mb-2">Validation</h2>
        <CodeExample code={`<SelectDropdown status="error" errorText="Selection required" />`}>
          <div className="max-w-xs">
            <SelectDropdown label="Category" status="error" errorText="Please select a category" options={fruitOptions} placeholder="Select..." />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for selecting one option from a list of 5 or more items', 'Provide a meaningful placeholder when no default is selected', 'Use validation states to guide the user']}
          dontItems={['Do not use for fewer than 5 options — use Radio buttons instead', 'Avoid very long option lists without search — use Combobox instead', 'Do not use a Select for boolean choices — use Switch or Checkbox']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={selectProps} />
      </section>
    </article>
  );
}
