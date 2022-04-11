const express = require('express');
const router = express.Router();
const jobs = require('../controllers/jobs');

// Get Jobs route
router.get('/', jobs.getAllJobs);

// CRUD for Job
router.post('/newjob', jobs.createJob);
router.route('/:jobId')
    .get(jobs.getJob)
    .delete(jobs.deleteJob)
    .put(jobs.editJob);

module.exports = router;