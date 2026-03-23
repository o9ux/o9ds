import { useState } from 'react';
import DialogWindow from '@/components/containers/DialogWindow';
import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import DropdownButton from '@/components/buttons/DropdownButton';
import DropdownList from '@/components/containers/DropdownList';
import Switch from '@/components/inputs/Switch';
import O9Icon from '@/components/O9Icon';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

import downloadSvg from '@/assets/icons/o9con-download.svg?raw';
import shareSvg from '@/assets/icons/o9con-share.svg?raw';
import searchSvg from '@/assets/icons/o9con-search.svg?raw';
import filterSvg from '@/assets/icons/o9con-filter.svg?raw';
import copySvg from '@/assets/icons/o9con-copy.svg?raw';
import binSvg from '@/assets/icons/o9con-bin.svg?raw';
import gridFilterSvg from '@/assets/icons/o9con-grid-filter.svg?raw';

const dialogProps = [
  { name: 'open', type: 'boolean', default: 'false', description: 'Controlled open state — required to show or hide the dialog' },
  { name: 'onClose', type: '() => void', default: '—', description: 'Callback to close the dialog — required for Escape key, backdrop click, and close button' },
  { name: 'type', type: "'modal' | 'non-modal'", default: "'modal'", description: "Dialog type — 'modal' blocks page interaction with an overlay, 'non-modal' keeps page interactive" },
  { name: 'overlay', type: "'dim' | 'blur' | 'transparent'", default: "'dim'", description: "Overlay style for modal type — 'dim' is semi-transparent dark, 'blur' adds a frosted glass effect, 'transparent' is invisible but still captures clicks" },
  { name: 'height', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Height preset — sm (52vh), md (70vh), lg (84vh), xl (96vh)' },
  { name: 'width', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Width preset — sm (440px), md (720px), lg (960px), xl (1440px)' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Dialog title displayed in the header bar' },
  { name: 'hasBackBtn', type: 'boolean', default: 'false', description: 'Show a back arrow button in the header for multi-step navigation' },
  { name: 'onBack', type: '() => void', default: 'undefined', description: 'Callback when the back button is clicked' },
  { name: 'headerActions', type: 'ReactNode', default: 'undefined', description: 'Action elements placed between the title and window controls (e.g., IconButton, DropdownButton)' },
  { name: 'headerSwitch', type: 'boolean', default: 'false', description: 'Show an optional Switch toggle in the header, positioned after headerActions' },
  { name: 'headerSwitchChecked', type: 'boolean', default: 'undefined', description: 'Controlled checked state for the header Switch' },
  { name: 'onHeaderSwitchChange', type: '(checked: boolean) => void', default: 'undefined', description: 'Callback when the header Switch value changes' },
  { name: 'headerSwitchLabel', type: 'string', default: "'Toggle'", description: 'Accessible aria-label for the header Switch' },
  { name: 'overflowMenu', type: 'ReactNode', default: 'undefined', description: 'Overflow DropdownButton for additional header actions — rendered between headerActions and expand/close controls' },
  { name: 'draggable', type: 'boolean', default: 'false', description: 'Enable drag-to-reposition from anywhere on the header bar (except interactive elements like buttons and switches)' },
  { name: 'showDragHandle', type: 'boolean', default: 'false', description: 'Show a drag handle icon button in the header that allows dragging the dialog. Requires draggable to be true.' },
  { name: 'sticky', type: 'boolean', default: 'false', description: 'When dragging ends, snap the dialog to the nearest viewport corner with a smooth animation. Requires draggable.' },
  { name: 'resizable', type: 'boolean', default: 'false', description: 'Allow resizing from edges and corners by dragging. Non-modal only. Min 320×200px, max 96vw×96vh.' },
  { name: 'expandable', type: 'boolean', default: 'false', description: 'Show an expand/compress toggle to maximize or restore the dialog window size' },
  { name: 'stickyHeader', type: 'ReactNode', default: 'undefined', description: 'Non-scrolling content area below the header (search bar, filters, descriptions)' },
  { name: 'variant', type: "'space' | 'edge'", default: "'space'", description: "Body layout — 'space' applies default padding, 'edge' removes horizontal padding for full-width content. Both variants scroll vertically only when content overflows." },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Dialog body content (scrollable with vertical overflow only)' },
  { name: 'primaryLabel', type: 'string', default: 'undefined', description: 'Primary CTA button label — clicking executes the callback and closes the dialog' },
  { name: 'onPrimaryClick', type: '() => void', default: 'undefined', description: 'Primary CTA click handler' },
  { name: 'secondaryLabel', type: 'string', default: 'undefined', description: 'Secondary button label — clicking executes the callback and closes the dialog' },
  { name: 'onSecondaryClick', type: '() => void', default: 'undefined', description: 'Secondary button click handler' },
  { name: 'tertiaryIcon', type: 'string (SVG raw)', default: 'undefined', description: 'Tertiary icon button SVG for the footer, left-aligned. Wrapped in a Tooltip using tertiaryLabel.' },
  { name: 'tertiaryText', type: 'string', default: 'undefined', description: 'Tertiary text button label for the footer, left-aligned. Alternative to tertiaryIcon.' },
  { name: 'onTertiaryClick', type: '() => void', default: 'undefined', description: 'Tertiary button click handler (icon or text)' },
  { name: 'tertiaryLabel', type: 'string', default: "'Additional action'", description: 'Accessible aria-label and tooltip for the tertiary icon button' },
  { name: 'footer', type: 'ReactNode', default: 'undefined', description: 'Custom footer content — overrides individual footer button props' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes for the dialog panel' },
];

/* ── Sample data ── */
const TEAM_MEMBERS = [
  { name: 'Sarah Chen', role: 'Demand Planner', email: 'schen@corp.com', active: true },
  { name: 'James Rodriguez', role: 'Supply Analyst', email: 'jrodriguez@corp.com', active: true },
  { name: 'Aisha Patel', role: 'Inventory Lead', email: 'apatel@corp.com', active: true },
  { name: 'Marcus Kim', role: 'Logistics Manager', email: 'mkim@corp.com', active: false },
  { name: 'Elena Volkov', role: 'Data Scientist', email: 'evolkov@corp.com', active: true },
  { name: 'David Okafor', role: 'Operations Head', email: 'dokafor@corp.com', active: false },
  { name: 'Lisa Tanaka', role: 'Finance Analyst', email: 'ltanaka@corp.com', active: true },
  { name: 'Omar Hassan', role: 'S&OP Manager', email: 'ohassan@corp.com', active: true },
];

const PLAN_ITEMS = [
  { id: 'DP-1024', name: 'Q2 Demand Forecast — NA Region', status: 'In Progress', updated: '2 hours ago', owner: 'S. Chen' },
  { id: 'DP-1025', name: 'Seasonal Adjustment — EMEA', status: 'Review', updated: '4 hours ago', owner: 'E. Volkov' },
  { id: 'DP-1026', name: 'New Product Introduction Plan', status: 'Draft', updated: '1 day ago', owner: 'J. Rodriguez' },
  { id: 'DP-1027', name: 'Safety Stock Recalculation', status: 'Complete', updated: '2 days ago', owner: 'A. Patel' },
  { id: 'DP-1028', name: 'Supplier Lead Time Analysis', status: 'In Progress', updated: '3 hours ago', owner: 'M. Kim' },
  { id: 'DP-1029', name: 'Promotional Uplift Model', status: 'Draft', updated: '5 hours ago', owner: 'E. Volkov' },
  { id: 'DP-1030', name: 'Distribution Network Optimization', status: 'Review', updated: '1 day ago', owner: 'D. Okafor' },
  { id: 'DP-1031', name: 'ABC Classification Update', status: 'Complete', updated: '3 days ago', owner: 'L. Tanaka' },
];

const STATUS_COLORS = {
  'In Progress': 'bg-info',
  Review: 'bg-warning',
  Draft: 'bg-text-tertiary',
  Complete: 'bg-success',
};

/* ── Workspace Settings Back Navigation Demo ── */
const SETTINGS_SECTIONS = [
  {
    key: 'general',
    label: 'General',
    desc: 'Workspace name, timezone, and defaults',
    fields: [
      { label: 'Workspace Name', value: 'Supply Chain Hub', type: 'text' },
      { label: 'Timezone', value: 'UTC-5 (Eastern)', type: 'text' },
      { label: 'Default Currency', value: 'USD', type: 'text' },
      { label: 'Fiscal Year Start', value: 'January', type: 'text' },
    ],
  },
  {
    key: 'notifications',
    label: 'Notifications',
    desc: 'Email, push, and digest preferences',
    items: [
      { name: 'Email alerts', on: true },
      { name: 'Push notifications', on: false },
      { name: 'Weekly digest', on: true },
      { name: 'Plan status changes', on: true },
      { name: 'Assignment notifications', on: false },
    ],
  },
  {
    key: 'integrations',
    label: 'Integrations',
    desc: 'Connected services and data sources',
    items: [
      { name: 'SAP ERP Connector', on: true },
      { name: 'Salesforce CRM', on: true },
      { name: 'Azure Data Lake', on: false },
      { name: 'Snowflake Warehouse', on: true },
    ],
  },
];

function BackNavSettingsDemo() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState('main');
  const section = SETTINGS_SECTIONS.find((s) => s.key === page);

  return (
    <>
      <Button variant="outline" onClick={() => { setOpen(true); setPage('main'); }}>
        Workspace Settings
      </Button>
      <DialogWindow
        open={open}
        onClose={() => setOpen(false)}
        title={page === 'main' ? 'Workspace Settings' : section?.label}
        hasBackBtn={page !== 'main'}
        onBack={() => setPage('main')}
        variant={page === 'main' ? 'edge' : 'space'}
        primaryLabel={page !== 'main' ? 'Save Changes' : undefined}
        secondaryLabel={page !== 'main' ? 'Cancel' : undefined}
        height="sm"
        width="sm"
        expandable
        draggable
      >
        {page === 'main' ? (
          <div>
            {SETTINGS_SECTIONS.map((s) => (
              <div
                key={s.key}
                role="button"
                tabIndex={0}
                className="flex items-center justify-between px-4 py-3 hover:bg-surface-hover cursor-pointer border-b border-border/20 last:border-0"
                onClick={() => setPage(s.key)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPage(s.key); } }}
              >
                <div>
                  <div className="text-sm text-text font-medium">{s.label}</div>
                  <div className="text-xs text-text-tertiary mt-0.5">{s.desc}</div>
                </div>
                <span className="text-text-tertiary text-sm">&rsaquo;</span>
              </div>
            ))}
          </div>
        ) : section?.fields ? (
          <div className="space-y-4">
            <p className="text-xs text-text-secondary">{section.desc}</p>
            {section.fields.map((f) => (
              <div key={f.label}>
                <label className="text-xs font-medium text-text-secondary block mb-1">{f.label}</label>
                <div className="text-sm text-text bg-surface-raised px-3 py-2 border border-border/30">{f.value}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-text-secondary">{section?.desc}</p>
            {section?.items.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm text-text">{item.name}</span>
                <Switch size="sm" defaultChecked={item.on} />
              </div>
            ))}
          </div>
        )}
      </DialogWindow>
    </>
  );
}

export default function DialogWindowPage() {
  /* ── Interactive demo state ── */
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoType, setDemoType] = useState('modal');
  const [demoOverlay, setDemoOverlay] = useState('dim');
  const [demoHeight, setDemoHeight] = useState('md');
  const [demoWidth, setDemoWidth] = useState('md');
  const [demoDraggable, setDemoDraggable] = useState(true);
  const [demoDragHandle, setDemoDragHandle] = useState(false);
  const [demoExpandable, setDemoExpandable] = useState(true);
  const [demoVariant, setDemoVariant] = useState('edge');

  /* ── Modal vs Non-Modal demos ── */
  const [modalOpen, setModalOpen] = useState(false);
  const [nonModalOpen, setNonModalOpen] = useState(false);

  /* ── Overlay demos ── */
  const [dimOpen, setDimOpen] = useState(false);
  const [blurOpen, setBlurOpen] = useState(false);
  const [transparentOpen, setTransparentOpen] = useState(false);

  /* ── Size demos ── */
  const [sizeOpen, setSizeOpen] = useState(false);
  const [sizeH, setSizeH] = useState('md');
  const [sizeW, setSizeW] = useState('md');

  /* ── Draggable demo ── */
  const [dragOpen, setDragOpen] = useState(false);

  /* ── Expandable demo ── */
  const [expandOpen, setExpandOpen] = useState(false);

  /* ── Resizable demo ── */
  const [resizeOpen, setResizeOpen] = useState(false);

  /* ── Sticky dialog demo ── */
  const [stickySnapOpen, setStickySnapOpen] = useState(false);

  /* ── Content Variants demo ── */
  const [spaceOpen, setSpaceOpen] = useState(false);
  const [edgeOpen, setEdgeOpen] = useState(false);

  /* ── Sticky header demo ── */
  const [stickyOpen, setStickyOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredPlans = PLAN_ITEMS.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <article className="space-y-12">
      <PageHeader
        title="Dialog Window"
        description="A centered window for focused tasks with optional overlay. Modal dialogs block page interaction to surface their content; non-modal dialogs allow continued page interaction. Supports four responsive size presets, header-bar drag repositioning, and expand/collapse."
        status="stable"
        category="Containers"
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Interactive Demo ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="demo" className="text-lg font-semibold text-text mb-4">Interactive Demo</h2>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Type',
              value: demoType,
              onChange: setDemoType,
              options: ['modal', 'non-modal'],
            },
            {
              type: 'select',
              label: 'Overlay',
              value: demoOverlay,
              onChange: setDemoOverlay,
              options: ['dim', 'blur', 'transparent'],
            },
            {
              type: 'select',
              label: 'Height',
              value: demoHeight,
              onChange: setDemoHeight,
              options: ['sm', 'md', 'lg', 'xl'],
            },
            {
              type: 'select',
              label: 'Width',
              value: demoWidth,
              onChange: setDemoWidth,
              options: ['sm', 'md', 'lg', 'xl'],
            },
            {
              type: 'select',
              label: 'Body Variant',
              value: demoVariant,
              onChange: setDemoVariant,
              options: ['space', 'edge'],
            },
            { type: 'checkbox', label: 'Draggable', value: demoDraggable, onChange: setDemoDraggable },
            { type: 'checkbox', label: 'Drag Handle', value: demoDragHandle, onChange: setDemoDragHandle },
            { type: 'checkbox', label: 'Expandable', value: demoExpandable, onChange: setDemoExpandable },
          ]}
        >
          <div className="flex items-center justify-center py-20">
            <Button variant="outline" onClick={() => setDemoOpen(true)}>
              Open Dialog Window
            </Button>
          </div>
        </ComponentDemo>

        <DialogWindow
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          type={demoType}
          overlay={demoOverlay}
          height={demoHeight}
          width={demoWidth}
          title="Team Management"
          draggable={demoDraggable}
          showDragHandle={demoDragHandle}
          expandable={demoExpandable}
          variant={demoVariant}
          headerSwitch
          headerSwitchLabel="Toggle active members"
          overflowMenu={
            <DropdownButton
              variant="secondary"
              size="sm"
              leadingIcon={<O9Icon svg={gridFilterSvg} />}
              aria-label="More actions"
              menu={
                <DropdownList>
                  <DropdownList.Item icon={<O9Icon svg={downloadSvg} />}>Export CSV</DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={copySvg} />}>Duplicate team</DropdownList.Item>
                  <DropdownList.Item icon={<O9Icon svg={shareSvg} />}>Share access</DropdownList.Item>
                  <DropdownList.Divider />
                  <DropdownList.Item icon={<O9Icon svg={binSvg} />}>Remove all</DropdownList.Item>
                </DropdownList>
              }
            />
          }
          stickyHeader={
            <p className="text-xs text-text-secondary pb-2">
              Manage team member access and roles for the current workspace.
            </p>
          }
          primaryLabel="Save"
          onPrimaryClick={() => {}}
          secondaryLabel="Cancel"
          onSecondaryClick={() => {}}
        >
          {demoVariant === 'edge' ? (
            <div>
              {/* Column header */}
              <div className="flex items-center px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-text-tertiary border-b border-border/30 bg-surface-raised/50">
                <span className="flex-1">Member</span>
                <span className="w-32">Role</span>
                <span className="w-20 text-center">Status</span>
              </div>
              {TEAM_MEMBERS.map((m) => (
                <div
                  key={m.email}
                  className="flex items-center px-4 py-3 text-sm hover:bg-surface-hover cursor-pointer border-b border-border/10 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-text font-medium text-sm truncate">{m.name}</div>
                    <div className="text-text-tertiary text-xs truncate">{m.email}</div>
                  </div>
                  <span className="w-32 text-xs text-text-secondary">{m.role}</span>
                  <span className="w-20 flex justify-center">
                    <span className={`w-2 h-2 rounded-full ${m.active ? 'bg-success' : 'bg-text-tertiary'}`} />
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {TEAM_MEMBERS.map((m) => (
                <div key={m.email} className="flex items-center justify-between p-3 bg-surface-raised border border-border/20">
                  <div className="min-w-0">
                    <div className="text-sm text-text font-medium truncate">{m.name}</div>
                    <div className="text-xs text-text-tertiary truncate">{m.role} &middot; {m.email}</div>
                  </div>
                  <span className={`w-2 h-2 rounded-full shrink-0 ml-3 ${m.active ? 'bg-success' : 'bg-text-tertiary'}`} />
                </div>
              ))}
            </div>
          )}
        </DialogWindow>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Modal vs Non-Modal ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="types" className="text-lg font-semibold text-text mb-2">Modal vs Non-Modal</h2>
        <p className="text-sm text-text-secondary mb-4">
          A <strong className="text-text">modal</strong> dialog renders a backdrop overlay that blocks page interaction — use it for focused tasks like forms, confirmations, or settings. A <strong className="text-text">non-modal</strong> dialog has no overlay, letting users interact with the page content behind it.
        </p>
        <CodeExample code={`{/* Modal — blocks page interaction */}
<DialogWindow
  open={open}
  onClose={() => setOpen(false)}
  type="modal"
  title="Confirm Action"
  primaryLabel="Confirm"
>
  <p>Are you sure you want to proceed?</p>
</DialogWindow>

{/* Non-modal — page stays interactive */}
<DialogWindow
  open={open}
  onClose={() => setOpen(false)}
  type="non-modal"
  title="Quick Reference"
  draggable
>
  <p>This window stays on top.</p>
</DialogWindow>`}>
          <div className="flex items-center justify-center gap-4 py-16">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
              Modal Dialog
            </Button>
            <Button variant="outline" size="sm" onClick={() => setNonModalOpen(true)}>
              Non-Modal Dialog
            </Button>
          </div>
        </CodeExample>

        <DialogWindow
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          type="modal"
          title="Confirm Action"
          height="sm"
          width="sm"
          primaryLabel="Confirm"
          onPrimaryClick={() => {}}
          secondaryLabel="Cancel"
          onSecondaryClick={() => {}}
        >
          <div className="space-y-3">
            <p className="text-sm text-text">
              This modal dialog disables the page content behind it and dims the background to surface its content.
            </p>
            <p className="text-xs text-text-secondary">
              Use modal dialogs when the user needs to focus on a specific task before continuing with the rest of the application.
            </p>
          </div>
        </DialogWindow>

        <DialogWindow
          open={nonModalOpen}
          onClose={() => setNonModalOpen(false)}
          type="non-modal"
          title="Quick Reference"
          height="sm"
          width="sm"
          draggable
          resizable
        >
          <div className="space-y-3">
            <p className="text-sm text-text">
              This non-modal dialog allows you to interact with the page content behind the window. It is also resizable — drag any edge or corner to resize.
            </p>
            <p className="text-xs text-text-secondary">
              Drag from anywhere on the header bar to reposition the window. Click outside or press Escape to dismiss.
            </p>
          </div>
        </DialogWindow>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Overlay Variants ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="overlay" className="text-lg font-semibold text-text mb-2">Overlay Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Modal dialogs support three overlay styles. <strong className="text-text">Dim</strong> applies a semi-transparent dark overlay. <strong className="text-text">Blur</strong> adds a frosted glass effect. <strong className="text-text">Transparent</strong> provides an invisible backdrop that still captures clicks to dismiss the dialog.
        </p>
        <CodeExample code={`{/* Semi-transparent dim overlay */}
<DialogWindow overlay="dim" type="modal" …>…</DialogWindow>

{/* Frosted glass blur overlay */}
<DialogWindow overlay="blur" type="modal" …>…</DialogWindow>

{/* Invisible overlay — clicks still dismiss */}
<DialogWindow overlay="transparent" type="modal" …>…</DialogWindow>`}>
          <div className="flex items-center justify-center gap-4 py-16">
            <Button variant="outline" size="sm" onClick={() => setDimOpen(true)}>
              Dim Overlay
            </Button>
            <Button variant="outline" size="sm" onClick={() => setBlurOpen(true)}>
              Blur Overlay
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTransparentOpen(true)}>
              Transparent Overlay
            </Button>
          </div>
        </CodeExample>

        <DialogWindow
          open={dimOpen}
          onClose={() => setDimOpen(false)}
          overlay="dim"
          title="Dim Overlay"
          height="sm"
          width="sm"
          primaryLabel="Got it"
          onPrimaryClick={() => {}}
        >
          <p className="text-sm text-text">
            The dim overlay uses a semi-transparent dark background at 60% opacity, drawing focus to the dialog content.
          </p>
        </DialogWindow>

        <DialogWindow
          open={blurOpen}
          onClose={() => setBlurOpen(false)}
          overlay="blur"
          title="Blur Overlay"
          height="sm"
          width="sm"
          primaryLabel="Got it"
          onPrimaryClick={() => {}}
        >
          <p className="text-sm text-text">
            The blur overlay applies a frosted glass effect with reduced opacity, maintaining visual context of the page behind while keeping focus on the dialog.
          </p>
        </DialogWindow>

        <DialogWindow
          open={transparentOpen}
          onClose={() => setTransparentOpen(false)}
          overlay="transparent"
          title="Transparent Overlay"
          height="sm"
          width="sm"
          draggable
          primaryLabel="Got it"
          onPrimaryClick={() => {}}
        >
          <div className="space-y-3">
            <p className="text-sm text-text">
              The transparent overlay is invisible — the page behind looks fully visible with no dimming or blur. However, clicking outside the dialog still dismisses it.
            </p>
            <p className="text-xs text-text-secondary">
              Useful for lightweight modal dialogs that need dismissibility without visually blocking the page.
            </p>
          </div>
        </DialogWindow>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Content Variants ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="content-variants" className="text-lg font-semibold text-text mb-2">Content Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          The body supports two layout variants, matching the Popover component pattern:
        </p>
        <ul className="list-disc list-inside text-sm text-text-secondary mb-4 space-y-1">
          <li><strong className="text-text">space</strong> — Default padded body with horizontal padding. Use for forms, settings, and general content. Vertical scroll only when content overflows.</li>
          <li><strong className="text-text">edge</strong> — Full-width body with no horizontal padding (100% width). Use for tables, lists, and edge-to-edge content. Vertical scroll only when content overflows.</li>
        </ul>
        <CodeExample code={`{/* Padded body — forms, settings */}
<DialogWindow title="Settings" variant="space" primaryLabel="Save">
  <Switch label="Auto-forecast" />
  <Switch label="Include seasonality" />
</DialogWindow>

{/* Full-width body — tables, lists */}
<DialogWindow title="Members" variant="edge" primaryLabel="Confirm">
  <MemberTable members={members} />
</DialogWindow>`}>
          <div className="flex items-center justify-center gap-4 py-16">
            <Button variant="outline" size="sm" onClick={() => setSpaceOpen(true)}>
              Space (padded)
            </Button>
            <Button variant="outline" size="sm" onClick={() => setEdgeOpen(true)}>
              Edge (full-width)
            </Button>
          </div>
        </CodeExample>

        <DialogWindow
          open={spaceOpen}
          onClose={() => setSpaceOpen(false)}
          title="Demand Settings"
          variant="space"
          height="sm"
          width="sm"
          primaryLabel="Save"
          onPrimaryClick={() => {}}
          secondaryLabel="Reset"
          onSecondaryClick={() => {}}
        >
          <div className="space-y-3">
            <p className="text-xs text-text-secondary mb-2">Configure demand planning parameters for the selected region.</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text">Auto-forecast</span>
              <Switch size="sm" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text">Include seasonality</span>
              <Switch size="sm" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text">Outlier correction</span>
              <Switch size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text">Rolling average</span>
              <Switch size="sm" />
            </div>
          </div>
        </DialogWindow>

        <DialogWindow
          open={edgeOpen}
          onClose={() => setEdgeOpen(false)}
          title="Team Members"
          variant="edge"
          height="sm"
          width="sm"
          primaryLabel="Done"
          onPrimaryClick={() => {}}
        >
          <div>
            {TEAM_MEMBERS.slice(0, 6).map((m) => (
              <div
                key={m.email}
                className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-surface-hover cursor-pointer border-b border-border/10 last:border-0"
              >
                <div className="min-w-0">
                  <div className="text-text text-sm">{m.name}</div>
                  <div className="text-text-tertiary text-xs">{m.role}</div>
                </div>
                <span className={`w-2 h-2 rounded-full shrink-0 ${m.active ? 'bg-success' : 'bg-text-tertiary'}`} />
              </div>
            ))}
          </div>
        </DialogWindow>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Size Presets ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="sizes" className="text-lg font-semibold text-text mb-2">Size Presets</h2>
        <p className="text-sm text-text-secondary mb-4">
          Four height and four width presets allow flexible sizing. Height uses viewport height units for responsive behavior. Width uses fixed pixel values for consistent content layout.
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-6 font-semibold text-text">Preset</th>
                <th className="text-left py-2 pr-6 font-semibold text-text">Height</th>
                <th className="text-left py-2 font-semibold text-text">Width</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                ['sm', '52vh', '440px'],
                ['md', '70vh', '720px'],
                ['lg', '84vh', '960px'],
                ['xl', '96vh', '1440px'],
              ].map(([key, h, w]) => (
                <tr key={key} className="border-b border-border">
                  <td className="py-2 pr-6"><code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">{key}</code></td>
                  <td className="py-2 pr-6">{h}</td>
                  <td className="py-2">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeExample code={`<DialogWindow height="lg" width="md" title="Large Height, Medium Width">
  …
</DialogWindow>`}>
          <div className="flex items-center justify-center gap-4 py-16">
            <div className="flex flex-wrap items-end gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary">Height</span>
                <select
                  value={sizeH}
                  onChange={(e) => setSizeH(e.target.value)}
                  className="border border-border bg-surface-sunken px-2.5 py-1.5 text-xs text-text outline-none"
                >
                  {['sm', 'md', 'lg', 'xl'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary">Width</span>
                <select
                  value={sizeW}
                  onChange={(e) => setSizeW(e.target.value)}
                  className="border border-border bg-surface-sunken px-2.5 py-1.5 text-xs text-text outline-none"
                >
                  {['sm', 'md', 'lg', 'xl'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <Button variant="outline" size="sm" onClick={() => setSizeOpen(true)}>
                Open {sizeH.toUpperCase()} x {sizeW.toUpperCase()}
              </Button>
            </div>
          </div>
        </CodeExample>

        <DialogWindow
          open={sizeOpen}
          onClose={() => setSizeOpen(false)}
          height={sizeH}
          width={sizeW}
          title={`Size: ${sizeH.toUpperCase()} height x ${sizeW.toUpperCase()} width`}
          primaryLabel="Close"
          onPrimaryClick={() => {}}
          expandable
        >
          <div className="space-y-3">
            <p className="text-sm text-text">
              This dialog demonstrates the <strong>{sizeH}</strong> height and <strong>{sizeW}</strong> width presets.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-surface-raised p-3 border border-border/30">
                <div className="text-xs font-medium text-text mb-1">Height</div>
                <div className="text-lg font-bold text-text">{sizeH === 'sm' ? '52vh' : sizeH === 'md' ? '70vh' : sizeH === 'lg' ? '84vh' : '96vh'}</div>
              </div>
              <div className="bg-surface-raised p-3 border border-border/30">
                <div className="text-xs font-medium text-text mb-1">Width</div>
                <div className="text-lg font-bold text-text">{sizeW === 'sm' ? '440px' : sizeW === 'md' ? '720px' : sizeW === 'lg' ? '960px' : '1440px'}</div>
              </div>
            </div>
          </div>
        </DialogWindow>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Header Actions & Overflow Menu ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="header-actions" className="text-lg font-semibold text-text mb-2">Header Actions & Overflow Menu</h2>
        <p className="text-sm text-text-secondary mb-4">
          The header supports an optional <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">headerSwitch</code> toggle, custom action elements via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">headerActions</code>, and an overflow dropdown menu via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">overflowMenu</code>. All icon buttons display Tooltips on hover. Actions are placed between the title and the expand/close controls.
        </p>
        <CodeExample code={`<DialogWindow
  title="Pipeline Config"
  headerSwitch
  headerSwitchLabel="Enable pipeline"
  overflowMenu={
    <DropdownButton
      variant="secondary"
      size="sm"
      leadingIcon={<O9Icon svg={gridFilterSvg} />}
      aria-label="More actions"
      menu={
        <DropdownList>
          <DropdownList.Item icon={…}>Export</DropdownList.Item>
          <DropdownList.Item icon={…}>Share</DropdownList.Item>
        </DropdownList>
      }
    />
  }
  expandable
>…</DialogWindow>`}>
          <div className="flex items-center justify-center py-16">
            <HeaderActionsDemo />
          </div>
        </CodeExample>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Draggable ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="draggable" className="text-lg font-semibold text-text mb-2">Draggable</h2>
        <p className="text-sm text-text-secondary mb-4">
          Enable <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">draggable</code> to allow repositioning by clicking and dragging anywhere on the header bar. Interactive elements (buttons, switches, dropdown menus) are excluded — they continue to work normally. The header shows a grab cursor to indicate the drag affordance. Position resets when the dialog closes. Optionally add <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">showDragHandle</code> to display an explicit drag handle icon button in the header for additional visual affordance.
        </p>
        <CodeExample code={`<DialogWindow
  open={open}
  onClose={() => setOpen(false)}
  title="Draggable Window"
  draggable
  showDragHandle
>
  <p>Drag from the header bar to move.</p>
</DialogWindow>`}>
          <div className="flex items-center justify-center py-16">
            <Button variant="outline" onClick={() => setDragOpen(true)}>
              Draggable Dialog
            </Button>
          </div>
        </CodeExample>

        <DialogWindow
          open={dragOpen}
          onClose={() => setDragOpen(false)}
          title="Draggable Window"
          height="sm"
          width="sm"
          draggable
          showDragHandle
          headerSwitch
          headerSwitchLabel="Toggle feature"
          primaryLabel="Done"
          onPrimaryClick={() => {}}
        >
          <div className="space-y-3">
            <p className="text-sm text-text">
              Click and hold anywhere on the header bar to drag this window. The Switch in the header still works normally — only the empty space on the header initiates dragging.
            </p>
            <p className="text-xs text-text-secondary">
              The position resets automatically when the dialog is closed and reopened.
            </p>
          </div>
        </DialogWindow>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Expand / Collapse ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="expandable" className="text-lg font-semibold text-text mb-2">Expand / Collapse</h2>
        <p className="text-sm text-text-secondary mb-4">
          Enable <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">expandable</code> to add an expand/compress toggle in the header with Tooltip labels. When expanded, the dialog fills 96% of the viewport. Expanding also resets any drag position.
        </p>
        <CodeExample code={`<DialogWindow
  open={open}
  onClose={() => setOpen(false)}
  title="Expandable Window"
  expandable
  height="sm"
  width="md"
>
  <p>Click the expand button to maximize.</p>
</DialogWindow>`}>
          <div className="flex items-center justify-center py-16">
            <Button variant="outline" onClick={() => setExpandOpen(true)}>
              Expandable Dialog
            </Button>
          </div>
        </CodeExample>

        <DialogWindow
          open={expandOpen}
          onClose={() => setExpandOpen(false)}
          title="Expandable Window"
          height="sm"
          width="md"
          expandable
          draggable
          primaryLabel="Close"
          onPrimaryClick={() => {}}
        >
          <div className="space-y-3">
            <p className="text-sm text-text">
              Click the expand icon in the header to fill the viewport. Click the compress icon to restore the original size.
            </p>
            <p className="text-xs text-text-secondary">
              This dialog is also draggable — expanding resets the drag position to re-center the window.
            </p>
          </div>
        </DialogWindow>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Resizable ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="resizable" className="text-lg font-semibold text-text mb-2">Resizable</h2>
        <p className="text-sm text-text-secondary mb-4">
          Enable <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">resizable</code> on non-modal dialogs to allow users to resize the window by dragging any of the four edges or four corners. The cursor changes to the appropriate resize cursor on hover. Minimum size is 320×200px, maximum is 96% of the viewport.
        </p>
        <CodeExample code={`<DialogWindow
  open={open}
  onClose={() => setOpen(false)}
  type="non-modal"
  title="Resizable Window"
  resizable
  draggable
  showDragHandle
  height="sm"
  width="sm"
>
  <p>Drag edges or corners to resize.</p>
</DialogWindow>`}>
          <div className="flex items-center justify-center py-16">
            <Button variant="outline" onClick={() => setResizeOpen(true)}>
              Resizable Dialog
            </Button>
          </div>
        </CodeExample>

        <DialogWindow
          open={resizeOpen}
          onClose={() => setResizeOpen(false)}
          type="non-modal"
          title="Resizable Window"
          height="sm"
          width="sm"
          resizable
          draggable
          showDragHandle
          expandable
          primaryLabel="Done"
          onPrimaryClick={() => {}}
          tertiaryText="Reset"
          onTertiaryClick={() => {}}
        >
          <div className="space-y-3">
            <p className="text-sm text-text">
              Move your cursor to any edge or corner of this window — the cursor will change to indicate the resize direction. Click and drag to resize.
            </p>
            <p className="text-xs text-text-secondary">
              This window is also draggable from the header bar or the drag handle icon. The expand button resets any custom size.
            </p>
          </div>
        </DialogWindow>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Sticky Snap ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="sticky-snap" className="text-lg font-semibold text-text mb-2">Sticky Dialog</h2>
        <p className="text-sm text-text-secondary mb-4">
          Enable <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">sticky</code> on a draggable dialog to automatically snap the window to the nearest viewport corner when the user finishes dragging. The dialog animates smoothly to its snap position with a 16px margin from the edges.
        </p>
        <CodeExample code={`<DialogWindow
  open={open}
  onClose={() => setOpen(false)}
  type="non-modal"
  title="Sticky Window"
  draggable
  showDragHandle
  sticky
>
  <p>Drag and release — it snaps to the nearest corner.</p>
</DialogWindow>`}>
          <div className="flex items-center justify-center py-16">
            <Button variant="outline" onClick={() => setStickySnapOpen(true)}>
              Sticky Dialog
            </Button>
          </div>
        </CodeExample>

        <DialogWindow
          open={stickySnapOpen}
          onClose={() => setStickySnapOpen(false)}
          type="non-modal"
          title="Sticky Window"
          height="sm"
          width="sm"
          draggable
          showDragHandle
          sticky
          primaryLabel="Close"
          onPrimaryClick={() => {}}
        >
          <div className="space-y-3">
            <p className="text-sm text-text">
              Drag this dialog by the header bar or drag handle, then release. The window will smoothly animate to the nearest viewport corner.
            </p>
            <p className="text-xs text-text-secondary">
              The snap position is determined by the dialog&apos;s center point — whichever quadrant of the viewport the center falls in determines the target corner. A 16px margin is maintained from the edges.
            </p>
          </div>
        </DialogWindow>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Sticky Header with Scrolling Body ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="sticky-header" className="text-lg font-semibold text-text mb-2">Sticky Header with Scrolling Body</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">stickyHeader</code> for search bars, filters, or descriptions that remain fixed while the body scrolls vertically. Horizontal overflow is hidden.
        </p>
        <CodeExample code={`<DialogWindow
  title="Planning Items"
  stickyHeader={
    <div className="flex items-center gap-2 pb-2">
      <input placeholder="Search plans…" />
      <IconButton icon={filterSvg} />
    </div>
  }
  variant="edge"
>
  {plans.map(p => <PlanRow key={p.id} {...p} />)}
</DialogWindow>`}>
          <div className="flex items-center justify-center py-16">
            <Button variant="outline" onClick={() => { setStickyOpen(true); setSearchTerm(''); }}>
              Planning Items
            </Button>
          </div>
        </CodeExample>

        <DialogWindow
          open={stickyOpen}
          onClose={() => setStickyOpen(false)}
          title="Planning Items"
          height="md"
          width="md"
          expandable
          draggable
          stickyHeader={
            <div className="flex items-center gap-2 pb-2">
              <div className="flex items-center gap-1.5 flex-1 h-8 px-3 bg-surface-raised text-sm border border-border/30">
                <span className="text-text-tertiary shrink-0"><O9Icon svg={searchSvg} /></span>
                <input
                  type="text"
                  placeholder="Search plans…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent text-text text-sm outline-none placeholder:text-text-tertiary"
                />
              </div>
              <IconButton icon={<O9Icon svg={filterSvg} />} variant="secondary" size="md" aria-label="Filter" />
            </div>
          }
          variant="edge"
          primaryLabel="Select"
          onPrimaryClick={() => {}}
          secondaryLabel="Cancel"
          onSecondaryClick={() => {}}
        >
          <div>
            <div className="flex items-center px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-text-tertiary border-b border-border/30 bg-surface-raised/50 sticky top-0">
              <span className="w-20">ID</span>
              <span className="flex-1">Plan Name</span>
              <span className="w-24">Status</span>
              <span className="w-24">Owner</span>
              <span className="w-24 text-right">Updated</span>
            </div>
            {filteredPlans.length > 0 ? (
              filteredPlans.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center px-4 py-3 text-sm hover:bg-surface-hover cursor-pointer border-b border-border/10 last:border-0"
                >
                  <span className="w-20 text-xs text-text-tertiary font-mono">{p.id}</span>
                  <span className="flex-1 text-text text-sm truncate pr-4">{p.name}</span>
                  <span className="w-24 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_COLORS[p.status]}`} />
                    <span className="text-xs text-text-secondary">{p.status}</span>
                  </span>
                  <span className="w-24 text-xs text-text-secondary">{p.owner}</span>
                  <span className="w-24 text-xs text-text-tertiary text-right">{p.updated}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-sm text-text-tertiary text-center">
                No plans match your search.
              </div>
            )}
          </div>
        </DialogWindow>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Back Button Navigation ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="back-navigation" className="text-lg font-semibold text-text mb-2">Back Button Navigation</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">hasBackBtn</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">onBack</code> for multi-step flows inside the dialog. Content transitions are animated with a slide effect — drilling forward slides right-to-left, going back slides left-to-right.
        </p>
        <CodeExample code={`const [page, setPage] = useState('main');

<DialogWindow
  title={page === 'main' ? 'Settings' : section.label}
  hasBackBtn={page !== 'main'}
  onBack={() => setPage('main')}
  variant={page === 'main' ? 'edge' : 'space'}
  primaryLabel={page !== 'main' ? 'Save' : undefined}
>
  {page === 'main'
    ? <SettingsList onSelect={setPage} />
    : <SettingsDetail section={page} />}
</DialogWindow>`}>
          <div className="flex items-center justify-center py-16">
            <BackNavSettingsDemo />
          </div>
        </CodeExample>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Footer Buttons ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="footer" className="text-lg font-semibold text-text mb-2">Footer Buttons</h2>
        <p className="text-sm text-text-secondary mb-4">
          The footer supports up to three actions: a left-aligned tertiary button (icon or text), and right-aligned secondary outline + primary CTA buttons. Clicking primary or secondary executes the respective callback and automatically closes the dialog. Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">tertiaryIcon</code> for an icon button or <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">tertiaryText</code> for a text button.
        </p>
        <CodeExample code={`{/* Icon tertiary (left) + secondary + primary (right) */}
<DialogWindow
  title="Export Data"
  primaryLabel="Export"
  secondaryLabel="Cancel"
  tertiaryIcon={shareSvg}
  tertiaryLabel="Share export"
>…</DialogWindow>

{/* Text tertiary (left) + secondary + primary (right) */}
<DialogWindow
  title="Settings"
  primaryLabel="Save"
  secondaryLabel="Cancel"
  tertiaryText="Reset to defaults"
>…</DialogWindow>`}>
          <div className="flex items-center justify-center py-16">
            <FooterDemo />
          </div>
        </CodeExample>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Usage Guidelines ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="guidelines" className="text-lg font-semibold text-text mb-4">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use modal dialogs for focused tasks that require user attention — forms, confirmations, critical settings',
            'Use non-modal dialogs for reference content, quick lookups, or supplementary information',
            'Use the blur overlay when visual context of the background is helpful to the user',
            'Provide clear primary and secondary actions in the footer for confirmation workflows',
            'Use the draggable option for non-modal dialogs where users need to see page content',
            'Choose the smallest size preset that fits your content comfortably',
            'Use the overflow menu for secondary actions that do not need to be always visible',
            'Use the "space" variant for forms and settings; use the "edge" variant for tables and lists',
          ]}
          dontItems={[
            'Do not use dialog windows for simple alerts or confirmations — use AlertDialog instead',
            'Avoid nesting dialogs inside other dialogs',
            'Do not use modal dialogs for frequent, low-priority tasks — they interrupt user flow',
            'Avoid using xl size for simple content that fits in a smaller window',
            'Do not disable the close button or Escape key — users must always be able to dismiss the dialog',
            'Do not use non-modal dialogs without a clear way to dismiss them',
          ]}
        />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Accessibility ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="dialog"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-labelledby</code> linked to the title for screen reader announcements.</>,
            <>Modal dialogs set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-modal="true"</code> and trap focus within the dialog. Non-modal dialogs use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-modal="false"</code>.</>,
            'Focus is moved to the close button when the dialog opens. On close, focus returns to the triggering element.',
            <>Modal dialogs implement a <strong className="text-text">focus trap</strong> — Tab and Shift+Tab cycle through interactive elements within the dialog, preventing focus from escaping.</>,
            'Body scroll is locked when a modal dialog is open, preventing scroll on the page behind.',
            'Escape key closes the dialog for both modal and non-modal types.',
            <>The scrollable body is a focusable <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="region"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code> — keyboard users can scroll with arrow keys.</>,
            <>All header icon buttons (back, expand/compress, close) display <strong className="text-text">Tooltips</strong> on hover with descriptive labels. The close button Tooltip includes the Escape keyboard shortcut.</>,
            <>The tertiary footer icon button is wrapped in a <strong className="text-text">Tooltip</strong> using the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">tertiaryLabel</code> prop for both the tooltip text and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code>.</>,
            'Dragging is only initiated from non-interactive areas of the header bar — buttons, switches, and dropdown menus remain fully functional.',
            <>Slide animations respect <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">prefers-reduced-motion: reduce</code> — animations are skipped when the user prefers reduced motion.</>,
            'Backdrop clicks close modal dialogs. Outside clicks close non-modal dialogs.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── Keyboard Navigation ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
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
              {[
                ['Escape', 'Close the dialog and return focus to the triggering element'],
                ['Tab', 'Move focus to the next interactive element (trapped within dialog for modal type)'],
                ['Shift + Tab', 'Move focus to the previous interactive element'],
                ['Arrow Keys', 'Scroll the body content when the scrollable region is focused'],
                ['Enter / Space', 'Activate the focused button or interactive element'],
              ].map(([key, action]) => (
                <tr key={key} className="border-b border-border">
                  <td className="py-2 pr-6">
                    <kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">{key}</kbd>
                  </td>
                  <td className="py-2">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ── API Reference ── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-4">API Reference</h2>
        <PropsTable props={dialogProps} />
      </section>
    </article>
  );
}

/* ── Header Actions Demo (extracted to isolate state) ── */
function HeaderActionsDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Header Actions Demo
      </Button>
      <DialogWindow
        open={open}
        onClose={() => setOpen(false)}
        title="Pipeline Config"
        height="sm"
        width="sm"
        expandable
        draggable
        headerSwitch
        headerSwitchLabel="Enable pipeline"
        overflowMenu={
          <DropdownButton
            variant="secondary"
            size="sm"
            leadingIcon={<O9Icon svg={gridFilterSvg} />}
            aria-label="More actions"
            menu={
              <DropdownList>
                <DropdownList.Item icon={<O9Icon svg={downloadSvg} />}>Export config</DropdownList.Item>
                <DropdownList.Item icon={<O9Icon svg={copySvg} />}>Duplicate pipeline</DropdownList.Item>
                <DropdownList.Item icon={<O9Icon svg={shareSvg} />}>Share access</DropdownList.Item>
                <DropdownList.Divider />
                <DropdownList.Item icon={<O9Icon svg={binSvg} />}>Delete pipeline</DropdownList.Item>
              </DropdownList>
            }
          />
        }
        primaryLabel="Save"
        onPrimaryClick={() => {}}
        secondaryLabel="Cancel"
        onSecondaryClick={() => {}}
      >
        <div className="space-y-3">
          <p className="text-sm text-text">
            The header shows a Switch component for quick toggling, a kebab overflow menu for additional actions, the expand/compress toggle, and the close button.
          </p>
          <p className="text-xs text-text-secondary">
            Hover over any header icon button to see its Tooltip. The header bar is also draggable — buttons and the Switch are excluded from drag initiation.
          </p>
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text">Batch size</span>
              <span className="text-sm text-text-secondary">1000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text">Concurrency</span>
              <span className="text-sm text-text-secondary">4 threads</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text">Retry policy</span>
              <span className="text-sm text-text-secondary">3 attempts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text">Timeout</span>
              <span className="text-sm text-text-secondary">30 seconds</span>
            </div>
          </div>
        </div>
      </DialogWindow>
    </>
  );
}

/* ── Footer Demo (extracted to isolate state) ── */
function FooterDemo() {
  const [iconOpen, setIconOpen] = useState(false);
  const [textOpen, setTextOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" onClick={() => setIconOpen(true)}>
        Icon Tertiary
      </Button>
      <Button variant="outline" onClick={() => setTextOpen(true)}>
        Text Tertiary
      </Button>

      {/* Icon tertiary footer */}
      <DialogWindow
        open={iconOpen}
        onClose={() => setIconOpen(false)}
        title="Export Data"
        height="sm"
        width="sm"
        primaryLabel="Export"
        onPrimaryClick={() => {}}
        secondaryLabel="Cancel"
        onSecondaryClick={() => {}}
        tertiaryIcon={shareSvg}
        onTertiaryClick={() => {}}
        tertiaryLabel="Share export"
      >
        <div className="space-y-3">
          <p className="text-sm text-text">
            The share icon button is left-aligned. Primary and secondary buttons are right-aligned.
          </p>
          <div className="space-y-2">
            {['CSV', 'Excel (.xlsx)', 'JSON', 'Parquet'].map((fmt) => (
              <label key={fmt} className="flex items-center gap-2 p-2 hover:bg-surface-hover cursor-pointer text-sm text-text">
                <input type="radio" name="format-icon" className="accent-interactive" defaultChecked={fmt === 'CSV'} />
                {fmt}
              </label>
            ))}
          </div>
        </div>
      </DialogWindow>

      {/* Text tertiary footer */}
      <DialogWindow
        open={textOpen}
        onClose={() => setTextOpen(false)}
        title="Workspace Settings"
        height="sm"
        width="sm"
        primaryLabel="Save"
        onPrimaryClick={() => {}}
        secondaryLabel="Cancel"
        onSecondaryClick={() => {}}
        tertiaryText="Reset to defaults"
        onTertiaryClick={() => {}}
      >
        <div className="space-y-3">
          <p className="text-sm text-text">
            The &ldquo;Reset to defaults&rdquo; text button is left-aligned. Save and Cancel are right-aligned.
          </p>
          <div className="space-y-2">
            {['Light mode', 'Dark mode', 'System'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 p-2 hover:bg-surface-hover cursor-pointer text-sm text-text">
                <input type="radio" name="theme" className="accent-interactive" defaultChecked={opt === 'Light mode'} />
                {opt}
              </label>
            ))}
          </div>
        </div>
      </DialogWindow>
    </div>
  );
}
