# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and TailwindCSS. This project showcases my professional profile with a sleek design, interactive elements, and a fully responsive layout that works flawlessly across all devices.

## ✨ Features

- **Responsive Design** - Optimized for all screen sizes from mobile to desktop
- **Modern UI Components** - Clean interfaces with subtle animations
- **Fast Performance** - Optimized build with Vite for quick loading times
- **Docker Support** - Easy deployment with containerization

## 🛠️ Technology Stack

- **React 19** - Latest React version for UI development
- **Vite 6** - Next-generation frontend tooling
- **TailwindCSS 4** - Utility-first CSS framework
- **React Router 7** - For seamless navigation
- **Docker** - Containerization for consistent deployment

## 🚀 Getting Started

### Development Environment

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to see the application in development mode.

### Docker Deployment

For containerized deployment, refer to the `DOCKER_README.md` file or run:

```bash
# Build and start with Docker Compose
docker-compose up -d
```

The application will be available at `http://localhost:80`.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── assets/       # Images, icons, and other static files
│   ├── components/   # Reusable UI components
│   │   └── sections/ # Page section components
│   ├── pages/        # Individual page components
│   ├── App.jsx       # Application root component
│   └── main.jsx      # Entry point
├── public/           # Public assets
├── docker-compose.yml
├── Dockerfile
├── nginx.conf        # Nginx configuration for Docker deployment
└── tailwind.config.js
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🔒 License

This project is private property. Unauthorized copying, modification, or distribution is prohibited without express permission.

---

> Designed and developed with ❤️ using modern web technologies.
