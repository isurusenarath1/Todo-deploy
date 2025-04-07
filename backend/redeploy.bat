@echo off
echo Redeploying backend with updated CORS configuration...

REM Check if vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Vercel CLI is not installed. Installing...
    call npm install -g vercel
)

REM Check if user is logged in to Vercel
vercel whoami >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo You are not logged in to Vercel. Please log in:
    call vercel login
)

REM Deploy to Vercel
echo Deploying to Vercel...
call vercel --prod

echo Deployment complete! Make sure to update the FRONTEND_URL environment variable in your Vercel project settings.
echo You can do this by going to your project settings in the Vercel dashboard and adding the FRONTEND_URL environment variable. 