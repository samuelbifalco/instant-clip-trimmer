# ClipCut - Video Trimming Application

## Overview

ClipCut is a modern, browser-based video trimming application built with React and Express.js. The application provides a professional video editing interface that allows users to trim videos locally in their browser without uploading files to any server, ensuring complete privacy and security.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and CSS variables
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: React Router for client-side navigation
- **Error Handling**: Custom ErrorBoundary components with comprehensive error reporting

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: PostgreSQL-based session storage with connect-pg-simple
- **Development**: Hot reload with Vite middleware integration
- **Build System**: ESBuild for server-side bundling

### Client-Server Communication
- **API Design**: RESTful API with /api prefix for all endpoints
- **Data Validation**: Zod schemas shared between client and server
- **Error Handling**: Centralized error middleware with structured error responses
- **Logging**: Request/response logging with performance metrics

## Key Components

### Video Processing
- **Local Processing**: All video operations happen client-side using Web APIs
- **File Validation**: Comprehensive file type and size validation (500MB limit)
- **Supported Formats**: MP4, AVI, MOV, MKV, WebM, M4V, 3GP
- **Video Controls**: Custom video player with timeline scrubbing, play/pause, volume control

### User Interface
- **Design System**: Dark theme with gradient accents and glassmorphism effects
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Optimized loading states and error boundaries

### Analytics & Monitoring
- **Error Reporting**: Comprehensive error tracking with context and stack traces
- **Performance Monitoring**: Memory usage tracking and performance metrics
- **Health Checks**: Browser compatibility and feature support validation
- **User Analytics**: Privacy-conscious analytics with explicit consent

### Privacy & Security
- **Local Processing**: Videos never leave the user's device
- **Privacy Banner**: GDPR-compliant consent management
- **Security Headers**: XSS protection, content type validation, frame options
- **No Upload Required**: Direct file processing without server uploads

## Data Flow

1. **File Upload**: User selects video file via drag-and-drop or file picker
2. **Validation**: Client-side validation of file type, size, and format
3. **Processing**: Video loaded into HTML5 video element for playback
4. **Editing**: User trims video using timeline controls and preview
5. **Export**: Processed video segments prepared for download
6. **Analytics**: Optional usage tracking with user consent

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation
- **File Handling**: react-dropzone for drag-and-drop file uploads
- **Carousel**: Embla Carousel for image/video carousels

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Session Storage**: connect-pg-simple for PostgreSQL sessions
- **Validation**: Zod for runtime type checking
- **Development**: tsx for TypeScript execution in development

### Build & Development
- **Package Manager**: npm with lock file for consistent dependencies
- **TypeScript**: Strict configuration with path aliases
- **Linting**: ESNext modules with DOM libraries
- **Bundling**: Vite for client, ESBuild for server

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module
- **Development Server**: Runs on port 5000 with hot reload
- **Build Process**: Parallel workflow for frontend and backend

### Production Build
- **Frontend**: Static assets built to `dist/public`
- **Backend**: Server bundled to `dist/index.js`
- **Deployment**: Autoscale deployment target on Replit
- **Environment**: Production mode with optimized builds

### Database Configuration
- **Schema**: Defined in `shared/schema.ts` with Drizzle
- **Migrations**: Generated in `./migrations` directory
- **Connection**: Environment-based DATABASE_URL configuration
- **Type Safety**: Full TypeScript integration with inferred types

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 24, 2025. Initial setup