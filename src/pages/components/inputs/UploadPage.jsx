import { useState, useRef, useCallback } from 'react';
import Upload from '@/components/inputs/Upload';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const uploadProps = [
  { name: 'size', type: "'sm' | 'lg'", default: "'lg'", description: "Layout variant — sm (compact horizontal) or lg (full vertical drop zone)" },
  { name: 'label', type: 'string', default: 'undefined', description: 'Optional label text rendered above the component via the Label component. Omit to render without a label.' },
  { name: 'labelRequired', type: 'boolean', default: 'false', description: 'Shows a red asterisk (*) after the label' },
  { name: 'labelOptional', type: 'boolean', default: 'false', description: 'Shows "(optional)" after the label' },
  { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Validation status — controls border color and message styling' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown when status="error"' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text below the component in non-error states' },
  { name: 'accept', type: 'string', default: 'undefined', description: 'Accepted file types for the native file dialog (e.g. ".pdf,.doc" or "image/*")' },
  { name: 'allowedExtensions', type: 'string[]', default: 'undefined', description: 'Customizable allowlist of file extensions (e.g. ["pdf", "doc", "xlsx"]). Only files matching the list are accepted; all others are rejected via onReject.' },
  { name: 'excludedExtensions', type: 'string[]', default: 'undefined', description: 'Customizable blocklist of file extensions (e.g. ["exe", "bat", "msi"]). Files matching any entry are rejected via onReject. All others are accepted.' },
  { name: 'multiple', type: 'boolean', default: 'true', description: 'Allow multiple file selection' },
  { name: 'maxFileSize', type: 'number', default: 'undefined', description: 'Maximum file size in bytes. Files exceeding this limit are rejected.' },
  { name: 'maxFiles', type: 'number', default: 'undefined', description: 'Maximum number of files allowed' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the component is disabled' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the component is read-only (dashed border, no buttons)' },
  { name: 'dropText', type: 'string', default: "'Drop files here to upload'", description: 'Primary instruction text in the drop zone' },
  { name: 'hintText', type: 'string', default: 'auto-generated', description: 'Secondary hint text. Auto-generated from constraints if not provided.' },
  { name: 'buttonLabel', type: 'string', default: "'Select Files'", description: 'Label for the file selection button' },
  { name: 'showButton', type: 'boolean', default: 'true', description: 'Whether to show the Select Files button' },
  { name: 'autoUpload', type: 'boolean', default: 'true', description: 'When true and onUpload is provided, files are uploaded immediately after selection. Set to false to upload manually.' },
  { name: 'onUpload', type: '(file, callbacks) => void', default: 'undefined', description: 'Async upload handler. Receives the File object and { onProgress(percent, remaining?), onSuccess(message?), onError(message?), signal }. When provided, files go through uploading → success/failed lifecycle.' },
  { name: 'onChange', type: '(files | null) => void', default: 'undefined', description: 'Called with the file array on change, or null when empty' },
  { name: 'onReject', type: '(info) => void', default: 'undefined', description: 'Called when a file is rejected. Receives { name, extension, reason }.' },
  { name: 'className', type: 'string', default: "''", description: 'Applied to the outer wrapper div' },
];

/* ── Simulated upload handler for demos ── */
function simulateUpload(file, { onProgress, onSuccess, onError, signal }) {
  let progress = 0;
  const total = file.size || 1024 * 100;
  const chunkTime = 80;
  const step = Math.max(2, Math.round(100 / (total / (1024 * 5) + 8)));

  const interval = setInterval(() => {
    if (signal.aborted) {
      clearInterval(interval);
      return;
    }
    progress += step + Math.round(Math.random() * 3);
    if (progress >= 100) {
      clearInterval(interval);
      onProgress(100);
      setTimeout(() => onSuccess(), 200);
    } else {
      const secsLeft = Math.ceil(((100 - progress) / step) * (chunkTime / 1000));
      onProgress(progress, `${secsLeft} sec left.`);
    }
  }, chunkTime);
}

/* ── Simulated upload that always fails ── */
function simulateFailedUpload(file, { onProgress, onError, signal }) {
  let progress = 0;
  const interval = setInterval(() => {
    if (signal.aborted) {
      clearInterval(interval);
      return;
    }
    progress += 15 + Math.round(Math.random() * 5);
    if (progress >= 45) {
      clearInterval(interval);
      onProgress(progress);
      setTimeout(() => onError('File failed to upload.'), 300);
    } else {
      onProgress(progress, '3 sec left.');
    }
  }, 120);
}

/* ── Simulated upload with random success/fail ── */
function simulateMixedUpload(file, callbacks) {
  if (Math.random() > 0.5) {
    simulateUpload(file, callbacks);
  } else {
    simulateFailedUpload(file, callbacks);
  }
}

export default function UploadPage() {
  const [size, setSize] = useState('lg');
  const [status, setStatus] = useState('default');
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [rejectedMsg, setRejectedMsg] = useState('');

  return (
    <article className="space-y-12">
      <PageHeader
        title="Upload"
        description="Drag-and-drop file upload component with multi-file support, color-coded file type icons, upload progress bar, per-file error/success/retry states, and extension validation. Supports two layout variants — a compact inline mode (sm) and a full-height drop zone (lg)."
        status="stable"
        category="Input & Form Controls"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">
          Try selecting files via the button, dragging files onto the drop zone, or pasting a file. Files upload with a simulated progress bar and transition to success state.
        </p>
        <ComponentDemo
          controls={[
            { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'lg'] },
            { type: 'select', label: 'Status', value: status, onChange: setStatus, options: ['default', 'error', 'warning'] },
            { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
            { type: 'checkbox', label: 'Read-only', value: readOnly, onChange: setReadOnly },
          ]}
        >
          <div className="w-full max-w-lg">
            <Upload
              size={size}
              status={status}
              disabled={disabled}
              readOnly={readOnly}
              label="Upload Document"
              labelRequired
              hintText="Accepted formats: PDF, DOC, DOCX, TXT, CSV, XLSX, JSON, PNG, JPG"
              errorText="Please select a valid file."
              allowedExtensions={['pdf', 'doc', 'docx', 'txt', 'csv', 'xlsx', 'json', 'png', 'jpg']}
              onUpload={simulateUpload}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* ── File Status States ── */}
      <section>
        <h2 id="file-status" className="text-xl font-black tracking-tight text-text mb-2">File Status States</h2>
        <p className="text-sm text-text-secondary mb-4">
          Each file in the list can be in one of four states: <strong>uploaded</strong> (complete, shows file size + delete button),{' '}
          <strong>uploading</strong> (progress bar + cancel button), <strong>success</strong> (green confirmation alert + delete button),{' '}
          or <strong>failed</strong> (red error alert + retry button + remove button).
        </p>
        <div className="bg-surface-overlay border border-border p-6 space-y-2 text-sm text-text-secondary">
          <p>— <strong className="text-text">uploaded</strong>: Default state when no <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">onUpload</code> is provided, or after a successful upload is dismissed. Shows file size and a delete (bin) button.</p>
          <p>— <strong className="text-text">uploading</strong>: Active upload in progress. Shows a progress bar, time remaining text, and a cancel (close) button.</p>
          <p>— <strong className="text-success">success</strong>: Upload completed successfully. Shows a green check icon with confirmation message and a delete button.</p>
          <p>— <strong className="text-danger">failed</strong>: Upload failed. Shows a red error icon with error message, a retry (rotate-left) button, and a remove (close) button.</p>
        </div>
      </section>

      {/* ── Upload Progress ── */}
      <section>
        <h2 id="upload-progress" className="text-xl font-black tracking-tight text-text mb-2">Upload Progress</h2>
        <p className="text-sm text-text-secondary mb-4">
          When an <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">onUpload</code> handler is provided, files display a progress bar during upload. The handler receives callbacks to report progress, success, or failure. Cancel an in-progress upload by clicking the close button.
        </p>
        <CodeExample code={`function handleUpload(file, { onProgress, onSuccess, signal }) {\n  // Simulate upload with progress\n  let pct = 0;\n  const iv = setInterval(() => {\n    if (signal.aborted) return clearInterval(iv);\n    pct += 10;\n    onProgress(pct, \`\${Math.ceil((100 - pct) / 10)}s left\`);\n    if (pct >= 100) {\n      clearInterval(iv);\n      onSuccess('Upload complete!');\n    }\n  }, 200);\n}\n\n<Upload\n  label="With Progress"\n  onUpload={handleUpload}\n/>`}>
          <div className="w-full max-w-lg">
            <Upload
              size="sm"
              label="With Progress"
              onUpload={simulateUpload}
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Error & Retry ── */}
      <section>
        <h2 id="error-retry" className="text-xl font-black tracking-tight text-text mb-2">Error & Retry</h2>
        <p className="text-sm text-text-secondary mb-4">
          When an upload fails, the file shows an error alert with the error message. A retry button (rotate-left icon) re-triggers the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">onUpload</code> handler for that file. A close button removes the file entirely.
        </p>
        <CodeExample code={`function handleFailingUpload(file, { onProgress, onError }) {\n  let pct = 0;\n  const iv = setInterval(() => {\n    pct += 15;\n    onProgress(pct);\n    if (pct >= 45) {\n      clearInterval(iv);\n      onError('File failed to upload.');\n    }\n  }, 120);\n}\n\n<Upload\n  label="Failing Upload"\n  onUpload={handleFailingUpload}\n/>`}>
          <div className="w-full max-w-lg">
            <Upload
              size="sm"
              label="Failing Upload (always fails)"
              onUpload={simulateFailedUpload}
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Success State ── */}
      <section>
        <h2 id="success-state" className="text-xl font-black tracking-tight text-text mb-2">Success State</h2>
        <p className="text-sm text-text-secondary mb-4">
          After a successful upload, the file shows a green check icon with a confirmation message. The file can be removed using the delete button.
        </p>
        <CodeExample code={`<Upload\n  label="Upload (random success/fail)"\n  onUpload={simulateMixedUpload}\n  hintText="Each file has a 50% chance of failing"\n/>`}>
          <div className="w-full max-w-lg">
            <Upload
              size="sm"
              label="Upload (random success/fail)"
              onUpload={simulateMixedUpload}
              hintText="Each file has a 50% chance of failing"
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Sizes ── */}
      <section>
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Two layout variants: <strong>sm</strong> is compact with a horizontal layout (text left, button right), <strong>lg</strong> is a full drop zone with the button on top and text below.
        </p>
        <CodeExample code={`<Upload size="sm" label="Compact" hintText="Max 10MB" />\n<Upload size="lg" label="Full Drop Zone" hintText="Max 10MB" />`}>
          <div className="space-y-6 w-full max-w-lg">
            <Upload size="sm" label="Compact" hintText="Max 10MB" />
            <Upload size="lg" label="Full Drop Zone" hintText="Max 10MB" />
          </div>
        </CodeExample>
      </section>

      {/* ── Label (Optional) ── */}
      <section>
        <h2 id="label" className="text-xl font-black tracking-tight text-text mb-2">Label (Optional)</h2>
        <p className="text-sm text-text-secondary mb-4">
          The <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">label</code> prop is optional. When provided, it renders the Label component above the drop area. When omitted, the component renders without a title.
        </p>
        <CodeExample code={`{/* With label + required indicator */}\n<Upload label="Attachment" labelRequired />\n\n{/* With label + optional indicator */}\n<Upload label="Cover Image" labelOptional />\n\n{/* Without label */}\n<Upload hintText="Drop any file here" />`}>
          <div className="space-y-6 w-full max-w-lg">
            <Upload size="sm" label="Attachment" labelRequired />
            <Upload size="sm" label="Cover Image" labelOptional />
            <Upload size="sm" hintText="Drop any file here" />
          </div>
        </CodeExample>
      </section>

      {/* ── Validation States ── */}
      <section>
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">Validation States</h2>
        <p className="text-sm text-text-secondary mb-4">
          Error and warning states change the border color and display an inline alert message below the drop area.
        </p>
        <CodeExample code={`<Upload status="default" label="Default" helperText="Select files to upload" />\n<Upload status="error" label="Error" errorText="Form field value is invalid" />\n<Upload status="warning" label="Warning" helperText="File exceeds recommended size" />`}>
          <div className="space-y-6 w-full max-w-lg">
            <Upload size="sm" status="default" label="Default" helperText="Select files to upload" />
            <Upload size="sm" status="error" label="Error" errorText="Form field value is invalid" />
            <Upload size="sm" status="warning" label="Warning" helperText="File exceeds recommended size" />
          </div>
        </CodeExample>
      </section>

      {/* ── Disabled & Read-only ── */}
      <section>
        <h2 id="disabled-readonly" className="text-xl font-black tracking-tight text-text mb-2">Disabled & Read-only</h2>
        <p className="text-sm text-text-secondary mb-4">
          Disabled fields are non-interactive and visually muted. Read-only fields use a dashed border and hide action buttons.
        </p>
        <CodeExample code={`<Upload disabled label="Disabled" />\n<Upload readOnly label="Read-only" />`}>
          <div className="space-y-6 w-full max-w-lg">
            <Upload size="sm" disabled label="Disabled" />
            <Upload size="sm" readOnly label="Read-only" />
          </div>
        </CodeExample>
      </section>

      {/* ── Allowed Extensions (Supported File List) ── */}
      <section>
        <h2 id="allowed-extensions" className="text-xl font-black tracking-tight text-text mb-2">Supported File List</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">allowedExtensions</code> to define a customizable list of supported file types. Only files with matching extensions are accepted; all others are rejected via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">onReject</code>. The hint text auto-generates from the list when <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">hintText</code> is not provided.
        </p>
        <CodeExample code={`{/* Spreadsheets only */}\n<Upload\n  label="Spreadsheet"\n  allowedExtensions={['xlsx', 'csv', 'xls']}\n  onReject={(info) => alert(info.name + ' not allowed')}\n/>\n\n{/* Documents only */}\n<Upload\n  label="Documents"\n  allowedExtensions={['pdf', 'doc', 'docx', 'txt']}\n/>\n\n{/* Images only */}\n<Upload\n  label="Images"\n  allowedExtensions={['jpg', 'jpeg', 'png', 'webp', 'svg']}\n/>`}>
          <div className="space-y-6 w-full max-w-lg">
            <Upload
              size="sm"
              label="Spreadsheet"
              allowedExtensions={['xlsx', 'csv', 'xls']}
              onReject={(info) => setRejectedMsg(`${info.name} rejected: ${info.reason}`)}
            />
            <Upload
              size="sm"
              label="Documents"
              allowedExtensions={['pdf', 'doc', 'docx', 'txt']}
            />
            <Upload
              size="sm"
              label="Images"
              allowedExtensions={['jpg', 'jpeg', 'png', 'webp', 'svg']}
            />
            {rejectedMsg && (
              <p className="mt-2 text-xs text-warning">{rejectedMsg}</p>
            )}
          </div>
        </CodeExample>
      </section>

      {/* ── Excluded Extensions (File Exclusion List) ── */}
      <section>
        <h2 id="excluded-extensions" className="text-xl font-black tracking-tight text-text mb-2">File Exclusion List</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">excludedExtensions</code> to define a customizable blocklist. Files matching any entry are rejected; all other file types are accepted.
        </p>
        <CodeExample code={`{/* Block executables */}\n<Upload\n  label="Safe Upload"\n  excludedExtensions={['exe', 'bat', 'cmd', 'msi', 'sh']}\n  hintText="Executable files are blocked"\n/>\n\n{/* Block archives */}\n<Upload\n  label="No Archives"\n  excludedExtensions={['zip', 'rar', '7z', 'tar', 'gz']}\n  hintText="Archive files are not accepted"\n/>`}>
          <div className="space-y-6 w-full max-w-lg">
            <Upload
              size="sm"
              label="Safe Upload"
              excludedExtensions={['exe', 'bat', 'cmd', 'msi', 'sh']}
              hintText="Executable files are blocked"
            />
            <Upload
              size="sm"
              label="No Archives"
              excludedExtensions={['zip', 'rar', '7z', 'tar', 'gz']}
              hintText="Archive files are not accepted"
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Single File Mode ── */}
      <section>
        <h2 id="single-file" className="text-xl font-black tracking-tight text-text mb-2">Single File Mode</h2>
        <p className="text-sm text-text-secondary mb-4">
          Set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">multiple=&#123;false&#125;</code> to limit selection to one file. Selecting a new file replaces the previous one.
        </p>
        <CodeExample code={`<Upload\n  label="Profile Photo"\n  multiple={false}\n  accept="image/*"\n  allowedExtensions={['jpg', 'jpeg', 'png', 'webp']}\n/>`}>
          <div className="w-full max-w-lg">
            <Upload
              size="sm"
              label="Profile Photo"
              multiple={false}
              accept="image/*"
              allowedExtensions={['jpg', 'jpeg', 'png', 'webp']}
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Max Files ── */}
      <section>
        <h2 id="max-files" className="text-xl font-black tracking-tight text-text mb-2">Max Files</h2>
        <p className="text-sm text-text-secondary mb-4">
          Limit the maximum number of files with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">maxFiles</code>.
        </p>
        <CodeExample code={`<Upload\n  label="Attachments"\n  maxFiles={3}\n  hintText="Up to 3 files"\n/>`}>
          <div className="w-full max-w-lg">
            <Upload
              label="Attachments"
              maxFiles={3}
              hintText="Up to 3 files"
            />
          </div>
        </CodeExample>
      </section>

      {/* ── onUpload Callback ── */}
      <section>
        <h2 id="on-upload" className="text-xl font-black tracking-tight text-text mb-2">onUpload Callback</h2>
        <p className="text-sm text-text-secondary mb-4">
          The <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">onUpload</code> prop receives a function called for each file. It provides callbacks to control the upload lifecycle:
        </p>
        <div className="bg-surface-overlay border border-border p-6 space-y-3 text-sm text-text-secondary">
          <p>— <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">onProgress(percent, remaining?)</code> — Updates the progress bar (0–100) and optional time remaining string.</p>
          <p>— <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">onSuccess(message?)</code> — Transitions the file to success state with an optional confirmation message.</p>
          <p>— <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">onError(message?)</code> — Transitions the file to failed state with an optional error message.</p>
          <p>— <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">signal</code> — An <code className="bg-surface-raised px-1.5 py-0.5 text-xs border border-border">AbortSignal</code> that fires when the user cancels the upload.</p>
        </div>
        <CodeExample code={`async function handleUpload(file, { onProgress, onSuccess, onError, signal }) {\n  try {\n    const formData = new FormData();\n    formData.append('file', file);\n\n    const xhr = new XMLHttpRequest();\n    xhr.open('POST', '/api/upload');\n\n    signal.addEventListener('abort', () => xhr.abort());\n\n    xhr.upload.onprogress = (e) => {\n      if (e.lengthComputable) {\n        onProgress((e.loaded / e.total) * 100);\n      }\n    };\n\n    xhr.onload = () => {\n      if (xhr.status >= 200 && xhr.status < 300) {\n        onSuccess('Upload complete!');\n      } else {\n        onError('Server error: ' + xhr.statusText);\n      }\n    };\n\n    xhr.onerror = () => onError('Network error.');\n    xhr.send(formData);\n  } catch (err) {\n    onError(err.message);\n  }\n}\n\n<Upload label="Real Upload" onUpload={handleUpload} />`}>
          <div className="w-full max-w-lg">
            <Upload
              size="sm"
              label="Simulated Upload"
              onUpload={simulateUpload}
              hintText="Files upload with simulated progress"
            />
          </div>
        </CodeExample>
      </section>

      {/* ── File Type Icons ── */}
      <section>
        <h2 id="file-icons" className="text-xl font-black tracking-tight text-text mb-2">File Type Icons</h2>
        <p className="text-sm text-text-secondary mb-4">
          Each file displays a color-coded icon using the o9ds brand palette CSS variables. Colors are theme-aware and grouped by file category:
        </p>
        <div className="bg-surface-overlay border border-border p-6 space-y-3 text-sm text-text-secondary">
          <p>— <strong style={{ color: 'var(--color-global-scarlet-d1)' }}>Scarlet</strong>: PDF</p>
          <p>— <strong style={{ color: 'var(--color-global-sienna-accent)' }}>Sienna</strong>: PPT, PPTX, KEY, ODP</p>
          <p>— <strong style={{ color: 'var(--color-global-indigo-l1)' }}>Indigo</strong>: IMG, JPEG, JPG, PNG, SVG, GIF, BMP, WEBP, TIFF, HEIC</p>
          <p>— <strong style={{ color: 'var(--color-global-grass-d1)' }}>Grass</strong>: CSV, XLSX, XLS, ODS, TSV</p>
          <p>— <strong style={{ color: 'var(--color-global-shock-l1)' }}>Shock</strong>: DOCX, DOC, ODT, RTF, PAGES</p>
          <p>— <strong style={{ color: 'var(--color-global-juice-accent)' }}>Juice</strong>: JSON, XML, YAML, YML, TOML, INI, ENV</p>
          <p>— <strong style={{ color: 'var(--color-global-glacier-accent)' }}>Glacier</strong>: HTML, CSS, SCSS, MD, MDX</p>
          <p>— <strong style={{ color: 'var(--color-global-lavender-accent)' }}>Lavender</strong>: JS, TS, PY, JAVA, C, CPP, RS, GO, RB, PHP, SH, SQL</p>
          <p>— <strong style={{ color: 'var(--color-global-plum-accent)' }}>Plum</strong>: PSD, AI, SKETCH, FIG, XD</p>
          <p>— <strong style={{ color: 'var(--color-global-ocra-accent)' }}>Ocra</strong>: MP3, WAV, OGG, FLAC, AAC</p>
          <p>— <strong style={{ color: 'var(--color-global-plum-d1)' }}>Plum Dark</strong>: MP4, AVI, MOV, MKV, WEBM</p>
          <p>— <strong className="text-text-tertiary">Gray</strong>: ZIP, RAR, 7Z, TAR, TXT, LOG (default)</p>
        </div>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use onUpload to handle real file uploads with progress feedback',
            'Always show clear error messages when uploads fail',
            'Provide a retry mechanism for failed uploads',
            'Use hintText to communicate accepted file types or size limits',
            'Use allowedExtensions to restrict uploads to specific types',
            'Use excludedExtensions to block dangerous file types (exe, bat)',
            'Use size="lg" for primary upload areas, size="sm" for inline/compact contexts',
            'Use FileInput for simple single-file selection in dense forms',
          ]}
          dontItems={[
            'Do not disable drag-and-drop without clear affordance',
            'Avoid using both allowedExtensions and excludedExtensions simultaneously',
            'Do not hide the file list after selection — users need to see what they selected',
            'Avoid setting maxFiles without a visible indicator of the limit',
            'Do not remove the retry button — users expect to be able to retry failed uploads',
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
              <tr><td className="px-4 py-2.5"><kbd className="bg-surface-raised px-1.5 py-0.5 border border-border text-[10px] font-mono">Tab</kbd></td><td className="px-4 py-2.5 text-text-secondary">Move focus between drop zone, button, and file action buttons</td></tr>
              <tr><td className="px-4 py-2.5"><kbd className="bg-surface-raised px-1.5 py-0.5 border border-border text-[10px] font-mono">Enter / Space</kbd></td><td className="px-4 py-2.5 text-text-secondary">Open file dialog when drop zone or button is focused</td></tr>
              <tr><td className="px-4 py-2.5"><kbd className="bg-surface-raised px-1.5 py-0.5 border border-border text-[10px] font-mono">Delete / Backspace</kbd></td><td className="px-4 py-2.5 text-text-secondary">Remove file when delete button is focused</td></tr>
              <tr><td className="px-4 py-2.5"><kbd className="bg-surface-raised px-1.5 py-0.5 border border-border text-[10px] font-mono">Escape</kbd></td><td className="px-4 py-2.5 text-text-secondary">Cancel active upload when cancel button is focused</td></tr>
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
            <>Drop area has <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="region"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code>.</>,
            <>File list uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="list"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="listitem"</code> for each file.</>,
            <>Progress bar uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="progressbar"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-valuenow</code>, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-valuemin</code>, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-valuemax</code>.</>,
            <>Each action button has a descriptive <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code> including the filename and action.</>,
            <>File type icons are decorative (<code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-hidden="true"</code>).</>,
            <>Focus ring visible on all interactive elements via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">focus-visible</code>.</>,
            'Disabled and read-only states use native HTML attributes.',
            <>Drop zone is keyboard-accessible via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Enter</code> / <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Space</code>.</>,
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
        <PropsTable props={uploadProps} />
      </section>
    </article>
  );
}
