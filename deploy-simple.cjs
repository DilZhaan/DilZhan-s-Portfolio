// Simple deployment script for GitHub Pages (CommonJS version)
const { execSync } = require('child_process');

console.log('🚀 Starting simplified GitHub Pages deployment...');

try {
  // Check if git is installed
  execSync('git --version', { stdio: 'inherit' });
  
  // Get current branch
  const currentBranch = execSync('git branch --show-current').toString().trim();
  console.log(`📋 Current branch: ${currentBranch}`);
  
  // Check for uncommitted changes
  let hasChanges = false;
  try {
    execSync('git diff-index --quiet HEAD --');
  } catch (e) {
    hasChanges = true;
  }
  
  if (hasChanges) {
    console.log('⚠️ You have uncommitted changes. Committing them...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Auto-commit before GitHub Pages deployment"', { stdio: 'inherit' });
    console.log('✅ Changes committed');
  } else {
    console.log('✅ No uncommitted changes');
  }
  
  // Push to GitHub
  console.log('🔄 Pushing to GitHub to trigger deployment workflow...');
  execSync(`git push origin ${currentBranch}`, { stdio: 'inherit' });
  
  console.log('');
  console.log('✅ Push successful');
  console.log('');
  console.log('🚀 Your portfolio is being deployed to GitHub Pages!');
  console.log('🌐 It will be available at: https://dilzhaan.github.io/DilZhan-s-Portfolio/');
  console.log('⏱️ This process may take a few minutes to complete.');
  console.log('');
  console.log('📊 You can check the workflow status at:');
  console.log('   https://github.com/DilZhaan/DilZhan-s-Portfolio/actions');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
} 