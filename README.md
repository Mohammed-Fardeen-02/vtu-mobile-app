# 📱 VTU Super App

An all-in-one, feature-packed mobile application tailored for **Visvesvaraya Technological University (VTU)** students. Built with **React Native**, **Expo Router**, and **TypeScript**.

---

## ✨ Features

- 📚 **Study Resources & Notes**: Access subject notes, model question papers, passing packages, and last-minute revision materials.
- 📈 **Attendance Tracker**: Track class attendance percentage, set minimum required targets, and view subject-wise attendance logs.
- 🧮 **SGPA & CGPA Calculators**: Calculate semester-wise SGPA and overall CGPA quickly with VTU grading scheme presets.
- 📅 **Academic Calendar & Schedules**: Stay updated with VTU academic notifications, exam schedules, and key circulars.
- 🎯 **Goal Planner**: Create study goals, schedule revision slots, and track completion progress.
- 👥 **Community & Discussions**: Connect with peers, post questions, filter posts by branch/semester, and exchange study tips.
- 🔔 **Real-Time Notifications**: Get notified about important academic announcements and exam reminders.

---

## 🛠️ Tech Stack

- **Framework**: [Expo Router](https://docs.expo.dev/router/introduction/) (React Native v0.86, Expo v57)
- **Language**: TypeScript 5+
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest)
- **Form Management**: React Hook Form & [Zod](https://zod.dev/) validation
- **Styling & Animations**: React Native Reanimated, Expo Linear Gradient
- **Icons**: [Lucide React Native](https://lucide.dev/) & Expo Vector Icons
- **HTTP Client**: Axios

---

## 📂 Project Structure

```
vtu-mobile-app/
├── app/                      # Expo Router screens & layouts (File-based routing)
│   ├── (tabs)/               # Main bottom navigation tabs
│   ├── passing-packages/     # Passing packages routes
│   └── _layout.tsx           # Root layout configuration
├── src/                      # Source code directory
│   ├── components/           # Reusable UI components
│   ├── core/                 # App configuration & core utilities
│   ├── features/             # Feature-based modular architecture
│   │   ├── attendance/       # Attendance tracking components & logic
│   │   ├── auth/             # Authentication & onboarding flow
│   │   ├── calculators/      # SGPA & CGPA calculator tools
│   │   ├── calendar/         # Academic calendar & events
│   │   ├── community/        # Student discussion forum
│   │   ├── goalPlanner/      # Goal setting & daily planner
│   │   ├── home/             # Home dashboard & quick access grid
│   │   ├── notes/            # Notes & study material views
│   │   ├── notifications/    # Push notifications hub
│   │   ├── papers/           # Question paper repository
│   │   └── passingPackages/  # Exam passing package modules
│   ├── infrastructure/       # API clients, interceptors & services
│   ├── shared/               # Shared constants, helpers & themes
│   ├── store/                # Global state stores (Zustand)
│   ├── types/                # TypeScript interface definitions
│   └── utils/                # Utility & helper functions
├── app.json                  # Expo project metadata & configuration
├── babel.config.js           # Babel configuration
├── metro.config.js           # Metro bundler config
└── tsconfig.json             # TypeScript compiler settings
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go App](https://expo.dev/go) installed on your Android/iOS device **OR** Android Studio / Xcode emulator setup.

### Installation

1. Clone the repository (or navigate into the `vtu-mobile-app` directory):
   ```bash
   cd vtu-mobile-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

- **Start Expo Dev Server**:
  ```bash
  npm start
  ```
  *Scan the QR code with the Expo Go app on your physical mobile device.*

- **Run on Android Emulator**:
  ```bash
  npm run android
  ```

- **Run on iOS Simulator** *(macOS only)*:
  ```bash
  npm run ios
  ```

- **Run on Web**:
  ```bash
  npm run web
  ```

- **Type Check**:
  ```bash
  npm run tsc
  ```

---

## 📤 Pushing this App to GitHub / Remote Repository

Follow these step-by-step instructions to create a dedicated repository for `vtu-mobile-app`:

1. **Navigate to the app folder**:
   ```bash
   cd c:\Users\mdfar\OneDrive\Desktop\vtu-applications\vtu-mobile-app
   ```

2. **Initialize Git** *(if not already initialized)*:
   ```bash
   git init
   ```

3. **Stage and Commit all files**:
   ```bash
   git add .
   git commit -m "feat: initial commit for VTU Super App mobile client"
   ```

4. **Create a new repository on GitHub**:
   - Go to [GitHub - New Repository](https://github.com/new).
   - Enter repository name: `vtu-mobile-app` (or your preferred name).
   - Choose **Public** or **Private**.
   - Do **NOT** initialize with README or `.gitignore` (since we already created them).
   - Click **Create repository**.

5. **Link Remote and Push**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/vtu-mobile-app.git
   git push -u origin main
   ```

---

## 📄 License

This project is maintained for VTU Students. All rights reserved.
