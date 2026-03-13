import { useState } from 'react';
import Textarea from '@/components/inputs/Textarea';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const textareaProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Text size and padding' },
  { name: 'status', type: "'default' | 'error' | 'success' | 'warning'", default: "'default'", description: 'Validation status' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text above the textarea' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Help text below the textarea' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message (shown when status="error")' },
  { name: 'resize', type: "'none' | 'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Resize behavior' },
  { name: 'rows', type: 'number', default: '4', description: 'Number of visible text lines' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the textarea is disabled' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the textarea is read-only' },
];

export default function TextareaPage() {
  const [status, setStatus] = useState('default');
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader title="Textarea" description="A multi-line text input for longer text content like descriptions, comments, or messages. Supports validation states, resize controls, and accessible labeling." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'Status', value: status, onChange: setStatus, options: ['default', 'error', 'success', 'warning'] },
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
        ]}>
          <div className="w-full max-w-sm">
            <Textarea label="Description" status={status} disabled={disabled} placeholder="Type your message..." helperText="Maximum 500 characters" errorText="This field is required" />
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="validation" className="text-xl font-black tracking-tight text-text mb-2">Validation States</h2>
        <CodeExample code={`<Textarea label="Default" status="default" />\n<Textarea label="Error" status="error" errorText="Required" />\n<Textarea label="Success" status="success" />\n<Textarea label="Warning" status="warning" />`}>
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <Textarea label="Default" status="default" placeholder="Type..." rows={2} />
            <Textarea label="Error" status="error" errorText="This field is required" placeholder="Type..." rows={2} />
            <Textarea label="Success" status="success" placeholder="Type..." rows={2} />
            <Textarea label="Warning" status="warning" placeholder="Type..." rows={2} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="resize" className="text-xl font-black tracking-tight text-text mb-2">Resize Options</h2>
        <CodeExample code={`<Textarea resize="none" />\n<Textarea resize="vertical" />\n<Textarea resize="both" />`}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Textarea label="No resize" resize="none" rows={2} placeholder="Cannot be resized" />
            <Textarea label="Vertical resize" resize="vertical" rows={2} placeholder="Drag the bottom edge" />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for multi-line text input (descriptions, comments, notes)', 'Set an appropriate default row count for the expected content', 'Use helper text to communicate character limits or formatting']}
          dontItems={['Do not use for single-line input — use Textbox instead', 'Avoid resize="none" unless the content has a strict size constraint', 'Do not use for structured data entry (use specific input types instead)']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={textareaProps} />
      </section>
    </article>
  );
}
