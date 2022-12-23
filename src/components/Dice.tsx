import { clsx } from "clsx";

import { Die } from "./Die";
import classes from "~/styles/die.module.css";
import type { DieType } from "./Die";

type DiceProps = {
  elements: DieType[];
  hold: (key: string) => void;
};

export function Dice(props: DiceProps) {
  const length = props.elements.length;

  return (
    <div
      className={clsx(classes.dice, "grid grid-cols-5 mt-6", {
        "grid-cols-7": length === 21,
        "grid-cols-6": length === 30,
      })}
    >
      {props.elements.map((die) => (
        <Die
          hold={() => props.hold(die.key)}
          key={die.key}
          held={die.held}
          value={die.value}
        />
      ))}
    </div>
  );
}
