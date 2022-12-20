import classes from "~/styles/die.module.css";

export function Pip() {
  return <span className={classes.pip} />;
}

export function Face({ children }: { children: JSX.Element[] | null }) {
  return <div className={classes.face}>{children}</div>;
}

export function Die({ length }: { length: number }) {
  const pips = Array.from({ length }, (_, i) => <Pip key={i} />);

  return <Face>{pips}</Face>;
}
