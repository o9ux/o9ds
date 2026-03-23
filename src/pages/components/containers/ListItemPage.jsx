import { useState } from 'react';
import ListItem from '@/components/containers/ListItem';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import ComponentDemo from '@/docs/components/ComponentDemo';

import homeSvg from '@/assets/icons/o9con-home.svg?raw';
import fileSvg from '@/assets/icons/o9con-file.svg?raw';
import folderSvg from '@/assets/icons/o9con-folder.svg?raw';
import starSvg from '@/assets/icons/o9con-star.svg?raw';
import copySvg from '@/assets/icons/o9con-copy.svg?raw';
import pencilSvg from '@/assets/icons/o9con-pencil.svg?raw';
import binSvg from '@/assets/icons/o9con-bin.svg?raw';
import downloadSvg from '@/assets/icons/o9con-download.svg?raw';
import cogSvg from '@/assets/icons/o9con-cog.svg?raw';
import userSvg from '@/assets/icons/o9con-user.svg?raw';
import globeSvg from '@/assets/icons/o9con-globe.svg?raw';
import bookmarkSvg from '@/assets/icons/o9con-bookmark.svg?raw';
import lockSvg from '@/assets/icons/o9con-lock.svg?raw';

/* ── Props reference ── */
const listItemProps = [
  { name: 'children', type: 'ReactNode', default: '—', description: 'Primary text content' },
  { name: 'secondaryText', type: 'string', default: 'undefined', description: 'Secondary line — enables two-line layout' },
  { name: 'active', type: 'boolean', default: 'false', description: 'Active state with left border accent and subtle background' },
  { name: 'danger', type: 'boolean', default: 'false', description: 'Danger text color for destructive actions' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interactions and reduces opacity' },
  { name: 'dragHandle', type: 'boolean', default: 'false', description: 'Show a leading drag handle icon' },
  { name: 'avatar', type: 'object', default: 'undefined', description: 'Avatar props — renders an Avatar component as the leading element' },
  { name: 'leadingIcon', type: 'string (SVG)', default: 'undefined', description: 'SVG raw string for a leading O9Icon' },
  { name: 'checkbox', type: 'boolean', default: 'false', description: 'Show a Checkbox control as the leading element' },
  { name: 'radio', type: 'boolean', default: 'false', description: 'Show a Radio control as the leading element' },
  { name: 'emptyLeading', type: 'boolean', default: 'false', description: 'Empty icon-sized placeholder block (no icon)' },
  { name: 'checked', type: 'boolean', default: 'undefined', description: 'Checked state for checkbox or radio leading' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate state (checkbox only)' },
  { name: 'onCheckedChange', type: 'function', default: 'undefined', description: 'Callback when checkbox/radio state changes' },
  { name: 'radioName', type: 'string', default: 'undefined', description: 'Radio group name' },
  { name: 'radioValue', type: 'string', default: 'undefined', description: 'Radio value' },
  { name: 'shortcut', type: 'string', default: 'undefined', description: 'Keyboard shortcut label (trailing badge)' },
  { name: 'switchControl', type: 'boolean', default: 'false', description: 'Show a Switch toggle' },
  { name: 'switchChecked', type: 'boolean', default: 'undefined', description: 'Switch checked state' },
  { name: 'onSwitchChange', type: 'function', default: 'undefined', description: 'Switch change callback' },
  { name: 'actions', type: 'Array<{icon, onClick, aria-label}>', default: '[]', description: 'Trailing action icon buttons' },
  { name: 'maxActions', type: 'number', default: '3', description: 'Maximum visible action buttons' },
  { name: 'showOverflow', type: 'boolean', default: 'false', description: 'Show overflow (⋮) menu button' },
  { name: 'onOverflow', type: 'function', default: 'undefined', description: 'Overflow button click callback' },
  { name: 'showSubmenu', type: 'boolean', default: 'false', description: 'Show angle-right submenu drill-down icon' },
  { name: 'onSubmenuClick', type: 'function', default: 'undefined', description: 'Submenu button click callback' },
  { name: 'showExternalLink', type: 'boolean', default: 'false', description: 'Show external link (↗) icon' },
  { name: 'externalLinkHref', type: 'string', default: 'undefined', description: 'External link URL — renders as anchor' },
  { name: 'onExternalLinkClick', type: 'function', default: 'undefined', description: 'External link click callback' },
  { name: 'onClick', type: 'function', default: 'undefined', description: 'Click handler for the list item row' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes on the root element' },
];

export default function ListItemPage() {
  /* ── Interactive demo state ── */
  const [demoActive, setDemoActive] = useState(false);
  const [demoDanger, setDemoDanger] = useState(false);
  const [demoDisabled, setDemoDisabled] = useState(false);
  const [demoDragHandle, setDemoDragHandle] = useState(false);
  const [demoLeading, setDemoLeading] = useState('none');
  const [demoSecondary, setDemoSecondary] = useState(false);
  const [demoShortcut, setDemoShortcut] = useState(false);
  const [demoSwitch, setDemoSwitch] = useState(false);
  const [demoSwitchChecked, setDemoSwitchChecked] = useState(false);
  const [demoOverflow, setDemoOverflow] = useState(false);
  const [demoSubmenu, setDemoSubmenu] = useState(false);
  const [demoExtLink, setDemoExtLink] = useState(false);
  const [demoChecked, setDemoChecked] = useState(false);

  /* ── States section ── */
  const [stateActiveIdx, setStateActiveIdx] = useState(null);

  /* ── Checkbox section ── */
  const [cbChecked, setCbChecked] = useState([true, false, false]);
  const toggleCb = (i) => setCbChecked((p) => p.map((v, j) => (j === i ? !v : v)));

  /* ── Radio section ── */
  const [radioVal, setRadioVal] = useState('opt-a');

  /* ── Switch section ── */
  const [swStates, setSwStates] = useState([true, false, true]);
  const toggleSw = (i) => setSwStates((p) => p.map((v, j) => (j === i ? !v : v)));

  /* ── Dismissible demo ── */
  const [overflowLog, setOverflowLog] = useState('');

  /* ── Interactive demo config ── */
  const demoControls = [
    { type: 'checkbox', label: 'Active', value: demoActive, onChange: setDemoActive },
    { type: 'checkbox', label: 'Danger', value: demoDanger, onChange: setDemoDanger },
    { type: 'checkbox', label: 'Disabled', value: demoDisabled, onChange: setDemoDisabled },
    { type: 'checkbox', label: 'Drag handle', value: demoDragHandle, onChange: setDemoDragHandle },
    { type: 'checkbox', label: 'Secondary text', value: demoSecondary, onChange: setDemoSecondary },
    { type: 'checkbox', label: 'Shortcut', value: demoShortcut, onChange: setDemoShortcut },
    { type: 'checkbox', label: 'Switch', value: demoSwitch, onChange: setDemoSwitch },
    { type: 'checkbox', label: 'Overflow', value: demoOverflow, onChange: setDemoOverflow },
    { type: 'checkbox', label: 'Submenu', value: demoSubmenu, onChange: setDemoSubmenu },
    { type: 'checkbox', label: 'External link', value: demoExtLink, onChange: setDemoExtLink },
    {
      type: 'select', label: 'Leading', value: demoLeading, onChange: setDemoLeading,
      options: ['none', 'icon', 'avatar', 'checkbox', 'radio', 'empty'],
    },
  ];

  return (
    <article className="space-y-12">
      <PageHeader
        title="List Item"
        description="Composable list item with optional leading elements (drag handle, avatar, icon, checkbox, radio), text variants (single-line, two-line), and trailing actions (shortcut, switch, action buttons, overflow, submenu, external link)."
        status="stable"
        category="Containers"
      />

      {/* ━━━ Interactive Demo ━━━ */}
      <section>
        <h2 id="demo" className="text-lg font-semibold text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">
          Toggle props to explore all ListItem capabilities.
        </p>
        <ComponentDemo
          previewClassName="bg-surface"
          controls={demoControls}
          code={`<ListItem
  ${demoActive ? 'active\n  ' : ''}${demoDanger ? 'danger\n  ' : ''}${demoDisabled ? 'disabled\n  ' : ''}${demoDragHandle ? 'dragHandle\n  ' : ''}${demoLeading === 'icon' ? 'leadingIcon={homeSvg}\n  ' : ''}${demoLeading === 'avatar' ? 'avatar={{ name: "Kiran Shah" }}\n  ' : ''}${demoLeading === 'checkbox' ? 'checkbox checked={checked} onCheckedChange={…}\n  ' : ''}${demoLeading === 'radio' ? 'radio checked={checked} onCheckedChange={…}\n  ' : ''}${demoLeading === 'empty' ? 'emptyLeading\n  ' : ''}${demoSecondary ? 'secondaryText="Secondary description text"\n  ' : ''}${demoShortcut ? 'shortcut="⌘S"\n  ' : ''}${demoSwitch ? 'switchControl switchChecked={switchChecked} onSwitchChange={…}\n  ' : ''}${demoOverflow ? 'showOverflow onOverflow={…}\n  ' : ''}${demoSubmenu ? 'showSubmenu\n  ' : ''}${demoExtLink ? 'showExternalLink\n  ' : ''}onClick={…}
>
  List item label
</ListItem>`}
        >
          <div className="w-full max-w-md border border-border">
            <ListItem
              active={demoActive}
              danger={demoDanger}
              disabled={demoDisabled}
              dragHandle={demoDragHandle}
              leadingIcon={demoLeading === 'icon' ? homeSvg : undefined}
              avatar={demoLeading === 'avatar' ? { name: 'Kiran Shah' } : undefined}
              checkbox={demoLeading === 'checkbox'}
              radio={demoLeading === 'radio'}
              emptyLeading={demoLeading === 'empty'}
              checked={demoLeading === 'checkbox' || demoLeading === 'radio' ? demoChecked : undefined}
              onCheckedChange={() => setDemoChecked(!demoChecked)}
              secondaryText={demoSecondary ? 'Secondary description text' : undefined}
              shortcut={demoShortcut ? '⌘S' : undefined}
              switchControl={demoSwitch}
              switchChecked={demoSwitchChecked}
              onSwitchChange={() => setDemoSwitchChecked(!demoSwitchChecked)}
              showOverflow={demoOverflow}
              onOverflow={() => {}}
              showSubmenu={demoSubmenu}
              showExternalLink={demoExtLink}
              onClick={() => {}}
            >
              List item label
            </ListItem>
          </div>
        </ComponentDemo>
      </section>

      {/* ━━━ States ━━━ */}
      <section>
        <h2 id="states" className="text-lg font-semibold text-text mb-2">States</h2>
        <p className="text-sm text-text-secondary mb-4">
          Six interactive states: normal, hover (try hovering), focus (use Tab), active, danger, and disabled.
        </p>
        <CodeExample previewClassName="bg-surface" code={`<ListItem leadingIcon={fileSvg} onClick={…}>Normal</ListItem>
<ListItem leadingIcon={fileSvg} active onClick={…}>Active</ListItem>
<ListItem leadingIcon={fileSvg} danger onClick={…}>Danger</ListItem>
<ListItem leadingIcon={fileSvg} disabled>Disabled</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            <ListItem leadingIcon={fileSvg} onClick={() => setStateActiveIdx(0)}>Normal</ListItem>
            <ListItem leadingIcon={fileSvg} active onClick={() => setStateActiveIdx(1)}>Active</ListItem>
            <ListItem leadingIcon={fileSvg} danger onClick={() => setStateActiveIdx(2)}>Danger</ListItem>
            <ListItem leadingIcon={fileSvg} disabled>Disabled</ListItem>
          </div>
        </CodeExample>
      </section>

      {/* ━━━ Text Variants ━━━ */}
      <section>
        <h2 id="text-variants" className="text-lg font-semibold text-text mb-2">Text Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Single-line (32 px) and two-line (40 px) with a secondary description below the primary text.
        </p>
        <CodeExample previewClassName="bg-surface" code={`{/* Single-line */}
<ListItem leadingIcon={fileSvg}>Single-line item</ListItem>

{/* Two-line */}
<ListItem leadingIcon={fileSvg} secondaryText="Supporting description text">
  Two-line item
</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            <ListItem leadingIcon={fileSvg} onClick={() => {}}>Single-line item</ListItem>
            <ListItem leadingIcon={fileSvg} secondaryText="Supporting description text" onClick={() => {}}>
              Two-line item
            </ListItem>
            <ListItem
              leadingIcon={folderSvg}
              secondaryText="Modified 2 hours ago"
              onClick={() => {}}
            >
              Project files
            </ListItem>
          </div>
        </CodeExample>
      </section>

      {/* ━━━ Leading Elements ━━━ */}
      <section>
        <h2 id="leading" className="text-lg font-semibold text-text mb-2">Leading Elements</h2>
        <p className="text-sm text-text-secondary mb-4">
          Optional leading element after the drag handle: Avatar, Icon, Checkbox, Radio, or an empty placeholder block.
        </p>

        <h3 className="text-sm font-semibold text-text mb-2 mt-6">Icon</h3>
        <CodeExample previewClassName="bg-surface" code={`<ListItem leadingIcon={homeSvg}>Home</ListItem>
<ListItem leadingIcon={cogSvg}>Settings</ListItem>
<ListItem leadingIcon={userSvg}>Profile</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            <ListItem leadingIcon={homeSvg} onClick={() => {}}>Home</ListItem>
            <ListItem leadingIcon={cogSvg} onClick={() => {}}>Settings</ListItem>
            <ListItem leadingIcon={userSvg} onClick={() => {}}>Profile</ListItem>
          </div>
        </CodeExample>

        <h3 className="text-sm font-semibold text-text mb-2 mt-6">Avatar</h3>
        <CodeExample previewClassName="bg-surface" code={`<ListItem avatar={{ name: 'Kiran Shah' }} secondaryText="kiran@o9solutions.com">
  Kiran Shah
</ListItem>
<ListItem avatar={{ name: 'Alex Morgan' }} secondaryText="alex@o9solutions.com">
  Alex Morgan
</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            <ListItem avatar={{ name: 'Kiran Shah' }} secondaryText="kiran@o9solutions.com" onClick={() => {}}>
              Kiran Shah
            </ListItem>
            <ListItem avatar={{ name: 'Alex Morgan' }} secondaryText="alex@o9solutions.com" onClick={() => {}}>
              Alex Morgan
            </ListItem>
            <ListItem avatar={{ name: 'Sam Lee', variant: 'icon' }} secondaryText="sam@o9solutions.com" onClick={() => {}}>
              Sam Lee
            </ListItem>
          </div>
        </CodeExample>

        <h3 className="text-sm font-semibold text-text mb-2 mt-6">Empty Leading Block</h3>
        <p className="text-sm text-text-secondary mb-3">
          An icon-sized placeholder for alignment with sibling items that have icons.
        </p>
        <CodeExample previewClassName="bg-surface" code={`<ListItem leadingIcon={folderSvg}>Documents</ListItem>
<ListItem emptyLeading>readme.txt</ListItem>
<ListItem emptyLeading>notes.md</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            <ListItem leadingIcon={folderSvg} onClick={() => {}}>Documents</ListItem>
            <ListItem emptyLeading onClick={() => {}}>readme.txt</ListItem>
            <ListItem emptyLeading onClick={() => {}}>notes.md</ListItem>
          </div>
        </CodeExample>
      </section>

      {/* ━━━ Checkbox ━━━ */}
      <section>
        <h2 id="checkbox" className="text-lg font-semibold text-text mb-2">Checkbox</h2>
        <p className="text-sm text-text-secondary mb-4">
          Leading checkbox for multi-select lists. Click the checkbox to toggle.
        </p>
        <CodeExample previewClassName="bg-surface" code={`<ListItem checkbox checked={true} onCheckedChange={…}>Notifications</ListItem>
<ListItem checkbox checked={false} onCheckedChange={…}>Dark mode</ListItem>
<ListItem checkbox checked={false} onCheckedChange={…}>Auto-save</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            {['Notifications', 'Dark mode', 'Auto-save'].map((label, i) => (
              <ListItem
                key={label}
                checkbox
                checked={cbChecked[i]}
                onCheckedChange={() => toggleCb(i)}
                onClick={() => toggleCb(i)}
              >
                {label}
              </ListItem>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ━━━ Radio ━━━ */}
      <section>
        <h2 id="radio" className="text-lg font-semibold text-text mb-2">Radio</h2>
        <p className="text-sm text-text-secondary mb-4">
          Leading radio buttons for single-select lists.
        </p>
        <CodeExample previewClassName="bg-surface" code={`<ListItem radio radioName="theme" radioValue="light" checked={val === 'light'} onCheckedChange={…}>
  Light
</ListItem>
<ListItem radio radioName="theme" radioValue="dark" checked={val === 'dark'} onCheckedChange={…}>
  Dark
</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            {[
              { value: 'opt-a', label: 'Option A' },
              { value: 'opt-b', label: 'Option B' },
              { value: 'opt-c', label: 'Option C' },
            ].map((opt) => (
              <ListItem
                key={opt.value}
                radio
                radioName="demo-radio"
                radioValue={opt.value}
                checked={radioVal === opt.value}
                onCheckedChange={() => setRadioVal(opt.value)}
                onClick={() => setRadioVal(opt.value)}
              >
                {opt.label}
              </ListItem>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ━━━ Drag Handle ━━━ */}
      <section>
        <h2 id="drag-handle" className="text-lg font-semibold text-text mb-2">Drag Handle</h2>
        <p className="text-sm text-text-secondary mb-4">
          A leading drag handle icon for reorderable lists. Combine with any leading element.
        </p>
        <CodeExample previewClassName="bg-surface" code={`<ListItem dragHandle leadingIcon={fileSvg}>Draggable item</ListItem>
<ListItem dragHandle checkbox checked={true} onCheckedChange={…}>With checkbox</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            <ListItem dragHandle leadingIcon={fileSvg}>Report Q1.xlsx</ListItem>
            <ListItem dragHandle leadingIcon={fileSvg}>Budget 2026.xlsx</ListItem>
            <ListItem dragHandle checkbox checked={cbChecked[0]} onCheckedChange={() => toggleCb(0)}>
              With checkbox
            </ListItem>
          </div>
        </CodeExample>
      </section>

      {/* ━━━ Shortcut ━━━ */}
      <section>
        <h2 id="shortcut" className="text-lg font-semibold text-text mb-2">Shortcut</h2>
        <p className="text-sm text-text-secondary mb-4">
          A trailing keyboard shortcut badge.
        </p>
        <CodeExample previewClassName="bg-surface" code={`<ListItem leadingIcon={copySvg} shortcut="⌘C">Copy</ListItem>
<ListItem leadingIcon={pencilSvg} shortcut="⌘E">Edit</ListItem>
<ListItem leadingIcon={downloadSvg} shortcut="⌘D">Download</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            <ListItem leadingIcon={copySvg} shortcut="⌘C" onClick={() => {}}>Copy</ListItem>
            <ListItem leadingIcon={pencilSvg} shortcut="⌘E" onClick={() => {}}>Edit</ListItem>
            <ListItem leadingIcon={downloadSvg} shortcut="⌘D" onClick={() => {}}>Download</ListItem>
          </div>
        </CodeExample>
      </section>

      {/* ━━━ Switch ━━━ */}
      <section>
        <h2 id="switch" className="text-lg font-semibold text-text mb-2">Switch</h2>
        <p className="text-sm text-text-secondary mb-4">
          Trailing switch toggle for settings-style lists.
        </p>
        <CodeExample previewClassName="bg-surface" code={`<ListItem switchControl switchChecked={val} onSwitchChange={…}>
  Notifications
</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            {['Push notifications', 'Email alerts', 'Sound effects'].map((label, i) => (
              <ListItem
                key={label}
                switchControl
                switchChecked={swStates[i]}
                onSwitchChange={() => toggleSw(i)}
              >
                {label}
              </ListItem>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ━━━ Action Buttons ━━━ */}
      <section>
        <h2 id="actions" className="text-lg font-semibold text-text mb-2">Action Buttons</h2>
        <p className="text-sm text-text-secondary mb-4">
          Up to <strong className="text-text">maxActions</strong> trailing icon buttons. Additional actions are accessible via the overflow (⋮) menu.
        </p>
        <CodeExample previewClassName="bg-surface" code={`<ListItem
  leadingIcon={fileSvg}
  actions={[
    { icon: pencilSvg, 'aria-label': 'Edit', onClick: … },
    { icon: copySvg, 'aria-label': 'Copy', onClick: … },
    { icon: binSvg, 'aria-label': 'Delete', onClick: … },
  ]}
  showOverflow
  onOverflow={…}
>
  Document.pdf
</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            <ListItem
              leadingIcon={fileSvg}
              secondaryText="Modified today"
              actions={[
                { icon: pencilSvg, 'aria-label': 'Edit', onClick: () => {} },
                { icon: copySvg, 'aria-label': 'Copy', onClick: () => {} },
                { icon: binSvg, 'aria-label': 'Delete', onClick: () => {} },
              ]}
              showOverflow
              onOverflow={() => setOverflowLog('Overflow clicked')}
              onClick={() => {}}
            >
              Document.pdf
            </ListItem>
            <ListItem
              leadingIcon={fileSvg}
              secondaryText="Modified yesterday"
              actions={[
                { icon: pencilSvg, 'aria-label': 'Edit', onClick: () => {} },
                { icon: starSvg, 'aria-label': 'Favorite', onClick: () => {} },
              ]}
              onClick={() => {}}
            >
              Spreadsheet.xlsx
            </ListItem>
          </div>
          {overflowLog && (
            <p className="text-xs text-text-tertiary mt-2">{overflowLog}</p>
          )}
        </CodeExample>
      </section>

      {/* ━━━ Submenu & External Link ━━━ */}
      <section>
        <h2 id="submenu-link" className="text-lg font-semibold text-text mb-2">Submenu & External Link</h2>
        <p className="text-sm text-text-secondary mb-4">
          Trailing submenu arrow for drill-down navigation and external link icon for opening in a new tab.
        </p>
        <CodeExample previewClassName="bg-surface" code={`<ListItem leadingIcon={folderSvg} showSubmenu>More options</ListItem>
<ListItem leadingIcon={globeSvg} showExternalLink externalLinkHref="#">Documentation</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            <ListItem leadingIcon={folderSvg} showSubmenu onClick={() => {}}>More options</ListItem>
            <ListItem leadingIcon={cogSvg} showSubmenu onClick={() => {}}>Advanced settings</ListItem>
            <ListItem leadingIcon={globeSvg} showExternalLink externalLinkHref="#">Documentation</ListItem>
            <ListItem leadingIcon={lockSvg} showExternalLink externalLinkHref="#">Privacy policy</ListItem>
          </div>
        </CodeExample>
      </section>

      {/* ━━━ Combined Example ━━━ */}
      <section>
        <h2 id="combined" className="text-lg font-semibold text-text mb-2">Combined Example</h2>
        <p className="text-sm text-text-secondary mb-4">
          A realistic list combining multiple leading and trailing elements.
        </p>
        <CodeExample previewClassName="bg-surface" code={`{/* Contact list with avatars, actions, and submenu */}
<ListItem avatar={{ name: 'Kiran Shah' }} secondaryText="Product Manager" showSubmenu>
  Kiran Shah
</ListItem>
<ListItem avatar={{ name: 'Alex Morgan' }} secondaryText="Designer" active showSubmenu>
  Alex Morgan
</ListItem>
<ListItem avatar={{ name: 'Sam Lee' }} secondaryText="Developer" showExternalLink>
  Sam Lee
</ListItem>`}>
          <div className="w-full max-w-md border border-border divide-y divide-border">
            <ListItem
              avatar={{ name: 'Kiran Shah' }}
              secondaryText="Product Manager"
              actions={[{ icon: pencilSvg, 'aria-label': 'Edit', onClick: () => {} }]}
              showSubmenu
              onClick={() => {}}
            >
              Kiran Shah
            </ListItem>
            <ListItem
              avatar={{ name: 'Alex Morgan' }}
              secondaryText="Designer"
              active
              actions={[{ icon: pencilSvg, 'aria-label': 'Edit', onClick: () => {} }]}
              showSubmenu
              onClick={() => {}}
            >
              Alex Morgan
            </ListItem>
            <ListItem
              avatar={{ name: 'Sam Lee' }}
              secondaryText="Developer"
              showExternalLink
              onClick={() => {}}
            >
              Sam Lee
            </ListItem>
            <ListItem
              avatar={{ name: 'Deleted User', variant: 'icon', anonymous: true }}
              secondaryText="Removed from team"
              danger
              onClick={() => {}}
            >
              Removed member
            </ListItem>
          </div>
        </CodeExample>
      </section>

      {/* ━━━ Usage Guidelines ━━━ */}
      <section>
        <h2 id="guidelines" className="text-lg font-semibold text-text mb-2">Usage Guidelines</h2>

        <h3 className="text-sm font-semibold text-text mb-1 mt-4">Leading Elements</h3>
        <DoDont
          doItems={[
            'Use consistent leading elements within a list — all icons, all avatars, or all checkboxes',
            'Use the emptyLeading placeholder to maintain alignment when some items lack a leading icon',
            'Use the drag handle only when the list supports reordering via drag-and-drop',
          ]}
          dontItems={[
            'Do not mix different leading types (icon + avatar + checkbox) in the same list — it breaks visual rhythm',
            'Do not use avatars in compact action menus — use icons instead for scannability',
            'Avoid showing a drag handle without implementing actual drag-and-drop behavior',
          ]}
        />

        <h3 className="text-sm font-semibold text-text mb-1 mt-6">States & Variants</h3>
        <DoDont
          doItems={[
            'Reserve the danger state exclusively for destructive actions like "Delete", "Remove", or "Revoke access"',
            'Use the active state to indicate the currently selected item — only one item should be active at a time',
            'Use the two-line variant for supplementary info like descriptions, emails, or timestamps',
          ]}
          dontItems={[
            'Do not apply the danger state to non-destructive actions — it desensitizes users to real warnings',
            'Do not mark multiple items as active simultaneously — it confuses selection state',
            'Do not use the two-line variant when secondary text provides no additional value — keep it single-line',
          ]}
        />

        <h3 className="text-sm font-semibold text-text mb-1 mt-6">Trailing Actions</h3>
        <DoDont
          doItems={[
            'Limit visible action buttons to 3 or fewer — use the overflow (⋮) menu for additional actions',
            'Provide an aria-label for every icon-only action button so screen readers can announce its purpose',
            'Place the most frequently used action first (leftmost) for easy reach',
          ]}
          dontItems={[
            'Do not display more than 3 action buttons inline — it pushes primary content out of view',
            'Do not use icon-only buttons without an aria-label — screen readers announce them as empty "button"',
            'Do not combine a switch and action buttons on the same item — the switch should be the sole trailing control',
          ]}
        />

        <h3 className="text-sm font-semibold text-text mb-1 mt-6">Layout & Composition</h3>
        <DoDont
          doItems={[
            'Wrap ListItems in a container with a border to visually define list boundaries',
            'Use dividers (divide-y) between items for clear visual separation',
            'Keep shortcut badges concise — use standard modifier symbols (⌘, ⇧, ⌃, ⌥)',
          ]}
          dontItems={[
            'Do not add borders or background color directly to ListItem — it is transparent by design and inherits from its parent',
            'Do not use ListItem as a standalone element without a list container',
            'Avoid long shortcut labels that compete with the primary text for space',
          ]}
        />
      </section>

      {/* ━━━ Accessibility ━━━ */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-2">Accessibility</h2>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-text-secondary">
          <li><code className="text-xs bg-surface-overlay px-1 py-0.5">role="button"</code> applied when <code className="text-xs bg-surface-overlay px-1 py-0.5">onClick</code> is provided — announces as interactive to screen readers</li>
          <li><code className="text-xs bg-surface-overlay px-1 py-0.5">tabIndex="0"</code> enables keyboard focus; <code className="text-xs bg-surface-overlay px-1 py-0.5">tabIndex="-1"</code> when disabled</li>
          <li><strong className="text-text">Enter</strong> and <strong className="text-text">Space</strong> keys activate the item via <code className="text-xs bg-surface-overlay px-1 py-0.5">onKeyDown</code> handler (required for non-native button elements)</li>
          <li><code className="text-xs bg-surface-overlay px-1 py-0.5">aria-disabled="true"</code> set when disabled — communicates non-interactive state without removing from tab order</li>
          <li><code className="text-xs bg-surface-overlay px-1 py-0.5">aria-current="true"</code> for active items — indicates the currently selected item in a list</li>
          <li><code className="text-xs bg-surface-overlay px-1 py-0.5">aria-selected</code> reflects checkbox/radio checked state for selection lists</li>
          <li><code className="text-xs bg-surface-overlay px-1 py-0.5">aria-haspopup="menu"</code> on submenu button — announces a submenu will open</li>
          <li>Focus indicator uses a single <code className="text-xs bg-surface-overlay px-1 py-0.5">outline</code> (not ring) to avoid double-border appearance</li>
          <li>Checkbox, Radio, and Switch use <strong className="text-text">native inputs</strong> — full keyboard, screen reader, and form support</li>
          <li>All icon-only action buttons require <code className="text-xs bg-surface-overlay px-1 py-0.5">aria-label</code> — provides accessible name for screen readers</li>
          <li>Tooltips on icon buttons provide visible labels on hover/focus for sighted keyboard users</li>
          <li>External links include <code className="text-xs bg-surface-overlay px-1 py-0.5">target="_blank"</code> with <code className="text-xs bg-surface-overlay px-1 py-0.5">rel="noopener noreferrer"</code> for security</li>
          <li>Click events on nested controls (checkbox, switch, actions) use <code className="text-xs bg-surface-overlay px-1 py-0.5">stopPropagation</code> to prevent double-firing with the row click</li>
        </ul>
      </section>

      {/* ━━━ Keyboard Navigation ━━━ */}
      <section>
        <h2 id="keyboard" className="text-lg font-semibold text-text mb-2">Keyboard Navigation</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-border text-text-tertiary">
                <th className="py-2 pr-4 font-medium">Key</th>
                <th className="py-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-border">
                <td className="py-2 pr-4"><kbd className="px-1.5 py-0.5 text-xs bg-surface-overlay border border-border font-mono">Tab</kbd></td>
                <td className="py-2">Move focus between list items and interactive elements</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4"><kbd className="px-1.5 py-0.5 text-xs bg-surface-overlay border border-border font-mono">Enter</kbd> / <kbd className="px-1.5 py-0.5 text-xs bg-surface-overlay border border-border font-mono">Space</kbd></td>
                <td className="py-2">Activate the focused item (click) or toggle checkbox/radio/switch</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4"><kbd className="px-1.5 py-0.5 text-xs bg-surface-overlay border border-border font-mono">Esc</kbd></td>
                <td className="py-2">Close any open submenu or overflow menu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ━━━ API Reference ━━━ */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-2">API Reference</h2>
        <PropsTable props={listItemProps} />
      </section>
    </article>
  );
}
