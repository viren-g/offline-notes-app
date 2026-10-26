import { initDB } from './db';

// Add a new note to IndexedDB.
export const addNote = async (noteText) => {
  // Prevent empty notes from being saved.
  const text = noteText.trim();

  if (!text) {
    throw new Error('Note cannot be empty');
  }

  // Open the NotesDB database.
  const db = await initDB();

  // Save the note in the notes object store.
  return db.add('notes', {
    text: text,
    createdAt: new Date().toISOString(),
  });
};