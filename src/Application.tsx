import React, { useReducer } from "react";
import Confetti from "react-confetti";

import { AppSettings } from "./partials/AppSettings";
import { MainApp } from "./partials/MainApp";
import { useDice } from "./DiceProver";
import { useCountDown } from "~/hooks/useCountDown";
import {generateDefaultDice} from '~/reducer'

export function Application() {
  const { state, dispatch } = useDice();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [settings, setSettings] = React.useState({
    level: 0,
    duration: 30,
    attempts: 3,
  });

  const counter = useCountDown({
    initialTime: settings.duration,
    onTimeOver,
  });

  const settingsProps = {
    close() {
      setIsSettingsOpen(false);
    },
    closed: isSettingsOpen,
    value: settings,
    change: setSettings,
    save: saveSettings,
  };

  React.useEffect(() => {
    checkIfWon();
  }, [state.dice]);

  return (
    <div className="h-screen flex justify-center items-center">
      <AppSettings settings={settingsProps} />

      <MainApp
        counter={counter}
        openSettings={() => setIsSettingsOpen(true)}
        isSettingsOpen={isSettingsOpen}
      />

      {state.won && <Confetti />}
    </div>
  );

  function onTimeOver() {
    if (state.attempts > 1) {
      dispatch({ type: "attempts/set", payload: state.attempts - 1 });
      counter.reset();
      counter.start();
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
      counter.pause();
    }
  }

  function saveSettings() {
    counter.reset();

    dispatch({type: 'attempts/set', payload: settings.attempts})
    dispatch({type: 'dice/set', payload: generateDefaultDice(settings.level)})

    setIsSettingsOpen(false);
  }
}
