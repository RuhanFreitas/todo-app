# To-do App

> This is a simple to-do app, built on top of Express, TypeScript <br> and PostgreSQL.

> The purpose of this project was to build a simple application <br> using pure SQL,
> without relying on an ORM.

<hr />

### TECHNOLOGIES

- Node.js
- Express
- TypeScript
- Zod
- Bcrypt
- JWT
- Node PG
- PostgreSQL
- Docker

<hr />

### ARCHITECTURE

This project was developed using layered architecture, separating <br>
responsibilities and concerns.

- Controller - Handles requests and responses. <br>
- Services - Handles all the business logic. <br>
- Repositories - Handles the database operations. <br>
- Middlewares - Handles the request before it gets to the controller.

![Architecture Diagram](https://i.ibb.co/C35Hby98/Untitled-2026-04-06-1539.png) <br>

<hr />

### STRUCTURE

Here is the application's folder structure, separating <br>
the files according to their responsibilities and entities.

```
src/
├── controllers/
│   ├── auth.controller.ts
│   ├── task.controller.ts
│   └── user.controller.ts
├── db/
│   └── index.ts
├── errors/
│   └── AppError.ts
├── middlewares/
│   ├── authorization.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
├── repositories/
│   ├── task.repository.ts
│   └── user.repository.ts
├── routes/
│   ├── auth.routes.ts
│   ├── task.routes.ts
│   └── user.routes.ts
├── schemas/
│   ├── auth/
│   │   ├── login-user.schema.ts
│   │   └── register-user.schema.ts
│   ├── task/
│   │   ├── create-task.schema.ts
│   │   ├── delete-task.schema.ts
│   │   ├── id-task.schema.ts
│   │   ├── update-task-status.schema.ts
│   │   ├── update-task.schema.ts
│   │   └── user-id.schema.ts
│   └── user/
│       ├── id-user.schema.ts
│       └── update-user.schema.ts
├── services/
│   ├── auth.service.ts
│   ├── task.service.ts
│   └── user.service.ts
├── types/
│   └── user.type.ts
├── utils/
│   ├── bcrypt.ts
│   └── jwt.ts
└── main.ts
```

<hr/>

### ROUTES

The routes mentioned below only work within the context of <br>
your machine, and may differ depending on the port you choose <br>
to run the application on. If your application is running on <br>
a different port, change the value '3000' to your current port.

> Auth
>
> > - @POST Register - http://localhost:3000/auth/register <br>
> >
> > | Register User    |
> > | ---------------- |
> > | name: string     |
> > | email: string    |
> > | password: string |
> >
> > - @POST Login - http://localhost:3000/auth/login
> >
> > | Login User       |
> > | ---------------- |
> > | email: string    |
> > | password: string |
> >
> > User
> >
> > - @GET Find User By Id - http://localhost:3000/user/
> >
> > | Find User By Id |
> > | --------------- |
> > | id: number      |
> >
> > - @PATCH Update User By Id - http://localhost:3000/user/
> >
> > | Update User By Id |
> > | ----------------- |
> > | id: number        |
> >
> > - @DELETE Delete - http://localhost:3000/user/
> >
> > | Delete     |
> > | ---------- |
> > | id: number |
> >
> > Task
> >
> > - @POST Create Task - http://localhost:3000/task/
> >
> > | Create Task         |
> > | ------------------- |
> > | user_id: number     |
> > | title: string       |
> > | description: string |
> >
> > - @GET Find Task By Id - http://localhost:3000/task/
> >
> > | Find Task By Id |
> > | --------------- |
> > | id: number      |
> >
> > - @GET Find All By User Id - http://localhost:3000/task/
> >
> > | Find All By User Id |
> > | ------------------- |
> > | user_id: number     |
> >
> > - @PATCH Update Status - http://localhost:3000/task/update-status
> >
> > | Update Status                                 |
> > | --------------------------------------------- |
> > | task_id: number                               |
> > | user_id: number                               |
> > | status: 'PENDING' OR 'COMPLETED' OR 'ONGOING' |
> >
> > - @PATCH Update Task - http://localhost:3000/task/update
> >
> > | Update Task          |
> > | -------------------- |
> > | task_id: number      |
> > | user_id: number      |
> > | title?: string       |
> > | description?: string |
> >
> > - @DELETE Delete - http://localhost:3000/task/
> >
> > | Delete Task     |
> > | --------------- |
> > | task_id: number |
> > | user_id: number |

<hr/>

### DATABASE TABLES

> | User                   |
> | ---------------------- |
> | id: SERIAL PRIMARY KEY |
> | name: VARCHAR(80)      |
> | email: VARCHAR(80)     |
> | password: TEXT         |
> | created_at: TIMESTAMP  |
> | updated_at: TIMESTAMP  |

> | Task                                                   |
> | ------------------------------------------------------ |
> | id: SERIAL PRIMARY KEY                                 |
> | user_id: INT                                           |
> | title: VARCHAR(80)                                     |
> | description: TEXT                                      |
> | status: task_status ('PENDING', 'COMPLETED,' ONGOING') |
> | created_at: TIMESTAMP                                  |
> | updated_at: TIMESTAMP                                  |

<hr/>

### CONFIGURATION

PS: This project originally runs a PostgreSQL database in a Docker container, <br>
and it is recommended that you have Docker installed. Otherwise, you can <br>
use a cloud service like Neon or your preferred service, as long as you <br>
modify the values ​​in your .env file.

To run this project on your machine, follow these steps:

```
# STEP 1 - Clone the repository using the project's Git url.
git clone https://github.com/RuhanFreitas/todo-app.git

# STEP 2 - Navigate to the project's directory.
cd todo-app

# STEP 4 - Create a .env file in the root directory.

# STEP 5 - Copy everything inside the .env.example
# and paste it into your .env file.

# STEP 3 - Install the necessary dependencies.
npm i

# STEP 4 - Start the development server.
npm run dev
```

To run the PostgreSQL database, you need to:

```
# STEP 1 - Open your terminal and navigate to the project's folder.
cd todo-app

# STEP 3 - Start the PostgreSQL container.
docker compose up

# STEP 3 - Wait for the database to start.
# You must see the following message:
"database system is ready to accept connections"

```
