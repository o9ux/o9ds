import { useState } from 'react';
import PulseFeed from '@/components/containers/PulseFeed';
import PageHeader from '@/docs/components/PageHeader';
import ComponentDemo from '@/docs/components/ComponentDemo';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const pulseFeedProps = [
  { name: 'author', type: '{ name, avatarSrc?, variant? }', default: "{ name: 'Unknown User' }", description: 'Author object with name, optional avatar image source, and optional avatar variant' },
  { name: 'folder', type: 'string', default: 'undefined', description: 'Folder or channel name displayed below the author name' },
  { name: 'time', type: 'string', default: 'undefined', description: 'Relative time label (e.g., "1 min ago", "2 hours ago")' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Post title — single line, truncated with ellipsis on overflow' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Post body/description content — supports plain text or rich text markup' },
  { name: 'tags', type: 'string[]', default: '[]', description: 'Array of tag labels displayed as Chip components' },
  { name: 'maxTags', type: 'number', default: '6', description: 'Maximum number of visible tags before showing "+N more" overflow' },
  { name: 'selected', type: 'boolean', default: 'false', description: 'Checkbox selection state for the feed item' },
  { name: 'onSelectChange', type: '(e) => void', default: 'undefined', description: 'Callback when the selection checkbox changes' },
  { name: 'starred', type: 'boolean', default: 'false', description: 'Whether the post is starred/favorited' },
  { name: 'onStarChange', type: '(starred: boolean) => void', default: 'undefined', description: 'Callback when the star button is toggled' },
  { name: 'onMoreClick', type: '() => void', default: 'undefined', description: 'Callback when the more actions (ellipsis) button is clicked' },
  { name: 'counts', type: '{ comment?, task?, followers?, like? }', default: '{}', description: 'Action count numbers displayed in footer buttons' },
  { name: 'onActionClick', type: '(actionKey: string) => void', default: 'undefined', description: 'Callback when a footer action button is clicked — receives the action key' },
  { name: 'actions', type: 'Array<{ key, icon, label }>', default: 'DEFAULT_ACTIONS', description: 'Custom footer action buttons — defaults to Comment, Create Task, Followers, Like' },
  { name: 'showTags', type: 'boolean', default: 'true (internal)', description: 'Controlled tags visibility — when provided, component becomes controlled' },
  { name: 'onTagToggle', type: '() => void', default: 'undefined', description: 'Callback when the Show/Hide tags button is clicked (controlled mode)' },
  { name: 'onTagAdd', type: '() => void', default: 'undefined', description: 'Callback when the Add tag button is clicked — button hidden when undefined' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes for the root container' },
];

/* ── Sample data ── */
const SAMPLE_POSTS = [
  {
    author: { name: 'Kyle Star' },
    folder: 'Demand Planning',
    time: '1 min ago',
    title: 'Title of the post',
    body: 'Collaborate with suppliers based on demand forecasts.',
    tags: ['Pl_40', 'Pl_40', 'Pl_41', 'Pl_42', 'Pl_43', 'Pl_44', 'Pl_45', 'Pl_46', 'Pl_47'],
    counts: { comment: 2, task: 2, followers: 5, like: 4 },
    starred: false,
  },
  {
    author: { name: 'Sarah Mitchell' },
    folder: 'Supply Network',
    time: '15 min ago',
    title: 'Q3 Inventory Rebalancing Strategy',
    body: 'We need to shift 40K units from West Coast DC to the Southeast hub. Current lead times support a 5-day transfer window. Review the attached distribution model for cost implications.',
    tags: ['Inventory', 'Logistics', 'Q3-Review', 'Priority', 'Rebalance', 'Southeast', 'WestCoast', 'Urgent'],
    counts: { comment: 8, task: 3, followers: 12, like: 7 },
    starred: true,
  },
  {
    author: { name: 'David Chen' },
    folder: 'Revenue Planning',
    time: '2 hours ago',
    title: 'Updated pricing model for APAC region',
    body: 'The new tiered pricing has been reviewed by finance. Margin improvement of 3.2% projected. Please review and provide feedback by EOD Friday.',
    tags: ['Pricing', 'APAC', 'Finance-Review', 'Margin', 'Tiered', 'Approval', 'EOD-Friday', 'Revenue'],
    counts: { comment: 14, task: 1, followers: 8, like: 11 },
    starred: false,
  },
];

export default function PulseFeedPage() {
  const [demoSelected, setDemoSelected] = useState(false);
  const [demoStarred, setDemoStarred] = useState(false);

  /* ── Feed list state ── */
  const [selectedPosts, setSelectedPosts] = useState(new Set());
  const [starredPosts, setStarredPosts] = useState(new Set([1]));

  const toggleSelect = (idx) => {
    setSelectedPosts((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const toggleStar = (idx) => {
    setStarredPosts((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <article className="space-y-12">
      <PageHeader
        title="Pulse Feed"
        description="A social-style feed item for pulse-based collaboration. Each card displays author info, post content with tag chips, and a footer action bar for commenting, task creation, following, and liking."
        status="beta"
        category="Containers"
      />

      {/* ── Interactive Demo ── */}
      <section>
        <h2 id="demo" className="text-lg font-semibold text-text mb-4">Interactive Demo</h2>
        <ComponentDemo
          previewClassName="!bg-surface"
          controls={[
            { type: 'checkbox', label: 'Selected', value: demoSelected, onChange: setDemoSelected },
            { type: 'checkbox', label: 'Starred', value: demoStarred, onChange: setDemoStarred },
          ]}
        >
          <div className="w-full max-w-2xl">
            <PulseFeed
              author={{ name: 'Kyle Star' }}
              folder="Demand Planning"
              time="1 min ago"
              title="Title of the post"
              tags={['Pl_40', 'Pl_40', 'Pl_41', 'Pl_42', 'Pl_43', 'Pl_44', 'Pl_45', 'Pl_46', 'Pl_47']}
              maxTags={6}
              counts={{ comment: 2, task: 2, followers: 5, like: 4 }}
              selected={demoSelected}
              onSelectChange={() => setDemoSelected(!demoSelected)}
              starred={demoStarred}
              onStarChange={setDemoStarred}
              onMoreClick={() => {}}
              onActionClick={(key) => console.log('Action:', key)}
              onTagAdd={() => {}}
            >
              Collaborate with suppliers based on demand forecasts.
            </PulseFeed>
          </div>
        </ComponentDemo>
      </section>

      {/* ── Basic Usage ── */}
      <section>
        <h2 id="basic-usage" className="text-lg font-semibold text-text mb-2">Basic Usage</h2>
        <p className="text-sm text-text-secondary mb-4">
          A minimal PulseFeed with author, title, body text, and default footer actions.
        </p>
        <CodeExample previewClassName="!bg-surface" code={`<PulseFeed
  author={{ name: 'Kyle Star' }}
  folder="Demand Planning"
  time="1 min ago"
  title="Title of the post"
  counts={{ comment: 2, task: 2, followers: 5, like: 4 }}
  onActionClick={(key) => console.log(key)}
>
  Collaborate with suppliers based on demand forecasts.
</PulseFeed>`}>
          <div className="w-full max-w-2xl py-4">
            <PulseFeed
              author={{ name: 'Kyle Star' }}
              folder="Demand Planning"
              time="1 min ago"
              title="Title of the post"
              counts={{ comment: 2, task: 2, followers: 5, like: 4 }}
              onActionClick={(key) => console.log('Action:', key)}
            >
              Collaborate with suppliers based on demand forecasts.
            </PulseFeed>
          </div>
        </CodeExample>
      </section>

      {/* ── With Tags ── */}
      <section>
        <h2 id="with-tags" className="text-lg font-semibold text-text mb-2">With Tags</h2>
        <p className="text-sm text-text-secondary mb-4">
          Tags render as <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Chip</code> components with a toggle button to show/hide and an optional add button.
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">maxTags</code> to control overflow.
        </p>
        <CodeExample previewClassName="!bg-surface" code={`<PulseFeed
  author={{ name: 'Sarah Mitchell' }}
  folder="Supply Network"
  time="15 min ago"
  title="Q3 Inventory Rebalancing Strategy"
  tags={['Inventory', 'Logistics', 'Q3-Review', 'Priority']}
  maxTags={3}
  counts={{ comment: 8, task: 3, followers: 12, like: 7 }}
  onTagAdd={() => openTagPicker()}
>
  We need to shift 40K units from West Coast DC…
</PulseFeed>`}>
          <div className="w-full max-w-2xl py-4">
            <PulseFeed
              author={{ name: 'Sarah Mitchell' }}
              folder="Supply Network"
              time="15 min ago"
              title="Q3 Inventory Rebalancing Strategy"
              tags={['Inventory', 'Logistics', 'Q3-Review', 'Priority']}
              maxTags={3}
              counts={{ comment: 8, task: 3, followers: 12, like: 7 }}
              onActionClick={(key) => console.log('Action:', key)}
              onTagAdd={() => {}}
            >
              We need to shift 40K units from West Coast DC to the Southeast hub.
              Current lead times support a 5-day transfer window.
            </PulseFeed>
          </div>
        </CodeExample>
      </section>

      {/* ── Selection & Starring ── */}
      <section>
        <h2 id="selection-starring" className="text-lg font-semibold text-text mb-2">Selection & Starring</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">selected</code> and <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">starred</code> to manage post state.
          The star button toggles between outline and filled icons with a warning color highlight.
        </p>
        <CodeExample previewClassName="!bg-surface" code={`const [selected, setSelected] = useState(false);
const [starred, setStarred] = useState(true);

<PulseFeed
  author={{ name: 'David Chen' }}
  selected={selected}
  onSelectChange={() => setSelected(!selected)}
  starred={starred}
  onStarChange={setStarred}
  title="Updated pricing model"
  counts={{ like: 11 }}
>
  New tiered pricing reviewed by finance.
</PulseFeed>`}>
          <div className="w-full max-w-2xl py-4">
            <StarredDemo />
          </div>
        </CodeExample>
      </section>

      {/* ── Feed List ── */}
      <section>
        <h2 id="feed-list" className="text-lg font-semibold text-text mb-2">Feed List</h2>
        <p className="text-sm text-text-secondary mb-4">
          Multiple PulseFeed items stacked vertically with dividers between them. Manage selection and star state at the list level.
        </p>
        <CodeExample previewClassName="!bg-surface" code={`<div className="flex flex-col gap-3">
  {posts.map((post, i) => (
    <PulseFeed
      key={i}
      author={post.author}
      folder={post.folder}
      time={post.time}
      title={post.title}
      tags={post.tags}
      counts={post.counts}
      selected={selectedPosts.has(i)}
      onSelectChange={() => toggleSelect(i)}
      starred={starredPosts.has(i)}
      onStarChange={() => toggleStar(i)}
    >
      {post.body}
    </PulseFeed>
  ))}
</div>`}>
          <div className="w-full max-w-2xl py-4">
            <div className="flex flex-col gap-3">
              {SAMPLE_POSTS.map((post, i) => (
                <PulseFeed
                  key={i}
                  author={post.author}
                  folder={post.folder}
                  time={post.time}
                  title={post.title}
                  tags={post.tags}
                  counts={post.counts}
                  selected={selectedPosts.has(i)}
                  onSelectChange={() => toggleSelect(i)}
                  starred={starredPosts.has(i)}
                  onStarChange={() => toggleStar(i)}
                  onActionClick={(key) => console.log(`Post ${i} action:`, key)}
                  onTagAdd={() => {}}
                >
                  {post.body}
                </PulseFeed>
              ))}
            </div>
          </div>
        </CodeExample>
      </section>

      {/* ── Rich Text Content ── */}
      <section>
        <h2 id="rich-text" className="text-lg font-semibold text-text mb-2">Rich Text Content</h2>
        <p className="text-sm text-text-secondary mb-4">
          The body area accepts any ReactNode, so you can include styled text, links, lists, or any rich content.
        </p>
        <CodeExample previewClassName="!bg-surface" code={`<PulseFeed
  author={{ name: 'Emily Watson' }}
  title="Sprint Review Notes"
>
  <div>
    <p>Key updates from today's review:</p>
    <ul>
      <li><strong>Pipeline module</strong> — 95% complete</li>
      <li><strong>Dashboard v2</strong> — deployed to staging</li>
      <li><a href="#">View full report →</a></li>
    </ul>
  </div>
</PulseFeed>`}>
          <div className="w-full max-w-2xl py-4">
            <PulseFeed
              author={{ name: 'Emily Watson' }}
              folder="Engineering"
              time="4 hours ago"
              title="Sprint Review Notes"
              counts={{ comment: 6, task: 4, followers: 15, like: 9 }}
              onActionClick={(key) => console.log('Action:', key)}
            >
              <div className="space-y-2">
                <p>Key updates from today&apos;s review:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong className="text-text">Pipeline module</strong> — 95% complete</li>
                  <li><strong className="text-text">Dashboard v2</strong> — deployed to staging</li>
                  <li><strong className="text-text">Auth refactor</strong> — in code review</li>
                </ul>
                <p className="text-interactive">View full report →</p>
              </div>
            </PulseFeed>
          </div>
        </CodeExample>
      </section>

      {/* ── With Avatar Image ── */}
      <section>
        <h2 id="avatar-variants" className="text-lg font-semibold text-text mb-2">Avatar Variants</h2>
        <p className="text-sm text-text-secondary mb-4">
          The author avatar uses the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">Avatar</code> component. Pass <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">avatarSrc</code> for image avatars, or use the default character (initials) variant.
        </p>
        <CodeExample previewClassName="!bg-surface" code={`{/* Character avatar (default) */}
<PulseFeed author={{ name: 'Kyle Star' }} … />

{/* Image avatar */}
<PulseFeed author={{ name: 'Sarah M', avatarSrc: '/photo.jpg' }} … />

{/* Icon avatar */}
<PulseFeed author={{ name: 'System', variant: 'icon' }} … />`}>
          <div className="w-full max-w-2xl py-4 space-y-4">
            <PulseFeed
              author={{ name: 'Kyle Star' }}
              folder="Demand Planning"
              time="Just now"
              title="Character avatar (default)"
              counts={{ comment: 1 }}
              onActionClick={() => {}}
            >
              Uses initials derived from the author name.
            </PulseFeed>
            <PulseFeed
              author={{ name: 'System Alert', variant: 'icon' }}
              time="5 min ago"
              title="Icon avatar variant"
              counts={{ followers: 3 }}
              onActionClick={() => {}}
            >
              Uses the user icon silhouette for system or anonymous authors.
            </PulseFeed>
          </div>
        </CodeExample>
      </section>

      {/* ── Usage Guidelines ── */}
      <section>
        <h2 id="guidelines" className="text-lg font-semibold text-text mb-4">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Use PulseFeed for collaborative communication within planning workflows',
            'Keep post titles concise — they truncate to a single line',
            'Use tags to categorize posts for filtering and discoverability',
            'Show relevant action counts to indicate engagement',
            'Use the star feature for important or bookmarked posts',
          ]}
          dontItems={[
            'Do not use PulseFeed for simple notifications — use Toast or InlineAlert instead',
            'Avoid excessively long body content — link to detail views instead',
            'Do not disable footer actions without clear visual indication',
            'Avoid using more than 8-10 tags per post — use maxTags to limit visible tags',
            'Do not nest PulseFeed components inside each other',
          ]}
        />
      </section>

      {/* ── Accessibility ── */}
      <section>
        <h2 id="accessibility" className="text-lg font-semibold text-text mb-4">Accessibility</h2>
        <ul className="space-y-3 border border-border p-6">
          {[
            <>Uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="article"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code> describing the post author and title.</>,
            <>Footer action bar uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">role="toolbar"</code> with <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label="Post actions"</code> for screen reader navigation.</>,
            <>Each footer action button has an <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-label</code> that includes the action name and count (e.g., "Comment (2)").</>,
            <>The star button uses <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">aria-pressed</code> to communicate the toggle state to assistive technology.</>,
            'The selection checkbox has a descriptive aria-label identifying the post author.',
            <>All interactive elements have <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border text-text">focus-visible</code> outlines for keyboard navigation.</>,
            'Icon buttons include Tooltips for sighted keyboard users.',
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
              {[
                ['Tab', 'Move focus through interactive elements (checkbox → star → more → tags → footer actions)'],
                ['Space', 'Toggle checkbox or activate the focused button'],
                ['Enter', 'Activate the focused button or action'],
              ].map(([key, desc]) => (
                <tr key={key} className="border-b border-border">
                  <td className="py-2 pr-6"><kbd className="text-xs bg-surface-raised px-1.5 py-0.5 rounded border border-border">{key}</kbd></td>
                  <td className="py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── API Reference ── */}
      <section>
        <h2 id="api" className="text-lg font-semibold text-text mb-4">API Reference</h2>
        <PropsTable props={pulseFeedProps} />
      </section>
    </article>
  );
}

/* ── Starred Demo (isolated state) ── */
function StarredDemo() {
  const [selected, setSelected] = useState(true);
  const [starred, setStarred] = useState(true);

  return (
    <PulseFeed
      author={{ name: 'David Chen' }}
      folder="Revenue Planning"
      time="2 hours ago"
      title="Updated pricing model for APAC region"
      tags={['Pricing', 'APAC', 'Finance-Review']}
      counts={{ comment: 14, task: 1, followers: 8, like: 11 }}
      selected={selected}
      onSelectChange={() => setSelected(!selected)}
      starred={starred}
      onStarChange={setStarred}
      onActionClick={(key) => console.log('Action:', key)}
      onTagAdd={() => {}}
    >
      The new tiered pricing has been reviewed by finance. Margin improvement of 3.2% projected.
      Please review and provide feedback by EOD Friday.
    </PulseFeed>
  );
}
