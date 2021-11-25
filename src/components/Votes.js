import { updateVotes } from "../utils/api";
import { useState } from "react";
export default function Votes({ comment }) {
  const [vote, setVote] = useState(0);
  const handleVote = (e, incVote) => {
    setVote((prevVote) => {
      return prevVote + incVote;
    });
    updateVotes(e.target.name, incVote);
  };
  return (
    <div>
      Votes: {comment.votes + vote}{" "}
      <button
        onClick={(e) => handleVote(e, 1)}
        value={comment.votes}
        name={comment.comment_id}
      >
        +
      </button>
      <button
        onClick={(e) => handleVote(e, -1)}
        value={comment.votes}
        name={comment.comment_id}
      >
        -
      </button>
    </div>
  );
}
