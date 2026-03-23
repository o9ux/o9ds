import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/utils/cn';
import Progress from '@/components/feedback/Progress';
import Button from '@/components/buttons/Button';
import Slider from '@/components/inputs/Slider';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const progressProps = [
  { name: 'type', type: "'linear' | 'circular'", default: "'linear'", description: 'Progress indicator type — horizontal bar or circular arc' },
  { name: 'variant', type: "'determinate' | 'indeterminate' | 'buffer'", default: "'determinate'", description: "Animation mode — 'buffer' is only available for linear type" },
  { name: 'value', type: 'number (0–100)', default: '0', description: 'Current progress percentage (used by determinate and buffer variants)' },
  { name: 'bufferValue', type: 'number (0–100)', default: '0', description: 'Buffer progress percentage (buffer variant only)' },
  { name: 'color', type: "'primary' | 'info' | 'success' | 'warning' | 'danger'", default: "'primary'", description: 'Semantic color of the progress indicator' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size — track height for linear (2/4/8px), diameter for circular (24/40/56px)' },
  { name: 'label', type: 'string', default: "'Loading…'", description: 'Accessible label for screen readers' },
  { name: 'showValue', type: 'boolean', default: 'false', description: 'Show percentage text in the center (circular determinate only)' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
];

/* ── Auto-incrementing progress hook for demos ── */
function useAutoProgress(running, speed = 50) {
  const [value, setValue] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!running) { setValue(0); return; }
    timerRef.current = setInterval(() => {
      setValue((v) => {
        if (v >= 100) { clearInterval(timerRef.current); return 100; }
        return Math.min(100, v + Math.random() * 10);
      });
    }, speed);
    return () => clearInterval(timerRef.current);
  }, [running, speed]);

  return [value, setValue];
}

export default function ProgressPage() {
  /* ── Interactive demo state ── */
  const [demoType, setDemoType] = useState('linear');
  const [demoVariant, setDemoVariant] = useState('determinate');
  const [demoColor, setDemoColor] = useState('primary');
  const [demoSize, setDemoSize] = useState('md');
  const [demoValue, setDemoValue] = useState(65);
  const [demoShowValue, setDemoShowValue] = useState(false);

  /* ── Animated demo state ── */
  const [linearRunning, setLinearRunning] = useState(false);
  const [linearProgress] = useAutoProgress(linearRunning, 80);

  const [circularRunning, setCircularRunning] = useState(false);
  const [circularProgress] = useAutoProgress(circularRunning, 60);

  /* ── Buffer demo state ── */
  const [bufferRunning, setBufferRunning] = useState(false);
  const [bufferValue] = useAutoProgress(bufferRunning, 100);
  const bufferBuffer = Math.min(100, bufferValue + 15 + Math.random() * 5);

  return (
    <article className="space-y-12">
      <PageHeader
        title="Progress"
        description="Progress indicators inform users about the status of ongoing processes — such as loading, uploading, or processing. Two types: linear (horizontal bar) and circular (arc). Supports determinate, indeterminate, and buffer variants with five semantic colors."
        status="stable"
        category="Status & System Feedback"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 id="demo" className="text-lg font-semibold text-text mb-4">Interactive Demo</h2>
        <ComponentDemo
          controls={[
            { type: 'select', label: 'Type', value: demoType, onChange: setDemoType, options: ['linear', 'circular'] },
            { type: 'select', label: 'Variant', value: demoVariant, onChange: setDemoVariant, options: ['determinate', 'indeterminate', 'buffer'] },
            { type: 'select', label: 'Color', value: demoColor, onChange: setDemoColor, options: ['primary', 'info', 'success', 'warning', 'danger'] },
            { type: 'select', label: 'Size', value: demoSize, onChange: setDemoSize, options: ['sm', 'md', 'lg'] },
            { type: 'checkbox', label: 'Show Value', value: demoShowValue, onChange: setDemoShowValue },
          ]}
        >
          <div className={cn(
            demoType === 'linear'
              ? 'flex items-center px-10 py-12 w-full'
              : 'flex items-center justify-center py-6'
          )}>
            <Progress
              type={demoType}
              variant={demoVariant}
              color={demoColor}
              size={demoSize}
              value={demoValue}
              bufferValue={demoValue + 15}
              showValue={demoShowValue}
            />
          </div>
          {/* Value slider for determinate/buffer */}
          {(demoVariant === 'determinate' || demoVariant === 'buffer') && (
            <div className="px-6 pb-4 w-full max-w-md ml-auto">
              <Slider
                label="Value"
                size="sm"
                min={0}
                max={100}
                value={demoValue}
                onChange={(e) => setDemoValue(Number(e.target.value))}
                showValue
              />
            </div>
          )}
        </ComponentDemo>
      </section>

      {/* ── Linear Determinate ── */}
      <section>
        <h2 id="linear-determinate" className="text-lg font-semibold text-text mb-2">Linear Determinate</h2>
        <p className="text-sm text-text-secondary mb-4">
          Shows measurable progress from 0% to 100%. The bar width transitions smoothly using motion tokens.
        </p>
        <CodeExample code={`<Progress type="linear" variant="determinate" value={25} />
<Progress type="linear" variant="determinate" value={50} />
<Progress type="linear" variant="determinate" value={75} />
<Progress type="linear" variant="determinate" value={100} color="success" />`}>
          <div className="space-y-4 w-full max-w-md mx-auto">
            <Progress type="linear" variant="determinate" value={25} />
            <Progress type="linear" variant="determinate" value={50} />
            <Progress type="linear" variant="determinate" value={75} />
            <Progress type="linear" variant="determinate" value={100} color="success" />
          </div>
        </CodeExample>

        <div className="mt-6">
          <p className="text-sm text-text-secondary mb-4">Animated progress simulation:</p>
          <div className="flex flex-col items-start gap-4">
            <Progress type="linear" variant="determinate" value={linearProgress} className="w-full max-w-md" />
            <Button size="sm" variant="outline" onClick={() => setLinearRunning(!linearRunning)}>
              {linearRunning ? (linearProgress >= 100 ? 'Done!' : 'Running…') : 'Start Progress'}
            </Button>
          </div>
        </div>
      </section>

      {/* ── Linear with Label ── */}
      <section>
        <h2 id="linear-label" className="text-lg font-semibold text-text mb-2">Linear with Label</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">showValue</code> to display the percentage value next to the progress bar. The label uses tabular numerals for stable width during updates.
        </p>
        <CodeExample code={`<Progress type="linear" variant="determinate" value={25} showValue />
<Progress type="linear" variant="determinate" value={50} showValue color="info" />
<Progress type="linear" variant="determinate" value={75} showValue color="warning" />
<Progress type="linear" variant="determinate" value={100} showValue color="success" />`}>
          <div className="space-y-4 w-full max-w-md mx-auto">
            <Progress type="linear" variant="determinate" value={25} showValue />
            <Progress type="linear" variant="determinate" value={50} showValue color="info" />
            <Progress type="linear" variant="determinate" value={75} showValue color="warning" />
            <Progress type="linear" variant="determinate" value={100} showValue color="success" />
          </div>
        </CodeExample>

        <p className="text-sm text-text-secondary mt-6 mb-4">Linear with label across all sizes:</p>
        <div className="space-y-3 w-full max-w-md">
          {['sm', 'md', 'lg'].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="text-xs text-text-tertiary uppercase tracking-widest w-6">{s}</span>
              <Progress type="linear" variant="determinate" value={65} size={s} showValue color="info" className="flex-1" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Linear Indeterminate ── */}
      <section>
        <h2 id="linear-indeterminate" className="text-lg font-semibold text-text mb-2">Linear Indeterminate</h2>
        <p className="text-sm text-text-secondary mb-4">
          Continuous animation for tasks with unknown duration. Two animated bars slide and stretch across the track.
        </p>
        <CodeExample code={`<Progress type="linear" variant="indeterminate" />`}>
          <div className="space-y-4 w-full max-w-md mx-auto">
            <Progress type="linear" variant="indeterminate" />
            <Progress type="linear" variant="indeterminate" color="info" />
            <Progress type="linear" variant="indeterminate" color="success" />
          </div>
        </CodeExample>
      </section>

      {/* ── Linear Buffer ── */}
      <section>
        <h2 id="linear-buffer" className="text-lg font-semibold text-text mb-2">Linear Buffer</h2>
        <p className="text-sm text-text-secondary mb-4">
          Two-layer bar showing primary progress and a lighter buffer zone. Useful for streaming, buffering, or multi-stage loading.
        </p>
        <CodeExample code={`<Progress type="linear" variant="buffer" value={35} bufferValue={60} />`}>
          <div className="space-y-4 w-full max-w-md mx-auto">
            <Progress type="linear" variant="buffer" value={35} bufferValue={60} />
            <Progress type="linear" variant="buffer" value={60} bufferValue={80} color="info" />
          </div>
        </CodeExample>
      </section>

      {/* ── Circular Determinate ── */}
      <section>
        <h2 id="circular-determinate" className="text-lg font-semibold text-text mb-2">Circular Determinate</h2>
        <p className="text-sm text-text-secondary mb-4">
          SVG-based circular arc that fills proportionally. The arc transitions smoothly from 0 to 360 degrees.
        </p>
        <CodeExample code={`<Progress type="circular" variant="determinate" value={25} />
<Progress type="circular" variant="determinate" value={50} />
<Progress type="circular" variant="determinate" value={75} />
<Progress type="circular" variant="determinate" value={100} color="success" />`}>
          <div className="flex flex-wrap items-center gap-6">
            <Progress type="circular" variant="determinate" value={25} />
            <Progress type="circular" variant="determinate" value={50} />
            <Progress type="circular" variant="determinate" value={75} />
            <Progress type="circular" variant="determinate" value={100} color="success" />
          </div>
        </CodeExample>

        <div className="mt-6">
          <p className="text-sm text-text-secondary mb-4">Animated circular progress:</p>
          <div className="flex items-center gap-4">
            <Progress type="circular" variant="determinate" value={circularProgress} showValue />
            <Button size="sm" variant="outline" onClick={() => setCircularRunning(!circularRunning)}>
              {circularRunning ? (circularProgress >= 100 ? 'Done!' : 'Running…') : 'Start Progress'}
            </Button>
          </div>
        </div>
      </section>

      {/* ── Circular Indeterminate ── */}
      <section>
        <h2 id="circular-indeterminate" className="text-lg font-semibold text-text mb-2">Circular Indeterminate</h2>
        <p className="text-sm text-text-secondary mb-4">
          Continuous spinning animation with a growing/shrinking arc for unknown-duration tasks.
        </p>
        <CodeExample code={`<Progress type="circular" variant="indeterminate" />`}>
          <div className="flex flex-wrap items-center gap-6">
            <Progress type="circular" variant="indeterminate" />
            <Progress type="circular" variant="indeterminate" color="info" />
            <Progress type="circular" variant="indeterminate" color="success" />
            <Progress type="circular" variant="indeterminate" color="danger" />
          </div>
        </CodeExample>
      </section>

      {/* ── Circular with Label ── */}
      <section>
        <h2 id="circular-label" className="text-lg font-semibold text-text mb-2">Circular with Label</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">showValue</code> to display the percentage in the center of the circular indicator.
        </p>
        <CodeExample code={`<Progress type="circular" variant="determinate" value={25} showValue />
<Progress type="circular" variant="determinate" value={50} showValue />
<Progress type="circular" variant="determinate" value={75} showValue />
<Progress type="circular" variant="determinate" value={100} showValue color="success" />`}>
          <div className="flex flex-wrap items-center gap-6">
            <Progress type="circular" variant="determinate" value={25} showValue />
            <Progress type="circular" variant="determinate" value={50} showValue />
            <Progress type="circular" variant="determinate" value={75} showValue />
            <Progress type="circular" variant="determinate" value={100} showValue color="success" />
          </div>
        </CodeExample>
      </section>

      {/* ── Colors ── */}
      <section>
        <h2 id="colors" className="text-lg font-semibold text-text mb-2">Colors</h2>
        <p className="text-sm text-text-secondary mb-4">
          Five semantic colors for different contexts — primary, info, success, warning, danger.
        </p>
        <CodeExample code={`<Progress color="primary" value={60} />
<Progress color="info" value={60} />
<Progress color="success" value={60} />
<Progress color="warning" value={60} />
<Progress color="danger" value={60} />`}>
          <div className="space-y-3 w-full max-w-md mx-auto">
            {['primary', 'info', 'success', 'warning', 'danger'].map((c) => (
              <div key={c} className="flex items-center gap-3">
                <span className="text-xs text-text-tertiary uppercase tracking-widest w-14 shrink-0">{c}</span>
                <Progress type="linear" variant="determinate" value={60} color={c} className="flex-1" />
              </div>
            ))}
          </div>
        </CodeExample>

        <p className="text-sm text-text-secondary mt-6 mb-4">Circular colors:</p>
        <div className="flex flex-wrap items-center gap-6">
          {['primary', 'info', 'success', 'warning', 'danger'].map((c) => (
            <div key={c} className="flex flex-col items-center gap-2">
              <Progress type="circular" variant="determinate" value={65} color={c} showValue />
              <span className="text-[10px] text-text-tertiary uppercase">{c}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sizes ── */}
      <section>
        <h2 id="sizes" className="text-lg font-semibold text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three sizes for both linear and circular types.
        </p>
        <CodeExample code={`{/* Linear: sm=2px, md=4px, lg=8px */}
<Progress size="sm" value={50} />
<Progress size="md" value={50} />
<Progress size="lg" value={50} />

{/* Circular: sm=24px, md=40px, lg=56px */}
<Progress type="circular" size="sm" value={50} />
<Progress type="circular" size="md" value={50} />
<Progress type="circular" size="lg" value={50} />`}>
          <div className="space-y-6">
            <div className="space-y-3 w-full max-w-md">
              {['sm', 'md', 'lg'].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <span className="text-xs text-text-tertiary uppercase tracking-widest w-6">{s}</span>
                  <Progress type="linear" variant="determinate" value={50} size={s} color="info" className="flex-1" />
                </div>
              ))}
            </div>
            <div className="flex items-end gap-6">
              {['sm', 'md', 'lg'].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <Progress type="circular" variant="determinate" value={50} size={s} color="info" showValue />
                  <span className="text-[10px] text-text-tertiary uppercase">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-lg font-semibold text-text mb-4">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use determinate variant when the progress duration or percentage is known',
            'Use indeterminate variant for tasks with unknown duration (API calls, loading)',
            'Use buffer variant for streaming or multi-stage operations where buffered data is ahead of processed data',
            'Use circular with showValue for prominent progress display (file uploads, large operations)',
            'Use success color when progress reaches 100% to confirm completion',
            'Use linear for inline or embedded progress, circular for standalone indicators',
          ]}
          dontItems={[
            'Do not use determinate with a static value - always animate or update the value',
            'Do not use buffer variant with circular type - it is only supported for linear',
            'Avoid using danger color for normal progress - reserve it for error states',
            'Do not show multiple indeterminate indicators in the same view - use one to avoid confusion',
            'Avoid very small sizes for progress indicators with showValue - the text may be unreadable',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="progressbar"</code> for screen reader announcements.</>,
            <>Determinate and buffer variants include <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-valuenow</code>, <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-valuemin</code>, and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-valuemax</code> for precise progress communication.</>,
            <>Indeterminate variant omits <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-valuenow</code> to indicate unknown progress.</>,
            <>The <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">label</code> prop provides an accessible description via <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code>.</>,
            <>Animations respect <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">prefers-reduced-motion: reduce</code> — all animations are disabled when the user prefers reduced motion.</>,
            'Color is not the sole indicator of progress — the bar width, arc length, and optional percentage text provide additional context.',
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
        <p className="text-sm text-text-secondary mb-4">
          Progress indicators are non-interactive — they are read-only status elements. Screen readers announce the progress value and label automatically via the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">progressbar</code> role.
        </p>
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-4">API Reference</h2>
        <PropsTable props={progressProps} />
      </section>
    </article>
  );
}
