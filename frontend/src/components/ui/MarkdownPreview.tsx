import React, { useState } from 'react';
import { FileText, Eye, Code, Copy, Check, Download } from 'lucide-react';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
  defaultMode?: 'preview' | 'source';
  showToggle?: boolean;
  fileName?: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
  className = '',
  defaultMode = 'preview',
  showToggle = true,
  fileName = 'executive-report.md'
}) => {
  const [mode, setMode] = useState<'preview' | 'source'>(defaultMode);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.endsWith('.md') ? fileName : `${fileName}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  // Robust parser helper functions
  const parseRow = (rowStr: string): string[] => {
    let clean = rowStr.trim();
    if (clean.startsWith('|')) clean = clean.slice(1);
    if (clean.endsWith('|')) clean = clean.slice(0, -1);
    return clean.split('|').map(c => c.trim());
  };

  const isSeparatorRow = (rowStr: string): boolean => {
    const clean = rowStr.trim();
    return /^\|?\s*:?-+:?\s*(\|?\s*:?-+:?\s*)+\|?$/.test(clean);
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

      // Blockquotes (> ...)
      if (trimmed.startsWith('>')) {
        const quoteText = trimmed.replace(/^>\s*/, '');
        elements.push(
          <div key={i} className="my-3 p-3.5 rounded-xl bg-amber-500/10 border-l-4 border-amber-600 text-xs font-semibold text-stone-900 shadow-2xs">
            {parseInlineMarkdown(quoteText)}
          </div>
        );
        i++;
        continue;
      }

      // Horizontal rule
      if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
        elements.push(<hr key={i} className="my-3.5 border-[#e2ded5]" />);
        i++;
        continue;
      }

      // Robust Markdown Table parsing (matches any table with pipes)
      if (trimmed.includes('|') && (trimmed.startsWith('|') || trimmed.endsWith('|') || isSeparatorRow(trimmed))) {
        const tableLines: string[] = [];
        let cur = i;
        while (cur < lines.length && lines[cur].trim().includes('|')) {
          tableLines.push(lines[cur].trim());
          cur++;
        }

        if (tableLines.length >= 2) {
          const headerCells = parseRow(tableLines[0]);
          const hasSeparator = tableLines.length > 1 && isSeparatorRow(tableLines[1]);
          const rawDataRows = tableLines.slice(hasSeparator ? 2 : 1);
          const dataRows = rawDataRows.filter(r => !isSeparatorRow(r)).map(parseRow);

          elements.push(
            <div key={i} className="overflow-x-auto my-3.5 rounded-xl border border-[#dcd8cc] bg-white shadow-2xs">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead className="bg-[#f5f3ec] border-b-2 border-[#d5d0c2]">
                  <tr>
                    {headerCells.map((th, hIdx) => (
                      <th key={hIdx} className="px-3.5 py-2.5 font-black text-stone-950 uppercase font-mono text-[10px] tracking-wider border-r border-[#e5e1d5] last:border-r-0">
                        {parseInlineMarkdown(th)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ece8dc]">
                  {dataRows.map((row, rIdx) => (
                    <tr key={rIdx} className={`transition ${rIdx % 2 === 1 ? 'bg-[#faf8f4]' : 'bg-white'} hover:bg-amber-50/50`}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3.5 py-2.5 text-stone-900 font-medium border-r border-[#ece8dc] last:border-r-0">
                          {parseInlineMarkdown(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );

          i = cur;
          continue;
        }
      }

      // Heading 1 / 2 / 3
      if (trimmed.startsWith('### ')) {
        elements.push(
          <h4 key={i} className="text-sm font-black text-stone-900 mt-4 mb-2 tracking-tight flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            <span>{parseInlineMarkdown(trimmed.slice(4))}</span>
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
          if (nextTrimmed.startsWith('- ') || nextTrimmed.startsWith('* ') || nextTrimmed.startsWith('• ')) {
            subItems.push(nextTrimmed.replace(/^[-*•]\s+/, ''));
            nextIndex++;
          } else if (!nextTrimmed) {
            // empty line, peak ahead
            if (nextIndex + 1 < lines.length && (lines[nextIndex + 1].trim().startsWith('- ') || lines[nextIndex + 1].trim().startsWith('* ') || lines[nextIndex + 1].trim().startsWith('• '))) {
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

      // Unordered list item (- ..., * ..., • ...)
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        const bulletItems: string[] = [];
        let cur = i;
        while (cur < lines.length) {
          const curTrimmed = lines[cur].trim();
          if (curTrimmed.startsWith('- ') || curTrimmed.startsWith('* ') || curTrimmed.startsWith('• ')) {
            bulletItems.push(curTrimmed.replace(/^[-*•]\s+/, ''));
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

  const lineCount = content.split('\n').length;
  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return (
    <div className={`space-y-2 rounded-2xl border border-[#e5e3dc] bg-[#faf9f5] p-3.5 shadow-xs ${className}`}>
      {/* Antigravity IDE .md File View Header */}
      {showToggle && (
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#e6e4df]">
          {/* File Metadata */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-900 border border-amber-500/20">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono font-bold text-stone-900">{fileName}</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[9px] font-bold">
                  .MD FILE VIEW
                </span>
              </div>
              <p className="text-[10px] font-mono text-stone-500">
                {lineCount} lines • {wordCount} words
              </p>
            </div>
          </div>

          {/* Controls: Mode Switcher + Copy + Download */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-[#e5e3dc] text-[11px] font-mono shadow-2xs">
              <button
                type="button"
                onClick={() => setMode('preview')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition font-bold ${
                  mode === 'preview'
                    ? 'bg-amber-100 text-amber-950 shadow-2xs border border-amber-300/50'
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
                    ? 'bg-amber-100 text-amber-950 shadow-2xs border border-amber-300/50'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                <Code className="h-3 w-3 text-indigo-700" />
                <span>Raw .md File</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono text-stone-700 hover:text-stone-950 bg-white hover:bg-[#f3f2ec] transition border border-[#e5e3dc] shadow-2xs"
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

            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono text-amber-900 hover:text-amber-950 bg-amber-500/10 hover:bg-amber-500/20 transition border border-amber-500/30 shadow-2xs font-bold"
              title="Download as .md file"
            >
              <Download className="h-3 w-3" />
              <span>Download .md</span>
            </button>
          </div>
        </div>
      )}

      {/* Mode Render */}
      {mode === 'preview' ? (
        <div className="prose-container font-sans text-stone-900 bg-white p-4 rounded-xl border border-[#ece9df] shadow-2xs">
          {renderMarkdownBlocks(content)}
        </div>
      ) : (
        <div className="rounded-xl border border-[#2d2c28] bg-[#1e1e1c] text-stone-200 overflow-x-auto text-[11px] font-mono leading-relaxed p-3 shadow-inner">
          {content.split('\n').map((l, idx) => (
            <div key={idx} className="flex hover:bg-white/5 py-0.5">
              <span className="w-8 text-stone-500 select-none text-right pr-3 flex-shrink-0">
                {idx + 1}
              </span>
              <span className="text-[#e6db74] whitespace-pre flex-1">
                {l || ' '}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
