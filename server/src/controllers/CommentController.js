const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const Follow = require('../models/Follow');

class Controller{
    async create(req, res){
        const user = req.userId;
        const { post:idPost, comment} = req.body;

        const post = await Post.findById(idPost);
        if(!post) return res.status(500).send({msg: "Invalid post"});
        
        const author = await User.findById(post.user);
        if(!author) return res.status(500).send({msg: "Invalid user"});

        if(author.closeProfile){
            if(author._id.toString() !== user){
                const follow = await Follow.findOne({user, follow: author, approved: true});
                if(!follow) return res.status(500).send({msg: "Unauthorized"});
            }
        }

        const c = await Comment.create({
            user,
            post,
            comment
        });

        return res.send(c);

    }

    async edit(req, res){
        const user = req.userId;
        const { post:idPost, comment, commentId} = req.body;

        const post = await Post.findById(idPost);
        if(!post) return res.status(500).send({msg: "Invalid post"});
        
        const author = await User.findById(post.user);
        if(!author) return res.status(500).send({msg: "Invalid user"});

        if(author.closeProfile){
            if(author._id.toString() !== user){
                const follow = await Follow.findOne({user, follow: author, approved: true});
                if(!follow) return res.status(500).send({msg: "Unauthorized"});
            }
        }

        const c = await Comment.findByIdAndUpdate(commentId, {
            user,
            post,
            comment
        }, {new: true});

        if(!c) return res.status(500).send({msg: "Invalid comment"});
        return res.send(c);
    }

    async delete(req, res){
        const user = req.userId;
        const { post:idPost, commentId} = req.body;

        const post = await Post.findById(idPost);
        if(!post) return res.status(500).send({msg: "Invalid post"});
        
        if(post.user.toString() !== user){
            const comment = await Comment.findById(commentId);
            if(!comment) return res.status(500).send({msg: "Invalid comment"});
            
            if(comment.user.toString() !== user) return res.status(400).send({msg: "Unauthorized"});
        }

        await Comment.findByIdAndDelete(commentId);

        return res.send({ok: true});
    }

    async get(req, res){
        const {idPost} = req.params;
        const post = await Post.findById(idPost);
        if(!post) return res.status(500).send({msg: 'Invalid post'});

        const comments = await Comment.find({
            post: idPost
        }).sort({_id: -1});
        return res.send({comments});
    }

    async like(req, res){
        const user = req.userId;
		const {comment: id} = req.body;

		const comment = await Comment.findById(id);
		if(!comment) return res.status(500).send({msg: "Invalid comment"})
		

		if(! comment.likes.includes(user) ) comment.likes.push(user);
		
		else{
			const index = comment.likes.indexOf(user);
			comment.likes.splice(index, 1);
		}

		await comment.save();

		return res.send(comment);
    }
}

module.exports = new Controller();