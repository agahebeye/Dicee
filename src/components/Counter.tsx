type CounterProps = {
  time: number;
  attempts: number;
};

export function Counter(props: CounterProps) {
  const mins = Math.floor((props.time % 3600) / 60);
  const seconds = Math.floor(props.time % 60);
  const time = `${mins.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="space-x-1 text-xs">
      <span className="bg-red-400 p-1 text-white font-semibold">{time}</span>
      <span>&bull;</span>
      <span>
        <strong>{props.attempts}</strong> attemp(s) remaining
      </span>
    </div>
  );
}
