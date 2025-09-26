# OceanChat Frontend (React + TypeScript)

Modern, minimalist chat UI with Ocean Professional theme (blue & amber accents). Includes landing/login, chat room with contacts sidebar, and profile/settings.

## Quick Start

- Copy `.env.example` to `.env` and set:
  - `REACT_APP_API_BASE_URL` (e.g., http://localhost:4000/api)
- Install and run:
  - `npm install`
  - `npm start`

## Scripts

- `npm start` — Start dev server
- `npm run build` — Production build
- `npm test` — Run tests (if added)

## Structure

- `src/App.tsx` — Routes and app shell
- `src/styles.css` — Global styling and Ocean theme
- `src/services/api.ts` — HTTP API helpers (placeholder endpoints)
- `src/pages/` — Pages: `LandingLogin`, `ChatRoom`, `Settings`
- `src/components/` — UI components: `NavBar`, `SidebarContacts`, `ChatWindow`

## Styling

- Ocean Professional color scheme:
  - Primary: #2563EB (blue)
  - Secondary: #F59E0B (amber)
  - Text: #111827
  - Background: #f9fafb
- Subtle shadows, rounded corners, gradients, smooth transitions.

## Notes

- API endpoints are placeholders; connect to your backend by setting `REACT_APP_API_BASE_URL`.
- Auth flows assume cookie-based or token-based sessions.
