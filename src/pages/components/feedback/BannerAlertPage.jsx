import { useState } from 'react';
import BannerAlert from '@/components/feedback/BannerAlert';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const bannerAlertProps = [
  { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Visual variant / severity' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Banner title' },
  { name: 'dismissible', type: 'boolean', default: 'false', description: 'Show close button' },
  { name: 'onDismiss', type: '() => void', default: 'undefined', description: 'Called when dismissed' },
  { name: 'action', type: 'ReactNode', default: 'undefined', description: 'Optional action element' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Banner body content' },
];

export default function BannerAlertPage() {
  const [variant, setVariant] = useState('info');
  const [dismissible, setDismissible] = useState(false);

  return (
    <article>
      <PageHeader title="Banner Alert" description="Full-width alert banners for prominent page-level messages. Use them for system status, maintenance notices, or important announcements that affect the entire page." status="stable" category="Status & System Feedback" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'Variant', value: variant, onChange: setVariant, options: ['info', 'success', 'warning', 'danger'] },
          { type: 'checkbox', label: 'Dismissible', value: dismissible, onChange: setDismissible },
        ]}>
          <div className="w-full">
            <BannerAlert variant={variant} title="System Notice" dismissible={dismissible}>
              Scheduled maintenance is planned for this weekend.
            </BannerAlert>
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="variants" className="text-xl font-black tracking-tight text-text mb-2">Variants</h2>
        <CodeExample code={`<BannerAlert variant="info" title="Info">...</BannerAlert>\n<BannerAlert variant="success" title="Success">...</BannerAlert>\n<BannerAlert variant="warning" title="Warning">...</BannerAlert>\n<BannerAlert variant="danger" title="Danger">...</BannerAlert>`}>
          <div className="flex flex-col gap-3">
            <BannerAlert variant="info" title="Info">Your account settings have been updated.</BannerAlert>
            <BannerAlert variant="success" title="Success">All systems are operational.</BannerAlert>
            <BannerAlert variant="warning" title="Warning">Your subscription will expire soon.</BannerAlert>
            <BannerAlert variant="danger" title="Danger">Service is currently experiencing issues.</BannerAlert>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Place at the top of the page or section it relates to', 'Use for persistent, page-level messages', 'Make dismissible only for non-critical information', 'Keep the message brief and actionable']}
          dontItems={['Do not stack multiple banners — prioritize the most important one', 'Avoid using banners for inline field validation — use InlineAlert', 'Do not use for temporary feedback — use Toast instead', 'Avoid overly long descriptions']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={bannerAlertProps} />
      </section>
    </article>
  );
}
