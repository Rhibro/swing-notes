import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db/pool.js';


pool.query('SELECT NOW()')
  .then(res => {
    console.log('PostgreSQL connected:', res.rows[0])
  })
  .catch(err => {
    console.error('Connection error:', err)
  })

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Swing-Notes API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
