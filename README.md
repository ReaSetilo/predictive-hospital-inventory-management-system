# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- � In-app notification system
- 📖 [React Router docs](https://reactrouter.com/)

## Notification System

The application includes a comprehensive notification system built with `react-hot-toast` for displaying various types of notifications:

### Types of Notifications

- **Success**: Green notifications for successful operations
- **Error**: Red notifications for errors and failures
- **Warning**: Yellow notifications for warnings and alerts
- **Info**: Default notifications for general information

### Hospital-Specific Notifications

- **Low Stock Alerts**: Warn when inventory items fall below threshold
- **Expiry Alerts**: Notify when items are approaching expiry date
- **Order Confirmations**: Confirm successful order placements
- **Order Rejections**: Notify when orders are rejected with reasons

### Usage

```typescript
import { showSuccess, showError, showWarning, showLowStockAlert } from '~/lib/notifications';

// Basic notifications
showSuccess('Operation completed successfully!');
showError('Something went wrong!');
showWarning('Please check your input!');

// Hospital-specific notifications
showLowStockAlert('Paracetamol', 25, 50);
```

### Configuration

Notifications appear in the top-right corner with a default duration of 4 seconds. The system is configured in `app/root.tsx` with the `Toaster` component.

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
