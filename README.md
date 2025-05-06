# Smart Todo

A Todo application built using **Node.js**, **React**, and **MongoDB**. It helps manage todos and allows adding/editing tasks, setting priorities, and assigning mentions.

## Features

- **Add, Edit, and Delete Todos**
- **Set Priority** (High, Medium, Low)
- **Mention** other users
- **Pagination** for Todos
- **Search and Filter** Todos by priority, mentions, and notes

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 recommended )
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (or a local MongoDB setup)

### Clone the Repository

```bash
git clone [https://github.com/Anusha-guptha/smart-todo.git](https://github.com/Anusha-guptha/smart-todo.git)
cd smart-todo
```

### Server Setup (Backend)

1. Navigate to the server folder:

    ```bash
    cd server
    ```

2. Create a `.env` file by copying the `.env.example`:

    ```bash
    cp .env.example .env
    ```

3. Update the `.env` file with your MongoDB credentials and other server settings:

    - **MONGO_URI**: Your MongoDB connection string (e.g., from MongoDB Atlas), including updated username and password.
    - **PORT**: The port number where your backend server will run (default is `5000`).

4. Install dependencies:

    ```bash
    npm install
    ```

5. Start the backend server:

    ```bash
    npm start
    ```




### Client Setup (Frontend)

1. Navigate to the client folder:

    ```bash
    cd client
    ```

2. Create a `.env` file by copying the `.env.example`:

    ```bash
    cp .env.example .env
    ```

3. Update the `.env` file with the correct API URL:

    - **VITE_API_URL**: The URL for your backend API (default is `http://localhost:5000/api`)

4. Install dependencies:

    ```bash
    npm install
    ```

5. Start the React development server:

    ```bash
    npm run dev
    ```

---

## Usage

Once both the backend and frontend are set up and running, you can access the Todo application by navigating to the frontend URL:

[http://localhost:5173](http://localhost:5173)

*(This is the default URL when using Vite.)*

---

## Troubleshooting

- Ensure that the **MongoDB credentials** in the `.env` file are correct.
- Make sure the **API URL** in the client's `.env` file matches the backend's URL (e.g., `http://localhost:5000/api`).
- If the server is not starting or there's an issue with dependencies:
  - Delete the `node_modules` folder:
    ```bash
    rm -rf node_modules
    ```
  - Then reinstall dependencies:
    ```bash
    npm install
    ```

---

## License
This is a **practice project** created for learning purposes.
No license has been assigned to this project.

---



