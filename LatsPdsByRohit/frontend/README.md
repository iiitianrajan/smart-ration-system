# Frontend

This folder is now your website frontend workspace for a MERN project.

## Stack

- React
- Vite
- JavaScript
- MERN-ready frontend structure

## Available commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Backend integration

- Development requests to `/api` are proxied to `http://localhost:5000`
- You can override the API base URL with `VITE_API_BASE_URL`

## Suggested MERN layout

- `frontend/` for React UI
- `backend/` for Express and MongoDB logic
- shared API routes exposed from backend under `/api`
