import { useState } from 'react';
import Chip from '@/components/inputs/Chip';
import ChipList from '@/components/inputs/ChipList';
import { cn } from '@/utils/cn';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

/* Light-mode-only white background for all preview containers on this page */
const lightWhite = '[html[data-theme=light]_&]:bg-white!';

const chipListProps = [
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction — horizontal wraps chips in rows, vertical stacks them' },
  { name: 'variant', type: "'primary' | 'secondary' | 'tertiary'", default: "'primary'", description: 'Informational variant — aligns with Chip variant for documentation purposes' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size tier — affects Label sizing and overflow button' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Optional label text above the chip list' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Shows required asterisk on the label' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Shows "(optional)" text on the label' },
  { name: 'maxVisible', type: 'number', default: 'undefined', description: 'Maximum number of visible chips before showing "+N more" overflow button' },
  { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Status for message styling below the list' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper message shown below the list' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Error message shown when status is error' },
  { name: 'warningText', type: 'string', default: 'undefined', description: 'Warning message shown when status is warning' },
  { name: 'onDismiss', type: '() => void', default: 'undefined', description: 'Callback for the "Close" button in the message footer' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state for the label' },
  { name: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes for the outer container' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Chip components to render inside the list' },
];

export default function ChipListPage() {
  /* ── Interactive Demo state ── */
  const [demoOrientation, setDemoOrientation] = useState('horizontal');
  const [demoVariant, setDemoVariant] = useState('primary');
  const [demoSize, setDemoSize] = useState('md');
  const [demoLabel, setDemoLabel] = useState(true);
  const [demoOverflow, setDemoOverflow] = useState(true);
  const [demoError, setDemoError] = useState(false);

  /* ── Removable chips state for demos ── */
  const [removableChips, setRemovableChips] = useState([
    'React', 'TypeScript', 'Tailwind', 'Vite', 'Node.js', 'GraphQL', 'Docker', 'Kubernetes',
  ]);

  return (
    <article>
      <PageHeader
        title="Chip List"
        description="ChipList is a layout container for grouping Chip components. It supports horizontal and vertical orientation, overflow with show more/less toggling, optional form labels, and error/warning messages."
        status="stable"
        category="Input & Form Controls"
      />

      {/* ── Interactive Demo ── */}
      <section id="interactive-demo">
        <h2 id="demo" className="text-lg font-semibold text-text mt-10 mb-1">Interactive Demo</h2>
        <p className="text-sm text-text-secondary mb-4">
          Toggle options to explore different ChipList configurations.
        </p>

        <ComponentDemo
          previewClassName={lightWhite}
          controls={[
            { type: 'select', label: 'Orientation', value: demoOrientation, onChange: setDemoOrientation, options: ['horizontal', 'vertical'] },
            { type: 'select', label: 'Variant', value: demoVariant, onChange: setDemoVariant, options: ['primary', 'secondary', 'tertiary'] },
            { type: 'select', label: 'Size', value: demoSize, onChange: setDemoSize, options: ['sm', 'md', 'lg'] },
            { type: 'checkbox', label: 'Label', value: demoLabel, onChange: setDemoLabel },
            { type: 'checkbox', label: 'Overflow', value: demoOverflow, onChange: setDemoOverflow },
            { type: 'checkbox', label: 'Error', value: demoError, onChange: setDemoError },
          ]}
        >
          <ChipList
            orientation={demoOrientation}
            variant={demoVariant}
            size={demoSize}
            label={demoLabel ? 'Form label' : undefined}
            maxVisible={demoOverflow ? 5 : undefined}
            status={demoError ? 'error' : 'default'}
            errorText={demoError ? 'Inline error message' : undefined}
            onDismiss={demoError ? () => setDemoError(false) : undefined}
          >
            {removableChips.map((chip) => (
              <Chip
                key={chip}
                variant={demoVariant}
                size={demoSize}
                removable
                onRemove={() => setRemovableChips((prev) => prev.filter((c) => c !== chip))}
              >
                {chip}
              </Chip>
            ))}
          </ChipList>
        </ComponentDemo>
      </section>

      {/* ── Orientation ── */}
      <section id="orientation">
        <h2 id="orientation" className="text-lg font-semibold text-text mt-10 mb-1">Orientation</h2>
        <p className="text-sm text-text-secondary mb-4">
          Horizontal orientation wraps chips into rows. Vertical orientation stacks chips in a column.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2">Horizontal</h3>
            <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
              <ChipList orientation="horizontal" label="Technologies">
                <Chip>React</Chip>
                <Chip>TypeScript</Chip>
                <Chip>Tailwind CSS</Chip>
                <Chip>Vite</Chip>
                <Chip>Node.js</Chip>
                <Chip>GraphQL</Chip>
              </ChipList>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2">Vertical</h3>
            <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
              <ChipList orientation="vertical" label="Technologies">
                <Chip>React</Chip>
                <Chip>TypeScript</Chip>
                <Chip>Tailwind CSS</Chip>
                <Chip>Vite</Chip>
              </ChipList>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overflow & Show More ── */}
      <section id="overflow">
        <h2 id="overflow" className="text-lg font-semibold text-text mt-10 mb-1">Overflow & Show More</h2>
        <p className="text-sm text-text-secondary mb-4">
          Set <code className="text-xs bg-surface-overlay px-1 py-0.5">maxVisible</code> to limit visible chips. A "+N more" button appears to expand the full list, and "Show less" collapses it.
        </p>

        <CodeExample
          previewClassName={lightWhite}
          code={`<ChipList label="Skills" maxVisible={5}>
  <Chip>React</Chip>
  <Chip>TypeScript</Chip>
  <Chip>Tailwind</Chip>
  <Chip>Node.js</Chip>
  <Chip>GraphQL</Chip>
  <Chip>Docker</Chip>
  <Chip>Kubernetes</Chip>
  <Chip>PostgreSQL</Chip>
  <Chip>Redis</Chip>
  <Chip>AWS</Chip>
</ChipList>`}
        >
          <ChipList label="Skills" maxVisible={5}>
            <Chip>React</Chip>
            <Chip>TypeScript</Chip>
            <Chip>Tailwind</Chip>
            <Chip>Node.js</Chip>
            <Chip>GraphQL</Chip>
            <Chip>Docker</Chip>
            <Chip>Kubernetes</Chip>
            <Chip>PostgreSQL</Chip>
            <Chip>Redis</Chip>
            <Chip>AWS</Chip>
          </ChipList>
        </CodeExample>

        <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mt-6 mb-2">Vertical with Overflow</h3>
        <CodeExample
          previewClassName={lightWhite}
          code={`<ChipList orientation="vertical" label="Assignees" maxVisible={4}>
  <Chip avatar="Alice Walker">Alice Walker</Chip>
  <Chip avatar="Bob Chen">Bob Chen</Chip>
  <Chip avatar="Carol Davis">Carol Davis</Chip>
  <Chip avatar="Dan Evans">Dan Evans</Chip>
  <Chip avatar="Eve Foster">Eve Foster</Chip>
  <Chip avatar="Frank Garcia">Frank Garcia</Chip>
</ChipList>`}
        >
          <ChipList orientation="vertical" label="Assignees" maxVisible={4}>
            <Chip avatar="Alice Walker">Alice Walker</Chip>
            <Chip avatar="Bob Chen">Bob Chen</Chip>
            <Chip avatar="Carol Davis">Carol Davis</Chip>
            <Chip avatar="Dan Evans">Dan Evans</Chip>
            <Chip avatar="Eve Foster">Eve Foster</Chip>
            <Chip avatar="Frank Garcia">Frank Garcia</Chip>
          </ChipList>
        </CodeExample>
      </section>

      {/* ── With Label ── */}
      <section id="with-label">
        <h2 id="with-label" className="text-lg font-semibold text-text mt-10 mb-1">With Label</h2>
        <p className="text-sm text-text-secondary mb-4">
          Uses the Label component for optional form labels. Supports <code className="text-xs bg-surface-overlay px-1 py-0.5">required</code> and <code className="text-xs bg-surface-overlay px-1 py-0.5">optional</code> indicators.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
            <ChipList label="Tags">
              <Chip>Design</Chip>
              <Chip>Development</Chip>
              <Chip>Testing</Chip>
            </ChipList>
          </div>
          <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
            <ChipList label="Categories" required>
              <Chip>Frontend</Chip>
              <Chip>Backend</Chip>
            </ChipList>
          </div>
          <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
            <ChipList label="Interests" optional>
              <Chip>Music</Chip>
              <Chip>Sports</Chip>
            </ChipList>
          </div>
        </div>
      </section>

      {/* ── Error & Warning Messages ── */}
      <section id="messages">
        <h2 id="error-warning" className="text-lg font-semibold text-text mt-10 mb-1">Error & Warning Messages</h2>
        <p className="text-sm text-text-secondary mb-4">
          Display contextual feedback below the chip list. Error and warning statuses show an icon. The optional <code className="text-xs bg-surface-overlay px-1 py-0.5">onDismiss</code> callback adds a "Close" button that clears the message.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2">Error</h3>
            <ErrorMessageDemo />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2">Warning</h3>
            <WarningMessageDemo />
          </div>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mt-6 mb-2">Helper Text</h3>
        <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
          <ChipList
            label="Skills"
            helperText="Add skills relevant to this position"
          >
            <Chip>React</Chip>
            <Chip>JavaScript</Chip>
          </ChipList>
        </div>
      </section>

      {/* ── Sizes ── */}
      <section id="sizes">
        <h2 id="sizes" className="text-lg font-semibold text-text mt-10 mb-1">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Three size tiers match the Chip component sizes: sm, md, and lg.
        </p>

        <div className="space-y-6">
          {['sm', 'md', 'lg'].map((s) => (
            <div key={s}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2">{s}</h3>
              <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
                <ChipList label="Form label" size={s} maxVisible={5}>
                  <Chip size={s}>Label</Chip>
                  <Chip size={s}>Label</Chip>
                  <Chip size={s}>Label</Chip>
                  <Chip size={s}>Label</Chip>
                  <Chip size={s}>Label</Chip>
                  <Chip size={s}>Label</Chip>
                  <Chip size={s}>Label</Chip>
                  <Chip size={s}>Label</Chip>
                </ChipList>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Variants ── */}
      <section id="variants">
        <h2 id="variants" className="text-lg font-semibold text-text mt-10 mb-1">Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          All three Chip variants work within ChipList. The variant prop is informational — you control each Chip's variant individually.
        </p>

        <div className="space-y-6">
          {[
            { v: 'primary', label: 'Primary' },
            { v: 'secondary', label: 'Secondary' },
            { v: 'tertiary', label: 'Tertiary' },
          ].map(({ v, label: variantLabel }) => (
            <div key={v}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-2">{variantLabel}</h3>
              <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
                <ChipList label="Form label" variant={v}>
                  <Chip variant={v}>Label</Chip>
                  <Chip variant={v}>Label</Chip>
                  <Chip variant={v}>Label</Chip>
                  <Chip variant={v}>Label</Chip>
                </ChipList>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Removable Chips ── */}
      <section id="removable-chips">
        <h2 id="removable" className="text-lg font-semibold text-text mt-10 mb-1">Removable Chips</h2>
        <p className="text-sm text-text-secondary mb-4">
          ChipList is a pure layout container. Chip removal is managed by the consumer through children and state.
        </p>

        <RemovableChipsDemo />
      </section>

      {/* ── Usage Guidelines ── */}
      <section id="usage-guidelines">
        <h2 id="guidelines" className="text-lg font-semibold text-text mt-10 mb-1">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use horizontal orientation for tag clouds and inline selections',
            'Use vertical orientation for structured lists like assignees or files',
            'Set maxVisible to prevent long lists from overwhelming the UI',
            'Use the Label component for form-associated chip lists',
            'Use error/warning messages for validation feedback',
          ]}
          dontItems={[
            'Do not nest ChipList components',
            'Do not use ChipList for navigation — use Tabs or Links instead',
            'Do not mix chip sizes within the same ChipList',
            'Do not use more than one status message at a time',
            'Avoid setting maxVisible to 0 or 1 — show at least 2-3 chips',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>ChipList renders with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="group"</code> for screen readers.</>,
            <><code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code> is set from the label prop.</>,
            <><code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-invalid</code> is set when status is error.</>,
            'The "+N more" / "Show less" button is keyboard-focusable.',
            'Individual Chip accessibility (keyboard, role, aria-selected) is inherited from the Chip component.',
            'The "Close" button on messages dismisses feedback with an explicit callback.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-xs text-text-secondary">
              <span className="mt-px text-text font-bold shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── API Reference ── */}
      <section id="api-reference">
        <h2 id="api" className="text-lg font-semibold text-text mt-10 mb-1">API Reference</h2>
        <PropsTable props={chipListProps} />
      </section>
    </article>
  );
}

/* ── Error Message Demo (Close clears the error) ── */
function ErrorMessageDemo() {
  const [showError, setShowError] = useState(true);

  return (
    <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
      <ChipList
        label="Recipients"
        status={showError ? 'error' : 'default'}
        errorText={showError ? 'At least one recipient is required' : undefined}
        onDismiss={showError ? () => setShowError(false) : undefined}
      >
        <Chip variant="primary">Alice</Chip>
        <Chip variant="primary">Bob</Chip>
      </ChipList>
      {!showError && (
        <button
          onClick={() => setShowError(true)}
          className="mt-2 text-xs text-interactive hover:text-interactive-hover cursor-pointer"
        >
          Show error again
        </button>
      )}
    </div>
  );
}

/* ── Warning Message Demo (Close clears the warning) ── */
function WarningMessageDemo() {
  const [showWarning, setShowWarning] = useState(true);

  return (
    <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
      <ChipList
        label="Tags"
        status={showWarning ? 'warning' : 'default'}
        warningText={showWarning ? 'Maximum 10 tags allowed' : undefined}
        onDismiss={showWarning ? () => setShowWarning(false) : undefined}
      >
        <Chip variant="primary">Tag 1</Chip>
        <Chip variant="primary">Tag 2</Chip>
        <Chip variant="primary">Tag 3</Chip>
      </ChipList>
      {!showWarning && (
        <button
          onClick={() => setShowWarning(true)}
          className="mt-2 text-xs text-interactive hover:text-interactive-hover cursor-pointer"
        >
          Show warning again
        </button>
      )}
    </div>
  );
}

/* ── Removable Chips Demo (separate component to isolate state) ── */
function RemovableChipsDemo() {
  const [chips, setChips] = useState([
    'React', 'Tailwind', 'TypeScript', 'Vite', 'Node.js', 'Docker',
  ]);

  const handleRemove = (chip) => {
    setChips((prev) => prev.filter((c) => c !== chip));
  };

  const handleReset = () => {
    setChips(['React', 'Tailwind', 'TypeScript', 'Vite', 'Node.js', 'Docker']);
  };

  return (
    <div className={cn('border border-border bg-surface-overlay p-6', lightWhite)}>
      <ChipList label="Technologies" maxVisible={4}>
        {chips.map((chip) => (
          <Chip key={chip} removable onRemove={() => handleRemove(chip)}>
            {chip}
          </Chip>
        ))}
      </ChipList>
      {chips.length === 0 && (
        <button
          onClick={handleReset}
          className="mt-2 text-xs text-interactive hover:text-interactive-hover cursor-pointer"
        >
          Reset chips
        </button>
      )}
    </div>
  );
}
