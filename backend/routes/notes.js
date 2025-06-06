import express from "express";
import pool from "../db/pool.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

// GET all notes
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const result = await pool.query("SELECT * FROM notes ORDER BY created_at DESC");
    res.status(200).json(result.rows);
  })
);

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
  asyncHandler(async (req, res) => {
    const { user_id, title, content } = req.body;

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

// {
//         "id": 1,
//         "user_id": 1,
//         "title": "First Swing Note",
//         "content": "This is a test note about swing technique.",
//         "created_at": "2025-06-03T09:34:45.807Z",
//         "updated_at": "2025-06-03T09:34:45.807Z"
//     }