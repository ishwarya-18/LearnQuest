# LearnQuest

**LearnQuest** is a full-stack e-learning platform designed for interactive learning.  
It allows students to play mini-games, take quizzes, watch videos, and track their learning progress. Teachers can manage content, add or remove questions, and monitor student performance. The platform also includes dashboards with XP points, badges, leaderboards, streak tracking, and social media sharing options.

---

## Features

### Student Dashboard
- Access quizzes, mini-games, and video lessons.
- Track progress with progress bars and XP points.
- Resume last lesson where left off.
- Earn badges and maintain learning streaks.
- Share achievements on social media.

### Teacher Dashboard
- Add, edit, and remove quiz questions.
- Upload and manage course content.
- Track student performance and XP.

### Admin Dashboard
- Add/remove teachers and students.
- Monitor platform-wide performance metrics.

---

## Project Structure

```
learnquest/
├─ backend/        # Node.js + Express backend
├─ frontend/       # React frontend
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ utils/
└─ README.md
```

---

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Styling:** CSS / Tailwind (if applicable)
- **Other:** JWT for authentication, REST API

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/<YourUsername>/LearnQuest.git
cd LearnQuest
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Start the backend server:

```bash
cd ../backend
node server.js
```

5. Start the frontend server:

```bash
cd ../frontend
npm start
```

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit: `git commit -m "Description of changes"`.
4. Push to your branch: `git push origin feature-name`.
5. Open a Pull Request.

---

## License
This project is licensed under the MIT License.
