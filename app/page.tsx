'use client';

import React, { useState } from 'react';
import TaskCard from './components/TaskCard';
import type { Task, ConvertResponse } from '@/types';

export default function Home() {
  const [notes, setNotes] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleConvert = async () => {
    if (!notes.trim()) {
      setError('Please enter some notes to convert.');
      return;
    }

    setLoading(true);
    setError(null);
    setShowResults(false);

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
      });

      const data: ConvertResponse = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to convert notes. Please try again.');
        setTasks([]);
      } else if (data.data) {
        setTasks(data.data.tasks);
        setShowResults(true);
        if (data.data.tasks.length === 0) {
          setError('No actionable items detected. Try adding more specific tasks or action items to your notes.');
        }
      }
    } catch (err) {
      setError('An error occurred while processing your notes. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNotes('');
    setTasks([]);
    setError(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Note2Action
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your unstructured notes into clear, actionable tasks using AI
          </p>
        </header>

        {/* Main Content */}
        <div className="grid gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 animate-slide-up">
            <label htmlFor="notes" className="block text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              📝 Your Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your meeting notes, class notes, brainstorming ideas, or any unstructured text here... Example: - Need to finalize the project proposal by Friday (urgent) - Schedule a follow-up meeting with the team next week - Review the budget when you have time - Update documentation before the next sprint"
              className="w-full h-64 px-4 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              disabled={loading}
            />
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleConvert}
                disabled={loading || !notes.trim()}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 text-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Converting...
                  </span>
                ) : (
                  '✨ Convert to Actions'
                )}
              </button>
              
              {notes && (
                <button
                  onClick={handleClear}
                  disabled={loading}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4 animate-slide-up">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-300 mb-1">
                    {tasks.length === 0 && showResults ? 'No Tasks Found' : 'Error'}
                  </h3>
                  <p className="text-red-800 dark:text-red-400">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {showResults && tasks.length > 0 && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ✅ Extracted Tasks ({tasks.length})
                </h2>
              </div>
              
              <div className="grid gap-4">
                {tasks.map((task, index) => (
                  <TaskCard key={index} task={task} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!showResults && !error && !loading && (
            <div className="text-center py-12 animate-fade-in">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Ready to boost your productivity?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Paste your notes above and let AI extract actionable tasks for you.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-600 dark:text-gray-400 text-sm">
          <p>Powered by Google Gemini AI • Built with Next.js & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
