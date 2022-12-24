import clsx from "clsx";
import classes from "~/styles/die.module.css";

import { DieColor } from "~/data";

type DiePropsType = {
  die: DieType;
  hold: () => void;
};

export function Die(props: DiePropsType) {
  //use colors if exist or default color
  const faceClassName = `${classes.face} ${
    props.die.held ? props.die.colors.held : props.die.colors.default
  }`;

  const pipClassName = clsx(classes.pip);

  return (
    <div className={faceClassName} onClick={props.hold}>
      {Array.from({ length: props.die.value }, (_, i) => {
        return <div key={i} className={pipClassName}></div>;
      })}
    </div>
  );
}

export type DieType = {
  key: string;
  value: number;
  held: boolean;
  colors: DieColor;
};
