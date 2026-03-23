import { useState } from 'react';
import UrlInput from '@/components/inputs/UrlInput';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const urlInputProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size — sm=24px, md=32px, lg=36px' },
  { name: 'status', type: "'default' | 'error'", default: "'default'", description: 'Validation status' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label text above the input' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text below the input' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown when status is error' },
  { name: 'placeholder', type: 'string', default: 'undefined', description: 'Placeholder text' },
  { name: 'maxLength', type: 'number', default: 'undefined', description: 'Maximum character count' },
  { name: 'showCount', type: 'boolean', default: 'false', description: 'Show live character counter (requires maxLength)' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is non-interactive' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the input is read-only' },
  { name: 'value', type: 'string', default: 'undefined', description: 'Controlled input value' },
  { name: 'onChange', type: '(e: ChangeEvent) => void', default: 'undefined', description: 'Change handler' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function UrlInputPage() {
  const [size, setSize] = useState('md');
  const [disabled, setDisabled] = useState(false);
  const [readOnlyDemo, setReadOnlyDemo] = useState(false);
  const [errorDemo, setErrorDemo] = useState(false);
  const [demoValue, setDemoValue] = useState('https://example.com');

  /* States demo */
  const [errorValue, setErrorValue] = useState('not-a-valid-url');
  const [readOnlyValue] = useState('https://o9solutions.com');

  return (
    <article>
      <PageHeader title="URL Input" description="A text input designed for URL entry. When filled, the value is styled as a clickable link with an external-link icon to open the URL in a new tab." status="stable" category="Input & Form Controls" />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">Try different sizes and states.</p>
        <ComponentDemo controls={[
          { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
          { type: 'checkbox', label: 'Read-only', value: readOnlyDemo, onChange: setReadOnlyDemo },
          { type: 'checkbox', label: 'Error', value: errorDemo, onChange: setErrorDemo },
        ]}>
          <div className="w-80">
            <UrlInput
              label="Website URL"
              placeholder="https://example.com"
              size={size}
              disabled={disabled}
              readOnly={readOnlyDemo}
              status={errorDemo ? 'error' : 'default'}
              errorText={errorDemo ? 'Please enter a valid URL' : undefined}
              maxLength={60}
              showCount
              value={demoValue}
              onChange={(e) => setDemoValue(e.target.value)}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* Types */}
      <section className="mb-12">
        <h2 id="types" className="text-xl font-black tracking-tight text-text mb-2">Types</h2>
        <p className="text-sm text-text-secondary mb-4">Empty and filled states with link styling.</p>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Empty</h3>
          <CodeExample code={`<UrlInput label="Form label" placeholder="Placeholder" />`}>
            <div className="flex gap-8">
              <div className="w-64">
                <UrlInput label="Form label" placeholder="Placeholder" size="md" value="" onChange={() => {}} maxLength={20} showCount />
              </div>
              <div className="w-64">
                <UrlInput label="Form label" placeholder="Placeholder" size="sm" value="" onChange={() => {}} maxLength={20} showCount />
              </div>
            </div>
          </CodeExample>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-text mb-2">Filled</h3>
          <CodeExample code={`<UrlInput label="Form label" value="https://example.com" />`}>
            <div className="flex gap-8">
              <div className="w-64">
                <UrlInput label="Form label" size="md" value="https://example.com" onChange={() => {}} maxLength={20} showCount />
              </div>
              <div className="w-64">
                <UrlInput label="Form label" size="sm" value="https://example.com" onChange={() => {}} maxLength={20} showCount />
              </div>
            </div>
          </CodeExample>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">Three sizes: sm (24px), md (32px), and lg (36px).</p>
        <CodeExample code={`<UrlInput size="sm" label="Small (24px)" value="https://example.com" />\n<UrlInput size="md" label="Medium (32px)" value="https://example.com" />\n<UrlInput size="lg" label="Large (36px)" value="https://example.com" />`}>
          <div className="flex flex-col gap-4">
            <div className="w-80">
              <UrlInput size="sm" label="Small (24px)" value="https://example.com" onChange={() => {}} />
            </div>
            <div className="w-80">
              <UrlInput size="md" label="Medium (32px)" value="https://example.com" onChange={() => {}} />
            </div>
            <div className="w-80">
              <UrlInput size="lg" label="Large (36px)" value="https://example.com" onChange={() => {}} />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">States</h2>
        <p className="text-sm text-text-secondary mb-4">Disabled, read-only, and error states.</p>
        <CodeExample code={`<UrlInput disabled label="Disabled" value="https://example.com" />\n<UrlInput readOnly label="Read-only" value="https://o9solutions.com" />\n<UrlInput status="error" errorText="Invalid URL" label="Error" value="not-valid" />`}>
          <div className="flex flex-col gap-4">
            <div className="w-80">
              <UrlInput label="Disabled" disabled value="https://example.com" onChange={() => {}} maxLength={20} showCount />
            </div>
            <div className="w-80">
              <UrlInput label="Read-only" readOnly value={readOnlyValue} onChange={() => {}} maxLength={20} showCount />
            </div>
            <div className="w-80">
              <UrlInput label="Error" status="error" errorText="Form field value is invalid" value={errorValue} onChange={(e) => setErrorValue(e.target.value)} maxLength={20} showCount />
            </div>
          </div>
        </CodeExample>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use URL Input for fields that accept web addresses or links',
            'Provide a placeholder showing the expected URL format (e.g. https://example.com)',
            'Use the external-link icon to let users verify the URL before submission',
            'Validate URL format and show error state for invalid entries',
          ]}
          dontItems={[
            'Do not use for general text input — use Textbox instead',
            'Do not use for email addresses — use Textbox with type="email"',
            'Avoid using without a label — the input purpose should be clear',
            'Do not disable the external-link action when the field has a valid URL',
          ]}
        />
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            'Native <input type="text"> is used for full keyboard and screen reader support.',
            'Label is linked to the input via htmlFor/id for click-to-focus behavior.',
            'aria-invalid communicates error state to screen readers.',
            'aria-readonly communicates read-only state to assistive technology.',
            'External link uses target="_blank" with rel="noopener noreferrer" for security.',
            'External link has aria-label="Open URL in new tab" for screen readers.',
            'Focus border highlight changes color based on validation status.',
            'Character counter provides visual feedback on input length limits.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary"><span className="mt-px text-text font-bold shrink-0">—</span>{item}</li>
          ))}
        </ul>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={urlInputProps} />
      </section>
    </article>
  );
}
