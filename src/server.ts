import express, { Application } from 'express';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { initializeDatabase } from './config/db';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());


// Root Endpoint
app.get('/', (req, res) => {
    res.send('Job Board API is running');
});

// Routes
app.use('/jobs', jobRoutes);

// Error-handling middleware
app.use(errorHandler);

app.listen(port, () => {
    initializeDatabase().catch((error) => {
        console.error('Database initialization failed:', error);
        process.exit(1);
    });

    console.log(`Server is running on port ${port}`);
});
