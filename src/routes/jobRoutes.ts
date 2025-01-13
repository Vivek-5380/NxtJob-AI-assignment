import { Router } from 'express';
import {
    createJobPosting,
    getJobs,
    getJob,
    updateJobPosting,
    deleteJobPosting
} from '../controllers/jobController';

const router = Router();

// Create a new job posting
router.post('/', createJobPosting);

// Retrieve all job postings
router.get('/', getJobs);

// Retrieve a single job by ID
router.get('/:id', getJob);

// Update a job posting
router.put('/:id', updateJobPosting);

// Delete a job posting
router.delete('/:id', deleteJobPosting);

export default router;
