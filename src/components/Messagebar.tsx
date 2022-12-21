import Confetti from "react-confetti";

type MessagebarProps = {
  won: boolean;
};

export function Messagebar(props: MessagebarProps) {
  return (
    <>
      {props.won && <Confetti />}

      {props.won ? (
        <div className="congratulations">Congratulations!!!</div>
      ) : (
        <div className="roll-info">Roll dice till they all become the same</div>
      )}
    </>
  );
}
