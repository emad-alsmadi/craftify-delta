# Craftify Monorepo Setup Guide

This guide will help you set up and work with the Craftify Templates Marketplace monorepo structure.

## Architecture Overview

```
craftify-templates-marketplace/
├── apps/
│   ├── website/        # Next.js frontend (port 3001)
│   ├── dashboard/      # React + Vite admin dashboard (port 3002)
│   └── backend/        # Express.js backend API (port 3000)
├── packages/
│   ├── ui/             # Shared UI components
│   ├── types/          # Shared TypeScript types
│   └── api-client/     # Shared API client
├── package.json        # Root package.json with workspace configuration
└── pnpm-workspace.yaml # PNPM workspace configuration
```

## Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- MongoDB database (local or MongoDB Atlas)

## Installation

### 1. Install Package Manager (if using pnpm)

```bash
npm install -g pnpm
```

### 2. Install Dependencies

From the root directory:

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

This will install dependencies for all packages and applications in the monorepo.

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
MONGO_URL=mongodb://localhost:27017/craftify_templates
DB_NAME=craftify_templates

# JWT Configuration
JWT_SECRET_KEY=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FROM_EMAIL=noreply@craftify.com
FROM_NAME=Craftify Templates

# Frontend URLs
FRONTEND_URL=http://localhost:3001
DASHBOARD_URL=http://localhost:3002

# API URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Development

### Start All Services

```bash
# Start all applications (website, dashboard, backend)
pnpm dev

# Or using npm
npm run dev
```

This will start:
- Backend API on http://localhost:3000
- Next.js Website on http://localhost:3001
- React Dashboard on http://localhost:3002

### Start Individual Services

```bash
# Start backend only
pnpm dev:backend

# Start website only
pnpm dev:website

# Start dashboard only
pnpm dev:dashboard
```

### Start Backend Only

```bash
cd apps/backend
pnpm dev
```

## Building

### Build All Applications

```bash
pnpm build
```

### Build Individual Applications

```bash
# Build website
pnpm build:website

# Build dashboard
pnpm build:dashboard
```

## Shared Packages

### @craftify/types

Shared TypeScript types and interfaces used across all applications.

**Location:** `packages/types/`

**Usage:**
```typescript
import { User, Template, Order } from '@craftify/types'
```

### @craftify/ui

Shared UI components built with Radix UI primitives and TailwindCSS.

**Location:** `packages/ui/`

**Usage:**
```typescript
import { Button, Card, Dialog } from '@craftify/ui'
```

### @craftify/api-client

Shared API client with Axios interceptors for authentication and error handling.

**Location:** `packages/api-client/`

**Usage:**
```typescript
import { authApi, templateApi, orderApi } from '@craftify/api-client'
```

## Dashboard Features

The admin dashboard includes:

- **Dashboard Overview**: Statistics and analytics
- **User Management**: View and manage users
- **Template Management**: Manage templates and creators
- **Order Management**: View and process orders
- **Settings**: Configure dashboard settings

### Dashboard Tech Stack

- React 19 with TypeScript
- Vite for fast development
- React Router for navigation
- TanStack Query for data fetching
- Framer Motion for animations
- TailwindCSS for styling
- Lucide React for icons
- Recharts for data visualization

## Website Features

The main website includes:

- Template browsing and filtering
- Creator profiles
- Shopping cart and checkout
- User authentication
- Order management

### Website Tech Stack

- Next.js 16 with App Router
- React 19 with TypeScript
- TanStack Query for data fetching
- Zustand for state management
- Framer Motion for animations
- TailwindCSS for styling
- Radix UI components

## Backend Features

The backend API includes:

- RESTful API endpoints
- JWT authentication
- MongoDB integration with Mongoose
- Email services with Nodemailer
- Role-based access control

### Backend Tech Stack

- Node.js 18+
- Express.js 5.x
- MongoDB with Mongoose
- JWT authentication
- Joi validation

## Deployment

### Backend Deployment (Railway/Heroku)

1. Connect your repository to Railway/Heroku
2. Configure environment variables
3. Set MongoDB connection string
4. Deploy

### Website Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Dashboard Deployment (Vercel/Netlify)

1. Build the dashboard: `pnpm build:dashboard`
2. Deploy the `apps/dashboard/dist` folder to your hosting provider
3. Configure environment variables

## Troubleshooting

### Dependencies Not Found

If you see errors about missing dependencies:

```bash
# Clear node_modules and reinstall
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

### TypeScript Errors

If you see TypeScript errors about workspace references:

```bash
# Build types package first
cd packages/types
pnpm build

# Or use tsc to check types
pnpm type-check
```

### Port Already in Use

If a port is already in use, you can change the port in the respective application's configuration:

- Backend: `apps/backend/app.js`
- Website: `apps/website/package.json` (dev script)
- Dashboard: `apps/dashboard/vite.config.ts`

## Best Practices

1. **Shared Code**: Always use shared packages for code that needs to be shared between applications
2. **Types**: Define types in `@craftify/types` and import them in other packages
3. **UI Components**: Extract reusable UI components to `@craftify/ui`
4. **API Calls**: Use the shared `@craftify/api-client` for all API calls
5. **Consistent Styling**: Use TailwindCSS and follow the existing design system
6. **Code Quality**: Run linting before committing: `pnpm lint`

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues or questions, please create an issue in the repository.
