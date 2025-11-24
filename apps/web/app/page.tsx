'use client';

import { useEffect, useState } from 'react';
import React from 'react';

import { Button } from '@workspace/ui/components/button';
import { CodeBlock } from '@workspace/ui/components/code-block';
import {
  LfBubble,
  LfCarousel,
  LfBox,
  LfText,
  LfSpan,
  LfImage,
  LfIcon,
  LfButton,
  LfSeparator,
  LfSpacer,
  LfFiller,
  LfVideo,
} from '@workspace/ui/components/line-flex';
import { generateFlexJSXFromJSON } from '@workspace/ui/lib/flex-codegen';

import { FlexMessageEditor } from '@/components/flex-message-editor';

import flexSamples from './flex-samples.json';

// Dynamic renderer that creates React components from Flex JSON
function renderFlexFromJSON(data: any): React.ReactElement | null {
  if (!data || typeof data !== 'object') return null;

  switch (data.type) {
    case 'flex':
      return renderFlexFromJSON(data.contents);
    case 'bubble':
      return React.createElement(
        LfBubble,
        data,
        [
          data.header && renderFlexFromJSON(data.header),
          data.hero && renderFlexFromJSON(data.hero),
          data.body && renderFlexFromJSON(data.body),
          data.footer && renderFlexFromJSON(data.footer),
        ].filter(Boolean),
      );
    case 'carousel':
      return React.createElement(
        LfCarousel,
        { type: 'carousel', contents: data.contents || [] },
        data.contents?.map(renderFlexFromJSON).filter(Boolean) || [],
      );
    case 'box':
      return React.createElement(LfBox, data, data.contents?.map(renderFlexFromJSON).filter(Boolean) || []);
    case 'text':
      if (data.contents && data.contents.length > 0) {
        return React.createElement(LfText, data, data.contents.map(renderFlexFromJSON));
      }
      return React.createElement(LfText, data);
    case 'span':
      return React.createElement(LfSpan, data);
    case 'image':
      return React.createElement(LfImage, data);
    case 'icon':
      return React.createElement(LfIcon, data);
    case 'button':
      return React.createElement(LfButton, data);
    case 'separator':
      return React.createElement(LfSeparator, data);
    case 'spacer':
      return React.createElement(LfSpacer, data);
    case 'filler':
      return React.createElement(LfFiller, data);
    case 'video':
      return React.createElement(LfVideo, data);
    default:
      return null;
  }
}

export default function Home() {
  const handleAction = (action: any) => {
    console.log('Action triggered:', action);
    if (action.type === 'uri') {
      window.open(action.uri, '_blank');
    }
  };

  // Codegen state
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(
      {
        type: 'flex',
        altText: 'This is a flex message',
        contents: {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'Hello, World!',
              },
            ],
          },
        },
      },
      null,
      2,
    ),
  );
  const [output, setOutput] = useState<string>('');
  const [preview, setPreview] = useState<React.ReactElement | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    try {
      const parsed = JSON.parse(jsonInput);
      const jsx = generateFlexJSXFromJSON(parsed);
      const previewComponent = renderFlexFromJSON(parsed);
      if (!cancelled) {
        setOutput(jsx);
        setPreview(previewComponent);
        setError('');
      }
    } catch (e: any) {
      if (!cancelled) {
        setOutput('');
        setPreview(null);
        setError(e?.message || 'Invalid JSON');
      }
    }
    return () => {
      cancelled = true;
    };
  }, [jsonInput]);

  return (
    <div className="from-background via-background to-muted min-h-screen bg-gradient-to-br">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">react-line-flex</h1>
            <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">v0.0.1</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/xuhaojun/react-line-flex" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          LINE Flex Messages
          <span className="text-primary block">in React</span>
        </h2>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
          A comprehensive React component library for rendering LINE Flex Messages with full TypeScript support,
          Tailwind CSS V4 styling, and shadcn/ui integration.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#examples">View Examples</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#code-generator"> Try Code Generator</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://developers.line.biz/en/docs/messaging-api/using-flex-messages/" target="_blank">
              LINE Docs
            </a>
          </Button>
        </div>
      </section>

      {/* Installation */}
      <section className="container mx-auto px-4">
        <h3 className="mb-8 text-center text-3xl font-bold">Installation</h3>
        <CodeBlock language="bash" theme="monokai">
          shadcn add
          https://raw.githubusercontent.com/XuHaoJun/react-line-flex/refs/heads/main/packages/react-line-flex/public/r/react-line-flex.json
        </CodeBlock>
      </section>

      {/* Usage */}
      <section className="container mx-auto mt-4 px-4">
        <h3 className="mb-8 text-center text-3xl font-bold">Usage</h3>
        <CodeBlock language="tsx" theme="monokai" showLineNumbers={true}>
          {`import { LfMessage, LfBubble, LfBox, LfText } from "@/components/ui/line-flex";

const Example1 = () => {
  const message = {
    type: "flex",
    altText: "Flex Message",
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
        action: {
          type: "uri",
          uri: "https://line.me/",
        },
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "Brown Cafe",
            weight: "bold",
            size: "xl",
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "link",
            height: "sm",
            action: {
              type: "uri",
              label: "CALL",
              uri: "https://line.me/",
            },
          },
        ],
        flex: 0,
      },
    },
  };
  return <LfMessage {...message} />;
};

const Example2 = () => {
  return (
    <LfBubble>
      <LfBox layout="vertical">
        <LfText text="Hello, World!" layout="vertical" />
      </LfBox>
    </LfBubble>
  );
};
`}
        </CodeBlock>
      </section>

      {/* Examples Section */}
      <section id="examples" className="mx-auto px-4 py-16">
        <h3 className="mb-8 text-center text-3xl font-bold">Component Examples</h3>
        <p className="text-muted-foreground mb-8 text-center">
          Explore {flexSamples.length} real-world examples of LINE Flex Messages rendered in React
        </p>

        <FlexMessageEditor samples={flexSamples} onAction={handleAction} />
      </section>

      {/* Code Generator Section */}
      <section id="code-generator" className="container mx-auto px-4 py-16">
        <h3 className="mb-8 text-center text-3xl font-bold">Code Generator</h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">JSON Input</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    try {
                      const parsed = JSON.parse(jsonInput);
                      setJsonInput(JSON.stringify(parsed, null, 2));
                    } catch {}
                  }}
                >
                  Format
                </Button>
              </div>
            </div>
            <textarea
              className="bg-card text-card-foreground min-h-[420px] w-full resize-y rounded-md border p-3 font-mono text-sm"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              spellCheck={false}
            />
            {error && <div className="text-destructive text-sm">{error}</div>}
          </div>
          <div className="flex min-h-[420px] flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Generated JSX</span>
            </div>
            <div className="min-h-[420px] overflow-hidden rounded-md border">
              <CodeBlock language="tsx" theme="monokai" showLineNumbers={false}>
                {output || '// Result will appear here'}
              </CodeBlock>
            </div>
          </div>
          <div className="flex min-h-[420px] flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Live Preview (based on generated code not JSON to render)</span>
            </div>
            <div className="flex min-h-[800px] w-full overflow-hidden rounded-lg border bg-[#849EBF] p-1 pt-[50px] pb-4 pl-5 shadow-sm transition-shadow hover:shadow-lg">
              {preview ? (
                <div className="h-full w-full">{preview}</div>
              ) : (
                <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                  Preview will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="text-muted-foreground container mx-auto px-4 text-center text-sm">
          <p>Built with React, TypeScript, Tailwind CSS, and shadcn/ui</p>
          <p className="mt-2">© 2025 react-line-flex. MIT License.</p>
        </div>
      </footer>
    </div>
  );
}
