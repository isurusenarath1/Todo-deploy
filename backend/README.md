# Todo App Backend

Express.js backend API for the Todo List application with MongoDB database.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. The API will be available at `http://localhost:5000`

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/status/:status` - Get todos by status
- `GET /api/todos/:id` - Get a single todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Soft delete a todo (change status to 'deleted')
- `DELETE /api/todos/:id/permanent` - Permanently delete a todo

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests
- dotenv for environment variables 