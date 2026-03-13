import { useState } from 'react';
import { Tabstrip, Tab, TabPanel } from '@/components/navigation/Tabstrip';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 6.5L8 2l6 4.5V14H2V6.5z" />
  </svg>
);
const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="5" height="5"/><rect x="9" y="2" width="5" height="5"/>
    <rect x="2" y="9" width="5" height="5"/><rect x="9" y="9" width="5" height="5"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="2.5"/>
    <path d="M8 1.5v2m0 9v2M1.5 8h2m9 0h2M3.4 3.4l1.4 1.4m6.4 6.4l1.4 1.4M3.4 12.6l1.4-1.4m6.4-6.4l1.4-1.4"/>
  </svg>
);

const tabstripProps = [
  { name: 'value', type: 'string', default: '—', description: 'The currently active tab value' },
  { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Callback fired when a tab is clicked' },
  { name: 'variant', type: "'underline' | 'filled' | 'outline'", default: "'underline'", description: 'Visual style of the tab strip' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height and padding of the tabs' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

const tabProps = [
  { name: 'value', type: 'string', default: '—', description: 'Unique identifier for this tab' },
  { name: 'label', type: 'string', default: '—', description: 'Text label displayed in the tab' },
  { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Optional icon rendered before the label' },
  { name: 'badge', type: 'number | string', default: 'undefined', description: 'Optional badge count shown after the label' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the tab is disabled and non-interactive' },
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

  return (
    <article>
      <PageHeader
        title="Tabstrip"
        description="Tabstrips organise related content into discrete views, letting users switch between them without leaving the current context."
        status="beta"
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
        <CodeExample code={`<Tab value="home" label="Home" icon={<HomeIcon />} />
<Tab value="grid" label="Grid" icon={<GridIcon />} />
<Tab value="settings" label="Settings" icon={<SettingsIcon />} />`}>
          <Tabstrip value={activeIcons} onChange={setActiveIcons} variant="underline">
            <Tab value="home" label="Home" icon={<HomeIcon />} />
            <Tab value="grid" label="Grid" icon={<GridIcon />} />
            <Tab value="settings" label="Settings" icon={<SettingsIcon />} />
          </Tabstrip>
        </CodeExample>
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
            'Indicate unread counts or pending items with the badge prop',
          ]}
          dontItems={[
            'Do not use tabstrips as a stepper or multi-step flow — use a dedicated stepper',
            'Avoid nesting tabstrips more than one level deep',
            'Do not hide tabs based on permissions — use disabled state instead',
            'Avoid more than 7 tabs; prefer a dropdown or secondary nav',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-xl font-black tracking-tight text-text mb-2">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">role="tablist"</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">role="tab"</code> for full ARIA compliance.</>,
            <>Active tab carries <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-selected="true"</code>; inactive tabs carry <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-selected="false"</code>.</>,
            <>Disabled tabs set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">aria-disabled="true"</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">disabled</code> to prevent interaction.</>,
            'Tab panels are associated with their triggering tab via matching value prop.',
            'Focus ring is visible only on keyboard navigation via :focus-visible.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-white font-bold shrink-0">—</span>
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
