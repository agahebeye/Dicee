import { Die } from "./Die";
import type {DieType} from './Die'

type DiceProps = {
  elements: DieType[];
  hold: (key: string) => void;
};

export function Dice(props: DiceProps) {
  return (
    <div className="dice">
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
