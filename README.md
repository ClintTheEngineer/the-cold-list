# the-cold-list
Web app live at: https://the-cold-list.netlify.app/

Backend (Node.js with Express.js):

    It uses Express.js to create a web server.
    It defines multiple routes for various API endpoints.
    It connects to a PostgreSQL database using the pg library and retrieves data from the Users and Todos tables.
    It handles user registration, login, and password reset functionality.
    It sends emails for password reset requests using Nodemailer.
    It defines middleware for handling CORS, parsing JSON and URL-encoded request bodies, and handling errors.
    It includes a function to delete expired tokens from the reset_tokens table.
    It uses bcrypt for password hashing and validation.
    It uses JSON Web Tokens (JWT) for user authentication.

Frontend (React):

    It uses React to create a user interface for a to-do list application.
    It includes components for user registration, login, password reset, and the to-do list.
    It includes routes for different pages using react-router-dom.
    It sends HTTP requests to the backend API to perform actions like logging in, registering, adding/editing/deleting to-dos, and resetting passwords.
    It handles user authentication and authorization by storing a JWT token in local storage.
    It handles user input for forms, validation, and error messages.
