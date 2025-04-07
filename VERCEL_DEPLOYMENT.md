# Deploying Todo App to Vercel

This guide explains how to deploy both the frontend and backend of the Todo App to Vercel.

## Prerequisites

1. Create a [Vercel account](https://vercel.com/signup) if you don't have one already
2. Install the [Vercel CLI](https://vercel.com/docs/cli) (optional, but helpful):
   ```bash
   npm install -g vercel
   ```
3. Make sure you have the MongoDB Atlas account set up and the connection string

## Backend Deployment

1. Navigate to the backend folder:
   ```bash
   cd todo-app/backend
   ```

2. Create a new Vercel project:
   - Using the dashboard: Import your GitHub repo on the Vercel dashboard
   - Using CLI: Run `vercel` in the backend directory

3. Set up environment variables:
   - In the Vercel dashboard, go to your project settings
   - Add the following environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `PORT`: Set to 8080 or leave it blank (Vercel will set it automatically)

4. Deploy the backend:
   - Using dashboard: Trigger a manual deployment
   - Using CLI: Run `vercel --prod`

5. Once deployed, note down your backend API URL (something like `https://todo-app-backend-xxxx.vercel.app`)

## Frontend Deployment

1. Update the frontend API endpoint:
   - The project already has a `.env.production` file with the API URL set to:
     ```
     VITE_API_URL=https://todo-app-backend-vercel.vercel.app/api/todos
     ```
   - Replace this URL with your actual backend URL from step 5 above

2. Install required dependencies including Terser (required for minification):
   ```bash
   cd todo-app/frontend
   npm install --save-dev terser
   ```

3. Test the build locally to ensure it works:
   ```bash
   npm run build
   ```

4. Create a new Vercel project:
   - Using the dashboard: Import your GitHub repo on the Vercel dashboard
   - Using CLI: Run `vercel` in the frontend directory

5. Set up the build configuration:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. Deploy the frontend:
   - Using dashboard: Trigger a manual deployment
   - Using CLI: Run `vercel --prod`

## Troubleshooting

- **Build errors with Terser**: If you see an error message like `terser not found`, make sure to install it:
  ```bash
  npm install --save-dev terser
  ```

- **CORS issues**: If you encounter CORS issues, make sure your backend is properly configured to accept requests from your frontend domain.

- **API connection issues**: Verify that the environment variable `VITE_API_URL` is correctly set to your backend URL.

- **MongoDB connection issues**: Check that your MongoDB Atlas cluster is properly configured to accept connections from Vercel's IP addresses. You may need to set the IP access to "Allow access from anywhere" (0.0.0.0/0) in MongoDB Atlas Network Access settings.

## Monitoring

- Use the Vercel dashboard to monitor your deployments
- Check logs for any issues with either the frontend or backend
- Set up alerts for errors or downtime

## Continuous Deployment

Vercel automatically sets up continuous deployment from your GitHub repository. Any push to your main branch will trigger a new deployment.

You can configure different preview deployments for pull requests by setting up branch deployment rules in the Vercel dashboard. 