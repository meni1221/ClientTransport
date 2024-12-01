import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
// import ErrorPage from "../pages/ErrorPage";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
      </Routes>
    </div>
  );
}
