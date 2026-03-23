import { useState, useCallback, useRef } from 'react';
import Toast from '@/components/feedback/Toast';
import Button from '@/components/buttons/Button';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const toastProps = [
  { name: 'variant', type: "'negative' | 'warning' | 'info' | 'success' | 'block' | 'neutral'", default: "'neutral'", description: 'Semantic type controlling icon, accent color, and auto-dismiss behavior' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Bold title line — truncated after 2 lines with ellipsis' },
  { name: 'message', type: 'string', default: 'undefined', description: 'Body text below the title' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Alias for message (legacy compatibility)' },
  { name: 'link', type: 'string', default: 'undefined', description: 'Action link label displayed below the message — rendered using the Link component' },
  { name: 'linkHref', type: 'string', default: 'undefined', description: 'URL for the action link' },
  { name: 'onLinkClick', type: '() => void', default: 'undefined', description: 'Callback when the action link is clicked (prevents default navigation)' },
  { name: 'icon', type: 'string (SVG raw)', default: 'undefined', description: 'Custom icon override — only applies to the neutral variant' },
  { name: 'dismissible', type: 'boolean', default: 'true', description: 'Show close button' },
  { name: 'hasFadeAway', type: 'boolean', default: 'true', description: 'Enable fade-away animation after timeout. Ignored for negative/block variants' },
  { name: 'duration', type: 'number', default: '5000', description: 'Timeout in ms before fade begins (0 disables auto-dismiss)' },
  { name: 'onDismiss', type: '() => void', default: 'undefined', description: 'Called when the toast is removed (by fade completion or manual close)' },
  { name: 'action', type: 'ReactNode', default: 'undefined', description: 'Optional action element (button/link) — legacy slot' },
];

export default function ToastPage() {
  /* ── Interactive Demo state ── */
  const [variant, setVariant] = useState('info');
  const [hasTitle, setHasTitle] = useState(true);
  const [hasLink, setHasLink] = useState(true);
  const [hasFadeAway, setHasFadeAway] = useState(false);
  const [key, setKey] = useState(0);

  const resetToast = useCallback(() => setKey((k) => k + 1), []);

  /* ── Fade Away Demo state ── */
  const [fadeKey, setFadeKey] = useState(0);
  const [fadeRunning, setFadeRunning] = useState(false);

  const triggerFadeDemo = useCallback(() => {
    setFadeRunning(true);
    setFadeKey((k) => k + 1);
  }, []);

  /* ── Stacking Demo ── */
  const [stackToasts, setStackToasts] = useState([]);
  const stackIdRef = useRef(0);

  const addStackToast = useCallback((v) => {
    const id = ++stackIdRef.current;
    const configs = {
      info: { title: 'New update available', message: 'Version 3.2 is ready to install.', link: 'View changelog' },
      success: { title: 'File uploaded', message: 'document.pdf has been saved to your drive.' },
      warning: { title: 'Disk space low', message: 'Only 2 GB remaining on your primary drive.' },
      negative: { title: 'Upload failed', message: 'Unable to save changes. Check your connection.' },
    };
    setStackToasts((prev) => [{ id, variant: v, ...configs[v] }, ...prev]);
  }, []);

  const removeStackToast = useCallback((id) => {
    setStackToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <article className="space-y-12">
      <PageHeader
        title="Toast"
        description="Toasts are lightweight, non-blocking alerts that provide contextual feedback. They auto-stack, fade away after a timeout, and support accessibility best practices. Error and block types persist until manually dismissed."
        status="stable"
        category="Status & System Feedback"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 id="demo" className="text-lg font-semibold text-text mb-4">Interactive Demo</h2>
        <ComponentDemo
          controls={[
            {
              type: 'select',
              label: 'Variant',
              value: variant,
              onChange: (v) => { setVariant(v); resetToast(); },
              options: ['negative', 'warning', 'info', 'success', 'block', 'neutral'],
            },
            { type: 'checkbox', label: 'Title', checked: hasTitle, onChange: (v) => { setHasTitle(v); resetToast(); } },
            { type: 'checkbox', label: 'Link', checked: hasLink, onChange: (v) => { setHasLink(v); resetToast(); } },
            { type: 'checkbox', label: 'Fade Away', checked: hasFadeAway, onChange: (v) => { setHasFadeAway(v); resetToast(); } },
          ]}
        >
          <Toast
            key={key}
            variant={variant}
            title={hasTitle ? 'Alert title' : undefined}
            message="Your toast alert message will appear in this area, depending on the alert type."
            link={hasLink ? 'Navigate to view' : undefined}
            hasFadeAway={hasFadeAway}
            duration={hasFadeAway ? 5000 : 0}
          />
        </ComponentDemo>
      </section>

      {/* ── Variants ── */}
      <section>
        <h2 id="variants" className="text-lg font-semibold text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Six semantic variants, each with a dedicated icon, accent color, and auto-dismiss behavior.
          <strong className="text-text"> Negative</strong> and <strong className="text-text">Block</strong> types
          cannot auto-dismiss — they persist until the user closes them.
        </p>
        <CodeExample code={`<Toast variant="negative" title="Error" message="Data failed to load." duration={0} />
<Toast variant="warning" title="Warning" message="Your session will expire soon." duration={0} />
<Toast variant="info" title="Info" message="A new update is available." duration={0} />
<Toast variant="success" title="Success" message="File uploaded successfully." duration={0} />
<Toast variant="block" title="Blocked" message="Action blocked by admin policy." duration={0} />
<Toast variant="neutral" title="Note" message="System maintenance scheduled." duration={0} />`}>
          <div className="flex flex-col items-end gap-3">
            <Toast variant="negative" title="Error" message="Data failed to load. Please try again." duration={0} />
            <Toast variant="warning" title="Warning" message="Your session will expire in 5 minutes." duration={0} />
            <Toast variant="info" title="Info" message="A new update is available for download." duration={0} />
            <Toast variant="success" title="Success" message="File has been uploaded successfully." duration={0} />
            <Toast variant="block" title="Blocked" message="This action is blocked by admin policy." duration={0} />
            <Toast variant="neutral" title="Note" message="System maintenance scheduled for tonight." duration={0} />
          </div>
        </CodeExample>
      </section>

      {/* ── With Link ── */}
      <section>
        <h2 id="with-link" className="text-lg font-semibold text-text mb-2">With Action Link</h2>
        <p className="text-sm text-text-secondary mb-4">
          Add a contextual link below the message. If multiple widgets are configured in the same view,
          include the report/widget name in the title area.
        </p>
        <CodeExample code={`<Toast
  variant="info"
  title="Report: Sales Dashboard"
  message="Data refresh completed successfully."
  link="Navigate to view"
  onLinkClick={() => console.log('Navigate')}
  duration={0}
/>`}>
          <div className="flex flex-col items-end gap-3">
            <Toast
              variant="info"
              title="Report: Sales Dashboard"
              message="Data refresh completed successfully."
              link="Navigate to view"
              duration={0}
            />
            <Toast
              variant="success"
              title="Export complete"
              message="Your report has been exported as PDF."
              link="Download file"
              duration={0}
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Title Truncation ── */}
      <section>
        <h2 id="title-truncation" className="text-lg font-semibold text-text mb-2">Title Truncation</h2>
        <p className="text-sm text-text-secondary mb-4">
          Toast titles are truncated after 2 lines with ellipsis, keeping the toast compact.
        </p>
        <CodeExample code={`<Toast
  variant="warning"
  title="This is a very long title that should be truncated after two lines because it contains too much information"
  message="The message remains fully visible."
  duration={0}
/>`}>
          <div className="max-w-sm">
            <Toast
              variant="warning"
              title="This is a very long title that should be truncated after two lines because it contains too much information for a single toast notification"
              message="The message remains fully visible."
              duration={0}
            />
          </div>
        </CodeExample>
      </section>

      {/* ── Fade Away Behavior ── */}
      <section>
        <h2 id="fade-away" className="text-lg font-semibold text-text mb-2">Fade Away Behavior</h2>
        <p className="text-sm text-text-secondary mb-4">
          When <code className="text-xs bg-surface-raised px-1.5 py-0.5 rounded">hasFadeAway</code> is enabled (default for non-error types),
          the toast follows this lifecycle:
        </p>
        <ul className="list-disc list-inside text-sm text-text-secondary mb-4 space-y-1">
          <li><strong className="text-text">Timeout phase</strong> — Toast is fully visible (opacity 100%) for the <code className="text-xs bg-surface-raised px-1.5 py-0.5 rounded">duration</code> (default 5s).</li>
          <li><strong className="text-text">Fade out phase</strong> — Opacity decreases in steps: 100% → 75% → 50% → 25% → 0% (~200ms each, ~1s total). Uses <code className="text-xs bg-surface-raised px-1.5 py-0.5 rounded">ease-in-out</code> motion token.</li>
          <li><strong className="text-text">Hover pause</strong> — Hovering returns opacity to 100% instantly. Timer/fade pauses. On mouse leave, the full cycle restarts.</li>
        </ul>
        <CodeExample code={`<Toast
  variant="success"
  title="Changes saved"
  message="Your document has been saved."
  hasFadeAway
  duration={3000}
/>`}>
          <div className="flex flex-col items-end gap-4">
            {fadeRunning ? (
              <Toast
                key={fadeKey}
                variant="success"
                title="Changes saved"
                message="Your document has been saved. Hover to pause the fade."
                link="View document"
                hasFadeAway
                duration={3000}
                onDismiss={() => setFadeRunning(false)}
              />
            ) : (
              <p className="text-xs text-text-tertiary italic">Toast dismissed. Click below to see it again.</p>
            )}
            <Button size="sm" variant="outline" onClick={triggerFadeDemo}>
              {fadeRunning ? 'Restart' : 'Show Fade Away Toast'}
            </Button>
          </div>
        </CodeExample>
      </section>

      {/* ── Dismissal Rules ── */}
      <section>
        <h2 id="dismissal" className="text-lg font-semibold text-text mb-2">Dismissal Rules</h2>
        <p className="text-sm text-text-secondary mb-4">
          Error types (<code className="text-xs bg-surface-raised px-1.5 py-0.5 rounded">negative</code> and <code className="text-xs bg-surface-raised px-1.5 py-0.5 rounded">block</code>)
          ignore <code className="text-xs bg-surface-raised px-1.5 py-0.5 rounded">hasFadeAway</code> and <code className="text-xs bg-surface-raised px-1.5 py-0.5 rounded">duration</code>.
          They persist until explicitly closed via the close button.
        </p>
        <CodeExample code={`{/* These will NOT auto-dismiss, regardless of hasFadeAway */}
<Toast variant="negative" title="Error" message="Cannot auto-dismiss." hasFadeAway duration={3000} />
<Toast variant="block" title="Blocked" message="Requires manual close." hasFadeAway duration={3000} />`}>
          <div className="flex flex-col items-end gap-3">
            <Toast variant="negative" title="Connection error" message="Unable to reach the server. This toast will not auto-dismiss." hasFadeAway duration={3000} />
            <Toast variant="block" title="Action blocked" message="Critical blocker — requires manual dismissal." hasFadeAway duration={3000} />
          </div>
        </CodeExample>
      </section>

      {/* ── Stacking ── */}
      <section>
        <h2 id="stacking" className="text-lg font-semibold text-text mb-2">Stacking</h2>
        <p className="text-sm text-text-secondary mb-4">
          New toasts appear on top, pushing older ones downward. Click the buttons to add toasts.
        </p>
        <CodeExample code={`// New toasts always stack on top
<div className="flex flex-col gap-2">
  {toasts.map((t) => <Toast key={t.id} {...t} />)}
</div>`}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => addStackToast('info')}>+ Info</Button>
              <Button size="sm" variant="outline" onClick={() => addStackToast('success')}>+ Success</Button>
              <Button size="sm" variant="outline" onClick={() => addStackToast('warning')}>+ Warning</Button>
              <Button size="sm" variant="outline" onClick={() => addStackToast('negative')}>+ Error</Button>
            </div>
            <div className="flex flex-col items-end gap-2 min-h-[60px]">
              {stackToasts.length === 0 && (
                <p className="text-xs text-text-tertiary italic">No toasts. Click a button above.</p>
              )}
              {stackToasts.map((t) => (
                <Toast
                  key={t.id}
                  variant={t.variant}
                  title={t.title}
                  message={t.message}
                  link={t.link}
                  hasFadeAway={t.variant !== 'negative'}
                  duration={t.variant === 'negative' ? 0 : 5000}
                  onDismiss={() => removeStackToast(t.id)}
                />
              ))}
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Without Title ── */}
      <section>
        <h2 id="without-title" className="text-lg font-semibold text-text mb-2">Without Title</h2>
        <p className="text-sm text-text-secondary mb-4">
          Title is optional. Toasts work with message only for simple notifications.
        </p>
        <CodeExample code={`<Toast variant="success" message="Settings saved." duration={0} />
<Toast variant="info" message="2 items added to your cart." duration={0} />`}>
          <div className="flex flex-col items-end gap-3">
            <Toast variant="success" message="Settings have been saved successfully." duration={0} />
            <Toast variant="info" message="2 items have been added to your cart." duration={0} />
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-lg font-semibold text-text mb-4">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use for brief, non-critical feedback (save success, copy confirmation)',
            'Auto-dismiss non-error toasts after 3-5 seconds',
            'Use negative/block variants for errors that require user acknowledgment',
            'Include report/widget name in the title when multiple widgets share a view',
            'Keep messages short — one line for title, one for description',
            'Position toasts consistently (bottom-right recommended)',
          ]}
          dontItems={[
            'Do not use for critical actions that require user input — use AlertDialog',
            'Avoid stacking more than 3-4 toasts at once',
            'Do not put essential information only in toasts — they fade away',
            'Do not use block type for recoverable errors — use negative instead',
            'Avoid very long durations — toasts should be ephemeral',
            'Do not override the icon for non-neutral variants',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>ARIA role: <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">status</code> for non-blocking alerts, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">alert</code> for negative/block variants.</>,
            <>Keyboard: <kbd className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Tab</kbd> moves focus into toast. <kbd className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Esc</kbd> closes focused toast. <kbd className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Enter</kbd> activates links.</>,
            'Screen readers announce toast type + title + message.',
            'All text and icons meet WCAG 2.2 AA contrast ratios.',
            'Fade is paused on hover, ensuring users can read the toast.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Keyboard Navigation ── */}
      <section>
        <h2 id="keyboard" className="text-lg font-semibold text-text mb-4">Keyboard Navigation</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-6 font-semibold text-text">Key</th>
                <th className="text-left py-2 font-semibold text-text">Action</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">Tab</kbd></td>
                <td className="py-2">Move focus into the toast (close button, then link)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">Esc</kbd></td>
                <td className="py-2">Close the focused toast</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">Enter</kbd></td>
                <td className="py-2">Activate the close button or action link</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-4">API Reference</h2>
        <PropsTable props={toastProps} />
      </section>
    </article>
  );
}
