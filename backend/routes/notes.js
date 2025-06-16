import express from "express";
import pool from "../db/pool.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all notes
router.get(
  "/",
  authenticateToken,
  asyncHandler(async (req, res) => {
    const user_id = req.user.id;

    const result = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    res.status(200).json(result.rows);
  })
);

// GET notes search
router.get(
  "/search",
  authenticateToken,
  asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const query = req.query.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({message: "Query parameter is requiered"});
    }

    const result = await pool.query(
      `SELECT * FROM notes
      WHERE user_id = $1
      AND (title ILIKE $2 OR content ILIKE $2)
      ORDER BY created_at DESC`,
      [user_id, `%${query}%`]
    );

    res.status(200).json(result.rows);
  })
)

// GET note by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(result.rows[0]);
  })
);

// POST create new note
router.post(
  "/",
   authenticateToken,
  asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const user_id = req.user.id; // Extracted from the JWT

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const result = await pool.query(
      `INSERT INTO notes (user_id, title, content, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING *`,
      [user_id, title, content]
    );

    res.status(201).json(result.rows[0]);
  })
);

// PUT update a note
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const { title, content } = req.body;

    const result = await pool.query(
      `UPDATE notes
       SET title = $1,
           content = $2,
           updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [title, content, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(result.rows[0]);
  })
);

// DELETE note
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const result = await pool.query("DELETE FROM notes WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted", note: result.rows[0] });
  })
);

export default router;
