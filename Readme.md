# Job Board API

A RESTful API built with Node.js, Express, TypeScript, and MySQL for managing job postings.

## Features

- CRUD operations for job postings
- MySQL database integration
- Docker support
- TypeScript for type safety
- Error handling middleware

## API Routes

### POST `/jobs`
Create a new job posting
```json
Request body:
{
    "title": "Software Engineer",
    "company": "Tech Corp",
    "location": "Remote",
    "salary": 100000,
    "description": "Full-stack developer position"
}

Response (201):
{
    "message": "Job created successfully",
    "jobId": 1
}
```

### GET `/jobs`
Retrieve all job postings
```json
Response (200):
[
    {
        "id": 1,
        "title": "Software Engineer",
        "company": "Tech Corp",
        "location": "Remote",
        "salary": 100000,
        "description": "Full-stack developer position"
    }
]
```

### GET `/jobs/:id`
Retrieve a specific job posting
```json
Response (200):
{
    "id": 1,
    "title": "Software Engineer",
    "company": "Tech Corp",
    "location": "Remote",
    "salary": 100000,
    "description": "Full-stack developer position"
}
```

### PUT `/jobs/:id`
Update a job posting
```json
Request body:
{
    "title": "Senior Software Engineer",
    "company": "Tech Corp",
    "location": "Remote",
    "salary": 120000,
    "description": "Updated position"
}

Response (200):
{
    "message": "Job updated successfully"
}
```

### DELETE `/jobs/:id`
Delete a job posting
```json
Response (200):
{
    "message": "Job deleted successfully"
}
```

## Docker Setup

1. Build the images:
```bash
docker-compose build
```

2. Start the services:
```bash
docker-compose up -d
```

3. Stop the services:
```bash
docker-compose down
```

## Environment Variables

Create a `.env` file with:
```
DB_HOST=job-database
DB_USER=root
DB_PASSWORD=password
DB_NAME=jobDb
DB_PORT=3306
PORT=3000
```