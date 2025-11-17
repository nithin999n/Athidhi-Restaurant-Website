# Athidhi Family Restaurant - Dependencies

## Installation

To install all dependencies, run:
```bash
npm install
```

## Running the Project

**Development mode:**
```bash
npm run dev        # Start frontend (Vite dev server)
npm run server     # Start backend (Express API)
```

**Production build:**
```bash
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## Frontend Dependencies

### Core Framework
- **react** (^18.2.0) - JavaScript library for building user interfaces
- **react-dom** (^18.2.0) - React package for working with the DOM

### Routing
- **wouter** (^3.0.0) - Lightweight routing library for React (alternative to React Router)

### Forms
- **react-hook-form** (^7.48.2) - Performant form validation and handling

### UI & Styling
- **lucide-react** (^0.294.0) - Beautiful icon library
- **tailwindcss** (^3.3.6) - Utility-first CSS framework
- **class-variance-authority** (^0.7.0) - For creating variant-based component styles
- **clsx** (^2.0.0) - Utility for constructing className strings
- **tailwind-merge** (^2.1.0) - Merge Tailwind CSS classes without conflicts

---

## Backend Dependencies

### Server Framework
- **express** (^4.18.2) - Fast, minimalist web framework for Node.js
- **cors** (^2.8.5) - Enable Cross-Origin Resource Sharing

### Database
- **pg** (^8.11.3) - PostgreSQL client for Node.js

### Security
- **bcryptjs** (^2.4.3) - Password hashing library for admin authentication

---

## Development Dependencies

### TypeScript
- **typescript** (^5.3.3) - TypeScript language
- **@types/react** - Type definitions for React
- **@types/react-dom** - Type definitions for React DOM
- **@types/express** - Type definitions for Express
- **@types/cors** - Type definitions for CORS
- **@types/pg** - Type definitions for PostgreSQL
- **@types/bcryptjs** - Type definitions for bcryptjs

### Build Tools
- **vite** (^5.0.8) - Next-generation frontend build tool
- **@vitejs/plugin-react** (^4.2.1) - Official Vite plugin for React
- **tsx** (^4.7.0) - TypeScript execute for running backend in development

### CSS Processing
- **postcss** (^8.4.32) - Tool for transforming CSS
- **autoprefixer** (^10.4.16) - PostCSS plugin to add vendor prefixes

---

## System Requirements

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **PostgreSQL**: v14 or higher (for production database)

---

## Notes

- In development, the project uses in-memory storage
- For production, configure PostgreSQL connection in `server/db.ts`
- All dependencies are automatically managed by npm
- TypeScript provides type safety across the entire stack
