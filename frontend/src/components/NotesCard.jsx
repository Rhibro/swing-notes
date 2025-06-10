import React from 'react';
import Button from './Button'; // Adjust path as needed

const NotesCard = ({ note, onEdit, onDelete }) => {
    if (!note) return <h2>Looks like you don't have any notes...</h2>
  return (
    <section className="bg-green-300 p-8 rounded-2xl shadow-md space-y-2">
      <h3 className="text-lg font-semibold text-black">{note.title}</h3>
      <p className="text-sm text-gray-600">{note.content}</p>
      <div className="text-xs text-gray-500">
        <p>Created: {new Date(note.created_at).toLocaleString()}</p>
        <p>Uppdated: {new Date(note.updated_at).toLocaleString()}</p>
      </div>
      <div className="flex justify-evenly space-x-2">
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </section>
  );
};

// // PropTypes definition
// NotesCard.propTypes = {
//   note: PropTypes.shape({
//     id: PropTypes.number,
//     title: PropTypes.string,
//     content: PropTypes.string,
//     created_at: PropTypes.string,
//     updated_at: PropTypes.string,
//   }),
//   onEdit: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };


export default NotesCard;
