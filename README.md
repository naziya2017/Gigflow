# GigFlow – Mini Freelance Marketplace Platform

GigFlow is a mini freelance marketplace where users can post gigs and freelancers can bid on them. The platform supports secure authentication, bidding, and a race-condition-safe hiring workflow.

---

##  Features

- JWT-based authentication using HttpOnly cookies
- Users can act as both Client and Freelancer (no fixed roles)
- Post and browse gigs
- Bid on gigs (one bid per freelancer per gig)
- Gig owner can hire exactly one freelancer
- Atomic hiring logic using MongoDB transactions
- Dashboard for:
  - My Gigs
  - My Bids
- Race-condition safe hiring logic

---

##  Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- MongoDB Transactions

---

##  Authentication

- JWT stored in HttpOnly cookies
- Backend validates authentication for all protected routes
- Frontend never accesses the token directly

---

##  Hiring Workflow (Important)

The hiring logic is implemented using MongoDB transactions to ensure data consistency.

When a gig owner hires a freelancer:
1. Gig status changes from `open` → `assigned`
2. Selected bid status becomes `hired`
3. All other bids are automatically marked `rejected`
4. Concurrent hire attempts are safely handled (only one succeeds)

This prevents race conditions and ensures atomic updates.

---

##  Run Locally

### Backend
```bash
cd server
npm install
npm run dev
```

### Backend
```bash
cd client
npm install
npm run dev


