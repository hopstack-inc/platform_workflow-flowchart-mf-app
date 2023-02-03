import React from "react";
import { WorkflowProvider } from "./context/WorkflowContext";
import WorkflowChart from "./WorkflowChart";

const WorkflowDesignerWrapper = () => {
  return (
    <WorkflowProvider>
      <WorkflowChart />
    </WorkflowProvider>
  );
};

export default WorkflowDesignerWrapper;
