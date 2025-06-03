// controllers/usersController.js
import pool from "../db.js";

// Create a new user
export const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, firstname, lastname, email, role`,
            [username, email, password || "user"]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Error creating user" });
    }
};

// GET all users
export const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, username, email FROM users"
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Error fetching users" });
    }
};

// GET a specific user
export const getUserById = async (req, res) => {
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
};

// Update a user
export const updateUser = async (req, res) => {
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
};

// Delete a user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING id, username, email",
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
};

