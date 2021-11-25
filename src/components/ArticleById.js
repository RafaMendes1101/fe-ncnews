import { useEffect, useState, useContext } from "react";
import { AppContext } from "../contexts/contexts";
import { getArticleById, getAuthorName, getComments } from "../utils/api";
import { Navigate } from "react-router-dom";
import Votes from "./Votes";
export default function ArticleById() {
  const { articleId, currentUser } = useContext(AppContext);
  const [article, setArticle] = useState({});
  const [authorName, setAuthorName] = useState("");
  const [comments, setComments] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getArticleById(articleId).then((article) => {
      setArticle(article);
      getAuthorName(article.author).then((authorName) => {
        setAuthorName(authorName);
      });
    });
  }, [articleId]);
  const ExpandComments = (props) => {
    const toggleIsOpen = () => {
      getComments(article.article_id).then((comments) => {
        setComments(comments);
      });
      setIsOpen((prevIsOpen) => !prevIsOpen);
    };
    return (
      <div className="Comments">
        <span onClick={toggleIsOpen}>See comments</span>
        {isOpen && props.children}
      </div>
    );
  };

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
      <ExpandComments>
        <h1>Comments</h1>
        <ul>
          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <li key={comment.comment_id}>
                  <p>{comment.body}</p>
                  <span>
                    <Votes comment={comment} />
                  </span>
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </ExpandComments>
    </main>
  );
}
