# BmFut

BmFut is a modern football data web app built with Next.js, React, and Vercel.

## Features

- Real football API connection through a secure server route
- League standings
- Fixtures and results
- Top scorers
- Team strength analysis
- Match prediction estimates
- Club profile cards
- Responsive premium interface
- API reliability status
- No exposed API key in the browser

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
FOOTBALL_DATA_TOKEN=your_new_token_here
```

3. Run locally:

```bash
npm run dev
```

4. Deploy on Vercel.

In Vercel, add the same environment variable:

```bash
FOOTBALL_DATA_TOKEN
```

Then redeploy.

## Important

If your API token was ever shown in a screenshot or public place, regenerate it before using it.
