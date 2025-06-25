# ClipCut - Professional Video Trimming Tool

## Project Overview
ClipCut is a browser-based video trimming application that allows users to trim and edit videos completely client-side. The application features a futuristic neon design with cyber-themed styling, Google AdSense integration, and production-ready functionality.

## Recent Changes
- **2025-06-25**: Disabled Vite runtime error overlay for cleaner development experience
- **2025-06-25**: Implemented comprehensive AdSense error suppression system
- **2025-01-24**: Successfully migrated from Lovable to Replit
- **2025-01-24**: Fixed video trimming functionality - playhead now respects trim bounds
- **2025-01-24**: Added futuristic neon styling with toned-down effects for readability
- **2025-01-24**: Integrated Google AdSense with modal ads before download
- **2025-01-24**: Updated footer with Redcel branding and proper copyright
- **2025-01-24**: Applied cyber-themed styling throughout the application
- **2025-01-24**: Completely redesigned video editor with stunning, readable interface
- **2025-01-24**: Enhanced button readability and created beautiful gradient designs
- **2025-01-24**: Implemented gorgeous slider styling with perfect visibility

## Project Architecture

### Frontend
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom cyber/neon effects
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React hooks
- **Video Processing**: Web APIs (HTML5 video element)

### Backend
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL storage
- **API**: RESTful endpoints with /api prefix

### Key Features
- **Video Trimming**: Client-side video trimming with precise start/end time controls
- **Playhead Constraints**: Video playback respects trim boundaries
- **Export Functionality**: Downloads trimmed video segments
- **AdSense Integration**: Strategically placed ads and pre-download modals
- **Futuristic Design**: Cyber-themed UI with neon effects and glassmorphism
- **Privacy-First**: All processing happens client-side

### Security & Privacy
- **Client-Side Processing**: Videos never leave the user's device
- **Privacy Banner**: GDPR-compliant consent management
- **Security Headers**: XSS protection, content type validation, frame options
- **No Upload Required**: Direct file processing without server uploads

## User Preferences
- Prefers futuristic, neon-themed design aesthetics but with excellent readability
- Values clean, simple, and beautiful interfaces that are easy to use
- Wants the most amazing design possible for the video editor
- Wants Google AdSense integration for monetization
- Requires production-ready, secure implementation
- Emphasizes that buttons and text must be readable

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **File Handling**: react-dropzone for drag-and-drop file uploads
- **Routing**: React Router DOM for navigation
- **Analytics**: Custom analytics implementation

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Session Storage**: connect-pg-simple for PostgreSQL sessions
- **Validation**: Zod for runtime type checking
- **Development**: tsx for TypeScript execution in development

## Deployment Configuration
- **Platform**: Replit with autoscale deployment
- **Build**: Vite for frontend, esbuild for backend
- **Port**: 5000 (serves both API and static files)
- **Environment**: Production-ready with proper error handling

## Current Status
✅ Migration completed successfully
✅ Video trimming functionality working correctly
✅ Futuristic design implemented with readable styling
✅ Google AdSense integration added
✅ Footer updated with proper branding
✅ Production-ready deployment configuration
✅ Console error filtering implemented for clean development experience