
# Mashyn Bazar - Luxury Dynamic Showroom

A React-based luxury car showroom application with a dynamic backend powered by Express, Prisma, and SQLite.

## Features

- **Dynamic Catalog**: Cars are fetched from the database.
- **Admin Panel**: Backend API supports CRUD operations (Frontend pending).
- **Authentication**: Simple password-based admin access.
- **Image Storage**: Local file system storage for car images.

## Setup & Installation

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Ensure `.env` exists with the following:
    ```
    DATABASE_URL="file:./dev.db"
    ADMIN_PASSWORD="admin_password_123"
    ```

3.  **Database Setup**
    Initialize the database and run migrations:
    ```bash
    npx prisma migrate dev
    ```
    *(Optional)* Seed the database with demo data:
    ```bash
    npx tsx prisma/seed.ts
    ```

## Running the Application

You need to run both the backend API and the frontend development server.

1.  **Start Backend API**
    ```bash
    npm run server
    ```
    Server runs on `http://localhost:3001`.

2.  **Start Frontend**
    ```bash
    npm run dev
    ```
    Frontend runs on `http://localhost:3000` (proxies `/api` to backend).

## API Endpoints

- `GET /api/cars` - List all active cars
- `GET /api/cars/:id` - Get car details
- `POST /api/auth/login` - Admin login
- `POST /api/cars` - Create car (Admin only)
- `POST /api/upload/images` - Upload images (Admin only)

## Admin Access

Use the password defined in `.env` (`admin_password_123`) to authenticate against admin endpoints.