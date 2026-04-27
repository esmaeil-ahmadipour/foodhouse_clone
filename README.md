# Food House – Modern Food Ordering App

A clean, modern, and fast food ordering application built with React 18 and Vite 5. The app features a meals list, an interactive cart modal, and global state management powered by Zustand, with form handling powered by React Hook Form and Zod.

## 🚀 Overview

Food House allows users to:

- Browse meals from a backend API
- Add items to a shopping cart
- Adjust item quantities
- Open/close a responsive cart modal
- Submit orders with form validation
- Enjoy persistent cart state (localStorage)
- Fast performance powered by Vite

Under the hood, the app uses:

- **Zustand** for global UI state (cart, modal)
- **React Hook Form + Zod** for type-safe and performant form handling

## 🎯 Features

- 🛒 Interactive Cart Modal with **Zustand** state management
- 🍽️ Dynamic Meals Listing from API
- 🎯 Centralized Modal System (GlobalModalHost)
- 📦 Persistent Cart State (localStorage)
- ✅ **Form Handling with React Hook Form**
- ✅ **Schema-based Validation with Zod (via @hookform/resolvers)**
- ⚡ Super-fast Dev Server (Vite)
- ♻️ Modular and Reusable Components
- ✨ Clean UI & Maintainable Codebase
- ✔️ ESLint 9 configured for quality

## 🛠 Tech Stack

- React 18
- Vite 5
- JavaScript (ES Module)
- Zustand (Global State Management)
- React Hook Form (Form State Management)
- Zod (Schema-based Validation)
- @hookform/resolvers (RHF + Zod integration)
- ESLint 9
- pnpm

## ⚙️ Backend API Setup

This frontend application is designed to work hand-in-hand with a dedicated backend API.  
Without the backend service, the app cannot fetch data or perform any meaningful operations.

> 🔗 **Backend Repository:**  
> [`foodhouse_clone_api`](https://github.com/esmaeil-ahmadipour/foodhouse_clone_api)

All details about:

- ✅ API setup
- 🔧 Environment configuration
- 🚀 Server startup

are fully documented in the backend repository’s README.

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone <your-repo-url>
cd project
```

### 2. Install dependencies

```
pnpm install
```

### 3. Run the development server

```
pnpm dev
```

### 4. Build for production

```
pnpm build
```

### 5. Preview the build

```
pnpm preview
```

## 📜 Scripts

```
pnpm dev       # Run dev server
pnpm build     # Production build
pnpm lint      # Run ESLint
pnpm preview   # Preview built app
```

## 🔄 Migration from Context API

Migrated from React Context API to Zustand for:

- ✅ Less boilerplate
- ⚡ Better performance (selective subscriptions)
- 💾 Persistent cart (localStorage)
- 🧹 Simpler component logic

Current state architecture:

- 🧺 **Global client state** (cart, modal visibility) – managed by **Zustand**
- 🧾 **Form state** (checkout form) – managed by **React Hook Form**
- ✅ **Validation** – powered by **Zod** (integrated through `@hookform/resolvers`)

## 📄 License

[LICENSE File](./LICENSE)
