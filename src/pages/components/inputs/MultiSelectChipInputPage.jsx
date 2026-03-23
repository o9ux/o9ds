import { useState } from 'react';
import MultiSelectChipInput from '@/components/inputs/MultiSelectChipInput';
import { cn } from '@/utils/cn';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

/* Light-mode-only white background for all preview containers on this page */
const lightWhite = '[html[data-theme=light]_&]:bg-white!';

const multiSelectChipInputProps = [
  { name: 'options', type: "Array<string | { value, label, disabled?, group?, icon? }>", default: '[]', description: 'Available options for the dropdown list' },
  { name: 'value', type: 'string[]', default: '[]', description: 'Array of selected values (controlled)' },
  { name: 'onChange', type: '(values: string[]) => void', default: 'undefined', description: 'Callback when the selection changes' },
  { name: 'variant', type: "'primary' | 'secondary' | 'tertiary'", default: "'primary'", description: 'Visual variant of the Chip components' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size tier — affects input height, chip size, and label' },
  { name: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder text shown when no items are selected' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Optional label text above the input' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Shows required asterisk on the label' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Shows "(optional)" text on the label' },
  { name: 'maxVisible', type: 'number', default: 'undefined', description: 'Maximum visible chips before showing "+N more" overflow button' },
  { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Status for border color and message styling' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper message below the input' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown when status is error' },
  { name: 'warningText', type: 'string', default: 'undefined', description: 'Warning message shown when status is warning' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the entire component' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Read-only mode — no dropdown, no chip removal' },
  { name: 'selectAll', type: 'boolean', default: 'false', description: 'Show "Select All" checkbox inside the input container' },
  { name: 'emptyMessage', type: 'string', default: "'No options found'", description: 'Message shown when no options match the search' },
  { name: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes for the outer wrapper' },
  { name: 'id', type: 'string', default: 'undefined', description: 'HTML id for the inline search input' },
];

/* ── Sample data ── */
const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
  { value: 'preact', label: 'Preact' },
  { value: 'next', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

const teamMembers = [
  { value: 'alice', label: 'Alice Walker', group: 'Engineering' },
  { value: 'bob', label: 'Bob Chen', group: 'Engineering' },
  { value: 'carol', label: 'Carol Davis', group: 'Engineering' },
  { value: 'dan', label: 'Dan Evans', group: 'Design' },
  { value: 'eve', label: 'Eve Foster', group: 'Design' },
  { value: 'frank', label: 'Frank Garcia', group: 'Product' },
  { value: 'grace', label: 'Grace Hernandez', group: 'Product' },
  { value: 'henry', label: 'Henry Ivanov', group: 'QA' },
];

const languages = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'py', label: 'Python' },
  { value: 'go', label: 'Go' },
  { value: 'rs', label: 'Rust' },
  { value: 'java', label: 'Java' },
  { value: 'cs', label: 'C#' },
  { value: 'rb', label: 'Ruby' },
];

export default function MultiSelectChipInputPage() {
  /* ── Interactive Demo state ── */
  const [demoVariant, setDemoVariant] = useState('primary');
  const [demoSize, setDemoSize] = useState('md');
  const [demoLabel, setDemoLabel] = useState(true);
  const [demoError, setDemoError] = useState(false);
  const [demoDisabled, setDemoDisabled] = useState(false);
  const [demoReadOnly, setDemoReadOnly] = useState(false);
  const [demoSelectAll, setDemoSelectAll] = useState(false);
  const [demoOverflow, setDemoOverflow] = useState(false);
  const [demoSelected, setDemoSelected] = useState(['react', 'vue']);

  /* ── Section demo states ── */
  const [basicSelected, setBasicSelected] = useState(['react', 'vue']);
  const [labelSelected, setLabelSelected] = useState(['react']);
  const [overflowSelected, setOverflowSelected] = useState(['react', 'vue', 'angular', 'svelte', 'solid', 'preact', 'next']);
  const [selectAllSelected, setSelectAllSelected] = useState(['js', 'ts']);
  const [groupSelected, setGroupSelected] = useState(['alice', 'dan']);
  const [variantPrimarySelected, setVariantPrimarySelected] = useState(['react', 'vue']);
  const [variantSecondarySelected, setVariantSecondarySelected] = useState(['react', 'vue']);
  const [variantTertiarySelected, setVariantTertiarySelected] = useState(['react', 'vue']);
  const [sizeSmSelected, setSizeSmSelected] = useState(['react', 'vue']);
  const [sizeMdSelected, setSizeMdSelected] = useState(['react', 'vue']);
  const [sizeLgSelected, setSizeLgSelected] = useState(['react', 'vue']);
  const [errorSelected, setErrorSelected] = useState([]);
  const [warningSelected, setWarningSelected] = useState(['react', 'vue', 'angular', 'svelte', 'solid', 'preact']);
  const [disabledSelected] = useState(['react', 'vue']);
  const [readOnlySelected] = useState(['react', 'vue', 'angular']);

  return (
    <article>
      <PageHeader
        title="Multi Select Chip Input"
        description="An enhanced multi-select input that renders selected items as Chip components inside a Textbox-style container. Supports search filtering, Select All, category grouping, overflow, and error/warning messages."
        status="stable"
        category="Input & Form Controls"
      />

      {/* ── Interactive Demo ── */}
      <section id="interactive-demo">
        <h2 id="demo" className="text-lg font-semibold text-text mt-10 mb-1">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">
          Toggle options to explore different configurations.
        </p>

        <ComponentDemo
          previewClassName={lightWhite}
          controls={[
            { type: 'select', label: 'Variant', value: demoVariant, onChange: setDemoVariant, options: ['primary', 'secondary', 'tertiary'] },
            { type: 'select', label: 'Size', value: demoSize, onChange: setDemoSize, options: ['sm', 'md', 'lg'] },
            { type: 'checkbox', label: 'Label', value: demoLabel, onChange: setDemoLabel },
            { type: 'checkbox', label: 'Error', value: demoError, onChange: setDemoError },
            { type: 'checkbox', label: 'Disabled', value: demoDisabled, onChange: setDemoDisabled },
            { type: 'checkbox', label: 'ReadOnly', value: demoReadOnly, onChange: setDemoReadOnly },
            { type: 'checkbox', label: 'Select All', value: demoSelectAll, onChange: setDemoSelectAll },
            { type: 'checkbox', label: 'Overflow', value: demoOverflow, onChange: setDemoOverflow },
          ]}
        >
          <div className="w-80">
            <MultiSelectChipInput
              options={frameworks}
              value={demoSelected}
              onChange={setDemoSelected}
              variant={demoVariant}
              size={demoSize}
              label={demoLabel ? 'Frameworks' : undefined}
              placeholder="Select frameworks..."
              maxVisible={demoOverflow ? 3 : undefined}
              status={demoError ? 'error' : 'default'}
              errorText={demoError ? 'Please select at least one framework' : undefined}
              disabled={demoDisabled}
              readOnly={demoReadOnly}
              selectAll={demoSelectAll}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* ── Basic Usage ── */}
      <section id="basic-usage">
        <h2 id="basic" className="text-lg font-semibold text-text mt-10 mb-1">Basic Usage</h2>
        <p className="text-sm text-text-secondary mb-4">
          Provide an array of options and manage selections with controlled state.
        </p>

        <CodeExample
          previewClassName={lightWhite}
          code={`<MultiSelectChipInput
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ]}
  value={selected}
  onChange={setSelected}
  placeholder="Select frameworks..."
/>`}
        >
          <div className="w-80">
            <MultiSelectChipInput
              options={frameworks}
              value={basicSelected}
              onChange={setBasicSelected}
              placeholder="Select frameworks..."
            />
          </div>
        </CodeExample>
      </section>

      {/* ── With Label ── */}
      <section id="with-label">
        <h2 id="with-label" className="text-lg font-semibold text-text mt-10 mb-1">With Label</h2>
        <p className="text-sm text-text-secondary mb-4">
          Uses the Label component for form labels. Supports <code className="text-xs bg-surface-overlay px-1 py-0.5">required</code> and <code className="text-xs bg-surface-overlay px-1 py-0.5">optional</code> indicators.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
            <MultiSelectChipInput
              options={frameworks}
              value={labelSelected}
              onChange={setLabelSelected}
              label="Frameworks"
              placeholder="Select..."
            />
          </div>
          <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
            <MultiSelectChipInput
              options={frameworks}
              value={labelSelected}
              onChange={setLabelSelected}
              label="Frameworks"
              required
              placeholder="Select..."
            />
          </div>
          <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
            <MultiSelectChipInput
              options={frameworks}
              value={labelSelected}
              onChange={setLabelSelected}
              label="Frameworks"
              optional
              placeholder="Select..."
            />
          </div>
        </div>
      </section>

      {/* ── Overflow & Show More ── */}
      <section id="overflow">
        <h2 id="overflow" className="text-lg font-semibold text-text mt-10 mb-1">Overflow & Show More</h2>
        <p className="text-sm text-text-secondary mb-4">
          Set <code className="text-xs bg-surface-overlay px-1 py-0.5">maxVisible</code> to limit visible chips. A "+N more" button appears to expand the full list.
        </p>

        <CodeExample
          previewClassName={lightWhite}
          code={`<MultiSelectChipInput
  options={frameworks}
  value={selected}
  onChange={setSelected}
  label="Frameworks"
  maxVisible={3}
/>`}
        >
          <div className="w-80">
            <MultiSelectChipInput
              options={frameworks}
              value={overflowSelected}
              onChange={setOverflowSelected}
              label="Frameworks"
              maxVisible={3}
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Select All ── */}
      <section id="select-all">
        <h2 id="select-all" className="text-lg font-semibold text-text mt-10 mb-1">Select All</h2>
        <p className="text-sm text-text-secondary mb-4">
          Enable the <code className="text-xs bg-surface-overlay px-1 py-0.5">selectAll</code> prop to show a "Select all" Checkbox inside the input container.
          The checkbox and chips share a single flex-wrap flow — wrapped chips start from the left edge for better space utilisation.
          It shows a checkmark when all options are selected, a dash (indeterminate) when partially selected, and is empty when none are selected.
        </p>

        <CodeExample
          previewClassName={lightWhite}
          code={`<MultiSelectChipInput
  options={languages}
  value={selected}
  onChange={setSelected}
  label="Languages"
  selectAll
/>`}
        >
          <div className="w-80">
            <MultiSelectChipInput
              options={languages}
              value={selectAllSelected}
              onChange={setSelectAllSelected}
              label="Languages"
              selectAll
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Category Grouping ── */}
      <section id="category-grouping">
        <h2 id="categories" className="text-lg font-semibold text-text mt-10 mb-1">Category Grouping</h2>
        <p className="text-sm text-text-secondary mb-4">
          Add a <code className="text-xs bg-surface-overlay px-1 py-0.5">group</code> property to options to organize them into sections.
        </p>

        <CodeExample
          previewClassName={lightWhite}
          code={`const options = [
  { value: 'alice', label: 'Alice', group: 'Engineering' },
  { value: 'bob', label: 'Bob', group: 'Engineering' },
  { value: 'dan', label: 'Dan', group: 'Design' },
  { value: 'eve', label: 'Eve', group: 'Design' },
];

<MultiSelectChipInput
  options={options}
  value={selected}
  onChange={setSelected}
  label="Team Members"
  selectAll
/>`}
        >
          <div className="w-80">
            <MultiSelectChipInput
              options={teamMembers}
              value={groupSelected}
              onChange={setGroupSelected}
              label="Team Members"
              selectAll
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Variants ── */}
      <section id="variants">
        <h2 id="variants" className="text-lg font-semibold text-text mt-10 mb-1">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three chip variants — primary, secondary, and tertiary — style the selected chips within the input.
        </p>

        <div className="space-y-6">
          {[
            { v: 'primary', label: 'Primary', selected: variantPrimarySelected, setSelected: setVariantPrimarySelected },
            { v: 'secondary', label: 'Secondary', selected: variantSecondarySelected, setSelected: setVariantSecondarySelected },
            { v: 'tertiary', label: 'Tertiary', selected: variantTertiarySelected, setSelected: setVariantTertiarySelected },
          ].map(({ v, label: variantLabel, selected: sel, setSelected: setSel }) => (
            <div key={v}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2">{variantLabel}</h3>
              <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
                <div className="w-80">
                  <MultiSelectChipInput
                    options={frameworks.slice(0, 6)}
                    value={sel}
                    onChange={setSel}
                    variant={v}
                    label="Frameworks"
                    placeholder="Select..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sizes ── */}
      <section id="sizes">
        <h2 id="sizes" className="text-lg font-semibold text-text mt-10 mb-1">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three size tiers: sm (28px), md (32px), and lg (40px).
        </p>

        <div className="space-y-6">
          {[
            { s: 'sm', label: 'Small', selected: sizeSmSelected, setSelected: setSizeSmSelected },
            { s: 'md', label: 'Medium', selected: sizeMdSelected, setSelected: setSizeMdSelected },
            { s: 'lg', label: 'Large', selected: sizeLgSelected, setSelected: setSizeLgSelected },
          ].map(({ s, label: sizeLabel, selected: sel, setSelected: setSel }) => (
            <div key={s}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2">{sizeLabel} ({s})</h3>
              <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
                <div className="w-80">
                  <MultiSelectChipInput
                    options={frameworks.slice(0, 6)}
                    value={sel}
                    onChange={setSel}
                    size={s}
                    label="Frameworks"
                    placeholder="Select..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Error & Warning Messages ── */}
      <section id="messages">
        <h2 id="error-warning" className="text-lg font-semibold text-text mt-10 mb-1">Error & Warning Messages</h2>
        <p className="text-sm text-text-secondary mb-4">
          Display contextual feedback below the input. Error and warning statuses show an icon and change the border color.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2">Error</h3>
            <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
              <div className="w-72">
                <MultiSelectChipInput
                  options={frameworks}
                  value={errorSelected}
                  onChange={setErrorSelected}
                  label="Frameworks"
                  status="error"
                  errorText="At least one framework is required"
                  placeholder="Select..."
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2">Warning</h3>
            <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
              <div className="w-72">
                <MultiSelectChipInput
                  options={frameworks}
                  value={warningSelected}
                  onChange={setWarningSelected}
                  label="Frameworks"
                  status="warning"
                  warningText="Maximum 5 frameworks recommended"
                  placeholder="Select..."
                />
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mt-6 mb-2">Helper Text</h3>
        <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
          <div className="w-80">
            <MultiSelectChipInput
              options={frameworks}
              value={basicSelected}
              onChange={setBasicSelected}
              label="Frameworks"
              helperText="Select the frameworks you have experience with"
              placeholder="Select..."
            />
          </div>
        </div>
      </section>

      {/* ── Disabled & ReadOnly ── */}
      <section id="disabled-readonly">
        <h2 id="disabled" className="text-lg font-semibold text-text mt-10 mb-1">Disabled & Read Only</h2>
        <p className="text-sm text-text-secondary mb-4">
          Disabled grays out the component. Read-only shows a dashed border and prevents interaction while keeping chips visible.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2">Disabled</h3>
            <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
              <div className="w-72">
                <MultiSelectChipInput
                  options={frameworks}
                  value={disabledSelected}
                  label="Frameworks"
                  disabled
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2">Read Only</h3>
            <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
              <div className="w-72">
                <MultiSelectChipInput
                  options={frameworks}
                  value={readOnlySelected}
                  label="Frameworks"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Usage Guidelines ── */}
      <section id="usage-guidelines">
        <h2 id="guidelines" className="text-lg font-semibold text-text mt-10 mb-1">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use when users need to select multiple items from a predefined list',
            'Enable selectAll for lists where bulk selection is common',
            'Use category grouping for large option sets with natural categories',
            'Set maxVisible for inputs where space is limited',
            'Provide error and helper text for form validation feedback',
          ]}
          dontItems={[
            'Do not use for single-select — use SelectDropdown instead',
            'Avoid for fewer than 3 options — use Checkbox group instead',
            'Do not nest category groups (flat grouping only)',
            'Do not disable individual chips — disable the entire component or remove options',
            'Avoid mixing variants between the component and other form elements in the same group',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>The trigger has <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="combobox"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-expanded</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-haspopup="listbox"</code>.</>,
            <>The dropdown uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="listbox"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-multiselectable="true"</code>.</>,
            <>Each option has <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="option"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-selected</code>.</>,
            <>Category groups use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="group"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code>.</>,
            <><code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-invalid</code> is set on the container when status is error.</>,
            'Escape key closes the dropdown. Backspace removes the last chip when the search input is empty.',
            <>Chip removal buttons have <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label="Remove"</code> from the Chip component.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── API Reference ── */}
      <section id="api-reference">
        <h2 id="api" className="text-lg font-semibold text-text mt-10 mb-1">API Reference</h2>
        <PropsTable props={multiSelectChipInputProps} />
      </section>
    </article>
  );
}
