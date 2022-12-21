import React, { useReducer } from "react";
import { useTimer } from "use-timer";

import { useDiceReducer } from "./reducer";

import { Messagebar } from "./components/Messagebar";
import { Timer } from "./components/Timer";
import { Dice } from "./components/Dice";
import { RollButton } from "./components/RollButton";

export function Application() {
  const duration = 30;

  const [state, dispatch] = useDiceReducer();

  const { time, start, status, reset, pause } = useTimer({
    timerType: "DECREMENTAL",
    initialTime: duration,
    endTime: 0,
    onTimeOver() {
      if (state.attempts >= 1) {
        dispatch({ type: "attempts/decrement" });
        reset();
        start();
      } else {
        dispatch({ type: "failed", payload: true });
      }
    },
  });

  React.useEffect(() => {
    const allHeld = state.dice.every((die) => die.held);
    const allSame = state.dice.every(
      (die) => die.value === state.dice[0].value
    );
    if (allHeld && allSame) {
      dispatch({ type: "won", payload: true });
      pause();
    }
  }, [state.dice]);

  return (
    <div className="application">
      <div className="container">
        <Messagebar won={state.won} />
        <Timer time={time} attempts={state.attempts} />
        <Dice elements={state.dice} hold={holdDie} />
        <RollButton won={state.won} roll={rollDice} failed={state.failed} />
      </div>
    </div>
  );

  function rollDice() {
    if (state.won) {
      reset();
    }

    dispatch({ type: "dice/roll" });
  }

  function holdDie(key: string) {
    if (status === "STOPPED") {
      start();
    }

    dispatch({ type: "dice/hold", payload: key });
  }
}
