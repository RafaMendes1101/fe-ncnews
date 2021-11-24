import { useState } from "react";
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
export default function Article({ title, author, body }) {
  return (
    <ExpandArticle title={title}>
      <p>{body}</p>
      <p>{author}</p>
    </ExpandArticle>
  );
}
