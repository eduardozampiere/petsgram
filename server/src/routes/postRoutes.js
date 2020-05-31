const express = require('express');
const multer = require('multer');
const routes = express.Router();

const multerConfig = require('../config/multer');
const PostController = require('../controllers/PostController');
const authMiddleware = require('../middlewares/auth');


routes.post('/create', authMiddleware, multer(multerConfig).array('image[]', 10), PostController.create);
routes.get('/feed', authMiddleware, PostController.feed);
routes.post('/like', authMiddleware, PostController.like);
routes.put('/edit', authMiddleware, PostController.edit);
routes.delete('/delete', authMiddleware, PostController.delete);

module.exports = routes;