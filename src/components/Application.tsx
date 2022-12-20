import { Die } from "./Die";

export function Application() {
  const dice = Array.from({ length: 10 }, (_, key) => ({
    key,
    value: Math.floor(Math.random() * 6),
    held: false,
  }));

  const diceElements = dice.map((die) => (
    <Die key={die.key} value={die.value + 1} />
  ));

  return <div className="App">{diceElements}</div>;
}
