import { useState } from 'react';
import SplitButton from '@/components/buttons/SplitButton';
import DropdownList from '@/components/containers/DropdownList';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';

import saveAsSvg from '@/assets/icons/o9con-save-as.svg?raw';
import downloadSvg from '@/assets/icons/o9con-download.svg?raw';
import gridFilterSvg from '@/assets/icons/o9con-grid-filter.svg?raw';
import settingSvg from '@/assets/icons/o9con-setting-edit.svg?raw';
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';
import copySvg from '@/assets/icons/o9con-copy.svg?raw';
import exportSvg from '@/assets/icons/o9con-export.svg?raw';
import fileSvg from '@/assets/icons/o9con-file-o.svg?raw';
import fileAddSvg from '@/assets/icons/o9con-file-add.svg?raw';

const splitButtonProps = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
    default: "'primary'",
    description: 'Visual style variant — ghost is fully transparent with no border',
  },
  {
    name: 'size',
    type: "'xm' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Size — xm (20px), sm (24px), md (32px), lg (36px)',
  },
  {
    name: 'leadingIcon',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Icon element rendered before the label',
  },
  {
    name: 'tooltip',
    type: 'string',
    default: 'undefined',
    description: 'Tooltip label for the main action button (shown on hover in icon-only mode)',
  },
  {
    name: 'tooltipPlacement',
    type: 'string',
    default: "'top'",
    description: 'Tooltip placement relative to the button (top, bottom, left, right)',
  },
  {
    name: 'triggerTooltip',
    type: 'string',
    default: "'More actions'",
    description: 'Tooltip label for the dropdown trigger arrow button',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables both the action button and the dropdown trigger',
  },
  {
    name: 'disabledAction',
    type: 'boolean',
    default: 'false',
    description: 'Disables only the primary action button (left zone)',
  },
  {
    name: 'disabledTrigger',
    type: 'boolean',
    default: 'false',
    description: 'Disables only the dropdown trigger (right zone)',
  },
  {
    name: 'onClick',
    type: '() => void',
    default: 'undefined',
    description: 'Handler for the primary action click',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Callback when the dropdown open state changes',
  },
  {
    name: 'menu',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Composable <DropdownList> content rendered as the dropdown panel',
  },
  {
    name: 'menuItems',
    type: 'Array<{ label, onClick?, disabled? }>',
    default: '[]',
    description: 'Legacy flat menu items array (use menu prop instead for rich content)',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Primary action label content',
  },
];

const sampleMenuItems = [
  { label: 'Save as Draft' },
  { label: 'Save & Close' },
  { label: 'Save as Template' },
];

export default function SplitButtonPage() {
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);

  return (
    <article>
      <PageHeader
        title="Split Button"
        description="A split button separates a primary action from a dropdown of related secondary actions. The left section performs the default action; the right arrow opens a menu of alternatives. Supports rich dropdown lists, search, drill-down submenus, and independent disable for each zone."
        status="stable"
        category="Buttons & Actions"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">
          Interactive Demo
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Click the main area for the primary action, or the arrow for alternatives.
        </p>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Variant',
              value: variant,
              onChange: setVariant,
              options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
            },
            {
              type: 'select',
              label: 'Size',
              value: size,
              onChange: setSize,
              options: ['xm', 'sm', 'md', 'lg'],
            },
            {
              type: 'checkbox',
              label: 'Disabled',
              value: disabled,
              onChange: setDisabled,
            },
            {
              type: 'checkbox',
              label: 'Icon Only',
              value: iconOnly,
              onChange: setIconOnly,
            },
          ]}
        >
          <SplitButton
            variant={variant}
            size={size}
            disabled={disabled}
            leadingIcon={iconOnly ? <O9Icon svg={saveAsSvg} /> : undefined}
            aria-label={iconOnly ? 'Save' : undefined}
            menu={
              <DropdownList>
                <DropdownList.Section>
                  <DropdownList.Header>Save Options</DropdownList.Header>
                  <DropdownList.Item icon={<O9Icon svg={saveAsSvg} />} shortcut="⌘S">
                    Save as Draft
                  </DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={exportSvg} />} shortcut="⌘⇧S">
                    Save &amp; Close
                  </DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={fileSvg} />}>
                    Save as Template
                  </DropdownList.Item>
                </DropdownList.Section>
              </DropdownList>
            }
          >
            {iconOnly ? null : 'Save'}
          </SplitButton>
        </ComponentDemo>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">
          Variants
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          All standard button variants are supported with a visual divider between the action and the dropdown trigger.
        </p>
        <CodeExample
          code={`<SplitButton variant="primary" menuItems={items}>Save</SplitButton>
<SplitButton variant="secondary" menuItems={items}>Save</SplitButton>
<SplitButton variant="outline" menuItems={items}>Save</SplitButton>
<SplitButton variant="ghost" menuItems={items}>Save</SplitButton>
<SplitButton variant="danger" menuItems={items}>Delete</SplitButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <SplitButton variant="primary" menuItems={sampleMenuItems}>Save</SplitButton>
            <SplitButton variant="secondary" menuItems={sampleMenuItems}>Save</SplitButton>
            <SplitButton variant="outline" menuItems={sampleMenuItems}>Save</SplitButton>
            <SplitButton variant="ghost" menuItems={sampleMenuItems}>Save</SplitButton>
            <SplitButton variant="danger" menuItems={sampleMenuItems}>Delete</SplitButton>
          </div>
        </CodeExample>
      </section>

      {/* With Leading Icon */}
      <section className="mb-12">
        <h2 id="with-icon" className="text-xl font-black tracking-tight text-text mb-2">
          With Leading Icon
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Add a leading icon from the o9con Icon system to reinforce the primary action.
        </p>
        <CodeExample
          code={`<SplitButton leadingIcon={<O9Icon svg={saveAsSvg} />} menuItems={items}>
  Save
</SplitButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <SplitButton leadingIcon={<O9Icon svg={saveAsSvg} />} menuItems={sampleMenuItems}>
              Save
            </SplitButton>
            <SplitButton variant="outline" leadingIcon={<O9Icon svg={downloadSvg} />} menuItems={sampleMenuItems}>
              Export
            </SplitButton>
          </div>
        </CodeExample>
      </section>

      {/* Icon Only */}
      <section className="mb-12">
        <h2 id="icon-only" className="text-xl font-black tracking-tight text-text mb-2">
          Icon Only
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          When <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">leadingIcon</code> is provided
          without any label text, the main action button renders as a square icon-only zone paired with the dropdown trigger.
          Use the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">tooltip</code> prop to display a Tooltip on hover. The dropdown trigger arrow always shows a Tooltip (default: "More actions", configurable via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">triggerTooltip</code>).
        </p>
        <CodeExample
          code={`<SplitButton
  leadingIcon={<O9Icon svg={saveAsSvg} />}
  tooltip="Save"
  aria-label="Save"
  menuItems={items}
/>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <SplitButton leadingIcon={<O9Icon svg={saveAsSvg} />} tooltip="Save" aria-label="Save" menuItems={sampleMenuItems} />
            <SplitButton variant="outline" leadingIcon={<O9Icon svg={downloadSvg} />} tooltip="Download" aria-label="Download" menuItems={sampleMenuItems} />
            <SplitButton variant="secondary" leadingIcon={<O9Icon svg={gridFilterSvg} />} tooltip="Filter" aria-label="Filter" menuItems={sampleMenuItems} />
            <SplitButton variant="danger" leadingIcon={<O9Icon svg={settingSvg} />} tooltip="Settings" aria-label="Settings" menuItems={sampleMenuItems} />
          </div>
        </CodeExample>

        <div className="mt-6">
          <p className="text-sm text-text-secondary mb-4">
            Icon-only split buttons scale across all four sizes. Hover to see the Tooltip on each.
          </p>
          <CodeExample
            code={`<SplitButton size="xm" leadingIcon={…} tooltip="Add new" aria-label="Add" menuItems={items} />
<SplitButton size="sm" leadingIcon={…} tooltip="Add new" aria-label="Add" menuItems={items} />
<SplitButton size="md" leadingIcon={…} tooltip="Add new" aria-label="Add" menuItems={items} />
<SplitButton size="lg" leadingIcon={…} tooltip="Add new" aria-label="Add" menuItems={items} />`}
          >
            <div className="flex flex-wrap items-center gap-4">
              {['xm', 'sm', 'md', 'lg'].map((sz) => (
                <SplitButton
                  key={sz}
                  size={sz}
                  variant="outline"
                  leadingIcon={<O9Icon svg={plusSvg} />}
                  tooltip="Add new"
                  aria-label="Add new"
                  menuItems={sampleMenuItems}
                />
              ))}
            </div>
          </CodeExample>
        </div>
      </section>

      {/* Disabled States */}
      <section className="mb-12">
        <h2 id="disabled" className="text-xl font-black tracking-tight text-text mb-2">
          Disabled States
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Each zone can be disabled independently
          with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">disabledAction</code> or <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">disabledTrigger</code>,
          or both at once with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">disabled</code>.
        </p>
        <CodeExample
          code={`{/* Disable only the action — dropdown still works */}
<SplitButton disabledAction menuItems={items}>Save</SplitButton>

{/* Disable only the trigger — action still works */}
<SplitButton disabledTrigger menuItems={items}>Save</SplitButton>

{/* Disable both */}
<SplitButton disabled menuItems={items}>Save</SplitButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <SplitButton
                variant="outline"
                disabledAction
                menu={
                  <DropdownList>
                    <DropdownList.Item icon={<O9Icon svg={saveAsSvg} />}>Save as Draft</DropdownList.Item>
                    <DropdownList.Item icon={<O9Icon svg={exportSvg} />}>Save &amp; Close</DropdownList.Item>
                  </DropdownList>
                }
              >
                Save
              </SplitButton>
              <span className="text-2xs text-text-tertiary">Action disabled</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <SplitButton
                variant="outline"
                disabledTrigger
                menuItems={sampleMenuItems}
              >
                Save
              </SplitButton>
              <span className="text-2xs text-text-tertiary">Trigger disabled</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <SplitButton
                variant="outline"
                disabled
                menuItems={sampleMenuItems}
              >
                Save
              </SplitButton>
              <span className="text-2xs text-text-tertiary">Both disabled</span>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">
          Sizes
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Four sizes matching the standard Button size spec.
        </p>
        <CodeExample
          code={`<SplitButton size="xm" menuItems={items}>Extra Mini</SplitButton>
<SplitButton size="sm" menuItems={items}>Small</SplitButton>
<SplitButton size="md" menuItems={items}>Medium</SplitButton>
<SplitButton size="lg" menuItems={items}>Large</SplitButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <SplitButton size="xm" menuItems={sampleMenuItems}>Extra Mini</SplitButton>
            <SplitButton size="sm" menuItems={sampleMenuItems}>Small</SplitButton>
            <SplitButton size="md" menuItems={sampleMenuItems}>Medium</SplitButton>
            <SplitButton size="lg" menuItems={sampleMenuItems}>Large</SplitButton>
          </div>
        </CodeExample>

        <div className="mt-4 border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-overlay text-left text-text-tertiary">
                <th className="px-4 py-2 font-bold">Size</th>
                <th className="px-4 py-2 font-bold">Height</th>
                <th className="px-4 py-2 font-bold">Icon token</th>
                <th className="px-4 py-2 font-bold">Font</th>
                <th className="px-4 py-2 font-bold">Padding</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ['xm', '20 px', 'o9con-14', '--font-size-10', '6 px'],
                ['sm', '24 px', 'o9con-16', '--font-size-12', '8 px'],
                ['md', '32 px', 'o9con-20', '--font-size-14', '12 px'],
                ['lg', '36 px', 'o9con-24', '--font-size-16', '14 px'],
              ].map(([sz, h, tok, font, pad]) => (
                <tr key={sz} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-bold text-text">{sz}</td>
                  <td className="px-4 py-2">{h}</td>
                  <td className="px-4 py-2 font-mono">{tok}</td>
                  <td className="px-4 py-2 font-mono">{font}</td>
                  <td className="px-4 py-2">{pad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rich Dropdown List */}
      <section className="mb-12">
        <h2 id="rich-list" className="text-xl font-black tracking-tight text-text mb-2">
          Rich Dropdown List
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Use the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">menu</code> prop with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">DropdownList</code> sub-components
          to build structured menus with section headers, leading icons, and keyboard shortcuts.
        </p>
        <CodeExample
          code={`<SplitButton variant="outline" leadingIcon={…} menu={
  <DropdownList>
    <DropdownList.Section>
      <DropdownList.Header>File</DropdownList.Header>
      <DropdownList.Item icon={…} shortcut="⌘S">Save</DropdownList.Item>
      <DropdownList.Item icon={…} shortcut="⌘⇧S">Save As</DropdownList.Item>
    </DropdownList.Section>
    <DropdownList.Divider />
    <DropdownList.Section>
      <DropdownList.Header>Export</DropdownList.Header>
      <DropdownList.Item shortcut="⌘⇧E">Export CSV</DropdownList.Item>
    </DropdownList.Section>
  </DropdownList>
}>Save</SplitButton>`}
        >
          <SplitButton
            variant="outline"
            leadingIcon={<O9Icon svg={saveAsSvg} />}
            menu={
              <DropdownList>
                <DropdownList.Section>
                  <DropdownList.Header>File</DropdownList.Header>
                  <DropdownList.Item icon={<O9Icon svg={saveAsSvg} />} shortcut="⌘S">
                    Save
                  </DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={fileSvg} />} shortcut="⌘⇧S">
                    Save As
                  </DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={copySvg} />} shortcut="⌘C">
                    Copy
                  </DropdownList.Item>
                </DropdownList.Section>
                <DropdownList.Divider />
                <DropdownList.Section>
                  <DropdownList.Header>Export</DropdownList.Header>
                  <DropdownList.Item icon={<O9Icon svg={exportSvg} />} shortcut="⌘⇧E">
                    Export CSV
                  </DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={exportSvg} />} shortcut="⌘⇧P">
                    Export PDF
                  </DropdownList.Item>
                </DropdownList.Section>
              </DropdownList>
            }
          >
            Save
          </SplitButton>
        </CodeExample>
      </section>

      {/* With Search */}
      <section className="mb-12">
        <h2 id="with-search" className="text-xl font-black tracking-tight text-text mb-2">
          With Search
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Add <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">DropdownList.Search</code> at
          the top of the list to let users filter items. The search input auto-focuses when the dropdown opens.
        </p>
        <CodeExample
          code={`<SplitButton menu={
  <DropdownList>
    <DropdownList.Search value={query} onChange={setQuery} />
    <DropdownList.Section>
      {filtered.map(item => (
        <DropdownList.Item key={item}>{item}</DropdownList.Item>
      ))}
    </DropdownList.Section>
  </DropdownList>
}>Save</SplitButton>`}
        >
          <SearchDemo />
        </CodeExample>
      </section>

      {/* Drill-Down Submenu */}
      <section className="mb-12">
        <h2 id="drill-down" className="text-xl font-black tracking-tight text-text mb-2">
          Drill-Down Submenu
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Items with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">hasSubmenu</code> show
          a {">"} arrow. Hover to reveal nested panels — supports up to 3 levels of drill-down.
        </p>
        <CodeExample
          code={`<DropdownList.SubmenuItem label="Export As" submenuOpen={…} onMouseEnter={…}>
  <DropdownList.Item>CSV</DropdownList.Item>
  <DropdownList.Item>PDF</DropdownList.Item>
</DropdownList.SubmenuItem>`}
        >
          <DrillDownDemo />
        </CodeExample>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">
          Usage Guidelines
        </h2>
        <DoDont
          doItems={[
            'Use when there is a clear default action with related alternatives',
            'Make the primary (left) action the most commonly used option',
            'Keep dropdown items related to the primary action',
            'Use the menu prop with DropdownList for rich dropdown content',
            'Use disabledAction / disabledTrigger for independent zone control',
          ]}
          dontItems={[
            'Do not use when all actions are equally important — use a Button Group instead',
            'Avoid placing unrelated actions in the dropdown',
            'Do not deeply nest submenus beyond 3 levels',
            'Avoid using split buttons for navigation actions',
            'Do not mix drill-down and direct-action items within the same section',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">
          Accessibility
        </h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>The two zones are wrapped in a <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="group"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label="Split button"</code> for semantic grouping.</>,
            'Both the main action and the dropdown trigger are independently focusable and independently disableable.',
            <>The dropdown trigger uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-expanded</code>, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-haspopup="menu"</code>, and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-controls</code> to link the trigger to its portalled menu panel.</>,
            <>The dropdown trigger has an <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label="More options"</code> for screen readers.</>,
            <>Menu panels include <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="menu"</code>, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-orientation="vertical"</code>, and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-labelledby</code> pointing to the trigger button.</>,
            <>Items with shortcuts include <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-keyshortcuts</code> — screen readers announce the binding.</>,
            'Dropdown closes on outside click and Escape key press.',
            <>Full keyboard navigation: <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">↑/↓</code> move within current level, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">→</code> opens submenu, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">←</code> closes submenu, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Home/End</code> jump to first/last item.</>,
            'First menu item auto-focuses when the dropdown opens.',
            <>Decorative elements (icons, shortcut badges, dividers, arrow icon) are marked <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-hidden="true"</code> to reduce screen reader noise.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">
          API Reference
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Two-zone button with separated dropdown trigger. Pass composable content via the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">menu</code> prop.
        </p>
        <PropsTable props={splitButtonProps} />
      </section>
    </article>
  );
}

/* ─────────────────────────────────────────────
   SearchDemo — self-contained search example
   ───────────────────────────────────────────── */
function SearchDemo() {
  const [query, setQuery] = useState('');

  const allItems = [
    'Save as Draft',
    'Save & Close',
    'Save as Template',
    'Save & Publish',
    'Save to Cloud',
    'Save Locally',
  ];

  const filtered = query
    ? allItems.filter((label) => label.toLowerCase().includes(query.toLowerCase()))
    : allItems;

  return (
    <SplitButton
      variant="outline"
      leadingIcon={<O9Icon svg={saveAsSvg} />}
      menu={
        <DropdownList>
          <DropdownList.Search value={query} onChange={setQuery} placeholder="Search save options…" />
          <DropdownList.Section>
            {filtered.length > 0 ? (
              filtered.map((label) => (
                <DropdownList.Item key={label}>{label}</DropdownList.Item>
              ))
            ) : (
              <div className="px-3 py-2 text-xs text-text-tertiary">No results</div>
            )}
          </DropdownList.Section>
        </DropdownList>
      }
    >
      Save
    </SplitButton>
  );
}

/* ─────────────────────────────────────────────
   DrillDownDemo — 3-level nested submenu
   ───────────────────────────────────────────── */
function DrillDownDemo() {
  const [activeL1, setActiveL1] = useState(null);
  const [activeL2, setActiveL2] = useState(null);

  const clearAll = () => { setActiveL1(null); setActiveL2(null); };

  return (
    <SplitButton
      variant="outline"
      leadingIcon={<O9Icon svg={exportSvg} />}
      menu={
        <DropdownList>
          <DropdownList.Section>
            <DropdownList.Header>Export</DropdownList.Header>
            <DropdownList.SubmenuItem
              label="Export As"
              active={activeL1 === 'exportAs'}
              onMouseEnter={() => { setActiveL1('exportAs'); setActiveL2(null); }}
              submenuOpen={activeL1 === 'exportAs'}
            >
              <DropdownList.SubmenuItem
                label="Spreadsheet"
                active={activeL2 === 'spreadsheet'}
                onMouseEnter={() => setActiveL2('spreadsheet')}
                submenuOpen={activeL2 === 'spreadsheet'}
              >
                <DropdownList.Item>CSV</DropdownList.Item>
                <DropdownList.Item>XLSX</DropdownList.Item>
                <DropdownList.Item>TSV</DropdownList.Item>
              </DropdownList.SubmenuItem>
              <DropdownList.Item onMouseEnter={() => setActiveL2(null)}>
                PDF
              </DropdownList.Item>
              <DropdownList.Item onMouseEnter={() => setActiveL2(null)}>
                JSON
              </DropdownList.Item>
            </DropdownList.SubmenuItem>
            <DropdownList.SubmenuItem
              label="Send To"
              active={activeL1 === 'sendTo'}
              onMouseEnter={() => { setActiveL1('sendTo'); setActiveL2(null); }}
              submenuOpen={activeL1 === 'sendTo'}
            >
              <DropdownList.Item onMouseEnter={() => setActiveL2(null)}>
                Email
              </DropdownList.Item>
              <DropdownList.Item onMouseEnter={() => setActiveL2(null)}>
                Slack
              </DropdownList.Item>
              <DropdownList.Item onMouseEnter={() => setActiveL2(null)}>
                Teams
              </DropdownList.Item>
            </DropdownList.SubmenuItem>
            <DropdownList.Item onMouseEnter={clearAll} shortcut="⌘P">
              Print
            </DropdownList.Item>
          </DropdownList.Section>
        </DropdownList>
      }
    >
      Export
    </SplitButton>
  );
}
