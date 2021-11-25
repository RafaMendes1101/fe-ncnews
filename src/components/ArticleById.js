import { useEffect, useState, useContext } from "react";
import { AppContext } from "../contexts/contexts";
import { getArticleById, getAuthorName } from "../utils/api";
import { Navigate } from "react-router-dom";
export default function ArticleById() {
  const { articleId, currentUser } = useContext(AppContext);
  const [article, setArticle] = useState({});
  const [authorName, setAuthorName] = useState("");
  useEffect(() => {
    getArticleById(articleId).then((article) => {
      setArticle(article);
      getAuthorName(article.author).then((authorName) => {
        setAuthorName(authorName);
      });
    });
  }, [articleId]);

  if (currentUser.username === "") {
    alert("set a user");
    return <Navigate to="/" />;
  }
  return (
    <main className="ArticleById">
      <h2>{article.title}</h2>
      <p>
        Written by: <strong>{authorName}</strong>
      </p>
      <p>{article.body}</p>
    </main>
  );
}
