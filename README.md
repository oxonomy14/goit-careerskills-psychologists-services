
# 🧠 Psychologists.Services - Online Platform for Finding Psychologists

**Psychologists.Services** is a frontend web application for finding and booking psychologists.
The app is built with **React + Vite**, using **Redux Toolkit, React Router, Firebase, and CSS**.

Users can browse psychologists, filter by location and specialization, view detailed profiles, read reviews, and book consultations.

## ✨ Features

- 📌 **Home Page**
  - Banner with main call-to-action button
  - "Find a Psychologist" button redirects to the catalog
- 🧑‍⚕️ **Catalog Page**
  - Displays list of available psychologists
  - Filtering by:
    - A to Z
    - Z to A
    - Less than 10$
    - Greater than 10$
    - Popular
    - Not popular
    - Show all
  - Add/remove psychologists to **Favorites (persisted in LocalStorage)**
  - "Load More" button for pagination
- 📄 **Psychologist Details Page**
  - Photo and profile description
  - Full details (education, experience, methods, languages spoken)
  - User reviews with star rating system
  - Booking form with success notification
- 📱 **Responsive Layout**
  - Fully adaptive design for all screen sizes (mobile, tablet, desktop)
- 🎨 **Three Color Themes**
  - Green, Blue, and Orange color themes for better user experience
- 🔀 **Routing**
  - `/` — Home
  - `/cards` — Catalog
  - `cards/:cardId` — Psychologist details
  - `/favorites` - Favorites list
- ⚡ **Server-side filtering** (performed on backend, not frontend)
- 💾 **Favorites persistence** (stored in LocalStorage)
- ✅ Clean, reusable, component-based codebase

## 🛠️ Tech Stack

- [React + Vite] – project setup
- [Redux Toolkit] – state management
- [React Router] – routing
- [CSS] – styling
- [Firebase] – backend for psychologists listings

---

## 📡 API

The backend is available at:  
[Firebase] – backend for psychologists listings


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/oxonomy14/goit-careerskills-psychologists-services.git
cd goit-careerskills-psychologists-services
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 🌍 Deployment

Deployed on **Vercel/Netlify**:  
👉 [Live Demo]()

---

## 👨‍💻 Author

Developer: **[Andrii Semenenko]**  
GitHub: [oxonomy14](https://github.com/oxonomy14)