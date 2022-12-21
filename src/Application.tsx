import React from "react";
import { useTimer } from "use-timer";

import { Dice } from "./components/Dice";
import { RollButton } from "./components/RollButton";
import { Messagebar } from "./components/Messagebar";

export function Application() {
  const [won, setWon] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [times, setTimes] = React.useState();
  const [dice, setDice] = React.useState(generateDefaultDice());

  const { time, start, status } = useTimer({
    timerType: "DECREMENTAL",
    initialTime: 1 * 60,
    endTime: 0,
    onTimeOver() {
      if (!won) {
        setFailed(true);
      }
    },
  });

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.held);
    const allSame = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSame) {
      setWon(true);
    }
  }, [dice]);

  return (
    <div className="application">
      <div className="container">
        <div>{time}</div>
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
