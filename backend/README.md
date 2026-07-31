# Backend Setup

This backend is an Express.js service with Prisma ORM and authentication routes.

## Prerequisites

Make sure you have the following installed:

- Node.js 18 or newer
- npm 9 or newer
- PostgreSQL database

## Installation

1. Open a terminal in the backend folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend folder and add the required environment variables:

   ```env
   PORT=3001
   NODE_ENV=development
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
   DIRECT_URL=postgresql://<user>:<password>@<host>:<port>/<database>
   ```

4. Generate the Prisma client and apply migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

## Running the backend

Start the backend in development mode:

```bash
npm run dev
```

The server will run on:

```text
http://localhost:3001
```

## API Overview

The main API entry point is mounted at `/api/auth`.

Available routes:

- `POST /api/auth` — create a new user
- `GET /api/auth` — authenticate a user with email and password

## Common issues

- If you see `module not found` errors, run `npm install` again.
- If the port is already in use, change the `PORT` value in your `.env` file.
- If Prisma throws connection errors, verify your `DATABASE_URL` and `DIRECT_URL` values.
- If the Prisma client is missing, run `npx prisma generate`.

## Notes

- The app entry point is `src/index.js`.
- The main app setup lives in `src/app.js`.
- Prisma models are defined in `prisma/schema.prisma`.
