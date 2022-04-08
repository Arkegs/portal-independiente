const express = require('express');
const router = express.Router();
const jobs = require('../controllers/jobs');

// Get Jobs route
router.get('/', jobs.jobAction);

// CRUD for Job
router.post('/newjob', jobs.jobAction);
router.route('/:jobId')
    .get(jobs.jobAction)
    .delete(jobs.jobAction)
    .put(jobs.jobAction);

module.exports = router;