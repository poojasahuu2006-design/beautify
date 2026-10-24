# 💄 Beautify — Full-Stack E-Commerce & Luxury Boutique Web Application

[![Live Backend](https://img.shields.io/badge/Live_API-Render_Cloud-brightgreen?style=for-the-badge&logo=render)](https://beautify-backend-yuto.onrender.com)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/poojasahuu2006-design/beautify)
[![Frontend](https://img.shields.io/badge/Frontend-React_18_&_Vite-61DAFB?style=for-the-badge&logo=react)](https://beautifybrand.netlify.app/)
[![Backend](https://img.shields.io/badge/Backend-Node.js_&_Express_5-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![Database](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)

A full-stack, responsive luxury cosmetic boutique and e-commerce application built with **React 18**, **Vite**, **Node.js**, **Express.js**, and **MongoDB Atlas**. It features secure salted password hashing, decoupled REST APIs, dynamic product catalogs, and automated multi-service Render Blueprint deployment.

---

## 🌐 Live Deployment & Service Links

| Resource | URL | Status |
|---|---|---|
| 🚀 **Live Backend API** | [https://beautify-backend-yuto.onrender.com](https://beautify-backend-yuto.onrender.com) | ![Online](https://img.shields.io/badge/Status-Online-brightgreen) |
| 🩺 **System Health Check** | [https://beautify-backend-yuto.onrender.com/health](https://beautify-backend-yuto.onrender.com/health) | ![Healthy](https://img.shields.io/badge/Health-200_OK-brightgreen) |
| 🛍️ **Live Storefront (Frontend)** | [https://beautifybrand.netlify.app](https://beautifybrand.netlify.app) | ![Online](https://img.shields.io/badge/Status-Online-brightgreen) |

---

## ✨ Key Features

- **Decoupled Full-Stack Architecture:** Ultra-fast React 18 single-page application (SPA) powered by Vite, communicating with an isolated Express.js REST API server.
- **Secure Authentication:** 10-round salted bcrypt password hashing (`bcryptjs`) and MongoDB user schema validation.
- **Live Product Catalog:** Integrates live cosmetics catalog via external makeup product API.
- **Multi-Service Blueprint:** Managed via `render.yaml` infrastructure-as-code orchestrating both frontend and backend in a unified deployment.
- **Resilient CORS & Routing:** Pre-configured CORS policies and SPA redirect rules preventing 404s on page refresh.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Service uptime & operational health check |
| `GET` | `/api/status` | API connectivity verification status |
| `POST` | `/api/signup` | Register new user account with hashed credentials |
| `POST` | `/api/login` | Authenticate user credentials and return user profile |
| `GET` | `/api/users` | Fetch registered user directories (sanitized) |

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite 5, React Router DOM v6, Lucide React, Custom CSS3
- **Backend:** Node.js, Express.js 5, Mongoose 9
- **Database:** MongoDB Atlas (M0 Cloud Cluster)
- **Deployment:** Render Cloud (Blueprint Infrastructure), Netlify

---

## 💻 Local Setup & Installation

### 1. Clone Repository
```bash
git clone https://github.com/poojasahuu2006-design/beautify.git
cd beautify
```

### 2. Setup Frontend
```bash
npm install
npm run dev
```

### 3. Setup Backend
```bash
cd backend
npm install
npm start
```

---

## 👤 Author
- **Pooja Sahu** — [GitHub Profile](https://github.com/poojasahuu2006-design)
