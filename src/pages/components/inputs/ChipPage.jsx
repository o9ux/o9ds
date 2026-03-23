import { useState, useCallback } from 'react';
import Chip from '@/components/inputs/Chip';
import O9Icon from '@/components/O9Icon';
import { cn } from '@/utils/cn';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

import tagSvg from '@/assets/icons/o9con-tag.svg?raw';
import starSvg from '@/assets/icons/o9con-star.svg?raw';
import filterSvg from '@/assets/icons/o9con-filter.svg?raw';
import homeSvg from '@/assets/icons/o9con-home.svg?raw';
import cogSvg from '@/assets/icons/o9con-cog.svg?raw';
import heartSvg from '@/assets/icons/o9con-heart.svg?raw';
import lockSvg from '@/assets/icons/o9con-lock.svg?raw';
import boltSvg from '@/assets/icons/o9con-bolt.svg?raw';
import chevronDownSvg from '@/assets/icons/o9con-chevron-down.svg?raw';
import pencilSvg from '@/assets/icons/o9con-pencil.svg?raw';

/* Light-mode-only white background for all preview containers on this page */
const lightWhite = '[html[data-theme=light]_&]:bg-white!';

const chipProps = [
  { name: 'variant', type: "'primary' | 'secondary' | 'tertiary'", default: "'primary'", description: 'Visual style — primary (subtle filled bg), secondary (subtle border), tertiary (purple border)' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Chip size — sm (24px), md (28px), lg (32px)' },
  { name: 'selected', type: 'boolean', default: 'false', description: 'Selected/active state with checkmark' },
  { name: 'exclude', type: 'boolean', default: 'false', description: 'Outline/border mode with check or close trailing icon (Figma: has-Exclude)' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Error state with danger border and blocker icon' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Read-only state with dashed border' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the chip is disabled' },
  { name: 'leadingIcon', type: 'ReactNode', default: 'undefined', description: 'Icon before the label' },
  { name: 'trailingIcon', type: 'ReactNode', default: 'undefined', description: 'Icon after the label' },
  { name: 'avatar', type: 'string', default: 'undefined', description: 'Avatar name for initials fallback' },
  { name: 'avatarSrc', type: 'string', default: 'undefined', description: 'Avatar image URL' },
  { name: 'dot', type: "'default' | 'success' | 'warning' | 'error' | 'info' | 'utility'", default: 'undefined', description: 'Status dot color indicator' },
  { name: 'count', type: 'number', default: 'undefined', description: 'Numeric count badge' },
  { name: 'unsaved', type: 'boolean', default: 'false', description: 'Unsaved indicator dot (Figma: has-unsavedIndicator)' },
  { name: 'draggable', type: 'boolean', default: 'false', description: 'Drag handle flush left for reorderable chips (Figma: has-Drag)' },
  { name: 'removable', type: 'boolean', default: 'false', description: 'Close button flush right, packed with container' },
  { name: 'onRemove', type: '() => void', default: 'undefined', description: 'Handler when remove button is clicked' },
  { name: 'onClick', type: '() => void', default: 'undefined', description: 'Makes the chip interactive/clickable' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Chip label content' },
];

export default function ChipPage() {
  const [demoVariant, setDemoVariant] = useState('primary');
  const [demoSize, setDemoSize] = useState('md');
  const [demoSelected, setDemoSelected] = useState(false);
  const [demoExclude, setDemoExclude] = useState(false);
  const [demoRemovable, setDemoRemovable] = useState(false);
  const [demoDisabled, setDemoDisabled] = useState(false);
  const [demoError, setDemoError] = useState(false);
  const [demoReadOnly, setDemoReadOnly] = useState(false);
  const [demoIcon, setDemoIcon] = useState(false);
  const [demoAvatar, setDemoAvatar] = useState(false);
  const [demoDrag, setDemoDrag] = useState(false);

  /* Removable chips demo */
  const [tags, setTags] = useState(['React', 'Tailwind', 'TypeScript', 'Vite', 'Node.js']);

  /* Filter chips demo */
  const filterOptions = ['All', 'Design', 'Engineering', 'Product', 'Marketing'];
  const [activeFilters, setActiveFilters] = useState(['All']);
  const toggleFilter = (f) => {
    if (f === 'All') {
      setActiveFilters(['All']);
    } else {
      const next = activeFilters.includes(f)
        ? activeFilters.filter((x) => x !== f)
        : [...activeFilters.filter((x) => x !== 'All'), f];
      setActiveFilters(next.length === 0 ? ['All'] : next);
    }
  };

  /* ── Drag-and-drop reorderable list ── */
  const [dragItems, setDragItems] = useState(['Design', 'Engineering', 'Product', 'Marketing', 'Analytics']);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  const handleDragStart = useCallback((idx) => {
    setDraggedIdx(idx);
  }, []);

  const handleDragOver = useCallback((e, idx) => {
    e.preventDefault();
    setDragOverIdx(idx);
  }, []);

  const handleDrop = useCallback((idx) => {
    if (draggedIdx === null || draggedIdx === idx) return;
    setDragItems((prev) => {
      const items = [...prev];
      const [removed] = items.splice(draggedIdx, 1);
      items.splice(idx, 0, removed);
      return items;
    });
    setDraggedIdx(null);
    setDragOverIdx(null);
  }, [draggedIdx]);

  const handleDragEnd = useCallback(() => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  }, []);

  /* Second drag list — with removable chips */
  const [dragItemsRemovable, setDragItemsRemovable] = useState(['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5']);
  const [draggedIdx2, setDraggedIdx2] = useState(null);
  const [dragOverIdx2, setDragOverIdx2] = useState(null);

  const handleDragStart2 = useCallback((idx) => {
    setDraggedIdx2(idx);
  }, []);

  const handleDragOver2 = useCallback((e, idx) => {
    e.preventDefault();
    setDragOverIdx2(idx);
  }, []);

  const handleDrop2 = useCallback((idx) => {
    if (draggedIdx2 === null || draggedIdx2 === idx) return;
    setDragItemsRemovable((prev) => {
      const items = [...prev];
      const [removed] = items.splice(draggedIdx2, 1);
      items.splice(idx, 0, removed);
      return items;
    });
    setDraggedIdx2(null);
    setDragOverIdx2(null);
  }, [draggedIdx2]);

  const handleDragEnd2 = useCallback(() => {
    setDraggedIdx2(null);
    setDragOverIdx2(null);
  }, []);

  return (
    <article>
      <PageHeader title="Chip" description="Chips are compact elements that represent a tag, attribute, filter, or selection. They support three variants (primary, secondary, tertiary), exclude/outline mode, avatars, icons, error states, flush drag handles, flush close buttons, and can be selectable or removable." status="stable" category="Input & Form Controls" />

      {/* ── Interactive Demo ── */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">Toggle options to explore different chip configurations matching the Figma spec.</p>
        <ComponentDemo previewClassName={lightWhite} controls={[
          { type: 'select', label: 'Variant', value: demoVariant, onChange: setDemoVariant, options: ['primary', 'secondary', 'tertiary'] },
          { type: 'select', label: 'Size', value: demoSize, onChange: setDemoSize, options: ['sm', 'md', 'lg'] },
          { type: 'checkbox', label: 'Selected', value: demoSelected, onChange: setDemoSelected },
          { type: 'checkbox', label: 'Exclude', value: demoExclude, onChange: setDemoExclude },
          { type: 'checkbox', label: 'Removable', value: demoRemovable, onChange: setDemoRemovable },
          { type: 'checkbox', label: 'Disabled', value: demoDisabled, onChange: setDemoDisabled },
          { type: 'checkbox', label: 'Error', value: demoError, onChange: setDemoError },
          { type: 'checkbox', label: 'Read Only', value: demoReadOnly, onChange: setDemoReadOnly },
          { type: 'checkbox', label: 'Icon', value: demoIcon, onChange: setDemoIcon },
          { type: 'checkbox', label: 'Avatar', value: demoAvatar, onChange: setDemoAvatar },
          { type: 'checkbox', label: 'Drag', value: demoDrag, onChange: setDemoDrag },
        ]}>
          <Chip
            variant={demoVariant}
            size={demoSize}
            selected={demoSelected}
            exclude={demoExclude}
            removable={demoRemovable}
            onRemove={() => {}}
            disabled={demoDisabled}
            error={demoError}
            readOnly={demoReadOnly}
            leadingIcon={demoIcon ? <O9Icon svg={pencilSvg} /> : undefined}
            avatar={demoAvatar ? 'John Doe' : undefined}
            draggable={demoDrag}
            onClick={() => setDemoSelected(!demoSelected)}
          >
            Label
          </Chip>
        </ComponentDemo>
      </section>

      {/* ── Variants ── */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">Three visual variants. Primary has a subtle filled background, Secondary has a subtle border, and Tertiary features a purple accent border.</p>
        <CodeExample previewClassName={lightWhite} code={`<Chip variant="primary">Primary</Chip>
<Chip variant="secondary">Secondary</Chip>
<Chip variant="secondary">Tertiary</Chip>`}>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <Chip variant="primary" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="John Doe">Label</Chip>
              <span className="text-[10px] text-text-tertiary">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Chip variant="secondary" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="John Doe">Label</Chip>
              <span className="text-[10px] text-text-tertiary">Secondary</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Chip variant="secondary" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="John Doe">Label</Chip>
              <span className="text-[10px] text-text-tertiary">Tertiary</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Chip selected onClick={() => {}}>Selected</Chip>
              <span className="text-[10px] text-text-tertiary">Selected</span>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Sizes ── */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">Three sizes: sm (24px), md (28px), lg (32px). All elements — icons, avatars, close buttons, drag handles — scale proportionally.</p>
        <CodeExample previewClassName={lightWhite} code={`<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>`}>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-text-tertiary w-8 shrink-0">sm</span>
              <Chip size="sm" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD">Label</Chip>
              <Chip size="sm" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" removable onRemove={() => {}}>Label</Chip>
              <Chip size="sm" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" selected onClick={() => {}}>Label</Chip>
              <Chip size="sm" exclude>Label</Chip>
              <Chip size="sm" draggable>Label</Chip>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-text-tertiary w-8 shrink-0">md</span>
              <Chip size="md" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD">Label</Chip>
              <Chip size="md" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" removable onRemove={() => {}}>Label</Chip>
              <Chip size="md" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" selected onClick={() => {}}>Label</Chip>
              <Chip size="md" exclude>Label</Chip>
              <Chip size="md" draggable>Label</Chip>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-text-tertiary w-8 shrink-0">lg</span>
              <Chip size="lg" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD">Label</Chip>
              <Chip size="lg" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" removable onRemove={() => {}}>Label</Chip>
              <Chip size="lg" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" selected onClick={() => {}}>Label</Chip>
              <Chip size="lg" exclude>Label</Chip>
              <Chip size="lg" draggable>Label</Chip>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── States ── */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <p className="text-sm text-text-secondary mb-4">All interactive states: enable, hover, focus, active, readOnly, disabled, and error.</p>
        <CodeExample previewClassName={lightWhite} code={`{/* Normal states */}
<Chip>Enable</Chip>
<Chip selected>Active</Chip>
<Chip readOnly>ReadOnly</Chip>
<Chip disabled>Disabled</Chip>

{/* Error states */}
<Chip error>Error</Chip>
<Chip error exclude>Error Exclude</Chip>`}>
          <div className="flex flex-col gap-4 w-full">
            <div>
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider mb-2">Default states</p>
              <div className="flex flex-wrap items-center gap-2">
                <Chip leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD">Enable</Chip>
                <Chip leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" removable onRemove={() => {}}>Hover</Chip>
                <Chip leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" selected onClick={() => {}}>Active</Chip>
                <Chip leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" readOnly>ReadOnly</Chip>
                <Chip leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" disabled>Disabled</Chip>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider mb-2">Error states</p>
              <div className="flex flex-wrap items-center gap-2">
                <Chip leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" error>Error Primary</Chip>
                <Chip leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" error removable onRemove={() => {}}>Error Removable</Chip>
                <Chip variant="secondary" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" error>Error Secondary</Chip>
                <Chip variant="secondary" leadingIcon={<O9Icon svg={pencilSvg} />} avatar="JD" error>Error Tertiary</Chip>
              </div>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Exclude Mode (Outline) ── */}
      <section className="mb-12">
        <h2 id="exclude" className="text-xl font-black tracking-tight text-text mb-2">Exclude Mode</h2>
        <p className="text-sm text-text-secondary mb-4">Exclude mode (has-Exclude in Figma) renders the chip with an outline border instead of a filled background. Shows a close or check icon trailing.</p>
        <CodeExample previewClassName={lightWhite} code={`<Chip exclude>Exclude Enable</Chip>
<Chip exclude removable>Exclude Removable</Chip>
<Chip exclude selected>Exclude Active</Chip>`}>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <Chip exclude>Label</Chip>
              <Chip exclude removable onRemove={() => {}}>Label</Chip>
              <Chip exclude selected onClick={() => {}}>Label</Chip>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip size="lg" exclude>Label</Chip>
              <Chip size="lg" exclude removable onRemove={() => {}}>Label</Chip>
              <Chip size="lg" exclude selected onClick={() => {}}>Label</Chip>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── With Avatar ── */}
      <section className="mb-12">
        <h2 id="with-avatar" className="text-xl font-black tracking-tight text-text mb-2">With Avatar</h2>
        <p className="text-sm text-text-secondary mb-4">Avatar chips display a user avatar (initials or image) and optional leading icon. Matches the Figma has-Avatar property.</p>
        <CodeExample previewClassName={lightWhite} code={`<Chip avatar="John Doe" leadingIcon={<O9Icon svg={pencilSvg} />}>Label</Chip>
<Chip avatar="Alice W." removable>Alice W.</Chip>`}>
          <div className="flex flex-wrap items-center gap-2">
            <Chip avatar="John Doe" leadingIcon={<O9Icon svg={pencilSvg} />}>Label</Chip>
            <Chip avatar="Alice Wang" leadingIcon={<O9Icon svg={pencilSvg} />} removable onRemove={() => {}}>Alice W.</Chip>
            <Chip avatar="Bob Chen" variant="secondary">Bob Chen</Chip>
            <Chip avatar="Mike Ross" selected onClick={() => {}}>Mike R.</Chip>
            <Chip avatar="Eve Lin" error>Eve Lin</Chip>
          </div>
        </CodeExample>
      </section>

      {/* ── With Icons ── */}
      <section className="mb-12">
        <h2 id="with-icon" className="text-xl font-black tracking-tight text-text mb-2">With Icons</h2>
        <p className="text-sm text-text-secondary mb-4">Leading and trailing icons. The Figma shows a leading edit/pencil icon (has-leadingIcon) as the default pattern.</p>
        <CodeExample previewClassName={lightWhite} code={`<Chip leadingIcon={<O9Icon svg={pencilSvg} />}>Label</Chip>
<Chip leadingIcon={<O9Icon svg={tagSvg} />}>Category</Chip>
<Chip trailingIcon={<O9Icon svg={chevronDownSvg} />}>Dropdown</Chip>`}>
          <div className="flex flex-wrap items-center gap-2">
            <Chip leadingIcon={<O9Icon svg={pencilSvg} />}>Label</Chip>
            <Chip leadingIcon={<O9Icon svg={tagSvg} />}>Category</Chip>
            <Chip leadingIcon={<O9Icon svg={starSvg} />}>Favorite</Chip>
            <Chip leadingIcon={<O9Icon svg={filterSvg} />}>Filter</Chip>
            <Chip trailingIcon={<O9Icon svg={chevronDownSvg} />}>Dropdown</Chip>
            <Chip leadingIcon={<O9Icon svg={cogSvg} />} removable onRemove={() => {}}>Settings</Chip>
          </div>
        </CodeExample>
      </section>

      {/* ── Drag & Drop (Interactive) ── */}
      <section className="mb-12">
        <h2 id="drag" className="text-xl font-black tracking-tight text-text mb-2">Drag &amp; Drop</h2>
        <p className="text-sm text-text-secondary mb-4">Draggable chips show a drag handle icon (o9con-drag-handle) flush to the left edge with no spacing. Drag chips to reorder them in the list.</p>

        {/* Static examples */}
        <CodeExample previewClassName={lightWhite} code={`<Chip draggable>Label</Chip>
<Chip draggable size="lg">Label</Chip>
<Chip draggable variant="secondary">Label</Chip>
<Chip draggable variant="secondary">Label</Chip>`}>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <Chip size="sm" draggable>Label</Chip>
              <Chip size="md" draggable>Label</Chip>
              <Chip size="lg" draggable>Label</Chip>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip draggable variant="primary">Primary</Chip>
              <Chip draggable variant="secondary">Secondary</Chip>
              <Chip draggable variant="secondary">Tertiary</Chip>
            </div>
          </div>
        </CodeExample>

        {/* Interactive drag list */}
        <div className="mt-6">
          <h3 className="text-sm font-bold text-text mb-2">Reorderable Chip List</h3>
          <p className="text-xs text-text-secondary mb-3">Drag chips to reorder them. Uses native HTML5 drag-and-drop with the draggable prop.</p>
          <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
            <div className="flex flex-wrap gap-2">
              {dragItems.map((item, idx) => (
                <Chip
                  key={item}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={() => handleDrop(idx)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    draggedIdx === idx && 'opacity-40',
                    dragOverIdx === idx && draggedIdx !== idx && 'ring-1 ring-interactive'
                  )}
                >
                  {item}
                </Chip>
              ))}
            </div>
            <p className="text-xs text-text-tertiary mt-3">Order: {dragItems.join(' → ')}</p>
          </div>
        </div>

        {/* Interactive drag list with removable */}
        <div className="mt-6">
          <h3 className="text-sm font-bold text-text mb-2">Draggable + Removable</h3>
          <p className="text-xs text-text-secondary mb-3">Combine drag handles (flush left) with close buttons (flush right) for full chip management.</p>
          <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
            <div className="flex flex-wrap gap-2">
              {dragItemsRemovable.map((item, idx) => (
                <Chip
                  key={item}
                  draggable
                  removable
                  onRemove={() => setDragItemsRemovable((prev) => prev.filter((_, i) => i !== idx))}
                  onDragStart={() => handleDragStart2(idx)}
                  onDragOver={(e) => handleDragOver2(e, idx)}
                  onDrop={() => handleDrop2(idx)}
                  onDragEnd={handleDragEnd2}
                  className={cn(
                    draggedIdx2 === idx && 'opacity-40',
                    dragOverIdx2 === idx && draggedIdx2 !== idx && 'ring-1 ring-interactive'
                  )}
                >
                  {item}
                </Chip>
              ))}
              {dragItemsRemovable.length === 0 && <span className="text-xs text-text-tertiary">All chips removed. Refresh to reset.</span>}
            </div>
            <p className="text-xs text-text-tertiary mt-3">Order: {dragItemsRemovable.join(' → ')}</p>
          </div>
        </div>
      </section>

      {/* ── Status Dots ── */}
      <section className="mb-12">
        <h2 id="status-dots" className="text-xl font-black tracking-tight text-text mb-2">Status Dots</h2>
        <p className="text-sm text-text-secondary mb-4">A small colored dot indicates status at a glance. Info uses --color-info (bluish-09) and Utility uses --color-utility-purple (purple-dark).</p>
        <CodeExample previewClassName={lightWhite} code={`<Chip dot="default">Default</Chip>
<Chip dot="success">Active</Chip>
<Chip dot="warning">Pending</Chip>
<Chip dot="error">Error</Chip>
<Chip dot="info">Info</Chip>
<Chip dot="utility">Utility</Chip>`}>
          <div className="flex flex-wrap items-center gap-2">
            <Chip dot="default">Default</Chip>
            <Chip dot="success">Active</Chip>
            <Chip dot="warning">Pending</Chip>
            <Chip dot="error">Error</Chip>
            <Chip dot="info">Info</Chip>
            <Chip dot="utility">Utility</Chip>
          </div>
        </CodeExample>
      </section>

      {/* ── Count Badge ── */}
      <section className="mb-12">
        <h2 id="count-badge" className="text-xl font-black tracking-tight text-text mb-2">Count Badge</h2>
        <p className="text-sm text-text-secondary mb-4">Numeric badge shows counts inside the chip.</p>
        <CodeExample previewClassName={lightWhite} code={`<Chip count={5}>Inbox</Chip>
<Chip count={12} leadingIcon={<O9Icon svg={filterSvg} />}>Filters</Chip>
<Chip count={99} selected>Notifications</Chip>`}>
          <div className="flex flex-wrap items-center gap-2">
            <Chip count={5}>Inbox</Chip>
            <Chip count={12} leadingIcon={<O9Icon svg={filterSvg} />}>Filters</Chip>
            <Chip count={3} variant="secondary">Tasks</Chip>
            <Chip count={99} selected onClick={() => {}}>Notifications</Chip>
          </div>
        </CodeExample>
      </section>

      {/* ── Unsaved Indicator ── */}
      <section className="mb-12">
        <h2 id="unsaved" className="text-xl font-black tracking-tight text-text mb-2">Unsaved Indicator</h2>
        <p className="text-sm text-text-secondary mb-4">A warning dot signals unsaved changes (Figma: has-unsavedIndicator).</p>
        <CodeExample previewClassName={lightWhite} code={`<Chip unsaved>Unsaved</Chip>
<Chip unsaved variant="secondary">Draft</Chip>`}>
          <div className="flex flex-wrap items-center gap-2">
            <Chip unsaved>Unsaved</Chip>
            <Chip unsaved variant="secondary">Draft</Chip>
            <Chip unsaved leadingIcon={<O9Icon svg={pencilSvg} />}>Editing</Chip>
          </div>
        </CodeExample>
      </section>

      {/* ── Filter Chips (Selectable) ── */}
      <section className="mb-12">
        <h2 id="filter-chips" className="text-xl font-black tracking-tight text-text mb-2">Filter Chips</h2>
        <p className="text-sm text-text-secondary mb-4">Filter chips toggle on/off. Selected chips show a checkmark. Click to toggle.</p>
        <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((f) => (
              <Chip
                key={f}
                variant="secondary"
                selected={activeFilters.includes(f)}
                onClick={() => toggleFilter(f)}
              >
                {f}
              </Chip>
            ))}
          </div>
          <p className="text-xs text-text-tertiary mt-3">Active: {activeFilters.join(', ')}</p>
        </div>
      </section>

      {/* ── Removable Chips ── */}
      <section className="mb-12">
        <h2 id="removable" className="text-xl font-black tracking-tight text-text mb-2">Removable Chips</h2>
        <p className="text-sm text-text-secondary mb-4">Removable chips show a close button flush right, packed with the container. Click the close icon or press Delete/Backspace to remove.</p>
        <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
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

      {/* ── Combined Examples ── */}
      <section className="mb-12">
        <h2 id="combinations" className="text-xl font-black tracking-tight text-text mb-2">Combinations</h2>
        <p className="text-sm text-text-secondary mb-4">Chips support combining features for rich, compact UI elements.</p>
        <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider mb-2">User tags (avatar + icon + removable)</p>
              <div className="flex flex-wrap items-center gap-2">
                <Chip avatar="Sarah Kim" leadingIcon={<O9Icon svg={pencilSvg} />} removable onRemove={() => {}}>Sarah Kim</Chip>
                <Chip avatar="Alex Turner" leadingIcon={<O9Icon svg={pencilSvg} />} removable onRemove={() => {}}>Alex T.</Chip>
                <Chip avatar="Lin Wei" leadingIcon={<O9Icon svg={pencilSvg} />} selected onClick={() => {}}>Lin Wei</Chip>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider mb-2">Status chips (dot + variant)</p>
              <div className="flex flex-wrap items-center gap-2">
                <Chip dot="success" variant="secondary">Published</Chip>
                <Chip dot="warning" variant="secondary">Draft</Chip>
                <Chip dot="error" variant="secondary">Failed</Chip>
                <Chip dot="info" variant="secondary">Info</Chip>
                <Chip dot="utility" variant="secondary">Utility</Chip>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider mb-2">Category filters (icon + count)</p>
              <div className="flex flex-wrap items-center gap-2">
                <Chip leadingIcon={<O9Icon svg={homeSvg} />} count={24} variant="secondary" onClick={() => {}}>Dashboard</Chip>
                <Chip leadingIcon={<O9Icon svg={cogSvg} />} count={8} variant="secondary" onClick={() => {}}>Settings</Chip>
                <Chip leadingIcon={<O9Icon svg={starSvg} />} count={12} selected onClick={() => {}}>Favorites</Chip>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider mb-2">Tertiary variant examples</p>
              <div className="flex flex-wrap items-center gap-2">
                <Chip variant="secondary" leadingIcon={<O9Icon svg={boltSvg} />}>Feature</Chip>
                <Chip variant="secondary" removable onRemove={() => {}}>Removable</Chip>
                <Chip variant="secondary" dot="utility">Utility Status</Chip>
                <Chip variant="secondary" selected onClick={() => {}}>Selected</Chip>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Usage Guidelines ── */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use primary variant for default chip backgrounds (subtle fill)',
            'Use secondary variant for bordered chips in panels',
            'Use tertiary variant for purple-accented utility categories',
            'Use exclude mode for outline/border chips that can be toggled',
            'Use removable chips for user-created tags that can be dismissed',
            'Use draggable chips for reorderable lists — drag handle is flush left',
            'Use avatar chips for people-related selections (assignees, mentions)',
            'Keep chip labels short and concise (1-3 words)',
          ]}
          dontItems={[
            'Do not use chips as a replacement for buttons — use Button instead',
            'Avoid chips for long text — keep labels short',
            'Do not use more than ~10 chips in a single group',
            'Do not combine error + selected on the same chip',
            'Do not use chips for navigation — use Tabs or Links instead',
            'Avoid nesting interactive elements inside chip labels',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            'Interactive chips use role="button" and are keyboard-focusable via tabIndex.',
            'Enter or Space activates the chip onClick handler.',
            'Delete or Backspace triggers onRemove for removable chips.',
            'aria-selected reflects the selected state for filter chips.',
            'aria-disabled marks disabled chips for assistive technology.',
            'aria-invalid is set when error is true.',
            'aria-readonly is set when readOnly is true.',
            'Remove button uses aria-label="Remove" for screen readers.',
            'Remove button uses tabIndex={-1} to keep focus on the chip itself.',
            'Focus ring is visible on keyboard navigation (focus-visible).',
            'Status dots use aria-hidden to avoid redundant announcements.',
            'Draggable chips set the native draggable attribute for HTML5 drag-and-drop.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary"><span className="mt-px text-text font-bold shrink-0">—</span>{item}</li>
          ))}
        </ul>
      </section>

      {/* ── API Reference ── */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={chipProps} />
      </section>
    </article>
  );
}
