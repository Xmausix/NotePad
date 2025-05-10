import { useState, useEffect } from 'react';
import { Note, NoteVersion } from '../types';
import { format } from 'date-fns';

const DEFAULT_NOTE_CONTENT = '';

export const useNoteStorage = () => {
  const [note, setNote] = useState<Note>(() => {
    const savedNote = localStorage.getItem('currentNote');
    if (savedNote) {
      return JSON.parse(savedNote);
    }
    return {
      id: crypto.randomUUID(),
      content: DEFAULT_NOTE_CONTENT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  const [versions, setVersions] = useState<NoteVersion[]>(() => {
    const savedVersions = localStorage.getItem('noteVersions');
    if (savedVersions) {
      return JSON.parse(savedVersions);
    }
    return [];
  });

  // Save note on changes
  useEffect(() => {
    localStorage.setItem('currentNote', JSON.stringify(note));
  }, [note]);

  // Save versions on changes
  useEffect(() => {
    localStorage.setItem('noteVersions', JSON.stringify(versions));
  }, [versions]);

  const updateNote = (content: string) => {
    const now = new Date().toISOString();
    setNote({
      ...note,
      content,
      updatedAt: now,
    });
  };

  const saveVersion = () => {
    // Only save if content has changed
    if (versions.length === 0 || versions[0].content !== note.content) {
      const newVersion: NoteVersion = {
        id: crypto.randomUUID(),
        noteId: note.id,
        content: note.content,
        createdAt: new Date().toISOString(),
      };
      
      setVersions([newVersion, ...versions]);
    }
  };

  const restoreVersion = (version: NoteVersion) => {
    // Save current version before restoring
    saveVersion();
    
    // Restore the selected version
    updateNote(version.content);
  };

  const clearAll = () => {
    // Create a version of the current note before clearing
    if (note.content !== DEFAULT_NOTE_CONTENT) {
      saveVersion();
    }
    
    const now = new Date().toISOString();
    setNote({
      id: crypto.randomUUID(),
      content: DEFAULT_NOTE_CONTENT,
      createdAt: now,
      updatedAt: now,
    });
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  return {
    note,
    versions,
    updateNote,
    saveVersion,
    restoreVersion,
    clearAll,
    formatDate,
  };
};