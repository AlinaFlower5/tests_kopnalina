import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchShareResult } from "../api";

export default function SharePage() {
  const { code } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchShareResult(code)
      .then(setResult)
      .catch(() => setError("Результат не найден"))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading)
    return <div className="max-w-xl mx-auto py-8 px-4">Загрузка...</div>;
  if (error)
    return (
      <div className="max-w-xl mx-auto py-8 px-4 text-red-500">{error}</div>
    );
  if (!result) return null;

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Результат</h1>
      <div className="mb-4">
        Баллы: <span className="font-semibold">{result.score}</span>
      </div>
      <div className="mb-4">{result.resultText}</div>
    </div>
  );
}
