const Note = require('../models/Note');

exports.addNote = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Text is required'
      });
    }

    const note = await Note.create({
      text,
      user: req.user.userId   
    });

    res.status(201).json({
      success: true,
      data: note
    });

  } catch (err) {
    console.error("Add Note Error:", err.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.userId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });

  } catch (err) {
    console.error("Get Notes Error:", err.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found or unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully'
    });

  } catch (err) {
    console.error("Delete Note Error:", err.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Text is required'
      });
    }

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      { text },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        error: 'Note not found or unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedNote
    });

  } catch (err) {
    console.error("Update Note Error:", err.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};