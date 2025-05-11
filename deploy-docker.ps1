Write-Host "🚀 Preparing to deploy using Docker to GitHub Pages..." -ForegroundColor Cyan

# Check if git is installed
try {
    git --version | Out-Null
} catch {
    Write-Host "❌ Git is not installed or not in the PATH." -ForegroundColor Red
    exit 1
}

# Check if we're in a git repository
try {
    git rev-parse --is-inside-work-tree | Out-Null
} catch {
    Write-Host "❌ Not in a git repository. Please run this from the root of your git repository." -ForegroundColor Red
    exit 1
}

# Get the current branch
$currentBranch = git branch --show-current
Write-Host "📋 Current branch: $currentBranch" -ForegroundColor Cyan

# Check if there are any uncommitted changes
$hasChanges = $false
try {
    git diff-index --quiet HEAD --
} catch {
    $hasChanges = $true
}

if ($hasChanges) {
    Write-Host "⚠️ You have uncommitted changes. Committing them first..." -ForegroundColor Yellow
    
    try {
        git add .
        git commit -m "Auto-commit before Docker-based GitHub Pages deployment"
        Write-Host "✅ Changes committed" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to commit changes: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ No uncommitted changes" -ForegroundColor Green
}

# Push to GitHub to trigger the workflow
Write-Host "🔄 Pushing to GitHub to trigger the Docker-based GitHub Pages workflow..." -ForegroundColor Cyan
try {
    git push origin $currentBranch
    Write-Host ""
    Write-Host "✅ Push successful" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 The Docker-based GitHub Pages workflow has been triggered!" -ForegroundColor Green
    Write-Host "🌐 Your portfolio will be available at: https://dilzhaan.github.io/DilZhan-s-Portfolio/" -ForegroundColor Cyan
    Write-Host "⏱️ This process may take a few minutes to complete." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📊 You can check the workflow status at:" -ForegroundColor Cyan
    Write-Host "   https://github.com/DilZhaan/DilZhan-s-Portfolio/actions" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Failed to push to GitHub: $_" -ForegroundColor Red
    exit 1
} 