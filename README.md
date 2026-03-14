# Faculty Evaluation System

Production-ready baseline for a university faculty evaluation platform using Next.js 15, Prisma, PostgreSQL, Auth.js RBAC, Tailwind CSS, Chart.js, and jsPDF.

## Features

- Secure authentication with Auth.js (credentials provider)
- Password hashing using bcrypt
- Role-based access control (`ADMIN`, `STUDENT`, `FACULTY`)
- Evaluation submission and management APIs
- Analytics dashboard with Chart.js
- PDF report export with jsPDF
- Dockerized deployment with PostgreSQL

## Quick Start

1. Copy `.env.example` to `.env` and update values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run prisma commands:
   ```bash
   npx prisma migrate dev --name init
   npm run db:seed
   ```
4. Run app:
   ```bash
   npm run dev
   ```

## Docker

```bash
docker compose up --build
```

## API Endpoints

- `POST /api/register` - Register student/faculty user
- `GET /api/evaluations` - List evaluations by role scope
- `POST /api/evaluations` - Student submits evaluation
- `DELETE /api/evaluations/:id` - Admin deletes evaluation

## Default Seed User

- Email: `admin@university.edu`
- Password: `Admin@12345`
- Role: `ADMIN`

> Change default credentials immediately in production.
