import { useEffect, useState, useContext } from "react";
import { getArticles } from "../utils/api";
import Article from "./Article";
import { AppContext } from "../contexts/contexts";
import { Navigate } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { currentUser } = useContext(AppContext);

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
  if (currentUser.username === "") {
    alert("set a user");
    return <Navigate to="/" />;
  }
  return (
    <main className="Articles">
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <Article
                id={article.article_id}
                title={article.title}
                body={article.body}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
