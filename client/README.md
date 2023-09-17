#Advanced To-Do List

To-Do List built with React, Express, and Node.js, utlizing PostgreSQL for the database.
User can create an account and login. (hashed password is stored in Postgres table, password is hashed using bcrypt).
Users are unable to create an account if either the inputted e-mail or username is already in use. Password complexity requirements are enforced.
User can create, edit or delete todos.
User can reset forgotten password, reset tokens are e-mailed to user upon request. (reset tokens are stored in table and auto-deleted if older than 1 hour after every server restart)