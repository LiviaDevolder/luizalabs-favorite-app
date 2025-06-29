import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage";
import { HomePage } from "./components/pages/HomePage";
import { FavoritesPage } from "./components/pages/FavoritesPage";
import { ProtectedRoute } from "./router/ProtectedRoute";
import { RegistrationPage } from "./components/pages/RegistrationPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
