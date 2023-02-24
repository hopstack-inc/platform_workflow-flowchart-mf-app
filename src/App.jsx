import React from "react";
import ReactDOM from "react-dom";
import { WorkflowProvider } from "./context/WorkflowContext";

import "./global.css";
import WorkflowDesignerWrapper from "./WorkflowDesignerWrapper";

const App = () => (
  <div className="h-screen w-full">
    <WorkflowProvider>
      <WorkflowDesignerWrapper />
    </WorkflowProvider>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
