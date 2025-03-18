import React from "react";

function Note({ id, title, content, onDelete, onClick }) {
  return (
    <div className="note" onClick={() => onClick({ id, title, content })}>
      <h1>{title}</h1>
      <p>{content}</p>
      <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(id); }}>
        &#10005; {/* Unicode character for a cross */}
      </button>
    </div>
  );
}

export default Note;
