'use client';

import { Github } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';
import { LfBubble, LfCarousel, LfMessage } from '@workspace/ui/components/line-flex';

import flexSamples from './flex-samples.json';

export default function Home() {
  const handleAction = (action: any) => {
    console.log('Action triggered:', action);
    if (action.type === 'uri') {
      window.open(action.uri, '_blank');
    }
  };

  return (
    <div className="from-background via-background to-muted min-h-screen bg-gradient-to-br">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">react-line-flex</h1>
            <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">v1.0.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/xuhaojun/react-line-flex" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
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
          Tailwind CSS styling, and shadcn/ui integration.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#examples">View Examples</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://developers.line.biz/en/docs/messaging-api/using-flex-messages/" target="_blank">
              LINE Docs
            </a>
          </Button>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="container mx-auto px-4 py-16">
        <h3 className="mb-8 text-center text-3xl font-bold">Component Examples</h3>
        <p className="text-muted-foreground mb-8 text-center">
          Explore {flexSamples.length} real-world examples of LINE Flex Messages rendered in React
        </p>

        <div className="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {flexSamples.map((sample, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs font-medium">Example {index + 1}</span>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                  {sample.contents.type}
                </span>
              </div>
              <div className="flex min-h-[800px] min-w-[500px] overflow-hidden rounded-lg border bg-[#849EBF] p-1 pt-[50px] pb-4 pl-5 shadow-sm transition-shadow hover:shadow-lg">
                <LfMessage className="h-full w-full" {...(sample as unknown as any)} onAction={handleAction} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="mb-8 text-center text-3xl font-bold">Features</h3>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
            <h4 className="mb-2 text-xl font-semibold">TypeScript Support</h4>
            <p className="text-muted-foreground">
              Fully typed components with complete IntelliSense support for all LINE Flex Message properties.
            </p>
          </div>
          <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
            <h4 className="mb-2 text-xl font-semibold">Tailwind CSS</h4>
            <p className="text-muted-foreground">
              Built with Tailwind CSS for easy customization and seamless integration with your design system.
            </p>
          </div>
          <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
            <h4 className="mb-2 text-xl font-semibold">shadcn/ui Compatible</h4>
            <p className="text-muted-foreground">
              Works perfectly with shadcn/ui components and follows the same design principles.
            </p>
          </div>
          <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
            <h4 className="mb-2 text-xl font-semibold">All Components</h4>
            <p className="text-muted-foreground">
              Complete implementation of Bubble, Carousel, Box, Button, Text, Image, Video, Icon, and more.
            </p>
          </div>
          <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
            <h4 className="mb-2 text-xl font-semibold">Action Handlers</h4>
            <p className="text-muted-foreground">
              Easy-to-use action handlers for URI, message, and postback actions with full event support.
            </p>
          </div>
          <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
            <h4 className="mb-2 text-xl font-semibold">Responsive Design</h4>
            <p className="text-muted-foreground">
              Mobile-first responsive components that adapt beautifully to any screen size.
            </p>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="bg-muted/50 border-t py-16">
        <div className="container mx-auto px-4">
          <h3 className="mb-8 text-center text-3xl font-bold">Quick Start</h3>
          <div className="mx-auto max-w-3xl space-y-6">
            <div>
              <h4 className="mb-2 text-lg font-semibold">Installation</h4>
              <pre className="bg-background overflow-x-auto rounded-lg p-4">
                <code className="text-sm">npm install @workspace/ui</code>
              </pre>
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold">Usage</h4>
              <pre className="bg-background overflow-x-auto rounded-lg p-4">
                <code className="text-sm">{`import { LfBubble, LfButton, LfText } from '@workspace/ui/components/line-flex';

export default function MyComponent() {
  return (
    <LfBubble
      size="mega"
      body={{
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'Hello World!',
            weight: 'bold',
            size: 'xl'
          }
        ]
      }}
    />
  );
}`}</code>
              </pre>
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
