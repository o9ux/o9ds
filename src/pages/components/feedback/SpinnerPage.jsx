import Spinner from '@/components/feedback/Spinner';
import { Skeleton, SkeletonText, SkeletonCard } from '@/components/feedback/Skeleton';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const spinnerProps = [
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size of the spinner ring' },
  { name: 'variant', type: "'primary' | 'muted'", default: "'primary'", description: 'Color variant — primary (white) or muted (subdued)' },
  { name: 'label', type: 'string', default: "'Loading…'", description: 'Screen-reader accessible label' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

const skeletonProps = [
  { name: 'variant', type: "'text' | 'title' | 'rect' | 'circle' | 'avatar'", default: "'text'", description: 'Pre-set shape of the skeleton placeholder' },
  { name: 'width', type: 'string | number', default: 'undefined', description: 'Custom width override (numeric = px, string = CSS value)' },
  { name: 'height', type: 'string | number', default: 'undefined', description: 'Custom height override' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

export default function SpinnerPage() {
  return (
    <article>
      <PageHeader
        title="Spinner & Skeleton"
        description="Loading indicators that communicate in-progress states — Spinner for indeterminate operations, Skeleton for content placeholders."
        status="stable"
        category="Status & System Feedback"
      />

      {/* ─── SPINNER ─── */}
      <section className="mb-12">
        <h2 id="spinner" className="text-xl font-black tracking-tight text-text mb-2">Spinner</h2>
        <p className="text-sm text-text-secondary mb-4">
          An animated ring for indeterminate loading — use when duration is unknown or short.
        </p>

        {/* Sizes */}
        <h3 id="spinner-sizes" className="text-sm font-semibold text-text mb-3">Sizes</h3>
        <CodeExample code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}>
          <div className="flex items-center gap-8">
            {['sm', 'md', 'lg', 'xl'].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Spinner size={s} />
                <span className="text-xs text-text-tertiary">{s}</span>
              </div>
            ))}
          </div>
        </CodeExample>

        {/* Variants */}
        <h3 id="spinner-variants" className="text-sm font-semibold text-text mt-6 mb-3">Variants</h3>
        <CodeExample code={`<Spinner variant="primary" />
<Spinner variant="muted" />`}>
          <div className="flex items-center gap-8">
            {['primary', 'muted'].map((v) => (
              <div key={v} className="flex flex-col items-center gap-2">
                <Spinner variant={v} size="lg" />
                <span className="text-xs text-text-tertiary">{v}</span>
              </div>
            ))}
          </div>
        </CodeExample>

        {/* In a button */}
        <h3 id="spinner-in-button" className="text-sm font-semibold text-text mt-6 mb-3">Inside a Button</h3>
        <CodeExample code={`<button disabled className="inline-flex items-center gap-2 h-10 px-4 bg-white text-black text-sm font-medium opacity-70">
  <Spinner size="sm" variant="muted" label="Saving…" />
  Saving…
</button>`}>
          <button disabled className="inline-flex items-center gap-2 h-10 px-4 bg-white text-black text-sm font-medium opacity-70 cursor-not-allowed">
            <Spinner size="sm" variant="muted" label="Saving…" />
            Saving…
          </button>
        </CodeExample>
      </section>

      {/* ─── SKELETON ─── */}
      <section className="mb-12">
        <h2 id="skeleton" className="text-xl font-black tracking-tight text-text mb-2">Skeleton Loader</h2>
        <p className="text-sm text-text-secondary mb-4">
          Placeholder shapes that mimic content layout during initial data fetches.
        </p>

        {/* Variants */}
        <h3 id="skeleton-variants" className="text-sm font-semibold text-text mb-3">Variants</h3>
        <CodeExample code={`<Skeleton variant="text" />
<Skeleton variant="title" />
<Skeleton variant="rect" />
<Skeleton variant="circle" />
<Skeleton variant="avatar" />`}>
          <div className="space-y-3 max-w-xs">
            <Skeleton variant="text" />
            <Skeleton variant="title" />
            <Skeleton variant="rect" />
            <div className="flex items-center gap-3">
              <Skeleton variant="circle" />
              <Skeleton variant="avatar" />
            </div>
          </div>
        </CodeExample>

        {/* SkeletonText */}
        <h3 id="skeleton-text" className="text-sm font-semibold text-text mt-6 mb-3">SkeletonText</h3>
        <p className="text-sm text-text-secondary mb-3">
          A pre-composed multi-line text block placeholder.
        </p>
        <CodeExample code={`<SkeletonText lines={4} />`}>
          <div className="max-w-sm">
            <SkeletonText lines={4} />
          </div>
        </CodeExample>

        {/* SkeletonCard */}
        <h3 id="skeleton-card" className="text-sm font-semibold text-text mt-6 mb-3">SkeletonCard</h3>
        <p className="text-sm text-text-secondary mb-3">
          A pre-composed card placeholder.
        </p>
        <CodeExample code={`<SkeletonCard />`}>
          <div className="max-w-xs">
            <SkeletonCard />
          </div>
        </CodeExample>
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use Spinner for actions with unknown duration — saving, submitting, uploading',
            'Use Skeleton for page or component initial loads where layout is predictable',
            'Always provide an accessible label via the label prop on Spinner',
            'Match skeleton shapes as closely as possible to the actual content that will replace them',
            'Animate into real content smoothly — prefer opacity transitions over layout shifts',
          ]}
          dontItems={[
            'Do not show both a Spinner and Skeleton for the same loading state',
            'Avoid Skeleton for very short operations (< 300ms) — it will flash unnecessarily',
            'Do not use an oversized Spinner in small UI areas — prefer size="sm" inside buttons or chips',
            'Never leave loading states permanently visible — always replace with real content or an error state',
          ]}
        />
      </section>

      {/* API */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <h3 className="text-sm font-bold text-text mb-3">Spinner</h3>
        <PropsTable props={spinnerProps} />
        <h3 className="text-sm font-bold text-text mb-3 mt-8">Skeleton</h3>
        <PropsTable props={skeletonProps} />
      </section>
    </article>
  );
}
