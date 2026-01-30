# RealTrust - Real Estate Solutions Platform

# Open in Chrome or FireFox Browsers for Correct Compiled website for Next.js 

A modern, full-stack real estate platform built with Next.js and Node.js/Express, offering comprehensive features for managing projects, clients, contacts, and subscribers.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture & Approach](#architecture--approach)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Project Locally](#running-the-project-locally)
- [Environment Configuration](#environment-configuration)
- [API Endpoints](#api-endpoints)
- [Frontend Routes](#frontend-routes)

---

## Overview

RealTrust is a comprehensive real estate management platform that enables:
- **Project Management**: Create and manage real estate projects
- **Client Management**: Track and manage client information
- **Contact Management**: Handle inquiries and communications
- **Subscriber Management**: Build and manage newsletter subscribers
- **Authentication**: Secure user authentication and authorization
- **File Uploads**: Support for image and document uploads with optimization

---

## Architecture & Approach

### Design Pattern
This project follows a **Client-Server Architecture** with clear separation of concerns:

```
Frontend (Next.js) ↔ API Gateway (Express) ↔ Database (Supabase)
```

### Backend Architecture
- **RESTful API**: Clean API endpoints for all resources
- **Modular Routes**: Organized routing system by feature (auth, projects, clients, contacts, subscribers)
- **Controller-Based Logic**: Business logic separated into dedicated controller files
- **Middleware Pipeline**: Authentication and error handling middleware for request processing
- **File Upload Handling**: Multer integration for file uploads with image optimization via Sharp

### Frontend Architecture
- **Component-Based UI**: Reusable React components for each section
- **SSR/SSG**: Next.js server-side rendering for better SEO and performance
- **TypeScript**: Type-safe development with full TypeScript support
- **Responsive Design**: Tailwind CSS for mobile-first responsive styling

### Authentication Flow
- Token-based authentication via Supabase
- Protected routes and API endpoints
- Secure credential management using environment variables

---

## Technologies Used

### Backend Stack
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | JavaScript runtime | Latest |
| **Express** | Web framework | 5.2.1 |
| **Supabase** | Backend-as-a-Service (Database) | 2.93.3 |
| **Multer** | File upload middleware | 2.0.2 |
| **Sharp** | Image processing/optimization | 0.34.5 |
| **CORS** | Cross-Origin Resource Sharing | 2.8.6 |
| **dotenv** | Environment variable management | 17.2.3 |
| **Nodemon** | Development server auto-reload | 3.1.11 |

### Frontend Stack
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | React framework with SSR | 16.1.6 |
| **React** | UI library | 19.2.3 |
| **TypeScript** | Type-safe JavaScript | 5 |
| **Tailwind CSS** | Utility-first CSS framework | 4 |
| **ESLint** | Code quality tool | 9 |

### Additional Tools
- **Git**: Version control
- **npm**: Package management
- **PostCSS**: CSS transformation tool

---

## Project Structure

```
flipr_project/
├── realtrust-backend/                 # Backend API server
│   ├── index.js                       # Entry point
│   ├── package.json                   # Backend dependencies
│   ├── .env                           # Environment variables (not in repo)
│   ├── config/
│   │   └── supabase.js                # Supabase configuration
│   ├── controllers/                   # Business logic
│   │   ├── authController.js
│   │   ├── clientsController.js
│   │   ├── contactsController.js
│   │   ├── projectsController.js
│   │   └── subscribersController.js
│   ├── routes/                        # API routes
│   │   ├── auth.js
│   │   ├── clients.js
│   │   ├── contacts.js
│   │   ├── projects.js
│   │   └── subscribers.js
│   ├── middleware/                    # Express middleware
│   │   ├── auth.js                    # Authentication middleware
│   │   └── errorHandler.js            # Global error handling
│   └── uploads/                       # File upload directory
│
├── realtrust-frontend/                # Next.js frontend
│   ├── package.json                   # Frontend dependencies
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── next.config.ts                 # Next.js configuration
│   ├── tailwind.config.ts             # Tailwind CSS configuration
│   ├── app/
│   │   ├── page.tsx                   # Home page
│   │   ├── layout.tsx                 # Root layout
│   │   ├── globals.css                # Global styles
│   │   ├── auth/
│   │   │   └── page.tsx               # Authentication page
│   │   ├── admin/                     # Admin dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   ├── clients/
│   │   │   ├── contacts/
│   │   │   ├── projects/
│   │   │   └── subscribers/
│   │   └── components/                # Reusable components
│   │       ├── Header.tsx
│   │       ├── HeroSection.tsx
│   │       ├── ProjectsSection.tsx
│   │       ├── ClientsSection.tsx
│   │       ├── ContactSection.tsx
│   │       ├── NewsletterSection.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── api.ts                     # API client utilities
│   │   ├── auth.ts                    # Authentication utilities
│   │   └── validation.ts              # Form validation
│   └── public/                        # Static assets
│       ├── icons/
│       └── shapes/
│
└── Design Assets/                     # UI/UX design files
    ├── Lead Generation Landing page (Icons)/
    ├── Lead Generation Landing page (Images)/
    └── Lead Generation Landing page (shapes)/
```

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Create free account](https://supabase.com/)

### Verify Installation
```powershell
node --version     # Should show v18+
npm --version      # Should show v9+
git --version      # Should show git version
```

---

## Installation & Setup

### 1. Clone the Repository (if applicable)
```powershell
cd C:\Users\Asus\Flipr_project
git clone <your-repo-url> .
```

### 2. Backend Setup

#### Install Dependencies
```powershell
cd realtrust-backend
npm install
```

#### Create Environment File
Create a `.env` file in the `realtrust-backend` directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

**To get Supabase credentials:**
1. Go to [Supabase Console](https://app.supabase.com/)
2. Create a new project or select existing one
3. Navigate to Settings → API
4. Copy `Project URL` and `anon public key`
5. Copy `service_role key` from the same page

### 3. Frontend Setup

#### Install Dependencies
```powershell
cd ..\realtrust-frontend
npm install
```

#### Create Environment File
Create a `.env.local` file in the `realtrust-frontend` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Supabase Configuration (if needed on frontend)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Running the Project Locally

### Option 1: Run Both Services Simultaneously (Using Two Terminal Windows)

#### Terminal 1 - Backend Server
```powershell
cd C:\Users\Asus\Flipr_project\realtrust-backend
npm run dev
```

**Expected Output:**
```
Server running on port 5000
```

#### Terminal 2 - Frontend Development Server
```powershell
cd C:\Users\Asus\Flipr_project\realtrust-frontend
npm run dev
```

**Expected Output:**
```
▲ Next.js 16.1.6
- Local: http://localhost:3000
- Environments: .env.local
```

### Option 2: Individual Commands

**Backend (Production Mode):**
```powershell
cd realtrust-backend
npm start
```

**Frontend (Production Build):**
```powershell
cd realtrust-frontend
npm run build
npm start
```

### Access the Application

- **Frontend**: Open [http://localhost:3000](http://localhost:3000) in your browser
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

## Environment Configuration

### Backend Environment Variables (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_URL` | Supabase project URL | `https://xxxx.supabase.co` |
| `SUPABASE_KEY` | Supabase anon public key | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for backend operations | `eyJhbGc...` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:3000` |

### Frontend Environment Variables (.env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | `eyJhbGc...` |

---

## API Endpoints

### Authentication
```
POST   /api/auth/login         - User login
POST   /api/auth/signup        - User registration
POST   /api/auth/logout        - User logout
GET    /api/auth/me            - Get current user
```

### Projects
```
GET    /api/projects           - List all projects
POST   /api/projects           - Create new project
GET    /api/projects/:id       - Get project details
PUT    /api/projects/:id       - Update project
DELETE /api/projects/:id       - Delete project
```

### Clients
```
GET    /api/clients            - List all clients
POST   /api/clients            - Create new client
GET    /api/clients/:id        - Get client details
PUT    /api/clients/:id        - Update client
DELETE /api/clients/:id        - Delete client
```

### Contacts
```
GET    /api/contacts           - List all contacts/inquiries
POST   /api/contacts           - Create new contact
GET    /api/contacts/:id       - Get contact details
PUT    /api/contacts/:id       - Update contact
DELETE /api/contacts/:id       - Delete contact
```

### Subscribers
```
GET    /api/subscribers        - List all subscribers
POST   /api/subscribers        - Add new subscriber
GET    /api/subscribers/:id    - Get subscriber details
DELETE /api/subscribers/:id    - Remove subscriber
```

---

## Frontend Routes

- `/` - Home page (Public)
- `/auth` - Authentication page (Public)
- `/admin/dashboard` - Dashboard (Protected)
- `/admin/projects` - Projects management (Protected)
- `/admin/clients` - Clients management (Protected)
- `/admin/contacts` - Contacts management (Protected)
- `/admin/subscribers` - Subscribers management (Protected)

---

## Development Workflow

### Code Quality
```powershell
# Run linter in frontend
cd realtrust-frontend
npm run lint
```

### Testing
```powershell
# Run tests (when configured)
npm test
```

### Building for Production

**Backend:**
```powershell
cd realtrust-backend
npm start
```

**Frontend:**
```powershell
cd realtrust-frontend
npm run build
npm start
```

---

## Troubleshooting

### Common Issues

#### 1. **Port Already in Use**
```powershell
# Kill process using port 5000 (backend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Kill process using port 3000 (frontend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

#### 2. **Supabase Connection Error**
- Verify `.env` file has correct Supabase credentials
- Check internet connection
- Ensure Supabase project is active

#### 3. **CORS Error**
- Verify `CORS_ORIGIN` in backend `.env` includes frontend URL
- Check that frontend URL matches exactly (including protocol)

#### 4. **Module Not Found**
```powershell
# Clear node_modules and reinstall
rm -r node_modules
npm install
```

#### 5. **Nodemon Not Working**
```powershell
# Install nodemon globally
npm install -g nodemon
```

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

---

## License

This project is licensed under the ISC License. See package.json for details.

---

## Support & Documentation

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Express.js Docs**: https://expressjs.com/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs

---

## Contact

For questions or support, please reach out to the development team.

---

**Last Updated**: January 30, 2026
