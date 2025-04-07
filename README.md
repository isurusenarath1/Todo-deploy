# Todo List Application

A full-stack Todo List application with CRUD functionality built with React, Node.js, Express, and MongoDB.

## Features

- Create, read, update, and delete tasks
- Tasks have title, description, due date, and status
- Filter tasks by status (active, completed, deleted)
- Dark mode/light mode toggle
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React (Vite)
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB Atlas for database
- Mongoose ODM

## Setup and Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd todo-app/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd todo-app/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
todo-app/
├── backend/             # Backend code
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── index.js         # Main server file
│
└── frontend/            # Frontend code
    ├── public/          # Static files
    └── src/             # Source files
        ├── api/         # API services
        ├── components/  # React components
        ├── hooks/       # Custom hooks
        ├── pages/       # Page components
        └── App.jsx      # Main App component
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/status/:status` - Get todos by status
- `GET /api/todos/:id` - Get a single todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Soft delete a todo (change status to 'deleted')
- `DELETE /api/todos/:id/permanent` - Permanently delete a todo 