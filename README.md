Backend Development
This repository contains my coursework, laboratory projects, assignments, and practical implementations for the Backend Development course.
The repository covers backend programming, REST APIs, authentication, databases, server-side development, JSON, PostgreSQL, MongoDB, and related backend development concepts.
Repository Structure
backend-dev/
│
├── backend-lab/
│ ├── cms-lab/
│ ├── todo-app/
│ ├── exp-03-responsive-page/
│ ├── exp-05-javascript-basics/
│ ├── exp-12a-express-ejs/
│ ├── exp-13-mongodb-auth/
│ └── exp-14-postgresql/
│
├── backend-theory/
│ ├── Assignment 01 - Notes App/
│ └── Assignment 02 - PostgreSQL JSONB/
│
└── README.md
Backend Lab
The backend-lab folder contains practical backend development projects and laboratory work.

1. CMS Lab
   Location: backend-lab/cms-lab/
   A Content Management System backend project developed using Node.js and Express.js.
   The project demonstrates:

- Express.js server setup
- Routing and middleware
- Server-side rendering with EJS
- MongoDB and Mongoose
- CRUD operations
- Dynamic routes
- Backend application structure

2. Todo App
   Location: backend-lab/todo-app/
   A backend Todo application built using Node.js, Express.js, MongoDB, and Mongoose.
   The application demonstrates:

- User registration and login
- JWT authentication
- Authentication middleware
- Protected routes
- Todo CRUD operations
- MongoDB database integration
- Mongoose models
- Environment variables

3. Experiment 03 — Responsive Web Page
   Location: backend-lab/exp-03-responsive-page/
   A responsive web page created using HTML5 and CSS3 without a framework.
   The experiment demonstrates:

- HTML5 page structure
- Viewport meta tag
- CSS Flexbox
- CSS Grid
- Media queries
- Responsive navigation bar
- Mobile-friendly card layout
- Responsive footer
  Run: Open index.html in a browser or use VS Code Live Server.

4. Experiment 05 — JavaScript Arrays, Objects and Functions
   Location: backend-lab/exp-05-javascript-basics/
   A JavaScript practical demonstrating arrays, objects, functions and array methods.
   The experiment demonstrates:

- Arrays of objects
- Arrow functions
- map() and reduce()
- Spread syntax
- Calculating student averages
- Finding the topper
- Displaying JSON output in the browser
  Run: Open index.html and click Run experiment.

5. Experiment 12A — Node.js, NPM, Express, Nodemon and EJS
   Location: backend-lab/exp-12a-express-ejs/
   A server-side rendered web application using Node.js, Express.js, Nodemon and EJS.
   The experiment demonstrates:

- Node.js server setup
- NPM package management
- Express routes
- POST form handling
- EJS templates
- Static files
- Nodemon development workflow
  Run:
  cd backend-lab/exp-12a-express-ejs
  npm install
  npm run dev
  Open http://localhost:3000.

6. Experiment 13 — MongoDB, Mongoose and Authentication
   Location: backend-lab/exp-13-mongodb-auth/
   A user registration and login system using Express.js, MongoDB, Mongoose, sessions and bcrypt.
   The experiment demonstrates:

- User registration
- User login and logout
- MongoDB connection
- Mongoose schema and model
- Password hashing with bcrypt
- Session-based authentication
- EJS forms and views
- Environment variables
  Run:
  cd backend-lab/exp-13-mongodb-auth
  npm install
  copy .env.example .env
  npm run dev
  For macOS/Linux, use cp .env.example .env. Start MongoDB before running the application. Open http://localhost:3001.

7. Experiment 14 — PostgreSQL
   Location: backend-lab/exp-14-postgresql/
   An Express application connected to PostgreSQL for inserting and displaying student records.
   The experiment demonstrates:

- PostgreSQL database connection
- Database schema creation
- Express routes
- Parameterized SQL queries
- Insert and select operations
- PostgreSQL connection strings
- Environment variables
  Run:
  cd backend-lab/exp-14-postgresql
  npm install
  copy .env.example .env
  npm run dev
  For macOS/Linux, use cp .env.example .env. Create the backend_lab database, run schema.sql, configure DATABASE_URL, and open http://localhost:3002.
  Backend Theory
  The backend-theory folder contains written assignments and practical database work completed as part of the course.

1. Assignment 01 — Notes App
   Location: backend-theory/Assignment 01 - Notes App/
   A browser-based Notes application developed using HTML, CSS, and JavaScript.
   The project demonstrates HTML and CSS, JavaScript, LocalStorage, JSON, creating, editing, deleting and searching notes, persistent browser storage, and timestamps.
   The application is frontend-only and stores notes using browser LocalStorage.
2. Assignment 02 — PostgreSQL as SQL + NoSQL: Working with JSONB
   Location: backend-theory/Assignment 02 - PostgreSQL JSONB/
   A PostgreSQL practical exploring how PostgreSQL can handle relational data and flexible NoSQL-style data using the JSONB data type.
   The assignment covers PostgreSQL JSONB, JSON versus JSONB, JSONB operators and queries, JSONB updates, GIN indexes, EXPLAIN ANALYZE, product catalog implementation, and PostgreSQL JSONB versus MongoDB.
   Technologies Used

- HTML, CSS and JavaScript
- Node.js and NPM
- Express.js and EJS
- MongoDB and Mongoose
- PostgreSQL and SQL
- JSON and JSONB
- JWT and session authentication
- bcrypt
- LocalStorage
  Concepts Covered
- Client-server architecture
- HTTP and REST APIs
- Express.js routing and middleware
- Server-side rendering
- Authentication and authorization
- JWT and session-based authentication
- CRUD operations
- MongoDB and Mongoose
- PostgreSQL and parameterized SQL
- JSONB and database indexing
- NoSQL concepts
- LocalStorage and JSON
- Environment variables
  Security and GitHub Notes
- Do not upload .env files.
- Do not upload passwords, database credentials, API keys or tokens.
- Do not upload node_modules; install dependencies using npm install.
- Use .env.example files as configuration templates.
  Repository Purpose
  This repository serves as a collection of my practical work and coursework for Backend Development. Each folder contains a separate project or assignment focused on specific backend development concepts.
  Author
  Prachi Menon
  B.Tech Computer Science Engineering
  UPES Dehradun
