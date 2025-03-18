import React from "react";
import "./NoteModal.css"; // Add styles for the modal

function NoteModal({ note, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NoteModal;
