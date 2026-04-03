const {Router} = require('express');

const noteController = require('../controllers/noteControllers');
const authMiddleware = require('../middleware/auth.middleware');

const noteRouter = Router();

noteRouter.post('/', authMiddleware, noteController.addNote);
noteRouter.get('/', authMiddleware, noteController.getNotes);
noteRouter.delete('/:id', authMiddleware, noteController.deleteNote);
noteRouter.put('/:id', authMiddleware, noteController.updateNote);

module.exports = noteRouter;