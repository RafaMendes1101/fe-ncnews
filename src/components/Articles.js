import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import Article from "./Article";

export default function Articles() {
  const [articles, setArticles] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let query = { sort: "article_id", order: "ASC" };
    getArticles(query)
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  return (
    <main className="Articles">
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <Article
                title={article.title}
                author={article.author}
                body={article.body}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
