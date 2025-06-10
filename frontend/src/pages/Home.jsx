import NotesCard from "../components/NotesCard";
import NotesDisplay from "../components/NotesDisplay";
import CreateNoteModal from "../components/CreateNoteModal";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setNotes(data);
    } catch (error) {
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

  return (
  <div>
    <h1 className="semi-bold">Your Notes</h1>
    <button
      onClick={() => setIsModalOpen(true)}
    >New Note</button>
    <CreateNoteModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      OnCreate={handleCreateNote}
    />
    <NotesDisplay notes={notes} />
  </div>
)
};

export default Home;