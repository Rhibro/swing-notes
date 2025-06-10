import NotesCard from './NotesCard';

const NotesDisplay = ({notes, onEdit, onDelete}) => {

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