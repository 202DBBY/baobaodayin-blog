import React from 'react';

interface MarkdownRendererProps {
  content?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let listItems: React.ReactNode[] = [];

  const flushList = (keyPrefix: number) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${keyPrefix}`} className="list-disc list-inside mb-6 pl-4 space-y-2 text-slate-700 dark:text-zinc-300">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  const processInline = (text: string) => {
    // Split by bold (**text**)
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900 dark:text-zinc-100">{part.slice(2, -2)}</strong>;
      }
      
      // Split by inline code (`text`)
      const codeParts = part.split(/(`.*?`)/g);
      return codeParts.map((subPart, j) => {
         if (subPart.startsWith('`') && subPart.endsWith('`')) {
            return <code key={`${i}-${j}`} className="bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-500 dark:text-pink-400 border border-slate-200 dark:border-zinc-700">{subPart.slice(1, -1)}</code>;
         }
         return subPart;
      });
    });
  };

  lines.forEach((line, index) => {
    // Code Blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of block
        inCodeBlock = false;
        flushList(index);
        elements.push(
          <div key={`code-${index}`} className="bg-slate-900 text-slate-50 p-4 rounded-xl mb-6 overflow-x-auto border border-slate-800 shadow-sm">
             <pre className="font-mono text-sm leading-relaxed">{codeBlockContent.join('\n')}</pre>
          </div>
        );
        codeBlockContent = [];
      } else {
        // Start of block
        inCodeBlock = true;
        flushList(index);
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Headers
    if (line.startsWith('# ')) {
      flushList(index);
      elements.push(<h1 key={`h1-${index}`} className="text-3xl md:text-4xl font-bold mt-10 mb-6 text-slate-900 dark:text-zinc-50 font-serif leading-tight">{line.slice(2)}</h1>);
      return;
    }
    if (line.startsWith('## ')) {
      flushList(index);
      elements.push(<h2 key={`h2-${index}`} className="text-2xl font-bold mt-10 mb-5 text-slate-800 dark:text-zinc-100 flex items-center">{line.slice(3)}</h2>);
      return;
    }
    if (line.startsWith('### ')) {
       flushList(index);
      elements.push(<h3 key={`h3-${index}`} className="text-xl font-bold mt-8 mb-3 text-slate-800 dark:text-zinc-100">{line.slice(4)}</h3>);
      return;
    }

    // Blockquotes
    if (line.startsWith('> ')) {
       flushList(index);
       elements.push(
         <blockquote key={`bq-${index}`} className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-slate-50 dark:bg-zinc-800/30 italic text-slate-600 dark:text-zinc-400 rounded-r-lg">
           {processInline(line.slice(2))}
         </blockquote>
       );
       return;
    }

    // Lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      listItems.push(<li key={`li-${index}`}>{processInline(line.trim().slice(2))}</li>);
      return;
    }

    // Paragraphs
    if (line.trim() === '') {
      flushList(index);
      return; 
    }

    flushList(index);
    elements.push(
      <p key={`p-${index}`} className="mb-5 leading-8 text-slate-700 dark:text-zinc-300 text-[17px]">
        {processInline(line)}
      </p>
    );
  });

  flushList(lines.length);

  return <div className="markdown-body w-full">{elements}</div>;
};