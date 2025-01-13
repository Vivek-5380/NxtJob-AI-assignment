import { createPool, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Ensure required environment variables are set
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    throw new Error('Missing required database environment variables (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)');
}

console.log('Connecting to database with the following configuration:');
console.log(`DB_HOST: ${process.env.DB_HOST}`);
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_NAME: ${process.env.DB_NAME}`);
console.log(`DB_PORT: ${process.env.DB_PORT}`);

// Create a MySQL connection pool
const pool: Pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Function to initialize the database schema
async function initializeDatabase(): Promise<void> {
    const createJobsTableQuery = `
    CREATE TABLE IF NOT EXISTS jobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      salary INT,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

    try {
        console.log('Attempting to connect to the database...');
        const connection = await pool.getConnection();
        console.log('Connected to the database. Initializing schema...');
        await connection.query(createJobsTableQuery);
        console.log('Database initialized: "jobs" table is ready.');
        connection.release();
    } catch (error) {
        console.error('Error initializing database:', error);
        throw new Error('Failed to initialize the database');
    }
}

// Call the initializeDatabase function
initializeDatabase()
    .then(() => {
        console.log('Database initialization complete.');
    })
    .catch((error) => {
        console.error('Database initialization failed:', error);
        process.exit(1); // Exit the process if the database initialization fails
    });

export default pool;
