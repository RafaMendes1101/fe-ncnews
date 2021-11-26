import { useEffect, useState, useContext } from "react";
import { AppContext } from "../contexts/contexts";
import {
  getArticleById,
  getAuthorName,
  getComments,
  postComment,
} from "../utils/api";
import { Navigate } from "react-router-dom";
import Votes from "./Votes";
export default function ArticleById() {
  const { articleId, currentUser } = useContext(AppContext);
  const [article, setArticle] = useState({});
  const [authorName, setAuthorName] = useState("");
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({ author: "", body: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [isAddCommentOpen, setIsAddCommentOpen] = useState(false);
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
  const ExpandAddComment = (props) => {
    const toggleIsOpen = () => {
      getComments(article.article_id).then((comments) => {
        setComments(comments);
      });
      setIsAddCommentOpen((prevIsOpen) => !prevIsOpen);
    };
    return (
      <div className="AddComment">
        <span onClick={toggleIsOpen}>Add Comment</span>
        {isAddCommentOpen && props.children}
      </div>
    );
  };

  const addComment = () => {
    setNewComment(commentObj);
    postComment(articleId, newComment);
  };
  let commentObj = {};
  const createComment = (name, value) => {
    commentObj["author"] = name;
    commentObj["body"] = value;
  };

  const handleChange = (e) => {
    createComment(e.target.name, e.target.value);
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
        <h2>Comments</h2>
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
      <ExpandAddComment>
        <h2>Add Comment</h2>
        <form>
          <input
            id="comment-area"
            onChange={handleChange}
            name={currentUser.username}
          />
        </form>
        <button onClick={addComment}>Submit</button>
      </ExpandAddComment>
    </main>
  );
}
