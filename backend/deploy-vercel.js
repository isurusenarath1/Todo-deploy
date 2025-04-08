#!/usr/bin/env node

/**
 * Helper script for deploying the backend to Vercel
 * Run with: node deploy-vercel.js
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Todo App Backend - Vercel Deployment Helper');
console.log('===========================================');

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

// Ask if this is a production deployment
rl.question('\nDo you want to deploy to production? (y/N): ', (answer) => {
  const isProduction = answer.toLowerCase() === 'y';
  
  console.log('\n📝 Remember to set these environment variables in the Vercel dashboard after deployment:');
  console.log('- MONGODB_URI: Your MongoDB connection string');
  console.log('- FRONTEND_URL: Your frontend URL when deployed');
  
  console.log('\n🚀 Deploying to Vercel...');
  
  try {
    const command = isProduction ? 'vercel --prod' : 'vercel';
    execSync(command, { stdio: 'inherit' });
    
    console.log('\n✅ Deployment initiated successfully!');
    console.log('\n📌 Next steps:');
    console.log('1. Go to your Vercel dashboard and set up the environment variables');
    console.log('2. Update your frontend .env file with the new backend URL');
    console.log('3. Deploy your frontend');
  } catch (error) {
    console.error('\n❌ Deployment failed. Please check the error message above.');
  } finally {
    rl.close();
  }
}); 