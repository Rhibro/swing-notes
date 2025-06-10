import React, { useEffect, useState } from 'react';
import NotesCard from './NotesCard';

const NotesDisplay = ({notes}) => {
  // const [notes, setNotes] = useState([]);

  // const fetchNotes = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await fetch('http://localhost:3000/notes', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }); 
  //     const data = await res.json();
  //     setNotes(data);
  //   } catch (error) {
  //     console.error('Failed to fetch notes:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchNotes();
  // }, []);

  const handleEdit = (note) => {
    console.log('Edit note:', note);
  };

  const handleDelete = (id) => {
    console.log('Delete note with id:', id);
  };

  return (
    <div className='flex flex-wrap justify-center'>
      {notes.map((note) => (
        <NotesCard key={note.id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default NotesDisplay;