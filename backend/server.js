import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import notesRouter from "./routes/notesRoutes.js";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./Middleware/errorMiddleware.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// ES6-compatible way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
config();
connectDB();
app.use(json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world 2");
  });
  /* 
app.get("/api/notes", (req, res) => {
  res.setHeader("Content-Type", "application/json"); // Make sure the response type is JSON
  res.json(notes); // Send JSON as a string if you're not using res.json()
});
*/
app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((note) => note._id === req.params.id);
  return res.json(note);
}); 
app.use("/api/users", userRouter);
app.use("/api/notes", notesRouter);
app.use('/uploads', express.static('uploads'));
app.use(errorHandler);
app.listen(3035, () => console.log("server is running at 3035 and watching"));





/* 
 // grok code 18.4.25
 const express = require('express');
const cors = require('cors');
const notes = require('./data/notes');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const multer = require('multer');
const { createUser } = require('./controllers/userController');
const { errorHandler, notFound } = require('./Middleware/errorMiddleware');
const fs = require('fs');
const path = require('path');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    return cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    return cb(null,  file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send('hello world 2');
});

app.get('/api/notes', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find(note => note._id === req.params.id);
  return res.json(note);
});

app.post('/api/users', upload.single('file'), createUser);

app.use(notFound);
app.use(errorHandler);

app.listen(3035, () => console.log('server is running at 3035 and watching'));
 
 
 
 */
