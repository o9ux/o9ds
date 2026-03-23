import { useState } from 'react';
import Search from '@/components/inputs/Search';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const searchProps = [
  { name: 'variant', type: "'filter-search' | 'enter-search' | 'find-search' | 'advance-search'", default: "'filter-search'", description: 'Search variant determining layout and trailing actions' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size — sm=24px, md=32px, lg=40px' },
  { name: 'status', type: "'default' | 'error'", default: "'default'", description: 'Validation status' },
  { name: 'placeholder', type: 'string', default: "'Search'", description: 'Placeholder text' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message displayed below (when status="error")' },
  { name: 'maxLength', type: 'number', default: 'undefined', description: 'Maximum character count' },
  { name: 'showCount', type: 'boolean', default: 'false', description: 'Show live character counter (requires maxLength)' },
  { name: 'shortcutKey', type: 'string', default: "'/'", description: 'Keyboard shortcut hint shown when empty' },
  { name: 'value', type: 'string', default: 'undefined', description: 'Controlled value' },
  { name: 'onChange', type: '(e) => void', default: 'undefined', description: 'Change handler' },
  { name: 'onClear', type: '() => void', default: 'undefined', description: 'Called when the clear button is clicked' },
  { name: 'onSearch', type: '(value) => void', default: 'undefined', description: 'Called when search submit is clicked (enter-search, advance-search)' },
  { name: 'multiLine', type: 'boolean', default: 'false', description: 'Enable multiline textarea mode (filter-search only). Count shows line count.' },
  { name: 'onPrev', type: '(index?, line?) => void', default: 'undefined', description: 'Called when up arrow is clicked. In multiline mode receives line index and text.' },
  { name: 'onNext', type: '(index?, line?) => void', default: 'undefined', description: 'Called when down arrow is clicked. In multiline mode receives line index and text.' },
  { name: 'onFilter', type: '() => void', default: 'undefined', description: 'Called when filter button is clicked (advance-search)' },
  { name: 'matchIndex', type: 'number', default: 'undefined', description: 'Current match index for find-search count display' },
  { name: 'matchTotal', type: 'number', default: 'undefined', description: 'Total matches for find-search count display' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the search is disabled' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the search is read-only' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function SearchPage() {
  const [variant, setVariant] = useState('filter-search');
  const [size, setSize] = useState('md');
  const [status, setStatus] = useState('default');
  const [disabled, setDisabled] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [multiLine, setMultiLine] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  /* find-search demo state */
  const [findValue, setFindValue] = useState('');
  const [findIndex, setFindIndex] = useState(0);
  const findTotal = findValue ? 4 : 0;

  return (
    <article>
      <PageHeader title="Search" description="A search input with bottom-border styling, multiple variants for different search patterns, keyboard shortcut support, and optional character count." status="stable" category="Input & Form Controls" />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">Try different variants and states. Press "/" to focus when the input is empty.</p>
        <ComponentDemo controls={[
          { type: 'select', label: 'Variant', value: variant, onChange: setVariant, options: ['filter-search', 'enter-search', 'find-search', 'advance-search'] },
          { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
          { type: 'select', label: 'Status', value: status, onChange: setStatus, options: ['default', 'error'] },
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
          { type: 'checkbox', label: 'Show Count', value: showCount, onChange: setShowCount },
          { type: 'checkbox', label: 'Multi-line', value: multiLine, onChange: setMultiLine },
        ]}>
          <div className="w-full max-w-sm">
            <Search
              variant={variant}
              size={size}
              status={status}
              disabled={disabled}
              showCount={showCount}
              multiLine={multiLine}
              maxLength={showCount ? 20 : undefined}
              errorText={status === 'error' ? 'Form field value is Invalid' : undefined}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={() => setSearchValue('')}
              onSearch={(v) => alert(`Search submitted: "${v}"`)}
              onFilter={() => alert('Filter clicked')}
              onPrev={() => alert('Previous match')}
              onNext={() => alert('Next match')}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">Four search variants for different use cases.</p>

        {/* filter-search */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">filter-search</h3>
          <p className="text-xs text-text-secondary mb-3">Inline filtering — leading search icon, clear button, and match count. Best for filtering lists in real-time.</p>
          <CodeExample code={`<Search variant="filter-search" showCount maxLength={20} />`}>
            <div className="max-w-sm">
              <Search variant="filter-search" showCount maxLength={20} />
            </div>
          </CodeExample>
        </div>

        {/* filter-search multiline */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">filter-search (multiLine)</h3>
          <p className="text-xs text-text-secondary mb-3">Multiline mode expands to a textarea. Count displays line count instead of character count. Useful for entering multiple search terms.</p>
          <CodeExample code={`<Search\n  variant="filter-search"\n  multiLine\n  showCount\n  maxLength={10}\n  placeholder="Enter search terms, one per line..."\n/>`}>
            <div className="max-w-sm">
              <Search variant="filter-search" multiLine showCount maxLength={10} placeholder="Enter search terms, one per line..." />
            </div>
          </CodeExample>
        </div>

        {/* enter-search */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">enter-search</h3>
          <p className="text-xs text-text-secondary mb-3">Submit-based search — no leading icon, trailing search button to submit. Search triggers on Enter key or button click.</p>
          <CodeExample code={`<Search variant="enter-search" onSearch={(v) => console.log(v)} />`}>
            <div className="max-w-sm">
              <Search variant="enter-search" onSearch={(v) => alert(`Search: "${v}"`)} />
            </div>
          </CodeExample>
        </div>

        {/* find-search */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">find-search</h3>
          <p className="text-xs text-text-secondary mb-3">Find & navigate — leading search icon with up/down arrows to cycle through matches. Shows match index/total.</p>
          <CodeExample code={`<Search\n  variant="find-search"\n  matchIndex={findIndex}\n  matchTotal={findTotal}\n  onPrev={() => setFindIndex(i => Math.max(0, i - 1))}\n  onNext={() => setFindIndex(i => Math.min(findTotal, i + 1))}\n/>`}>
            <div className="max-w-sm">
              <Search
                variant="find-search"
                value={findValue}
                onChange={(e) => { setFindValue(e.target.value); setFindIndex(0); }}
                onClear={() => { setFindValue(''); setFindIndex(0); }}
                matchIndex={findIndex}
                matchTotal={findTotal}
                onPrev={() => setFindIndex((i) => Math.max(0, i - 1))}
                onNext={() => setFindIndex((i) => Math.min(findTotal, i + 1))}
              />
            </div>
          </CodeExample>
        </div>

        {/* advance-search */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">advance-search</h3>
          <p className="text-xs text-text-secondary mb-3">Advanced search — no leading icon, with filter settings button and search submit button.</p>
          <CodeExample code={`<Search\n  variant="advance-search"\n  onSearch={(v) => console.log(v)}\n  onFilter={() => console.log('open filter panel')}\n/>`}>
            <div className="max-w-sm">
              <Search
                variant="advance-search"
                onSearch={(v) => alert(`Search: "${v}"`)}
                onFilter={() => alert('Open filter panel')}
              />
            </div>
          </CodeExample>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">Three sizes matching the Textbox component: sm (24px), md (32px), lg (40px).</p>
        <CodeExample code={`<Search size="sm" placeholder="Small search..." />\n<Search size="md" placeholder="Medium search..." />\n<Search size="lg" placeholder="Large search..." />`}>
          <div className="flex flex-col gap-3 max-w-sm">
            <Search size="sm" placeholder="Small search..." />
            <Search size="md" placeholder="Medium search..." />
            <Search size="lg" placeholder="Large search..." />
          </div>
        </CodeExample>
      </section>

      {/* Error State */}
      <section className="mb-12">
        <h2 id="error" className="text-xl font-black tracking-tight text-text mb-2">Error State</h2>
        <p className="text-sm text-text-secondary mb-4">Error state with a red bottom border and error message. Works across all variants.</p>
        <CodeExample code={`<Search status="error" errorText="Form field value is Invalid" />\n<Search variant="enter-search" status="error" errorText="Form field value is Invalid" />`}>
          <div className="flex flex-col gap-3 max-w-sm">
            <Search status="error" errorText="Form field value is Invalid" />
            <Search variant="enter-search" status="error" errorText="Form field value is Invalid" />
          </div>
        </CodeExample>
      </section>

      {/* Disabled & Read-only */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">Disabled & Read-only</h2>
        <CodeExample code={`<Search disabled placeholder="Disabled search" />\n<Search readOnly value="Read-only value" />`}>
          <div className="flex flex-col gap-3 max-w-sm">
            <Search disabled placeholder="Disabled search" />
            <Search readOnly value="Read-only value" />
          </div>
        </CodeExample>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use filter-search for instant, real-time filtering of visible content',
            'Use enter-search when search requires a server round-trip',
            'Use find-search for in-page text search with match navigation',
            'Use advance-search when users need filter/facet controls alongside search',
          ]}
          dontItems={[
            'Do not use Search for generic text input — use Textbox instead',
            'Avoid mixing variants within the same context',
            'Do not hide the keyboard shortcut hint if it is active',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            'Uses type="search" for semantic HTML search input.',
            'All action buttons have descriptive aria-labels for screen readers.',
            'The leading search icon is decorative (aria-hidden).',
            'Keyboard shortcut "/" focuses the search when no input is active.',
            'Enter key submits search in enter-search and advance-search variants.',
            'Focus state is visually indicated by a highlighted bottom border.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary"><span className="mt-px text-text font-bold shrink-0">—</span>{item}</li>
          ))}
        </ul>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={searchProps} />
      </section>
    </article>
  );
}
