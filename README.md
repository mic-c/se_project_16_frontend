# News Explorer Frontend

A Vite + React frontend for the News Explorer project.

## Features

- Search articles with the News API
- Show loading, empty, and error states
- Display article cards with save-state interactions
- Simulate auth and saved-article backend actions with local storage

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Environment

Create a `.env` file with your News API key:

```env
VITE_NEWS_API_KEY=your_api_key_here
```

## Simulated backend

The app uses `src/services/mockBackend.js` to simulate:

- logging in
- checking tokens
- saving articles
- deleting articles

These values are stored in `localStorage` so the app works without a real backend during development.

## Deployment

The app is deployed with GitHub Pages.

- Deployed site: https://mic-c.github.io/se_project_16_frontend/

To redeploy after changes:

```bash
npm run deploy
```
