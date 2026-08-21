import React, { useState } from 'react';
import {
  Copy,
  Check,
  Printer,
  Calendar,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  FileCheck,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface FormattedAiResponseProps {
  content: string;
  refNumber?: string;
  timestamp?: string;
  onPrint?: () => void;
}

// Clean and format visible link text (e.g. if text is a raw URL identical to href)
const formatLinkText = (text: string, url: string): string => {
  const trimmedText = text.trim();
  const trimmedUrl = url.trim();

  // If text is a raw URL or identical to url
  if (/^https?:\/\//i.test(trimmedText) || trimmedText === trimmedUrl) {
    try {
      const parsed = new URL(trimmedUrl.startsWith('http') ? trimmedUrl : `https://${trimmedUrl}`);
      let domain = parsed.hostname.replace(/^www\./i, '');
      if (parsed.pathname && parsed.pathname !== '/' && parsed.pathname.length < 30) {
        domain += parsed.pathname.replace(/\/$/, '');
      }
      return domain || trimmedText;
    } catch {
      return trimmedText.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
    }
  }
  return trimmedText;
};

// Normalize and unescape inline markdown before token parsing
const sanitizeInlineMarkdown = (rawText: string): string => {
  if (!rawText) return '';
  let str = rawText;

  // Unescape backslash-escaped brackets/parentheses
  str = str.replace(/\\\[/g, '[').replace(/\\\]/g, ']').replace(/\\\(/g, '(').replace(/\\\)/g, ')');

  // Fix malformed angle-bracket markdown links like <[https://example.com]> or <https://example.com>
  str = str.replace(/<\[(https?:\/\/[^\]]+)\]>/g, '[$1]($1)');
  str = str.replace(/<\[([^\]]+)\]\((https?:\/\/[^)]+)\)>/g, '[$1]($2)');
  str = str.replace(/<(https?:\/\/[^\s>]+)>/g, '[$1]($1)');

  return str;
};

// Tokenizer & Inline parser for links, bold, italics, dates, code
const renderInlineContent = (rawText: string): React.ReactNode => {
  if (!rawText) return null;
  const text = sanitizeInlineMarkdown(rawText);

  // Match Markdown Links [text](url), Bold **text**, Italic *text*, Inline code `code`, and raw URLs
  const tokenRegex = /(\[[^\]]+\]\([^\s)]+\)|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|https?:\/\/[^\s<>)"]+)/g;
  const tokens = text.split(tokenRegex);

  return tokens.map((token, idx) => {
    if (!token) return null;

    // 1. Markdown Link [text](url)
    const linkMatch = token.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)$/);
    if (linkMatch) {
      const rawLinkText = linkMatch[1];
      const linkUrl = linkMatch[2];
      const displayLabel = formatLinkText(rawLinkText, linkUrl);

      return (
        <a
          key={`link-${idx}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#174A86] hover:text-[#0c2f58] font-semibold underline underline-offset-2 hover:underline decoration-[#174A86]/60 transition-all break-words group mx-0.5"
          title={`Open ${linkUrl}`}
        >
          <span>{displayLabel}</span>
          <ExternalLink className="w-3 h-3 text-[#174A86] group-hover:translate-x-0.5 transition-transform inline flex-shrink-0" />
        </a>
      );
    }

    // 2. Raw URL (standalone https://...)
    if (/^https?:\/\/[^\s<>)"]+$/i.test(token)) {
      const displayLabel = formatLinkText(token, token);
      return (
        <a
          key={`rawurl-${idx}`}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#174A86] hover:text-[#0c2f58] font-semibold underline underline-offset-2 hover:underline decoration-[#174A86]/60 transition-all break-words group mx-0.5"
          title={`Open ${token}`}
        >
          <span>{displayLabel}</span>
          <ExternalLink className="w-3 h-3 text-[#174A86] group-hover:translate-x-0.5 transition-transform inline flex-shrink-0" />
        </a>
      );
    }

    // 3. Bold Text **text**
    if (token.startsWith('**') && token.endsWith('**')) {
      const inner = token.slice(2, -2);
      // Check if it's a date or deadline badge
      if (
        /(\b\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}\b|\b\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\b|\bDue Date\b|\bLast Date\b|\bDeadline\b|\bअंतिम तिथि\b)/i.test(
          inner
        )
      ) {
        return (
          <span
            key={`date-${idx}`}
            className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-300/80 font-bold px-1.5 py-0.5 rounded text-[11px] sm:text-xs mx-0.5 shadow-2xs"
          >
            <Calendar className="w-3 h-3 text-amber-700 flex-shrink-0" />
            {inner}
          </span>
        );
      }

      return (
        <strong key={`bold-${idx}`} className="font-bold text-gray-950 font-['Noto_Sans_Devanagari',Arial,sans-serif]">
          {renderInlineContent(inner)}
        </strong>
      );
    }

    // 4. Italic Text *text*
    if (token.startsWith('*') && token.endsWith('*')) {
      const inner = token.slice(1, -1);
      return (
        <em key={`italic-${idx}`} className="italic text-gray-800">
          {renderInlineContent(inner)}
        </em>
      );
    }

    // 5. Inline Code `code`
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code
          key={`code-${idx}`}
          className="bg-slate-100 text-blue-900 px-1.5 py-0.5 rounded font-mono text-[11px] border border-slate-200"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    // 6. Plain text parts with date detection
    const dateRegex =
      /(\b(?:3[01]|[12][0-9]|0?[1-9])(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b|\b\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}\b)/gi;

    if (dateRegex.test(token)) {
      const parts = token.split(dateRegex);
      return (
        <React.Fragment key={`plain-${idx}`}>
          {parts.map((p, pIdx) => {
            if (dateRegex.test(p)) {
              return (
                <span
                  key={`pdate-${pIdx}`}
                  className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 font-semibold px-1.5 py-0.2 rounded text-[11px] sm:text-xs mx-0.5"
                >
                  <Clock className="w-3 h-3 text-amber-600 inline" />
                  {p}
                </span>
              );
            }
            return p;
          })}
        </React.Fragment>
      );
    }

    return token;
  });
};

// Parse Markdown Table
const renderTable = (rows: string[], tableIdx: number) => {
  if (rows.length === 0) return null;

  const parseRow = (rowStr: string) => {
    return rowStr
      .split('|')
      .map((c) => c.trim())
      .filter((c, i, arr) => (i === 0 && c === '' ? false : i === arr.length - 1 && c === '' ? false : true));
  };

  const headerRow = parseRow(rows[0]);
  const isSeparator = (str: string) => /^[:\-\s|]+$/.test(str);

  let dataRows: string[][] = [];
  if (rows.length > 1 && isSeparator(rows[1])) {
    dataRows = rows.slice(2).map(parseRow);
  } else {
    dataRows = rows.slice(1).map(parseRow);
  }

  return (
    <div key={`table-${tableIdx}`} className="my-3 overflow-x-auto rounded-md border border-slate-200 shadow-2xs">
      <table className="w-full text-left text-xs border-collapse bg-white">
        <thead>
          <tr className="bg-slate-100/90 text-slate-900 border-b border-slate-200">
            {headerRow.map((h, i) => (
              <th key={i} className="py-2 px-3 font-bold tracking-tight whitespace-nowrap">
                {renderInlineContent(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {dataRows.map((row, rIdx) => (
            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="py-2 px-3 text-gray-800 leading-normal">
                  {renderInlineContent(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const FormattedAiResponse: React.FC<FormattedAiResponseProps> = ({
  content,
  refNumber,
  timestamp,
  onPrint
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  // Process markdown structure line by line
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];

  let currentListItems: string[] = [];
  let currentListType: 'ul' | 'ol' | null = null;
  let currentTableRows: string[] = [];

  const flushList = () => {
    if (currentListItems.length > 0 && currentListType) {
      const items = [...currentListItems];
      const type = currentListType;
      const key = `list-${renderedElements.length}`;

      if (type === 'ol') {
        renderedElements.push(
          <ol key={key} className="my-2 space-y-1.5 pl-2 list-none">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-800 leading-relaxed">
                <span className="flex-shrink-0 w-5 h-5 bg-[#174A86]/10 text-[#174A86] font-bold text-[11px] rounded-full flex items-center justify-center mt-0.5 font-mono">
                  {idx + 1}
                </span>
                <span className="flex-1">{renderInlineContent(item)}</span>
              </li>
            ))}
          </ol>
        );
      } else {
        renderedElements.push(
          <ul key={key} className="my-2 space-y-1.5 pl-2 list-none">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#174A86] mt-2 flex-shrink-0" />
                <span className="flex-1">{renderInlineContent(item)}</span>
              </li>
            ))}
          </ul>
        );
      }
      currentListItems = [];
      currentListType = null;
    }
  };

  const flushTable = () => {
    if (currentTableRows.length > 0) {
      renderedElements.push(renderTable([...currentTableRows], renderedElements.length));
      currentTableRows = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Empty Line
    if (!trimmed) {
      flushList();
      flushTable();
      continue;
    }

    // Table Row detection (e.g. "| Col 1 | Col 2 |")
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      currentTableRows.push(trimmed);
      continue;
    } else {
      flushTable();
    }

    // Headings (### or ## or #)
    if (/^#{1,4}\s+/.test(trimmed)) {
      flushList();
      const level = trimmed.match(/^#+/)?.[0].length || 2;
      const headingText = trimmed.replace(/^#+\s+/, '');

      if (level === 1) {
        renderedElements.push(
          <h2
            key={`h1-${i}`}
            className="text-sm sm:text-base font-extrabold text-[#174A86] mt-3.5 mb-1.5 pb-1 border-b border-blue-100 flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-[#174A86] inline flex-shrink-0" />
            <span>{renderInlineContent(headingText)}</span>
          </h2>
        );
      } else if (level === 2) {
        renderedElements.push(
          <h3
            key={`h2-${i}`}
            className="text-xs sm:text-sm font-bold text-[#174A86] mt-3 mb-1 pb-0.5 border-b border-slate-100 flex items-center gap-1.5"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#168A16] inline flex-shrink-0" />
            <span>{renderInlineContent(headingText)}</span>
          </h3>
        );
      } else {
        renderedElements.push(
          <h4
            key={`h3-${i}`}
            className="text-xs sm:text-sm font-bold text-gray-900 mt-2.5 mb-1"
          >
            {renderInlineContent(headingText)}
          </h4>
        );
      }
      continue;
    }

    // Bullet List Items (- or * or •)
    if (/^[-*•]\s+/.test(trimmed)) {
      if (currentListType && currentListType !== 'ul') {
        flushList();
      }
      currentListType = 'ul';
      currentListItems.push(trimmed.replace(/^[-*•]\s+/, ''));
      continue;
    }

    // Numbered List Items (1. , 2. , etc.)
    if (/^\d+\.\s+/.test(trimmed)) {
      if (currentListType && currentListType !== 'ol') {
        flushList();
      }
      currentListType = 'ol';
      currentListItems.push(trimmed.replace(/^\d+\.\s+/, ''));
      continue;
    }

    // Important Callouts / Notes / Advisories (e.g. Note:, Important:, सूचना:, महत्वपूर्ण:)
    if (
      /^(Note|Important|Warning|Advisory|सूचना|महत्वपूर्ण|ध्यान दें):/i.test(trimmed) ||
      trimmed.startsWith('>')
    ) {
      flushList();
      const calloutText = trimmed.replace(/^>\s*/, '');
      const isWarning = /warning|danger|महत्वपूर्ण/i.test(calloutText);

      renderedElements.push(
        <div
          key={`callout-${i}`}
          className={`my-2.5 p-3 rounded-r-md border-l-4 text-xs sm:text-sm leading-relaxed flex items-start gap-2.5 shadow-2xs ${
            isWarning
              ? 'bg-amber-50/80 border-amber-600 text-amber-950'
              : 'bg-blue-50/80 border-[#174A86] text-blue-950'
          }`}
        >
          {isWarning ? (
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#174A86] mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1">{renderInlineContent(calloutText)}</div>
        </div>
      );
      continue;
    }

    // Standard Paragraph
    flushList();
    renderedElements.push(
      <p key={`p-${i}`} className="my-1.5 text-xs sm:text-sm text-gray-800 leading-relaxed break-words font-['Noto_Sans_Devanagari',Arial,Helvetica,sans-serif]">
        {renderInlineContent(trimmed)}
      </p>
    );
  }

  // Flush any trailing elements
  flushList();
  flushTable();

  return (
    <div className="w-full flex flex-col">
      {/* Modern, Clean White Card Container with Subtle Slate Border */}
      <div className="bg-white rounded-md border border-slate-200/90 shadow-xs p-3.5 sm:p-4.5 text-gray-800 relative transition-all">
        {/* Top Header Badge / Service Indicator */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#174A86]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-['Noto_Sans_Devanagari',Arial,sans-serif]">
              SarkariGPT • आधिकारिक उत्तर (Official Advisory)
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopy}
              title="Copy this response"
              className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              title="Print / Save PDF"
              className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded cursor-pointer transition-colors"
            >
              <Printer className="w-3 h-3" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Formatted Content Body */}
        <div className="ai-formatted-content text-xs sm:text-sm text-gray-800 space-y-1 select-text">
          {renderedElements.length > 0 ? (
            renderedElements
          ) : (
            <p className="text-xs text-gray-600 italic">No content available.</p>
          )}
        </div>

        {/* Bottom Reference Badge & Disclaimer */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-slate-600">Reference No:</span>
            <span className="font-mono bg-blue-50 text-[#174A86] px-1.5 py-0.5 rounded border border-blue-200/80 font-bold text-[10px] sm:text-[11px]">
              {refNumber || 'SAIS/NIC/GOI-AUTH'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span>NIC e-Governance Verified</span>
            <span>•</span>
            <span>{timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
