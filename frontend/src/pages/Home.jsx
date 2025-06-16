import { useState, useEffect } from "react";
import NotesDisplay from "../components/NotesDisplay";
import CreateNoteModal from "../components/CreateNoteModal";


const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const userObj = JSON.parse(localStorage.getItem("user"));
  const username = userObj?.user?.username;

  const [search, setSearch] = useState("");
 
  // search notes
  useEffect(() => {
  const fetchFilteredNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      let url = "http://localhost:3000/notes";
      if (search.trim()) {
        url = `http://localhost:3000/notes/search?query=${encodeURIComponent(search)}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Search error:", error);
      setNotes([]);
    }
  };

  fetchFilteredNotes();
}, [search]);

// GET all notes for specific user
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

  // create a note
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

  // edit a note
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

  // delete a note
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
        className="formBtn"
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
        notes={notes}
        onEdit={openEditNoteModal}
        onDelete={handleDeleteNote}
      />
    </div>
  );
};

export default Home;