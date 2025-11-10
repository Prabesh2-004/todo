import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import router from './routes/todo.routes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Application/JSON'],
  })
);

app.use('/api/todo', router);

connectDB();

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
