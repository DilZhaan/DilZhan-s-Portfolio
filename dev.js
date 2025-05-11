// Custom dev script for running the app locally without GitHub Pages base path
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting development server with base path set to "/"...');

// Use exec instead of spawn with correct command for Windows
const command = process.platform === 'win32' 
  ? 'npx.cmd vite --base=/' 
  : 'npx vite --base=/';

// Execute the command
const viteProcess = exec(command, {
  env: {
    ...process.env,
    BASE_URL: '/'
  }
});

// Forward stdout and stderr
viteProcess.stdout.pipe(process.stdout);
viteProcess.stderr.pipe(process.stderr);

viteProcess.on('error', (err) => {
  console.error('Failed to start dev server:', err);
  process.exit(1);
});

viteProcess.on('exit', (code) => {
  process.exit(code || 0);
}); 