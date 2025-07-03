import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useHistory as useHistoryContext } from "../contexts/HistoryContext";
import { fetchHistory, fetchTest } from "../api";
import { Link } from "react-router-dom";

const shareTestLinks = (url) => [
  {
    name: "ВКонтакте",
    color: "bg-blue-500",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.001 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10.001 10C17.523 22 22 17.523 22 12c0-5.523-4.477-10-9.999-10zm4.89 15.5h-1.13c-.47 0-.68-.38-1.34-1.04-.67-.67-.96-.7-1.13-.7-.23 0-.29.06-.29.36v.98c0 .28-.09.36-.36.36H9.5c-.28 0-.36-.09-.36-.36v-4.13c0-.28.09-.36.36-.36h1.13c.28 0 .36.09.36.36v1.13c0 .23.06.29.36.29.23 0 .29-.06.29-.36v-1.13c0-.28.09-.36.36-.36h1.13c.28 0 .36.09.36.36v1.13c0 .23.06.29.36.29.23 0 .29-.06.29-.36v-1.13c0-.28.09-.36.36-.36h1.13c.28 0 .36.09.36.36v4.13c0 .28-.09.36-.36.36z" />
      </svg>
    ),
    url: `https://vk.com/share.php?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Telegram",
    color: "bg-blue-400",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.707 7.293l-1.414 1.414-2.293-2.293-2.293 2.293-1.414-1.414L12 6.586l4.707 4.707z" />
      </svg>
    ),
    url: `https://telegram.me/share/url?url=${encodeURIComponent(url)}`,
  },
  {
    name: "OK",
    color: "bg-orange-500",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 3.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 16.5c-2.485 0-4.675-1.02-6.364-2.707a1 1 0 0 1 1.414-1.414A7.978 7.978 0 0 0 12 19a7.978 7.978 0 0 0 4.95-1.621 1 1 0 1 1 1.414 1.414A9.978 9.978 0 0 1 12 22zm0-6a5.978 5.978 0 0 1-4.243-1.757 1 1 0 1 1 1.414-1.414A3.978 3.978 0 0 0 12 15c1.104 0 2.104-.447 2.829-1.171a1 1 0 1 1 1.414 1.414A5.978 5.978 0 0 1 12 16z" />
      </svg>
    ),
    url: `https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=${encodeURIComponent(
      url
    )}`,
  },
];

export default function HistoryPage() {
  const { user, token } = useUser();
  const { history: localHistory } = useHistoryContext();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [testTitles, setTestTitles] = useState({});

  useEffect(() => {
    if (token) {
      fetchHistory(token)
        .then(setHistory)
        .catch(() => setError("Ошибка загрузки истории"))
        .finally(() => setLoading(false));
    } else {
      setHistory(localHistory);
      setLoading(false);
    }
  }, [token, localHistory]);

  useEffect(() => {
    const ids = Array.from(new Set(history.map((item) => item.testId)));
    Promise.all(
      ids.map((id) =>
        fetchTest(id)
          .then((t) => [id, t.title])
          .catch(() => [id, "Тест не найден"])
      )
    ).then((pairs) => setTestTitles(Object.fromEntries(pairs)));
  }, [history]);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
  };

  if (loading)
    return <div className="max-w-2xl mx-auto py-8 px-4">Загрузка...</div>;
  if (error)
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-red-500">{error}</div>
    );

  return (
    <div className="max-w-3xl mx-auto py-4 px-1 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center text-blue-700 tracking-tight">
        История прохождения тестов
      </h1>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
        {history.length === 0 && (
          <div className="text-gray-500 col-span-2 text-center">
            Нет истории
          </div>
        )}
        {history.map((item, i) => {
          const testUrl = window.location.origin + `/test/${item.testId}`;
          return (
            <div
              key={i}
              className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-4 sm:p-6 border border-blue-100 flex flex-col gap-2 hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
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
                <span className="font-semibold text-base sm:text-lg text-blue-800">
                  {testTitles[item.testId] || item.testId}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 text-sm sm:text-base">
                  Баллы:{" "}
                  <span className="font-bold text-green-600">{item.score}</span>
                </span>
              </div>
              <div className="text-gray-600 italic border-l-4 border-blue-200 pl-3 py-1 bg-blue-50 rounded-r mb-2 text-xs sm:text-base">
                {item.resultText}
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-gray-400 text-xs">
                  {item.date && new Date(item.date).toLocaleString()}
                </div>
                {item.shareCode && (
                  <Link
                    to={`/share/${item.shareCode}`}
                    className="inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs hover:bg-blue-200 transition"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 8a3 3 0 00-6 0v8a3 3 0 006 0V8z"
                      />
                    </svg>
                    Поделиться результатом
                  </Link>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {shareTestLinks(testUrl).map((btn) => (
                  <button
                    key={btn.name}
                    className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full text-white font-semibold text-xs shadow hover:scale-105 transition ${btn.color}`}
                    onClick={() =>
                      window.open(
                        btn.url,
                        "sharer",
                        "status=0,toolbar=0,width=650,height=500"
                      )
                    }
                    title={btn.name}
                    type="button"
                  >
                    {btn.icon}
                    {btn.name}
                  </button>
                ))}
                <button
                  className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full bg-gray-300 text-gray-700 font-semibold text-xs shadow hover:scale-105 transition"
                  onClick={() => handleCopy(testUrl)}
                  title="Скопировать ссылку"
                  type="button"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16h8M8 12h8m-8-4h8"
                    />
                  </svg>
                  Копировать
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
