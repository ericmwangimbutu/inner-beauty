## Inner Beauty Portfolio

A modern React + Tailwind portfolio for Inner Beauty Salon with a lightweight PHP backend for services, products, testimonials, and booking requests.

### Stack
- **Frontend:** React (Vite) + Tailwind CSS, custom components and data fetching hooks.
- **Backend:** PHP micro API serving JSON resources and persisting booking requests.

### Getting Started

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
The app runs at `http://localhost:5173`.

#### Backend
```bash
cd backend
php -S localhost:8080 -t api
```
This exposes the API at `http://localhost:8080/index.php`. You can point the frontend by creating `.env` in `frontend`:
```
VITE_API_BASE_URL=http://localhost:8080/index.php
VITE_GEMINI_MODEL=gemini-2.5-flash-preview-09-2025 # optional
```

> AI helpers call the backend proxy, so no Gemini key is exposed in the browser. Override `VITE_GEMINI_MODEL` if you want a different default on the client.

##### XAMPP + MySQL setup
1. Launch XAMPP Control Panel and start **Apache** and **MySQL**.
2. Create a database named `inner_beauty` (or set a custom name via environment variables below).
3. The API auto-creates a `bookings` table the first time it receives a booking.
4. Optional environment overrides for the PHP API:
   - `DB_HOST` (default `127.0.0.1`)
   - `DB_PORT` (default `3306`)
   - `DB_NAME` (default `inner_beauty`)
   - `DB_USER` (default `root`)
   - `DB_PASSWORD` (default empty)
   Set them in your system environment or in the Apache environment block.

##### AI proxy environment
- Set `GEMINI_API_KEY` on the backend host (PowerShell `$env:GEMINI_API_KEY`, Apache `SetEnv`, etc.).
- Optional: set `GEMINI_MODEL` to force a specific default on the server (falls back to `gemini-2.5-flash-preview-09-2025`).
- Restart the PHP server after updating variables. The frontend automatically uses `?resource=ai` for all prompts.

### API Routes
- `GET ?resource=services`
- `GET ?resource=products`
- `GET ?resource=testimonials`
- `POST ?resource=bookings` – persists booking payloads to `backend/storage/bookings.json`.
- `POST ?resource=ai` – backend proxy for Google Gemini (requires `GEMINI_API_KEY`). Payload: `{"prompt":"...", "model":"gemini-1.5-flash"}`.

### Features
- Hero, services grid (manicure, pedicure, facials, scrubbing, gel, braids, knotless, Ghanaian, sisterlocks restoration & retire, cornrows, twistouts, dreadlocks retire).
- Gallery, product showcase, testimonials, remote + wedding CTAs.
- Booking form with API integration and graceful offline fallbacks.

