# 📝 Todo Application

A full-stack Todo application built with **React, Node.js, Express, and MongoDB**. It allows users to register, log in securely, and manage their tasks.

## 🚀 Features

* User Registration
* JWT-based Authentication
* Secure Password Hashing
* Add Tasks
* Update Tasks
* Delete Tasks
* View All Tasks
* REST API
* MongoDB Database

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

## 📁 Project Structure

```text
todo/
├── Backend/
│   ├── src/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/imabhishekraaz/todo.git
cd todo
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

Start the backend:

```bash
npm run start
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

The application will then be available on the local Vite development server.

## 🔐 API Endpoints

### Authentication

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/user/signup` | Register a new user |
| POST   | `/api/user/login`  | Login user          |

### Tasks

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/user/task`     | Add a task    |
| GET    | `/api/user/tasks`    | Get all tasks |
| PUT    | `/api/user/task/:id` | Update a task |
| DELETE | `/api/user/task/:id` | Delete a task |

### Authentication Header

For protected routes, send the JWT token:

```http
Authorization: Bearer <token>
```

## 👨‍💻 Author

**Abhishek Raj**

* GitHub: https://github.com/imabhishekraaz


