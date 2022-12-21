import { Messagebar } from "~/components/Messagebar";
import { Timer } from "~/components/Timer";
import { Dice } from "~/components/Dice";
import { RollButton } from "~/components/RollButton";
import {SettingsButton} from '~/components/SettingsButton'

import type { Action, State } from "~/reducer";
import { ReturnValue } from "use-timer/lib/types";
import React from "react";

type MainProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
  timer: ReturnValue;
};

export function Main(props: MainProps) {
  return (
    <>
      <SettingsButton />
      <Messagebar won={props.state.won} />
      <Timer time={props.timer.time} attempts={props.state.attempts} />
      <Dice elements={props.state.dice} hold={holdDie} />
      <RollButton
        won={props.state.won}
        roll={rollDice}
        failed={props.state.failed}
      />
    </>
  );

  function rollDice() {
    if (props.state.won || props.state.failed) {
      props.timer.reset();
    }

    props.dispatch({ type: "dice/roll" });
  }

  function holdDie(key: string) {
    if (props.timer.status === "STOPPED") {
      props.timer.start();
    }

    props.dispatch({ type: "dice/hold", payload: key });
  }
}
