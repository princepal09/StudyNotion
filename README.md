<p align="center">
  <h1 align="center">📚 StudyNotion</h1>
  <p align="center">
    A full-stack MERN Learning Management System for seamless course creation and learning.
    <br />
    <a href="https://study-notion-ruddy-six.vercel.app"><strong>View Live Demo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/princepal09/StudyNotion/issues">Report Bug</a>
    ·
    <a href="https://github.com/princepal09/StudyNotion/issues">Request Feature</a>
  </p>
</p>

<p align="center">
  <a href="https://github.com/princepal09/StudyNotion">
    <img src="https://img.shields.io/github/stars/princepal09/StudyNotion?style=for-the-badge&color=yellow" alt="Stars" />
  </a>
  <a href="https://github.com/princepal09/StudyNotion/fork">
    <img src="https://img.shields.io/github/forks/princepal09/StudyNotion?style=for-the-badge&color=blue" alt="Forks" />
  </a>
  <a href="https://github.com/princepal09/StudyNotion/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/princepal09/StudyNotion?style=for-the-badge&color=green" alt="License" />
  </a>
</p>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🎯 About The Project

**StudyNotion** is a fully functional EdTech platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It enables **instructors** to create, manage, and publish courses with video lectures, while **students** can browse the catalog, purchase courses via Razorpay, track their progress, and leave ratings & reviews.

The platform features a role-based system with three account types — **Student**, **Instructor**, and **Admin** — each with dedicated dashboards and permissions.

### Key Highlights

- 🎓 Multi-step course creation with sections & video lectures
- 💳 Razorpay payment gateway integration
- 📊 Instructor analytics dashboard with Chart.js
- 🔐 JWT authentication with OTP email verification
- ☁️ Cloudinary-powered media storage (thumbnails & videos)
- 📧 Automated transactional emails via Nodemailer
- 📱 Fully responsive UI built with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|:---|:---|
| **React 19** | UI framework |
| **Vite 7** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Redux Toolkit** | Global state management |
| **React Router DOM 7** | Client-side routing |
| **Axios** | HTTP client |
| **React Hook Form** | Form validation & management |
| **Chart.js / react-chartjs-2** | Instructor analytics charts |
| **Swiper** | Course carousels & sliders |
| **React Player** | Video playback |
| **React Dropzone** | Drag-and-drop file uploads |
| **React Hot Toast** | Toast notifications |
| **React Type Animation** | Typing effects on homepage |
| **React Markdown** | Markdown content rendering |
| **React Stars** | Star rating components |

### Backend

| Technology | Purpose |
|:---|:---|
| **Node.js** | Server runtime |
| **Express 5** | Web framework |
| **MongoDB + Mongoose 9** | Database & ODM |
| **JWT (jsonwebtoken)** | Token-based authentication |
| **bcrypt** | Password hashing |
| **Razorpay** | Payment processing |
| **Cloudinary** | Cloud media storage |
| **Nodemailer** | Transactional emails |
| **otp-generator** | OTP generation for email verification |
| **express-fileupload** | Multipart file handling |

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication (supports cookie, header, and body tokens)
- OTP email verification during signup (auto-expires after 5 minutes)
- Secure password hashing with bcrypt
- Password reset via email token link
- Role-based authorization middleware (Student / Instructor / Admin)

### 🎓 Course Management (Instructor)
- Multi-step course creation wizard:
  1. **Course Information** — Title, description, price, tags, thumbnail, category
  2. **Course Builder** — Add/edit/delete sections & sub-sections (video lectures)
  3. **Publish** — Set course as Draft or Published
- Upload video lectures & thumbnails to Cloudinary
- Edit and delete existing courses
- View all created courses in a management table

### 📂 Catalog & Discovery
- Browse courses by category
- Detailed course page with content accordion, ratings, and pricing
- Public course details with enrollment CTA

### 🧑‍🎓 Student Features
- Add courses to cart and checkout via Razorpay
- Enrolled courses dashboard with progress tracking
- Video player for lecture consumption
- Mark lectures as complete (progress bar updates)
- Submit ratings & reviews for enrolled courses

### 📊 Instructor Dashboard
- Revenue and student enrollment analytics
- Visual charts powered by Chart.js
- Course performance overview

### 👤 Profile Management
- Edit profile details (gender, date of birth, about, contact number)
- Upload/change profile picture via Cloudinary
- Update password
- Delete account permanently

### 📧 Email Notifications
- OTP verification emails (styled HTML templates)
- Password update confirmation
- Course enrollment confirmation
- Payment success notification

### 📞 Contact Us
- Contact form with country code selector
- Submissions stored in database

---

## 🏗 Architecture

The project follows a **monorepo** structure with separate `client/` and `server/` directories, orchestrated by a root `package.json` using `concurrently`.

```
┌─────────────────────────────────────────────────────────────────┐
│                        StudyNotion                              │
│                                                                 │
│  ┌──────────────────────┐        ┌───────────────────────────┐  │
│  │   Client (React)     │  HTTP  │   Server (Express)        │  │
│  │   Port: 3000         │◄──────►│   Port: 4000              │  │
│  │                      │        │                           │  │
│  │  • React 19 + Vite   │        │  • Express 5              │  │
│  │  • Redux Toolkit     │        │  • MVC Architecture       │  │
│  │  • Tailwind CSS      │        │  • JWT Auth Middleware     │  │
│  │  • React Router      │        │  • REST API (v1)          │  │
│  └──────────────────────┘        └─────────┬─────────────────┘  │
│                                            │                    │
│                          ┌─────────────────┼─────────────────┐  │
│                          │                 │                 │  │
│                   ┌──────▼──────┐  ┌───────▼─────┐  ┌───────▼─┐│
│                   │  MongoDB    │  │ Cloudinary  │  │Razorpay ││
│                   │  (Database) │  │ (Media)     │  │(Payment)││
│                   └─────────────┘  └─────────────┘  └─────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Backend Pattern:** MVC (Model → View → Controller) with dedicated middleware, routes, and service layers.

---

## 📁 Project Structure

<details>
<summary><b>📂 Click to expand full project tree</b></summary>

```
StudyNotion/
├── package.json                    # Root — runs client + server concurrently
│
├── client/                         # Frontend (React + Vite)
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── main.jsx                # Entry point (Provider, Router, Toaster)
│       ├── App.jsx                 # Root component with all routes
│       ├── App.css
│       ├── index.css
│       │
│       ├── assets/                 # Static images & logos
│       │   ├── Images/
│       │   ├── Logo/
│       │   └── TimeLineLogo/
│       │
│       ├── components/
│       │   ├── common/             # Shared components
│       │   │   ├── Navbar.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── ConfirmationModal.jsx
│       │   │   ├── IconBtn.jsx
│       │   │   ├── RatingStars.jsx
│       │   │   ├── ReviewSlider.jsx
│       │   │   ├── Spinner.jsx
│       │   │   └── Tab.jsx
│       │   │
│       │   ├── ContactPage/        # Contact page components
│       │   │
│       │   └── core/               # Feature-specific components
│       │       ├── AboutPage/
│       │       ├── Auth/           # Login, Signup, Route guards
│       │       ├── Catalog/        # Course cards & sliders
│       │       ├── Course/         # Course detail views
│       │       ├── Dashboard/      # All dashboard features
│       │       │   ├── AddCourse/  # Multi-step course creation
│       │       │   ├── EditCourse/
│       │       │   ├── Cart/
│       │       │   ├── Settings/
│       │       │   ├── InstructorCourses/
│       │       │   └── InstructorDashboard/
│       │       ├── HomePage/       # Landing page components
│       │       └── ViewCourse/     # Video player & sidebar
│       │
│       ├── data/                   # Static data & configs
│       │   ├── navbar-links.js
│       │   ├── dashboard-links.js
│       │   ├── footer-links.js
│       │   ├── homepage-explore.js
│       │   └── countrycode.json
│       │
│       ├── hooks/
│       │   └── useOnClickOutside.js
│       │
│       ├── pages/                  # Route-level page components
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   ├── About.jsx
│       │   ├── Contact.jsx
│       │   ├── Catalog.jsx
│       │   ├── CourseDetails.jsx
│       │   ├── Dashboard.jsx
│       │   ├── ViewCourse.jsx
│       │   ├── ForgotPassword.jsx
│       │   ├── UpdatePassword.jsx
│       │   ├── VerifyEmail.jsx
│       │   └── Error.jsx
│       │
│       ├── redux/                  # State management
│       │   ├── store.js
│       │   ├── reducer.js
│       │   └── slices/
│       │       ├── authSlice.js
│       │       ├── profileSlice.js
│       │       ├── cartSlice.js
│       │       ├── courseSlice.js
│       │       └── viewCourseSlice.js
│       │
│       ├── services/               # API layer
│       │   ├── apiConnector.js     # Axios wrapper
│       │   ├── apis.js             # All endpoint URLs
│       │   ├── formatDate.js
│       │   └── operations/
│       │       ├── authApi.js
│       │       ├── courseDetailApi.js
│       │       ├── profileApi.js
│       │       ├── SettingsAPI.js
│       │       ├── studentFeatureApi.js
│       │       └── pageAndComponentData.js
│       │
│       └── utils/
│           ├── constants.js        # ACCOUNT_TYPE, COURSE_STATUS enums
│           ├── avgRating.js
│           └── dateFormatter.js
│
└── server/                         # Backend (Express + MongoDB)
    ├── package.json
    ├── server.js                   # Entry point (dotenv, DB, Cloudinary, listen)
    ├── app.js                      # Express app (middleware, routes)
    │
    ├── config/
    │   ├── database.js             # MongoDB connection
    │   ├── cloudinary.js           # Cloudinary config
    │   └── razorpay.js             # Razorpay instance
    │
    ├── controllers/
    │   ├── Auth.js                 # Login, Signup, OTP, Change Password
    │   ├── ResetPassword.js        # Password reset flow
    │   ├── Course.js               # Course CRUD operations
    │   ├── Section.js              # Section CRUD
    │   ├── SubSection.js           # SubSection CRUD
    │   ├── Category.js             # Category management
    │   ├── Profile.js              # Profile & account management
    │   ├── Payment.js              # Razorpay payment flow
    │   ├── RatingAndReview.js      # Ratings & reviews
    │   ├── CourseProgress.js       # Lecture completion tracking
    │   └── Contact.js              # Contact form handler
    │
    ├── middlewares/
    │   └── Auth.js                 # JWT verification, role checks
    │
    ├── models/
    │   ├── User.js                 # User schema (roles, courses, profile)
    │   ├── Profile.js              # Extended profile details
    │   ├── Course.js               # Course schema (sections, ratings, price)
    │   ├── Section.js              # Section → SubSection references
    │   ├── SubSection.js           # Lecture (title, video, duration)
    │   ├── Categories.js           # Course categories
    │   ├── OTP.js                  # OTP with 5-min TTL
    │   ├── RatingAndReview.js      # Course ratings
    │   ├── CourseProgress.js       # Completed videos tracking
    │   └── Contact.js              # Contact form submissions
    │
    ├── routes/
    │   ├── User.js                 # /api/v1/auth/*
    │   ├── Course.js               # /api/v1/course/*
    │   ├── Profile.js              # /api/v1/profile/*
    │   ├── Payments.js             # /api/v1/payment/*
    │   └── Contact.js              # /api/v1/reach/*
    │
    ├── mail/
    │   ├── mailService.js          # Nodemailer transporter
    │   ├── mailTypes.js            # Email sending functions
    │   └── templates/
    │       ├── emailVerificationTemplate.js
    │       ├── passwordUpdate.js
    │       ├── courseEnrollmentEmail.js
    │       └── paymentSuccessEmail.js
    │
    └── utils/
        ├── imageUploader.js        # Cloudinary upload utility
        └── secToDuration.js        # Time formatting helper
```

</details>

---

## 📡 API Reference

All API endpoints are prefixed with `/api/v1`.

### 🔑 Auth Routes — `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|:---|:---|:---:|:---|
| `POST` | `/signup` | ❌ | Register a new user |
| `POST` | `/login` | ❌ | Login and receive JWT token |
| `POST` | `/sendotp` | ❌ | Send OTP to email for verification |
| `POST` | `/changePassword` | 🔒 | Change authenticated user's password |
| `POST` | `/reset-password-token` | ❌ | Generate password reset link |
| `POST` | `/reset-password` | ❌ | Reset password using token |

### 📚 Course Routes — `/api/v1/course`

| Method | Endpoint | Auth | Description |
|:---|:---|:---:|:---|
| `POST` | `/createCourse` | 🔒 Instructor | Create a new course |
| `POST` | `/editCourse` | 🔒 Instructor | Edit existing course |
| `DELETE` | `/deleteCourse` | 🔒 Instructor | Delete a course |
| `GET` | `/getAllCourses` | ❌ | Retrieve all courses |
| `POST` | `/getCourseDetails` | ❌ | Get public course details |
| `POST` | `/getFullCourseDetails` | 🔒 | Get full course details (authenticated) |
| `GET` | `/getInstructorCourses` | 🔒 Instructor | Get instructor's own courses |
| `POST` | `/addSection` | 🔒 Instructor | Add section to course |
| `PATCH` | `/updateSection` | 🔒 Instructor | Update a section |
| `DELETE` | `/deleteSection` | 🔒 Instructor | Delete a section |
| `POST` | `/addSubSection` | 🔒 Instructor | Add lecture (sub-section) |
| `PATCH` | `/updateSubSection` | 🔒 Instructor | Update a lecture |
| `DELETE` | `/deleteSubSection` | 🔒 Instructor | Delete a lecture |
| `POST` | `/createCategory` | 🔒 Admin | Create course category |
| `GET` | `/showAllCategories` | ❌ | List all categories |
| `POST` | `/getCategoryPageDetails` | ❌ | Get category page data |
| `POST` | `/createRating` | 🔒 Student | Submit a rating & review |
| `GET` | `/getAverageRating` | ❌ | Get average rating for a course |
| `GET` | `/getReviews` | ❌ | Get all reviews |
| `POST` | `/updateCourseProgress` | 🔒 Student | Mark a lecture as completed |

### 👤 Profile Routes — `/api/v1/profile`

| Method | Endpoint | Auth | Description |
|:---|:---|:---:|:---|
| `GET` | `/getUserDetails` | 🔒 | Get current user's details |
| `PUT` | `/updateProfile` | 🔒 | Update profile information |
| `PUT` | `/updateDisplayPicture` | 🔒 | Upload/change profile picture |
| `GET` | `/getEnrolledCourses` | 🔒 | Get student's enrolled courses |
| `DELETE` | `/deleteProfile` | 🔒 | Permanently delete account |
| `GET` | `/instructorDashboard` | 🔒 Instructor | Get instructor analytics data |

### 💳 Payment Routes — `/api/v1/payment`

| Method | Endpoint | Auth | Description |
|:---|:---|:---:|:---|
| `POST` | `/capturePayment` | 🔒 Student | Initiate Razorpay payment |
| `POST` | `/verifyPayment` | 🔒 Student | Verify payment signature |
| `POST` | `/sendPaymentSuccessEmail` | 🔒 Student | Send payment confirmation email |

### 📞 Contact Routes — `/api/v1/reach`

| Method | Endpoint | Auth | Description |
|:---|:---|:---:|:---|
| `POST` | `/contact` | ❌ | Submit contact form |

---

## 🗄 Database Schema

The application uses **MongoDB** with **10 collections**:

```
┌──────────┐     ┌───────────┐     ┌──────────┐
│   User   │────►│  Profile   │     │   OTP    │
│          │     └───────────┘     └──────────┘
│ Student  │
│Instructor│──┐  ┌──────────────┐  ┌──────────────────┐
│  Admin   │  └─►│    Course    │◄─┤ RatingAndReview   │
└──────────┘     │              │  └──────────────────┘
                 │  ┌────────┐  │
                 │  │Section │  │  ┌──────────────────┐
                 │  │  ┌─────┤  │  │  CourseProgress   │
                 │  │  │Sub  │  │  │  (completedVideos)│
                 │  │  │Sect.│  │  └──────────────────┘
                 │  └──┴─────┘  │
                 └──────┬───────┘
                        │
                 ┌──────▼───────┐  ┌──────────────────┐
                 │  Categories  │  │     Contact       │
                 └──────────────┘  └──────────────────┘
```

| Model | Key Fields |
|:---|:---|
| **User** | firstName, lastName, email, password, accountType (Admin/Student/Instructor), courses[], image, token |
| **Profile** | gender, dateOfBirth, about, contactNumber |
| **Course** | courseName, description, instructor, price, thumbnail, status (Draft/Published), courseContent[], studentsEnrolled[] |
| **Section** | sectionName, subSection[] |
| **SubSection** | title, timeDuration, description, videoUrl |
| **Category** | name, description, course[] |
| **OTP** | email, otp, createdAt (TTL: 5 min) |
| **RatingAndReview** | user, rating, review, course |
| **CourseProgress** | courseId, userId, completedVideos[] |
| **Contact** | firstname, lastname, email, phoneNo, countrycode, message |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **MongoDB** (Atlas or local instance)
- **Cloudinary** account (for media uploads)
- **Razorpay** account (for payment processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/princepal09/StudyNotion.git
   cd StudyNotion
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

5. **Set up environment variables** (see [Environment Variables](#-environment-variables) section below)

6. **Run the development server** (starts both client & server)
   ```bash
   npm run dev
   ```

   Or run them separately:
   ```bash
   npm run client    # Frontend only → http://localhost:3000
   npm run server    # Backend only  → http://localhost:4000
   ```

---

## 🔐 Environment Variables

### Client — `client/.env`

```env
VITE_BASE_URL=http://localhost:4000/api/v1
VITE_RAZORPAY_KEY=your_razorpay_key_id
```

### Server — `server/.env`

```env
# Server
PORT=4000

# Database
MONGODB_URL=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=your_cloudinary_folder_name

# Razorpay
RAZORPAY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret_key

# Mail (SMTP)
MAIL_HOST=your_mail_host
MAIL_USER=your_mail_user
MAIL_PASS=your_mail_password
```

> **Note:** A `.env.example` file is available in the `server/` and `client/` directory for reference.

---

## 🗺 Frontend Routes

| Route | Page | Access |
|:---|:---|:---|
| `/` | Home | Public |
| `/login` | Login | Unauthenticated only |
| `/signup` | Signup | Unauthenticated only |
| `/forgot-password` | Forgot Password | Unauthenticated only |
| `/update-password/:id` | Reset Password | Unauthenticated only |
| `/verify-email` | OTP Verification | Unauthenticated only |
| `/about` | About Us | Public |
| `/contact` | Contact Us | Public |
| `/catalog/:catalogName` | Course Catalog | Public |
| `/courses/:courseId` | Course Details | Public |
| `/dashboard/my-profile` | My Profile | 🔒 Authenticated |
| `/dashboard/settings` | Account Settings | 🔒 Authenticated |
| `/dashboard/cart` | Shopping Cart | 🔒 Student |
| `/dashboard/enrolled-courses` | Enrolled Courses | 🔒 Student |
| `/dashboard/instructor` | Instructor Dashboard | 🔒 Instructor |
| `/dashboard/add-course` | Create Course | 🔒 Instructor |
| `/dashboard/my-courses` | My Courses | 🔒 Instructor |
| `/dashboard/edit-course/:courseId` | Edit Course | 🔒 Instructor |
| `/view-course/:courseId/section/:sectionId/sub-section/:subSectionId` | Video Player | 🔒 Student |
| `*` | 404 Error Page | Public |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 👨‍💻 Author

**Prince Pal**
*Full Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-princepal09-181717?style=for-the-badge&logo=github)](https://github.com/princepal09)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-princepal09-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/princepal09)

---

<p align="center">
  If you found this project useful, consider giving it a ⭐ on <a href="https://github.com/princepal09/StudyNotion">GitHub</a>!
</p>
