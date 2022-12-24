import { Appbar } from "~/components/Appbar";
import { Dice } from "~/components/Dice";
import { RollButton } from "~/components/RollButton";

import { useDice } from "~/context/DiceProver";

import { ReturnValue } from "~/hooks/useCountDown";

type MainAppProps = {
  isSettingsOpen: boolean;
  openSettings: () => void;
  counter: ReturnValue;
};

export function MainApp(props: MainAppProps) {
  const { state, dispatch } = useDice();

  if (props.isSettingsOpen) return <></>;

  return (
    <div className="">
      <Appbar
        state={state}
        counter={props.counter}
        openSettings={props.openSettings}
      />
      <Dice elements={state.dice} hold={holdDie} />
      <RollButton won={state.won} roll={rollDice} failed={state.failed} />
    </div>
  );

  function rollDice() {
    if (state.won || state.failed) {
      props.counter.reset();
    }

    dispatch({ type: "dice/roll" });
  }

  function holdDie(key: string) {
    props.counter.start();

    dispatch({ type: "dice/hold", payload: key });
  }
}
