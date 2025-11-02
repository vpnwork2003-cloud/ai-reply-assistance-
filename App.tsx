
import React, { useState, useCallback } from 'react';
import { REPLY_STYLES } from './constants';
import type { ReplyStyle } from './types';
import { generateReply } from './services/geminiService';
import StyleSelector from './components/StyleSelector';
import GeneratedReply from './components/GeneratedReply';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [incomingMessage, setIncomingMessage] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<ReplyStyle>(REPLY_STYLES[0]);
  const [generatedReply, setGeneratedReply] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReply = useCallback(async () => {
    if (!incomingMessage.trim()) {
      setError('Please enter a message to reply to.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedReply('');

    try {
      const reply = await generateReply(incomingMessage, selectedStyle);
      setGeneratedReply(reply);
    } catch (e) {
      setError('Failed to generate reply. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [incomingMessage, selectedStyle]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 text-transparent bg-clip-text">
            AI Reply Assistant
          </h1>
          <p className="text-slate-400 mt-2">
            Craft the perfect response, every time.
          </p>
        </header>

        <main className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-6 shadow-2xl shadow-indigo-900/20">
          <div>
            <label htmlFor="incoming-message" className="block text-sm font-medium text-slate-300 mb-2">
              Received Message
            </label>
            <textarea
              id="incoming-message"
              rows={4}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-slate-500"
              placeholder="Paste the message you received here..."
              value={incomingMessage}
              onChange={(e) => setIncomingMessage(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <StyleSelector
            styles={REPLY_STYLES}
            selectedStyle={selectedStyle}
            onSelectStyle={setSelectedStyle}
            disabled={isLoading}
          />

          <button
            onClick={handleGenerateReply}
            disabled={isLoading || !incomingMessage.trim()}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-100 shadow-lg shadow-indigo-600/30"
          >
            <SparklesIcon />
            {isLoading ? 'Generating...' : 'Generate Reply'}
          </button>

          <GeneratedReply
            reply={generatedReply}
            isLoading={isLoading}
            error={error}
          />
        </main>
        
        <footer className="text-center text-slate-500 text-sm">
            <p>Powered by Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
