# 🏀 Euroleague Basketball Stats App

A fullstack web application for browsing **Euroleague basketball statistics** — including teams, players, league leaders, and general stats.  
Built with **React + TypeScript + Vite + TailwindCSS** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

🌍 **Live Deployment**  

- **Frontend (Vercel):** [Frontend](https://my-project-phi-ashen.vercel.app/)  
- **Backend (Render):** [Backend](https://myproject-3sc4.onrender.com)

---

## 🚀 Features

- 📊 **Teams & Players** – Browse Euroleague teams and player stats.
- 🏆 **League Leaders** – View leaders in key categories.
- 📈 **General Stats** – Aggregate statistics across the league.
- 🔐 **Authentication** – JWT-based login system.
- ⚡ **Fast & Modern UI** – Built with React Query, React Router, and TailwindCSS.
- 💾 **Persistent Storage** – MongoDB with Mongoose ODM.

---

## 🛠️ Tech Stack

### Frontend
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast bundling
- [TailwindCSS](https://tailwindcss.com/) for styling
- [TanStack Query](https://tanstack.com/query/latest) for server state management
- [TanStack Table](https://tanstack.com/table/latest) for data tables
- [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) for forms & validation
- [React Router v7](https://reactrouter.com/) for routing
- [Axios](https://axios-http.com/) for HTTP requests

### Backend
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) for password hashing
- [dotenv](https://github.com/motdotla/dotenv) for environment variables
- [cors](https://github.com/expressjs/cors) for cross-origin resource sharing

---
## ⚙️ Setup & Installation

### Prerequisites
- Node.js >= 18
- MongoDB (local or cloud, e.g. [MongoDB Atlas](https://www.mongodb.com/atlas))

### Clone the Repository
```bash
git clone https://github.com/your-username/basketball-stats-app.git
cd basketball-stats-app
```

## ⚙️ Backend Setup
```bash
cd basketball-stats-backend
npm install
```

## Create a .env file in basketball-stats-backend/
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Run the backend
```bash
node index.js
```

## 🎨 Frontend Setup
```bash
cd basketball-stats-frontend
npm install
```

## Create a .env file in basketball-stats-frontend/
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

## Run the frontend
```bash
npm run dev
```

## 📊 Usage

- Open [http://localhost:5173](http://localhost:5173) for the frontend (local dev).  
- Backend runs on [http://localhost:5000](http://localhost:5000).  
- Register/Login to access player and team stats.  
- Explore teams, players, leaders, and general Euroleague stats.  

👉 On production, use the **Vercel URL** for the frontend and the **Render API URL** for backend requests.  

## 📜 License

MIT License © 2025 **Nikos Baxevanis**
