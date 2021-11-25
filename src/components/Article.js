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
export default function Article({ id, title, body }) {
  const { setArticleId } = useContext(AppContext);
  return (
    <ExpandArticle title={title}>
      <p>{body.slice(0, 40)}...</p>
      <Link
        onClick={() => {
          setArticleId(id);
        }}
        to={`/articles/${id}`}
      >
        Read More
      </Link>
    </ExpandArticle>
  );
}
