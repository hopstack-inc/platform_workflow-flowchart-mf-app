import React, { useContext, useState } from "react";
import DropDown from "../components/DropDown";
import { WorkflowContext } from "../context/WorkflowContext";
import { Button } from "../utils/Button";
import Modal from "../utils/Modal";

const WorkflowSelection = () => {
  const {
    newWorkflow,
    setNewWorkflow,
    selectedWorkflow,
    setSelectedWorkflow,
    workFlows,
  } = useContext(WorkflowContext);
  const [wfName, setWfName] = useState("");
  function updateSelectedWorkflow(field, selectedWF) {
    if (field == "newWorkflow") {
      setSelectedWorkflow({
        tenant: "62c3be3d2b411d284d7ac25b",
        enabled: true,
        name: wfName,
        activity: selectedWF,
        nodes: [],
        edges: {},
      });
      setNewWorkflow(true);
    } else
      setSelectedWorkflow(
        workFlows.find((workflow) => workflow.name == selectedWF),
      );
  }
  return (
    <div className="h-full w-full relative">
      <div className="absolute flex flex-col px-2 py-10 w-40 h-full shadow-lg bg-white z-10 left-0 top-0">
        <Modal
          showModal={!(selectedWorkflow)}
          setShowModal={null}>
          <div className="flex flex-col gap-2 mx-2">
            New Workflow fields
            <label className="border rounded-md px-2 py-1 flex justify-between items-center">
              Title :
              <input
                className="border border-gray-600 p-1 rounded-md"
                value={wfName}
                onChange={(e) => setWfName(e.target.value)}
              />
            </label>
            <DropDown
              label={"New wf activity type "}
              value={selectedWorkflow?.activity ?? ""}
              fieldType={"newWorkflow"}
              setValue={updateSelectedWorkflow}
              values={[" ", "RECEIVING", "PUTAWAY"]}
            />
          </div>
          --------------------------------------------------------------
          {workFlows && (
            <DropDown
              label={"Select Workflow "}
              value={selectedWorkflow?.name ?? ""}
              fieldType={""}
              setValue={updateSelectedWorkflow}
              values={[" ", ...workFlows.map((wf) => wf.name)]}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default WorkflowSelection;
