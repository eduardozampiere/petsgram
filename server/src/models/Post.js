const database = require('../database');
const paginate = require('mongoose-paginate-v2');

const PostSchema = new database.Schema({
	images: [{
		type: String
	}],

	user: {
		type: database.Schema.Types.ObjectId,
		ref: 'User',
	},

	likes: [{
		type: database.Schema.Types.ObjectId,
		ref: 'User',
	}],

	description: String,
}, {
	timestamps: true
});
PostSchema.plugin(paginate);

module.exports = database.model('Post', PostSchema);