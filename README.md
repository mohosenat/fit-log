# 💪  FitLog — Workout Library

FitLog is a modern workout library web application designed to help users discover exercises, explore detailed workout information, build a daily workout plan, save workouts for later, and track completed exercises.

Built with a clean, dark, fitness-focused interface, FitLog provides a simple and responsive experience across desktop, tablet, and mobile devices.

---

## 🌐 Live Demo

🔗 **Live Website:** https://fit-log-lake.vercel.app/

🔗 **GitHub Repository:** https://github.com/mohosenat/fit-log

---

## ✨ Features

### 🏋️ Workout Library

- Browse workouts fetched from the FitLog API
- Responsive workout card grid
- Muscle group/category badges
- Workout name and equipment information
- Duration, calories, and rating statistics
- Click any workout to view its full details

### 🔎 Workout Details

- View detailed information about each workout
- Equipment and difficulty information
- Sets and reps
- Duration and calories
- Workout rating
- Step-by-step instructions
- Add workout to Today's Plan
- Save workout for later

### 📋 My Plan

#### Today's Plan

- Add workouts to your daily plan
- Maximum of 5 workouts
- Automatically calculate:
  - Total exercises
  - Total workout minutes
  - Total calories
- Remove workouts from the plan
- Mark workouts as completed
- View workout details directly from the plan

#### 🔖 Saved Workouts

- Save workouts for later
- View saved workouts separately
- Remove saved workouts
- Live saved counter in the navbar

### 🔔 Toast Notifications

The application provides instant feedback for important actions such as:

- Workout added
- Workout saved
- Workout removed
- Workout marked as done
- Duplicate workout
- Five-workout limit reached

### 💾 Persistent Data

Workout plans, saved workouts, and completed workout states are stored using browser `localStorage`.

Data remains available even after refreshing the page.

### 🔎 Workout Sorting

Workout lists can be sorted by:

- Duration
- Calories
- Rating

### 📱 Responsive UI

FitLog is fully responsive and optimized for:

- 📱 Mobile
- 📟 Tablet
- 💻 Desktop

---

## 🛠️ Technologies

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide React
- React Hot Toast
- FitLog REST API
- Browser localStorage

---

## 🔗 API

### All Workouts

`https://api.abcz.workers.dev/api/fitlog`

### Single Workout

`https://api.abcz.workers.dev/api/fitlog/:id`

---
