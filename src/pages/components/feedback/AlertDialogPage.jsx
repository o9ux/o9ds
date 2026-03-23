import { useState } from 'react';
import AlertDialog from '@/components/feedback/AlertDialog';
import Button from '@/components/buttons/Button';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const alertDialogProps = [
  { name: 'open', type: 'boolean', default: 'false', description: 'Whether the dialog is visible' },
  { name: 'onClose', type: '() => void', default: 'undefined', description: 'Called when dialog should close' },
  { name: 'intent', type: "'info' | 'warning' | 'danger' | 'confirm'", default: "'confirm'", description: 'Visual intent / severity' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Dialog title' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Dialog body text' },
  { name: 'confirmLabel', type: 'string', default: "'Confirm'", description: 'Confirm button label' },
  { name: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Cancel button label' },
  { name: 'onConfirm', type: '() => void', default: 'undefined', description: 'Called when confirm is clicked' },
  { name: 'onCancel', type: '() => void', default: 'undefined', description: 'Called when cancel is clicked or backdrop clicked' },
];

export default function AlertDialogPage() {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState('confirm');

  return (
    <article>
      <PageHeader title="Alert Dialog" description="A modal dialog that requires the user to acknowledge or confirm an action before proceeding. Use it for destructive actions, important confirmations, or critical information." status="stable" category="Status & System Feedback" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">Click the button to open the dialog.</p>
        <ComponentDemo controls={[
          { type: 'select', label: 'Intent', value: intent, onChange: setIntent, options: ['confirm', 'info', 'warning', 'danger'] },
        ]}>
          <Button onClick={() => setOpen(true)}>Open Dialog</Button>
          <AlertDialog open={open} onClose={() => setOpen(false)} intent={intent} title="Confirm Action" description="Are you sure you want to proceed with this action? This cannot be undone." confirmLabel={intent === 'danger' ? 'Delete' : 'Confirm'} />
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="intents" className="text-xl font-black tracking-tight text-text mb-2">Intents</h2>
        <p className="text-sm text-text-secondary mb-4">Four intents communicate severity. Try each with the demo above.</p>
        <div className="grid grid-cols-2 gap-3 max-w-sm">
          {['confirm', 'info', 'warning', 'danger'].map((i) => (
            <Button key={i} variant="outline" size="sm" onClick={() => { setIntent(i); setOpen(true); }}>
              {i.charAt(0).toUpperCase() + i.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for actions that require explicit confirmation (delete, discard, submit)', 'Use the danger intent for destructive actions', 'Keep the title and description concise', 'Always provide both confirm and cancel options']}
          dontItems={['Do not use for routine actions that can be easily undone', 'Avoid stacking multiple dialogs', 'Do not use for informational messages — use Toast or InlineAlert', 'Avoid long descriptions — keep to 1-2 sentences']}
        />
      </section>

      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {['Uses role="alertdialog" and aria-modal="true".', 'Title and description are linked via aria-labelledby and aria-describedby.', 'Backdrop click triggers cancel for easy dismissal.', 'Body scroll is locked while the dialog is open.'].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary"><span className="mt-px text-text font-bold shrink-0">—</span>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={alertDialogProps} />
      </section>
    </article>
  );
}
