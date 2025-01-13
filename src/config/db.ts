import { createPool, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create MySQL connection pool
const pool: Pool = createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test',
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
        const connection = await pool.getConnection();
        await connection.query(createJobsTableQuery);
        connection.release();
        console.log('Database initialized: "jobs" table is ready.');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw new Error('Failed to initialize the database');
    }
}

initializeDatabase().catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
});

export default pool;
