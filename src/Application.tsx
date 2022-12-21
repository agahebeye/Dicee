import React, { useReducer } from "react";
import { useTimer } from "use-timer";

import { Settings } from "./partials/Settings";
import { Main } from "./partials/Main";

import { useDiceReducer } from "./reducer";

export function Application() {
  const duration = 30;

  const [state, dispatch] = useDiceReducer();

  const timer = useTimer({
    timerType: "DECREMENTAL",
    initialTime: duration,
    endTime: 0,
    onTimeOver,
  });

  React.useEffect(() => {
    const allHeld = state.dice.every((die) => die.held);
    const allSame = state.dice.every(
      (die) => die.value === state.dice[0].value
    );
    if (allHeld && allSame) {
      dispatch({ type: "won", payload: true });
      timer.pause();
    }
  }, [state.dice]);

  return (
    <div className="application">
      <div className="container">
        {/* <Settings /> */}
        <Main state={state} timer={timer} dispatch={dispatch} />
      </div>
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
}
