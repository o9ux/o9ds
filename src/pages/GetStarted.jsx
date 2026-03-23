import PageHeader from '@/docs/components/PageHeader';
import CodeBlock from '@/docs/components/CodeBlock';

export default function GetStarted() {
  return (
    <article>
      <PageHeader
        title="Get Started"
        description="Everything you need to start using the o9ds Platform Design System in your projects."
      />

      <section id="overview" className="mb-12">
        <h2 id="overview" className="text-xl font-black tracking-tight text-text mb-4 uppercase">Overview</h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          The o9ds Platform Design System provides a comprehensive set of design tokens,
          reusable React components, icons, and illustrations. Built for consistency,
          accessibility, and scalability across the entire o9 platform.
        </p>
      </section>

      <section className="mb-12">
        <h2 id="installation" className="text-xl font-black tracking-tight text-text mb-4 uppercase">Installation</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          Install the design system package in your React project:
        </p>
        <CodeBlock code="npm install @o9ds/components" />
      </section>

      <section className="mb-12">
        <h2 id="quick-start" className="text-xl font-black tracking-tight text-text mb-4 uppercase">Quick Start</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          Import and use components in your React application:
        </p>
        <CodeBlock
          code={`import { Button } from '@o9ds/components';

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 id="design-tokens" className="text-xl font-black tracking-tight text-text mb-4 uppercase">Design Tokens</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          All design values are expressed as CSS custom properties and consumed via Tailwind CSS utilities.
          Tokens cover colors, typography, spacing, elevation, and border widths.
        </p>
        <CodeBlock
          code={`/* CSS custom properties */
.element {
  background: var(--color-surface);
  color: var(--color-text);
  border: 2px solid var(--color-border);
}

/* Tailwind utilities */
<div className="bg-surface text-text border border-border" />`}
          language="jsx"
        />
      </section>

      <section className="mb-12">
        <h2 id="whats-included" className="text-xl font-black tracking-tight text-text mb-4 uppercase">What's Included</h2>
        <div className="grid gap-0 border border-border divide-y divide-border sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
          {[
            { title: '8 Foundation Categories', desc: 'Color (332 tokens), typography (39 tokens), spacing (34 tokens), effects, icons, illustrations, and motion (165 definitions)' },
            { title: '67 Components', desc: 'Buttons, inputs, navigation, containers, feedback, and form controls across 55 documentation pages' },
            { title: '1,036 Icons', desc: 'o9con icon library with consistent SVG icons across 4 size tokens' },
            { title: '570+ Design Tokens', desc: 'Color, typography, spacing, motion, and effect tokens for light and dark themes' },
          ].map((item) => (
            <div key={item.title} className="p-6">
              <h3 className="text-sm font-bold tracking-tight text-white">{item.title}</h3>
              <p className="mt-2 text-xs text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
