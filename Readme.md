# 🛒 MERN E-Commerce Application

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![React](https://img.shields.io/badge/React-Frontend-blue)
![Node](https://img.shields.io/badge/Node.js-Runtime-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

**Clothify | Your Online Clothing Store** .  

##  Extra Features (Beyond Assignment Requirements)

###  Admin Order Management (Backend)
> Implemented **beyond the given requirements**

- Admin-only protected routes
- View all orders
- Update order status
- Role-based access control (admin vs user)

> ⚠️ Note: Admin UI is not exposed in frontend (backend-ready feature)

---

## 📁 Project Structure

```
root
├── frontend        # React (Vite) application
└── backend         # Node.js + Express API
```

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <https://github.com/KalharaBatangala/Clothify>
cd <Clothify>
```

---

## 🔧 Backend Setup

### Navigate to backend folder

```bash
cd backend
```

### Install dependencies

```bash
npm install
```

### Create `.env` file

Create a `.env` file inside the `backend` folder.

#### Example `.env` 

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=myuser@gmail.com
EMAIL_PASS=16 characters app password
```

### Start backend server

```bash
npm run dev
```

Backend will run on:
```
http://localhost:5000
```

---

## 🎨 Frontend Setup

### Navigate to frontend folder

```bash
cd ../frontend
```

### Install dependencies

```bash
npm install
```

### Start frontend dev server

```bash
npm run dev
```

Frontend will run on:
```
http://localhost:5173
```

---

## 🔄 Running the Full Application

| Service  | URL |
|--------|-----|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:5000 |

Ensure **both servers are running simultaneously**.

---

## 🔐 Admin Routes (Backend Only)

Example admin-only endpoint:

```
GET /api/admin/orders
```

- Requires:
  - Valid JWT token
  - User role = `admin`

This is enforced via middleware and demonstrates **role-based authorization**.

---

