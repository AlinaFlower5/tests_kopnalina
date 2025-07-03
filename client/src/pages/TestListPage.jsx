import React, { useState, useEffect } from "react";
import { fetchTests } from "../api";
import { Link, useLocation } from "react-router-dom";

const TEST_TYPES = [
  { value: "all", label: "Все" },
  { value: "psychological", label: "Психологические" },
  { value: "professional", label: "Профессиональные" },
  { value: "personality", label: "Личностные" },
];

export default function TestListPage() {
  const [filter, setFilter] = useState("all");
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    fetchTests()
      .then(setTests)
      .catch(() => setError("Ошибка загрузки тестов"))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "all" ? tests : tests.filter((t) => t.type === filter);

  if (location.pathname === "/" && !loading && tests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center gap-6">
          <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 animate-slide-down">
            Добро пожаловать в CareerPath!
          </div>
          <div className="text-lg sm:text-xl text-blue-100 max-w-xl text-center animate-fade-in-delay">
            Пройди профессиональные, психологические и личностные тесты, чтобы
            узнать свои сильные стороны и получить рекомендации для будущей
            карьеры.
          </div>
          <svg
            className="w-24 h-24 text-white/80 animate-bounce mt-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-4 px-1 sm:px-4 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-700 text-center">
        Тесты для профориентации
      </h1>
      <div className="flex gap-2 mb-4 sm:mb-6 flex-wrap justify-center">
        {TEST_TYPES.map((type) => (
          <button
            key={type.value}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all font-semibold shadow-sm hover:scale-105 hover:bg-blue-600 hover:text-white text-xs sm:text-base ${
              filter === type.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-blue-600 border-blue-600"
            }`}
            onClick={() => setFilter(type.value)}
          >
            {type.label}
          </button>
        ))}
      </div>
      <div className="space-y-3 sm:space-y-4">
        {loading && <div>Загрузка...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-gray-500">Нет тестов</div>
        )}
        {filtered.map((test) => (
          <Link
            to={`/test/${test._id}`}
            key={test._id}
            className="block bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-3 sm:p-5 hover:bg-blue-50 transition group border border-blue-100"
          >
            <div className="font-semibold text-base sm:text-lg text-blue-800 group-hover:text-blue-900 transition">
              {test.title}
            </div>
            <div className="text-gray-500 text-xs sm:text-sm mt-1">
              {test.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
