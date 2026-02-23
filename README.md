# Therapist Finder (React + FastAPI)

Full-stack web app for discovering therapists in a chosen city, viewing them on a map, tracking your history, managing “my therapists”, and exchanging in‑app messages. The stack is **React + Vite + TypeScript** on the frontend and **FastAPI + Postgres** on the backend.

> Note: Therapist data in this project is intended to be seeded from the **Yelp Open Dataset on Kaggle**. The dataset itself is **not** included in the repo.

---

## Features

- **Authentication**: Signup, login, logout (JWT access + refresh tokens).
- **City + therapist search**: Choose a city and search therapists; see results on a map (OpenStreetMap via Leaflet).
- **History**: See previously searched terms and viewed therapists.
- **My Therapists**: Track which therapists you are currently seeing or have seen in the past.
- **Messaging**: Async in‑app messaging between users and therapist accounts.
- **Dark / Light mode**: Toggle theme, persisted in `localStorage`.

> Some endpoints/pages may still be under active development depending on how far you are through the to‑dos.

---

## Project structure

```text
therapist-finder/
  backend/        # FastAPI app, DB models, Alembic, importer scripts
  frontend/       # React + Vite + TS frontend
  docker-compose.yml
```

Key backend pieces (by convention):

- `backend/app/main.py` – FastAPI entrypoint (`/health`, API routers).
- `backend/app/core/config.py` – Settings (DB URL, JWT secrets, etc.).
- `backend/app/db/session.py` – SQLAlchemy engine/session and base.
- `backend/requirements.txt` – Python dependencies.
- `backend/.env.example` – Example backend configuration.

Key frontend pieces:

- `frontend/src/main.tsx` – App bootstrap (React Query, Router, theming).
- `frontend/src/App.tsx` – Routes and top-level layout.
- `frontend/src/components/layout/AppShell.tsx` – App bar, navigation, theme toggle.
- `frontend/src/theme/ThemePreferenceContext.tsx` – Dark/light theme state.
- `frontend/vite.config.ts` – Vite configuration.
- `frontend/.env.example` – Example frontend configuration.

---

## Prerequisites

You can run the stack either with **Docker** or with **local runtimes**.

### Option A: Using Docker (recommended)

- Docker Desktop installed and running.

### Option B: Local runtimes

- **Python 3.11+**
- **Node.js 18+** and npm or pnpm
- A running **Postgres 16** instance (local or container)

---

## Quick start with Docker

From the project root (`therapist-finder`):

1. **Create backend `.env` file**

   ```powershell
   cd backend
   copy .env.example .env
   cd ..
   ```

   The default values are fine for local Docker usage (they expect the DB service from `docker-compose.yml`).

2. **Create frontend `.env` file**

   ```powershell
   cd frontend
   copy .env.example .env
   cd ..
   ```

3. **Start all services**

   ```powershell
   docker compose up --build
   ```

4. **Open in the browser**

   - Frontend: `http://localhost:5173`
   - Backend health: `http://localhost:8000/health`

When you are done, stop with `Ctrl + C` in the terminal and optionally run:

```powershell
docker compose down
```

---

## Running without Docker (dev mode)

### 1. Backend (FastAPI)

From the project root:

```powershell
cd backend
copy .env.example .env
pip install -r requirements.txt

# Make sure Postgres is running and DATABASE_URL in .env points to it,
# then run the API server:
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend (React + Vite)

In a separate terminal:

```powershell
cd frontend
copy .env.example .env
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

Then open `http://localhost:5173` in your browser.

---

## Seeding therapist data from Kaggle (Yelp Open Dataset)

> The importer script and full endpoints may not be fully wired up yet; this describes the intended flow.

1. **Download the Yelp Open Dataset** from Kaggle (search for “Yelp Open Dataset” on Kaggle).
2. Extract `business.json` (and any other required files) into:

   ```text
   backend/data/yelp/
   ```

3. Run the importer script (once implemented) to populate Postgres:

   ```powershell
   cd backend
   python scripts/import_yelp_dataset.py
   ```

The script will:

- Filter businesses with mental health / therapy related categories.
- Insert them into the `therapists` table with coordinates and city metadata.

---

## Development notes

- **Auth**: The backend uses JWTs for auth. The frontend should store the access token in memory (or secure storage) and call refresh when needed.
- **CORS**: The backend is configured to allow `http://localhost:5173` (and currently `*` during development).
- **Dark / light mode**: The toggle in the header updates an MUI theme and persists the choice in `localStorage` under `therapist_finder_theme_mode`.

---

## GitHub usage

Typical workflow:

```powershell
git status           # See changes
git add .            # Stage
git commit -m "Describe your change"
git push             # Push to GitHub
```

Ensure that you **never commit** real `.env` files or Kaggle dataset files; keep them local only. Use the provided `.env.example` files as templates for others.

