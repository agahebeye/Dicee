import { clsx } from "clsx";

import { SettingsButton } from "~/components/SettingsButton";
import { Counter } from "~/components/Counter";

import type { State } from "~/reducer";
import { ReturnValue } from "~/hooks/useCountDown";

type AppbarProps = {
  state: State;
  counter: ReturnValue;
  openSettings: () => void;
};

export function Appbar(props: AppbarProps) {
  const appbarText = props.state.won
    ? "Congratulations!!!"
    : "Roll dice till they all become the same. Note the counter will start counting as soon as you hold a first die.";

  return (
    <>
      {props.state.failed ? (
        <div className="text-red-600 text-lg flex items-center justify-center space-x-1">
          <span>Oops!!! Failed</span> <span className="text-3xl">😥</span>
        </div>
      ) : (
        <div className="flex flex-col items-center text-sm">
          <SettingsButton onClick={props.openSettings} />
          <div
            className={clsx("mt-10 mb-4 max-w-xs", {
              "text-xl italic": props.state.won,
            })}
          >
            {appbarText}
          </div>
          <Counter time={props.counter.time} attempts={props.state.attempts} />
        </div>
      )}
    </>
  );
}
