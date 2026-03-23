import { useState } from 'react';
import Popover from '@/components/containers/Popover';
import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import DropdownButton from '@/components/buttons/DropdownButton';
import DropdownList from '@/components/containers/DropdownList';
import O9Icon from '@/components/O9Icon';
import Switch from '@/components/inputs/Switch';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

import gridFilterSvg from '@/assets/icons/o9con-grid-filter.svg?raw';
import filterSvg from '@/assets/icons/o9con-filter.svg?raw';
import searchSvg from '@/assets/icons/o9con-search.svg?raw';
import downloadSvg from '@/assets/icons/o9con-download.svg?raw';
import shareSvg from '@/assets/icons/o9con-share.svg?raw';
import copySvg from '@/assets/icons/o9con-copy.svg?raw';
import binSvg from '@/assets/icons/o9con-bin.svg?raw';

const popoverProps = [
  { name: 'trigger', type: 'ReactElement', default: '—', description: 'The element that opens the popover when clicked' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'", default: "'bottom'", description: 'Popover placement relative to the trigger' },
  { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled open state' },
  { name: 'onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Callback when open state changes' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Popover title — enables structured mode with header, body, and footer sections' },
  { name: 'hasBackBtn', type: 'boolean', default: 'false', description: 'Show a back arrow button in the header (left of title)' },
  { name: 'onBack', type: '() => void', default: 'undefined', description: 'Callback when the back button is clicked' },
  { name: 'headerActions', type: 'ReactNode', default: 'undefined', description: 'Action elements between the title and close button (e.g., Switch, IconButton, DropdownButton)' },
  { name: 'onClose', type: '() => void', default: 'undefined', description: 'Callback when the close button is clicked' },
  { name: 'stickyHeader', type: 'ReactNode', default: 'undefined', description: 'Non-scrolling content area below the header (e.g., description text, filters, search bar)' },
  { name: 'variant', type: "'space' | 'edge'", default: "'space'", description: 'Body layout — "space" applies default padding, "edge" removes horizontal padding for full-width content' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Popover body content (scrollable in structured mode)' },
  { name: 'primaryLabel', type: 'string', default: 'undefined', description: 'Primary CTA button label in the footer' },
  { name: 'onPrimaryClick', type: '() => void', default: 'undefined', description: 'Primary CTA button click handler — popover closes automatically after the callback executes' },
  { name: 'secondaryLabel', type: 'string', default: 'undefined', description: 'Secondary button label in the footer' },
  { name: 'onSecondaryClick', type: '() => void', default: 'undefined', description: 'Secondary button click handler — popover closes automatically after the callback executes' },
  { name: 'tertiaryIcon', type: 'string (SVG raw)', default: 'undefined', description: 'Tertiary icon button SVG for the footer — aligned to the left' },
  { name: 'onTertiaryClick', type: '() => void', default: 'undefined', description: 'Tertiary icon button click handler' },
  { name: 'tertiaryLabel', type: 'string', default: "'Additional action'", description: 'Accessible aria-label for the tertiary icon button' },
  { name: 'footer', type: 'ReactNode', default: 'undefined', description: 'Custom footer content — overrides individual footer button props' },
  { name: 'width', type: 'number | string', default: 'auto', description: 'Popover width — number (px) or string (CSS value). Max 700px.' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes for the popover panel' },
];

/* ── Sample data for demos ── */
const CHANNELS = [
  { name: 'North America', region: 'NA', active: true },
  { name: 'Europe', region: 'EU', active: true },
  { name: 'Asia Pacific', region: 'APAC', active: false },
  { name: 'Latin America', region: 'LATAM', active: true },
  { name: 'Middle East', region: 'MEA', active: false },
  { name: 'Sub-Saharan Africa', region: 'SSA', active: false },
];

const PRODUCTS = [
  { id: 1, name: 'Running Shoes', sku: 'RS-001', stock: 142 },
  { id: 2, name: 'Trail Boots', sku: 'TB-002', stock: 87 },
  { id: 3, name: 'Casual Sneakers', sku: 'CS-003', stock: 215 },
  { id: 4, name: 'Hiking Sandals', sku: 'HS-004', stock: 53 },
  { id: 5, name: 'Basketball Shoes', sku: 'BS-005', stock: 0 },
  { id: 6, name: 'Tennis Shoes', sku: 'TS-006', stock: 76 },
  { id: 7, name: 'Loafers', sku: 'LF-007', stock: 198 },
  { id: 8, name: 'Work Boots', sku: 'WB-008', stock: 34 },
  { id: 9, name: 'Flip Flops', sku: 'FF-009', stock: 321 },
  { id: 10, name: 'Dress Shoes', sku: 'DS-010', stock: 67 },
];

/* ── Back Navigation Demo (multi-level with slide animation) ── */
const WORKSPACE_SECTIONS = [
  {
    key: 'channels',
    label: 'Sales Channels',
    desc: 'Manage regional distribution',
    items: [
      { name: 'North America', code: 'NA', active: true },
      { name: 'Europe', code: 'EU', active: true },
      { name: 'Asia Pacific', code: 'APAC', active: false },
      { name: 'Latin America', code: 'LATAM', active: true },
    ],
  },
  {
    key: 'forecasting',
    label: 'Forecasting',
    desc: 'Configure demand planning',
    items: [
      { name: 'Auto-forecast', toggle: true, on: true },
      { name: 'Include seasonality', toggle: true, on: true },
      { name: 'Outlier correction', toggle: true, on: false },
      { name: 'ML-based adjustment', toggle: true, on: false },
    ],
  },
  {
    key: 'notifications',
    label: 'Notifications',
    desc: 'Alert and notification preferences',
    items: [
      { name: 'Email alerts', toggle: true, on: true },
      { name: 'Push notifications', toggle: true, on: false },
      { name: 'Weekly digest', toggle: true, on: true },
    ],
  },
];

function BackNavDemo() {
  const [page, setPage] = useState('main');
  const section = WORKSPACE_SECTIONS.find((s) => s.key === page);

  return (
    <div className="flex items-center justify-center py-16">
      <Popover
        trigger={<Button variant="outline">Workspace Settings</Button>}
        placement="bottom-start"
        title={page === 'main' ? 'Workspace' : section?.label}
        hasBackBtn={page !== 'main'}
        onBack={() => setPage('main')}
        variant={page === 'main' ? 'edge' : 'space'}
        primaryLabel={page !== 'main' ? 'Save' : undefined}
        secondaryLabel={page !== 'main' ? 'Cancel' : undefined}
        width={340}
      >
        {page === 'main' ? (
          <div>
            {WORKSPACE_SECTIONS.map((s) => (
              <div
                key={s.key}
                className="flex items-center justify-between px-3 py-2.5 hover:bg-surface-hover cursor-pointer"
                onClick={() => setPage(s.key)}
              >
                <div>
                  <div className="text-xs text-text font-medium">{s.label}</div>
                  <div className="text-[10px] text-text-tertiary mt-0.5">{s.desc}</div>
                </div>
                <span className="text-text-tertiary text-xs">&rarr;</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-text-secondary mb-1">{section?.desc}</p>
            {section?.items.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-text">
                  {item.toggle ? null : (
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.active ? 'bg-success' : 'bg-text-tertiary'}`} />
                  )}
                  {item.name}
                </div>
                {item.toggle ? (
                  <Switch size="sm" defaultChecked={item.on} />
                ) : (
                  <span className="text-text-tertiary text-[10px] font-mono">{item.code}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </Popover>
    </div>
  );
}

/* ── Controlled Demo (extracted to keep state isolated) ── */
function ControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 py-16 justify-center">
      <Popover
        trigger={<Button variant="outline">Toggle Popover</Button>}
        placement="bottom-start"
        open={open}
        onOpenChange={setOpen}
        title="Controlled Panel"
        primaryLabel="Confirm"
        onPrimaryClick={() => setOpen(false)}
        width={280}
      >
        <p className="text-xs text-text-secondary">
          This popover is controlled via the <code className="bg-surface-overlay px-1 py-0.5 text-xs text-text">open</code> prop.
        </p>
      </Popover>
      {open && (
        <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
          Close from outside
        </Button>
      )}
    </div>
  );
}

export default function PopoverPage() {
  const [placement, setPlacement] = useState('bottom-start');
  const [variant, setVariant] = useState('space');
  const [hasBackBtn, setHasBackBtn] = useState(false);
  const [hasHeaderActions, setHasHeaderActions] = useState(true);
  const [hasStickyHeader, setHasStickyHeader] = useState(false);
  const [hasFooter, setHasFooter] = useState(true);

  /* ── Sticky header demo search state ── */
  const [stickySearchTerm, setStickySearchTerm] = useState('');
  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(stickySearchTerm.toLowerCase())
  );

  return (
    <article className="space-y-12">
      <PageHeader
        title="Popover"
        description="A floating structured panel with four content sections — header, sticky header, scrollable body, and footer. Popovers open on click, dismiss on outside click or Escape, and support two body variants: padded (space) and full-width (edge)."
        status="stable"
        category="Containers"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 id="demo" className="text-lg font-semibold text-text mb-4">Interactive Demo</h2>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Placement',
              value: placement,
              onChange: setPlacement,
              options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
            },
            {
              type: 'select',
              label: 'Body Variant',
              value: variant,
              onChange: setVariant,
              options: ['space', 'edge'],
            },
            { type: 'checkbox', label: 'Back Button', value: hasBackBtn, onChange: setHasBackBtn },
            { type: 'checkbox', label: 'Header Actions', value: hasHeaderActions, onChange: setHasHeaderActions },
            { type: 'checkbox', label: 'Sticky Header', value: hasStickyHeader, onChange: setHasStickyHeader },
            { type: 'checkbox', label: 'Footer', value: hasFooter, onChange: setHasFooter },
          ]}
        >
          <div className="flex items-center justify-center py-20">
            <Popover
              trigger={<Button variant="outline">Open Popover</Button>}
              placement={placement}
              title="Channel Settings"
              hasBackBtn={hasBackBtn}
              headerActions={
                hasHeaderActions ? (
                  <>
                    <Switch size="sm" />
                    <DropdownButton
                      variant="secondary"
                      size="sm"
                      leadingIcon={<O9Icon svg={gridFilterSvg} />}
                      aria-label="More options"
                      menu={
                        <DropdownList>
                          <DropdownList.Item icon={<O9Icon svg={copySvg} />}>Duplicate</DropdownList.Item>
                          <DropdownList.Item icon={<O9Icon svg={shareSvg} />}>Share</DropdownList.Item>
                          <DropdownList.Item icon={<O9Icon svg={binSvg} />}>Delete</DropdownList.Item>
                        </DropdownList>
                      }
                    />
                  </>
                ) : undefined
              }
              stickyHeader={
                hasStickyHeader ? (
                  <p className="text-xs text-text-secondary pb-2">
                    Manage active sales channels and regional distribution settings.
                  </p>
                ) : undefined
              }
              variant={variant}
              primaryLabel={hasFooter ? 'Apply' : undefined}
              secondaryLabel={hasFooter ? 'Cancel' : undefined}
              tertiaryIcon={hasFooter ? downloadSvg : undefined}
              tertiaryLabel="Download settings"
              width={340}
            >
              <div className="space-y-2">
                {variant === 'edge' ? (
                  <>
                    {CHANNELS.map((ch) => (
                      <div key={ch.region} className="flex items-center justify-between px-3 py-2 text-xs hover:bg-surface-hover cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ch.active ? 'bg-success' : 'bg-text-tertiary'}`} />
                          <span className="text-text">{ch.name}</span>
                        </div>
                        <span className="text-text-tertiary">{ch.region}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <p className="text-xs text-text-secondary">
                      Configure channel preferences for the selected workspace.
                    </p>
                    <div className="space-y-1.5">
                      {CHANNELS.slice(0, 4).map((ch) => (
                        <div key={ch.region} className="flex items-center justify-between p-2 text-xs text-text bg-surface-raised">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ch.active ? 'bg-success' : 'bg-text-tertiary'}`} />
                            {ch.name}
                          </div>
                          <Switch size="sm" defaultChecked={ch.active} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Popover>
          </div>
        </ComponentDemo>
      </section>

      {/* ── Structured Layout ── */}
      <section>
        <h2 id="structured" className="text-lg font-semibold text-text mb-2">Structured Layout</h2>
        <p className="text-sm text-text-secondary mb-4">
          When a <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">title</code> prop is provided, the popover renders in structured mode with four sections: header, sticky header, scrollable body, and footer.
        </p>
        <CodeExample code={`<Popover
  trigger={<Button>Open</Button>}
  title="Notification Settings"
  stickyHeader={<p>Manage how you receive updates.</p>}
  primaryLabel="Save"
  secondaryLabel="Reset"
  width={360}
>
  <Switch label="Email" />
  <Switch label="Push" />
</Popover>`}>
          <div className="flex items-center justify-center py-16">
            <Popover
              trigger={<Button variant="outline">Structured Popover</Button>}
              placement="bottom-start"
              title="Notification Settings"
              stickyHeader={
                <p className="text-xs text-text-secondary pb-2">
                  Manage how you receive updates and alerts.
                </p>
              }
              primaryLabel="Save"
              secondaryLabel="Reset"
              width={340}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text">Email notifications</span>
                  <Switch size="sm" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text">Push notifications</span>
                  <Switch size="sm" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text">Weekly digest</span>
                  <Switch size="sm" defaultChecked />
                </div>
              </div>
            </Popover>
          </div>
        </CodeExample>
      </section>

      {/* ── Header Actions ── */}
      <section>
        <h2 id="header-actions" className="text-lg font-semibold text-text mb-2">Header Actions</h2>
        <p className="text-sm text-text-secondary mb-4">
          The header supports a back button, title, action elements (Switch, IconButton, DropdownButton), and a close button. Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">headerActions</code> to place controls between the title and close button.
        </p>
        <CodeExample code={`{/* Switch + Icon-only DropdownButton */}
<Popover
  title="Filters"
  hasBackBtn
  headerActions={
    <>
      <Switch size="sm" />
      <DropdownButton
        variant="secondary"
        size="sm"
        leadingIcon={<O9Icon svg={gridFilterSvg} />}
        menu={
          <DropdownList>
            <DropdownList.Item>Duplicate</DropdownList.Item>
            <DropdownList.Item>Share</DropdownList.Item>
          </DropdownList>
        }
      />
    </>
  }
>
  …
</Popover>`}>
          <div className="flex flex-wrap items-center justify-center gap-6 py-16">
            {/* With back button + DropdownButton */}
            <Popover
              trigger={<Button variant="outline" size="sm">Back + Dropdown</Button>}
              placement="bottom-start"
              title="Filter Options"
              hasBackBtn
              headerActions={
                <>
                  <Switch size="sm" />
                  <DropdownButton
                    variant="secondary"
                    size="sm"
                    leadingIcon={<O9Icon svg={gridFilterSvg} />}
                    aria-label="More options"
                    menu={
                      <DropdownList>
                        <DropdownList.Item icon={<O9Icon svg={copySvg} />}>Duplicate</DropdownList.Item>
                        <DropdownList.Item icon={<O9Icon svg={shareSvg} />}>Share</DropdownList.Item>
                        <DropdownList.Item icon={<O9Icon svg={binSvg} />}>Delete</DropdownList.Item>
                      </DropdownList>
                    }
                  />
                </>
              }
              width={320}
            >
              <p className="text-xs text-text-secondary">Body content with back button and dropdown menu above.</p>
            </Popover>

            {/* With IconButton actions */}
            <Popover
              trigger={<Button variant="outline" size="sm">Icon Actions</Button>}
              placement="bottom-start"
              title="Export Panel"
              headerActions={
                <>
                  <IconButton
                    icon={<O9Icon svg={downloadSvg} />}
                    variant="secondary"
                    size="sm"
                    aria-label="Download"
                  />
                  <IconButton
                    icon={<O9Icon svg={shareSvg} />}
                    variant="secondary"
                    size="sm"
                    aria-label="Share"
                  />
                </>
              }
              width={300}
            >
              <p className="text-xs text-text-secondary">Header with individual icon button actions.</p>
            </Popover>

            {/* Title + close only */}
            <Popover
              trigger={<Button variant="outline" size="sm">Title Only</Button>}
              placement="bottom-start"
              title="Simple Panel"
              width={280}
            >
              <p className="text-xs text-text-secondary">Minimal header with title and close button.</p>
            </Popover>
          </div>
        </CodeExample>
      </section>

      {/* ── Back Button Navigation ── */}
      <section>
        <h2 id="back-navigation" className="text-lg font-semibold text-text mb-2">Back Button Navigation</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">hasBackBtn</code> for multi-step flows inside a popover. Content transitions are animated with a slide effect — drilling forward slides right-to-left, going back slides left-to-right — using <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">--o9ds-motion-duration-short</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">--o9ds-motion-ease-out</code> tokens.
        </p>
        <CodeExample code={`const [page, setPage] = useState('main');

<Popover
  title={page === 'main' ? 'Workspace' : regions[page].label}
  hasBackBtn={page !== 'main'}
  onBack={() => setPage('main')}
  primaryLabel={page !== 'main' ? 'Apply' : undefined}
  variant={page === 'main' ? 'edge' : 'space'}
>
  {/* Content slides right-to-left on forward,
      left-to-right on back — animation is automatic */}
  {page === 'main'
    ? <RegionList onSelect={setPage} />
    : <RegionSettings region={page} />}
</Popover>`}>
          <BackNavDemo />
        </CodeExample>
      </section>

      {/* ── Body Variants ── */}
      <section>
        <h2 id="body-variants" className="text-lg font-semibold text-text mb-2">Body Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          The body supports two layout variants:
        </p>
        <ul className="list-disc list-inside text-sm text-text-secondary mb-4 space-y-1">
          <li><strong className="text-text">space</strong> — Default padded body with horizontal padding. Use for forms, settings, and general content.</li>
          <li><strong className="text-text">edge</strong> — Full-width body with no horizontal padding. Use for lists, tables, and edge-to-edge content.</li>
        </ul>
        <CodeExample code={`{/* Padded body — forms, settings */}
<Popover title="Demand Settings" variant="space" primaryLabel="Save">
  <Switch label="Auto-forecast" />
  <Switch label="Include seasonality" />
</Popover>

{/* Full-width body — lists, selections */}
<Popover title="Select Channel" variant="edge" primaryLabel="Confirm">
  <List items={channels} />
</Popover>`}>
          <div className="flex flex-wrap items-start justify-center gap-6 py-16">
            {/* Space variant — form with controls */}
            <Popover
              trigger={<Button variant="outline" size="sm">Space (padded)</Button>}
              placement="bottom-start"
              title="Demand Settings"
              variant="space"
              primaryLabel="Save"
              secondaryLabel="Reset"
              width={320}
            >
              <div className="space-y-3">
                <p className="text-xs text-text-secondary mb-2">Configure demand planning parameters for the selected region.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text">Auto-forecast</span>
                  <Switch size="sm" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text">Include seasonality</span>
                  <Switch size="sm" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text">Outlier correction</span>
                  <Switch size="sm" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text">Rolling average</span>
                  <Switch size="sm" />
                </div>
              </div>
            </Popover>

            {/* Edge variant — selectable list */}
            <Popover
              trigger={<Button variant="outline" size="sm">Edge (full-width)</Button>}
              placement="bottom-start"
              title="Select Channel"
              variant="edge"
              primaryLabel="Confirm"
              width={320}
            >
              <div>
                {CHANNELS.map((ch) => (
                  <div
                    key={ch.region}
                    className="flex items-center justify-between px-3 py-2.5 text-xs hover:bg-surface-hover cursor-pointer border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-2 text-text">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ch.active ? 'bg-success' : 'bg-text-tertiary'}`} />
                      {ch.name}
                    </div>
                    <span className="text-text-tertiary font-mono text-[10px]">{ch.region}</span>
                  </div>
                ))}
              </div>
            </Popover>
          </div>
        </CodeExample>
      </section>

      {/* ── Sticky Header with Scrolling Body ── */}
      <section>
        <h2 id="sticky-header" className="text-lg font-semibold text-text mb-2">Sticky Header with Scrolling Body</h2>
        <p className="text-sm text-text-secondary mb-4">
          Non-scrolling content area between the header and body. The sticky header stays fixed while the body scrolls vertically on overflow. Useful for search bars, filters, or descriptions.
        </p>
        <CodeExample code={`<Popover
  title="Product Catalog"
  stickyHeader={
    <div className="flex items-center gap-2 pb-2">
      <input placeholder="Search products…" />
      <IconButton icon={<O9Icon svg={filterSvg} />} />
    </div>
  }
  variant="edge"
  primaryLabel="Select"
  secondaryLabel="Clear"
  width={380}
>
  {/* Long scrollable product list */}
  {products.map(p => <ProductRow key={p.id} {...p} />)}
</Popover>`}>
          <div className="flex items-center justify-center py-16">
            <Popover
              trigger={<Button variant="outline">Product Catalog</Button>}
              placement="bottom-start"
              title="Product Catalog"
              stickyHeader={
                <div className="flex items-center gap-2 pb-2">
                  <div className="flex items-center gap-1.5 flex-1 h-7 px-2 bg-surface-raised text-xs">
                    <span className="text-text-tertiary shrink-0"><O9Icon svg={searchSvg} /></span>
                    <input
                      type="text"
                      placeholder="Search products…"
                      value={stickySearchTerm}
                      onChange={(e) => setStickySearchTerm(e.target.value)}
                      className="flex-1 bg-transparent text-text text-xs outline-none placeholder:text-text-tertiary"
                    />
                  </div>
                  <IconButton
                    icon={<O9Icon svg={filterSvg} />}
                    variant="secondary"
                    size="sm"
                    aria-label="Filter"
                  />
                </div>
              }
              variant="edge"
              primaryLabel="Select"
              secondaryLabel="Clear"
              width={380}
              className="max-h-[420px]"
            >
              <div>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between px-3 py-2 text-xs hover:bg-surface-hover cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 border border-border rounded-sm shrink-0" />
                        <div>
                          <div className="text-text">{p.name}</div>
                          <div className="text-text-tertiary text-[10px]">{p.sku}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono ${p.stock === 0 ? 'text-danger' : 'text-text-tertiary'}`}>
                        {p.stock === 0 ? 'Out of stock' : `${p.stock} units`}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-6 text-xs text-text-tertiary text-center">No products match your search.</div>
                )}
              </div>
            </Popover>
          </div>
        </CodeExample>
      </section>

      {/* ── Footer Buttons ── */}
      <section>
        <h2 id="footer" className="text-lg font-semibold text-text mb-2">Footer Buttons</h2>
        <p className="text-sm text-text-secondary mb-4">
          The footer supports up to three actions: a left-aligned tertiary icon button, a secondary outline button, and a primary CTA button. Clicking primary or secondary buttons executes the callback and automatically closes the popover. Use the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">footer</code> prop for fully custom footer content.
        </p>
        <CodeExample code={`{/* All three footer buttons */}
<Popover
  title="Export"
  primaryLabel="Export"
  secondaryLabel="Cancel"
  tertiaryIcon={shareSvg}
>…</Popover>

{/* Primary + secondary only */}
<Popover title="Confirm" primaryLabel="Save" secondaryLabel="Discard">
  …
</Popover>`}>
          <div className="flex flex-wrap items-start justify-center gap-6 py-16">
            {/* All three */}
            <Popover
              trigger={<Button variant="outline" size="sm">All Footer Buttons</Button>}
              placement="bottom-start"
              title="Export Options"
              primaryLabel="Export"
              secondaryLabel="Cancel"
              tertiaryIcon={shareSvg}
              tertiaryLabel="Share export"
              width={320}
            >
              <p className="text-xs text-text-secondary">Select export format and destination.</p>
            </Popover>

            {/* Primary + secondary */}
            <Popover
              trigger={<Button variant="outline" size="sm">Primary + Secondary</Button>}
              placement="bottom-start"
              title="Save Changes"
              primaryLabel="Save"
              secondaryLabel="Discard"
              width={280}
            >
              <p className="text-xs text-text-secondary">You have unsaved changes.</p>
            </Popover>

            {/* Primary only */}
            <Popover
              trigger={<Button variant="outline" size="sm">Primary Only</Button>}
              placement="bottom-start"
              title="Quick Action"
              primaryLabel="Done"
              width={240}
            >
              <p className="text-xs text-text-secondary">Single CTA footer.</p>
            </Popover>
          </div>
        </CodeExample>
      </section>

      {/* ── Placements ── */}
      <section>
        <h2 id="placements" className="text-lg font-semibold text-text mb-2">Placements</h2>
        <p className="text-sm text-text-secondary mb-4">
          Eight placement options relative to the trigger element. Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">bottom-start</code> / <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">bottom-end</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">top-start</code> / <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">top-end</code> for aligned dropdowns.
        </p>
        <CodeExample code={`<Popover placement="bottom-start" trigger={<Button>Bottom Start</Button>}>…</Popover>
<Popover placement="top-end" trigger={<Button>Top End</Button>}>…</Popover>
<Popover placement="top" trigger={<Button>Top</Button>}>…</Popover>`}>
          <div className="flex flex-wrap items-center justify-center gap-4 py-20">
            {['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end', 'left', 'right'].map((p) => (
              <Popover
                key={p}
                placement={p}
                trigger={<Button variant="outline" size="sm">{p}</Button>}
                title={`Placement: ${p}`}
                width={220}
              >
                <p className="text-xs text-text-secondary">Content aligned to {p}.</p>
              </Popover>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ── Legacy Mode ── */}
      <section>
        <h2 id="legacy" className="text-lg font-semibold text-text mb-2">Legacy Mode</h2>
        <p className="text-sm text-text-secondary mb-4">
          When no structured props (<code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">title</code>, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">stickyHeader</code>, footer) are provided, the popover renders children directly in a simple padded container — preserving backward compatibility.
        </p>
        <CodeExample code={`<Popover trigger={<Button>Open</Button>}>
  <p>Simple unstructured content</p>
</Popover>`}>
          <div className="flex items-center justify-center py-16">
            <Popover
              trigger={<Button variant="outline">Legacy Popover</Button>}
              placement="bottom-start"
            >
              <div className="space-y-2">
                <p className="text-xs font-medium text-text">Simple Popover</p>
                <p className="text-xs text-text-secondary">
                  This uses the legacy unstructured layout with children rendered directly.
                </p>
              </div>
            </Popover>
          </div>
        </CodeExample>
      </section>

      {/* ── Controlled State ── */}
      <section>
        <h2 id="controlled" className="text-lg font-semibold text-text mb-2">Controlled State</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">open</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">onOpenChange</code> for full control over the popover visibility.
        </p>
        <CodeExample code={`const [open, setOpen] = useState(false);

<Popover
  trigger={<Button>Toggle</Button>}
  open={open}
  onOpenChange={setOpen}
  title="Controlled"
>
  <p>Controlled popover</p>
</Popover>

<Button onClick={() => setOpen(false)}>Close from outside</Button>`}>
          <ControlledDemo />
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-lg font-semibold text-text mb-4">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use popovers for contextual forms, settings, filters, or actions related to a trigger element',
            'Use the "edge" variant for lists, menus, and full-width content within the popover body',
            'Use the "space" variant for forms, text content, and padded layouts',
            'Provide clear action buttons in the footer for confirmation workflows',
            'Use the back button for multi-step flows within a single popover',
          ]}
          dontItems={[
            'Do not use popovers for simple labels or hints — use Tooltip instead',
            'Avoid nesting popovers inside other popovers',
            'Do not put entire page sections inside a popover — keep content focused',
            'Avoid using more than 3 footer buttons — tertiary, secondary, and primary are the maximum',
            'Do not use popover for navigation — use dropdown menus instead',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="dialog"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-labelledby</code> linked to the title element for screen reader announcements.</>,
            <>Marked as <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-modal="false"</code> — the popover is non-modal, so users can interact with the rest of the page.</>,
            <>Trigger element receives <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-expanded</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-haspopup="dialog"</code> attributes automatically.</>,
            <>Focus is moved to the close button when the popover opens. When the popover closes, focus returns to the trigger element.</>,
            <>The scrollable body is a focusable <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="region"</code> — keyboard users can scroll content with arrow keys when focused.</>,
            'Dismisses on Escape key press and outside click for predictable behavior.',
            'Close button, back button, and all interactive elements have descriptive aria-labels.',
            <>Slide animations respect <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">prefers-reduced-motion: reduce</code> — animations are skipped when the user prefers reduced motion.</>,
            <>Use the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">tertiaryLabel</code> prop to provide a descriptive aria-label for the tertiary icon button (defaults to "Additional action").</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Keyboard Navigation ── */}
      <section>
        <h2 id="keyboard" className="text-lg font-semibold text-text mb-4">Keyboard Navigation</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-6 font-semibold text-text">Key</th>
                <th className="text-left py-2 font-semibold text-text">Action</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">Enter / Space</kbd></td>
                <td className="py-2">Open the popover when the trigger is focused</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">Escape</kbd></td>
                <td className="py-2">Close the popover and return focus to the trigger</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">Tab</kbd></td>
                <td className="py-2">Move focus through interactive elements in the popover</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">Shift + Tab</kbd></td>
                <td className="py-2">Move focus backward through interactive elements</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">Arrow Keys</kbd></td>
                <td className="py-2">Scroll the body content when the scrollable region is focused</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-4">API Reference</h2>
        <PropsTable props={popoverProps} />
      </section>
    </article>
  );
}

