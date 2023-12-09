# Tunisie Telecom E-Learning Platform

Welcome to the Tunisie Telecom E-Learning Platform! This application is designed from A to Z to provide online training courses for Tunisie Telecom agents.

## Project Description

This project aims to facilitate the seamless management of training courses within Tunisie Telecom through an innovative web platform. It enables users to engage in interactive e-learning experiences, with features such as user authentication, dynamic course management, module creation, and targeted audience administration.

## Features

- **User Authentication:**
  - Sign up and login functionality for three roles: agent, admin, and trainer.
    
        **Email Verification:**
        - Users will receive a verification email upon registration.
        - Clicking the verification link confirms their email address and activates their account.

        **Forgot Password:**
        - Users can initiate a password reset process if they forget their password.
        - A password reset email will be sent with instructions on how to create a new password.

- **Course Management:**
  - Create, update, and delete training courses.
  - Assign modules to courses.
  - Video Conferencing for courses.

- **Module Management:**
  - Create, update, and delete learning modules.
  - Associate modules with specific courses.

- **Target Audience Management:**
  - Define and manage target audiences for courses.

- **User Management:**
  - Admins can manage users, including agents and trainers.
  - Assign roles and track user progress.

## Tech Stack

- **Frontend:**
  - React.js
  - Redux for state management
  - React Router for navigation
  - Axios for API requests

- **Backend:**
  - Node.js
  - Express.js for RESTful API
  - MongoDB for database storage
  - Mongoose for ODM

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ameni56/E-learning.git
   
2. Navigate to the project directory:
   cd E-learning

3. Install dependencies for both the server and client:
   cd server && npm install
   cd client && npm install
   
4. Create a .env file in the server directory 
   -SALT=10
   -DB=your_mongodb_connection_string
   -PORT=8080
   -JWTPRIVATEKEY=your_private_key
   -BASE_URL=http://localhost:3000/
   -HOST=smtp.gmail.com
   -SERVICE=gmail
   -EMAIL_PORT=587
   -SECURE=true
   -USER=your_email
   -PASS=your_email_password
   
5. Create a .env.local file in the client directory 
   REACT_APP_BASE_URL=http://localhost:8080
   
# In the server directory
npm start

# In the client directory
npm start   

6. Open your browser and navigate to http://localhost:3000 to access the application.
