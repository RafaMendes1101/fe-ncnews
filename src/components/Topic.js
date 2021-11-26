import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getArticles } from "../utils/api";
import Article from "./Article";

const ExpandTopic = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="Article">
      <span onClick={toggleIsOpen}>{props.slug}</span>
      {isOpen && props.children}
    </div>
  );
};

export default function Topic({ description, slug }) {
  const [topicArticles, setTopicArticles] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getArticles({ topic: slug })
      .then((articles) => {
        setTopicArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [slug]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <ExpandTopic slug={slug}>
      <p>{description}</p>
      {topicArticles.map((topicArticle) => {
        return (
          <Article
            id={topicArticle.article_id}
            title={topicArticle.title}
            body={topicArticle.body}
          />
        );
      })}
    </ExpandTopic>
  );
}
