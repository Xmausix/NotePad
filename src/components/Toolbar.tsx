import React from 'react';
import { 
  Bold, Italic, List, Heading1, Heading2, Quote, 
  Smile, ImageIcon, History, Moon, Sun, Trash2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ToolbarProps } from '../types';

const Toolbar: React.FC<ToolbarProps & { 
  onHistoryToggle: () => void;
  onClearAll: () => void;
  onFormatClick: (format: string) => void;
}> = ({ 
  onEmojiToggle, 
  onImageUploadToggle, 
  onHistoryToggle,
  onClearAll,
  onFormatClick
}) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => onFormatClick('bold')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" 
          title="Bold"
        >
          <Bold size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
        <button 
          onClick={() => onFormatClick('italic')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" 
          title="Italic"
        >
          <Italic size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
        <button 
          onClick={() => onFormatClick('list')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" 
          title="List"
        >
          <List size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
        <button 
          onClick={() => onFormatClick('h1')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" 
          title="Heading 1"
        >
          <Heading1 size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
        <button 
          onClick={() => onFormatClick('h2')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" 
          title="Heading 2"
        >
          <Heading2 size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
        <button 
          onClick={() => onFormatClick('blockquote')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" 
          title="Quote"
        >
          <Quote size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button 
          onClick={onEmojiToggle} 
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" 
          title="Add Emoji"
        >
          <Smile size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
        <button 
          onClick={onImageUploadToggle} 
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" 
          title="Add Image"
        >
          <ImageIcon size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={onHistoryToggle}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" 
          title="Version History"
        >
          <History size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" 
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? (
            <Moon size={18} className="text-gray-700" />
          ) : (
            <Sun size={18} className="text-gray-300" />
          )}
        </button>
        <button 
          onClick={onClearAll}
          className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900/30" 
          title="Clear All"
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;