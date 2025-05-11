// This script helps trigger the Docker-based GitHub Pages workflow
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

console.log('🚀 Preparing to deploy using Docker to GitHub Pages...');

try {
  // Check if git is installed
  execSync('git --version', { stdio: 'ignore' });
  
  // Check if we're in a git repository
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
  } catch (e) {
    console.error('❌ Not in a git repository. Please run this from the root of your git repository.');
    process.exit(1);
  }
  
  // Get the current branch
  const currentBranch = execSync('git branch --show-current').toString().trim();
  console.log(`📋 Current branch: ${currentBranch}`);
  
  // Check if there are any uncommitted changes
  try {
    execSync('git diff-index --quiet HEAD --');
    console.log('✅ No uncommitted changes');
  } catch (e) {
    console.log('⚠️ You have uncommitted changes. Committing them first...');
    
    try {
      execSync('git add .');
      execSync('git commit -m "Auto-commit before Docker-based GitHub Pages deployment"');
      console.log('✅ Changes committed');
    } catch (commitError) {
      console.error('❌ Failed to commit changes:', commitError.message);
      process.exit(1);
    }
  }
  
  // Push to GitHub to trigger the workflow
  console.log(`🔄 Pushing to GitHub to trigger the Docker-based GitHub Pages workflow...`);
  try {
    execSync(`git push origin ${currentBranch}`);
    console.log('✅ Push successful');
    console.log('');
    console.log('🚀 The Docker-based GitHub Pages workflow has been triggered!');
    console.log('🌐 Your portfolio will be available at: https://dilzhaan.github.io/DilZhan-s-Portfolio/');
    console.log('⏱️ This process may take a few minutes to complete.');
    console.log('');
    console.log('📊 You can check the workflow status at:');
    console.log('   https://github.com/DilZhaan/DilZhan-s-Portfolio/actions');
  } catch (pushError) {
    console.error('❌ Failed to push to GitHub:', pushError.message);
    process.exit(1);
  }
} catch (e) {
  console.error('❌ Failed to deploy:', e.message);
  process.exit(1);
} 