
# Todo API with SQLite

This is a simple **Todo API** built with **Node.js**, **Express**, and **SQLite** to manage todo items with persistent storage. The app allows you to create, read, and delete todos, and the data is saved in a **SQLite** database (`todos.db`). 

### Features:
- Add new todo items (via `POST /todos`).
- Retrieve all todo items (via `GET /todos`).
- Delete a todo item by ID (via `DELETE /todos/:id`).

### Technologies Used:
- **Node.js**
- **Express.js**
- **SQLite3** (for persistent data storage)
- **CORS** (to allow cross-origin requests)

---

## Installation

To run this project locally, follow the steps below:

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/todo-api.git
cd todo-api
```

### 2. Install dependencies

Install the necessary dependencies using `npm`:

```bash
npm install
```

### 3. Set up the SQLite database

The project automatically sets up the SQLite database (`todos.db`) when you start the server. It will create a table for storing todos if it doesn't already exist.

### 4. Start the server

Run the following command to start the server:

```bash
npm start
```

The server will start at `http://localhost:3000`.

---

## API Endpoints

### 1. **GET /todos**
- **Description**: Retrieves all todo items from the database.
- **Example Request**:
  ```bash
  curl http://localhost:3000/todos
  ```

- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Test Todo",
      "priority": "high",
      "isComplete": false,
      "isFun": true
    },
    {
      "id": 2,
      "name": "Another Todo",
      "priority": "low",
      "isComplete": false,
      "isFun": false
    }
  ]
  ```

### 2. **POST /todos**
- **Description**: Adds a new todo item to the database.
- **Example Request**:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name": "New Todo", "priority": "low", "isFun": true}' http://localhost:3000/todos
  ```

- **Response**:
  ```json
  {
    "id": 3,
    "name": "New Todo",
    "priority": "low",
    "isComplete": false,
    "isFun": true
  }
  ```

### 3. **DELETE /todos/:id**
- **Description**: Deletes a todo item by its ID.
- **Example Request**:
  ```bash
  curl -X DELETE http://localhost:3000/todos/1
  ```

- **Response**:
  ```json
  {
    "message": "Todo item 1 deleted."
  }
  ```

---

## Deployment on Glitch

To deploy this app on Glitch:

1. **Push your code to GitHub** (if not already done).
2. **Go to Glitch** and create a new project.
3. **Import your GitHub repository** into Glitch.
4. **Configure the database**: Make sure your SQLite database is stored in a folder that persists on Glitch (e.g., the `data` folder).
5. **Start the project** on Glitch, and it will automatically run the server.

Your deployed app URL will be available on Glitch after deployment.

---

## Project Structure

Here is the basic structure of the project:

```
todo-api/
  ├─ node_modules/           # Node.js dependencies
  ├─ public/                 # Static files (HTML, CSS, JS)
  ├─ todos.db               # SQLite database file (stored in the data folder in Glitch)
  ├─ server.js              # The backend API code
  ├─ package.json           # Project metadata and dependencies
  ├─ package-lock.json      # Lock file for consistent installs
  └─ README.md              # Project documentation
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

- **Your Name** - [GitHub Profile](https://github.com/your-username)