import { Appbar } from "~/components/Appbar";
import { Dice } from "~/components/Dice";
import { RollButton } from "~/components/RollButton";

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
    <div className="">
      <Appbar state={props.state} timer={props.timer} />
      <Dice elements={props.state.dice} hold={holdDie} />
      <RollButton
        won={props.state.won}
        roll={rollDice}
        failed={props.state.failed}
      />
    </div>
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
