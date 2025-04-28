// server.js
// A simple Express.js backend for a Todo list API

const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

// Create and connect to the SQLite database
const db = new sqlite3.Database('./todos.db');  // Use ./todos.db to store the database

// Create the "todos" table if it doesn't exist
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, priority TEXT, isComplete BOOLEAN, isFun BOOLEAN)");
});

// Middleware to parse JSON requests
app.use(express.json());

// Use cors middleware to allow requests from different ports
app.use(cors());

// Middleware to include static content
app.use(express.static('public'));

// In-memory array to store todo items
let todos = [
  {
    id: 0,
    name: 'nina',
    priority: 'high',
    isComplete: false,
    isFun: false
  }
];
let nextId = 1;

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Ensures the path is correct
});

// GET all todo items
app.get('/todos', (req, res) => {
    db.all("SELECT * FROM todos", [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);  // Return all todos as a JSON response
    });
});

// GET a specific todo item by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(item => item.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo item not found' });
  }
});

// POST a new todo item
app.post('/todos', (req, res) => {
    const { name, priority = 'low', isFun = true } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
  
    const stmt = db.prepare("INSERT INTO todos (name, priority, isComplete, isFun) VALUES (?, ?, ?, ?)");
    stmt.run(name, priority, false, isFun, function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error adding todo' });
      }
      res.status(201).json({ id: this.lastID, name, priority, isComplete: false, isFun });  // Return the new todo with its ID
    });
    stmt.finalize();
  });  

// DELETE a todo item by ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);  // Get the ID from the URL
  
    db.run("DELETE FROM todos WHERE id = ?", id, function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error deleting todo' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Todo item not found' });
      }
      res.json({ message: `Todo item ${id} deleted.` });  // Return success message
    });
});
   
// Start the server
app.listen(port, () => {
    console.log(`Todo API server running at http://localhost:${port}`);
});
