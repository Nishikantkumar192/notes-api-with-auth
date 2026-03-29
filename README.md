# 📝 Notes API with Authentication

A full-stack CRUD application with authentication and role-based access control.  
Users can manage their own notes, while admins have access to all notes.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication (stored in cookies)
- bcrypt.js (password hashing)
- Joi (validation)

### Frontend
- React.js
- React Toastify (notifications)

### Deployment
- Backend: Render
- Frontend: Vercel

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- Password hashing using bcrypt
- JWT-based authentication (stored in cookies)
- Cookie expiration: 7 days

### 👥 Role-Based Access
- **User**
  - Can create, read, update, delete their own notes
- **Admin**
  - Can perform CRUD operations on all notes

### 📝 Notes Management
- Create Notes
- Get Notes
- Update Notes
- Delete Notes

---

## 📦 API Structure

### Auth Routes


### Notes Routes


---

## 🧠 Database Schema

### User
- name
- email
- password (hashed)
- role (user/admin)

### Note
- title (String, required)
- description (String, required)
- user (Reference to User)

---

## 🛡️ Security

- JWT stored in HTTP cookies
- Password hashing with bcrypt
- Protected routes using middleware
- Input validation using Joi & manual checks
- Cookie expiration set to 7 days

---

## ⚙️ Backend Architecture

- MVC Pattern
  - Models → MongoDB schemas
  - Controllers → Business logic
  - Routes → API endpoints
- Middleware:
  - Authentication check (JWT via cookies)
  - Error handling (custom Express error handler)

---

## 🖥️ Frontend

### Pages
- Signup
- Login
- Home
- Edit Note
- Show Notes

### Features
- Authentication flow
- Protected API calls
- CRUD operations UI
- Toast notifications for success/error

---

## 🧪 API Testing

- Tested using Hoppscotch

---

## 🚀 Deployment

- Backend hosted on Render
- Frontend hosted on Vercel

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-link>
cd notes-api-with-auth

## Install dependencies

npm install
cd client
npm install

## Run the project
npm run both

## 🌐 Live Demo

- Frontend: https://notes-api-with-auth.vercel.app
- Backend: https://notes-api-with-auth.onrender.com

## 🔑 Demo Credentials

You can register a new user or use:

### Admin
- Email: demo192@gmaild.com
- Password: 123456

### User
- Email: demo9153@gmail.com
- Password: 123456

> Note: Admin role is assigned in the database.