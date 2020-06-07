const Post = require('../models/Post');
const User = require('../models/User');
const Follow = require('../models/Follow');

class Controller{
	async create(req, res){
		const user = req.userId;

		const image = req.files.map(i => {
			return i.filename;
		})

		const {description} = req.body;
		
		const post = await Post.create({
			user,
			description,
			images: image		
		})

		await User.findByIdAndUpdate(user, {
			lastPost: new Date(),
		})
		res.send(post);
	}

	async get(req, res){
		const {user, page} = req.params;
		const posts = await Post.paginate({user: user}, {
			sort: {_id: -1},
			page
		});

		res.send(posts);
	}

	async getById(req, res){
		const {id} = req.params;
		try{
			const post = await Post.findById(id).populate('user');
			return res.send(post);
		}
		catch(err){
			return res.status(500).send({msg: 'Invalid post'});
		}

	}

	async feed(req, res){
		const user = req.userId;
		const {page} = req.params;
		console.log(page);
		const follow = await Follow.find({user});
		const follows = follow.map(r => r.follow);
		
		const options = {
			sort: {_id: -1},
			populate: 'user',
			page,
			limit: 10
		}

		const feed = await Post.paginate({
			$or: [
				{
					user: {
						$in: follows
					}
				},
				{
					user: req.userId
				}
			]
		}, options);

		res.send(feed);
	}

	async like(req, res){
		const user = req.userId;
		const {post: id} = req.body;

		const post = await Post.findById(id);
		if(!post) return res.status(500).send({msg: "Invalid post"})
		

		if(! post.likes.includes(user) ) post.likes.push(user);
		
		else{
			const index = post.likes.indexOf(user);
			post.likes.splice(index, 1);
		}

		await post.save();

		return res.send(post);
	}

	async edit(req, res){
		const user = req.userId;
		const {id, description} = req.body;
		
		const post = await Post.findById(id);
		if(!post) return res.status(500).send({msg: "Invalid post"});

		if(post.user.toString() !== user) return res.status(400).send({msg: 'Unauthorized'});

		post.description = description;
		post.save();

		return res.send(post);
	}

	async delete(req, res){
		const user = req.userId;
		const {id} = req.body;
		
		const post = await Post.findById(id);
		if(!post) return res.status(500).send({msg: "Invalid post"});

		if(post.user.toString() !== user) return res.status(400).send({msg: 'Unauthorized'});

		await Post.findByIdAndDelete(id);

		return res.send({ok: true});
	}
}

module.exports = new Controller();