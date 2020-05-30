const database = require('../database');
const UserSchema = new database.Schema({
    
    name: String,
    userName: String,
    email: String,
    password: {
        type: String,
        select: false
    },
    bio: {
        type: String,
        default: ""
    },
    profilePhoto: String,
    closeProfile:{
        type: Boolean,
        default: false
    },
    lastPost: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
    
}, {
    timestamps: true
});

module.exports = database.model('User', UserSchema);