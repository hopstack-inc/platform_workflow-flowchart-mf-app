import React from "react";
import { Handle, Position } from "reactflow";

function TextUpdaterNode({ data }) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="p-2 m-1 flex flex-col bg-white rounded-sm border border-black">
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
export default TextUpdaterNode;
