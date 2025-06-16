import pool from "../db/pool.js";

// GET all notes for a user
export const getAllNotes = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Search notes
export const searchNotes = async (req, res) => {
  const user_id = req.user.id;
  const query = req.query.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM notes
       WHERE user_id = $1
       AND (title ILIKE $2 OR content ILIKE $2)
       ORDER BY created_at DESC`,
      [user_id, `%${query}%`]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error searching notes:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET specific note
export const getNoteById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  try {
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching note:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  const { title, content } = req.body;
  const user_id = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO notes (user_id, title, content, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING *`,
      [user_id, title, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, content } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  try {
    const result = await pool.query(
      `UPDATE notes
       SET title = $1, content = $2, updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [title, content, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted", note: result.rows[0] });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
