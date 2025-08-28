import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import RecommendedPage from "./pages/RecommendedPage/RecommendedPage.jsx";
import LibraryPage from "./pages/LibraryPage/LibraryPage.jsx";
import ReadingPage from "./pages/ReadingPage/ReadingPage.jsx";
import WelcomePage from "./pages/WelcomePage/WelcomePage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Header from "./components/Header/Header.jsx";

export default function App() {
  return (
    <>
      <Routes>
        {/* Публічні сторінки */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Приватні сторінки (обгорнуті в PrivateRoute) */}
        <Route element={<PrivateRoute />}>
          <Route
            element={
              <>
                <Header />
                <RecommendedPage />
              </>
            }
            path="/recommended"
          />
          <Route
            element={
              <>
                <Header />
                <LibraryPage />
              </>
            }
            path="/library"
          />
          <Route
            element={
              <>
                <Header />
                <ReadingPage />
              </>
            }
            path="/reading"
          />
        </Route>
      </Routes>
    </>
  );
}
