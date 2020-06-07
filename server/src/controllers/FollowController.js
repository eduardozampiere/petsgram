const Follow = require('../models/Follow');
const User = require('../models/User');

class Controller{
	async follow(req, res){
		const id = req.userId;
		const {id: followId} = req.body;
		if(id === followId) return res.status(500).send({msg: 'You cannot follow yourself'});

		const follow = await Follow.findOne({user: id, follow: followId});		
		if(follow) return res.status(400).send({msg: 'Already follow'})
		
		const user = await User.findById(followId);
		let approved = true;
		if(user.closeProfile){
			approved = false;
		}
		
		await Follow.create({
			user: id,
			follow: followId,
			approved
		});

		return res.send({ok: true});
	}

	async unfollow(req, res){
		const id = req.userId;
		const {id: followId} = req.body;

		if(id === followId) return res.status(400).send({msg: 'You cannot unfollow yourself'});

		const follow = await Follow.findOne({user: id, follow: followId});		
		if(!follow) return res.status(400).send({msg: 'You cannot unfollow someone you not follow'})
		
		await Follow.deleteOne({user: id, follow: followId});
	
		return res.send({ok: true});
	}

	async approve(req, res){
		const user = req.userId;
		const {id} = req.body;

		const follow = await Follow.findById(id);

		if(!follow) return res.status(500).send({msg: 'Internal error'})
		if(follow.approved) return res.status(500).send({msg: 'You dont need to approve'});

		if(follow.follow.toString() !== user) res.status(400).send('Unauthorized');

		follow.approved = true;
		follow.save();

		return res.send(follow);
	}

	async getFollows(req, res){
		const {username} = req.params;
		try{
			const user = await User.findOne({userName: username});
			
			if(!user) res.status(400).send({msg: 'User not found'});			
			
			const follows = await Follow.paginate({user: user.id});

			const alreadyFollow = await Follow.findOne({
				user: user.id,
				follow: req.userId
			})
			res.send({follows, followMe: (alreadyFollow ? true : false)});
		}
		catch(err){
			console.log(err);
			res.status(500).send({msg: 'Internal Error'});
		}
	}

	async getFollowers(req, res){
		const {username} = req.params;
		try{
			const user = await User.findOne({userName: username});
			if(!user) res.status(400).send({msg: 'User not found'});			
			
			const follows = await Follow.paginate({follow: user.id});

			const alreadyFollow = await Follow.findOne({
				follow: user.id,
				user: req.userId
			})

			res.send({follows, iFollow: (alreadyFollow ? true : false)})
		}
		catch(err){
			console.log(err);
			res.status(500).send({msg: 'Internal Error'});
		}
	}

	async getFollowerToApprove(req, res){
		const id = req.userId;
		console.log(id);
		const followers = await Follow.find({follow: id, approved: false});

		res.send(followers);
	}
}

module.exports = new Controller();