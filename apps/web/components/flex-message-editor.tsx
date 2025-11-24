'use client';

import { useState } from 'react';

import { Button } from '@workspace/ui/components/button';
import { LfMessage } from '@workspace/ui/components/line-flex';

interface FlexSample {
  title: string;
  content: any;
}

interface FlexMessageEditorProps {
  samples: FlexSample[];
  onAction?: (action: any) => void;
}

export function FlexMessageEditor({ samples, onAction }: FlexMessageEditorProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [originalContent, setOriginalContent] = useState<string>('');

  const handleCopy = async (index: number, content: any) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEdit = (index: number, content: any) => {
    const originalJson = JSON.stringify(content, null, 2);
    setEditingIndex(index);
    setEditedContent(originalJson);
    setOriginalContent(originalJson);
  };

  const handleSave = () => {
    if (editingIndex === null || editingIndex < 0 || editingIndex >= samples.length) return;

    try {
      const parsed = JSON.parse(editedContent);
      // Update the sample content (in a real app, this would be persisted)
      const sample = samples[editingIndex];
      if (sample) {
        sample.content = parsed;
      }
      setEditingIndex(null);
      setEditedContent('');
    } catch (err) {
      console.error('Invalid JSON:', err);
      alert('Invalid JSON format. Please check your syntax.');
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(editedContent);
      setEditedContent(JSON.stringify(parsed, null, 2));
    } catch (err) {
      console.error('Invalid JSON:', err);
      alert('Cannot format invalid JSON.');
    }
  };

  const handleReset = () => {
    setEditedContent(originalContent);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedContent('');
  };

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,500px)] justify-center gap-6">
      {samples.map((sample, index) => (
        <div key={index} className="flex w-[500px] flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs font-medium">{sample.title}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(index, sample.content)}
                className="border-border bg-background/80 text-foreground hover:bg-background inline-flex items-center justify-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors duration-200"
                aria-label="Edit JSON"
              >
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
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit
              </button>
              <button
                onClick={() => handleCopy(index, sample.content)}
                className="border-border bg-background/80 text-foreground hover:bg-background inline-flex items-center justify-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors duration-200"
                aria-label="Copy JSON"
              >
                {copiedIndex === index ? (
                  <>
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
                  </>
                ) : (
                  <>
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
                    Copy JSON
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="flex min-h-[800px] w-full overflow-hidden rounded-lg border bg-[#849EBF] p-1 pt-[50px] pb-4 pl-5 shadow-sm transition-shadow hover:shadow-lg">
            <LfMessage className="h-full w-full" {...(sample.content as unknown as any)} onAction={onAction} />
          </div>
        </div>
      ))}

      {/* JSON Editor Modal */}
      {editingIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-semibold">Edit Flex Message JSON</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 overflow-hidden p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">JSON Content</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleReset} className="text-xs">
                    Reset to Original
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleFormat}>
                    Format JSON
                  </Button>
                </div>
              </div>
              <textarea
                className="bg-card text-card-foreground focus:ring-ring w-full flex-1 resize-none rounded-md border p-3 font-mono text-sm focus:ring-2 focus:outline-none"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                spellCheck={false}
                placeholder="Enter your Flex Message JSON here..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
