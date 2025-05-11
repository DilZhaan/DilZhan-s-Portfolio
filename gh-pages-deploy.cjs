// This script handles special adjustments needed for GitHub Pages deployment
const fs = require('fs');
const path = require('path');

// Check if build directory exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('Error: dist directory does not exist. Run build command first.');
  process.exit(1);
}

// Create the 404.html file (same as index.html for SPA routing)
console.log('Creating 404.html for GitHub Pages routing...');
fs.copyFileSync(
  path.join(distPath, 'index.html'),
  path.join(distPath, '404.html')
);

// Fix asset paths in HTML files if needed
console.log('Fixing asset paths in HTML files...');
const htmlFiles = ['index.html', '404.html'];

htmlFiles.forEach(htmlFile => {
  const filePath = path.join(distPath, htmlFile);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix asset paths if needed - this will depend on your actual HTML structure
    // For example:
    content = content.replace(/="\/assets\//g, '="./assets/');
    content = content.replace(/="\/DilZhan-s-Portfolio\/assets\//g, '="./assets/');
    
    fs.writeFileSync(filePath, content);
  }
});

console.log('GitHub Pages deployment adjustments completed.'); 