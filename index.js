if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

// Server initial packages
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// Passport and session related variables
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const MongoDBStore = require('connect-mongo');

// Routes setting
const loginRoutes = require('./routes/loginRoutes');
const jobsRoutes = require('./routes/jobsRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

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
app.use('/api/jobs/:jobId/reviews', reviewRoutes);
app.use('/api/user', userRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api', loginRoutes);

// Passport and session settings
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const store = MongoDBStore.create({
    mongoUrl: 'mongodb://localhost:27017/portalindependiente',
    secret: process.env.SESSION_SECRET,
    touchAfter: 7*24*60*60
});

store.on("error", function(e){
    console.log("SESSION STORE ERROR");
})

app.use(session({
    store: store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'Connection was successful!' });
});

app.listen(port, () => console.log(`Oh yeah! Listening on port ${port}!`)); 

