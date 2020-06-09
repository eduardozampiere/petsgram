const express = require('express');
const multer = require('multer');

const multerConfig = require('../config/multer');
const authMiddleware = require('../middlewares/auth');
const routes = express.Router();
const UserController = require('../controllers/UserController');

routes.get('/get', authMiddleware, UserController.getMyUser);
routes.get('/sugestions', authMiddleware, UserController.sugestions);
routes.get('/get/:user', UserController.get);
routes.get('/find/:user', UserController.find);
routes.post('/create', UserController.create);
routes.post('/login', UserController.login);
routes.delete('/delete', authMiddleware, UserController.delete);
routes.put('/edit', authMiddleware, UserController.edit);
routes.post('/forgot-pass', UserController.forgotPass);
routes.post('/change-pass', UserController.changePass);
routes.put('/upload-profile', authMiddleware, multer(multerConfig).single('image'), UserController.uploadProfile);


module.exports = routes;