import { SettingsButton } from "~/components/SettingsButton";
import { Timer } from "~/components/Timer";

import type { State } from "~/reducer";
import { ReturnValue } from "use-timer/lib/types";

type AppbarProps = {
  state: State;
  timer: ReturnValue;
};

export function Appbar(props: AppbarProps) {
  const appbarText = props.state.won
    ? "Congratulations!!!"
    : "Roll dice till they all become the same. Note the timer will start counting as soon as you hold a first die.";

  return (
    <>
      {props.state.failed ? (
        <div className="text-red-600 text-lg flex items-center justify-center space-x-1">
          <span>Oops! Faileds</span> <span className="text-3xl">😥</span>
        </div>
      ) : (
        <div className="flex flex-col items-center text-sm">
          <SettingsButton />
          <div className="mt-10 mb-4 max-w-xs">{appbarText}</div>
          <Timer time={props.timer.time} attempts={props.state.attempts} />
        </div>
      )}
    </>
  );
}
