# C-Trainer API

Backend API for **C-Trainer**, a workout management and tracking application.  
This API is responsible for authentication, workout management, execution logs, and workout discovery.

---

## Overview

C-Trainer allows users to:

- Manage a personal workout library
- Create and edit workouts and exercises
- Execute workouts step by step
- Track workout history and progress
- Discover and copy public workouts
- Authenticate using Google Sign-In (Firebase Auth)
- Store data in MongoDB via a Node.js + Express API

This repository contains **only the backend API**.  
The Flutter mobile app lives in a separate repository.

---

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- Firebase Authentication
- dotenv

---

## Architecture

```
.
├── index.js
├── src/
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   └── services/
├── .env.example
└── package.json
```

---

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`.

### Running

```bash
npm run dev
```

---

## Roadmap

See the project roadmap for detailed version goals:

- Phase 0 – Initial setup
- v0.1 – Authentication & personal workouts
- v0.2 – Exercises
- v0.3 – Workout execution & logs
- v0.4 – Public workouts
- v0.5 – Media & details
- v0.6 – Offline support
- v1.0 – Public beta

---

## License

MIT
