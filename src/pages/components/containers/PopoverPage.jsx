import { useState } from 'react';
import Popover from '@/components/containers/Popover';
import Button from '@/components/buttons/Button';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const popoverProps = [
  { name: 'trigger', type: 'ReactElement', default: '—', description: 'The element that opens the popover when clicked' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Popover placement relative to the trigger' },
  { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled open state' },
  { name: 'onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Callback when open state changes' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Popover content' },
];

export default function PopoverPage() {
  const [placement, setPlacement] = useState('bottom');

  return (
    <article>
      <PageHeader title="Popover" description="A floating panel that opens on click, displaying rich content like forms, details, or actions. Dismisses on outside click or Escape key." status="stable" category="Containers" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'Placement', value: placement, onChange: setPlacement, options: ['top', 'bottom', 'left', 'right'] },
        ]}>
          <div className="py-12">
            <Popover trigger={<Button variant="outline">Open Popover</Button>} placement={placement}>
              <div className="space-y-2">
                <p className="text-xs font-bold text-text">Popover Title</p>
                <p className="text-xs text-text-secondary">This is the popover content. It can contain any rich content.</p>
              </div>
            </Popover>
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="placements" className="text-xl font-black tracking-tight text-text mb-2">Placements</h2>
        <CodeExample code={`<Popover placement="bottom" trigger={<Button>Bottom</Button>}>...</Popover>\n<Popover placement="top" trigger={<Button>Top</Button>}>...</Popover>`}>
          <div className="flex flex-wrap items-center gap-4 py-12">
            <Popover placement="bottom" trigger={<Button variant="outline" size="sm">Bottom</Button>}>
              <p className="text-xs text-text-secondary">Bottom popover</p>
            </Popover>
            <Popover placement="top" trigger={<Button variant="outline" size="sm">Top</Button>}>
              <p className="text-xs text-text-secondary">Top popover</p>
            </Popover>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for contextual content that relates to a specific trigger', 'Close on outside click and Escape key', 'Keep content focused and concise', 'Use for forms, settings, or detailed previews']}
          dontItems={['Do not use for simple tooltips — use Tooltip instead', 'Avoid putting entire page sections in popovers', 'Do not use for navigation — use dropdown menus', 'Avoid nesting popovers inside other popovers']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={popoverProps} />
      </section>
    </article>
  );
}
