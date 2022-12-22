import clsx from "clsx";

type RollButtonProps = {
  won: boolean;
  failed: boolean;
  roll: () => void;
};

export function RollButton(props: RollButtonProps) {
  const className = clsx(
    `bg-red-500 text-white tracking-widest uppercase text-xs font-semibold px-10 py-3 rounded-sm table m-auto mt-4 disabled:bg-red-300 disabled:cursor-not-allowed`,
    {'bg-gray-200 text-gray-800': props.won}
  );

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
        <button onClick={props.roll} className={className}>
          start over
        </button>
      )}
    </>
  );
}
