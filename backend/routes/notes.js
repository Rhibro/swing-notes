import express from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  searchNotes
} from "../controllers/noteControllers.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route definitions with middleware + controller handlers
router.get("/", authenticateToken, asyncHandler(getAllNotes));
router.get("/search", authenticateToken, asyncHandler(searchNotes));
router.get("/:id", asyncHandler(getNoteById));
router.post("/", authenticateToken, asyncHandler(createNote));
router.put("/:id", asyncHandler(updateNote));
router.delete("/:id", asyncHandler(deleteNote));

export default router;
