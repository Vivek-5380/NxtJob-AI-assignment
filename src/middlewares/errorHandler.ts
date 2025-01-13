import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    console.error(err); // Log the error internally

    res.status(500).json({
        message: 'An internal server error occurred',
        error: err.message || 'Unknown error',
    });
};
