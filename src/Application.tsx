import React, { useReducer } from "react";
import Confetti from "react-confetti";

import { useTimer } from "use-timer";

import { AppSettings } from "./partials/AppSettings";
import { MainApp } from "./partials/MainApp";

import { useDiceReducer } from "./reducer";

export function Application() {
  const duration = 30;

  const [state, dispatch] = useDiceReducer();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const timer = useTimer({
    timerType: "DECREMENTAL",
    initialTime: duration,
    endTime: 0,
    onTimeOver,
  });

  React.useEffect(() => {
    checkIfWon();
  }, [state.dice]);

  return (
    <div className="h-screen flex justify-center items-center">
      <AppSettings
        closeSettings={() => setIsSettingsOpen(false)}
        closed={isSettingsOpen}
      />

      <MainApp
        timer={timer}
        openSettings={() => setIsSettingsOpen(true)}
        isSettingsOpen={isSettingsOpen}
      />
      
      {state.won && <Confetti />}
    </div>
  );

  function onTimeOver() {
    if (state.attempts >= 1) {
      dispatch({ type: "attempts/decrement" });
      timer.reset();
      timer.start();
    } else {
      dispatch({ type: "failed", payload: true });
    }
  }

  function checkIfWon() {
    const allHeld = state.dice.every((die) => die.held);
    const allSame = state.dice.every(
      (die) => die.value === state.dice[0].value
    );
    if (allHeld && allSame) {
      dispatch({ type: "won", payload: true });
      timer.pause();
    }
  }
}
