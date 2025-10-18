# 🧵 Threads App - GraphQL Backend

A modern GraphQL backend API built with **Node.js**, **TypeScript**, **Apollo Server**, and **PostgreSQL**.

## ✨ Features

- 🚀 **GraphQL API** with Apollo Server
- 🔐 **JWT Authentication** with secure password hashing (PBKDF2)
- 📦 **PostgreSQL Database** with Prisma ORM
- 🎯 **TypeScript** for type safety
- 🐳 **Docker** support for easy database setup
- 📝 **Clean Architecture** with service layer pattern

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker (for PostgreSQL)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SuryaKTiwari11/threads-app-graphQL.git
cd threads-app-backend

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your values

# 4. Start PostgreSQL with Docker
npm run docker:up

# 5. Run database migrations
npx prisma migrate dev

# 6. Generate Prisma Client
npx prisma generate

# 7. Start the development server
npm run dev
```

🎉 **GraphQL Playground:** `http://localhost:8000/graphql`

---

## � API Documentation

### GraphQL Queries

```graphql
# Health check
query {
  ping
}

# Get user by ID
query {
  getUserById(id: "user-id") {
    id
    firstName
    lastName
    email
  }
}

# Get current logged-in user (requires Authorization header)
query {
  getCurrentLoggedInUser {
    id
    firstName
    email
  }
}

# Verify JWT token
query {
  verifyToken(token: "your-jwt-token") {
    id
    email
  }
}
```

### GraphQL Mutations

```graphql
# Register new user (returns user ID)
mutation {
  createUser(
    firstName: "John"
    lastName: "Doe"
    email: "john@example.com"
    password: "SecurePass123!"
  )
}

# Login user (returns JWT token)
mutation {
  loginUser(email: "john@example.com", password: "SecurePass123!")
}
```

### Authentication

For protected queries, add JWT token to request headers:

```
Authorization: Bearer <your-jwt-token>
```

**📦 Import Postman Collection:** Use `Threads_App_API.postman_collection.json` for testing.

---

## 📁 Project Structure

```
src/
├── graphql/
│   ├── index.ts              # Apollo Server setup
│   └── user/
│       ├── typedef.ts        # GraphQL schema definitions
│       ├── queries.ts        # Query resolvers
│       ├── mutations.ts      # Mutation resolvers
│       ├── resolvers.ts      # Combines queries & mutations
│       └── index.ts          # Exports
├── services/
│   └── user.ts              # Business logic (UserService)
├── lib/
│   └── db.ts                # Prisma client
└── index.ts                 # Express server entry point

prisma/
├── schema.prisma            # Database schema
└── migrations/              # Database migrations
```

---

## 🛠️ Available Scripts

| Command               | Description                              |
| --------------------- | ---------------------------------------- |
| `npm run dev`         | Start development server with hot reload |
| `npm run build`       | Build TypeScript to JavaScript           |
| `npm start`           | Start production server                  |
| `npm run docker:up`   | Start PostgreSQL container               |
| `npm run docker:down` | Stop PostgreSQL container                |

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
DATABASE_URL="postgresql://postgres:password@localhost:5432/threads?schema=public"
JWT_SECRET="your-secret-key-here"
```

---

## 🏗️ Architecture

### Service Layer Pattern

- **Resolvers** handle GraphQL requests
- **Services** contain business logic
- **Prisma** manages database operations

### Security

- Passwords hashed with **PBKDF2** (SHA-256, 10,000 iterations)
- JWT tokens for authentication (1 day expiry)
- Context-based authorization for protected routes

---

## 👨‍� Author

**Surya K Tiwari**  
GitHub: [@SuryaKTiwari11](https://github.com/SuryaKTiwari11)

---

## � License

ISC License

---

**Built with TypeScript, GraphQL, and PostgreSQL** 🚀
