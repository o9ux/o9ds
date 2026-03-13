import { useState } from 'react';
import Upload from '@/components/inputs/Upload';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const uploadProps = [
  { name: 'accept', type: 'string', default: 'undefined', description: 'Accepted file types (e.g. "image/*")' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple file selection' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the dropzone is disabled' },
  { name: 'maxSize', type: 'number', default: 'undefined', description: 'Maximum file size in bytes' },
  { name: 'onChange', type: '(files: File[]) => void', default: 'undefined', description: 'Handler when valid files are dropped/selected' },
  { name: 'onError', type: '(error) => void', default: 'undefined', description: 'Handler for validation errors (size, type)' },
  { name: 'title', type: 'string', default: "'Drag & drop files here'", description: 'Main text in the dropzone' },
  { name: 'subtitle', type: 'string', default: "'or click to browse'", description: 'Secondary text in the dropzone' },
  { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Custom dropzone content' },
];

export default function UploadPage() {
  const [files, setFiles] = useState([]);

  return (
    <article>
      <PageHeader title="Upload" description="A drag-and-drop upload zone that accepts files via drag or click. Supports file type filtering, size validation, and multiple file selection." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo>
          <div className="max-w-md">
            <Upload
              multiple
              onChange={(newFiles) => setFiles((prev) => [...prev, ...newFiles])}
            />
            {files.length > 0 && (
              <div className="mt-3 space-y-1">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-text-secondary px-2 py-1 bg-surface-overlay rounded">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5L9 1z" />
                      <path d="M9 1v4h4" />
                    </svg>
                    <span className="truncate">{f.name}</span>
                    <span className="text-text-disabled ml-auto">{(f.size / 1024).toFixed(1)}KB</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <CodeExample code={`<Upload\n  onChange={(files) => console.log(files)}\n  title="Drag & drop files here"\n  subtitle="or click to browse"\n/>`}>
          <div className="max-w-md">
            <Upload onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="max-size" className="text-xl font-black tracking-tight text-text mb-2">With Size Limit</h2>
        <CodeExample code={`<Upload maxSize={5 * 1024 * 1024} />`}>
          <div className="max-w-md">
            <Upload maxSize={5 * 1024 * 1024} onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="accept" className="text-xl font-black tracking-tight text-text mb-2">Accept Filter</h2>
        <CodeExample code={`<Upload accept="image/*" title="Upload images" />`}>
          <div className="max-w-md">
            <Upload
              accept="image/*"
              title="Upload images"
              subtitle="PNG, JPG, GIF up to 10MB"
              onChange={() => {}}
            />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="disabled" className="text-xl font-black tracking-tight text-text mb-2">Disabled State</h2>
        <CodeExample code={`<Upload disabled />`}>
          <div className="max-w-md">
            <Upload disabled onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for file uploads where drag-and-drop is beneficial', 'Show clear feedback about accepted file types and size limits', 'Display uploaded file names with the ability to remove them']}
          dontItems={['Do not use for simple file selection — use FileInput instead', 'Avoid using without size or type constraints in production', 'Do not forget loading/progress indicators for large files']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={uploadProps} />
      </section>
    </article>
  );
}
