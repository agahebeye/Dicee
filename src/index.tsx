import ReactDOM from "react-dom/client";
import { Application } from "~/components/Application";

import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Application />);
