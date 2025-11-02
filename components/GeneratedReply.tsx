
import React, { useState, useEffect } from 'react';
import { CopyIcon } from './icons/CopyIcon';

interface GeneratedReplyProps {
  reply: string;
  isLoading: boolean;
  error: string | null;
}

const GeneratedReply: React.FC<GeneratedReplyProps> = ({ reply, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (reply) {
      setCopied(false);
    }
  }, [reply]);

  const handleCopy = () => {
    if (reply) {
      navigator.clipboard.writeText(reply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
        </div>
      );
    }
    if (error) {
      return <p className="text-red-400 text-center">{error}</p>;
    }
    if (reply) {
      return <p className="text-slate-200 whitespace-pre-wrap">{reply}</p>;
    }
    return <p className="text-slate-500 text-center">Your generated reply will appear here.</p>;
  };

  return (
    <div className="relative bg-slate-900 border border-slate-700 rounded-lg p-4 min-h-[100px] flex items-center justify-center">
      {reply && !isLoading && !error && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-slate-400 hover:text-white transition-colors"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <span className="text-xs font-bold px-1">Copied!</span>
          ) : (
            <CopyIcon />
          )}
        </button>
      )}
      {renderContent()}
    </div>
  );
};

export default GeneratedReply;
