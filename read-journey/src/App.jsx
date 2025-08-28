import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import RecommendedPage from "./pages/RecommendedPage/RecommendedPage.jsx";
import LibraryPage from "./pages/LibraryPage/LibraryPage.jsx";
import ReadingPage from "./pages/ReadingPage/ReadingPage.jsx";
// import WelcomePage from "./pages/WelcomePage/WelcomePage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
// import Header from "./components/Header/Header.jsx";
import { useSelector } from "react-redux";

export default function App() {
  const { token } = useSelector((s) => s.auth);

  return (
    <>
      <Routes>
        {/* Публічні сторінки */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Приватні сторінки */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<RecommendedPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/reading" element={<ReadingPage />} />
        </Route>

        {/* Якщо маршрут не знайдено */}
        <Route
          path="*"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/register" replace />
            )
          }
        />
      </Routes>
    </>
  );
}
