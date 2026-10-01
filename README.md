# Employee Management CRUD

A simple **Employee/User Management CRUD application** built using **Node.js, Express.js, EJS, and MySQL**.

This project demonstrates how to perform basic database operations through a web application:

* Create a new user
* Read all users
* View individual user details
* Update username
* Delete a user
* Connect Node.js application with MySQL
* Use RESTful routes with HTTP methods

---

## 🚀 Technologies Used

* **Node.js**
* **Express.js**
* **EJS**
* **MySQL**
* **mysql2**
* **Method-Override**
* **UUID**
* **Faker.js**
* **HTML**
* **CSS**

---

## 📌 Features

### 1. Create User

Users can create a new account by providing:

* Username
* Email
* Password

The information is stored in the MySQL database.

### 2. Show All Users

Displays all users stored in the database in a table.

### 3. View User Details

Users can view the details of a particular user using their `userId`.

### 4. Edit User

The username of an existing user can be updated after verifying the password.

### 5. Delete User

A user can be deleted from the database using the DELETE request.

### 6. User Count

The home page displays the total number of users present in the database.

---

## 📂 Project Structure

```text
Employee-Management-CRUD/
│
├── public/
│   └── style.css
│
├── views/
│   ├── home.ejs
│   ├── new.ejs
│   ├── show.ejs
│   ├── Edit.ejs
│   └── see.ejs
│
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🗄️ Database

The project uses **MySQL**.

### Database

```sql
CREATE DATABASE Employee;
```

Select the database:

```sql
USE Employee;
```

### Users Table

```sql
CREATE TABLE users (
    userId VARCHAR(255) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

### Table Structure

| Column   | Data Type    | Description           |
| -------- | ------------ | --------------------- |
| userId   | VARCHAR(255) | Unique ID of the user |
| username | VARCHAR(100) | Username              |
| email    | VARCHAR(100) | User email            |
| password | VARCHAR(255) | User password         |

---

## 📦 Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project folder:

```bash
cd Employee-Management-CRUD
```

Install dependencies:

```bash
npm install
```

---

## 🔧 Required Packages

The project uses the following packages:

```bash
npm install express
npm install ejs
npm install mysql2
npm install method-override
npm install uuid
npm install @faker-js/faker
```

Or install all dependencies from `package.json`:

```bash
npm install
```

---

## ▶️ Run the Application

Start the server:

```bash
node index.js
```

The application runs on:

```text
http://localhost:8080
```

Open the URL in your browser.

---

## 🔄 CRUD Operations

The application follows CRUD operations:

| Operation | HTTP Method | Route            |
| --------- | ----------- | ---------------- |
| Create    | POST        | `/show`          |
| Read All  | GET         | `/show`          |
| Read One  | GET         | `/show/:id`      |
| Edit Page | GET         | `/show/:id/edit` |
| Update    | PATCH       | `/show/:id`      |
| Delete    | DELETE      | `/show/:id`      |

Because HTML forms mainly support `GET` and `POST`, **Method-Override** is used for `PATCH` and `DELETE`.

Example:

```html
<form method="POST" action="/show/<%= data.userId %>?_method=PATCH">
```

Method-Override converts the request into:

```text
PATCH /show/:id
```

---

## 🔌 MySQL Connection

The application connects Node.js to MySQL using the `mysql2` package.

Example:

```javascript
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "Employee",
    password: "YOUR_PASSWORD"
});
```

> Replace `YOUR_PASSWORD` with your local MySQL password. Do not commit your actual database password to GitHub.

---

## 🧭 Application Flow

```text
Browser
   ↓
Express.js
   ↓
EJS Views
   ↓
Express Routes
   ↓
MySQL
   ↓
Users Table
```

For example, when creating a user:

```text
New User Form
      ↓
POST /show
      ↓
req.body
      ↓
INSERT INTO users
      ↓
MySQL Database
      ↓
Redirect to /show
```

---

## 📝 Learning Concepts

This project helps understand:

* Node.js
* Express.js
* Routing
* RESTful APIs
* CRUD operations
* EJS templating
* Dynamic URLs
* Route parameters
* HTML forms
* `req.body`
* `req.params`
* MySQL
* SQL queries
* `mysql2`
* Method Override
* UUID
* Static files
* Middleware
* MVC-style project organization

---

## 👨‍💻 Author

**Kirana S Doddamani**

---

## 📄 License

This project is created for learning and educational purposes.
