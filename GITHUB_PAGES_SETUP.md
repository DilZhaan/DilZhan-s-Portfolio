# Setting Up GitHub Pages with Custom Workflow

There are two ways to deploy to GitHub Pages, and you're seeing both of them in your repository:

1. The **auto-generated workflow** (`pages-build-deployment`) that GitHub creates
2. The **custom workflow** we created (`.github/workflows/deploy.yml`)

To properly use our custom workflow and avoid conflicts, follow these steps:

## 1. Change GitHub Pages Source Settings

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. In the left sidebar, click on "Pages"
4. Under "Build and deployment", you'll see the following options:
   - Source: Choose "GitHub Actions" (instead of "Deploy from a branch")
   - This tells GitHub to use your custom workflow instead of the auto-generated one

![GitHub Pages Settings](https://docs.github.com/assets/cb-32892/mw-1440/images/help/pages/source-actions.webp)

## 2. Disable the Auto-Generated Workflow (Optional)

If you want to completely disable the auto-generated workflow:

1. Go to your repository's "Settings" tab
2. In the left sidebar, click on "Pages"
3. Under "Build and deployment", make sure "GitHub Actions" is selected as the source
4. Go to "Actions" tab
5. You'll see both workflows listed
6. Click on the `pages-build-deployment` workflow
7. Click on the "..." menu (three dots) at the top right
8. Select "Disable workflow"

## 3. What's the Difference?

- **Auto-generated workflow**: Uses content directly from a branch (typically `gh-pages` or `main/docs`) and doesn't process it
- **Custom workflow**: Builds your React application with Docker, processes it, and then deploys it

## 4. Which Workflow to Keep?

For your React portfolio that requires building and processing, you should:

1. Keep and use the custom workflow (`.github/workflows/deploy.yml`)
2. Set GitHub Pages source to "GitHub Actions"
3. Optionally disable the auto-generated workflow

## 5. Check Your Deployment

After making these changes:

1. Go to the "Actions" tab
2. You should see your custom workflow running (or completed)
3. After it completes, your site will be available at: https://dilzhaan.github.io/DilZhan-s-Portfolio/ 