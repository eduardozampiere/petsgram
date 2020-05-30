const express = require('express');
const route = express.Router();

route.use('/user', require('./userRoutes'));
route.use('/post', require('./postRoutes'));
route.use('/follow', require('./followRoutes'));

module.exports = route;