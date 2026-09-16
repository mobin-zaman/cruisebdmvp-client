# CruiseBD MVP — Web Client

Frontend for the CruiseBD MVP: a river-cruise ticket booking app for travel
agents in Bangladesh. Agents sign in, check live seat availability across
cruise operators, book seats, and download the issued ticket PDFs.

Built with [Next.js](https://nextjs.org) and [Firebase](https://firebase.google.com)
Authentication, talking to the CruiseBD booking API.

## Features

- **Agent sign-in** — Firebase email/password authentication (session-persisted);
  the ID token is stored as a cookie for API calls
- **Booking flow** — select a ship, route and departure date, view live seat
  availability, and book seats
- **Ticket confirmation** — view and download issued tickets
- **Ticket history** — every ticket you've purchased

## Tech stack

- Next.js 9 / React 16
- Firebase JS SDK (auth), `nookies` (cookie-based token storage)
- Semantic UI React + semantic-ui datepickers
- Axios (API calls), `nprogress` (route progress bar)

## Requirements

- Node.js 12+
- A running instance of the CruiseBD booking API (the backend service) —
  configure its URL in `api-service/base-url.js`
- A Firebase web app whose project matches the backend's Firebase project

## Setup

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

2. **Point at the API**

   Edit the `BASE_URL` in `api-service/base-url.js` to your backend's URL:

   ```js
   export const BASE_URL = "http://localhost:4000";
   ```

3. **Firebase config**

   Set your own Firebase web-app configuration in `firebase/firebase-client.js`
   (`apiKey`, `authDomain`, etc.). The project's settings shown there are an
   example — replace them with your own before deploying.

## Running

```bash
npm run dev       # development server
npm run build     # production build
npm start         # serve the production build
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Project layout

- `pages/` — routes (login, booking, check-seat, confirm, ticket-history)
- `api-service/` — thin Axios wrappers over the booking API
- `firebase/` — Firebase client initialization
- `context/` — React auth context (ID-token cookie handling)
- `components/`, `custom-hooks/` — shared UI and logic

## Notes

- The app is designed to be used in an incognito/private browser window.

## Related repositories

- [**cruisebdmvp**](https://github.com/mobin-zaman/cruisebdmvp) — the CruiseBD
  Booking API backend (NestJS) that this client talks to. It exposes the
  `/booking/*` endpoints consumed by the `api-service/` wrappers.

## License

UNLICENSED — private project. See `package.json`.