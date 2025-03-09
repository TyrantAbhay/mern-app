import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();
 // Establish DB connection when the server starts

const app = express();

app.get('/products', (req, res) => {
    res.send('Server is ready, hello world');
});

app.listen(5000, () => {
    connectDB();
    console.log('Server is running at http://localhost:5000');
});
