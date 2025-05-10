export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteVersion {
  id: string;
  noteId: string;
  content: string;
  createdAt: string;
}

export interface EmojiPickerProps {
  onEmojiClick: (emoji: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export interface ToolbarProps {
  onEmojiToggle: () => void;
  onImageUploadToggle: () => void;
  onFormatClick: (format: string) => void;
}

export interface HistoryPanelProps {
  versions: NoteVersion[];
  onVersionSelect: (version: NoteVersion) => void;
  isOpen: boolean;
  onClose: () => void;
}