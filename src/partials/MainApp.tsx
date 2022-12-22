import { Appbar } from "~/components/Appbar";
import { Dice } from "~/components/Dice";
import { RollButton } from "~/components/RollButton";

import { useDice } from "~/DiceProver";

import { ReturnValue } from "use-timer/lib/types";

type MainAppProps = {
  timer: ReturnValue;
};

export function MainApp(props: MainAppProps) {
  const { state, dispatch } = useDice();

  return (
    <div className="">
      <Appbar state={state} timer={props.timer} />
      <Dice elements={state.dice} hold={holdDie} />
      <RollButton won={state.won} roll={rollDice} failed={state.failed} />
    </div>
  );

  function rollDice() {
    if (state.won || state.failed) {
      props.timer.reset();
    }

    dispatch({ type: "dice/roll" });
  }

  function holdDie(key: string) {
    if (props.timer.status === "STOPPED") {
      props.timer.start();
    }

    dispatch({ type: "dice/hold", payload: key });
  }
}