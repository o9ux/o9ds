import { useState } from 'react';
import Chip from '@/components/inputs/Chip';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const chipProps = [
  { name: 'variant', type: "'filled' | 'outline'", default: "'filled'", description: 'Visual style' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the chip' },
  { name: 'leadingIcon', type: 'ReactNode', default: 'undefined', description: 'Icon before the label' },
  { name: 'selected', type: 'boolean', default: 'false', description: 'Selected/active state' },
  { name: 'removable', type: 'boolean', default: 'false', description: 'Shows a remove/close button' },
  { name: 'onRemove', type: '() => void', default: 'undefined', description: 'Handler when remove button is clicked' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the chip is disabled' },
  { name: 'onClick', type: '() => void', default: 'undefined', description: 'Makes the chip interactive/clickable' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Chip label content' },
];

const TagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 7.5V2a1 1 0 011-1h5.5L13 6.5 7.5 12z" />
    <circle cx="4" cy="4" r="1" fill="currentColor" />
  </svg>
);

export default function ChipPage() {
  const [variant, setVariant] = useState('filled');
  const [selected, setSelected] = useState(false);
  const [removable, setRemovable] = useState(false);
  const [tags, setTags] = useState(['React', 'Tailwind', 'TypeScript', 'Vite']);

  return (
    <article>
      <PageHeader title="Chip" description="Chips are compact elements that represent a tag, attribute, or selection. They can be static, selectable, or removable." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'Variant', value: variant, onChange: setVariant, options: ['filled', 'outline'] },
          { type: 'checkbox', label: 'Selected', value: selected, onChange: setSelected },
          { type: 'checkbox', label: 'Removable', value: removable, onChange: setRemovable },
        ]}>
          <Chip variant={variant} selected={selected} removable={removable} onRemove={() => {}}>
            Example Chip
          </Chip>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <CodeExample code={`<Chip variant="filled">Filled</Chip>\n<Chip variant="outline">Outline</Chip>\n<Chip selected>Selected</Chip>`}>
          <div className="flex flex-wrap items-center gap-2">
            <Chip variant="filled">Filled</Chip>
            <Chip variant="outline">Outline</Chip>
            <Chip selected>Selected</Chip>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <CodeExample code={`<Chip size="sm">Small</Chip>\n<Chip size="md">Medium</Chip>\n<Chip size="lg">Large</Chip>`}>
          <div className="flex flex-wrap items-center gap-2">
            <Chip size="sm">Small</Chip>
            <Chip size="md">Medium</Chip>
            <Chip size="lg">Large</Chip>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="removable" className="text-xl font-black tracking-tight text-text mb-2">Removable Chips</h2>
        <p className="text-sm text-text-secondary mb-4">Removable chips show a close button. Click to remove a tag below.</p>
        <div className="border border-border bg-surface-overlay p-6">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Chip key={tag} removable onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}>
                {tag}
              </Chip>
            ))}
            {tags.length === 0 && <span className="text-xs text-text-tertiary">All chips removed. Refresh to reset.</span>}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="with-icon" className="text-xl font-black tracking-tight text-text mb-2">With Icon</h2>
        <CodeExample code={`<Chip leadingIcon={<TagIcon />}>Category</Chip>`}>
          <Chip leadingIcon={<TagIcon />}>Category</Chip>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use chips to display tags, categories, or selections compactly', 'Use removable chips for user-created tags that can be dismissed', 'Use selected state for filter chips that toggle on/off']}
          dontItems={['Do not use chips as a replacement for buttons', 'Avoid chips for long text — keep labels short', 'Do not use more than ~10 chips in a single group']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={chipProps} />
      </section>
    </article>
  );
}
