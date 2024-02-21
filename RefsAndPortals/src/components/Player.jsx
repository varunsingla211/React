import { useRef } from "react";
import { useState } from "react";
export default function Player() {
  const [enteredPlayerName, setEnteredPlayerName] = useState("");

  const playerName = useRef();

  function handleSubmit(){
    setEnteredPlayerName(playerName.current.value)
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity" }</h2>
      <p>
        <input ref = {playerName} type="text" />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
