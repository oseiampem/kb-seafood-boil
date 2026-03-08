# KB's Seafood Boil 🔥

**Premium seafood trays delivered across Accra, Ghana.**
_Spice. Heat. Ocean Fire._

---

## Project Structure

```
kb-seafood-boil/
├── backend/          ← Node.js + Express + MongoDB API
└── frontend/         ← Next.js + Tailwind CSS + Framer Motion
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

---

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
npm run dev
```

**`.env` values to fill:**

| Variable | Description |
|---|---|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Long random string (32+ chars) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `FRONTEND_URL` | Your frontend URL (for CORS) |

---

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local
npm run dev
```

**`.env.local` values:**

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Your backend URL (e.g. http://localhost:5000) |

---

### 3. Access the App

| URL | Description |
|---|---|
| `http://localhost:3000` | Customer website |
| `http://localhost:3000/admin/login` | Admin login |
| `http://localhost:5000/api/health` | API health check |

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/orders` | Public | Submit new order |
| GET | `/api/orders` | Admin JWT | Get all orders |
| PUT | `/api/orders/:id` | Admin JWT | Update order status |
| DELETE | `/api/orders/:id` | Admin JWT | Delete order |
| POST | `/api/auth/login` | Public | Admin login |
| GET | `/api/auth/verify` | Admin JWT | Verify token |

---

## Deployment

### Frontend → Vercel

```bash
cd frontend
npx vercel
# Set NEXT_PUBLIC_API_URL to your backend URL in Vercel dashboard
```

### Backend → Render / Railway

1. Connect your GitHub repo
2. Set root directory to `backend/`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all environment variables

### Database → MongoDB Atlas

1. Create a free M0 cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Whitelist `0.0.0.0/0` for Render/Railway
3. Copy your connection string to `MONGODB_URI`

---

## Business Details

- **Location:** Community 25, Accra, Ghana
- **Delivery:** Anywhere in Accra
- **Ordering:** Pre-order only (24-hour notice)
- **WhatsApp:** [0533856150](https://wa.me/233533856150)
- **Snapchat:** yosoy_reina20

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT |
| Deployment | Vercel + Render + MongoDB Atlas |
