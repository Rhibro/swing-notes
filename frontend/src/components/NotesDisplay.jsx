import NotesCard from './NotesCard';

const NotesDisplay = ({notes, onEdit, onDelete}) => {
  if (!notes || notes.length === 0) {
    return <div className="text-gray-500 text-center w-full py-8">No notes...yet :)</div>;
  }

  return (
    <div className='flex flex-wrap justify-center'>
      {notes.map((note) => (
        <NotesCard 
          key={note.id} 
          note={note} 
          onEdit={() => onEdit(note)} 
          onDelete={() => onDelete(note.id)} />
      ))}
    </div>
  );
};

export default NotesDisplay;