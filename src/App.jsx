import { useEffect, useState } from 'react';
import { addNote } from './AddNotes';
import { getAllNotes } from './GetNotes';
import './App.css';

function App() {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  // Read saved notes when the application loads.
  useEffect(() => {
    async function loadNotes() {
      try {
        const savedNotes = await getAllNotes();
        setNotes(savedNotes);
      } catch {
        setError('Unable to load notes.');
      }
    }

    loadNotes();
  }, []);

  // Save a note and refresh the list.
  async function handleAddNote(event) {
    event.preventDefault();
    setError('');

    try {
      await addNote(noteText);
      setNoteText('');

      const updatedNotes = await getAllNotes();
      setNotes(updatedNotes);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="app-container">
      <h1>Offline Notes App</h1>
      <p>Save notes and access them even without internet.</p>

      <form onSubmit={handleAddNote}>
        <input
          type="text"
          placeholder="Write your note..."
          value={noteText}
          onChange={(event) => setNoteText(event.target.value)}
          aria-label="Note text"
        />
        <button type="submit">Add Note</button>
      </form>

      {error && <p role="alert">{error}</p>}

      <h2>Saved Notes ({notes.length})</h2>

      {notes.length === 0 ? (
        <p>No notes saved yet.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.text}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;