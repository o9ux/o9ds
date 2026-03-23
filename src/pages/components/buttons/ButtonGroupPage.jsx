import { useState } from 'react';
import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import ButtonGroup from '@/components/buttons/ButtonGroup';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';

import alignLeftSvg from '@/assets/icons/o9con-align-left.svg?raw';
import alignCenterSvg from '@/assets/icons/o9con-align-center.svg?raw';
import alignRightSvg from '@/assets/icons/o9con-align-right.svg?raw';
import boldSvg from '@/assets/icons/o9con-bold.svg?raw';
import italicSvg from '@/assets/icons/o9con-italic.svg?raw';
import underlineSvg from '@/assets/icons/o9con-underline.svg?raw';
import copySvg from '@/assets/icons/o9con-copy.svg?raw';
import cutSvg from '@/assets/icons/o9con-cut.svg?raw';
import binSvg from '@/assets/icons/o9con-bin.svg?raw';
import pencilSvg from '@/assets/icons/o9con-pencil.svg?raw';
import searchSvg from '@/assets/icons/o9con-search.svg?raw';
import filterSvg from '@/assets/icons/o9con-filter.svg?raw';

const buttonGroupProps = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Direction in which buttons are laid out',
  },
  {
    name: 'overflow',
    type: 'number',
    default: 'undefined',
    description:
      'Maximum number of visible buttons. Extras collapse behind an ellipsis icon with a dropdown menu.',
  },
  {
    name: 'toggle',
    type: "'single' | 'multi'",
    default: 'undefined',
    description:
      "Enables toggle selection mode. 'single' for radio-like behavior, 'multi' for checkbox-like behavior.",
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description:
      'Disables all buttons in the group. Individual buttons can also be disabled via their own disabled prop.',
  },
  {
    name: 'selectionVariant',
    type: "'primary' | 'secondary'",
    default: "'primary'",
    description:
      "Selection appearance for toggle mode. 'primary' uses an outline highlight, 'secondary' uses a filled/solid highlight.",
  },
  {
    name: 'value',
    type: 'string | string[]',
    default: 'undefined',
    description:
      'Current selection. A string for single toggle, an array of strings for multi toggle.',
  },
  {
    name: 'onValueChange',
    type: '(value: string | string[]) => void',
    default: 'undefined',
    description: 'Callback fired when the toggle selection changes',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: 'undefined',
    description: 'Accessible label for the group/toolbar container',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes to apply to the group container',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description:
      'Button elements to group together. Each child should have a value prop when using toggle mode.',
  },
];

export default function ButtonGroupPage() {
  const [orientation, setOrientation] = useState('horizontal');
  const [alignment, setAlignment] = useState('left');
  const [formatting, setFormatting] = useState(['bold']);

  return (
    <article>
      <PageHeader
        title="Button Group"
        description="Button Group combines related buttons into a single, connected row or column. Use it for segmented controls, toolbar actions, toggle groups, or any set of related actions that should appear as a unified control. Supports overflow collapsing and single/multi toggle selection."
        status="stable"
        category="Buttons & Actions"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">
          Interactive Demo
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Toggle orientation between horizontal and vertical layout.
        </p>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Orientation',
              value: orientation,
              onChange: setOrientation,
              options: ['horizontal', 'vertical'],
            },
          ]}
        >
          <ButtonGroup orientation={orientation} aria-label="Text actions">
            <Button variant="outline">Left</Button>
            <Button variant="outline">Center</Button>
            <Button variant="outline">Right</Button>
          </ButtonGroup>
        </ComponentDemo>
      </section>

      {/* With Text Buttons */}
      <section className="mb-12">
        <h2 id="text-buttons" className="text-xl font-black tracking-tight text-text mb-2">
          With Text Buttons
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Group standard buttons for related actions.
        </p>
        <CodeExample
          code={`<ButtonGroup aria-label="Clipboard actions">
  <Button variant="outline">Copy</Button>
  <Button variant="outline">Cut</Button>
  <Button variant="outline">Paste</Button>
</ButtonGroup>`}
        >
          <ButtonGroup aria-label="Clipboard actions">
            <Button variant="outline">Copy</Button>
            <Button variant="outline">Cut</Button>
            <Button variant="outline">Paste</Button>
          </ButtonGroup>
        </CodeExample>
      </section>

      {/* With Icon Buttons */}
      <section className="mb-12">
        <h2 id="icon-buttons" className="text-xl font-black tracking-tight text-text mb-2">
          With Icon Buttons
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Group icon buttons using o9con icons for compact toolbar controls like text alignment.
        </p>
        <CodeExample
          code={`<ButtonGroup aria-label="Text alignment">
  <IconButton variant="outline" icon={<O9Icon svg={alignLeftSvg} />} tooltip="Align left" aria-label="Align left" />
  <IconButton variant="outline" icon={<O9Icon svg={alignCenterSvg} />} tooltip="Align center" aria-label="Align center" />
  <IconButton variant="outline" icon={<O9Icon svg={alignRightSvg} />} tooltip="Align right" aria-label="Align right" />
</ButtonGroup>`}
        >
          <ButtonGroup aria-label="Text alignment">
            <IconButton variant="outline" icon={<O9Icon svg={alignLeftSvg} />} tooltip="Align left" aria-label="Align left" />
            <IconButton variant="outline" icon={<O9Icon svg={alignCenterSvg} />} tooltip="Align center" aria-label="Align center" />
            <IconButton variant="outline" icon={<O9Icon svg={alignRightSvg} />} tooltip="Align right" aria-label="Align right" />
          </ButtonGroup>
        </CodeExample>
      </section>

      {/* Vertical */}
      <section className="mb-12">
        <h2 id="vertical" className="text-xl font-black tracking-tight text-text mb-2">
          Vertical Orientation
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Stack buttons vertically for sidebar or panel layouts.
        </p>
        <CodeExample
          code={`<ButtonGroup orientation="vertical" aria-label="Options">
  <Button variant="outline">Option A</Button>
  <Button variant="outline">Option B</Button>
  <Button variant="outline">Option C</Button>
</ButtonGroup>`}
        >
          <ButtonGroup orientation="vertical" aria-label="Options">
            <Button variant="outline">Option A</Button>
            <Button variant="outline">Option B</Button>
            <Button variant="outline">Option C</Button>
          </ButtonGroup>
        </CodeExample>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">
          Size Tiers
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Button groups work across all four size tiers. Always use the same size for all buttons in a group.
        </p>
        <div className="border border-border bg-surface-overlay p-6 space-y-4">
          {['xm', 'sm', 'md', 'lg'].map((sz) => (
            <div key={sz} className="flex items-center gap-3">
              <span className="w-8 text-xs font-bold text-text-tertiary">{sz}</span>
              <ButtonGroup aria-label={`Alignment ${sz}`}>
                <IconButton size={sz} variant="outline" icon={<O9Icon svg={alignLeftSvg} />} tooltip="Align left" aria-label="Align left" />
                <IconButton size={sz} variant="outline" icon={<O9Icon svg={alignCenterSvg} />} tooltip="Align center" aria-label="Align center" />
                <IconButton size={sz} variant="outline" icon={<O9Icon svg={alignRightSvg} />} tooltip="Align right" aria-label="Align right" />
              </ButtonGroup>
            </div>
          ))}
        </div>
      </section>

      {/* Overflow */}
      <section className="mb-12">
        <h2 id="overflow" className="text-xl font-black tracking-tight text-text mb-2">
          Overflow
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          When there are too many actions to show, set the{' '}
          <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">overflow</code>{' '}
          prop to collapse extras behind an ellipsis icon button with a dropdown menu. The ellipsis icon
          automatically rotates to match the group orientation.
        </p>
        <CodeExample
          code={`<ButtonGroup overflow={3} aria-label="Toolbar">
  <Button variant="outline">Copy</Button>
  <Button variant="outline">Cut</Button>
  <Button variant="outline">Paste</Button>
  <Button variant="outline">Delete</Button>
  <Button variant="outline">Rename</Button>
  <Button variant="outline">Search</Button>
</ButtonGroup>`}
        >
          <ButtonGroup overflow={3} aria-label="Toolbar">
            <Button variant="outline" onClick={() => {}}>Copy</Button>
            <Button variant="outline" onClick={() => {}}>Cut</Button>
            <Button variant="outline" onClick={() => {}}>Paste</Button>
            <Button variant="outline" onClick={() => {}}>Delete</Button>
            <Button variant="outline" onClick={() => {}}>Rename</Button>
            <Button variant="outline" onClick={() => {}}>Search</Button>
          </ButtonGroup>
        </CodeExample>

        <div className="mt-6">
          <p className="text-sm text-text-secondary mb-3">
            Overflow with icon buttons:
          </p>
          <div className="border border-border bg-surface-overlay p-6">
            <ButtonGroup overflow={3} aria-label="Actions toolbar">
              <IconButton variant="outline" icon={<O9Icon svg={copySvg} />} tooltip="Copy" aria-label="Copy" onClick={() => {}} />
              <IconButton variant="outline" icon={<O9Icon svg={cutSvg} />} tooltip="Cut" aria-label="Cut" onClick={() => {}} />
              <IconButton variant="outline" icon={<O9Icon svg={pencilSvg} />} tooltip="Edit" aria-label="Edit" onClick={() => {}} />
              <IconButton variant="outline" icon={<O9Icon svg={binSvg} />} tooltip="Delete" aria-label="Delete" onClick={() => {}} />
              <IconButton variant="outline" icon={<O9Icon svg={searchSvg} />} tooltip="Search" aria-label="Search" onClick={() => {}} />
              <IconButton variant="outline" icon={<O9Icon svg={filterSvg} />} tooltip="Filter" aria-label="Filter" onClick={() => {}} />
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Toggle Single */}
      <section className="mb-12">
        <h2 id="toggle-single" className="text-xl font-black tracking-tight text-text mb-2">
          Toggle — Single Selection
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">toggle="single"</code> for
          radio-like behavior where only one button can be active at a time. Each child needs a{' '}
          <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">value</code> prop.
        </p>
        <CodeExample
          code={`const [alignment, setAlignment] = useState('left');

<ButtonGroup
  toggle="single"
  value={alignment}
  onValueChange={setAlignment}
  aria-label="Text alignment"
>
  <IconButton value="left" variant="outline" icon={<O9Icon svg={alignLeftSvg} />} tooltip="Align left" aria-label="Align left" />
  <IconButton value="center" variant="outline" icon={<O9Icon svg={alignCenterSvg} />} tooltip="Align center" aria-label="Align center" />
  <IconButton value="right" variant="outline" icon={<O9Icon svg={alignRightSvg} />} tooltip="Align right" aria-label="Align right" />
</ButtonGroup>`}
        >
          <ButtonGroup
            toggle="single"
            value={alignment}
            onValueChange={setAlignment}
            aria-label="Text alignment"
          >
            <IconButton value="left" variant="outline" icon={<O9Icon svg={alignLeftSvg} />} tooltip="Align left" aria-label="Align left" />
            <IconButton value="center" variant="outline" icon={<O9Icon svg={alignCenterSvg} />} tooltip="Align center" aria-label="Align center" />
            <IconButton value="right" variant="outline" icon={<O9Icon svg={alignRightSvg} />} tooltip="Align right" aria-label="Align right" />
          </ButtonGroup>
        </CodeExample>

        <div className="mt-6">
          <p className="text-sm text-text-secondary mb-3">
            Single toggle with text buttons:
          </p>
          <div className="border border-border bg-surface-overlay p-6">
            <ToggleSingleTextDemo />
          </div>
        </div>
      </section>

      {/* Toggle Multi */}
      <section className="mb-12">
        <h2 id="toggle-multi" className="text-xl font-black tracking-tight text-text mb-2">
          Toggle — Multi Selection
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">toggle="multi"</code> for
          checkbox-like behavior where multiple buttons can be active simultaneously.
        </p>
        <CodeExample
          code={`const [formatting, setFormatting] = useState(['bold']);

<ButtonGroup
  toggle="multi"
  value={formatting}
  onValueChange={setFormatting}
  aria-label="Text formatting"
>
  <IconButton value="bold" variant="outline" icon={<O9Icon svg={boldSvg} />} aria-label="Bold" />
  <IconButton value="italic" variant="outline" icon={<O9Icon svg={italicSvg} />} aria-label="Italic" />
  <IconButton value="underline" variant="outline" icon={<O9Icon svg={underlineSvg} />} aria-label="Underline" />
</ButtonGroup>`}
        >
          <ButtonGroup
            toggle="multi"
            value={formatting}
            onValueChange={setFormatting}
            aria-label="Text formatting"
          >
            <IconButton value="bold" variant="outline" icon={<O9Icon svg={boldSvg} />} aria-label="Bold" />
            <IconButton value="italic" variant="outline" icon={<O9Icon svg={italicSvg} />} aria-label="Italic" />
            <IconButton value="underline" variant="outline" icon={<O9Icon svg={underlineSvg} />} aria-label="Underline" />
          </ButtonGroup>
        </CodeExample>

        <div className="mt-6">
          <p className="text-sm text-text-secondary mb-3">
            Multi toggle with text buttons:
          </p>
          <div className="border border-border bg-surface-overlay p-6">
            <ToggleMultiTextDemo />
          </div>
        </div>
      </section>

      {/* Selection Variants */}
      <section className="mb-12">
        <h2 id="selection-variants" className="text-xl font-black tracking-tight text-text mb-2">
          Selection Variants
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          The <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">selectionVariant</code> prop
          controls how selected buttons appear. <strong>Primary</strong> (default) uses an outline highlight.{' '}
          <strong>Secondary</strong> uses a filled/solid highlight for stronger visual emphasis.
        </p>
        <CodeExample
          code={`{/* Primary (default) — outline selection */}
<ButtonGroup toggle="single" selectionVariant="primary" value={…} onValueChange={…}>
  …
</ButtonGroup>

{/* Secondary — filled selection */}
<ButtonGroup toggle="single" selectionVariant="secondary" value={…} onValueChange={…}>
  …
</ButtonGroup>`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-2xs font-bold text-text-tertiary uppercase tracking-wider">Primary (outline)</span>
              <SelectionVariantDemo variant="primary" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xs font-bold text-text-tertiary uppercase tracking-wider">Secondary (filled)</span>
              <SelectionVariantDemo variant="secondary" />
            </div>
          </div>
        </CodeExample>

        <div className="mt-6">
          <p className="text-sm text-text-secondary mb-3">
            Secondary variant with multi toggle:
          </p>
          <div className="border border-border bg-surface-overlay p-6">
            <SelectionVariantMultiDemo />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-text-secondary mb-3">
            Secondary variant with text buttons:
          </p>
          <div className="border border-border bg-surface-overlay p-6">
            <SelectionVariantTextDemo />
          </div>
        </div>
      </section>

      {/* Disabled States */}
      <section className="mb-12">
        <h2 id="disabled" className="text-xl font-black tracking-tight text-text mb-2">
          Disabled States
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Disable the entire group with the{' '}
          <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">disabled</code>{' '}
          prop, or disable individual buttons via their own{' '}
          <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">disabled</code>{' '}
          prop.
        </p>
        <CodeExample
          code={`{/* Entire group disabled */}
<ButtonGroup disabled aria-label="Actions">
  <Button variant="outline">Copy</Button>
  <Button variant="outline">Cut</Button>
  <Button variant="outline">Paste</Button>
</ButtonGroup>

{/* Individual button disabled */}
<ButtonGroup aria-label="Actions">
  <Button variant="outline">Copy</Button>
  <Button variant="outline" disabled>Cut</Button>
  <Button variant="outline">Paste</Button>
</ButtonGroup>`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-2xs font-bold text-text-tertiary uppercase tracking-wider">Entire group disabled</span>
              <ButtonGroup disabled aria-label="Disabled actions">
                <Button variant="outline">Copy</Button>
                <Button variant="outline">Cut</Button>
                <Button variant="outline">Paste</Button>
              </ButtonGroup>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xs font-bold text-text-tertiary uppercase tracking-wider">Individual button disabled</span>
              <ButtonGroup aria-label="Partial disabled actions">
                <Button variant="outline">Copy</Button>
                <Button variant="outline" disabled>Cut</Button>
                <Button variant="outline">Paste</Button>
              </ButtonGroup>
            </div>
          </div>
        </CodeExample>

        <div className="mt-6">
          <p className="text-sm text-text-secondary mb-3">
            Disabled with toggle:
          </p>
          <div className="border border-border bg-surface-overlay p-6 flex flex-wrap gap-6">
            <DisabledToggleDemo />
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">
          Usage Guidelines
        </h2>
        <DoDont
          doItems={[
            'Group buttons that share a common context or control related options',
            'Use the same variant for all buttons in a group for visual consistency',
            'Use the same size for all buttons in a group',
            'Use icon-only groups with o9con icons for toolbar controls with limited space',
            'Use toggle="single" for mutually exclusive options like alignment',
            'Use toggle="multi" for independent options like text formatting',
            'Use overflow to collapse large button sets in compact layouts',
            'Use selectionVariant="secondary" when the selected state needs strong visual emphasis',
          ]}
          dontItems={[
            'Do not mix primary and danger variants in the same group',
            'Avoid placing more than 5 visible buttons without using overflow',
            'Do not group unrelated actions together',
            'Avoid mixing text and icon-only buttons in the same group',
            'Do not use toggle without providing value and onValueChange',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">
          Accessibility
        </h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>The container uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="group"</code> for standard groups and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="toolbar"</code> for toggle groups.</>,
            <>The <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-orientation</code> attribute reflects the layout direction.</>,
            <>Toggle buttons receive <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-pressed="true"</code> or <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">"false"</code> to communicate state.</>,
            'In toggle mode, roving tabindex ensures only one button is tabbable — Arrow keys move focus between buttons, Home/End jump to first/last.',
            'Each button remains independently focusable via keyboard.',
            <>The overflow ellipsis button uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-haspopup="menu"</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-expanded</code> for menu disclosure.</>,
            'Escape key closes the overflow dropdown menu.',
            <>Add an <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code> to the group container to describe the group purpose.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">
          API Reference
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          ButtonGroup is a layout wrapper. Child buttons retain all their own props. For toggle mode, add a{' '}
          <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">value</code> prop to each child.
        </p>
        <PropsTable props={buttonGroupProps} />
      </section>
    </article>
  );
}

/* ─────────────────────────────────────────────
   Toggle Single — Text button demo
   ───────────────────────────────────────────── */
function ToggleSingleTextDemo() {
  const [view, setView] = useState('grid');
  return (
    <ButtonGroup toggle="single" value={view} onValueChange={setView} aria-label="View mode">
      <Button variant="outline" value="list">List</Button>
      <Button variant="outline" value="grid">Grid</Button>
      <Button variant="outline" value="table">Table</Button>
    </ButtonGroup>
  );
}

/* ─────────────────────────────────────────────
   Toggle Multi — Text button demo
   ───────────────────────────────────────────── */
function ToggleMultiTextDemo() {
  const [filters, setFilters] = useState(['active']);
  return (
    <ButtonGroup toggle="multi" value={filters} onValueChange={setFilters} aria-label="Status filters">
      <Button variant="outline" value="active">Active</Button>
      <Button variant="outline" value="pending">Pending</Button>
      <Button variant="outline" value="archived">Archived</Button>
    </ButtonGroup>
  );
}

/* ─────────────────────────────────────────────
   Selection Variant — Single toggle demo
   ───────────────────────────────────────────── */
function SelectionVariantDemo({ variant }) {
  const [selected, setSelected] = useState('left');
  return (
    <ButtonGroup
      toggle="single"
      selectionVariant={variant}
      value={selected}
      onValueChange={setSelected}
      aria-label={`Alignment (${variant})`}
    >
      <IconButton value="left" variant="outline" icon={<O9Icon svg={alignLeftSvg} />} tooltip="Align left" aria-label="Align left" />
      <IconButton value="center" variant="outline" icon={<O9Icon svg={alignCenterSvg} />} tooltip="Align center" aria-label="Align center" />
      <IconButton value="right" variant="outline" icon={<O9Icon svg={alignRightSvg} />} tooltip="Align right" aria-label="Align right" />
    </ButtonGroup>
  );
}

/* ─────────────────────────────────────────────
   Selection Variant — Multi toggle demo
   ───────────────────────────────────────────── */
function SelectionVariantMultiDemo() {
  const [fmt, setFmt] = useState(['bold']);
  return (
    <ButtonGroup
      toggle="multi"
      selectionVariant="secondary"
      value={fmt}
      onValueChange={setFmt}
      aria-label="Text formatting (secondary)"
    >
      <IconButton value="bold" variant="outline" icon={<O9Icon svg={boldSvg} />} aria-label="Bold" />
      <IconButton value="italic" variant="outline" icon={<O9Icon svg={italicSvg} />} aria-label="Italic" />
      <IconButton value="underline" variant="outline" icon={<O9Icon svg={underlineSvg} />} aria-label="Underline" />
    </ButtonGroup>
  );
}

/* ─────────────────────────────────────────────
   Selection Variant — Text button demo
   ───────────────────────────────────────────── */
function SelectionVariantTextDemo() {
  const [view, setView] = useState('grid');
  return (
    <ButtonGroup
      toggle="single"
      selectionVariant="secondary"
      value={view}
      onValueChange={setView}
      aria-label="View mode (secondary)"
    >
      <Button variant="outline" value="list">List</Button>
      <Button variant="outline" value="grid">Grid</Button>
      <Button variant="outline" value="table">Table</Button>
    </ButtonGroup>
  );
}

/* ─────────────────────────────────────────────
   Disabled Toggle demo
   ───────────────────────────────────────────── */
function DisabledToggleDemo() {
  const [sel, setSel] = useState('left');
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-2xs font-bold text-text-tertiary uppercase tracking-wider">Toggle group disabled</span>
        <ButtonGroup
          toggle="single"
          disabled
          value={sel}
          onValueChange={setSel}
          aria-label="Disabled toggle"
        >
          <IconButton value="left" variant="outline" icon={<O9Icon svg={alignLeftSvg} />} tooltip="Align left" aria-label="Align left" />
          <IconButton value="center" variant="outline" icon={<O9Icon svg={alignCenterSvg} />} tooltip="Align center" aria-label="Align center" />
          <IconButton value="right" variant="outline" icon={<O9Icon svg={alignRightSvg} />} tooltip="Align right" aria-label="Align right" />
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-2xs font-bold text-text-tertiary uppercase tracking-wider">Individual button disabled</span>
        <ButtonGroup
          toggle="single"
          value="left"
          onValueChange={() => {}}
          aria-label="Partial disabled toggle"
        >
          <IconButton value="left" variant="outline" icon={<O9Icon svg={alignLeftSvg} />} tooltip="Align left" aria-label="Align left" />
          <IconButton value="center" variant="outline" disabled icon={<O9Icon svg={alignCenterSvg} />} tooltip="Align center" aria-label="Align center" />
          <IconButton value="right" variant="outline" icon={<O9Icon svg={alignRightSvg} />} tooltip="Align right" aria-label="Align right" />
        </ButtonGroup>
      </div>
    </div>
  );
}
