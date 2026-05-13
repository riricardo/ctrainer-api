# C-Trainer API

Backend API for **C-Trainer**, a workout management and tracking application.  
This API is responsible for authentication, workout management, execution logs, and workout discovery.

---

## Overview

C-Trainer allows users to:

- Manage a personal workout library
- Create, update, delete, and copy workouts
- Discover public workouts
- Track workout execution logs
- Authenticate with Firebase Auth
- Store data in MongoDB

This repository contains **only the backend API**.  
The Flutter mobile app lives in a separate repository.

---

## Tech Stack

- Node.js
- TypeScript
- Express
- MongoDB with Mongoose
- Firebase Admin
- Swagger / OpenAPI
- Node test runner

## Architecture

The API is organized by feature modules:

```
src/
├── app/              # Express setup, routes, DI container, Swagger
├── config/           # Environment and logger config
├── infrastructure/   # MongoDB and Firebase adapters
├── middleware/       # Auth, validation, request id, error handler
├── modules/          # Auth, health, workouts, workout logs
└── shared/           # Shared errors, HTTP status, types, utilities
```

## API Routes

Swagger docs are available at `/docs` when `DOCS_ENABLED=true`.


```

## Getting Started

Install dependencies:

```bash
npm install
```

Run in development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Start compiled app:

```bash
npm start
```

## Roadmap

- Phase 0 - Initial setup
- v0.1 - Authentication and personal workouts
- v0.2 - Exercises
- v0.3 - Workout execution and logs
- v0.4 - Public workouts
- v0.5 - Media and workout details
- v0.6 - Offline support
- v1.0 - Public beta

## License

MIT
