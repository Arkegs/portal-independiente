if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

// Server initial packages
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// Passport and session related variables
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const MongoDBStore = require('connect-mongo');

// DB connection
// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@cluster0.i4xd8.mongodb.net/hauntrip?retryWrites=true&w=majority`, { useUnifiedTopology: true })
mongoose.connect('mongodb://localhost:27017/portalindependiente', { useUnifiedTopology: true })
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("Error, Mongo connection not open")
    console.log(err)
})

const app = express();

// App setup
app.use(methodOverride('_method'));
app.use(bodyParser.json());

// Passport and session settings
const store = MongoDBStore.create({
    mongoUrl: 'mongodb://localhost:27017/portalindependiente',
    secret: process.env.SESSION_SECRET,
    touchAfter: 7*24*60*60
});

store.on("error", function(e){
    console.log("SESSION STORE ERROR");
})

app.use(session({
    name: process.env.SESSION_NAME,
    store: store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(
    cors({
      origin: true,
      credentials: true,
      optionsSuccessStatus: 200,
      origin: 'http://localhost:3000'
}));

// Passport initialize
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, User.authenticate()));

// Routes setting
const loginRoutes = require('./routes/loginRoutes');
const jobsRoutes = require('./routes/jobsRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/jobs/:jobId/reviews', reviewRoutes);
app.use('/api/user', userRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api', loginRoutes);

// GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'Connection was successful!' });
});

app.listen(port, () => console.log(`Oh yeah! Listening on port ${port}!`)); 

