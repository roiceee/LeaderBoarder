# Leaderboarder  

## Overview  
**Leaderboarder** is a live leaderboard application designed for online and in-person events or games. It provides real-time score updates using **Fastify WebSockets** and supports authentication via **AWS Cognito**.  

## Tech Stack  
- **Backend:** Fastify (Node.js) + Fastify WebSockets  
- **Frontend:** React (Vite) + TypeScript  
- **Authentication:** AWS Cognito  
- **Monorepo:**  
  - `/backend` - Fastify API and WebSockets server  
  - `/frontend` - React client  

## Setup & Installation  

### 1. Clone the repository  
```sh
git clone <repo-url>
cd leaderboarder
```

### 2. Install dependencies  
```sh
pnpm install  # or npm install
```

### 3. Set up environment variables  
- Copy `.env.example` to `.env` in both `/backend` and `/frontend` and update values accordingly.  

### 4. Running the App  

#### Start the backend  
```sh
cd backend
pnpm run dev  # or npm run dev
```

#### Start the frontend  
```sh
cd frontend
pnpm run dev  # or npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.  

## Features  
- **Real-time leaderboard updates** with WebSockets  
- **Authentication via AWS Cognito**  
- **Supports both online and in-person events**  

## Development Status  
🚧 **Still in development** 🚧  

## Maintainer  
This project is currently maintained by **[John Roice Aldeza](https://github.com/roiceee)**. 
