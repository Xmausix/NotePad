import React, { useRef, useEffect } from 'react';
import EmojiPickerReact from 'emoji-picker-react';
import { Search } from 'lucide-react';
import { EmojiPickerProps } from '../types';

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiClick, isOpen, onClose }) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickEmojis = ['😀', '👍', '❤️', '😂', '🎉', '👋', '🤔', '👏'];

  return (
    <div 
      ref={pickerRef}
      className="absolute z-50 bottom-16 right-0 md:right-4 animate-fade-in"
    >
      <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-2 mb-2 p-2 border-b border-gray-200 dark:border-gray-700">
          {quickEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onEmojiClick(emoji)}
              className="text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
        
        <div className="relative mb-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search emoji..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <EmojiPickerReact
          onEmojiClick={(emojiData) => onEmojiClick(emojiData.emoji)}
          searchDisabled
          skinTonesDisabled
          width={300}
          height={350}
        />
      </div>
    </div>
  );
};

export default EmojiPicker;