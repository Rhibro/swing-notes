import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db/pool.js';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger-export.js';

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
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
import userRoutes from "./routes/users.js";
import notesRoutes from "./routes/notes.js";

app.use("/users", userRoutes);
app.use("/notes", notesRoutes);

// test route
app.get('/', (req, res) => {
  res.send('Swing-Notes API is running');
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Swagger docs at http://localhost:3000/api-docs');
});
