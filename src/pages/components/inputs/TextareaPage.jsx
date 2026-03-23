import { useState } from 'react';
import Textarea from '@/components/inputs/Textarea';
import O9Icon from '@/components/O9Icon';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

import editSvg from '@/assets/icons/o9con-edit-properties.svg?raw';
import commentSvg from '@/assets/icons/o9con-comment.svg?raw';

const textareaProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Text size and padding' },
  { name: 'status', type: "'default' | 'error' | 'success' | 'warning'", default: "'default'", description: 'Validation status' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text above the textarea' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Help text below the textarea' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message (shown when status="error")' },
  { name: 'leadingIcon', type: 'ReactNode', default: 'undefined', description: 'Icon inside the top-left edge of the textarea' },
  { name: 'maxLength', type: 'number', default: 'undefined', description: 'Maximum character count' },
  { name: 'showCount', type: 'boolean', default: 'false', description: 'Show live character counter (requires maxLength)' },
  { name: 'resize', type: "'none' | 'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Resize behavior' },
  { name: 'rows', type: 'number', default: '4', description: 'Number of visible text lines' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the textarea is disabled' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the textarea is read-only' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function TextareaPage() {
  const [status, setStatus] = useState('default');
  const [disabled, setDisabled] = useState(false);
  const [readOnlyDemo, setReadOnlyDemo] = useState(false);
  const [showCount, setShowCount] = useState(true);

  return (
    <article>
      <PageHeader title="Textarea" description="A multi-line text input with bottom-border styling for longer text content like descriptions, comments, or messages. Supports validation states, character count, resize controls, and accessible labeling." status="stable" category="Input & Form Controls" />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">Try different states and configurations.</p>
        <ComponentDemo controls={[
          { type: 'select', label: 'Status', value: status, onChange: setStatus, options: ['default', 'error', 'success', 'warning'] },
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
          { type: 'checkbox', label: 'Read-only', value: readOnlyDemo, onChange: setReadOnlyDemo },
          { type: 'checkbox', label: 'Show Count', value: showCount, onChange: setShowCount },
        ]}>
          <div className="w-full max-w-sm">
            <Textarea
              label="Form label"
              status={status}
              disabled={disabled}
              readOnly={readOnlyDemo}
              placeholder="Placeholder name"
              helperText="Maximum 500 characters"
              errorText="Form field value is Invalid"
              maxLength={500}
              showCount={showCount}
              rows={4}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* Validation States */}
      <section className="mb-12">
        <h2 id="validation" className="text-xl font-black tracking-tight text-text mb-2">Validation States</h2>
        <p className="text-sm text-text-secondary mb-4">Four status variants for form validation feedback.</p>
        <CodeExample code={`<Textarea label="Default" status="default" placeholder="Type..." />\n<Textarea label="Error" status="error" errorText="Form field value is Invalid" />\n<Textarea label="Success" status="success" helperText="Looks good" />\n<Textarea label="Warning" status="warning" helperText="Check this" />`}>
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <Textarea label="Default" status="default" placeholder="Type..." rows={2} />
            <Textarea label="Error" status="error" errorText="Form field value is Invalid" placeholder="Type..." rows={2} />
            <Textarea label="Success" status="success" helperText="Looks good" placeholder="Type..." rows={2} />
            <Textarea label="Warning" status="warning" helperText="Check this" placeholder="Type..." rows={2} />
          </div>
        </CodeExample>
      </section>

      {/* Character Count */}
      <section className="mb-12">
        <h2 id="count" className="text-xl font-black tracking-tight text-text mb-2">Character Count</h2>
        <p className="text-sm text-text-secondary mb-4">Live character counter shown below the textarea when showCount and maxLength are set.</p>
        <CodeExample code={`<Textarea\n  label="Description"\n  maxLength={500}\n  showCount\n  placeholder="Type your message..."\n/>`}>
          <div className="max-w-sm">
            <Textarea label="Description" maxLength={500} showCount placeholder="Type your message..." rows={3} />
          </div>
        </CodeExample>
      </section>

      {/* Leading Icon */}
      <section className="mb-12">
        <h2 id="leading-icon" className="text-xl font-black tracking-tight text-text mb-2">Leading Icon</h2>
        <p className="text-sm text-text-secondary mb-4">An optional icon positioned at the top-left of the textarea to provide visual context.</p>
        <CodeExample code={`<Textarea\n  label="Notes"\n  leadingIcon={<O9Icon svg={editSvg} />}\n  placeholder="Add your notes..."\n/>\n<Textarea\n  label="Comment"\n  leadingIcon={<O9Icon svg={commentSvg} />}\n  placeholder="Write a comment..."\n/>`}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Textarea label="Notes" leadingIcon={<O9Icon svg={editSvg} />} placeholder="Add your notes..." rows={3} />
            <Textarea label="Comment" leadingIcon={<O9Icon svg={commentSvg} />} placeholder="Write a comment..." rows={3} />
          </div>
        </CodeExample>
      </section>

      {/* Resize Options */}
      <section className="mb-12">
        <h2 id="resize" className="text-xl font-black tracking-tight text-text mb-2">Resize Options</h2>
        <p className="text-sm text-text-secondary mb-4">Control the resize behavior of the textarea.</p>
        <CodeExample code={`<Textarea resize="none" placeholder="Cannot be resized" />\n<Textarea resize="vertical" placeholder="Drag the bottom edge" />`}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Textarea label="No resize" resize="none" rows={2} placeholder="Cannot be resized" />
            <Textarea label="Vertical resize" resize="vertical" rows={2} placeholder="Drag the bottom edge" />
          </div>
        </CodeExample>
      </section>

      {/* Disabled & Read-only */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">Disabled & Read-only</h2>
        <CodeExample code={`<Textarea disabled label="Disabled" placeholder="Disabled textarea" />\n<Textarea readOnly label="Read-only" value="This content cannot be edited" />`}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Textarea disabled label="Disabled" placeholder="Disabled textarea" rows={2} />
            <Textarea readOnly label="Read-only" defaultValue="This content cannot be edited" rows={2} />
          </div>
        </CodeExample>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use for multi-line text input (descriptions, comments, notes)',
            'Set an appropriate default row count for the expected content',
            'Use showCount with maxLength to communicate character limits',
            'Use helper text for formatting hints or requirements',
          ]}
          dontItems={[
            'Do not use for single-line input — use Textbox instead',
            'Avoid resize="none" unless the content has a strict size constraint',
            'Do not use for structured data entry (use specific input types instead)',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            'Label is linked to the textarea via htmlFor/id for screen reader association.',
            'Focus state is visually indicated by a highlighted bottom border.',
            'Error messages are displayed with a status icon for additional visual cue.',
            'Disabled and read-only states prevent interaction as expected.',
            'Native maxLength attribute enforces the character limit.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary"><span className="mt-px text-text font-bold shrink-0">—</span>{item}</li>
          ))}
        </ul>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={textareaProps} />
      </section>
    </article>
  );
}
