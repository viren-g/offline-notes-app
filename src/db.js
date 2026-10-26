import { openDB } from 'idb';

// Open the NotesDB database (version 1).
export const initDB = async () => {
  return openDB('NotesDB', 1, {
    upgrade(db) {
      // Create the notes object store if it does not exist.
      if (!db.objectStoreNames.contains('notes')) {
        db.createObjectStore('notes', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    },
  });
};