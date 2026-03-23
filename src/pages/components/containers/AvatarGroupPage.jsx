import { useState } from 'react';
import AvatarGroup from '@/components/containers/AvatarGroup';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

/* ── Demo data ── */
const USERS = [
  { name: 'Aria Singh',    src: 'https://i.pravatar.cc/150?img=47', primaryLabel: 'Aria Singh',    secondaryLabel: 'Product Manager' },
  { name: 'Ben Costa',     src: 'https://i.pravatar.cc/150?img=12', primaryLabel: 'Ben Costa',     secondaryLabel: 'Engineering Lead' },
  { name: 'Carmen Lee',    primaryLabel: 'Carmen Lee',    secondaryLabel: 'UX Designer' },
  { name: 'David Park',    primaryLabel: 'David Park',    secondaryLabel: 'Data Analyst' },
  { name: 'Elena Volkov',  src: 'https://i.pravatar.cc/150?img=5',  primaryLabel: 'Elena Volkov',  secondaryLabel: 'DevOps Engineer' },
  { name: 'Frank Miller',  primaryLabel: 'Frank Miller',  secondaryLabel: 'QA Engineer' },
  { name: 'Grace Chen',    src: 'https://i.pravatar.cc/150?img=9',  primaryLabel: 'Grace Chen',    secondaryLabel: 'Frontend Developer' },
  { name: 'Hiro Tanaka',   primaryLabel: 'Hiro Tanaka',   secondaryLabel: 'Backend Developer' },
  { name: 'Isabel Gomez',  primaryLabel: 'Isabel Gomez',  secondaryLabel: 'Product Designer' },
  { name: 'Jake Wilson',   src: 'https://i.pravatar.cc/150?img=68', primaryLabel: 'Jake Wilson',   secondaryLabel: 'Scrum Master' },
];

/* ── Props reference ── */
const groupProps = [
  { name: 'items', type: 'Array<AvatarItem>', default: '[]', description: 'Array of avatar data objects. Each item: { name, src, variant, anonymous, primaryLabel, secondaryLabel }' },
  { name: 'size', type: "'xs' | 'sm' | 'normal' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'", default: "'md'", description: 'Size of all avatars in the group' },
  { name: 'min', type: 'number', default: '1', description: 'Minimum number of visible avatars' },
  { name: 'max', type: 'number', default: '4', description: 'Maximum visible avatars before showing +N counter' },
  { name: 'onItemClick', type: 'function', default: 'undefined', description: 'Callback (item, index) when a dropdown row is clicked' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes on the root element' },
];

const itemShape = [
  { name: 'name', type: 'string', default: '—', description: 'Full name — used for initials and tooltip' },
  { name: 'src', type: 'string', default: 'undefined', description: 'Image URL — renders image variant when provided' },
  { name: 'variant', type: "'character' | 'icon' | 'image' | 'genai' | 'o9logo'", default: "'character'", description: 'Avatar variant type' },
  { name: 'anonymous', type: 'boolean', default: 'false', description: 'Show user-secret icon (icon variant only)' },
  { name: 'primaryLabel', type: 'string', default: 'name', description: 'Primary text in the overflow dropdown row' },
  { name: 'secondaryLabel', type: 'string', default: 'undefined', description: 'Secondary text (role, email, etc.) in the dropdown row' },
];

const SIZES = ['xs', 'sm', 'normal', 'md', 'lg', 'xl'];

export default function AvatarGroupPage() {
  const [clickLog, setClickLog] = useState('');

  return (
    <article className="space-y-12">
      <PageHeader
        title="Avatar Group"
        description="Displays a stack of overlapping avatars with a +N counter that opens a dropdown list of overflow users on click or focus."
        status="stable"
        category="Containers"
      />

      {/* ── Basic Usage ── */}
      <section>
        <h2 id="basic" className="text-lg font-semibold text-text mb-2">Basic Usage</h2>
        <p className="text-sm text-text-secondary mb-4">
          Pass an array of <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">items</code> and
          set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">max</code> to control how many are visible.
          The remaining are shown in a <strong className="text-text">+N counter</strong> that opens a dropdown.
        </p>
        <CodeExample code={`<AvatarGroup
  items={users}
  max={4}
  onItemClick={(item) => console.log(item.name)}
/>`}>
          <AvatarGroup
            items={USERS}
            max={4}
            onItemClick={(item) => setClickLog(item.name)}
          />
          {clickLog && (
            <p className="mt-3 text-xs text-text-secondary">
              Clicked: <span className="text-text">{clickLog}</span>
            </p>
          )}
        </CodeExample>
      </section>

      {/* ── Sizes ── */}
      <section>
        <h2 id="sizes" className="text-lg font-semibold text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Avatar groups support all avatar sizes. The overlap spacing and +N counter scale automatically.
        </p>
        <CodeExample code={`<AvatarGroup items={users} size="xs" max={3} />
<AvatarGroup items={users} size="md" max={3} />
<AvatarGroup items={users} size="lg" max={3} />
<AvatarGroup items={users} size="xl" max={3} />`}>
          <div className="flex flex-wrap items-end gap-6">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col items-start gap-2">
                <AvatarGroup items={USERS} size={s} max={3} />
                <span className="text-[10px] text-text-tertiary">{s}</span>
              </div>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ── Min & Max ── */}
      <section>
        <h2 id="min-max" className="text-lg font-semibold text-text mb-2">Min & Max</h2>
        <p className="text-sm text-text-secondary mb-4">
          <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">max</code> controls the visible limit.
          <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border ml-1">min</code> ensures at least N avatars are always shown (max is clamped to min).
        </p>
        <CodeExample code={`<AvatarGroup items={users} max={2} />
<AvatarGroup items={users} max={6} />
<AvatarGroup items={users} min={3} max={3} />`}>
          <div className="flex flex-wrap items-end gap-8">
            <div className="flex flex-col items-start gap-2">
              <AvatarGroup items={USERS} max={2} />
              <span className="text-[10px] text-text-tertiary">max=2</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <AvatarGroup items={USERS} max={6} />
              <span className="text-[10px] text-text-tertiary">max=6</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <AvatarGroup items={USERS} min={3} max={3} />
              <span className="text-[10px] text-text-tertiary">min=3, max=3</span>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Overflow Dropdown ── */}
      <section>
        <h2 id="dropdown" className="text-lg font-semibold text-text mb-2">Overflow Dropdown</h2>
        <p className="text-sm text-text-secondary mb-4">
          Clicking or focusing the <strong className="text-text">+N counter</strong> opens a dropdown with each overflow user shown as a row
          containing an Avatar, primary label (name), and optional secondary label (role).
        </p>
        <CodeExample code={`<AvatarGroup
  items={[
    { name: 'Aria Singh', src: '...', primaryLabel: 'Aria Singh', secondaryLabel: 'Product Manager' },
    { name: 'Ben Costa', primaryLabel: 'Ben Costa', secondaryLabel: 'Engineering Lead' },
  ]}
  max={2}
  onItemClick={(item) => console.log(item)}
/>`}>
          <AvatarGroup
            items={USERS}
            size="lg"
            max={2}
            onItemClick={(item) => setClickLog(item.name)}
          />
          <p className="mt-2 text-[10px] text-text-tertiary">Click +N to see the dropdown</p>
        </CodeExample>
      </section>

      {/* ── Mixed Variants ── */}
      <section>
        <h2 id="mixed" className="text-lg font-semibold text-text mb-2">Mixed Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Items can mix different avatar variants — character, image, icon, genai, o9logo.
        </p>
        <CodeExample code={`<AvatarGroup
  items={[
    { name: 'Aria Singh', src: '...', variant: 'image' },
    { name: 'Ben Costa' },
    { variant: 'icon', name: 'Service Account' },
    { variant: 'genai', name: 'AI Agent' },
    { variant: 'o9logo', name: 'o9 Bot' },
  ]}
  max={3}
/>`}>
          <AvatarGroup
            items={[
              { name: 'Aria Singh', src: 'https://i.pravatar.cc/150?img=47', variant: 'image', primaryLabel: 'Aria Singh', secondaryLabel: 'Product Manager' },
              { name: 'Ben Costa', primaryLabel: 'Ben Costa', secondaryLabel: 'Engineer' },
              { variant: 'icon', name: 'Service Account', primaryLabel: 'Service Account', secondaryLabel: 'Automated' },
              { variant: 'genai', name: 'AI Agent', primaryLabel: 'AI Agent', secondaryLabel: 'Gen AI Assistant' },
              { variant: 'o9logo', name: 'o9 Bot', primaryLabel: 'o9 Bot', secondaryLabel: 'System Process' },
            ]}
            max={3}
          />
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="usage" className="text-lg font-semibold text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Provide primaryLabel and secondaryLabel for meaningful dropdown rows',
            'Use max={3-5} for most contexts — keep the group compact',
            'Use onItemClick to navigate to user profiles or trigger actions',
            'Set min when a minimum number of visible avatars is required by the layout',
          ]}
          dontItems={[
            'Do not show more than 8 avatars visibly — use +N overflow',
            'Avoid using AvatarGroup for single avatars — use Avatar directly',
            'Do not mix sizes within a single group — all avatars share one size',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Each avatar has <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="img"</code> with an <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code>.</>,
            <>The +N counter button has <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-expanded</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-haspopup="listbox"</code>.</>,
            <>Dropdown closes on <kbd className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Escape</kbd> or click-outside.</>,
            'Dropdown items are focusable and keyboard-navigable.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-2">API Reference</h2>
        <h3 className="text-sm font-semibold text-text mb-2 mt-4">AvatarGroup Props</h3>
        <PropsTable props={groupProps} />
        <h3 className="text-sm font-semibold text-text mb-2 mt-6">Item Shape</h3>
        <PropsTable props={itemShape} />
      </section>
    </article>
  );
}
