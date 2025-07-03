import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { useUser } from "../contexts/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: doLogin } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token, user } = await login(email, password);
      doLogin(user, token);
      navigate("/");
    } catch {
      setError("Неверный email или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto py-4 px-1 sm:px-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">
        Вход
      </h1>
      <form
        className="bg-white rounded shadow p-4 sm:p-6 space-y-3 sm:space-y-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full border px-2 sm:px-3 py-2 rounded text-sm sm:text-base"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border px-2 sm:px-3 py-2 rounded text-sm sm:text-base"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="text-red-500 text-xs sm:text-sm">{error}</div>
        )}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm sm:text-base"
          disabled={loading}
        >
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}
