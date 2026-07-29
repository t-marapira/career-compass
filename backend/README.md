# Backend Setup

This README explains how to set up and run the backend locally.

## Prerequisites

Make sure you have the following installed:

- Node.js 18 or newer
- npm 9 or newer
- A database if your backend requires one

## Installation

1. Open a terminal in the backend folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an environment file:

   ```bash
   cp .env.example .env
   ```

   If there is no `.env.example`, create a `.env` file manually and add the required variables. A typical example looks like this:

   ```env
   PORT=5000
   NODE_ENV=development
   ```

   Add any other variables required by your app, such as database connection strings or API keys.

## Running the backend

Start the backend in development mode:

```bash
npm run dev
```

If your project uses a different script name, use the one defined in `package.json`.

To run the production build:

```bash
npm start
```

## Common issues

- If you get `module not found` errors, run `npm install` again.
- If the port is already in use, change the `PORT` value in your `.env` file.
- If you are missing environment variables, check your `.env` file and the app configuration.

## Notes

- The backend should be available at `http://localhost:<PORT>` by default.
- If you use a different package manager such as Yarn or pnpm, replace `npm` with the appropriate command.
