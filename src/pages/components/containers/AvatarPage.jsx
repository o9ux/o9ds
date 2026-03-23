import { useState } from 'react';
import Avatar from '@/components/containers/Avatar';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

/* ── Props reference ── */
const avatarProps = [
  { name: 'variant', type: "'character' | 'icon' | 'image' | 'genai' | 'o9logo'", default: "'character'", description: 'Visual type of the avatar' },
  { name: 'size', type: "'xs' | 'sm' | 'normal' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'", default: "'md'", description: 'Dimensions of the avatar (16–64 px)' },
  { name: 'name', type: 'string', default: 'undefined', description: 'Full name or email — used to generate initials for the character variant' },
  { name: 'src', type: 'string', default: 'undefined', description: 'Image URL for the image variant — fills the container with object-cover' },
  { name: 'anonymous', type: 'boolean', default: 'false', description: 'Show the user-secret icon instead of user icon (icon variant only)' },
  { name: 'readOnly', type: 'boolean', default: 'true', description: 'When false, shows an edit button on character and image variants' },
  { name: 'onEdit', type: 'function', default: 'undefined', description: 'Callback when the edit button is clicked' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interactions and reduces opacity' },
  { name: 'alt', type: 'string', default: 'undefined', description: 'Accessible alt text — falls back to name or variant' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes on the root element' },
];

/* ── Size labels ── */
const ALL_SIZES = [
  { key: 'xs',   label: 'xs',   px: '16px' },
  { key: 'sm',   label: 'sm',   px: '20px' },
  { key: 'normal', label: 'normal', px: '24px' },
  { key: 'md',   label: 'md',   px: '32px' },
  { key: 'lg',   label: 'lg',   px: '40px' },
  { key: 'xl',   label: 'xl',   px: '48px' },
  { key: 'xxl',  label: 'xxl',  px: '56px' },
  { key: 'xxxl', label: 'xxxl', px: '64px' },
];

export default function AvatarPage() {
  const [editLog, setEditLog] = useState('');

  return (
    <article className="space-y-12">
      <PageHeader
        title="Avatar"
        description="Square box-shaped avatars represent users, entities, AI agents, or the o9 brand — with multiple variant types, sizes, and an optional edit action."
        status="stable"
        category="Containers"
      />

      {/* ── Sizes ── */}
      <section>
        <h2 id="sizes" className="text-lg font-semibold text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Eight sizes from <strong className="text-text">xs</strong> (16 px) to <strong className="text-text">xxxl</strong> (64 px).
        </p>
        <CodeExample code={`<Avatar size="xs" name="Kiran Shah" />
<Avatar size="sm" name="Kiran Shah" />
<Avatar size="normal" name="Kiran Shah" />
<Avatar size="md" name="Kiran Shah" />
<Avatar size="lg" name="Kiran Shah" />
<Avatar size="xl" name="Kiran Shah" />
<Avatar size="xxl" name="Kiran Shah" />
<Avatar size="xxxl" name="Kiran Shah" />`}>
          <div className="flex flex-wrap items-end gap-4">
            {ALL_SIZES.map((s) => (
              <div key={s.key} className="flex flex-col items-center gap-2">
                <Avatar size={s.key} name="Kiran Shah" />
                <span className="text-[10px] text-text-tertiary">{s.label} ({s.px})</span>
              </div>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ── Variants ── */}
      <section>
        <h2 id="variants" className="text-lg font-semibold text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Five variant types to represent different kinds of entities.
        </p>

        {/* Character */}
        <h3 className="text-sm font-semibold text-text mb-2 mt-6">Character</h3>
        <p className="text-sm text-text-secondary mb-3">
          Displays initials derived from the name or email. Maximum two characters.
          At <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">xs</code> size, only one character is shown.
        </p>
        <CodeExample code={`<Avatar variant="character" name="Kiran Shah" />
<Avatar variant="character" name="john.doe@example.com" />
<Avatar variant="character" size="xs" name="Kiran Shah" />`}>
          <div className="flex items-end gap-4">
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="character" size="lg" name="Kiran Shah" />
              <span className="text-[10px] text-text-tertiary">Name</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="character" size="lg" name="john.doe@example.com" />
              <span className="text-[10px] text-text-tertiary">Email</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="character" size="xs" name="Kiran Shah" />
              <span className="text-[10px] text-text-tertiary">xs (1 char)</span>
            </div>
          </div>
        </CodeExample>

        {/* Icon */}
        <h3 className="text-sm font-semibold text-text mb-2 mt-6">Icon</h3>
        <p className="text-sm text-text-secondary mb-3">
          Shows <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">o9con-user</code> by default.
          Set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">anonymous</code> for the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">o9con-user-secret</code> variant.
        </p>
        <CodeExample code={`<Avatar variant="icon" />
<Avatar variant="icon" anonymous />`}>
          <div className="flex items-end gap-4">
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="icon" size="lg" />
              <span className="text-[10px] text-text-tertiary">Normal</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="icon" size="lg" anonymous />
              <span className="text-[10px] text-text-tertiary">Anonymous</span>
            </div>
          </div>
        </CodeExample>

        {/* Image */}
        <h3 className="text-sm font-semibold text-text mb-2 mt-6">Image</h3>
        <p className="text-sm text-text-secondary mb-3">
          Profile photo cropped to fill the container with no padding or spacing.
        </p>
        <CodeExample code={`<Avatar variant="image" src="https://i.pravatar.cc/150?img=47" name="Aria Singh" />`}>
          <div className="flex items-end gap-4">
            {['xs', 'sm', 'normal', 'md', 'lg', 'xl'].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Avatar variant="image" size={s} src="https://i.pravatar.cc/150?img=47" name="Aria Singh" />
                <span className="text-[10px] text-text-tertiary">{s}</span>
              </div>
            ))}
          </div>
        </CodeExample>

        {/* Gen AI */}
        <h3 className="text-sm font-semibold text-text mb-2 mt-6">Gen AI</h3>
        <p className="text-sm text-text-secondary mb-3">
          AI agent representation using the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">o9con-genai</code> icon on a dark background.
        </p>
        <CodeExample code={`<Avatar variant="genai" />`}>
          <div className="flex items-end gap-4">
            {['xs', 'sm', 'normal', 'md', 'lg'].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Avatar variant="genai" size={s} />
                <span className="text-[10px] text-text-tertiary">{s}</span>
              </div>
            ))}
          </div>
        </CodeExample>

        {/* o9 Logo */}
        <h3 className="text-sm font-semibold text-text mb-2 mt-6">o9 Logo</h3>
        <p className="text-sm text-text-secondary mb-3">
          Brand identity using <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">o9con-o9-logo</code> on a dark background.
        </p>
        <CodeExample code={`<Avatar variant="o9logo" />`}>
          <div className="flex items-end gap-4">
            {['xs', 'sm', 'normal', 'md', 'lg'].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Avatar variant="o9logo" size={s} />
                <span className="text-[10px] text-text-tertiary">{s}</span>
              </div>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ── Read-Only vs Editable ── */}
      <section>
        <h2 id="edit" className="text-lg font-semibold text-text mb-2">Read-Only & Editable</h2>
        <p className="text-sm text-text-secondary mb-4">
          Avatars are <strong className="text-text">read-only by default</strong>. Set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">readOnly=false</code> to
          show a small edit button (pencil icon) at the top-right corner.
          Edit mode is only available for <strong className="text-text">character</strong> and <strong className="text-text">image</strong> variants.
        </p>
        <CodeExample code={`{/* Read-only (default) */}
<Avatar variant="character" name="Kiran Shah" />

{/* Editable — pencil button appears */}
<Avatar variant="character" name="Kiran Shah" readOnly={false} onEdit={() => alert('Edit!')} />
<Avatar variant="image" src="..." readOnly={false} onEdit={() => alert('Edit!')} />`}>
          <div className="flex items-end gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="character" size="lg" name="Kiran Shah" />
              <span className="text-[10px] text-text-tertiary">Read-only</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="character" size="lg" name="Kiran Shah" readOnly={false} onEdit={() => setEditLog('Character edit clicked')} />
              <span className="text-[10px] text-text-tertiary">Editable (character)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="image" size="lg" src="https://i.pravatar.cc/150?img=47" readOnly={false} onEdit={() => setEditLog('Image edit clicked')} />
              <span className="text-[10px] text-text-tertiary">Editable (image)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="icon" size="lg" readOnly={false} />
              <span className="text-[10px] text-text-tertiary">Icon (no edit)</span>
            </div>
          </div>
          {editLog && (
            <p className="mt-3 text-xs text-text-secondary">
              Last action: <span className="text-text">{editLog}</span>
            </p>
          )}
        </CodeExample>
      </section>

      {/* ── Tooltip ── */}
      <section>
        <h2 id="tooltip" className="text-lg font-semibold text-text mb-2">Tooltip</h2>
        <p className="text-sm text-text-secondary mb-4">
          When a <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">name</code> or <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">alt</code> prop is provided,
          the avatar automatically shows the full name in a Tooltip on hover or keyboard focus.
        </p>
        <CodeExample code={`<Avatar variant="character" name="Kiran Shah" />
<Avatar variant="icon" name="Anonymous User" anonymous />
<Avatar variant="image" src="..." name="Aria Singh" />
<Avatar variant="genai" alt="o9 AI Assistant" />`}>
          <div className="flex items-end gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="character" size="lg" name="Kiran Shah" />
              <span className="text-[10px] text-text-tertiary">Hover me</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="icon" size="lg" name="Anonymous User" anonymous />
              <span className="text-[10px] text-text-tertiary">Hover me</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="image" size="lg" src="https://i.pravatar.cc/150?img=47" name="Aria Singh" />
              <span className="text-[10px] text-text-tertiary">Hover me</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar variant="genai" size="lg" alt="o9 AI Assistant" />
              <span className="text-[10px] text-text-tertiary">Hover me</span>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Disabled ── */}
      <section>
        <h2 id="disabled" className="text-lg font-semibold text-text mb-2">Disabled</h2>
        <p className="text-sm text-text-secondary mb-4">
          Disabled avatars have reduced opacity and cannot be interacted with.
        </p>
        <CodeExample code={`<Avatar variant="character" name="Kiran Shah" disabled />
<Avatar variant="image" src="..." disabled />
<Avatar variant="icon" disabled />`}>
          <div className="flex items-end gap-4">
            <Avatar variant="character" size="lg" name="Kiran Shah" disabled />
            <Avatar variant="image" size="lg" src="https://i.pravatar.cc/150?img=47" disabled />
            <Avatar variant="icon" size="lg" disabled />
            <Avatar variant="genai" size="lg" disabled />
            <Avatar variant="o9logo" size="lg" disabled />
          </div>
        </CodeExample>
      </section>

      {/* ── All Variants × All Sizes Matrix ── */}
      <section>
        <h2 id="matrix" className="text-lg font-semibold text-text mb-2">Size × Variant Matrix</h2>
        <p className="text-sm text-text-secondary mb-4">
          Complete overview of every size and variant combination.
        </p>
        <div className="overflow-x-auto">
          <table className="text-xs text-text-secondary">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left font-medium text-text">Size</th>
                <th className="px-3 py-2 text-center font-medium text-text">Character</th>
                <th className="px-3 py-2 text-center font-medium text-text">Icon</th>
                <th className="px-3 py-2 text-center font-medium text-text">Image</th>
                <th className="px-3 py-2 text-center font-medium text-text">Gen AI</th>
                <th className="px-3 py-2 text-center font-medium text-text">o9 Logo</th>
              </tr>
            </thead>
            <tbody>
              {ALL_SIZES.map((s) => (
                <tr key={s.key} className="border-t border-border">
                  <td className="px-3 py-3 font-medium text-text whitespace-nowrap">{s.label} ({s.px})</td>
                  <td className="px-3 py-3 text-center"><Avatar variant="character" size={s.key} name="Kiran Shah" /></td>
                  <td className="px-3 py-3 text-center"><Avatar variant="icon" size={s.key} /></td>
                  <td className="px-3 py-3 text-center"><Avatar variant="image" size={s.key} src="https://i.pravatar.cc/150?img=47" name="Aria Singh" /></td>
                  <td className="px-3 py-3 text-center"><Avatar variant="genai" size={s.key} /></td>
                  <td className="px-3 py-3 text-center"><Avatar variant="o9logo" size={s.key} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Root element has <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="img"</code> with an <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code> derived from the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">alt</code> or <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">name</code> prop.</>,
            <>The edit button has its own <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label="Edit avatar"</code>.</>,
            'Focus-visible ring on the root element for keyboard navigation.',
            <>Icon SVGs are rendered with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-hidden="true"</code> (handled by O9Icon).</>,
            <>Disabled avatars have <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">tabIndex={'{-1}'}</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">pointer-events: none</code>.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="usage" className="text-lg font-semibold text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Always provide the name prop for character variant to generate meaningful initials',
            'Use the image variant when a profile photo is available — it crops to fill',
            'Use readOnly={false} with onEdit only when users can update their avatar',
            'Use icon variant for generic user placeholders; set anonymous for secured/anonymous users',
            'Use genai for AI agent contexts and o9logo for brand representation',
          ]}
          dontItems={[
            'Do not use circular/rounded avatars — the design system uses square shapes',
            'Do not use edit mode on icon, genai, or o9logo variants — it has no effect',
            'Avoid using avatars as interactive buttons without a wrapping control',
            'Do not show more than two initials — the component handles truncation automatically',
          ]}
        />
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-2">API Reference</h2>
        <PropsTable props={avatarProps} />
      </section>
    </article>
  );
}
