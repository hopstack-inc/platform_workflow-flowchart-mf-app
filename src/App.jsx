import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import WorkflowChart from "./WorkflowChart";

const App = () => (
  <div className="h-screen w-full">
    <WorkflowChart />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
