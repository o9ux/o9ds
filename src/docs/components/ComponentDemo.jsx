import { cn } from '@/utils/cn';
import SelectDropdown from '@/components/inputs/SelectDropdown';
import Checkbox from '@/components/inputs/Checkbox';

function DemoControl({ control }) {
  if (control.type === 'select') {
    return (
      <SelectDropdown
        label={control.label}
        size="sm"
        options={control.options}
        value={control.value}
        onChange={(val) => control.onChange(val)}
        className="min-w-[140px]"
      />
    );
  }

  if (control.type === 'checkbox') {
    return (
      <Checkbox
        label={control.label}
        size="sm"
        checked={control.value ?? control.checked}
        onChange={(e) => control.onChange(e.target.checked)}
      />
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

export default function ComponentDemo({ children, controls = [], previewClassName }) {
  return (
    <div className="mt-4 border border-border overflow-visible">
      {/* Preview area */}
      <div className={cn('flex min-h-40 items-center justify-center bg-surface-overlay p-10', previewClassName)}>
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
