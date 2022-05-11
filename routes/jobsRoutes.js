const express = require('express');
const router = express.Router({ mergeParams: true });
const jobs = require('../controllers/jobs');
const { isLoggedIn } = require('../middleware');

// Get Jobs route
router.get('/', jobs.getAllJobs);

// CRUD for Job
router.post('/newjob', isLoggedIn, jobs.createJob);
router.route('/:jobId')
    .get(jobs.getJob)
    .delete(isLoggedIn, jobs.deleteJob)
    .put(isLoggedIn, jobs.editJob);

module.exports = router;