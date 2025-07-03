import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== repeat) {
      setError("Пароли не совпадают");
      return;
    }
    setLoading(true);
    try {
      await register(email, password);
      navigate("/login");
    } catch {
      setError("Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto py-4 px-1 sm:px-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">
        Регистрация
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
        <input
          className="w-full border px-2 sm:px-3 py-2 rounded text-sm sm:text-base"
          placeholder="Повторите пароль"
          type="password"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
        />
        {error && (
          <div className="text-red-500 text-xs sm:text-sm">{error}</div>
        )}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm sm:text-base"
          disabled={loading}
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}
