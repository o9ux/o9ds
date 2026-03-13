import { useState } from 'react';
import Textbox from '@/components/inputs/Textbox';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="7" r="4.5"/>
    <path d="M10.5 10.5L14 14"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z"/>
    <circle cx="8" cy="8" r="2"/>
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="12" height="8"/>
    <path d="M2 4l6 5 6-5"/>
  </svg>
);

const textboxProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height and font size variant' },
  { name: 'status', type: "'default' | 'error' | 'success' | 'warning'", default: "'default'", description: 'Validation status — controls border color and message styling' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Field label rendered above the input' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text shown below the field in non-error states' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown below the field when status="error"' },
  { name: 'leadingIcon', type: 'ReactNode', default: 'undefined', description: 'Icon rendered inside the left edge of the field' },
  { name: 'trailingIcon', type: 'ReactNode', default: 'undefined', description: 'Icon rendered inside the right edge of the field' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the field is disabled' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the field is read-only' },
  { name: 'className', type: 'string', default: "''", description: 'Applied to the outer wrapper div' },
];

export default function TextboxPage() {
  const [size, setSize] = useState('md');
  const [status, setStatus] = useState('default');
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState('');

  return (
    <article>
      <PageHeader
        title="Textbox"
        description="The Textbox is the foundational single-line text input. It supports leading and trailing icons, validation states, labels, and helper text."
        status="stable"
        category="Input & Form Controls"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo
          controls={[
            { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
            { type: 'select', label: 'Status', value: status, onChange: setStatus, options: ['default', 'error', 'success', 'warning'] },
            { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
          ]}
        >
          <div className="w-full max-w-sm">
            <Textbox
              size={size}
              status={status}
              disabled={disabled}
              label="Email address"
              placeholder="you@example.com"
              helperText="We'll never share your email."
              errorText="Please enter a valid email address."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three height variants — sm (32px), md (40px), lg (48px).
        </p>
        <CodeExample code={`<Textbox size="sm" placeholder="Small" />
<Textbox size="md" placeholder="Medium (default)" />
<Textbox size="lg" placeholder="Large" />`}>
          <div className="space-y-3 max-w-xs">
            <Textbox size="sm" placeholder="Small (32px)" />
            <Textbox size="md" placeholder="Medium (40px)" />
            <Textbox size="lg" placeholder="Large (48px)" />
          </div>
        </CodeExample>
      </section>

      {/* With Icons */}
      <section className="mb-12">
        <h2 id="icons" className="text-xl font-black tracking-tight text-text mb-2">With Icons</h2>
        <p className="text-sm text-text-secondary mb-4">
          Leading and trailing icon slots for contextual visual cues.
        </p>
        <CodeExample code={`<Textbox leadingIcon={<SearchIcon />} placeholder="Search…" />
<Textbox label="Password" trailingIcon={<EyeIcon />} type="password" placeholder="••••••••" />
<Textbox leadingIcon={<MailIcon />} label="Email" placeholder="you@example.com" />`}>
          <div className="space-y-3 max-w-xs">
            <Textbox leadingIcon={<SearchIcon />} placeholder="Search…" />
            <Textbox label="Password" trailingIcon={<EyeIcon />} type="password" placeholder="••••••••" />
            <Textbox leadingIcon={<MailIcon />} label="Email" placeholder="you@example.com" />
          </div>
        </CodeExample>
      </section>

      {/* Validation States */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">Validation States</h2>
        <p className="text-sm text-text-secondary mb-4">
          Four states reflect validation outcomes — default, error, success, and warning.
        </p>
        <CodeExample code={`<Textbox status="default" label="Default" helperText="Helper text here" defaultValue="Input value" />
<Textbox status="error" label="Error" errorText="This field is required" defaultValue="bad input" />
<Textbox status="success" label="Success" helperText="Looks good!" defaultValue="valid@example.com" />
<Textbox status="warning" label="Warning" helperText="This value already exists" defaultValue="duplicate" />`}>
          <div className="space-y-4 max-w-xs">
            <Textbox status="default" label="Default" helperText="Helper text goes here." defaultValue="Input value" />
            <Textbox status="error" label="Error" errorText="This field is required." defaultValue="invalid input" />
            <Textbox status="success" label="Success" helperText="Looks good!" defaultValue="valid@example.com" />
            <Textbox status="warning" label="Warning" helperText="This value already exists." defaultValue="duplicate@email.com" />
          </div>
        </CodeExample>
      </section>

      {/* Disabled & Read-only */}
      <section className="mb-12">
        <h2 id="disabled" className="text-xl font-black tracking-tight text-text mb-2">Disabled & Read-only</h2>
        <CodeExample code={`<Textbox disabled label="Disabled" defaultValue="Can't edit this" />
<Textbox readOnly label="Read-only" defaultValue="View-only value" />`}>
          <div className="space-y-3 max-w-xs">
            <Textbox disabled label="Disabled" defaultValue="Can't edit this" />
            <Textbox readOnly label="Read-only" defaultValue="View-only value" />
          </div>
        </CodeExample>
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Always pair a Textbox with a visible label for accessibility',
            'Use helperText to set expectations before input, errorText to explain failures after',
            'Use leadingIcon to reinforce the input type (search, email, phone)',
            'Use status="error" in combination with errorText — never just change the border color',
            'Use readOnly for values the user should see but cannot change (e.g., auto-generated IDs)',
          ]}
          dontItems={[
            'Do not rely on placeholder text as a substitute for a label',
            'Avoid using size="lg" in dense forms — prefer md for most contexts',
            'Do not show both a success and error state simultaneously',
            'Avoid placing two trailingIcon elements — use a single icon or a clear button',
          ]}
        />
      </section>

      {/* API */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <p className="text-sm text-text-secondary mb-4">
          All standard HTML <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">&lt;input&gt;</code> attributes are forwarded to the underlying element.
        </p>
        <PropsTable props={textboxProps} />
      </section>
    </article>
  );
}
