# Hellicore Task Management API

Backend API for a task and workflow management system built using Node.js, Express, and MongoDB.

The project demonstrates authentication, role-based authorization, task lifecycle management, commenting, and activity tracking.

---

## Tech Stack

Node.js  
Express.js  
MongoDB (Mongoose)  
JWT Authentication  
bcrypt password hashing  
Zod / Joi validation  

---

## Project Setup

Clone the repository and install dependencies.

git clone https://github.com/saurabh251996/Helicore_Task/tree/main

cd helicore_task

npm install

---

## Environment Variables

Create a `.env` file in the root folder.

Example:

PORT=5000  
MONGO_URI=mongodb://localhost:27017/task_management  
JWT_SECRET=your_jwt_secret  

---

## Run the Server

Start the project:

npm run dev

Server runs on:

http://localhost:5000

---

## Seed Initial Users

Run the seeder script to create test users.

npm run seed

Users created:

ADMIN  
email: admin@helicore.com  
password: 123456  

USER  
email: user@helicore.com  
password: 123456  

---

## Authentication

Login endpoint:

POST /auth/login

Example request:

{
 "email": "admin@helicore.com",
 "password": "123456"
}

Response returns a JWT token.

Use the token in request headers:

Authorization: Bearer <token>

---

## Task APIs

Create Task (ADMIN only)

POST /tasks

Example body:

{
 "title": "Fix API bug",
 "description": "Fix authentication bug",
 "priority": "HIGH",
 "assignedTo": "USER_ID",
 "dueDate": "2026-04-01"
}

---

Get Tasks (pagination supported)

GET /tasks?page=1&limit=10

Optional filters:

GET /tasks?status=PENDING  
GET /tasks?priority=HIGH  

---

Get Task Details

GET /tasks/:id

Returns task details with comments and activity logs.

---

Update Task

PUT /tasks/:id

Example:

{
 "status": "IN_PROGRESS",
 "comment": "Started working on this task"
}

Rules:

ADMIN can update any field.  
USER can only update task status and add comments.

---

Delete Task (ADMIN only)

DELETE /tasks/:id

---

## Authorization Rules

JWT is required for all APIs except /auth/login.

ADMIN permissions:
- Create tasks
- Delete tasks
- View all tasks

USER permissions:
- View tasks assigned to them
- Update task status
- Add comments

Unauthorized responses:

401 Unauthorized  
403 Forbidden  

---

## Postman Testing

Import below files and import into Postman:

Task Management API.postman_collection



Use them to test all APIs.

---

## Folder Structure

config  
controllers  
middleware  
models  
routes  
services  
utils  
validations  
constants  
seeders  

The project follows a modular structure separating routes, controllers, and services.

---

## Notes

Passwords are stored using bcrypt hashing.

JWT secret is stored in environment variables.

Input validation is implemented using Zod.

Pagination and filtering are supported in task listing APIs.


## Project Structure

Root files:

server.js → Entry point of the application.  
Responsible for starting the server and connecting to the database.

app.js → Express application configuration.  
Handles middleware, routes, and API setup.

Main folders:

config => Database configuration  
controllers => API controllers  
middleware => Authentication and authorization middleware  
models => MongoDB schemas  
routes => API route definitions  
services => Business logic  
utils => Helper functions  
validations => Request validation  
constants => Enums and constant values  
seeders => Database seed scripts