import { updateVotes } from "../utils/api";
import { useState } from "react";
export default function Votes({ votes, id, type }) {
  const [vote, setVote] = useState(0);
  const handleVote = (e, incVote) => {
    setVote((prevVote) => {
      return prevVote + incVote;
    });

    updateVotes(e.target.name, incVote, type);
  };
  return (
    <div>
      Votes: {vote}{" "}
      <button onClick={(e) => handleVote(e, 1)} value={votes} name={id}>
        +
      </button>
      <button onClick={(e) => handleVote(e, -1)} value={votes} name={id}>
        -
      </button>
    </div>
  );
}
