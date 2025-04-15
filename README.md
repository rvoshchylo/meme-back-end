# Meme Directory – Backend (NestJS)

This is the backend for the **Meme Directory App**, built with **NestJS**, **Prisma**, and **PostgreSQL**, deployed via **Railway**.

The backend provides JWT-based authentication and a full REST API for managing memes, likes, and users.

---

## 🚀 Tech Stack

- 🧱 [NestJS](https://nestjs.com/) – backend framework
- 🛠 [Prisma ORM](https://www.prisma.io/) – type-safe DB access
- 🐘 PostgreSQL – relational database
- 🔐 JWT – authentication (access token only)
- 📦 Railway – deployment

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/meme-directory.git
cd meme-directory/meme-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/memedb
JWT_ACCESS_SECRET=your-access-secret
BASE_URL=http://localhost:3000
```

> Replace `DATABASE_URL` with your local or Railway DB connection string.

### 4. Initialize database with Prisma

```bash
npx prisma migrate dev --name init
```

### 5. Run seed script (optional)

```bash
npm run seed
```

This will populate the database with memes by scanning the `/public` folder for image files.

### 6. Start the server

```bash
npm run start:dev
```

---

## 🔐 Authentication Flow

- Users log in with a **username** only
- Return JWT
- Otherwise, a new user is created
- Token is used in `Authorization: Bearer <token>` header
- Guarded routes use the `AccessTokenGuard`

---

## 🧩 Features

- ✅ JWT-based login (no password)
- 📋 CRUD operations for memes
- ✏️ Edit meme info via PATCH
- ❤️ Like/unlike memes with relation to user
- 🖼 Serve static image files from `/public`
- 👤 Associate likes per user

---

## 📁 Project Structure (Backend)

```
meme-backend/
├─ prisma/
│  ├─ migrations/             # Prisma migration history
│  ├─ seed/                   # Seeder script
│  ├─ schema.prisma           # Main Prisma schema
│  ├─ meme.prisma             # Modularized schema parts
│  ├─ like.prisma             # Modularized schema parts
│  └─ user.prisma             # Modularized schema parts
├─ public/                    # Static image files
├─ src/
│  ├─ auth/                   # Auth controller, service, strategy
│  ├─ guards/                 # Access token guard
│  ├─ like/                   # Like toggle logic
│  ├─ memes/                  # Meme CRUD logic
│  ├─ prisma/                 # PrismaService
│  ├─ app.module.ts           # Root module
│  └─ main.ts                 # App bootstrap
├─ .env                       # Environment variables
├─ package.json
├─ README.md
└─ tsconfig.json
```

---

## 🌐 Deployment

Deployed using [Railway](https://railway.app). 
Ensure `public/` is included in your deployment, and proper `BASE_URL` is configured.

---

## 📄 License

MIT – free to use and modify!

