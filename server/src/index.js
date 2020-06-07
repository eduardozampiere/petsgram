const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use('/static', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
app.use('/', require('./routes'));

app.listen(3001, () => {
    console.log('server running');
});