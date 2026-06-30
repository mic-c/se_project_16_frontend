const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const getDateRange = () => {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 7);

  return {
    from: from.toISOString().split("T")[0],
    to: to.toISOString().split("T")[0],
  };
};

export const searchArticles = async (keyword) => {
  const { from, to } = getDateRange();

  const url = new URL(newsApiBaseUrl);
  url.searchParams.set("q", keyword);
  url.searchParams.set("apiKey", API_KEY);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  url.searchParams.set("pageSize", "100");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.articles || [];
};
