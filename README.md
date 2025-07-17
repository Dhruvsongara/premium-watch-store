# ⌚ Premium Watch Store

A modern, full-stack watch delivery web application featuring AngularJS frontend, Express.js backend, and MongoDB database. This project allows users to browse, filter, and purchase premium watches with cart and authentication functionality.

---

## 📦 Step 1: Download the Project

Download the zipped project folder: premium_watch_store_zipped.zip


Once downloaded, extract it into your desired directory.

---

## 🚀 Step 2: Project Structure

After extracting, you'll find:

premium-watch-store/
├── backend/
│ ├── server.js
│ ├── models/
│ ├── routes/
│ └── package.json
├── frontend/
│ ├── index.html
│ ├── css/
│ ├── js/
│ └── assets/

## 🖥️ Step 3: Run the Backend (Node.js + Express + MongoDB)

### 3.1 Navigate to backend folder

```bash
cd backend

###3.2 Install backend dependencies
npm install

###3.3 Make sure MongoDB is running
Ensure MongoDB is installed and running locally at:mongodb://localhost:27017/premium-watch-store

If not, start MongoDB using:  mongod

###3.4 Start the backend server
node server.js

If successful, you should see:  MongoDB connected...
                                Server running on port 5000

🌐 Step 4: Run the Frontend (AngularJS)
No build tool needed — just open the frontend with a live server or in your browser.

4.1 Navigate to the frontend folder

cd ../frontend

4.2 Open index.html in your browser
You can either:

Open index.html directly by double-clicking it, or

Use VS Code with the Live Server extension

🔐 Step 5: Authentication Flow
Users can sign in / sign up

Auth tokens are stored in localStorage

Backend APIs are protected via Bearer token

🛒 Features
🔐 Login / SignUp with JWT authentication

📋 List of premium watches (from MongoDB)

📂 Filter by categories

🛒 Add to cart

🧾 View individual watch details

📦 REST API with full CRUD capability (expandable)

💌 Newsletter section (UI only)
