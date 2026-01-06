# 🍕 Fast React Pizza Co.

A modern, fast, and responsive pizza ordering application built with **React**, **Redux Toolkit**, and **Tailwind CSS**.

---

## � Live Demo

_(Will be updated once deployed!)_

## 🖼️ Preview

_(Add a screenshot or a GIF of your app here to make it stand out!)_

## �🚀 Key Features

- **Menu Browsing**: View a delicious variety of pizzas fetched from a remote API.
- **Cart Management**: Add, remove, and update pizza quantities in your cart with real-time price calculation.
- **Geolocation Integration**: Automatically fetch user location via Geolocation API for seamless delivery address entry.
- **Priority Orders**: Option to give your order priority for a small fee.
- **Responsive UI**: Optimized for mobile, tablet, and desktop using Tailwind's utility-first approach.
- **Dynamic Routing**: Uses React Router 6.4+ (Loaders and Actions) for efficient data handling.

## 🧠 What I Learned

Through building this project, I gained hands-on experience with:

- **Redux Toolkit**: Implementing slices, complex reducers, and async thunks for handling remote API calls and geolocation data.
- **React Router (Data APIs)**: Mastering `loaders` for fetching data and `actions` for handling form submissions without traditional `useState` for every input.
- **Tailwind CSS**: Building a professional, responsive UI using utility-first CSS and custom configurations.
- **Asynchronous Logic**: Handling loading and error states during complex data fetching operations.
- **State Architecture**: Organizing global state (Cart, User, Order) in a scalable, feature-based directory structure.

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit & React Router (Actions/Loaders)
- **Data Fetching**: Redux Thunks & Fetch API

## 📂 Project Structure

```text
src/
 ├── features/      # Feature-based folders (cart, menu, order, user)
 ├── services/      # API fetching logic
 ├── ui/            # Reusable UI components (Buttons, Loaders, etc.)
 ├── utils/         # Helper functions (formatting currency, dates)
 └── store.js       # Redux store configuration
```

## 📦 Installation & Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Future Scope

- **Dark Mode**: Implement a theme switcher for better night-time accessibility.
- **User Accounts**: Allow users to save their favorite pizzas and order history.
- **Search & Filters**: Add functionality to search for specific pizzas or filter by ingredients (vegetarian, spicy, etc.).

## 🎓 Credits

Built as part of the "The Ultimate React Course" by Jonas Schmedtmann.

---

Project is currently **under development**. Remaining features include performance optimizations and final UI polish.
