const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middlewares/auth');
const CommentController = require('../controllers/CommentController');

routes.post('/create', authMiddleware, CommentController.create);
routes.put('/edit', authMiddleware, CommentController.edit);
routes.delete('/delete', authMiddleware, CommentController.delete);
routes.get('/:idPost/:page?', CommentController.get);
routes.post('/like', authMiddleware, CommentController.like);


module.exports = routes;