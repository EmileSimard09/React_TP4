import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./assets/css/main.css";
import MemoryGame from "./components/MemoryGame";
import App from "./components/App";
import UserEditView from "./components/user/UserEditView";
import PasswordEditView from "./components/user/PasswordEditView";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AuthContainer from "./components/auth/AuthContainer";
import SignUpView from "./components/auth/SignUpView";
import LoginView from "./components/auth/LoginView";
import Logout from "./components/auth/Logout";
import NotFound from "./components/NotFound";
import Evaluations from "./components/Evaluations";
import CreateEval from "./components/CreateEval";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<MemoryGame />} />
          <Route path="Evals" element={<Evaluations />} />
          <Route path="" element={<ProtectedRoutes />}>
            <Route path="user-edit/me" element={<UserEditView />} />
            <Route path="password-edit/me" element={<PasswordEditView />} />
            <Route path="AddEvals" element={<CreateEval />} />
          </Route>
          <Route path="" element={<AuthContainer />}>
            <Route path="login" element={<LoginView />} />
            <Route path="signup" element={<SignUpView />} />
          </Route>
        </Route>
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
