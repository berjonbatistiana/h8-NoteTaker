const path = require("path");
const fs = require("fs");

function insertNote(req, res) {

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (readErr, data) => {
        const response = {
            status: 200,
            message: `New note inserted`
        };

        if (readErr) {
            console.log(readErr);
            response.status = 500;
            response.message = readErr;
            res.json(response);
            return;
        }

        const notesDBJSON = JSON.parse(data);
        let id = 0;
        while (notesDBJSON.some(note => note.id === id)){
            id++;
        }

        const newNote = {
            id: id,
            title: req.title,
            text: req.text
        }
        
        notesDBJSON.push(newNote);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesDBJSON), writeErr => {

            if (writeErr) {
                console.log(writeErr);
                response.status = 500;
                response.message = err;
                res.json(response);
                return;
            }

            res.json(response);
        })
    });
}

function deleteNote(req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (readErr, data) => {
        const response = {
            status: 200,
            message: `Note ID ${req.id} deleted`
        };

        if (readErr) {
            console.log(readErr);
            response.status = 500;
            response.message = readErr;
            res.json(response);
            return;
        }

        const notesDBJSON = JSON.parse(data);
        const updatedNotesDBJSON = notesDBJSON.filter(note => note.id !== parseInt(req.id));

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(updatedNotesDBJSON), writeErr => {

            if (writeErr) {
                console.log(writeErr);
                response.status = 500;
                response.message = writeErr;
                res.json(response);
                return;
            }

            res.json(response);
        })
    });
}

module.exports = { insertNote, deleteNote };