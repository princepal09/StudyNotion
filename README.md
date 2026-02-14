# 🚀 StudyNotion – MERN Learning Management System

StudyNotion is a full-stack MERN-based Learning Management System (LMS) designed to allow instructors to create and manage courses while enabling students to enroll and learn seamlessly.

🚧 **Backend development is almost completed. Only a few features and final optimizations are pending.**

---

## 📌 Project Status

Backend: Nearly Complete ✅  
Frontend: Not Started Yet 🚀  
Deployment: Planned 🔄

---

## 🧠 Backend Features Implemented

- ✅ JWT Authentication (Signup / Login)
- ✅ Role-Based Authorization (Student / Instructor / Admin)
- ✅ Course Creation & Management
- ✅ Section & Subsection Management
- ✅ Category Management
- ✅ Razorpay Payment Integration
- ✅ MongoDB Database Integration
- ✅ Protected Routes & Middleware
- ✅ Secure Password Hashing (bcrypt)
- ✅ Modular MVC Architecture

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Razorpay Payment Gateway
- Bcrypt
- Dotenv

### Frontend (Upcoming)

- React (Vite)
- Tailwind CSS

---

## 📁 Backend Project Structure

server/
├── config # Database & third-party configurations
├── controllers # Business logic
├── middlewares # Authentication & custom middlewares
├── models # Database schemas
├── routes # API routes
├── utils # Helper functions
├── index.js # Server entry point
└── package.json

## 🔐 Environment Variables

Create a `.env` file inside the `server/` directory and add the following:

Server Configuration

PORT=4000

Database

MONGODB_URL=your_mongodb_connection_string

Authentication

JWT_SECRET=your_jwt_secret

Cloudinary Configuration

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=your_cloudinary_folder_name

Razorpay Configuration

RAZORPAY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret_key

Mail Configuration

MAIL_HOST=your_mail_host
MAIL_USER=your_mail_user
MAIL_PASS=your_mail_password

## 🚀 Running the Backend Locally

1. Navigate to the server folder: cd server

2. Install dependencies: npm install

3. Start the development server: npm run dev

Server will run at: http://localhost:4000

---

## 🎯 Pending Work

- Final feature refinements
- Additional validations & edge-case handling
- Security improvements
- Backend deployment
- Frontend development

---

## 🏗 Architecture

The backend follows a modular MVC architecture:

- Models → Database schemas
- Controllers → Business logic
- Routes → API endpoints
- Middlewares → Authentication & Authorization
- Config → Database & third-party integrations

---

## 👨‍💻 Author

**Prince Pal**  
Full Stack MERN Developer

- GitHub: https://github.com/princepal09
- LinkedIn: https://linkedin.com/in/princepal09

> If you found this project useful, consider giving it a ⭐ on GitHub.
