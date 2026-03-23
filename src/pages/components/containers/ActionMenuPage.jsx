import { ActionMenu, ActionMenuItem, ActionMenuDivider } from '@/components/containers/ActionMenu';
import IconButton from '@/components/buttons/IconButton';
import Button from '@/components/buttons/Button';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const actionMenuProps = [
  { name: 'trigger', type: 'ReactElement', default: '—', description: 'The element that opens the menu when clicked' },
  { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'", default: "'bottom-start'", description: 'Menu placement' },
  { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled open state' },
  { name: 'onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Callback when state changes' },
  { name: 'children', type: 'ReactNode (ActionMenuItem)', default: '—', description: 'Menu items' },
];

const actionMenuItemProps = [
  { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Leading icon' },
  { name: 'shortcut', type: 'string', default: 'undefined', description: 'Keyboard shortcut hint' },
  { name: 'danger', type: 'boolean', default: 'false', description: 'Destructive action styling' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the item is disabled' },
  { name: 'onClick', type: '() => void', default: 'undefined', description: 'Click handler' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Item label' },
];

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="3" cy="8" r="1.5" /><circle cx="8" cy="8" r="1.5" /><circle cx="13" cy="8" r="1.5" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 2l3 3-8 8H3v-3l8-8z" />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="5" y="5" width="8" height="8" rx="1" />
    <path d="M3 11V3a1 1 0 011-1h8" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" />
    <path d="M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" />
  </svg>
);

export default function ActionMenuPage() {
  return (
    <article>
      <PageHeader title="Action Menu" description="A contextual dropdown menu of actions. Triggered by a button click, it presents a list of commands with optional icons, keyboard shortcuts, and destructive action styling." status="stable" category="Containers" />

      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <CodeExample code={`<ActionMenu trigger={<IconButton icon={<MoreIcon />} variant="secondary" />}>\n  <ActionMenuItem icon={<EditIcon />}>Edit</ActionMenuItem>\n  <ActionMenuItem icon={<CopyIcon />}>Duplicate</ActionMenuItem>\n  <ActionMenuDivider />\n  <ActionMenuItem icon={<TrashIcon />} danger>Delete</ActionMenuItem>\n</ActionMenu>`}>
          <ActionMenu trigger={<IconButton icon={<MoreIcon />} variant="secondary" aria-label="Actions" />}>
            <ActionMenuItem icon={<EditIcon />} shortcut="Ctrl+E">Edit</ActionMenuItem>
            <ActionMenuItem icon={<CopyIcon />} shortcut="Ctrl+D">Duplicate</ActionMenuItem>
            <ActionMenuDivider />
            <ActionMenuItem icon={<TrashIcon />} danger>Delete</ActionMenuItem>
          </ActionMenu>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="with-button" className="text-xl font-black tracking-tight text-text mb-2">With Button Trigger</h2>
        <CodeExample code={`<ActionMenu trigger={<Button variant="outline">Actions</Button>}>...</ActionMenu>`}>
          <ActionMenu trigger={<Button variant="outline" size="sm">Actions</Button>}>
            <ActionMenuItem>View Details</ActionMenuItem>
            <ActionMenuItem>Export</ActionMenuItem>
            <ActionMenuItem>Archive</ActionMenuItem>
            <ActionMenuDivider />
            <ActionMenuItem danger>Remove</ActionMenuItem>
          </ActionMenu>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="disabled" className="text-xl font-black tracking-tight text-text mb-2">Disabled Items</h2>
        <CodeExample code={`<ActionMenuItem disabled>Locked Action</ActionMenuItem>`}>
          <ActionMenu trigger={<Button variant="outline" size="sm">Menu</Button>}>
            <ActionMenuItem>Available</ActionMenuItem>
            <ActionMenuItem disabled>Locked</ActionMenuItem>
            <ActionMenuItem>Also Available</ActionMenuItem>
          </ActionMenu>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Place destructive actions at the bottom with a divider', 'Use icons consistently — either all items have icons or none', 'Show keyboard shortcuts for frequent actions', 'Close the menu after an item is selected']}
          dontItems={['Do not put more than 8-10 items in a single menu', 'Avoid nested submenus — keep the menu flat', 'Do not use for navigation — use a nav menu', 'Avoid placing unrelated actions together']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <h3 className="text-sm font-bold text-text mt-6 mb-3">ActionMenu</h3>
        <PropsTable props={actionMenuProps} />
        <h3 className="text-sm font-bold text-text mt-8 mb-3">ActionMenuItem</h3>
        <PropsTable props={actionMenuItemProps} />
      </section>
    </article>
  );
}
