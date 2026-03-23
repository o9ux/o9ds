import { useState } from 'react';
import Splitter from '@/components/feedback/Splitter';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const splitterProps = [
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Split direction' },
  { name: 'defaultSize', type: 'number', default: '50', description: 'Initial size of the first panel (percentage)' },
  { name: 'minSize', type: 'number', default: '10', description: 'Minimum panel size (percentage)' },
  { name: 'maxSize', type: 'number', default: '90', description: 'Maximum panel size (percentage)' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Exactly two child panels' },
];

const PanelContent = ({ label, color = 'bg-surface-overlay' }) => (
  <div className={`h-full ${color} flex items-center justify-center p-4`}>
    <span className="text-sm font-medium text-text-secondary">{label}</span>
  </div>
);

export default function SplitterPage() {
  const [orientation, setOrientation] = useState('horizontal');

  return (
    <article>
      <PageHeader title="Splitter" description="A resizable split view that divides content into two adjustable panels. Users can drag the divider to resize either panel within configurable bounds." status="stable" category="Status & System Feedback" />

      <section className="mb-12">
        <h2 id="demo" className="text-xl font-black tracking-tight text-text mb-2">Interactive Demo</h2>
        <ComponentDemo controls={[
          { type: 'select', label: 'Orientation', value: orientation, onChange: setOrientation, options: ['horizontal', 'vertical'] },
        ]}>
          <div className="h-[200px] w-full border border-border rounded overflow-hidden">
            <Splitter orientation={orientation} className="h-full">
              <PanelContent label="Panel A" color="bg-surface-overlay" />
              <PanelContent label="Panel B" color="bg-surface" />
            </Splitter>
          </div>
        </ComponentDemo>
      </section>

      <section className="mb-12">
        <h2 id="horizontal" className="text-xl font-black tracking-tight text-text mb-2">Horizontal Split</h2>
        <CodeExample code={`<Splitter orientation="horizontal">\n  <div>Left Panel</div>\n  <div>Right Panel</div>\n</Splitter>`}>
          <div className="h-[180px] w-full border border-border rounded overflow-hidden">
            <Splitter orientation="horizontal" defaultSize={40} className="h-full">
              <PanelContent label="Sidebar (40%)" color="bg-surface-overlay" />
              <PanelContent label="Main Content" />
            </Splitter>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="vertical" className="text-xl font-black tracking-tight text-text mb-2">Vertical Split</h2>
        <CodeExample code={`<Splitter orientation="vertical">\n  <div>Top Panel</div>\n  <div>Bottom Panel</div>\n</Splitter>`}>
          <div className="h-[250px] w-full border border-border rounded overflow-hidden">
            <Splitter orientation="vertical" defaultSize={60} className="h-full">
              <PanelContent label="Editor" color="bg-surface-overlay" />
              <PanelContent label="Terminal" />
            </Splitter>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="constraints" className="text-xl font-black tracking-tight text-text mb-2">With Constraints</h2>
        <p className="text-sm text-text-secondary mb-4">Set <code className="bg-surface-overlay px-1 rounded text-xs">minSize</code> and <code className="bg-surface-overlay px-1 rounded text-xs">maxSize</code> to limit panel resizing.</p>
        <CodeExample code={`<Splitter minSize={20} maxSize={70}>\n  <div>Min 20%</div>\n  <div>Max 70%</div>\n</Splitter>`}>
          <div className="h-[150px] w-full border border-border rounded overflow-hidden">
            <Splitter minSize={20} maxSize={70} defaultSize={35} className="h-full">
              <PanelContent label="Min 20%" color="bg-surface-overlay" />
              <PanelContent label="Max 70%" />
            </Splitter>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Divider has <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="separator"</code> with proper ARIA attributes.</>,
            'Keyboard support: Arrow keys resize panels by 2% increments.',
            'Divider is focusable for keyboard-only users.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use for resizable layout panels like sidebar/content or editor/preview', 'Set reasonable min/max constraints to prevent panels from collapsing', 'Use horizontal split for side-by-side, vertical for stacked layouts']}
          dontItems={['Do not nest more than 2 levels of splitters', 'Avoid using splitters for simple content separation — use CSS grid instead', 'Do not use tiny min sizes that make content unreadable']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={splitterProps} />
      </section>
    </article>
  );
}
