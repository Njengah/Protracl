# Protracl: Project Task Tracking Tool

**Protracl** is a simple yet powerful task management application designed to help users stay organized and efficiently track their tasks. Built with **Next.js** for the frontend and **FastAPI** for the backend, **Protracl** provides a seamless experience for managing personal or work-related tasks.

This project features a clean and intuitive **login system** for authentication, with **task creation**, **viewing**, and **deletion** functionality. It is built to be lightweight, scalable, and easy to extend with additional features like task prioritization, notifications, or real-time updates.

## Technologies Used:
- **Frontend**: Next.js, React, Axios
- **Backend**: FastAPI, SQLAlchemy (PostgreSQL or SQLite), JWT authentication
- **Database**: PostgreSQL or SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS or CSS Modules

## Features:
- **User Authentication**: Login functionality using JWT-based authentication.
- **Task Management**: Create, view, and delete tasks with due dates.
- **Responsive UI**: Clean, user-friendly interface for managing tasks.
- **API-Driven**: FastAPI backend with RESTful API endpoints.

## Setup:

1. **Clone this repository**:
   ```
   git clone https://github.com/Njengah/Protracl
   cd protracl
2. Install client dependencies (for Next.js):
   ```
    cd client
    npm install
   
3. Install server dependencies (for FastAPI):
   ```
   cd server
   pip install -r requirements.txt

 4. Run the project:

  Client: Run the frontend (Next.js)
  
          npm run dev

 Server: Run the backend (FastAPI)
 
         uvicorn main:app --reload
