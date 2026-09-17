# 🏏 Cricket Live 

> A full-stack live cricket score application built with **React.js, Vite, Tailwind CSS, Node.js, Express.js, Axios, and CricketData API**.
>
> The backend is designed to be reusable for a future **React Native mobile application**.

---

# 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Prerequisites](#prerequisites)
5. [Create Project From Scratch](#create-project-from-scratch)
6. [Project Structure](#project-structure)
7. [CricketData API Setup](#cricketdata-api-setup)
8. [Backend Setup](#backend-setup)
9. [Backend Code](#backend-code)
10. [Backend API Testing](#backend-api-testing)
11. [API Caching](#api-caching)
12. [Frontend Setup](#frontend-setup)
13. [Tailwind CSS Setup](#tailwind-css-setup)
14. [Frontend Code](#frontend-code)
15. [Run Complete Application](#run-complete-application)
16. [Git Setup](#git-setup)
17. [GitHub Setup](#github-setup)
18. [Environment Variables](#environment-variables)
19. [Security](#security)
20. [Deployment](#deployment)
21. [Production Architecture](#production-architecture)
22. [Future React Native App](#future-react-native-app)
23. [Development Roadmap](#development-roadmap)
24. [Useful Commands](#useful-commands)
25. [Troubleshooting](#troubleshooting)
26. [API Usage and Licensing](#api-usage-and-licensing)
27. [Future Improvements](#future-improvements)

---

# Project Overview

**Cricket Live** is a web application that displays cricket match information using a third-party cricket data API.

The first version focuses on:

- Live cricket scores
- Match status
- Teams
- Team logos
- Runs
- Wickets
- Overs
- Venue
- Match date
- Upcoming matches
- Completed matches

The application uses a backend layer between the React frontend and CricketData API.

This keeps the API key secure and makes the backend reusable for future applications.

---

# Architecture

## Current Architecture

```text
                    CricketData API
                          │
                          │ HTTPS
                          ▼
                  Node.js + Express
                          │
                     Cache Layer
                          │
                          ▼
                    REST API
                          │
                          ▼
                     React.js
                          │
                          ▼
                    Web Browser
```

## Future Architecture

```text
                       CricketData API
                              │
                              ▼
                       Node.js Backend
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
                  Redis              Database
                    │                   │
                    └─────────┬─────────┘
                              │
                         REST API
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
               React Web          React Native
               Application         Mobile App
```

---

# Technology Stack

## Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- Axios
- CORS
- dotenv

## External API

- CricketData API

## Source Control

- Git
- GitHub

## Deployment

- Vercel
- Netlify

## Future

- React Native
- Redis
- Database
- Push notifications
- Monitoring

---

# Prerequisites

Install the following software before starting.

## Node.js

Download:

https://nodejs.org/

Check installation:

```bash
node --version
```

Example:

```text
v22.x.x
```

## npm

Check:

```bash
npm --version
```

## Git

Download:

https://git-scm.com/

Check:

```bash
git --version
```

## VS Code

Download:

https://code.visualstudio.com/

---

# Create Project From Scratch

## 1. Create root folder

Open terminal:

```bash
mkdir cricket-live-app
cd cricket-live-app
```

---

# Backend Creation

Create backend:

```bash
mkdir backend
cd backend
```

Initialize Node.js:

```bash
npm init -y
```

Install dependencies:

```bash
npm install express axios cors dotenv
```

Install development dependency:

```bash
npm install --save-dev nodemon
```

---

# Frontend Creation

Go back to root:

```bash
cd ..
```

Create React + Vite project:

```bash
npm create vite@latest frontend -- --template react
```

Go to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Install Axios:

```bash
npm install axios
```

---

# Project Structure

The final structure should look like:

```text
cricket-live-app/
│
├── README.md
│
├── backend/
│   │
│   ├── src/
│   │   │
│   │   ├── routes/
│   │   │   └── cricketRoutes.js
│   │   │
│   │   ├── services/
│   │   │   └── cricketService.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    │
    ├── src/
    │   │
    │   ├── components/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   │
    │   │   ├── App.jsx
    │   │   ├── main.jsx
    │   │   └── index.css
    │
    ├── public/
    ├── package.json
    └── vite.config.js
```

---

# CricketData API Setup

CricketData is used as the cricket data provider for this project.

Website:

https://cricketdata.org/

Create an account and obtain an API key.

Do not share the API key publicly.

Do not commit the API key to GitHub.

---

# CricketData Current Matches Endpoint

The endpoint used by this project is:

```text
https://api.cricapi.com/v1/currentMatches
```

The request contains:

```text
apikey
offset
```

Example:

```text
https://api.cricapi.com/v1/currentMatches?apikey=YOUR_API_KEY&offset=0
```

Do not place your actual key in this README.

---

# Backend Setup

Go to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Backend Environment Variables

Create:

```text
backend/.env
```

Add:

```env
PORT=5000

CRICKET_API_URL=https://api.cricapi.com/v1/currentMatches

CRICKET_API_KEY=YOUR_CRICKET_API_KEY

CACHE_DURATION_MINUTES=15
```

Replace:

```text
YOUR_CRICKET_API_KEY
```

with your actual API key.

Never commit `.env`.

---

# Backend .gitignore

Create:

```text
backend/.gitignore
```

Add:

```text
node_modules/
.env
```

---

# Backend package.json

Update scripts:

```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  }
}
```

Keep the dependencies generated by npm.

---

# Backend Code

## src/app.js

Create:

```text
backend/src/app.js
```

Code:

```javascript
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const cricketRoutes = require("./routes/cricketRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Cricket Live API Backend is running"
    });
});

app.use("/api/cricket", cricketRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

# Cricket Service

Create:

```text
backend/src/services/cricketService.js
```

Code:

```javascript
const axios = require("axios");

let cachedData = null;
let lastFetchTime = 0;

const CACHE_DURATION =
    Number(process.env.CACHE_DURATION_MINUTES || 15) * 60 * 1000;

const getLiveMatches = async () => {
    try {
        const now = Date.now();

        // Return cached data when cache is still valid.
        if (
            cachedData &&
            now - lastFetchTime < CACHE_DURATION
        ) {
            console.log("Returning cached cricket data");

            return cachedData;
        }

        console.log("Fetching fresh data from CricketData...");

        const response = await axios.get(
            process.env.CRICKET_API_URL,
            {
                params: {
                    apikey: process.env.CRICKET_API_KEY,
                    offset: 0
                }
            }
        );

        cachedData = response.data;
        lastFetchTime = now;

        return cachedData;

    } catch (error) {
        console.error(
            "Cricket API Error:",
            error.response?.data || error.message
        );

        // Return previous data if the provider temporarily fails.
        if (cachedData) {
            console.log("Returning old cached data");

            return cachedData;
        }

        throw new Error("Unable to fetch live cricket data");
    }
};

module.exports = {
    getLiveMatches
};
```

---

# Cricket Routes

Create:

```text
backend/src/routes/cricketRoutes.js
```

Code:

```javascript
const express = require("express");

const {
    getLiveMatches
} = require("../services/cricketService");

const router = express.Router();

router.get("/live", async (req, res) => {
    try {
        const data = await getLiveMatches();

        // Never send the provider API key to the frontend.
        const { apikey, ...safeResponse } = data;

        res.json(safeResponse);

    } catch (error) {
        console.error("Route Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
```

---

# Start Backend

From:

```text
backend/
```

run:

```bash
npm run dev
```

Expected:

```text
Server running on port 5000
```

---

# Test Backend

## Health Check

Open:

```text
http://localhost:5000
```

Expected:

```json
{
  "message": "Cricket Live API Backend is running"
}
```

---

# Test Cricket API Through Your Backend

Open:

```text
http://localhost:5000/api/cricket/live
```

Expected response structure:

```json
{
  "status": "success",
  "data": [
    {
      "id": "match-id",
      "name": "Team A vs Team B",
      "matchType": "t20",
      "status": "Live",
      "venue": "Stadium",
      "date": "2026-09-17",
      "teams": [
        "Team A",
        "Team B"
      ],
      "teamInfo": [],
      "score": []
    }
  ]
}
```

Actual data depends on the matches available from the provider.

---

# API Caching

The free API plan has a limited number of daily API requests.

For development, the application uses:

```env
CACHE_DURATION_MINUTES=15
```

The calculation is:

```text
60 minutes / 15 minutes = 4 requests per hour

4 × 24 hours = 96 requests per day
```

This is designed to stay below a 100-request-per-day limit when the server continuously refreshes every 15 minutes.

However, the actual number of provider requests can depend on how the application is accessed and how the hosting environment behaves.

Do not repeatedly use the provider's API Playground while developing because those tests may also count toward your quota.

---

# Cache Flow

```text
First Request
     │
     ▼
Node.js
     │
     ▼
CricketData API
     │
     ▼
Save Response in Cache
     │
     ▼
React
```

Subsequent requests while the cache is valid:

```text
React
  │
  ▼
Node.js
  │
  ▼
Cached Data
  │
  ▼
React
```

After cache expiry:

```text
React
  │
  ▼
Node.js
  │
  ▼
Cache Expired
  │
  ▼
CricketData API
  │
  ▼
Update Cache
  │
  ▼
React
```

---

# Frontend Setup

Open another terminal.

Go to frontend:

```bash
cd frontend
```

Install:

```bash
npm install
```

Install Axios:

```bash
npm install axios
```

---

# Tailwind CSS Setup

Install Tailwind CSS and the Vite plugin:

```bash
npm install tailwindcss @tailwindcss/vite
```

---

# vite.config.js

Open:

```text
frontend/vite.config.js
```

Use:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

---

# src/index.css

Open:

```text
frontend/src/index.css
```

Use:

```css
@import "tailwindcss";
```

---

# src/main.jsx

Make sure:

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

# Frontend API Service

Create:

```text
frontend/src/services/cricketApi.js
```

Code:

```javascript
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const cricketApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getLiveMatches = async () => {
  const response = await cricketApi.get("/cricket/live");

  return response.data;
};
```

---

# MatchCard Component

Create:

```text
frontend/src/components/MatchCard.jsx
```

Code:

```jsx
const MatchCard = ({ match }) => {
  const getTeamInfo = (teamName) => {
    return match.teamInfo?.find(
      (team) => team.name === teamName
    );
  };

  const getTeamScore = (teamName) => {
    const score = match.score?.find(
      (item) => item.inning?.startsWith(teamName)
    );

    if (!score) {
      return null;
    }

    return {
      runs: score.r,
      wickets: score.w,
      overs: score.o,
    };
  };

  const team1 = match.teams?.[0];
  const team2 = match.teams?.[1];

  const team1Info = getTeamInfo(team1);
  const team2Info = getTeamInfo(team2);

  const team1Score = getTeamScore(team1);
  const team2Score = getTeamScore(team2);

  const isLive =
    match.matchStarted && !match.matchEnded;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">

      <div className="flex items-center justify-between border-b bg-slate-50 px-5 py-3">

        <span className="text-sm font-medium text-slate-500">
          {match.matchType?.toUpperCase()}
        </span>

        {isLive ? (
          <span className="flex items-center gap-2 text-sm font-semibold text-red-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-600"></span>
            LIVE
          </span>
        ) : (
          <span className="text-sm font-medium text-slate-500">
            {match.matchEnded
              ? "COMPLETED"
              : "UPCOMING"}
          </span>
        )}

      </div>

      <div className="px-5 pt-5">

        <h2 className="text-center text-lg font-bold text-slate-800">
          {match.name}
        </h2>

        <p className="mt-1 text-center text-sm text-slate-500">
          {match.venue}
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4 px-5 py-6">

        <div className="flex flex-col items-center">

          {team1Info?.img && (
            <img
              src={team1Info.img}
              alt={team1}
              className="mb-3 h-16 w-16 object-contain"
            />
          )}

          <h3 className="text-center font-semibold text-slate-800">
            {team1}
          </h3>

          {team1Score && (
            <div className="mt-2 text-center">

              <p className="text-2xl font-bold text-slate-900">
                {team1Score.runs}/{team1Score.wickets}
              </p>

              <p className="text-sm text-slate-500">
                {team1Score.overs} overs
              </p>

            </div>
          )}

        </div>

        <div className="flex flex-col items-center">

          {team2Info?.img && (
            <img
              src={team2Info.img}
              alt={team2}
              className="mb-3 h-16 w-16 object-contain"
            />
          )}

          <h3 className="text-center font-semibold text-slate-800">
            {team2}
          </h3>

          {team2Score && (
            <div className="mt-2 text-center">

              <p className="text-2xl font-bold text-slate-900">
                {team2Score.runs}/{team2Score.wickets}
              </p>

              <p className="text-sm text-slate-500">
                {team2Score.overs} overs
              </p>

            </div>
          )}

        </div>

      </div>

      <div className="border-t bg-slate-50 px-5 py-4 text-center">

        <p className="text-sm font-medium text-slate-700">
          {match.status}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {match.date}
        </p>

      </div>

    </div>
  );
};

export default MatchCard;
```

---

# Loading Component

Create:

```text
frontend/src/components/Loading.jsx
```

Code:

```jsx
const Loading = () => {
  return (
    <div className="flex min-h-[300px] items-center justify-center">

      <div className="text-center">

        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-green-600"></div>

        <p className="mt-4 text-sm text-slate-500">
          Loading live matches...
        </p>

      </div>

    </div>
  );
};

export default Loading;
```

---

# Home Page

Create:

```text
frontend/src/pages/Home.jsx
```

Code:

```jsx
import { useEffect, useState } from "react";

import { getLiveMatches } from "../services/cricketApi";
import MatchCard from "../components/MatchCard";
import Loading from "../components/Loading";

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMatches = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getLiveMatches();

      setMatches(response.data || []);

    } catch (err) {
      console.error(err);

      setError(
        "Unable to load cricket matches. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-900">
          Live Cricket Scores
        </h1>

        <p className="mt-2 text-slate-500">
          Follow the latest cricket matches and scores.
        </p>

      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!error && matches.length === 0 && (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">

          <div className="text-5xl">
            🏏
          </div>

          <h2 className="mt-4 text-xl font-semibold text-slate-800">
            No matches available
          </h2>

          <p className="mt-2 text-slate-500">
            There are currently no matches returned by the cricket API.
          </p>

        </div>
      )}

      {matches.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
            />
          ))}

        </div>
      )}

    </main>
  );
};

export default Home;
```

---

# App.jsx

Open:

```text
frontend/src/App.jsx
```

Use:

```jsx
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">

      <header className="border-b bg-slate-950 text-white shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <span className="text-3xl">
              🏏
            </span>

            <div>

              <h1 className="text-xl font-bold">
                Cricket Live
              </h1>

              <p className="text-xs text-slate-400">
                Live cricket scores
              </p>

            </div>

          </div>

          <div className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold">
            LIVE
          </div>

        </div>

      </header>

      <Home />

    </div>
  );
}

export default App;
```

---

# Run Complete Application

You need two terminals.

## Terminal 1 — Backend

```bash
cd cricket-live-app/backend
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

## Terminal 2 — Frontend

```bash
cd cricket-live-app/frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Open:

```text
http://localhost:5173
```

---

# Data Flow

The final local application works like this:

```text
                    CricketData
                         │
                         ▼
                  Node.js Backend
                         │
                    15 min cache
                         │
                         ▼
                 /api/cricket/live
                         │
                         ▼
                     Axios
                         │
                         ▼
                    React.js
                         │
                         ▼
                   Tailwind UI
```

---

# Git Setup

From the root project:

```bash
cd cricket-live-app
```

Initialize Git:

```bash
git init
```

Check status:

```bash
git status
```

---

# Root .gitignore

Create:

```text
cricket-live-app/.gitignore
```

Recommended content:

```text
node_modules/
.env
.env.*
!.env.example
dist/
.DS_Store
*.log
```

The backend `.gitignore` can also contain:

```text
node_modules/
.env
```

---

# Environment Example File

It is useful to commit an example environment file without secrets.

Create:

```text
backend/.env.example
```

Use:

```env
PORT=5000
CRICKET_API_URL=https://api.cricapi.com/v1/currentMatches
CRICKET_API_KEY=YOUR_CRICKET_API_KEY
CACHE_DURATION_MINUTES=15
```

This file is safe to commit because it does not contain the real API key.

---

# Git First Commit

From root:

```bash
git add .
```

Check:

```bash
git status
```

Make sure `.env` is NOT listed.

Commit:

```bash
git commit -m "Initial cricket live application"
```

---

# GitHub Setup

Create a new repository on GitHub.

Example repository name:

```text
cricket-live-app
```

Do not upload your API key.

Connect local repository:

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
```

Example:

```bash
git remote add origin https://github.com/YOUR_USERNAME/cricket-live-app.git
```

Check:

```bash
git remote -v
```

Rename branch:

```bash
git branch -M main
```

Push:

```bash
git push -u origin main
```

---

# Recommended Git Workflow

Before starting work:

```bash
git pull origin main
```

Check changes:

```bash
git status
```

After making changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Add live match cards"
```

Push:

```bash
git push origin main
```

---

# Useful Git Commands

Check status:

```bash
git status
```

View history:

```bash
git log --oneline
```

View branches:

```bash
git branch
```

Create branch:

```bash
git checkout -b feature/live-score-ui
```

Switch branch:

```bash
git checkout main
```

Pull:

```bash
git pull
```

Push:

```bash
git push
```

---

# Environment Variables

## Development

Backend:

```text
backend/.env
```

Example:

```env
PORT=5000
CRICKET_API_URL=https://api.cricapi.com/v1/currentMatches
CRICKET_API_KEY=YOUR_CRICKET_API_KEY
CACHE_DURATION_MINUTES=15
```

## Production

Environment variables should be configured in the hosting provider's dashboard.

Do not put secrets inside React source code.

---

# Security

## Never expose the API key

Do not write:

```javascript
const API_KEY = "abc123";
```

inside React.

Do not write:

```javascript
https://api.cricapi.com/v1/currentMatches?apikey=YOUR_SECRET
```

inside frontend code.

Use:

```text
React
  ↓
Your Node.js API
  ↓
CricketData API
```

The key exists only on the backend.

---

# If API Key Is Accidentally Exposed

If the API key is accidentally posted publicly, committed to GitHub, or otherwise exposed:

1. Treat the key as compromised.
2. Generate/replace the key through the provider if supported.
3. Update your local `.env`.
4. Update the production environment variable.
5. Remove the secret from future commits.
6. Check Git history if the key was committed.

Do not assume deleting the current file removes a secret from Git history.

---

# Deployment

## Frontend Deployment

The React application can be deployed to:

- Vercel
- Netlify

Recommended:

```text
GitHub
   ↓
Vercel
   ↓
React Application
```

---

# Backend Deployment

The backend can be deployed to a Node.js-compatible platform such as:

- Vercel
- Render
- Railway
- Other suitable Node.js hosting

Production:

```text
React
  ↓
Production Backend
  ↓
CricketData
```

---

# Vercel Deployment

## Frontend

Push the project to GitHub.

Go to Vercel and import the GitHub repository.

Because this repository contains both frontend and backend, configure the frontend project with the appropriate root directory:

```text
frontend
```

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

---

# Backend Deployment

The backend needs to be deployed separately or configured according to the hosting platform's Node.js/serverless model.

Configure production environment variables:

```text
CRICKET_API_URL
CRICKET_API_KEY
CACHE_DURATION_MINUTES
```

Never expose:

```text
CRICKET_API_KEY
```

to the browser.

---

# Production Frontend API URL

During local development:

```javascript
const API_URL = "http://localhost:5000/api";
```

For production, use an environment variable.

Example frontend environment file:

```text
frontend/.env.local
```

```env
VITE_API_URL=http://localhost:5000/api
```

Then:

```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

For production, configure:

```text
VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
```

Important:

Only variables that are safe to expose should use the `VITE_` prefix.

Never put:

```text
CRICKET_API_KEY
```

in a frontend environment variable.

---

# Recommended Production API Structure

Instead of returning the provider response directly, eventually create our own normalized response.

Example:

```json
{
  "success": true,
  "matches": [
    {
      "id": "123",
      "name": "India vs Australia",
      "type": "T20",
      "status": "Live",
      "venue": "Example Stadium",
      "date": "2026-09-17",
      "teams": [
        {
          "name": "India",
          "shortName": "IND",
          "logo": "https://example.com/india.png"
        },
        {
          "name": "Australia",
          "shortName": "AUS",
          "logo": "https://example.com/australia.png"
        }
      ],
      "scores": [
        {
          "team": "India",
          "runs": 185,
          "wickets": 4,
          "overs": 32.5
        }
      ]
    }
  ]
}
```

This prevents the frontend from becoming tightly coupled to the provider's response format.

---

# Recommended API Endpoints

Current:

```text
GET /api/cricket/live
```

Future:

```text
GET /api/cricket/live
GET /api/cricket/upcoming
GET /api/cricket/recent
GET /api/cricket/matches/:id
GET /api/cricket/matches/:id/scorecard
GET /api/cricket/matches/:id/commentary
GET /api/cricket/teams/:id
GET /api/cricket/players/:id
```

---

# Planned UI

## Header

```text
🏏 Cricket Live

LIVE
```

## Navigation

```text
[ Live ] [ Upcoming ] [ Completed ]
```

## Match Card

```text
┌────────────────────────────────────┐
│ T20                         🔴 LIVE │
│                                    │
│ India vs Australia                 │
│ Example Stadium                   │
│                                    │
│ 🇮🇳 India       🇦🇺 Australia       │
│ 185/4             183/8             │
│ 32.5 overs        50 overs          │
│                                    │
│ Current match status               │
└────────────────────────────────────┘
```

---

# Planned Match Details Page

```text
Match Details
│
├── Match Header
│
├── Current Score
│
├── Innings
│
├── Batting
│
├── Bowling
│
├── Partnerships
│
├── Scorecard
│
└── Ball-by-Ball Commentary
```

---

# Auto Refresh

For live matches, the frontend can periodically request our backend.

Example:

```javascript
useEffect(() => {
    loadMatches();

    const interval = setInterval(() => {
        loadMatches();
    }, 60 * 1000);

    return () => clearInterval(interval);
}, []);
```

However, frontend refresh frequency should be coordinated with backend caching.

For example:

```text
React refresh: 1 minute
Backend cache: 15 minutes
```

This means React can request every minute, while the backend can continue serving cached data until the cache expires.

For production, the refresh interval should be chosen based on the provider plan, desired freshness, traffic, and caching strategy.

---

# Future Redis Cache

The current application uses:

```text
In-memory cache
```

For multiple backend instances, use Redis.

Future:

```text
Node.js Instance 1 ─┐
                    │
Node.js Instance 2 ─┼── Redis
                    │
Node.js Instance 3 ─┘
```

This allows all instances to share the same cached cricket data.

---

# React Native Future

The React Native app will not communicate directly with CricketData.

It will use:

```text
React Native
     ↓
Node.js Backend
     ↓
Redis / Cache
     ↓
CricketData
```

This means the same backend can power:

```text
Web
Mobile
Future applications
```

---

# Development Roadmap

## Phase 1 — Foundation

- [x] Create root project
- [x] Create Node.js backend
- [x] Create Express server
- [x] Create React + Vite application
- [x] Configure Tailwind CSS
- [x] Connect CricketData API
- [x] Protect API key
- [x] Add caching
- [x] Create live endpoint

---

## Phase 2 — Live Score UI

- [x] API service
- [x] Match card foundation
- [x] Loading state
- [ ] Header improvements
- [ ] Live tab
- [ ] Upcoming tab
- [ ] Completed tab
- [ ] Better team layout
- [ ] Better score display
- [ ] Live indicator
- [ ] Last updated time

---

## Phase 3 — Match Details

- [ ] Match details route
- [ ] Scorecard
- [ ] Batting
- [ ] Bowling
- [ ] Innings
- [ ] Partnerships
- [ ] Ball-by-ball
- [ ] Commentary

---

## Phase 4 — User Features

- [ ] Search
- [ ] Filters
- [ ] Favorite teams
- [ ] Favorite matches
- [ ] Dark mode
- [ ] Responsive navigation
- [ ] Mobile-first improvements
- [ ] Auto refresh

---

## Phase 5 — Production

- [ ] Normalize API response
- [ ] Production cache
- [ ] Redis
- [ ] Error logging
- [ ] Monitoring
- [ ] GitHub CI/CD
- [ ] Backend deployment
- [ ] Frontend deployment
- [ ] Custom domain
- [ ] Production testing

---

## Phase 6 — React Native

- [ ] Create React Native project
- [ ] Connect existing backend
- [ ] Mobile navigation
- [ ] Match list
- [ ] Match details
- [ ] Scorecard
- [ ] Commentary
- [ ] Push notifications
- [ ] Android release
- [ ] iOS release

---

# Useful Commands

## Root

```bash
cd cricket-live-app
```

---

## Backend

```bash
cd backend
```

Install:

```bash
npm install
```

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## Frontend

```bash
cd frontend
```

Install:

```bash
npm install
```

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

---

# Clean Installation

If `node_modules` becomes corrupted:

## Backend

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

Windows PowerShell:

```powershell
cd backend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## Frontend

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

Windows PowerShell:

```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

# Common Troubleshooting

## Error: `argument handler must be a function`

Check:

```javascript
const cricketRoutes = require("./routes/cricketRoutes");

app.use("/api/cricket", cricketRoutes);
```

And make sure the route file ends with:

```javascript
module.exports = router;
```

---

# Error: Cannot find module

Run:

```bash
npm install
```

Check that the package exists:

```bash
npm list express
npm list axios
```

---

# Error: API key not working

Check:

```text
backend/.env
```

Make sure:

```env
CRICKET_API_KEY=YOUR_KEY
```

Restart backend after changing `.env`:

```bash
Ctrl + C
npm run dev
```

Do not expose the key in frontend code.

---

# Error: CORS

Make sure backend has:

```javascript
const cors = require("cors");

app.use(cors());
```

---

# Error: React cannot connect to backend

Make sure backend is running:

```text
http://localhost:5000
```

Test:

```text
http://localhost:5000/api/cricket/live
```

Then make sure frontend uses:

```text
http://localhost:5000/api
```

---

# Tailwind Not Working

Check installation:

```bash
npm list tailwindcss
```

Check:

```text
vite.config.js
```

Contains:

```javascript
import tailwindcss from '@tailwindcss/vite'
```

and:

```javascript
tailwindcss()
```

Check:

```text
src/index.css
```

Contains:

```css
@import "tailwindcss";
```

Restart:

```bash
npm run dev
```

---

# Port Already in Use

If port 5000 is already being used, stop the previous Node process or change:

```env
PORT=5001
```

Then restart backend.

If frontend port 5173 is occupied, Vite will normally select another available port.

---

# API Quota

If the provider reports that the daily quota has been exceeded:

1. Stop unnecessary API Playground tests.
2. Check the API dashboard.
3. Make sure caching is enabled.
4. Avoid excessive browser refreshes during development.
5. Check whether multiple backend processes are running.
6. Check your provider plan and limits.

---

# API Data Freshness

A live-score application has two separate freshness concerns:

```text
Provider freshness
        +
Our cache duration
```

For example:

```text
CricketData
     ↓
Provider data may have its own delay
     ↓
Our backend cache
     ↓
React
```

A shorter cache does not make the provider's data itself more real-time.

For production, test the actual data freshness against your application's requirements.

---

# API Provider Independence

The application should not become dependent on one provider.

Keep external API code inside:

```text
backend/src/services/
```

Example:

```text
services/
├── cricketService.js
└── futureProviderService.js
```

If a different cricket data provider is selected later, the frontend should ideally remain unchanged.

---

# Recommended Production Improvements

Before a large public launch, consider adding:

## Backend

- Input validation
- Central error handler
- Request logging
- Rate limiting
- Response normalization
- Redis cache
- Database where required
- Health endpoint
- Monitoring
- Graceful shutdown
- API provider failover

## Frontend

- Error boundary
- Skeleton loading
- Retry button
- Better responsive design
- Accessibility
- SEO
- PWA support if required
- Image optimization
- Route-based code splitting

---

# Testing Strategy

## Backend

Test:

```text
GET /
GET /api/cricket/live
```

Check:

- HTTP status
- API response
- Error handling
- Cache behavior
- API quota usage

## Frontend

Check:

- Loading state
- Successful API response
- Empty response
- API error
- Mobile layout
- Desktop layout
- Team logos
- Score rendering

---

# Production Checklist

Before deployment:

```text
[ ] API key is not in GitHub
[ ] .env is ignored
[ ] .env.example exists
[ ] Backend works
[ ] Frontend works
[ ] API endpoint works
[ ] Cache works
[ ] Error handling works
[ ] Production environment variables configured
[ ] CORS configured
[ ] Build succeeds
[ ] Mobile responsive
[ ] Provider terms reviewed
```

Build frontend:

```bash
npm run build
```

Test:

```bash
npm run preview
```

---

# API and Licensing

Cricket data is provided by a third-party provider.

Before commercial/public use, verify the provider's current:

- Pricing
- API limits
- Data licensing
- Attribution requirements
- Commercial-use permissions
- Redistribution rules
- Terms of service

Do not assume that an API subscription automatically gives rights to redistribute every piece of cricket data publicly.

---

# Useful Resources

## CricketData

https://cricketdata.org/

## React

https://react.dev/

## Vite

https://vite.dev/

## Tailwind CSS

https://tailwindcss.com/

## Node.js

https://nodejs.org/

## Express.js

https://expressjs.com/

## Axios

https://axios-http.com/

## Git

https://git-scm.com/

## GitHub

https://github.com/

## Vercel

https://vercel.com/

## Netlify

https://www.netlify.com/

---

# Project Status

```text
🚧 Active Development
```

Current milestone:

```text
Foundation + CricketData API Integration + Tailwind CSS
```

Next milestone:

```text
Live Cricket Score UI
```

---

# Final Goal

The long-term goal is to build a modern cricket platform with:

```text
                    🏏 Cricket Live
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
      Live Scores     Upcoming       Completed
          │
          ▼
    Match Details
          │
    ┌─────┼─────┐
    ▼     ▼     ▼
 Scorecard Batting Bowling
          │
          ▼
   Ball-by-Ball
          │
          ▼
     React Web
          │
          └──────────────┐
                         ▼
                  React Native App
```

The backend remains the central data layer:

```text
                         CricketData
                              │
                              ▼
                       Node.js Backend
                              │
                         Cache / Redis
                              │
                              ▼
                        Your REST API
                         │          │
                         ▼          ▼
                    React Web   React Native
```

---

# 👨‍💻 Development Notes

This project is being developed incrementally.

The recommended order is:

```text
1. Project setup
2. Cricket API connection
3. Backend security
4. Backend caching
5. React + Tailwind setup
6. Live match UI
7. Match details
8. Scorecard
9. Ball-by-ball
10. Search and filters
11. Production deployment
12. React Native application
```

Do not skip backend security and caching before making the application public.

---

# 📄 License

This project is intended for learning and development unless a separate license is added.

Cricket data, logos, player information, images, and related content may be subject to third-party intellectual property and licensing requirements.

Always verify the applicable provider and content licenses before commercial distribution.

---

# 🏁 Quick Start

For an already-created project:

## Terminal 1

```bash
cd cricket-live-app/backend
npm install
npm run dev
```

## Terminal 2

```bash
cd cricket-live-app/frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Backend test:

```text
http://localhost:5000
```

Live API test:

```text
http://localhost:5000/api/cricket/live
```

---

## 🎉 Ready

The project is now structured to support:

```text
React + Tailwind
       +
Node + Express
       +
CricketData API
       +
Caching
       +
GitHub
       +
Vercel
       +
Future React Native
```
