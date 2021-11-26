import { useEffect, useState, useContext } from "react";
import { AppContext } from "../contexts/contexts";
import { Navigate } from "react-router-dom";
import { getTopics } from "../utils/api";
import Topic from "./Topic";
export default function Topics() {
  const [topics, setTopics] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { currentUser } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    getTopics()
      .then((topics) => {
        setTopics(topics);
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
    <main className="Topics">
      <h1>Topics</h1>
      <ul>
        {topics.map((topic) => {
          return (
            <li key={topic.slug}>
              <Topic
                key={topic.slug}
                slug={topic.slug}
                description={topic.description}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
