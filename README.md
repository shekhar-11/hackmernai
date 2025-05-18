# HackMernAI Project
upskiller is an intelligent course generation platform that leverages Google's Gemini AI to create personalized educational content.
When users input a topic of interest, the system intelligently processes and corrects the input using AI, then generates a comprehensive
5-part mini-course complete with lessons and quizzes.
The platform features a modern dashboard where users can track their learning progress, complete interactive lessons, and take quizzes. 
Each course includes detailed lesson content, duration estimates, and progress tracking.
The system also implements content filtering to ensure educational appropriateness and uses AI to intelligently interpret and correct user inputs,
making it easier for users to find relevant educational content even with imprecise queries.
The platform combines secure user authentication with an intuitive interface, allowing users to manage their courses, track progress, and 
receive personalized learning experiences powered by advanced AI technology.


## Project Structure

The project is organized into two main directories:

### Frontend (`/frontend`)
- Built with React and Vite
- Uses Tailwind CSS for styling
- Modern development setup with ESLint and PostCSS

### Backend (`/backend`)
- Node.js/Express.js server
- MongoDB database integration
- Google Gemini AI integration
- Authentication system with JWT
- RESTful API architecture

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- ESLint
- PostCSS

### Backend
- Node.js
- Express.js
- MongoDB
- Google Gemini AI
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled
- dotenv for environment variables

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- MongoDB
- Google Gemini AI API key

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with necessary environment variables
4. Start the server:
   ```bash
   npm start
   ```

## Features
- User authentication and authorization
- AI-powered functionality using Google Gemini
- RESTful API endpoints
- Secure password handling
- Modern responsive UI with Tailwind CSS

## Detailed Functionality

### Authentication System
- User Registration (Sign Up)
  - Secure user registration with password hashing
  - Input validation and error handling
  - Unique email verification
- User Login
  - JWT-based authentication
  - Secure session management
  - Remember me functionality
- User Profile Management
  - Update user information
  - Secure profile modifications
- Logout System
  - Secure session termination
  - Token invalidation

### AI Integration
- Google Gemini AI Features
  - Natural language processing
  - AI-powered responses
  - Context-aware interactions
 

### Security Features
- JWT-based authentication
- Password encryption using bcryptjs
- Protected API routes
- CORS protection
- Secure cookie handling

### User Interface
- Responsive design using Tailwind CSS
- Modern and intuitive user experience
- Real-time feedback and notifications
- Clean and accessible interface

## Development
- Frontend runs on Vite dev server
- Backend uses nodemon for development
- ESLint for code quality
- Tailwind CSS for styling

## API Endpoints

### Authentication Routes
- POST `/api/auth/signUp` - User registration
- POST `/api/auth/login` - User login
- POST `/api/auth/update` - Update user profile
- GET `/api/auth/logout` - User logout

### Protected Routes
- All routes requiring authentication are protected with JWT verification
- Middleware ensures secure access to protected resources
