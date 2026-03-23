import { useState } from 'react';
import TextEditor from '@/components/inputs/TextEditor';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const textEditorProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant affecting toolbar elements and content area padding/text' },
  { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Validation status with matching border and message styling' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Optional label above the editor using the Label component' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Show required (*) indicator on the label' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Show (optional) indicator on the label' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text shown below the editor' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown when status is "error"' },
  { name: 'value', type: 'string', default: "''", description: 'Controlled HTML content of the editor' },
  { name: 'onChange', type: '(html: string) => void', default: 'undefined', description: 'Called when content changes' },
  { name: 'placeholder', type: 'string', default: "'Start typing...'", description: 'Placeholder text when the editor is empty' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the entire editor including the toolbar' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Show content without toolbar, not editable' },
  { name: 'minHeight', type: 'number', default: '200', description: 'Minimum height of the editing area in pixels' },
  { name: 'fontFamilies', type: 'Array<{value, label}>', default: 'default list', description: 'Custom font family options for the font dropdown' },
];

export default function TextEditorPage() {
  /* ── Interactive Demo state ── */
  const [demoContent, setDemoContent] = useState('');
  const [demoSize, setDemoSize] = useState('md');
  const [demoStatus, setDemoStatus] = useState('default');
  const [demoDisabled, setDemoDisabled] = useState(false);
  const [demoReadOnly, setDemoReadOnly] = useState(false);
  const [demoLabel, setDemoLabel] = useState(true);

  return (
    <div className="space-y-12">
      <PageHeader
        title="Text Editor"
        description="A rich text editor with a full-featured formatting toolbar. Includes font family selection, font size, bold/italic/underline/strikethrough, text and background color pickers, alignment options, and an overflow menu for lists, indentation, links, and more."
        status="stable"
        category="Input & Form Controls"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 className="text-lg font-semibold text-text mb-4">Interactive Demo</h2>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Size',
              value: demoSize,
              onChange: setDemoSize,
              options: ['sm', 'md', 'lg'],
            },
            {
              type: 'select',
              label: 'Status',
              value: demoStatus,
              onChange: setDemoStatus,
              options: ['default', 'error', 'warning'],
            },
            { type: 'checkbox', label: 'Label', checked: demoLabel, onChange: setDemoLabel },
            { type: 'checkbox', label: 'Disabled', checked: demoDisabled, onChange: setDemoDisabled },
            { type: 'checkbox', label: 'Read Only', checked: demoReadOnly, onChange: setDemoReadOnly },
          ]}
        >
          <div className="max-w-2xl">
            <TextEditor
              size={demoSize}
              status={demoStatus}
              value={demoContent}
              onChange={setDemoContent}
              disabled={demoDisabled}
              readOnly={demoReadOnly}
              label={demoLabel ? 'Description' : undefined}
              helperText={demoStatus === 'default' ? 'Format your text using the toolbar above.' : undefined}
              errorText={demoStatus === 'error' ? 'This field is required.' : undefined}
              minHeight={150}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* ── Sizes ── */}
      <section>
        <h2 className="text-lg font-semibold text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three size variants control the toolbar element sizes and content area text/padding: <strong>sm</strong>, <strong>md</strong>, <strong>lg</strong>.
        </p>
        <CodeExample
          title="Sizes"
          code={`<TextEditor size="sm" label="Small" minHeight={80} />
<TextEditor size="md" label="Medium" minHeight={100} />
<TextEditor size="lg" label="Large" minHeight={100} />`}
        >
          <div className="space-y-6 max-w-2xl">
            {['sm', 'md', 'lg'].map((s) => (
              <TextEditor
                key={s}
                size={s}
                label={s === 'sm' ? 'Small' : s === 'md' ? 'Medium' : 'Large'}
                onChange={() => {}}
                minHeight={s === 'sm' ? 80 : 100}
                placeholder={`${s} size editor...`}
              />
            ))}
          </div>
        </CodeExample>
      </section>

      {/* ── Toolbar Features ── */}
      <section>
        <h2 className="text-lg font-semibold text-text mb-2">Toolbar Features</h2>
        <p className="text-sm text-text-secondary mb-4">
          The toolbar is organized into logical groups separated by subtle vertical dividers:
        </p>
        <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 mb-4">
          <li><strong>Font Family</strong> — SelectDropdown for choosing typeface</li>
          <li><strong>Font Size</strong> — NumberInput (8–120px range) for precise sizing</li>
          <li><strong>Text Formatting</strong> — Bold, Italic, Underline, Strikethrough toggle buttons</li>
          <li><strong>Colors</strong> — Background and Font color pickers with full color spectrum</li>
          <li><strong>Alignment</strong> — Dropdown for Left, Center, Right, Justify</li>
          <li><strong>More Options</strong> — Overflow menu for lists, indent, links, quotes, code</li>
        </ul>
      </section>

      {/* ── Validation States ── */}
      <section>
        <h2 className="text-lg font-semibold text-text mb-2">Validation States</h2>
        <p className="text-sm text-text-secondary mb-4">
          Supports <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">default</code>, <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">error</code>, and <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">warning</code> statuses with matching border colors and message text.
        </p>
        <CodeExample
          title="Validation States"
          code={`<TextEditor status="error" errorText="This field is required." />
<TextEditor status="warning" helperText="Content may be too long." />`}
        >
          <div className="space-y-6 max-w-2xl">
            <TextEditor
              label="Error State"
              status="error"
              errorText="This field is required."
              onChange={() => {}}
              minHeight={80}
              placeholder="Required field..."
            />
            <TextEditor
              label="Warning State"
              status="warning"
              helperText="Content may be too long."
              onChange={() => {}}
              minHeight={80}
              placeholder="Keep it concise..."
            />
          </div>
        </CodeExample>
      </section>

      {/* ── With Label ── */}
      <section>
        <h2 className="text-lg font-semibold text-text mb-2">With Label</h2>
        <p className="text-sm text-text-secondary mb-4">
          The Label component supports <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">required</code> and <code className="text-xs bg-surface-sunken px-1 py-0.5 rounded">optional</code> indicators.
        </p>
        <CodeExample
          title="Required & Optional"
          code={`<TextEditor label="Notes" required />
<TextEditor label="Comments" optional />`}
        >
          <div className="space-y-6 max-w-2xl">
            <TextEditor label="Notes" required onChange={() => {}} minHeight={80} />
            <TextEditor label="Comments" optional onChange={() => {}} minHeight={80} />
          </div>
        </CodeExample>
      </section>

      {/* ── Disabled & Read-only ── */}
      <section>
        <h2 className="text-lg font-semibold text-text mb-2">Disabled & Read-only</h2>
        <p className="text-sm text-text-secondary mb-4">
          <strong>Disabled</strong> grays out the entire editor including toolbar. <strong>Read-only</strong> hides the toolbar and makes content non-editable with a dashed border.
        </p>
        <CodeExample
          title="Disabled & Read-only"
          code={`<TextEditor label="Disabled" disabled />
<TextEditor label="Read Only" readOnly value="<p>This content cannot be edited.</p>" />`}
        >
          <div className="space-y-6 max-w-2xl">
            <TextEditor
              label="Disabled"
              disabled
              minHeight={80}
              placeholder="Editor is disabled"
            />
            <TextEditor
              label="Read Only"
              readOnly
              value="<p>This content cannot be edited.</p>"
              minHeight={80}
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 className="text-lg font-semibold text-text mb-4">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use for multi-line rich text content requiring formatting (bold, colors, fonts)',
            'Provide a label for accessibility and context',
            'Use validation states to give feedback on content requirements',
            'Use the appropriate size to match surrounding UI density',
          ]}
          dontItems={[
            'Do not use for plain text input — use Textarea instead',
            'Do not use for code editing — use a dedicated code editor',
            'Avoid using the small (sm) size for content-heavy editors',
          ]}
        />
      </section>

      {/* ── Keyboard Navigation ── */}
      <section>
        <h2 className="text-lg font-semibold text-text mb-4">Keyboard Navigation</h2>
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
                <td className="py-2 pr-4 font-mono text-xs">Ctrl/⌘ + B</td>
                <td className="py-2">Toggle bold</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Ctrl/⌘ + I</td>
                <td className="py-2">Toggle italic</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Ctrl/⌘ + U</td>
                <td className="py-2">Toggle underline</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Tab</td>
                <td className="py-2">Navigate between toolbar controls</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">Escape</td>
                <td className="py-2">Close open dropdowns</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 className="text-lg font-semibold text-text mb-4">API Reference</h2>
        <PropsTable props={textEditorProps} />
      </section>
    </div>
  );
}
