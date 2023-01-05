import React from "react";
import { Handle, NodeToolbar, Position } from "reactflow";

function DataNode({ data }) {

  return (
    <>
      <NodeToolbar className="px-2 rounded-lg py-1 bg-gray-500 gap-2 divide-red-400" isVisible={data.toolbarVisible} position={Position.Top}>
        <button>delete</button>
        <div className="h-full w-1 bg-white"></div>
        <button>edit</button>
      </NodeToolbar>
      <Handle type="target" position={Position.Top} />
      <div className="p-2 m-1 text-xs flex flex-col bg-white rounded-sm border border-black">
        <div>Type: {data.type}</div>
        <div>Stage: {data.stage}</div>
        <div>Target: {data.target}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
export default DataNode;
