# TinyLink - Take Home Assignment (Node.js + Express + Postgres)

## What to submit
1. Deployed public URL (where the app is running).
2. GitHub repo URL with this project.
3. Short video walkthrough (2-5 minutes) showing create, redirect, delete, health.
4. LLM transcript if used.

## Quick start (local)
1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Run migrations: `npm run migrate` (requires psql CLI and DATABASE_URL).
3. Install deps: `npm install`
4. Start dev: `npm run dev`
5. Visit `http://localhost:3000`

## API endpoints
- `GET /healthz` - health check
- `POST /api/links` - create link
- `GET /api/links` - list links
- `GET /api/links/:code` - get single link stats
- `DELETE /api/links/:code` - delete link
- `GET /:code` - redirect (302) and increment clicks

## Notes
- Codes must match regex `[A-Za-z0-9]{6,8}`.
- Duplicate code on POST returns 409.
- Redirect increments clicks and updates last_clicked atomically.
