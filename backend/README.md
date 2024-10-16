# Cake API Backend

This is a simple RESTful API backend built with Node.js and Express, providing CRUD operations for managing cakes. It includes validation, unique constraints for cake names, and comprehensive test coverage.

## Table of Contents

- [Cake API Backend](#cake-api-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application Locally](#running-the-application-locally)
  - [API Endpoints](#api-endpoints)
  - [Validation](#validation)
  - [Running Tests](#running-tests)
  - [Project Structure](#project-structure)

## Features

- CRUD operations for cakes:
  - `GET /cakes`
  - `GET /cakes/:id`
  - `POST /cakes`
  - `PUT /cakes/:id`
  - `DELETE /cakes/:id`
- Validation of input data (name, comment, imageUrl, yumFactor).
- Ensures unique cake names.
- Comprehensive test coverage using Jest and Supertest.

## Prerequisites

Before running the backend locally, make sure to install the following software:

1. **Node.js** (v20.x or higher) - [Download and install Node.js](https://nodejs.org/en/download/)
2. **MongoDB** - You need a running MongoDB instance. You can either install MongoDB locally or use a MongoDB Atlas cloud instance.
   - [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/)
3. **npm** - Comes bundled with Node.js (version 10.x or higher).

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
    git clone https://github.com/zernabhussain/cake-lover-app-suite
   cd cake-lover-app-suite/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of your project with the following contents:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/cakes
   PORT=3000
   ```

   - Replace the `MONGODB_URI` with your local MongoDB instance or MongoDB Atlas connection string.

## Running the Application Locally

Once you have installed the prerequisites and cloned the repository, follow these steps to run the backend:

1. **Start MongoDB:**

   If you have MongoDB installed locally, make sure the MongoDB service is running:

   ```bash
   mongod
   ```

2. **Start the backend server:**

   Run the following command to start the server:

   ```bash
   npm start
   ```

   The server should be running on `http://localhost:3000`.

## API Endpoints

Below are the available API endpoints for managing cakes:

1. **Get all cakes**
   - **Endpoint:** `GET /api/cakes`
   - **Description:** Returns a list of all cakes in the database.
   - **Response:**
     ```json
     [
       {
         "id": "string",
         "name": "string",
         "comment": "string",
         "imageUrl": "string",
         "yumFactor": 1-5
       }
     ]
     ```

2. **Get cake by ID**
   - **Endpoint:** `GET /api/cakes/:id`
   - **Description:** Returns a single cake by its ID.
   - **Response:**
     ```json
     {
       "id": "string",
       "name": "string",
       "comment": "string",
       "imageUrl": "string",
       "yumFactor": 1-5
     }
     ```

3. **Create a new cake**
   - **Endpoint:** `POST /api/cakes`
   - **Description:** Creates a new cake.
   - **Request Body:**
     ```json
     {
       "name": "string",
       "comment": "string",
       "imageUrl": "string",
       "yumFactor": 1-5
     }
     ```

4. **Update a cake**
   - **Endpoint:** `PUT /api/cakes/:id`
   - **Description:** Updates an existing cake.
   - **Request Body:** (Same as POST)

5. **Delete a cake**
   - **Endpoint:** `DELETE /api/cakes/:id`
   - **Description:** Deletes an existing cake.

## Validation

- **Name**: Required, must be unique.
- **Comment**: Required, minimum length 5, maximum length 200.
- **ImageUrl**: Required, must be a valid URL.
- **YumFactor**: Required, integer between 1 and 5.

## Running Tests

This project uses Jest and Supertest for unit and integration testing. To run the tests, execute the following command:

```bash
npm test
```

Test cases include:
- Verifying CRUD operations on the `/cakes` endpoints.
- Handling of validation errors.
- Ensuring unique cake names.
- Proper handling of non-existent resources.

## Project Structure

```
backend/
├── controllers/        # API controller logic
├── models/             # Mongoose schemas/models
├── routes/             # API route definitions
├── tests/              # Jest test cases for the API
├── .env                # Environment variables
├── app.js              # Express app entry point
└── server.js           # Server startup script
```

This structure follows the industry best practice of separating concerns by placing API routes, controllers, models, and tests in their respective directories.

---

### Feel free to contribute to this project or report any issues.
```

This `README.md` file includes detailed information on setting up the project, running it locally, API details, and running tests. It follows common conventions for open-source projects and ensures clarity for anyone wanting to understand or contribute to the project.