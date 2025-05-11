# Simplified Deployment to GitHub Pages

This document provides instructions for the simplified process of deploying your portfolio to GitHub Pages.

## How It Works

This deployment process uses a GitHub Actions workflow to:

1. Build your React application directly on GitHub's servers
2. Fix any path issues for GitHub Pages compatibility
3. Deploy the built files to GitHub Pages

## Deployment Options

### Option 1: Using Node.js (Recommended)

```bash
# Deploy using the simple Node.js script
npm run deploy:simple
```

### Option 2: Using PowerShell (Windows)

```bash
# Deploy using the PowerShell script
npm run deploy:simple:win
```

## What Happens Behind the Scenes

When you run one of the deployment commands:

1. Your local changes are committed (if any are pending)
2. The changes are pushed to GitHub
3. GitHub Actions workflow is triggered
4. The workflow builds your application with the correct base path
5. The built files are deployed to GitHub Pages

## Troubleshooting

If you encounter issues:

1. Check the GitHub Actions logs at https://github.com/DilZhaan/DilZhan-s-Portfolio/actions
2. Make sure your repository has GitHub Pages enabled in Settings > Pages
3. Ensure the base path in vite.config.js is set correctly

## Useful Links

- Your deployed portfolio: https://dilzhaan.github.io/DilZhan-s-Portfolio/
- GitHub Pages documentation: https://docs.github.com/en/pages 