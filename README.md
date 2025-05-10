# 🍳 Let's Cook – Skill Sharing & Recipe Platform

**Let’s Cook** is a full-stack recipe sharing platform built using **React (Frontend)** and **Spring Boot (Backend)**. It allows users to view cooking posts, manage their own recipes, and browse a featured list of chefs. Some interfaces are hardcoded for demonstration (e.g., post wall, chefs), while recipe CRUD operations interact with the backend.

---

## ✨ Features

### 👨‍🍳 User-Facing
- Home page with a scrollable **post wall** (hardcoded content)
- View and manage **personal recipes**
- Upload new recipes with image support
- Update or delete existing recipes
- View hardcoded **Chef cards** (with image, contact, restaurant)
- Responsive layout with MUI design

### 🔐 Authentication
- JWT-based token auth (stored in localStorage)
- Protected routes using Axios header injection
- Token required for recipe update/delete

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Material UI (MUI), Axios, React Router DOM
- **Backend:** Spring Boot (Java 17), Spring Security, JWT, REST API
- **Database:** MongoDB or JPA-based persistence
- **Other Tools:** Toastify, Postman (for API testing), FormData for image upload

---

## 📁 Project Structure

lets-cook/
├── paf_frontend/                 # React Frontend
│   ├── node_modules/
│   ├── public/                   # Public assets (images, logos)
│   ├── src/                      # React source code
│   │   ├── components/           # Header, NaviBar, NaviBar2
│   │   ├── pages/                # Home.jsx, AllChefs.jsx, My_Recipies.jsx, etc.
│   │   ├── api.js                # Axios instance for backend calls
│   │   └── App.js                # Frontend routing
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── paf_backend/                 # Spring Boot Backend
│   ├── .mvn/
│   ├── .vscode/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/paf/
│   │   │   │   ├── config/        # Spring security, JWT config
│   │   │   │   ├── controller/    # RecipeController, UserController, etc.
│   │   │   │   ├── DTO/           # Data Transfer Objects
│   │   │   │   ├── model/         # MongoDB or JPA entity models
│   │   │   │   ├── repo/          # Repository interfaces
│   │   │   │   ├── service/       # Business logic
│   │   │   │   └── PafApplication.java  # Main Spring Boot class
│   │   │   └── resources/
│   │   │       ├── static/
│   │   │       ├── templates/
│   │   │       └── application.properties
│   │   └── test/
│   ├── .gitignore
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── README.md



---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js and npm
- JDK 17
- MongoDB running locally or use MongoDB Atlas

---

# ▶️ Run Frontend
cd paf_frontend
npm install
npm start


# ▶️ Run Backend
cd paf_backend
./mvnw spring-boot:run


