import { useState, useCallback } from 'react';
import Sidepanel from '@/components/containers/Sidepanel';
import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import DropdownButton from '@/components/buttons/DropdownButton';
import DropdownList from '@/components/containers/DropdownList';
import Switch from '@/components/inputs/Switch';
import Search from '@/components/inputs/Search';
import { Tabstrip, Tab, TabPanel } from '@/components/navigation/Tabstrip';
import InlineAlert from '@/components/feedback/InlineAlert';
import BadgeAlert from '@/components/feedback/BadgeAlert';
import O9Icon from '@/components/O9Icon';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

import gridFilterSvg from '@/assets/icons/o9con-grid-filter.svg?raw';
import downloadSvg from '@/assets/icons/o9con-download.svg?raw';
import copySvg from '@/assets/icons/o9con-copy.svg?raw';
import shareSvg from '@/assets/icons/o9con-share.svg?raw';
import binSvg from '@/assets/icons/o9con-bin.svg?raw';

/* ── Props table data ── */
const sidepanelProps = [
  { name: 'open', type: 'boolean', default: '—', description: 'Controlled open state — required to show or hide the panel' },
  { name: 'onClose', type: '() => void', default: '—', description: 'Close callback — required for Escape, backdrop click, and close button' },
  { name: 'direction', type: "'right' | 'left' | 'bottom'", default: "'right'", description: 'Slide direction — right and left fill parent height, bottom fills parent width' },
  { name: 'panelType', type: "'overlay' | 'layout'", default: "'overlay'", description: "Panel type — 'overlay' renders via portal with backdrop, 'layout' renders inline without overlay" },
  { name: 'overlay', type: "'dim' | 'blur' | 'transparent'", default: "'dim'", description: "Backdrop style for overlay type — 'transparent' allows page interaction behind the panel" },
  { name: 'defaultWidth', type: 'number | string', default: '290', description: 'Initial panel width (left/right direction)' },
  { name: 'defaultHeight', type: 'number | string', default: "'50%'", description: 'Initial panel height (bottom direction)' },
  { name: 'minWidth', type: 'number', default: '200', description: 'Minimum width constraint (px)' },
  { name: 'maxWidth', type: 'number | string', default: "'80vw'", description: 'Maximum width constraint' },
  { name: 'minHeight', type: 'number', default: '150', description: 'Minimum height constraint (px)' },
  { name: 'maxHeight', type: 'number | string', default: "'80vh'", description: 'Maximum height constraint' },
  { name: 'resizable', type: 'boolean', default: 'false', description: 'Enable edge resize handle for mouse drag resizing' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Panel title — enables the header with close button' },
  { name: 'hasBackBtn', type: 'boolean', default: 'false', description: 'Show a back arrow button in the header' },
  { name: 'onBack', type: '() => void', default: 'undefined', description: 'Callback when the back button is clicked' },
  { name: 'headerActions', type: 'ReactNode', default: 'undefined', description: 'Action elements between the title and close button' },
  { name: 'headerSwitch', type: 'boolean', default: 'false', description: 'Show a Switch toggle in the header' },
  { name: 'overflowMenu', type: 'ReactNode', default: 'undefined', description: 'Overflow DropdownButton in the header' },
  { name: 'stickyHeader', type: 'ReactNode', default: 'undefined', description: 'Non-scrolling content area below the header (InlineAlert, Tabstrip, Search, BadgeAlert)' },
  { name: 'bodyVariant', type: "'space' | 'edge'", default: "'space'", description: "Body padding — 'space' adds horizontal padding, 'edge' removes it for full-width content" },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Scrollable body content' },
  { name: 'primaryLabel', type: 'string', default: 'undefined', description: 'Primary CTA button label — executes callback then closes the panel' },
  { name: 'onPrimaryClick', type: '() => void', default: 'undefined', description: 'Primary CTA click handler' },
  { name: 'secondaryLabel', type: 'string', default: 'undefined', description: 'Secondary button label — executes callback then closes the panel' },
  { name: 'onSecondaryClick', type: '() => void', default: 'undefined', description: 'Secondary button click handler' },
  { name: 'footer', type: 'ReactNode', default: 'undefined', description: 'Custom footer — overrides primaryLabel and secondaryLabel' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes for the panel' },
];

/* ── Sample data ── */
const CHANNELS = [
  { name: 'North America', code: 'NA', active: true },
  { name: 'Europe', code: 'EU', active: true },
  { name: 'Asia Pacific', code: 'APAC', active: false },
  { name: 'Latin America', code: 'LATAM', active: true },
  { name: 'Middle East', code: 'MEA', active: false },
  { name: 'Sub-Saharan Africa', code: 'SSA', active: false },
];

const PLAN_ITEMS = [
  { id: 'DP-2041', name: 'Q2 Demand Forecast Update', status: 'Active', updated: '2 hours ago' },
  { id: 'DP-2042', name: 'Inventory Rebalance — EMEA', status: 'Pending', updated: '5 hours ago' },
  { id: 'DP-2043', name: 'Safety Stock Review — NA', status: 'Active', updated: '1 day ago' },
  { id: 'DP-2044', name: 'Seasonal Adjustment Q3', status: 'Draft', updated: '2 days ago' },
  { id: 'DP-2045', name: 'Supplier Lead Time Analysis', status: 'Active', updated: '3 days ago' },
  { id: 'DP-2046', name: 'Distribution Network Optimization', status: 'Pending', updated: '4 days ago' },
  { id: 'DP-2047', name: 'Demand Sensing — ML Model', status: 'Draft', updated: '5 days ago' },
  { id: 'DP-2048', name: 'Promotional Uplift Forecast', status: 'Active', updated: '6 days ago' },
];

/* ── Back Navigation Demo ── */
const SETTINGS_SECTIONS = [
  { key: 'channels', label: 'Sales Channels', desc: 'Manage regional distribution' },
  { key: 'forecast', label: 'Forecasting', desc: 'Configure demand planning' },
  { key: 'alerts', label: 'Notifications', desc: 'Alert preferences' },
];

function BackNavDemo() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState('main');

  return (
    <>
      <Button variant="outline" onClick={() => { setPage('main'); setOpen(true); }}>
        Back Navigation Demo
      </Button>
      <Sidepanel
        open={open}
        onClose={() => setOpen(false)}
        title={page === 'main' ? 'Settings' : SETTINGS_SECTIONS.find((s) => s.key === page)?.label}
        hasBackBtn={page !== 'main'}
        onBack={() => setPage('main')}
        bodyVariant={page === 'main' ? 'edge' : 'space'}
        primaryLabel={page !== 'main' ? 'Save' : undefined}
        secondaryLabel={page !== 'main' ? 'Cancel' : undefined}
        defaultWidth={320}
      >
        {page === 'main' ? (
          <div>
            {SETTINGS_SECTIONS.map((s) => (
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
            <p className="text-xs text-text-secondary">Configure settings for this section.</p>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-text">Option {i}</span>
                <Switch size="sm" />
              </div>
            ))}
          </div>
        )}
      </Sidepanel>
    </>
  );
}

/* ── Sticky Header with Tabs Demo ── */
function TabsDemo() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = PLAN_ITEMS.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Tabs + Search Demo
      </Button>
      <Sidepanel
        open={open}
        onClose={() => setOpen(false)}
        title="Demand Planning"
        headerSwitch
        overflowMenu={
          <DropdownButton
            variant="secondary"
            size="sm"
            leadingIcon={<O9Icon svg={gridFilterSvg} />}
            aria-label="More options"
            menu={
              <DropdownList>
                <DropdownList.Item icon={<O9Icon svg={downloadSvg} />}>Export</DropdownList.Item>
                <DropdownList.Item icon={<O9Icon svg={shareSvg} />}>Share</DropdownList.Item>
              </DropdownList>
            }
          />
        }
        stickyHeader={
          <div className="flex flex-col gap-2">
            <InlineAlert variant="danger" dismissible>
              The o9 favourite service is not available at the moment and a few UI features
            </InlineAlert>
            <Tabstrip value={activeTab} onChange={setActiveTab} variant="underline">
              <Tab value="general" label="General" />
              <Tab value="reports" label="Reports" />
            </Tabstrip>
            <Search
              variant="filter-search"
              size="md"
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
            />
            <BadgeAlert type="info" variant="ghost" message={`${filteredItems.length} matching results`} size="sm" />
          </div>
        }
        bodyVariant="edge"
        primaryLabel="Apply"
        secondaryLabel="Cancel"
        defaultWidth={340}
      >
        <div>
          {activeTab === 'general' ? (
            filteredItems.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between px-3 py-2.5 text-xs hover:bg-surface-hover cursor-pointer border-b border-border last:border-0"
              >
                <div>
                  <div className="text-text font-medium">{p.name}</div>
                  <div className="text-text-tertiary text-[10px] mt-0.5">{p.id} &middot; {p.updated}</div>
                </div>
                <BadgeAlert
                  type={p.status === 'Active' ? 'success' : p.status === 'Pending' ? 'warning' : 'neutral'}
                  message={p.status}
                  size="sm"
                />
              </div>
            ))
          ) : (
            <div className="px-3 py-6 text-xs text-text-tertiary text-center">
              Reports content goes here.
            </div>
          )}
        </div>
      </Sidepanel>
    </>
  );
}

export default function SidepanelPage() {
  /* ── Interactive demo state ── */
  const [direction, setDirection] = useState('right');
  const [panelType, setPanelType] = useState('overlay');
  const [overlay, setOverlay] = useState('dim');
  const [bodyVariant, setBodyVariant] = useState('space');
  const [isResizable, setIsResizable] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  /* ── Direction demos ── */
  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);

  /* ── Overlay demos ── */
  const [dimOpen, setDimOpen] = useState(false);
  const [blurOpen, setBlurOpen] = useState(false);
  const [transOpen, setTransOpen] = useState(false);

  /* ── Layout demo ── */
  const [layoutOpen, setLayoutOpen] = useState(true);

  /* ── Resizable demo ── */
  const [resizableOpen, setResizableOpen] = useState(false);

  return (
    <article className="space-y-12">
      <PageHeader
        title="Sidepanel"
        description="A slide-in panel for supplementary content, filters, settings, or detail views. Opens from the right, left, or bottom edge with optional overlay backdrop. Supports layout mode for inline integration without overlay, resizable edges, and a structured four-section layout matching the Popover component."
        status="stable"
        category="Containers"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 id="demo" className="text-lg font-semibold text-text mb-4">Interactive Demo</h2>
        <ComponentDemo
          controls={[
            { type: 'select', label: 'Direction', value: direction, onChange: setDirection, options: ['right', 'left', 'bottom'] },
            { type: 'select', label: 'Panel Type', value: panelType, onChange: setPanelType, options: ['overlay', 'layout'] },
            { type: 'select', label: 'Overlay', value: overlay, onChange: setOverlay, options: ['dim', 'blur', 'transparent'] },
            { type: 'select', label: 'Body Variant', value: bodyVariant, onChange: setBodyVariant, options: ['space', 'edge'] },
            { type: 'checkbox', label: 'Resizable', value: isResizable, onChange: setIsResizable },
          ]}
        >
          <div className="flex items-center justify-center py-10">
            <Button variant="outline" onClick={() => setDemoOpen(true)}>
              Open Sidepanel
            </Button>
          </div>
          <Sidepanel
            open={demoOpen}
            onClose={() => setDemoOpen(false)}
            direction={direction}
            panelType={panelType}
            overlay={overlay}
            bodyVariant={bodyVariant}
            resizable={isResizable}
            title="Channel Settings"
            headerSwitch
            overflowMenu={
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
            }
            primaryLabel="Apply"
            secondaryLabel="Cancel"
            defaultWidth={320}
          >
            <div className="space-y-3">
              <p className="text-xs text-text-secondary">
                Configure channel preferences for the selected workspace.
              </p>
              {CHANNELS.map((ch) => (
                <div key={ch.code} className="flex items-center justify-between p-2 text-xs text-text bg-surface-raised">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ch.active ? 'bg-success' : 'bg-text-tertiary'}`} />
                    {ch.name}
                  </div>
                  <Switch size="sm" defaultChecked={ch.active} />
                </div>
              ))}
            </div>
          </Sidepanel>
        </ComponentDemo>
      </section>

      {/* ── Direction Variants ── */}
      <section>
        <h2 id="directions" className="text-lg font-semibold text-text mb-2">Direction Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three slide directions: <strong>right</strong> (default), <strong>left</strong>, and <strong>bottom</strong>. Left/right panels fill 100% of the parent height; bottom panels fill 100% of the width.
        </p>
        <CodeExample code={`<Sidepanel direction="right" open={open} onClose={onClose} title="Right Panel">…</Sidepanel>
<Sidepanel direction="left" open={open} onClose={onClose} title="Left Panel">…</Sidepanel>
<Sidepanel direction="bottom" open={open} onClose={onClose} title="Bottom Panel">…</Sidepanel>`}>
          <div className="flex flex-wrap items-center justify-center gap-4 py-10">
            <Button variant="outline" size="sm" onClick={() => setRightOpen(true)}>Right</Button>
            <Button variant="outline" size="sm" onClick={() => setLeftOpen(true)}>Left</Button>
            <Button variant="outline" size="sm" onClick={() => setBottomOpen(true)}>Bottom</Button>
          </div>
          <Sidepanel open={rightOpen} onClose={() => setRightOpen(false)} direction="right" title="Right Panel" primaryLabel="Done">
            <p className="text-xs text-text-secondary">Slides in from the right edge.</p>
          </Sidepanel>
          <Sidepanel open={leftOpen} onClose={() => setLeftOpen(false)} direction="left" title="Left Panel" primaryLabel="Done">
            <p className="text-xs text-text-secondary">Slides in from the left edge.</p>
          </Sidepanel>
          <Sidepanel open={bottomOpen} onClose={() => setBottomOpen(false)} direction="bottom" title="Bottom Panel" primaryLabel="Done" defaultHeight="40%">
            <p className="text-xs text-text-secondary">Slides up from the bottom edge.</p>
          </Sidepanel>
        </CodeExample>
      </section>

      {/* ── Overlay Variants ── */}
      <section>
        <h2 id="overlays" className="text-lg font-semibold text-text mb-2">Overlay Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three backdrop styles for overlay panels: <strong>dim</strong> (semi-transparent dark), <strong>blur</strong> (frosted glass), and <strong>transparent</strong> (invisible — allows page interaction).
        </p>
        <CodeExample code={`<Sidepanel overlay="dim" …>…</Sidepanel>
<Sidepanel overlay="blur" …>…</Sidepanel>
<Sidepanel overlay="transparent" …>…</Sidepanel>`}>
          <div className="flex flex-wrap items-center justify-center gap-4 py-10">
            <Button variant="outline" size="sm" onClick={() => setDimOpen(true)}>Dim</Button>
            <Button variant="outline" size="sm" onClick={() => setBlurOpen(true)}>Blur</Button>
            <Button variant="outline" size="sm" onClick={() => setTransOpen(true)}>Transparent</Button>
          </div>
          <Sidepanel open={dimOpen} onClose={() => setDimOpen(false)} overlay="dim" title="Dim Overlay" primaryLabel="OK">
            <p className="text-xs text-text-secondary">Semi-transparent dark overlay dims the page content behind the panel.</p>
          </Sidepanel>
          <Sidepanel open={blurOpen} onClose={() => setBlurOpen(false)} overlay="blur" title="Blur Overlay" primaryLabel="OK">
            <p className="text-xs text-text-secondary">Frosted glass effect blurs the page content.</p>
          </Sidepanel>
          <Sidepanel open={transOpen} onClose={() => setTransOpen(false)} overlay="transparent" title="Transparent Overlay" primaryLabel="OK">
            <p className="text-xs text-text-secondary">Invisible overlay — the page remains visible and clickable to dismiss.</p>
          </Sidepanel>
        </CodeExample>
      </section>

      {/* ── Layout Mode ── */}
      <section>
        <h2 id="layout" className="text-lg font-semibold text-text mb-2">Layout Mode</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">panelType="layout"</code> to render the panel inline without a portal or overlay. The panel sits alongside other content in a flex container.
        </p>
        <CodeExample code={`<div className="flex h-[400px] border border-border">
  <div className="flex-1 p-4">Main content</div>
  <Sidepanel panelType="layout" open={open} onClose={onClose} title="Details" resizable>
    …
  </Sidepanel>
</div>`}>
          <div className="flex h-[400px] border border-border overflow-hidden">
            <div className="flex-1 flex items-center justify-center bg-surface-overlay p-4">
              <div className="text-center">
                <p className="text-sm text-text mb-2">Main Content Area</p>
                <Button variant="outline" size="sm" onClick={() => setLayoutOpen(!layoutOpen)}>
                  {layoutOpen ? 'Hide Panel' : 'Show Panel'}
                </Button>
              </div>
            </div>
            {layoutOpen && (
              <Sidepanel
                panelType="layout"
                open={layoutOpen}
                onClose={() => setLayoutOpen(false)}
                title="Detail View"
                resizable
                defaultWidth={260}
                primaryLabel="Save"
                secondaryLabel="Cancel"
              >
                <div className="space-y-3">
                  {CHANNELS.slice(0, 4).map((ch) => (
                    <div key={ch.code} className="flex items-center justify-between text-xs text-text">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ch.active ? 'bg-success' : 'bg-text-tertiary'}`} />
                        {ch.name}
                      </div>
                      <span className="text-text-tertiary font-mono text-[10px]">{ch.code}</span>
                    </div>
                  ))}
                </div>
              </Sidepanel>
            )}
          </div>
        </CodeExample>
      </section>

      {/* ── Sticky Header with Tabs ── */}
      <section>
        <h2 id="sticky-tabs" className="text-lg font-semibold text-text mb-2">Sticky Header with Tabs</h2>
        <p className="text-sm text-text-secondary mb-4">
          Compose InlineAlert, Tabstrip (underline variant), Search, and BadgeAlert inside the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">stickyHeader</code> slot. All sticky header elements remain fixed while the body scrolls.
        </p>
        <CodeExample code={`<Sidepanel
  title="Demand Planning"
  stickyHeader={
    <div className="flex flex-col gap-2">
      <InlineAlert variant="danger" compact dismissible>Alert message</InlineAlert>
      <Tabstrip value={tab} onChange={setTab} variant="underline">
        <Tab value="general" label="General" />
        <Tab value="reports" label="Reports" />
      </Tabstrip>
      <Search placeholder="Search..." />
      <BadgeAlert type="info" variant="ghost" message="24 matching results" size="sm" />
    </div>
  }
  bodyVariant="edge"
>
  {/* Scrollable content */}
</Sidepanel>`}>
          <div className="flex items-center justify-center py-10">
            <TabsDemo />
          </div>
        </CodeExample>
      </section>

      {/* ── Back-Button Navigation ── */}
      <section>
        <h2 id="back-navigation" className="text-lg font-semibold text-text mb-2">Back-Button Navigation</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">hasBackBtn</code> for multi-step flows. Content transitions are animated with a slide effect using <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">--o9ds-motion-duration-short</code>.
        </p>
        <CodeExample code={`<Sidepanel
  title={page === 'main' ? 'Settings' : section.label}
  hasBackBtn={page !== 'main'}
  onBack={() => setPage('main')}
  bodyVariant={page === 'main' ? 'edge' : 'space'}
>
  {page === 'main' ? <SectionList /> : <SectionSettings />}
</Sidepanel>`}>
          <div className="flex items-center justify-center py-10">
            <BackNavDemo />
          </div>
        </CodeExample>
      </section>

      {/* ── Resizable Panel ── */}
      <section>
        <h2 id="resizable" className="text-lg font-semibold text-text mb-2">Resizable Panel</h2>
        <p className="text-sm text-text-secondary mb-4">
          Enable <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">resizable</code> to allow edge dragging. The resize handle appears on the content-facing edge — left edge for right panels, right edge for left panels, top edge for bottom panels. Drag respects <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">minWidth</code> / <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">maxWidth</code> constraints.
        </p>
        <CodeExample code={`<Sidepanel
  resizable
  minWidth={200}
  maxWidth={600}
  defaultWidth={320}
  title="Resizable Panel"
>…</Sidepanel>`}>
          <div className="flex items-center justify-center py-10">
            <Button variant="outline" onClick={() => setResizableOpen(true)}>
              Resizable Panel
            </Button>
          </div>
          <Sidepanel
            open={resizableOpen}
            onClose={() => setResizableOpen(false)}
            title="Resizable Panel"
            resizable
            minWidth={200}
            maxWidth={600}
            defaultWidth={320}
            primaryLabel="Done"
          >
            <p className="text-xs text-text-secondary">Drag the left edge to resize this panel. Width is constrained between 200px and 600px.</p>
          </Sidepanel>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-lg font-semibold text-text mb-4">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use overlay variant for temporary, contextual tasks that require focused attention',
            'Use layout variant when the panel should coexist with main content permanently',
            'Provide a clear title and close button for every sidepanel',
            'Keep footer actions to two buttons maximum (primary + secondary)',
            'Use the stickyHeader slot for Search, Tabs, and status badges that should stay visible during scroll',
            'Use the transparent overlay when users need to reference page content while the panel is open',
          ]}
          dontItems={[
            'Do not nest sidepanels inside other sidepanels',
            'Do not use bottom direction for content-heavy panels - prefer right or left',
            'Do not omit the overlay for tasks that block user workflow',
            'Do not use sidepanel when a full dialog window would be more appropriate',
            'Avoid putting more than two tabs in the sticky header for narrow panels',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="dialog"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-labelledby</code> linked to the title.</>,
            <>Overlay variant sets <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-modal="true"</code> with focus trap. Layout variant uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-modal="false"</code>.</>,
            <>Focus moves to the panel on open. On close, focus returns to the trigger element.</>,
            'Overlay variant locks body scroll to prevent background page scrolling.',
            <>Escape key closes the panel. All header icon buttons have <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code> and Tooltips.</>,
            <>The scrollable body is a focusable <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="region"</code> for keyboard scrolling.</>,
            <>Resize handle uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="separator"</code> with appropriate <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-orientation</code>.</>,
            <>Slide animations respect <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">prefers-reduced-motion: reduce</code>.</>,
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
                <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">Escape</kbd></td>
                <td className="py-2">Close the sidepanel and return focus to the trigger</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">Tab</kbd></td>
                <td className="py-2">Move focus through interactive elements. Focus is trapped within overlay panels.</td>
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
        <PropsTable props={sidepanelProps} />
      </section>
    </article>
  );
}
