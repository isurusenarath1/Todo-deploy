#!/bin/bash

# This script helps redeploy the backend with the updated CORS configuration

echo "Redeploying backend with updated CORS configuration..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "You are not logged in to Vercel. Please log in:"
    vercel login
fi

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment complete! Make sure to update the FRONTEND_URL environment variable in your Vercel project settings."
echo "You can do this by going to your project settings in the Vercel dashboard and adding the FRONTEND_URL environment variable." 