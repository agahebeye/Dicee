import { clsx } from "clsx";

type DiePropsType = {
  value: number;
  held: boolean;
  hold: () => void;
};

export function Die(props: DiePropsType) {
  return (
    <div
      className={clsx("face", { "held-face": props.held })}
      onClick={props.hold}
    >
      {Array.from({ length: props.value }, (_, i) => {
        return (
          <div
            key={i}
            className={clsx("pip", { "held-pip": props.held })}
          ></div>
        );
      })}
    </div>
  );
}
