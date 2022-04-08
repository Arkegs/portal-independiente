// Server Init
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const port = process.env.PORT || 5000;

// Routes setting
const loginRoutes = require('./routes/loginRoutes');
const jobsRoutes = require('./routes/jobsRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

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

// Server Setup
app.use(methodOverride('_method'));
app.use('/api/jobs/:jobId/reviews', reviewRoutes);
app.use('/api/user', userRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api', loginRoutes);


// GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'Connection was successful!' });
});

app.listen(port, () => console.log(`Oh yeah! Listening on port ${port}!`)); 

