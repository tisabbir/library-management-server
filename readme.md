# 📚 Library Management System API

A Library Management RESTful API built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose**.
---

## 🚀 Live Demo

[🔗 Live Deployment Link](https://your-live-link.com)


---

## 📹 Video Demo

🎥 [Watch the Video Explanation](https://your-video-link.com)


---

## 🧱 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- RESTful API
- Dotenv for config

---
## 🚀 Getting Started

### 1. Clone the project

```bash

git clone https://github.com/your-username/library-management-api.git

cd library-management-api
```

### 2. Install dependencies

```
npm install

```

## 3. Configure Environment

Create a `.env` file in the root of your project:

```
PORT=5000 

DB_URL=mongodb://127.0.0.1:27017/library
```
✅ Use `127.0.0.1` instead of `localhost` to avoid IPv6 issues.


## 4. Run the development server
```
npm run dev
```

## 5. Build for production
```
npm run build
npm start
```

🔌 **API Endpoints**

📘 **Book Routes**

| Method | Endpoint         | Description                                  |
|--------|------------------|----------------------------------------------|
| POST   | /api/books       | Create a new book                            |
| GET    | /api/books       | Get all books (with filters, sort, limit)    |
| GET    | /api/books/:id   | Get book by ID                               |
| PUT    | /api/books/:id   | Update book by ID                            |
| DELETE | /api/books/:id   | Delete book                                  |


📖 **Borrow Routes**

| Method | Endpoint       | Description                                  |
|--------|----------------|----------------------------------------------|
| POST   | /api/borrow    | Borrow a book with due date & quantity       |
| GET    | /api/borrow    | View borrowed book summary (aggregation)     |

---

🧠 **Features Implemented**

✅ Complete Book Management CRUD  
✅ Restrict `genre` field with enums  
✅ Input validation via Mongoose  
✅ Custom error handling & 404 handler  
✅ Realtime `available` status controlled by logic  
✅ Borrow management with business rules:  
&nbsp;&nbsp;&nbsp;&nbsp;• Check if copies are enough  
&nbsp;&nbsp;&nbsp;&nbsp;• Reduce copies upon borrowing  
&nbsp;&nbsp;&nbsp;&nbsp;• Set `available` to false if `copies === 0`  
✅ Mongoose instance method (`updateAvailability`)  
✅ Aggregation Pipeline to summarize borrowed books  
✅ Environment config using `.env` file  
✅ Fully typed with TypeScript  

👨‍💻 **Author**

👨‍🎓 Name: MD Tarekul Islam Sabbir  
💻 GitHub: [@tisabbir](https://github.com/tisabbir)  
📧 Email: tisabbir0@gmail.com

🔗 LinkedIn: [linkedin.com/in/mdtisabbir/](https://www.linkedin.com/in/mdtisabbir/)
