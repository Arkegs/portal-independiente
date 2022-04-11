const mongoose = require('mongoose');
const Job = require('../models/job');

// Function for retrieving all jobs
module.exports.getAllJobs = async (req, res) =>{
    if(req.query.lastId){
        // Instead of pagination, it uses mongoose _id to retrieve data to make it scalable
        const lastId =  mongoose.Types.ObjectId(req.query.lastId);
        const jobs = await Job.find({'_id' : { $gte : lastId }}).limit(8).exec()
        return res.send(jobs);
    }
    const jobs = await Job.find({'_id' : { $gte : lastId }}).limit(8).exec()
    return res.send(jobs);
}

// Function for retrieving a single job
module.exports.getJob = async (req, res) => {
    try{
        const jobId = mongoose.Types.ObjectId(req.params.jobId);
        const job = await Job.findById(jobId);
        return res.send(job);
    } catch(err){
        return res.send({error: "There was an error"});
    }
}

// Function for creating a new job
module.exports.createJob = async (req, res) => {
    const newJob = new Job(req.body);
    newJob.author = mongoose.Types.ObjectId('6254a747be3e49bd093f8c62'); //req.user._id
    await newJob.save();
    return res.send(newJob);
}

// Function for editing a single job
module.exports.editJob = async (req, res) =>{
    try{
        const jobId = mongoose.Types.ObjectId(req.params.jobId);
        const editedJob = await Job.findByIdAndUpdate(jobId, {...req.body}, {new:true});
        await editedJob.save();
        res.send(editedJob);
    } catch(err){
        return res.send({error: err});
    }
};

// Function for deleting one job
module.exports.deleteJob = async (req, res) =>{
    try{
        const jobId = mongoose.Types.ObjectId(req.params.jobId);
        const deletedJob = await Job.findByIdAndDelete(jobId);
        return res.send(deletedJob);
    } catch(err){
        return res.send({error: err});
    }
};
