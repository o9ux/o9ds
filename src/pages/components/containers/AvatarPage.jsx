import Avatar from '@/components/containers/Avatar';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';
import DoDont from '@/docs/components/DoDont';

const avatarProps = [
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: "'md'", description: 'Diameter of the avatar' },
  { name: 'src', type: 'string', default: 'undefined', description: 'Image URL — renders an <img> when provided' },
  { name: 'name', type: 'string', default: 'undefined', description: 'Full name used to generate initials fallback' },
  { name: 'alt', type: 'string', default: 'undefined', description: 'Accessible alt text for the image' },
  { name: 'ring', type: 'boolean', default: 'false', description: 'Show a ring border (useful to separate from similar backgrounds)' },
  { name: 'status', type: "'online' | 'away' | 'busy' | 'offline'", default: 'undefined', description: 'Presence dot overlaid on the bottom-right corner' },
  { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes applied to the root element' },
];

const DEMO_AVATARS = [
  { name: 'Aria Singh', src: 'https://i.pravatar.cc/150?img=47' },
  { name: 'Ben Costa', src: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Carmen Lee', src: undefined },
  { name: 'David Park', src: undefined },
];

export default function AvatarPage() {
  return (
    <article>
      <PageHeader
        title="Avatar"
        description="Avatars represent a user or entity — displaying a photo when available, or gracefully falling back to initials."
        status="stable"
        category="Containers"
      />

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Six sizes from xs (20px) to 2xl (64px).
        </p>
        <CodeExample code={`<Avatar size="xs" name="Aria Singh" />
<Avatar size="sm" name="Aria Singh" />
<Avatar size="md" name="Aria Singh" />
<Avatar size="lg" name="Aria Singh" />
<Avatar size="xl" name="Aria Singh" />
<Avatar size="2xl" name="Aria Singh" />`}>
          <div className="flex flex-wrap items-end gap-4">
            {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Avatar size={s} name="Aria Singh" />
                <span className="text-[10px] text-text-tertiary">{s}</span>
              </div>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* Image vs Initials */}
      <section className="mb-12">
        <h2 id="fallback" className="text-xl font-black tracking-tight text-text mb-2">Image & Initials</h2>
        <p className="text-sm text-text-secondary mb-4">
          When an image is available it is displayed; otherwise the component generates initials from the <code className="bg-surface-overlay px-1.5 py-0.5 text-xs border border-border">name</code> prop.
        </p>
        <CodeExample code={`<Avatar size="lg" src="https://i.pravatar.cc/150?img=47" name="Aria Singh" />
<Avatar size="lg" name="Ben Costa" />
<Avatar size="lg" name="Carmen Lee" />
<Avatar size="lg" />  {/* unknown — shows ? */}`}>
          <div className="flex items-center gap-4">
            {DEMO_AVATARS.map((a) => (
              <div key={a.name} className="flex flex-col items-center gap-2">
                <Avatar size="lg" src={a.src} name={a.name} />
                <span className="text-[10px] text-text-tertiary max-w-[60px] text-center leading-tight">{a.name.split(' ')[0]}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" />
              <span className="text-[10px] text-text-tertiary">Unknown</span>
            </div>
          </div>
        </CodeExample>
      </section>

      {/* Presence */}
      <section className="mb-12">
        <h2 id="presence" className="text-xl font-black tracking-tight text-text mb-2">Presence Indicators</h2>
        <p className="text-sm text-text-secondary mb-4">
          Status dots communicate real-time presence or availability.
        </p>
        <CodeExample code={`<Avatar name="Online" status="online" />
<Avatar name="Away" status="away" />
<Avatar name="Busy" status="busy" />
<Avatar name="Offline" status="offline" />`}>
          <div className="flex items-center gap-6">
            {['online', 'away', 'busy', 'offline'].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Avatar size="lg" name={s.charAt(0).toUpperCase() + s.slice(1)} status={s} />
                <span className="text-[10px] text-text-tertiary capitalize">{s}</span>
              </div>
            ))}
          </div>
        </CodeExample>
      </section>

      {/* Ring */}
      <section className="mb-12">
        <h2 id="ring" className="text-xl font-black tracking-tight text-text mb-2">Ring</h2>
        <p className="text-sm text-text-secondary mb-4">
          A ring separates the avatar from similar-toned backgrounds.
        </p>
        <CodeExample code={`<Avatar name="Aria Singh" ring />
<Avatar src="..." name="Ben Costa" ring />`}>
          <div className="flex items-center gap-4 bg-surface-overlay p-6">
            <Avatar size="lg" name="Aria Singh" ring />
            <Avatar size="lg" src="https://i.pravatar.cc/150?img=12" name="Ben Costa" ring />
          </div>
        </CodeExample>
      </section>

      {/* Avatar Group */}
      <section className="mb-12">
        <h2 id="group" className="text-xl font-black tracking-tight text-text mb-2">Avatar Group</h2>
        <p className="text-sm text-text-secondary mb-4">
          Stack multiple avatars using negative margin and ring to show a group of people.
        </p>
        <CodeExample code={`<div className="flex -space-x-2">
  <Avatar ring size="md" src="..." name="Aria Singh" />
  <Avatar ring size="md" name="Ben Costa" />
  <Avatar ring size="md" name="Carmen Lee" />
  <Avatar ring size="md" name="+4" />
</div>`}>
          <div className="flex -space-x-2">
            {DEMO_AVATARS.map((a) => (
              <Avatar key={a.name} ring size="md" src={a.src} name={a.name} />
            ))}
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-chip text-[10px] font-bold text-text-secondary ring-1 ring-border ring-offset-1 ring-offset-surface">
              +8
            </span>
          </div>
        </CodeExample>
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-2">Usage Guidelines</h2>
        <DoDont
          doItems={[
            'Always provide the name prop to enable the initials fallback and screen-reader labelling',
            'Use ring when placing avatars on surfaces that share the avatar\'s background colour',
            'Use the status prop only when real-time presence data is available',
            'Prefer size="md" or "lg" in most contexts — "2xl" is for profile headers only',
          ]}
          dontItems={[
            'Do not use Avatar to display generic icons — it is specifically for user or entity representation',
            'Avoid stacking more than 5 avatars visibly; use "+N" overflow beyond that',
            'Do not use avatars as interactive buttons without an additional wrapper',
            'Avoid omitting alt text for img avatars — it is required for accessibility',
          ]}
        />
      </section>

      {/* API */}
      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={avatarProps} />
      </section>
    </article>
  );
}
