Features
✅ Frontend (React.js / Next.js with JSX)

TailwindCSS responsive UI

Login/Register forms with validation

Protected dashboard routes (JWT)

CRUD operations on tasks/notes

Search & filter support

Global Auth context

✅ Backend (Node.js + Express)

MongoDB connection with Mongoose

Routes for:

POST /api/auth/register

POST /api/auth/login

GET /api/profile

PUT /api/profile

CRUD /api/tasks

JWT-based authentication

Bcrypt password hashing

Error handling middleware

✅ Security & Scalability

Encrypted passwords (bcrypt)

JWT authentication middleware

Modular project structure (MVC pattern)

Clean code & API docs

⚙️ Installation
1️⃣ Clone the repo
git clone [https://github.com/your-username/scalable-web-app.git](https://github.com/Aashish595/Task-Manager-Dashboard)
cd scalable-web-app

2️⃣ Setup Backend
cd backend
npm install


Create a .env file in backend/:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mydb
JWT_SECRET=supersecretjwt


Run backend:

npm start


Backend runs on 👉 http://localhost:5000

3️⃣ Setup Frontend
cd frontend
npm install
npm run dev   # (for Next.js)
# or
npm start     # (for React.js)


Frontend runs on 👉 http://localhost:3000

🛠️ API Endpoints
Auth

POST /api/auth/register → Register user

POST /api/auth/login → Login user

Profile

GET /api/profile → Get profile (JWT required)

PUT /api/profile → Update profile

Tasks

GET /api/tasks → Fetch tasks

POST /api/tasks → Create task

PUT /api/tasks/:id → Update task

DELETE /api/tasks/:id → Delete task

Author
Gurudas Maurya
