import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/contexts";
import { getUsers } from "../utils/api";
import { Link } from "react-router-dom";
export default function Home() {
  //   console.log("here <===");
  const [users, setUsers] = useState([]);
  const { setCurrentUser } = useContext(AppContext);
  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <section>
      <h1>Welcome to the NC news App</h1>
      <h2>Who are you?</h2>
      <div className="user_selection">
        {users.map((user) => {
          return (
            <Link
              key={user.username}
              to="/articles"
              onClick={() => {
                setCurrentUser(user);
              }}
            >
              <img
                src={user.avatar_url}
                alt={user.name}
                className="user_avatar"
              ></img>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
