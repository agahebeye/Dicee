import classes from "~/styles/die.module.css";
import styled from "styled-components";

type DiePropsType = {
  value: number;
  hold: () => void;
};

const Face = styled.div`
  display: grid;
  grid-template-areas:
    "a . c"
    "e g f"
    "d . b";

  flex: 0 0 auto;
  margin: 16px;
  padding: 10px;
  width: 44px;
  height: 44px;

  /* background-color: #e7e7e7; */
  background-color: crimson;
  /* box-shadow: inset 0 5px white, inset 0 -5px #bbb, inset 5px 0 #d7d7d7,
    inset -5px 0 #d7d7d7; */
  box-shadow: inset 0 5px #db1039, inset 0 -5px #91132c, inset 5px 0 #aa0022,
    inset -5px 0 #aa0022;
  border-radius: 10%;

  .pip {
    display: block;
    color: white;
    align-self: center;
    justify-self: center;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #d6d6d6;
    box-shadow: inset 0 3px #aaaaaa, inset 0 -3px #e0e0e0;
  }
`;

export function Die(props: DiePropsType) {
  return (
    <Face className={classes.face} onClick={props.hold}>
      {Array.from({ length: props.value }, (_, i) => {
        return <div key={i} className={classes.pip}></div>;
      })}
    </Face>
  );
}
