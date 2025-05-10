import React from 'react';
import { X } from 'lucide-react';
import { HistoryPanelProps } from '../types';

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  versions, 
  onVersionSelect,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 h-full animate-slide-up overflow-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Version History</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        {versions.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No previous versions found.
          </div>
        ) : (
          <div className="p-4">
            <div className="relative">
              <div className="absolute left-4 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              <ul className="space-y-6 relative">
                {versions.map((version, index) => (
                  <li key={version.id} className="ml-6">
                    <div className="absolute -left-4 mt-1.5">
                      <div className={`h-4 w-4 rounded-full border-2 ${
                        index === 0 
                          ? 'border-primary-600 bg-primary-200 dark:bg-primary-900' 
                          : 'border-gray-400 bg-white dark:bg-gray-600'
                      }`}></div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer" onClick={() => onVersionSelect(version)}>
                      <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                        {new Date(version.createdAt).toLocaleString()}
                      </time>
                      <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm line-clamp-2">
                        {version.content.replace(/<[^>]*>/g, '').substring(0, 100)}
                        {version.content.length > 100 ? '...' : ''}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;