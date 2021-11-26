import { useEffect, useState, useContext } from "react";
import { AppContext } from "../contexts/contexts";
import {
  getArticleById,
  getAuthorName,
  getComments,
  postComment,
  deleteComment,
} from "../utils/api";
import { Navigate } from "react-router-dom";
import Votes from "./Votes";
export default function ArticleById() {
  const { articleId, currentUser } = useContext(AppContext);
  const [article, setArticle] = useState({});
  const [authorName, setAuthorName] = useState("");
  const [comments, setComments] = useState({});
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
        <span onClick={toggleIsOpen}>See Comments</span>
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

  let commentObj = {};
  const addComment = (e) => {
    e.preventDefault();
    postComment(articleId, commentObj).then(() => {
      getComments(article.article_id).then((comments) => {
        setComments(comments);
      });
    });
  };
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
                    {comment.author === currentUser.username ? (
                      <button
                        onClick={(e) => {
                          deleteComment(comment.comment_id).then(() => {
                            getComments(article.article_id).then((comments) => {
                              setComments(comments);
                            });
                          });

                          // console.log(comment);
                        }}
                      >
                        Delete Comment
                      </button>
                    ) : (
                      <></>
                    )}
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
        <form onSubmit={addComment}>
          <input
            id="comment-area"
            onChange={handleChange}
            name={currentUser.username}
          />
          <input type="submit" />
        </form>
      </ExpandAddComment>
    </main>
  );
}
