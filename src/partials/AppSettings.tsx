type AppSettingsProps = {
  closed: boolean;
  closeSettings: () => void;
};
export function AppSettings(props: AppSettingsProps) {
  if (!props.closed) return <></>;
  return <div onClick={props.closeSettings}>settings here</div>;
}
