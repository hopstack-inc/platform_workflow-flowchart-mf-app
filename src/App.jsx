import React from "react";
import ReactDOM from "react-dom";
import {WorkflowProvider} from "./context/WorkflowContext";

import "./index.scss";
import WorkflowChart from "./WorkflowChart";

const App = () => (
  <div className="h-screen w-full">
    <WorkflowProvider>
      <WorkflowChart />
    </WorkflowProvider>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
