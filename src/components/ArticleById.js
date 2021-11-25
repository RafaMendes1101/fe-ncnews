import { useEffect, useState, useContext } from "react";
import { AppContext } from "../contexts/contexts";
import { getArticleById } from "../utils/api";
import { Navigate } from "react-router-dom";
export default function ArticleById() {
  const { articleId, currentUser } = useContext(AppContext);
  const [article, setArticle] = useState({});
  useEffect(() => {
    getArticleById(articleId).then((article) => {
      setArticle(article);
    });
  }, [articleId]);
  if (currentUser.username === "") {
    alert("set a user");
    return <Navigate to="/" />;
  }
  return (
    <>
      <h2>{article.title}</h2>
    </>
  );
}
