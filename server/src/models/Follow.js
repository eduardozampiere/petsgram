const database = require('../database');
const paginate = require('mongoose-paginate-v2');

const FollowSchema = new database.Schema({
    user: {
        type: database.Types.ObjectId,
        ref: 'User'
    },
    
    follow: {
        type: database.Types.ObjectId,
        ref: 'User'
    },

    approved: Boolean
    
}, {
    timestamps: true,
});
FollowSchema.plugin(paginate);
module.exports = database.model('Follow', FollowSchema);