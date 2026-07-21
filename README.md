# Finance — Personal Finance Tracker

A full-stack personal finance dashboard where users track accounts, categorize transactions, and visualize spending patterns.

## Live Demo

## Features

- **Authentication** — secure sign up / sign in with hashed passwords (bcrypt) and JWT sessions (NextAuth.js)
- **Accounts** — create and manage multiple accounts (wallet, bank, credit card)
- **Categories** — organize transactions by custom categories
- **Transactions** — track income and expenses, linked to an account and category, with ownership validation on every request
- **Dashboard** — income/expense/balance summary and a category breakdown chart (Recharts)
- **Protected routes** — middleware blocks access to the dashboard for unauthenticated users

## Tech Stack

**Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
**Backend:** Next.js API Routes, Prisma ORM
**Database:** PostgreSQL (hosted on Neon)
**Auth:** NextAuth.js (Credentials provider) + bcrypt
**Charts:** Recharts

## Architecture Highlights

- All financial data is scoped per authenticated user — every query filters by `userId`, and creating a transaction validates that the referenced account and category actually belong to the logged-in user before writing to the database.
- Password hashing with bcrypt; plaintext passwords are never stored.
- Session data enriched via NextAuth callbacks (`jwt` / `session`) to expose the user's database ID across the app.
- Relational schema (User → Account/Category → Transaction) managed with Prisma migrations.

## Running Locally

### Prerequisites
- Node.js
- A PostgreSQL database (e.g. a free [Neon](https://neon.tech) instance)

### Setup

```bash
git clone <repo-url>
cd Personal-Finance-Tracker
npm install
```

Create a `.env` file in the root:

DATABASE_URL="your-postgresql-connection-string"
AUTH_SECRET="generate-with-npx-auth-secret"

Run migrations and start the app:

```bash
npx prisma migrate dev
npm run dev
```

App runs at `http://localhost:3000`.

## Project Structure

src/
├── app/
│ ├── api/ # API routes (accounts, categories, transactions, auth, register, summary)
│ ├── dashboard/ # Protected app pages (overview, transactions, categories)
│ ├── login/ register/ # Public auth pages
├── lib/prisma.ts # Prisma client singleton
├── auth.ts # NextAuth configuration
└── middleware.ts # Route protection
prisma/
└── schema.prisma # Database schema
