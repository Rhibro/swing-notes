# 📝 Swing-Notes

Swing-Notes is a full-stack note-taking application that allows users to securely create, manage, and search personal notes. It features user authentication, JWT-based access control, and a responsive UI with interactive note management.

---

## 🚀 Features

- 🔐 User authentication with JWT
- 🧠 Create, update, delete, and search notes
- 🔍 Search notes by title
- 📅 Timestamps showing when notes were created & last updated
- 🧭 Responsive frontend with interactive buttons and real-time feedback
- 🔒 Personal notes only visible to the authenticated user

---

![Skärmbild 2025-06-16 102948](https://github.com/user-attachments/assets/060aae54-bdec-466c-81fe-ca617da1bd77)

![Skärmbild 2025-06-16 103010](https://github.com/user-attachments/assets/80bf8d88-d5a5-4ad7-9853-7e5de3214a2a)

## 🛠️ Tech Stack

**Frontend:**
- JavaScript
- HTML/CSS (or any framework you used — update here if needed)

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- SQL

**Authentication & Security:**
- JWT (JSON Web Tokens)
- bcrypt
- dotenv
- cors

**Documentation:**
- Swagger (OpenAPI 3.0)

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL (via [pgAdmin4](https://www.pgadmin.org/download/) or CLI)
- npm

### 🔧 Environment Setup

Create a `.env` file inside the `backend/` directory with the following:

```env
PORT=3000
DATABASE_URL=your_postgres_connection_url
JWT_SECRET=your_super_secret_key
```
## 🧪 Running the App Locally

### 1. Clone the repository

```
git clone https://github.com/your-username/swing-notes.git
cd swing-notes
```
### 2. Install dependencies

```
cd frontend
npm install

cd ../backend
npm install

```

### 3. Start the app
in two separate terminals:

```
# Terminal 1 - Frontend
cd frontend
npm run dev
```
```
# Terminal 2 - Backend
cd backend
npm run dev
```

## 📘 API Documentation
Swagger UI is available at:

```
http://localhost:3000/api-docs
```
It provides detailed documentation of all available endpoints for user and note management.

## 🖥️ User Experience

- After logging in, the user’s name is displayed at the top of the page.

- Notes show when they were created and last updated.

- Users can:

    - Create notes

    - Edit notes

    - Delete notes

    - Search notes by title

-Interactive UI elements make the experience intuitive and responsive.

## 🧱 Project Structure

```
swing-notes/
├── frontend/
│   └── ... (your client-side code)
├── backend/
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   ├── swagger.js
│   └── ...
├── README.md
└── .env (you create this manually)
```

## 📈 Future Plans

- Note tagging and categorization

- Dark mode toggle

## 🤝 Contributing
Feel free to fork this repo, make improvements, and open a pull request. All feedback and suggestions are appreciated!
