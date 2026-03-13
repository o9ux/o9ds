import { useState } from 'react';
import FileInput from '@/components/inputs/FileInput';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const fileInputProps = [
  { name: 'accept', type: 'string', default: 'undefined', description: 'Accepted file types (e.g. ".png,.jpg" or "image/*")' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple file selection' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Error state styling' },
  { name: 'onChange', type: '(files: FileList) => void', default: 'undefined', description: 'Handler when files are selected' },
  { name: 'placeholder', type: 'string', default: "'Choose file...'", description: 'Button label when no file selected' },
  { name: 'fileName', type: 'string', default: 'undefined', description: 'Display name of the selected file' },
];

export default function FileInputPage() {
  const [fileName, setFileName] = useState('');
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader title="File Input" description="A styled file input button that opens the native file picker. Shows the selected file name and supports accept filters and multiple selection." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
        ]}>
          <FileInput
            fileName={fileName}
            onChange={(files) => setFileName(files?.[0]?.name || '')}
            disabled={disabled}
          />
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <CodeExample code={`<FileInput\n  onChange={(files) => console.log(files)}\n  placeholder="Choose file..."\n/>`}>
          <FileInput
            fileName={fileName}
            onChange={(files) => setFileName(files?.[0]?.name || '')}
          />
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="accept" className="text-xl font-black tracking-tight text-text mb-2">Accept Filter</h2>
        <p className="text-sm text-text-secondary mb-4">Restrict the file types that can be selected.</p>
        <CodeExample code={`<FileInput accept="image/*" placeholder="Choose image..." />\n<FileInput accept=".pdf,.doc" placeholder="Choose document..." />`}>
          <div className="flex gap-4">
            <FileInput accept="image/*" placeholder="Choose image..." onChange={() => {}} />
            <FileInput accept=".pdf,.doc,.docx" placeholder="Choose document..." onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="multiple" className="text-xl font-black tracking-tight text-text mb-2">Multiple Files</h2>
        <CodeExample code={`<FileInput multiple placeholder="Choose files..." />`}>
          <FileInput multiple placeholder="Choose files..." onChange={() => {}} />
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <CodeExample code={`<FileInput error />\n<FileInput disabled />`}>
          <div className="flex gap-4">
            <FileInput error placeholder="Error state" onChange={() => {}} />
            <FileInput disabled placeholder="Disabled" onChange={() => {}} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for simple single or multi-file selection', 'Show the selected file name for user feedback', 'Specify accept filters to guide file type selection']}
          dontItems={['Do not use for drag-and-drop uploads — use Upload/Dropzone', 'Avoid hiding the file name after selection', 'Do not forget error states for required file inputs']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={fileInputProps} />
      </section>
    </article>
  );
}
