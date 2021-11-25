import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/contexts";
const ExpandArticle = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="Article">
      <span onClick={toggleIsOpen}>{props.title}</span>
      {isOpen && props.children}
    </div>
  );
};
export default function Article({ id, title, author, body }) {
  const { setArticleId } = useContext(AppContext);
  return (
    <ExpandArticle title={title}>
      <p>{body}</p>
      <p>{author}</p>
      <Link
        onClick={() => {
          setArticleId(id);
        }}
        to={`/articles/${id}`}
      >
        Go to article page
      </Link>
    </ExpandArticle>
  );
}
