// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

allNotes = [{ "title": "Example Note", "text": "I am the first example note!", "id": 0 }];
nextNoteId = 1;

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {
    return res.json(allNotes);
});

// Displays a single note, or returns false
app.get("/api/notes/:id", function (req, res) {
    var chosen = req.params.id;

    console.log(chosen);

    for (var i = 0; i < allNotes.length; i++) {
        if (chosen === allNotes[i].routeName) {
            return res.json(allNotes[i]);
        }
    }

    return res.json(false);
});

// Create New Notes - takes in JSON input
app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    newNote.id = nextNoteId;
    nextNoteId = nextNoteId + 1;

    allNotes.push(newNote);

    res.send(allNotes);
});

// Deletes a note
app.delete('/api/notes/:id', function (req, res) {
    console.log(req.params.id);

    id = Number(req.params.id)
    allNotes = allNotes.filter(function (note, index, arr) {
        return note.id != id;
    })



    res.send(allNotes);

})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"));
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
