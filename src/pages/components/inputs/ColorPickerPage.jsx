import { useState } from 'react';
import ColorPicker from '@/components/inputs/ColorPicker';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const colorPickerProps = [
  { name: 'variant', type: "'icon' | 'font' | 'background' | 'element'", default: "'background'", description: 'Trigger icon variant — determines the icon displayed on the trigger button' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Trigger size: sm (24px), md (32px), lg (36px)' },
  { name: 'value', type: 'string', default: "''", description: 'Selected hex color (e.g. "#FF1E39"). Empty string for no color.' },
  { name: 'opacity', type: 'number', default: '100', description: 'Opacity value (0–100)' },
  { name: 'onChange', type: '(color: string, opacity: number) => void', default: 'undefined', description: 'Called when the selected color or opacity changes' },
  { name: 'showOpacity', type: 'boolean', default: 'true', description: 'Show opacity slider and input in the Custom tab' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Optional label text above the trigger' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Show required (*) indicator on the label' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Show (optional) indicator on the label' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the color picker' },
];

export default function ColorPickerPage() {
  /* ── Interactive Demo state ── */
  const [demoColor, setDemoColor] = useState('#0037FF');
  const [demoOpacity, setDemoOpacity] = useState(100);
  const [demoVariant, setDemoVariant] = useState('background');
  const [demoSize, setDemoSize] = useState('md');
  const [demoShowOpacity, setDemoShowOpacity] = useState(true);
  const [demoDisabled, setDemoDisabled] = useState(false);
  const [demoLabel, setDemoLabel] = useState(true);

  /* ── Section state ── */
  const [variantColors, setVariantColors] = useState({
    icon: '#7433CC',
    font: '#FF1E39',
    background: '#00C278',
    element: '#0037FF',
  });

  const [sizeColor, setSizeColor] = useState('#E39600');
  const [noColorValue, setNoColorValue] = useState('');
  const [opacityColor, setOpacityColor] = useState('#FF7311');
  const [opacityVal, setOpacityVal] = useState(75);

  return (
    <article className="space-y-12">
      <PageHeader
        title="Color Picker"
        description="An icon-only dropdown button that opens a color selection panel. Supports a Brand Palette with the complete o9ds color spectrum and a Custom tab with HSV spectrum picker, hex/RGB inputs, and opacity control."
        status="stable"
        category="Input & Form Controls"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 id="demo" className="text-lg font-semibold text-text mb-4">Interactive Demo</h2>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Variant',
              value: demoVariant,
              onChange: setDemoVariant,
              options: ['icon', 'font', 'background', 'element'],
            },
            {
              type: 'select',
              label: 'Size',
              value: demoSize,
              onChange: setDemoSize,
              options: ['sm', 'md', 'lg'],
            },
            { type: 'checkbox', label: 'Show Opacity', checked: demoShowOpacity, onChange: setDemoShowOpacity },
            { type: 'checkbox', label: 'Disabled', checked: demoDisabled, onChange: setDemoDisabled },
            { type: 'checkbox', label: 'Label', checked: demoLabel, onChange: setDemoLabel },
          ]}
        >
          <div className="flex items-end gap-6">
            <ColorPicker
              variant={demoVariant}
              size={demoSize}
              value={demoColor}
              opacity={demoOpacity}
              onChange={(color, op) => { setDemoColor(color); setDemoOpacity(op); }}
              showOpacity={demoShowOpacity}
              disabled={demoDisabled}
              label={demoLabel ? 'Color' : undefined}
            />
            <div className="text-xs text-text-tertiary tabular-nums">
              {demoColor ? `${demoColor} — ${demoOpacity}%` : 'No color'}
            </div>
          </div>
        </ComponentDemo>
      </section>

      {/* ── Variants ── */}
      <section>
        <h2 id="variants" className="text-lg font-semibold text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Four icon variants indicate what the color is being applied to. The trigger icon changes based on the <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">variant</code> prop.
        </p>
        <CodeExample
          title="Variants"
          code={`<ColorPicker variant="icon" label="Icon Color" />
<ColorPicker variant="font" label="Font Color" />
<ColorPicker variant="background" label="Background" />
<ColorPicker variant="element" label="Element" />`}
        >
          <div className="flex items-end gap-6">
            {['icon', 'font', 'background', 'element'].map((v) => (
              <ColorPicker
                key={v}
                variant={v}
                value={variantColors[v]}
                onChange={(color) => setVariantColors((prev) => ({ ...prev, [v]: color }))}
                label={v === 'icon' ? 'Icon Color' : v === 'font' ? 'Font Color' : v === 'background' ? 'Background' : 'Element'}
              />
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ── Sizes ── */}
      <section>
        <h2 id="sizes" className="text-lg font-semibold text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three sizes matching the DropdownButton icon-only sizing: <strong>sm</strong> (24 px), <strong>md</strong> (32 px), <strong>lg</strong> (36 px).
        </p>
        <CodeExample
          title="Sizes"
          code={`<ColorPicker size="sm" />
<ColorPicker size="md" />
<ColorPicker size="lg" />`}
        >
          <div className="flex items-end gap-6">
            {['sm', 'md', 'lg'].map((s) => (
              <ColorPicker
                key={s}
                size={s}
                value={sizeColor}
                onChange={(color) => setSizeColor(color)}
                label={s}
              />
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ── No Color State ── */}
      <section>
        <h2 id="no-color" className="text-lg font-semibold text-text mb-2">No Color State</h2>
        <p className="text-sm text-text-secondary mb-4">
          When no color is selected, the trigger displays a red ban icon. Use the "No Color" button in the dropdown panel to clear the selection.
        </p>
        <CodeExample
          title="No Color"
          code={`<ColorPicker value="" label="Clear Me" />`}
        >
          <ColorPicker
            value={noColorValue}
            onChange={(color) => setNoColorValue(color)}
            label="Clear Me"
          />
        </CodeExample>
      </section>

      {/* ── With Opacity ── */}
      <section>
        <h2 id="opacity" className="text-lg font-semibold text-text mb-2">With Opacity</h2>
        <p className="text-sm text-text-secondary mb-4">
          The Custom tab includes an opacity slider and number input when <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">showOpacity</code> is enabled (default). Set <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">showOpacity=false</code> to hide it.
        </p>
        <CodeExample
          title="Opacity"
          code={`<ColorPicker value="#FF7311" opacity={75} showOpacity />`}
        >
          <div className="flex items-end gap-6">
            <ColorPicker
              value={opacityColor}
              opacity={opacityVal}
              onChange={(color, op) => { setOpacityColor(color); setOpacityVal(op); }}
              label="With Opacity"
            />
            <div className="text-xs text-text-tertiary tabular-nums">
              {opacityColor} — {opacityVal}%
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Required & Optional ── */}
      <section>
        <h2 id="required" className="text-lg font-semibold text-text mb-2">Required & Optional</h2>
        <p className="text-sm text-text-secondary mb-4">
          The Label component supports <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">required</code> and <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">optional</code> indicators.
        </p>
        <CodeExample
          title="Required & Optional"
          code={`<ColorPicker label="Fill Color" required />
<ColorPicker label="Accent" optional />`}
        >
          <div className="flex items-end gap-6">
            <ColorPicker value="#FF1E39" label="Fill Color" required />
            <ColorPicker value="#00C278" label="Accent" optional />
          </div>
        </CodeExample>
      </section>

      {/* ── Disabled ── */}
      <section>
        <h2 id="disabled" className="text-lg font-semibold text-text mb-2">Disabled</h2>
        <CodeExample
          title="Disabled"
          code={`<ColorPicker value="#0037FF" label="Disabled" disabled />`}
        >
          <ColorPicker value="#0037FF" label="Disabled" disabled />
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-lg font-semibold text-text mb-4">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use the variant prop to indicate what the color applies to (icon, font, background, element)',
            'Provide a label for accessibility and clarity',
            'Use the Brand Palette tab for consistent design-system colors',
            'Use the Custom tab for precise color selection with hex/RGB inputs',
          ]}
          dontItems={[
            'Do not use ColorPicker for selecting from a small set of predefined options — use a SelectDropdown instead',
            'Avoid hiding the opacity control when users need transparency support',
            'Do not use the same variant for different purposes in the same context',
          ]}
        />
      </section>

      {/* ── Keyboard Navigation ── */}
      <section>
        <h2 id="keyboard" className="text-lg font-semibold text-text mb-4">Keyboard Navigation</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="py-2 pr-4 font-medium">Key</th>
                <th className="py-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Click / Enter / Space</td>
                <td className="py-2">Open or close the color panel</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Escape</td>
                <td className="py-2">Close the panel and return focus to the trigger</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Tab</td>
                <td className="py-2">Navigate between controls inside the panel</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-4">API Reference</h2>
        <PropsTable props={colorPickerProps} />
      </section>
    </article>
  );
}
