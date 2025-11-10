'use client';

import { useState } from 'react';

import { ShikiHighlighterProps, useShikiHighlighter } from 'react-shiki/web';

export interface CodeBlockProps extends ShikiHighlighterProps {}

export function CodeBlock({
  language,
  theme,
  children,
  showLineNumbers,
  startingLineNumber,
  ...options
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const code = (children as string) || '';

  const highlightedCode = useShikiHighlighter(code, language, theme, {
    showLineNumbers,
    startingLineNumber,
    outputFormat: 'html',
    ...options,
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Placeholder: unhighlighted code with fake background color
  const placeholder = (
    <pre
      className="overflow-x-auto p-4 font-mono text-[16px]"
      style={{
        backgroundColor: '#272822', // monokai background color as default
        color: '#f8f8f2', // monokai foreground color
        margin: 0,
        paddingLeft: showLineNumbers ? '54px' : undefined,
      }}
    >
      <code style={{ display: 'block' }}>{code}</code>
    </pre>
  );

  // Render highlighted code or placeholder
  const renderCode = () => {
    if (!highlightedCode) {
      return placeholder;
    }

    // Handle string output (HTML format)
    if (typeof highlightedCode === 'string') {
      return (
        <div
          className="[&_pre.shiki]:p-4 [&_pre.shiki]:text-[16px]"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      );
    }

    // Handle ReactNode output
    return highlightedCode;
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 z-10 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
        aria-label="Copy code"
      >
        {copied ? (
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy
          </span>
        )}
      </button>
      {renderCode()}
    </div>
  );
}
