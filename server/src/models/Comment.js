const database = require('../database');
const paginate = require('mongoose-paginate-v2');

const CommentSchema = new database.Schema({
    user: {
        type: database.Types.ObjectId,
        ref: 'User'
    },
    
    post: {
        type: database.Types.ObjectId,
        ref: 'User'
    },

    comment: String,

    likes: [{
		type: database.Schema.Types.ObjectId,
		ref: 'User',
	}]
    
}, {
    timestamps: true,
});
CommentSchema.plugin(paginate);
module.exports = database.model('Comment', CommentSchema);