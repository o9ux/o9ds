import { forwardRef, useRef, useCallback } from 'react';
import { cn } from '@/utils/cn';

const ToolbarButton = ({ icon, title, onClick, active, disabled }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'h-7 w-7 flex items-center justify-center rounded text-xs transition-colors cursor-pointer',
      active
        ? 'bg-interactive text-on-interactive'
        : 'text-text-secondary hover:bg-surface-overlay hover:text-text',
      disabled && 'opacity-35 pointer-events-none'
    )}
  >
    {icon}
  </button>
);

const TextEditor = forwardRef(function TextEditor(
  {
    value = '',
    onChange,
    placeholder = 'Start typing...',
    disabled = false,
    minHeight = 200,
    className,
    ...rest
  },
  ref
) {
  const editorRef = useRef(null);

  const execCommand = useCallback((command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    // Trigger onChange with current HTML
    if (onChange) {
      onChange(editorRef.current?.innerHTML || '');
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (onChange) {
      onChange(editorRef.current?.innerHTML || '');
    }
  }, [onChange]);

  return (
    <div
      className={cn(
        'border rounded overflow-hidden',
        'border-border-strong focus-within:border-interactive-border focus-within:ring-1 focus-within:ring-interactive-border',
        'transition-colors',
        disabled && 'opacity-35 pointer-events-none',
        className
      )}
      {...rest}
    >
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border bg-surface-overlay">
        <ToolbarButton
          icon={<span className="font-bold">B</span>}
          title="Bold"
          onClick={() => execCommand('bold')}
        />
        <ToolbarButton
          icon={<span className="italic">I</span>}
          title="Italic"
          onClick={() => execCommand('italic')}
        />
        <ToolbarButton
          icon={<span className="underline">U</span>}
          title="Underline"
          onClick={() => execCommand('underline')}
        />
        <ToolbarButton
          icon={<span className="line-through">S</span>}
          title="Strikethrough"
          onClick={() => execCommand('strikethrough')}
        />

        <span className="w-px h-5 bg-border mx-1" />

        <ToolbarButton
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 3h10M2 7h10M2 11h6" />
            </svg>
          }
          title="Align Left"
          onClick={() => execCommand('justifyLeft')}
        />
        <ToolbarButton
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 3h10M4 7h6M2 11h10" />
            </svg>
          }
          title="Align Center"
          onClick={() => execCommand('justifyCenter')}
        />
        <ToolbarButton
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 3h10M2 7h10M6 11h6" />
            </svg>
          }
          title="Align Right"
          onClick={() => execCommand('justifyRight')}
        />

        <span className="w-px h-5 bg-border mx-1" />

        <ToolbarButton
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 3v8M4 3L2 5M4 3l2 2M4 7h4M8 7l2 4M10 7L8 11" />
            </svg>
          }
          title="Unordered List"
          onClick={() => execCommand('insertUnorderedList')}
        />
        <ToolbarButton
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 3h7M5 7h7M5 11h7M2 3h1M2 7h1M2 11h1" />
            </svg>
          }
          title="Ordered List"
          onClick={() => execCommand('insertOrderedList')}
        />
      </div>

      {/* Editable area */}
      <div
        ref={(node) => {
          editorRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        contentEditable={!disabled}
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className={cn(
          'px-3 py-2 text-sm text-text bg-surface-overlay',
          'outline-none',
          'prose prose-invert prose-sm max-w-none',
          '[&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-text-tertiary [&:empty]:before:pointer-events-none'
        )}
        dangerouslySetInnerHTML={value ? { __html: value } : undefined}
      />
    </div>
  );
});

export default TextEditor;
