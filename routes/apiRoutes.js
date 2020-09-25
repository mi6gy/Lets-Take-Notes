const express = require("express");
const path = require("path");
const fs = require("fs")
const router = require("express"). Router();



//module.exports = function(app) {

    
    let dataStr = fs.readFileSync("./db/db.json", "utf8");


    router.get("/notes", function(req, res){
        
        console.log("getting note");
        let readFile = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        res.json(readFile);
    });

    router.post("/notes", function(req, res){
        let notes = []
       const { title, text } = req.body;

        let newNote = { title, text, id: Math.floor(Math.random() * 10000)}

        let readFile = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        notes = notes.concat(readFile)
        notes.push(newNote);
       

        fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
            if (err) throw err;
        });    
        res.json(newNote);
        console.log("saving note");
    });

    router.delete("notes/:id", function(req, res){
    
console.log("req", req.params)
        
        const notes = JSON.parse(fs.readFileSync("./db/db.json"));
        let id = req.params.id;
        console.log("id", id)
        
        let deleteNote = notes.filter(note => note.id !==parseInt(id));
        console.log("new arr", deleteNote)

        fs.writeFile("./db/db.json", JSON.stringify(deleteNote), function (err) {
            if (err) throw err;
            console.log("sucessful write new");
        });    
        
    
        res.json({ok: true});
        
    });

modules.exports = router