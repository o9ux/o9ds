import { useState } from 'react';
import FileInput from '@/components/inputs/FileInput';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const fileInputProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height variant — sm (24px), md (32px), lg (40px)' },
  { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Validation status — controls border color and message styling' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text rendered above the field via the Label component' },
  { name: 'labelRequired', type: 'boolean', default: 'false', description: 'Shows a red asterisk (*) after the label' },
  { name: 'labelOptional', type: 'boolean', default: 'false', description: 'Shows "(optional)" after the label' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text below the field in non-error states' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown when status="error"' },
  { name: 'accept', type: 'string', default: 'undefined', description: 'Accepted file types for the native file dialog (e.g. ".pdf,.doc" or "image/*")' },
  { name: 'allowedExtensions', type: 'string[]', default: 'undefined', description: 'Allowlist of file extensions (e.g. ["pdf", "doc"]). Rejects files not in the list.' },
  { name: 'excludedExtensions', type: 'string[]', default: 'undefined', description: 'Blocklist of file extensions (e.g. ["exe", "bat"]). Rejects files matching any entry.' },
  { name: 'onReject', type: '(info) => void', default: 'undefined', description: 'Called when a file is rejected due to extension validation. Receives { name, extension, reason }.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the field is disabled' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the field is read-only (dashed border, no buttons)' },
  { name: 'placeholder', type: 'string', default: "'Choose or drop a file…'", description: 'Placeholder text when no file is selected' },
  { name: 'onChange', type: '(info | null) => void', default: 'undefined', description: 'Called with { name, extension, file?, path? } on selection or null on clear' },
  { name: 'className', type: 'string', default: "''", description: 'Applied to the outer wrapper div' },
];

export default function FileInputPage() {
  const [size, setSize] = useState('md');
  const [status, setStatus] = useState('default');
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [demoFile, setDemoFile] = useState(null);

  return (
    <article className="space-y-12">
      <PageHeader
        title="File Input"
        description="File selection field with Textbox-style bottom-border styling. Supports file dialog, paste path/link, and drag & drop. Shows a custom file icon with the extension in CAPS after selection."
        status="stable"
        category="Input & Form Controls"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">
          Try selecting a file via the upload button, typing a path and pressing Enter, or dragging a file onto the input.
        </p>
        <ComponentDemo
          controls={[
            { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
            { type: 'select', label: 'Status', value: status, onChange: setStatus, options: ['default', 'error', 'warning'] },
            { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
            { type: 'checkbox', label: 'Read-only', value: readOnly, onChange: setReadOnly },
          ]}
        >
          <div className="w-full max-w-lg">
            <FileInput
              size={size}
              status={status}
              disabled={disabled}
              readOnly={readOnly}
              label="Upload Document"
              labelRequired
              helperText="Accepted formats: PDF, DOC, DOCX"
              errorText="Please select a valid file."
              onChange={setDemoFile}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* ── Sizes ── */}
      <section>
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three height variants matching Textbox — sm (24px), md (32px), lg (40px). The upload button is always a perfect square.
        </p>
        <CodeExample code={`<FileInput size="sm" placeholder="Small (24px)" />\n<FileInput size="md" placeholder="Medium (32px)" />\n<FileInput size="lg" placeholder="Large (40px)" />`}>
          <div className="space-y-4 w-full max-w-lg">
            <FileInput size="sm" placeholder="Small (24px)" />
            <FileInput size="md" placeholder="Medium (32px)" />
            <FileInput size="lg" placeholder="Large (40px)" />
          </div>
        </CodeExample>
      </section>

      {/* ── With Label ── */}
      <section>
        <h2 id="label" className="text-xl font-black tracking-tight text-text mb-2">With Label</h2>
        <p className="text-sm text-text-secondary mb-4">
          Uses the Label component with optional required/optional indicators.
        </p>
        <CodeExample code={`<FileInput label="Attachment" labelRequired />\n<FileInput label="Cover Image" labelOptional />`}>
          <div className="space-y-4 w-full max-w-lg">
            <FileInput label="Attachment" labelRequired />
            <FileInput label="Cover Image" labelOptional />
          </div>
        </CodeExample>
      </section>

      {/* ── Validation States ── */}
      <section>
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">Validation States</h2>
        <p className="text-sm text-text-secondary mb-4">
          Error and warning states show colored borders and status icons before the message text, matching Textbox behavior.
        </p>
        <CodeExample code={`<FileInput status="default" label="Default" helperText="Select a file to upload" />\n<FileInput status="error" label="Error" errorText="File is required" />\n<FileInput status="warning" label="Warning" helperText="File exceeds recommended size" />`}>
          <div className="space-y-4 w-full max-w-lg">
            <FileInput status="default" label="Default" helperText="Select a file to upload" />
            <FileInput status="error" label="Error" errorText="File is required" />
            <FileInput status="warning" label="Warning" helperText="File exceeds recommended size" />
          </div>
        </CodeExample>
      </section>

      {/* ── Disabled & Read-only ── */}
      <section>
        <h2 id="disabled-readonly" className="text-xl font-black tracking-tight text-text mb-2">Disabled & Read-only</h2>
        <p className="text-sm text-text-secondary mb-4">
          Disabled fields are non-interactive and visually muted. Read-only fields use a dashed bottom border and hide action buttons.
        </p>
        <CodeExample code={`<FileInput disabled label="Disabled" placeholder="Cannot interact" />\n<FileInput readOnly label="Read-only" placeholder="View-only" />`}>
          <div className="space-y-4 w-full max-w-lg">
            <FileInput disabled label="Disabled" placeholder="Cannot interact" />
            <FileInput readOnly label="Read-only" placeholder="View-only" />
          </div>
        </CodeExample>
      </section>

      {/* ── Accept Filter ── */}
      <section>
        <h2 id="accept" className="text-xl font-black tracking-tight text-text mb-2">Accept Filter</h2>
        <p className="text-sm text-text-secondary mb-4">
          Restrict the file types available in the native file dialog.
        </p>
        <CodeExample code={`<FileInput accept="image/*" label="Image" placeholder="Choose image…" />\n<FileInput accept=".pdf,.doc,.docx" label="Document" placeholder="Choose document…" />`}>
          <div className="space-y-4 w-full max-w-lg">
            <FileInput accept="image/*" label="Image" placeholder="Choose image…" />
            <FileInput accept=".pdf,.doc,.docx" label="Document" placeholder="Choose document…" />
          </div>
        </CodeExample>
      </section>

      {/* ── Allowed Extensions ── */}
      <section>
        <h2 id="allowed-extensions" className="text-xl font-black tracking-tight text-text mb-2">Allowed Extensions</h2>
        <p className="text-sm text-text-secondary mb-4">
          Restrict to specific file extensions. Files not in the list are rejected and trigger <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">onReject</code>.
        </p>
        <CodeExample code={`<FileInput\n  label="Spreadsheet"\n  allowedExtensions={['xlsx', 'csv', 'xls']}\n  helperText="Only .xlsx, .csv, .xls files"\n  onReject={(info) => console.warn(info.name + ' is not allowed')}\n/>`}>
          <div className="w-full max-w-lg">
            <FileInput
              label="Spreadsheet"
              allowedExtensions={['xlsx', 'csv', 'xls']}
              helperText="Only .xlsx, .csv, .xls files"
              onReject={(info) => console.warn(info.name + ' is not allowed')}
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Excluded Extensions ── */}
      <section>
        <h2 id="excluded-extensions" className="text-xl font-black tracking-tight text-text mb-2">Excluded Extensions</h2>
        <p className="text-sm text-text-secondary mb-4">
          Block specific file extensions. Files matching the blocklist are rejected.
        </p>
        <CodeExample code={`<FileInput\n  label="Safe Upload"\n  excludedExtensions={['exe', 'bat', 'cmd', 'msi']}\n  helperText="Executable files are not allowed"\n  onReject={(info) => console.warn(info.name + ' is blocked')}\n/>`}>
          <div className="w-full max-w-lg">
            <FileInput
              label="Safe Upload"
              excludedExtensions={['exe', 'bat', 'cmd', 'msi']}
              helperText="Executable files are not allowed"
              onReject={(info) => console.warn(info.name + ' is blocked')}
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Always pair with a visible label for accessibility',
            'Use helperText to communicate accepted file types or size limits',
            'Use accept prop to filter file types in the native dialog',
            'Use status="error" with errorText for validation failures',
            'Use for single file selection — for multi-file or large uploads, use the Upload component',
          ]}
          dontItems={[
            'Do not use for drag-and-drop-only upload zones — use Upload/Dropzone instead',
            'Avoid hiding the filename after selection',
            'Do not forget error states for required file inputs',
            'Avoid using size="lg" in dense forms — prefer md for most contexts',
          ]}
        />
      </section>

      {/* ── Keyboard Navigation ── */}
      <section>
        <h2 id="keyboard" className="text-xl font-black tracking-tight text-text mb-2">Keyboard Navigation</h2>
        <div className="mt-4 overflow-x-auto border border-border">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                <th className="whitespace-nowrap px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Key</th>
                <th className="px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="px-4 py-2.5"><kbd className="bg-surface-raised px-1.5 py-0.5 border border-border text-[10px] font-mono">Tab</kbd></td><td className="px-4 py-2.5 text-text-secondary">Move focus between input, delete button, and upload button</td></tr>
              <tr><td className="px-4 py-2.5"><kbd className="bg-surface-raised px-1.5 py-0.5 border border-border text-[10px] font-mono">Enter</kbd></td><td className="px-4 py-2.5 text-text-secondary">Submit typed path / activate focused button</td></tr>
              <tr><td className="px-4 py-2.5"><kbd className="bg-surface-raised px-1.5 py-0.5 border border-border text-[10px] font-mono">Space</kbd></td><td className="px-4 py-2.5 text-text-secondary">Activate focused button (upload or delete)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses a visible <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Label</code> component connected via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">htmlFor</code>.</>,
            <>Container has <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="group"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code>.</>,
            <>Trailing buttons have descriptive <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code> attributes ("Browse files", "Remove file").</>,
            <>Button toolbar uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="toolbar"</code> for screen reader context.</>,
            <>Helper/error text linked via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-describedby</code> on the text input.</>,
            <>File icon is decorative (<code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-hidden="true"</code>).</>,
            <>Focus ring visible on all interactive elements via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">focus-visible</code>.</>,
            'Disabled and read-only states use native HTML attributes.',
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
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <p className="text-sm text-text-secondary mb-4">
          All standard HTML <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">&lt;input&gt;</code> attributes are forwarded to the underlying text input element.
        </p>
        <PropsTable props={fileInputProps} />
      </section>
    </article>
  );
}
