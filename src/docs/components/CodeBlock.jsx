import { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import { cn } from '@/utils/cn';

export default function CodeBlock({ code, language = 'jsx' }) {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative border border-border">
      <pre className="overflow-x-auto bg-surface-sunken p-5 m-0">
        <code ref={codeRef} className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
      <button
        onClick={handleCopy}
        className={cn(
          'absolute right-3 top-3 border px-2 py-1 text-[10px] font-bold tracking-wider uppercase transition-all',
          'opacity-0 group-hover:opacity-100',
          copied
            ? 'border-green-500/50 bg-green-500/10 text-green-400'
            : 'border-border-strong bg-surface-overlay text-text-secondary hover:border-interactive-border hover:text-text'
        )}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
