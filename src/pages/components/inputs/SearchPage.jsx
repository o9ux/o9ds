import { useState } from 'react';
import Search from '@/components/inputs/Search';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const searchProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the search input' },
  { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Placeholder text' },
  { name: 'value', type: 'string', default: 'undefined', description: 'Controlled value' },
  { name: 'onChange', type: '(e) => void', default: 'undefined', description: 'Change handler' },
  { name: 'onClear', type: '() => void', default: 'undefined', description: 'Called when the clear button is clicked' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the search is disabled' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function SearchPage() {
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <article>
      <PageHeader title="Search" description="A specialized text input with a search icon and clear button. Use it for filtering content, querying data, or finding items." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">Type to see the clear button appear.</p>
        <ComponentDemo controls={[
          { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
        ]}>
          <div className="w-full max-w-xs">
            <Search size={size} disabled={disabled} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onClear={() => setSearchValue('')} />
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <CodeExample code={`<Search size="sm" placeholder="Small search..." />\n<Search size="md" placeholder="Medium search..." />\n<Search size="lg" placeholder="Large search..." />`}>
          <div className="flex flex-col gap-3 max-w-xs">
            <Search size="sm" placeholder="Small search..." />
            <Search size="md" placeholder="Medium search..." />
            <Search size="lg" placeholder="Large search..." />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use a clear, action-oriented placeholder like "Search components..."', 'Place the search input prominently near the content it filters', 'Provide instant feedback as the user types']}
          dontItems={['Do not use Search for generic text input — use Textbox instead', 'Avoid placing the search input in a hard-to-find location', 'Do not require pressing Enter to begin the search']}
        />
      </section>

      <section className="mb-12">
        <h2 id="accessibility" className="text-xl font-black tracking-tight text-text mb-2">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {['Uses type="search" for semantic HTML search input.', 'Clear button has aria-label="Clear search" for screen readers.', 'The search icon is decorative and does not interfere with assistive tech.'].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary"><span className="mt-px text-white font-bold shrink-0">—</span>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={searchProps} />
      </section>
    </article>
  );
}
