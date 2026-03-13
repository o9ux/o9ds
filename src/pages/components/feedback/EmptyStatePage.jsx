import EmptyState from '@/components/feedback/EmptyState';
import Button from '@/components/buttons/Button';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const emptyStateProps = [
  { name: 'icon', type: 'ReactNode', default: 'Default empty icon', description: 'Custom illustration or icon' },
  { name: 'title', type: 'string', default: "'No data found'", description: 'Heading text' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Descriptive text' },
  { name: 'action', type: 'ReactNode', default: 'undefined', description: 'Call-to-action element (button/link)' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Overall padding and text size' },
];

const SearchIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="20" cy="20" r="14" />
    <path d="M30 30l12 12" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function EmptyStatePage() {
  return (
    <article>
      <PageHeader title="Empty State" description="Empty states communicate that a section has no content yet. Use them to guide users toward an action or provide context about why the area is empty." status="stable" category="Status & System Feedback" />

      <section className="mb-12">
        <h2 id="default" className="text-xl font-black tracking-tight text-text mb-2">Default</h2>
        <CodeExample code={`<EmptyState title="No items yet" description="Create your first item to get started." />`}>
          <div className="border border-border">
            <EmptyState title="No items yet" description="Create your first item to get started." />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="with-action" className="text-xl font-black tracking-tight text-text mb-2">With Action</h2>
        <CodeExample code={`<EmptyState title="No projects" description="Create a new project." action={<Button size="sm">Create Project</Button>} />`}>
          <div className="border border-border">
            <EmptyState title="No projects" description="Start by creating your first project." action={<Button size="sm">Create Project</Button>} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="custom-icon" className="text-xl font-black tracking-tight text-text mb-2">Custom Icon</h2>
        <CodeExample code={`<EmptyState icon={<SearchIcon />} title="No results" description="Try a different search term." />`}>
          <div className="border border-border">
            <EmptyState icon={<SearchIcon />} title="No results found" description="Try adjusting your search or filter criteria." action={<Button size="sm" variant="outline">Clear Filters</Button>} />
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-border"><EmptyState size="sm" title="Small" description="Compact" /></div>
          <div className="border border-border"><EmptyState size="md" title="Medium" description="Default size" /></div>
          <div className="border border-border"><EmptyState size="lg" title="Large" description="Prominent" /></div>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={['Provide a clear call-to-action to help users populate the empty area', 'Use a descriptive title that explains why the area is empty', 'Use illustrations or icons to make the state visually engaging', 'Size the empty state appropriately for its container']}
          dontItems={['Do not leave areas completely blank without explanation', 'Avoid overly technical language', 'Do not show empty states for loading — use Skeleton instead', 'Avoid using empty states for error messages — use InlineAlert or BannerAlert']}
        />
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={emptyStateProps} />
      </section>
    </article>
  );
}
