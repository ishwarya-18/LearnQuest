import React, { useState } from "react";
import AuthenticationFlow from "./components/AuthenticationFlow";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminDashboard from "./components/AdminDashboard";
import LearningModules from "./components/LearningModules";
import SettingsAndSupport from "./components/SettingsAndSupport";
import AITutorAssistant from "./components/AITutorAssistant";
import ErrorReporter from "./components/ErrorReporter";

const pages = [
  { key: "auth", label: "Authentication", component: <AuthenticationFlow /> },
  { key: "student", label: "Student Dashboard", component: <StudentDashboard /> },
  { key: "teacher", label: "Teacher Dashboard", component: <TeacherDashboard /> },
  { key: "admin", label: "Admin Dashboard", component: <AdminDashboard /> },
  { key: "modules", label: "Learning Modules", component: <LearningModules /> },
  { key: "settings", label: "Settings & Support", component: <SettingsAndSupport /> },
  { key: "ai", label: "AI Tutor Assistant", component: <AITutorAssistant /> },
  { key: "error", label: "Error Reporter", component: <ErrorReporter /> },
];

function App() {
  const [page, setPage] = useState("auth");

  return (
    <div>
      <nav>
        {pages.map((p) => (
          <button key={p.key} onClick={() => setPage(p.key)}>
            {p.label}
          </button>
        ))}
      </nav>
      <div>
        {pages.find((p) => p.key === page)?.component}
      </div>
    </div>
  );
}

export default App;