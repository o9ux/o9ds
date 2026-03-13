import { useState, useCallback } from 'react';
import Toast from '@/components/feedback/Toast';
import Button from '@/components/buttons/Button';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const toastProps = [
  { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger' | 'neutral'", default: "'neutral'", description: 'Visual variant / severity' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Toast title' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Toast body text' },
  { name: 'dismissible', type: 'boolean', default: 'true', description: 'Show close button' },
  { name: 'duration', type: 'number', default: '5000', description: 'Auto-dismiss duration in ms (0 to disable)' },
  { name: 'onDismiss', type: '() => void', default: 'undefined', description: 'Called when toast is dismissed' },
  { name: 'action', type: 'ReactNode', default: 'undefined', description: 'Optional action element (button/link)' },
];

export default function ToastPage() {
  const [variant, setVariant] = useState('success');
  const [key, setKey] = useState(0);

  const resetToast = useCallback(() => setKey((k) => k + 1), []);

  return (
    <article>
      <PageHeader title="Toast" description="Toasts are non-intrusive, ephemeral notifications that appear briefly to communicate the result of an action. They auto-dismiss and can be manually closed." status="stable" category="Status & System Feedback" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'Variant', value: variant, onChange: (v) => { setVariant(v); resetToast(); }, options: ['neutral', 'info', 'success', 'warning', 'danger'] },
        ]}>
          <Toast key={key} variant={variant} title="Action completed" description="Your changes have been saved successfully." duration={0} />
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <CodeExample code={`<Toast variant="info" title="Info" description="New update available." />\n<Toast variant="success" title="Success" description="File uploaded." />\n<Toast variant="warning" title="Warning" description="Disk almost full." />\n<Toast variant="danger" title="Error" description="Upload failed." />`}>
          <div className="flex flex-col gap-3">
            <Toast variant="info" title="Info" description="A new update is available for download." duration={0} />
            <Toast variant="success" title="Success" description="File has been uploaded successfully." duration={0} />
            <Toast variant="warning" title="Warning" description="Your disk space is almost full." duration={0} />
            <Toast variant="danger" title="Error" description="File upload failed. Please try again." duration={0} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="with-action" className="text-xl font-black tracking-tight text-text mb-2">With Action</h2>
        <CodeExample code={`<Toast variant="info" title="Update Available" action={<Button size="sm" variant="tertiary">Update Now</Button>} />`}>
          <Toast variant="info" title="Update Available" description="Version 2.0 is ready to install." duration={0} action={<Button size="sm" variant="tertiary">Update Now</Button>} />
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for brief, non-critical feedback (save success, copy confirmation)', 'Auto-dismiss after 3-5 seconds for non-actionable toasts', 'Position toasts consistently (bottom-right recommended)', 'Keep messages short — one line for title, one for description']}
          dontItems={['Do not use for critical errors that require user action — use AlertDialog', 'Avoid stacking more than 3 toasts at once', 'Do not put essential information only in toasts — they disappear', 'Avoid very long durations — toasts should be ephemeral']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={toastProps} />
      </section>
    </article>
  );
}
