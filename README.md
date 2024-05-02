## Jobs API

This Node.js project implements CRUD operations for managing jobs. It includes user authentication for accessing individual job listings. MongoDB is used as the database, and Postman was utilized for API testing. The project incorporates robust error handling and follows a well-organized file structure.

### Features:
- **CRUD Operations:** Perform Create, Read, Update, and Delete operations on job listings.
- **User Authentication:** Users can log in to access their specific job listings.
- **MongoDB Integration:** Data is stored and managed using MongoDB.
- **Postman Testing:** API endpoints can be tested using Postman.
- **Error Handling:** Comprehensive error handling ensures smooth operation.
- **File Structure:** Codebase is structured for clarity and maintainability.

### API Endpoints:
- `POST /api/v1/auth/register`: Create a new user account.
- `POST /api/v1/auth/login`: User login.
- `GET /api/v1/jobs`: Retrieve all jobs.
- `GET /api/v1/jobs/:id`: Retrieve a specific job by ID.
- `POST /api/v1/jobs`: Create a new job.
- `PUT /api/v1/jobs/:id`: Update a job by ID.
- `DELETE /api/v1/jobs/:id`: Delete a job by ID.

### Usage:
1. Register/login to access your job listings.
2. Use the provided API endpoints to manage jobs.
3. Test API endpoints using Postman.
4. Ensure proper error handling for smooth operation.
