import { useState } from 'react';
import DropdownButton from '@/components/buttons/DropdownButton';
import DropdownList from '@/components/containers/DropdownList';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';

/* ── Icons for demos ── */
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';
import downloadSvg from '@/assets/icons/o9con-download.svg?raw';
import gridFilterSvg from '@/assets/icons/o9con-grid-filter.svg?raw';
import copySvg from '@/assets/icons/o9con-copy.svg?raw';
import fileAddSvg from '@/assets/icons/o9con-file-add.svg?raw';
import fileSvg from '@/assets/icons/o9con-file-o.svg?raw';
import saveAsSvg from '@/assets/icons/o9con-save-as.svg?raw';
import exportSvg from '@/assets/icons/o9con-export.svg?raw';
import settingSvg from '@/assets/icons/o9con-setting-edit.svg?raw';
import ellipsisVSvg from '@/assets/icons/o9con-ellipsis-v.svg?raw';

/* ── Props table data ── */
const dropdownButtonProps = [
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
    description: 'Tooltip label shown on hover for icon-only mode. Wraps the button in a Tooltip component.',
  },
  {
    name: 'tooltipPlacement',
    type: 'string',
    default: "'top'",
    description: 'Tooltip placement relative to the button (top, bottom, left, right)',
  },
  {
    name: 'indicator',
    type: 'boolean',
    default: 'false',
    description: 'Show an orange notification/unsaved-changes dot on the button',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the button is disabled',
  },
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled open state of the dropdown menu',
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
    description: 'Button label content',
  },
];

const dropdownListItemProps = [
  {
    name: 'icon',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Leading icon (O9Icon element)',
  },
  {
    name: 'shortcut',
    type: 'string',
    default: 'undefined',
    description: 'Keyboard shortcut label (e.g. "⌘R", "Ctrl+S")',
  },
  {
    name: 'hasSubmenu',
    type: 'boolean',
    default: 'false',
    description: 'Shows a ">" arrow indicating drill-down submenu',
  },
  {
    name: 'active',
    type: 'boolean',
    default: 'false',
    description: 'Highlighted / selected state',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the item',
  },
  {
    name: 'onClick',
    type: '() => void',
    default: 'undefined',
    description: 'Click handler',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Item label text',
  },
];

export default function DropdownButtonPage() {
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);

  return (
    <article>
      <PageHeader
        title="Dropdown Button"
        description="A button with a separated dropdown arrow zone that reveals a composable list of actions. Supports leading icons, indicator bubbles, section headers, keyboard shortcuts, and up to 3 levels of drill-down submenus."
        status="stable"
        category="Buttons & Actions"
      />

      {/* ═══ Interactive Demo ═══ */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">
          Interactive Demo
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Click the button to open the dropdown menu. The arrow zone is visually separated with balanced padding.
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
              label: 'Indicator',
              value: showIndicator,
              onChange: setShowIndicator,
            },
            {
              type: 'checkbox',
              label: 'Icon Only',
              value: iconOnly,
              onChange: setIconOnly,
            },
          ]}
        >
          <DropdownButton
            variant={variant}
            size={size}
            disabled={disabled}
            indicator={showIndicator}
            leadingIcon={<O9Icon svg={gridFilterSvg} />}
            aria-label={iconOnly ? 'Actions' : undefined}
            menu={
              <DropdownList>
                <DropdownList.Section>
                  <DropdownList.Header>Actions</DropdownList.Header>
                  <DropdownList.Item icon={<O9Icon svg={copySvg} />} shortcut="⌘C">
                    Copy
                  </DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={exportSvg} />} shortcut="⌘E">
                    Export
                  </DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={saveAsSvg} />} shortcut="⌘S">
                    Save As
                  </DropdownList.Item>
                </DropdownList.Section>
              </DropdownList>
            }
          >
            {iconOnly ? null : 'Actions'}
          </DropdownButton>
        </ComponentDemo>
      </section>

      {/* ═══ Variants ═══ */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">
          Variants
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Four button variants with a separated arrow zone. The divider color adapts to each variant.
        </p>
        <CodeExample
          code={`<DropdownButton variant="primary" menu={…}>Primary</DropdownButton>
<DropdownButton variant="secondary" menu={…}>Secondary</DropdownButton>
<DropdownButton variant="outline" menu={…}>Outline</DropdownButton>
<DropdownButton variant="ghost" menu={…}>Ghost</DropdownButton>
<DropdownButton variant="danger" menu={…}>Danger</DropdownButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            {['primary', 'secondary', 'outline', 'ghost', 'danger'].map((v) => (
              <DropdownButton
                key={v}
                variant={v}
                menu={
                  <DropdownList>
                    <DropdownList.Item>Option A</DropdownList.Item>
                    <DropdownList.Item>Option B</DropdownList.Item>
                    <DropdownList.Item>Option C</DropdownList.Item>
                  </DropdownList>
                }
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </DropdownButton>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ═══ Indicator Bubble ═══ */}
      <section className="mb-12">
        <h2 id="indicator" className="text-xl font-black tracking-tight text-text mb-2">
          Indicator Bubble
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          The <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">indicator</code> prop
          shows an orange dot to signal unsaved changes or pending notifications.
        </p>
        <CodeExample
          code={`<DropdownButton indicator menu={…}>
  Unsaved
</DropdownButton>

<DropdownButton variant="outline" indicator leadingIcon={…} menu={…}>
  Settings
</DropdownButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <DropdownButton
              indicator
              menu={
                <DropdownList>
                  <DropdownList.Item>Save Draft</DropdownList.Item>
                  <DropdownList.Item>Discard</DropdownList.Item>
                </DropdownList>
              }
            >
              Unsaved
            </DropdownButton>
            <DropdownButton
              variant="outline"
              indicator
              leadingIcon={<O9Icon svg={settingSvg} />}
              menu={
                <DropdownList>
                  <DropdownList.Item>Preferences</DropdownList.Item>
                  <DropdownList.Item>Account</DropdownList.Item>
                </DropdownList>
              }
            >
              Settings
            </DropdownButton>
          </div>
        </CodeExample>
      </section>

      {/* ═══ With Leading Icon ═══ */}
      <section className="mb-12">
        <h2 id="with-icon" className="text-xl font-black tracking-tight text-text mb-2">
          With Leading Icon
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Add a leading icon from the o9con Icon system for additional visual context alongside the label and arrow.
        </p>
        <CodeExample
          code={`import O9Icon from '@/components/O9Icon';
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';

<DropdownButton leadingIcon={<O9Icon svg={plusSvg} />} menu={…}>
  Create New
</DropdownButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <DropdownButton
              leadingIcon={<O9Icon svg={plusSvg} />}
              menu={
                <DropdownList>
                  <DropdownList.Item icon={<O9Icon svg={fileAddSvg} />}>New File</DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={fileSvg} />}>New Folder</DropdownList.Item>
                </DropdownList>
              }
            >
              Create New
            </DropdownButton>
            <DropdownButton
              variant="outline"
              leadingIcon={<O9Icon svg={downloadSvg} />}
              menu={
                <DropdownList>
                  <DropdownList.Item shortcut="⌘⇧E">Export CSV</DropdownList.Item>
                  <DropdownList.Item shortcut="⌘⇧P">Export PDF</DropdownList.Item>
                  <DropdownList.Item>Export JSON</DropdownList.Item>
                </DropdownList>
              }
            >
              Export
            </DropdownButton>
          </div>
        </CodeExample>
      </section>

      {/* ═══ Icon Only ═══ */}
      <section className="mb-12">
        <h2 id="icon-only" className="text-xl font-black tracking-tight text-text mb-2">
          Icon Only
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          When <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">leadingIcon</code> is provided
          without any label text (no <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">children</code>),
          the button renders in icon-only mode — showing just the icon and dropdown arrow. Use the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">tooltip</code> prop to display a Tooltip on hover for visual context. Always provide
          an <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-label</code> for accessibility.
        </p>
        <CodeExample
          code={`<DropdownButton
  leadingIcon={<O9Icon svg={ellipsisVSvg} />}
  tooltip="More actions"
  aria-label="More actions"
  menu={…}
/>

<DropdownButton
  variant="outline"
  leadingIcon={<O9Icon svg={gridFilterSvg} />}
  tooltip="Filter"
  aria-label="Filter"
  menu={…}
/>

<DropdownButton
  variant="secondary"
  leadingIcon={<O9Icon svg={settingSvg} />}
  tooltip="Settings"
  aria-label="Settings"
  menu={…}
/>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <DropdownButton
              leadingIcon={<O9Icon svg={ellipsisVSvg} />}
              tooltip="More actions"
              aria-label="More actions"
              menu={
                <DropdownList>
                  <DropdownList.Item icon={<O9Icon svg={copySvg} />} shortcut="⌘C">Copy</DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={exportSvg} />} shortcut="⌘E">Export</DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={saveAsSvg} />} shortcut="⌘S">Save As</DropdownList.Item>
                </DropdownList>
              }
            />
            <DropdownButton
              variant="outline"
              leadingIcon={<O9Icon svg={gridFilterSvg} />}
              tooltip="Filter"
              aria-label="Filter"
              menu={
                <DropdownList>
                  <DropdownList.Item>Filter by Name</DropdownList.Item>
                  <DropdownList.Item>Filter by Date</DropdownList.Item>
                  <DropdownList.Item>Filter by Status</DropdownList.Item>
                </DropdownList>
              }
            />
            <DropdownButton
              variant="secondary"
              leadingIcon={<O9Icon svg={settingSvg} />}
              tooltip="Settings"
              aria-label="Settings"
              menu={
                <DropdownList>
                  <DropdownList.Item>Preferences</DropdownList.Item>
                  <DropdownList.Item>Account</DropdownList.Item>
                  <DropdownList.Item>Notifications</DropdownList.Item>
                </DropdownList>
              }
            />
            <DropdownButton
              variant="secondary"
              leadingIcon={<O9Icon svg={plusSvg} />}
              tooltip="Add new"
              aria-label="Add new"
              menu={
                <DropdownList>
                  <DropdownList.Item icon={<O9Icon svg={fileAddSvg} />}>New File</DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={fileSvg} />}>New Folder</DropdownList.Item>
                </DropdownList>
              }
            />
            <DropdownButton
              variant="danger"
              leadingIcon={<O9Icon svg={downloadSvg} />}
              tooltip="Download"
              aria-label="Download"
              menu={
                <DropdownList>
                  <DropdownList.Item>Download CSV</DropdownList.Item>
                  <DropdownList.Item>Download PDF</DropdownList.Item>
                </DropdownList>
              }
            />
          </div>
        </CodeExample>

        {/* Icon-only sizes */}
        <div className="mt-6">
          <p className="text-sm text-text-secondary mb-4">
            Icon-only buttons scale across all four sizes. Hover to see the Tooltip on each.
          </p>
          <CodeExample
            code={`<DropdownButton size="xm" leadingIcon={…} tooltip="More actions" aria-label="More" menu={…} />
<DropdownButton size="sm" leadingIcon={…} tooltip="More actions" aria-label="More" menu={…} />
<DropdownButton size="md" leadingIcon={…} tooltip="More actions" aria-label="More" menu={…} />
<DropdownButton size="lg" leadingIcon={…} tooltip="More actions" aria-label="More" menu={…} />`}
          >
            <div className="flex flex-wrap items-center gap-4">
              {['xm', 'sm', 'md', 'lg'].map((sz) => (
                <DropdownButton
                  key={sz}
                  size={sz}
                  variant="outline"
                  leadingIcon={<O9Icon svg={ellipsisVSvg} />}
                  tooltip="More actions"
                  aria-label="More actions"
                  menu={
                    <DropdownList>
                      <DropdownList.Item>Option A</DropdownList.Item>
                      <DropdownList.Item>Option B</DropdownList.Item>
                    </DropdownList>
                  }
                />
              ))}
            </div>
          </CodeExample>
        </div>

        {/* Icon-only with indicator */}
        <div className="mt-6">
          <p className="text-sm text-text-secondary mb-4">
            Icon-only with indicator bubble — useful for compact toolbars with notification signals.
          </p>
          <CodeExample
            code={`<DropdownButton
  variant="outline"
  indicator
  leadingIcon={<O9Icon svg={settingSvg} />}
  tooltip="Settings"
  aria-label="Settings"
  menu={…}
/>`}
          >
            <div className="flex flex-wrap items-center gap-4">
              <DropdownButton
                variant="outline"
                indicator
                leadingIcon={<O9Icon svg={settingSvg} />}
                tooltip="Settings"
                aria-label="Settings"
                menu={
                  <DropdownList>
                    <DropdownList.Item>Preferences</DropdownList.Item>
                    <DropdownList.Item>Account</DropdownList.Item>
                  </DropdownList>
                }
              />
              <DropdownButton
                indicator
                leadingIcon={<O9Icon svg={ellipsisVSvg} />}
                tooltip="More actions"
                aria-label="More actions"
                menu={
                  <DropdownList>
                    <DropdownList.Item>Mark as Read</DropdownList.Item>
                    <DropdownList.Item>Dismiss All</DropdownList.Item>
                  </DropdownList>
                }
              />
            </div>
          </CodeExample>
        </div>
      </section>

      {/* ═══ Sizes ═══ */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">
          Sizes
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Four sizes matching the standard Button size spec. The arrow zone scales proportionally.
        </p>
        <CodeExample
          code={`<DropdownButton size="xm" menu={…}>Extra Mini</DropdownButton>
<DropdownButton size="sm" menu={…}>Small</DropdownButton>
<DropdownButton size="md" menu={…}>Medium</DropdownButton>
<DropdownButton size="lg" menu={…}>Large</DropdownButton>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            {[
              ['xm', 'Extra Mini'],
              ['sm', 'Small'],
              ['md', 'Medium'],
              ['lg', 'Large'],
            ].map(([sz, label]) => (
              <DropdownButton
                key={sz}
                size={sz}
                menu={
                  <DropdownList>
                    <DropdownList.Item>Option A</DropdownList.Item>
                    <DropdownList.Item>Option B</DropdownList.Item>
                  </DropdownList>
                }
              >
                {label}
              </DropdownButton>
            ))}
          </div>
        </CodeExample>

        {/* Spec table */}
        <div className="mt-4 border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-overlay text-left text-text-tertiary">
                <th className="px-4 py-2 font-bold">Size</th>
                <th className="px-4 py-2 font-bold">Height</th>
                <th className="px-4 py-2 font-bold">Lead Icon</th>
                <th className="px-4 py-2 font-bold">Arrow Icon</th>
                <th className="px-4 py-2 font-bold">Font</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ['xm', '20 px', 'o9con-14', 'o9con-14', '--font-size-10'],
                ['sm', '24 px', 'o9con-16', 'o9con-14', '--font-size-12'],
                ['md', '32 px', 'o9con-20', 'o9con-16', '--font-size-14'],
                ['lg', '36 px', 'o9con-24', 'o9con-20', '--font-size-16'],
              ].map(([sz, h, lead, arrow, font]) => (
                <tr key={sz} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-bold text-text">{sz}</td>
                  <td className="px-4 py-2">{h}</td>
                  <td className="px-4 py-2 font-mono">{lead}</td>
                  <td className="px-4 py-2 font-mono">{arrow}</td>
                  <td className="px-4 py-2 font-mono">{font}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══ Rich Dropdown List ═══ */}
      <section className="mb-12">
        <h2 id="rich-list" className="text-xl font-black tracking-tight text-text mb-2">
          Rich Dropdown List
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">DropdownList</code> sub-components
          to build structured menus with section headers, leading icons, and keyboard shortcut indicators.
        </p>
        <CodeExample
          code={`<DropdownButton variant="outline" menu={
  <DropdownList>
    <DropdownList.Section>
      <DropdownList.Header>File</DropdownList.Header>
      <DropdownList.Item icon={…} shortcut="⌘N">New</DropdownList.Item>
      <DropdownList.Item icon={…} shortcut="⌘O">Open</DropdownList.Item>
    </DropdownList.Section>
    <DropdownList.Divider />
    <DropdownList.Section>
      <DropdownList.Header>Export</DropdownList.Header>
      <DropdownList.Item shortcut="⌘⇧E">CSV</DropdownList.Item>
    </DropdownList.Section>
  </DropdownList>
}>File Menu</DropdownButton>`}
        >
          <DropdownButton
            variant="outline"
            leadingIcon={<O9Icon svg={fileSvg} />}
            menu={
              <DropdownList>
                <DropdownList.Section>
                  <DropdownList.Header>File</DropdownList.Header>
                  <DropdownList.Item icon={<O9Icon svg={fileAddSvg} />} shortcut="⌘N">
                    New
                  </DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={fileSvg} />} shortcut="⌘O">
                    Open
                  </DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={fileSvg} />} hasSubmenu>
                    Open Recent
                  </DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={saveAsSvg} />} shortcut="⌘S">
                    Save
                  </DropdownList.Item>
                </DropdownList.Section>
                <DropdownList.Divider />
                <DropdownList.Section>
                  <DropdownList.Header>Export</DropdownList.Header>
                  <DropdownList.Item icon={<O9Icon svg={exportSvg} />} hasSubmenu>
                    Export As
                  </DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={exportSvg} />} shortcut="⌘⇧P">
                    Print
                  </DropdownList.Item>
                </DropdownList.Section>
              </DropdownList>
            }
          >
            File Menu
          </DropdownButton>
        </CodeExample>
      </section>

      {/* ═══ With Search ═══ */}
      <section className="mb-12">
        <h2 id="with-search" className="text-xl font-black tracking-tight text-text mb-2">
          With Search
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Add <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">DropdownList.Search</code> at
          the top of the list to let users filter items. The search input auto-focuses when the dropdown opens.
        </p>
        <CodeExample
          code={`<DropdownList>
  <DropdownList.Search value={query} onChange={setQuery} />
  <DropdownList.Item>…filtered items…</DropdownList.Item>
</DropdownList>`}
        >
          <SearchDemo />
        </CodeExample>
      </section>

      {/* ═══ Drill-Down Submenu ═══ */}
      <section className="mb-12">
        <h2 id="drill-down" className="text-xl font-black tracking-tight text-text mb-2">
          Drill-Down Submenu
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Items with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">hasSubmenu</code> show
          a {">"} arrow. Hover to reveal nested panels — supports up to 3 levels of drill-down.
        </p>
        <CodeExample
          code={`<DropdownList.Item hasSubmenu onMouseEnter={…}>
  Insert
</DropdownList.Item>
{/* Submenu rendered via DropdownList.Submenu */}`}
        >
          <DrillDownDemo />
        </CodeExample>
      </section>

      {/* ═══ Usage Guidelines ═══ */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">
          Usage Guidelines
        </h2>
        <DoDont
          doItems={[
            'Use when a single button needs to expose multiple related options',
            'Use section headers to group related actions logically',
            'Show keyboard shortcuts for frequently used actions',
            'Use the indicator dot to signal unsaved changes or pending actions',
            'Keep drill-down to 3 levels maximum for usability',
          ]}
          dontItems={[
            'Do not use for navigation — use a nav menu or links instead',
            'Avoid placing too many items in a single section (max 7-8)',
            'Do not deeply nest submenus beyond 3 levels',
            'Avoid using a dropdown when there is only one action',
            'Do not mix drill-down and direct-action items within the same section',
          ]}
        />
      </section>

      {/* ═══ Accessibility ═══ */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">
          Accessibility
        </h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-expanded</code>, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-haspopup="menu"</code>, and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-controls</code> to link the button to its portalled menu panel.</>,
            <>Menu panels include <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="menu"</code>, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-orientation="vertical"</code>, and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-labelledby</code> pointing to the trigger button.</>,
            <>Submenu triggers expose <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-haspopup="menu"</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-expanded</code> to communicate the open/closed state of nested panels.</>,
            <>Items with shortcuts include <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-keyshortcuts</code> (e.g. "Meta+C") — screen readers announce the binding. Pressing the shortcut while the menu is open activates the item.</>,
            <>Section groups use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="group"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-labelledby</code> linking to their <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Header</code> element.</>,
            <>Angle icon swaps between <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">angle-down</code> (closed) and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">angle-up</code> (open) for clear visual state.</>,
            'Dropdown closes on outside click and Escape key press.',
            <>Full keyboard navigation: <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">↑/↓</code> move within current level, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">→</code> opens submenu, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">←</code> closes submenu, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Home/End</code> jump to first/last item, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">⌘/Ctrl+key</code> activates shortcut items.</>,
            'First menu item auto-focuses when the dropdown opens.',
            <>Decorative elements (icons, shortcut badges, dividers) are marked <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-hidden="true"</code> to reduce screen reader noise.</>,
            'Disabled state prevents opening the dropdown and removes from tab order.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ API Reference — DropdownButton ═══ */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">
          API Reference — DropdownButton
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Two-zone button with separated arrow. Pass composable content via the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">menu</code> prop.
        </p>
        <PropsTable props={dropdownButtonProps} />
      </section>

      {/* ═══ API Reference — DropdownList.Item ═══ */}
      <section className="mb-12">
        <h2 id="api-item" className="text-xl font-black tracking-tight text-text mb-2">
          API Reference — DropdownList.Item
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Individual menu item supporting leading icon, keyboard shortcut, and submenu drill-down arrow.
        </p>
        <PropsTable props={dropdownListItemProps} />
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
    'New File',
    'Open File',
    'Save As',
    'Export CSV',
    'Export PDF',
    'Copy',
    'Settings',
  ];

  const filtered = query
    ? allItems.filter((label) => label.toLowerCase().includes(query.toLowerCase()))
    : allItems;

  return (
    <DropdownButton
      variant="outline"
      leadingIcon={<O9Icon svg={gridFilterSvg} />}
      menu={
        <DropdownList>
          <DropdownList.Search value={query} onChange={setQuery} placeholder="Search actions…" />
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
      Search Actions
    </DropdownButton>
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
    <DropdownButton
      variant="outline"
      menu={
        <DropdownList>
          <DropdownList.Section>
            <DropdownList.Header>Insert</DropdownList.Header>
            <DropdownList.SubmenuItem
              label="Table"
              active={activeL1 === 'table'}
              onMouseEnter={() => { setActiveL1('table'); setActiveL2(null); }}
              submenuOpen={activeL1 === 'table'}
            >
              <DropdownList.SubmenuItem
                label="Pivot Table"
                active={activeL2 === 'pivot'}
                onMouseEnter={() => setActiveL2('pivot')}
                submenuOpen={activeL2 === 'pivot'}
              >
                <DropdownList.Item>Simple Pivot</DropdownList.Item>
                <DropdownList.Item>Cross-Tab</DropdownList.Item>
                <DropdownList.Item>Matrix</DropdownList.Item>
              </DropdownList.SubmenuItem>
              <DropdownList.Item onMouseEnter={() => setActiveL2(null)}>
                Data Table
              </DropdownList.Item>
              <DropdownList.Item onMouseEnter={() => setActiveL2(null)}>
                Summary Table
              </DropdownList.Item>
            </DropdownList.SubmenuItem>
            <DropdownList.SubmenuItem
              label="Chart"
              active={activeL1 === 'chart'}
              onMouseEnter={() => { setActiveL1('chart'); setActiveL2(null); }}
              submenuOpen={activeL1 === 'chart'}
            >
              <DropdownList.Item onMouseEnter={() => setActiveL2(null)}>
                Bar Chart
              </DropdownList.Item>
              <DropdownList.Item onMouseEnter={() => setActiveL2(null)}>
                Line Chart
              </DropdownList.Item>
              <DropdownList.SubmenuItem
                label="Pie Chart"
                active={activeL2 === 'pie'}
                onMouseEnter={() => setActiveL2('pie')}
                submenuOpen={activeL2 === 'pie'}
              >
                <DropdownList.Item>Flat Pie</DropdownList.Item>
                <DropdownList.Item>Donut</DropdownList.Item>
                <DropdownList.Item>3D Pie</DropdownList.Item>
              </DropdownList.SubmenuItem>
            </DropdownList.SubmenuItem>
            <DropdownList.Item onMouseEnter={clearAll}>
              Image
            </DropdownList.Item>
          </DropdownList.Section>
          <DropdownList.Divider />
          <DropdownList.Section>
            <DropdownList.Header>Format</DropdownList.Header>
            <DropdownList.SubmenuItem
              label="Text"
              active={activeL1 === 'text'}
              onMouseEnter={() => { setActiveL1('text'); setActiveL2(null); }}
              submenuOpen={activeL1 === 'text'}
            >
              <DropdownList.Item shortcut="⌘B">Bold</DropdownList.Item>
              <DropdownList.Item shortcut="⌘I">Italic</DropdownList.Item>
              <DropdownList.Item shortcut="⌘U">Underline</DropdownList.Item>
            </DropdownList.SubmenuItem>
            <DropdownList.Item onMouseEnter={clearAll}>
              Clear Formatting
            </DropdownList.Item>
          </DropdownList.Section>
        </DropdownList>
      }
    >
      Insert
    </DropdownButton>
  );
}
