import { useState } from 'react';
import { Tabstrip, Tab, TabPanel } from '@/components/navigation/Tabstrip';
import DropdownList from '@/components/containers/DropdownList';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';

import homeSvg from '@/assets/icons/o9con-home.svg?raw';
import gridSvg from '@/assets/icons/o9con-grid.svg?raw';
import settingSvg from '@/assets/icons/o9con-setting-edit.svg?raw';
import userSvg from '@/assets/icons/o9con-user.svg?raw';
import chartSvg from '@/assets/icons/o9con-bar-chart.svg?raw';
import fileSvg from '@/assets/icons/o9con-file-o.svg?raw';
import calendarSvg from '@/assets/icons/o9con-calendar.svg?raw';
import binSvg from '@/assets/icons/o9con-bin.svg?raw';
import copySvg from '@/assets/icons/o9con-copy.svg?raw';
import pencilSvg from '@/assets/icons/o9con-pencil.svg?raw';

const tabstripProps = [
  { name: 'value', type: 'string', default: '—', description: 'The currently active tab value' },
  { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Callback fired when a tab is clicked' },
  { name: 'variant', type: "'underline' | 'filled' | 'outline'", default: "'underline'", description: 'Visual style of the tab strip' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height and padding of the tabs' },
  { name: 'overflow', type: 'number', default: 'undefined', description: 'Maximum visible tabs. Remaining tabs are shown in an overflow dropdown.' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

const tabProps = [
  { name: 'value', type: 'string', default: '—', description: 'Unique identifier for this tab' },
  { name: 'label', type: 'string', default: '—', description: 'Text label displayed in the tab. Omit for icon-only tabs.' },
  { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Optional icon. When label is omitted, renders icon-only tab.' },
  { name: 'badge', type: 'number | string', default: 'undefined', description: 'Optional badge count shown after the label' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the tab is disabled and non-interactive' },
  { name: 'pinned', type: 'boolean', default: 'false', description: 'Whether the tab shows a pinned indicator (use with onPin)' },
  { name: 'onPin', type: '(value: string) => void', default: 'undefined', description: 'Callback when pin button is clicked. Enables pin action.' },
  { name: 'closable', type: 'boolean', default: 'false', description: 'Shows a close button on the tab' },
  { name: 'onClose', type: '(value: string) => void', default: 'undefined', description: 'Callback when close button is clicked' },
  { name: 'moreActions', type: 'ReactNode', default: 'undefined', description: 'A DropdownList rendered in a portal when the dropdown action is clicked' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function TabstripPage() {
  const [variant, setVariant] = useState('underline');
  const [size, setSize] = useState('md');
  const [activeDemo, setActiveDemo] = useState('overview');
  const [activeVariants, setActiveVariants] = useState('underline');
  const [activeSizes, setActiveSizes] = useState('md');
  const [activeBadge, setActiveBadge] = useState('alerts');
  const [activeIcons, setActiveIcons] = useState('home');
  const [activeFilled, setActiveFilled] = useState('tab1');
  const [activeOutline, setActiveOutline] = useState('tab1');
  const [activeIconOnly, setActiveIconOnly] = useState('home');

  return (
    <article>
      <PageHeader
        title="Tabstrip"
        description="Tabstrips organise related content into discrete views, letting users switch between them without leaving the current context."
        status="stable"
        category="Navigation"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">
          Experiment with Tabstrip using the controls below.
        </p>
        <ComponentDemo
          controls={[
            { type: 'select', label: 'Variant', value: variant, onChange: setVariant, options: ['underline', 'filled', 'outline'] },
            { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
          ]}
        >
          <div className="w-full">
            <Tabstrip value={activeDemo} onChange={setActiveDemo} variant={variant} size={size}>
              <Tab value="overview" label="Overview" />
              <Tab value="details" label="Details" />
              <Tab value="history" label="History" />
              <Tab value="disabled" label="Disabled" disabled />
            </Tabstrip>
            <TabPanel value="overview">
              <p className="text-sm text-text-secondary">Overview content panel.</p>
            </TabPanel>
            <TabPanel value="details">
              <p className="text-sm text-text-secondary">Details content panel.</p>
            </TabPanel>
            <TabPanel value="history">
              <p className="text-sm text-text-secondary">History content panel.</p>
            </TabPanel>
          </div>
        </ComponentDemo>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three visual variants to match different UI contexts.
        </p>

        <div className="space-y-6">
          {/* Underline */}
          <CodeExample label="Underline (default)" code={`<Tabstrip value={tab} onChange={setTab} variant="underline">
  <Tab value="a" label="Overview" />
  <Tab value="b" label="Details" />
  <Tab value="c" label="History" />
</Tabstrip>`}>
            <Tabstrip value={activeVariants} onChange={setActiveVariants} variant="underline">
              <Tab value="underline" label="Overview" />
              <Tab value="details" label="Details" />
              <Tab value="history" label="History" />
            </Tabstrip>
          </CodeExample>

          {/* Filled */}
          <CodeExample label="Filled" code={`<Tabstrip value={tab} onChange={setTab} variant="filled">
  <Tab value="a" label="Tab One" />
  <Tab value="b" label="Tab Two" />
  <Tab value="c" label="Tab Three" />
</Tabstrip>`}>
            <Tabstrip value={activeFilled} onChange={setActiveFilled} variant="filled">
              <Tab value="tab1" label="Tab One" />
              <Tab value="tab2" label="Tab Two" />
              <Tab value="tab3" label="Tab Three" />
            </Tabstrip>
          </CodeExample>

          {/* Outline */}
          <CodeExample label="Outline" code={`<Tabstrip value={tab} onChange={setTab} variant="outline">
  <Tab value="a" label="Tab One" />
  <Tab value="b" label="Tab Two" />
  <Tab value="c" label="Tab Three" />
</Tabstrip>`}>
            <Tabstrip value={activeOutline} onChange={setActiveOutline} variant="outline">
              <Tab value="tab1" label="Tab One" />
              <Tab value="tab2" label="Tab Two" />
              <Tab value="tab3" label="Tab Three" />
            </Tabstrip>
          </CodeExample>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three height variants — sm (32px), md (40px), lg (48px).
        </p>
        <div className="space-y-4">
          {['sm', 'md', 'lg'].map((s) => (
            <div key={s}>
              <p className="mb-2 text-xs font-bold tracking-widest uppercase text-text-tertiary">{s.toUpperCase()}</p>
              <Tabstrip value={activeSizes} onChange={setActiveSizes} variant="underline" size={s}>
                <Tab value="md" label="Overview" />
                <Tab value="details" label="Details" />
                <Tab value="history" label="History" />
              </Tabstrip>
            </div>
          ))}
        </div>
      </section>

      {/* With Icons */}
      <section className="mb-12">
        <h2 id="with-icons" className="text-xl font-black tracking-tight text-text mb-2">With Icons</h2>
        <p className="text-sm text-text-secondary mb-4">
          Icons can be added before the label for additional context.
        </p>
        <CodeExample code={`<Tab value="home" label="Home" icon={<O9Icon svg={homeSvg} />} />
<Tab value="grid" label="Grid" icon={<O9Icon svg={gridSvg} />} />
<Tab value="settings" label="Settings" icon={<O9Icon svg={settingSvg} />} />`}>
          <Tabstrip value={activeIcons} onChange={setActiveIcons} variant="underline">
            <Tab value="home" label="Home" icon={<O9Icon svg={homeSvg} />} />
            <Tab value="grid" label="Grid" icon={<O9Icon svg={gridSvg} />} />
            <Tab value="settings" label="Settings" icon={<O9Icon svg={settingSvg} />} />
          </Tabstrip>
        </CodeExample>
      </section>

      {/* Icon Only */}
      <section className="mb-12">
        <h2 id="icon-only" className="text-xl font-black tracking-tight text-text mb-2">Icon Only</h2>
        <p className="text-sm text-text-secondary mb-4">
          When <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">icon</code> is provided
          without a <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">label</code>, the tab
          renders as a square icon-only button. Always provide an accessible label
          via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-label</code>.
        </p>
        <div className="space-y-6">
          {['underline', 'filled', 'outline'].map((v) => (
            <CodeExample key={v} label={v.charAt(0).toUpperCase() + v.slice(1)}>
              <Tabstrip value={activeIconOnly} onChange={setActiveIconOnly} variant={v}>
                <Tab value="home" icon={<O9Icon svg={homeSvg} />} aria-label="Home" />
                <Tab value="grid" icon={<O9Icon svg={gridSvg} />} aria-label="Grid" />
                <Tab value="settings" icon={<O9Icon svg={settingSvg} />} aria-label="Settings" />
                <Tab value="user" icon={<O9Icon svg={userSvg} />} aria-label="User" />
              </Tabstrip>
            </CodeExample>
          ))}
        </div>
      </section>

      {/* With Badge */}
      <section className="mb-12">
        <h2 id="with-badge" className="text-xl font-black tracking-tight text-text mb-2">With Badge</h2>
        <p className="text-sm text-text-secondary mb-4">
          Badge counts surface unread items or pending actions.
        </p>
        <CodeExample code={`<Tab value="inbox" label="Inbox" badge={24} />
<Tab value="alerts" label="Alerts" badge={3} />
<Tab value="all" label="All" />`}>
          <Tabstrip value={activeBadge} onChange={setActiveBadge} variant="underline">
            <Tab value="inbox" label="Inbox" badge={24} />
            <Tab value="alerts" label="Alerts" badge={3} />
            <Tab value="all" label="All" />
          </Tabstrip>
        </CodeExample>
      </section>

      {/* Overflow */}
      <section className="mb-12">
        <h2 id="overflow" className="text-xl font-black tracking-tight text-text mb-2">Overflow</h2>
        <p className="text-sm text-text-secondary mb-4">
          Set the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">overflow</code> prop to
          limit visible tabs. Excess tabs are accessible via a ⋯ dropdown menu.
        </p>
        <CodeExample code={`<Tabstrip overflow={3} value={tab} onChange={setTab}>
  <Tab value="a" label="Overview" />
  <Tab value="b" label="Details" />
  <Tab value="c" label="History" />
  <Tab value="d" label="Analytics" />
  <Tab value="e" label="Settings" />
  <Tab value="f" label="Files" />
</Tabstrip>`}>
          <OverflowDemo />
        </CodeExample>
      </section>

      {/* Tab Actions */}
      <section className="mb-12">
        <h2 id="tab-actions" className="text-xl font-black tracking-tight text-text mb-2">Tab Actions</h2>
        <p className="text-sm text-text-secondary mb-4">
          Individual tabs can have Pin, Close, and Dropdown actions. Actions appear on hover and are always visible on the active tab.
        </p>

        <div className="space-y-6">
          <CodeExample label="Closable Tabs" code={`<Tab value="a" label="File.tsx" closable onClose={(v) => handleClose(v)} />`}>
            <ClosableTabsDemo />
          </CodeExample>

          <CodeExample label="Pin + Close + Dropdown" code={`<Tab
  value="a"
  label="Overview"
  pinned={isPinned}
  onPin={(v) => togglePin(v)}
  closable
  onClose={(v) => handleClose(v)}
  moreActions={<DropdownList>…</DropdownList>}
/>`}>
            <FullActionsDemo />
          </CodeExample>
        </div>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <p className="text-sm text-text-secondary mb-4">
          Active, default, hover, and disabled states.
        </p>
        <CodeExample code={`<Tab value="active" label="Active" />
<Tab value="default" label="Default" />
<Tab value="disabled" label="Disabled" disabled />`}>
          <Tabstrip value="active" variant="underline">
            <Tab value="active" label="Active" />
            <Tab value="default" label="Default" />
            <Tab value="disabled" label="Disabled" disabled />
          </Tabstrip>
        </CodeExample>
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use tabstrips to divide a view into distinct, parallel content sections',
            'Keep tab labels short — one to three words maximum',
            'Use the underline variant for primary page-level navigation',
            'Use the filled variant for compact sections like panels or sidebars',
            'Use overflow to manage many tabs instead of scrolling',
            'Indicate unread counts or pending items with the badge prop',
          ]}
          dontItems={[
            'Do not use tabstrips as a stepper or multi-step flow — use a dedicated stepper',
            'Avoid nesting tabstrips more than one level deep',
            'Do not hide tabs based on permissions — use disabled state instead',
            'Avoid more than 7 visible tabs; use overflow for large tab sets',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">role="tablist"</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">role="tab"</code> for full ARIA compliance.</>,
            <>Active tab carries <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-selected="true"</code>; inactive tabs carry <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-selected="false"</code>.</>,
            <>Disabled tabs set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-disabled="true"</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">disabled</code> to prevent interaction.</>,
            'Tab panels are associated with their triggering tab via matching value prop.',
            'Focus ring is visible only on keyboard navigation via :focus-visible.',
            <>Action buttons (pin, close, dropdown) each have <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-label</code> for screen reader identification.</>,
            <>Overflow menu uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-haspopup="menu"</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-expanded</code> attributes.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* API */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <h3 className="text-sm font-bold text-text mb-3 mt-6">Tabstrip</h3>
        <PropsTable props={tabstripProps} />
        <h3 className="text-sm font-bold text-text mb-3 mt-8">Tab</h3>
        <PropsTable props={tabProps} />
      </section>
    </article>
  );
}

/* ─────────────────────────────────────────────
   OverflowDemo — tabs with overflow
   ───────────────────────────────────────────── */
function OverflowDemo() {
  const [active, setActive] = useState('overview');
  return (
    <Tabstrip value={active} onChange={setActive} overflow={3}>
      <Tab value="overview" label="Overview" icon={<O9Icon svg={homeSvg} />} />
      <Tab value="details" label="Details" icon={<O9Icon svg={fileSvg} />} />
      <Tab value="history" label="History" icon={<O9Icon svg={calendarSvg} />} />
      <Tab value="analytics" label="Analytics" icon={<O9Icon svg={chartSvg} />} />
      <Tab value="settings" label="Settings" icon={<O9Icon svg={settingSvg} />} />
      <Tab value="users" label="Users" icon={<O9Icon svg={userSvg} />} />
    </Tabstrip>
  );
}

/* ─────────────────────────────────────────────
   ClosableTabsDemo
   ───────────────────────────────────────────── */
function ClosableTabsDemo() {
  const [tabs, setTabs] = useState([
    { value: 'index', label: 'index.tsx' },
    { value: 'app', label: 'App.tsx' },
    { value: 'utils', label: 'utils.ts' },
    { value: 'styles', label: 'styles.css' },
  ]);
  const [active, setActive] = useState('index');

  const handleClose = (val) => {
    const next = tabs.filter((t) => t.value !== val);
    setTabs(next);
    if (active === val && next.length > 0) {
      setActive(next[0].value);
    }
  };

  return (
    <Tabstrip value={active} onChange={setActive}>
      {tabs.map((t) => (
        <Tab key={t.value} value={t.value} label={t.label} closable onClose={handleClose} />
      ))}
    </Tabstrip>
  );
}

/* ─────────────────────────────────────────────
   FullActionsDemo — pin + close + dropdown
   ───────────────────────────────────────────── */
function FullActionsDemo() {
  const [active, setActive] = useState('overview');
  const [pinned, setPinned] = useState(new Set(['overview']));

  const togglePin = (val) => {
    setPinned((prev) => {
      const next = new Set(prev);
      if (next.has(val)) next.delete(val);
      else next.add(val);
      return next;
    });
  };

  const moreMenu = (
    <DropdownList>
      <DropdownList.Item icon={<O9Icon svg={copySvg} />}>Duplicate</DropdownList.Item>
      <DropdownList.Item icon={<O9Icon svg={pencilSvg} />}>Rename</DropdownList.Item>
      <DropdownList.Divider />
      <DropdownList.Item icon={<O9Icon svg={binSvg} />}>Delete</DropdownList.Item>
    </DropdownList>
  );

  return (
    <Tabstrip value={active} onChange={setActive}>
      <Tab
        value="overview"
        label="Overview"
        icon={<O9Icon svg={homeSvg} />}
        pinned={pinned.has('overview')}
        onPin={togglePin}
        closable
        onClose={() => {}}
        moreActions={moreMenu}
      />
      <Tab
        value="details"
        label="Details"
        icon={<O9Icon svg={fileSvg} />}
        pinned={pinned.has('details')}
        onPin={togglePin}
        closable
        onClose={() => {}}
        moreActions={moreMenu}
      />
      <Tab
        value="settings"
        label="Settings"
        icon={<O9Icon svg={settingSvg} />}
        pinned={pinned.has('settings')}
        onPin={togglePin}
        closable
        onClose={() => {}}
        moreActions={moreMenu}
      />
    </Tabstrip>
  );
}
