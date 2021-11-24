import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <nav className="Nav">
      <Link to="/home">Home</Link>
      <Link to="/topics">Topics</Link>
      <Link to="/articles">Articles</Link>
    </nav>
  );
}
