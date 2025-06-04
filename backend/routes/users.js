import express from "express";
import pool from "../db/pool.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcrypt";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Error creating user
 */

// create a new user
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        `INSERT INTO users (username, email, password)
         VALUES ($1, $2, $3)
         RETURNING id, username, email`,
        [username, email, hashedPassword || "user"]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Error creating user" });
    }
  })
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error fetching users
 */

// get all users
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, username, email FROM users"
      );
      res.json(result.rows);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Error fetching users" });
    }
  })
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Error fetching user
 */

// get a specific user by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query(
        "SELECT id, username, email FROM users WHERE id = $1",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Error fetching user" });
    }
  })
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user
 */

// update a user
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
      const result = await pool.query(
        `UPDATE users 
         SET username = $1, email = $2
         WHERE id = $3 
         RETURNING id, username, email`,
        [username, email, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: "Error updating user" });
    }
  })
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Error deleting user
 */

// delete a specific user
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING id, username, email, password",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User deleted", user: result.rows[0] });
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Error deleting user" });
    }
  })
);

export default router;


//  {
//         "id": 1,
//         "username": "testuser",
//         "email": "testuser@example.com"
//     }