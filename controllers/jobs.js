const mongoose = require('mongoose');
const Job = require('../models/job');

// Function for retrieving all jobs
module.exports.getAllJobs = async (req, res) =>{
    const jobs = {sortType: undefined, results: {}};
    const sortType = {sort: {}};
    //If a sort query parameter is given, the search will be sorted
    if(req.query.sortingType){
        const sortQuery = req.query.sortingType;
        if(sortQuery === "createdAt" || sortQuery === "review" || sortQuery === "price"){
            (sortQuery === "price") 
            ? sortType.sort = {[sortQuery] : 'asc', '_id': 'asc'}
            : sortType.sort = {[sortQuery] : 'desc', '_id': 'asc'}
            jobs.sortType = sortQuery;
        }
    }
    if(req.query.pageNum){
        // Paginate results
        jobs.results = await Job.paginate({},{page: req.query.pageNum, limit:8, ...sortType});
        return res.send(jobs);
    }
    jobs.results = await Job.paginate({},{page: 0, limit:8, ...sortType});
    return res.send(jobs);
}

// Function for retrieving a single job
module.exports.getJob = async (req, res) => {
    try{
        const jobId = mongoose.Types.ObjectId(req.params.jobId);
        const job = await Job.findById(jobId).populate('author').populate('reviews').exec();
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
