# 🍔 MealMate

A responsive food ordering platform where users can search restaurants, browse detailed menus, and manage their cart before checkout — built with React and Redux.

## 📌 Overview

MealMate lets users explore a variety of restaurants, view detailed menu items, and seamlessly add them to a cart. The platform focuses on a smooth, intuitive browsing experience with real-time cart management, making online food ordering simple and efficient.

## ✨ Features

- 🔍 **Restaurant Search** — Search and discover restaurants quickly
- 📋 **Detailed Menus** — Browse restaurant menus with item details
- 🛒 **Add to Cart** — Select, review, and manage items before checkout
- 📱 **Responsive UI** — Smooth navigation across restaurant listings and menu pages on any device
- 🔄 **State Management** — Centralized cart and app state using Redux

## 🛠️ Tech Stack

- **Frontend:** React.js
- **State Management:** Redux (Redux Toolkit)
- **Styling:** CSS
- **Build Tool:** Vite
- **Linting:** ESLint

## 📂 Project Structure

```
food/
├── src/
│   ├── assets/              # Images and static assets
│   ├── components/
│   │   ├── body/
│   │   │   ├── RestaurantMenu.jsx
│   │   │   └── HorizonScroll/
│   │   └── navbar/
│   │       └── Navbar.jsx
│   ├── pages/
│   │   ├── about/
│   │   └── home/
│   │       └── Home.jsx
│   ├── redux/
│   │   ├── CardSlice.jsx    # Cart state management
│   │   └── Store.jsx        # Redux store configuration
│   ├── Cart.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Subash1003/MealMate.git
cd MealMate/food
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 🎯 Usage

1. Browse through the list of available restaurants on the home page
2. Click on a restaurant to view its detailed menu
3. Add desired items to your cart
4. Review and manage items in the cart before proceeding to checkout

## 🔮 Future Enhancements

- User authentication and order history
- Payment gateway integration
- Real-time order tracking
- Restaurant ratings and reviews
- Search filters (cuisine, price range, ratings)

## 👤 Author

**Subash**
GitHub: [@Subash1003](https://github.com/Subash1003)
