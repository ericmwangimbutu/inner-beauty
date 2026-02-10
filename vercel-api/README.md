# Inner Beauty — Vercel API (Neon Postgres)

This folder contains a minimal TypeScript serverless API scaffold for deployment on Vercel using Neon Postgres.

Quick steps:

1. Set Vercel secrets: `database_url` (DATABASE_URL) and `jwt_secret` (JWT_SECRET).
2. Deploy with Vercel. API routes are under `/api/*`.
3. Run migrations SQL files in `vercel-api/migrations/` against your Neon DB before using endpoints.

Local dev:

```bash
cd vercel-api
npm install
npm run dev
```

Notes:
- This scaffold includes basic JWT auth (register/login/me) and simple CRUD endpoints for users, products, services, testimonials.
- Extend validation, file uploads, and more advanced auth (OAuth, magic links) as needed.
