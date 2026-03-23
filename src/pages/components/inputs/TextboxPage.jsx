import { useState } from 'react';
import Textbox from '@/components/inputs/Textbox';
import O9Icon from '@/components/O9Icon';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

import searchSvg from '@/assets/icons/o9con-search.svg?raw';
import eyeSvg from '@/assets/icons/o9con-eye.svg?raw';
import mailSvg from '@/assets/icons/o9con-mail-new.svg?raw';
import userSvg from '@/assets/icons/o9con-user.svg?raw';
import lockSvg from '@/assets/icons/o9con-lock.svg?raw';

const textboxProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height variant — sm (24px), md (32px), lg (40px)' },
  { name: 'status', type: "'default' | 'error' | 'success' | 'warning'", default: "'default'", description: 'Validation status — controls border color and message styling' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Field label rendered above the input' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text shown below the field in non-error states' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown below the field when status="error"' },
  { name: 'leadingIcon', type: 'ReactNode', default: 'undefined', description: 'Icon rendered inside the left edge of the field' },
  { name: 'trailingIcon', type: 'ReactNode', default: 'undefined', description: 'Icon rendered inside the right edge of the field' },
  { name: 'maxLength', type: 'number', default: 'undefined', description: 'Maximum character count. Also sets the native maxlength attribute on the input.' },
  { name: 'showCount', type: 'boolean', default: 'false', description: 'When true and maxLength is set, shows a live character counter below the field.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the field is disabled' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the field is read-only' },
  { name: 'className', type: 'string', default: "''", description: 'Applied to the outer wrapper div' },
];

export default function TextboxPage() {
  const [size, setSize] = useState('md');
  const [status, setStatus] = useState('default');
  const [disabled, setDisabled] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [demoValue, setDemoValue] = useState('');

  return (
    <article>
      <PageHeader
        title="Textbox"
        description="Single-line text input with bottom-border styling, background fill, leading/trailing icon support, automatic status icons, validation states, and optional character count."
        status="stable"
        category="Input & Form Controls"
      />

      {/* ── Interactive Demo ── */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">
          Experiment with size, status, character count, and disabled state.
        </p>
        <ComponentDemo
          controls={[
            { type: 'select', label: 'Size', value: size, onChange: setSize, options: ['sm', 'md', 'lg'] },
            { type: 'select', label: 'Status', value: status, onChange: setStatus, options: ['default', 'error', 'success', 'warning'] },
            { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
            { type: 'checkbox', label: 'Show Count', value: showCount, onChange: setShowCount },
          ]}
        >
          <div className="w-full max-w-sm">
            <Textbox
              size={size}
              status={status}
              disabled={disabled}
              showCount={showCount}
              maxLength={showCount ? 50 : undefined}
              label="Email address"
              leadingIcon={<O9Icon svg={mailSvg} />}
              placeholder="you@example.com"
              helperText="We'll never share your email."
              errorText="Please enter a valid email address."
              value={demoValue}
              onChange={(e) => setDemoValue(e.target.value)}
            />
          </div>
        </ComponentDemo>
      </section>

      {/* ── Sizes ── */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three height variants — sm (24px), md (32px), lg (40px).
        </p>
        <CodeExample code={`<Textbox size="sm" placeholder="Small (24px)" />\n<Textbox size="md" placeholder="Medium (32px)" />\n<Textbox size="lg" placeholder="Large (40px)" />`}>
          <div className="space-y-4 max-w-xs">
            <Textbox size="sm" placeholder="Small (24px)" />
            <Textbox size="md" placeholder="Medium (32px)" />
            <Textbox size="lg" placeholder="Large (40px)" />
          </div>
        </CodeExample>
      </section>

      {/* ── With Icons ── */}
      <section className="mb-12">
        <h2 id="icons" className="text-xl font-black tracking-tight text-text mb-2">With Icons</h2>
        <p className="text-sm text-text-secondary mb-4">
          Leading and trailing icon slots provide contextual visual cues. Icons scale with input size.
        </p>
        <CodeExample code={`<Textbox leadingIcon={<O9Icon svg={searchSvg} />} placeholder="Search…" />\n<Textbox leadingIcon={<O9Icon svg={mailSvg} />} label="Email" placeholder="you@example.com" />\n<Textbox leadingIcon={<O9Icon svg={userSvg} />} label="Username" placeholder="johndoe" />`}>
          <div className="space-y-4 max-w-xs">
            <Textbox leadingIcon={<O9Icon svg={searchSvg} />} placeholder="Search…" />
            <Textbox leadingIcon={<O9Icon svg={mailSvg} />} label="Email" placeholder="you@example.com" />
            <Textbox leadingIcon={<O9Icon svg={userSvg} />} label="Username" placeholder="johndoe" />
          </div>
        </CodeExample>
      </section>

      {/* ── Password ── */}
      <section className="mb-12">
        <h2 id="password" className="text-xl font-black tracking-tight text-text mb-2">Password</h2>
        <p className="text-sm text-text-secondary mb-4">
          When <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">type="password"</code> is set, an eye icon toggle appears automatically to show/hide the password. The toggle swaps between eye and eye-slash icons.
        </p>
        <CodeExample code={`<Textbox type="password" label="Password" leadingIcon={<O9Icon svg={lockSvg} />} placeholder="Enter password" />\n<Textbox type="password" label="Confirm Password" placeholder="Re-enter password" />`}>
          <div className="space-y-4 max-w-xs">
            <Textbox type="password" label="Password" leadingIcon={<O9Icon svg={lockSvg} />} placeholder="Enter password" />
            <Textbox type="password" label="Confirm Password" placeholder="Re-enter password" />
          </div>
        </CodeExample>
      </section>

      {/* ── Character Count ── */}
      <section className="mb-12">
        <h2 id="character-count" className="text-xl font-black tracking-tight text-text mb-2">Character Count</h2>
        <p className="text-sm text-text-secondary mb-4">
          Set <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">maxLength</code> and{' '}
          <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">showCount</code> to display a live character counter below the field.
        </p>
        <CodeExample code={`<Textbox label="Username" maxLength={20} showCount placeholder="Enter username" />\n<Textbox label="Bio" maxLength={100} showCount placeholder="Short bio" helperText="Keep it brief" />`}>
          <div className="space-y-4 max-w-xs">
            <Textbox label="Username" maxLength={20} showCount placeholder="Enter username" />
            <Textbox label="Bio" maxLength={100} showCount placeholder="Short bio" helperText="Keep it brief" />
          </div>
        </CodeExample>
      </section>

      {/* ── Validation States ── */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-black tracking-tight text-text mb-2">Validation States</h2>
        <p className="text-sm text-text-secondary mb-4">
          Four states reflect validation outcomes — the bottom border color changes and a status icon appears automatically as trailing icon and before the message text.
        </p>
        <CodeExample code={`<Textbox status="default" label="Default" helperText="Helper text here" defaultValue="Input value" />\n<Textbox status="error" label="Error" errorText="This field is required" defaultValue="bad input" />\n<Textbox status="success" label="Success" helperText="Looks good!" defaultValue="valid@example.com" />\n<Textbox status="warning" label="Warning" helperText="This value already exists" defaultValue="duplicate" />`}>
          <div className="space-y-4 max-w-xs">
            <Textbox status="default" label="Default" helperText="Helper text goes here." defaultValue="Input value" />
            <Textbox status="error" label="Error" errorText="This field is required." defaultValue="invalid input" />
            <Textbox status="success" label="Success" helperText="Looks good!" defaultValue="valid@example.com" />
            <Textbox status="warning" label="Warning" helperText="This value already exists." defaultValue="duplicate@email.com" />
          </div>
        </CodeExample>
      </section>

      {/* ── Disabled & Read-only ── */}
      <section className="mb-12">
        <h2 id="disabled" className="text-xl font-black tracking-tight text-text mb-2">Disabled & Read-only</h2>
        <p className="text-sm text-text-secondary mb-4">
          Disabled fields are non-interactive and visually muted. Read-only fields use a dashed bottom border and display values that cannot be edited.
        </p>
        <CodeExample code={`<Textbox disabled label="Disabled" defaultValue="Can't edit this" />\n<Textbox readOnly label="Read-only" defaultValue="View-only value" />`}>
          <div className="space-y-4 max-w-xs">
            <Textbox disabled label="Disabled" defaultValue="Can't edit this" />
            <Textbox readOnly label="Read-only" defaultValue="View-only value" />
          </div>
        </CodeExample>
      </section>

      {/* ── Icon Sizes ── */}
      <section className="mb-12">
        <h2 id="icon-sizes" className="text-xl font-black tracking-tight text-text mb-2">Icon Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Icons automatically scale with input size — smaller for sm, larger for lg.
        </p>
        <CodeExample code={`<Textbox size="sm" leadingIcon={<O9Icon svg={searchSvg} />} placeholder="Small with icon" />\n<Textbox size="md" leadingIcon={<O9Icon svg={searchSvg} />} placeholder="Medium with icon" />\n<Textbox size="lg" leadingIcon={<O9Icon svg={searchSvg} />} placeholder="Large with icon" />`}>
          <div className="space-y-4 max-w-xs">
            <Textbox size="sm" leadingIcon={<O9Icon svg={searchSvg} />} placeholder="Small with icon" />
            <Textbox size="md" leadingIcon={<O9Icon svg={searchSvg} />} placeholder="Medium with icon" />
            <Textbox size="lg" leadingIcon={<O9Icon svg={searchSvg} />} placeholder="Large with icon" />
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Always pair a Textbox with a visible label for accessibility',
            'Use helperText to set expectations before input, errorText to explain failures after',
            'Use leadingIcon to reinforce the input type (search, email, phone)',
            'Use showCount with maxLength for fields with hard character limits (usernames, bios)',
            'Use status="error" in combination with errorText — never just change the border color',
            'Use readOnly for values the user should see but cannot change (e.g., auto-generated IDs)',
          ]}
          dontItems={[
            'Do not rely on placeholder text as a substitute for a label',
            'Avoid using size="lg" in dense forms — prefer md for most contexts',
            'Do not show both a success and error state simultaneously',
            'Avoid placing two trailingIcon elements — use a single icon or a clear button',
            'Avoid showing character count on fields without a meaningful limit',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses a native <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">&lt;input&gt;</code> element with auto-generated <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">id</code> from label text.</>,
            <>Label is connected to the input via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">htmlFor</code>.</>,
            <>Icons are decorative (<code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">pointer-events-none</code>).</>,
            <>Disabled state uses the native <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">disabled</code> attribute.</>,
            <>Read-only state uses the native <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">readOnly</code> attribute.</>,
            'Status icons (error, success, warning) appear automatically as trailing icons and before message text.',
            'Character count is visible text, accessible to screen readers.',
            'Read-only fields use a dashed bottom border to visually distinguish from disabled fields.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── API Reference ── */}
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
