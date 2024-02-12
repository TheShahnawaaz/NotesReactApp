// routes/notes.js

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth'); // Assume you have an auth middleware to validate tokens
const Note = require('../models/Note');
const User = require('../models/User');

// @route    POST api/notes
// @desc     Create a note
// @access   Private
router.post('/', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content cannot be empty').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const newNote = new Note({
            title: req.body.title,
            content: req.body.content,
            user: user.id
        });

        const note = await newNote.save();
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Additional routes for GET, PUT, and DELETE would be implemented similarly,
// ensuring they are authenticated and operate on the user's notes.
// routes/notes.js

// Assuming you've already set up express, router, and other imports at the top

// GET all notes for the authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// GET one note using id
router.get('/:id', auth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ msg: 'Note not found' });

        // Ensure user owns note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// PUT update a note
router.put('/:id', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content cannot be empty').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;

    try {
        let note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ msg: 'Note not found' });

        // Ensure user owns note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: { title, content } }, { new: true });

        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// DELETE a note
router.delete('/:id', auth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ msg: 'Note not found' });

        // Ensure user owns note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Note.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Note removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
