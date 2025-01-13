import { Request, Response, NextFunction } from 'express';
import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    Job
} from '../models/jobModel';

/**
 * Create a new job posting
 */
export const createJobPosting = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { title, company, location, salary, description } = req.body;

        if (!title || !company) {
            res.status(400).json({ message: 'Title and company are required' });
            return; // Explicit `return` to avoid falling through
        }

        const job: Job = { title, company, location, salary, description };
        const newJobId = await createJob(job);

        res.status(201).json({ message: 'Job created successfully', jobId: newJobId });
    } catch (error) {
        next(error);
    }
};

/**
 * Get all job postings
 */
export const getJobs = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const jobs = await getAllJobs();
        res.status(200).json(jobs);
    } catch (error) {
        next(error);
    }
};

/**
 * Get a job posting by ID
 */
export const getJob = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const jobId = Number(req.params.id);
        if (isNaN(jobId)) {
            res.status(400).json({ message: 'Invalid job ID' });
            return;
        }

        const job = await getJobById(jobId);
        if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }

        res.status(200).json(job);
    } catch (error) {
        next(error);
    }
};

/**
 * Update a job posting by ID
 */
export const updateJobPosting = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const jobId = Number(req.params.id);
        if (isNaN(jobId)) {
            res.status(400).json({ message: 'Invalid job ID' });
            return;
        }

        const { title, company, location, salary, description } = req.body;
        const job: Job = { title, company, location, salary, description };

        const success = await updateJob(jobId, job);
        if (!success) {
            res.status(404).json({ message: 'Job not found or not updated' });
            return;
        }

        res.status(200).json({ message: 'Job updated successfully' });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a job posting by ID
 */
export const deleteJobPosting = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const jobId = Number(req.params.id);
        if (isNaN(jobId)) {
            res.status(400).json({ message: 'Invalid job ID' });
            return;
        }

        const success = await deleteJob(jobId);
        if (!success) {
            res.status(404).json({ message: 'Job not found or could not be deleted' });
            return;
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        next(error);
    }
};
