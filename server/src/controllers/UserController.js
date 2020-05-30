const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const mailer = require('../modules/mailer');
const User = require('../models/User');
const config = require('../config/jwt.json');

function generateToken(params = {} ){
    return jwt.sign(params, config.secret,{ expiresIn: 86400})
}

class Controller{
    async create(req, res){
        const data = req.body;
        const error = [];

        if(!data.name) error.push({msg: "Invalid name"});
        if(!data.email) error.push({msg: "Invalid email"});
        if(!data.userName) error.push({msg: "Invalid username"});
        if(!data.password) error.push({msg: "Invalid password"});
        
        if(error.length > 0){
            return res.status(500).send(error);
        }

        if( await User.findOne({
            $or: [
                {email: data.email},
                {userName: data.userName}
            ]
        })){
            return res.status(500).send({msg: 'Already exists a user with this credentials'})
        }

        data.password = await bcrypt.hash(data.password, 10);

        const user = await User.create(data);
        let token = generateToken({id: user.id});

        return res.send({user, token});
    }

    async login(req, res){
        const data = req.body;
        const error = [];
        if(!data.userName) error.push({mgs: 'Invalid username'});
        if(!data.password) error.push({mgs: 'Invalid password'});
        
        if(error.length > 0){
            return res.status(500).send(error);
        }

        const user = await User.findOne({userName: data.userName}).select("+password");
        if(!user){
            return res.status(500).send({msg: 'User not found'});
        }
        
        if(! await bcrypt.compare(data.password, user.password)){
            return res.status(400).send({msg: 'Invalid password'})
        }
        
        const token = generateToken({id: user.id});
        user.password = undefined;
        return res.send({user, token});
    }

    async delete(req, res){
        console.log(req.userId);
        if(req.userId !== req.body.id) return res.status(400).send({msg: 'Invalid token'})
        
        await User.deleteOne({id: req.userId});

        return res.send({ok: true});
        
    }

    async edit(req, res){
        if(req.userId !== req.body.id) return res.status(400).send({msg: 'Invalid token'})
        const data = req.body;
        if(!data.id) return res.status(400).send({msg: 'Invalid user'});

        data.id = undefined;
        const user = await User.findByIdAndUpdate(req.userId, data, {new: true});

        res.send(user);
    }

    async uploadProfile(req, res){
        const id = req.userId;
		const image = req.file.filename;
        console.log(id);
        const user = await User.findByIdAndUpdate(req.userId, {profilePhoto: image}, {new: true});


        res.send(user);
    }

    async forgotPass(req, res){
        const {userName} = req.body;
        const user = await User.findOne({userName});
        if(!user) return res.status(400).send({msg: 'User not found'});

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.updateOne({
            userName
        }, {
            passwordResetToken: token,
            passwordResetExpires: now
        });

        mailer.sendMail({
            to: user.email,
            from: 'petsgram@petsgram.com',
            template: 'forgot_pass',
            context: {token, name: user.name, userName: user.userName}
        }, err => {
            console.log(err);
            if(err) return res.status(500).send({msg: 'Erro sending email'});
            
            return res.send({ok: true})
        })
        
    }

    async changePass(req, res){
        const {token, userName, password} = req.body;

        if(!token || !userName || !password) return res.status(500).send({msg: 'Credentials error'})

        const user = await User.findOne({userName});
        if(!user) return res.status(400).send({msg: "User not found"});

        if(token !== user.passwordResetToken) return res.status(400).send({msg: 'Invalid token'});

        const now = new Date();
        if(now > user.passwordResetExpires) return res.status(400).send({msg: "Token expired"});

        user.passwordResetExpires = null;
        user.passwordResetToken = null;
        user.password = await bcrypt.hash(password, 10);
        user.save();

        res.send({ok: true})
    }
}

module.exports = new Controller();