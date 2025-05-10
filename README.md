# 🍳 Let's Cook – Skill Sharing & Recipe Platform

**Let’s Cook** is a full-stack recipe-sharing platform built using **React (Frontend)** and **Spring Boot (Backend)**. It allows users to manage recipes, view cooking posts, and browse a featured list of chefs. Some pages use hardcoded mock data (e.g., post wall, chefs), while others interact with the backend for full CRUD functionality.

---

## ✨ Features

### 👨‍🍳 User-Facing
- Home page with a scrollable **post wall** (hardcoded)
- Browse and manage **personal recipes**
- Upload new recipes with image support
- Update/delete recipes
- Browse featured chefs (hardcoded cards)
- Responsive layout with Material UI (MUI)

### 🔐 Authentication
- JWT-based token authentication
- Secure endpoints for recipe update/delete
- Token is stored in `localStorage` and used in request headers

---

## 🛠️ Tech Stack

- **Frontend:** React 19, MUI, Axios, React Router DOM
- **Backend:** Spring Boot (Java 17), Spring Security + JWT, MongoDB or JPA
- **Other Tools:** Toastify, FormData, Postman for testing

---

## 📁 Project Structure

```bash
lets-cook/
├── paf_frontend/               # React Frontend
│   ├── node_modules/
│   ├── public/                 # Public assets (images, logos)
│   ├── src/
│   │   ├── components/         # Header, NaviBar, NaviBar2
│   │   ├── pages/              # Home, AllChefs, My_Recipies, Update_Recipies
│   │   ├── api.js              # Axios instance for backend
│   │   └── App.js              # Routing setup
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── paf_backend/                # Spring Boot Backend
│   ├── .mvn/
│   ├── .vscode/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/paf/
│   │   │   │   ├── config/      # Security, JWT config
│   │   │   │   ├── controller/  # RecipeController, UserController
│   │   │   │   ├── DTO/         # Data Transfer Objects
│   │   │   │   ├── model/       # MongoDB or JPA models
│   │   │   │   ├── repo/        # Repository interfaces
│   │   │   │   ├── service/     # Business logic
│   │   │   │   └── PafApplication.java
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
