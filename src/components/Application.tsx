import { clsx } from "clsx";
import React from "react";
import Confetti from "react-confetti";

import { Die } from "./Die";

export function Application() {
  const [won, setWon] = React.useState(false);
  const [dice, setDice] = React.useState(() =>
    Array.from({ length: 10 }, () => generateDice())
  );

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.held);
    const allSame = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSame) {
      setWon(true);
    }
  }, [dice]);

  const diceElements = (
    <div className="dice">
      {dice.map((die) => (
        <Die
          hold={() => holdDie(die.key)}
          key={die.key}
          held={die.held}
          value={die.value + 1}
        />
      ))}
    </div>
  );

  return (
    <div className="application">
      {won && <Confetti />}
      <div>
        <div>
          {won ? (
            <p className="congratulations">Congratulations!!!</p>
          ) : (
            <p className="roll-info">Roll dice till they all become the same</p>
          )}
        </div>
        {diceElements}
        <button
          onClick={rollDice}
          className={clsx("button", { "button-inverse": won })}
        >
          {won ? "play new game" : "roll"}
        </button>
      </div>
    </div>
  );

  function generateDice() {
    return {
      key: Math.random().toString(36).substring(2, 9),
      value: Math.floor(Math.random() * 6),
      held: false,
    };
  }

  function rollDice() {
    if (won) {
      setDice(() => Array.from({ length: 10 }, () => generateDice()));
      setWon(false);
    } else {
      setDice((prevDice) => {
        return prevDice.map((die) => (die.held ? die : generateDice()));
      });
    }
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
