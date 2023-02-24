import React, { useContext } from "react";
import { WorkflowContext } from "./context/WorkflowContext";
import WorkflowSelection from "./pages/workflowSelection";
import WorkflowChart from "./WorkflowChart";

const WorkflowDesignerWrapper = () => {
  const { newWorkflow, selectedWorkflow } = useContext(WorkflowContext);
  return (
    <>
      {!(newWorkflow || selectedWorkflow) ? (
        <WorkflowSelection />
      ) : (
        <WorkflowChart />
      )}
    </>
  );
};

export default WorkflowDesignerWrapper;
