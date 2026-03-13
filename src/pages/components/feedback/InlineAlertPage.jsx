import { useState } from 'react';
import InlineAlert from '@/components/feedback/InlineAlert';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const alertProps = [
  { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Semantic intent of the alert' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Optional bold headline above the body text' },
  { name: 'compact', type: 'boolean', default: 'false', description: 'Single-line compact layout — title and children on the same row' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Body / description text' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function InlineAlertPage() {
  const [variant, setVariant] = useState('info');
  const [compact, setCompact] = useState(false);

  return (
    <article>
      <PageHeader
        title="Inline Alert"
        description="Inline alerts provide contextual, non-blocking feedback directly within a page or form — communicating system messages, validation results, and status changes."
        status="stable"
        category="Status & System Feedback"
      />

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo
          controls={[
            { type: 'select', label: 'Variant', value: variant, onChange: setVariant, options: ['info', 'success', 'warning', 'danger'] },
            { type: 'checkbox', label: 'Compact', value: compact, onChange: setCompact },
          ]}
        >
          <InlineAlert variant={variant} title="Alert headline" compact={compact}>
            This is the supporting detail text for the alert. It provides additional context.
          </InlineAlert>
        </ComponentDemo>
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Four semantic variants aligned to the o9ds feedback color system.
        </p>
        <CodeExample code={`<InlineAlert variant="info" title="Information">Background sync is in progress.</InlineAlert>
<InlineAlert variant="success" title="Success">Your changes have been saved.</InlineAlert>
<InlineAlert variant="warning" title="Warning">This action may affect other users.</InlineAlert>
<InlineAlert variant="danger" title="Error">Failed to save — please try again.</InlineAlert>`}>
          <div className="space-y-3">
            <InlineAlert variant="info" title="Information">Background sync is in progress.</InlineAlert>
            <InlineAlert variant="success" title="Success">Your changes have been saved successfully.</InlineAlert>
            <InlineAlert variant="warning" title="Warning">This action may affect other users.</InlineAlert>
            <InlineAlert variant="danger" title="Error">Failed to save — please try again.</InlineAlert>
          </div>
        </CodeExample>
      </section>

      {/* Compact */}
      <section className="mb-12">
        <h2 id="compact" className="text-xl font-black tracking-tight text-text mb-2">Compact</h2>
        <p className="text-sm text-text-secondary mb-4">
          Single-line layout for tight spaces like form field validation or narrow panels.
        </p>
        <CodeExample code={`<InlineAlert variant="danger" title="Invalid email address" compact />
<InlineAlert variant="success" title="Email confirmed" compact />`}>
          <div className="space-y-3">
            <InlineAlert variant="danger" title="Invalid email address" compact />
            <InlineAlert variant="success" title="Email confirmed" compact />
          </div>
        </CodeExample>
      </section>

      {/* Body only */}
      <section className="mb-12">
        <h2 id="body-only" className="text-xl font-black tracking-tight text-text mb-2">Body Only</h2>
        <p className="text-sm text-text-secondary mb-4">
          Title is optional — use body-only alerts for brief, self-explanatory messages.
        </p>
        <CodeExample code={`<InlineAlert variant="warning">Save before navigating away.</InlineAlert>`}>
          <InlineAlert variant="warning">Save before navigating away — unsaved changes will be lost.</InlineAlert>
        </CodeExample>
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Place inline alerts close to the element they describe (e.g., directly below a form field)',
            'Use the danger variant for destructive or blocking errors only',
            'Keep the title short (3–5 words) and the body to one or two sentences',
            'Use compact mode in narrow containers or for single-field validation messages',
          ]}
          dontItems={[
            'Do not use inline alerts for transient actions like "Copied to clipboard" — use Toast instead',
            'Do not stack more than two inline alerts in the same view',
            'Avoid using the info variant as a substitute for descriptive helper text',
            'Do not use inline alerts as interactive controls — they are read-only status indicators',
          ]}
        />
      </section>

      {/* API */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={alertProps} />
      </section>
    </article>
  );
}
