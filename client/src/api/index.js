const API_URL = "/api";

export async function fetchTests() {
  const res = await fetch(`${API_URL}/tests`);
  if (!res.ok) throw new Error("Ошибка загрузки тестов");
  return res.json();
}

export async function fetchTest(id) {
  const res = await fetch(`${API_URL}/tests/${id}`);
  if (!res.ok) throw new Error("Тест не найден");
  return res.json();
}

export async function submitTest(id, answers, token) {
  const res = await fetch(`${API_URL}/tests/${id}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) throw new Error("Ошибка отправки теста");
  return res.json();
}

export async function fetchShareResult(code) {
  const res = await fetch(`${API_URL}/share/${code}`);
  if (!res.ok) throw new Error("Результат не найден");
  return res.json();
}

export async function fetchHistory(token) {
  const res = await fetch(`${API_URL}/user/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Ошибка загрузки истории");
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Ошибка входа");
  return res.json();
}

export async function register(email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Ошибка регистрации");
  return res.json();
}

export async function getMe(token) {
  const res = await fetch(`/api/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Ошибка авторизации");
  return res.json();
}
