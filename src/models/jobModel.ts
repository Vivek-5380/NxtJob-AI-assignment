import { RowDataPacket, OkPacket } from 'mysql2/promise';
import pool from '../config/db';

// Job interface to represent the structure of the Job object
export interface Job {
    id?: number;
    title: string;
    company: string;
    location?: string;
    salary?: number;
    description?: string;
}

/**
 * Create a new job.
 * Returns the auto-incremented ID.
 */
export async function createJob(job: Job): Promise<number> {
    try {
        const [result] = await pool.query<OkPacket>(
            `INSERT INTO jobs (title, company, location, salary, description)
       VALUES (?, ?, ?, ?, ?)`,
            [job.title, job.company, job.location, job.salary, job.description]
        );

        return result.insertId;
    } catch (error) {
        console.error('Error creating job:', error);
        throw new Error('Failed to create job');
    }
}

/**
 * Get all jobs.
 * Returns an array of Job objects.
 */
export async function getAllJobs(): Promise<Job[]> {
    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM jobs`
        );

        return rows.map((row) => row as Job); // Map each row to the Job interface
    } catch (error) {
        console.error('Error retrieving jobs:', error);
        throw new Error('Failed to retrieve jobs');
    }
}

/**
 * Get a job by ID.
 * Returns a single Job or null if not found.
 */
export async function getJobById(id: number): Promise<Job | null> {
    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM jobs WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0] as Job; // Safely cast to Job
    } catch (error) {
        console.error('Error retrieving job by ID:', error);
        throw new Error('Failed to retrieve job by ID');
    }
}

/**
 * Update a job by ID.
 * Returns true if at least one row was updated, false otherwise.
 */
export async function updateJob(id: number, job: Job): Promise<boolean> {
    try {
        const [result] = await pool.query<OkPacket>(
            `UPDATE jobs
       SET title = ?, company = ?, location = ?, salary = ?, description = ?
       WHERE id = ?`,
            [job.title, job.company, job.location, job.salary, job.description, id]
        );

        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating job:', error);
        throw new Error('Failed to update job');
    }
}

/**
 * Delete a job by ID.
 * Returns true if at least one row was deleted, false otherwise.
 */
export async function deleteJob(id: number): Promise<boolean> {
    try {
        const [result] = await pool.query<OkPacket>(
            `DELETE FROM jobs WHERE id = ?`,
            [id]
        );

        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting job:', error);
        throw new Error('Failed to delete job');
    }
}
