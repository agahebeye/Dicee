import { Die } from "./Die";

export function Application() {
  return (
    <div className="App">
      {[1, 2, 3, 4, 5, 6].map((v) => (
        <Die key={v} length={v} />
      ))}
    </div>
  );
}
