import { Routes, Route } from "react-router-dom";
import TestListPage from "./pages/TestListPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import SharePage from "./pages/SharePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HistoryPage from "./pages/HistoryPage";
import { UserProvider } from "./contexts/UserContext";
import { HistoryProvider } from "./contexts/HistoryContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <UserProvider>
      <HistoryProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<TestListPage />} />
            <Route path="/test/:id" element={<TestPage />} />
            <Route path="/result/:id" element={<ResultPage />} />
            <Route path="/share/:code" element={<SharePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <HistoryPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </HistoryProvider>
    </UserProvider>
  );
}
