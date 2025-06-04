import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db/pool.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// test database connection
pool.query('SELECT NOW()')
  .then(res => {
    console.log('PostgreSQL connected:', res.rows[0])
  })
  .catch(err => {
    console.error('Connection error:', err)
  })

// middleware
app.use(cors());
app.use(express.json());

// routes
import userRoutes from "./routes/users.js";
import notesRoutes from "./routes/notes.js";

app.use("/users", userRoutes);
app.use("/notes", notesRoutes);

// test route
app.get('/', (req, res) => {
  res.send('Swing-Notes API is running');
});

// global error handler
// app.use((err, req, res, next) => {
//   console.error("Unhandled error:", err.stack);
//   res.status(500).json({message: "Internal server error", error: err.message});
// });

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
