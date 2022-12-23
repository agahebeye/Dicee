import React from "react";

type AppSettingsProps = {
  settings: {
    closed: boolean;
    close: () => void;
    save: () => void;
    value: Settings;
    change: React.Dispatch<React.SetStateAction<Settings>>;
  };
};

export function AppSettings(props: AppSettingsProps) {
  if (!props.settings.closed) return <></>;
  console.log("rendered");
  return (
    <form
      onSubmit={submit}
      className="[&_select]:text-sm text-sm relative max-w-[500px] w-full flex flex-col items-center"
    >
      <button onClick={props.settings.close} className="absolute right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <fieldset>
        <legend>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6">
            Settings
          </h2>
        </legend>
        <div className="mt-6 flex">
          <label htmlFor="level" className="w-24">
            Level
          </label>
          <select
            name="level"
            id="level"
            className=""
            value={props.settings.value.level}
            onChange={handleChange}
          >
            <option value="0">Beginner</option>
            <option value="1">Intermediate</option>
            <option value="2">Advanced</option>
          </select>
        </div>

        <div className="mt-4 flex">
          <label htmlFor="duration" className="w-24">
            Duration
          </label>
          <select
            name="duration"
            id="duration"
            value={props.settings.value.duration}
            onChange={handleChange}
          >
            <option value={30}>30 seconds</option>
            <option value={60}>1 min</option>
            <option value={120}>2 mins</option>
          </select>
        </div>

        <div className="flex mt-4">
          <label htmlFor="attempts" className="w-24">
            Attempts
          </label>
          <input
            name="attempts"
            type="number"
            value={props.settings.value.attempts}
            onChange={handleChange}
            className="w-16 text-sm"
            min={3}
            max={6}
          />
        </div>
      </fieldset>

      <button
        onClick={props.settings.save}
        className="bg-red-500 text-white mt-8 tracking-widest uppercase text-xs font-semibold px-10 py-3 rounded-sm table m-auto"
      >
        save
      </button>
    </form>
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
  }

  function handleChange(event: React.ChangeEvent) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;

    props.settings.change((prevSetings) => {
      return {
        ...prevSetings,
        [name]: value,
      };
    });
  }
}

export type Settings = {
  level: number;
  duration: number;
  attempts: number;
};
