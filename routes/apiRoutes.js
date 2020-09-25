const express = require("express");
const path = require("path");
const fs = require("fs");

let noteData = require("../db/db.json")

module.exports = function (app) {

    let dataStr = fs.readFileSync("./db/db.json", "utf8");

    app.get("/api/notes", function (req, res) {
        console.log("note acknowledge");
        res.json(noteData);
    });

    app.post("/api/notes", function (req, res) {
        let newNote = req.body;
        newNote.id = Math.floor(Math.random() * 10000);

        noteData.push(newNote);
        res.json(noteData);

        fs.writeFile("./db/db.json", JSON.stringify(noteData), function (err) {
            if (err) throw err;
            res.end(noteData);
            console.log("Note Written");
        });

        console.log("Saving");
    });

    app.delete("/api/notes/:id", function (req, res) {
        const notes = JSON.parse(fs.readFileSync("./db/db.json"));
        let id = req.params.id;

        let deleteNote = notes.filter(notes => notes.id != id);

        fs.writeFile("./db/db.json", JSON.stringify(deleteNote), function (err) {
            if (err) throw err;
            console.log("Successful Note1");
        });

        noteData = deleteNote;
        res.json(deleteNote);
        console.log("Deleted Note");
    });
}