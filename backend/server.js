const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "W7301@jqir#",
  database: "keeper",
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// Get all notes
app.get("/notes", (req, res) => {
  const sql = "SELECT * FROM notes";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Add a new note
app.post("/notes", (req, res) => {
  const note = req.body;
  const sql = "INSERT INTO notes (title, content) VALUES (?, ?)";
  db.query(sql, [note.title, note.content], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, ...note });
  });
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM notes WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: "Note deleted" });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
