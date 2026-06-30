const TOKEN_STORAGE_KEY = "mock_jwt_token";
const USER_STORAGE_KEY = "mock_current_user";
const SAVED_ARTICLES_STORAGE_KEY = "mock_saved_articles";

const wait = (ms = 400) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const login = async ({ email, password }) => {
  await wait();

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const token = `mock-token-${Date.now()}`;
  const user = {
    email,
    name: email.split("@")[0] || "User",
  };

  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  writeJson(USER_STORAGE_KEY, user);

  return { token, user };
};

export const checkToken = async (token) => {
  await wait(250);

  const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!token || !storedToken || token !== storedToken) {
    throw new Error("Invalid token");
  }

  const user = readJson(USER_STORAGE_KEY, null);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const logout = async () => {
  await wait(150);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const getSavedArticles = async () => {
  await wait(200);
  return readJson(SAVED_ARTICLES_STORAGE_KEY, []);
};

export const saveArticle = async (article) => {
  await wait(250);

  if (!article || !article.url) {
    throw new Error("Article is invalid");
  }

  const savedArticles = readJson(SAVED_ARTICLES_STORAGE_KEY, []);
  const exists = savedArticles.some((saved) => saved.url === article.url);

  if (!exists) {
    savedArticles.push(article);
    writeJson(SAVED_ARTICLES_STORAGE_KEY, savedArticles);
  }

  return savedArticles;
};

export const deleteArticle = async (article) => {
  await wait(250);

  if (!article || !article.url) {
    throw new Error("Article is invalid");
  }

  const savedArticles = readJson(SAVED_ARTICLES_STORAGE_KEY, []);
  const nextArticles = savedArticles.filter(
    (saved) => saved.url !== article.url,
  );
  writeJson(SAVED_ARTICLES_STORAGE_KEY, nextArticles);

  return nextArticles;
};

export const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);
