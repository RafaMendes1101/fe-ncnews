import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/user";
import { Navigate } from "react-router-dom";
import { getTopics } from "../utils/api";
export default function Topics() {
  const [topics, setTopics] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

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
          return <li key={topic.slug}>{topic.slug}</li>;
        })}
      </ul>
    </main>
  );
}
