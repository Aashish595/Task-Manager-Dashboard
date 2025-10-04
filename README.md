# Full Stack Assignment: Task Management System

## Overview
This is a **Full-Stack Task Management Web Application** where users can securely sign up, log in, and manage their tasks.  
The project demonstrates building a clean and functional full-stack application using modern technologies.

---

## Tech Stack

**Frontend**: React, TailwindCSS, React Router  
**Backend**: Node.js, Express, MongoDB, JWT, bcryptjs  
**Authentication**: JWT + secure password hashing  
**Deployment**: Frontend and Backend deployed live  

---

## Features

### Backend
- Secure user authentication (Signup & Login)  
- Passwords hashed with bcrypt  
- Authenticated users can:
  - Create tasks
  - View tasks
  - Update tasks
  - Delete tasks
- Proper error handling and clean structure  

### Frontend
- Login/Signup pages  
- Dashboard to display user tasks  
- Add/Edit tasks via task form  
- Filters (status, tags) – optional  
- Simple and clean UI  

---

## Test User (HR Verification)
Email -> aashishmaurya959@gmail.com
Password -> 123456789

You can use this user to log in and verify that the application is fully functional.

---

## Environment Variables

### Backend (`.env`)
PORT=5000
NODE_ENV=development

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

MONGO_URI=mongodb+srv://aashishmaurya959_db_user:pnW8q1qOku5fWKvN@cluster0.kkv9aop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

##Deployment Links
- **Frontend Live:** [https://task-manager-dashboard-sigma.vercel.app/](https://task-manager-dashboard-sigma.vercel.app/) 
- **Backend API Live:** [https://task-manager-dashboard-eh8t.onrender.com/](https://task-manager-dashboard-eh8t.onrender.com/) 


## Approach

Backend: Modular structure with routes, controllers, and middleware. JWT is used for authentication, and bcryptjs for password hashing. MongoDB is used for storing users and tasks.

Frontend: React functional components with hooks. Axios is used for API calls. TailwindCSS ensures a responsive and clean UI.

## Notes

Ensure the backend is running before accessing the frontend dashboard.

You can use the test user credentials above to check full functionality.

Optional: Implement pagination or filters for tasks for better user experience.
