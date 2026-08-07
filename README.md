# 🚀 Task Manager – Role Based Access Control (RBAC)

> A full-stack task management application built with the MERN + TypeScript ecosystem, featuring JWT authentication, Role-Based Access Control (RBAC), Redis-backed rate limiting, and a React frontend.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-6-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Express-5-black?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb" />
  <img src="https://img.shields.io/badge/Redis-Rate%20Limiting-red?logo=redis" />
  <img src="https://img.shields.io/badge/JWT-Authentication-orange" />
</p>

---

## 📖 Overview

A secure task management platform where users are assigned different roles, each with different permissions:

- **Admin** — full control: create/delete tasks, assign tasks, delete users, change user roles
- **Manager** — view all tasks and users, change task priority
- **Employee** — view only their own assigned tasks, update their own task status

The backend uses Express, TypeScript, MongoDB (Mongoose), JWT authentication, role-based authorization middleware, and Redis-based rate limiting on auth routes. The frontend is built with React, TypeScript, Vite, Tailwind CSS, React Router, and Axios.

---

## ✨ Features

### 🔐 Authentication
- Registration & login
- JWT-based authentication (10-day expiry)
- Passwords hashed with bcrypt
- Route protection on both frontend (React Router guards) and backend (middleware)

### 👥 Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **Admin** | Create tasks, delete tasks, delete users, change user roles, view all tasks/users |
| **Manager** | View all tasks and users, change task priority |
| **Employee** | View own assigned tasks, change own task status |

### ✅ Task Management
- Create, delete, and assign tasks (by username)
- Change task priority (`low` / `medium` / `high`)
- Update task status (`pending` / `in_progress` / `completed`)
- View all tasks vs. only assigned tasks, depending on role

### 🛡 Security
- JWT authentication + role authorization middleware
- Helmet security headers
- CORS restricted to a configured client origin
- Redis-based rate limiting (max 10 requests / 60s per IP) on `/api/auth` routes

---

## 🏗 Tech Stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, React Router, Axios, React Hot Toast

**Backend:** Node.js, Express 5, TypeScript, MongoDB, Mongoose, Redis, JWT, bcrypt, Helmet

---

## 📂 Project Structure

```
Task-Manager-RoleBased/
│
├── frontend/
│   └── src/
│       ├── api/          # axios client + service calls
│       ├── components/   # shared UI (ProtectedRoute, LoadingSpinner, etc.)
│       ├── pages/        # Login, Signup, dashboards, Users
│       └── App.tsx       # routes
│
├── backend/
│   └── src/
│       ├── config/         # mongodb.ts, redis.ts
│       ├── controllers/    # authController, userController
│       ├── middlewares/    # authMiddleware, roleMiddleware, rateLimiter
│       ├── models/         # userModel, taskModel
│       ├── routes/         # authRoute, userRoute
│       └── index.ts        # app entry point
│
└── README.md
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user (defaults to `employee` role) |
| POST | `/api/auth/login` | Log in, returns a JWT |

### Users
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/user/all-users` | Admin, Manager |
| DELETE | `/api/user/delete-user/:userId` | Admin |
| PATCH | `/api/user/change-role/:userId` | Admin |

### Tasks
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/user/add-task` | Admin |
| GET | `/api/user/all-task` | Admin, Manager |
| GET | `/api/user/my-task` | Employee |
| PATCH | `/api/user/change-priority/:id` | Admin, Manager |
| PATCH | `/api/user/change-status/:taskId` | Employee |
| DELETE | `/api/user/delete/:id` | Admin |

---

## ⚙️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local MongoDB)
- A Redis instance ([Redis Cloud](https://redis.io/cloud/) free tier works fine, or local Redis)

### 1. Clone the repository

```bash
git clone https://github.com/<your-github-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` (this file is git-ignored and will **not** be committed — see `.env.example` for the required keys):

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/task-manager?appName=Cluster0
JWT_SECRET=some_long_random_secret_string
CLIENT_URL=http://localhost:5173
REDIS_URL=redis://<user>:<password>@<host>:<port>
```

> ⚠️ Put the database name (`task-manager`) directly in the URI, before the `?` query string — appending it separately in code will break the connection.

Start the backend:

```bash
npm run dev
```

You should see `DB connected` and `Server is running on port 3000` in the terminal.

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

Visit `http://localhost:5173`.

### 4. Create your first users

Register through the Signup page — new accounts default to the `employee` role. To create an `admin` or `manager` account, either:
- Register normally, then edit that user's `role` field directly in MongoDB Atlas (Documents view → edit the document), then log out and log back in so a fresh JWT is issued with the updated role, **or**
- Once you have one working admin account, use the `/api/user/change-role/:userId` endpoint (or the in-app Users page) to promote other accounts.

---

## 🔒 Middleware

- `authMiddleware.ts` — verifies the JWT on protected routes
- `roleMiddleware.ts` — restricts routes to specific roles
- `rateLimiter.ts` — Redis-backed rate limiting on auth routes
- Helmet — security headers
- CORS — restricted to `CLIENT_URL`

---

## 🚀 Possible Future Improvements

- Refresh token authentication
- Email verification / password reset
- Pagination & search/filtering on task and user lists
- Unit & integration tests
- Docker support
- CI/CD pipeline

---

## 📄 License

This project is licensed under the MIT License.
