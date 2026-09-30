# CMS - Content Management System

A simple Content Management System developed as part of the Backend Development laboratory.

## Technologies Used

- Node.js
- Express.js
- EJS
- MongoDB
- Mongoose

## Features

- Create new posts
- View posts
- Edit posts
- Delete posts
- Server-side rendering using EJS
- Express routing
- Middleware
- MongoDB database connectivity

## Project Structure

```text
cms-lab/
├── public/
│   └── style.css
├── views/
│   ├── edit-post.ejs
│   ├── new-post.ejs
│   ├── post.ejs
│   └── posts.ejs
├── app.js
├── package.json
└── package-lock.json
```

## How to Run

Install the required dependencies:

```bash
npm install
```

Start the application:

```bash
node app.js
```

Then open the application in your browser at:

```text
http://localhost:3000
```

## Backend Concepts Demonstrated

- Express.js server setup
- HTTP routes
- Middleware
- Request and response handling
- Server-side rendering
- EJS templates
- MongoDB
- Mongoose
- CRUD operations
