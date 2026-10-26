import { initDB } from './db';

// Retrieve all saved notes from IndexedDB.
export const getAllNotes = async () => {
  // Open the NotesDB database.
  const db = await initDB();

  // Retrieve all notes from the notes object store.
  const notes = await db.getAll('notes');

  // Return the saved notes.
  return notes;
};