import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNoteStorage } from '../hooks/useNoteStorage';
import Toolbar from './Toolbar';
import EmojiPicker from './EmojiPicker';
import ImageUploader from './ImageUploader';
import HistoryPanel from './HistoryPanel';

const modules = {
  toolbar: false // Disable default toolbar since we're using our custom one
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link', 'image'
];

const Editor: React.FC = () => {
  const { 
    note, 
    versions, 
    updateNote, 
    saveVersion, 
    restoreVersion,
    clearAll,
    formatDate 
  } = useNoteStorage();
  
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isImageUploaderOpen, setIsImageUploaderOpen] = useState(false);
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    const autosaveTimer = setTimeout(() => {
      if (note.content) {
        saveVersion();
        setShowSaveIndicator(true);
        setTimeout(() => setShowSaveIndicator(false), 2000);
      }
    }, 10000);

    return () => clearTimeout(autosaveTimer);
  }, [note.content, saveVersion]);

  const handleEmojiClick = (emoji: string) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const range = editor.getSelection(true);
      editor.insertText(range.index, emoji);
      setIsEmojiPickerOpen(false);
    }
  };

  const handleImageUpload = (url: string) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, 'image', url);
      setIsImageUploaderOpen(false);
    }
  };

  const handleVersionSelect = (version: any) => {
    restoreVersion(version);
    setIsHistoryPanelOpen(false);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear the editor? This will create a backup of your current note.')) {
      clearAll();
    }
  };

  const handleFormat = (format: string) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    switch (format) {
      case 'bold':
      case 'italic':
        editor.format('bold', !editor.getFormat().bold);
        break;
      case 'list':
        editor.format('list', 'bullet');
        break;
      case 'h1':
        editor.format('header', 1);
        break;
      case 'h2':
        editor.format('header', 2);
        break;
      case 'blockquote':
        editor.format('blockquote', !editor.getFormat().blockquote);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notepad</h1>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {showSaveIndicator && (
                <span className="animate-fade-in">Saved</span>
              )}
              {!showSaveIndicator && note.updatedAt && (
                <span>Last edited: {formatDate(note.updatedAt)}</span>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <Toolbar 
        onEmojiToggle={() => setIsEmojiPickerOpen(prev => !prev)}
        onImageUploadToggle={() => setIsImageUploaderOpen(prev => !prev)}
        onHistoryToggle={() => setIsHistoryPanelOpen(prev => !prev)}
        onClearAll={handleClearAll}
        onFormatClick={handleFormat}
      />
      
      <main className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="relative bg-white dark:bg-slate-800 shadow-sm rounded-lg mt-4 h-[calc(100%-1rem)] transition-colors duration-300">
            <div className="h-full p-4">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={note.content}
                onChange={updateNote}
                modules={modules}
                formats={formats}
                placeholder="Start writing your note here..."
                className="h-[calc(100%-2rem)] text-gray-900 dark:text-gray-100 overflow-y-auto"
              />
            </div>
            
            <div className="absolute bottom-4 right-4">
              {isEmojiPickerOpen && (
                <EmojiPicker 
                  onEmojiClick={handleEmojiClick} 
                  isOpen={isEmojiPickerOpen}
                  onClose={() => setIsEmojiPickerOpen(false)}
                />
              )}
              
              {isImageUploaderOpen && (
                <div className="absolute bottom-0 right-0 mb-2 w-72">
                  <ImageUploader onUpload={handleImageUpload} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <HistoryPanel 
        versions={versions}
        onVersionSelect={handleVersionSelect}
        isOpen={isHistoryPanelOpen}
        onClose={() => setIsHistoryPanelOpen(false)}
      />
    </div>
  );
};

export default Editor;