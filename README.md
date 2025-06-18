# ⚒️ API CRAFT

**API CRAFT** is a minimal, modular, and scalable backend boilerplate/framework built using **Express.js** and **Mongoose**. It empowers developers to rapidly scaffold and scale RESTful APIs using a clean architecture, CLI initializer, and YAML-powered Swagger docs.

---

## 🧰 Quick Start

Initialize your project with the API CRAFT CLI:

```bash
npx create-api-craft [your_project_name]
```

Or manually clone and start:

```bash
git clone https://github.com/api-craft/create-api-craft
cd [your_project_name]
npm install
npm run dev
```

---

## 🚀 Features

- ⚡ Express.js based HTTP server
- 🌿 Mongoose for MongoDB ODM
- 📁 MVC architecture for clean code organization
- ⚙️ Environment-based `.env` config support
- 🔒 Built-in CORS configuration
- 📄 Swagger UI documentation using YAML (`swagger.yaml`)
- 🧪 Jest for unit and feature testing
- 🔌 Modular folder structure for controllers, routes, models, and services
- 🧰 CLI to scaffold new API projects

---

## 🧪 Run the Project

```bash
npm install
npm run dev
```

Server starts at `http://localhost:3000`

---

## 📘 API Documentation

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

It loads the documentation from your `swagger.yaml` file.

---

## ✅ Running Tests

API CRAFT uses **Jest** for testing.

```bash
npm run test
```

Add your test files inside the `tests/` directory.

---

## 🙌 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the framework.

---

## 📄 License

MIT © P.Thamilselven

---

## 🧰 CLI Tool Repo

**GitHub Repository:**  
[https://github.com/api-craft/create-api-craft](https://github.com/api-craft/create-api-craft)