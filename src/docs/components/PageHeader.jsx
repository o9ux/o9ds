import StatusBadge from './StatusBadge';

export default function PageHeader({ title, description, status = 'stable', category }) {
  return (
    <div className="mb-12 border-b border-border pb-8">
      {category && (
        <p className="mb-2 text-xs font-bold tracking-widest uppercase text-text-tertiary">
          {category}
        </p>
      )}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-black tracking-tight text-text lg:text-3xl">{title}</h1>
        <StatusBadge status={status} />
      </div>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-text-secondary max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
