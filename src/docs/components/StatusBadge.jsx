const statusConfig = {
  stable:  { label: 'Stable',  className: 'border-green-500/50 text-green-400' },
  beta:    { label: 'Beta',    className: 'border-amber-500/50 text-amber-400' },
  alpha:   { label: 'Alpha',   className: 'border-red-500/50 text-red-400' },
  planned: { label: 'Planned', className: 'border-gray-600 text-text-tertiary' },
};

export default function StatusBadge({ status = 'stable' }) {
  const config = statusConfig[status] || statusConfig.stable;
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase ${config.className}`}
    >
      {config.label}
    </span>
  );
}
