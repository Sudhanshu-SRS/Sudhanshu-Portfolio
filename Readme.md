# Sudhanshu's Portfolio

Welcome to my completely dynamic, futuristic, and full-stack developer portfolio! This comprehensive repository includes an interactive frontend experience, a powerful secure backend, and a modern admin panel to seamlessly manage my entire portfolio content.

## 🚀 Overview

This repository is divided into three core sections:
1. **Frontend (`portfolio-app`)** - A visually stunning, React-based user interface with sophisticated animations, including an interactive 3D Keyboard interface and an Awwwards-level interactive tech stack display.
2. **Backend (`backend`)** - A robust Node.js/Express.js REST API with a MongoDB database, handling secure authentication, file uploads, and data management.
3. **Admin Panel (`Admin`)** - A dedicated React/CoreUI dashboard tailored to securely manage all portfolio data—including projects, skills, certificates, and more.

---

## 💻 Tech Stack & Features

### 1. Frontend (`portfolio-app`)
- **Frameworks/Libraries:** React.js, Vite, Tailwind CSS, Framer Motion, Lucide React, Axios.
- **Key Features:**
  - Highly optimized global styles and dynamic animations (Glassmorphism, 3D Keyboard Interactive UI).
  - Responsive, seamless scrolling layout avoiding native mobile scroll behavior gaps.
  - Interactive "Arsenal" component displaying my tech stack dynamically.
  - Smooth scrolling, hover effects, and modern UX design principles across all pages.

### 2. Backend API (`backend`)
- **Frameworks/Libraries:** Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt.js, ImageKit, Multer, Nodemailer, Helmet, Zod.
- **Key Features:**
  - Secure MVC Architecture and clear routing.
  - Robust user authentication (JWT-based) and authorization strategies like Authentication Guards.
  - Advanced security protocols enabled (CORS, Express Rate Limit, Helmet, Mongo Sanitize).
  - Direct image handling and uploads using ImageKit Cloud and Multer.
  - Automated emailing features configured using Nodemailer.

### 3. Admin Panel (`Admin`)
- **Frameworks/Libraries:** React.js, Vite, Tailwind CSS, CoreUI Admin Templates, React Hook Form, Framer Motion, Zod, Radix UI.
- **Key Features:**
  - Fully responsive, beautiful administrative dashboard integrated with Radix primitives.
  - Secure CRUD operations over my entire portfolio structure.
  - Drag-and-drop integrated layouts and modern data tables to visually trace activities (Projects, Skills, Certificates, Admin Management).
  - Toast notifications and beautifully styled modal overlays.

---

## 📂 Project Structure (Root Folder)

```text
Sudhanshu Portfolio/
├── portfolio-app/        # Main Frontend Application (React/Vite)
├── backend/              # Main Server Application (Node.js/Express)
├── Admin/                # Administrative Dashboard (React/CoreUI)
├── .git/                 # Git Version Control
├── .gitignore            # Git Ignore Rules
└── Readme.md             # This comprehensive file
```

---

## 🛠️ Usage & Setup Guide

Ensure that you have [Node.js](https://nodejs.org/) installed before proceeding.

### Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Set up a `.env` file referencing the necessary credentials (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`, `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT`, `NODEMAILER` credentials).
4. Run the development server: `npm run dev`

### Frontend Setup
1. Navigate to the `portfolio-app` directory: `cd portfolio-app`
2. Install dependencies: `npm install`
3. Ensure any environment variables pointing to the API URL are appropriately set in `.env`.
4. Start the frontend development server: `npm run dev`

### Admin Panel Setup
1. Navigate to the `Admin` directory: `cd Admin`
2. Install dependencies: `npm install`
3. Configure your API base URLs mirroring the main backend structure.
4. Launch the admin panel: `npm run dev`

---

## 👨‍💻 Author & Connect

**Built by Sudhanshu**

Explore my open-source codebases, exciting 3D web concepts, and powerful MERN-stack implementations on my GitHub.

* **GitHub:** [@Sudhanshu-SRS](https://github.com/Sudhanshu-SRS)
