// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const noteController = require("./Controllers/noteController");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", function ({ body: req }, res) {
    
    noteController.insertNote(req, res);

});

app.delete("/api/notes/:id", function ({ params: req }, res) {
    noteController.deleteNote(req, res);

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});