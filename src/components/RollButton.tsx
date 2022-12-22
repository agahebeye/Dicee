import { clsx } from "clsx";

type RollButtonProps = {
  won: boolean;
  failed: boolean;
  roll: () => void;
};

export function RollButton(props: RollButtonProps) {
  const className = `bg-red-800 text-white tracking-widest uppercase text-xs font-semibold px-10 py-3 rounded-sm table m-auto mt-4`;
  const text = props.won ? "play new game" : "roll";

  return (
    <>
      <button
        onClick={props.roll}
        className={className}
        disabled={props.failed ? true : undefined}
      >
        {text}
      </button>

      {props.failed && (
        <button onClick={props.roll} className="button">
          start over
        </button>
      )}
    </>
  );
}
