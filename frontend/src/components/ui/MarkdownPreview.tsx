import React, { useState } from 'react';
import { FileText, Eye, Code, Copy, Check } from 'lucide-react';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
  defaultMode?: 'preview' | 'source';
  showToggle?: boolean;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
  className = '',
  defaultMode = 'preview',
  showToggle = true
}) => {
  const [mode, setMode] = useState<'preview' | 'source'>(defaultMode);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper function to parse inline markdown (bold, code, links)
  const parseInlineMarkdown = (text: string): React.ReactNode => {
    // Split by code `...` first
    const codeParts = text.split(/(`[^`]+`)/g);
    
    return codeParts.map((part, pIdx) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code 
            key={pIdx} 
            className="px-1.5 py-0.5 rounded-md bg-[#eadecd] text-stone-900 font-mono text-[11px] font-semibold"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Split by bold **...**
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**')) {
          const inner = bPart.slice(2, -2);
          return (
            <strong key={`${pIdx}-${bIdx}`} className="font-extrabold text-stone-950">
              {inner}
            </strong>
          );
        }

        // Split by italic *...*
        const italicParts = bPart.split(/(\*[^*]+\*)/g);
        return italicParts.map((iPart, iIdx) => {
          if (iPart.startsWith('*') && iPart.endsWith('*')) {
            return (
              <em key={`${pIdx}-${bIdx}-${iIdx}`} className="italic text-stone-800">
                {iPart.slice(1, -1)}
              </em>
            );
          }
          return iPart;
        });
      });
    });
  };

  // Block parser for markdown lines
  const renderMarkdownBlocks = (raw: string) => {
    const lines = raw.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      // Empty line
      if (!trimmed) {
        i++;
        continue;
      }

      // Heading 1 / 2 / 3
      if (trimmed.startsWith('### ')) {
        elements.push(
          <h4 key={i} className="text-sm font-black text-stone-900 mt-4 mb-2 tracking-tight">
            {parseInlineMarkdown(trimmed.slice(4))}
          </h4>
        );
        i++;
        continue;
      }
      if (trimmed.startsWith('## ')) {
        elements.push(
          <h3 key={i} className="text-base font-black text-stone-900 mt-4 mb-2 tracking-tight border-b border-[#e6e4df] pb-1">
            {parseInlineMarkdown(trimmed.slice(3))}
          </h3>
        );
        i++;
        continue;
      }
      if (trimmed.startsWith('# ')) {
        elements.push(
          <h2 key={i} className="text-lg font-black text-stone-900 mt-4 mb-2 tracking-tight">
            {parseInlineMarkdown(trimmed.slice(2))}
          </h2>
        );
        i++;
        continue;
      }

      // Standalone Bold Header (e.g. **Executive Action Plan**:)
      if (trimmed.startsWith('**') && (trimmed.endsWith('**:') || trimmed.endsWith('**'))) {
        elements.push(
          <div key={i} className="font-extrabold text-stone-900 text-xs mt-3.5 mb-1.5 flex items-center gap-1.5 text-amber-900">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            <span>{parseInlineMarkdown(trimmed)}</span>
          </div>
        );
        i++;
        continue;
      }

      // Ordered list (e.g. 1. **Organic Roast Coffee Beans (SKU-884)**:)
      const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (orderedMatch) {
        const num = orderedMatch[1];
        const text = orderedMatch[2];
        const subItems: string[] = [];

        // Check if subsequent lines are indented sub-bullets (- ...)
        let nextIndex = i + 1;
        while (nextIndex < lines.length) {
          const nextLine = lines[nextIndex];
          const nextTrimmed = nextLine.trim();
          if (nextTrimmed.startsWith('- ') || nextTrimmed.startsWith('* ')) {
            subItems.push(nextTrimmed.replace(/^[-*]\s+/, ''));
            nextIndex++;
          } else if (!nextTrimmed) {
            // empty line, peak ahead
            if (nextIndex + 1 < lines.length && (lines[nextIndex + 1].trim().startsWith('- ') || lines[nextIndex + 1].trim().startsWith('* '))) {
              nextIndex++;
            } else {
              break;
            }
          } else {
            break;
          }
        }

        elements.push(
          <div key={i} className="p-3.5 rounded-xl bg-[#faf9f5] border border-[#ebe8df] space-y-2 my-2 shadow-2xs">
            <div className="flex items-start gap-2.5">
              <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-lg bg-amber-500/15 text-amber-900 text-[11px] font-mono font-black border border-amber-500/30 mt-0.5">
                {num}
              </span>
              <div className="text-xs font-semibold text-stone-900 flex-1 leading-relaxed">
                {parseInlineMarkdown(text)}
              </div>
            </div>

            {subItems.length > 0 && (
              <div className="ml-7 space-y-1 pt-1 border-t border-[#eeebe3] text-xs">
                {subItems.map((sub, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-stone-700 leading-relaxed">
                    <span className="text-amber-700 font-bold mt-0.5 text-[10px]">•</span>
                    <span className="flex-1">{parseInlineMarkdown(sub)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

        i = nextIndex;
        continue;
      }

      // Unordered list item (- ...)
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const bulletItems: string[] = [];
        let cur = i;
        while (cur < lines.length) {
          const curTrimmed = lines[cur].trim();
          if (curTrimmed.startsWith('- ') || curTrimmed.startsWith('* ')) {
            bulletItems.push(curTrimmed.replace(/^[-*]\s+/, ''));
            cur++;
          } else {
            break;
          }
        }

        elements.push(
          <ul key={i} className="space-y-1.5 my-2 pl-2">
            {bulletItems.map((item, bIdx) => (
              <li key={bIdx} className="flex items-start gap-2.5 text-xs text-stone-800 font-medium leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d97757] mt-1.5 flex-shrink-0"></span>
                <span className="flex-1">{parseInlineMarkdown(item)}</span>
              </li>
            ))}
          </ul>
        );

        i = cur;
        continue;
      }

      // Standard Paragraph
      elements.push(
        <p key={i} className="text-xs text-stone-800 leading-relaxed font-medium my-1.5">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
      i++;
    }

    return elements;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {showToggle && (
        <div className="flex items-center justify-between pb-1.5 border-b border-[#e6e4df]">
          <div className="flex items-center gap-1 bg-[#f3f2ec] p-0.5 rounded-lg border border-[#e5e3dc] text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setMode('preview')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition font-bold ${
                mode === 'preview'
                  ? 'bg-white text-stone-900 shadow-2xs border border-[#dcd9ce]'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              <Eye className="h-3 w-3 text-amber-700" />
              <span>Preview (.md view)</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('source')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition font-bold ${
                mode === 'source'
                  ? 'bg-white text-stone-900 shadow-2xs border border-[#dcd9ce]'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              <Code className="h-3 w-3 text-indigo-700" />
              <span>Raw .md</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono text-stone-600 hover:text-stone-900 hover:bg-[#f3f2ec] transition border border-transparent hover:border-[#e5e3dc]"
            title="Copy Markdown Source"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-700" />
                <span className="text-emerald-800 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy .md</span>
              </>
            )}
          </button>
        </div>
      )}

      {mode === 'preview' ? (
        <div className="prose-container font-sans text-stone-900">
          {renderMarkdownBlocks(content)}
        </div>
      ) : (
        <pre className="p-3.5 rounded-xl bg-[#f8f7f2] border border-[#e5e3dc] text-[11px] text-stone-800 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-amber-500/20">
          {content}
        </pre>
      )}
    </div>
  );
};
