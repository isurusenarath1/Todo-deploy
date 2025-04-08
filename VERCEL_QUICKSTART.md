# Todo App - Vercel Deployment Quickstart

This guide provides the quickest path to deploying the Todo App on Vercel.

## Prerequisites

- [Node.js](https://nodejs.org/) installed (v14+)
- A [Vercel account](https://vercel.com/signup)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account with a database set up

## Step 1: Deploy the Backend

1. Navigate to the backend directory:
   ```
   cd todo-app/backend
   ```

2. Run the deployment script:
   ```
   npm run deploy
   ```

3. Follow the prompts. The script will:
   - Install the Vercel CLI if needed
   - Log you into Vercel
   - Ask if you want to deploy to production
   - Deploy your backend to Vercel

4. After successful deployment, you'll receive a URL for your backend. It will look something like:
   ```
   https://todo-app-backend-xxxx.vercel.app
   ```

5. **Important**: Save this URL for the next step.

6. Set up environment variables in the Vercel dashboard:
   - Go to your project on the Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add these variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `FRONTEND_URL`: Set to `http://localhost:5173` for now (we'll update this later)

## Step 2: Deploy the Frontend

1. Navigate to the frontend directory:
   ```
   cd todo-app/frontend
   ```

2. Run the deployment script:
   ```
   npm run deploy
   ```

3. When prompted, enter the backend URL you obtained in Step 1.

4. Follow the prompts. The script will:
   - Update your `.env` file with the correct backend URL
   - Build your frontend
   - Deploy it to Vercel

5. After successful deployment, you'll receive a URL for your frontend. It will look something like:
   ```
   https://todo-app-frontend-xxxx.vercel.app
   ```

## Step 3: Connect Frontend and Backend

1. Update the backend's `FRONTEND_URL` environment variable:
   - Go to your backend project on the Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Update the `FRONTEND_URL` variable with your frontend URL

2. Redeploy the backend for the changes to take effect:
   ```
   cd todo-app/backend
   npm run deploy
   ```

3. Choose "y" when asked if you want to deploy to production.

## Testing Your Deployment

1. Visit your frontend URL in a browser.
2. Try adding, editing, and deleting todos to ensure the frontend is properly connected to the backend.
3. If you encounter CORS issues, ensure the `FRONTEND_URL` in your backend's environment variables exactly matches your frontend's URL.

## Troubleshooting

- **API Connection Issues**: Check that your backend URL is correct in the frontend's `.env` file and that it ends with `/api/todos`.
- **CORS Errors**: Verify that your frontend URL is properly set in the backend's environment variables.
- **Database Connection Issues**: Ensure your MongoDB connection string is correct and that your database has network access set to allow connections from any IP (0.0.0.0/0).
- **Deployment Failures**: Check the deployment logs in Vercel for specific error messages.

## Next Steps

- Set up a custom domain in the Vercel dashboard
- Configure continuous deployment from your Git repository
- Add environment-specific variables for staging/development environments 