const express = require('express')
const router = express.Router()
const fetchuser = require("../Middleware/fetchuser")
const { body, validationResult } = require('express-validator');
const Note = require("../Models/Note")


// ROUTE 1:" Add a new Note using Post" CREATE
router.post('/addnote', fetchuser, [
    body('title', "enter a valid title").isLength({ min: 3 }),
    body('description', "must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json( savedNote )
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})

// ROUTE 2: GET all the notes READ
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json( notes )

    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})


// ROUTE 3: Update an existing note UPDATE
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    // CREATING A NEW NOTE OBJ
    const newNote = {}
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // FIND THE NOTE TO BE UPDATED AND UPDATE IT

    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(404).send("not found") }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
})


// ROUTE 4: Delete an existing note DELETE
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    

    // FIND THE NOTE TO BE DELETED AND DELETE IT

    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(404).send("not found") }

    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "Success":"note deleted" , note:note})
})
module.exports = router;