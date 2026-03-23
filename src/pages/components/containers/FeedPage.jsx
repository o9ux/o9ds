import { Feed, FeedItem, FeedDivider } from '@/components/containers/Feed';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const feedProps = [
  { name: 'children', type: 'ReactNode', default: '—', description: 'FeedItem and FeedDivider elements' },
  { name: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes' },
];

const feedItemProps = [
  { name: 'avatar', type: 'ReactNode', default: 'undefined', description: 'Avatar element or initials' },
  { name: 'author', type: 'string', default: 'undefined', description: 'Author name' },
  { name: 'timestamp', type: 'string', default: 'undefined', description: 'Time label (e.g. "2 min ago")' },
  { name: 'type', type: "'default' | 'success' | 'warning' | 'danger' | 'info'", default: "'default'", description: 'Color type for the icon dot' },
  { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Custom icon element' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Feed item content' },
];

const PersonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="8" cy="5" r="3" />
    <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" />
  </svg>
);

export default function FeedPage() {
  return (
    <article>
      <PageHeader title="Feed" description="An activity feed displays a chronological list of events, actions, or updates. Feed items can show avatars, icons, timestamps, and content." status="alpha" category="Containers" />

      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <CodeExample code={`<Feed>\n  <FeedItem author="Alice" timestamp="2 min ago">\n    Created a new branch\n  </FeedItem>\n  <FeedItem author="Bob" timestamp="5 min ago">\n    Pushed 3 commits\n  </FeedItem>\n</Feed>`}>
          <Feed className="border border-border rounded max-w-md">
            <FeedItem author="Alice" timestamp="2 min ago">Created a new branch <code className="text-xs bg-surface-overlay px-1 rounded">feature/auth</code></FeedItem>
            <FeedItem author="Bob" timestamp="5 min ago">Pushed 3 commits to <code className="text-xs bg-surface-overlay px-1 rounded">main</code></FeedItem>
            <FeedItem author="Charlie" timestamp="12 min ago">Opened pull request #42</FeedItem>
          </Feed>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="types" className="text-xl font-black tracking-tight text-text mb-2">Event Types</h2>
        <p className="text-sm text-text-secondary mb-4">Feed items can have semantic types for color-coded icons.</p>
        <CodeExample code={`<FeedItem type="success">Deployment succeeded</FeedItem>\n<FeedItem type="danger">Build failed</FeedItem>`}>
          <Feed className="border border-border rounded max-w-md">
            <FeedItem author="CI Bot" timestamp="1 min ago" type="success">Deployment to production succeeded</FeedItem>
            <FeedItem author="CI Bot" timestamp="3 min ago" type="danger">Build failed on <code className="text-xs bg-surface-overlay px-1 rounded">staging</code></FeedItem>
            <FeedItem author="System" timestamp="5 min ago" type="warning">Memory usage exceeded 80%</FeedItem>
            <FeedItem author="Admin" timestamp="10 min ago" type="info">Scheduled maintenance at 2:00 AM</FeedItem>
          </Feed>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="dividers" className="text-xl font-black tracking-tight text-text mb-2">With Dividers</h2>
        <CodeExample code={`<Feed>\n  <FeedDivider label="Today" />\n  <FeedItem>...</FeedItem>\n  <FeedDivider label="Yesterday" />\n  <FeedItem>...</FeedItem>\n</Feed>`}>
          <Feed className="border border-border rounded max-w-md">
            <FeedDivider label="Today" />
            <FeedItem author="Alice" timestamp="10:30 AM">Updated project settings</FeedItem>
            <FeedItem author="Bob" timestamp="9:15 AM">Merged pull request #41</FeedItem>
            <FeedDivider label="Yesterday" />
            <FeedItem author="Charlie" timestamp="4:00 PM">Added new component</FeedItem>
            <FeedItem author="Alice" timestamp="2:30 PM">Fixed styling issue</FeedItem>
          </Feed>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="with-avatars" className="text-xl font-black tracking-tight text-text mb-2">With Avatars</h2>
        <CodeExample code={`<FeedItem avatar={<span>AB</span>} author="Alice">\n  Content here\n</FeedItem>`}>
          <Feed className="border border-border rounded max-w-md">
            <FeedItem avatar={<span className="text-xs font-bold">AB</span>} author="Alice Brown" timestamp="Just now">Commented on the design review</FeedItem>
            <FeedItem avatar={<PersonIcon />} author="Bob Smith" timestamp="5 min ago">Assigned the task to Charlie</FeedItem>
          </Feed>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Use feeds for chronological activity streams', 'Include timestamps for context', 'Group items with dividers for long feeds']}
          dontItems={['Do not use feeds for static content lists', 'Avoid overly long feed items — keep content concise', 'Do not mix unrelated activity types in one feed']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <h3 className="text-sm font-bold text-text mb-2 mt-4">Feed</h3>
        <PropsTable props={feedProps} />
        <h3 className="text-sm font-bold text-text mb-2 mt-6">FeedItem</h3>
        <PropsTable props={feedItemProps} />
      </section>
    </article>
  );
}
