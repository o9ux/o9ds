import { useState } from 'react';
import Combobox from '@/components/inputs/Combobox';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const comboboxProps = [
  { name: 'options', type: 'Array<string | {value, label}>', default: '[]', description: 'Available options' },
  { name: 'value', type: 'string', default: 'undefined', description: 'Currently selected value' },
  { name: 'onChange', type: '(value: string) => void', default: 'undefined', description: 'Handler when selection changes' },
  { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Input placeholder text' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the combobox is disabled' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Error state styling' },
  { name: 'emptyMessage', type: 'string', default: "'No results found'", description: 'Message shown when no options match' },
];

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
  { value: 'mx', label: 'Mexico' },
];

export default function ComboboxPage() {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  return (
    <article>
      <PageHeader title="Combobox" description="A searchable dropdown that combines a text input with a filterable option list. Users can type to narrow options and select from filtered results." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'checkbox', label: 'Error', value: error, onChange: setError },
        ]}>
          <div className="w-64">
            <Combobox
              options={countries}
              value={value}
              onChange={setValue}
              error={error}
              placeholder="Search countries..."
            />
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <CodeExample code={`<Combobox\n  options={['React', 'Vue', 'Angular', 'Svelte']}\n  value={value}\n  onChange={setValue}\n  placeholder="Search frameworks..."\n/>`}>
          <div className="w-64">
            <Combobox
              options={countries}
              value={value}
              onChange={setValue}
              placeholder="Search countries..."
            />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="keyboard" className="text-xl font-black tracking-tight text-text mb-2">Keyboard Navigation</h2>
        <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
          <li><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono">↓</kbd> / <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono">↑</kbd> — Navigate options</li>
          <li><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono">Enter</kbd> — Select highlighted option</li>
          <li><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono">Escape</kbd> — Close dropdown</li>
          <li>Typing filters the option list in real-time</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <CodeExample code={`<Combobox error />\n<Combobox disabled />`}>
          <div className="flex gap-4">
            <div className="w-48">
              <p className="text-xs text-text-tertiary mb-1">Error</p>
              <Combobox options={countries} error placeholder="Error state" />
            </div>
            <div className="w-48">
              <p className="text-xs text-text-tertiary mb-1">Disabled</p>
              <Combobox options={countries} disabled placeholder="Disabled" />
            </div>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use when the option list is too long for a simple select', 'Provide meaningful empty state messages', 'Use for single-value selection with search']}
          dontItems={['Do not use for multi-select — use MultiSelect instead', 'Avoid for short lists (under 5 items) — use SelectDropdown', 'Do not pre-fill with a value the user might not understand']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={comboboxProps} />
      </section>
    </article>
  );
}
