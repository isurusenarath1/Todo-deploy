# Todo App

A full-stack Todo application with React frontend and Node.js/Express backend.

## Features

- Create, read, update, and delete todo items
- Mark todos as active, completed, or deleted
- Filter todos by status
- Count badges showing the number of todos in each status
- Dark/light mode toggle
- Responsive design

## Project Structure

```
todo-app/
├── backend/             # Express.js backend
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── .env             # Environment variables
│   ├── index.js         # Server entry point
│   ├── vercel.json      # Vercel deployment configuration
│   ├── deploy-vercel.js # Vercel deployment helper script
│   └── package.json     # Backend dependencies
│
└── frontend/            # React.js frontend
    ├── public/          # Static files
    ├── src/             # Source code
    │   ├── api/         # API client
    │   ├── components/  # React components
    │   ├── contexts/    # Context providers
    │   ├── hooks/       # Custom hooks
    │   └── pages/       # Page components
    ├── .env             # Environment variables
    ├── vercel.json      # Vercel deployment configuration
    ├── deploy-vercel.js # Vercel deployment helper script
    └── package.json     # Frontend dependencies
```

## Setup and Installation

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd todo-app/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the development server:
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

3. The `.env` file is already set up with:
   ```
   VITE_API_URL=http://localhost:5000/api/todos
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Deployment

### Deploying to Vercel

We've included helper scripts to simplify the deployment process for both the backend and frontend.

#### Backend Deployment to Vercel

1. Navigate to the backend directory:
   ```
   cd todo-app/backend
   ```

2. Run the deployment script:
   ```
   npm run deploy
   ```

   This script will:
   - Check if Vercel CLI is installed and install it if needed
   - Verify you're logged in to Vercel
   - Ask if you want to deploy to production
   - Deploy your backend to Vercel

3. After deployment, Vercel will provide a URL for your backend API. Note this URL for use in the frontend deployment.

4. Set up environment variables in the Vercel dashboard:
   - Go to your project on the Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add the following variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `FRONTEND_URL`: Your frontend URL (when deployed)

#### Frontend Deployment to Vercel

1. Navigate to the frontend directory:
   ```
   cd todo-app/frontend
   ```

2. Run the deployment script:
   ```
   npm run deploy
   ```

   This script will:
   - Check if Vercel CLI is installed and install it if needed
   - Verify you're logged in to Vercel
   - Prompt for your backend URL (the one you obtained from the backend deployment)
   - Automatically update your `.env` file with the production API URL
   - Build your frontend
   - Deploy to Vercel

3. After deployment, update the backend's `FRONTEND_URL` environment variable in the Vercel dashboard with your new frontend URL.

### Generic Deployment Options

This application can be deployed to any hosting platform that supports Node.js applications.

#### Backend Deployment

1. Set up your environment variables on your hosting platform:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: The port for your server (or let the platform decide)
   - `FRONTEND_URL`: The URL of your deployed frontend

2. Deploy the backend code to your hosting platform.

#### Frontend Deployment

1. Update the `.env` file with your deployed backend URL as shown above.

2. Build the frontend:
   ```
   npm run build
   ```

3. Deploy the content of the `dist` directory to your static hosting service.

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `GET /api/todos/status/:status` - Get todos by status
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Soft delete a todo (marks as deleted)
- `DELETE /api/todos/:id/permanent` - Permanently delete a todo

## Testing the API

A simple API test page is included at `/api-test.html` that allows you to verify connectivity to your backend API.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE). 