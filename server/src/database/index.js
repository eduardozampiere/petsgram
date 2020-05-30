const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/petsgram', {useNewUrlParser: true, useUnifiedTopology: true}).then( () => {
    console.log('Database connected');
}).catch(err => {
    console.log('Error in database connection\nPlese check the error');
});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose;