import React, { useContext } from "react";
import { Handle, NodeToolbar, Position } from "reactflow";
import { WorkflowContext } from "../context/WorkflowContext";

function DataNode({ data }) {
  const { editNode, deleteNode, newNode } = useContext(WorkflowContext);
  return (
    <>
      <NodeToolbar
        className="px-2 rounded-lg py-1 bg-gray-500 text-white gap-2 divide-red-400 flex"
        isVisible={data.toolbarVisible}
        position={Position.Top}>
        <button onClick={() => newNode(data)}>Add</button>
        <button onClick={() => deleteNode(data)}>Delete</button>
        <button onClick={() => editNode(data)}>Edit</button>
      </NodeToolbar>
      <Handle type="target" position={Position.Top} />
      <div className="p-2 m-1 text-xs flex flex-col bg-white rounded-sm border border-black">
        <div>Type: {data.type}</div>
        {data.sysProvidedActionType && (
          <div>
            <div>System Provided Information: {data.sysProvidedActionType}</div>
            <div className="w-96">
              SubType:
              <div className="gap-1 flex flex-wrap">
                {data.subSysProvidedActionType.map((action) => (
                  <div
                    key={action.id}
                    className="p-1 text-white text-xs rounded-lg bg-blue-500">
                    {action.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {data.userAction && <div>User Action: {data.userAction}</div>}
        {data.sysAction && <div>Output: {data.sysAction}</div>}
      </div>
      {data.sysNegative && (
        <Handle id="False" type="source" position={Position.Left} />
      )}
      {data.sysPositive ? (
        <Handle id="True" type="source" position={Position.Right} />
      ) : (
        <Handle type="source" position={Position.Bottom} />
      )}
    </>
  );
}
export default DataNode;
