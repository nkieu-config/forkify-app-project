# 🍴 Forkify Recipe App

A modern, responsive recipe search and management web application built with vanilla JavaScript using the MVC architecture pattern. Search thousands of recipes, bookmark favorites, adjust servings dynamically, and upload your own custom recipes.

---

## 🌐 Live Demo

**👉 [Try the live application](https://nkieu-forkify-app.vercel.app/)**

---

## ✨ Key Features

### 🔍 **Recipe Search**

- Search through **1,000,000+ recipes** using the Forkify API
- Real-time search results with intelligent pagination
- Visual loading states and comprehensive error handling

### 📖 **Recipe Management**

- View detailed recipe information (ingredients, cooking time, servings)
- **Dynamic serving adjustment** with automatic ingredient recalculation
- Fractional quantity display using Fraction.js library
- Direct links to original recipe sources

### ❤️ **Bookmarking System**

- Save favorite recipes with **persistent localStorage**
- Quick access bookmark dropdown menu
- Automatic bookmark synchronization

### 📝 **Recipe Upload**

- Submit your own custom recipes through intuitive form
- **Automatic bookmarking** of uploaded recipes
- Form validation and error handling
- User-generated content badges for identification

### 🎨 **User Experience**

- **Fully responsive design** (mobile, tablet, desktop)
- Smooth animations and micro-interactions
- Loading spinners and state management

---

## 🛠️ Technology Stack

| Technology            | Purpose                           |
| --------------------- | --------------------------------- |
| **JavaScript (ES6+)** | Core application logic            |
| **Sass/SCSS**         | Styling and responsive design     |
| **HTML5**             | Semantic markup                   |
| **Vite**              | Build tool and development server |
| **Fraction.js**       | Ingredient quantity formatting    |
| **Forkify API**       | Recipe data source                |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** or **yarn** package manager
- Modern web browser with ES6+ support
- Internet connection for API access

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nkieu-config/forkify-app-project.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_KEY=your_forkify_api_key_here
   ```

   **📝 Get your free API key:** [Forkify API v2 Documentation](https://forkify-api.jonas.io/v2)

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

---

## 🧠 Learning Outcomes

### **JavaScript & Web Development**

- Deep understanding of **modern JavaScript (ES6+)** syntax and features
- Practical skills in **DOM manipulation**, **event delegation**, and **UI interactivity**
- Efficient use of **asynchronous JavaScript** (`async/await`, Promises)
- Integration with **third-party RESTful APIs** using `fetch` and custom abstraction (`AJAX` helper)

### **Application Architecture**

- Implementation of the **Model-View-Controller (MVC)** architecture for separation of concerns
- Use of **Object-Oriented Programming (OOP)** with reusable class-based views
- Structured and maintainable code via **modular JavaScript** (ES Modules)
- Scalable **state management** for UI and application logic
- Error handling for both **UI and API-related failures**

---

## 📚 Educational Credit

This project was developed as part of **[The Complete JavaScript Course](https://www.udemy.com/course/the-complete-javascript-course/)** by [Jonas Schmedtmann](https://codingheroes.io/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
