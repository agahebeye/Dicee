import classes from "~/styles/die.module.css";

type DiePropsType = {
  value: number;
};

export function Die(props: DiePropsType) {
  return (
    <div className={classes.face}>
      {Array.from({ length: props.value }, (_, i) => {
        return <div className={classes.pip}></div>;
      })}
    </div>
  );
}
