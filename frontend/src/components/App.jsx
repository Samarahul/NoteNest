import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import NoteModal from "./NoteModal";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null); // State for selected note

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then(response => response.json())
      .then(data => setNotes(data));
  }, []);

  function addNote(newNote) {
    fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newNote)
    })
      .then(response => response.json())
      .then(data => setNotes(prevNotes => [...prevNotes, data]));
  }

  function deleteNote(id) {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE"
    }).then(() => {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    });
  }

  function openNote(note) {
    setSelectedNote(note);
  }

  function closeNote() {
    setSelectedNote(null);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="notes-container">
        {notes.map(noteItem => (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onClick={openNote} // Handle click to open note
          />
        ))}
      </div>
      <Footer />
      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={closeNote} // Close modal function
        />
      )}
    </div>
  );
}

export default App;
