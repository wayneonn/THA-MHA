# Backend API

This is a backend API built using Node.js and Express. The API provides functionality for creating, reading, and deleting objects from an in-memory data store, with data persistence handled via a local JSON file.

## Features
- Create an object with a name and email.
- Retrieve an object by ID.
- Delete an object by ID.
- Log all incoming requests for debugging purposes.

## Endpoints
- `GET /object/:id` - Retrieve an object by its ID.
- `POST /object` - Create a new object (requires `name` and `email` in the request body).
- `DELETE /object/:id` - Delete an object by its ID.

## Running the Project Locally

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/wayneonn/THA-MHA.git
   ```
2. Navigate to the project directory:
   ```bash
   cd THA-MHA
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server
To start the server locally, run:
```bash
node backend.js
```
The server will start on `http://localhost:3000`.

## Testing the API
Unit tests are included using Jest and Supertest. To run the tests, use the following command:
1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```
2. Run the tests:
   ```bash
   npm test
   ```

# Using cURL to Test Endpoints

### POST a New Object
To create a new object, use the following command:
```bash
curl -X POST http://localhost:3000/object -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john.doe@example.com"}'
```

### GET an Object by ID
To retrieve an object by its ID (replace `1` with the actual ID):
```bash
curl -X GET http://localhost:3000/object/1
```

### DELETE an Object by ID
To delete an object by its ID (replace `1` with the actual ID):
```bash
curl -X DELETE http://localhost:3000/object/1
```

## Deployment
The backend API is deployed on **Vercel**. You can access the deployed API here:
[https://tha-mha-wayne-yows-projects.vercel.app/](https://tha-mha-wayne-yows-projects.vercel.app/)

## Notes
- This project is deployed on Vercel using serverless functions.
- Persistence is managed through a local JSON file (`data.json`).
