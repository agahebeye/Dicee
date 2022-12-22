import clsx from "clsx";
import classes from "~/styles/die.module.css";

type DiePropsType = {
  value: number;
  held: boolean;
  hold: () => void;
};

export function Die(props: DiePropsType) {
  const faceClassName = clsx(classes.face, { "bg-gray-400": props.held });
  const pipClassName = clsx(classes.pip);

  return (
    <div className={faceClassName} onClick={props.hold}>
      {Array.from({ length: props.value }, (_, i) => {
        return <div key={i} className={pipClassName}></div>;
      })}
    </div>
  );
}

export type DieType = {
  key: string;
  value: number;
  held: boolean;
};
