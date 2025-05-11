# Deploying to GitHub Pages with Docker

This guide will help you deploy your portfolio to GitHub Pages using Docker and GitHub Actions.

## Prerequisites

1. A GitHub account
2. Docker and Docker Compose installed on your machine
3. Git installed on your machine

## Steps to Deploy

### 1. Push Your Code to GitHub

First, create a repository on GitHub named `DilZhan-s-Portfolio` and push your code:

```bash
# Initialize git repository if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/DilZhaan/DilZhan-s-Portfolio.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages with GitHub Actions

1. Go to your GitHub repository: https://github.com/DilZhaan/DilZhan-s-Portfolio
2. Click on "Settings" tab
3. In the left sidebar, click on "Pages"
4. Under "Build and deployment", select "GitHub Actions" as the source
5. This will allow the GitHub Actions workflow to deploy your site

### 3. Deploy Using GitHub Actions (Automated)

The repository contains a GitHub Actions workflow file (`.github/workflows/deploy.yml`) that will automatically:
- Build your portfolio using Docker
- Extract the built files
- Create a 404.html page to support SPA routing
- Deploy them to GitHub Pages

Just push your changes to the main branch, and GitHub Actions will handle the deployment automatically.

### 4. Manual Deployment (Optional)

If you want to build and test locally before pushing:

#### On Windows:
```bash
# Run the deployment script
.\deploy-to-github.bat
```

#### On Linux/macOS:
```bash
# Make the script executable
chmod +x deploy-to-github.sh

# Run the deployment script
./deploy-to-github.sh
```

This will:
1. Build your portfolio with Docker Compose
2. Extract the built files to the `dist` directory
3. Create a 404.html page for SPA routing

### 5. Access Your Deployed Site

After the GitHub Actions workflow completes, your site will be available at:
https://dilzhaan.github.io/DilZhan-s-Portfolio/

## Routing in Single Page Applications

### HashRouter vs BrowserRouter

For GitHub Pages deployment, we use HashRouter instead of BrowserRouter. This is because:

1. **BrowserRouter** uses HTML5 history API and requires server-side support to handle direct URL access
2. **HashRouter** uses URL hash (#) which is handled client-side and works without server configuration

The App.jsx file has been configured to use HashRouter for compatibility with GitHub Pages.

### 404.html Page

We also create a 404.html page that's identical to index.html. This helps with direct URL access in case the HashRouter doesn't catch all navigation scenarios.

## Troubleshooting

### Site Not Loading Correctly

If your site doesn't load correctly (e.g., blank page or missing assets):

1. Check the browser console for errors
2. Ensure that the `base` path in `vite.config.js` is set correctly to `/DilZhan-s-Portfolio/`
3. Check that all asset paths in your code use relative paths
4. If you see routing errors (e.g., "No routes matched location"), verify that you're using HashRouter

### GitHub Actions Workflow Failed

If the GitHub Actions workflow fails:

1. Go to the "Actions" tab in your repository
2. Click on the failed workflow run
3. Check the logs to identify the issue
4. Make necessary fixes and push again

## Notes

- The GitHub Pages site may take a few minutes to update after the workflow completes
- You can trigger the deployment manually by going to the "Actions" tab, selecting the "Deploy to GitHub Pages" workflow, and clicking "Run workflow" 