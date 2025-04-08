#!/usr/bin/env node

/**
 * Helper script for deploying the frontend to Vercel
 * Run with: node deploy-vercel.js
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Todo App Frontend - Vercel Deployment Helper');
console.log('============================================');

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
} catch (error) {
  console.log('\n❌ Vercel CLI is not installed. Installing now...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully!');
  } catch (error) {
    console.error('❌ Failed to install Vercel CLI. Please install it manually with: npm install -g vercel');
    process.exit(1);
  }
}

// Verify login status
try {
  execSync('vercel whoami', { stdio: 'ignore' });
} catch (error) {
  console.log('\n❌ Not logged in to Vercel. Please log in:');
  try {
    execSync('vercel login', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to log in to Vercel. Please try again later.');
    process.exit(1);
  }
}

// Get backend URL
rl.question('\nEnter your backend URL (e.g., https://todo-app-backend.vercel.app): ', (backendUrl) => {
  if (!backendUrl) {
    console.log('❌ Backend URL is required. Please run the script again and provide a URL.');
    rl.close();
    return;
  }

  // Format the API URL
  const apiUrl = backendUrl.endsWith('/api/todos') ? 
    backendUrl : 
    `${backendUrl}${backendUrl.endsWith('/') ? '' : '/'}api/todos`;

  console.log(`\n✅ API URL will be set to: ${apiUrl}`);

  // Update .env file
  try {
    const envPath = path.join(process.cwd(), '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    // Parse current .env content
    const envLines = envContent.split('\n');
    let updatedContent = '';
    let apiUrlSet = false;
    
    for (let line of envLines) {
      if (line.startsWith('VITE_API_URL=') && !line.startsWith('#')) {
        // Comment out the development URL
        updatedContent += `# ${line}\n`;
      } else if (line.startsWith('# VITE_API_URL=') && line.includes('production')) {
        // Uncomment and update production URL
        updatedContent += `VITE_API_URL=${apiUrl}\n`;
        apiUrlSet = true;
      } else {
        updatedContent += `${line}\n`;
      }
    }
    
    // If we didn't find a production URL to uncomment, add it
    if (!apiUrlSet) {
      updatedContent += `\n# Production API URL\nVITE_API_URL=${apiUrl}\n`;
    }
    
    // Write the updated content back to the file
    fs.writeFileSync(envPath, updatedContent.trim());
    console.log('✅ .env file updated with production API URL');
    
    // Ask if the user wants to deploy to production
    rl.question('\nDo you want to deploy to production? (y/N): ', (answer) => {
      const isProduction = answer.toLowerCase() === 'y';
      
      console.log('\n🚀 Building and deploying to Vercel...');
      
      try {
        // Build the project first
        console.log('\n📦 Building project...');
        execSync('npm run build', { stdio: 'inherit' });
        console.log('✅ Build completed successfully!');
        
        // Deploy to Vercel
        const command = isProduction ? 'vercel --prod' : 'vercel';
        execSync(command, { stdio: 'inherit' });
        
        console.log('\n✅ Deployment initiated successfully!');
        console.log('\n📌 Next steps:');
        console.log('1. Access your deployed frontend via the Vercel URL');
        console.log('2. Make sure to set the FRONTEND_URL environment variable in your backend project');
        console.log('   to the URL of your deployed frontend');
      } catch (error) {
        console.error('\n❌ Deployment failed. Please check the error message above.');
      } finally {
        rl.close();
      }
    });
  } catch (error) {
    console.error('\n❌ Failed to update .env file:', error.message);
    rl.close();
  }
}); 