import { useState } from 'react';
import MultiSelect from '@/components/inputs/MultiSelect';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const multiSelectProps = [
  { name: 'options', type: 'Array<string | {value, label, disabled?}>', default: '[]', description: 'Available options' },
  { name: 'value', type: 'string[]', default: '[]', description: 'Array of selected values' },
  { name: 'onChange', type: '(values: string[]) => void', default: 'undefined', description: 'Handler when selection changes' },
  { name: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder when empty' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the select is disabled' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Error state styling' },
  { name: 'maxTags', type: 'number', default: 'undefined', description: 'Max visible tags before overflow counter' },
];

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'preact', label: 'Preact' },
];

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink'];

export default function MultiSelectPage() {
  const [selected, setSelected] = useState(['react', 'vue']);
  const [errorDemo, setErrorDemo] = useState([]);
  const [maxTagsDemo, setMaxTagsDemo] = useState(['Red', 'Orange', 'Yellow', 'Green', 'Blue']);

  return (
    <article>
      <PageHeader title="Multi Select" description="A dropdown that allows selecting multiple options from a list. Selected items appear as removable tags in the trigger area with built-in search filtering." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo>
          <div className="w-72">
            <MultiSelect
              options={frameworks}
              value={selected}
              onChange={setSelected}
              placeholder="Select frameworks..."
            />
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <CodeExample code={`<MultiSelect\n  options={['React', 'Vue', 'Angular']}\n  value={selected}\n  onChange={setSelected}\n  placeholder="Select frameworks..."\n/>`}>
          <div className="w-72">
            <MultiSelect
              options={frameworks}
              value={selected}
              onChange={setSelected}
              placeholder="Select frameworks..."
            />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="max-tags" className="text-xl font-black tracking-tight text-text mb-2">Max Tags</h2>
        <p className="text-sm text-text-secondary mb-4">Limit visible tags and show an overflow counter.</p>
        <CodeExample code={`<MultiSelect maxTags={3} ... />`}>
          <div className="w-72">
            <MultiSelect
              options={colors}
              value={maxTagsDemo}
              onChange={setMaxTagsDemo}
              maxTags={3}
            />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="error" className="text-xl font-black tracking-tight text-text mb-2">Error State</h2>
        <CodeExample code={`<MultiSelect error />`}>
          <div className="w-72">
            <MultiSelect
              options={frameworks}
              value={errorDemo}
              onChange={setErrorDemo}
              error
              placeholder="Required field..."
            />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="disabled" className="text-xl font-black tracking-tight text-text mb-2">Disabled State</h2>
        <CodeExample code={`<MultiSelect disabled />`}>
          <div className="w-72">
            <MultiSelect
              options={frameworks}
              value={['react']}
              disabled
            />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for selecting multiple items from a predefined list', 'Provide a search/filter for lists with many options', 'Show tags to clearly indicate current selections']}
          dontItems={['Do not use when only one selection is needed — use SelectDropdown', 'Avoid for fewer than 3 options — use Checkbox group instead', 'Do not display too many tags — use maxTags for overflow']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={multiSelectProps} />
      </section>
    </article>
  );
}
