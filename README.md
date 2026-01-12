# GigFlow - Frontend

GigFlow is a modern freelancing marketplace platform that connects clients with skilled freelancers. This repository contains the frontend application, built with **Vite + React** and strictly typed with **TypeScript**. It offers a seamless user experience with real-time updates, secure authentication, and a responsive design.

**🌐 Live Demo:** [https://gigflow.brandure.online/](https://gigflow.brandure.online/)

## 🚀 Technologies Used

The project leverages a robust modern tech stack to ensure performance, scalability, and developer experience:

- **Build Tool**: [Vite](https://vitejs.dev/)
- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Real-time Communication**: [Socket.io Client](https://socket.io/)
- **Form Handling**: [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) (Icons), [Sonner](https://sonner.emilkowal.ski/) (Toasts)
- **Utilities**: [Date-fns](https://date-fns.org/), [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)

## ✨ Core Features

### 🔐 Authentication & Security

- **Secure Login & Signup**: Implemented using HTTP-only cookies for enhanced security.
- **Protected Routes**: Middleware to restrict access to authenticated users only.
- **Persistent Sessions**: Seamless session handling to keep users logged in across reloads.

### 🏢 Gig Marketplace

- **Browse & Search**: Users can explore available gigs with advanced filtering.
- **Gig Details**: Comprehensive view of gig requirements and budget.
- **Bidding System**: Freelancers can apply (bid) for gigs directly.
- **Real-time Updates**: Immediate reflection of changes in the UI.

### 💼 Client Dashboard

- **Post Gigs**: Easy-to-use interface for clients to create new job listings.
- **Bid Management**: View and evaluate bids from freelancers.
- **Hiring Workflow**:
  - Hire freelancers with a single click.
  - **Atomic Hiring**: Ensures reliability and prevents multiple hires for the same slot.
- **Status Tracking**: Monitor the progress of open and active gigs.

### 🔔 Real-time Notifications

- **WebSockets**: Powered by Socket.io for instant alerts.
- **Email Integration**:
  - Notifications sent when a freelancer applies.
  - Alerts sent upon hiring.

### ⚡ Reliability & UX

- **Atomic Operations**: Robust handling of critical actions like hiring.
- **Feedback States**: Proper loading indicators, error handling, and empty states.
- **Responsive Design**: Fully optimized for various screen sizes.

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd gig-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Environment Setup

Create a `.env` file in the root directory and add the necessary environment variables.
_(Example configuration - adjust based on your backend setup)_

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To build the application for production deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```bash
src/
├── assets/         # Static assets (images, fonts)
├── components/     # Reusable UI components
├── context/        # React Context (if applicable)
├── hooks/          # Custom React hooks
├── layout/         # Layout wrapper components
├── pages/          # Page components (routed views)
├── redux/          # Redux store, slices, and services
├── services/       # API service functions (Axios setup)
├── types/          # TypeScript definitions
├── utils/          # Helper functions
└── App.tsx         # Main application entry point
```

## 📄 License

This project is licensed under the MIT License.
