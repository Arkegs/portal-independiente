const mongoose = require('mongoose');
const Job = require('../models/job');

// Function for retrieving all jobs
module.exports.getAllJobs = async (req, res) =>{
    const jobs = {sortType: undefined, results: {}};
    const sortType = {sort: {}};
    const searchTerm = {title:{'$regex': ''}};
    try{
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
        if(req.query.wordFilter){
            searchTerm.title = {'$regex': req.query.wordFilter};
        }
        if(req.query.pageNum){
            // Paginate results if pageNum parameter is given
            jobs.results = await Job.paginate(searchTerm,{page: req.query.pageNum, limit:8, populate: 'author', ...sortType});
            return res.send({status:"success", payload: jobs});
        }
        jobs.results = await Job.paginate(searchTerm,{page: 0, limit:8, populate: 'author', ...sortType});
        return res.send({status:"success", payload: jobs});
    } catch(err){
        return res.send({status:"failure", payload: err})
    }
}

// Function for retrieving a single job
module.exports.getJob = async (req, res) => {
    try{
        const jobId = mongoose.Types.ObjectId(req.params.jobId);
        const job = await Job.findById(jobId).populate('author').populate('reviews').exec();
        return res.send(job);
    } catch(err){
        return res.send({status:"failure", payload: err});
    }
}

// Function for creating a new job
module.exports.createJob = async (req, res) => {
    try{
        const newJob = new Job(req.body);
        newJob.author = mongoose.Types.ObjectId('6254a747be3e49bd093f8c62'); //req.user._id
        await newJob.save();
        return res.send({status: "success", payload: newJob});
    } catch(err){
        return res.send({status:"failure", payload: err});
    }
}

// Function for editing a single job
module.exports.editJob = async (req, res) =>{
    try{
        const jobId = mongoose.Types.ObjectId(req.params.jobId);
        const editedJob = await Job.findByIdAndUpdate(jobId, {...req.body}, {new:true});
        await editedJob.save();
        res.send({status:"success", payload: editedJob});
    } catch(err){
        return res.send({status:"failure", payload: err});
    }
};

// Function for deleting one job
module.exports.deleteJob = async (req, res) =>{
    try{
        const jobId = mongoose.Types.ObjectId(req.params.jobId);
        const deletedJob = await Job.findByIdAndDelete(jobId);
        return res.send({status:"success", payload: deletedJob});
    } catch(err){
        return res.send({status:"failure", payload: err});
    }
};
