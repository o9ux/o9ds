import { useState } from 'react';
import Tooltip from '@/components/containers/Tooltip';
import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import O9Icon from '@/components/O9Icon';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

import saveSvg from '@/assets/icons/o9con-save-as.svg?raw';
import copySvg from '@/assets/icons/o9con-copy.svg?raw';
import binSvg from '@/assets/icons/o9con-bin.svg?raw';
import shareSvg from '@/assets/icons/o9con-share.svg?raw';
import downloadSvg from '@/assets/icons/o9con-download.svg?raw';
import infoCircleSvg from '@/assets/icons/o9con-info-circle.svg?raw';

const tooltipProps = [
  { name: 'label', type: 'string', default: '—', description: 'Tooltip text label (plain variant)' },
  { name: 'content', type: 'ReactNode', default: '—', description: 'Legacy: raw tooltip content — use label for plain tooltips' },
  { name: 'shortcut', type: 'string', default: 'undefined', description: 'Keyboard shortcut badge, e.g. "⌘ S"' },
  { name: 'variant', type: "'plain' | 'rich'", default: "'plain'", description: 'Plain (single-line) or Rich (multi-row with header, description, action)' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Header title — rich variant only' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Body description text — rich variant only' },
  { name: 'learnMoreText', type: 'string', default: "'Learn more'", description: 'Action button label — rich variant only' },
  { name: 'learnMoreHref', type: 'string', default: 'undefined', description: 'Action button URL — rich variant only' },
  { name: 'onLearnMore', type: '() => void', default: 'undefined', description: 'Action button click handler — rich variant only' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Where the tooltip appears relative to the trigger' },
  { name: 'delay', type: 'number', default: '400', description: 'Milliseconds to wait before showing the tooltip on hover' },
  { name: 'className', type: 'string', default: "''", description: 'Applied to the trigger wrapper element' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'The element that triggers the tooltip on hover/focus' },
];

export default function TooltipPage() {
  const [variant, setVariant] = useState('plain');
  const [placement, setPlacement] = useState('top');
  const [hasShortcut, setHasShortcut] = useState(true);

  return (
    <article className="space-y-12">
      <PageHeader
        title="Tooltip"
        description="Tooltips surface brief, supplementary information when users hover over or focus on an element. They support a plain label with optional shortcut badge, or a rich layout with header, description, and an action button. The color scheme is inverted — dark background in light mode, white background in dark mode."
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
              label: 'Variant',
              value: variant,
              onChange: setVariant,
              options: ['plain', 'rich'],
            },
            {
              type: 'select',
              label: 'Placement',
              value: placement,
              onChange: setPlacement,
              options: ['top', 'bottom', 'left', 'right'],
            },
            { type: 'checkbox', label: 'Shortcut', checked: hasShortcut, onChange: setHasShortcut },
          ]}
        >
          <div className="flex items-center justify-center py-16">
            {variant === 'plain' ? (
              <Tooltip
                label="Save your changes"
                shortcut={hasShortcut ? '⌘ S' : undefined}
                placement={placement}
              >
                <Button>Save</Button>
              </Tooltip>
            ) : (
              <Tooltip
                variant="rich"
                title="Keyboard Shortcuts"
                description="You can now search by Room Types. Click below so we can show you this new feature!"
                shortcut={hasShortcut ? '⌘ S' : undefined}
                learnMoreHref="#"
                placement={placement}
              >
                <Button>Hover me</Button>
              </Tooltip>
            )}
          </div>
        </ComponentDemo>
      </section>

      {/* ── Plain Tooltip ── */}
      <section>
        <h2 id="plain" className="text-lg font-semibold text-text mb-2">Plain Tooltip</h2>
        <p className="text-sm text-text-secondary mb-4">
          A single-line tooltip with a text label and optional shortcut badge. Use for icon buttons, truncated labels, and brief contextual hints.
        </p>
        <CodeExample code={`<Tooltip label="Save" shortcut="⌘ S">
  <Button>Save</Button>
</Tooltip>

<Tooltip label="Copy to clipboard" shortcut="⌘ C">
  <IconButton icon={<O9Icon svg={copySvg} />} aria-label="Copy" />
</Tooltip>

<Tooltip label="Delete item">
  <IconButton icon={<O9Icon svg={binSvg} />} aria-label="Delete" variant="danger" />
</Tooltip>`}>
          <div className="flex items-center gap-6 p-8">
            <Tooltip label="Save" shortcut="⌘ S">
              <Button>Save</Button>
            </Tooltip>
            <Tooltip label="Copy to clipboard" shortcut="⌘ C">
              <IconButton icon={<O9Icon svg={copySvg} />} aria-label="Copy" />
            </Tooltip>
            <Tooltip label="Delete item">
              <IconButton icon={<O9Icon svg={binSvg} />} aria-label="Delete" variant="danger" />
            </Tooltip>
          </div>
        </CodeExample>
      </section>

      {/* ── Shortcut Badge ── */}
      <section>
        <h2 id="shortcut" className="text-lg font-semibold text-text mb-2">Shortcut Badge</h2>
        <p className="text-sm text-text-secondary mb-4">
          Add a keyboard shortcut badge to help users discover keyboard shortcuts for the associated action.
        </p>
        <CodeExample code={`<Tooltip label="Save" shortcut="⌘ S">…</Tooltip>
<Tooltip label="Copy" shortcut="⌘ C">…</Tooltip>
<Tooltip label="Share" shortcut="⌘ ⇧ S">…</Tooltip>
<Tooltip label="Download" shortcut="⌘ D">…</Tooltip>`}>
          <div className="flex items-center gap-6 p-8">
            <Tooltip label="Save" shortcut="⌘ S" placement="bottom">
              <IconButton icon={<O9Icon svg={saveSvg} />} aria-label="Save" />
            </Tooltip>
            <Tooltip label="Copy" shortcut="⌘ C" placement="bottom">
              <IconButton icon={<O9Icon svg={copySvg} />} aria-label="Copy" />
            </Tooltip>
            <Tooltip label="Share" shortcut="⌘ ⇧ S" placement="bottom">
              <IconButton icon={<O9Icon svg={shareSvg} />} aria-label="Share" />
            </Tooltip>
            <Tooltip label="Download" shortcut="⌘ D" placement="bottom">
              <IconButton icon={<O9Icon svg={downloadSvg} />} aria-label="Download" />
            </Tooltip>
          </div>
        </CodeExample>
      </section>

      {/* ── Rich Tooltip ── */}
      <section>
        <h2 id="rich" className="text-lg font-semibold text-text mb-2">Rich Tooltip</h2>
        <p className="text-sm text-text-secondary mb-4">
          A multi-row tooltip with a header title, description body, keyboard shortcut, and an interactive "Learn more" action button. Use for onboarding tips, feature discovery, and detailed contextual help.
        </p>
        <CodeExample code={`<Tooltip
  variant="rich"
  title="Keyboard Shortcuts"
  description="You can now search by Room Types. Click below so we can show you this new feature!"
  shortcut="⌘ S"
  learnMoreHref="/docs/shortcuts"
>
  <Button>Hover for details</Button>
</Tooltip>`}>
          <div className="flex items-center justify-center p-12">
            <Tooltip
              variant="rich"
              title="Keyboard Shortcuts"
              description="You can now search by Room Types. Click below so we can show you this new feature!"
              shortcut="⌘ S"
              learnMoreHref="#"
              placement="bottom"
            >
              <Button>Hover for details</Button>
            </Tooltip>
          </div>
        </CodeExample>
      </section>

      {/* ── Rich Tooltip — Variations ── */}
      <section>
        <h2 id="rich-variations" className="text-lg font-semibold text-text mb-2">Rich Tooltip Variations</h2>
        <p className="text-sm text-text-secondary mb-4">
          Rich tooltips can omit the shortcut, the action button, or both, depending on the context.
        </p>
        <CodeExample code={`{/* Title + description only */}
<Tooltip variant="rich" title="Filter Panel" description="Use filters to narrow results by date, region, or category.">
  <Button variant="outline">No shortcut, no action</Button>
</Tooltip>

{/* With shortcut, no action */}
<Tooltip variant="rich" title="Quick Search" description="Search across all data sources." shortcut="⌘ K">
  <Button variant="outline">Shortcut only</Button>
</Tooltip>

{/* With action, no shortcut */}
<Tooltip variant="rich" title="New Feature" description="We added a column reorder feature." onLearnMore={() => {}}>
  <Button variant="outline">Action only</Button>
</Tooltip>`}>
          <div className="flex flex-wrap items-center gap-6 p-8">
            <Tooltip
              variant="rich"
              title="Filter Panel"
              description="Use filters to narrow results by date, region, or category."
              placement="bottom"
            >
              <Button variant="outline" size="sm">No shortcut, no action</Button>
            </Tooltip>
            <Tooltip
              variant="rich"
              title="Quick Search"
              description="Search across all data sources."
              shortcut="⌘ K"
              placement="bottom"
            >
              <Button variant="outline" size="sm">Shortcut only</Button>
            </Tooltip>
            <Tooltip
              variant="rich"
              title="New Feature"
              description="We added a column reorder feature."
              onLearnMore={() => {}}
              placement="bottom"
            >
              <Button variant="outline" size="sm">Action only</Button>
            </Tooltip>
          </div>
        </CodeExample>
      </section>

      {/* ── Placement ── */}
      <section>
        <h2 id="placement" className="text-lg font-semibold text-text mb-2">Placement</h2>
        <p className="text-sm text-text-secondary mb-4">
          Four directional placements relative to the trigger element.
        </p>
        <CodeExample code={`<Tooltip placement="top" label="Top" shortcut="↑">…</Tooltip>
<Tooltip placement="bottom" label="Bottom" shortcut="↓">…</Tooltip>
<Tooltip placement="left" label="Left" shortcut="←">…</Tooltip>
<Tooltip placement="right" label="Right" shortcut="→">…</Tooltip>`}>
          <div className="flex flex-wrap items-center justify-center gap-6 p-12">
            {['top', 'bottom', 'left', 'right'].map((p) => (
              <Tooltip key={p} placement={p} label={`${p.charAt(0).toUpperCase() + p.slice(1)}`} shortcut={p === 'top' ? '↑' : p === 'bottom' ? '↓' : p === 'left' ? '←' : '→'}>
                <Button variant="outline" size="sm">{p}</Button>
              </Tooltip>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ── Icon Tooltips ── */}
      <section>
        <h2 id="icon-tooltips" className="text-lg font-semibold text-text mb-2">Icon Tooltips</h2>
        <p className="text-sm text-text-secondary mb-4">
          Essential for icon-only buttons where the action label cannot be displayed visually. Provides an accessible name on hover/focus.
        </p>
        <CodeExample code={`<Tooltip label="Copy to clipboard">
  <IconButton icon={<O9Icon svg={copySvg} />} aria-label="Copy" />
</Tooltip>`}>
          <div className="flex items-center gap-4 p-8">
            <Tooltip label="Copy to clipboard" shortcut="⌘ C">
              <IconButton icon={<O9Icon svg={copySvg} />} aria-label="Copy" />
            </Tooltip>
            <Tooltip label="Share link" shortcut="⌘ ⇧ S">
              <IconButton icon={<O9Icon svg={shareSvg} />} aria-label="Share" />
            </Tooltip>
            <Tooltip label="Download file" shortcut="⌘ D">
              <IconButton icon={<O9Icon svg={downloadSvg} />} aria-label="Download" />
            </Tooltip>
            <Tooltip label="Delete item">
              <IconButton icon={<O9Icon svg={binSvg} />} aria-label="Delete" />
            </Tooltip>
            <Tooltip label="More info">
              <IconButton icon={<O9Icon svg={infoCircleSvg} />} aria-label="Info" />
            </Tooltip>
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-lg font-semibold text-text mb-4">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use plain tooltips to add labels to icon-only controls',
            'Use rich tooltips for onboarding, feature discovery, and contextual help',
            'Keep plain tooltip text very short — one sentence or phrase (under 60 characters)',
            'Include shortcut badges to help users discover keyboard shortcuts',
            'Allow tooltips to be triggered by keyboard focus, not only mouse hover',
          ]}
          dontItems={[
            'Do not put forms or complex interactive elements inside tooltips — use Popover instead',
            'Do not use tooltips as the only way to convey important information — not all users hover',
            'Avoid stacking multiple tooltips in close proximity',
            'Do not trigger tooltips on click — they are for hover/focus only',
            'Do not use rich tooltips for simple labels — use plain tooltips',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="tooltip"</code> for screen reader announcements.</>,
            'Tooltips appear on both mouse hover and keyboard focus.',
            <>Uses inverted contrast — dark bg in light mode, white bg in dark mode — for maximum readability against any surface.</>,
            'Plain tooltips are non-interactive (pointer-events: none) to avoid blocking content beneath.',
            <>Rich tooltips allow interaction with the "Learn more" action button via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">pointer-events: auto</code>.</>,
            'Shortcut badges use high-contrast backgrounds within the tooltip for readability.',
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
                <td className="py-2 pr-6"><kbd className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Tab</kbd></td>
                <td className="py-2">Focus the trigger element — tooltip appears</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Tab</kbd> (away)</td>
                <td className="py-2">Blur the trigger — tooltip disappears</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Escape</kbd></td>
                <td className="py-2">Dismiss tooltip (planned)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-4">API Reference</h2>
        <PropsTable props={tooltipProps} />
      </section>
    </article>
  );
}
