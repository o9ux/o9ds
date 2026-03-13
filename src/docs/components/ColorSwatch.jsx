import { useState } from 'react';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import { cn } from '@/utils/cn';

export default function ColorSwatch({ name, value, token }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(token || value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex flex-col overflow-hidden rounded-lg border border-border transition-all hover:border-border-hover hover:shadow-md text-left"
    >
      <div
        className="h-16 w-full"
        style={{ backgroundColor: value }}
      />
      <div className="p-3 bg-surface-raised">
        <p className="text-sm font-medium text-text">{name}</p>
        <p className="mt-0.5 text-xs font-mono text-text-tertiary">
          {copied ? 'Copied!' : value}
        </p>
        {token && (
          <p className="mt-0.5 text-xs font-mono text-text-tertiary truncate">
            {token}
          </p>
        )}
      </div>
    </button>
  );
}
