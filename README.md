# Pick Me Ups

Mobile-first React + TypeScript + Vite site for the UIC Counseling Center's **Pick Me Ups** mailbox. Students answer a quick question about the Counseling Center; a correct answer reveals the 6-digit code for the physical mailbox keypad.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173 (demo flow, code 676767)
npm run build      # production build in dist/
npm run preview    # serve the build locally
```

With no `VITE_API_BASE_URL` set, the site runs the **demo flow**: answers are checked in the browser and the demo code `676767` is shown. No real PIN exists in the frontend.

## Production flow (real PIN)

The real PIN must only come from a server after it validates the answer.

1. Start the reference API (`server/index.mjs`, no dependencies):
   ```bash
   MAILBOX_PIN=123456 npm run server          # http://localhost:8787
   ```
   or create `server/pin.txt` containing the PIN (ignored by git).
2. Point the frontend at it in `.env` (copy `.env.example`):
   ```
   VITE_API_BASE_URL=https://your-api.example.edu
   ```
   During `npm run dev`, `/api` is also proxied to `localhost:8787`, so `VITE_API_BASE_URL=` (empty) + the proxy works too if you set `VITE_API_BASE_URL=http://localhost:5173`.
3. Rebuild: `npm run build`.

The API contract is `POST /api/pick-me-ups/submit` with `{ "questionId": string, "answer": string }`, returning `{ "correct": true, "code": "123456" }` or `{ "correct": false }`. Any backend (Express, Cloudflare Worker, Netlify Function, etc.) that matches this contract works; see `src/services/pickMeUpService.ts`.

## Updating the mailbox PIN (staff)

When the physical keypad PIN changes:

- **Env var:** set `MAILBOX_PIN` on the host (Render, Railway, Fly, etc.) and redeploy/restart, **or**
- **File:** edit `server/pin.txt` on the server. It is re-read on every request, so no restart is needed.

Never put the real PIN in `src/` or in `.env` files starting with `VITE_` (those are bundled into the public site).

## Editing content

- Questions and accepted answers: `shared/questions.json` (used by both the browser demo and the server). Matching is case-insensitive and ignores punctuation; an answer counts if it *contains* any accepted phrase (e.g. "the uic counseling center!" matches "counseling center"). Several questions can be listed; one is picked at random on each visit.
- Titles, intro text, reminder messages (random per success), How-it-works labels, footer link + credits, demo code: `src/config/site.ts`.
- Footer link: set `footer.linkHref` to the Counseling Center resources page.

## Deploying the frontend

`npm run build` outputs static files to `dist/`. Deploy to any static host (Netlify, Vercel, GitHub Pages, campus web server). Set `VITE_API_BASE_URL` as a build-time environment variable on the host when using the production API, and set `ALLOWED_ORIGIN` on the API to the site's origin.

## Project layout

```
shared/questions.json        questions + accepted answers (frontend + server)
src/config/site.ts           all copy, reminders, links, demo code
src/services/                answer normalisation, demo + API services
src/components/              Header, Footer, ArchedTitle, Mailbox, Shapes,
                             QuestionCard, HowItWorks, HomeScreen, SuccessScreen
server/index.mjs             reference API that returns the PIN after validation
```
