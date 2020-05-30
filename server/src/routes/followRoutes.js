const express = require('express');
const routes = express.Router();

const FollowController = require('../controllers/FollowController');
const authMiddleware = require('../middlewares/auth');

routes.post('/', authMiddleware, FollowController.follow);
routes.post('/unfollow', authMiddleware, FollowController.unfollow);
routes.get('/followerToApprove', authMiddleware, FollowController.getFollowerToApprove);
routes.post('/approve', authMiddleware, FollowController.approve);
routes.get('/getFollows', authMiddleware, FollowController.getFollows);
routes.get('/getFollowers', authMiddleware, FollowController.getFollowers);

module.exports = routes;