import React from "react";
import { Die } from "./Die";

export function Application() {
  const randomValue = () => Math.floor(Math.random() * 6);
  const randomKey = () => Math.random().toString(36).substring(2, 9);

  const [dice, setDice] = React.useState(() =>
    Array.from({ length: 10 }, () => ({
      key: randomKey(),
      value: randomValue() + 1,
      held: false,
    }))
  );

  const diceElements = (
    <div className="dice">
      {dice.map((die) => (
        <Die
          hold={() => holdDie(die.key)}
          key={die.key}
          held={die.held}
          value={die.value}
        />
      ))}
    </div>
  );

  return (
    <div className="application">
      <div>
        {diceElements}
        <button onClick={resetDice} className="button-reset">
          reset
        </button>
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

  function holdDie(key: string | number) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.key === key
          ? {
              ...die,
              held: !die.held,
            }
          : die;
      });
    });
  }
}
