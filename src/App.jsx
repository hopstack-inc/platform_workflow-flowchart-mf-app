import React from "react";
import ReactDOM from "react-dom";

import "./global.css";
import WorkflowDesignerWrapper from "./WorkflowDesignerWrapper";

const App = () => (
  <div className="h-screen w-full">
    <WorkflowDesignerWrapper/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
