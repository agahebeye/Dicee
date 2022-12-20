import React from "react";
import { Die } from "./Die";

export function Application() {
  const randomValue = () => Math.floor(Math.random() * 6);
  const randomKey = () => Math.random().toString(36).substring(2, 9);

  const [dice, setDice] = React.useState(() =>
    Array.from({ length: 10 }, () => ({
      key: randomKey(),
      value: randomValue(),
      held: false,
    }))
  );

  const diceElements = (
    <div className="dice">
      {dice.map((die) => (
        <Die key={die.key} value={die.value + 1} />
      ))}
    </div>
  );

  return (
    <div className="application">
      <div>
        {diceElements}
        <button onClick={resetDice} className="button-reset">reset</button>
      </div>
    </div>
  );

  function resetDice() {
    setDice((prevDice) => {
      return prevDice.map((die) => ({
        ...die,
        value: randomValue(),
      }));
    });
  }
}
