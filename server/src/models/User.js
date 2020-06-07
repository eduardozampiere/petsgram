const database = require('../database');
const UserSchema = new database.Schema({
    
    name: String,
    userName: {
        type: String,
        unique: true
    },
    
    email: {
        type: String,
        unique: true
    },

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