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
├── paf_frontend/ # React Frontend
│ ├── public/images/ # Static images used for hardcoded UI
│ └── src/
│ ├── components/ # Header, NaviBar, NaviBar2
│ ├── pages/
│ │ ├── Home.jsx # Post wall with likes/comments
│ │ ├── AllChefs.jsx # Hardcoded chef list
│ │ ├── My_Recipies.jsx # User’s recipe manager
│ │ └── Update_Recipies.jsx # Update recipe modal
│ ├── App.js # Routing setup
│ └── api.js # Axios instance with baseURL
│
├── paf_backend/ # Spring Boot Backend
│ ├── controller/ # RecipeController, UserController
│ ├── dto/ # UserDTO, RecipeTO
│ ├── security/ # JWT auth filters & config
│ └── application.properties # DB & CORS config



---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js and npm
- JDK 17
- MongoDB running locally or use MongoDB Atlas

---

### ▶️ Run Frontend

bash
cd paf_frontend
npm install
npm start

### ▶️ Run Frontend

cd paf_backend
./mvnw spring-boot:run

