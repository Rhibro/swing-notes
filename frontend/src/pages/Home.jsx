import { useState, useEffect } from "react";
import NotesCard from "../components/NotesCard";
import NotesDisplay from "../components/NotesDisplay";
import CreateNoteModal from "../components/CreateNoteModal";


const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const userObj = JSON.parse(localStorage.getItem("user"));
  const username = userObj?.user?.username;

  const [search, setSearch] = useState("");
  const filteredNotes = notes.filter(note =>
  note.title.toLowerCase().includes(search.toLowerCase())
  );

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      setNotes([]); // fallback to empty array
      console.error("Failed to fetch notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async (note) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });
      if (!res.ok) throw new Error("Failed to create note");
      await fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditNote = async (note) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/notes/${note.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });
      if (!res.ok) throw new Error("Failed to update note");
      await fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete note");
      await fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const openNewNoteModal = () => {
    setNoteToEdit(null);
    setIsModalOpen(true);
  };

  const openEditNoteModal = (note) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNoteToEdit(null);
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">{username ? `${username}'s Notes` : "Your notes"}</h1>
      <input
        type="text"
        placeholder="Search notes by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border rounded px-3 py-2 my-4 w-full max-w-md"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={openNewNoteModal}
      >
        New Note
      </button>
      <CreateNoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        OnCreate={handleCreateNote}
        onEdit={handleEditNote}
        noteToEdit={noteToEdit}
      />
      <NotesDisplay
        notes={filteredNotes}
        onEdit={openEditNoteModal}
        onDelete={handleDeleteNote}
      />
    </div>
  );
};

export default Home;