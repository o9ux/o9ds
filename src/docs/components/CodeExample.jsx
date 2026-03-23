import { useState } from 'react';
import CodeBlock from './CodeBlock';
import { cn } from '@/utils/cn';

export default function CodeExample({ children, code, language = 'jsx', previewClassName }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="mt-4 border border-border overflow-visible">
      {/* Preview */}
      <div className={cn('flex items-center justify-center bg-surface-overlay p-8', previewClassName)}>
        {children}
      </div>

      {/* Toggle bar */}
      <div className="flex border-t border-border bg-surface-raised">
        <button
          onClick={() => setShowCode(!showCode)}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-bold tracking-wider uppercase transition-colors',
            showCode ? 'text-text' : 'text-text-tertiary hover:text-text-secondary'
          )}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5.854 4.854a.5.5 0 10-.708-.708l-3.5 3.5a.5.5 0 000 .708l3.5 3.5a.5.5 0 00.708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 01.708-.708l3.5 3.5a.5.5 0 010 .708l-3.5 3.5a.5.5 0 01-.708-.708L13.293 8l-3.147-3.146z" />
          </svg>
          {showCode ? 'Hide code' : 'Show code'}
        </button>
      </div>

      {/* Code */}
      {showCode && (
        <div className="border-t border-border">
          <CodeBlock code={code} language={language} />
        </div>
      )}
    </div>
  );
}
