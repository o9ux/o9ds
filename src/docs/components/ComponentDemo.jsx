import { cn } from '@/utils/cn';

function DemoControl({ control }) {
  if (control.type === 'select') {
    return (
      <label className="flex flex-col gap-1">
        <span className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary">{control.label}</span>
        <select
          value={control.value}
          onChange={(e) => control.onChange(e.target.value)}
          className="border border-border bg-surface-sunken px-2.5 py-1.5 text-xs text-text outline-none focus:border-interactive-border transition-colors"
        >
          {control.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (control.type === 'checkbox') {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={control.value}
          onChange={(e) => control.onChange(e.target.checked)}
          className="h-4 w-4 border border-border bg-surface accent-interactive"
        />
        <span className="text-xs text-text-secondary">{control.label}</span>
      </label>
    );
  }

  if (control.type === 'text') {
    return (
      <label className="flex flex-col gap-1">
        <span className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary">{control.label}</span>
        <input
          type="text"
          value={control.value}
          onChange={(e) => control.onChange(e.target.value)}
          className="border border-border bg-surface-sunken px-2.5 py-1.5 text-xs text-text outline-none focus:border-interactive-border transition-colors"
        />
      </label>
    );
  }

  return null;
}

export default function ComponentDemo({ children, controls = [] }) {
  return (
    <div className="mt-4 border border-border overflow-hidden">
      {/* Preview area */}
      <div className="flex min-h-40 items-center justify-center bg-surface-overlay p-10">
        {children}
      </div>

      {/* Controls */}
      {controls.length > 0 && (
        <div className="flex flex-wrap items-end gap-5 border-t border-border bg-surface-raised p-4">
          {controls.map((control) => (
            <DemoControl key={control.label} control={control} />
          ))}
        </div>
      )}
    </div>
  );
}
