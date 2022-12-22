import React from "react";

type SettingsProps = {
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
};
export function Settings(props: SettingsProps) {
  return <div>settings here</div>;
}
