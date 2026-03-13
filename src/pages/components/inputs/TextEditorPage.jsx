import { useState } from 'react';
import TextEditor from '@/components/inputs/TextEditor';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const textEditorProps = [
  { name: 'value', type: 'string', default: "''", description: 'HTML content of the editor' },
  { name: 'onChange', type: '(html: string) => void', default: 'undefined', description: 'Handler when content changes' },
  { name: 'placeholder', type: 'string', default: "'Start typing...'", description: 'Placeholder text when empty' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the editor is disabled' },
  { name: 'minHeight', type: 'number', default: '200', description: 'Minimum height of the editing area in pixels' },
];

export default function TextEditorPage() {
  const [content, setContent] = useState('');
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader title="Text Editor" description="A rich text editor with a formatting toolbar. Supports bold, italic, underline, strikethrough, alignment, and list formatting via contentEditable." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
        ]}>
          <div className="max-w-lg">
            <TextEditor
              value={content}
              onChange={setContent}
              disabled={disabled}
              minHeight={150}
            />
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <CodeExample code={`<TextEditor\n  value={content}\n  onChange={setContent}\n  placeholder="Write something..."\n/>`}>
          <div className="max-w-lg">
            <TextEditor
              onChange={() => {}}
              placeholder="Write something..."
              minHeight={120}
            />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="toolbar" className="text-xl font-black tracking-tight text-text mb-2">Toolbar Actions</h2>
        <p className="text-sm text-text-secondary mb-4">The editor toolbar provides the following formatting options:</p>
        <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
          <li><strong>Bold</strong> — Toggle bold text</li>
          <li><em>Italic</em> — Toggle italic text</li>
          <li><span className="underline">Underline</span> — Toggle underline</li>
          <li><span className="line-through">Strikethrough</span> — Toggle strikethrough</li>
          <li>Text alignment — Left, Center, Right</li>
          <li>Lists — Unordered and ordered lists</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="disabled-state" className="text-xl font-black tracking-tight text-text mb-2">Disabled State</h2>
        <CodeExample code={`<TextEditor disabled />`}>
          <div className="max-w-lg">
            <TextEditor disabled placeholder="Editor is disabled" minHeight={100} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for multi-line text input requiring formatting', 'Provide placeholder text to guide the user', 'Set appropriate minHeight for the use case']}
          dontItems={['Do not use for plain text input — use Textarea instead', 'Avoid overloading the toolbar with too many options', 'Do not use contentEditable for code editing — use a code editor']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={textEditorProps} />
      </section>
    </article>
  );
}
