# ClipCut - Professional Video Trimming Tool

## Project Overview
ClipCut is a modern, web-based video trimming application that allows users to edit videos directly in their browser. The project has been successfully migrated from Lovable to Replit with enhanced features including futuristic neon styling, Google AdSense integration, and improved video trimming functionality.

## Recent Changes
- **2025-01-23**: Successfully migrated from Lovable to Replit
- **2025-01-23**: Fixed video trimming logic - playhead now respects trim bounds
- **2025-01-23**: Enhanced UI with futuristic neon/cyber styling
- **2025-01-23**: Added Google AdSense integration with modal before download
- **2025-01-23**: Updated footer with Redcel brand link
- **2025-01-23**: Improved video seeking to enforce trim boundaries

## Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom cyber/neon effects
- **UI Components**: Radix UI primitives
- **Video Processing**: HTML5 Video API with Web APIs
- **File Handling**: react-dropzone for drag-and-drop uploads
- **State Management**: React hooks and local state

### Backend (Express.js)
- **Server**: Express.js with TypeScript
- **Development**: Vite for hot module replacement
- **Production**: Static file serving
- **Database**: PostgreSQL with Drizzle ORM (optional)

### Key Features
1. **Video Trimming**: Precise start/end time controls with real-time preview
2. **Browser-based Processing**: No server uploads - all processing client-side
3. **Futuristic UI**: Neon glow effects, holographic text, cyber grid backgrounds
4. **Google AdSense**: Strategic ad placements and pre-download modal
5. **Privacy First**: Files never leave user's device
6. **Format Support**: MP4, AVI, MOV, MKV, WebM, M4V, 3GP
7. **Responsive Design**: Works on desktop and mobile devices

### Security Features
- Content Security Policy headers
- XSS protection
- Frame options security
- HTTPS enforcement
- No file uploads to server
- Client-side validation

### Performance
- Lazy loading components
- Optimized video processing
- Memory leak prevention
- Error boundaries
- Health monitoring
- Analytics tracking

## User Preferences
- Design: Futuristic neon/cyber aesthetic with cyan and purple color scheme
- Brand: ClipCut as a Redcel brand with link to https://redcelventures.com
- Monetization: Google AdSense integration with respectful ad placement
- UX: Professional but engaging, fast and efficient workflow

## Deployment
- Platform: Replit Deployments
- Build: Vite production build
- Server: Express.js serving static files
- Port: 5000 (bound to 0.0.0.0 for Replit compatibility)

## Technical Fixes Applied
1. **Video Trimming Logic**: 
   - Playhead enforcement within trim bounds
   - Proper seeking with boundary checks
   - Auto-pause when reaching end time
   
2. **Export Functionality**:
   - Ad modal before download
   - Proper file naming with trim times
   - Error handling and user feedback

3. **UI Enhancements**:
   - Cyber/neon styling throughout
   - Animated backgrounds and effects
   - Consistent color scheme (cyan/purple)
   - Glass morphism effects

## Environment Setup
- Node.js 20
- PostgreSQL 16 (optional)
- Dependencies automatically managed via package.json