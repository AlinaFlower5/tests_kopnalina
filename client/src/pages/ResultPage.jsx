import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchShareResult, fetchTest } from "../api";

const shareLinks = (url) => [
  {
    name: "ВКонтакте",
    color: "bg-blue-500",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.001 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10.001 10C17.523 22 22 17.523 22 12c0-5.523-4.477-10-9.999-10zm4.89 15.5h-1.13c-.47 0-.68-.38-1.34-1.04-.67-.67-.96-.7-1.13-.7-.23 0-.29.06-.29.36v.98c0 .28-.09.36-.36.36H9.5c-.28 0-.36-.09-.36-.36v-4.13c0-.28.09-.36.36-.36h1.13c.28 0 .36.09.36.36v1.13c0 .23.06.29.36.29.23 0 .29-.06.29-.36v-1.13c0-.28.09-.36.36-.36h1.13c.28 0 .36.09.36.36v1.13c0 .23.06.29.36.29.23 0 .29-.06.29-.36v-1.13c0-.28.09-.36.36-.36h1.13c.28 0 .36.09.36.36v4.13c0 .28-.09.36-.36.36z" />
      </svg>
    ),
    url: `https://vk.com/share.php?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Telegram",
    color: "bg-blue-400",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.707 7.293l-1.414 1.414-2.293-2.293-2.293 2.293-1.414-1.414L12 6.586l4.707 4.707z" />
      </svg>
    ),
    url: `https://telegram.me/share/url?url=${encodeURIComponent(url)}`,
  },
  {
    name: "OK",
    color: "bg-orange-500",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 3.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 16.5c-2.485 0-4.675-1.02-6.364-2.707a1 1 0 0 1 1.414-1.414A7.978 7.978 0 0 0 12 19a7.978 7.978 0 0 0 4.95-1.621 1 1 0 1 1 1.414 1.414A9.978 9.978 0 0 1 12 22zm0-6a5.978 5.978 0 0 1-4.243-1.757 1 1 0 1 1 1.414-1.414A3.978 3.978 0 0 0 12 15c1.104 0 2.104-.447 2.829-1.171a1 1 0 1 1 1.414 1.414A5.978 5.978 0 0 1 12 16z" />
      </svg>
    ),
    url: `https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=${encodeURIComponent(
      url
    )}`,
  },
];

export default function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let testId = null;
    fetchShareResult(id)
      .then((res) => {
        setResult(res);
        testId = res.testId;
        return fetchTest(testId);
      })
      .then(setTest)
      .catch(() => setError("Результат не найден"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="max-w-xl mx-auto py-8 px-4">Загрузка...</div>;
  if (error)
    return (
      <div className="max-w-xl mx-auto py-8 px-4 text-red-500">{error}</div>
    );
  if (!result || !test) return null;

  const minScore = test.questions.reduce(
    (sum, q) => sum + Math.min(...q.options.map((o) => o.value)),
    0
  );
  const maxScore = test.questions.reduce(
    (sum, q) => sum + Math.max(...q.options.map((o) => o.value)),
    0
  );
  const percent = ((result.score - minScore) / (maxScore - minScore)) * 100;
  const shareUrl = window.location.origin + `/share/${result.shareCode}`;

  return (
    <div className="flex justify-center items-center min-h-[60vh] animate-fade-in px-1 sm:px-0">
      <div className="w-full max-w-2xl bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-2xl p-4 sm:p-10 border border-blue-100 flex flex-col items-center gap-4 sm:gap-6 animate-slide-down">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-1 sm:mb-2 text-center">
          Результат теста
        </h1>
        <div className="text-base sm:text-lg text-blue-900 font-semibold mb-1 sm:mb-2 text-center">
          {test.title}
        </div>
        <div className="w-full max-w-md">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Мин: {minScore}</span>
            <span>Макс: {maxScore}</span>
          </div>
          <div className="relative h-4 bg-blue-100 rounded-full mb-2">
            <div
              className="absolute left-0 top-0 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: percent + "%" }}
            ></div>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg transition-all duration-500"
              style={{ left: `calc(${percent}% - 12px)` }}
            ></div>
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1 sm:mb-2">
          {result.score} баллов
        </div>
        <div className="text-sm sm:text-lg text-blue-800 bg-blue-50 border-l-4 border-blue-400 rounded-r px-3 sm:px-6 py-2 sm:py-4 shadow-inner text-center animate-fade-in-delay">
          {result.resultText}
        </div>
        <div className="flex flex-col items-center gap-2 mt-2 sm:mt-4 w-full">
          <span className="text-gray-500 text-xs sm:text-sm">
            Поделиться результатом:
          </span>
          <div className="flex flex-wrap gap-2 justify-center mt-1">
            {shareLinks(shareUrl).map((btn) => (
              <button
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-white font-semibold text-xs sm:text-sm shadow-md hover:scale-105 transition ${btn.color}`}
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
          </div>
        </div>
      </div>
    </div>
  );
}
