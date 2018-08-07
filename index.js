const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const key = require('./keys');

require('./models/User');
require('./models/Recipe');
require('./models/Item');
require('./services/facebookLogin');

mongoose.connect(key.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [key.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute')(app);
require('./routes/recipesRoute')(app);

app.get('/', (req, res) => {
    res.send('Hello, Polina and  World!');
});
app.listen(3333, () => {
    console.log(' app listening on port 3333!:*');
});
