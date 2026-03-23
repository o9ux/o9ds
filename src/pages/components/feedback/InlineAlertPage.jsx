import { useState, useCallback } from 'react';
import InlineAlert from '@/components/feedback/InlineAlert';
import Button from '@/components/buttons/Button';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const alertProps = [
  { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger' | 'block' | 'neutral'", default: "'info'", description: 'Semantic type controlling icon, accent color, and styling' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Optional bold headline above the body text' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Body / description text' },
  { name: 'compact', type: 'boolean', default: 'false', description: 'Single-line compact layout — title and children on the same row' },
  { name: 'dismissible', type: 'boolean', default: 'false', description: 'Show close button to dismiss the alert' },
  { name: 'onDismiss', type: '() => void', default: 'undefined', description: 'Callback when the alert is dismissed' },
  { name: 'actionLabel', type: 'string', default: 'undefined', description: 'Label for an optional outline action button rendered in the content area (above the link)' },
  { name: 'onActionClick', type: '() => void', default: 'undefined', description: 'Callback when the content action button is clicked' },
  { name: 'link', type: 'string', default: 'undefined', description: 'Action link label displayed below the action button — rendered using the Link component' },
  { name: 'linkHref', type: 'string', default: 'undefined', description: 'URL for the action link' },
  { name: 'onLinkClick', type: '() => void', default: 'undefined', description: 'Callback when the action link is clicked (prevents default navigation)' },
  { name: 'secondaryText', type: 'string', default: 'undefined', description: 'Optional secondary description text displayed below the link in secondary/tertiary color' },
  { name: 'icon', type: 'string (SVG raw)', default: 'undefined', description: 'Custom icon override (raw SVG string via ?raw import)' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function InlineAlertPage() {
  const [variant, setVariant] = useState('info');
  const [compact, setCompact] = useState(false);
  const [hasTitle, setHasTitle] = useState(true);
  const [hasLink, setHasLink] = useState(false);
  const [hasActionBtn, setHasActionBtn] = useState(false);
  const [hasSecondaryText, setHasSecondaryText] = useState(false);
  const [isDismissible, setIsDismissible] = useState(false);
  const [demoKey, setDemoKey] = useState(0);

  const resetDemo = useCallback(() => setDemoKey((k) => k + 1), []);

  /* ── Dismissible demo state ── */
  const [dismissKey, setDismissKey] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  return (
    <article className="space-y-12">
      <PageHeader
        title="Inline Alert"
        description="Inline alerts provide contextual, non-blocking feedback directly within a page or form — communicating system messages, validation results, and status changes. They support six semantic variants, optional action buttons, action links, secondary text, and dismissible behavior."
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
              onChange: (v) => { setVariant(v); resetDemo(); },
              options: ['info', 'success', 'warning', 'danger', 'block', 'neutral'],
            },
            { type: 'checkbox', label: 'Compact', checked: compact, onChange: (v) => { setCompact(v); resetDemo(); } },
            { type: 'checkbox', label: 'Title', checked: hasTitle, onChange: (v) => { setHasTitle(v); resetDemo(); } },
            { type: 'checkbox', label: 'Action Button', checked: hasActionBtn, onChange: (v) => { setHasActionBtn(v); resetDemo(); } },
            { type: 'checkbox', label: 'Link', checked: hasLink, onChange: (v) => { setHasLink(v); resetDemo(); } },
            { type: 'checkbox', label: 'Secondary Text', checked: hasSecondaryText, onChange: (v) => { setHasSecondaryText(v); resetDemo(); } },
            { type: 'checkbox', label: 'Dismissible', checked: isDismissible, onChange: (v) => { setIsDismissible(v); resetDemo(); } },
          ]}
        >
          <InlineAlert
            key={demoKey}
            variant={variant}
            title={hasTitle ? 'Alert title' : undefined}
            compact={compact}
            dismissible={isDismissible}
            actionLabel={hasActionBtn ? 'Button' : undefined}
            link={hasLink ? 'Read more about this' : undefined}
            secondaryText={hasSecondaryText ? 'The o9 favourite service is not available at the moment and a few UI features' : undefined}
          >
            The o9 favourite service is not available at the moment and a few UI features
          </InlineAlert>
        </ComponentDemo>
      </section>

      {/* ── Variants ── */}
      <section>
        <h2 id="variants" className="text-lg font-semibold text-text mb-2">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          Six semantic variants aligned to the o9ds feedback system, each with a dedicated icon, accent color, and purpose.
        </p>
        <ul className="list-disc list-inside text-sm text-text-secondary mb-4 space-y-1">
          <li><strong className="text-text">Information</strong> — Provides non-critical information. Prefer toast or banner alerts for transient messages.</li>
          <li><strong className="text-text">Success</strong> — Conveys successful completion of an action. Prefer toast or banner notifications.</li>
          <li><strong className="text-text">Warning</strong> — Indicates a cautionary situation requiring user awareness.</li>
          <li><strong className="text-text">Error (Danger)</strong> — Communicates an error condition that requires user attention. Uses Scarlet L1.</li>
          <li><strong className="text-text">Block</strong> — Used for actions that block user workflow until addressed. Uses Scarlet D1.</li>
          <li><strong className="text-text">Neutral</strong> — General-purpose, non-semantic alerts for announcements or informational notices.</li>
        </ul>
        <CodeExample code={`<InlineAlert variant="danger" title="Alert title">The o9 favourite service is not available.</InlineAlert>
<InlineAlert variant="warning" title="Alert title">This action may affect other users.</InlineAlert>
<InlineAlert variant="info" title="Alert title">Background sync is in progress.</InlineAlert>
<InlineAlert variant="success" title="Alert title">Your changes have been saved.</InlineAlert>
<InlineAlert variant="block" title="Alert title">Action blocked by admin policy.</InlineAlert>
<InlineAlert variant="neutral" title="Alert title">System maintenance scheduled tonight.</InlineAlert>`}>
          <div className="space-y-3">
            <InlineAlert variant="danger" title="Alert title">The o9 favourite service is not available at the moment and a few UI features</InlineAlert>
            <InlineAlert variant="warning" title="Alert title">This action may affect other users in this workspace.</InlineAlert>
            <InlineAlert variant="info" title="Alert title">Background sync is in progress across all channels.</InlineAlert>
            <InlineAlert variant="success" title="Alert title">Your changes have been saved successfully.</InlineAlert>
            <InlineAlert variant="block" title="Alert title">This action is blocked by admin policy.</InlineAlert>
            <InlineAlert variant="neutral" title="Alert title">System maintenance is scheduled for tonight at 11 PM.</InlineAlert>
          </div>
        </CodeExample>
      </section>

      {/* ── Full Layout — All Features ── */}
      <section>
        <h2 id="full-layout" className="text-lg font-semibold text-text mb-2">Full Layout</h2>
        <p className="text-sm text-text-secondary mb-4">
          The alert supports all content elements simultaneously: title, message, action button, link, secondary text, and close button. Content area order: title, message, button, link, secondary text.
        </p>
        <CodeExample code={`<InlineAlert
  variant="danger"
  title="Alert title"
  dismissible
  actionLabel="Button"
  link="Read more about this"
  secondaryText="The o9 favourite service is not available at the moment."
>
  The o9 favourite service is not available at the moment and a few UI features
</InlineAlert>`}>
          <div className="space-y-3">
            <InlineAlert
              variant="danger"
              title="Alert title"
              dismissible
              actionLabel="Button"
              link="Read more about this"
              secondaryText="The o9 favourite service is not available at the moment and a few UI features"

            >
              The o9 favourite service is not available at the moment and a few UI features
            </InlineAlert>
            <InlineAlert
              variant="warning"
              title="Alert title"
              dismissible
              actionLabel="Button"
              link="Read more about this"
              secondaryText="The o9 favourite service is not available at the moment and a few UI features"

            >
              The o9 favourite service is not available at the moment and a few UI features
            </InlineAlert>
            <InlineAlert
              variant="info"
              title="Alert title"
              dismissible
              actionLabel="Button"
              link="Read more about this"
              secondaryText="The o9 favourite service is not available at the moment and a few UI features"

            >
              The o9 favourite service is not available at the moment and a few UI features
            </InlineAlert>
            <InlineAlert
              variant="success"
              title="Alert title"
              dismissible
              actionLabel="Button"
              link="Read more about this"
              secondaryText="The o9 favourite service is not available at the moment and a few UI features"

            >
              The o9 favourite service is not available at the moment and a few UI features
            </InlineAlert>
            <InlineAlert
              variant="block"
              title="Alert title"
              dismissible
              actionLabel="Button"
              link="Read more about this"
              secondaryText="The o9 favourite service is not available at the moment and a few UI features"

            >
              The o9 favourite service is not available at the moment and a few UI features
            </InlineAlert>
            <InlineAlert
              variant="neutral"
              title="Alert title"
              dismissible
              actionLabel="Button"
              link="Read more about this"
              secondaryText="The o9 favourite service is not available at the moment and a few UI features"

            >
              The o9 favourite service is not available at the moment and a few UI features
            </InlineAlert>
          </div>
        </CodeExample>
      </section>

      {/* ── With Action Button ── */}
      <section>
        <h2 id="with-action-button" className="text-lg font-semibold text-text mb-2">With Action Button</h2>
        <p className="text-sm text-text-secondary mb-4">
          Add an outline action button in the content area using <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">actionLabel</code>. The button appears below the message and above the action link.
        </p>
        <CodeExample code={`<InlineAlert
  variant="info"
  title="Update available"
  actionLabel="Update now"
  onActionClick={() => console.log('Update')}
>
  A new version is available for your workspace.
</InlineAlert>`}>
          <div className="space-y-3">
            <InlineAlert
              variant="info"
              title="Update available"
              actionLabel="Update now"
            >
              A new version is available for your workspace.
            </InlineAlert>
            <InlineAlert
              variant="danger"
              title="Connection failed"
              actionLabel="Retry"
            >
              Unable to reach the server. Check your network settings.
            </InlineAlert>
          </div>
        </CodeExample>
      </section>

      {/* ── With Action Link ── */}
      <section>
        <h2 id="with-link" className="text-lg font-semibold text-text mb-2">With Action Link</h2>
        <p className="text-sm text-text-secondary mb-4">
          Add a contextual action link below the message using the Link component.
        </p>
        <CodeExample code={`<InlineAlert
  variant="info"
  title="Update available"
  link="View changelog"
  onLinkClick={() => console.log('Navigate')}
>
  A new version is available for your workspace.
</InlineAlert>`}>
          <div className="space-y-3">
            <InlineAlert
              variant="info"
              title="Update available"
              link="View changelog"
            >
              A new version is available for your workspace.
            </InlineAlert>
            <InlineAlert
              variant="danger"
              title="Connection failed"
              link="Retry connection"
            >
              Unable to reach the server. Check your network settings.
            </InlineAlert>
          </div>
        </CodeExample>
      </section>

      {/* ── With Secondary Text ── */}
      <section>
        <h2 id="secondary-text" className="text-lg font-semibold text-text mb-2">With Secondary Text</h2>
        <p className="text-sm text-text-secondary mb-4">
          Add secondary descriptive text below the link using <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">secondaryText</code>. This is useful for additional context, timestamps, or supplementary information.
        </p>
        <CodeExample code={`<InlineAlert
  variant="warning"
  title="Migration in progress"
  link="Track progress"
  secondaryText="Migration started 5 minutes ago. Estimated completion: 20 minutes."
>
  Your data is being migrated to the new infrastructure.
</InlineAlert>`}>
          <div className="space-y-3">
            <InlineAlert
              variant="warning"
              title="Migration in progress"
              link="Track progress"
              secondaryText="Migration started 5 minutes ago. Estimated completion: 20 minutes."
            >
              Your data is being migrated to the new infrastructure.
            </InlineAlert>
            <InlineAlert
              variant="neutral"
              title="Scheduled downtime"
              secondaryText="Next maintenance window: March 25, 2026, 2:00 AM — 4:00 AM UTC."
            >
              Planned maintenance will affect some services this weekend.
            </InlineAlert>
          </div>
        </CodeExample>
      </section>

      {/* ── Compact ── */}
      <section>
        <h2 id="compact" className="text-lg font-semibold text-text mb-2">Compact</h2>
        <p className="text-sm text-text-secondary mb-4">
          Single-line layout for tight spaces like form field validation or narrow panels. Action buttons, links, and secondary text are hidden in compact mode.
        </p>
        <CodeExample code={`<InlineAlert variant="danger" compact>The o9 favourite service is not available.</InlineAlert>
<InlineAlert variant="warning" compact>This action may affect other users.</InlineAlert>
<InlineAlert variant="info" compact>Background sync in progress.</InlineAlert>
<InlineAlert variant="success" compact>Changes saved successfully.</InlineAlert>
<InlineAlert variant="block" compact>Action blocked by admin policy.</InlineAlert>
<InlineAlert variant="neutral" compact>Maintenance scheduled tonight.</InlineAlert>`}>
          <div className="space-y-3">
            <InlineAlert variant="danger" compact dismissible>The o9 favourite service is not available at the moment and a few UI features</InlineAlert>
            <InlineAlert variant="warning" compact dismissible>The o9 favourite service is not available at the moment and a few UI features</InlineAlert>
            <InlineAlert variant="info" compact dismissible>The o9 favourite service is not available at the moment and a few UI features</InlineAlert>
            <InlineAlert variant="success" compact dismissible>The o9 favourite service is not available at the moment and a few UI features</InlineAlert>
            <InlineAlert variant="block" compact dismissible>The o9 favourite service is not available at the moment and a few UI features</InlineAlert>
            <InlineAlert variant="neutral" compact dismissible>The o9 favourite service is not available at the moment and a few UI features</InlineAlert>
          </div>
        </CodeExample>
      </section>

      {/* ── Body Only ── */}
      <section>
        <h2 id="body-only" className="text-lg font-semibold text-text mb-2">Body Only</h2>
        <p className="text-sm text-text-secondary mb-4">
          Title is optional — use body-only alerts for brief, self-explanatory messages.
        </p>
        <CodeExample code={`<InlineAlert variant="warning">Save before navigating away — unsaved changes will be lost.</InlineAlert>
<InlineAlert variant="info">Your session will expire in 5 minutes.</InlineAlert>`}>
          <div className="space-y-3">
            <InlineAlert variant="warning">Save before navigating away — unsaved changes will be lost.</InlineAlert>
            <InlineAlert variant="info">Your session will expire in 5 minutes.</InlineAlert>
          </div>
        </CodeExample>
      </section>

      {/* ── Dismissible ── */}
      <section>
        <h2 id="dismissible" className="text-lg font-semibold text-text mb-2">Dismissible</h2>
        <p className="text-sm text-text-secondary mb-4">
          Add a close button to allow users to dismiss the alert. The <code className="text-xs bg-surface-raised px-1.5 py-0.5 rounded">onDismiss</code> callback fires when closed.
        </p>
        <CodeExample code={`<InlineAlert
  variant="info"
  title="Tip"
  dismissible
  onDismiss={() => console.log('Dismissed')}
>
  You can drag columns to reorder them.
</InlineAlert>`}>
          <div className="flex flex-col items-start gap-4">
            {!dismissed ? (
              <InlineAlert
                key={dismissKey}
                variant="info"
                title="Tip"
                dismissible
                onDismiss={() => setDismissed(true)}
              >
                You can drag columns to reorder them.
              </InlineAlert>
            ) : (
              <p className="text-xs text-text-tertiary italic">Alert dismissed. Click below to show it again.</p>
            )}
            {dismissed && (
              <Button size="sm" variant="outline" onClick={() => { setDismissed(false); setDismissKey((k) => k + 1); }}>
                Show Alert Again
              </Button>
            )}
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-lg font-semibold text-text mb-4">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Place inline alerts close to the element they describe (e.g., directly below a form field)',
            'Use the danger variant for destructive or blocking errors only',
            'Use the block variant for actions that prevent user workflow until addressed',
            'Keep the title short (3-5 words) and the body to one or two sentences',
            'Use compact mode in narrow containers or for single-field validation messages',
            'Use the action button for primary CTA actions; use the link for navigation or secondary actions',
            'Use secondary text for timestamps, supplementary context, or non-critical details',
          ]}
          dontItems={[
            'Do not use inline alerts for transient actions like "Copied to clipboard" - use Toast instead',
            'Do not stack more than two inline alerts in the same view',
            'Avoid using the info variant as a substitute for descriptive helper text',
            'Do not use inline alerts as interactive controls - they are read-only status indicators',
            'Do not use block type for recoverable errors - use danger instead',
            'Avoid using action buttons in compact mode - they are hidden to preserve the single-line layout',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>All variants use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="alert"</code> for screen reader announcements — content changes are announced automatically.</>,
            <><kbd className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Tab</kbd> moves focus through interactive elements: action button, action link, and close button in DOM order.</>,
            'All text and icons meet WCAG 2.2 AA contrast ratios.',
            <>Type icons use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-hidden="true"</code> as they are decorative — the variant role conveys intent.</>,
            <>The close button has an accessible label: <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label="Dismiss alert"</code>.</>,
            'Action buttons and links are keyboard-accessible with Enter and Space activation.',
            'Secondary text inherits the semantic context from the parent alert role.',
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
                <td className="py-2">Move focus to action button, action link, or close button</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">Enter</kbd></td>
                <td className="py-2">Activate the focused button or link</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">Space</kbd></td>
                <td className="py-2">Activate the focused button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-4">API Reference</h2>
        <PropsTable props={alertProps} />
      </section>
    </article>
  );
}
