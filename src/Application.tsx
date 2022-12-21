import React, { useReducer } from "react";
import { useTimer } from "use-timer";

import { Dice } from "./components/Dice";
import { RollButton } from "./components/RollButton";
import { Messagebar } from "./components/Messagebar";
import { useDiceReducer } from "./reducer";

export function Application() {
  const numberOfAttempts = 3;
  const duration = 10;

  const [state, dispatch] = useDiceReducer()

  const [won, setWon] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [attempts, setAttempts] = React.useState(numberOfAttempts);
  const [dice, setDice] = React.useState(generateDefaultDice());

  const { time, start, status, reset, pause } = useTimer({
    timerType: "DECREMENTAL",
    initialTime: duration,
    endTime: 0,
    onTimeOver() {
      if (attempts > 0) {
        reset();
        setAttempts((attempts) => attempts - 1);
      } else {
        setFailed(true);
      }
    },
  });

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.held);
    const allSame = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSame) {
      setWon(true);
      setFailed(false);
      pause();
    }
  }, [dice]);

  return (
    <div className="application">
      <div className="container">
        <div>
          {time} {attempts} remaining.
        </div>
        <Messagebar won={won} />
        <Dice elements={dice} hold={holdDie} />
        <RollButton won={won} roll={rollDice} failed={failed} />
      </div>
    </div>
  );

  function rollDice() {
    if (won) {
      setDice(generateDefaultDice());
      setWon(false);
    } else {
      setDice((prevDice) => {
        return prevDice.map((die) => (die.held ? die : generateNewDie()));
      });
    }
  }

  function holdDie(key: string | number) {
    if (status === "STOPPED") {
      start();
    }

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

  function generateNewDie() {
    return {
      key: Math.random().toString(36).substring(2, 9),
      value: Math.floor(Math.random() * 6),
      held: false,
    };
  }

  function generateDefaultDice(number: number = 10) {
    return () => Array.from({ length: number }, () => generateNewDie());
  }
}
