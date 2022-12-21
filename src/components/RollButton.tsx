import { clsx } from "clsx";

type RollButtonProps = {
  won: boolean;
  failed: boolean;
  roll: () => void;
};

export function RollButton(props: RollButtonProps) {
  const className = clsx("button", { "button-inverse": props.won });
  const text = props.won ? "play new game" : "roll";

  return (
    <button
      onClick={props.roll}
      className={className}
      disabled={props.failed ? true : undefined}
    >
      {text}
    </button>
  );
}
