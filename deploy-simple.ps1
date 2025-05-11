Write-Host "🚀 Starting simplified GitHub Pages deployment..." -ForegroundColor Cyan

try {
    # Check if git is installed
    git --version
    
    # Get current branch
    $currentBranch = git branch --show-current
    Write-Host "📋 Current branch: $currentBranch" -ForegroundColor Cyan
    
    # Check for uncommitted changes
    $hasChanges = $false
    try {
        git diff-index --quiet HEAD --
    } catch {
        $hasChanges = $true
    }
    
    if ($hasChanges) {
        Write-Host "⚠️ You have uncommitted changes. Committing them..." -ForegroundColor Yellow
        git add .
        git commit -m "Auto-commit before GitHub Pages deployment"
        Write-Host "✅ Changes committed" -ForegroundColor Green
    } else {
        Write-Host "✅ No uncommitted changes" -ForegroundColor Green
    }
    
    # Push to GitHub
    Write-Host "🔄 Pushing to GitHub to trigger deployment workflow..." -ForegroundColor Cyan
    git push origin $currentBranch
    
    Write-Host ""
    Write-Host "✅ Push successful" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Your portfolio is being deployed to GitHub Pages!" -ForegroundColor Green
    Write-Host "🌐 It will be available at: https://dilzhaan.github.io/DilZhan-s-Portfolio/" -ForegroundColor Cyan
    Write-Host "⏱️ This process may take a few minutes to complete." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📊 You can check the workflow status at:" -ForegroundColor Cyan
    Write-Host "   https://github.com/DilZhaan/DilZhan-s-Portfolio/actions" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Deployment failed: $_" -ForegroundColor Red
    exit 1
} 