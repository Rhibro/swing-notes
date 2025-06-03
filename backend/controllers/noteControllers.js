import pool from "../db/pool.js";

// GET all notes
export const getAllNotes = async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM notes");
        res.status(200).json(data.rows);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).send("Internal server error!");
    }
};

// GET specific note
export const getNoteById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching note:", err);
        res.status(500).json({message: "Internal server error!"});
    }
};

// Create a note
export const createNote = async (req, res) => {
    const {
        title,
        content,
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO notes
            (title, content)
            VALUES ($1, $2)
            RETURNING *`,
            [
                title,
                content,
            ]  
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creatin a note:", err);
        res.status(500).send("Error creating a note");
    }
};

// Update a note 
export const updateNote = async (req, res) => {
    const id = parseInt(req.params.id);
    const {
        title, 
        content,
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE notes SET
            title = $1,
            content = $2
            WHERE id = $3
            RETURNING *`,
            [
                title,
                content,
                id,
            ]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).josn(result.rows[0]);
    } catch (err) {
        console.error("Error updating note:", err);
        res.status(500).json({message: "Internal server error"});
    }
};

// DELETEs a note
export const deleteNote = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const result = await pool.query(
            "DELETE FROM notes WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note deleted", note: result.rows[0]});
    } catch (err) {
        console.error("Error deleting note:", err);
        res.status(500).json({message: "Internal server error!"});
    }
};