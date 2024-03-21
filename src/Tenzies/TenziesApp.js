import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  React.useEffect(() => {
    let temp = dice[0].value;
    for (let i = 0; i < dice.length; i++) {
      if (!dice[i].isHeld || temp !== dice[i].value) return;
    }
    setTenzies(true);
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generate());
    }
    return newDice;
  }

  function generate() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDice() {
    setDice((dice) =>
      dice.map((die) => {
        return die.isHeld ? die : generate();
      })
    );
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  function resetGame() {
    setDice(allNewDice());
    setTenzies(false);
  }

  return (
    <main className="container">
      {tenzies && <ReactConfetti />}
      <div className="container-content">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between the rolls.
        </p>
      </div>
      <div className="container-main">{diceElements}</div>
      <button className="btn" onClick={tenzies ? resetGame : rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
