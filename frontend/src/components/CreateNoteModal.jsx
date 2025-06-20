import { useState, useEffect } from "react";
import Button from "./Button";

const CreateNoteModal = ({isOpen, onClose, OnCreate, onEdit, noteToEdit}) => {
    const [form, setFrom] = useState({
        title: "",
        content: "",
    });

    useEffect(() => {
        if (isOpen) {
        if (noteToEdit) {
            setFrom({
                title: noteToEdit.title,
                content: noteToEdit.content,
            });
        } else {
            setFrom({
                title: "",
                content: "",
            });
        }
        }   
    }, [isOpen, noteToEdit]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFrom((prev) => ({
            ...prev, 
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
         e.preventDefault();
        if (noteToEdit && onEdit) {
            onEdit({ ...noteToEdit, ...form }); // Pass the note's id and updated fields
        } else if (OnCreate) {
            OnCreate(form);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="center-modal">
        <form onSubmit={handleSubmit}>
             <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-4">
                <h2 className="text-xl font-semibold">
                    {noteToEdit ? "Edit Note" : "Create New Note"}
                </h2>

                {/* Title */}
                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        id="title"
                        maxLength={50}
                        className="w-full border rounded p-2"
                        placeholder="Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        id="content"
                        maxLength={300}
                        className="w-full border rounded p-2"
                        placeholder="Content"
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{noteToEdit ? "Save Changes" : "Create"}</Button>
                </div>
            </div>
        </form>
        </div>
    )
}

export default CreateNoteModal;