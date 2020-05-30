const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/', require('./routes'));

app.listen(3001, () => {
    console.log('server running');
});