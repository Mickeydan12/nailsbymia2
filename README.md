# NailsByMia
React + Vite + Tailwind client, Express + MongoDB + JWT API.

## Setup
1. `cd server && cp .env.example .env` — set `MONGODB_URI` and a long random `JWT_SECRET`.
2. `npm install && npm run seed && npm run dev` (API on :5000). Seed creates the admin, 8 services, 12 gallery items, 4 testimonials, settings.
3. `cd client && cp .env.example .env && npm install && npm run dev` (site on :5173).

## Admin
`/admin/login` — demo login `admin@nailsbymia.com` / `ChangeMe123!`. Change it by setting `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `server/.env` before running `npm run seed`.

## Production
`cd client && npm run build` and serve `dist/`; run the API with `npm start`. Reference-image uploads are saved to `server/uploads` (swap for Cloudinary/S3 in `routes/index.js`).
