# Todo App

A backend Todo application built using **Node.js, Express.js, and MongoDB**. The application provides user authentication and allows authenticated users to create and manage their own todo tasks.

## Features

- User registration
- User login
- Authentication using JWT
- Protected Todo routes
- Create todos
- View todos
- Update todos
- Delete todos
- MongoDB database integration
- Authentication middleware
- Password handling using the User model
- Environment variables for sensitive configuration

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- JavaScript
- dotenv

## Project Structure

```text
todo-app/
│
├── config/
│   └── db.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── Todo.js
│   └── User.js
│
├── routes/
│   ├── auth.js
│   └── todos.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## Folder Description

### `config/`

Contains the database configuration.

- `db.js` — establishes the connection between the application and MongoDB.

### `middleware/`

Contains middleware used to protect routes.

- `auth.js` — verifies the user's authentication token before allowing access to protected Todo routes.

### `models/`

Contains the Mongoose database models.

- `User.js` — defines the structure of user data.
- `Todo.js` — defines the structure of Todo data.

### `routes/`

Contains the API routes.

- `auth.js` — handles user registration and login.
- `todos.js` — handles Todo operations for authenticated users.

### `server.js`

The main entry point of the application. It initializes Express, connects the database, loads middleware, and registers the application routes.

## Authentication Flow

The authentication process works as follows:

```text
User
  |
  v
Register / Login
  |
  v
Authentication Route
  |
  v
User Verification
  |
  v
JWT Token
  |
  v
Authenticated Requests
  |
  v
Auth Middleware
  |
  v
Todo Routes
```

After logging in, the user receives a JWT token. The token is sent with requests to protected Todo routes. The authentication middleware verifies the token before allowing the request to continue.

## Todo Operations

Authenticated users can perform CRUD operations on their Todo tasks.

```text
Create  → Add a new Todo
Read    → View existing Todos
Update  → Modify a Todo
Delete  → Remove a Todo
```

Each Todo is associated with the authenticated user.

## Database

The application uses **MongoDB** as its database and **Mongoose** for interacting with MongoDB from Node.js.

The database connection is handled in:

```text
config/db.js
```

The application uses separate models for users and todos:

```text
models/
├── User.js
└── Todo.js
```

## Environment Variables

Sensitive configuration is stored in the `.env` file instead of being written directly in the source code.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

The actual `.env` file should not be uploaded to GitHub.

## Installation

Clone the repository and move into the Todo App directory:

```bash
cd todo-app
```

Install the required dependencies:

```bash
npm install
```

Create a `.env` file and add the required environment variables.

Start the server:

```bash
node server.js
```

If the project contains a development script, the application can also be started using:

```bash
npm run dev
```

## API Structure

The application is divided into two main groups of routes:

```text
Authentication Routes
        |
        └── /auth

Todo Routes
        |
        └── /todos
```

Authentication routes handle registration and login, while Todo routes handle CRUD operations for authenticated users.

## Security

The application uses:

- JWT authentication for protected routes
- Authentication middleware for verifying users
- Environment variables for sensitive configuration
- `.gitignore` to prevent sensitive files such as `.env` from being committed

## How the Application Works

```text
Client
  |
  v
Express Server
  |
  +------------------+
  |                  |
  v                  v
Auth Routes       Todo Routes
  |                  |
  v                  v
User Model       Auth Middleware
                     |
                     v
                 Todo Model
                     |
                     v
                  MongoDB
```

## Learning Outcomes

This project demonstrates practical backend development concepts including:

- Express.js server setup
- REST API development
- MongoDB and Mongoose
- Database models
- Routing
- Middleware
- JWT authentication
- Protected API routes
- CRUD operations
- Environment variable management

## Conclusion

The Todo App is a backend application that combines Express.js, MongoDB, Mongoose, and JWT authentication to provide a secure environment for users to manage their Todo tasks.
