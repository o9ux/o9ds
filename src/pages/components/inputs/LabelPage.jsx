import { useState } from 'react';
import Label from '@/components/inputs/Label';
import Textbox from '@/components/inputs/Textbox';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const labelProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Text size of the label' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Shows a required asterisk indicator' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Shows an (optional) text indicator' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Visually mutes the label' },
  { name: 'htmlFor', type: 'string', default: 'undefined', description: 'Associates the label with a form control' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Label text content' },
];

export default function LabelPage() {
  const [required, setRequired] = useState(false);
  const [optional, setOptional] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <article>
      <PageHeader title="Label" description="Labels identify form controls and provide accessible names. They can indicate required or optional fields." status="stable" category="Input & Form Controls" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">Toggle label modifiers below.</p>
        <ComponentDemo controls={[
          { type: 'checkbox', label: 'Required', value: required, onChange: setRequired },
          { type: 'checkbox', label: 'Optional', value: optional, onChange: setOptional },
          { type: 'checkbox', label: 'Disabled', value: disabled, onChange: setDisabled },
        ]}>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-text-tertiary w-6 shrink-0">sm</span>
              <Label size="sm" required={required} optional={!required && optional} disabled={disabled}>
                Field Label
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-text-tertiary w-6 shrink-0">md</span>
              <Label size="md" required={required} optional={!required && optional} disabled={disabled}>
                Field Label
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-text-tertiary w-6 shrink-0">lg</span>
              <Label size="lg" required={required} optional={!required && optional} disabled={disabled}>
                Field Label
              </Label>
            </div>
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Indicators</h2>
        <p className="text-sm text-text-secondary mb-4">Show required asterisk or optional hint.</p>
        <CodeExample code={`<Label>Default</Label>\n<Label required>Required Field</Label>\n<Label optional>Optional Field</Label>`}>
          <div className="flex flex-col gap-3">
            <Label>Default</Label>
            <Label required>Required Field</Label>
            <Label optional>Optional Field</Label>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="with-input" className="text-xl font-black tracking-tight text-text mb-2">With Form Control</h2>
        <p className="text-sm text-text-secondary mb-4">Labels pair with any form input via htmlFor.</p>
        <CodeExample code={`<Label htmlFor="email" required>Email address</Label>\n<Textbox id="email" placeholder="you@example.com" />`}>
          <div className="flex flex-col gap-1.5 max-w-xs">
            <Label htmlFor="email-demo" required>Email address</Label>
            <Textbox id="email-demo" placeholder="you@example.com" />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Always pair labels with their associated input via htmlFor', 'Use the required indicator for mandatory fields', 'Keep labels short and descriptive']}
          dontItems={['Do not use placeholder text as a label substitute', 'Avoid using both required and optional on the same label', 'Do not hide labels — they are critical for accessibility']}
        />
      </section>

      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {['Uses the native <label> element for inherent form association.', 'The required asterisk uses aria-hidden to prevent screen readers from reading it as "star".', 'The htmlFor prop links the label to its input for click-to-focus behavior.'].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary"><span className="mt-px text-text font-bold shrink-0">—</span>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={labelProps} />
      </section>
    </article>
  );
}
