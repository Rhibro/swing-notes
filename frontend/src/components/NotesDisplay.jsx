import React, { useEffect, useState } from 'react';
import NotesCard from './NotesCard';

const NotesDisplay = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await fetch('http://localhost:3000/notes'); // Adjust if needed
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleEdit = (note) => {
    console.log('Edit note:', note);
  };

  const handleDelete = (id) => {
    console.log('Delete note with id:', id);
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.map((note) => (
        <NotesCard key={note.id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default NotesDisplay;