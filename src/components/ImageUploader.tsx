import React, { useState, useRef } from 'react';
import { ImageIcon, Link, Upload, X } from 'lucide-react';
import { ImageUploadProps } from '../types';

const ImageUploader: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [url, setUrl] = useState('');
  const [isUrlInput, setIsUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUpload(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onUpload(url);
      setUrl('');
      setIsUrlInput(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add Image</h3>
        <button 
          onClick={() => setIsUrlInput(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {isUrlInput ? (
          <form onSubmit={handleUrlSubmit} className="space-y-3">
            <div className="flex items-center space-x-2">
              <Link size={18} className="text-gray-500 dark:text-gray-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsUrlInput(false)}
                className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700"
              >
                Add Image
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={triggerFileInput}
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Upload size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Upload from device</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </button>
            <button
              onClick={() => setIsUrlInput(true)}
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Link size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Add from URL</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;