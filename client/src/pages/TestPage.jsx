import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTest, submitTest } from "../api";
import { useUser } from "../contexts/UserContext";
import { useHistory } from "../contexts/HistoryContext";

export default function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useUser();
  const { addResult } = useHistory();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTest(id)
      .then((data) => {
        setTest(data);
        setAnswers(Array(data.questions.length).fill(null));
      })
      .catch(() => setError("Тест не найден"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAnswer = (idx) => {
    setAnswers((a) => a.map((v, i) => (i === step ? idx : v)));
  };

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await submitTest(id, answers, token);
      addResult({ testId: id, ...result });
      navigate(`/result/${result.shareCode}`);
    } catch {
      setError("Ошибка отправки");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className="max-w-xl mx-auto py-8 px-4">Загрузка...</div>;
  if (error)
    return (
      <div className="max-w-xl mx-auto py-8 px-4 text-red-500">{error}</div>
    );
  if (!test) return null;

  const q = test.questions[step];
  const answered = answers[step] !== null;
  const isLast = step === test.questions.length - 1;
  const progress = ((step + 1) / test.questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto py-4 px-1 sm:px-4 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg sm:text-2xl font-bold text-blue-700">
            {test.title}
          </h1>
          <span className="text-xs sm:text-sm text-blue-500 font-semibold">
            {step + 1} / {test.questions.length}
          </span>
        </div>
        <div className="w-full h-3 bg-blue-100 rounded-full overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: progress + "%" }}
          ></div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-4 sm:p-8 border border-blue-100 mb-4 sm:mb-6 animate-slide-down">
        <div className="font-semibold text-base sm:text-lg text-blue-800 mb-4 sm:mb-6 animate-fade-in-delay">
          {q.text}
        </div>
        <div className="space-y-2 sm:space-y-3">
          {q.options.map((opt, idx) => (
            <label
              key={idx}
              className={`block px-3 sm:px-5 py-2 sm:py-3 rounded-xl border-2 cursor-pointer font-medium text-sm sm:text-base transition-all duration-200 select-none shadow-sm hover:scale-[1.03] ${
                answers[step] === idx
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                  : "bg-white border-blue-200 text-blue-800 hover:bg-blue-50"
              }`}
            >
              <input
                type="radio"
                className="mr-3 accent-blue-600"
                checked={answers[step] === idx}
                onChange={() => handleAnswer(idx)}
                style={{ display: "none" }}
              />
              {opt.text}
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-2 justify-between mt-4 flex-wrap">
        <button
          onClick={prev}
          disabled={step === 0}
          className="px-4 sm:px-6 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition disabled:opacity-50 text-xs sm:text-base"
        >
          Назад
        </button>
        {!isLast && (
          <button
            onClick={next}
            disabled={!answered}
            className="px-4 sm:px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-xs sm:text-base"
          >
            Далее
          </button>
        )}
        {isLast && (
          <button
            onClick={handleSubmit}
            disabled={!answered || submitting}
            className="px-4 sm:px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 text-xs sm:text-base"
          >
            Завершить
          </button>
        )}
      </div>
    </div>
  );
}
