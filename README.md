# UpSkillr Learning Platform

A modern, interactive learning platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to generate and take customized courses with quizzes.

## Key Features

### User Authentication & Security
- Secure user registration and login system
- JWT-based authentication with HTTP-only cookies
- Persistent sessions with 24-hour token expiration
- Profile management with username and email updates
- Brute force protection
- Rate limiting for API endpoints
- XSS and CSRF protection

### Course Management
- Dynamic course generation based on user input topics
- Support for both MERN-specific and generic course topics
- Comprehensive lesson structure with detailed content
- Interactive quiz system for each course
- Progress tracking and course completion status
- Course deletion functionality

### Dashboard Features
- Modern, responsive user interface
- Real-time course progress visualization
- Detailed quiz score analytics
- Personal learning statistics

### Course Content
- 5 detailed lessons per course with:
  - Comprehensive content in narrative format
  - Estimated duration
  - Interactive quiz
  - Progress tracking

- Advanced quiz system with:
  - Multiple choice questions
  - Immediate feedback
  - Score tracking
  - Quiz retry functionality
  - Performance analytics

## Technical Implementation

### Frontend (React.js)
- Modern React with Hooks
- Responsive design using Tailwind CSS
- Client-side routing with React Router
- State management using React Context
- Error boundary implementation

### Backend (Node.js + Express)
- RESTful API architecture
- JWT authentication middleware
- MongoDB integration with Mongoose
- User progress tracking
- Course data management
- Error handling and logging
- Rate limiting

### Database (MongoDB)
- User management
- Course progress tracking
- Quiz results storage
- Session management

### Security Features
- HTTP-only cookies for JWT
- Password hashing with bcrypt
- Protected API routes
- CORS protection
- Input validation
- Error handling

## Local Setup Guide

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v6 or higher) or yarn

### Step 1: Project Setup

1. Clone the repository:
```bash
git clone [repository-url]

```

2. Create configuration files:

Backend (.env):
```env
MONGODB_URI=mongodb://localhost:27017/upskillr
JWT_SECRET=your_secure_jwt_secret
PORT=5000

```

Frontend (.env):
```env
REACT_APP_API_URL=http://localhost:5000
```

### Step 2: Backend Setup

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Start the backend server:
```bash
# Development mode
nodemon index.js


### Step 3: Frontend Setup

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Start the frontend development server:
```bash
# Development mode
npm run dev


## API Endpoints

### Authentication
- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/logout` - User logout
- POST `/api/auth/update` - Update user profile

### Course Management
- GET `/api/progress` - Get user's course progress
- POST `/api/progress/update` - Update course progress
- DELETE `/api/progress/course/:courseId` - Delete a course

## Features in Detail

### Course Generation
- MERN Stack specific courses with:
  1. Introduction to MERN Stack
  2. Backend Development with Node.js and Express
  3. Database Management with MongoDB
  4. Frontend Development with React
  5. Full Stack Integration and Deployment

- Generic courses with:
  1. Introduction to Topic
  2. Core Concepts
  3. Advanced Topics
  4. Practical Applications
  5. Best Practices and Future Trends

### Quiz System
- Multiple choice questions for each lesson
- Immediate feedback on answers
- Score calculation and display
- Quiz retry functionality
- Progress tracking per course

### User Dashboard
- Course progress visualization
- Quiz score tracking
- Course completion status
- Easy navigation between courses and lessons

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with:
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
