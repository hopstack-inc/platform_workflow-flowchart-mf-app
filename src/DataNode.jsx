import React from "react";
import { Handle, Position } from "reactflow";

function DataNode({ data, removeNode }) {
  function updateSelection(val) {
    data["action"] = val;
  }

  //   function getNodeData() {
  //     const divs = [];
  //     Object.entries(data).map(([k, v]) => {
  //       divs.push(<div>{`${k}_${v}`}</div>);
  //     });
  //     return divs;
  //   }

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="p-2 m-1 text-[8pc] flex flex-col bg-white rounded-sm border border-black">
        <div className="flex justify-between">
          <div
            onClick={() => removeNode(data.id)}
            className="h-4 w-4 flex items-center justify-center">
            X
          </div>
          <div className="h-4 w-4 flex items-center justify-center">E</div>
        </div>
        <div>Type: {data.type}</div>
        <div>Stage: {data.stage}</div>
        <div>Target: {data.target}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
export default DataNode;
