import React from "react";
import { Handle, Position } from "reactflow";

function ActionsNode({ data }) {
  function updateSelection(val){
    data["action"] = val;
  }
  console.log(data);
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="p-2 m-1 flex flex-col bg-white rounded-sm border border-black">
        <label className="flex flex-col text-sm">
          Next Action?
          <select onChange={(e) => updateSelection(e.target.value)}>
            <option value="pickup">Pickup</option>
            <option value="return">Return</option>
            <option value="drop">Drop</option>
          </select>
        </label>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
export default ActionsNode;
