import Avatar from '@/components/containers/Avatar';
import AvatarGroup from '@/components/containers/AvatarGroup';
import PageHeader from '@/docs/components/PageHeader';
import CodeExample from '@/docs/components/CodeExample';
import PropsTable from '@/docs/components/PropsTable';

const avatarGroupProps = [
  { name: 'max', type: 'number', default: 'undefined', description: 'Max visible avatars — overflow shows "+N" counter' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: "'md'", description: 'Size of all avatars in the group' },
  { name: 'children', type: 'ReactNode (Avatar)', default: '—', description: 'Avatar elements to display' },
];

export default function AvatarGroupPage() {
  return (
    <article>
      <PageHeader title="Avatar Group" description="Display a stack of overlapping avatars to represent a group of people. Supports an overflow counter when exceeding a maximum number." status="stable" category="Containers" />

      <section className="mb-12">
        <h2 id="basic" className="text-xl font-black tracking-tight text-text mb-2">Basic Usage</h2>
        <CodeExample code={`<AvatarGroup>\n  <Avatar name="Alice" />\n  <Avatar name="Bob" />\n  <Avatar name="Carol" />\n</AvatarGroup>`}>
          <AvatarGroup>
            <Avatar name="Alice Adams" />
            <Avatar name="Bob Baker" />
            <Avatar name="Carol Chen" />
            <Avatar name="Dan Davis" />
          </AvatarGroup>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="max" className="text-xl font-black tracking-tight text-text mb-2">Max Items</h2>
        <p className="text-sm text-text-secondary mb-4">When more avatars than max, shows an overflow counter.</p>
        <CodeExample code={`<AvatarGroup max={3}>\n  <Avatar name="Alice" />\n  <Avatar name="Bob" />\n  ...\n</AvatarGroup>`}>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary mb-2">max=3 with 6 avatars</p>
              <AvatarGroup max={3}>
                <Avatar name="Alice Adams" />
                <Avatar name="Bob Baker" />
                <Avatar name="Carol Chen" />
                <Avatar name="Dan Davis" />
                <Avatar name="Eve Edwards" />
                <Avatar name="Frank Foster" />
              </AvatarGroup>
            </div>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-black tracking-tight text-text mb-2">Sizes</h2>
        <CodeExample code={`<AvatarGroup size="sm">...</AvatarGroup>\n<AvatarGroup size="lg">...</AvatarGroup>`}>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary mb-2">Small</p>
              <AvatarGroup size="sm">
                <Avatar name="A B" size="sm" />
                <Avatar name="C D" size="sm" />
                <Avatar name="E F" size="sm" />
              </AvatarGroup>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary mb-2">Large</p>
              <AvatarGroup size="lg">
                <Avatar name="A B" size="lg" />
                <Avatar name="C D" size="lg" />
                <Avatar name="E F" size="lg" />
              </AvatarGroup>
            </div>
          </div>
        </CodeExample>
      </section>

      <section className="mb-12">
        <h2 id="api" className="text-xl font-black tracking-tight text-text mb-2">API Reference</h2>
        <PropsTable props={avatarGroupProps} />
      </section>
    </article>
  );
}
